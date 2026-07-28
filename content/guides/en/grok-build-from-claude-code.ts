import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-from-claude-code',
    locale: 'en',
    title: 'Use Grok Build Coming from Claude Code',
    metaTitle: 'Grok Build from Claude Code (xAI): Migration Notes (2026)',
    metaDescription: 'Moving from Claude Code to Grok Build: AGENTS.md, skills paths (~/.grok/skills), hooks/MCP differences, and running both in CodeAgentSwarm.',
    intro: `If you already live in Claude Code, Grok Build will feel partly familiar: project instruction files, skills packages, MCP tools, permission prompts. The paths and defaults differ, and some Claude-compat surfaces can double-fire hooks if you are not careful.

Grok Build is xAI's coding CLI (<code>grok</code>), not the Grok chatbot.`,
    ctaText: 'Keep Claude Code and add Grok Build in CodeAgentSwarm instead of replacing your whole stack overnight.',
    highlightedWords: ['Claude Code', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-desde-claude-code',
  },
  sections: [
    {
      id: 'mental',
      title: 'Mental model',
      content: [
        { type: 'paragraph', text: 'Claude Code stores a lot under <code>~/.claude/</code>. Grok Build uses <code>~/.grok/</code>. Skills for Grok live in <code>~/.grok/skills/</code>. Project guidance often still works via <code>AGENTS.md</code> and related conventions Grok reads. Do not assume every Claude hook fires safely under Grok without review.' },
        { type: 'callout', variant: 'warning', content: 'Grok can import some Claude-compatible surfaces. CodeAgentSwarm may pin certain Claude hook imports off for Grok terminals so you do not run two title-gates or double Stop notifiers. That is intentional.' },
      ],
    },
    {
      id: 'skills',
      title: 'Skills and MCP',
      content: [
        { type: 'paragraph', text: 'Copy or reinstall skills into <code>~/.grok/skills/</code> rather than only linking Claude\'s tree blindly. MCP servers for Grok go in <code>~/.grok/config.toml</code> under <code>[mcp_servers.*]</code> tables. CodeAgentSwarm can install its task MCP for Grok the same way it does for other agents.' },
        { type: 'callout', variant: 'tip', content: 'See also <a href="/en/guides/share-skills-between-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">sharing skills between agents</a> for the multi-CLI pattern.' },
      ],
    },
    {
      id: 'both',
      title: 'Run both, do not force a cutover',
      content: [
        { type: 'paragraph', text: 'Most teams should not day-one migrate every workflow. Put Grok Build on exploratory or SuperGrok-favored tasks while Claude Code keeps the critical path, then widen. CodeAgentSwarm is designed for that mix.' },
      ],
    },
  ],
  faq: [
    { question: 'Can Grok Build read CLAUDE.md?', answer: 'Grok understands common project instruction patterns including AGENTS.md-style files. Verify on your version; do not assume every Claude-only path is honored.' },
    { question: 'Where do Grok skills live?', answer: 'Typically ~/.grok/skills/ (agentskills layout).' },
    { question: 'Should I uninstall Claude Code?', answer: 'Usually no. Run both until you know which tasks prefer which agent.' },
  ],
}

export default guide
