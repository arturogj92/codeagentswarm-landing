#!/usr/bin/env node
// Daily acquisition report. Only completed UTC days; clicks and installer requests
// are separate measures. Importing this file never fetches data or sends messages.
import { pathToFileURL } from 'node:url'

const UMAMI_BASE = 'https://umami-codeagentswarm-production.up.railway.app'
const UMAMI_WEBSITE_ID = 'a6cf83f7-4ba1-47af-87b3-4fdbd2d537d9'
const BACKEND_BASE = 'https://codeagentswarm-backend-production.up.railway.app'
const DAY_MS = 86_400_000
const METRIC_LIMIT = 10000
const isGuide = (path) => /^\/(en\/guides|es\/guias)\/[^/?#]+\/?$/.test(path)
const required = (name) => {
  if (!process.env[name]) throw new Error(`Missing env var: ${name}`)
  return process.env[name]
}
const pct = (part, whole) => whole > 0 ? `${(100 * part / whole).toFixed(2)}%` : 'n/a'
const delta = (now, before) => before > 0
  ? `${now >= before ? '+' : ''}${((now - before) / before * 100).toFixed(0)}% vs mismo dia de la semana anterior (${before})`
  : 'sin base de comparacion'

export function reportWindow(now = new Date()) {
  const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  return { startAt: midnight - DAY_MS, endAt: midnight - 1 }
}

async function getJson(url, options = {}) {
  const res = await fetch(url, { ...options, signal: AbortSignal.timeout(20_000) })
  if (!res.ok) throw new Error(`HTTP ${res.status} on ${new URL(url).pathname}`)
  return res.json()
}

// Fail on malformed/truncated metrics rather than inventing a conversion rate.
function metricRows(rows) {
  if (!Array.isArray(rows) || rows.length >= METRIC_LIMIT || rows.some(
    (row) => typeof row.x !== 'string' || !Number.isFinite(row.y) || row.y < 0
  )) throw new Error('Incomplete or invalid Umami metrics')
  return rows
}
const count = (value) => {
  if (!Number.isFinite(value) || value < 0) throw new Error('Invalid Umami count')
  return value
}
export function downloadClicks(events, source) {
  return metricRows(events).filter(({ x }) =>
    new RegExp(`^download_app_${source}_(silicon|intel|windows_x64|windows_arm64)$`).test(x)
  ).reduce((sum, { y }) => sum + y, 0)
}

async function umamiWindow(token, startAt, endAt) {
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const base = `${UMAMI_BASE}/api/websites/${UMAMI_WEBSITE_ID}`
  const qs = new URLSearchParams({ startAt, endAt, limit: METRIC_LIMIT })
  const [stats, events, paths] = await Promise.all([
    getJson(`${base}/stats?${qs}`, auth),
    getJson(`${base}/metrics?${qs}&type=event`, auth).then(metricRows),
    getJson(`${base}/metrics?${qs}&type=path`, auth).then(metricRows),
  ])
  const guidePaths = paths.filter(({ x }) => isGuide(x)).sort((a, b) => b.y - a.y)
  const topGuides = await Promise.all(guidePaths.slice(0, 5).map(async ({ x, y }) => ({
    path: x,
    pageviews: y,
    clicks: downloadClicks(await getJson(
      `${base}/metrics?${qs}&type=event&path=${encodeURIComponent(x)}`, auth
    ), 'guide'),
  })))
  const byEvent = Object.fromEntries(events.map(({ x, y }) => [x, y]))
  return {
    visitors: count(stats.visitors),
    homeDownloadClicks: downloadClicks(events, 'home'),
    guideDownloadClicks: downloadClicks(events, 'guide'),
    guidePageviews: guidePaths.reduce((sum, { y }) => sum + y, 0),
    mobileViews: byEvent.mobile_link_offer_view ?? 0,
    mobileSubmits: byEvent.mobile_link_submit ?? 0,
    topGuides,
  }
}

export async function buildReport(now = new Date()) {
  const { startAt, endAt } = reportWindow(now)
  const date = new Date(startAt).toISOString().slice(0, 10)
  const previousDate = new Date(startAt - 7 * DAY_MS).toISOString().slice(0, 10)
  const lines = [`Informe SEO landing: ${date} (dia completo UTC)`, '']
  let current, previous, umamiError
  try {
    const { token } = await getJson(`${UMAMI_BASE}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: required('UMAMI_USERNAME'), password: required('UMAMI_PASSWORD') }),
    })
    ;[current, previous] = await Promise.all([
      umamiWindow(token, startAt, endAt),
      umamiWindow(token, startAt - 7 * DAY_MS, endAt - 7 * DAY_MS),
    ])
  } catch (error) { umamiError = error.message }

  try {
    const downloads = await getJson(`${BACKEND_BASE}/api/releases/download-stats?days=9`)
    if (!Array.isArray(downloads.daily) || downloads.daily.some(
      (day) => !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(day.count) || day.count < 0
    )) throw new Error('Invalid installer statistics')
    // The endpoint omits empty dates. Never substitute the last nonempty date.
    const today = downloads.daily.find((day) => day.date === date)
    const before = downloads.daily.find((day) => day.date === previousDate)
    lines.push(`Solicitudes de instalador: ${today?.count ?? 0}. ${delta(today?.count ?? 0, before?.count ?? 0)}`)
    const platforms = Object.entries(today?.by_platform ?? {}).map(([p, n]) => `${p} ${n}`).join(', ')
    if (platforms) lines.push(`Por plataforma: ${platforms}`)
    lines.push('Son solicitudes al servidor, no instalaciones ni usuarios unicos.')
  } catch (error) {
    lines.push(`Solicitudes de instalador: no disponibles (${error.message})`)
  }
  lines.push('')
  if (current) {
    lines.push(`Visitantes web: ${current.visitors}. ${delta(current.visitors, previous.visitors)}`)
    lines.push(`Clicks de descarga desde home: ${current.homeDownloadClicks}`)
    lines.push(`Clicks de descarga directa desde guias: ${current.guideDownloadClicks}. ${delta(current.guideDownloadClicks, previous.guideDownloadClicks)}`)
    lines.push(`Paginas vistas de guias: ${current.guidePageviews}`)
    lines.push(`Clicks por paginas vistas de guias: ${pct(current.guideDownloadClicks, current.guidePageviews)} (antes ${pct(previous.guideDownloadClicks, previous.guidePageviews)}). No es conversion de usuarios unicos.`)
    lines.push('', 'Guias mas vistas: clicks de descarga / paginas vistas')
    for (const guide of current.topGuides) {
      lines.push(`  ${guide.path}: ${guide.clicks} / ${guide.pageviews} (${pct(guide.clicks, guide.pageviews)})`)
    }
    lines.push('', `Email movil: ${current.mobileSubmits} envios confirmados / ${current.mobileViews} vistas (${pct(current.mobileSubmits, current.mobileViews)})`)
  } else {
    lines.push(`Umami no disponible (${umamiError}). No se calcula conversion.`)
  }
  return lines.join('\n')
}

async function main() {
  if (process.argv.slice(2).some((arg) => arg !== '--dry-run')) throw new Error('Usage: seo-daily-report.mjs [--dry-run]')
  const dryRun = process.argv.includes('--dry-run')
  // Validate delivery config before making requests. --dry-run never sends.
  const token = dryRun ? null : required('TELEGRAM_BOT_TOKEN')
  const chatId = dryRun ? null : required('TELEGRAM_CHAT_ID')
  const report = await buildReport()
  if (dryRun || process.env.SEO_REPORT_STDOUT === '1') console.log(report)
  else console.log(`Report built: ${report.length} chars`)
  if (dryRun) return
  // Public Actions logs must not contain the report, recipient or token.
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text: report }),
    signal: AbortSignal.timeout(20_000),
  })
  const body = await res.json()
  if (!res.ok || !body.ok) throw new Error(`Telegram rejected report (HTTP ${res.status})`)
  console.log('Report sent')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1 })
}
