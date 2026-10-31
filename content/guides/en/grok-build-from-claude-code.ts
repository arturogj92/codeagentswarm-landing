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
    ctaAgent: 'multi',
    highlightedWords: ['Claude Code', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-10-31',
    alternateSlug: 'grok-build-desde-claude-code',
  },
  sections: [
    {
      id: 'mental',
      title: 'Mental model',
      content: [
        { type: 'paragraph', text: 'Claude Code stores a lot under <code>~/.claude/</code>. Grok Build uses <code>~/.grok/</code>, but it also reads Claude Code\'s files without extra setup. According to <a href="https://docs.x.ai/build/features/skills-plugins-marketplaces" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">xAI\'s compatibility docs</a>, Grok loads Claude Code skills, plugins, marketplaces, MCP servers, agents, hooks and instruction files (<code>CLAUDE.md</code>, <code>CLAUDE.local.md</code>, <code>.claude/rules/</code>) next to <code>AGENTS.md</code> and <code>.grok/</code>. Because hooks come along too, review which Claude hooks you actually want firing under Grok.' },
        { type: 'callout', variant: 'warning', content: 'Grok can import some Claude-compatible surfaces. CodeAgentSwarm may pin certain Claude hook imports off for Grok terminals so you do not run two title-gates or double Stop notifiers. That is intentional.' },
      ],
    },
    {
      id: 'skills',
      title: 'Skills and MCP',
      content: [
        { type: 'paragraph', text: 'Your Claude skills already show up in Grok. Put Grok-only skills in <code>~/.grok/skills/</code> or <code>.grok/skills/</code>, and run <code>grok inspect</code> to see which skills, rules, hooks and MCP servers Grok found in the current folder. Grok-specific MCP servers go in <code>~/.grok/config.toml</code> under <code>[mcp_servers.*]</code> tables; Grok also reads <code>~/.claude.json</code> and project <code>.mcp.json</code> below that. To bring past work over, <code>grok import</code> imports Claude Code sessions and <code>/import-claude</code> opens a settings import screen. CodeAgentSwarm can install its task MCP for Grok the same way it does for other agents.' },
        { type: 'callout', variant: 'tip', content: 'See also <a href="/en/guides/share-skills-between-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">sharing skills between agents</a> for the multi-CLI pattern.' },
      ],
    },
    {
      id: 'both',
      title: 'Run both, do not force a cutover',
      content: [
        { type: 'paragraph', text: 'Most teams should not migrate every workflow on day one. Use Grok Build with Grok 4.7, its default model, for exploratory tasks while Claude Code keeps the critical path, then widen from measured results. CodeAgentSwarm is designed for that mix.' },
      ],
    },
  ],
  faq: [
    { question: 'Can Grok Build read CLAUDE.md?', answer: 'Yes. Grok Build reads CLAUDE.md, Claude.md, CLAUDE.local.md and .claude/rules/ alongside AGENTS.md in every folder from the repo root down to where you start it. Run grok inspect to see the exact files it loaded.' },
    { question: 'Where do Grok skills live?', answer: 'Grok-only skills go in ~/.grok/skills/ or a project .grok/skills/ folder. Grok also picks up Claude Code skills and ~/.agents/skills/ automatically.' },
    { question: 'Should I uninstall Claude Code?', answer: 'Usually no. Run both until you know which tasks prefer which agent.' },
  ],
}

export default guide
