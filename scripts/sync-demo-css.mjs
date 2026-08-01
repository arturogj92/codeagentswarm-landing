#!/usr/bin/env node
/**
 * Pulls the REAL look of the CodeAgentSwarm terminal list out of the app repo and
 * into the landing, so the interactive demo is not a lookalike but the same CSS.
 *
 * Why a script instead of a hand-written copy: the source is ~1.8k lines across
 * three separate ranges of the app's styles.css. Re-syncing after a UI change has
 * to be one command, or the demo silently drifts from the product it advertises.
 *
 *   node scripts/sync-demo-css.mjs
 *
 * Output: components/demo/demo-app.css (committed — Vercel never sees the app repo).
 *
 * Two transformations happen on the way:
 *   1. Every selector is scoped under .cas-demo, so app rules like `.terminal-tab`
 *      can never leak into the landing's own Tailwind-driven markup.
 *   2. The light-family theme blocks are dropped. The demo is always dark, and
 *      carrying four unused palettes would double the payload for nothing.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const LANDING = resolve(HERE, '..')
const APP = resolve(LANDING, '..', 'codeagentswarm-app')
const APP_STYLES = resolve(APP, 'styles')
/** The chat view keeps its stylesheet next to its component, not in styles/. */
const APP_CHAT = resolve(APP, 'src', 'presentation', 'chat')

const SCOPE = '.cas-demo'
const OUT = join(LANDING, 'components', 'demo', 'demo-app.css')

/**
 * Ranges are addressed by the text that opens and closes them rather than by line
 * number: line numbers in a 16k-line stylesheet go stale the moment anyone edits
 * above them, and a silently wrong range is worse than a loud failure.
 */
const RANGES = [
  {
    // Derived from --header-tint/--header-alpha, which the theme block below sets.
    // The shortcut chips' bottom-edge glyphs paint over the chip border with this
    // colour, so without it they show up as dark patches on the header.
    file: 'themes.css',
    label: 'Derived header tokens',
    from: ':root {\n  --header-bg',
    to: '/* ============================= DARK',
  },
  {
    file: 'themes.css',
    label: 'Dark theme tokens',
    from: 'html[data-theme="dark"] {',
    to: 'html[data-theme="midnight"] {',
  },
  {
    file: 'styles.css',
    label: 'Status bar chip (the colored bar that fronts every row)',
    from: '.terminal-status-pill[data-status-key="idle"]::before,',
    to: '/* Dropdown to set the status manually',
  },
  {
    file: 'styles.css',
    label: 'Project badge',
    from: '.project-badge {',
    to: '/* Wrapper for project badge in terminal headers */',
  },
  {
    file: 'styles.css',
    label: 'Terminal tabs: base strip + sidebar list mode',
    from: '.terminal-tabs-bar {',
    to: '/* MCP Permissions Modal Styles */',
  },
  {
    file: 'styles.css',
    label: 'App header: logo, action buttons, layout controls, Run button',
    from: '.app-container {',
    to: '.screenshot-countdown-overlay {',
  },
  {
    file: 'styles.css',
    label: 'Minimized-terminals counter',
    from: '.btn-parked-toggle {',
    to: '/* Fly-to-target minimize animation',
  },
  {
    file: 'styles.css',
    label: 'Quota rings and the per-provider popover',
    from: '.quota-cluster {',
    to: '/* ===== Theme picker',
  },
  {
    file: 'styles.css',
    label: 'Terminal loader',
    from: '.terminal-loader {',
    to: '.directory-selector {',
  },
  {
    file: 'global-fonts.css',
    label: 'Brand wordmark',
    from: '.logo-text {',
    to: '/* Global Font Override',
  },
  {
    file: 'navbar-shortcuts.css',
    label: 'Project shortcut chips',
    from: null,
    to: null,
  },
  {
    // Taken whole: the app already scopes every rule under `.cas-chat`, so there
    // is no range to carve out and nothing here can leak. It ends up as
    // `.cas-demo .cas-chat ...`, which is what the demo mounts.
    dir: APP_CHAT,
    file: 'chat-panel.css',
    label: 'Chat view: timeline, work rows, todos, questions, composer',
    from: null,
    to: null,
  },
]

function sliceRange(source, { file, from, to, label }) {
  // A range with no markers means "take the whole file".
  if (from === null && to === null) return source

  const start = source.indexOf(from)
  if (start === -1) throw new Error(`[${file}] opening marker not found for "${label}": ${from}`)
  const end = source.indexOf(to, start)
  if (end === -1) throw new Error(`[${file}] closing marker not found for "${label}": ${to}`)
  return source.slice(start, end)
}

/**
 * Walks the CSS by brace depth and rewrites every selector prelude. A real parser
 * would be overkill: the input is hand-written CSS with no strings containing
 * braces, so depth counting is exact here.
 */
function scopeCss(css) {
  const out = []
  let buffer = ''
  let depth = 0
  /** Nesting stack of at-rule kinds, so we know when NOT to touch selectors. */
  const atRuleStack = []

  const flushText = () => {
    out.push(buffer)
    buffer = ''
  }

  for (let i = 0; i < css.length; i++) {
    const char = css[i]

    if (char === '{') {
      const prelude = buffer
      buffer = ''
      // Comments are stripped only for the DECISION: several rules in the source
      // carry a long explanatory comment ahead of the at-rule, which would
      // otherwise hide the leading `@` and get @keyframes treated as a selector.
      const trimmed = prelude.replace(/\/\*[\s\S]*?\*\//g, '').trim()

      // Inside @keyframes, the "selectors" are percentages — leave them alone.
      const insideKeyframes = atRuleStack.includes('keyframes')

      if (trimmed.startsWith('@')) {
        atRuleStack.push(trimmed.startsWith('@keyframes') ? 'keyframes' : 'other')
        out.push(prelude, '{')
      } else if (depth > 0 && insideKeyframes) {
        atRuleStack.push('decl')
        out.push(prelude, '{')
      } else if (depth > 0 && atRuleStack[atRuleStack.length - 1] === 'decl') {
        // A nested block inside a declaration block: not something this stylesheet
        // does, but bail out safely rather than mangle it.
        atRuleStack.push('decl')
        out.push(prelude, '{')
      } else {
        atRuleStack.push('decl')
        const scoped = scopeSelectorList(prelude)
        if (scoped === null) {
          // Rule dropped (light-family theme): skip its whole body.
          i = skipBlock(css, i)
          atRuleStack.pop()
          continue
        }
        out.push(scoped, '{')
      }
      depth++
      continue
    }

    if (char === '}') {
      flushText()
      out.push('}')
      atRuleStack.pop()
      depth--
      continue
    }

    buffer += char
  }

  flushText()
  return out.join('')
}

/** Index of the `}` that closes the `{` at position `open`. */
function skipBlock(css, open) {
  let depth = 0
  for (let i = open; i < css.length; i++) {
    if (css[i] === '{') depth++
    else if (css[i] === '}') {
      depth--
      if (depth === 0) return i
    }
  }
  return css.length - 1
}

const DROPPED_THEMES = ['light', 'sepia', 'midnight', 'espresso', 'neon']

function scopeSelectorList(prelude) {
  // Keep any leading comment/whitespace attached to the first selector.
  const commentMatch = prelude.match(/^([\s\S]*?\*\/\s*)?([\s\S]*)$/)
  const leading = commentMatch[1] || ''
  const selectors = commentMatch[2]

  const parts = selectors.split(',').map((s) => s.trim()).filter(Boolean)
  const scoped = []

  for (const part of parts) {
    if (DROPPED_THEMES.some((t) => part.includes(`data-theme="${t}"`))) continue
    scoped.push(scopeSelector(part))
  }

  if (scoped.length === 0) return null
  return `${leading}${scoped.join(',\n')}`
}

/**
 * `html`, `:root` and `body` all name the document root in the app. In the demo
 * that role is played by the scope element itself, so those tokens are replaced
 * rather than descended from — otherwise `html[data-theme="dark"]` would become
 * `.cas-demo [data-theme="dark"]` and match a child that does not exist.
 *
 * Note the qualifier stays ATTACHED: `.cas-demo[data-theme="dark"]`. The demo root
 * carries data-theme itself, which is also what makes showing another palette a
 * one-attribute change later.
 */
function scopeSelector(selector) {
  const rootToken = /^(?::root|html|body)/
  if (!rootToken.test(selector)) return `${SCOPE} ${selector}`

  const rest = selector.replace(rootToken, '')
  if (!rest) return SCOPE
  // Attached qualifier (`[attr]`, `.class`, `:pseudo`) vs. a descendant.
  return /^[[.:#]/.test(rest) ? `${SCOPE}${rest}` : `${SCOPE} ${rest.trim()}`
}

function main() {
  const sources = new Map()
  const chunks = []

  for (const range of RANGES) {
    const path = join(range.dir ?? APP_STYLES, range.file)
    if (!sources.has(path)) {
      sources.set(path, readFileSync(path, 'utf8'))
    }
    const raw = sliceRange(sources.get(path), range)
    chunks.push(`/* ===== ${range.label} — from app ${range.file} ===== */\n${scopeCss(raw)}`)
  }

  const header = `/*
 * GENERATED FILE — do not edit by hand.
 * Run \`node scripts/sync-demo-css.mjs\` from the landing after the app's terminal
 * list changes, so the demo keeps looking like the product.
 *
 * Source: ../codeagentswarm-app/styles/{themes,styles}.css
 * Everything is scoped under ${SCOPE}; only the dark palette is carried over.
 */\n\n`

  mkdirSync(dirname(OUT), { recursive: true })
  writeFileSync(OUT, header + chunks.join('\n\n') + '\n', 'utf8')

  const lines = (header + chunks.join('\n\n')).split('\n').length
  console.log(`Wrote ${OUT} (${lines} lines)`)
}

main()
