import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-subagents-vs-agent-swarm',
    locale: 'en',
    title: 'Grok Build Subagents vs Agent Swarm: Which Parallelism?',
    metaTitle: 'Grok Build Subagents vs Agent Swarm (xAI, 2026)',
    metaDescription: 'Native Grok Build subagents vs a multi-terminal agent swarm: when to use --no-subagents, worktrees, and CodeAgentSwarm supervised terminals.',
    intro: `Grok Build can parallelize work in two ways people constantly mix up. Native subagents spawn inside one <code>grok</code> session. An agent swarm is several top-level <code>grok</code> processes (or mixed vendors) that a human supervises. Both are real. They are not the same product feature.

Grok Build is xAI's coding CLI (<code>grok</code>), not the consumer Grok chat app.`,
    ctaText: 'Use native subagents for work Grok can own alone; use CodeAgentSwarm when you need several visible workers or multi-vendor terminals.',
    ctaAgent: 'multi',
    highlightedWords: ['subagents', 'agent swarm'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'subagentes-grok-build-vs-enjambre',
  },
  sections: [
    {
      id: 'two-models',
      title: 'Two parallelism models',
      content: [
        { type: 'list', items: ['<strong>Native subagents:</strong> one parent Grok Build session delegates to children (disable with <code>--no-subagents</code>). Worktree-aware options exist via <code>--worktree</code>.', '<strong>Agent swarm:</strong> multiple independent terminals, each running <code>grok</code> (or Claude Code / Codex / …), supervised in tabs, tmux, or CodeAgentSwarm.'] },
        { type: 'paragraph', text: 'Subagents optimize for one operator conversation that fans out. Swarms optimize for human visibility across workers, multi-vendor mixes, and long-lived parallel tracks that do not share one context window.' },
      ],
    },
    {
      id: 'choose',
      title: 'How to choose',
      content: [
        { type: 'paragraph', text: 'Choose subagents when the task is one story with parallel research or implementation legs Grok can coordinate. Choose a swarm when you need hard isolation, different models/vendors, or you personally want to steer each worker.' },
        { type: 'code', language: 'bash', code: '# One session, no subagents\ngrok --no-subagents "keep this linear"\n\n# One session in a worktree\ngrok --worktree=feat-auth "implement auth"\n\n# Swarm: three CodeAgentSwarm terminals all set to Grok Build' },
      ],
    },
    {
      id: 'cas',
      title: 'Where CodeAgentSwarm sits',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm is the swarm layer. It does not replace Grok\'s subagents; it runs whole CLI sessions. You can still let one Grok terminal use subagents while another terminal runs a second Grok or Claude Code. That mix is the point.' },
      ],
    },
  ],
  faq: [
    { question: 'Should I disable Grok subagents when using CodeAgentSwarm?', answer: 'Not by default. Subagents and multi-terminal swarms stack. Disable subagents only when you want a single linear worker.' },
    { question: 'Is a swarm just more subagents?', answer: 'No. Subagents are owned by one session. Swarm terminals are independent processes with separate contexts.' },
  ],
}

export default guide
