import { NextResponse } from 'next/server'
import { resendPost } from '@/lib/resend-client'
import {
  renderDownloadLinkEmail,
  DownloadLinkEntry,
  DownloadLinkLocale,
} from '@/lib/download-link-email'

// POST /api/download-link  { email, locale }
//
// A mobile visitor asks us to email them the desktop download link.
// We validate, rate limit (max 3 sends per email per day, enforced in
// Supabase because in-memory counters do not survive serverless invocations),
// store the request in download_link_requests, and send the email via Resend.
//
// ⛔ APPROVAL GATE: the REAL Resend send is behind the env flag
// DOWNLOAD_LINK_EMAIL_ENABLED. Unless it is exactly 'true', this route does
// everything (validate, rate limit, store the row, notify Telegram) but does
// NOT call Resend and responds { queued: true, emailSent: false }.
// Arturo must approve the email template before flipping the flag on Vercel.
//
// Vercel serverless rule: NEVER fire-and-forget. Every external call that
// must happen (Resend send, Supabase writes) is awaited before responding.

const FROM_ADDRESS = 'Arturo from CodeAgentSwarm <hello@codeagentswarm.com>'
const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  'https://codeagentswarm-backend-production.up.railway.app'
const MAX_SENDS_PER_DAY = 3
const MAX_EMAIL_LENGTH = 254

interface DownloadAsset {
  fileName: string
  fileUrl: string
  fileSize: number
}

interface BackendRelease {
  version: string
  releaseDate: string
  downloads?: Record<string, DownloadAsset>
}

function getSupabaseConfig(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL
  // Service role only: download_link_requests has RLS enabled with no
  // policies, so the public anon key can neither read nor write it.
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    throw new Error('SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY env vars are required')
  }
  return { url, key }
}

/** Count how many requests this email made in the last 24h (rolling window). */
async function countRecentRequests(email: string): Promise<number> {
  const { url, key } = getSupabaseConfig()
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const params = new URLSearchParams({
    select: 'id',
    email: `eq.${email}`,
    created_at: `gte.${since}`,
  })

  const response = await fetch(`${url}/rest/v1/download_link_requests?${params}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'count=exact',
      Range: '0-0',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Supabase count error: ${response.status}`)
  }

  // Content-Range: "0-0/N" (or "*/N" when empty) → N is the exact count.
  const contentRange = response.headers.get('content-range') || ''
  const total = contentRange.split('/')[1]
  return total ? parseInt(total, 10) : 0
}

/** Insert the request row and return its id. */
async function insertRequest(email: string, locale: string): Promise<string | null> {
  const { url, key } = getSupabaseConfig()
  const response = await fetch(`${url}/rest/v1/download_link_requests`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ email, locale, source: 'mobile_email_link' }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Supabase insert error: ${response.status} ${errorText}`)
  }

  const rows: { id: string }[] = await response.json()
  return rows[0]?.id ?? null
}

/** Mark the stored request as actually emailed (only after Resend succeeds). */
async function markEmailSent(id: string): Promise<void> {
  const { url, key } = getSupabaseConfig()
  const response = await fetch(
    `${url}/rest/v1/download_link_requests?id=eq.${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        apikey: key,
        Authorization: `Bearer ${key}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({ email_sent: true }),
    }
  )
  if (!response.ok) {
    // The email DID go out; a failed flag update should not fail the request.
    console.error('Failed to mark download_link_request as sent:', response.status)
  }
}

/**
 * Resolve the download links at send time from the backend's latest releases.
 * The newest release can be platform-specific (e.g. a Windows-only patch), so
 * we pick the latest release that actually ships builds for each platform,
 * mirroring what CTASection does on the landing.
 * Links ALWAYS go through the tracked backend route so downloads are counted.
 */
async function resolveDownloadLinks(
  locale: DownloadLinkLocale
): Promise<{ version: string; links: DownloadLinkEntry[] } | null> {
  const response = await fetch(`${BACKEND_URL}/api/releases/latest?limit=5`, {
    cache: 'no-store',
  })
  if (!response.ok) return null

  const data: { releases?: BackendRelease[] } = await response.json()
  const releases = data.releases || []
  if (releases.length === 0) return null

  const macRelease = releases.find(
    (r) => r.downloads?.['darwin-arm64'] || r.downloads?.['darwin-x64']
  )
  const winRelease = releases.find(
    (r) => r.downloads?.['win32-x64'] || r.downloads?.['win32-arm64']
  )

  const trackedUrl = (version: string, platform: string) =>
    `${BACKEND_URL}/api/releases/download/${version}/${platform}`

  const es = locale === 'es'
  const links: DownloadLinkEntry[] = []

  if (macRelease?.downloads?.['darwin-arm64']) {
    links.push({
      label: 'macOS Apple Silicon',
      description: 'M1, M2, M3, M4',
      url: trackedUrl(macRelease.version, 'silicon'),
    })
  }
  if (macRelease?.downloads?.['darwin-x64']) {
    links.push({
      label: 'macOS Intel',
      description: es ? 'Procesadores Intel' : 'Intel processors',
      url: trackedUrl(macRelease.version, 'intel'),
    })
  }
  if (winRelease?.downloads?.['win32-x64']) {
    links.push({
      label: 'Windows x64',
      description: 'Intel / AMD 64-bit',
      url: trackedUrl(winRelease.version, 'windows-x64'),
    })
  }
  if (winRelease?.downloads?.['win32-arm64']) {
    links.push({
      label: 'Windows ARM64',
      description: es ? 'Dispositivos ARM' : 'ARM devices',
      url: trackedUrl(winRelease.version, 'windows-arm64'),
    })
  }

  if (links.length === 0) return null

  const version = macRelease?.version || winRelease?.version || releases[0].version
  return { version, links }
}

/** Best-effort Telegram ping so demand is visible; never fails the request. */
async function notifyLandingEvent(email: string, locale: string): Promise<void> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    await fetch(`${BACKEND_URL}/api/notifications/landing-event`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'mobile_download_link_request',
        data: { email, locale },
      }),
      signal: controller.signal,
    })
    clearTimeout(timeout)
  } catch (err) {
    console.error('Telegram notification failed:', err)
  }
}

interface ResendSendResponse {
  id: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null)

    const rawEmail = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''
    const locale: DownloadLinkLocale = body?.locale === 'es' ? 'es' : 'en'

    if (!rawEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    if (rawEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json({ error: 'Email is too long' }, { status: 400 })
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(rawEmail)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Rate limit: max 3 requests per email per day, backed by Supabase.
    // (Per-IP in-memory counters are useless on serverless: each invocation
    // can land on a fresh instance, so the state must live in the database.)
    const recentCount = await countRecentRequests(rawEmail)
    if (recentCount >= MAX_SENDS_PER_DAY) {
      return NextResponse.json(
        { error: 'rate_limited', message: 'Too many requests for this email today' },
        { status: 429 }
      )
    }

    // Store the request (this is the demand signal we want to measure).
    const requestId = await insertRequest(rawEmail, locale)

    // Telegram visibility (awaited with timeout; failure is non-fatal).
    await notifyLandingEvent(rawEmail, locale)

    // ⛔ APPROVAL GATE (see header comment): no real email unless the flag is
    // exactly 'true'. Everything above (validation, rate limit, stored row,
    // Telegram ping) already happened.
    if (process.env.DOWNLOAD_LINK_EMAIL_ENABLED !== 'true') {
      return NextResponse.json({ queued: true, emailSent: false }, { status: 200 })
    }

    // Resolve the latest version + tracked download links at send time.
    const resolved = await resolveDownloadLinks(locale)
    if (!resolved) {
      console.error('download-link: could not resolve latest release downloads')
      return NextResponse.json(
        { error: 'Downloads temporarily unavailable' },
        { status: 503 }
      )
    }

    const { subject, html, text } = renderDownloadLinkEmail({
      locale,
      version: resolved.version,
      links: resolved.links,
    })

    // Awaited send (Vercel serverless kills pending promises after respond).
    const result = await resendPost<ResendSendResponse>({
      path: '/emails',
      body: {
        from: FROM_ADDRESS,
        to: [rawEmail],
        subject,
        html,
        text,
      },
    })

    if (requestId) {
      await markEmailSent(requestId)
    }

    return NextResponse.json(
      { queued: true, emailSent: true, id: result.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in download-link API route:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
