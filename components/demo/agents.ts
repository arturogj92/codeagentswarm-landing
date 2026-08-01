import { accent, blue, bold, dim, green, grey, purple, rowsUsed, white } from './ansi'
import type { AgentKey, DemoPromptOption } from './types'

/**
 * The Claude Code mark, exactly the block characters the CLI prints.
 *
 * The three rows are NOT the same length in the source (8, 9 and 7 cells), which
 * is what made the first attempt look crooked: pad each one to a fixed column
 * width and the text beside it lines up.
 */
const CLAUDE_MARK = [' ▐▛███▜▌', '▝▜█████▛▘', '  ▘▘ ▝▝'].map((row) =>
  accent(row.padEnd(9, ' '))
)

/**
 * Per-CLI presentation.
 *
 * Each of the five agents CodeAgentSwarm drives has its own banner, its own
 * bullet, its own way of announcing a tool call and its own footer. Painting
 * them all as generic "terminal text" is what made the first pass read as a
 * mockup: half of what makes a session recognisable is the chrome around the
 * words, not the words.
 */

export interface AgentSkin {
  /** Product name and model line, as the CLI prints them on start. */
  banner: (cwd: string) => string
  /** The glyph in front of an assistant message. */
  bullet: string
  /** How a tool invocation is announced. */
  tool: (name: string, detail?: string) => string
  /** The indented result line under a tool call. */
  result: (text: string) => string
  /** The prompt the user types at. */
  prompt: string
  /** Status line pinned at the bottom of the pane. */
  footer: string
}

const claudeTool = (name: string, detail?: string) =>
  `  ${bold(white(name))}${detail ? `(${dim(detail)})` : ''}`

export const AGENTS: Record<AgentKey, AgentSkin> = {
  claude: {
    banner: (cwd) =>
      [
        `${CLAUDE_MARK[0]} ${bold(white('Claude Code'))} ${dim('v2.1.220')}`,
        `${CLAUDE_MARK[1]} ${grey('Opus 5 (1M context) with high effort')} ${dim('·')} ${grey('Claude Max')}`,
        `${CLAUDE_MARK[2]} ${dim(cwd)}`,
      ].join('\r\n'),
    bullet: accent('●'),
    tool: claudeTool,
    result: (text) => `  ${dim('⎿')}  ${grey(text)}`,
    prompt: dim('›'),
    footer: `${accent('▸▸')} ${grey('bypass permissions on')} ${dim('(shift+tab to cycle)')}`,
  },
  codex: {
    // Codex opens inside a rounded box. The rows are padded to a fixed width so
    // the right border lines up whatever the longest value happens to be.
    banner: (cwd) => {
      const WIDTH = 58
      const row = (plain: string, painted: string) =>
        `${dim('│')} ${painted}${' '.repeat(Math.max(0, WIDTH - plain.length))} ${dim('│')}`
      const label = (text: string) => `${grey(text)}${' '.repeat(Math.max(0, 13 - text.length))}`
      return [
        dim(`╭${'─'.repeat(WIDTH + 2)}╮`),
        row('>_ OpenAI Codex (v0.144.6)', `${green('>_')} ${bold(white('OpenAI Codex'))} ${dim('(v0.144.6)')}`),
        row('', ''),
        row(`model:       gpt-5.6-sol high   /model to change`,
          `${label('model:')}${white('gpt-5.6-sol high')}   ${dim('/model to change')}`),
        row(`directory:   ${cwd}`, `${label('directory:')}${dim(cwd)}`),
        row('permissions: YOLO mode', `${label('permissions:')}${white('YOLO mode')}`),
        dim(`╰${'─'.repeat(WIDTH + 2)}╯`),
        '',
        `  ${grey("Tip: Try the Codex App. Run 'codex app' or visit")} ${dim('https://chatgpt.com/codex')}`,
        '',
        `${green('•')} ${grey('You have 2 usage limit resets available. Run /usage to use one.')}`,
      ].join('\r\n')
    },
    bullet: green('•'),
    tool: (name, detail) => `  ${bold(white(name))}${detail ? ` ${dim(detail)}` : ''}`,
    result: (text) => `  ${grey(text)}`,
    prompt: green('›'),
    footer: `${grey('full-auto')} ${dim('·')} ${grey('ctrl+c to interrupt')}`,
  },
  antigravity: {
    banner: (cwd) =>
      [
        `${bold(blue('Antigravity'))} ${dim('CLI')}`,
        `${grey('Gemini 3 Pro')} ${dim('·')} ${grey('agent mode')}`,
        `${dim(cwd)}`,
      ].join('\r\n'),
    bullet: blue('◆'),
    tool: (name, detail) => `  ${blue('→')} ${white(name)}${detail ? ` ${dim(detail)}` : ''}`,
    result: (text) => `    ${grey(text)}`,
    prompt: blue('❯'),
    footer: `${grey('auto-approve edits')} ${dim('·')} ${grey('esc to stop')}`,
  },
  opencode: {
    banner: (cwd) =>
      [
        `${bold(white('opencode'))} ${dim('0.4.11')}`,
        `${grey('anthropic/claude-sonnet-5')}`,
        `${dim(cwd)}`,
      ].join('\r\n'),
    bullet: purple('▪'),
    tool: (name, detail) => `  ${purple('|')} ${white(name)}${detail ? ` ${dim(detail)}` : ''}`,
    result: (text) => `  ${purple('|')} ${grey(text)}`,
    prompt: purple('❯'),
    footer: `${grey('build mode')} ${dim('·')} ${grey('ctrl+x to switch')}`,
  },
  kimi: {
    banner: (cwd) =>
      [
        `${bold(white('Kimi Code'))} ${dim('v1.4')}`,
        `${grey('kimi-k2-turbo')} ${dim('·')} ${grey('Moonshot AI')}`,
        `${dim(cwd)}`,
      ].join('\r\n'),
    bullet: green('◈'),
    tool: (name, detail) => `  ${green('⚙')} ${white(name)}${detail ? ` ${dim(detail)}` : ''}`,
    result: (text) => `    ${grey(text)}`,
    prompt: green('❯'),
    footer: `${grey('accept edits on')} ${dim('·')} ${grey('shift+tab to cycle')}`,
  },
}

/**
 * The frames a CLI cycles while it thinks. Claude Code rotates these asterisk
 * glyphs; the others get the same treatment so no pane sits perfectly still
 * while its agent is supposedly working.
 */
const SPINNER_FRAMES = ['✳', '✢', '✶', '✻', '✽', '✻', '✶', '✢']

export interface LiveBlock {
  /** Present-tense line beside the spinner. */
  activity: string
  /** Seconds the agent has been on this turn. */
  seconds: number
  /** Tokens pulled down so far. */
  tokens: number
  /** The agent's task list: the first unchecked one is the one in progress. */
  todos: { text: string; done: boolean; active: boolean }[]
}

/**
 * The live status block a working agent keeps at the bottom of its transcript:
 * a spinner, what it is doing, how long it has been at it, and its task list.
 *
 * Redrawn in place on a timer, the same way the selector is. This is the single
 * biggest reason a pane reads as a running session rather than a screenshot:
 * something is always moving, and the numbers climb.
 */
export function renderLive(agent: AgentKey, block: LiveBlock, frame: number, cols: number): RenderedPrompt {
  const skin = AGENTS[agent]
  const width = Math.max(40, Math.min(cols, 96))
  const rows: string[] = ['']

  const spin = SPINNER_FRAMES[frame % SPINNER_FRAMES.length]
  const minutes = Math.floor(block.seconds / 60)
  const seconds = block.seconds % 60
  const elapsed = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`
  const tokens = block.tokens >= 1000 ? `${(block.tokens / 1000).toFixed(1)}k` : String(block.tokens)

  const body = wrap(`${block.activity}…`, width - 4)
  for (const line of body) {
    rows.push(`${rows.length === 1 ? accent(spin) : ' '} ${white(line)}`)
  }

  // The counter rides on the last line of the activity, but only if it fits.
  // Appending it unconditionally is what used to push that line past the
  // terminal's width: xterm wrapped it onto a second row the block did not know
  // about, so every redraw rewound one row short and left the previous line
  // stranded above a blank gap.
  const counter = `(${elapsed} · ↓ ${tokens} tokens)`
  const lastRow = 2 + (body[body.length - 1]?.length ?? 0)
  if (lastRow + 1 + counter.length <= width) rows[rows.length - 1] += ` ${dim(counter)}`
  else rows.push(`  ${dim(counter)}`)

  for (const todo of block.todos) {
    const box = todo.done ? '◼' : '◻'
    // Todos are wrapped for the same reason, and indented under their own box so
    // a long one still reads as a single item.
    const [head, ...tail] = wrap(todo.text, width - 4)
    const paint = todo.done || todo.active ? white : grey
    rows.push(`${todo.active ? accent(box) : grey(box)} ${paint(head ?? '')}`)
    for (const line of tail) rows.push(`  ${paint(line)}`)
  }
  rows.push('')

  // `optionRows` stays empty: nothing here is clickable, but sharing the shape
  // with the selector lets the pane rewind either block the same way.
  return { text: rows.join('\r\n') + '\r\n', height: rowsUsed(rows, cols), optionRows: [] }
}

/** Greedy word wrap. Plain text only, so it must run BEFORE any colouring. */
function wrap(text: string, width: number): string[] {
  const out: string[] = []
  let line = ''
  for (const word of text.split(' ')) {
    if (line && line.length + 1 + word.length > width) {
      out.push(line)
      line = word
    } else {
      line = line ? `${line} ${word}` : word
    }
  }
  if (line) out.push(line)
  return out
}

export interface RenderedPrompt {
  text: string
  /** Total terminal rows written, so the block can be rewound and redrawn. */
  height: number
  /** Where each option sits inside the block, for the click targets. */
  optionRows: { start: number; height: number }[]
}

/**
 * The numbered selector a CLI shows when it needs a decision.
 *
 * Wrapping is done here rather than left to the terminal on purpose: the block
 * has to be redrawn in place every time the highlight moves, and pointing at the
 * right option with the mouse means knowing its exact row. Both need an exact
 * height, and a terminal that wraps for you will not tell you what it did.
 */
export function renderPrompt(
  agent: AgentKey,
  question: string,
  options: DemoPromptOption[],
  selected: number,
  cols: number
): RenderedPrompt {
  const skin = AGENTS[agent]
  const width = Math.max(40, Math.min(cols, 96))
  const rows: string[] = []
  const optionRows: { start: number; height: number }[] = []

  rows.push('')
  rows.push(dim('─'.repeat(width - 2)))
  rows.push('')
  for (const line of wrap(question, width - 4)) {
    rows.push(`${rows.length === 3 ? skin.bullet : ' '} ${white(line)}`)
  }
  rows.push('')

  const paint = (index: number, label: string, muted: boolean) => {
    const active = index === selected
    return active
      ? `  ${accent('❯')} ${accent(`${index + 1}.`)} ${bold(white(label))}`
      : `    ${grey(`${index + 1}.`)} ${muted ? grey(label) : white(label)}`
  }

  options.forEach((option, i) => {
    // Measured in REAL rows, not in array entries. A row the terminal decides to
    // wrap still only counts once here, and the click target laid over it would
    // drift further down the block with every option above it.
    const start = rowsUsed(rows, cols)
    rows.push(paint(i, option.label, false))
    for (const line of wrap(option.description, width - 9)) {
      rows.push(`       ${grey(line)}`)
    }
    optionRows.push({ start, height: rowsUsed(rows, cols) - start })
  })

  rows.push(paint(options.length, 'Type something.', true))
  rows.push('')

  return {
    text: rows.join('\r\n') + '\r\n',
    height: rowsUsed(rows, cols),
    optionRows,
  }
}
