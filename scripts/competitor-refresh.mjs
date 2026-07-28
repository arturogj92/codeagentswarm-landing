#!/usr/bin/env node
// Competitor fact refresh. Compares the numbers recorded in competitor-facts.json
// with what the public GitHub API returns right now, so the comparison guides never
// quote a star count or a last-commit date that has quietly gone stale.

import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url))
const FACTS_FILE = join(SCRIPT_DIR, 'competitor-facts.json')
const STALE_DAYS = 60
const DRIFT_PCT = 10

function usage() {
  console.log(`Competitor fact refresh

Usage:
  node scripts/competitor-refresh.mjs [--help]

Reads scripts/competitor-facts.json and asks the public GitHub API for the current
stars and last push date of every entry that has a repo. Prints one row per tool with
the recorded value, the current value and any flags:

  DATA-STALE    the API last push date is not the one recorded in the JSON
  STARS-DRIFT   stars moved more than ${DRIFT_PCT} percent since the recorded value
  NOW-STALLED   the current last push is older than ${STALE_DAYS} days

The API is called unauthenticated, so a run can hit the rate limit. Wait an hour and
try again if that happens.`)
}

function dayOf(value) {
  return value ? String(value).slice(0, 10) : null
}

function daysSince(isoDay) {
  const then = Date.parse(`${isoDay}T00:00:00Z`)
  if (Number.isNaN(then)) return null
  return Math.floor((Date.now() - then) / 86400000)
}

function pad(value, width) {
  const text = String(value)
  return text.length >= width ? text : text + ' '.repeat(width - text.length)
}

async function fetchRepo(repo) {
  const res = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: {
      'User-Agent': 'codeagentswarm-competitor-refresh',
      Accept: 'application/vnd.github+json',
    },
  })
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText}`)
  }
  return res.json()
}

async function main() {
  if (process.argv.slice(2).includes('--help')) {
    usage()
    return
  }

  const facts = JSON.parse(readFileSync(FACTS_FILE, 'utf8'))
  console.log(`Competitor facts recorded on ${facts.verified_at}, checked against GitHub now.\n`)

  const rows = []
  for (const entry of facts.competitors) {
    if (!entry.repo) {
      rows.push([entry.name, 'no public repo', 'no public repo', ''])
      continue
    }

    let data
    try {
      data = await fetchRepo(entry.repo)
    } catch (err) {
      rows.push([entry.name, 'API error', String(err.message), 'CHECK-BY-HAND'])
      continue
    }

    const currentStars = data.stargazers_count
    const currentPush = dayOf(data.pushed_at)
    const flags = []

    if (currentPush !== entry.pushed_at) flags.push('DATA-STALE')

    let starsText = `${entry.stars} -> ${currentStars}`
    if (typeof entry.stars === 'number' && entry.stars > 0) {
      const change = ((currentStars - entry.stars) / entry.stars) * 100
      starsText += ` (${change >= 0 ? '+' : ''}${change.toFixed(1)}%)`
      if (Math.abs(change) > DRIFT_PCT) flags.push('STARS-DRIFT')
    }

    const age = currentPush ? daysSince(currentPush) : null
    if (age !== null && age > STALE_DAYS) flags.push(`NOW-STALLED (${age}d)`)

    rows.push([entry.name, starsText, `${entry.pushed_at} -> ${currentPush}`, flags.join(' ')])
  }

  const widths = [0, 1, 2].map(i => Math.max(...rows.map(r => String(r[i]).length), [
    'Tool',
    'Stars recorded -> current',
    'Last push recorded -> current',
  ][i].length))

  console.log(
    `${pad('Tool', widths[0])} | ${pad('Stars recorded -> current', widths[1])} | ${pad('Last push recorded -> current', widths[2])} | Flags`
  )
  console.log('-'.repeat(widths[0] + widths[1] + widths[2] + 16))
  for (const row of rows) {
    console.log(`${pad(row[0], widths[0])} | ${pad(row[1], widths[1])} | ${pad(row[2], widths[2])} | ${row[3]}`)
  }

  console.log(
    '\nReminder: when a number changes, update the guide tables, the visible verification dates in both languages and scripts/competitor-facts.json in the same commit.'
  )
}

main().catch(err => {
  console.error(`competitor-refresh failed: ${err.message}`)
  process.exitCode = 1
})
