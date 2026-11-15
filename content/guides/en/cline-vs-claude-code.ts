import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'cline-vs-claude-code',
    locale: 'en',
    title: 'Cline vs Claude Code: which CLI agent to use',
    metaTitle: 'Cline vs Claude Code: Pricing, Models and CLI Compared',
    metaDescription: 'Cline CLI vs Claude Code compared on pricing, models, rules files, permissions, MCP and resume, and how to run both side by side in one workspace.',
    intro: 'Cline and Claude Code are both coding agents you run from a terminal. Claude Code is Anthropic\'s agent for Claude models. Cline is an open source agent that works with many model providers, and its CLI is the <code>cline</code> command. This page compares the two CLIs point by point. Cline facts were checked against its official docs on October 31, 2026; Claude Code facts come from Anthropic\'s docs, checked October 8, 2026.',
    ctaText: 'You do not have to choose: run Cline and Claude Code side by side in CodeAgentSwarm and give each the task that suits it.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline', 'Claude Code'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'cline-vs-claude-code',
    relatedSlug: 'how-to-use-cline-cli',
    socialImage: '/images/guides/cline-cli-og-en.png',
  },
  sections: [
    {
      id: 'at-a-glance',
      title: 'Cline vs Claude Code at a glance',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'table',
          headers: ['Question', 'Cline CLI', 'Claude Code'],
          rows: [
            ['Command', '<code>cline</code>', '<code>claude</code>'],
            ['How you pay', 'Cline provider billed by usage, a ClinePass subscription, or your own provider key', 'Claude subscription, Claude Console (API billing) or a cloud provider'],
            ['Models', 'Anthropic, OpenAI, Gemini, OpenRouter, Bedrock, Vertex, Groq, Cerebras and OpenAI-compatible endpoints', 'Claude models'],
            ['Project instructions', '<code>.clinerules/</code>, <code>.cline/rules/</code> or <code>AGENTS.md</code>', '<code>CLAUDE.md</code>, or <code>AGENTS.md</code> when there is no <code>CLAUDE.md</code>'],
            ['Resume', '<code>cline --id &lt;id&gt;</code> or <code>cline history</code>', '<code>claude --resume</code> or <code>--continue</code>'],
            ['ACP server', '<code>cline --acp</code>', 'Not described in the official docs'],
          ],
          caption: 'Cline: CLI reference, rules and installation docs, checked October 31, 2026. Claude Code: official docs, checked October 8, 2026.',
        },
        {
          type: 'paragraph',
          text: 'Short version: pick Cline when you want to choose the model vendor yourself, or already use the Cline extension in your editor. Pick Claude Code when you already pay for Claude and your project rules live in <code>CLAUDE.md</code>.',
        },
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing: pay per use or a Claude plan',
      content: [
        {
          type: 'paragraph',
          text: `Cline itself is free. You pay for inference: through the Cline provider, which bills by usage, through ClinePass, a flat monthly subscription, or with your own key at the provider's own prices. Source: ${link('https://docs.cline.bot/cline-cli/installation', 'Cline installation docs')} and ${link('https://cline.bot/pricing', 'Cline pricing')}, checked October 31, 2026.`,
        },
        {
          type: 'paragraph',
          text: `Claude Code signs in with a Claude Pro or Max subscription, a Claude for Teams or Enterprise seat, a Claude Console account billed through the API, or a cloud provider such as Amazon Bedrock. Source: ${link('https://code.claude.com/docs/en/authentication', 'Claude Code authentication docs')}, checked October 8, 2026. Plan details are in ${link('/en/guides/claude-code-plans-and-pricing', 'Claude Code plans and pricing')}.`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'The two are not exclusive. Cline can use your Anthropic API key and run Claude models, but that bills the API, not your Claude Pro or Max plan.',
        },
      ],
    },
    {
      id: 'models',
      title: 'Models: one vendor or many',
      content: [
        {
          type: 'paragraph',
          text: 'Cline routes to whichever provider you connect with <code>cline auth</code>, and you switch per run with <code>-P</code> (provider) and <code>-m</code> (model). Reasoning effort is <code>--thinking</code>, from none to xhigh. That makes Cline a good fit for trying an open model on one task and a frontier model on the next.',
        },
        {
          type: 'paragraph',
          text: `Claude Code runs Claude models. You pick one with <code>--model</code> and an alias such as <code>sonnet</code>, <code>opus</code> or <code>haiku</code>, and set effort with <code>--effort</code>. Source: ${link('https://code.claude.com/docs/en/cli-reference', 'Claude Code CLI reference')}, checked October 8, 2026.`,
        },
      ],
    },
    {
      id: 'permissions',
      title: 'Permissions and plan mode',
      content: [
        {
          type: 'paragraph',
          text: 'Cline has two modes, plan and act, and a single switch for tool approval, <code>--auto-approve</code>. The CLI reference lists it as on by default, and off in ACP mode. Pass <code>--auto-approve false</code> if you want to review each tool call in the terminal.',
        },
        {
          type: 'paragraph',
          text: `Claude Code has more modes: Manual (<code>default</code>), <code>acceptEdits</code>, <code>plan</code>, <code>auto</code>, <code>dontAsk</code> and <code>bypassPermissions</code>, which you cycle with Shift+Tab or set with <code>--permission-mode</code>. Source: ${link('https://code.claude.com/docs/en/permission-modes', 'Claude Code permission modes')}, checked October 8, 2026.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `Skipping every prompt is risky in both tools. Before you turn it on, read ${link('/en/guides/claude-code-yolo-mode-explained', 'Claude Code yolo mode explained')}.`,
        },
      ],
    },
    {
      id: 'mcp-rules',
      title: 'MCP, rules and extras',
      content: [
        {
          type: 'table',
          headers: ['What', 'Cline CLI', 'Claude Code'],
          rows: [
            ['User MCP servers', '<code>~/.cline/data/settings/cline_mcp_settings.json</code>, managed with <code>cline mcp</code>', '<code>~/.claude.json</code>'],
            ['Global instructions', '<code>~/.cline/rules/</code>', '<code>~/.claude/CLAUDE.md</code>'],
            ['Skills', '<code>~/.cline/skills/</code> and <code>.cline/skills/</code>', '<code>~/.claude/skills/</code> and <code>.claude/skills/</code>'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Cline also bundles a few extras around the agent: <code>cline kanban</code> opens a board app, <code>cline schedule</code> runs agents on a cron, and <code>cline connect</code> links a session to Telegram, Slack, Discord and other chat apps.',
        },
      ],
    },
    {
      id: 'both',
      title: 'Run both in one workspace',
      content: [
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Cline selected in the CodeAgentSwarm agent picker next to other agents',
          caption: 'Real capture from the CodeAgentSwarm 2.5.0 release demo. Each session picks its own agent.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: `CodeAgentSwarm 2.5.0 adds Cline, in beta, to the agents it runs side by side. You choose the agent per session, so Cline can try a refactor on a cheaper model while Claude Code reviews another branch, each in its own folder or git worktree. Both show up in one ${link('/en/guides/cline-conversation-history', 'conversation history')} and one usage panel: Claude with its quota ring, Cline with its session spend.`,
        },
        {
          type: 'paragraph',
          text: `New to Cline? Start with ${link('/en/guides/how-to-use-cline-cli', 'how to install and use Cline CLI')}. To compare more agents, see ${link('/en/guides/github-copilot-cli-vs-claude-code', 'GitHub Copilot CLI vs Claude Code')} and ${link('/en/guides/cursor-cli-vs-claude-code', 'Cursor CLI vs Claude Code')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Cline better than Claude Code?',
      answer: 'Neither wins everywhere. Cline is open source and lets you pick any model provider. Claude Code is built around Claude models and a Claude subscription. Many people use both for different tasks.',
    },
    {
      question: 'What is the difference between Cline CLI and Claude Code?',
      answer: 'Both are terminal coding agents. Cline CLI works with many providers, reads .clinerules and AGENTS.md and resumes with cline --id. Claude Code runs Claude models, reads CLAUDE.md and resumes with claude --resume.',
    },
    {
      question: 'Can Cline use Claude models?',
      answer: 'Yes, through the Cline provider or your own Anthropic, Bedrock or Vertex credentials. That usage is billed by the API or provider, not by a Claude Pro or Max subscription.',
    },
    {
      question: 'Is Cline free?',
      answer: 'The agent is free and open source. You pay for the model through the Cline provider, a ClinePass subscription or your own provider key.',
    },
    {
      question: 'Can I run Cline and Claude Code at the same time?',
      answer: 'Yes. In CodeAgentSwarm 2.5.0 you pick the agent per session and run them side by side, each in its own folder or worktree. Cline support is in beta.',
    },
  ],
}

export default guide
