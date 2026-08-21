'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  agentLabel,
  type RealtimeActivitySnapshot,
  type RealtimeWindowHours,
} from '../users/users-activity'

const WINDOWS: Array<{ hours: RealtimeWindowHours; label: string }> = [
  { hours: 0.5, label: '30 min' },
  { hours: 1, label: '1 h' },
  { hours: 4, label: '4 h' },
  { hours: 12, label: '12 h' },
  { hours: 24, label: '24 h' },
]

const ACTION_LABELS: Record<string, string> = {
  terminal_sessions: 'Agent sessions',
  terminal_controls: 'Terminal controls',
  terminal_tab_switch: 'Terminal switching',
  project_switcher: 'Projects and shortcuts',
  task_board: 'Task board',
  conversation_history: 'Conversation history',
  command_palette: 'Command palette',
  workspace: 'Workspace views',
  chat: 'Direct chat',
  mobile: 'Mobile',
  settings: 'Settings',
  swarmi: 'Swarmi',
  git: 'Git tools',
  screenshot: 'Screenshots',
  billing: 'Billing',
  updates: 'Updates',
  navigation: 'Navigation',
}

function titleCase(value: string): string {
  return value.replace(/[_-]+/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase())
}

function actionLabel(action: string): string {
  return ACTION_LABELS[action] || titleCase(action)
}

function relativeTime(value: string): string {
  const elapsed = Date.now() - Date.parse(value)
  if (!Number.isFinite(elapsed) || elapsed < 60_000) return 'Just now'
  if (elapsed < 3_600_000) return `${Math.floor(elapsed / 60_000)}m ago`
  return `${Math.floor(elapsed / 3_600_000)}h ago`
}

function initials(name: string | null, email: string): string {
  const words = (name || email).split(/[\s@._-]+/).filter(Boolean)
  return `${words[0]?.[0] || '?'}${words[1]?.[0] || ''}`.toUpperCase()
}

function formatTick(value: string): string {
  return new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export default function RealtimeActivityClient() {
  const [hours, setHours] = useState<RealtimeWindowHours>(1)
  const [snapshot, setSnapshot] = useState<RealtimeActivitySnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const abortRef = useRef<AbortController | null>(null)

  const loadSnapshot = useCallback(async (initial = false) => {
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    initial ? setLoading(true) : setRefreshing(true)
    setError(null)

    try {
      const response = await fetch(`/api/dashboard/users/realtime?hours=${hours}`, {
        signal: controller.signal,
      })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error || 'Failed to load real-time activity')
      if (!controller.signal.aborted) setSnapshot(payload as RealtimeActivitySnapshot)
    } catch (caught) {
      if (!(caught instanceof DOMException && caught.name === 'AbortError')) {
        setError(caught instanceof Error ? caught.message : 'Failed to load real-time activity')
      }
    } finally {
      if (abortRef.current === controller) {
        setLoading(false)
        setRefreshing(false)
      }
    }
  }, [hours])

  useEffect(() => {
    void loadSnapshot(true)
    const timer = window.setInterval(() => {
      if (!document.hidden) void loadSnapshot()
    }, 30_000)
    return () => {
      window.clearInterval(timer)
      abortRef.current?.abort()
    }
  }, [loadSnapshot])

  const maxBucket = Math.max(1, ...(snapshot?.buckets || []).map((bucket) => bucket.events))
  const maxAction = Math.max(1, ...(snapshot?.top_actions || []).map((action) => action.events))

  function selectWindow(next: RealtimeWindowHours) {
    if (next === hours) return
    setSnapshot(null)
    setLoading(true)
    setHours(next)
  }

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-[#090909] text-white">
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <header className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-amber-300/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.65)]" />
              LIVE ACTIVITY
            </div>
            <h1 className="text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl">Real-time activity</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">
              See recent product activity by identified users. This view refreshes every 30 seconds.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex rounded-xl border border-white/10 bg-[#111111] p-1" role="group" aria-label="Activity time range">
              {WINDOWS.map((window) => (
                <button
                  key={window.hours}
                  type="button"
                  aria-pressed={hours === window.hours}
                  onClick={() => selectWindow(window.hours)}
                  className={`min-w-0 flex-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition sm:flex-none ${
                    hours === window.hours
                      ? 'bg-amber-400/15 text-amber-200 shadow-sm'
                      : 'text-white/55 hover:bg-white/[0.05] hover:text-white/80'
                  }`}
                >
                  {window.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void loadSnapshot()}
              disabled={loading || refreshing}
              className="rounded-xl border border-white/10 bg-[#111111] px-3.5 py-2.5 text-xs font-medium text-white/65 transition hover:border-amber-400/35 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-wait disabled:opacity-50"
            >
              {refreshing ? 'Refreshing…' : 'Refresh'}
            </button>
          </div>
        </header>

        {error && snapshot && (
          <div role="status" className="mb-4 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-100">
            Latest refresh failed. Showing the last available snapshot.
          </div>
        )}

        {loading && !snapshot ? (
          <LoadingState />
        ) : error && !snapshot ? (
          <ErrorState message={error} onRetry={() => void loadSnapshot(true)} />
        ) : snapshot && snapshot.events === 0 ? (
          <EmptyState hours={hours} />
        ) : snapshot ? (
          <>
            <section aria-label="Real-time summary" className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              <Metric label="Active users" value={snapshot.active_users} note={`Last ${hours === 0.5 ? '30 minutes' : `${hours} hour${hours === 1 ? '' : 's'}`}`} />
              <Metric label="Active now" value={snapshot.active_now} note="Recorded in the last 5 minutes" accent />
              <Metric label="Tracked events" value={snapshot.events} note="Privacy-safe product events" />
              <Metric label="Agent sessions" value={snapshot.agent_sessions} note="Successful desktop and mobile launches" />
            </section>

            <section className="mt-5 rounded-2xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5" aria-labelledby="activity-chart-title">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h2 id="activity-chart-title" className="text-base font-semibold text-white/90">Activity over time</h2>
                  <p className="mt-1 text-xs text-white/45">Events recorded inside the selected window</p>
                </div>
                <span className="text-xs text-white/45">Updated {relativeTime(snapshot.generated_at)}</span>
              </div>
              <div className="mt-6 flex h-44 items-end gap-1.5 sm:gap-2" aria-label="Tracked events timeline">
                {snapshot.buckets.map((bucket, index) => (
                  <div key={bucket.bucket_start} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                    <span className="invisible text-[10px] font-medium text-amber-200 group-hover:visible">{bucket.events}</span>
                    <div
                      className="w-full min-w-1 rounded-t bg-amber-400/70 transition-colors group-hover:bg-amber-300"
                      style={{ height: `${bucket.events === 0 ? 0 : Math.max(3, Math.round((bucket.events / maxBucket) * 116))}px` }}
                      title={`${bucket.events} events at ${formatTick(bucket.bucket_start)}`}
                    />
                    <span className="h-3 truncate text-[9px] text-white/35 sm:text-[10px]">
                      {index === 0 || index === snapshot.buckets.length - 1 || index === Math.floor(snapshot.buckets.length / 2)
                        ? formatTick(bucket.bucket_start)
                        : ''}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.8fr)]">
              <section className="overflow-hidden rounded-2xl border border-white/[0.09] bg-[#111111]" aria-labelledby="latest-users-title">
                <div className="border-b border-white/[0.07] px-4 py-4 sm:px-5">
                  <h2 id="latest-users-title" className="text-base font-semibold text-white/90">Latest active users</h2>
                  <p className="mt-1 text-xs text-white/45">Most recent meaningful action per user</p>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {snapshot.latest_users.slice(0, 8).map((user) => (
                    <div key={user.user_id} className="flex items-center gap-3 px-4 py-3.5 sm:px-5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-xs font-semibold text-white/75">
                        {initials(user.name, user.email)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex min-w-0 items-baseline gap-2">
                          <p className="truncate text-sm font-medium text-white/85">{user.name || user.email}</p>
                          <span className="shrink-0 text-[11px] text-white/35">{relativeTime(user.occurred_at)}</span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-white/45">{actionLabel(user.action)}</p>
                      </div>
                      <div className="hidden shrink-0 text-right sm:block">
                        <p className="text-xs text-white/65">{user.agent ? agentLabel(user.agent) : 'No agent signal'}</p>
                        <p className="mt-0.5 text-[11px] text-white/35">
                          {[user.workspace_view && titleCase(user.workspace_view), user.app_version && `v${user.app_version}`].filter(Boolean).join(' · ') || 'Context unavailable'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-1">
                <section className="rounded-2xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5" aria-labelledby="areas-title">
                  <h2 id="areas-title" className="text-base font-semibold text-white/90">Top product areas</h2>
                  <div className="mt-4 space-y-3.5">
                    {snapshot.top_actions.slice(0, 6).map((action) => (
                      <div key={action.action}>
                        <div className="mb-1.5 flex items-center justify-between gap-3 text-xs">
                          <span className="truncate text-white/65">{actionLabel(action.action)}</span>
                          <span className="font-mono text-white/45">{action.events}</span>
                        </div>
                        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                          <div className="h-full rounded-full bg-amber-400/70" style={{ width: `${Math.max(4, (action.events / maxAction) * 100)}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-2xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5" aria-labelledby="agents-title">
                  <h2 id="agents-title" className="text-base font-semibold text-white/90">Active agents</h2>
                  <div className="mt-3 divide-y divide-white/[0.06]">
                    {snapshot.agents.slice(0, 7).map((agent) => (
                      <div key={agent.agent} className="flex items-center justify-between gap-3 py-2.5 text-xs">
                        <span className="text-white/65">{agentLabel(agent.agent)}</span>
                        <span className="text-white/40">{agent.sessions} sessions · {agent.users} users</span>
                      </div>
                    ))}
                    {snapshot.agents.length === 0 && <p className="py-3 text-xs text-white/40">No agent launches in this window.</p>}
                  </div>
                </section>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-5 text-white/35">
              This dashboard shows identified, privacy-safe product events. Prompts, replies, file paths and project names are never included.
            </p>
          </>
        ) : null}
      </main>
    </div>
  )
}

function Metric({ label, value, note, accent = false }: { label: string; value: number; note: string; accent?: boolean }) {
  return (
    <article className={`rounded-xl border p-4 sm:p-5 ${accent ? 'border-emerald-400/20 bg-emerald-400/[0.045]' : 'border-white/[0.09] bg-[#111111]'}`}>
      <p className="text-xs font-medium text-white/45">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tracking-tight sm:text-3xl ${accent ? 'text-emerald-300' : 'text-white/90'}`}>{value.toLocaleString()}</p>
      <p className="mt-1.5 text-[11px] leading-4 text-white/35">{note}</p>
    </article>
  )
}

function LoadingState() {
  return (
    <div aria-label="Loading real-time activity" className="animate-pulse space-y-5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {[0, 1, 2, 3].map((item) => <div key={item} className="h-28 rounded-xl border border-white/[0.07] bg-[#111111]" />)}
      </div>
      <div className="h-64 rounded-2xl border border-white/[0.07] bg-[#111111]" />
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.04] px-5 py-12 text-center">
      <h2 className="text-lg font-semibold text-white/85">Real-time activity is unavailable</h2>
      <p className="mt-2 text-sm text-white/50">{message}</p>
      <button type="button" onClick={onRetry} className="mt-5 rounded-lg border border-white/15 px-4 py-2 text-xs font-medium text-white/70 hover:border-amber-400/40 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">Try again</button>
    </div>
  )
}

function EmptyState({ hours }: { hours: RealtimeWindowHours }) {
  return (
    <div className="rounded-2xl border border-white/[0.09] bg-[#111111] px-5 py-16 text-center">
      <div className="mx-auto h-2.5 w-2.5 rounded-full bg-white/20" />
      <h2 className="mt-4 text-lg font-semibold text-white/85">No activity in this window</h2>
      <p className="mt-2 text-sm text-white/45">No identified product events were recorded during the last {hours === 0.5 ? '30 minutes' : `${hours} hour${hours === 1 ? '' : 's'}`}.</p>
    </div>
  )
}
