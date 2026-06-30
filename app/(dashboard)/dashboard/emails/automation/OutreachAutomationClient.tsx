'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

type Tab = 'funnel' | 'users' | 'simulate' | 'exclusions'

interface FunnelData {
  since_days: number
  stats: Record<string, { sent: number; replied: number; dry_run: number }>
}

interface NextAction {
  kind: 'excluded' | 'eligible' | 'scheduled' | 'cooldown' | 'waiting' | 'done' | 'none'
  label: string
  template: string | null
  date: string | null
}

interface UserStatus {
  user_id: string
  email: string
  name: string | null
  is_excluded: boolean
  e1_quick_question: { sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  e2_we_miss_you: { sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  e3_follow_up: { sent_at: string; responded_at: string | null; is_dry_run: boolean } | null
  active_days_14?: number
  active_days_30?: number
  last_active?: string | null
  last_email_sent_at?: string | null
  next_action?: NextAction
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

// Visual style + plain-English meaning for each "Next" state.
const NEXT_KIND: Record<NextAction['kind'], { color: string; help: string }> = {
  eligible:  { color: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/5', help: 'Will be sent on the next daily run (10:00 UTC).' },
  scheduled: { color: 'text-sky-300 border-sky-400/30 bg-sky-400/5',           help: 'Becomes eligible on this exact date (deterministic).' },
  waiting:   { color: 'text-amber-300 border-amber-400/30 bg-amber-400/5',     help: 'Depends on the user staying active. No fixed date.' },
  cooldown:  { color: 'text-violet-300 border-violet-400/30 bg-violet-400/5',  help: 'Got an email recently. Blocked for 14 days from the last send.' },
  done:      { color: 'text-white/40 border-white/10 bg-white/5',              help: 'Already went through the funnel. Nothing left to send.' },
  excluded:  { color: 'text-rose-300 border-rose-400/30 bg-rose-400/5',        help: 'On the manual opt-out list. Never receives automated email.' },
  none:      { color: 'text-white/30 border-white/10 bg-transparent',          help: 'Does not match any funnel rule right now.' },
}

// The 3 emails in plain English. "E1/E2/E3" is just "Email 1/2/3" in the sequence.
const FUNNEL_STEPS = [
  {
    code: 'E1',
    name: 'Email 1 · Quick question',
    head: 'text-amber-300',
    when: 'They have used the app on 3 or more separate days in the last 2 weeks (a real user, not a one-off) and were last active before today.',
    says: '"Quick question": what made you stick, and what you would hate to lose.',
    then: 'If they do not reply within 7 days, they get Email 3.',
  },
  {
    code: 'E2',
    name: 'Email 2 · We miss you',
    head: 'text-rose-300',
    when: 'They used to be active (5 or more separate days in a month) but have not opened the app for 5 to 30 days.',
    says: '"Did something break?": a no-pressure nudge to learn why they left.',
    then: 'Sent once. Nothing follows.',
  },
  {
    code: 'E3',
    name: 'Email 3 · Follow-up',
    head: 'text-sky-300',
    when: '7 days after Email 1, and only if they never replied to it.',
    says: '"Just bumping this": a one-line gentle reminder.',
    then: 'Sent once. This is the last email in the sequence.',
  },
]

// Status legend for the Users table cells (E1/E2/E3 columns).
const STATUS_LEGEND: Array<{ dot: string; term: string; meaning: string }> = [
  { dot: 'text-amber-300', term: 'pending', meaning: 'Email was sent, still waiting for a reply.' },
  { dot: 'text-emerald-400', term: '✓ replied', meaning: 'User answered this email.' },
  { dot: 'text-white/40', term: '(dry)', meaning: 'Recorded as a dry-run, no real email left.' },
  { dot: 'text-white/20', term: '—', meaning: 'This email was never sent to the user.' },
  { dot: 'text-rose-300', term: 'excluded', meaning: 'Opted out. Never receives automated email.' },
]

function fmtDate(iso: string | null | undefined): string {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })
}

function daysUntil(iso: string | null | undefined): number | null {
  if (!iso) return null
  return Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000)
}

// Next 10:00 UTC occurrence from now.
function nextCronLabel(): string {
  const now = new Date()
  const next = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 10, 0, 0))
  if (now.getTime() >= next.getTime()) next.setUTCDate(next.getUTCDate() + 1)
  const isTomorrow = next.getUTCDate() !== now.getUTCDate()
  const hrs = Math.round((next.getTime() - now.getTime()) / 3600000)
  return `${isTomorrow ? 'tomorrow' : 'today'} 10:00 UTC (~${hrs}h)`
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
  const [showRules, setShowRules] = useState(true)

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

  // Load users once on mount so the summary bar has data on any tab.
  useEffect(() => { loadUsers() }, [loadUsers])

  // Headline counts derived from the per-user next_action.
  const summary = (() => {
    let eligible = 0, scheduled = 0, cooldown = 0, excluded = 0
    for (const u of users) {
      const k = u.next_action?.kind
      if (k === 'eligible') eligible++
      else if (k === 'scheduled') scheduled++
      else if (k === 'cooldown') cooldown++
      if (u.is_excluded) excluded++
    }
    return { eligible, scheduled, cooldown, excluded, total: users.length }
  })()

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

        {/* Summary bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4">
            <div className="text-2xl font-bold text-emerald-300">{summary.eligible}</div>
            <div className="text-[11px] text-white/50 mt-0.5">eligible now</div>
            <div className="text-[10px] text-white/30 mt-1">go out {nextCronLabel()}</div>
          </div>
          <div className="rounded-xl border border-sky-400/30 bg-sky-400/5 p-4">
            <div className="text-2xl font-bold text-sky-300">{summary.scheduled}</div>
            <div className="text-[11px] text-white/50 mt-0.5">scheduled (future date)</div>
            <div className="text-[10px] text-white/30 mt-1">mostly follow-ups (Email 3)</div>
          </div>
          <div className="rounded-xl border border-violet-400/30 bg-violet-400/5 p-4">
            <div className="text-2xl font-bold text-violet-300">{summary.cooldown}</div>
            <div className="text-[11px] text-white/50 mt-0.5">in cooldown</div>
            <div className="text-[10px] text-white/30 mt-1">14 days between emails</div>
          </div>
          <div className="rounded-xl border border-rose-400/30 bg-rose-400/5 p-4">
            <div className="text-2xl font-bold text-rose-300">{summary.excluded}</div>
            <div className="text-[11px] text-white/50 mt-0.5">excluded</div>
            <div className="text-[10px] text-white/30 mt-1">never auto-mailed</div>
          </div>
        </div>

        {/* What this does (collapsible, open by default) */}
        <div className="mb-6 rounded-xl border border-white/10 overflow-hidden">
          <button
            onClick={() => setShowRules((v) => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm text-white/80 hover:bg-white/[0.02] transition">
            <span>What this does, and what E1 / E2 / E3 mean</span>
            <span className="text-white/40">{showRules ? '▲' : '▼'}</span>
          </button>
          {showRules && (
            <div className="px-4 pb-5 pt-1 border-t border-white/10 space-y-5">
              <p className="text-xs text-white/60 leading-relaxed">
                This page runs an automatic feedback campaign. Once a day (at 10:00 UTC) it looks at how
                people use the app and sends up to three short emails asking for feedback. The labels
                <span className="text-white/80"> E1, E2, E3</span> are just <span className="text-white/80">Email 1, 2 and 3</span> in
                the sequence below. Each person follows one of two paths:
              </p>

              {/* Flow diagram */}
              <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4 space-y-3">
                <div className="text-[10px] uppercase tracking-widest text-white/40">The sequence at a glance</div>
                {/* Engaged path */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="px-2 py-1 rounded border border-white/15 text-white/70">A user who is active now</span>
                  <span className="text-white/30">→</span>
                  <span className="px-2 py-1 rounded border border-amber-400/40 bg-amber-400/10 text-amber-200">Email 1: Quick question</span>
                  <span className="text-white/40">→ no reply after 7 days →</span>
                  <span className="px-2 py-1 rounded border border-sky-400/40 bg-sky-400/10 text-sky-200">Email 3: Follow-up</span>
                  <span className="text-white/30">(if they reply, it stops)</span>
                </div>
                {/* Churn path */}
                <div className="flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="px-2 py-1 rounded border border-white/15 text-white/70">A user who was active, now away 5 to 30 days</span>
                  <span className="text-white/30">→</span>
                  <span className="px-2 py-1 rounded border border-rose-400/40 bg-rose-400/10 text-rose-200">Email 2: We miss you</span>
                </div>
              </div>

              {/* Per-email detail */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {FUNNEL_STEPS.map((s) => (
                  <div key={s.code} className="rounded-lg border border-white/10 p-3">
                    <div className={`text-xs font-semibold mb-2 ${s.head}`}>{s.name}</div>
                    <div className="space-y-1.5 text-[11px]">
                      <div><span className="text-white/40">Who gets it: </span><span className="text-white/70">{s.when}</span></div>
                      <div><span className="text-white/40">It says: </span><span className="text-white/60 italic">{s.says}</span></div>
                      <div><span className="text-white/40">Then: </span><span className="text-white/70">{s.then}</span></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Guardrails */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">The guardrails (so nobody gets spammed)</div>
                <ul className="text-[11px] text-white/60 space-y-1 list-disc list-inside">
                  <li><span className="text-white/80">Once only:</span> the same email never goes to the same person twice.</li>
                  <li><span className="text-white/80">14-day gap:</span> nobody gets two emails within 14 days. The one exception is Email 3, which follows Email 1 by design.</li>
                  <li><span className="text-white/80">Auto-stop on reply:</span> the moment someone answers, they leave the sequence.</li>
                  <li><span className="text-white/80">Opt-out:</span> anyone on the exclusions list is skipped entirely.</li>
                </ul>
              </div>

              {/* Status legend */}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-white/40 mb-2">What the words in the table mean</div>
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {STATUS_LEGEND.map((s) => (
                    <div key={s.term} className="text-[11px] text-white/60">
                      <span className={`font-medium ${s.dot}`}>{s.term}</span>
                      <span className="text-white/40">: {s.meaning}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
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
                  <th className="text-left px-2 py-3" title="Email 1: Quick question">E1</th>
                  <th className="text-left px-2 py-3" title="Email 2: We miss you">E2</th>
                  <th className="text-left px-2 py-3" title="Email 3: Follow-up">E3</th>
                  <th className="text-left px-2 py-3" title="The next email this user will get, and when">Next</th>
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
                    <td className="px-2 py-2">
                      {(() => {
                        const na = u.next_action
                        if (!na) return <span className="text-white/20 text-xs">—</span>
                        const style = NEXT_KIND[na.kind] || NEXT_KIND.none
                        const d = daysUntil(na.date)
                        return (
                          <span
                            title={style.help}
                            className={`inline-block text-[11px] px-2 py-0.5 rounded border ${style.color}`}>
                            {na.label}
                            {na.date && (
                              <span className="text-white/40"> · {fmtDate(na.date)}{d != null && d >= 0 ? ` (${d}d)` : ''}</span>
                            )}
                          </span>
                        )
                      })()}
                    </td>
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
                  <tr><td colSpan={6} className="px-4 py-8 text-center text-white/30">No users yet.</td></tr>
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
