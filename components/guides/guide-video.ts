const AGENT_VIDEOS: [string, string][] = [
  ['grok', 'agent-grok.mp4'],
  ['kimi', 'agent-kimi.mp4'],
  ['opencode', 'agent-opencode.mp4'],
  ['antigravity', 'agent-antigravity.mp4'],
  ['codex', 'agent-codex.mp4'],
  ['claude', 'agent-claude.mp4'],
]

export function pickGuideVideo(slug: string): string {
  const s = slug.toLowerCase()
  const has = (...words: string[]) => words.some((word) => s.includes(word))

  if (has('history', 'historial', 'conversation', 'conversacion')) {
    return 'conversation_history.mp4'
  }
  if (has('changes', 'cambios', 'git')) {
    return 'gitmanager.mp4'
  }
  if (/(^|-)vs(-|$)/.test(s)) {
    return 'multi-model-v2.mp4'
  }

  const agentVideo = AGENT_VIDEOS.find(([agent]) => s.includes(agent))?.[1]
  if (agentVideo) return agentVideo

  if (has('yolo', 'gemini')) return 'multi-model-v2.mp4'
  return 'terminals.mp4'
}
