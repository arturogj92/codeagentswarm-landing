#!/usr/bin/env node
// Read-only Umami report. Raw session/event identifiers never leave memory.
import { pathToFileURL } from 'node:url'

const BASE = 'https://umami-codeagentswarm-production.up.railway.app'
const SITE = 'a6cf83f7-4ba1-47af-87b3-4fdbd2d537d9'
const DAY = 86_400_000
const LIMIT = 10000
const SOURCES = {
  ChatGPT: ['chatgpt.com', 'chat.openai.com', 'chatgpt'],
  Gemini: ['gemini.google.com', 'gemini'],
  Perplexity: ['perplexity.ai', 'www.perplexity.ai', 'perplexity'],
  Claude: ['claude.ai', 'claude'],
  Copilot: ['copilot.microsoft.com', 'copilot'],
}
export const DOWNLOAD_EVENT = /^download_app_(home|guide|guides_index)_(silicon|intel|windows_x64|windows_arm64|linux_(?:x64|arm64)_(?:deb|appimage))$/
const sourceFor = value => Object.keys(SOURCES).find(key => SOURCES[key].includes(value?.toLowerCase()))
const sourceInQuery = query => sourceFor(new URLSearchParams(query || '').get('utm_source'))

export function aiSource(event) {
  // An explicit UTM source takes precedence when both signals name different AIs.
  return sourceInQuery(event.urlQuery) || sourceFor(event.referrerDomain)
}

export function summarizeAiTraffic(acquisition, downloads) {
  const rows = Object.fromEntries(Object.keys(SOURCES).map(source => [source, {
    source, pageviews: 0, sessions: new Set(), downloadSessions: new Set(),
    home: 0, guide: 0, guides_index: 0, landingPages: {},
  }]))
  const touches = new Map()
  // The same pageview may match both its referrer and its UTM query.
  for (const event of new Map(acquisition.map(e => [e.id, e])).values()) {
    const source = aiSource(event)
    if (event.eventType !== 1 || !source) continue
    const row = rows[source]
    row.pageviews++
    row.sessions.add(event.sessionId)
    const time = Date.parse(event.createdAt)
    const list = touches.get(event.sessionId) || []
    list.push({ source, time })
    touches.set(event.sessionId, list)
    row.landingPages[event.urlPath] = (row.landingPages[event.urlPath] || 0) + 1
  }
  for (const list of touches.values()) list.sort((a, b) => a.time - b.time)
  for (const event of new Map(downloads.map(e => [e.id, e])).values()) {
    const match = DOWNLOAD_EVENT.exec(event.eventName || '')
    if (event.eventType !== 2 || !match) continue
    const time = Date.parse(event.createdAt)
    const touch = touches.get(event.sessionId)?.findLast(t => t.time <= time)
    if (!touch) continue
    rows[touch.source][match[1]]++
    rows[touch.source].downloadSessions.add(event.sessionId)
  }
  return Object.values(rows).map(row => ({ ...row,
    sessions: row.sessions.size,
    downloadSessions: row.downloadSessions.size,
    landingPages: Object.entries(row.landingPages).sort((a, b) => b[1] - a[1]).slice(0, 5),
  }))
}

export async function umamiJson(path, token, options = {}) {
  const response = await fetch(`${BASE}/api/${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers },
    signal: AbortSignal.timeout(60000),
  })
  if (!response.ok) throw new Error(`Umami HTTP ${response.status}: ${path.split('?')[0]}`)
  return response.json()
}

export async function umamiLogin() {
  const username = process.env.UMAMI_USERNAME
  const password = process.env.UMAMI_PASSWORD
  if (!username || !password) throw new Error('Set UMAMI_USERNAME and UMAMI_PASSWORD')
  const result = await umamiJson('auth/login', null, { method: 'POST', body: JSON.stringify({ username, password }) })
  if (!result.token) throw new Error('Umami login returned no token')
  return result.token
}

export async function collectAiTraffic(token, startAt, endAt, request = umamiJson) {
  let tokenTime = Date.now()
  let refresh
  const read = async path => {
    // This instance has short-lived auth. Renew between requests in long reports.
    if (request === umamiJson && Date.now() - tokenTime > 60000) {
      refresh ??= umamiLogin().then(value => { token = value; tokenTime = Date.now() })
      await refresh
      refresh = undefined
    }
    return request(path, token)
  }
  const base = `websites/${SITE}`
  const query = new URLSearchParams({ startAt, endAt, limit: LIMIT })
  const metrics = async type => {
    const rows = await read(`${base}/metrics?${query}&type=${type}`)
    if (!Array.isArray(rows) || rows.length >= LIMIT || rows.some(r => typeof r.x !== 'string' || !Number.isFinite(r.y))) {
      throw new Error('Invalid or truncated AI source metrics')
    }
    return rows
  }
  const [referrers, queries, events] = await Promise.all(['referrer', 'query', 'event'].map(metrics))
  const filters = [
    ...referrers.filter(r => sourceFor(r.x)).map(r => ({ referrer: r.x })),
    ...queries.filter(r => sourceInQuery(r.x)).map(r => ({ query: r.x })),
  ]
  const eventFilters = events.filter(r => DOWNLOAD_EVENT.test(r.x)).map(r => ({ event: r.x }))
  async function readEvents(filter) {
    const all = []
    const ids = new Set()
    // Bound the database scan as well as response size. Monthly event queries
    // on this instance time out even when the matching source has few sessions.
    for (let from = startAt; from <= endAt; from += 7 * DAY) {
      const to = Math.min(endAt, from + 7 * DAY - 1)
      const rows = []
      let expected
      for (let page = 1; ; page++) {
        const qs = new URLSearchParams({ startAt: from, endAt: to, page, pageSize: 1000, ...filter })
        const result = await read(`${base}/events?${qs}`)
        if (!Number.isSafeInteger(result.count) || result.count < 0 || result.count > 100000 || !Array.isArray(result.data)) {
          throw new Error('Invalid or excessive AI events result')
        }
        expected ??= result.count
        if (result.count !== expected) throw new Error('AI event count changed during pagination; rerun a complete window')
        for (const event of result.data) {
          if (!event.id || !event.sessionId || !Number.isFinite(Date.parse(event.createdAt)) ||
            ![1, 2].includes(event.eventType) || typeof event.urlPath !== 'string' || ids.has(event.id)) {
            throw new Error('Invalid or duplicate AI event page')
          }
          if (Date.parse(event.createdAt) < from || Date.parse(event.createdAt) > to) {
            throw new Error('Umami ignored the AI event date range')
          }
          if (Object.entries(filter).some(([key, value]) => event[{
            referrer: 'referrerDomain', query: 'urlQuery', event: 'eventName',
          }[key]] !== value)) throw new Error('Umami ignored an AI event filter')
          ids.add(event.id)
          rows.push(event)
        }
        if (rows.length === expected) break
        if (!result.data.length || rows.length > expected) throw new Error('Incomplete AI event pagination')
      }
      all.push(...rows)
      if (all.length > 100000) throw new Error('Excessive AI event window')
    }
    if (!all.length) throw new Error('AI metrics reported activity but event detail is empty; refresh authentication and rerun')
    return all
  }
  // Bound API concurrency. Only exact query values discovered from Umami are used.
  async function batches(items) {
    const result = []
    for (let i = 0; i < items.length; i += 3) result.push(...(await Promise.all(items.slice(i, i + 3).map(readEvents))).flat())
    return result
  }
  const acquisition = await batches(filters)
  const downloads = acquisition.some(e => e.eventType === 1) ? await batches(eventFilters) : []
  return summarizeAiTraffic(acquisition, downloads)
}

export function formatAiTraffic(rows) {
  return [
    'IA: sesiones con origen identificado (referente o UTM, sin duplicar la misma sesión por ambas señales)',
    ...rows.map(r => `${r.source}: ${r.sessions} sesiones; ${r.downloadSessions} con clic de descarga; clics home/guías/índice: ${r.home}/${r.guide}/${r.guides_index}`),
    'Atribución: última visita de IA observada antes del clic, dentro de la misma sesión y ventana. Son clics, no instalaciones. Una sesión puede visitar desde varias IA; no sumar proveedores.',
  ].join('\n')
}

async function main() {
  const args = process.argv.slice(2)
  if (args.length && (args.length !== 2 || args[0] !== '--days')) throw new Error('Usage: ai-traffic-report.mjs [--days 1..90]')
  const days = args.length ? Number(args[1]) : 30
  if (!Number.isInteger(days) || days < 1 || days > 90) throw new Error('Days must be 1..90')
  const now = new Date()
  const endAt = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) - 1
  const startAt = endAt + 1 - days * DAY
  const rows = await collectAiTraffic(await umamiLogin(), startAt, endAt)
  console.log(`${new Date(startAt).toISOString()} → ${new Date(endAt).toISOString()}\n${formatAiTraffic(rows)}`)
  for (const row of rows.filter(r => r.sessions)) console.log(`${row.source} páginas vistas por URL: ${JSON.stringify(row.landingPages)}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1 })
}
