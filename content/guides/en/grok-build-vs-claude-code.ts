import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-vs-claude-code',
    locale: 'en',
    title: 'Grok Build vs Claude Code: Honest Comparison',
    metaTitle: 'Grok Build vs Claude Code: Honest Comparison (2026)',
    metaDescription: 'Grok Build (xAI grok CLI) vs Claude Code compared honestly: models, auth, permissions, subagents, Windows, and when to run both in CodeAgentSwarm.',
    intro: `People ask which coding CLI to use: Grok Build from xAI or Claude Code from Anthropic. The honest answer is that they are both serious terminal agents, they optimize for different ecosystems, and the best setup for many developers is not choosing one forever. It is running both when each fits the task.

Grok Build is xAI's coding CLI (the <code>grok</code> command), not the consumer Grok chatbot and not unaffiliated community grok-cli packages.

This comparison stays practical: install and auth, strengths, gaps, and how CodeAgentSwarm lets you supervise both in one workspace.`,
    ctaText: 'Run Grok Build and Claude Code side by side in CodeAgentSwarm. One workspace, two vendors, shared notifications and history.',
    ctaAgent: 'multi',
    highlightedWords: ['Grok Build', 'Claude Code'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-23',
    alternateSlug: 'grok-build-vs-claude-code',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Short answer',
      content: [
        { type: 'paragraph', text: 'Claude Code is the mature Anthropic-native coding CLI with a huge ecosystem of skills, hooks and community knowledge. Grok Build is xAI\'s coding TUI with strong headless and agent modes, plan mode, native subagents and Grok 4.6. Neither replaces the other.' },
        { type: 'paragraph', text: 'If your team already lives in Claude subscriptions, Claude Code stays the default. If you want to test Grok models in the terminal, Grok Build now has a free route plus paid plans and API access. If you use both, CodeAgentSwarm avoids constant context switching.' },
      ],
    },
    {
      id: 'table',
      title: 'Side-by-side',
      content: [
        { type: 'list', items: ['<strong>Vendor:</strong> Claude Code → Anthropic. Grok Build → xAI.', '<strong>Binary:</strong> <code>claude</code> vs <code>grok</code>.', '<strong>Data dir:</strong> <code>~/.claude/</code> vs <code>~/.grok/</code> (or <code>GROK_HOME</code>).', '<strong>Auth:</strong> Anthropic account / API vs browser grok.com login or <code>XAI_API_KEY</code>.', '<strong>Permissions:</strong> Claude permission modes + hooks vs <code>--permission-mode</code>, <code>--always-approve</code>, plan mode.', '<strong>Parallelism:</strong> Claude agent teams / sub-agents inside one session vs Grok native subagents + multi-terminal swarms.', '<strong>Headless:</strong> both support non-interactive runs; Grok exposes <code>grok -p</code> and <code>grok agent</code> modes explicitly.', '<strong>Skills:</strong> both can use agentskills-style packages; paths differ (<code>~/.claude/skills</code> vs <code>~/.grok/skills</code>).'] },
        { type: 'callout', variant: 'info', content: 'Product details drift weekly. Re-check <code>claude --help</code> and <code>grok --help</code> before you write policy for a whole org.' },
      ],
    },
    {
      id: 'when',
      title: 'When to pick which',
      content: [
        { type: 'heading', level: 3, text: 'Reach for Claude Code when', id: 'claude-when' },
        { type: 'paragraph', text: 'You need the densest ecosystem, Anthropic-model behavior you already trust, or a team that already standardized on Claude Code permissions, MCP and skills.' },
        { type: 'heading', level: 3, text: 'Reach for Grok Build when', id: 'grok-when' },
        { type: 'paragraph', text: 'You want Grok 4.6 coding, xAI\'s plan mode and subagent tooling, or headless and agent integration paths that match your automation stack. It also fits a careful migration from Claude; see <a href="/en/guides/grok-build-from-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build from Claude Code</a>.' },
        { type: 'heading', level: 3, text: 'Run both when', id: 'both-when' },
        { type: 'paragraph', text: 'Different tasks benefit from different models. CodeAgentSwarm lets one terminal run Claude Code while another runs Grok Build on the same repo, with notifications so you are not babysitting both panes.' },
      ],
    },
    {
      id: 'cas',
      title: 'Both in one swarm',
      content: [
        { type: 'paragraph', text: 'Install both CLIs, open CodeAgentSwarm, set terminal A to Claude Code and terminal B to Grok Build. That is the multi-vendor pattern the product is built for. Read the <a href="/en/guides/grok-build-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build agent swarm</a> and <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">cross-vendor swarm</a> guides next.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Grok Build better than Claude Code?', answer: 'Neither is universally better. Claude Code wins on ecosystem maturity; Grok Build wins when you want xAI models and its plan/subagent tooling. Many people run both.' },
    { question: 'Can I run them at the same time?', answer: 'Yes. They are separate processes. CodeAgentSwarm is built for that: one agent per terminal, supervised together.' },
    { question: 'Do skills transfer?', answer: 'Often with adaptation. Skills follow open layouts, but install paths differ. See the from-Claude-Code guide for migration notes.' },
  ],
}

export default guide
