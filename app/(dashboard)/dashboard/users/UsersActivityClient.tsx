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
  filterUsers,
  getLifecycle,
  normalizeAgent,
  summarizeUsers,
  type Lifecycle,
  type UserActivityDetail,
  type UserActivityOverview,
  type UserActivityRow,
  type UserFilters,
} from './users-activity'

const PAGE_SIZE = 25
const DETAIL_DAYS = 180
const DAY_MS = 86_400_000

type SortKey = 'user' | 'activity' | 'last7' | 'periods' | 'agent' | 'joined'
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
        case 'agent':
          a = agentLabel(left.most_used_agent)
          b = agentLabel(right.most_used_agent)
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
    () => unique(users.map((user) => normalizeAgent(user.most_used_agent))).filter(Boolean),
    [users],
  )
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
    setSortDirection(next === 'joined' || next === 'last7' || next === 'periods' ? 'desc' : 'asc')
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
              onClick={() => void loadUsers()}
              disabled={loading}
              className="rounded-lg border border-white/15 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/70 transition hover:border-amber-400/40 hover:bg-amber-400/[0.07] hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-wait disabled:opacity-50"
            >
              {loading ? 'Refreshing…' : 'Refresh'}
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
          drawerRef={drawerRef}
          closeButtonRef={closeButtonRef}
          onDays={setHeatmapDays}
          onClose={closeDetail}
          onRetry={() => void loadDetail(selected.user_id)}
          onCopy={(value, key) => void copyValue(value, key)}
        />
      )}
    </div>
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
      <table className="w-full min-w-[980px] border-collapse">
        <caption className="sr-only">Registered users and recorded product activity</caption>
        <thead>
          <tr className="border-b border-white/[0.08] bg-white/[0.018]">
            <SortHeader label="User" sort="user" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Activity" sort="activity" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Last 7 days" sort="last7" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Work periods" sort="periods" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Most-used agent" sort="agent" active={sortKey} direction={sortDirection} onSort={onSort} />
            <SortHeader label="Joined" sort="joined" active={sortKey} direction={sortDirection} onSort={onSort} />
            <th className="w-20 px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55">Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const lifecycle = LIFECYCLE_META[getLifecycle(user.days_since_last)]
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
                  <LifecycleBadge user={user} />
                  <p className="mt-1.5 text-[11px] text-white/55" title={formatDateTime(user.last_active)}>{relativeDate(user.last_active)}</p>
                </td>
                <td className="px-4 py-3.5">
                  <Last7 flags={user.last7} />
                </td>
                <td className="px-4 py-3.5">
                  <div className="font-mono text-sm text-white/80"><span className="text-amber-300">{user.work_periods_7d}</span> / {user.work_periods_30d}</div>
                  <p className="mt-1 text-[10px] text-white/55">7d / 30d · {user.last_app_version || 'version unknown'}</p>
                </td>
                <td className="px-4 py-3.5 text-xs text-white/65">{user.most_used_agent ? agentLabel(user.most_used_agent) : 'Not available'}</td>
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
      {users.map((user) => (
        <li key={user.user_id} className="rounded-xl border border-white/[0.09] bg-[#111111] p-4">
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
            <div><dt className="text-white/55">Most-used agent</dt><dd className="mt-1 truncate text-white/70">{user.most_used_agent ? agentLabel(user.most_used_agent) : 'Not available'}</dd></div>
            <div><dt className="text-white/55">Version</dt><dd className="mt-1 text-white/70">{user.last_app_version || 'Unknown'}</dd></div>
          </dl>
        </li>
      ))}
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

function UserDrawer({ user, detail, loading, error, days, copied, drawerRef, closeButtonRef, onDays, onClose, onRetry, onCopy }: {
  user: UserActivityRow
  detail: UserActivityDetail | null
  loading: boolean
  error: string | null
  days: number
  copied: string | null
  drawerRef: RefObject<HTMLElement | null>
  closeButtonRef: RefObject<HTMLButtonElement | null>
  onDays: (days: number) => void
  onClose: () => void
  onRetry: () => void
  onCopy: (value: string, key: string) => void
}) {
  const activeStart = parseDate(user.first_active)
  const observedDays = activeStart ? Math.max(user.active_days, Math.floor((Date.now() - activeStart.getTime()) / DAY_MS) + 1) : Math.max(user.active_days, 0)
  const activeRate = observedDays > 0 ? Math.min(100, Math.round((user.active_days / observedDays) * 100)) : 0
  const totalAgentSelections = detail?.agents.reduce((sum, agent) => sum + agent.n, 0) || 0

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
              <Info label="Most-used agent" value={user.most_used_agent ? agentLabel(user.most_used_agent) : 'Not available'} />
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
