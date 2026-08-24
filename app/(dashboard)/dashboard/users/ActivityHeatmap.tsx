interface HeatmapProps {
  data: { d: string; events: number }[]
  days?: number
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_MS = 86_400_000

function toKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function level(events: number, maximum: number): string {
  if (events <= 0) return 'bg-white/[0.06]'
  const ratio = maximum > 0 ? events / maximum : 0
  if (ratio > 0.66) return 'bg-amber-400'
  if (ratio > 0.33) return 'bg-amber-400/70'
  if (ratio > 0.12) return 'bg-amber-400/45'
  return 'bg-amber-400/25'
}

export default function ActivityHeatmap({ data, days = 180 }: HeatmapProps) {
  const today = new Date()
  const utcToday = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()))
  const windowStart = new Date(utcToday.getTime() - (days - 1) * DAY_MS)
  const windowStartKey = toKey(windowStart)
  const todayKey = toKey(utcToday)
  const visibleData = data.filter(({ d }) => d >= windowStartKey && d <= todayKey)
  const counts = new Map(visibleData.map(({ d, events }) => [d, events]))
  const maximum = visibleData.reduce((current, entry) => Math.max(current, entry.events), 0)
  const total = visibleData.reduce((sum, entry) => sum + entry.events, 0)
  const activeDays = visibleData.filter((entry) => entry.events > 0).length

  const gridStart = new Date(windowStart)
  gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay())

  const weeks: { date: Date; events: number; future: boolean }[][] = []
  const cursor = new Date(gridStart)
  while (cursor <= utcToday) {
    const week: { date: Date; events: number; future: boolean }[] = []
    for (let index = 0; index < 7; index += 1) {
      const date = new Date(cursor)
      const key = toKey(date)
      week.push({ date, events: counts.get(key) ?? 0, future: date > utcToday })
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    weeks.push(week)
  }

  const monthLabels = weeks.map((week, index) => {
    const monthStart = week.find(({ date }) => date.getUTCDate() <= 7)
    if (!monthStart) return ''
    const previous = index > 0 ? weeks[index - 1].find(({ date }) => date.getUTCDate() <= 7) : null
    if (!previous || previous.date.getUTCMonth() !== monthStart.date.getUTCMonth()) {
      return MONTHS[monthStart.date.getUTCMonth()]
    }
    return ''
  })

  return (
    <div
      role="img"
      aria-label={`${total.toLocaleString('en-US')} recorded events across ${activeDays} active days in the last ${days} days`}
      className="max-w-full overflow-x-auto pb-1"
    >
      <div aria-hidden="true" className="inline-flex min-w-max flex-col gap-1">
        <div className="flex gap-1 pl-8">
          {monthLabels.map((label, index) => (
            <div key={`${label}-${index}`} className="w-3 overflow-visible whitespace-nowrap text-[9px] text-white/55">
              {label}
            </div>
          ))}
        </div>

        <div className="flex gap-1">
          <div className="flex flex-col gap-1 pr-1 text-[9px] text-white/55">
            {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, index) => (
              <div key={`${day}-${index}`} className="h-3 leading-3">{day}</div>
            ))}
          </div>

          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((cell) => (
                <div
                  key={toKey(cell.date)}
                  className={`h-3 w-3 rounded-[3px] ${cell.future ? 'opacity-0' : level(cell.events, maximum)}`}
                  title={cell.future ? undefined : `${cell.events} recorded event${cell.events === 1 ? '' : 's'} on ${toKey(cell.date)}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-1 pt-1 text-[9px] text-white/55">
          <span>Less</span>
          <span className="h-3 w-3 rounded-[3px] bg-white/[0.06]" />
          <span className="h-3 w-3 rounded-[3px] bg-amber-400/25" />
          <span className="h-3 w-3 rounded-[3px] bg-amber-400/45" />
          <span className="h-3 w-3 rounded-[3px] bg-amber-400/70" />
          <span className="h-3 w-3 rounded-[3px] bg-amber-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
