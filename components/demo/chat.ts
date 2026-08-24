import type { AgentChatConfig, AgentKey } from './types'

/**
 * What the composer offers, per CLI.
 *
 * The models here are the same ones each agent's banner prints in ./agents.ts —
 * a visitor who switches from Chat to Terminal must not find a different model
 * named two centimetres away.
 *
 * The permission wording is the app's own: each provider names these differently
 * (Codex says "Approve for me" where Claude says "Auto"), and flattening them to
 * one vocabulary would misrepresent all five shown here.
 */

/** The app's default catalogue, used by the agents that have no wording of their own. */
const GENERIC_PERMISSIONS = [
  {
    id: 'approval-required',
    label: 'Ask before actions',
    description: 'Read-only until you approve changes and commands',
  },
  {
    id: 'auto-accept-edits',
    label: 'Auto-accept edits',
    description: 'Allow workspace edits; ask before commands and risky actions',
  },
  {
    id: 'auto',
    label: 'Auto',
    description: 'Let the provider review routine actions; ask when risk remains',
  },
  {
    id: 'full-access',
    label: 'Full access',
    description: 'Turbo/Yolo mode without approval prompts',
  },
]

/** Claude and Codex both expose a reasoning level, and both use these names. */
const EFFORTS = [
  { id: 'low', label: 'Effort · Low' },
  { id: 'medium', label: 'Effort · Medium' },
  { id: 'high', label: 'Effort · High' },
  { id: 'xhigh', label: 'Effort · xHigh' },
]

export const AGENT_CHAT: Record<AgentKey, AgentChatConfig> = {
  claude: {
    models: [
      { id: 'claude-opus-5', name: 'Opus 5', description: '1M context · the deepest reasoning' },
      { id: 'claude-sonnet-5', name: 'Sonnet 5', description: 'Near-Opus quality, faster and cheaper' },
      { id: 'claude-haiku-4-5', name: 'Haiku 4.5', description: 'Fastest, for short scoped work' },
    ],
    efforts: EFFORTS.concat({ id: 'max', label: 'Effort · Max' }),
    permissions: [
      {
        id: 'approval-required',
        label: 'Manual',
        description: 'Ask before edits, commands, and other protected actions',
      },
      ...GENERIC_PERMISSIONS.slice(1),
    ],
    plan: true,
  },
  codex: {
    models: [
      { id: 'gpt-5.6-sol', name: 'gpt-5.6-sol', description: 'The default for agentic coding' },
      { id: 'gpt-5.3-codex-spark', name: 'gpt-5.3-codex-spark', description: 'Lighter and quicker to answer' },
    ],
    efforts: EFFORTS,
    permissions: [
      {
        id: 'auto-accept-edits',
        label: 'Ask for approval',
        description: 'Work in this workspace; ask before internet access or editing files outside it',
      },
      {
        id: 'auto',
        label: 'Approve for me',
        description: 'Only ask for actions detected as potentially unsafe',
      },
      {
        id: 'full-access',
        label: 'Full Access',
        description: 'Edit outside this workspace and access the internet without asking',
      },
    ],
    // Codex only offers structured questions in Plan collaboration mode.
    plan: true,
  },
  antigravity: {
    models: [
      { id: 'gemini-3-pro', name: 'Gemini 3 Pro', description: 'Agent mode' },
      { id: 'gemini-3-flash', name: 'Gemini 3 Flash', description: 'Faster, for routine edits' },
    ],
    permissions: GENERIC_PERMISSIONS,
  },
  opencode: {
    models: [
      { id: 'anthropic/claude-sonnet-5', name: 'anthropic/claude-sonnet-5' },
      { id: 'anthropic/claude-opus-5', name: 'anthropic/claude-opus-5' },
      { id: 'openai/gpt-5.6-sol', name: 'openai/gpt-5.6-sol' },
    ],
    permissions: GENERIC_PERMISSIONS,
    plan: true,
  },
  kimi: {
    models: [
      { id: 'kimi-k2.7-code', name: 'kimi-k2.7-code', description: 'Moonshot AI' },
      { id: 'kimi-k2.6', name: 'kimi-k2.6', description: 'Reasoning off' },
    ],
    permissions: GENERIC_PERMISSIONS,
  },
}

/** The composer's starting state for an agent: first model, high effort, safe-ish default. */
export function defaultChatConfig(agent: AgentKey) {
  const config = AGENT_CHAT[agent]
  return {
    model: config.models[0].id,
    effort: config.efforts?.find((e) => e.id === 'high')?.id ?? config.efforts?.[0]?.id ?? '',
    permission: config.permissions[1]?.id ?? config.permissions[0].id,
    plan: false,
  }
}
