'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { Terminal } from 'lucide-react'
import { agentLabel, buildAgentTrend, type FeatureWindowDays, type UserActivityCharts } from './users-activity'

const CARD = 'rounded-xl border border-white/[0.09] bg-[#111111] p-4 sm:p-5'
const COLORS: Record<string, string> = {
  claude: '#fb923c', codex: '#34d399', antigravity: '#c084fc', opencode: '#60a5fa',
  kimi: '#f472b6', grok: '#facc15', cursor: '#22d3ee', gemini: '#a3e635', other: '#a3a3a3',
  pi: '#f87171', devin: '#a5b4fc', muse: '#2dd4bf',
}
const PLATFORMS = [
  { key: 'mac', label: 'Mac', color: '#60a5fa' },
  { key: 'windows', label: 'Windows', color: '#34d399' },
  { key: 'linux', label: 'Linux', color: '#c084fc' },
  { key: 'unknown', label: 'Unknown', color: '#737373' },
  { key: 'other', label: 'Other', color: '#a3a3a3' },
]
const number = (value: number) => value.toLocaleString('en-US')
const dateLabel = (day: string) => new Date(`${day}T00:00:00Z`).toLocaleDateString('en-US', {
  month: 'short', day: 'numeric', timeZone: 'UTC',
})
const label = (agent: string) => agent === 'other' ? 'Other / unknown' : agentLabel(agent)

export default function UserAnalyticsCharts({ excludedUserIds, ready, refreshKey }: {
  excludedUserIds: string[]
  ready: boolean
  refreshKey: number
}) {
  const [windowDays, setWindowDays] = useState<FeatureWindowDays>(30)
  const [charts, setCharts] = useState<UserActivityCharts | null>(null)
  const [error, setError] = useState(false)
  const [retry, setRetry] = useState(0)

  useEffect(() => {
    if (!ready) return
    const controller = new AbortController()
    setCharts(null)
    setError(false)
    void (async () => {
      try {
        const response = await fetch('/api/dashboard/users/charts', {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ excluded_user_ids: excludedUserIds, window_days: windowDays }),
        })
        if (!response.ok) throw new Error('Could not load charts')
        const data = await response.json() as UserActivityCharts
        if (!controller.signal.aborted) setCharts(data)
      } catch {
        if (!controller.signal.aborted) setError(true)
      }
    })()
    return () => controller.abort()
  }, [excludedUserIds, ready, refreshKey, retry, windowDays])

  return (
    <section aria-label="Platforms, downloads and agent trends" className="mt-5 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold tracking-[-0.02em]">Platforms & agent trends</h2>
          <p className="mt-1 text-xs text-white/55">
            {excludedUserIds.length ? `${excludedUserIds.length} users excluded from user and agent counts. ` : ''}
            Downloads include all visitors.
          </p>
        </div>
      </div>
      {error ? (
        <div role="alert" className="rounded-xl border border-rose-400/25 bg-rose-400/[0.07] p-4 text-sm text-rose-200">
          Charts could not load.{' '}
          <button type="button" onClick={() => setRetry((value) => value + 1)} className="underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-rose-300">Retry charts</button>
        </div>
      ) : !charts ? (
        <div role="status" aria-label="Loading user charts" className="grid gap-4 md:grid-cols-2">
          <span className="sr-only">Loading user charts…</span>
          {[0, 1, 2].map((item) => <div key={item} className={`h-56 animate-pulse rounded-xl bg-white/[0.045] ${item === 2 ? 'md:col-span-2' : ''}`} />)}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <PlatformBars
              title="Users by operating system"
              description="All registered accounts · last known desktop OS"
              unit="users"
              counts={Object.fromEntries(charts.users_by_platform.map((row) => [row.platform, row.users]))}
              note="Each account counts once. Unknown means no recorded desktop OS."
            />
            <PlatformBars
              title="Downloads in the last 7 days"
              description="By operating system · today included · UTC"
              unit="downloads"
              counts={Object.fromEntries(charts.downloads_7d.map((row) => [row.platform, row.downloads]))}
              note="Tracked download requests, including repeats. Mac and Windows each include both architectures; Linux includes .deb and AppImage."
            />
          </div>
          <AgentTrend key={`${charts.generated_at}:${charts.window_days}`} charts={charts} onWindowDays={setWindowDays} />
        </>
      )}
    </section>
  )
}

function PlatformBars({ title, description, unit, counts, note }: {
  title: string; description: string; unit: string; counts: Record<string, number>; note: string
}) {
  const total = Object.values(counts).reduce((sum, count) => sum + count, 0)
  const max = Math.max(1, ...Object.values(counts))
  return (
    <article className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="mt-1 text-xs text-white/55">{description}</p>
        </div>
        <p className="text-right text-xl font-semibold tabular-nums">{number(total)}<span className="block text-[10px] font-normal text-white/50">{unit}</span></p>
      </div>
      <dl className="mt-5 space-y-4">
        {PLATFORMS.filter(({ key }) => key === 'mac' || key === 'windows' || counts[key] > 0).map(({ key, label: name, color }) => (
          <div key={key}>
            <div className="mb-1.5 flex justify-between text-sm">
              <dt>{name}</dt>
              <dd className="tabular-nums">{number(counts[key] || 0)} <span className="ml-2 text-xs text-white/50">{total ? Math.round((counts[key] || 0) / total * 100) : 0}%</span></dd>
            </div>
            <div aria-hidden="true" className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full rounded-full" style={{ width: `${(counts[key] || 0) / max * 100}%`, backgroundColor: color }} />
            </div>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[11px] leading-5 text-white/50">{total ? note : `No ${unit} recorded.`}</p>
    </article>
  )
}

function AgentName({ agent }: { agent: string }) {
  const icon = Object.hasOwn(COLORS, agent) && agent !== 'other'
    ? `/icons/apps/${agent}-icon.${['antigravity', 'kimi'].includes(agent) ? 'png' : 'svg'}`
    : null
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
      {icon
        ? <Image src={icon} alt="" width={16} height={16} unoptimized className="h-4 w-4 shrink-0 object-contain" />
        : <Terminal aria-hidden="true" className="h-4 w-4 shrink-0" />}
      {label(agent)}
    </span>
  )
}

function AgentTrend({ charts, onWindowDays }: {
  charts: UserActivityCharts
  onWindowDays: (days: FeatureWindowDays) => void
}) {
  const { days, series } = useMemo(() => buildAgentTrend(charts), [charts])
  const [selected, setSelected] = useState(days.length - 1)
  const [metric, setMetric] = useState<'sessions' | 'users'>('sessions')
  const chartRef = useRef<SVGSVGElement>(null)
  const [chartWidth, setChartWidth] = useState(900)
  useEffect(() => {
    if (!chartRef.current) return
    const observer = new ResizeObserver(([entry]) => setChartWidth(Math.max(280, entry.contentRect.width)))
    observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])
  const max = Math.max(1, ...series.flatMap((line) => line.points.map((point) => point[metric])))
  const ceiling = Math.ceil(max / 4) * 4
  const x = (index: number) => 48 + index / Math.max(1, days.length - 1) * (chartWidth - 68)
  const y = (value: number) => 230 - value / ceiling * 200
  const dateTicks = [...new Set([0, Math.floor((days.length - 1) / 3), Math.floor((days.length - 1) * 2 / 3), days.length - 1])]

  return (
    <article className={CARD}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">Daily agent usage</h3>
          <p className="mt-1 text-xs text-white/55">Last {charts.window_days} days · session launches · UTC · today is partial</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-white/60">
            Agent trend
            <select
              value={charts.window_days}
              onChange={(event) => onWindowDays(Number(event.target.value) as FeatureWindowDays)}
              className="rounded-lg border border-white/15 bg-[#111111] px-3 py-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              {[7, 30, 90, 180].map((days) => <option key={days} value={days}>Last {days} days</option>)}
            </select>
          </label>
          <div aria-label="Agent usage metric" className="flex rounded-lg border border-white/10 p-1">
            {(['sessions', 'users'] as const).map((value) => (
              <button key={value} type="button" aria-pressed={metric === value} onClick={() => setMetric(value)} className={`rounded-md px-3 py-1.5 text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${metric === value ? 'bg-white/10 text-white' : 'text-white/50'}`}>
                {value === 'sessions' ? 'Sessions' : 'Unique users'}
              </button>
            ))}
          </div>
        </div>
      </div>
      {series.length === 0 ? (
        <p className="py-16 text-center text-sm text-white/50">No agent launches recorded in this period.</p>
      ) : (
        <>
          <ul aria-label="Agent legend" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/75">
            {series.map(({ agent }) => <li key={agent} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[agent] || COLORS.other }} /><AgentName agent={agent} /></li>)}
          </ul>
          <svg
            ref={chartRef}
            viewBox={`0 0 ${chartWidth} 270`}
            role="img"
            aria-label={`Daily ${metric} by agent. Use the day slider or expand daily values for exact counts.`}
            className="mt-4 h-[270px] w-full"
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect()
              const position = (event.clientX - bounds.left - 48) / (chartWidth - 68)
              setSelected(Math.max(0, Math.min(days.length - 1, Math.round(position * (days.length - 1)))))
            }}
          >
            <title>Daily {metric} by agent</title>
            {[0, 1, 2, 3, 4].map((tick) => (
              <g key={tick}>
                <line x1="48" x2={chartWidth - 20} y1={y(tick * ceiling / 4)} y2={y(tick * ceiling / 4)} stroke="white" strokeOpacity="0.08" />
                <text x="38" y={y(tick * ceiling / 4) + 4} textAnchor="end" fill="#a3a3a3" fontSize="11">{number(tick * ceiling / 4)}</text>
              </g>
            ))}
            {dateTicks.map((index) => <text key={index} x={x(index)} y="256" textAnchor={index === 0 ? 'start' : index === days.length - 1 ? 'end' : 'middle'} fill="#a3a3a3" fontSize="11">{dateLabel(days[index])}</text>)}
            <line x1={x(selected)} x2={x(selected)} y1="30" y2="230" stroke="white" strokeOpacity="0.25" strokeDasharray="4 4" />
            {series.map(({ agent, points }, lineIndex) => (
              <g key={agent}>
                <polyline fill="none" stroke={COLORS[agent] || COLORS.other} strokeWidth="2.5" strokeLinejoin="round" vectorEffect="non-scaling-stroke" strokeDasharray={lineIndex % 2 ? '6 3' : undefined} points={points.map((point, index) => `${x(index)},${y(point[metric])}`).join(' ')} />
                <circle cx={x(selected)} cy={y(points[selected][metric])} r="4" fill={COLORS[agent] || COLORS.other} />
              </g>
            ))}
          </svg>
          <label className="mt-1 flex items-center gap-4 text-xs text-white/60">
            <span className="shrink-0">Inspect day</span>
            <input type="range" min="0" max={days.length - 1} value={selected} onChange={(event) => setSelected(Number(event.target.value))} aria-valuetext={dateLabel(days[selected])} className="min-w-0 flex-1 accent-amber-400 focus-visible:outline-amber-400" />
          </label>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 rounded-lg bg-white/[0.035] p-3 text-xs" aria-live="polite" aria-atomic="true">
            <span className="font-semibold">{dateLabel(days[selected])}{selected === days.length - 1 ? ' · today' : ''}</span>
            {series.map(({ agent, points }) => <span key={agent} className="inline-flex items-center gap-1" style={{ color: COLORS[agent] || COLORS.other }}><AgentName agent={agent} />: <strong className="tabular-nums">{number(points[selected][metric])}</strong> {metric}</span>)}
          </div>
          <p className="mt-3 text-[11px] text-white/50">Recorded desktop and mobile session launches, including resumed sessions. Users are unique per agent per day; this does not measure time spent.</p>
          <details className="mt-3 text-xs text-white/60">
            <summary className="w-fit cursor-pointer rounded focus-visible:ring-2 focus-visible:ring-amber-400">Daily values</summary>
            <div className="mt-3 max-h-64 overflow-auto">
              <table className="w-full text-left tabular-nums">
                <caption className="sr-only">Daily {metric} by agent in UTC</caption>
                <thead><tr><th scope="col" className="p-2">Date (UTC)</th>{series.map(({ agent }) => <th key={agent} scope="col" className="p-2"><AgentName agent={agent} /></th>)}</tr></thead>
                <tbody>{days.map((day, index) => <tr key={day} className="border-t border-white/[0.06]"><th scope="row" className="whitespace-nowrap p-2 font-normal">{day}</th>{series.map(({ agent, points }) => <td key={agent} className="p-2">{number(points[index][metric])}</td>)}</tr>)}</tbody>
              </table>
            </div>
          </details>
        </>
      )}
    </article>
  )
}
