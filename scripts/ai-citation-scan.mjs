#!/usr/bin/env node
// AI citation scan. Opens each frozen prompt in an AI answer engine and records
// whether CodeAgentSwarm is recommended and cited. Costs nothing: you read the
// answer in your browser and type what you see.

import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createInterface } from 'node:readline'
import { spawn } from 'node:child_process'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const PROMPTS_FILE = join(SCRIPT_DIR, 'ai-citation-prompts.json')
const LOG_FILE = join(SCRIPT_DIR, '..', 'docs', 'seo', 'ai-citation-log.jsonl')
const LOCAL_LOG_FILE = join(SCRIPT_DIR, '..', 'docs', 'seo', 'ai-citation-log.local.jsonl')

const ENGINE_URLS = {
  perplexity: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
  chatgpt: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}&hints=search`,
  'google-ai': (q) => `https://www.google.com/search?udm=50&q=${encodeURIComponent(q)}`,
  gemini: () => 'https://gemini.google.com/app', // Paste the printed prompt in a new chat.
}

const STATUS_RANK = { absent: 0, mentioned: 1, cited: 2 }

function usage() {
  console.log(`AI citation scan

Usage:
  node scripts/ai-citation-scan.mjs [options]

Options:
  --engine <name>   perplexity (default), chatgpt, google-ai or gemini
  --prompt <id>     run a single prompt id instead of all of them
  --no-open         do not open the browser, just ask for the results
  --report          print the latest status per prompt and engine, with trend
  --list            print the frozen prompts without opening a browser
  --help            show this text

The prompts live in scripts/ai-citation-prompts.json and are frozen on purpose.
New results stay private in docs/seo/ai-citation-log.local.jsonl.
Use a fresh conversation for every prompt, with memory/personalization off.
Record the actual model, search mode and country; compare matching settings.
Citation, mention and recommendation are recorded separately.`)
}

function parseArgs(argv) {
  const args = { engine: 'perplexity', prompt: null, open: true, report: false, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--engine') args.engine = argv[++i]
    else if (a === '--prompt') args.prompt = argv[++i]
    else if (a === '--no-open') args.open = false
    else if (a === '--report') args.report = true
    else if (a === '--list') args.list = true
    else if (a === '--help' || a === '-h') args.help = true
    else {
      console.error(`Unknown option: ${a}`)
      process.exit(1)
    }
  }
  return args
}

function readLog() {
  return [LOG_FILE, LOCAL_LOG_FILE].filter(existsSync).flatMap(file => readFileSync(file, 'utf8')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line)))
}

function appendLog(entry) {
  mkdirSync(dirname(LOCAL_LOG_FILE), { recursive: true })
  appendFileSync(LOCAL_LOG_FILE, JSON.stringify(entry) + '\n', 'utf8')
}

export function citationSummary(entries, prompts) {
  // Historical logs did not separate recommendations from mentions. Do not infer them.
  const groups = new Map()
  for (const entry of entries.filter(e => e.run_id && typeof e.recommended === 'boolean')) {
    const prompt = prompts.find(p => p.id === entry.prompt_id)
    if (!prompt || prompt.category === 'brand') continue
    const key = JSON.stringify([entry.run_id, entry.engine, entry.model, entry.country, entry.search, prompt.language])
    if (!groups.has(key)) groups.set(key, { run: entry.run_id, engine: entry.engine, model: entry.model,
      country: entry.country, search: entry.search, language: prompt.language,
      expected: entry.expected_prompt_ids?.length ?? prompts.filter(p => p.category !== 'brand' && p.language === prompt.language).length,
      samples: new Map() })
    groups.get(key).samples.set(entry.prompt_id, entry)
  }
  return [...groups.values()].map(({ samples, ...group }) => ({ ...group,
    measured: samples.size,
    recommended: [...samples.values()].filter(e => e.recommended).length,
    cited: [...samples.values()].filter(e => e.status === 'cited').length,
  }))
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function splitList(value) {
  return value
    .split(',')
    .map((v) => v.trim())
    .filter((v) => v.length > 0)
}

function report() {
  const entries = readLog()
  if (entries.length === 0) {
    console.log('No measurements yet. Run the scan first.')
    return
  }

  const groups = new Map()
  for (const entry of entries) {
    const key = `${entry.prompt_id}|${entry.engine}|${entry.model || 'legacy'}|${entry.country || ''}|${entry.search || ''}`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(entry)
  }

  const rows = []
  for (const list of groups.values()) {
    const sorted = [...list].sort((a, b) => a.date.localeCompare(b.date))
    const latest = sorted[sorted.length - 1]
    const previous = sorted.length > 1 ? sorted[sorted.length - 2] : null
    let delta = 'new'
    if (previous) {
      const diff = STATUS_RANK[latest.status] - STATUS_RANK[previous.status]
      delta = diff > 0 ? 'improved' : diff < 0 ? 'worsened' : 'same'
    }
    rows.push([latest.prompt_id, latest.engine, latest.model || 'legacy', latest.country || '?', latest.search || '?', latest.status, latest.date, delta])
  }

  rows.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))

  const header = ['prompt_id', 'engine', 'model', 'country', 'search', 'status', 'date', 'delta']
  const widths = header.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => String(r[i]).length))
  )
  const line = (cells) => cells.map((c, i) => String(c).padEnd(widths[i])).join(' | ')

  console.log(line(header))
  console.log(widths.map((w) => '-'.repeat(w)).join('-+-'))
  for (const row of rows) console.log(line(row))
  const { prompts } = JSON.parse(readFileSync(PROMPTS_FILE, 'utf8'))
  console.log('\nUnbranded observations per run (missing prompts are not absences):')
  const summaries = citationSummary(entries, prompts)
  if (!summaries.length) console.log('No controlled recommendation measurements yet; historical citation logs only.')
  for (const row of summaries) console.log(JSON.stringify(row))
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, (answer) => resolve(answer.trim())))
}

async function scan(args) {
  const buildUrl = ENGINE_URLS[args.engine]
  if (!buildUrl) {
    console.error(`Unknown engine: ${args.engine}. Use perplexity, chatgpt, google-ai or gemini.`)
    process.exit(1)
  }

  const config = JSON.parse(readFileSync(PROMPTS_FILE, 'utf8'))
  const prompts = args.prompt
    ? config.prompts.filter((p) => p.id === args.prompt)
    : config.prompts

  if (prompts.length === 0) {
    console.error(`No prompt matches id: ${args.prompt}`)
    process.exit(1)
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const date = today()
  const run_id = new Date().toISOString()
  console.log('Use a NEW conversation for each prompt, memory/personalization off. Do not mention the product unless the frozen prompt does.')
  const model = await ask(rl, 'Model/version shown in the UI (or unknown): ')
  const country = await ask(rl, 'Country used for this run: ')
  const search = await ask(rl, 'Search mode shown in the UI (on/off/auto/unknown): ')
  if (!model || !country || !['on', 'off', 'auto', 'unknown'].includes(search)) {
    rl.close()
    throw new Error('Model, country and a valid search mode are required; nothing logged')
  }

  for (const prompt of prompts) {
    const url = buildUrl(prompt.text)
    console.log('')
    console.log(`[${prompt.id}] (${prompt.category})`)
    console.log(prompt.text)
    console.log(url)
    if (args.engine === 'gemini') console.log('Paste the printed prompt into a new Gemini conversation.')

    if (args.open) {
      const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'explorer.exe' : 'xdg-open'
      const child = spawn(command, [url], { stdio: 'ignore', detached: true })
      child.on('error', () => console.log('Could not open browser. Open the printed URL manually.'))
      child.unref()
    }

    const status = (await ask(rl, 'Status? [c]ited / [m]entioned-not-cited / [a]bsent / [s]kip: ')).toLowerCase()
    if (status === 's' || status === '') {
      console.log('Skipped, nothing logged.')
      continue
    }
    const statusName = status === 'c' ? 'cited' : status === 'm' ? 'mentioned' : status === 'a' ? 'absent' : null
    if (!statusName) {
      console.log('Unrecognized answer, nothing logged.')
      continue
    }

    const tools = splitList(await ask(rl, 'Tools the answer recommended (comma separated, enter to skip): '))
    const domains = splitList(await ask(rl, 'Domains the answer cited (comma separated, enter to skip): '))
    const recommended = (await ask(rl, 'Does it recommend CodeAgentSwarm for this task? [y/n]: ')).toLowerCase()
    const evidence = await ask(rl, 'Evidence: saved answer file or response URL: ')
    const fresh = (await ask(rl, 'Fresh conversation, memory/personalization off? [y/n]: ')).toLowerCase()
    if (!['y', 'n'].includes(recommended) || !evidence || fresh !== 'y' || (recommended === 'y' && statusName === 'absent')) {
      console.log('Incomplete or inconsistent observation; nothing logged.')
      continue
    }
    const notes = await ask(rl, 'Notes (enter to skip): ')

    appendLog({
      date,
      run_id, model, country, search, fresh: true, evidence,
      language: prompt.language,
      expected_prompt_ids: config.prompts.filter(p => p.category !== 'brand' && p.language === prompt.language).map(p => p.id),
      recommended: recommended === 'y',
      prompt_id: prompt.id,
      engine: args.engine,
      status: statusName,
      tools,
      cited_domains: domains,
      notes,
    })
    console.log(`Logged: ${prompt.id} / ${args.engine} / ${statusName}`)
  }

  rl.close()
  console.log('')
  console.log(`Done. Results appended to ${LOCAL_LOG_FILE}`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = parseArgs(process.argv.slice(2))
  if (args.help) usage()
  else if (args.list) console.log(readFileSync(PROMPTS_FILE, 'utf8'))
  else if (args.report) report()
  else await scan(args)
}
