import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  parseTrendDays,
  type UsageTrend,
} from '@/app/(dashboard)/dashboard/users/users-activity'

// One minute is fresh enough for "connected now" and keeps reloads off the database.
const loadTrend = unstable_cache(async (excludedUserIds: string[], days: number) => supabaseRpc<UsageTrend>({
  signal: AbortSignal.timeout(45_000),
  fn: 'user_activity_trend_v1',
  args: { p_excluded_user_ids: excludedUserIds, p_days: days },
}), ['user-activity-trend-v1'], { revalidate: 60 })

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => null)
    const excludedUserIds = parseExcludedUserIds(body?.excluded_user_ids)
    const days = parseTrendDays(body?.days)
    if (excludedUserIds === null || days === null) {
      return NextResponse.json({ error: 'Invalid exclusions or range' }, { status: 400 })
    }
    return NextResponse.json(await loadTrend([...new Set(excludedUserIds)].sort(), days))
  } catch (err) {
    console.error('Failed to load usage trend:', err)
    return NextResponse.json({ error: 'Failed to load usage trend' }, { status: 500 })
  }
}
