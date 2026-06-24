/**
 * Thin client for the Railway backend's `/api/admin/outreach/*` endpoints.
 * Centralises the admin auth header so route handlers don't have to.
 */

const BACKEND_URL =
  process.env.OUTREACH_BACKEND_URL ||
  'https://codeagentswarm-backend-production.up.railway.app'

function getAdminSecret(): string {
  const s = process.env.ADMIN_SECRET
  if (!s) throw new Error('ADMIN_SECRET env var not set in landing')
  return s
}

async function call<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': getAdminSecret(),
      ...(init.headers || {}),
    },
  })
  const ct = res.headers.get('content-type') || ''
  const body = ct.includes('application/json') ? await res.json() : await res.text()
  if (!res.ok) {
    const msg = typeof body === 'string' ? body : (body as any)?.error || `HTTP ${res.status}`
    throw new Error(msg)
  }
  return body as T
}

export interface FunnelStats {
  since_days: number
  stats: Record<string, { sent: number; replied: number; dry_run: number }>
}

export interface UserStatus {
  user_id: string
  email: string
  name: string | null
  user_created_at: string
  is_excluded: boolean
  e1_quick_question: { template_slug: string; sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  e2_we_miss_you: { template_slug: string; sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  e3_follow_up: { template_slug: string; sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
}

export interface SimulateResult {
  as_of_date: string
  templates: Record<string, Array<{
    user_id: string
    email: string
    name: string | null
    reason: string | null
  }>>
}

export interface RunReport {
  asOfDate: string
  dryRun: boolean
  templates: Record<string, { candidates: number; sent: number; skipped: number; failed: number }>
}

export interface Exclusion {
  user_id: string
  reason: string
  excluded_by: string
  created_at: string
  users: { email: string; name: string | null }
}

export const outreachBackend = {
  funnel: (days: number) =>
    call<FunnelStats>(`/api/admin/outreach/funnel?days=${days}`),

  users: () =>
    call<{ users: UserStatus[] }>(`/api/admin/outreach/users`),

  simulate: (asOfDate?: string) =>
    call<SimulateResult>(`/api/admin/outreach/simulate`, {
      method: 'POST',
      body: JSON.stringify(asOfDate ? { as_of_date: asOfDate } : {}),
    }),

  runNow: (dryRun: boolean) =>
    call<RunReport>(`/api/admin/outreach/run-now`, {
      method: 'POST',
      body: JSON.stringify({ dry_run: dryRun }),
    }),

  listExclusions: () =>
    call<{ exclusions: Exclusion[] }>(`/api/admin/outreach/exclusions`),

  addExclusion: (userId: string, reason: string) =>
    call(`/api/admin/outreach/exclusions`, {
      method: 'POST',
      body: JSON.stringify({ user_id: userId, reason }),
    }),

  removeExclusion: (userId: string) =>
    call(`/api/admin/outreach/exclusions/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
    }),
}
