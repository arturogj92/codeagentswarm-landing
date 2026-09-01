'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { CloudflareUsageSnapshot } from '@/lib/cloudflare-usage'

const STATUS = {
  safe: {
    title: 'Within the safety limits.',
    copy: 'No Durable Objects overage is estimated this month.',
  },
  near: {
    title: 'Approaching a safety stop.',
    copy: 'Review the recent rate before the relay reaches its protected allowance.',
  },
  stopped: {
    title: 'A safety threshold has been reached.',
    copy: 'The protected relay rejects new operations until the UTC counter resets.',
  },
  overage: {
    title: 'Usage overage detected.',
    copy: 'Cloudflare analytics estimate usage above an included Paid allowance.',
  },
} as const

function compact(value: number): string {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value)
}

function integer(value: number): string {
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value)
}

function percent(value: number, limit: number): string {
  if (!limit) return '0%'
  const result = (value / limit) * 100
  return result > 0 && result < 0.1 ? '<0.1%' : `${result.toFixed(result < 10 ? 1 : 0)}%`
}

function money(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
}

function bytes(value: number): string {
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} GB`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)} MB`
  return `${integer(value)} B`
}

function progress(value: number, limit: number): number {
  return Math.min(100, Math.max(value > 0 ? 1 : 0, (value / limit) * 100))
}

function statusLabel(value: number, limit: number): string {
  if (value >= limit) return 'Limit reached'
  if (value >= limit * 0.8) return 'Near limit'
  return 'Included'
}

function statusClasses(status: CloudflareUsageSnapshot['status']) {
  if (status === 'safe') {
    return {
      banner: 'border-emerald-400/20 bg-emerald-400/[0.055] text-emerald-100',
      dot: 'bg-emerald-400 shadow-[0_0_0_5px_rgba(52,211,153,0.08)]',
      bar: 'bg-emerald-400',
      accent: 'text-emerald-300',
    }
  }
  if (status === 'near') {
    return {
      banner: 'border-amber-400/25 bg-amber-400/[0.06] text-amber-100',
      dot: 'bg-amber-400 shadow-[0_0_0_5px_rgba(251,191,36,0.08)]',
      bar: 'bg-amber-400',
      accent: 'text-amber-300',
    }
  }
  return {
    banner: 'border-rose-400/25 bg-rose-400/[0.06] text-rose-100',
    dot: 'bg-rose-400 shadow-[0_0_0_5px_rgba(251,113,133,0.08)]',
    bar: 'bg-rose-400',
    accent: 'text-rose-300',
  }
}

function Metric({
  label,
  value,
  percentage,
  note,
  used,
  limit,
  bar,
}: {
  label: string
  value: string
  percentage: string
  note: string
  used: number
  limit: number
  bar: string
}) {
  return (
    <article className="min-h-32 rounded-xl border border-white/[0.09] bg-[#111111] p-4">
      <p className="text-[11px] text-white/55">{label}</p>
      <div className="mt-2.5 flex items-baseline justify-between gap-2">
        <strong className="font-mono text-2xl text-white/95">{value}</strong>
        <span className={`text-[11px] font-semibold ${bar === 'bg-rose-400' ? 'text-rose-300' : bar === 'bg-amber-400' ? 'text-amber-300' : 'text-emerald-300'}`}>{percentage}</span>
      </div>
      <p className="mt-1.5 text-[10px] leading-4 text-white/38">{note}</p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.07]">
        <span className={`block h-full rounded-full ${bar}`} style={{ width: `${progress(used, limit)}%` }} />
      </div>
    </article>
  )
}

function LoadingState() {
  return (
    <div className="mt-6 grid animate-pulse gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Loading Cloudflare usage">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="h-32 rounded-xl border border-white/[0.07] bg-white/[0.035]" />
      ))}
    </div>
  )
}

export default function CloudflareUsageClient() {
  const [snapshot, setSnapshot] = useState<CloudflareUsageSnapshot | null>(null)
  const [period, setPeriod] = useState<'24h' | 'cycle'>('24h')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async (initial = false) => {
    initial ? setLoading(true) : setRefreshing(true)
    setError(null)
    try {
      const response = await fetch('/api/dashboard/cloudflare', { cache: 'no-store' })
      const payload = await response.json()
      if (!response.ok) throw new Error(payload?.error || 'Failed to load Cloudflare usage')
      setSnapshot(payload as CloudflareUsageSnapshot)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Failed to load Cloudflare usage')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    void load(true)
  }, [load])

  const chart = useMemo(() => {
    if (!snapshot) return []
    if (period === '24h') {
      return snapshot.hourly.slice(-24).map((hour) => ({
        key: hour.hour,
        label: new Date(hour.hour).getUTCHours().toString().padStart(2, '0'),
        value: hour.billableRequests,
        raw: hour.rawRequests,
      }))
    }
    const days = new Map<string, { value: number; raw: number }>()
    for (const hour of snapshot.hourly) {
      const key = hour.hour.slice(0, 10)
      const current = days.get(key) || { value: 0, raw: 0 }
      current.value += hour.billableRequests
      current.raw += hour.rawRequests
      days.set(key, current)
    }
    return Array.from(days, ([key, values]) => ({ key, label: key.slice(8), ...values }))
  }, [period, snapshot])
  const maxChart = Math.max(1, ...chart.map((point) => point.value))
  const tone = snapshot ? statusClasses(snapshot.status) : statusClasses('safe')
  const status = snapshot ? STATUS[snapshot.status] : STATUS.safe

  return (
    <div className="min-h-[calc(100dvh-56px)] bg-[#090909] text-white">
      <main className="mx-auto max-w-[1600px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-amber-300/80">INFRASTRUCTURE COSTS</p>
            <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">Cloudflare</h1>
            <p className="mt-2 text-sm leading-6 text-white/55">
              Monitor Durable Objects usage and the relay safety stops before Cloudflare can create an invoice surprise.
            </p>
          </div>
          <button
            type="button"
            onClick={() => void load()}
            disabled={loading || refreshing}
            className="rounded-xl border border-white/10 bg-[#111111] px-4 py-2.5 text-xs font-medium text-white/65 transition hover:border-amber-400/35 hover:text-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:cursor-wait disabled:opacity-50"
          >
            {refreshing ? 'Refreshing…' : 'Refresh'}
          </button>
        </header>

        {error && !snapshot ? (
          <section role="alert" className="mt-6 rounded-xl border border-rose-400/25 bg-rose-400/[0.06] p-6">
            <h2 className="font-semibold text-rose-100">Cloudflare usage could not be loaded</h2>
            <p className="mt-2 text-sm text-rose-100/65">Check the read-only API token and try again. The relay itself is not affected.</p>
            <button type="button" onClick={() => void load(true)} className="mt-4 text-xs font-semibold text-rose-200 underline underline-offset-4">
              Try again
            </button>
          </section>
        ) : loading && !snapshot ? (
          <LoadingState />
        ) : snapshot ? (
          <>
            {error && (
              <div role="status" className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-4 py-3 text-sm text-amber-100">
                Latest refresh failed. Showing the last available snapshot.
              </div>
            )}

            <section className={`mt-6 flex flex-col gap-3 rounded-xl border px-4 py-3 text-sm sm:flex-row sm:items-center ${tone.banner}`} aria-label="Current Cloudflare cost status">
              <span className={`h-2 w-2 shrink-0 rounded-full ${tone.dot}`} />
              <p className="min-w-0 flex-1"><strong>{status.title}</strong> <span className="opacity-70">{status.copy}</span></p>
              <span className="shrink-0 text-[11px] opacity-50">
                Analytics · {new Date(snapshot.generatedAt).toLocaleString('en-GB', { timeZone: 'UTC', dateStyle: 'medium', timeStyle: 'short' })} UTC
              </span>
            </section>

            <section aria-label="Cloudflare usage summary" className="mt-3 grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              <Metric
                label="Daily billable request units"
                value={compact(snapshot.dailyBillableRequests)}
                percentage={percent(snapshot.dailyBillableRequests, snapshot.dailyRequestLimit)}
                note={`${compact(snapshot.dailyRequestLimit)} relay safety stop · resets 00:00 UTC`}
                used={snapshot.dailyBillableRequests}
                limit={snapshot.dailyRequestLimit}
                bar={tone.bar}
              />
              <Metric
                label="Monthly billable request units"
                value={compact(snapshot.monthlyBillableRequests)}
                percentage={percent(snapshot.monthlyBillableRequests, snapshot.monthlyRequestLimit)}
                note={`${compact(snapshot.monthlyRequestLimit)} safety stop · ${compact(snapshot.includedRequests)} included`}
                used={snapshot.monthlyBillableRequests}
                limit={snapshot.monthlyRequestLimit}
                bar={tone.bar}
              />
              <Metric
                label="Compute duration"
                value={compact(snapshot.durationGbSeconds)}
                percentage={percent(snapshot.durationGbSeconds, snapshot.includedDurationGbSeconds)}
                note={`GB-s of ${compact(snapshot.includedDurationGbSeconds)} included`}
                used={snapshot.durationGbSeconds}
                limit={snapshot.includedDurationGbSeconds}
                bar="bg-emerald-400"
              />
              <Metric
                label="Invocation errors"
                value={compact(snapshot.errors)}
                percentage={percent(snapshot.errors, snapshot.rawRequests)}
                note={`of ${compact(snapshot.rawRequests)} raw operations this month`}
                used={snapshot.errors}
                limit={Math.max(1, snapshot.rawRequests)}
                bar={snapshot.errors / Math.max(1, snapshot.rawRequests) > 0.05 ? 'bg-rose-400' : 'bg-emerald-400'}
              />
            </section>

            <section className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
              <article className="rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-white/90">Request rate</h2>
                    <p className="mt-1 text-xs leading-5 text-white/45">Estimated billable units · incoming WebSocket messages use Cloudflare&apos;s 20:1 ratio.</p>
                  </div>
                  <div className="flex rounded-lg border border-white/[0.09] bg-black/20 p-1" role="group" aria-label="Usage period">
                    {(['24h', 'cycle'] as const).map((value) => (
                      <button
                        key={value}
                        type="button"
                        aria-pressed={period === value}
                        onClick={() => setPeriod(value)}
                        className={`rounded-md px-3 py-1.5 text-[10px] font-medium ${period === value ? 'bg-amber-400/10 text-amber-200' : 'text-white/45 hover:text-white/75'}`}
                      >
                        {value === '24h' ? '24h' : 'Cycle'}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mt-6 flex h-56 items-end gap-1 border-b border-white/[0.08] bg-[repeating-linear-gradient(to_top,transparent_0,transparent_54px,rgba(255,255,255,0.045)_55px)] px-1 pt-4" aria-label="Billable request rate chart">
                  {chart.length ? chart.map((point, index) => (
                    <div key={point.key} className="group relative flex h-full min-w-0 flex-1 items-end">
                      <span
                        className="w-full min-w-px rounded-t bg-sky-300/45 transition-colors group-hover:bg-amber-300/75"
                        style={{ height: `${Math.max(2, (point.value / maxChart) * 100)}%` }}
                        title={`${point.key} · ${integer(point.value)} billable · ${integer(point.raw)} raw`}
                      />
                      {(index === 0 || index === chart.length - 1 || index % Math.max(1, Math.ceil(chart.length / 6)) === 0) && (
                        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white/30">{point.label}</span>
                      )}
                    </div>
                  )) : (
                    <p className="m-auto text-sm text-white/35">No relay activity in this period.</p>
                  )}
                </div>
                <p className="mt-7 text-[10px] text-white/35">UTC · Analytics can lag by several minutes.</p>
              </article>

              <aside className="relative overflow-hidden rounded-xl border border-white/[0.09] bg-[#111111] p-5 before:absolute before:inset-x-0 before:top-0 before:h-0.5 before:bg-gradient-to-r before:from-emerald-400 before:to-transparent">
                <h2 className="font-semibold text-white/90">Estimated cycle cost</h2>
                <p className="mt-1 text-xs leading-5 text-white/45">Workers Paid base fee plus estimated Durable Objects overage.</p>
                <p className="mt-6 text-[11px] text-white/50">Estimated total</p>
                <p className="mt-1 font-mono text-4xl font-bold tracking-[-0.06em] text-white">{money(snapshot.estimatedTotalUsd)}</p>
                <p className="mt-2 text-[10px] text-white/38">{snapshot.estimatedOverageUsd ? 'Includes estimated usage overage' : 'Base fee only · no overage detected'}</p>
                <div className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.07] text-xs">
                  <div className="flex justify-between gap-3 py-3 text-white/55"><span>Workers Paid</span><strong className="font-mono text-white/85">$5.00</strong></div>
                  <div className="flex justify-between gap-3 py-3 text-white/55"><span>Usage overage</span><strong className={`font-mono ${snapshot.estimatedOverageUsd ? 'text-rose-300' : 'text-emerald-300'}`}>{money(snapshot.estimatedOverageUsd)}</strong></div>
                  <div className="flex justify-between gap-3 py-3 text-white/55"><span>Recent rate</span><strong className="font-mono text-white/85">{compact(snapshot.recentBillableRequestsPerHour)} / hour</strong></div>
                </div>
                <p className="mt-4 text-[10px] leading-4 text-white/35">Current UTC month estimate. Cloudflare billing remains the invoice source of truth.</p>
              </aside>
            </section>

            <section className="mt-3 grid gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.045] p-4 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10 font-bold text-emerald-300">✓</span>
              <div>
                <h2 className="text-sm font-semibold text-emerald-100">Hard relay safety stop</h2>
                <p className="mt-1 text-[11px] leading-5 text-white/50">D1 rejects new relay operations before {compact(snapshot.dailyRequestLimit)} billable requests per day or 900,000 per month. Twenty incoming WebSocket messages count as one request.</p>
              </div>
              <a href="https://dash.cloudflare.com/" target="_blank" rel="noreferrer" className="text-xs font-semibold text-emerald-300 hover:text-emerald-200">Open Cloudflare billing ↗</a>
            </section>

            <section className="mt-3 overflow-hidden rounded-xl border border-white/[0.09] bg-[#111111]">
              <div className="p-4 sm:p-5">
                <h2 className="font-semibold text-white/90">Allowance breakdown</h2>
                <p className="mt-1 text-xs text-white/45">Current UTC month. Analytics are estimates; the D1 counter enforces the relay stop independently.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse text-left text-xs">
                  <thead className="border-y border-white/[0.07] text-[10px] text-white/35">
                    <tr><th className="px-5 py-3 font-medium">Meter</th><th className="px-3 py-3 font-medium">Used</th><th className="px-3 py-3 font-medium">Allowance</th><th className="px-3 py-3 font-medium">Protection / rate</th><th className="px-5 py-3 font-medium">Status</th></tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.055] text-white/55">
                    <AllowanceRow label="Daily billable requests" used={integer(snapshot.dailyBillableRequests)} allowance={`${integer(snapshot.dailyRequestLimit)} / day`} rate="20 WS messages = 1 request" status={statusLabel(snapshot.dailyBillableRequests, snapshot.dailyRequestLimit)} />
                    <AllowanceRow label="Monthly billable requests" used={integer(snapshot.monthlyBillableRequests)} allowance="1,000,000 / month" rate="Stops at 900,000" status={statusLabel(snapshot.monthlyBillableRequests, snapshot.monthlyRequestLimit)} />
                    <AllowanceRow label="Compute duration" used={`${integer(snapshot.durationGbSeconds)} GB-s`} allowance="400,000 GB-s / month" rate="$12.50 / million" status={statusLabel(snapshot.durationGbSeconds, snapshot.includedDurationGbSeconds)} />
                    <AllowanceRow label="Rows read" used={integer(snapshot.rowsRead)} allowance="25 billion / month" rate="$0.001 / million" status={statusLabel(snapshot.rowsRead, snapshot.includedRowsRead)} />
                    <AllowanceRow label="Rows written" used={integer(snapshot.rowsWritten)} allowance="50 million / month" rate="$1.00 / million" status={statusLabel(snapshot.rowsWritten, snapshot.includedRowsWritten)} />
                    <AllowanceRow label="SQL stored data" used={bytes(snapshot.storedBytes)} allowance="5 GB-month" rate="$0.20 / GB-month" status={statusLabel(snapshot.storedBytes, snapshot.includedStorageBytes)} />
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : null}
      </main>
    </div>
  )
}

function AllowanceRow({ label, used, allowance, rate, status }: { label: string; used: string; allowance: string; rate: string; status: string }) {
  const warning = status !== 'Included'
  return (
    <tr>
      <td className="px-5 py-3.5 font-medium text-white/80">{label}</td>
      <td className="px-3 py-3.5 font-mono">{used}</td>
      <td className="px-3 py-3.5 font-mono">{allowance}</td>
      <td className="px-3 py-3.5 font-mono">{rate}</td>
      <td className="px-5 py-3.5"><span className={`inline-flex rounded-full px-2 py-1 text-[9px] font-semibold ${warning ? 'bg-rose-400/[0.08] text-rose-300' : 'bg-emerald-400/[0.08] text-emerald-300'}`}>{status}</span></td>
    </tr>
  )
}
