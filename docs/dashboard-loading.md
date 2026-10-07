# Users dashboard loading

Production logs on 2026-09-27 showed statement timeouts while overview and
operational metrics ran alongside global metrics (global mean 11.1s, max 25.3s).

Deploy backend migration `054_dashboard_query_performance.sql` and the landing
changes together. The migration preserves RPC signatures and existing grants;
it changes no event data. Index creation briefly blocks event writes, so apply
in a quiet period. Overview and operational RPCs get a scoped 30-second budget.

Overview aggregates dates before calculating streaks, counts recent period ends,
and looks up each user's latest version through the existing timestamp index.
Global cohort checks use indexed per-user lookups and retain only needed context
fields. Partial indexes cover terminal-slot and activation calculations.

Authenticated responses are cached server-side for 30 seconds, with exclusion
sets and both windows in the global key. Next serves expired entries while
revalidating in the background; `generated_at` remains the snapshot timestamp.
Invitation updates invalidate the global cache immediately. No public HTTP
response caching is enabled.

Validation:

- Landing: `npm run test:users`, `node --test lib/dashboard-loading.test.cjs`,
  `npm run lint`, `npx tsc --noEmit --incremental false`.
- SQL: see commands in backend `tests/dashboard-query-performance.cjs`.
  It compares original and optimized metrics in an in-memory PostgreSQL with
  window boundaries, exclusions, null dates, ties and empty datasets.

Rollback: apply backend `migrations/rollback/054_dashboard_query_performance.sql`.
It preserves the exact production definitions captured before the change, including
SQL optimizations that were already deployed outside the numbered migrations.
The new indexes can remain in place. The previous web deployment is
`dpl_2EZ6Cg4h8AvPNEnZfRvZ961D6s2y` (Vercel instant rollback).

Production preflight on 2026-09-27 compared all 319 users and the default global
metrics against the candidate SQL with identical results. The migration was
applied with a 2-second lock wait and a 60-second statement limit. RPC permissions
remained service-role-only. The isolated production build passed compilation,
type checking and lint; all 17 landing checks and SQL regression checks passed.
Cold authenticated requests in that build returned HTTP 200: overview 4.76s,
global 9.94s. Final domain checks are recorded in the deployment report.

## 2026-10-08: charts and usage trend cancelled by the 8-second API limit

The API role (`authenticator`) has `statement_timeout = 8s`. Overview, operational and global v3
set their own 30-second budget; `user_activity_charts_v1` and `user_activity_trend_v1` did not.
Run alone they took 7.4 s and 3.0 s, so next to the other RPCs they were cancelled
("Charts could not load", "Usage trend could not load"); Postgres logged
`canceling statement due to statement timeout`.

Backend migration `061_dashboard_loading.sql`:

- Charts: the OS comes from the plan check, then the sign-in session, and only then from a
  consented click. The per-user click walk (about 2.4 s) now runs only when both are missing
  (a one-time filter; measured 52 ms for the OS part).
- Usage trend: `idx_button_clicks_timestamp_user (timestamp) INCLUDE (user_id) WHERE user_id IS NOT
  NULL` lets the 43-day click-day scan stay in the index instead of visiting about 200k rows.
- Both RPCs get `statement_timeout = 30s`.

The landing caches `/api/dashboard/users/charts` and `/api/dashboard/users/trend` for 60 seconds,
keyed by the sorted exclusion set and the range, like overview and global.
