import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-agent-swarm',
    locale: 'en',
    title: 'Grok Build Agent Swarm: Run Multiple grok Terminals',
    metaTitle: 'Grok Build Agent Swarm: Run Multiple grok Terminals (2026)',
    metaDescription: 'Run several Grok Build (xAI) sessions in parallel. How native subagents differ from a multi-terminal swarm, and how tabs, tmux and CodeAgentSwarm compare.',
    intro: `A Grok Build agent swarm is several independent <code>grok</code> sessions working at once: one migrating a service, another writing tests, a third reviewing diffs. Each session is its own process with its own context. That is different from Grok Build's native subagents, which stay inside one parent session.

Grok Build is xAI's coding CLI (the <code>grok</code> command), not the consumer Grok chatbot and not unaffiliated community grok-cli packages.

This guide is the pillar for parallel Grok Build: plain tabs, tmux, and CodeAgentSwarm, plus when to lean on native subagents instead.`,
    ctaText: 'Run a full Grok Build swarm in CodeAgentSwarm: multiple grok terminals, desktop notifications when one finishes, searchable history across all of them.',
    highlightedWords: ['Grok Build', 'agent swarm'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'enjambre-de-agentes-grok-build',
  },
  sections: [
    {
      id: 'what',
      title: 'What counts as a Grok Build swarm?',
      content: [
        { type: 'image', alt: 'Multiple Grok Build terminals in CodeAgentSwarm', src: '/images/guides/multi-cli-agent-selector.png', caption: 'Several independent grok sessions supervised in one workspace.' },
        { type: 'paragraph', text: 'A swarm is N independent CLI processes. Open three terminals, run <code>grok</code> in each, give each a different task: that is already a swarm. Native subagents (<code>--no-subagents</code> to disable) are a different tool: the parent Grok Build session spawns children it owns. Both are useful; they solve different problems. See <a href="/en/guides/grok-build-subagents-vs-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">subagents vs agent swarm</a>.' },
        { type: 'callout', variant: 'info', content: 'There is no extra xAI fee for parallel sessions beyond whatever your SuperGrok / X Premium+ plan already allows. Each session burns the same account pool.' },
      ],
    },
    {
      id: 'tabs',
      title: 'Method 1: terminal tabs',
      content: [
        { type: 'paragraph', text: 'Open several tabs, <code>cd</code> into the project, run <code>grok</code> in each.' },
        { type: 'code', language: 'bash', code: '# Tab 1\ncd ~/my-project && grok "migrate the auth module"\n\n# Tab 2\ncd ~/my-project && grok "add integration tests for auth"\n\n# Tab 3\ncd ~/my-project && grok --continue' },
        { type: 'list', items: ['Pros: zero extra tools', 'Cons: easy to miss a permission prompt; no shared history UI; painful past three or four sessions'] },
      ],
    },
    {
      id: 'tmux',
      title: 'Method 2: tmux',
      content: [
        { type: 'paragraph', text: 'tmux keeps panes alive and lets you detach. Great for long migrations. Still a general multiplexer, not an agent supervisor.' },
        { type: 'code', language: 'bash', code: 'tmux new-session -s grok\ntmux split-window -h\ntmux split-window -v\n# run grok in each pane' },
        { type: 'list', items: ['Pros: detach/reattach, power-user friendly', 'Cons: text-only density; no desktop notification when grok stops for input'] },
      ],
    },
    {
      id: 'cas',
      title: 'Method 3: CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm is built for supervising AI CLIs. Pick Grok Build in each terminal\'s agent selector. You get a grid of terminals, desktop notifications, per-terminal live diffs, searchable history, and you can mix Grok Build with Claude Code or Codex in the same window.' },
        { type: 'paragraph', text: 'For worktree isolation per agent, enable worktrees when opening terminals or start with <code>grok --worktree=name</code>. See also <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI agents</a>.' },
        { type: 'callout', variant: 'tip', content: 'If you only need one Grok Build session with internal helpers, native subagents may be enough. If you need several human-visible workers (or multi-vendor), use a real multi-terminal swarm.' },
      ],
    },
  ],
  faq: [
    { question: 'Can I run multiple Grok Build sessions at once?', answer: 'Yes. Each grok process is independent. Use tabs, tmux, or CodeAgentSwarm to supervise them.' },
    { question: 'Is that the same as Grok subagents?', answer: 'No. Subagents live inside one Grok session. A swarm is several top-level grok processes you supervise.' },
    { question: 'Does CodeAgentSwarm support Grok Build?', answer: 'Yes. Select Grok Build per terminal like any other first-class agent.' },
  ],
}

export default guide
