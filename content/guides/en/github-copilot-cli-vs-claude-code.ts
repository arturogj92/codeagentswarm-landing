import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-vs-claude-code',
    locale: 'en',
    title: 'GitHub Copilot CLI vs Claude Code: Which One to Use',
    metaTitle: 'GitHub Copilot CLI vs Claude Code: Pricing, Models, Setup',
    metaDescription: 'Compare GitHub Copilot CLI and Claude Code on pricing, models, permissions, MCP, instruction files and resume, plus where Gemini CLI and Codex CLI fit in.',
    intro: 'GitHub Copilot CLI and Claude Code are both terminal agents that read your project, edit files and run commands. They differ in how you pay, which models you get and where they keep their settings. This guide compares them point by point, with a short look at Gemini CLI and Codex CLI. Claude Code, Gemini CLI and Codex CLI facts were checked against their official docs on October 8, 2026.',
    ctaText: 'Run GitHub Copilot CLI and Claude Code side by side in CodeAgentSwarm and give each one the task that suits it.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-vs-claude-code',
    relatedSlug: 'how-to-use-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'at-a-glance',
      title: 'GitHub Copilot CLI vs Claude Code at a glance',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: `GitHub Copilot CLI is the <code>copilot</code> command from GitHub. Claude Code is the <code>claude</code> command from Anthropic. If you have not installed Copilot yet, start with ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
        },
        {
          type: 'table',
          headers: ['Question', 'GitHub Copilot CLI', 'Claude Code'],
          rows: [
            ['Command', '<code>copilot</code>', '<code>claude</code>'],
            ['How you pay', 'Monthly AI credits from a GitHub Copilot plan', 'Claude subscription, Claude Console (API billing) or a cloud provider'],
            ['Models', 'Claude, GPT, Gemini, Grok and others, depending on plan and policy', 'Claude models'],
            ['Personal instructions', '<code>~/.copilot/copilot-instructions.md</code>', '<code>~/.claude/CLAUDE.md</code>'],
            ['Project instructions', '<code>AGENTS.md</code> and related files', '<code>CLAUDE.md</code>, or <code>AGENTS.md</code> when there is no <code>CLAUDE.md</code>'],
            ['Resume', '<code>copilot --resume</code> or <code>--continue</code>', '<code>claude --resume</code> or <code>--continue</code>'],
            ['ACP server', '<code>copilot --acp --stdio</code> (public preview)', 'Not described in the official docs'],
          ],
          caption: 'Checked on October 8, 2026 against GitHub Copilot CLI 1.0.93 and the official Claude Code docs.',
        },
        {
          type: 'paragraph',
          text: 'Neither tool wins in every case. Copilot CLI fits when your team already pays for GitHub Copilot and wants to switch between model vendors. Claude Code fits when your work and your rules already live around Anthropic and <code>CLAUDE.md</code>.',
        },
      ],
    },
    {
      id: 'pricing',
      title: 'Pricing: AI credits vs a Claude subscription',
      content: [
        {
          type: 'paragraph',
          text: `Copilot CLI spends the AI credits of your GitHub Copilot plan. Pro costs $10 per month with 1,500 credits, Pro+ $39 with 7,000 and Max $100 with 20,000. Copilot Free has no AI credits: the CLI runs with automatic model selection inside a limited monthly Chat allowance. Credits reset at 00:00 UTC on the 1st of each month, unused credits are lost, and extra usage costs $0.01 per credit if you set a budget. Source: ${link('https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals', 'GitHub billing for individuals')}, checked October 8, 2026. The full breakdown is in ${link('/en/guides/github-copilot-cli-models-ai-credits', 'GitHub Copilot CLI models and AI credits')}.`,
        },
        {
          type: 'paragraph',
          text: `Claude Code signs in with a Claude Pro or Max subscription, a Claude for Teams or Enterprise seat, a Claude Console account billed through the API, or a cloud provider such as Amazon Bedrock, Google Cloud's Agent Platform or Microsoft Foundry. Source: ${link('https://code.claude.com/docs/en/authentication', 'Claude Code authentication docs')}, checked October 8, 2026. Plan details are in ${link('/en/guides/claude-code-plans-and-pricing', 'Claude Code plans and pricing')}.`,
        },
        {
          type: 'image',
          src: '/images/guides/copilot-usage-panel.webp',
          alt: 'GitHub Copilot CLI monthly allowance in the CodeAgentSwarm usage panel',
          caption: 'Real interface from a CodeAgentSwarm development build. The 7% left shown here is a test fixture, not a real account.',
          size: 'medium',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'The two pools are separate. Running out of Copilot credits does not touch your Claude usage, and the other way round.',
        },
      ],
    },
    {
      id: 'models',
      title: 'Models: one vendor or several',
      content: [
        {
          type: 'paragraph',
          text: `Copilot CLI routes requests to models from several providers. On October 8, 2026, ${link('https://docs.github.com/en/copilot/reference/ai-models/supported-models', 'GitHub\'s supported models page')} listed Anthropic Claude, OpenAI GPT, Google Gemini, xAI Grok, Moonshot AI Kimi and Microsoft MAI models as available in Copilot CLI. What you see depends on your plan and your organization's policy. Pick one with <code>--model</code> or <code>/model</code>, or use <code>auto</code> and let Copilot choose.`,
        },
        {
          type: 'paragraph',
          text: `Claude Code runs Claude models. You choose one with <code>--model</code> and an alias such as <code>sonnet</code>, <code>opus</code> or <code>haiku</code>, or a full model name, and set the effort level with <code>--effort</code>. Source: ${link('https://code.claude.com/docs/en/cli-reference', 'Claude Code CLI reference')}, checked October 8, 2026. In Copilot CLI, reasoning effort is a launch option, <code>--reasoning-effort</code>.`,
        },
      ],
    },
    {
      id: 'permissions',
      title: 'Permissions and approval modes',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot CLI asks before it acts, and file access starts limited to the current folder, its subfolders and the system temp folder. You can allow or deny tools by pattern with <code>--allow-tool</code> and <code>--deny-tool</code>, for example <code>shell(git:*)</code>. A deny rule always wins, even over <code>--allow-all</code>. <code>--yolo</code> equals allowing all tools, paths and URLs. Copilot also has Plan and Autopilot modes.',
        },
        {
          type: 'paragraph',
          text: `Claude Code uses permission modes that you cycle with Shift+Tab or set with <code>--permission-mode</code>: Manual (<code>default</code>), <code>acceptEdits</code>, <code>plan</code>, <code>auto</code>, <code>dontAsk</code> and <code>bypassPermissions</code>. Deny rules block in every mode, including <code>bypassPermissions</code>. Source: ${link('https://code.claude.com/docs/en/permission-modes', 'Claude Code permission modes')}, checked October 8, 2026.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `Skipping every prompt is risky in both tools. Read ${link('/en/guides/github-copilot-cli-yolo-mode', 'GitHub Copilot CLI yolo mode')} and ${link('/en/guides/claude-code-yolo-mode-explained', 'Claude Code yolo mode explained')} before you turn it on.`,
        },
      ],
    },
    {
      id: 'mcp-instructions',
      title: 'MCP, instruction files and skills',
      content: [
        {
          type: 'table',
          headers: ['What', 'GitHub Copilot CLI', 'Claude Code'],
          rows: [
            ['User MCP servers', '<code>~/.copilot/mcp-config.json</code>', '<code>~/.claude.json</code> (user or local scope)'],
            ['Project MCP servers', '<code>.mcp.json</code> or <code>.github/mcp.json</code>', '<code>.mcp.json</code> in the project root'],
            ['Add a server', '<code>copilot mcp add</code>', '<code>claude mcp add</code>'],
            ['Personal instructions', '<code>~/.copilot/copilot-instructions.md</code>', '<code>~/.claude/CLAUDE.md</code>'],
            ['Project instructions', '<code>AGENTS.md</code> and related files from the git root and current folder', '<code>./CLAUDE.md</code> or <code>./.claude/CLAUDE.md</code>'],
            ['Project skills', '<code>.github/skills/</code>, <code>.agents/skills/</code> or <code>.claude/skills/</code>', '<code>.claude/skills/</code>'],
          ],
          caption: 'Claude Code paths from the official MCP and memory docs, checked October 8, 2026.',
        },
        {
          type: 'paragraph',
          text: `Some files carry over. Copilot reads skills from <code>.claude/skills/</code>, and both tools look for a project <code>.mcp.json</code>. Claude Code reads <code>AGENTS.md</code> only when there is no <code>CLAUDE.md</code> in the folder or above it, and only from version 2.1.277. A home <code>AGENTS.md</code> is not loaded by Copilot. Sources: ${link('https://code.claude.com/docs/en/memory', 'Claude Code memory docs')} and ${link('https://code.claude.com/docs/en/mcp', 'Claude Code MCP docs')}. More on Copilot's side in ${link('/en/guides/github-copilot-cli-mcp-history', 'GitHub Copilot CLI MCP and history')}.`,
        },
      ],
    },
    {
      id: 'history-acp',
      title: 'History, resume and ACP',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot keeps each session in <code>~/.copilot/session-state/&lt;id&gt;/</code>. Resume with <code>copilot --resume</code> and an id, name or prefix, or take the latest with <code>--continue</code>.',
        },
        {
          type: 'paragraph',
          text: `Claude Code stores transcripts as JSONL in <code>~/.claude/projects/&lt;project&gt;/</code> and keeps them for 30 days unless you change <code>cleanupPeriodDays</code>. <code>claude --continue</code> reopens the latest conversation in the folder and <code>claude --resume</code> opens a picker or takes an id or name. Source: ${link('https://code.claude.com/docs/en/sessions', 'Claude Code session docs')}, checked October 8, 2026.`,
        },
        {
          type: 'paragraph',
          text: `The Agent Client Protocol (ACP) lets another app drive an agent over a standard channel. Copilot CLI has an ACP server, <code>copilot --acp --stdio</code>, which GitHub labels a ${link('https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server', 'public preview')}. Commands that need a picker, such as <code>/login</code>, <code>/resume</code> and <code>/diff</code>, are not available over ACP. We found no ACP server mode in the official Claude Code docs on October 8, 2026; for scripts, Claude Code offers <code>claude -p</code> with JSON output and the Agent SDK.`,
        },
      ],
    },
    {
      id: 'gemini-codex',
      title: 'Where Gemini CLI and Codex CLI fit',
      content: [
        { type: 'heading', level: 3, text: 'Copilot CLI vs Gemini CLI', id: 'copilot-cli-vs-gemini-cli' },
        {
          type: 'paragraph',
          text: `Gemini CLI is Google's terminal agent, installed with <code>npm install -g @google/gemini-cli</code>. It reads <code>GEMINI.md</code> files, and the <code>context.fileName</code> setting can add <code>AGENTS.md</code>. MCP servers go in <code>~/.gemini/settings.json</code>, <code>gemini --resume</code> reopens a session, and <code>gemini --acp</code> starts ACP mode. The official docs note that for unpaid tier and Google One users, Gemini CLI was replaced by Antigravity CLI on June 18, 2026. Sources: ${link('https://geminicli.com/docs/', 'Gemini CLI docs')} and ${link('https://github.com/google-gemini/gemini-cli', 'the Gemini CLI repository')}, checked October 8, 2026. See ${link('/en/guides/antigravity-cli-vs-gemini-cli', 'Antigravity CLI vs Gemini CLI')} for that change.`,
        },
        { type: 'heading', level: 3, text: 'Copilot CLI vs Codex CLI', id: 'copilot-cli-vs-codex-cli' },
        {
          type: 'paragraph',
          text: `Codex CLI is OpenAI's terminal agent. It signs in with a ChatGPT account or with an OpenAI API key billed at API rates, and OpenAI's pricing page lists the CLI on plans from Plus up. It reads <code>AGENTS.md</code> from <code>~/.codex</code> and from the project, stores MCP servers in <code>~/.codex/config.toml</code> (added with <code>codex mcp add</code>) and reopens chats with <code>codex resume</code>. We found no ACP server mode in its official docs. Sources: ${link('https://learn.chatgpt.com/docs/codex/cli', 'Codex CLI docs')}, ${link('https://learn.chatgpt.com/docs/pricing', 'Codex pricing')} and ${link('https://learn.chatgpt.com/docs/extend/mcp', 'Codex MCP docs')}, checked October 8, 2026. Plan details are in ${link('/en/guides/codex-plans-and-pricing', 'Codex plans and pricing')}.`,
        },
        {
          type: 'paragraph',
          text: 'The main difference stays the same as with Claude Code: Copilot CLI lets one GitHub plan reach models from several vendors, while Gemini CLI and Codex CLI each center on their own provider.',
        },
      ],
    },
    {
      id: 'side-by-side',
      title: 'Run Copilot CLI and Claude Code side by side in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'You do not have to pick one. CodeAgentSwarm lets you choose the agent per session, so Copilot can take one task while Claude Code works on another, each in its own project or git worktree. Every session shows its own status and sends its own notifications.',
        },
        {
          type: 'image',
          src: '/images/guides/workspace-list.webp',
          alt: 'CodeAgentSwarm List workspace with several agent sessions',
          caption: 'Real CodeAgentSwarm interface with sample sessions.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            'Install Copilot from the agent picker or Settings > Providers. The app downloads the official release, checks its SHA-256 and installs it, or uses your npm, Homebrew or WinGet copy.',
            'Sign in from Chat with a device code. Chat runs Copilot over ACP with model choice, Agent, Plan and Autopilot modes, and permission requests.',
            'Conversation History lists Copilot and Claude Code sessions together, filtered by agent and project, and reopens them in Chat or the terminal.',
            'The usage panel shows Copilot\'s monthly allowance next to your other agents.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: `GitHub Copilot CLI support arrives in the CodeAgentSwarm release after 2.4.3. With Copilot, Chat has no reasoning selector and the app cannot generate conversation titles or commit messages, so pick another provider for those, such as Claude Code (see ${link('/en/guides/ai-commit-messages-claude-code', 'AI commit messages with Claude Code')}). To split work between parallel sessions, read ${link('/en/guides/github-copilot-cli-agent-swarm', 'the GitHub Copilot CLI agent swarm guide')}.`,
        },
      ],
    },
    {
      id: 'decision',
      title: 'How to choose',
      content: [
        {
          type: 'list',
          items: [
            'Choose Copilot CLI if your team already pays for GitHub Copilot or wants Claude, GPT and other models under one plan.',
            'Choose Claude Code if your projects already use <code>CLAUDE.md</code>, Claude Code skills and Anthropic billing.',
            'Choose Codex CLI if you already have a ChatGPT plan, and look at Antigravity CLI if you used Gemini CLI on the free tier.',
            'Use more than one when separate tasks fit different tools and you can review the parallel output.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Try each tool on a real task from your repository. Compare the permission flow, the review work and the final diff, not just the first answer.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is GitHub Copilot CLI the same as Claude Code?',
      answer: 'No. Copilot CLI is GitHub\'s agent and spends GitHub Copilot AI credits across models from several providers. Claude Code is Anthropic\'s agent and runs Claude models under a Claude subscription, Console account or cloud provider.',
    },
    {
      question: 'Can GitHub Copilot CLI use Claude models?',
      answer: 'Yes. GitHub\'s supported models page lists Claude models as available in Copilot CLI. Which ones you see depends on your Copilot plan and your organization\'s policy, and they spend Copilot AI credits, not Claude usage.',
    },
    {
      question: 'Does Copilot CLI read CLAUDE.md?',
      answer: 'Yes, from the repository, alongside AGENTS.md and GEMINI.md. Personal instructions go in ~/.copilot/copilot-instructions.md. It does read skills from .claude/skills/. If you want one shared file, AGENTS.md works in Copilot, Codex and in Claude Code when no CLAUDE.md is present.',
    },
    {
      question: 'Which one supports ACP?',
      answer: 'Copilot CLI has an ACP server, copilot --acp --stdio, in public preview. Gemini CLI has gemini --acp. We found no ACP server mode in the official Claude Code or Codex docs on October 8, 2026.',
    },
    {
      question: 'Can I run Copilot CLI and Claude Code at the same time?',
      answer: 'Yes. In CodeAgentSwarm you pick the agent per session and run them side by side, each in its own project or worktree. Copilot support arrives in the release after 2.4.3.',
    },
  ],
}

export default guide
