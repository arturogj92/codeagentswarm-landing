import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-vs-claude-code',
    locale: 'en',
    title: 'Cursor CLI vs Claude Code: Which Fits Your Workflow?',
    metaTitle: 'Cursor CLI vs Claude Code: Practical Comparison (2026)',
    metaDescription: 'Compare Cursor CLI, Cursor IDE and Claude Code by interface, account, project setup and multi-agent workflow. Choose based on how your team works.',
    intro: `Cursor CLI and Claude Code are terminal coding agents from different providers. Both can inspect a project, use tools and help complete coding tasks, but they belong to different account, model and configuration ecosystems.

There is a second distinction that matters. <strong>Cursor IDE</strong> is the editor. <strong>Cursor Agent CLI</strong> is Cursor's beta command-line agent, launched with <code>cursor-agent</code>. <strong>Claude Code</strong> is Anthropic's terminal coding agent. This guide compares the two CLIs and explains where the Cursor editor fits.`,
    ctaText: 'Run Cursor Agent and Claude Code in the same CodeAgentSwarm workspace, then choose the agent that fits each task.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Claude Code'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-cli-vs-claude-code',
  },
  sections: [
    {
      id: 'quick-comparison',
      title: 'Cursor CLI vs Claude Code at a glance',
      content: [
        { type: 'table', headers: ['Question', 'Cursor Agent CLI', 'Claude Code'], rows: [
          ['Provider', 'Cursor', 'Anthropic'],
          ['Command', 'cursor-agent', 'claude'],
          ['Account and usage', 'Cursor account or CURSOR_API_KEY', 'Anthropic account or supported API setup'],
          ['Project configuration', 'Cursor configuration, including .cursor/mcp.json', 'Claude Code configuration'],
          ['CodeAgentSwarm use', 'ACP Chat plus terminal workflows', 'Supported agent workflows in the same workspace'],
        ], caption: 'The practical distinction starts with the provider ecosystem you already use.' },
        { type: 'paragraph', text: 'Neither column is a universal winner. Cursor CLI is the direct fit when your projects and subscription already live in Cursor. Claude Code is the direct fit when your team is built around Anthropic and Claude Code configuration.' },
      ],
    },
    {
      id: 'cursor-ide-vs-cli',
      title: 'Cursor IDE and Cursor CLI are different interfaces',
      content: [
        { type: 'paragraph', text: 'Cursor IDE gives you an editor interface. Cursor Agent CLI brings the Cursor agent to a terminal process. They can belong to the same Cursor account and project ecosystem, but installing the editor should not be confused with invoking <code>cursor-agent</code>.' },
        { type: 'paragraph', text: 'CodeAgentSwarm integrates the CLI through the official ACP command <code>cursor-agent acp</code>. It does not automate the Cursor editor. The <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent ACP setup guide</a> covers the exact integration.' },
      ],
    },
    {
      id: 'accounts-and-cost',
      title: 'Compare the account and usage you already pay for',
      content: [
        { type: 'paragraph', text: 'Cursor CLI authenticates with <code>cursor-agent login</code> or <code>CURSOR_API_KEY</code> and consumes your Cursor subscription or usage. Claude Code can use an Anthropic account or a supported API, cloud or gateway setup; usage follows the route your organization configures.' },
        { type: 'paragraph', text: 'That separation can guide the choice more than a feature checklist. If your organization already manages one provider, adding another introduces another account, policy and usage pool. If you use both, the separate pools can also let you route tasks according to availability and preference.' },
        { type: 'paragraph', text: 'For current Cursor plan facts, see <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI pricing and usage</a>. Prices and included usage can change, so verify both providers before making a purchasing decision.' },
      ],
    },
    {
      id: 'workflow-and-configuration',
      title: 'Choose the project workflow that needs less translation',
      content: [
        { type: 'paragraph', text: 'Cursor Agent uses Cursor project and user configuration. In CodeAgentSwarm, MCP servers from <code>.cursor/mcp.json</code> are passed through ACP. Cursor sessions can expose Agent, Plan and Ask modes, model choices and image support.' },
        { type: 'paragraph', text: 'Claude Code has its own project conventions and tools. A team with mature instructions for one agent may get better results by preserving that setup instead of translating every rule immediately.' },
        { type: 'callout', variant: 'tip', content: 'Test both agents on a representative task from your repository. Compare the review burden, permission flow and final change, not only the first response.' },
      ],
    },
    {
      id: 'parallel-use',
      title: 'Use Cursor CLI and Claude Code together',
      content: [
        { type: 'paragraph', text: 'The tools do not have to be an exclusive choice. CodeAgentSwarm lets you select an agent per session, so Cursor can investigate one task while Claude Code handles another.' },
        { type: 'paragraph', text: 'Keep responsibilities separate and review the work before integration. The <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent swarm guide</a> shows how to divide parallel tasks without sending agents into the same lines.' },
        { type: 'paragraph', text: 'Conversation continuity also differs by provider and version. Read the <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI history guide</a> before relying on ACP resume in an older Cursor installation.' },
      ],
    },
    {
      id: 'decision',
      title: 'A practical way to choose',
      content: [
        { type: 'list', items: ['Choose Cursor CLI when you want the Cursor account, configuration and models in a terminal workflow.', 'Choose Claude Code when your existing projects, policies and usage already center on Anthropic.', 'Use Cursor IDE when the editor interface itself is part of the requirement.', 'Use both when separate tasks benefit from different providers and your team can review the parallel output.'] },
        { type: 'paragraph', text: 'The best fit depends on the repository, team rules, subscription and type of task. A small trial on real work will tell you more than a generic benchmark.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Cursor CLI the same as Cursor IDE?', answer: 'No. Cursor IDE is the editor, while Cursor Agent CLI is the beta command-line agent invoked with cursor-agent. They share the Cursor ecosystem but provide different interfaces.' },
    { question: 'Is Cursor CLI better than Claude Code?', answer: 'There is no universal winner. Cursor CLI fits Cursor accounts and project configuration, while Claude Code fits Anthropic workflows. Test both on the work your team actually performs.' },
    { question: 'Can I run Cursor CLI and Claude Code at the same time?', answer: 'Yes. CodeAgentSwarm can run separate Cursor Agent and Claude Code sessions in one workspace. Assign distinct tasks and review their changes before integration.' },
    { question: 'Does Cursor CLI use my Cursor subscription?', answer: 'Yes. Cursor Agent authenticates with your Cursor login or CURSOR_API_KEY and consumes Cursor subscription or usage.' },
    { question: 'Does Cursor CLI use .cursor/mcp.json?', answer: 'Yes. CodeAgentSwarm respects user and project MCP configuration from .cursor/mcp.json when it starts Cursor through ACP.' },
  ],
}

export default guide
