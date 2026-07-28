#!/usr/bin/env node
// AI citation scan. Opens each frozen prompt in an AI answer engine and records
// whether CodeAgentSwarm is recommended and cited. Costs nothing: you read the
// answer in your browser and type what you see.

import { readFileSync, appendFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline'
import { spawn } from 'node:child_process'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const PROMPTS_FILE = join(SCRIPT_DIR, 'ai-citation-prompts.json')
const LOG_FILE = join(SCRIPT_DIR, '..', 'docs', 'seo', 'ai-citation-log.jsonl')

const ENGINE_URLS = {
  perplexity: (q) => `https://www.perplexity.ai/search?q=${encodeURIComponent(q)}`,
  chatgpt: (q) => `https://chatgpt.com/?q=${encodeURIComponent(q)}&hints=search`,
  'google-ai': (q) => `https://www.google.com/search?udm=50&q=${encodeURIComponent(q)}`,
}

const STATUS_RANK = { absent: 0, mentioned: 1, cited: 2 }

function usage() {
  console.log(`AI citation scan

Usage:
  node scripts/ai-citation-scan.mjs [options]

Options:
  --engine <name>   perplexity (default), chatgpt or google-ai
  --prompt <id>     run a single prompt id instead of all of them
  --no-open         do not open the browser, just ask for the results
  --report          print the latest status per prompt and engine, with trend
  --help            show this text

The prompts live in scripts/ai-citation-prompts.json and are frozen on purpose.
Results are appended to docs/seo/ai-citation-log.jsonl.`)
}

function parseArgs(argv) {
  const args = { engine: 'perplexity', prompt: null, open: true, report: false, help: false }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--engine') args.engine = argv[++i]
    else if (a === '--prompt') args.prompt = argv[++i]
    else if (a === '--no-open') args.open = false
    else if (a === '--report') args.report = true
    else if (a === '--help' || a === '-h') args.help = true
    else {
      console.error(`Unknown option: ${a}`)
      process.exit(1)
    }
  }
  return args
}

function readLog() {
  if (!existsSync(LOG_FILE)) return []
  return readFileSync(LOG_FILE, 'utf8')
    .split('\n')
    .filter((line) => line.trim().length > 0)
    .map((line) => JSON.parse(line))
}

function appendLog(entry) {
  mkdirSync(dirname(LOG_FILE), { recursive: true })
  appendFileSync(LOG_FILE, JSON.stringify(entry) + '\n', 'utf8')
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
    const key = `${entry.prompt_id}|${entry.engine}`
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
    rows.push([latest.prompt_id, latest.engine, latest.status, latest.date, delta])
  }

  rows.sort((a, b) => a[0].localeCompare(b[0]) || a[1].localeCompare(b[1]))

  const header = ['prompt_id', 'engine', 'status', 'date', 'delta']
  const widths = header.map((h, i) =>
    Math.max(h.length, ...rows.map((r) => String(r[i]).length))
  )
  const line = (cells) => cells.map((c, i) => String(c).padEnd(widths[i])).join(' | ')

  console.log(line(header))
  console.log(widths.map((w) => '-'.repeat(w)).join('-+-'))
  for (const row of rows) console.log(line(row))
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, (answer) => resolve(answer.trim())))
}

async function scan(args) {
  const buildUrl = ENGINE_URLS[args.engine]
  if (!buildUrl) {
    console.error(`Unknown engine: ${args.engine}. Use perplexity, chatgpt or google-ai.`)
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

  for (const prompt of prompts) {
    const url = buildUrl(prompt.text)
    console.log('')
    console.log(`[${prompt.id}] (${prompt.category})`)
    console.log(prompt.text)
    console.log(url)

    if (args.open) {
      spawn('open', [url], { stdio: 'ignore', detached: true }).unref()
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
    const notes = await ask(rl, 'Notes (enter to skip): ')

    appendLog({
      date,
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
  console.log(`Done. Results appended to ${LOG_FILE}`)
}

const args = parseArgs(process.argv.slice(2))
if (args.help) usage()
else if (args.report) report()
else await scan(args)
