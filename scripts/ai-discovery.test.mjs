import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { aiSource, summarizeAiTraffic, collectAiTraffic } from './ai-traffic-report.mjs'
import { citationSummary } from './ai-citation-scan.mjs'

const view = (id, sessionId, minute, extra = {}) => ({
  id, sessionId, createdAt: `2026-10-07T12:${minute}:00Z`, eventType: 1,
  urlPath: '/en/guides/ai-cli-agent-swarm', urlQuery: '', referrerDomain: 'chatgpt.com', ...extra,
})
const click = (id, sessionId, minute, name = 'download_app_guide_silicon') => view(id, sessionId, minute, {
  eventType: 2, eventName: name, referrerDomain: 'www.codeagentswarm.com',
})
const start = Date.parse('2026-10-07T00:00:00Z')
const end = Date.parse('2026-10-07T23:59:59.999Z')

test('AI attribution deduplicates referrer + UTM, preserves sources and only credits later clicks', () => {
  const chat = view('a', 'one', '10', { urlQuery: 'utm_source=chatgpt.com' })
  const gemini = view('b', 'one', '20', { referrerDomain: 'gemini.google.com' })
  const utmOnly = view('c', 'two', '15', { referrerDomain: '', urlQuery: 'hl=es&utm_source=chatgpt.com' })
  const download = click('d', 'one', '16')
  const rows = summarizeAiTraffic([chat, chat, gemini, utmOnly], [
    click('early', 'one', '05'), download, download, click('later', 'one', '25', 'download_app_home_windows_x64'),
    click('linux', 'two', '18', 'download_app_guides_index_linux_arm64_deb'),
    click('not-download', 'two', '19', 'guide_cta_click'), click('unattributed', 'three', '30'),
  ])
  const c = rows.find(r => r.source === 'ChatGPT')
  assert.equal(c.pageviews, 2)
  assert.equal(c.sessions, 2)
  assert.equal(c.downloadSessions, 2)
  assert.equal(c.guide, 1)
  assert.equal(c.home, 0)
  assert.equal(c.guides_index, 1)
  assert.equal(rows.find(r => r.source === 'Gemini').home, 1)
  assert.equal(aiSource({ urlQuery: 'utm_source=chatgpt.com.evil.test', referrerDomain: '' }), undefined)
  assert.equal(aiSource({ urlQuery: 'utm_source=ChatGPT.com', referrerDomain: 'gemini.google.com' }), 'ChatGPT')
})

test('collection uses exact discovered queries, reads all pages and fails on ignored filters', async () => {
  const requests = []
  const fake = async path => {
    const url = new URL(path, 'https://test.invalid/')
    requests.push(url)
    if (url.pathname.endsWith('/metrics')) {
      const type = url.searchParams.get('type')
      return type === 'query' ? [{ x: 'hl=en&utm_source=chatgpt.com', y: 2 }] : []
    }
    assert.equal(url.searchParams.get('query'), 'hl=en&utm_source=chatgpt.com')
    const page = Number(url.searchParams.get('page'))
    return { count: 2, data: [view(String(page), String(page), '10', { urlQuery: 'hl=en&utm_source=chatgpt.com' })] }
  }
  const result = await collectAiTraffic('token', start, end, fake)
  assert.equal(result.find(r => r.source === 'ChatGPT').sessions, 2)
  assert.equal(requests.filter(u => u.pathname.endsWith('/events')).length, 2)
  const ignored = async path => path.includes('/metrics?')
    ? (path.includes('type=referrer') ? [{ x: 'chatgpt.com', y: 1 }] : [])
    : { count: 1, data: [view('bad', 'one', '10', { referrerDomain: 'google.com' })] }
  await assert.rejects(collectAiTraffic('token', start, end, ignored), /ignored/)
  await assert.rejects(collectAiTraffic('token', 1, 2, fake), /date range/)
  const truncated = async path => path.includes('/metrics?')
    ? (path.includes('type=referrer') ? [{ x: 'chatgpt.com', y: 1 }] : [])
    : { count: 2, data: [] }
  await assert.rejects(collectAiTraffic('token', start, end, truncated), /Incomplete/)
})

test('citation samples exclude branded prompts and do not count unmeasured prompts as absences', () => {
  const { prompts } = JSON.parse(readFileSync(new URL('./ai-citation-prompts.json', import.meta.url)))
  assert.equal(prompts.length, 20)
  assert.equal(new Set(prompts.map(p => p.id)).size, 20)
  const sample = { run_id: 'run', engine: 'chatgpt', model: 'test', country: 'ES', search: 'on', recommended: false, status: 'cited' }
  const rows = citationSummary([
    { ...sample, prompt_id: 'niche-desktop-parallel' },
    { ...sample, prompt_id: 'brand-cas-review', recommended: true },
    { ...sample, prompt_id: 'es-mixed-agents', recommended: true },
    { prompt_id: 'category-run-supervise', engine: 'chatgpt', status: 'absent' },
  ], prompts)
  assert.equal(rows.length, 2)
  const en = rows.find(r => r.language === 'en')
  assert.equal(en.measured, 1)
  assert.equal(en.recommended, 0)
  assert.equal(en.cited, 1)
  assert.equal(en.expected, 14)
  assert.equal(rows.find(r => r.language === 'es').expected, 4)
  const frozen = citationSummary([{ ...sample, prompt_id: 'es-mixed-agents', expected_prompt_ids: ['es-mixed-agents'] }], prompts)
  assert.equal(frozen[0].expected, 1, 'Future additions must not change old denominators')
})

test('monthly collection bounds date scans without gaps or duplicate boundary events', async () => {
  const windows = []
  const until = start + 8 * 86400000 - 1
  const request = async path => {
    const url = new URL(path, 'https://test.invalid/')
    if (url.pathname.endsWith('/metrics')) return url.searchParams.get('type') === 'referrer'
      ? [{ x: 'chatgpt.com', y: 2 }] : []
    const from = Number(url.searchParams.get('startAt'))
    const to = Number(url.searchParams.get('endAt'))
    windows.push([from, to])
    return { count: 1, data: [view(String(from), String(from), '10', { createdAt: new Date(from).toISOString() })] }
  }
  const rows = await collectAiTraffic('token', start, until, request)
  assert.deepEqual(windows, [[start, start + 7 * 86400000 - 1], [start + 7 * 86400000, until]])
  assert.equal(rows.find(r => r.source === 'ChatGPT').sessions, 2)
})
