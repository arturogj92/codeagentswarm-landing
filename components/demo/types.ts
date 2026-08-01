/**
 * Shape of the simulated CodeAgentSwarm session shown on the landing.
 *
 * Everything here is data. The demo never talks to a model, a server or a shell:
 * a script drives a state machine in the browser. That is deliberate — a landing
 * page cannot afford per-visitor inference cost, and a real agent would say
 * something unpredictable at the worst possible moment.
 */

/** Work-phase badge. Mirrors the app's terminal_statuses catalogue. */
export type StatusKey = 'needs_input' | 'needs_testing' | 'working' | 'pushed' | 'idle'

/** The five CLIs CodeAgentSwarm can drive. */
export type AgentKey = 'claude' | 'codex' | 'antigravity' | 'opencode' | 'kimi'

/** The app's three workspace layouts. */
export type ViewMode = 'grid' | 'tabs' | 'sidebar'

/**
 * How a conversation is shown. The app can drive the same session either as a
 * raw CLI in a pty or as a structured chat; Chat is the default here because it
 * is the one a visitor who has never used a coding CLI can read.
 */
export type PaneMode = 'chat' | 'terminal'

export interface StatusDef {
  key: StatusKey
  label: string
  color: string
  /** lucide-react icon name, same glyph the app uses. */
  icon: string
  /** Attention-first ordering: needs_input floats to the top of the list. */
  order: number
}

export interface DemoProject {
  name: string
  /** Accent colour for the tab bar. NOT the icon's background. */
  color: string
  /** Path to the project's icon image, as the app stores a custom icon. */
  icon: string
  /** Shown under the name in the project picker. */
  path: string
  /** Relative age shown on the right of the picker row. */
  lastUsed: string
}

export interface DemoPromptOption {
  /** Bold first line. */
  label: string
  /** Grey wrapped line under it, the way the CLI explains each choice. */
  description: string
  /** Written to the screen once picked. */
  reply: string
  /** Activity line the terminal takes on. */
  activity: string
}

/**
 * A pending question, drawn as the numbered selector the CLIs actually show.
 * Answering it is the one place the visitor changes what an agent does.
 */
export interface DemoPrompt {
  question: string
  options: DemoPromptOption[]
}

/** One option in a composer dropdown (model, reasoning, permissions). */
export interface ChatChoice {
  id: string
  label: string
  description?: string
}

/**
 * What each CLI lets you change mid-conversation. They genuinely differ — only
 * some expose a reasoning level, and only some have a Plan mode — and pretending
 * otherwise would be the kind of detail that makes a demo read as a mock-up.
 */
export interface AgentChatConfig {
  /** `name` rather than `label`, matching the app's own model objects. */
  models: (Omit<ChatChoice, 'label'> & { name: string })[]
  /** Reasoning / effort levels. Absent when the CLI has none. */
  efforts?: ChatChoice[]
  permissions: ChatChoice[]
  /** Whether the Build ⇄ Plan toggle is offered. */
  plan?: boolean
}

/** Tool categories, mirroring the glyphs the chat picks per work row. */
export type ChatTool =
  | 'reasoning'
  | 'command'
  | 'file_read'
  | 'file_change'
  | 'search'
  | 'plan'

/** One line in the work log: what the agent did, and how it went. */
export interface ChatWork {
  tool: ChatTool
  /** "Read", "Searched", "Ran" — what it did. */
  verb: string
  /** The thing it did it to. Dimmed next to the verb. */
  target: string
  status?: 'running' | 'ok' | 'failed'
  /** Shown when the row is expanded. */
  input?: string
  output?: string
}

/**
 * A row of the chat transcript.
 *
 * Deliberately short: the agent's task list and its pending question are NOT
 * rows here. They live on the terminal itself (`todos`, `prompt`) so the chat
 * and the terminal show the same state, and answering in one is answering in
 * both.
 */
export type ChatRow =
  | { id: string; kind: 'user'; text: string }
  | { id: string; kind: 'assistant'; text: string }
  | { id: string; kind: 'work'; rows: ChatWork[] }

export interface DemoTerminal {
  id: number
  /** Sticky tab label: the feature this terminal is for. */
  title: string
  /** One-sentence GOAL, shown under the title. */
  goal: string
  /** What the agent is doing right now. */
  activity: string
  project: DemoProject
  agent: AgentKey
  status: StatusKey
  /** Human-readable age, e.g. "4m". Frozen text — the demo is not a clock. */
  elapsed: string
  /** Green edge + pulse: this terminal wants your attention. */
  notified?: boolean
  /** Pre-seeded terminal output, so switching to a tab is never an empty screen. */
  backlog?: string[]
  /** Set while the agent is blocked on a human. Cleared once answered. */
  prompt?: DemoPrompt
  /**
   * The agent's task list, shown under the spinner while it works. The index of
   * the one in progress is `todoIndex`; everything before it is done.
   */
  todos?: string[]
  todoIndex?: number
  /** Chat or terminal. Chat unless the script or the visitor says otherwise. */
  mode?: PaneMode
  /** The chat transcript, in order. */
  chat?: ChatRow[]
}

export type DemoEvent =
  /** Move a terminal to another work phase. Re-sorts the list. */
  | { at: number; kind: 'status'; id: number; status: StatusKey }
  /** Replace the activity line. */
  | { at: number; kind: 'activity'; id: number; text: string }
  /** Replace the goal line. */
  | { at: number; kind: 'goal'; id: number; text: string }
  /** Raise or clear the attention marker on a tab. */
  | { at: number; kind: 'notify'; id: number; on: boolean }
  /** Put a question on a terminal's screen and block it until answered. */
  | { at: number; kind: 'ask'; id: number; prompt: DemoPrompt }
  /** Tick the agent's task list forward. */
  | { at: number; kind: 'todo'; id: number; index: number }
  /** Append output to a terminal's screen (ANSI allowed). */
  | { at: number; kind: 'write'; id: number; text: string }
  /** Append a row to a terminal's chat transcript. */
  | { at: number; kind: 'chat'; id: number; row: ChatRow }
  /** Focus a terminal, as if the visitor clicked its row. */
  | { at: number; kind: 'select'; id: number }
  /**
   * Narration line explaining what just happened. Carries a translation key
   * rather than text: the landing is bilingual and the script is not.
   */

export interface DemoScript {
  /** Milliseconds before the timeline restarts from the initial state. */
  duration: number
  terminals: DemoTerminal[]
  /** Terminal focused when the loop starts. */
  initialSelection: number
  events: DemoEvent[]
}

/** Live state the simulation hands to the view. */
export interface SimulationState {
  terminals: DemoTerminal[]
  selectedId: number
  /** Output accumulated per terminal id, already ANSI-encoded. */
  screens: Record<number, string[]>
}
