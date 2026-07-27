// Regenerates docs/plans/comparison-table-mockup.html from real, verified data.
//
// Sources of truth:
//   - scripts/competitor-facts.json (verified competitor facts)
//   - content/guides/en/t3-code-vs-codeagentswarm.ts (two-product table)
//   - content/guides/en/best-tools-to-run-multiple-ai-coding-agents.ts (category table)
//
// The guide files are transpiled and evaluated so nothing is hand-copied: what the
// mockup shows is exactly what the pages render.
//
// Run with: node docs/plans/generate-comparison-mockup.mjs

import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const ts = require('typescript')

const __filename = fileURLToPath(import.meta.url)
const ROOT = path.resolve(path.dirname(__filename), '..', '..')

const FACTS_PATH = path.join(ROOT, 'scripts', 'competitor-facts.json')
const T3_GUIDE_PATH = path.join(ROOT, 'content', 'guides', 'en', 't3-code-vs-codeagentswarm.ts')
const CATEGORY_GUIDE_PATH = path.join(
  ROOT,
  'content',
  'guides',
  'en',
  'best-tools-to-run-multiple-ai-coding-agents.ts'
)
const OUT_PATH = path.join(ROOT, 'docs', 'plans', 'comparison-table-mockup.html')

const STALE_DAYS_THRESHOLD = 60

// The mockup is opened via file:// from docs/plans/, so the isotype uses a
// relative path. In production the guide renderer uses /isotipo.png.
const BRAND_NAME = 'CodeAgentSwarm'
const BRAND_IMG = '<img src="../../public/isotipo.png" alt="" width="20" height="20">'

function fail(message) {
  console.error(`ERROR: ${message}`)
  process.exit(1)
}

function loadGuide(filePath) {
  if (!fs.existsSync(filePath)) fail(`guide file not found: ${filePath}`)
  const source = fs.readFileSync(filePath, 'utf8')
  const js = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText

  const moduleObj = { exports: {} }
  const context = vm.createContext({
    module: moduleObj,
    exports: moduleObj.exports,
    require: () => {
      fail(`unexpected runtime require in ${filePath}`)
    },
    console,
  })
  vm.runInContext(js, context, { filename: filePath })

  const guide = moduleObj.exports.guide || moduleObj.exports.default
  if (!guide) fail(`no guide export found in ${filePath}`)
  return guide
}

function extractSingleTable(guide, filePath) {
  const tables = []
  for (const section of guide.sections || []) {
    for (const block of section.content || []) {
      if (block && block.type === 'table') tables.push(block)
    }
  }
  if (tables.length === 0) fail(`no table block found in ${filePath}`)
  if (tables.length > 1) fail(`expected exactly 1 table block in ${filePath}, found ${tables.length}`)
  return tables[0]
}

function formatDate(isoDate) {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function roundStars(stars) {
  return (Math.round(stars / 100) * 100).toLocaleString('en-US')
}

function stripTags(html) {
  return String(html).replace(/<[^>]*>/g, '').trim()
}

// Our logo goes NEXT TO the brand name, never instead of it: the text stays
// real DOM text so crawlers and AI engines keep reading the brand. Applied to
// header cells and first-column cells that are exactly the brand name.
function brandify(cell) {
  if (stripTags(cell) !== BRAND_NAME) return cell
  return `<span class="brand">${BRAND_IMG}${BRAND_NAME}</span>`
}

function daysBetween(fromIso, toIso) {
  const [fy, fm, fd] = fromIso.split('-').map(Number)
  const [ty, tm, td] = toIso.split('-').map(Number)
  const from = Date.UTC(fy, fm - 1, fd)
  const to = Date.UTC(ty, tm - 1, td)
  return Math.round((to - from) / 86400000)
}

// ---------------------------------------------------------------------------
// 1. Load data
// ---------------------------------------------------------------------------

const facts = JSON.parse(fs.readFileSync(FACTS_PATH, 'utf8'))
const verifiedAt = facts.verified_at
const verifiedAtLabel = formatDate(verifiedAt)

const t3Guide = loadGuide(T3_GUIDE_PATH)
const categoryGuide = loadGuide(CATEGORY_GUIDE_PATH)

const t3Table = extractSingleTable(t3Guide, T3_GUIDE_PATH)
const categoryTable = extractSingleTable(categoryGuide, CATEGORY_GUIDE_PATH)

// ---------------------------------------------------------------------------
// 2. Cross-check the category table against competitor-facts.json
// ---------------------------------------------------------------------------

const summary = []
const staleByTool = new Map()

for (const row of categoryTable.rows) {
  const toolName = row[0]
  if (toolName === 'CodeAgentSwarm') continue

  const competitor = facts.competitors.find((c) => c.name === toolName)
  if (!competitor) fail(`no competitor entry in competitor-facts.json for table row "${toolName}"`)

  const starsCell = row[1]
  const commitCell = row[2]

  if (competitor.repo === null) {
    if (!starsCell.includes('No public repo')) {
      fail(`${toolName}: stars cell should contain "No public repo", got "${starsCell}"`)
    }
    if (!commitCell.includes('No public repo')) {
      fail(`${toolName}: last-commit cell should contain "No public repo", got "${commitCell}"`)
    }
    summary.push(`OK: ${toolName} (no public repo)`)
    continue
  }

  const expectedStars = roundStars(competitor.stars)
  const expectedDate = formatDate(competitor.pushed_at)

  if (!starsCell.includes(expectedStars)) {
    fail(`${toolName}: stars cell should contain "${expectedStars}", got "${starsCell}"`)
  }
  if (!commitCell.includes(expectedDate)) {
    fail(`${toolName}: last-commit cell should contain "${expectedDate}", got "${commitCell}"`)
  }

  const staleDays = daysBetween(competitor.pushed_at, verifiedAt)
  if (staleDays > STALE_DAYS_THRESHOLD) {
    staleByTool.set(toolName, staleDays)
  }

  summary.push(`OK: ${toolName} (stars ${expectedStars}, pushed ${expectedDate})`)
}

// ---------------------------------------------------------------------------
// 3. Render the HTML
// ---------------------------------------------------------------------------

const STYLE = `  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 48px 20px 96px;
    background: #000;
    color: rgba(255, 255, 255, 0.7);
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
  }
  .page { max-width: 720px; margin: 0 auto; }
  h1 {
    color: #fff;
    font-size: 32px;
    line-height: 1.2;
    font-weight: 700;
    margin: 0 0 16px;
  }
  .lead {
    font-size: 16px;
    line-height: 1.7;
    margin: 0 0 48px;
  }
  h2 {
    color: #fff;
    font-size: 22px;
    font-weight: 700;
    margin: 48px 0 8px;
  }
  .note {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 20px;
  }
  figure { margin: 32px 0; }
  .table-wrap {
    overflow-x: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  thead tr { background: rgba(255, 255, 255, 0.05); }
  th {
    padding: 12px 16px;
    text-align: left;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }
  td {
    padding: 12px 16px;
    vertical-align: top;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.7);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  td:first-child {
    color: #fff;
    font-weight: 500;
  }
  figcaption {
    margin-top: 12px;
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
  .accent { color: #fbbf24; }
  .brand { display: inline-flex; align-items: center; gap: 8px; }
  .brand img { width: 20px; height: 20px; display: block; }
  .stale {
    display: inline-block;
    margin-top: 6px;
    padding: 2px 8px;
    font-size: 12px;
    line-height: 1.4;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.12);
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: 999px;
    white-space: nowrap;
  }`

function renderTwoProductTable(table) {
  const headers = table.headers
  const head = [
    '            <th></th>',
    `            <th>${brandify(headers[1])}</th>`,
    `            <th class="accent">${brandify(headers[2])}</th>`,
  ].join('\n')

  const body = table.rows
    .map((row) => {
      const cells = row
        .map((cell, index) => `            <td>${index === 0 ? brandify(cell) : cell}</td>`)
        .join('\n')
      return `          <tr>\n${cells}\n          </tr>`
    })
    .join('\n')

  return { head, body }
}

function renderCategoryTable(table) {
  const head = table.headers.map((h) => `            <th>${brandify(h)}</th>`).join('\n')

  const body = table.rows
    .map((row) => {
      const toolName = row[0]
      const cells = row
        .map((cell, index) => {
          if (index === 0 && toolName === 'CodeAgentSwarm') {
            return `            <td class="accent">${brandify(cell)}</td>`
          }
          if (index === 2 && staleByTool.has(toolName)) {
            const days = staleByTool.get(toolName)
            return (
              `            <td>${cell}` +
              `<br><span class="stale">No public commit in ${days} days</span></td>`
            )
          }
          return `            <td>${index === 0 ? brandify(cell) : cell}</td>`
        })
        .join('\n')
      return `          <tr>\n${cells}\n          </tr>`
    })
    .join('\n')

  return { head, body }
}

const twoProduct = renderTwoProductTable(t3Table)
const category = renderCategoryTable(categoryTable)

const lead =
  'Design proposal for the comparison tables in the guides. Generated by ' +
  'generate-comparison-mockup.mjs from scripts/competitor-facts.json and from the tables ' +
  'already written in the guides, so what you approve here is exactly what the pages render. ' +
  `All third-party data verified on ${verifiedAtLabel}.`

const noteTwoProduct =
  'This is, verbatim, the table from the t3-code-vs-codeagentswarm guide. First column ' +
  'carries the criterion. The CodeAgentSwarm column header uses the amber accent and ' +
  'our isotype next to the name (the name stays real text).'

const noteCategory =
  'This is, verbatim, the table from the best-tools-to-run-multiple-ai-coding-agents guide, ' +
  'plus a stale badge (design proposal, not yet in the page copy) on projects with no public ' +
  'commit in over 60 days. Scrolls horizontally inside its container on mobile.'

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Comparison table mockup</title>
<style>
${STYLE}
</style>
</head>
<body>
<!-- In production the guide renderer uses /isotipo.png -->
<div class="page">
  <h1>Comparison table mockup</h1>
  <p class="lead">${lead}</p>

  <h2>1. Two-product table (T3 Code vs CodeAgentSwarm)</h2>
  <p class="note">${noteTwoProduct}</p>

  <figure>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
${twoProduct.head}
          </tr>
        </thead>
        <tbody>
${twoProduct.body}
        </tbody>
      </table>
    </div>
    <figcaption>${t3Table.caption}</figcaption>
  </figure>

  <h2>2. Category table</h2>
  <p class="note">${noteCategory}</p>

  <figure>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
${category.head}
          </tr>
        </thead>
        <tbody>
${category.body}
        </tbody>
      </table>
    </div>
    <figcaption>${categoryTable.caption}</figcaption>
  </figure>
</div>
</body>
</html>
`

fs.writeFileSync(OUT_PATH, html, 'utf8')

for (const line of summary) console.log(line)
for (const [tool, days] of staleByTool) {
  console.log(`STALE: ${tool} has no public commit in ${days} days`)
}
console.log('WROTE docs/plans/comparison-table-mockup.html')
