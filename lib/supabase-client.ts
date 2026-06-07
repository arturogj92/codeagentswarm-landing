const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

function getConfig(useServiceRole: boolean) {
  if (!SUPABASE_URL) {
    throw new Error('SUPABASE_URL env var is required')
  }

  // The service role key bypasses RLS and must NEVER reach the client. Only use
  // it from server-side, auth-gated routes (e.g. reading platform_waitlist,
  // which intentionally has no anon SELECT policy so the public anon key can't
  // dump everyone's email).
  const key = useServiceRole ? SUPABASE_SERVICE_ROLE_KEY : SUPABASE_ANON_KEY
  if (!key) {
    throw new Error(
      useServiceRole
        ? 'SUPABASE_SERVICE_ROLE_KEY env var is required'
        : 'SUPABASE_ANON_KEY env var is required'
    )
  }

  return { url: SUPABASE_URL, key }
}

interface SupabaseQueryOptions {
  table: string
  select?: string
  order?: string
  limit?: number
  /** Read with the service role key (server-side only). Defaults to anon. */
  useServiceRole?: boolean
}

export async function supabaseQuery<T>(options: SupabaseQueryOptions): Promise<T[]> {
  const { table, select = '*', order, limit, useServiceRole = false } = options
  const { url, key } = getConfig(useServiceRole)

  const params = new URLSearchParams({ select })
  if (order) params.set('order', order)
  if (limit) params.set('limit', String(limit))

  const response = await fetch(`${url}/rest/v1/${table}?${params}`, {
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Supabase query error: ${response.status}`)
  }

  return response.json()
}
