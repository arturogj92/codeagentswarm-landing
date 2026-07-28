import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-conversation-history',
    locale: 'en',
    title: 'Grok Build Conversation History: Find and Resume Sessions',
    metaTitle: 'Grok Build Conversation History (xAI): Find and Resume (2026)',
    metaDescription: 'Find and resume Grok Build sessions with grok --continue, --resume, grok sessions list/search, export transcripts, and CodeAgentSwarm searchable history.',
    intro: `Grok Build persists sessions under its data root so you can continue work later. The CLI exposes <code>--continue</code>, <code>--resume</code>, <code>grok sessions</code>, and <code>grok export</code>. CodeAgentSwarm adds a cross-agent searchable history UI on top.

Grok Build is xAI's coding CLI (<code>grok</code>), not the Grok chatbot. Resume was verified against <code>grok --help</code> (<code>-c/--continue</code>, <code>-r/--resume</code>).`,
    ctaText: 'Resume Grok Build in the CLI, or browse every agent\'s chats from CodeAgentSwarm\'s conversation history.',
    ctaAgent: 'grok-build',
    highlightedWords: ['conversation history', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'historial-conversaciones-grok-build',
  },
  sections: [
    {
      id: 'cli-resume',
      title: 'Resume from the CLI',
      content: [
        { type: 'code', language: 'bash', code: '# Continue most recent session for this directory\ngrok --continue\n\n# Resume by id or title\ngrok --resume\ngrok --resume "auth refactor"\n\n# Optional: fork instead of reusing the same session id\ngrok --resume SESSION --fork-session' },
        { type: 'paragraph', text: '<code>grok sessions list</code> and <code>grok sessions search</code> help you find older work. <code>grok export</code> writes a Markdown transcript when you need a shareable artifact.' },
      ],
    },
    {
      id: 'storage',
      title: 'Where history lives',
      content: [
        { type: 'paragraph', text: 'Session data lives under <code>~/.grok/</code> (or <code>GROK_HOME</code>). Do not casually delete that tree if you care about resume. Back it up like any other local agent state.' },
      ],
    },
    {
      id: 'cas-history',
      title: 'CodeAgentSwarm history',
      content: [
        { type: 'paragraph', text: 'CAS indexes conversations across Claude Code, Codex, OpenCode, Kimi Code, Grok Build and more so you can search from one modal and reopen a session into a terminal. That is the multi-agent layer the raw CLI does not provide alone.' },
      ],
    },
  ],
  faq: [
    { question: 'How do I continue my last Grok session?', answer: 'Run grok --continue in the same project directory.' },
    { question: 'How do I find an old session?', answer: 'Use grok sessions list or grok sessions search, then grok --resume with the id or title.' },
    { question: 'Does CodeAgentSwarm store Grok history?', answer: 'CAS provides searchable history across agents, including Grok Build sessions it has indexed from your machine.' },
  ],
}

export default guide
