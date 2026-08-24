const AGENT_VIDEO: Array<[RegExp, string]> = [
  [/opencode|open-code/, 'agent-chat-opencode.mp4'],
  [/antigravity/, 'agent-chat-antigravity.mp4'],
  [/kimi/, 'agent-chat-kimi.mp4'],
  [/grok/, 'agent-chat-grok.mp4'],
  [/codex/, 'agent-chat-codex.mp4'],
  [/claude/, 'agent-chat-claude.mp4'],
]

const AGENT_CLI_VIDEO: Array<[RegExp, string]> = [
  [/opencode|open-code/, 'agent-opencode.mp4'],
  [/antigravity/, 'agent-antigravity.mp4'],
  [/kimi/, 'agent-kimi.mp4'],
  [/grok/, 'agent-grok.mp4'],
  [/codex/, 'agent-codex.mp4'],
  [/claude/, 'agent-claude.mp4'],
]

const FEATURE_VIDEO: Array<[RegExp, string]> = [
  [/multiple-claude-code-accounts|varias-cuentas-claude-code-codex/, 'terminals-list.mp4'],
  [/conversation-history|history(?:-|$)|historial/, 'guide-conversation-history.mp4'],
  [/run-multiple|multiple-.*sessions|agent-swarm|ejecutar-multiples|varios-terminales|enjambre-de-agentes/, 'guide-terminals.mp4'],
  [/git-worktree|worktrees/, 'guide-gitmanager.mp4'],
  [/task-management|kanban/, 'guide-kanban.mp4'],
  [/notification/, 'guide-terminal-notifications.mp4'],
]

export function pickGuideVideo(slug: string): string {
  const feature = FEATURE_VIDEO.find(([pattern]) => pattern.test(slug))
  if (feature) return feature[1]

  if (/yolo/.test(slug)) {
    const cliMatches = AGENT_CLI_VIDEO.filter(([pattern]) => pattern.test(slug))
    if (cliMatches.length === 1) return cliMatches[0][1]
  }

  const matches = AGENT_VIDEO.filter(([pattern]) => pattern.test(slug))
  if (matches.length === 1) return matches[0][1]
  return 'multi-model-v2.mp4'
}
