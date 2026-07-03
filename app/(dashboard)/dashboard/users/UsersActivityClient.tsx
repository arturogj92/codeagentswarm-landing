'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import ActivityHeatmap from './ActivityHeatmap'

interface UserActivityRow {
  user_id: string
  name: string | null
  email: string
  created_at: string
  total_clicks: number
  active_days: number
  first_active: string | null
  last_active: string | null
  days_since_last: number | null
  current_streak: number
  longest_streak: number
  preferred_agent: string | null
}

interface UserActivityDetail {
  calendar: { d: string; clicks: number }[]
  agents: { agent: string; n: number }[]
}

const WINDOW_DAYS = 180 // ~6 months

const AGENT_LABELS: Record<string, string> = {
  'claude-code': 'Claude Code',
  'codex cli': 'Codex',
  'antigravity cli': 'Antigravity',
  // Legacy: historical telemetry still contains "gemini cli" events (Gemini CLI was
  // retired 2026-06-18 and replaced by Antigravity). Kept so old data renders correctly.
  'gemini cli': 'Gemini',
}
const AGENT_BADGE: Record<string, string> = {
  'claude-code': 'bg-orange-400/10 text-orange-300 border-orange-400/25',
  'codex cli': 'bg-sky-400/10 text-sky-300 border-sky-400/25',
  'antigravity cli': 'bg-emerald-400/10 text-emerald-300 border-emerald-400/25',
  'gemini cli': 'bg-violet-400/10 text-violet-300 border-violet-400/25',
}
const AGENT_BAR: Record<string, string> = {
  'claude-code': 'bg-orange-400',
  'codex cli': 'bg-sky-400',
  'antigravity cli': 'bg-emerald-400',
  'gemini cli': 'bg-violet-400',
}

function agentLabel(a: string | null): string {
  if (!a) return 'Unknown'
  return AGENT_LABELS[a] || a.replace(/\b\w/g, (c) => c.toUpperCase())
}

function statusOf(daysSince: number | null): { label: string; cls: string } {
  if (daysSince == null) return { label: 'No activity', cls: 'bg-white/5 text-white/40 border-white/10' }
  if (daysSince < 7) return { label: 'Active', cls: 'bg-green-400/10 text-green-400 border-green-400/20' }
  if (daysSince <= 30) return { label: 'Cooling', cls: 'bg-amber-400/10 text-amber-400 border-amber-400/20' }
  return { label: 'Dormant', cls: 'bg-red-400/10 text-red-400 border-red-400/20' }
}

function lastActiveLabel(days: number | null): string {
  if (days == null) return 'Never'
  if (days <= 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

function parseDate(s: string | null): Date | null {
  if (!s) return null
  // Date-only strings are parsed at local noon to avoid timezone day-shifts.
  return new Date(`${s}T12:00:00`)
}

function formatDate(s: string | null): string {
  const d = parseDate(s)
  if (!d) return '-'
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

type SortKey =
  | 'name'
  | 'status'
  | 'current_streak'
  | 'active_days'
  | 'last_active'
  | 'total_clicks'
  | 'created_at'

const NUMERIC_KEYS: SortKey[] = ['status', 'current_streak', 'active_days', 'last_active', 'total_clicks', 'created_at']

export default function UsersActivityClient() {
  const [users, setUsers] = useState<UserActivityRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('last_active')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const [selected, setSelected] = useState<UserActivityRow | null>(null)
  const [detail, setDetail] = useState<UserActivityDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard/users/overview')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed to load users')
      setUsers(data.users || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const openDetail = useCallback(async (user: UserActivityRow) => {
    setSelected(user)
    setDetail(null)
    setDetailLoading(true)
    try {
      const res = await fetch(`/api/dashboard/users/${user.user_id}/detail?days=${WINDOW_DAYS}`)
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setDetail(data)
    } catch {
      setDetail({ calendar: [], agents: [] })
    } finally {
      setDetailLoading(false)
    }
  }, [])

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir(NUMERIC_KEYS.includes(key) ? 'desc' : 'asc')
    }
  }

  const sorted = useMemo(() => {
    const dir = sortDir === 'asc' ? 1 : -1
    const val = (u: UserActivityRow): number | string => {
      switch (sortKey) {
        case 'name': return (u.name || u.email || '').toLowerCase()
        // Fewer days since last activity = more recently active. Invert so that
        // "desc" puts the freshest users on top and never-active users at the bottom.
        case 'status':
        case 'last_active': return u.days_since_last == null ? -Infinity : -u.days_since_last
        case 'current_streak': return u.current_streak
        case 'active_days': return u.active_days
        case 'total_clicks': return u.total_clicks
        case 'created_at': return u.created_at ? parseDate(u.created_at)!.getTime() : 0
      }
    }
    return [...users].sort((a, b) => {
      const va = val(a)
      const vb = val(b)
      if (typeof va === 'string' || typeof vb === 'string') {
        return String(va).localeCompare(String(vb)) * dir
      }
      if (va === vb) return 0
      return va > vb ? dir : -dir
    })
  }, [users, sortKey, sortDir])

  const summary = useMemo(() => {
    let active = 0, cooling = 0, dormant = 0, none = 0
    for (const u of users) {
      const d = u.days_since_last
      if (d == null) none++
      else if (d < 7) active++
      else if (d <= 30) cooling++
      else dormant++
    }
    return { total: users.length, active, cooling, dormant, none }
  }, [users])

  if (selected) {
    return (
      <UserDetail
        user={selected}
        detail={detail}
        loading={detailLoading}
        onBack={() => { setSelected(null); setDetail(null) }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/dashboard/emails" className="text-xs text-white/40 hover:text-white/70">← Emails</Link>
            <h1 className="text-2xl font-bold mt-1 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Users
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Real activity from in-app events. Last active is computed from button_clicks, not last_login.
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="px-3 py-1.5 text-xs rounded-lg border border-white/20 hover:border-amber-400/50 hover:bg-amber-400/10 transition disabled:opacity-50"
          >
            Refresh
          </button>
        </div>

        {/* Summary chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <SummaryChip label="Total users" value={summary.total} accent="text-white" />
          <SummaryChip label="Active (<7d)" value={summary.active} accent="text-green-400" />
          <SummaryChip label="Cooling (7-30d)" value={summary.cooling} accent="text-amber-400" />
          <SummaryChip label="Dormant (>30d)" value={summary.dormant} accent="text-red-400" />
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-rose-400/30 bg-rose-400/5 text-sm text-rose-300">
            {error}
            <button onClick={load} className="ml-3 underline cursor-pointer">Retry</button>
          </div>
        )}

        {loading ? (
          <div className="bg-[#111111] border border-white/10 rounded-xl p-10 text-center text-white/40 text-sm">
            Loading activity…
          </div>
        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-x-auto">
            <table className="w-full min-w-[760px]">
              <thead>
                <tr className="border-b border-white/10">
                  <Th label="User" col="name" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="left" />
                  <Th label="Status" col="status" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="left" />
                  <Th label="Streak" col="current_streak" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="right" />
                  <Th label="Active days" col="active_days" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="right" />
                  <Th label="Last active" col="last_active" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="right" />
                  <Th label="Clicks" col="total_clicks" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="right" />
                  <Th label="Joined" col="created_at" sortKey={sortKey} sortDir={sortDir} onSort={toggleSort} align="right" />
                </tr>
              </thead>
              <tbody>
                {sorted.map((u) => {
                  const status = statusOf(u.days_since_last)
                  return (
                    <tr
                      key={u.user_id}
                      onClick={() => openDetail(u)}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-sm text-white/90 truncate max-w-[220px]">{u.name || '—'}</div>
                        <div className="text-xs text-white/40 truncate max-w-[220px]">{u.email}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${status.cls}`}>
                          {status.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm tabular-nums">
                        {u.current_streak > 0 ? (
                          <span className="text-amber-300">🔥 {u.current_streak}</span>
                        ) : (
                          <span className="text-white/30">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-sm tabular-nums text-white/80">{u.active_days}</td>
                      <td className="px-4 py-3 text-right text-sm tabular-nums text-white/60">{lastActiveLabel(u.days_since_last)}</td>
                      <td className="px-4 py-3 text-right text-sm tabular-nums text-white/80">{u.total_clicks.toLocaleString('en-US')}</td>
                      <td className="px-4 py-3 text-right text-xs text-white/50">{formatDate(u.created_at)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function SummaryChip({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className={`text-2xl font-bold mt-0.5 tabular-nums ${accent}`}>{value}</div>
    </div>
  )
}

function Th({
  label, col, sortKey, sortDir, onSort, align,
}: {
  label: string
  col: SortKey
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onSort: (k: SortKey) => void
  align: 'left' | 'right'
}) {
  const active = sortKey === col
  return (
    <th className={`px-4 py-3 ${align === 'right' ? 'text-right' : 'text-left'} text-xs font-medium text-white/40 uppercase tracking-wider select-none`}>
      <button
        onClick={() => onSort(col)}
        className={`inline-flex items-center gap-1 hover:text-white/70 transition-colors cursor-pointer ${active ? 'text-amber-400' : ''} ${align === 'right' ? 'flex-row-reverse' : ''}`}
      >
        {label}
        <span className="text-[8px]">{active ? (sortDir === 'asc' ? '▲' : '▼') : ''}</span>
      </button>
    </th>
  )
}

function UserDetail({
  user, detail, loading, onBack,
}: {
  user: UserActivityRow
  detail: UserActivityDetail | null
  loading: boolean
  onBack: () => void
}) {
  const status = statusOf(user.days_since_last)
  const totalAgent = (detail?.agents || []).reduce((s, a) => s + a.n, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button onClick={onBack} className="text-xs text-white/40 hover:text-white/70 mb-3 cursor-pointer">← All users</button>

        <div className="flex items-center gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-bold">{user.name || '—'}</h1>
            <p className="text-sm text-white/50">{user.email}</p>
          </div>
          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${status.cls}`}>
            {status.label}
          </span>
          {user.preferred_agent && (
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${AGENT_BADGE[user.preferred_agent] || 'bg-white/5 text-white/60 border-white/10'}`}>
              Prefers {agentLabel(user.preferred_agent)}
            </span>
          )}
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          <Stat label="Current streak" value={user.current_streak > 0 ? `🔥 ${user.current_streak}` : '—'} />
          <Stat label="Longest streak" value={`${user.longest_streak}d`} />
          <Stat label="Active days" value={String(user.active_days)} />
          <Stat label="Total clicks" value={user.total_clicks.toLocaleString('en-US')} />
          <Stat label="First seen" value={formatDate(user.first_active)} small />
          <Stat label="Last active" value={lastActiveLabel(user.days_since_last)} small />
        </div>

        {/* Heatmap */}
        <div className="bg-[#111111] border border-white/10 rounded-xl p-5 mb-6">
          <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
            Activity · last 6 months
          </div>
          {loading ? (
            <div className="text-white/40 text-sm py-6">Loading…</div>
          ) : detail && detail.calendar.length > 0 ? (
            <ActivityHeatmap data={detail.calendar} days={WINDOW_DAYS} />
          ) : (
            <div className="text-white/40 text-sm py-6">No activity in this window.</div>
          )}
        </div>

        {/* Agent breakdown */}
        {detail && detail.agents.length > 0 && (
          <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
            <div className="text-xs font-medium text-white/40 uppercase tracking-wider mb-4">
              Agent usage
            </div>
            <div className="space-y-3">
              {detail.agents.map((a) => {
                const pct = totalAgent > 0 ? Math.round((a.n / totalAgent) * 100) : 0
                return (
                  <div key={a.agent}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">{agentLabel(a.agent)}</span>
                      <span className="text-white/40 tabular-nums">{a.n} · {pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className={`h-full ${AGENT_BAR[a.agent] || 'bg-white/40'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-white/40">{label}</div>
      <div className={`font-bold mt-0.5 ${small ? 'text-sm' : 'text-xl'} text-white/90`}>{value}</div>
    </div>
  )
}
