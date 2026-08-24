import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import type { MobileRelayAccessRequest } from '@/app/(dashboard)/dashboard/users/users-activity'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export async function PATCH(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  const session = token ? await verifyToken(token) : null
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json().catch(() => null)
    const requestId = typeof body?.request_id === 'string' ? body.request_id : ''
    if (!UUID_PATTERN.test(requestId)) {
      return NextResponse.json({ error: 'Invalid request id' }, { status: 400 })
    }

    const invitation = await supabaseRpc<MobileRelayAccessRequest | null>({
      fn: 'mobile_relay_mark_invited_v1',
      args: {
        p_request_id: requestId,
        p_invited_by: typeof session.sub === 'string' ? session.sub : 'dashboard',
      },
    })
    if (!invitation) return NextResponse.json({ error: 'Request not found' }, { status: 404 })
    return NextResponse.json(invitation)
  } catch (error) {
    console.error('Failed to mark Mobile Relay invitation:', error)
    return NextResponse.json({ error: 'Failed to mark invitation' }, { status: 500 })
  }
}
