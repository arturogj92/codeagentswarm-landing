import assert from 'node:assert/strict'
import test from 'node:test'

import {
  EMPTY_USER_FILTERS,
  compareAppVersions,
  filterUsers,
  getLifecycle,
  normalizeAgent,
  parseExcludedUserIds,
  parseGlobalWindowDays,
  primaryAgentSignal,
  summarizeUsers,
  type UserActivityRow,
} from './users-activity.ts'

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

test('lifecycle boundaries are exact and mutually exclusive', () => {
  assert.equal(getLifecycle(null), 'no-tracked')
  assert.equal(getLifecycle(0), 'active')
  assert.equal(getLifecycle(6), 'active')
  assert.equal(getLifecycle(7), 'inactive')
  assert.equal(getLifecycle(30), 'inactive')
  assert.equal(getLifecycle(31), 'dormant')
})

test('summary reports the six dashboard metrics without inventing trends', () => {
  const users = [
    user({ user_id: 'active', days_since_last: 2 }),
    user({ user_id: 'inactive', days_since_last: 14, activation_at: null, created_at: '2026-06-01T00:00:00.000Z' }),
    user({ user_id: 'dormant', days_since_last: 45, created_at: '2026-05-01T00:00:00.000Z' }),
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
  })

  assert.deepEqual(result.map((entry) => entry.user_id), ['user-2'])
  assert.equal(normalizeAgent('Gemini CLI'), 'gemini')
  assert.equal(normalizeAgent('Codex-CLI'), 'codex')
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
  assert.equal(parseGlobalWindowDays(undefined), 180)
  assert.equal(parseGlobalWindowDays(1), 1)
  assert.equal(parseGlobalWindowDays(7), 7)
  assert.equal(parseGlobalWindowDays(30), 30)
  assert.equal(parseGlobalWindowDays(180), 180)
  assert.equal(parseGlobalWindowDays(0), null)
  assert.equal(parseGlobalWindowDays('7'), null)
})

test('app versions sort numerically and keep unknown values last', () => {
  const versions = ['1.10.0', null, '2.0.0', '1.4.4']
  assert.deepEqual([...versions].sort((a, b) => compareAppVersions(a, b, 1)), ['1.4.4', '1.10.0', '2.0.0', null])
  assert.deepEqual([...versions].sort((a, b) => compareAppVersions(a, b, -1)), ['2.0.0', '1.10.0', '1.4.4', null])
})
