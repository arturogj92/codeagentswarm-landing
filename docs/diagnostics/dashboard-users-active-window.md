---
title: Users dashboard showed fewer active users than its own charts
summary: The lifecycle cards now use rolling 7- and 30-day windows ending now, the same as the global metrics.
kind: diagnostic
status: current
updated: 2026-10-05
files: ["app/(dashboard)/dashboard/users/users-activity.ts", "app/(dashboard)/dashboard/users/UsersActivityClient.tsx"]
---

## Symptom

On 2026-10-05 at 07:00 UTC the "Active in 7d" card said 86 while `user_activity_global_v2(…, 7)` and
the charts said 95. "Active in 30d" said 174 against 172.

## Root cause

`getLifecycle()` used `days_since_last`, the number of UTC calendar days since the last activity.
`< 7` meant "from six calendar days ago until today", so early in the UTC day the window was barely
six days long. The 12 accounts last seen exactly seven calendar days earlier dropped out, although
most of them were inside the last 168 hours. The 30-day card used `<= 30`, a window of 31
calendar days, so it ran slightly high instead. The global RPCs already compare
`last_seen_at >= now() - N days`.

## Fix

`getLifecycle(last_active, now)` compares the last activity timestamp with now: active within 7×24
hours, inactive within 30×24 hours, dormant after that. Every card, filter and badge goes through
it, so the cards and the charts now report the same windows. `days_since_last` is still used only to
sort by recency.
