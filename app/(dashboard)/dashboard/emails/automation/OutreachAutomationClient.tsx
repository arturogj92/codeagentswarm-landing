'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Tab = 'funnel' | 'users' | 'simulate' | 'exclusions'

interface FunnelData {
  since_days: number
  stats: Record<string, { sent: number; replied: number; dry_run: number }>
}

interface UserStatus {
  user_id: string
  email: string
  name: string | null
  is_excluded: boolean
  e1_quick_question: { sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  e2_we_miss_you: { sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  e3_follow_up: { sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
}

interface SimulateData {
  as_of_date: string
  templates: Record<string, Array<{ user_id: string; email: string; name: string | null; reason: string | null }>>
}

interface Exclusion {
  user_id: string
  reason: string
  excluded_by: string
  created_at: string
  users: { email: string; name: string | null }
}

const TEMPLATE_LABEL: Record<string, string> = {
  'quick-question': 'E1 · Quick question',
  'we-miss-you': 'E2 · We miss you',
  'follow-up-quick-question': 'E3 · Follow-up',
}

const TEMPLATE_COLOR: Record<string, string> = {
  'quick-question': 'border-amber-400/40 bg-amber-400/5',
  'we-miss-you': 'border-rose-400/40 bg-rose-400/5',
  'follow-up-quick-question': 'border-sky-400/40 bg-sky-400/5',
}

export default function OutreachAutomationClient() {
  const [tab, setTab] = useState<Tab>('funnel')
  const [funnel, setFunnel] = useState<FunnelData | null>(null)
  const [users, setUsers] = useState<UserStatus[]>([])
  const [simulate, setSimulate] = useState<SimulateData | null>(null)
  const [exclusions, setExclusions] = useState<Exclusion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [simulateDate, setSimulateDate] = useState<string>('')
  const [runReport, setRunReport] = useState<unknown | null>(null)

  const loadFunnel = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/dashboard/outreach/funnel?days=30')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setFunnel(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    } finally { setLoading(false) }
  }, [])

  const loadUsers = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/dashboard/outreach/users')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setUsers(data.users || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    } finally { setLoading(false) }
  }, [])

  const loadExclusions = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/dashboard/outreach/exclusions')
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setExclusions(data.exclusions || [])
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    } finally { setLoading(false) }
  }, [])

  const runSimulate = useCallback(async () => {
    setLoading(true); setError(null)
    try {
      const res = await fetch('/api/dashboard/outreach/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(simulateDate ? { as_of_date: simulateDate } : {}),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setSimulate(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    } finally { setLoading(false) }
  }, [simulateDate])

  const runNow = useCallback(async (dryRun: boolean) => {
    if (!confirm(dryRun ? 'Run the cron now in DRY-RUN mode?' : '⚠️ Send REAL emails to all candidates right now?')) return
    setLoading(true); setError(null); setRunReport(null)
    try {
      const res = await fetch('/api/dashboard/outreach/run-now', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dry_run: dryRun }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || 'Failed')
      setRunReport(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    if (tab === 'funnel') loadFunnel()
    else if (tab === 'users') loadUsers()
    else if (tab === 'exclusions') loadExclusions()
  }, [tab, loadFunnel, loadUsers, loadExclusions])

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <Link href="/dashboard/emails" className="text-xs text-white/40 hover:text-white/70">← Emails</Link>
            <h1 className="text-2xl font-bold mt-1 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Outreach automation
            </h1>
            <p className="text-sm text-white/50 mt-1">
              Automated user feedback funnel. UNIQUE constraint guarantees no duplicate sends.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => runNow(true)}
              className="px-3 py-1.5 text-xs rounded-lg border border-white/20 hover:border-amber-400/50 hover:bg-amber-400/10 transition"
              disabled={loading}>
              Run now (dry-run)
            </button>
            <button
              onClick={() => runNow(false)}
              className="px-3 py-1.5 text-xs rounded-lg border border-rose-400/30 text-rose-300 hover:bg-rose-400/10 transition"
              disabled={loading}>
              Run now (LIVE)
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-white/10 mb-6">
          {(['funnel', 'users', 'simulate', 'exclusions'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm capitalize transition border-b-2 ${
                tab === t
                  ? 'border-amber-400 text-white'
                  : 'border-transparent text-white/40 hover:text-white/70'
              }`}>
              {t}
            </button>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-lg border border-rose-400/30 bg-rose-400/5 text-sm text-rose-300">
            {error}
          </div>
        )}

        {/* Run report banner */}
        {runReport != null && (
          <div className="mb-4 p-3 rounded-lg border border-amber-400/30 bg-amber-400/5 text-xs">
            <div className="text-amber-300 font-semibold mb-1">Last run report</div>
            <pre className="text-white/80 overflow-x-auto">{JSON.stringify(runReport, null, 2)}</pre>
          </div>
        )}

        {/* FUNNEL TAB */}
        {tab === 'funnel' && funnel && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(['quick-question', 'we-miss-you', 'follow-up-quick-question'] as const).map((slug) => {
              const s = funnel.stats[slug] || { sent: 0, replied: 0, dry_run: 0 }
              const rate = s.sent > 0 ? Math.round((s.replied / s.sent) * 100) : 0
              return (
                <div key={slug} className={`rounded-xl border p-5 ${TEMPLATE_COLOR[slug]}`}>
                  <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">
                    {TEMPLATE_LABEL[slug]}
                  </div>
                  <div className="text-3xl font-bold">{s.sent}</div>
                  <div className="text-xs text-white/50">sent in last {funnel.since_days} days</div>
                  <div className="mt-3 flex gap-4 text-xs">
                    <div><span className="text-emerald-400">{s.replied}</span> replied <span className="text-white/30">({rate}%)</span></div>
                    {s.dry_run > 0 && <div className="text-amber-300">{s.dry_run} dry-run</div>}
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="text-left px-4 py-3">User</th>
                  <th className="text-left px-2 py-3">E1</th>
                  <th className="text-left px-2 py-3">E2</th>
                  <th className="text-left px-2 py-3">E3</th>
                  <th className="text-right px-4 py-3">Excluded</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.user_id} className="border-t border-white/5 hover:bg-white/[0.02]">
                    <td className="px-4 py-2">
                      <div className="font-medium text-white">{u.name || '—'}</div>
                      <div className="text-xs text-white/40">{u.email}</div>
                    </td>
                    {(['e1_quick_question', 'e2_we_miss_you', 'e3_follow_up'] as const).map((k) => {
                      const e = u[k]
                      return (
                        <td key={k} className="px-2 py-2 text-xs">
                          {!e ? <span className="text-white/20">—</span> : (
                            <span className={e.responded_at ? 'text-emerald-400' : 'text-amber-300'}>
                              {e.responded_at ? '✓ replied' : 'pending'}
                              {e.is_dry_run && <span className="ml-1 text-white/40">(dry)</span>}
                            </span>
                          )}
                        </td>
                      )
                    })}
                    <td className="px-4 py-2 text-right">
                      {u.is_excluded ? (
                        <span className="text-rose-300 text-xs">excluded</span>
                      ) : (
                        <span className="text-white/30 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && !loading && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-white/30">No users yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* SIMULATE TAB */}
        {tab === 'simulate' && (
          <div>
            <div className="flex items-end gap-3 mb-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">
                  Pretend "now" is
                </label>
                <input
                  type="date"
                  value={simulateDate}
                  onChange={(e) => setSimulateDate(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm"
                />
              </div>
              <button
                onClick={runSimulate}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-amber-400 text-black text-sm font-medium hover:bg-amber-300 disabled:opacity-50">
                Simulate
              </button>
              <span className="text-xs text-white/40 ml-2">Leave blank to use today's date</span>
            </div>

            {simulate && (
              <div className="space-y-4">
                {Object.entries(simulate.templates).map(([slug, candidates]) => (
                  <div key={slug} className={`rounded-xl border p-4 ${TEMPLATE_COLOR[slug]}`}>
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="text-sm font-semibold">{TEMPLATE_LABEL[slug]}</div>
                      <div className="text-xs text-white/50">{candidates.length} candidates</div>
                    </div>
                    {candidates.length === 0 ? (
                      <div className="text-xs text-white/30">No candidates at this date.</div>
                    ) : (
                      <ul className="space-y-1 text-xs">
                        {candidates.map((c) => (
                          <li key={c.user_id} className="flex justify-between gap-3">
                            <span className="text-white">{c.name || c.email}</span>
                            <span className="text-white/40 truncate">{c.reason}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* EXCLUSIONS TAB */}
        {tab === 'exclusions' && (
          <div className="rounded-xl border border-white/10 overflow-hidden">
            <div className="px-4 py-2 bg-white/5 text-xs text-white/50">
              {exclusions.length} users will NEVER receive automated emails.
            </div>
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-[10px] uppercase tracking-wider text-white/40">
                <tr>
                  <th className="text-left px-4 py-2">User</th>
                  <th className="text-left px-2 py-2">Reason</th>
                  <th className="text-left px-2 py-2">By</th>
                  <th className="text-right px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {exclusions.map((ex) => (
                  <tr key={ex.user_id} className="border-t border-white/5">
                    <td className="px-4 py-2">
                      <div className="text-white">{ex.users?.name || ex.users?.email || ex.user_id}</div>
                      <div className="text-xs text-white/40">{ex.users?.email}</div>
                    </td>
                    <td className="px-2 py-2 text-xs text-white/70">{ex.reason}</td>
                    <td className="px-2 py-2 text-xs text-white/40">{ex.excluded_by}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        onClick={async () => {
                          if (!confirm(`Remove exclusion for ${ex.users?.email}?`)) return
                          await fetch(`/api/dashboard/outreach/exclusions/${ex.user_id}`, { method: 'DELETE' })
                          loadExclusions()
                        }}
                        className="text-xs text-rose-300 hover:underline">remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {loading && <div className="mt-6 text-center text-xs text-white/40">Loading…</div>}
      </div>
    </div>
  )
}
