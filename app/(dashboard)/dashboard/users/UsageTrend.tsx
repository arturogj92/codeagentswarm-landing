'use client'

import { useEffect, useState } from 'react'
import { stickinessPct, trendScale, type TrendDays, type UsageTrend as Trend } from './users-activity'

const CARD = 'rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5'
const PANEL = 'min-w-0 rounded-lg border border-white/[0.07] bg-black/20 p-4'
const shortDate = (iso: string) => new Date(iso.length === 10 ? `${iso}T00:00:00Z` : iso)
  .toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
// Today is still in progress, so it is striped instead of solid.
const TODAY_STRIPES = 'repeating-linear-gradient(45deg, rgba(9,9,9,0.45) 0 4px, transparent 4px 8px)'
// The boundary label sits right of its line while it fits, otherwise to its left.
const labelSide = (ratio: number) => ratio > 0.85 ? 'right-1.5' : ratio > 0.5 ? 'right-1.5 xl:left-1.5 xl:right-auto' : 'left-1.5'
const isWeekend = (day: string) => [0, 6].includes(new Date(`${day}T00:00:00Z`).getUTCDay())

export default function UsageTrend({ excludedUserIds, ready, refreshKey }: {
  excludedUserIds: string[]
  ready: boolean
  refreshKey: number
}) {
  const [days, setDays] = useState<TrendDays>(30)
  const [trend, setTrend] = useState<Trend | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!ready) return
    const controller = new AbortController()
    setTrend(null)
    setError(false)
    void (async () => {
      try {
        const response = await fetch('/api/dashboard/users/trend', {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ excluded_user_ids: excludedUserIds, days }),
        })
        if (!response.ok) throw new Error('Could not load usage trend')
        const data = await response.json() as Trend
        if (!controller.signal.aborted) setTrend(data)
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    })()
    return () => controller.abort()
  }, [excludedUserIds, ready, refreshKey, retry, days])

  return (
    <section aria-labelledby="usage-trend-title" className={`mt-5 ${CARD}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 id="usage-trend-title" className="text-lg font-semibold tracking-[-0.02em] text-white">Usage trend</h2>
          <p className="mt-1 text-sm text-white/55">
            Every signed-in app plus users sharing analytics · UTC days
            {excludedUserIds.length ? ` · ${excludedUserIds.length} users excluded` : ''}
          </p>
        </div>
        <div className="flex rounded-lg border border-white/10 bg-black/25 p-0.5" role="group" aria-label="Usage trend period">
          {([14, 30] as TrendDays[]).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={days === value}
              onClick={() => setDays(value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${days === value ? 'bg-white/[0.08] text-white' : 'text-white/55 hover:text-white/80'}`}
            >
              {value} days
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <div role="alert" className="mt-5 rounded-lg border border-rose-400/20 bg-rose-400/[0.06] p-3 text-sm text-rose-200">
          Usage trend could not load.{' '}
          <button type="button" onClick={() => setRetry((value) => value + 1)} className="font-semibold underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300">Retry</button>
        </div>
      ) : !trend ? (
        <div aria-label="Loading usage trend" className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
            {Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[84px] animate-pulse rounded-lg bg-white/[0.045] motion-reduce:animate-none" />)}
          </div>
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
            <div className="h-72 animate-pulse rounded-lg bg-white/[0.045] motion-reduce:animate-none" />
            <div className="h-72 animate-pulse rounded-lg bg-white/[0.045] motion-reduce:animate-none" />
          </div>
        </div>
      ) : (
        <>
          <Kpis trend={trend} />
          <div className="mt-4 grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,0.85fr)]">
            <DailyChart trend={trend} />
            <WeeklyFlow weeks={trend.weeks} />
          </div>
          <p className="mt-4 text-[11px] leading-5 text-white/40">
            An account is active on a day when its app checked the plan while signed in, or when it sent a usage event.
            {trend.coverage_start ? ` Before ${shortDate(trend.coverage_start)} only usage events were recorded, so earlier days can read lower.` : ''}
            {' '}Returning = also active in the previous 7 days. Left = active in the previous 7 days but not in this one.
          </p>
        </>
      )}
    </section>
  )
}

function Kpis({ trend }: { trend: Trend }) {
  const stickiness = stickinessPct(trend)
  const items: Array<{ label: string; value: string; note: string; tone?: string; live?: boolean }> = [
    { label: 'Connected now', value: String(trend.connected_now), note: 'App open in the last 20 min', tone: 'text-emerald-300', live: true },
    { label: 'Active today', value: String(trend.active_today), note: 'Since 00:00 UTC' },
    { label: 'Last 24 hours', value: String(trend.active_24h), note: 'Rolling window' },
    { label: 'Daily average', value: trend.daily_average === null ? '–' : String(Math.round(Number(trend.daily_average))), note: 'Last 7 full days' },
    { label: 'Stickiness', value: stickiness === null ? '–' : `${stickiness}%`, note: 'Daily average ÷ active in 7d' },
    { label: '7+ day streaks', value: String(trend.streak_7), note: 'Used every day for a week', tone: 'text-amber-300' },
  ]
  return (
    <dl className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-3 xl:grid-cols-6">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-white/[0.07] bg-black/20 px-3.5 py-3">
          <dt className="flex items-center gap-1.5 text-[11px] text-white/55">
            {item.live && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />}
            {item.label}
          </dt>
          <dd className={`mt-1 font-mono text-2xl font-semibold tracking-[-0.03em] ${item.tone || 'text-white'}`}>{item.value}</dd>
          <dd className="mt-0.5 text-[10px] text-white/40">{item.note}</dd>
        </div>
      ))}
    </dl>
  )
}

function DailyChart({ trend }: { trend: Trend }) {
  const [focus, setFocus] = useState<number | null>(null)
  const rows = trend.daily
  const max = trendScale(rows.map((row) => row.active))
  const ticks = [max, (max * 2) / 3, max / 3, 0]
  const boundary = trend.coverage_start ? rows.findIndex((row) => row.day === trend.coverage_start) : -1
  const step = rows.length > 14 ? 5 : 2
  const focused = focus === null ? null : rows[focus]

  return (
    <div className={PANEL}>
      <h3 className="text-[13px] font-semibold text-white/90">Daily active accounts</h3>
      <p className="mt-0.5 text-[11px] text-white/40" aria-live="polite">
        {focused
          ? `${shortDate(focused.day)}${focus === rows.length - 1 ? ' (so far)' : ''} · ${focused.active} active accounts · ${focused.signups} sign-ups`
          : 'Hover or focus a day for exact values. Today is still in progress.'}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-white/55" aria-hidden="true">
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-emerald-400/75" />Active accounts</span>
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-emerald-400/40" />Weekend</span>
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-emerald-400/75" style={{ backgroundImage: TODAY_STRIPES }} />Today so far</span>
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-full bg-amber-300" />Sign-ups</span>
      </div>
      <div className="relative mt-4 overflow-hidden">
        <div className="absolute inset-y-0 left-0 flex w-7 flex-col justify-between font-mono text-[10px] text-white/30" aria-hidden="true">
          {ticks.map((tick) => <span key={tick}>{Math.round(tick)}</span>)}
        </div>
        <div className="relative ml-7 flex h-52 items-end gap-[3px] border-b border-white/[0.07]" role="list" aria-label="Daily active accounts">
          {[1, 2].map((n) => <div key={n} aria-hidden="true" className="absolute inset-x-0 border-t border-dashed border-white/[0.05]" style={{ top: `${(n / 3) * 100}%` }} />)}
          {boundary > 0 && (
            <div aria-hidden="true" className="absolute -top-1 bottom-0 border-l border-dashed border-sky-300/55" style={{ left: `${(boundary / rows.length) * 100}%` }}>
              <span className={`absolute top-0 whitespace-nowrap text-[10px] text-sky-300 ${labelSide(boundary / rows.length)}`}>
                Full count from {shortDate(trend.coverage_start as string)}
              </span>
            </div>
          )}
          {rows.map((row, index) => {
            const today = index === rows.length - 1
            const tone = isWeekend(row.day) ? 'bg-emerald-400/40' : 'bg-emerald-400/75'
            return (
              <div
                key={row.day}
                role="listitem"
                tabIndex={0}
                aria-label={`${shortDate(row.day)}: ${row.active} active accounts, ${row.signups} sign-ups`}
                onMouseEnter={() => setFocus(index)}
                onMouseLeave={() => setFocus(null)}
                onFocus={() => setFocus(index)}
                onBlur={() => setFocus(null)}
                className="group relative flex h-full flex-1 items-end justify-center focus-visible:outline-none"
              >
                <div className={`w-full max-w-[22px] rounded-t-[3px] ${tone} group-hover:bg-emerald-300 group-focus-visible:bg-emerald-300`} style={{ height: `${(row.active / max) * 100}%`, ...(today ? { backgroundImage: TODAY_STRIPES } : {}) }} />
                {row.signups > 0 && (
                  <span aria-hidden="true" className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-amber-300" style={{ bottom: `${(row.signups / max) * 100}%` }} />
                )}
              </div>
            )
          })}
        </div>
        <div className="ml-7 mt-1.5 flex gap-[3px] overflow-hidden font-mono text-[10px] text-white/30" aria-hidden="true">
          {rows.map((row, index) => (
            index === rows.length - 1 ? (
              // Anchored to the right edge so the last date never overflows the chart.
              <span key={row.day} className="relative flex-1"><span className="absolute right-0 whitespace-nowrap">{shortDate(row.day)}</span></span>
            ) : (
              <span key={row.day} className={`flex-1 whitespace-nowrap text-center ${(index / step) % 2 === 1 || rows.length - 1 - index < 2 * step ? 'max-sm:invisible' : ''}`}>{index % step === 0 && rows.length - 1 - index >= step ? shortDate(row.day) : ''}</span>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

function WeeklyFlow({ weeks }: { weeks: Trend['weeks'] }) {
  return (
    <div className={PANEL}>
      <h3 className="text-[13px] font-semibold text-white/90">Weekly flow</h3>
      <p className="mt-0.5 text-[11px] text-white/40">Who makes up each 7-day window, and who did not come back</p>
      <div className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[11px] text-white/55" aria-hidden="true">
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-emerald-400" />Returning</span>
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-amber-300" />New</span>
        <span><i className="mr-1.5 inline-block h-2 w-2 rounded-sm bg-sky-300" />Back after a break</span>
      </div>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[440px] text-xs">
          <thead>
            <tr className="text-[10px] text-white/40">
              <th scope="col" className="pb-2 text-left font-medium">Week</th>
              {['Active', 'Returning', 'New', 'Back', 'Left', 'Sign-ups'].map((label) => (
                <th key={label} scope="col" className="px-1.5 pb-2 text-right font-medium">{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week) => {
              const share = (value: number) => `${week.active ? (value / week.active) * 100 : 0}%`
              return (
                <tr key={week.starts_at} className="border-t border-white/[0.07]">
                  <th scope="row" className="py-2.5 pr-2 text-left font-normal text-white/90">
                    <span className="whitespace-nowrap">{shortDate(week.starts_at)} – {shortDate(week.ends_at)}</span>
                    <span aria-hidden="true" className="mt-1.5 flex h-1.5 min-w-[70px] overflow-hidden rounded-full bg-white/[0.05]">
                      <span className="bg-emerald-400" style={{ width: share(week.returning) }} />
                      <span className="bg-amber-300" style={{ width: share(week.new) }} />
                      <span className="bg-sky-300" style={{ width: share(week.back) }} />
                    </span>
                  </th>
                  <td className="px-1.5 text-right font-mono font-semibold text-white">{week.active}</td>
                  <td className="px-1.5 text-right font-mono text-white/70">{week.returning}</td>
                  <td className="px-1.5 text-right font-mono text-white/70">{week.new}</td>
                  <td className="px-1.5 text-right font-mono text-white/70">{week.back}</td>
                  <td className="px-1.5 text-right font-mono text-rose-300">−{week.left}</td>
                  <td className="px-1.5 text-right font-mono text-white/70">{week.signups}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
