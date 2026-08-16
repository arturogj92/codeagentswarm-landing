import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  parseGlobalWindowDays,
  type UserGlobalAction,
  type UserFeatureAdoption,
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
    // ponytail: serialize the scans to stay under Supabase's statement timeout;
    // merge the rollups into one RPC if dashboard latency becomes a problem.
    const metrics = await supabaseRpc<Omit<UserGlobalMetrics, 'actions' | 'features'>>({
      fn: 'user_activity_global_v2',
      args,
    })
    const actions = await supabaseRpc<Array<UserGlobalAction & { events: number | string; users: number | string }>>({
      fn: 'user_activity_action_catalog_v2',
      args,
    })
    const features = await supabaseRpc<Array<UserFeatureAdoption & Record<string, number | string | null>>>({
      fn: 'user_feature_adoption_v1',
      args: { p_excluded_user_ids: excludedUserIds },
    })
    return NextResponse.json({
      ...metrics,
      actions: actions.map((action) => ({
        ...action,
        events: Number(action.events),
        users: Number(action.users),
      })),
      features: features.map((feature) => ({
        ...feature,
        users: Number(feature.users),
        reach_pct: Number(feature.reach_pct),
        repeat_users: Number(feature.repeat_users),
        repeat_pct: Number(feature.repeat_pct),
        eligible_users: Number(feature.eligible_users),
        returned_users: Number(feature.returned_users),
        return_30d_pct: feature.return_30d_pct === null ? null : Number(feature.return_30d_pct),
        baseline_return_30d_pct: feature.baseline_return_30d_pct === null ? null : Number(feature.baseline_return_30d_pct),
        return_lift_pp: feature.return_lift_pp === null ? null : Number(feature.return_lift_pp),
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
