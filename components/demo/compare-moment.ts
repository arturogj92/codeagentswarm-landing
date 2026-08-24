import { PROJECTS } from './projects'
import type { DemoTerminal } from './types'

/**
 * The one moment the Chat/Terminal comparison is frozen at.
 *
 * The whole point of the slider is that both sides are the SAME conversation at
 * the SAME second — otherwise it compares two products instead of two views of
 * one. So the chat rows and the terminal lines below are written as one unit and
 * must be edited as one: every sentence in `CHAT_MOMENT` appears, word for word,
 * somewhere in `CLI_MOMENT`.
 *
 * The moment chosen is an agent stopping to ask. It is where the two views
 * differ most — a numbered selector you answer by typing a digit, against a card
 * you answer by clicking — and it is the part of the product a screenshot has
 * never been able to explain.
 */
export const CHAT_MOMENT: DemoTerminal = {
  id: 1,
  title: 'Subscription webhooks',
  goal: 'Handle failed payments without losing the subscription',
  activity: 'Waiting: what happens after the third failed charge?',
  project: PROJECTS.swarm,
  agent: 'claude',
  status: 'needs_input',
  elapsed: '4m',
  mode: 'chat',
  chat: [
    {
      id: 'cmp-u',
      kind: 'user',
      text: 'Stripe retries a failed charge three times. Make our webhook handle that without ever losing someone their subscription.',
    },
    {
      id: 'cmp-a',
      kind: 'assistant',
      text: 'Retries are handled and the webhook is idempotent now, so a replayed event cannot double-charge anyone. What happens next is a product decision, not a technical one, so I have stopped to ask.',
    },
    {
      id: 'cmp-w',
      kind: 'work',
      rows: [
        {
          tool: 'file_change',
          verb: 'Edited',
          target: 'src/billing/webhooks.js',
          status: 'ok',
          output: '+96 −12',
        },
        {
          tool: 'command',
          verb: 'Ran',
          target: 'npm test -- billing',
          status: 'ok',
          output: '24 passed',
        },
      ],
    },
  ],
  prompt: {
    question: 'Retries are done. What should happen after the third failed charge?',
    options: [
      {
        label: 'Freeze the account',
        description:
          'Keep every task and conversation. One good charge puts it all back.',
        reply: '',
        activity: '',
      },
      {
        label: 'Downgrade to free',
        description:
          'Straight to the free tier. Simpler to reason about, harder to undo.',
        reply: '',
        activity: '',
      },
      {
        label: 'Ask them first',
        description: 'Email a retry link and wait 72 hours before touching the plan.',
        reply: '',
        activity: '',
      },
    ],
  },
}

/** One line of the terminal transcript, with the role that decides its colour. */
export interface CliLine {
  text: string
  tone?: 'bullet' | 'prompt' | 'tool' | 'result' | 'dim' | 'option' | 'selected' | 'rule' | 'mark'
  /** Rendered inline after `text`. */
  trail?: string
  /** Tone for the trail, when it differs from the default dimmed one. */
  trailTone?: CliLine['tone']
}

/** Which agents the comparison can be shown with. */
export type CompareAgent = 'claude' | 'codex'

/**
 * The per-CLI chrome around the same words.
 *
 * Only the skin differs — bullet, prompt glyph, how a tool call is announced,
 * how its result is indented. The sentences are identical because the point of
 * the toggle is that this is the same product with a different agent in it, not
 * two different demos.
 */
const SKIN: Record<CompareAgent, {
  /**
   * The opening banner, mascot and all.
   *
   * Claude Code's block mark is the single most recognisable thing about it —
   * the first thing anyone who has run it recognises — and the terminal half
   * read as "a terminal" rather than "Claude Code" without it. Copied
   * character for character from the CLI, padded to a fixed width so the text
   * beside it lines up (the three rows are 8, 9 and 7 cells in the source).
   */
  banner: { mark: string; text: string; tone?: CliLine['tone'] }[]
  bullet: string
  tool: (name: string, detail: string) => { text: string; trail: string }
  result: (text: string) => string
  cursor: string
  footer: string
}> = {
  claude: {
    banner: [
      { mark: ' ▐▛███▜▌ ', text: 'Claude Code  v2.1.220' },
      { mark: '▝▜█████▛▘', text: 'Opus 5 (1M context) with high effort · Claude Max', tone: 'dim' },
      { mark: '  ▘▘ ▝▝  ', text: '~/code/codeagentswarm', tone: 'dim' },
    ],
    bullet: '●',
    tool: (name, detail) => ({ text: `  ${name}`, trail: `(${detail})` }),
    result: (text) => `  ⎿  ${text}`,
    cursor: '›',
    footer: 'bypass permissions on',
  },
  codex: {
    banner: [
      { mark: ' >_ ', text: 'OpenAI Codex  (v0.144.6)' },
      { mark: '    ', text: 'gpt-5.6-sol high · full-auto', tone: 'dim' },
      { mark: '    ', text: '~/code/codeagentswarm', tone: 'dim' },
    ],
    bullet: '•',
    tool: (name, detail) => ({ text: `  ${name} `, trail: detail }),
    result: (text) => `  ${text}`,
    cursor: '›',
    footer: 'full-auto',
  },
}

/**
 * The same moment as the chosen CLI prints it.
 *
 * Written as data rather than as ANSI on purpose: this is one static screen, and
 * a real xterm here would mean a second terminal emulator on the page for
 * something nobody types into.
 */
export function cliMoment(agent: CompareAgent): CliLine[] {
  const skin = SKIN[agent]
  const edit = skin.tool('Edit', 'src/billing/webhooks.js')
  const test = skin.tool(agent === 'codex' ? 'Shell' : 'Bash', 'npm test -- billing')

  return [
    // Opens on the agent's answer, exactly where the chat's visible transcript
    // opens. The request sits one line above on both sides; showing it on the
    // terminal only would have made the halves look like different sessions.
    { text: `${skin.bullet} Retries are handled and the webhook is idempotent now, so a replayed`, tone: 'bullet' },
    { text: '  event cannot double-charge anyone. What happens next is a product' },
    { text: '  decision, not a technical one, so I have stopped to ask.' },
    { text: '' },
    { text: edit.text, trail: edit.trail, tone: 'tool' },
    { text: skin.result('+96 −12'), tone: 'result' },
    { text: test.text, trail: test.trail, tone: 'tool' },
    { text: skin.result('24 passed'), tone: 'result' },
    { text: '' },
    { text: '────────────────────────────────────────────────────────', tone: 'rule' },
    { text: `${skin.bullet} Retries are done. What should happen after the third failed charge?`, tone: 'bullet' },
    { text: '' },
    { text: '' },
    { text: '  ❯ 1. Freeze the account', tone: 'selected' },
    { text: '       Keep every task and conversation. One good charge puts it', tone: 'dim' },
    { text: '       all back.', tone: 'dim' },
    { text: '    2. Downgrade to free', tone: 'option' },
    { text: '       Straight to the free tier. Simpler to reason about, harder', tone: 'dim' },
    { text: '       to undo.', tone: 'dim' },
    { text: '' },
    { text: '    3. Ask them first', tone: 'option' },
    {
      text: '       Email a retry link and wait 72 hours before touching the plan.',
      tone: 'dim',
    },
    { text: '' },
    { text: '    4. Type something.', tone: 'dim' },
  ]
}

/** The opening banner, rendered at the top of the screen rather than in the
 *  transcript: anchored with the rest it was clipped off the top of the frame,
 *  and the mascot is the whole reason it is there. */
export function cliBanner(agent: CompareAgent): CliLine[] {
  return SKIN[agent].banner.map((row) => ({
    text: row.mark,
    trail: row.text,
    tone: 'mark' as const,
    trailTone: row.tone,
  }))
}

/** The CLI's own floor, which differs per agent. */
export function cliFooter(agent: CompareAgent) {
  return SKIN[agent].footer
}

/** The chat side, with the agent swapped in. */
export function chatMoment(agent: CompareAgent): DemoTerminal {
  return { ...CHAT_MOMENT, agent }
}
