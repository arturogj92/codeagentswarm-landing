import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  parseFeatureWindowDays,
  type UserActivityCharts,
} from '@/app/(dashboard)/dashboard/users/users-activity'

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => null)
    const excludedUserIds = parseExcludedUserIds(body?.excluded_user_ids)
    const windowDays = parseFeatureWindowDays(body?.window_days)
    if (excludedUserIds === null || windowDays === null) {
      return NextResponse.json({ error: 'Invalid exclusions or window' }, { status: 400 })
    }
    const charts = await supabaseRpc<UserActivityCharts>({
      fn: 'user_activity_charts_v1',
      args: { p_excluded_user_ids: excludedUserIds, p_window_days: windowDays },
    })
    return NextResponse.json(charts)
  } catch (err) {
    console.error('Failed to load user charts:', err)
    return NextResponse.json({ error: 'Failed to load user charts' }, { status: 500 })
  }
}
