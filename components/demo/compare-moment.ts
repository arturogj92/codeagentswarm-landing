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
      text: 'Retries are handled and the webhook is idempotent now, so a replayed event cannot double-charge anyone. What happens next is a product decision, not a technical one — so I have stopped to ask.',
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
  tone?: 'bullet' | 'prompt' | 'tool' | 'result' | 'dim' | 'option' | 'selected' | 'rule'
  /** Rendered dimmed and inline after `text`. */
  trail?: string
}

/**
 * The same moment as Claude Code prints it.
 *
 * Written as data rather than as ANSI on purpose: this is one static screen, and
 * a real xterm here would mean a second terminal emulator on the page for
 * something nobody types into.
 */
export const CLI_MOMENT: CliLine[] = [
  // Opens on the agent's answer, exactly where the chat's visible transcript
  // opens. The request sits one line above on both sides; showing it on the
  // terminal only would have made the halves look like different sessions.
  { text: '● Retries are handled and the webhook is idempotent now, so a replayed' },
  { text: '  event cannot double-charge anyone. What happens next is a product' },
  { text: '  decision, not a technical one — so I have stopped to ask.' },
  { text: '' },
  { text: '  Edit', trail: '(src/billing/webhooks.js)', tone: 'tool' },
  { text: '  ⎿  +96 −12', tone: 'result' },
  { text: '' },
  { text: '  Bash', trail: '(npm test -- billing)', tone: 'tool' },
  { text: '  ⎿  24 passed', tone: 'result' },
  { text: '' },
  { text: '────────────────────────────────────────────────────────', tone: 'rule' },
  { text: '' },
  { text: '● Retries are done. What should happen after the third failed charge?' },
  { text: '' },
  { text: '  ❯ 1. Freeze the account', tone: 'selected' },
  { text: '       Keep every task and conversation. One good charge puts it', tone: 'dim' },
  { text: '       all back.', tone: 'dim' },
  { text: '' },
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
