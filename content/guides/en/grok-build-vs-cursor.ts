import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-vs-cursor',
    locale: 'en',
    title: 'Grok Build vs Cursor: CLI Agent or AI IDE?',
    metaTitle: 'Grok Build vs Cursor (xAI CLI vs AI IDE, 2026)',
    metaDescription: 'Grok Build (xAI terminal agent) vs Cursor IDE: different products. When you want a coding CLI swarm versus an AI-native editor, and how CodeAgentSwarm fits.',
    intro: `Cursor is an AI-native IDE. Grok Build is a terminal coding agent from xAI. Comparing them as if one replaces the other misses the point: one owns the editor UX, the other owns an autonomous CLI loop you can script, SSH into, and swarm.

Grok Build is xAI's coding CLI (<code>grok</code>), not the Grok chatbot.`,
    ctaText: 'Keep Cursor if you love the IDE. Add Grok Build terminals in CodeAgentSwarm when you want supervised CLI agents in parallel.',
    ctaAgent: 'multi',
    highlightedWords: ['Grok Build', 'Cursor'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-vs-cursor',
  },
  sections: [
    {
      id: 'category',
      title: 'Different categories',
      content: [
        { type: 'list', items: ['<strong>Cursor:</strong> fork of VS Code with deep AI chat/edit integrations inside the editor.', '<strong>Grok Build:</strong> TUI/CLI agent that edits via tools, runnable headless, multi-session, subagents.', '<strong>CodeAgentSwarm:</strong> desktop supervisor for many CLI agents (including Grok Build), not an IDE replacement.'] },
      ],
    },
    {
      id: 'when',
      title: 'When each wins',
      content: [
        { type: 'paragraph', text: 'Cursor wins when you want inline completions, editor-native chat, and a single polished IDE. Grok Build wins when you want long agent loops in the terminal, CI/headless runs, worktree-based experiments, or several agents in parallel under a supervisor.' },
        { type: 'paragraph', text: 'Many developers use both: Cursor for interactive editing, Grok Build (and friends) for multi-agent background work in CodeAgentSwarm.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Grok Build a Cursor alternative?', answer: 'Only partially. It is a CLI agent, not a full IDE. Many people use both.' },
    { question: 'Can CodeAgentSwarm replace Cursor?', answer: 'No. CAS supervises CLI agents; it is not a code editor.' },
  ],
}

export default guide
