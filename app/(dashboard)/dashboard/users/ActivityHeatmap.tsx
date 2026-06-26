'use client'

interface HeatmapProps {
  /** Daily click counts. `d` is a calendar date string (YYYY-MM-DD, UTC). */
  data: { d: string; clicks: number }[]
  /** Size of the trailing window in days (defaults to ~6 months). */
  days?: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function toKey(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

// GitHub-style contribution grid: columns are weeks (Sun-Sat), shaded amber by
// how many clicks happened that day relative to the user's busiest day.
export default function ActivityHeatmap({ data, days = 180 }: HeatmapProps) {
  const counts = new Map<string, number>()
  for (const { d, clicks } of data) counts.set(d, clicks)

  const max = data.reduce((m, x) => Math.max(m, x.clicks), 0)

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(today.getTime() - (days - 1) * 86400000)
  start.setDate(start.getDate() - start.getDay()) // back up to Sunday

  const weeks: { date: Date; clicks: number }[][] = []
  const cursor = new Date(start)
  while (cursor <= today) {
    const week: { date: Date; clicks: number }[] = []
    for (let i = 0; i < 7; i++) {
      week.push({ date: new Date(cursor), clicks: counts.get(toKey(cursor)) || 0 })
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(week)
  }

  function level(clicks: number): string {
    if (clicks <= 0) return 'bg-white/[0.06]'
    const r = max > 0 ? clicks / max : 0
    if (r > 0.66) return 'bg-amber-400'
    if (r > 0.33) return 'bg-amber-400/70'
    if (r > 0.12) return 'bg-amber-400/45'
    return 'bg-amber-400/25'
  }

  // Month labels: show a month name above the first week where that month starts.
  const monthLabels = weeks.map((week, i) => {
    const firstOfMonth = week.find((c) => c.date.getDate() <= 7)
    if (!firstOfMonth) return ''
    const prev = i > 0 ? weeks[i - 1].find((c) => c.date.getDate() <= 7) : null
    if (i === 0 || !prev || prev.date.getMonth() !== firstOfMonth.date.getMonth()) {
      return MONTHS[firstOfMonth.date.getMonth()]
    }
    return ''
  })

  return (
    <div className="overflow-x-auto">
      <div className="inline-flex flex-col gap-1">
        {/* Month labels */}
        <div className="flex gap-1 pl-8">
          {monthLabels.map((label, i) => (
            <div key={i} className="w-3 text-[9px] text-white/40 overflow-visible whitespace-nowrap">
              {label}
            </div>
          ))}
        </div>
        <div className="flex gap-1">
          {/* Weekday labels */}
          <div className="flex flex-col gap-1 pr-1 text-[9px] text-white/40">
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, i) => (
              <div key={i} className="h-3 leading-3">{d}</div>
            ))}
          </div>
          {/* Week columns */}
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((cell, di) => (
                <div
                  key={di}
                  className={`w-3 h-3 rounded-sm ${level(cell.clicks)}`}
                  title={`${cell.clicks} click${cell.clicks === 1 ? '' : 's'} · ${toKey(cell.date)}`}
                />
              ))}
            </div>
          ))}
        </div>
        {/* Legend */}
        <div className="flex items-center gap-1 justify-end pt-1 text-[9px] text-white/40">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-white/[0.06]" />
          <div className="w-3 h-3 rounded-sm bg-amber-400/25" />
          <div className="w-3 h-3 rounded-sm bg-amber-400/45" />
          <div className="w-3 h-3 rounded-sm bg-amber-400/70" />
          <div className="w-3 h-3 rounded-sm bg-amber-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
