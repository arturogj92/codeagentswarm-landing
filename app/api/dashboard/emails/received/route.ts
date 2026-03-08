import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { resendGet } from '@/lib/resend-client'
import type { ResendReceivedEmailListResponse } from '@/types/email'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const url = new URL(request.url)
    const params: Record<string, string> = {}

    const limit = url.searchParams.get('limit')
    if (limit) params.limit = limit

    const after = url.searchParams.get('after')
    if (after) params.after = after

    const data = await resendGet<ResendReceivedEmailListResponse>({
      path: '/emails/receiving',
      params,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching received emails:', error)
    return NextResponse.json(
      { error: 'Failed to fetch received emails' },
      { status: 500 }
    )
  }
}
