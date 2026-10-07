import assert from 'node:assert/strict'
import test from 'node:test'

import {
  EMPTY_USER_FILTERS,
  agentLabel,
  buildAgentTrend,
  compareAppVersions,
  filterUsers,
  getLifecycle,
  parseTrendDays,
  stickinessPct,
  trendScale,
  mainButtonUsage,
  normalizeAgent,
  parseExcludedUserIds,
  parseFeatureWindowDays,
  parseGlobalWindowDays,
  parseRealtimeWindowHours,
  primaryAgentSignal,
  realtimeActionBreakdown,
  workspaceModeCopy,
  summarizeCohortHealth,
  summarizeUsers,
  type UserActivityRow,
  type RealtimeActivitySnapshot,
  type UserCohortHealth,
  type UserActivityCharts,
} from './users-activity.ts'

test('Pi, Devin and Muse have distinct identities and daily series', () => {
  const agents = ['pi', 'devin', 'muse']
  assert.deepEqual(['Pi_coding-agent', 'Devin CLI', 'Muse Code'].map(normalizeAgent), agents)
  assert.deepEqual(agents.map(agentLabel), ['Pi', 'Devin', 'Muse Code'])
  assert.equal(normalizeAgent('api'), 'api')
  const trend = buildAgentTrend({
    generated_at: '2026-09-28T12:00:00Z', window_days: 7,
    users_by_platform: [], downloads_7d: [],
    agent_daily: agents.map((agent, index) => ({ day: '2026-09-28', agent, sessions: index + 1, users: 1 })),
  })
  assert.deepEqual(trend.series.map(({ agent }) => agent), ['devin', 'muse', 'pi'])
  assert.deepEqual(trend.series.map(({ points }) => points.at(-1)?.sessions), [2, 3, 1])
})

test('agent lines keep UTC dates, zero-activity days, and unique-user counts separate from sessions', () => {
  const charts: UserActivityCharts = {
    generated_at: '2026-03-30T00:05:00Z',
    window_days: 7,
    users_by_platform: [],
    downloads_7d: [],
    agent_daily: [
      { day: '2026-03-29', agent: 'codex', sessions: 12, users: 2 },
      { day: '2026-03-24', agent: 'claude', sessions: 3, users: 1 },
      { day: '2026-03-30', agent: 'codex', sessions: 1, users: 1 },
      { day: '2026-03-23', agent: 'claude', sessions: 99, users: 10 },
    ],
  }
  const trend = buildAgentTrend(charts)
  assert.deepEqual(trend.days, ['2026-03-24', '2026-03-25', '2026-03-26', '2026-03-27', '2026-03-28', '2026-03-29', '2026-03-30'])
  assert.deepEqual(trend.series.map(({ agent }) => agent), ['claude', 'codex'])
  assert.deepEqual(trend.series[0].points.map(({ sessions }) => sessions), [3, 0, 0, 0, 0, 0, 0])
  assert.deepEqual(trend.series[1].points.map(({ users }) => users), [0, 0, 0, 0, 0, 2, 1])
  assert.equal(trend.series[1].points[5].sessions, 12)
  assert.deepEqual(buildAgentTrend({ ...charts, agent_daily: [] }).series, [])
  assert.equal(buildAgentTrend({ ...charts, generated_at: '2026-03-30T00:05:00+02:00' }).days.at(-1), '2026-03-29')
})

test('main buttons keep their product order and exact catalog counts', () => {
  const buttons = [
    ['nav_kanban', 'Open Kanban'],
    ['nav_create_task', 'Create task'],
    ['nav_history', 'Conversation history'],
    ['nav_quick_switcher', 'Search open agents'],
    ['nav_git_status', 'Git'],
    ['navbar_shortcut_open', 'Open shortcut'],
    ['button_app_add_terminal_btn', 'New agent'],
    ['navbar_add_shortcut', 'Add shortcut'],
    ['button_app_new_tab_btn', 'New agent (sidebar)'],
    ['settings_open', 'Settings'],
  ]
  const catalog = buttons.map(([action], index) => ({ action, events: index * 10, users: index }))
  assert.deepEqual(mainButtonUsage([...catalog].reverse()), buttons.map(([action, label], index) => ({
    action, label, events: index * 10, users: index,
  })))
  assert.equal(catalog[0].events, 0)
})

test('missing button clicks stay unknown instead of borrowing success or shortcut events', () => {
  const rows = mainButtonUsage([
    { action: 'nav_history', events: 4, users: 2 },
    { action: 'conversation_history_opened', events: 20, users: 6 },
    { action: 'terminal_session_launch', events: 50, users: 9 },
    { action: 'navbar_shortcut_keyboard', events: 8, users: 3 },
  ])
  assert.equal(rows.length, 10)
  assert.deepEqual(rows[2], { action: 'nav_history', label: 'Conversation history', events: 4, users: 2 })
  assert.equal(rows.filter(({ events, users }) => events === null && users === null).length, 9)
  assert.equal(mainButtonUsage([]).length, 10)
})

function user(overrides: Partial<UserActivityRow> = {}): UserActivityRow {
  return {
    user_id: 'user-1',
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    avatar_url: null,
    provider: 'github',
    subscription_tier: 'pro',
    subscription_status: 'active',
    created_at: '2026-07-25T00:00:00.000Z',
    last_login: null,
    total_events: 10,
    active_days: 3,
    first_active: '2026-07-26',
    last_active: '2026-08-08',
    days_since_last: 0,
    current_streak: 2,
    longest_streak: 4,
    most_used_agent: 'claude-code',
    most_launched_agent: null,
    agent_launches: 0,
    avg_terminal_slots: 2.4,
    max_terminal_slots: 4,
    terminal_metric_source: 'tab_slots',
    last7: [false, false, true, false, true, true, true],
    work_periods_7d: 4,
    work_periods_30d: 9,
    last_app_version: '1.4.0',
    activation_at: '2026-07-26T00:00:00.000Z',
    integration_providers: ['github'],
    outreach_status: 'eligible',
    ...overrides,
  }
}

test('real-time action breakdown stays optional and resolves the matching product area', () => {
  const snapshot = {
    action_breakdown: [{
      action: 'terminal_controls',
      actions: [{ label: 'Minimize terminal', events: 4 }],
    }],
  } as RealtimeActivitySnapshot

  assert.deepEqual(realtimeActionBreakdown(snapshot, 'terminal_controls'), [
    { label: 'Minimize terminal', events: 4 },
  ])
  assert.deepEqual(realtimeActionBreakdown(snapshot, 'chat'), [])
  assert.deepEqual(realtimeActionBreakdown({} as RealtimeActivitySnapshot, 'terminal_controls'), [])
})

test('lifecycle uses rolling windows ending now, not calendar days', () => {
  const now = Date.parse('2026-10-05T07:00:00.000Z')
  const ago = (hours: number) => new Date(now - hours * 3_600_000).toISOString()
  assert.equal(getLifecycle(null, now), 'no-tracked')
  assert.equal(getLifecycle('not a date', now), 'no-tracked')
  assert.equal(getLifecycle(ago(0), now), 'active')
  // Seven calendar days back but inside the last 168 hours: still active.
  assert.equal(getLifecycle('2026-09-28T09:00:00.000Z', now), 'active')
  assert.equal(getLifecycle(ago(7 * 24), now), 'active')
  assert.equal(getLifecycle(ago(7 * 24 + 1), now), 'inactive')
  assert.equal(getLifecycle(ago(30 * 24), now), 'inactive')
  assert.equal(getLifecycle(ago(30 * 24 + 1), now), 'dormant')
})

test('summary reports the six dashboard metrics without inventing trends', () => {
  const users = [
    user({ user_id: 'active', last_active: '2026-08-06T12:00:00.000Z', days_since_last: 2 }),
    user({ user_id: 'inactive', last_active: '2026-07-25T12:00:00.000Z', days_since_last: 14, activation_at: null, created_at: '2026-06-01T00:00:00.000Z' }),
    user({ user_id: 'dormant', last_active: '2026-06-24T12:00:00.000Z', days_since_last: 45, created_at: '2026-05-01T00:00:00.000Z' }),
    user({ user_id: 'none', days_since_last: null, last_active: null, total_events: 0 }),
  ]

  assert.deepEqual(summarizeUsers(users, new Date('2026-08-08T12:00:00.000Z')), {
    total: 4,
    new30: 2,
    active7: 1,
    active30: 2,
    activated: 3,
    inactive: 1,
    dormant: 1,
    noTracked: 1,
  })
  assert.equal(
    summarizeUsers([user({ created_at: null })], new Date('2026-08-08T12:00:00.000Z')).new30,
    0,
  )
})

test('filters combine search, lifecycle, normalized agent and operational dimensions', () => {
  const users = [
    user(),
    user({
      user_id: 'user-2',
      name: 'Grace Hopper',
      email: 'grace@example.com',
      last_active: '2026-07-27T12:00:00.000Z',
      days_since_last: 12,
      most_used_agent: 'Open_Code CLI',
      activation_at: null,
      last_app_version: '1.3.2',
      provider: 'google',
      subscription_tier: 'free',
      integration_providers: ['linear'],
      outreach_status: 'contacted',
    }),
  ]

  const result = filterUsers(users, {
    ...EMPTY_USER_FILTERS,
    query: 'grace',
    lifecycle: 'inactive',
    agent: 'opencode',
    activation: 'not-activated',
    version: '1.3.2',
    provider: 'google',
    plan: 'free',
    integration: 'linear',
    outreach: 'contacted',
  }, Date.parse('2026-08-08T12:00:00.000Z'))

  assert.deepEqual(result.map((entry) => entry.user_id), ['user-2'])
  assert.equal(normalizeAgent('Gemini CLI'), 'gemini')
  assert.equal(normalizeAgent('Codex-CLI'), 'codex')
  assert.equal(normalizeAgent('Cursor Agent'), 'cursor')
})

test('none integration and unknown version have explicit filter semantics', () => {
  const users = [
    user({ user_id: 'known', last_app_version: '1.4.0', integration_providers: ['github'] }),
    user({ user_id: 'unknown', last_app_version: null, integration_providers: [] }),
  ]

  assert.deepEqual(
    filterUsers(users, { ...EMPTY_USER_FILTERS, integration: 'none' }).map((entry) => entry.user_id),
    ['unknown'],
  )
  assert.deepEqual(
    filterUsers(users, { ...EMPTY_USER_FILTERS, version: 'unknown' }).map((entry) => entry.user_id),
    ['unknown'],
  )
})

test('real launches outrank the historical selector signal', () => {
  const historical = user({ most_used_agent: 'codex cli' })
  const measured = user({ most_used_agent: 'codex cli', most_launched_agent: 'claude', agent_launches: 7 })

  assert.deepEqual(primaryAgentSignal(historical), { agent: 'codex', source: 'selections' })
  assert.deepEqual(primaryAgentSignal(measured), { agent: 'claude', source: 'launches' })
  assert.deepEqual(
    filterUsers([historical, measured], { ...EMPTY_USER_FILTERS, agent: 'claude' }).map((entry) => entry.user_id),
    ['user-1'],
  )
})

test('global exclusions accept only a bounded, deduplicated UUID list', () => {
  const id = '00000000-0000-4000-8000-000000000001'
  assert.deepEqual(parseExcludedUserIds([id, id]), [id])
  assert.equal(parseExcludedUserIds(['not-a-user']), null)
  assert.equal(parseExcludedUserIds(new Array(251).fill(id)), null)
})

test('global windows accept only the four dashboard periods', () => {
  assert.equal(parseGlobalWindowDays(undefined), 7)
  assert.equal(parseGlobalWindowDays(1), 1)
  assert.equal(parseGlobalWindowDays(7), 7)
  assert.equal(parseGlobalWindowDays(30), 30)
  assert.equal(parseGlobalWindowDays(180), 180)
  assert.equal(parseGlobalWindowDays(0), null)
  assert.equal(parseGlobalWindowDays('7'), null)
})

test('real-time windows accept only the five supported hourly ranges', () => {
  assert.equal(parseRealtimeWindowHours(undefined), 1)
  assert.equal(parseRealtimeWindowHours('0.5'), 0.5)
  assert.equal(parseRealtimeWindowHours('24'), 24)
  assert.equal(parseRealtimeWindowHours('2'), null)
  assert.equal(parseRealtimeWindowHours('anything'), null)
})

test('feature windows default to 30 days and reject unsupported periods', () => {
  assert.equal(parseFeatureWindowDays(undefined), 30)
  assert.equal(parseFeatureWindowDays(7), 7)
  assert.equal(parseFeatureWindowDays(30), 30)
  assert.equal(parseFeatureWindowDays(90), 90)
  assert.equal(parseFeatureWindowDays(180), 180)
  assert.equal(parseFeatureWindowDays(1), null)
  assert.equal(parseFeatureWindowDays('30'), null)
})

test('app versions sort numerically and keep unknown values last', () => {
  const versions = ['1.10.0', null, '2.0.0', '1.4.4']
  assert.deepEqual([...versions].sort((a, b) => compareAppVersions(a, b, 1)), ['1.4.4', '1.10.0', '2.0.0', null])
  assert.deepEqual([...versions].sort((a, b) => compareAppVersions(a, b, -1)), ['2.0.0', '1.10.0', '1.4.4', null])
})

test('cohort summary separates audience growth from weakening engagement', () => {
  const health = {
    mau_change: 20,
    second_terminal_delta_pp: -4,
    repeat_delta_pp: -3,
    weekly_stickiness_delta_pp: -2,
    return_delta_pp: 1,
  } as UserCohortHealth

  assert.equal(
    summarizeCohortHealth(health).title,
    'Audience growth is accelerating; engagement needs attention.',
  )
})

test('workspace mode copy does not present manual selections as real usage', () => {
  assert.deepEqual(workspaceModeCopy('selection_only', 12, 2), {
    title: 'Manual mode changes',
    description: 'Early preference signal across Grid, Tabs and List.',
    leaderLabel: 'Most selected',
    sample: '12 manual changes from 2 users. Default modes are missing, so this is not usage share yet.',
  })

  assert.deepEqual(workspaceModeCopy('exact', 42, 9), {
    title: 'Workspace mode use',
    description: 'Share of tracked terminal launches across Grid, Tabs and List.',
    leaderLabel: 'Most used',
    sample: '42 tracked launches from 9 users. Default modes count.',
  })
})

test('usage trend helpers accept only the offered ranges and round stickiness', () => {
  assert.equal(parseTrendDays(undefined), 30)
  assert.equal(parseTrendDays(14), 14)
  assert.equal(parseTrendDays(90), null)
  assert.equal(stickinessPct({ daily_average: 48.3, active_7d: 92 }), 53)
  assert.equal(stickinessPct({ daily_average: null, active_7d: 92 }), null)
  assert.equal(stickinessPct({ daily_average: 4, active_7d: 0 }), null)
  // Three whole steps: 60 → 40/20, 150 → 100/50; never below 30.
  assert.equal(trendScale([57, 12]), 60)
  assert.equal(trendScale([131]), 150)
  assert.equal(trendScale([]), 30)
})
