'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type {
  Exclusion,
  FunnelStats,
  OutreachEmailStatus,
  OutreachRun,
  SimulateResult,
  UserStatus,
} from '@/lib/outreach-backend-client'

type Tab = 'performance' | 'runs' | 'users' | 'exclusions'

const SLUGS = ['quick-question', 'we-miss-you', 'follow-up-quick-question'] as const
const META = {
  'quick-question': { code: 'E1', title: 'Quick question', color: 'text-amber-300', note: 'Best-performing message. Replies count only when the original thread matches.' },
  'we-miss-you': { code: 'E2', title: 'We miss you', color: 'text-rose-300', note: 'Possible reactivation signal. Treat it as directional until there is a control cohort.' },
  'follow-up-quick-question': { code: 'E3', title: 'Follow-up', color: 'text-sky-300', note: 'Paused after 28 lifetime sends with no verified replies.' },
} as const

const emptyStats = { sent: 0, replied: 0, dry_run: 0, delivered: 0, bounced: 0, clicked: 0, failed: 0, matured: 0, active_after_7d: 0 }

function fmtDate(value?: string | null) {
  if (!value) return '—'
  return new Date(value).toLocaleString('en-GB', {
    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit', timeZone: 'UTC',
  }) + ' UTC'
}

function emailState(email: OutreachEmailStatus | null) {
  if (!email) return <span className="text-white/20">—</span>
  if (email.send_status === 'failed') return <span className="text-rose-300">failed</span>
  if (email.send_status === 'reserved') return <span className="text-amber-300">reserved</span>
  if (email.response_verified) return <span className="text-emerald-300">✓ verified reply</span>
  return <span className="text-white/45">sent</span>
}

export default function OutreachAutomationClient() {
  const [tab, setTab] = useState<Tab>('performance')
  const [funnel, setFunnel] = useState<FunnelStats | null>(null)
  const [users, setUsers] = useState<UserStatus[]>([])
  const [runs, setRuns] = useState<OutreachRun[]>([])
  const [preview, setPreview] = useState<SimulateResult | null>(null)
  const [exclusions, setExclusions] = useState<Exclusion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const getJson = useCallback(async (url: string, init?: RequestInit) => {
    const response = await fetch(url, init)
    const body = await response.json()
    if (!response.ok) throw new Error(body?.error || `HTTP ${response.status}`)
    return body
  }, [])

  const loadAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [funnelData, usersData, runsData, previewData] = await Promise.all([
        getJson('/api/dashboard/outreach/funnel?days=30'),
        getJson('/api/dashboard/outreach/users'),
        getJson('/api/dashboard/outreach/runs'),
        getJson('/api/dashboard/outreach/simulate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }),
      ])
      setFunnel(funnelData)
      setUsers(usersData.users || [])
      setRuns(runsData.runs || [])
      setPreview(previewData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load outreach data')
    } finally {
      setLoading(false)
    }
  }, [getJson])

  const loadExclusions = useCallback(async () => {
    try {
      const data = await getJson('/api/dashboard/outreach/exclusions')
      setExclusions(data.exclusions || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load exclusions')
    }
  }, [getJson])

  useEffect(() => { loadAll() }, [loadAll])
  useEffect(() => { if (tab === 'exclusions') loadExclusions() }, [tab, loadExclusions])

  const totals = useMemo(() => {
    const buckets = Object.values(funnel?.stats || {})
    return buckets.reduce((sum, item) => ({
      sent: sum.sent + item.sent,
      delivered: sum.delivered + item.delivered,
      replied: sum.replied + item.replied,
      bounced: sum.bounced + item.bounced,
      failed: sum.failed + item.failed,
    }), { sent: 0, delivered: 0, replied: 0, bounced: 0, failed: 0 })
  }, [funnel])

  const nextCandidates = useMemo(() => Object.values(preview?.templates || {}).reduce((sum, list) => sum + list.length, 0), [preview])
  const lastRun = runs[0]

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <Link href="/dashboard/emails" className="text-xs text-white/40 hover:text-white/70">← Emails</Link>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">Outreach automation</h1>
            <p className="mt-1 text-sm text-white/45">Reliable delivery, thread-verified replies and safe daily execution.</p>
          </div>
          <button
            onClick={async () => {
              setLoading(true)
              try {
                setPreview(await getJson('/api/dashboard/outreach/simulate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }))
                setTab('users')
              } catch (err) { setError(err instanceof Error ? err.message : 'Preview failed') }
              finally { setLoading(false) }
            }}
            disabled={loading}
            className="rounded-lg border border-emerald-400/35 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-300 hover:bg-emerald-400/10 disabled:opacity-50">
            ◉ Preview next run
          </button>
        </div>

        <section className="mt-6 flex flex-col justify-between gap-4 rounded-xl border border-emerald-400/30 bg-emerald-400/5 p-4 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold text-emerald-300">Automation healthy · daily at {funnel?.schedule_utc || '03:00'} UTC</div>
            <div className="mt-1 text-xs text-white/45">E1 and E2 are enabled. E3 is paused after producing no verified replies.</div>
          </div>
          <div className="flex flex-wrap gap-2 text-[10px] text-white/50">
            <span className="rounded-full border border-white/10 px-2 py-1">Dry-run never writes</span>
            <span className="rounded-full border border-white/10 px-2 py-1">Thread matching on</span>
            <span className="rounded-full border border-white/10 px-2 py-1">Manual live send removed</span>
          </div>
        </section>

        {error && <div className="mt-4 rounded-lg border border-rose-400/30 bg-rose-400/5 p-3 text-sm text-rose-300">{error}</div>}

        <section className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Metric label="Next run" value={String(nextCandidates)} sub="exact read-only preview" />
          <Metric label="Delivered · 30d" value={`${totals.delivered}/${totals.sent}`} sub={`${totals.bounced} bounced · ${totals.failed} failed`} accent="text-emerald-300" />
          <Metric label="Verified replies · 30d" value={String(totals.replied)} sub={`${totals.sent ? ((totals.replied / totals.sent) * 100).toFixed(1) : '0.0'}% of outreach`} />
          <Metric label="Excluded" value={String(users.filter((user) => user.is_excluded).length)} sub="never auto-mailed" />
        </section>

        <div className="mt-6 flex gap-1 overflow-x-auto border-b border-white/10" role="tablist">
          {(['performance', 'runs', 'users', 'exclusions'] as Tab[]).map((item) => (
            <button key={item} onClick={() => setTab(item)} className={`whitespace-nowrap border-b-2 px-4 py-2 text-sm capitalize ${tab === item ? 'border-amber-400 text-white' : 'border-transparent text-white/40 hover:text-white/70'}`}>{item === 'runs' ? 'Run history' : item}</button>
          ))}
        </div>

        {tab === 'performance' && (
          <div className="mt-5">
            <div className="grid gap-3 lg:grid-cols-3">
              {SLUGS.map((slug) => {
                const item = funnel?.stats[slug] || emptyStats
                const meta = META[slug]
                const paused = slug === 'follow-up-quick-question'
                const activeRate = item.matured ? Math.round(((item.active_after_7d || 0) / item.matured) * 100) : 0
                return (
                  <article key={slug} className="rounded-xl border border-white/10 bg-white/[0.015] p-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <h2 className={`text-sm font-semibold ${meta.color}`}>{meta.code} · {meta.title}</h2>
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] ${paused ? 'border-rose-400/30 text-rose-300' : 'border-emerald-400/30 text-emerald-300'}`}>{paused ? 'Paused' : 'Live'}</span>
                    </div>
                    <dl className="mt-3 grid grid-cols-[1fr_auto] gap-y-2 text-xs">
                      <dt className="text-white/45">Sent</dt><dd>{item.sent}</dd>
                      <dt className="text-white/45">Delivered</dt><dd>{item.delivered}</dd>
                      <dt className="text-white/45">Verified replies</dt><dd>{item.replied}{item.sent ? ` · ${Math.round(item.replied / item.sent * 100)}%` : ''}</dd>
                      <dt className="text-white/45">Active after 7 days</dt><dd>{item.matured ? `${item.active_after_7d} · ${activeRate}%` : '—'}</dd>
                    </dl>
                    <p className="mt-3 rounded-lg bg-white/[0.025] p-3 text-[11px] leading-relaxed text-white/40">{meta.note}</p>
                  </article>
                )
              })}
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-[1.2fr_.8fr]">
              <Panel title="Measurement health">
                <Health label="Delivery data" value={totals.sent ? `${totals.delivered}/${totals.sent} from Resend` : 'Waiting for data'} good />
                <Health label="Reply attribution" value="Original thread only" good />
                <Health label="Last daily run" value={lastRun ? `${lastRun.status} · ${lastRun.sent_count} sent · ${lastRun.failed_count} failed` : 'History starts after deployment'} good={lastRun?.status === 'completed'} />
                <Health label="Reactivation attribution" value="No control cohort yet" />
              </Panel>
              <Panel title="Safety rules">
                <Health label="Duplicate protection" value="Reserved before send" good />
                <Health label="Dry-run" value="Read-only" good />
                <Health label="Manual live run" value="Unavailable" good />
                <Health label="Reply via Discord" value="Removed from automation" good />
              </Panel>
            </div>
          </div>
        )}

        {tab === 'runs' && (
          <Table headers={['Run', 'Status', 'Candidates', 'Sent', 'Failed']} empty="No recorded runs yet. History begins with the hardened job.">
            {runs.map((run) => <tr key={run.id} className="border-t border-white/5"><td className="px-4 py-3">{fmtDate(run.started_at)}</td><td className={run.status === 'completed' ? 'px-3 py-3 text-emerald-300' : 'px-3 py-3 text-amber-300'}>{run.status}</td><td className="px-3 py-3">{run.candidate_count}</td><td className="px-3 py-3">{run.sent_count}</td><td className="px-3 py-3">{run.failed_count}</td></tr>)}
          </Table>
        )}

        {tab === 'users' && (
          <Table headers={['User', 'E1', 'E2', 'E3', 'Next']} empty="No users found.">
            {users.map((user) => <tr key={user.user_id} className="border-t border-white/5"><td className="px-4 py-3"><div>{user.name || '—'}</div><div className="text-[11px] text-white/35">{user.email}</div></td><td className="px-3 py-3">{emailState(user.e1_quick_question)}</td><td className="px-3 py-3">{emailState(user.e2_we_miss_you)}</td><td className="px-3 py-3">{emailState(user.e3_follow_up)}</td><td className="px-3 py-3"><span className={`rounded border px-2 py-1 text-[10px] ${user.next_action?.kind === 'eligible' ? 'border-emerald-400/30 text-emerald-300' : user.next_action?.kind === 'paused' ? 'border-rose-400/30 text-rose-300' : 'border-white/10 text-white/40'}`}>{user.next_action?.label || 'No action'}</span></td></tr>)}
          </Table>
        )}

        {tab === 'exclusions' && (
          <Table headers={['User', 'Reason', 'By', 'Action']} empty="No exclusions.">
            {exclusions.map((item) => <tr key={item.user_id} className="border-t border-white/5"><td className="px-4 py-3"><div>{item.users?.name || item.users?.email}</div><div className="text-[11px] text-white/35">{item.users?.email}</div></td><td className="px-3 py-3 text-white/55">{item.reason}</td><td className="px-3 py-3 text-white/35">{item.excluded_by}</td><td className="px-3 py-3"><button className="text-rose-300 hover:underline" onClick={async () => { if (!confirm(`Remove exclusion for ${item.users?.email}?`)) return; await fetch(`/api/dashboard/outreach/exclusions/${item.user_id}`, { method: 'DELETE' }); loadExclusions() }}>remove</button></td></tr>)}
          </Table>
        )}

        {loading && <div className="py-8 text-center text-xs text-white/35">Loading…</div>}
      </main>
    </div>
  )
}

function Metric({ label, value, sub, accent = '' }: { label: string; value: string; sub: string; accent?: string }) {
  return <div className="rounded-xl border border-white/10 bg-white/[0.015] p-4"><div className="text-[10px] uppercase tracking-[.16em] text-white/35">{label}</div><div className={`mt-1 text-2xl font-bold ${accent}`}>{value}</div><div className="mt-1 text-[11px] text-white/35">{sub}</div></div>
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="rounded-xl border border-white/10 bg-white/[0.015] p-4"><h2 className="mb-3 text-sm font-semibold">{title}</h2><div>{children}</div></section>
}

function Health({ label, value, good = false }: { label: string; value: string; good?: boolean }) {
  return <div className="flex items-center justify-between gap-4 border-b border-white/10 py-2 text-xs last:border-0"><span className="text-white/40">{label}</span><strong className={good ? 'text-emerald-300' : 'text-amber-300'}>{value}</strong></div>
}

function Table({ headers, empty, children }: { headers: string[]; empty: string; children: React.ReactNode }) {
  const hasRows = Array.isArray(children) ? children.length > 0 : Boolean(children)
  return <div className="mt-5 overflow-x-auto rounded-xl border border-white/10"><table className="w-full min-w-[720px] text-left text-xs"><thead className="bg-white/[0.025] text-[10px] uppercase tracking-wider text-white/35"><tr>{headers.map((header) => <th key={header} className="px-4 py-3">{header}</th>)}</tr></thead><tbody>{hasRows ? children : <tr><td colSpan={headers.length} className="px-4 py-10 text-center text-white/30">{empty}</td></tr>}</tbody></table></div>
}
