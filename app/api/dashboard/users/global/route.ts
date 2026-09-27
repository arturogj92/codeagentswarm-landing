import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseExcludedUserIds,
  parseFeatureWindowDays,
  parseGlobalWindowDays,
  type UserGlobalAction,
  type UserFeatureAdoption,
  type MobileRelayAdoption,
  type UserGlobalMetrics,
} from '@/app/(dashboard)/dashboard/users/users-activity'

const loadGlobalMetrics = unstable_cache(async (
  excludedUserIds: string[], windowDays: number, featureWindowDays: number,
) => {
  const signal = AbortSignal.timeout(45_000)
  const args = {
    p_excluded_user_ids: excludedUserIds,
    p_window_days: windowDays,
    p_behavior_window_days: featureWindowDays,
  }
  // Keep expensive scans sequential to avoid competing for database CPU.
  const metrics = await supabaseRpc<Omit<UserGlobalMetrics, 'actions' | 'features' | 'mobile_relay'>>({
    signal,
    fn: 'user_activity_global_v3',
    args,
  })
  const actions = await supabaseRpc<Array<UserGlobalAction & { events: number | string; users: number | string }>>({
    signal,
    fn: 'user_activity_action_catalog_v2',
    args: { p_excluded_user_ids: excludedUserIds, p_window_days: windowDays },
  })
  const features = await supabaseRpc<Array<UserFeatureAdoption & Record<string, number | string | null>>>({
    signal,
    fn: 'user_feature_adoption_v2',
    args: { p_excluded_user_ids: excludedUserIds, p_window_days: featureWindowDays },
  })
  const mobileRelay = await supabaseRpc<MobileRelayAdoption & Record<string, unknown>>({
    signal,
    fn: 'mobile_relay_adoption_v2',
    args: { p_excluded_user_ids: excludedUserIds, p_window_days: featureWindowDays },
  })
  return {
    ...metrics,
    feature_window_days: featureWindowDays,
    mobile_relay: {
      window_days: Number(mobileRelay.window_days),
      requested_accounts: Number(mobileRelay.requested_accounts),
      invited_accounts: Number(mobileRelay.invited_accounts),
      paired_accounts: Number(mobileRelay.paired_accounts),
      connected_accounts: Number(mobileRelay.connected_accounts),
      active_accounts: Number(mobileRelay.active_accounts),
      requests: Array.isArray(mobileRelay.requests) ? mobileRelay.requests : [],
    },
    actions: actions.map((action) => ({
      ...action,
      events: Number(action.events),
      users: Number(action.users),
    })),
    features: features.map((feature) => ({
      ...feature,
      users: Number(feature.users),
      reach_pct: feature.reach_pct === null ? null : Number(feature.reach_pct),
      repeat_users: Number(feature.repeat_users),
      repeat_pct: feature.repeat_pct === null ? null : Number(feature.repeat_pct),
      eligible_users: Number(feature.eligible_users),
      returned_users: Number(feature.returned_users),
      return_30d_pct: feature.return_30d_pct === null ? null : Number(feature.return_30d_pct),
      baseline_return_30d_pct: feature.baseline_return_30d_pct === null ? null : Number(feature.baseline_return_30d_pct),
      return_lift_pp: feature.return_lift_pp === null ? null : Number(feature.return_lift_pp),
    })),
  } satisfies UserGlobalMetrics
}, ['user-activity-global-v3'], { revalidate: 30, tags: ['user-activity-global'] })

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => null)
    const excludedUserIds = parseExcludedUserIds(body?.excluded_user_ids)
    const windowDays = parseGlobalWindowDays(body?.window_days)
    const featureWindowDays = parseFeatureWindowDays(body?.feature_window_days)
    if (excludedUserIds === null || windowDays === null || featureWindowDays === null) {
      return NextResponse.json(
        { error: 'Invalid exclusions or window' },
        { status: 400 },
      )
    }

    // The cache key includes both windows and the complete exclusion set.
    return NextResponse.json(await loadGlobalMetrics(
      [...new Set(excludedUserIds)].sort(), windowDays, featureWindowDays,
    ))
  } catch (err) {
    console.error('Failed to load global user activity:', err)
    return NextResponse.json(
      { error: 'Failed to load global activity' },
      { status: 500 },
    )
  }
}
