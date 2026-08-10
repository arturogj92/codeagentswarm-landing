const AGENT_VIDEO: Array<[RegExp, string]> = [
  [/opencode|open-code/, 'agent-chat-opencode.mp4'],
  [/antigravity/, 'agent-chat-antigravity.mp4'],
  [/kimi/, 'agent-chat-kimi.mp4'],
  [/grok/, 'agent-chat-grok.mp4'],
  [/codex/, 'agent-chat-codex.mp4'],
  [/claude/, 'agent-chat-claude.mp4'],
]

export function pickGuideVideo(slug: string): string {
  const matches = AGENT_VIDEO.filter(([pattern]) => pattern.test(slug))
  if (matches.length === 1) return matches[0][1]
  return 'multi-model-v2.mp4'
}
