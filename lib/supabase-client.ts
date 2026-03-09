const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

function getConfig() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY env vars are required')
  }
  return { url: SUPABASE_URL, key: SUPABASE_ANON_KEY }
}

interface SupabaseQueryOptions {
  table: string
  select?: string
  order?: string
  limit?: number
}

export async function supabaseQuery<T>(options: SupabaseQueryOptions): Promise<T[]> {
  const { url, key } = getConfig()
  const { table, select = '*', order, limit } = options

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
