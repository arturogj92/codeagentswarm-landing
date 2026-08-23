'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import ActivityHeatmap from './ActivityHeatmap'
import {
  EMPTY_USER_FILTERS,
  agentLabel,
  compareAppVersions,
  filterUsers,
  getLifecycle,
  parseExcludedUserIds,
  primaryAgentSignal,
  summarizeCohortHealth,
  summarizeUsers,
  workspaceModeCopy,
  type Lifecycle,
  type FeatureWindowDays,
  type GlobalWindowDays,
  type UserActivityDetail,
  type UserActivityOverview,
  type UserActivityRow,
  type UserBehaviorMetric,
  type UserFilters,
  type UserGlobalMetrics,
} from './users-activity'

const PAGE_SIZE = 25
const DETAIL_DAYS = 180
const DAY_MS = 86_400_000
const GLOBAL_EXCLUSIONS_KEY = 'dashboard:user-global-exclusions:v1'
const GLOBAL_WINDOWS: Array<{ days: GlobalWindowDays; label: string }> = [
  { days: 1, label: '24h' },
  { days: 7, label: '7d' },
  { days: 30, label: '30d' },
  { days: 180, label: '180d' },
]
const FEATURE_WINDOWS: Array<{ days: FeatureWindowDays; label: string }> = [
  { days: 7, label: '7d' },
  { days: 30, label: '30d' },
  { days: 90, label: '90d' },
  { days: 180, label: '180d' },
]

type SortKey = 'user' | 'activity' | 'last7' | 'periods' | 'terminals' | 'version' | 'agent' | 'joined'
type SortDirection = 'asc' | 'desc'
type Segment = 'all' | 'active' | 'active30' | 'activated' | 'inactive' | 'dormant' | 'no-tracked'

const LIFECYCLE_META: Record<Lifecycle, { label: string; dot: string; badge: string }> = {
  active: {
    label: 'Active',
    dot: 'bg-emerald-400',
    badge: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  },
  inactive: {
    label: 'Inactive 7–30d',
    dot: 'bg-amber-400',
    badge: 'border-amber-400/25 bg-amber-400/10 text-amber-300',
  },
  dormant: {
    label: 'Dormant >30d',
    dot: 'bg-rose-400',
    badge: 'border-rose-400/25 bg-rose-400/10 text-rose-300',
  },
  'no-tracked': {
    label: 'No tracked activity',
    dot: 'bg-white/25',
    badge: 'border-white/10 bg-white/[0.04] text-white/55',
  },
}

const ACTION_LABELS: Record<string, string> = {
  terminal_tab_switch: 'Terminal switching',
  terminal_minimize: 'Minimize terminal',
  terminal_focus_shortcut: 'Focus terminal shortcut',
  terminal_shortcut: 'Terminal shortcut',
  navbar_shortcut_open: 'Open project shortcut',
  navbar_shortcut_keyboard: 'Open project shortcut by keyboard',
  navbar_add_shortcut: 'Add project shortcut',
  quick_switcher_shortcut: 'Search terminals shortcut',
  command_palette_shortcut: 'Command palette shortcut',
  command_palette_run: 'Command Palette command run',
  quick_switcher_switch: 'Terminal switch from search',
  conversation_history_opened: 'Conversation History opened',
  conversation_history_restored: 'Conversation restored from History',
  terminal_sessions: 'Agent sessions',
  terminal_controls: 'Terminal controls',
  project_switcher: 'Projects and shortcuts',
  task_board: 'Task board',
  conversation_history: 'Conversation history',
  settings: 'Settings',
  swarmi: 'Swarmi',
  git: 'Git tools',
  screenshot: 'Screenshots',
  billing: 'Billing',
  command_palette: 'Command palette',
  updates: 'Updates',
  navigation: 'Navigation',
  integration_connected: 'Integration connected',
  integration_synced: 'Integration synced',
  outreach_sent: 'Outreach sent',
  outreach_replied: 'Outreach reply received',
  cloud_task_completed: 'Cloud task completed',
  cloud_task_updated: 'Cloud task updated',
  kanban_opened: 'Kanban opened',
  workspace_toggle: 'Tabs / Grid toggle',
  workspace_grid: 'Grid selected',
  workspace_tabs: 'Tabs selected',
  workspace_list: 'List selected',
  mcp_settings_opened: 'MCP settings opened',
  mcp_server_disabled: 'MCP server disabled',
  terminal_status_menu_used: 'Terminal status menu used',
  terminal_status_agent_set: 'Status set by agent',
  terminal_status_created: 'Custom status created',
  mcp_server_added: 'MCP server added',
}

function parseDate(value: string | null | undefined): Date | null {
  if (!value) return null
  const date = new Date(value.length === 10 ? `${value}T12:00:00Z` : value)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatDate(value: string | null | undefined): string {
  const date = parseDate(value)
  if (!date) return 'Not available'
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function formatDateTime(value: string | null | undefined): string {
  const date = parseDate(value)
  if (!date) return 'Not available'
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

function relativeDate(value: string | null | undefined): string {
  const date = parseDate(value)
  if (!date) return 'No tracked activity'
  const diff = Date.now() - date.getTime()
  if (diff < 60_000) return 'Just now'
  if (diff < 3_600_000) return `${Math.max(1, Math.floor(diff / 60_000))}m ago`
  if (diff < DAY_MS) return `${Math.max(1, Math.floor(diff / 3_600_000))}h ago`
  const days = Math.floor(diff / DAY_MS)
  if (days === 1) return 'Yesterday'
  if (days < 31) return `${days}d ago`
  return formatDate(value)
}

function initials(user: UserActivityRow): string {
  const source = (user.name || user.email).trim()
  const words = source.split(/[\s@._-]+/).filter(Boolean)
  return `${words[0]?.[0] || '?'}${words[1]?.[0] || ''}`.toUpperCase()
}

function titleCase(value: string | null | undefined, fallback = 'Not available'): string {
  if (!value) return fallback
  return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

function actionLabel(action: string): string {
  return ACTION_LABELS[action] || titleCase(action)
}

function last7Count(flags: boolean[]): number {
  return (Array.isArray(flags) ? flags : []).filter(Boolean).length
}

function matchesSegment(user: UserActivityRow, segment: Segment): boolean {
  if (segment === 'all') return true
  if (segment === 'active30') return user.days_since_last !== null && user.days_since_last <= 30
  if (segment === 'activated') return Boolean(user.activation_at)
  return getLifecycle(user.days_since_last) === segment
}

function unique(values: Array<string | null | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value)))].sort((a, b) => a.localeCompare(b))
}

export default function UsersActivityClient() {
  const [users, setUsers] = useState<UserActivityRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generatedAt, setGeneratedAt] = useState<string | null>(null)
  const [globalMetrics, setGlobalMetrics] = useState<UserGlobalMetrics | null>(null)
  const [globalLoading, setGlobalLoading] = useState(true)
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [globalWindowDays, setGlobalWindowDays] = useState<GlobalWindowDays>(7)
  const [featureWindowDays, setFeatureWindowDays] = useState<FeatureWindowDays>(30)
  const [excludedUserIds, setExcludedUserIds] = useState<string[]>([])
  const [exclusionsReady, setExclusionsReady] = useState(false)
  const [filters, setFilters] = useState<UserFilters>(EMPTY_USER_FILTERS)
  const [segment, setSegment] = useState<Segment>('all')
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [sortKey, setSortKey] = useState<SortKey>('activity')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<UserActivityRow | null>(null)
  const [detail, setDetail] = useState<UserActivityDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [detailError, setDetailError] = useState<string | null>(null)
  const [heatmapDays, setHeatmapDays] = useState(90)
  const [copied, setCopied] = useState<string | null>(null)

  const searchRef = useRef<HTMLInputElement>(null)
  const detailAbortRef = useRef<AbortController | null>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)
  const drawerRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/dashboard/users/overview')
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error || 'Failed to load users')
      const overview = payload as UserActivityOverview
      setUsers(Array.isArray(overview.users) ? overview.users : [])
      setGeneratedAt(overview.generated_at || new Date().toISOString())
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void loadUsers() }, [loadUsers])

  const loadGlobalMetrics = useCallback(async (
    excluded: string[],
    windowDays: GlobalWindowDays,
    adoptionDays: FeatureWindowDays,
  ) => {
    setGlobalLoading(true)
    setGlobalError(null)
    try {
      const response = await fetch('/api/dashboard/users/global', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          excluded_user_ids: excluded,
          window_days: windowDays,
          feature_window_days: adoptionDays,
        }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error || 'Failed to load global metrics')
      setGlobalMetrics(payload as UserGlobalMetrics)
    } catch (caught) {
      setGlobalError(caught instanceof Error ? caught.message : 'Failed to load global metrics')
    } finally {
      setGlobalLoading(false)
    }
  }, [])

  useEffect(() => {
    try {
      const stored = parseExcludedUserIds(JSON.parse(localStorage.getItem(GLOBAL_EXCLUSIONS_KEY) || '[]'))
      setExcludedUserIds(stored || [])
    } catch {
      setExcludedUserIds([])
    } finally {
      setExclusionsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!exclusionsReady) return
    localStorage.setItem(GLOBAL_EXCLUSIONS_KEY, JSON.stringify(excludedUserIds))
    void loadGlobalMetrics(excludedUserIds, globalWindowDays, featureWindowDays)
  }, [excludedUserIds, exclusionsReady, featureWindowDays, globalWindowDays, loadGlobalMetrics])

  useEffect(() => {
    const onShortcut = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null
      if (
        event.key === '/' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !target?.closest('input, textarea, select, [contenteditable="true"]')
      ) {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onShortcut)
    return () => document.removeEventListener('keydown', onShortcut)
  }, [])

  const loadDetail = useCallback(async (userId: string) => {
    detailAbortRef.current?.abort()
    const controller = new AbortController()
    detailAbortRef.current = controller
    setDetail(null)
    setDetailError(null)
    setDetailLoading(true)
    try {
      const response = await fetch(
        `/api/dashboard/users/${encodeURIComponent(userId)}/detail?days=${DETAIL_DAYS}`,
        { signal: controller.signal },
      )
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error || 'Failed to load user details')
      if (!controller.signal.aborted) setDetail(payload as UserActivityDetail)
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === 'AbortError') return
      if (!controller.signal.aborted) {
        setDetailError(caught instanceof Error ? caught.message : 'Failed to load user details')
      }
    } finally {
      if (detailAbortRef.current === controller) setDetailLoading(false)
    }
  }, [])

  const openDetail = useCallback((user: UserActivityRow, trigger: HTMLElement) => {
    returnFocusRef.current = trigger
    setSelected(user)
    setHeatmapDays(90)
    void loadDetail(user.user_id)
  }, [loadDetail])

  const closeDetail = useCallback(() => {
    detailAbortRef.current?.abort()
    setSelected(null)
    setDetail(null)
    setDetailError(null)
    requestAnimationFrame(() => returnFocusRef.current?.focus())
  }, [])

  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => closeButtonRef.current?.focus())

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        closeDetail()
        return
      }
      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusable = Array.from(drawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
      )).filter((element) => element.offsetParent !== null)
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [selected, closeDetail])

  useEffect(() => () => detailAbortRef.current?.abort(), [])

  useEffect(() => {
    setPage(1)
  }, [filters, segment, sortKey, sortDirection])

  const summary = useMemo(() => summarizeUsers(users), [users])
  const filteredUsers = useMemo(() => {
    const direction = sortDirection === 'asc' ? 1 : -1
    const filtered = filterUsers(users.filter((user) => matchesSegment(user, segment)), filters)
    return [...filtered].sort((left, right) => {
      let a: string | number
      let b: string | number
      switch (sortKey) {
        case 'user':
          a = (left.name || left.email).toLowerCase()
          b = (right.name || right.email).toLowerCase()
          break
        case 'activity':
          a = left.days_since_last ?? Number.MAX_SAFE_INTEGER
          b = right.days_since_last ?? Number.MAX_SAFE_INTEGER
          break
        case 'last7':
          a = last7Count(left.last7)
          b = last7Count(right.last7)
          break
        case 'periods':
          a = left.work_periods_30d
          b = right.work_periods_30d
          break
        case 'terminals':
          a = left.avg_terminal_slots ?? 0
          b = right.avg_terminal_slots ?? 0
          break
        case 'version':
          return compareAppVersions(left.last_app_version, right.last_app_version, direction)
        case 'agent':
          a = agentLabel(primaryAgentSignal(left).agent)
          b = agentLabel(primaryAgentSignal(right).agent)
          break
        case 'joined':
          a = parseDate(left.created_at)?.getTime() ?? 0
          b = parseDate(right.created_at)?.getTime() ?? 0
          break
      }
      if (typeof a === 'string' || typeof b === 'string') return String(a).localeCompare(String(b)) * direction
      return (a - b) * direction
    })
  }, [users, segment, filters, sortKey, sortDirection])

  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visibleUsers = filteredUsers.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  const agentOptions = useMemo(
    () => unique(users.map((user) => primaryAgentSignal(user).agent)).filter(Boolean),
    [users],
  )
  const excludedUsers = useMemo(() => {
    const excluded = new Set(excludedUserIds)
    return users.filter((user) => excluded.has(user.user_id))
  }, [users, excludedUserIds])
  const versionOptions = useMemo(() => unique(users.map((user) => user.last_app_version)), [users])
  const providerOptions = useMemo(() => unique(users.map((user) => user.provider)), [users])
  const planOptions = useMemo(() => unique(users.map((user) => user.subscription_tier)), [users])
  const integrationOptions = useMemo(
    () => unique(users.flatMap((user) => user.integration_providers || [])),
    [users],
  )
  const hasFilters = segment !== 'all' || Object.entries(filters).some(([key, value]) => (
    key === 'query' ? value !== '' : value !== 'all'
  ))

  function updateFilter<Key extends keyof UserFilters>(key: Key, value: UserFilters[Key]) {
    if (key === 'lifecycle') setSegment('all')
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function selectSegment(next: Segment) {
    setSegment(next)
    setFilters((current) => ({ ...current, lifecycle: 'all', activation: 'all' }))
  }

  function clearFilters() {
    setFilters(EMPTY_USER_FILTERS)
    setSegment('all')
  }

  function toggleSort(next: SortKey) {
    if (next === sortKey) {
      setSortDirection((current) => current === 'asc' ? 'desc' : 'asc')
      return
    }
    setSortKey(next)
    setSortDirection(next === 'joined' || next === 'last7' || next === 'periods' || next === 'terminals' || next === 'version' ? 'desc' : 'asc')
  }

  function toggleGlobalUser(userId: string) {
    setExcludedUserIds((current) => (
      current.includes(userId)
        ? current.filter((id) => id !== userId)
        : [...current, userId]
    ))
  }

  function refreshDashboard() {
    void loadUsers()
    if (exclusionsReady) void loadGlobalMetrics(excludedUserIds, globalWindowDays, featureWindowDays)
  }

  async function copyValue(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(key)
      window.setTimeout(() => setCopied((current) => current === key ? null : current), 1600)
    } catch {
      setCopied(null)
    }
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-[#090909] text-white">
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <header className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-semibold tracking-[0.18em] text-amber-300/80">USER ACTIVITY</p>
            <h1 className="text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">Users</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Review registered accounts and activity recorded by in-app events. Sign-ins and product activity are kept separate.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-white/55 sm:inline">
              {generatedAt ? `Updated ${relativeDate(generatedAt)}` : 'Waiting for data'}
            </span>
            <button
              type="button"
              onClick={refreshDashboard}
              disabled={loading || globalLoading}
              className="rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/70 transition hover:border-amber-400/40 hover:bg-amber-400/[0.07] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-wait disabled:opacity-50"
            >
              {loading || globalLoading ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </header>

        <section aria-label="User activity summary" className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
          <MetricCard label="Registered users" value={summary.total} note={`+${summary.new30} in 30d`} active={segment === 'all'} onClick={() => selectSegment('all')} />
          <MetricCard label="Active in 7d" value={summary.active7} note="Recorded activity" tone="green" active={segment === 'active'} onClick={() => selectSegment('active')} />
          <MetricCard label="Active in 30d" value={summary.active30} note="Includes active 7d" tone="green" active={segment === 'active30'} onClick={() => selectSegment('active30')} />
          <MetricCard label="Activated" value={summary.activated} note="Tracked launch signal" tone="amber" active={segment === 'activated'} onClick={() => selectSegment('activated')} />
          <MetricCard label="Inactive 7–30d" value={summary.inactive} note="Follow-up window" tone="amber" active={segment === 'inactive'} onClick={() => selectSegment('inactive')} />
          <MetricCard label="No tracked activity" value={summary.noTracked} note="Telemetry may be off" active={segment === 'no-tracked'} onClick={() => selectSegment('no-tracked')} />
        </section>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-white/[0.07] py-3">
          <div aria-label="Lifecycle segments" className="flex flex-wrap gap-1.5">
            <SegmentButton active={segment === 'all'} onClick={() => selectSegment('all')}>All {summary.total}</SegmentButton>
            <SegmentButton active={segment === 'active'} onClick={() => selectSegment('active')} dot="bg-emerald-400">Active {summary.active7}</SegmentButton>
            <SegmentButton active={segment === 'inactive'} onClick={() => selectSegment('inactive')} dot="bg-amber-400">Inactive {summary.inactive}</SegmentButton>
            <SegmentButton active={segment === 'dormant'} onClick={() => selectSegment('dormant')} dot="bg-rose-400">Dormant {summary.dormant}</SegmentButton>
            <SegmentButton active={segment === 'no-tracked'} onClick={() => selectSegment('no-tracked')} dot="bg-white/30">No tracked {summary.noTracked}</SegmentButton>
          </div>
          <p className="text-[11px] text-white/55">Exclusive lifecycle groups · based on last recorded event</p>
        </div>

        <GlobalInsights
          metrics={globalMetrics}
          loading={globalLoading}
          error={globalError}
          excludedUsers={excludedUsers}
          windowDays={globalWindowDays}
          featureWindowDays={featureWindowDays}
          onToggleUser={toggleGlobalUser}
          onWindowDays={setGlobalWindowDays}
          onFeatureWindowDays={setFeatureWindowDays}
          onRetry={() => loadGlobalMetrics(excludedUserIds, globalWindowDays, featureWindowDays)}
        />

        <section aria-label="User filters" className="mt-5 rounded-xl border border-white/[0.09] bg-[#111111] p-3.5">
          <div className="grid gap-2.5 md:grid-cols-[minmax(220px,1fr)_190px_180px_auto]">
            <label className="relative block">
              <span className="sr-only">Search users</span>
              <input
                ref={searchRef}
                type="search"
                value={filters.query}
                onChange={(event) => updateFilter('query', event.target.value)}
                placeholder="Search name, email or user ID…"
                aria-label="Search users"
                className="h-10 w-full rounded-lg border border-white/10 bg-black/35 px-3 pr-10 text-sm text-white outline-none placeholder:text-white/55 focus:border-amber-400/55 focus:ring-2 focus:ring-amber-400/15"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-2.5 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-white/55">/</kbd>
            </label>
            <FilterSelect label="Most-used agent" value={filters.agent} onChange={(value) => updateFilter('agent', value)}>
              <option value="all">All agents</option>
              {agentOptions.map((agent) => <option key={agent} value={agent}>{agentLabel(agent)}</option>)}
            </FilterSelect>
            <FilterSelect label="Activity state" value={filters.lifecycle} onChange={(value) => updateFilter('lifecycle', value as UserFilters['lifecycle'])}>
              <option value="all">All activity states</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive 7–30d</option>
              <option value="dormant">Dormant &gt;30d</option>
              <option value="no-tracked">No tracked activity</option>
            </FilterSelect>
            <button
              type="button"
              aria-expanded={advancedOpen}
              onClick={() => setAdvancedOpen((current) => !current)}
              className="h-10 rounded-lg border border-white/10 px-3 text-xs font-medium text-white/60 transition hover:border-white/20 hover:bg-white/[0.04] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {advancedOpen ? 'Fewer filters' : 'More filters'}
            </button>
          </div>

          {advancedOpen && (
            <div className="mt-3 grid gap-2.5 border-t border-white/[0.07] pt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <FilterSelect label="Activation" value={filters.activation} onChange={(value) => updateFilter('activation', value as UserFilters['activation'])}>
                <option value="all">Any activation</option>
                <option value="activated">Activated</option>
                <option value="not-activated">Not activated</option>
              </FilterSelect>
              <FilterSelect label="App version" value={filters.version} onChange={(value) => updateFilter('version', value)}>
                <option value="all">All versions</option>
                <option value="unknown">Unknown version</option>
                {versionOptions.map((version) => <option key={version} value={version}>{version}</option>)}
              </FilterSelect>
              <FilterSelect label="Sign-in provider" value={filters.provider} onChange={(value) => updateFilter('provider', value)}>
                <option value="all">All providers</option>
                {providerOptions.map((provider) => <option key={provider} value={provider}>{titleCase(provider)}</option>)}
              </FilterSelect>
              <FilterSelect label="Plan" value={filters.plan} onChange={(value) => updateFilter('plan', value)}>
                <option value="all">All plans</option>
                {planOptions.map((plan) => <option key={plan} value={plan}>{titleCase(plan)}</option>)}
              </FilterSelect>
              <FilterSelect label="Integration" value={filters.integration} onChange={(value) => updateFilter('integration', value)}>
                <option value="all">Any integration</option>
                <option value="none">No integrations</option>
                {integrationOptions.map((provider) => <option key={provider} value={provider}>{titleCase(provider)}</option>)}
              </FilterSelect>
              <FilterSelect label="Outreach" value={filters.outreach} onChange={(value) => updateFilter('outreach', value as UserFilters['outreach'])}>
                <option value="all">Any outreach status</option>
                <option value="eligible">Eligible</option>
                <option value="contacted">Contacted</option>
                <option value="replied">Replied</option>
                <option value="excluded">Excluded</option>
              </FilterSelect>
            </div>
          )}

          <div className="mt-3 flex min-h-6 items-center justify-between gap-3 text-xs">
            <p className="text-white/55">
              {filteredUsers.length.toLocaleString('en-US')} of {users.length.toLocaleString('en-US')} users
            </p>
            {hasFilters && (
              <button type="button" onClick={clearFilters} className="font-medium text-amber-300/80 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                Clear filters
              </button>
            )}
          </div>
        </section>

        {error && (
          <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-rose-400/25 bg-rose-400/[0.07] px-4 py-3 text-sm text-rose-200">
            <span>We couldn’t load user activity. {error}</span>
            <button type="button" onClick={() => void loadUsers()} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Retry</button>
          </div>
        )}

        <section aria-label="Users list" className="mt-4">
          {loading && users.length === 0 ? (
            <UsersSkeleton />
          ) : error && users.length === 0 ? null : users.length === 0 ? (
            <EmptyState title="No registered users yet" copy="New accounts will appear here after registration." />
          ) : filteredUsers.length === 0 ? (
            <EmptyState title="No users match these filters" copy="Clear one or more filters to widen the audience." action={<button type="button" onClick={clearFilters} className="mt-4 rounded-lg bg-amber-400 px-3 py-2 text-xs font-semibold text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200">Clear filters</button>} />
          ) : (
            <>
              <UsersTable users={visibleUsers} sortKey={sortKey} sortDirection={sortDirection} onSort={toggleSort} onOpen={openDetail} />
              <UsersMobileList users={visibleUsers} onOpen={openDetail} />
              <Pagination page={safePage} pages={pageCount} total={filteredUsers.length} onPage={setPage} />
            </>
          )}
        </section>
      </main>

      {selected && (
        <UserDrawer
          user={selected}
          detail={detail}
          loading={detailLoading}
          error={detailError}
          days={heatmapDays}
          copied={copied}
          excludedFromGlobal={excludedUserIds.includes(selected.user_id)}
          drawerRef={drawerRef}
          closeButtonRef={closeButtonRef}
          onDays={setHeatmapDays}
          onClose={closeDetail}
          onRetry={() => void loadDetail(selected.user_id)}
          onCopy={(value, key) => void copyValue(value, key)}
          onToggleGlobal={() => toggleGlobalUser(selected.user_id)}
        />
      )}
    </div>
  )
}

function GlobalInsights({ metrics, loading, error, excludedUsers, windowDays, featureWindowDays, onToggleUser, onWindowDays, onFeatureWindowDays, onRetry }: {
  metrics: UserGlobalMetrics | null
  loading: boolean
  error: string | null
  excludedUsers: UserActivityRow[]
  windowDays: GlobalWindowDays
  featureWindowDays: FeatureWindowDays
  onToggleUser: (userId: string) => void
  onWindowDays: (days: GlobalWindowDays) => void
  onFeatureWindowDays: (days: FeatureWindowDays) => void
  onRetry: () => Promise<void>
}) {
  const [actionQuery, setActionQuery] = useState('')
  const [featureFilter, setFeatureFilter] = useState<'all' | 'workspace' | 'automation'>('all')
  const [markingInvitationId, setMarkingInvitationId] = useState<string | null>(null)
  const [invitationError, setInvitationError] = useState<string | null>(null)
  const normalizedActionQuery = actionQuery.trim().toLowerCase()
  const actionResults = normalizedActionQuery
    ? (metrics?.actions || []).filter((action) => (
        `${action.action} ${actionLabel(action.action)}`.toLowerCase().includes(normalizedActionQuery)
      )).slice(0, 20)
    : []
  const windowLabel = windowDays === 1 ? 'Last 24 hours' : `Last ${windowDays} days`
  const visibleFeatures = (metrics?.features || []).filter((feature) => (
    featureFilter === 'all' || feature.category === featureFilter
  ))
  const healthSummary = metrics?.health ? summarizeCohortHealth(metrics.health) : null
  const markInvited = async (requestId: string) => {
    setMarkingInvitationId(requestId)
    setInvitationError(null)
    try {
      const response = await fetch('/api/dashboard/users/mobile-relay-invitations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: requestId }),
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error || 'Failed to mark invitation')
      await onRetry()
    } catch (caught) {
      setInvitationError(caught instanceof Error ? caught.message : 'Failed to mark invitation')
    } finally {
      setMarkingInvitationId(null)
    }
  }

  return (
    <section aria-label="Global usage overview" className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.65fr)]">
      <article className="rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">Top tracked actions</h2>
            <p className="mt-1 text-sm text-white/55">
              {windowLabel} · grouped for privacy · identified users
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="flex rounded-lg border border-white/10 bg-black/25 p-0.5" aria-label="Global activity period">
              {GLOBAL_WINDOWS.map((window) => (
                <button
                  key={window.days}
                  type="button"
                  onClick={() => onWindowDays(window.days)}
                  aria-pressed={windowDays === window.days}
                  className={`rounded-md px-2 py-1 text-[10px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${windowDays === window.days ? 'bg-amber-400/15 text-amber-200' : 'text-white/40 hover:text-white/70'}`}
                >
                  {window.label}
                </button>
              ))}
            </div>
            {metrics && (
              <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-medium text-white/55">
                {metrics.events.toLocaleString('en-US')} events
              </span>
            )}
          </div>
        </div>

        {loading && !metrics ? (
          <div className="mt-5 space-y-3" aria-label="Loading global actions">
            {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-7 animate-pulse rounded bg-white/[0.045]" />)}
          </div>
        ) : error && !metrics ? (
          <div role="alert" className="mt-5 rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-3 text-sm text-rose-200">
            Global metrics could not load. <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Retry</button>
          </div>
        ) : (
          <ol className="mt-5 space-y-3">
            {(metrics?.top_actions || []).slice(0, 8).map((action, index) => (
              <li key={action.action} className="grid grid-cols-[30px_minmax(0,1fr)_auto] items-center gap-3">
                <span className="font-mono text-sm text-white/45">{String(index + 1).padStart(2, '0')}</span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white/85 sm:text-base">{actionLabel(action.action)}</p>
                  <p className="text-[10px] text-white/45">{action.users.toLocaleString('en-US')} users reached</p>
                </div>
                <span className="font-mono text-sm text-white/55 sm:text-base">{action.events.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ol>
        )}

        {metrics && (
          <div className="mt-5 border-t border-white/[0.07] pt-4">
            <div className="flex items-center justify-between gap-3">
              <label htmlFor="action-search" className="text-xs font-semibold uppercase tracking-[0.13em] text-white/55">
                Explore every action
              </label>
              <span className="text-[10px] text-white/35">{metrics.actions.length} tracked</span>
            </div>
            <div className="relative mt-2">
              <input
                id="action-search"
                type="search"
                value={actionQuery}
                onChange={(event) => setActionQuery(event.target.value)}
                placeholder="Search minimize, shortcut, fork…"
                className="h-10 w-full rounded-lg border border-white/10 bg-black/30 px-3 text-sm text-white/80 outline-none placeholder:text-white/30 focus:border-amber-400/55 focus:ring-2 focus:ring-amber-400/15"
              />
            </div>
            {normalizedActionQuery ? (
              actionResults.length > 0 ? (
                <ul className="mt-3 max-h-72 space-y-1 overflow-y-auto pr-1">
                  {actionResults.map((action) => (
                    <li key={action.action} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg px-2.5 py-2 hover:bg-white/[0.035]">
                      <div className="min-w-0">
                        <p className="truncate text-sm text-white/80">{actionLabel(action.action)}</p>
                        <p className="truncate font-mono text-[9px] text-white/35">{action.action} · {action.users.toLocaleString('en-US')} users</p>
                      </div>
                      <span className="font-mono text-sm text-white/55">{action.events.toLocaleString('en-US')}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-xs text-white/45">No tracked action matches “{actionQuery.trim()}”.</p>
              )
            ) : (
              <div className="mt-3 flex flex-wrap gap-2">
                {['minimize', 'shortcut', 'fork', 'screenshot'].map((example) => (
                  <button
                    key={example}
                    type="button"
                    onClick={() => setActionQuery(example)}
                    className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/45 transition hover:border-amber-400/30 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    {example}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </article>

      <article className="rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">Cohort health</h2>
          <p className="mt-1 text-sm text-white/55">
            Last 30 days · compared with the previous 30
          </p>
        </div>

        {loading && !metrics ? (
          <div className="mt-5 grid grid-cols-2 gap-2.5" aria-label="Loading cohort health">
            {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-32 animate-pulse rounded-lg bg-white/[0.045]" />)}
          </div>
        ) : error && !metrics ? (
          <div role="alert" className="mt-5 rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-3 text-sm text-rose-200">
            Cohort health could not load. <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Retry</button>
          </div>
        ) : metrics?.health && (
          <>
            {healthSummary && (
              <div className="mt-5 rounded-lg border border-amber-400/15 bg-amber-400/[0.045] p-3">
                <p className="text-xs font-semibold text-white/80">{healthSummary.title}</p>
                <p className="mt-1 text-[10px] leading-4 text-white/50">{healthSummary.copy}</p>
              </div>
            )}
            <dl className="mt-3 grid grid-cols-2 gap-2.5">
              <CohortMetric
                label="Monthly active users"
                value={metrics.health.mau.toLocaleString('en-US')}
                trend={countTrend(metrics.health.mau_change, metrics.health.mau_change_pct)}
                trendValue={metrics.health.mau_change}
                note="People who used the app in 30 days. Tracks audience growth."
              />
              <CohortMetric
                label="Second-terminal activation"
                value={percent(metrics.health.second_terminal_pct)}
                trend={deltaTrend(metrics.health.second_terminal_delta_pp, ' pp')}
                trendValue={metrics.health.second_terminal_delta_pp}
                note={`New users who reached terminal 2 in their first week · ${metrics.health.second_terminal_users}/${metrics.health.second_terminal_eligible}.`}
              />
              <CohortMetric
                label="Returning users"
                value={percent(metrics.health.repeat_pct)}
                trend={deltaTrend(metrics.health.repeat_delta_pp, ' pp')}
                trendValue={metrics.health.repeat_delta_pp}
                note="Active on at least two different days. Measures repeat use."
              />
              <CohortMetric
                label="Median active days"
                value={formatNumber(metrics.health.median_active_days)}
                trend={deltaTrend(metrics.health.median_active_days_delta, ' days')}
                trendValue={metrics.health.median_active_days_delta}
                note="Days used by the typical user. Heavy users cannot inflate the median."
              />
              <CohortMetric
                label="Weekly stickiness"
                value={percent(metrics.health.weekly_stickiness_pct)}
                trend={deltaTrend(metrics.health.weekly_stickiness_delta_pp, ' pp')}
                trendValue={metrics.health.weekly_stickiness_delta_pp}
                note={`${metrics.health.wau}/${metrics.health.mau} monthly users were active this week.`}
              />
              <CohortMetric
                label="30-day return"
                value={percent(metrics.health.return_pct)}
                trend={deltaTrend(metrics.health.return_delta_pp, ' pp')}
                trendValue={metrics.health.return_delta_pp}
                note={`First seen 30–60 days ago and active again on day 7–30 · ${metrics.health.return_users}/${metrics.health.return_eligible}.`}
              />
            </dl>
          </>
        )}

        <div className="mt-5 border-t border-white/[0.07] pt-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-white/55">Excluded heavy users</p>
            <span className="text-[10px] text-white/40">Change from any user detail</span>
          </div>
          {excludedUsers.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {excludedUsers.map((user) => (
                <button
                  key={user.user_id}
                  type="button"
                  onClick={() => onToggleUser(user.user_id)}
                  className="rounded-full border border-amber-400/25 bg-amber-400/[0.07] px-2.5 py-1 text-[11px] text-amber-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label={`Include ${user.name || user.email} in global statistics`}
                >
                  {user.name || user.email} <span aria-hidden="true">×</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-xs leading-5 text-white/45">No exclusions. Every KPI uses the same identified-user cohort.</p>
          )}
        </div>
      </article>

      <article className="overflow-hidden rounded-xl border border-white/[0.09] border-l-2 border-l-amber-300/70 bg-[#111111] xl:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-amber-200/70">Account funnel</p>
            <h2 className="mt-1 text-lg font-semibold tracking-[-0.02em] text-white">Mobile Relay access</h2>
            <p className="mt-1 text-sm text-white/55">One person, one count — regardless of phones or computers.</p>
          </div>
          <div className="flex rounded-lg border border-white/10 bg-black/25 p-0.5" aria-label="Mobile Relay period">
            {FEATURE_WINDOWS.map((window) => (
              <button
                key={window.days}
                type="button"
                onClick={() => onFeatureWindowDays(window.days)}
                aria-pressed={featureWindowDays === window.days}
                className={`rounded-md px-2 py-1 text-[10px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${featureWindowDays === window.days ? 'bg-amber-400/15 text-amber-200' : 'text-white/40 hover:text-white/70'}`}
              >
                {window.label}
              </button>
            ))}
          </div>
        </div>

        {loading && !metrics ? (
          <div className="grid gap-px border-y border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-5" aria-label="Loading Mobile Relay access">
            {Array.from({ length: 5 }, (_, index) => <div key={index} className="h-36 animate-pulse bg-[#111111] p-5" />)}
          </div>
        ) : error && !metrics ? (
          <div role="alert" className="border-y border-rose-400/20 bg-rose-400/[0.06] p-5 text-sm text-rose-200">
            Mobile Relay access could not load. <button type="button" onClick={onRetry} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Retry</button>
          </div>
        ) : metrics?.mobile_relay && (
          <>
            <div className="grid gap-px border-y border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-5" aria-live="polite">
              {([
                ['Requested', metrics.mobile_relay.requested_accounts, 'base', 'Submitted the private access form.', 'text-white'],
                ['Invited', metrics.mobile_relay.invited_accounts, metrics.mobile_relay.requested_accounts ? `${Math.round(100 * metrics.mobile_relay.invited_accounts / metrics.mobile_relay.requested_accounts)}%` : '—', 'You sent the beta invitation.', 'text-amber-300'],
                ['Paired', metrics.mobile_relay.paired_accounts, metrics.mobile_relay.invited_accounts ? `${Math.round(100 * metrics.mobile_relay.paired_accounts / metrics.mobile_relay.invited_accounts)}%` : '—', 'Linked at least one mobile device.', 'text-sky-300'],
                ['Connected', metrics.mobile_relay.connected_accounts, metrics.mobile_relay.invited_accounts ? `${Math.round(100 * metrics.mobile_relay.connected_accounts / metrics.mobile_relay.invited_accounts)}%` : '—', 'Reached a desktop through Relay.', 'text-sky-300'],
                ['Active', metrics.mobile_relay.active_accounts, metrics.mobile_relay.invited_accounts ? `${Math.round(100 * metrics.mobile_relay.active_accounts / metrics.mobile_relay.invited_accounts)}%` : '—', 'Ran a successful mobile action.', 'text-emerald-300'],
              ] as const).map(([label, value, rate, note, color]) => (
                <div key={label} className="bg-[#111111] p-4 sm:p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <strong className={`font-mono text-4xl font-semibold tracking-[-0.05em] ${color}`}>{value.toLocaleString('en-US')}</strong>
                    <span className="rounded-full border border-white/10 px-2 py-1 text-[9px] font-semibold text-white/45">{rate}</span>
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-white/85">{label}</h3>
                  <p className="mt-1 text-xs leading-5 text-white/45">{note}</p>
                </div>
              ))}
            </div>

            <div className="border-b border-white/[0.07] p-4 sm:p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold text-white">Access requests</h3>
                    <span className="rounded-full bg-amber-400/10 px-2 py-1 text-[9px] font-semibold text-amber-200">
                      {metrics.mobile_relay.requests.filter((request) => !request.invited_at).length} pending
                    </span>
                  </div>
                  <p className="mt-1 max-w-xl text-xs leading-5 text-white/45">Requests arrive from the private Discord form. Mark invited only after sending TestFlight or Play access.</p>
                </div>
              </div>

              {invitationError && <p role="alert" className="mt-3 text-xs text-rose-300">{invitationError}</p>}
              {metrics.mobile_relay.requests.length === 0 ? (
                <p className="mt-4 rounded-lg border border-white/[0.07] bg-black/20 px-4 py-8 text-center text-xs text-white/45">No access requests in this period.</p>
              ) : (
                <div className="mt-4 overflow-hidden rounded-lg border border-white/[0.07] bg-black/20">
                  {metrics.mobile_relay.requests.map((request) => (
                    <div key={request.id} className="grid gap-3 border-b border-white/[0.07] p-3 last:border-b-0 sm:grid-cols-[minmax(180px,1.5fr)_90px_minmax(150px,.8fr)_auto] sm:items-center sm:px-4">
                      <div className="min-w-0">
                        <strong className="block truncate text-xs text-white/85">{request.email}</strong>
                        <span className="mt-1 block truncate text-[10px] text-white/35">{request.account_name ? `Matched to ${request.account_name}` : `${request.discord_username} · Discord`}</span>
                      </div>
                      <span className="w-fit rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/45">{titleCase(request.platform)}</span>
                      <span className="text-[10px] text-white/35">{formatDateTime(request.requested_at)}</span>
                      {request.invited_at ? (
                        <span className="text-xs font-semibold text-emerald-300">Invited {relativeDate(request.invited_at)}</span>
                      ) : (
                        <button
                          type="button"
                          disabled={markingInvitationId === request.id}
                          onClick={() => void markInvited(request.id)}
                          className="w-fit rounded-md border border-amber-400/25 bg-amber-400/10 px-3 py-2 text-[10px] font-semibold text-amber-200 transition hover:bg-amber-400/15 disabled:cursor-wait disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                        >
                          {markingInvitationId === request.id ? 'Saving…' : 'Mark invited'}
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        <div className="flex flex-wrap justify-between gap-2 p-4 text-[10px] text-white/40 sm:px-5">
          <span>Email identifies a request until it links to a <strong className="font-mono font-semibold text-white/60">user_id</strong>.</span>
          <span>Last {featureWindowDays} days · exclusions applied</span>
        </div>
      </article>

      <article className="min-w-0 rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5 xl:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">Feature behavior</h2>
            <p className="mt-1 text-sm text-white/55">
              Last {featureWindowDays} days · reach, daily use and typical frequency
            </p>
          </div>
          <div className="flex items-center gap-2">
            {metrics && <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-medium text-white/55">{metrics.health.mau} monthly active</span>}
            <div className="flex rounded-lg border border-white/10 bg-black/25 p-0.5" aria-label="Feature behavior period">
              {FEATURE_WINDOWS.map((window) => (
                <button
                  key={window.days}
                  type="button"
                  onClick={() => onFeatureWindowDays(window.days)}
                  aria-pressed={featureWindowDays === window.days}
                  className={`rounded-md px-2 py-1 text-[10px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${featureWindowDays === window.days ? 'bg-amber-400/15 text-amber-200' : 'text-white/40 hover:text-white/70'}`}
                >
                  {window.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-[minmax(0,1fr)_310px]">
          <div role="table" aria-label="Feature behavior" className="min-w-0">
            <div role="row" className="hidden grid-cols-[minmax(180px,1.4fr)_repeat(5,minmax(90px,0.8fr))] border-b border-white/[0.08] px-3 pb-2 text-[9px] font-semibold uppercase tracking-[0.12em] text-white/40 md:grid">
              <span role="columnheader">Feature</span><span role="columnheader">Unique users</span><span role="columnheader">Avg users/day</span><span role="columnheader">Typical frequency</span><span role="columnheader">Repeat</span><span role="columnheader">Outcome</span>
            </div>
            {loading && !metrics ? (
              <div className="py-10 text-center text-sm text-white/40">Loading behavior signals…</div>
            ) : error && !metrics ? (
              <div role="alert" className="py-10 text-center text-sm text-rose-200/70">Feature behavior is unavailable.</div>
            ) : (metrics?.behaviors || []).length === 0 ? (
              <div className="py-10 text-center text-sm text-white/40">No feature behavior in this cohort.</div>
            ) : (metrics?.behaviors || []).map((behavior) => <BehaviorRow key={behavior.feature} behavior={behavior} />)}
          </div>
          <WorkspaceModePanel metrics={metrics} />
        </div>
        <p className="mt-3 text-[10px] leading-4 text-white/40">
          Unique users removes heavy-user distortion. Average users/day counts distinct people on each UTC day; typical frequency is the median number of opens per user; repeat means use on two or more days.
        </p>
      </article>

      <article className="min-w-0 rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5 xl:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold tracking-[-0.02em] text-white">Feature adoption</h2>
            <p className="mt-1 text-sm text-white/55">
              Reach and repeat · last {featureWindowDays} days · identified users
            </p>
          </div>
          <div className="flex rounded-lg border border-white/10 bg-black/25 p-0.5" aria-label="Feature adoption period">
            {FEATURE_WINDOWS.map((window) => (
              <button
                key={window.days}
                type="button"
                onClick={() => onFeatureWindowDays(window.days)}
                aria-pressed={featureWindowDays === window.days}
                className={`rounded-md px-2 py-1 text-[10px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${featureWindowDays === window.days ? 'bg-amber-400/15 text-amber-200' : 'text-white/40 hover:text-white/70'}`}
              >
                {window.label}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5" aria-label="Feature category">
            {([
              ['all', 'All signals'],
              ['workspace', 'Workspace'],
              ['automation', 'MCP & status'],
            ] as const).map(([value, label]) => (
              <SegmentButton key={value} active={featureFilter === value} onClick={() => setFeatureFilter(value)}>
                {label}
              </SegmentButton>
            ))}
          </div>
          <p className="text-[10px] text-white/40"><span className="font-semibold text-sky-300/75">30d return</span> always uses the mature 180d cohort</p>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse">
            <thead>
              <tr className="border-b border-white/[0.08] text-left text-[10px] uppercase tracking-[0.13em] text-white/45">
                <th className="px-3 py-2 font-semibold">Signal</th>
                <th className="px-3 py-2 font-semibold">Reach</th>
                <th className="px-3 py-2 font-semibold">Repeat</th>
                <th className="px-3 py-2 font-semibold">30d return</th>
                <th className="px-3 py-2 font-semibold">Coverage</th>
              </tr>
            </thead>
            <tbody>
              {loading && !metrics ? (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-white/40">Loading feature signals…</td></tr>
              ) : error && !metrics ? (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-rose-200/70">Feature signals are unavailable.</td></tr>
              ) : visibleFeatures.length === 0 ? (
                <tr><td colSpan={5} className="px-3 py-8 text-center text-sm text-white/40">No feature activity in this cohort.</td></tr>
              ) : visibleFeatures.map((feature) => (
                <tr key={feature.feature} className="border-b border-white/[0.055] last:border-0">
                  <td className="px-3 py-3">
                    <span className="block text-sm font-medium text-white/80">{actionLabel(feature.feature)}</span>
                    <span className="mt-0.5 block text-[9px] uppercase tracking-[0.1em] text-white/30">{feature.category === 'workspace' ? 'Workspace' : 'MCP & status'}</span>
                  </td>
                  <td className="px-3 py-3 font-mono text-sm text-white/70">
                    {!feature.has_data && feature.coverage === 'starts_this_release' ? (
                      <><span>—</span><span className="ml-2 text-[10px] text-white/35">collecting</span></>
                    ) : (
                      <><span className="text-amber-300">{feature.reach_pct ?? 0}%</span><span className="ml-2 text-[10px] text-white/40">{feature.users} users</span></>
                    )}
                  </td>
                  <td className="px-3 py-3 font-mono text-sm text-white/70">
                    {feature.repeat_pct === null ? '—' : `${feature.repeat_pct}%`}
                    {feature.repeat_pct !== null && <span className="ml-2 text-[10px] text-white/40">{feature.repeat_users}/{feature.users}</span>}
                  </td>
                  <td className="px-3 py-3 font-mono text-sm text-white/70">
                    {feature.return_30d_pct === null ? '—' : `${feature.return_30d_pct}%`}
                    {feature.return_30d_pct !== null && (
                      <span className="ml-2 text-[10px] text-white/40">{feature.returned_users}/{feature.eligible_users}</span>
                    )}
                    {feature.return_lift_pp !== null && (
                      <span className={`ml-2 text-[10px] ${feature.return_lift_pp >= 0 ? 'text-emerald-300/70' : 'text-rose-300/70'}`}>
                        {feature.return_lift_pp >= 0 ? '+' : ''}{feature.return_lift_pp}pp vs active
                      </span>
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex rounded-full border px-2 py-1 text-[9px] font-semibold ${feature.coverage === 'exact' ? 'border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300/80' : feature.coverage === 'historical_proxy' ? 'border-sky-400/20 bg-sky-400/[0.07] text-sky-300/80' : 'border-amber-400/20 bg-amber-400/[0.07] text-amber-300/80'}`}>
                      {feature.coverage === 'exact' ? 'Exact' : feature.coverage === 'historical_proxy' ? 'Historical proxy' : 'Tracking since this release'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-[10px] leading-4 text-white/40">
          Reach and repeat follow the selected period. Repeat means use on at least two different UTC days. Return measures any recorded activity 7–30 days after first observed use in the mature 180-day cohort. Correlation does not prove that the feature caused retention.
        </p>
      </article>
    </section>
  )
}

function formatNumber(value: number | null): string {
  if (value === null) return '—'
  return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

function percent(value: number | null): string {
  return value === null ? '—' : `${formatNumber(value)}%`
}

function deltaTrend(value: number | null, suffix: string): string {
  if (value === null) return 'No previous cohort'
  const arrow = value > 0 ? '↑' : value < 0 ? '↓' : '→'
  return `${arrow} ${formatNumber(Math.abs(value))}${suffix}`
}

function countTrend(value: number, pct: number | null): string {
  const arrow = value > 0 ? '↑' : value < 0 ? '↓' : '→'
  const percentage = pct === null ? '' : ` · ${pct > 0 ? '+' : ''}${formatNumber(pct)}%`
  return `${arrow} ${Math.abs(value).toLocaleString('en-US')}${percentage}`
}

function CohortMetric({ label, value, trend, trendValue, note }: {
  label: string
  value: string
  trend: string
  trendValue: number | null
  note: string
}) {
  const trendTone = trendValue === null || trendValue === 0
    ? 'text-white/40'
    : trendValue > 0 ? 'text-emerald-300/75' : 'text-rose-300/75'
  return (
    <div className="min-h-32 rounded-lg border border-white/[0.08] bg-black/20 p-3">
      <dt className="text-[10px] uppercase tracking-[0.11em] text-white/45">{label}</dt>
      <dd className="mt-1 font-mono text-xl font-semibold text-amber-300">{value}</dd>
      <p className={`mt-1 text-[10px] font-medium ${trendTone}`}>{trend}</p>
      <p className="mt-2 text-[9px] leading-4 text-white/40"><strong className="font-semibold text-white/55">What it means:</strong> {note}</p>
    </div>
  )
}

function BehaviorRow({ behavior }: { behavior: UserBehaviorMetric }) {
  const meta = behavior.feature === 'search_terminals'
    ? {
        name: 'Search terminals',
        why: 'Cmd+Shift+A or the navbar button. Finds and jumps to an open terminal.',
        uniqueNote: `${behavior.shortcut_users || 0} used the keyboard shortcut`,
        outcome: `${behavior.outcome_users} users`,
        outcomeNote: `${behavior.outcome_events} completed terminal switches`,
      }
    : behavior.feature === 'command_palette'
      ? {
          name: 'Command Palette',
          why: 'Cmd+P. Searches product actions and runs the selected command.',
          uniqueNote: 'Opened from the keyboard shortcut',
          outcome: `${behavior.outcome_users} users`,
          outcomeNote: `${behavior.outcome_events} commands run`,
        }
      : {
          name: 'Conversation History',
          why: 'Searches and restores earlier conversations across supported agents.',
          uniqueNote: behavior.coverage === 'historical_proxy' ? 'Includes historical navbar opens' : 'Successful opens',
          outcome: behavior.outcome_coverage === 'starts_this_release' && behavior.outcome_events === 0 ? 'Collecting' : `${behavior.outcome_users} users`,
          outcomeNote: behavior.outcome_coverage === 'starts_this_release' && behavior.outcome_events === 0
            ? 'Restore outcomes start with this release'
            : `${behavior.outcome_events} conversations restored`,
        }
  const lowerBound = behavior.coverage === 'historical_proxy' ? '≥' : ''

  return (
    <div role="row" className="grid gap-3 border-b border-white/[0.055] px-3 py-4 last:border-0 md:grid-cols-[minmax(180px,1.4fr)_repeat(5,minmax(90px,0.8fr))] md:gap-2">
      <div role="cell">
        <span className="block text-sm font-medium text-white/82">{meta.name}</span>
        <span className="mt-1 block text-[10px] leading-4 text-white/42">{meta.why}</span>
      </div>
      <BehaviorCell label="Unique users" value={`${lowerBound}${behavior.users} · ${lowerBound}${percent(behavior.reach_pct)}`} note={meta.uniqueNote} accent />
      <BehaviorCell label="Avg users/day" value={`${lowerBound}${formatNumber(behavior.avg_users_per_day)}`} note="Unique people per calendar day" />
      <BehaviorCell label="Typical frequency" value={`${formatNumber(behavior.median_uses)} opens`} note="Median per user" />
      <BehaviorCell label="Repeat" value={percent(behavior.repeat_pct)} note={`${behavior.repeat_users} used it on 2+ days`} />
      <BehaviorCell label="Outcome" value={meta.outcome} note={meta.outcomeNote} />
    </div>
  )
}

function BehaviorCell({ label, value, note, accent = false }: { label: string; value: string; note: string; accent?: boolean }) {
  return (
    <div role="cell" className="grid grid-cols-[110px_1fr] gap-2 md:block">
      <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-white/32 md:hidden">{label}</span>
      <span>
        <span className={`block font-mono text-xs ${accent ? 'text-amber-300' : 'text-white/70'}`}>{value}</span>
        <span className="mt-1 block text-[9px] leading-4 text-white/38">{note}</span>
      </span>
    </div>
  )
}

function WorkspaceModePanel({ metrics }: { metrics: UserGlobalMetrics | null }) {
  const modes = metrics?.workspace_modes || []
  const hasData = Boolean(metrics && metrics.workspace_mode_events > 0)
  const winner = hasData
    ? [...modes].sort((left, right) => (right.share_pct || 0) - (left.share_pct || 0))[0]
    : null
  const copy = workspaceModeCopy(
    metrics?.workspace_mode_coverage || 'starts_this_release',
    metrics?.workspace_mode_events || 0,
    metrics?.workspace_mode_users || 0,
  )

  return (
    <section aria-label="Workspace mode share" className="rounded-lg border border-white/[0.08] bg-black/20 p-4">
      <h3 className="text-xs font-semibold text-white/78">{copy.title}</h3>
      <p className="mt-1 text-[10px] leading-4 text-white/42">{copy.description}</p>
      {hasData ? (
        <>
          <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-white/[0.05]" aria-label={modes.map((mode) => `${titleCase(mode.mode)} ${percent(mode.share_pct)}`).join(', ')}>
            {modes.map((mode) => (
              <span
                key={mode.mode}
                className={mode.mode === 'grid' ? 'bg-amber-400' : mode.mode === 'tabs' ? 'bg-violet-400' : 'bg-sky-400'}
                style={{ width: `${mode.share_pct || 0}%` }}
              />
            ))}
          </div>
          <dl className="mt-4 grid grid-cols-3 gap-2">
            {modes.map((mode) => (
              <div key={mode.mode}>
                <dt className="text-[9px] text-white/40">{titleCase(mode.mode)}</dt>
                <dd className="mt-1 font-mono text-sm text-white/75">{percent(mode.share_pct)}</dd>
              </div>
            ))}
          </dl>
          {winner && <p className="mt-4 text-xs text-white/65"><strong className="text-white/80">{copy.leaderLabel}:</strong> {titleCase(winner.mode)} · {percent(winner.share_pct)}</p>}
        </>
      ) : (
        <p className="mt-5 font-mono text-xl font-semibold text-amber-300">Collecting</p>
      )}
      <p className="mt-4 rounded-md border border-white/[0.07] bg-white/[0.025] p-2.5 text-[10px] leading-4 text-white/45">{copy.sample}</p>
    </section>
  )
}

function MetricCard({ label, value, note, tone = 'neutral', active, onClick }: {
  label: string
  value: number
  note: string
  tone?: 'neutral' | 'green' | 'amber'
  active: boolean
  onClick: () => void
}) {
  const valueTone = tone === 'green' ? 'text-emerald-300' : tone === 'amber' ? 'text-amber-300' : 'text-white'
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-28 rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${active ? 'border-amber-400/45 bg-amber-400/[0.07]' : 'border-white/[0.09] bg-[#111111] hover:border-white/20 hover:bg-white/[0.035]'}`}
    >
      <span className="block text-[11px] font-medium text-white/55">{label}</span>
      <span className={`mt-2 block font-mono text-3xl font-semibold tracking-[-0.04em] ${valueTone}`}>{value.toLocaleString('en-US')}</span>
      <span className="mt-1.5 block text-[10px] text-white/55">{note}</span>
    </button>
  )
}

function SegmentButton({ children, active, dot, onClick }: { children: ReactNode; active: boolean; dot?: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${active ? 'bg-white/10 text-white' : 'text-white/55 hover:bg-white/[0.05] hover:text-white/75'}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      {children}
    </button>
  )
}

function FilterSelect({ label, value, onChange, children }: { label: string; value: string; onChange: (value: string) => void; children: ReactNode }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 w-full rounded-lg border border-white/10 bg-black/35 px-3 text-xs text-white/70 outline-none focus:border-amber-400/55 focus:ring-2 focus:ring-amber-400/15"
      >
        {children}
      </select>
    </label>
  )
}

function UsersTable({ users, sortKey, sortDirection, onSort, onOpen }: {
  users: UserActivityRow[]
  sortKey: SortKey
  sortDirection: SortDirection
  onSort: (key: SortKey) => void
  onOpen: (user: UserActivityRow, trigger: HTMLElement) => void
}) {
  return (
    <div className="hidden overflow-x-auto rounded-xl border border-white/[0.09] bg-[#111111] md:block">
      <table className="w-full min-w-[1200px] border-collapse">
        <caption className="sr-only">Registered users and recorded product activity</caption>
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.018]">
            <SortHeader label="User" sort="user" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Avg terminals" sort="terminals" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Activity" sort="activity" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Last 7 days" sort="last7" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Work periods" sort="periods" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Version" sort="version" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Agent signal" sort="agent" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Joined" sort="joined" active={sortKey} direction={sortDirection} onSort={onSort} />
            <th className="w-20 px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const lifecycle = LIFECYCLE_META[getLifecycle(user.days_since_last)]
            const agentSignal = primaryAgentSignal(user)
            return (
              <tr key={user.user_id} className="border-b border-white/[0.055] last:border-0 hover:bg-white/[0.025]">
                <td className="px-4 py-3.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] font-mono text-xs font-semibold text-white/65">{initials(user)}</span>
                    <div className="min-w-0">
                      <p className="max-w-[260px] truncate text-sm font-medium text-white/90">{user.name || 'Unnamed account'}</p>
                      <p className="max-w-[260px] truncate text-[11px] text-white/55">{user.email}</p>
                      <div className="mt-1 flex gap-1.5 text-[9px] uppercase tracking-wide text-white/55">
                        <span>{titleCase(user.provider, 'Unknown provider')}</span>
                        <span aria-hidden="true">·</span>
                        <span>{titleCase(user.subscription_tier, 'No plan')}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-mono text-sm text-white/80"><span className="text-amber-300">{user.avg_terminal_slots?.toFixed(1) || '—'}</span> average</div>
                  <p className="mt-1 text-[10px] text-white/55">{user.max_terminal_slots || '—'} max · {user.terminal_metric_source === 'launches' ? 'measured' : user.terminal_metric_source === 'tab_slots' ? 'estimated' : 'no data'}</p>
                </td>
                <td className="px-4 py-3.5">
                  <LifecycleBadge user={user} />
                  <p className="mt-1.5 text-[11px] text-white/55" title={formatDateTime(user.last_active)}>{relativeDate(user.last_active)}</p>
                </td>
                <td className="px-4 py-3.5">
                  <Last7 flags={user.last7} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-mono text-sm text-white/80"><span className="text-amber-300">{user.work_periods_7d}</span> / {user.work_periods_30d}</div>
                  <p className="mt-1 text-[10px] text-white/55">7d / 30d</p>
                </td>
                <td className="px-4 py-3.5">
                  <p className="font-mono text-xs font-semibold text-white/75">{user.last_app_version ? `v${user.last_app_version}` : 'Unknown'}</p>
                  <p className="mt-1 text-[10px] text-white/40">Latest recorded</p>
                </td>
                <td className="px-4 py-3.5 text-xs text-white/65">
                  <span>{agentSignal.agent ? agentLabel(agentSignal.agent) : 'Not available'}</span>
                  {agentSignal.source !== 'none' && (
                    <p className="mt-1 text-[9px] uppercase tracking-wide text-white/40">
                      {agentSignal.source === 'launches' ? 'Launched' : 'Selected only'}
                    </p>
                  )}
                </td>
                <td className="px-4 py-3.5 text-xs text-white/55">{formatDate(user.created_at)}</td>
                <td className="px-4 py-3.5 text-right">
                  <button
                    type="button"
                    onClick={(event) => onOpen(user, event.currentTarget)}
                    aria-label={`Open details for ${user.name || user.email}`}
                    className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white/55 transition hover:border-amber-400/35 hover:bg-amber-400/[0.07] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    Open
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SortHeader({ label, sort, active, direction, onSort }: { label: string; sort: SortKey; active: SortKey; direction: SortDirection; onSort: (key: SortKey) => void }) {
  const selected = active === sort
  return (
    <th aria-sort={selected ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'} className="px-4 py-3 text-left">
      <button
        type="button"
        onClick={() => onSort(sort)}
        className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${selected ? 'text-amber-300' : 'text-white/55 hover:text-white/65'}`}
      >
        {label}<span aria-hidden="true" className="w-2 text-[8px]">{selected ? (direction === 'asc' ? '▲' : '▼') : ''}</span>
      </button>
    </th>
  )
}

function UsersMobileList({ users, onOpen }: { users: UserActivityRow[]; onOpen: (user: UserActivityRow, trigger: HTMLElement) => void }) {
  return (
    <ul className="space-y-2.5 md:hidden">
      {users.map((user) => {
        const agentSignal = primaryAgentSignal(user)
        return <li key={user.user_id} className="rounded-xl border border-white/[0.09] bg-[#111111] p-4">
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.045] font-mono text-xs font-semibold text-white/65">{initials(user)}</span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white/90">{user.name || 'Unnamed account'}</p>
              <p className="truncate text-[11px] text-white/55">{user.email}</p>
            </div>
            <button
              type="button"
              onClick={(event) => onOpen(user, event.currentTarget)}
              aria-label={`Open details for ${user.name || user.email}`}
              className="rounded-lg border border-white/10 px-2.5 py-1.5 text-[11px] font-medium text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >Open</button>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <LifecycleBadge user={user} />
            <span className="text-[10px] text-white/55">{relativeDate(user.last_active)}</span>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 border-t border-white/[0.07] pt-3 text-[11px]">
            <div><dt className="text-white/55">Last 7 days</dt><dd className="mt-1 text-white/70">{last7Count(user.last7)}/7 active</dd></div>
            <div><dt className="text-white/55">Work periods</dt><dd className="mt-1 text-white/70">{user.work_periods_7d} / {user.work_periods_30d}</dd></div>
            <div><dt className="text-white/55">Terminals</dt><dd className="mt-1 text-white/70">{user.avg_terminal_slots?.toFixed(1) || '—'} avg · {user.max_terminal_slots || '—'} max</dd></div>
            <div><dt className="text-white/55">Agent signal</dt><dd className="mt-1 truncate text-white/70">{agentSignal.agent ? agentLabel(agentSignal.agent) : 'Not available'}</dd></div>
            <div><dt className="text-white/55">Version</dt><dd className="mt-1 text-white/70">{user.last_app_version || 'Unknown'}</dd></div>
          </dl>
        </li>
      })}
    </ul>
  )
}

function LifecycleBadge({ user }: { user: UserActivityRow }) {
  const metadata = LIFECYCLE_META[getLifecycle(user.days_since_last)]
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[10px] font-medium ${metadata.badge}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${metadata.dot}`} />{metadata.label}
    </span>
  )
}

function Last7({ flags }: { flags: boolean[] }) {
  const normalized = Array.isArray(flags) && flags.length === 7 ? flags : new Array(7).fill(false)
  return (
    <div>
      <div className="flex gap-1" aria-label={`${last7Count(normalized)} active days in the last 7 days`}>
        {normalized.map((active, index) => (
          <span key={index} aria-hidden="true" className={`h-3.5 w-3.5 rounded-[3px] border ${active ? 'border-amber-300/70 bg-amber-400' : 'border-white/10 bg-white/[0.04]'}`} />
        ))}
      </div>
      <p className="mt-1.5 text-[10px] text-white/55">{last7Count(normalized)}/7 active days</p>
    </div>
  )
}

function Pagination({ page, pages, total, onPage }: { page: number; pages: number; total: number; onPage: (page: number) => void }) {
  if (pages <= 1) return null
  return (
    <nav aria-label="Users pagination" className="mt-4 flex items-center justify-between gap-3 text-xs text-white/55">
      <span>{total.toLocaleString('en-US')} users · page {page} of {pages}</span>
      <div className="flex gap-2">
        <button type="button" disabled={page <= 1} onClick={() => onPage(page - 1)} className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:bg-white/[0.04] disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">Previous</button>
        <button type="button" disabled={page >= pages} onClick={() => onPage(page + 1)} className="rounded-lg border border-white/10 px-3 py-2 text-white/60 transition hover:bg-white/[0.04] disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">Next</button>
      </div>
    </nav>
  )
}

function UsersSkeleton() {
  return (
    <div role="status" aria-live="polite" className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#111111]">
      <span className="sr-only">Loading users</span>
      {Array.from({ length: 7 }, (_, index) => (
        <div key={index} className="flex animate-pulse items-center gap-4 border-b border-white/[0.05] px-4 py-4 last:border-0">
          <span className="h-9 w-9 rounded-lg bg-white/[0.07]" />
          <span className="h-3 w-44 rounded bg-white/[0.07]" />
          <span className="ml-auto h-3 w-24 rounded bg-white/[0.05]" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ title, copy, action }: { title: string; copy: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-white/12 bg-[#111111] px-6 py-16 text-center">
      <p className="text-base font-semibold text-white/78">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm text-white/55">{copy}</p>
      {action}
    </div>
  )
}

function UserDrawer({ user, detail, loading, error, days, copied, excludedFromGlobal, drawerRef, closeButtonRef, onDays, onClose, onRetry, onCopy, onToggleGlobal }: {
  user: UserActivityRow
  detail: UserActivityDetail | null
  loading: boolean
  error: string | null
  days: number
  copied: string | null
  excludedFromGlobal: boolean
  drawerRef: RefObject<HTMLElement | null>
  closeButtonRef: RefObject<HTMLButtonElement | null>
  onDays: (days: number) => void
  onClose: () => void
  onRetry: () => void
  onCopy: (value: string, key: string) => void
  onToggleGlobal: () => void
}) {
  const activeStart = parseDate(user.first_active)
  const observedDays = activeStart ? Math.max(user.active_days, Math.floor((Date.now() - activeStart.getTime()) / DAY_MS) + 1) : Math.max(user.active_days, 0)
  const activeRate = observedDays > 0 ? Math.min(100, Math.round((user.active_days / observedDays) * 100)) : 0
  const totalAgentSelections = detail?.agents.reduce((sum, agent) => sum + agent.n, 0) || 0
  const agentSignal = primaryAgentSignal(user)

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/72 backdrop-blur-[2px]"
      onMouseDown={(event) => { if (event.currentTarget === event.target) onClose() }}
    >
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-drawer-label user-drawer-title"
        className="h-full w-full max-w-[760px] overflow-y-auto border-l border-white/10 bg-[#0d0d0d] shadow-[-30px_0_80px_rgba(0,0,0,0.45)]"
      >
        <span id="user-drawer-label" className="sr-only">User details</span>
        <header className="sticky top-0 z-10 border-b border-white/[0.08] bg-[#0d0d0d]/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/[0.08] font-mono text-sm font-bold text-amber-200">{initials(user)}</span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 id="user-drawer-title" className="truncate text-xl font-semibold tracking-[-0.02em] text-white">{user.name || 'Unnamed account'}</h2>
                <LifecycleBadge user={user} />
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="break-all text-xs text-white/55">{user.email}</span>
                <button type="button" onClick={() => onCopy(user.email, 'email')} className="rounded px-1.5 py-1 text-[10px] font-medium text-amber-300/75 hover:bg-amber-400/10 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">{copied === 'email' ? 'Copied' : 'Copy email'}</button>
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5 text-[9px] font-medium uppercase tracking-[0.1em] text-white/55">
                <span className="rounded border border-white/10 px-1.5 py-1">{titleCase(user.provider, 'Unknown provider')}</span>
                <span className="rounded border border-white/10 px-1.5 py-1">{titleCase(user.subscription_tier, 'No plan')}</span>
                {user.last_app_version && <span className="rounded border border-white/10 px-1.5 py-1">v{user.last_app_version}</span>}
                <button
                  type="button"
                  onClick={onToggleGlobal}
                  aria-pressed={excludedFromGlobal}
                  className={`rounded border px-1.5 py-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${excludedFromGlobal ? 'border-amber-400/35 bg-amber-400/[0.08] text-amber-200' : 'border-white/10 hover:border-amber-400/30 hover:text-amber-200'}`}
                >
                  {excludedFromGlobal ? 'Excluded globally · include' : 'Exclude from global stats'}
                </button>
              </div>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close user details"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-lg text-white/50 transition hover:bg-white/[0.05] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >×</button>
          </div>
        </header>

        <div className="space-y-4 p-4 sm:p-6">
          <section aria-labelledby="glance-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
            <SectionTitle id="glance-title" title="At a glance" note="Tracked activity and account signals" />
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Info label="Activation signal" value={user.activation_at ? formatDate(user.activation_at) : 'Not reached'} />
              <Info label="Last tracked activity" value={relativeDate(user.last_active)} title={formatDateTime(user.last_active)} />
              <Info label="Last sign-in" value={formatDate(user.last_login)} title={formatDateTime(user.last_login)} />
              <Info
                label={agentSignal.source === 'launches' ? 'Most-launched agent' : 'Most-selected agent'}
                value={agentSignal.agent ? agentLabel(agentSignal.agent) : 'Not available'}
                note={agentSignal.source === 'launches' ? `${user.agent_launches} measured launches` : 'Selector clicks only · not proof of usage'}
              />
              <Info
                label="Avg terminals"
                value={user.avg_terminal_slots?.toFixed(1) || 'Not available'}
                note={user.terminal_metric_source === 'launches' ? 'Open at launch' : 'Estimated daily peak'}
                mono
              />
              <Info label="Highest terminal slot" value={user.max_terminal_slots?.toLocaleString('en-US') || 'Not available'} note="Observed in 180d" mono />
              <Info label="Tracked events" value={user.total_events.toLocaleString('en-US')} mono />
              <Info label="Active days" value={`${user.active_days} / ${observedDays || '—'}`} note={observedDays ? `${activeRate}% since first tracked activity` : 'No activity window'} mono />
              <Info label="Work periods" value={`${user.work_periods_7d} / ${user.work_periods_30d}`} note="7d / 30d · 30m gap" mono />
              <Info label="Streaks" value={`${user.current_streak} / ${user.longest_streak}`} note="Current / longest days" mono />
            </dl>
          </section>

          {error && (
            <div role="alert" className="rounded-xl border border-rose-400/25 bg-rose-400/[0.07] p-4 text-sm text-rose-200">
              <p>User details couldn’t be loaded. {error}</p>
              <button type="button" onClick={onRetry} className="mt-2 font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Retry details</button>
            </div>
          )}

          {loading && !detail ? <DetailSkeleton /> : detail && (
            <>
              <section aria-labelledby="behavior-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                <SectionTitle id="behavior-title" title="Product behavior" note={`Last ${detail.behavior.window_days} days · clear actions and outcomes`} />
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Info label="Active days" value={detail.behavior.active_days.toLocaleString('en-US')} note="Separate days with any tracked use" mono />
                  <Info label="Terminal depth" value={user.max_terminal_slots ? `${user.max_terminal_slots} max` : 'Not available'} note="Highest simultaneous slot in 180d" mono />
                  <Info label="Search terminals" value={`${detail.behavior.search_opens} → ${detail.behavior.search_switches}`} note="Opens → completed switches" mono />
                  <Info label="Command Palette" value={`${detail.behavior.palette_opens} → ${detail.behavior.palette_runs}`} note="Opens → commands run" mono />
                  <Info
                    label="Conversation History"
                    value={detail.behavior.history_restores > 0 ? `${detail.behavior.history_opens} → ${detail.behavior.history_restores}` : `${detail.behavior.history_opens} opens`}
                    note={detail.behavior.history_restores > 0 ? 'Opens → conversations restored' : 'Restore tracking starts with this release'}
                    mono
                  />
                  <Info
                    label="Preferred mode"
                    value={detail.behavior.workspace_mode ? `${titleCase(detail.behavior.workspace_mode)} · ${percent(detail.behavior.workspace_mode_pct)}` : 'Collecting'}
                    note={detail.behavior.workspace_mode_launches ? `${detail.behavior.workspace_mode_launches} measured launches in that mode` : 'Mode-at-launch tracking starts with this release'}
                    mono
                  />
                </dl>
              </section>

              <section aria-labelledby="activity-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <SectionTitle id="activity-title" title="Recorded activity" note="Event volume, not time spent" />
                  <div className="flex rounded-lg border border-white/10 p-0.5" aria-label="Activity range">
                    {[30, 90, 180].map((range) => (
                      <button key={range} type="button" aria-pressed={days === range} onClick={() => onDays(range)} className={`rounded-md px-2.5 py-1 text-[10px] font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${days === range ? 'bg-amber-400 text-black' : 'text-white/55 hover:text-white'}`}>{range}d</button>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  {detail.calendar.length > 0 ? <ActivityHeatmap data={detail.calendar} days={days} /> : <InlineEmpty>No activity recorded in this window.</InlineEmpty>}
                </div>
              </section>

              <div className="grid gap-4 lg:grid-cols-2">
                <section aria-labelledby="actions-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                  <SectionTitle id="actions-title" title="Top tracked actions" note={`Last ${DETAIL_DAYS} days · grouped for privacy`} />
                  {detail.top_actions.length > 0 ? (
                    <ol className="mt-4 space-y-2.5">
                      {detail.top_actions.slice(0, 8).map((action, index) => (
                        <li key={action.action} className="flex items-center gap-3 text-xs">
                          <span className="w-4 font-mono text-[10px] text-white/55">{String(index + 1).padStart(2, '0')}</span>
                          <span className="min-w-0 flex-1 truncate text-white/68">{actionLabel(action.action)}</span>
                          <span className="font-mono text-white/55">{action.n.toLocaleString('en-US')}</span>
                        </li>
                      ))}
                    </ol>
                  ) : <InlineEmpty>No tracked actions in this window.</InlineEmpty>}
                </section>

                <section aria-labelledby="agents-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                  <SectionTitle id="agents-title" title="Agent selections" note="Based on recorded selector events" />
                  {detail.agents.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {detail.agents.map((agent) => {
                        const percentage = totalAgentSelections > 0 ? Math.round((agent.n / totalAgentSelections) * 100) : 0
                        return (
                          <div key={agent.agent}>
                            <div className="mb-1.5 flex justify-between gap-3 text-xs"><span className="text-white/68">{agentLabel(agent.agent)}</span><span className="font-mono text-white/55">{agent.n} · {percentage}%</span></div>
                            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]"><div className="h-full rounded-full bg-amber-400/75" style={{ width: `${percentage}%` }} /></div>
                          </div>
                        )
                      })}
                    </div>
                  ) : <InlineEmpty>No agent selection data.</InlineEmpty>}
                </section>
              </div>

              <section aria-labelledby="account-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                <SectionTitle id="account-title" title="Account and access" note="Sign-in data is not product activity" />
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Info label="Username" value={detail.account.username || 'Not available'} />
                  <Info label="OAuth provider" value={titleCase(detail.account.provider)} />
                  <Info label="Registered" value={formatDate(detail.account.created_at)} title={formatDateTime(detail.account.created_at)} />
                  <Info label="Account updated" value={formatDate(detail.account.updated_at)} title={formatDateTime(detail.account.updated_at)} />
                  <Info label="Last sign-in" value={formatDate(detail.account.last_login)} title={formatDateTime(detail.account.last_login)} />
                  <Info label="Sign-in sessions" value={detail.account.session_count.toLocaleString('en-US')} note={`Last used ${relativeDate(detail.account.last_session_at)}`} mono />
                </dl>
              </section>

              <section aria-labelledby="cloud-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                <SectionTitle id="cloud-title" title="Cloud tasks" note="Local-only projects and tasks are not included" />
                <dl className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
                  <Info label="Total" value={detail.cloud_tasks.total.toLocaleString('en-US')} mono />
                  <Info label="Owned" value={detail.cloud_tasks.owned.toLocaleString('en-US')} mono />
                  <Info label="Assigned" value={detail.cloud_tasks.assigned.toLocaleString('en-US')} mono />
                  <Info label="Synced" value={detail.cloud_tasks.synced.toLocaleString('en-US')} mono />
                  <Info label="Conflicts" value={detail.cloud_tasks.conflicts.toLocaleString('en-US')} mono />
                  <Info label="Completed 30d" value={detail.cloud_tasks.recently_completed.toLocaleString('en-US')} mono />
                </dl>
                {Object.keys(detail.cloud_tasks.by_status).length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.07] pt-3">
                    {Object.entries(detail.cloud_tasks.by_status).map(([status, count]) => <span key={status} className="rounded border border-white/10 px-2 py-1 text-[10px] text-white/55">{titleCase(status)} · {count}</span>)}
                  </div>
                )}
              </section>

              <div className="grid gap-4 lg:grid-cols-2">
                <section aria-labelledby="integrations-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                  <SectionTitle id="integrations-title" title="Integrations" note={`${detail.integrations.length} connected`} />
                  {detail.integrations.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {detail.integrations.map((integration) => (
                        <article key={`${integration.provider}-${integration.created_at}`} className="rounded-lg border border-white/[0.07] bg-black/20 p-3">
                          <div className="flex items-center justify-between gap-3"><h4 className="text-xs font-semibold text-white/75">{titleCase(integration.provider)}</h4><StateBadge state={integration.credential_state} /></div>
                          <p className="mt-2 truncate text-[11px] text-white/55">{integration.account_name || integration.account_email || 'Account details unavailable'}</p>
                          {integration.provider_url && <p className="mt-1 truncate text-[10px] text-white/55">{integration.provider_url}</p>}
                          <p className="mt-2 text-[10px] text-white/55">Connected {formatDate(integration.created_at)} · synced {relativeDate(integration.last_synced_at)}</p>
                        </article>
                      ))}
                    </div>
                  ) : <InlineEmpty>No connected integrations.</InlineEmpty>}
                </section>

                <section aria-labelledby="outreach-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                  <SectionTitle id="outreach-title" title="Outreach" note={detail.outreach.is_excluded ? 'Excluded from automation' : 'Communication history'} />
                  {detail.outreach.is_excluded && <p className="mt-3 rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-2.5 text-xs text-rose-200">Excluded{detail.outreach.exclusion_reason ? ` · ${detail.outreach.exclusion_reason}` : ''}</p>}
                  {detail.outreach.events.length > 0 ? (
                    <ol className="mt-4 space-y-3">
                      {detail.outreach.events.map((event) => (
                        <li key={`${event.template_slug}-${event.sent_at}`} className="border-l border-white/12 pl-3 text-xs">
                          <div className="flex flex-wrap items-center gap-2"><span className="text-white/68">{titleCase(event.template_slug)}</span>{event.is_dry_run && <span className="rounded border border-white/10 px-1.5 py-0.5 text-[9px] text-white/55">Dry run</span>}{event.responded_at && <span className="text-emerald-300">Replied</span>}</div>
                          <p className="mt-1 text-[10px] text-white/55">Sent {formatDateTime(event.sent_at)}{event.responded_at ? ` · replied ${formatDateTime(event.responded_at)}` : ''}</p>
                        </li>
                      ))}
                    </ol>
                  ) : <InlineEmpty>No outreach recorded.</InlineEmpty>}
                </section>
              </div>

              <section aria-labelledby="billing-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                <SectionTitle id="billing-title" title="Subscription" note="Stripe identifiers are deliberately hidden" />
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Info label="Plan" value={titleCase(detail.billing.tier, 'Not available')} />
                  <Info label="Status" value={titleCase(detail.billing.status, 'Not available')} />
                  <Info label="Cancellation" value={detail.billing.cancel_at_period_end ? 'At period end' : detail.billing.cancel_at ? formatDate(detail.billing.cancel_at) : 'Not scheduled'} />
                  <Info label="Subscription end" value={formatDate(detail.billing.end_date)} />
                  <Info label="Last payment" value={formatDate(detail.billing.last_payment_at)} />
                  <Info label="Billing updated" value={formatDate(detail.billing.updated_at)} />
                </dl>
              </section>

              <section aria-labelledby="timeline-title" className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
                <SectionTitle id="timeline-title" title="Recent meaningful activity" note="Privacy-safe event groups only" />
                {detail.recent_activity.length > 0 ? (
                  <ol className="mt-4 space-y-3">
                    {detail.recent_activity.slice(0, 12).map((event, index) => (
                      <li key={`${event.occurred_at}-${event.action}-${index}`} className="grid grid-cols-[10px_1fr_auto] items-start gap-3 text-xs">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-amber-400/75" />
                        <div><p className="text-white/68">{actionLabel(event.action)}</p><p className="mt-0.5 text-[10px] text-white/55">{formatDateTime(event.occurred_at)}</p></div>
                        {event.app_version && <code className="text-[10px] text-white/55">v{event.app_version}</code>}
                      </li>
                    ))}
                  </ol>
                ) : <InlineEmpty>No recent tracked activity.</InlineEmpty>}
              </section>
            </>
          )}

          <details className="rounded-xl border border-white/[0.08] bg-[#121212] p-4">
            <summary className="cursor-pointer text-xs font-medium text-white/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">Technical details</summary>
            <div className="mt-3 flex items-center gap-2 border-t border-white/[0.07] pt-3">
              <code className="min-w-0 flex-1 truncate text-[10px] text-white/55">{user.user_id}</code>
              <button type="button" onClick={() => onCopy(user.user_id, 'id')} className="rounded px-2 py-1 text-[10px] text-amber-300/75 hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">{copied === 'id' ? 'Copied' : 'Copy ID'}</button>
            </div>
          </details>

          <p className="rounded-xl border border-white/[0.07] bg-white/[0.018] px-4 py-3 text-[10px] leading-5 text-white/55">
            This view exposes operational aggregates only. OAuth tokens, session hashes, IP addresses, raw event context, Stripe IDs, task content and message bodies are never returned.
          </p>
        </div>
      </aside>
    </div>
  )
}

function SectionTitle({ id, title, note }: { id: string; title: string; note?: string }) {
  return <div><h3 id={id} className="text-xs font-semibold text-white/78">{title}</h3>{note && <p className="mt-1 text-[10px] text-white/55">{note}</p>}</div>
}

function Info({ label, value, note, title, mono }: { label: string; value: string; note?: string; title?: string; mono?: boolean }) {
  return (
    <div className="min-w-0 rounded-lg border border-white/[0.065] bg-black/20 p-2.5" title={title}>
      <dt className="text-[9px] font-medium uppercase tracking-[0.1em] text-white/55">{label}</dt>
      <dd className={`mt-1.5 truncate text-xs text-white/72 ${mono ? 'font-mono tabular-nums' : ''}`}>{value}</dd>
      {note && <dd className="mt-1 text-[9px] leading-4 text-white/55">{note}</dd>}
    </div>
  )
}

function StateBadge({ state }: { state: 'valid' | 'expired' | 'unknown' }) {
  const classes = state === 'valid' ? 'border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-300' : state === 'expired' ? 'border-rose-400/20 bg-rose-400/[0.08] text-rose-300' : 'border-white/10 bg-white/[0.04] text-white/55'
  return <span className={`rounded border px-1.5 py-0.5 text-[9px] ${classes}`}>{titleCase(state)}</span>
}

function InlineEmpty({ children }: { children: ReactNode }) {
  return <p className="mt-4 rounded-lg border border-dashed border-white/10 px-3 py-5 text-center text-xs text-white/55">{children}</p>
}

function DetailSkeleton() {
  return (
    <div role="status" aria-live="polite" className="space-y-4">
      <span className="sr-only">Loading user details</span>
      {[180, 130, 210].map((height) => <div key={height} className="animate-pulse rounded-xl border border-white/[0.07] bg-white/[0.035]" style={{ height }} />)}
    </div>
  )
}
