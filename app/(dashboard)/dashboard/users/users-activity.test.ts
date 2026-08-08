import assert from 'node:assert/strict'
import test from 'node:test'

import {
  EMPTY_USER_FILTERS,
  filterUsers,
  getLifecycle,
  normalizeAgent,
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
