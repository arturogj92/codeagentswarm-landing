import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { resendGet } from '@/lib/resend-client'
import type { ResendReceivedEmail } from '@/types/email'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const data = await resendGet<ResendReceivedEmail>({
      path: `/emails/receiving/${id}`,
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching received email detail:', error)
    return NextResponse.json(
      { error: 'Failed to fetch received email' },
      { status: 500 }
    )
  }
}
