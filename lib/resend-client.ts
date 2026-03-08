const RESEND_BASE_URL = 'https://api.resend.com'

function getApiKey(): string {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY env var is not set')
  return key
}

interface ResendRequestOptions {
  path: string
  params?: Record<string, string>
}

export async function resendGet<T>({ path, params }: ResendRequestOptions): Promise<T> {
  const url = new URL(`${RESEND_BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value)
    })
  }

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Resend API error: ${response.status}`)
  }

  return response.json()
}
