#!/usr/bin/env node
/**
 * Daily SEO / download-funnel report for the landing, sent to Telegram.
 *
 * Runs on GitHub Actions (see .github/workflows/seo-daily-report.yml) and also
 * locally with the same env vars. Deterministic on purpose: the numbers come
 * straight from Umami and from the backend download counter, so a failing run
 * is a real failure and not a model deciding to phrase things differently.
 *
 * Plain text, no decorative characters: the report is read aloud by TTS.
 */

const UMAMI_BASE = 'https://umami-codeagentswarm-production.up.railway.app'
const UMAMI_WEBSITE_ID = 'a6cf83f7-4ba1-47af-87b3-4fdbd2d537d9'
const BACKEND_BASE = 'https://codeagentswarm-backend-production.up.railway.app'

const DAY_MS = 86_400_000

const required = (name) => {
  const value = process.env[name]
  if (!value) throw new Error(`Missing env var: ${name}`)
  return value
}

const TELEGRAM_BOT_TOKEN = required('TELEGRAM_BOT_TOKEN')
const TELEGRAM_CHAT_ID = required('TELEGRAM_CHAT_ID')
const UMAMI_USERNAME = required('UMAMI_USERNAME')
const UMAMI_PASSWORD = required('UMAMI_PASSWORD')

async function getJson(url, options = {}) {
  const res = await fetch(url, { ...options, signal: AbortSignal.timeout(20_000) })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} on ${url}`)
  return res.json()
}

async function umamiToken() {
  const { token } = await getJson(`${UMAMI_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: UMAMI_USERNAME, password: UMAMI_PASSWORD }),
  })
  return token
}

async function umamiWindow(token, startAt, endAt) {
  const auth = { headers: { Authorization: `Bearer ${token}` } }
  const qs = `startAt=${startAt}&endAt=${endAt}`
  const [stats, events, paths] = await Promise.all([
    getJson(`${UMAMI_BASE}/api/websites/${UMAMI_WEBSITE_ID}/stats?${qs}`, auth),
    getJson(`${UMAMI_BASE}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${qs}&type=event`, auth),
    getJson(`${UMAMI_BASE}/api/websites/${UMAMI_WEBSITE_ID}/metrics?${qs}&type=path`, auth),
  ])
  const byEvent = Object.fromEntries(events.map((e) => [e.x, e.y]))
  const ev = (name) => byEvent[name] ?? 0
  return {
    visitors: stats.visitors ?? 0,
    pageviews: stats.pageviews ?? 0,
    homeDownloadClicks:
      ev('download_app_home_silicon') +
      ev('download_app_home_intel') +
      ev('download_app_home_windows_x64') +
      ev('download_app_home_windows_arm64'),
    guideReaders: ev('guide_scroll_25'),
    bridge:
      ev('guide_product_block_click') + ev('guide_sticky_bar_click') + ev('nav_download_guides'),
    productBlock: ev('guide_product_block_click'),
    stickyClick: ev('guide_sticky_bar_click'),
    stickyDismiss: ev('guide_sticky_bar_dismiss'),
    navGuides: ev('nav_download_guides'),
    mobileViews: ev('mobile_link_offer_view'),
    mobileSubmits: ev('mobile_link_submit'),
    topPaths: paths.sort((a, b) => b.y - a.y).slice(0, 5),
  }
}

const pct = (part, whole) => (whole > 0 ? `${((part / whole) * 100).toFixed(1)}%` : 'n/a')

const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`

const delta = (now, before) => {
  if (!before) return 'sin dato de comparacion'
  const change = ((now - before) / before) * 100
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(0)}% vs mismo dia la semana pasada (${before})`
}

async function buildReport() {
  const endAt = Date.now()
  const startAt = endAt - DAY_MS
  const prevEnd = endAt - 7 * DAY_MS
  const prevStart = prevEnd - DAY_MS

  const lines = []
  let today = null
  let prev = null
  let umamiError = null

  try {
    const token = await umamiToken()
    ;[today, prev] = await Promise.all([
      umamiWindow(token, startAt, endAt),
      umamiWindow(token, prevStart, prevEnd),
    ])
  } catch (err) {
    umamiError = err.message
  }

  // Real downloads served by the backend. Adblockers cannot hide these, so they
  // are the source of truth, not the Umami click events.
  let downloads = null
  let downloadsError = null
  try {
    // 9 days so the same weekday a week ago is always inside the window.
    downloads = await getJson(`${BACKEND_BASE}/api/releases/download-stats?days=9`)
  } catch (err) {
    downloadsError = err.message
  }

  const daily = downloads?.daily ?? []
  const last = daily[daily.length - 1]
  const prevDay = daily.find(
    (d) => d.date === new Date(endAt - 7 * DAY_MS).toISOString().slice(0, 10)
  )

  lines.push(`Informe SEO landing, ${new Date(endAt).toISOString().slice(0, 10)}`)
  lines.push('')

  if (last) {
    lines.push(`Descargas reales hoy: ${last.count}. ${delta(last.count, prevDay?.count)}`)
    const platforms = Object.entries(last.by_platform ?? {})
      .map(([p, n]) => `${p} ${n}`)
      .join(', ')
    if (platforms) lines.push(`Por plataforma: ${platforms}`)
    const fromEmail = downloads?.by_source?.mobile_email ?? 0
    lines.push(`Total ultimos 9 dias: ${downloads.total}, de los cuales ${fromEmail} vienen del email movil`)
  } else {
    lines.push(`Descargas reales: no disponibles (${downloadsError ?? 'sin datos'})`)
  }
  lines.push('')

  if (today) {
    lines.push(`Visitantes: ${today.visitors}. ${delta(today.visitors, prev?.visitors)}`)
    lines.push(`Clicks de descarga en la home: ${today.homeDownloadClicks}`)
    lines.push('')
    lines.push(
      `Puente de guias a descarga: ${today.bridge} clicks sobre ${today.guideReaders} lectores de guias (${pct(today.bridge, today.guideReaders)})`
    )
    lines.push(
      `Desglose: bloque de producto ${today.productBlock}, barra fija ${plural(today.stickyClick, 'click', 'clicks')} y ${plural(today.stickyDismiss, 'cierre', 'cierres')}, boton de la navbar ${today.navGuides}`
    )
    lines.push('')
    lines.push(
      `Email movil: ${plural(today.mobileViews, 'vista', 'vistas')}, ${plural(today.mobileSubmits, 'envio', 'envios')} (${pct(today.mobileSubmits, today.mobileViews)})`
    )
    lines.push('')
    lines.push('Paginas mas vistas:')
    for (const p of today.topPaths) lines.push(`  ${p.x}: ${p.y}`)
  } else {
    lines.push(`Umami no disponible (${umamiError}). El resto del informe sigue siendo valido.`)
  }

  return lines.join('\n')
}

async function sendTelegram(text) {
  const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    signal: AbortSignal.timeout(20_000),
  })
  const body = await res.json()
  if (!body.ok) throw new Error(`Telegram rejected the message: ${JSON.stringify(body)}`)
  return body.result.message_id
}

const report = await buildReport()
console.log(report)
const messageId = await sendTelegram(report)
console.log(`\nSent to Telegram, message_id ${messageId}`)
