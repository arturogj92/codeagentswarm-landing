import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  type UserGlobalMetrics,
} from '@/app/(dashboard)/dashboard/users/users-activity'

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => null)
    const excludedUserIds = parseExcludedUserIds(body?.excluded_user_ids)
    if (excludedUserIds === null) {
      return NextResponse.json(
        { error: 'excluded_user_ids must be an array of at most 250 UUIDs' },
        { status: 400 },
      )
    }

    const metrics = await supabaseRpc<UserGlobalMetrics>({
      fn: 'user_activity_global_v1',
      args: { p_excluded_user_ids: excludedUserIds },
    })
    return NextResponse.json(metrics)
  } catch (err) {
    console.error('Failed to load global user activity:', err)
    return NextResponse.json(
      { error: 'Failed to load global activity' },
      { status: 500 },
    )
  }
}
