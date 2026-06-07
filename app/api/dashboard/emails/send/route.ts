import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { resendPost } from '@/lib/resend-client'
import { bodyToHtml, buildInboxPreview, escapeHtmlForAttribute } from '@/lib/email-body-to-html'
import fs from 'fs'
import path from 'path'

const FROM_ADDRESS = 'Arturo from CodeAgentSwarm <hello@codeagentswarm.com>'

// Bulk sends (e.g. the platform waitlist) can be dozens of recipients. Resend
// allows ~2 requests/sec, so we throttle to stay safely under that and avoid
// 429s that would silently drop part of a launch send.
const RATE_LIMIT_MS = 600

// Give the route enough wall-clock time for a throttled bulk send. 60s covers
// ~90 recipients at RATE_LIMIT_MS; split larger sends into separate batches.
export const maxDuration = 60

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

interface Recipient {
  email: string
  name: string
}

interface SendRequest {
  recipients: Recipient[]
  subject: string
  templateSlug: string
  title?: string
  body?: string
}

interface ResendSendResponse {
  id: string
}

function personalizeTemplate(html: string, variables: Record<string, string>): string {
  let result = html
  for (const [key, value] of Object.entries(variables)) {
    result = result.replaceAll(`{{${key}}}`, value)
  }
  return result
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: SendRequest = await request.json()
    const { recipients, subject, templateSlug, title, body: bodyText } = body

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: 'At least one recipient is required' }, { status: 400 })
    }

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
    }

    if (!templateSlug) {
      return NextResponse.json({ error: 'Template is required' }, { status: 400 })
    }

    const sanitizedSlug = templateSlug.replace(/[^a-zA-Z0-9_-]/g, '')
    const filePath = path.join(process.cwd(), 'emails', `${sanitizedSlug}.html`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    const rawHtml = fs.readFileSync(filePath, 'utf-8')

    // Pre-compute substitutions that don't depend on recipient.
    // {{title}} is plain text (lands in <title> and hero) → escape.
    // {{body}} becomes pre-rendered HTML paragraphs (already safe).
    // {{bodyPreview}} is a flattened ~110-char excerpt of the body for the
    // inbox preheader — keeps the inbox preview from duplicating the title.
    const titleHtml = title ? escapeHtmlForAttribute(title) : ''
    const bodyHtml = bodyText ? bodyToHtml(bodyText) : ''
    const bodyPreview = bodyText ? buildInboxPreview(bodyText) : ''

    const results: { email: string; id?: string; error?: string }[] = []

    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i]
      try {
        const html = personalizeTemplate(rawHtml, {
          name: recipient.name || 'there',
          title: titleHtml,
          body: bodyHtml,
          bodyPreview,
        })

        const result = await resendPost<ResendSendResponse>({
          path: '/emails',
          body: {
            from: FROM_ADDRESS,
            to: [recipient.email],
            subject,
            html,
          },
        })

        results.push({ email: recipient.email, id: result.id })
      } catch (err) {
        results.push({
          email: recipient.email,
          error: err instanceof Error ? err.message : 'Failed to send',
        })
      }

      // Throttle between sends (skip the wait after the last recipient).
      if (i < recipients.length - 1) {
        await sleep(RATE_LIMIT_MS)
      }
    }

    const sent = results.filter(r => r.id).length
    const failed = results.filter(r => r.error).length

    return NextResponse.json({ success: true, sent, failed, results })
  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send emails' },
      { status: 500 }
    )
  }
}
