import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  parseFeatureWindowDays,
  type UserActivityCharts,
} from '@/app/(dashboard)/dashboard/users/users-activity'

// Cached like overview and global: these RPCs compete for database CPU when the page opens.
const loadCharts = unstable_cache(async (excludedUserIds: string[], windowDays: number) => supabaseRpc<UserActivityCharts>({
  signal: AbortSignal.timeout(45_000),
  fn: 'user_activity_charts_v1',
  args: { p_excluded_user_ids: excludedUserIds, p_window_days: windowDays },
}), ['user-activity-charts-v1'], { revalidate: 60 })

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
    return NextResponse.json(await loadCharts([...new Set(excludedUserIds)].sort(), windowDays))
  } catch (err) {
    console.error('Failed to load user charts:', err)
    return NextResponse.json({ error: 'Failed to load user charts' }, { status: 500 })
  }
}
