---
title: Real-time, OS and download cards undercounted users who do not share analytics
summary: The dashboard now counts connected apps from plan checks, takes the OS from the plan check or sign-in, and shows Linux downloads by name.
kind: diagnostic
status: current
updated: 2026-10-07
files: ["app/(dashboard)/dashboard/realtime/RealtimeActivityClient.tsx", "app/(dashboard)/dashboard/users/users-activity.ts", "app/(dashboard)/dashboard/users/UserAnalyticsCharts.tsx", "../codeagentswarm-backend/migrations/059_dashboard_connected_users_and_os.sql", "app/(dashboard)/dashboard/users/UsageTrend.tsx", "app/api/dashboard/users/trend/route.ts", "../codeagentswarm-backend/migrations/060_dashboard_usage_trend.sql"]
---

## Symptom

On 2026-10-06 Real-time activity said 2 active users in the last hour while 23 signed-in apps had
checked their plan. Users by operating system showed 190 of 358 accounts as unknown. Downloads
showed 47 under "Other".

## Root cause

Since desktop 2.4.1 usage analytics is opt-in, so most installs send no clicks. Both cards read
only `button_clicks`. The downloads query mapped only Mac and Windows platforms; every
`linux-*` package (deb and AppImage, x64 and arm64) fell into "Other".

## Fix

Backend migration 059 changes two RPCs:

- `user_activity_realtime_v1` adds `connected_users` (any plan check or click in the range) and
  `connected_now` (last 20 minutes; the app checks every 15 minutes while visible). The
  click-based fields are unchanged and the page labels them "Sharing analytics".
- `user_activity_charts_v1` takes each account's OS from the latest plan check, then a consented
  click, then the user agent of its latest desktop sign-in session, and buckets `linux-*`
  downloads as Linux.

The production realtime body came from the Supabase migration `realtime_user_day_sessions`;
repo migration 052 (action breakdown) was never applied, so 059 starts from the live body and
its rollback restores it exactly.

## Usage trend section (2026-10-07)

The Users page shows a "Usage trend" section under the summary cards, backed by
`user_activity_trend_v1(p_excluded_user_ids, p_days)` (backend migration 060, 14 or 30 days).
It reads the same two signals per account and UTC day (plan-check days and click days) and returns
connected now (20 min), active today, last 24 hours, the average of the last 7 full days,
active in 7 days (rolling), 7+ day streaks, the daily series with sign-ups, and five rolling weeks
split into returning, new, back after a break and left. `coverage_start` is the first service
activity day; the chart marks it because earlier days only counted clicks. The proposal is
`docs/plans/2026-10-07-dashboard-usage-trend-design.html`.

