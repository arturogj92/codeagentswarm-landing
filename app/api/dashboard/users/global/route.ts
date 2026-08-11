import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  parseGlobalWindowDays,
  type UserGlobalAction,
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
    const windowDays = parseGlobalWindowDays(body?.window_days)
    if (excludedUserIds === null || windowDays === null) {
      return NextResponse.json(
        { error: 'Invalid exclusions or window; allowed windows are 1, 7, 30 and 180 days' },
        { status: 400 },
      )
    }

    const args = { p_excluded_user_ids: excludedUserIds, p_window_days: windowDays }
    const [metrics, actions] = await Promise.all([
      supabaseRpc<Omit<UserGlobalMetrics, 'actions'>>({ fn: 'user_activity_global_v2', args }),
      supabaseRpc<Array<UserGlobalAction & { events: number | string; users: number | string }>>({
        fn: 'user_activity_action_catalog_v2',
        args,
      }),
    ])
    return NextResponse.json({
      ...metrics,
      actions: actions.map((action) => ({
        ...action,
        events: Number(action.events),
        users: Number(action.users),
      })),
    } satisfies UserGlobalMetrics)
  } catch (err) {
    console.error('Failed to load global user activity:', err)
    return NextResponse.json(
      { error: 'Failed to load global activity' },
      { status: 500 },
    )
  }
}
