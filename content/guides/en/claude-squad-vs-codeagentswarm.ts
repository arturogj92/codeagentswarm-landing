import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-squad-vs-codeagentswarm',
    locale: 'en',
    title: 'Claude Squad vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Claude Squad vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'Claude Squad manages parallel AI agents inside your terminal. CodeAgentSwarm is a desktop app for the same job. Honest comparison, written by us, verified July 2026.',
    intro: `Claude Squad manages several AI coding agents inside your terminal. CodeAgentSwarm gives that same parallelism a desktop interface, with notifications, searchable history across agents and a kanban board the agents update themselves.

Full disclosure before you read another line: we build CodeAgentSwarm. That is exactly why this page states where Claude Squad is the better pick and lists our own limits out loud (closed source, macOS and Windows only, no mobile app, still in beta, and you bring your own agent subscriptions). Both tools are judged on the same criteria, and every third-party fact here was checked on July 26, 2026 against the vendor own site, their public README and public GitHub data.

Short version: if you live in the terminal, work over SSH on remote machines and want AGPL open source, Claude Squad fits you better. If you want a desktop window with notifications, cross-agent history, live diffs and seven agent vendors in one place, that is what we built.`,
    ctaText: 'If you want the same parallel agents but with a desktop window, notifications and a searchable history across every agent, download CodeAgentSwarm and try it next to Claude Squad.',
    ctaAgent: 'comparison',
    highlightedWords: ['Claude Squad', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'claude-squad-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Squad manages multiple AI coding agents inside your terminal, while CodeAgentSwarm gives the same parallelism a desktop app with notifications, searchable conversation history across agents and a kanban board.',
        },
        {
          type: 'paragraph',
          text: 'Everything else follows from that. One is a terminal application you run with a keystroke over SSH, the other is a window you keep open on a second monitor. If you want the wider category view first, read <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">the best tools to run multiple AI coding agents</a>, and the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> guide explains the workflow itself.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'We make CodeAgentSwarm, so treat this as an interested comparison and check the claims yourself. All third-party facts on this page were verified on July 26, 2026 against the vendor own site, their public README and public GitHub data. Where something is not documented publicly, we say so instead of guessing.',
        },
      ],
    },
    {
      id: 'what-is-claude-squad',
      title: 'What Claude Squad is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://smtg-ai.github.io/claude-squad/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad</a> is a terminal application that manages multiple AI terminal agents. The <a href="https://github.com/smtg-ai/claude-squad" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">smtg-ai/claude-squad</a> repository describes it as a way to manage agents like Claude Code, Codex, OpenCode and Amp, and its README adds Gemini and other local agents such as Aider, launched per session with the program flag or a named profile.',
        },
        {
          type: 'paragraph',
          text: 'The README documents how it works under the hood: tmux to create an isolated terminal session for each agent, git worktrees so each session works on its own branch, and a text UI to move between them. You install it with Homebrew or a shell script, it lands as the <code>cs</code> binary, and tmux plus the GitHub CLI are listed as prerequisites.',
        },
        {
          type: 'list',
          items: [
            'Open source under AGPL-3.0, roughly 8,200 stars on GitHub (8,186 on July 26, 2026)',
            'Last public commit on June 17, 2026',
            'One tmux session and one git worktree per task, so branches never collide',
            'A diff tab to review changes, plus keys to commit, push, pause and resume a session',
            'A background auto-accept mode (the autoyes flag) for agents that keep asking for confirmation',
            'Free, with no account and no server component',
          ],
        },
        {
          type: 'paragraph',
          text: 'That is a genuinely good design for people who already work in the terminal. There is nothing to install beyond a binary, it runs on the machine where your code lives, and the whole thing is auditable because the source is public.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS and Windows, each terminal inside it is a real agent process, and you choose the agent per terminal: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build or Cursor Agent.',
        },
        {
          type: 'image',
          alt: 'Three separate AI coding agents running as independent terminals side by side in one CodeAgentSwarm window',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'CodeAgentSwarm runs several agent CLIs at once in one window, each terminal its own process and its own conversation.',
        },
        {
          type: 'list',
          items: [
            'Desktop notifications when an agent finishes or stops to ask you something',
            'Searchable conversation history across all seven agents and capability-aware resume from any entry',
            'Per-terminal live file diffs, so you see what each agent is touching while it works',
            'Permission control, including a Turbo mode for the operations you are happy to auto-approve',
            'A kanban task board the agents update themselves over MCP',
            'Git worktrees per session, multi-project switching, AI commit messages and a provider quota indicator',
            'Skills and MCP marketplaces shared across the agents you run',
          ],
        },
        {
          type: 'paragraph',
          text: 'Our honest limits: the app is closed source with no public repository, it ships for macOS and Windows only, there is no mobile app, it is still in beta (free with Pro included during that period), and it is not a model provider, so you bring your own Claude, OpenAI or other subscriptions.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'table',
          headers: ['', 'Claude Squad', 'CodeAgentSwarm'],
          rows: [
            ['Platforms', 'Terminal environments with tmux and the GitHub CLI installed, via Homebrew or a shell script. A native Windows install is not documented on their site as of July 26, 2026', 'Desktop app for macOS and Windows'],
            ['Interface', 'Terminal UI, keyboard driven', 'Graphical desktop workspace with terminal panes'],
            ['Supported agents', 'Claude Code, Codex, Gemini, Amp, OpenCode and other local agents such as Aider, set per session', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent'],
            ['Isolation model', 'A tmux session plus a git worktree per task, one branch each', 'A separate process per terminal, with optional git worktrees per session'],
            ['Notifications', 'Not documented on their site as of July 26, 2026', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Sessions can be paused and resumed in the app. A searchable history across agents is not documented on their site as of July 26, 2026', 'Searchable history across all seven agents and capability-aware resume'],
            ['Task management', 'Session list with per-session state. A kanban board is not documented on their site as of July 26, 2026', 'Kanban board that the agents update over MCP'],
            ['Open source', 'Yes, AGPL-3.0', 'No, closed source with no public app repository'],
            ['Price', 'Free', 'Free during beta with Pro included, and you bring your own agent subscriptions'],
            ['Last public commit (verified Jul 26, 2026)', 'June 17, 2026', 'Closed source, no public repo'],
          ],
          caption: 'Verified on July 26, 2026 from the Claude Squad site, its public README and GitHub. Empty claims about missing features are avoided on purpose: where their documentation says nothing, this table says nothing.',
        },
      ],
    },
    {
      id: 'when-claude-squad',
      title: 'When Claude Squad is the better choice',
      content: [
        {
          type: 'paragraph',
          text: 'These are real advantages, not polite concessions. If any of them describe you, Claude Squad wins and you should use it.',
        },
        {
          type: 'list',
          items: [
            '<strong>You work on remote machines.</strong> Claude Squad runs where your code runs. Over SSH on a dev box, a VPS or a Linux workstation, a terminal app is the right shape and a desktop GUI simply is not there.',
            '<strong>You want open source.</strong> AGPL-3.0, public repository, roughly 8,200 stars. You can read every line, fork it and audit what it does with your code. CodeAgentSwarm cannot offer that.',
            '<strong>You want Linux.</strong> CodeAgentSwarm ships for macOS and Windows only. If your daily machine is Linux, Claude Squad is available to you and we are not.',
            '<strong>You already live in tmux.</strong> If your muscle memory is keyboard-first and you resent switching to a mouse, a TUI with single-key session management will feel faster than any window.',
            '<strong>You want zero install weight.</strong> One binary, no account, no updater, no packaged desktop runtime.',
            '<strong>You want Aider or another local agent.</strong> Its program flag launches any local agent command, which is broader than our fixed list of seven.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'When CodeAgentSwarm is the better choice',
      content: [
        {
          type: 'list',
          items: [
            '<strong>You want to be told, not to check.</strong> Desktop notifications fire when an agent finishes or needs input, so you can go do something else instead of watching a pane.',
            '<strong>You run seven vendors.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent are all supported directly. Antigravity, Kimi and Grok Build are not listed among the agents in the Claude Squad README as of July 26, 2026.',
            '<strong>You want history you can search.</strong> Every conversation from every agent is searchable in one place, and you can resume any of them where you left it.',
            '<strong>You want to watch the diffs live.</strong> Per-terminal file diffs update as the agent edits, so overlapping work is visible early rather than at review time.',
            '<strong>You want the work tracked.</strong> The kanban board is updated by the agents themselves over MCP, so the board reflects what actually happened.',
            '<strong>You are on Windows.</strong> CodeAgentSwarm is a first-class Windows app, while a native Windows install for Claude Squad is not documented on their site as of July 26, 2026.',
            '<strong>You keep hitting plan limits.</strong> The quota indicator shows how much of your provider allowance is left before an agent stalls mid-task.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'A fair way to decide: if you would rather press a key than click, pick Claude Squad. If you would rather be interrupted by a notification than remember to look, pick CodeAgentSwarm.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Using both',
      content: [
        {
          type: 'paragraph',
          text: 'They do not conflict. A common split is Claude Squad on the remote box, where a terminal app is the only sensible option, and CodeAgentSwarm on the laptop for the projects you are actively supervising. Both use git worktrees, so the branch layout stays familiar either way.',
        },
        {
          type: 'paragraph',
          text: 'If you are weighing up more than these two, the <a href="/en/guides/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban comparison</a> covers the kanban-first approach to the same problem, and <a href="/en/guides/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst, formerly Crystal</a>, covers the visual editor approach.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Claude Squad open source?',
      answer: 'Yes. Claude Squad is published at github.com/smtg-ai/claude-squad under the AGPL-3.0 license, with roughly 8,200 stars (8,186 when verified on July 26, 2026). CodeAgentSwarm is closed source and has no public application repository, which is a real point in Claude Squad favour if auditability or forking matters to you.',
    },
    {
      question: 'Is Claude Squad still maintained?',
      answer: 'Its last public commit on the default branch was June 17, 2026, verified on July 26, 2026, so a little over a month before this page was written. That is a fact, not a verdict: many stable terminal tools go quiet for weeks at a time. Check the repository yourself before you build a workflow on it.',
    },
    {
      question: 'Does Claude Squad support Antigravity CLI or Kimi Code?',
      answer: 'Neither is listed among its supported agents in the Claude Squad README as of July 26, 2026, which names Claude Code, Codex, Gemini, Amp, OpenCode and other local agents such as Aider. Its program flag does launch an arbitrary local command, so pointing it at another CLI may work, but it is not documented. CodeAgentSwarm supports Antigravity CLI and Kimi Code directly, alongside Claude Code, Codex CLI and OpenCode.',
    },
    {
      question: 'Do I need to know tmux to use Claude Squad?',
      answer: 'Its README lists tmux and the GitHub CLI as prerequisites and explains that tmux is what creates the isolated session per agent, with git worktrees isolating the code. You do not need to be a tmux expert, because the text UI creates and switches sessions for you with single keys, but you do need tmux installed and you should be comfortable working in a terminal. CodeAgentSwarm handles the equivalent isolation inside a desktop app instead.',
    },
  ],
}

export default guide
