export interface UserActivityRow {
  user_id: string
  name: string | null
  email: string
  avatar_url: string | null
  provider: string | null
  subscription_tier: string | null
  subscription_status: string | null
  created_at: string | null
  last_login: string | null
  total_events: number
  active_days: number
  first_active: string | null
  last_active: string | null
  days_since_last: number | null
  current_streak: number
  longest_streak: number
  most_used_agent: string | null
  most_launched_agent: string | null
  agent_launches: number
  avg_terminal_slots: number | null
  max_terminal_slots: number | null
  terminal_metric_source: 'launches' | 'tab_slots' | null
  last7: boolean[]
  work_periods_7d: number
  work_periods_30d: number
  last_app_version: string | null
  activation_at: string | null
  integration_providers: string[]
  outreach_status: 'eligible' | 'contacted' | 'replied' | 'excluded'
}

export interface UserActivityOverview {
  users: UserActivityRow[]
  generated_at: string
}

export interface UserGlobalAction {
  action: string
  events: number
  users: number
}

export interface UserFeatureAdoption {
  feature: string
  category: 'workspace' | 'automation'
  coverage: 'exact' | 'historical_proxy' | 'starts_this_release'
  has_data: boolean
  users: number
  reach_pct: number | null
  repeat_users: number
  repeat_pct: number | null
  eligible_users: number
  returned_users: number
  return_30d_pct: number | null
  baseline_return_30d_pct: number | null
  return_lift_pp: number | null
}

export interface UserCohortHealth {
  mau: number
  previous_mau: number
  mau_change: number
  mau_change_pct: number | null
  second_terminal_eligible: number
  second_terminal_users: number
  second_terminal_pct: number | null
  previous_second_terminal_pct: number | null
  second_terminal_delta_pp: number | null
  repeat_users: number
  repeat_pct: number | null
  previous_repeat_pct: number | null
  repeat_delta_pp: number | null
  median_active_days: number | null
  previous_median_active_days: number | null
  median_active_days_delta: number | null
  wau: number
  weekly_stickiness_pct: number | null
  previous_weekly_stickiness_pct: number | null
  weekly_stickiness_delta_pp: number | null
  return_eligible: number
  return_users: number
  return_pct: number | null
  previous_return_pct: number | null
  return_delta_pp: number | null
}

export interface UserBehaviorMetric {
  feature: 'search_terminals' | 'command_palette' | 'conversation_history'
  coverage: 'exact' | 'historical_proxy'
  users: number
  reach_pct: number | null
  avg_users_per_day: number
  median_uses: number | null
  repeat_users: number
  repeat_pct: number | null
  outcome_users: number
  outcome_events: number
  shortcut_users: number | null
  outcome_coverage: 'exact' | 'starts_this_release'
}

export interface WorkspaceModeMetric {
  mode: 'grid' | 'tabs' | 'list'
  events: number
  share_pct: number | null
}

export type GlobalWindowDays = 1 | 7 | 30 | 180
export type FeatureWindowDays = 7 | 30 | 90 | 180

export interface UserGlobalMetrics {
  generated_at: string
  window_days: number
  feature_window_days: number
  registered_users: number
  active_users: number
  excluded_users: number
  events: number
  top_actions: UserGlobalAction[]
  actions: UserGlobalAction[]
  features: UserFeatureAdoption[]
  behavior_window_days: number
  health: UserCohortHealth
  behaviors: UserBehaviorMetric[]
  workspace_mode_coverage: 'exact' | 'selection_only' | 'starts_this_release'
  workspace_mode_events: number
  workspace_mode_users: number
  workspace_modes: WorkspaceModeMetric[]
  avg_terminal_slots: number | null
  max_terminal_slots: number | null
  terminal_metric_source: 'launches' | 'tab_slots' | 'mixed' | null
  top_user_share: number
  top_two_share: number
}

export interface UserActivityDetail {
  calendar: { d: string; events: number }[]
  agents: { agent: string; n: number }[]
  top_actions: { action: string; n: number }[]
  recent_activity: { action: string; occurred_at: string; app_version: string | null }[]
  account: {
    username: string | null
    provider: string | null
    created_at: string | null
    updated_at: string | null
    last_login: string | null
    session_count: number
    last_session_at: string | null
  }
  integrations: {
    provider: string
    provider_url: string | null
    account_name: string | null
    account_email: string | null
    created_at: string | null
    last_synced_at: string | null
    credential_state: 'valid' | 'expired' | 'unknown'
  }[]
  outreach: {
    is_excluded: boolean
    exclusion_reason: string | null
    events: {
      template_slug: string
      sent_at: string
      responded_at: string | null
      is_dry_run: boolean
    }[]
  }
  billing: {
    tier: string | null
    status: string | null
    cancel_at_period_end: boolean
    cancel_at: string | null
    end_date: string | null
    last_payment_at: string | null
    updated_at: string | null
  }
  cloud_tasks: {
    total: number
    owned: number
    assigned: number
    synced: number
    conflicts: number
    recently_completed: number
    by_status: Record<string, number>
  }
  behavior: {
    window_days: number
    active_days: number
    search_opens: number
    search_switches: number
    palette_opens: number
    palette_runs: number
    history_opens: number
    history_restores: number
    workspace_mode: 'grid' | 'tabs' | 'list' | null
    workspace_mode_launches: number | null
    workspace_mode_pct: number | null
  }
}

export type Lifecycle = 'active' | 'inactive' | 'dormant' | 'no-tracked'
export type LifecycleFilter = 'all' | Lifecycle

export interface UserFilters {
  query: string
  lifecycle: LifecycleFilter
  agent: string
  activation: 'all' | 'activated' | 'not-activated'
  version: string
  provider: string
  plan: string
  integration: string
  outreach: 'all' | UserActivityRow['outreach_status']
}

export const EMPTY_USER_FILTERS: UserFilters = {
  query: '',
  lifecycle: 'all',
  agent: 'all',
  activation: 'all',
  version: 'all',
  provider: 'all',
  plan: 'all',
  integration: 'all',
  outreach: 'all',
}

const AGENT_ALIASES: Record<string, string> = {
  claude: 'claude',
  'claude code': 'claude',
  'claude cli': 'claude',
  codex: 'codex',
  'codex cli': 'codex',
  'openai codex': 'codex',
  antigravity: 'antigravity',
  'antigravity cli': 'antigravity',
  opencode: 'opencode',
  'open code': 'opencode',
  'open code cli': 'opencode',
  'opencode cli': 'opencode',
  kimi: 'kimi',
  'kimi cli': 'kimi',
  grok: 'grok',
  'grok cli': 'grok',
  gemini: 'gemini',
  'gemini cli': 'gemini',
}

const AGENT_LABELS: Record<string, string> = {
  claude: 'Claude Code',
  codex: 'Codex',
  antigravity: 'Antigravity',
  opencode: 'opencode',
  kimi: 'Kimi Code',
  grok: 'Grok Build',
  gemini: 'Gemini (legacy)',
}

export function normalizeAgent(value: string | null): string {
  if (!value) return ''
  const normalized = value.trim().toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ')
  return AGENT_ALIASES[normalized] ?? normalized
}

export function agentLabel(value: string | null): string {
  const normalized = normalizeAgent(value)
  if (!normalized) return 'Unknown'
  return AGENT_LABELS[normalized] ?? normalized.replace(/\b\w/g, (character) => character.toUpperCase())
}

export function primaryAgentSignal(user: UserActivityRow): {
  agent: string
  source: 'launches' | 'selections' | 'none'
} {
  const launched = normalizeAgent(user.most_launched_agent)
  if (launched) return { agent: launched, source: 'launches' }
  const selected = normalizeAgent(user.most_used_agent)
  if (selected) return { agent: selected, source: 'selections' }
  return { agent: '', source: 'none' }
}

export function summarizeCohortHealth(health: UserCohortHealth): { title: string; copy: string } {
  const engagementDeltas = [
    health.second_terminal_delta_pp,
    health.repeat_delta_pp,
    health.weekly_stickiness_delta_pp,
    health.return_delta_pp,
  ].filter((value): value is number => value !== null)
  const improving = engagementDeltas.filter((value) => value > 0).length
  const weakening = engagementDeltas.filter((value) => value < 0).length

  if (health.mau_change > 0 && weakening > improving) {
    return {
      title: 'Audience growth is accelerating; engagement needs attention.',
      copy: 'More people arrived, while most activation and repeat-use signals fell against the previous cohort.',
    }
  }
  if (health.mau_change < 0 && improving > weakening) {
    return {
      title: 'The active audience shrank, while engagement improved.',
      copy: 'Fewer people used the app, but the users who did showed stronger activation or repeat use.',
    }
  }
  if (health.mau_change >= 0 && improving >= weakening) {
    return {
      title: 'Audience and engagement are moving in the same direction.',
      copy: 'Active-user growth is supported by stable or improving activation and repeat-use signals.',
    }
  }
  return {
    title: 'Audience and engagement both softened.',
    copy: 'Use the individual signals to separate acquisition, activation and retention problems.',
  }
}

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function parseExcludedUserIds(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length > 250) return null
  if (!value.every((entry) => typeof entry === 'string' && UUID_PATTERN.test(entry))) return null
  return [...new Set(value)]
}

export function parseGlobalWindowDays(value: unknown): GlobalWindowDays | null {
  if (value === undefined) return 7
  return value === 1 || value === 7 || value === 30 || value === 180 ? value : null
}

export function parseFeatureWindowDays(value: unknown): FeatureWindowDays | null {
  if (value === undefined) return 30
  return value === 7 || value === 30 || value === 90 || value === 180 ? value : null
}

export function getLifecycle(daysSinceLast: number | null): Lifecycle {
  if (daysSinceLast === null) return 'no-tracked'
  if (daysSinceLast < 7) return 'active'
  if (daysSinceLast <= 30) return 'inactive'
  return 'dormant'
}

export function compareAppVersions(left: string | null, right: string | null, direction: 1 | -1): number {
  if (!left) return right ? 1 : 0
  if (!right) return -1
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: 'base' }) * direction
}

export function summarizeUsers(users: UserActivityRow[], now = new Date()) {
  const cutoff = now.getTime() - 30 * 86_400_000
  let new30 = 0
  let active7 = 0
  let active30 = 0
  let activated = 0
  let inactive = 0
  let dormant = 0
  let noTracked = 0

  for (const user of users) {
    const createdAt = Date.parse(user.created_at || '')
    if (Number.isFinite(createdAt) && createdAt >= cutoff && createdAt <= now.getTime()) new30 += 1
    if (user.activation_at) activated += 1

    switch (getLifecycle(user.days_since_last)) {
      case 'active':
        active7 += 1
        active30 += 1
        break
      case 'inactive':
        inactive += 1
        active30 += 1
        break
      case 'dormant':
        dormant += 1
        break
      case 'no-tracked':
        noTracked += 1
        break
    }
  }

  return {
    total: users.length,
    new30,
    active7,
    active30,
    activated,
    inactive,
    dormant,
    noTracked,
  }
}

export function filterUsers(users: UserActivityRow[], filters: UserFilters): UserActivityRow[] {
  const query = filters.query.trim().toLowerCase()

  return users.filter((user) => {
    if (
      query &&
      ![user.name, user.email, user.user_id]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query))
    ) return false

    if (filters.lifecycle !== 'all' && getLifecycle(user.days_since_last) !== filters.lifecycle) return false
    if (filters.agent !== 'all' && primaryAgentSignal(user).agent !== filters.agent) return false
    if (filters.activation === 'activated' && !user.activation_at) return false
    if (filters.activation === 'not-activated' && user.activation_at) return false
    if (filters.version === 'unknown' && user.last_app_version !== null) return false
    if (filters.version !== 'all' && filters.version !== 'unknown' && user.last_app_version !== filters.version) return false
    if (filters.provider !== 'all' && user.provider !== filters.provider) return false
    if (filters.plan !== 'all' && user.subscription_tier !== filters.plan) return false
    if (filters.integration === 'none' && user.integration_providers.length > 0) return false
    if (
      filters.integration !== 'all' &&
      filters.integration !== 'none' &&
      !user.integration_providers.includes(filters.integration)
    ) return false
    if (filters.outreach !== 'all' && user.outreach_status !== filters.outreach) return false

    return true
  })
}
