import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'conductor-vs-codeagentswarm',
    locale: 'en',
    title: 'Conductor vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Conductor vs CodeAgentSwarm: Honest Comparison (2026)',
    metaDescription: 'Compare Conductor local and cloud workspaces, four agent CLIs and current pricing with CodeAgentSwarm on macOS and Windows.',
    intro: `Conductor combines a macOS app with isolated cloud workspaces for Claude Code, Codex, Cursor and OpenCode. CodeAgentSwarm is a desktop workspace for macOS and Windows that runs seven agent CLIs in parallel terminals. Same premise, different deployment model.

Full disclosure: we build CodeAgentSwarm. Every third-party fact below was checked on August 25, 2026 against Conductor's site, pricing page and documentation.

Short version: choose Conductor for cloud sandboxes, multiplayer collaboration and its API. Choose CodeAgentSwarm for Windows, seven directly integrated CLIs, searchable cross-agent history and an agent-managed kanban board.`,
    ctaText: 'Need a parallel agent workspace that also runs on Windows, with seven agent CLIs instead of four? Download CodeAgentSwarm and set up your first batch of parallel terminals.',
    ctaAgent: 'comparison',
    highlightedWords: ['Conductor', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-25',
    alternateSlug: 'conductor-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Conductor runs Claude Code, Codex, Cursor and OpenCode in local Mac workspaces or managed cloud sandboxes, while CodeAgentSwarm runs seven CLIs locally on macOS and Windows with notifications, live diffs and a shared task board.',
        },
        {
          type: 'paragraph',
          text: 'Both isolate agent work and make it reviewable. Conductor extends that model into managed cloud sandboxes, multiplayer collaboration and an HTTP API. CodeAgentSwarm keeps work local and spreads across two operating systems and seven agent vendors. For the wider field, start with the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product. All Conductor facts were verified on August 25, 2026 against conductor.build, its pricing page and its documentation. Conductor has no public repository, so there is no public source history to compare.',
        },
      ],
    },
    {
      id: 'what-is-conductor',
      title: 'What Conductor is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://conductor.build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor</a> now leads with cloud agent teams. Local workspaces still run on a Mac, while Pro and higher plans can create isolated managed sandboxes that keep working after the app closes. The product also supports multiplayer workspace sharing, a beta HTTP API and an MCP server.',
        },
        {
          type: 'paragraph',
          text: 'Local workspaces use git worktrees on your Mac. Cloud workspaces run in isolated Vercel sandboxes in us-east-1 with 8 vCPUs, 16 GB of RAM and ephemeral storage. Conductor stores cloud session inputs and outputs on its servers, while local session data stays on your device.',
        },
        {
          type: 'list',
          items: [
            '<strong>Local and cloud:</strong> Mac worktrees for local work, managed sandboxes for agents that must continue after the app closes',
            '<strong>Isolated workspaces:</strong> a git worktree, a branch, a run environment and a shared context folder per agent',
            '<strong>Review and merge in the app:</strong> the product is organized around landing agent output, not just launching agents',
            '<strong>Four first-party harnesses:</strong> Claude Code, Codex, Cursor and OpenCode',
            '<strong>Uses your existing login:</strong> their FAQ says Conductor uses Claude Code however you are already logged in, whether that is an API key or a Claude Pro or Max plan',
          ],
        },
        {
          type: 'paragraph',
          text: 'Pricing is now public: Free at $0 for local Mac workspaces, Pro at $50/month with cloud, multiplayer for up to five Pro users and the API, Teams at $60/user/month, and Enterprise at a custom price. Cloud compute has no additional usage fee yet, but Conductor says usage-based cloud pricing is planned.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS and Windows, it is not a model provider, and it drives agent CLIs you install yourself: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm git worktrees panel, where each parallel agent session gets its own worktree so agents do not share a working directory',
          src: '/images/guides/git-worktrees-panel.png',
          caption: 'Worktrees per session in CodeAgentSwarm. Both products land on the same isolation primitive, because agents sharing one working directory does not end well.',
        },
        {
          type: 'list',
          items: [
            'Parallel terminals, each with its own agent, project and conversation',
            'Desktop notifications when an agent finishes or stops to ask you something',
            'Searchable conversation history across all seven agents and capability-aware resume back into a terminal',
            'Per-terminal live file diffs while the agent is still working',
            'Permission control, including a Turbo mode when you want to stop approving every step',
            'A kanban task board the agents update themselves over MCP',
            'Git worktrees per session, plus skills and MCP marketplaces',
            'Provider quota indicator, AI commit messages and multi-project switching',
          ],
        },
        {
          type: 'paragraph',
          text: 'And the limitations, up front: closed source with no public app repository, no Linux desktop build, Mobile Connect still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), still beta software, and you need your own subscriptions for the CLIs you run. Conductor is closed source too, but it is a Mac-native app from a funded company, and if you are a Mac-only shop that focus is worth something.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'table',
          headers: ['', 'Conductor', 'CodeAgentSwarm'],
          rows: [
            [
              '<strong>Platforms</strong>',
              'macOS app for local work; cloud workspaces; iOS app listed as coming soon',
              'macOS and Windows. No Linux build',
            ],
            [
              '<strong>Interface</strong>',
              'Mac app plus cloud workspaces, multiplayer collaboration and code review',
              'Desktop workspace with parallel terminals, live diffs and a task board',
            ],
            [
              '<strong>Supported agents</strong>',
              'Claude Code, Codex, Cursor and OpenCode',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent',
            ],
            [
              '<strong>Isolation model</strong>',
              'Local git worktrees or isolated managed cloud sandboxes',
              'Git worktree per session plus a separate process per terminal',
            ],
            [
              '<strong>Notifications</strong>',
              'Workspace attention states; mobile access is listed as coming soon',
              'Desktop notifications when an agent finishes or needs input',
            ],
            [
              '<strong>Conversation history</strong>',
              'Cloud session transcripts are stored by Conductor and accessible through the API',
              'Searchable across all seven agents and capability-aware resume',
            ],
            [
              '<strong>Task management</strong>',
              'Beta HTTP API and MCP server; no public kanban feature documented',
              'Kanban board the agents update over MCP',
            ],
            [
              '<strong>Open source</strong>',
              'No public repository as of August 25, 2026. Built by Melty Labs',
              'No. Closed source, no public app repository',
            ],
            [
              '<strong>Price</strong>',
              'Free $0; Pro $50/month; Teams $60/user/month; Enterprise custom. Cloud usage pricing is planned',
              'Free during beta with Pro included, and you bring your own CLI subscriptions',
            ],
            [
              '<strong>Last public commit</strong>',
              'No public repo',
              'Closed source, no public repo',
            ],
          ],
          caption: 'All Conductor data checked on August 25, 2026 against conductor.build, its pricing page and documentation.',
        },
      ],
    },
    {
      id: 'when-conductor',
      title: 'When Conductor is the better choice',
      content: [
        {
          type: 'paragraph',
          text: 'Focus is a feature, and Conductor picked its lane on purpose. There are cases where that lane is the one you are in.',
        },
        {
          type: 'list',
          items: [
            '<strong>You are Mac-only and want a Mac-native app.</strong> Conductor targets one platform and nothing else, which usually shows in how an app feels day to day.',
            '<strong>Your bottleneck is review, not launching.</strong> Their product is organized around seeing what each agent did and merging it, the part most people underestimate.',
            '<strong>You want managed cloud agents.</strong> Pro and higher plans can keep agents running in isolated cloud sandboxes after the Mac app closes.',
            '<strong>You like the isolated workspace as a first-class concept.</strong> A branch, a worktree, a run environment and a shared context folder per agent is a clean mental model.',
            '<strong>You want cloud collaboration.</strong> Multiplayer workspace sharing and the beta API give teams remote coordination that CodeAgentSwarm does not currently offer.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'On maturity: Conductor is built by a Y Combinator company and they say they built Conductor using Conductor. CodeAgentSwarm is beta software from a much smaller operation. That is fair to weigh, and we would rather you weigh it with real information.',
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'When CodeAgentSwarm is the better choice',
      content: [
        {
          type: 'paragraph',
          text: 'The comparison turns at the edges of that focus: the operating system, the number of agent vendors, and what happens after the agent stops typing.',
        },
        {
          type: 'list',
          items: [
            '<strong>You or your team use Windows.</strong> Conductor is macOS only per their site. CodeAgentSwarm runs on macOS and Windows, which matters the moment one person is not on a Mac.',
            '<strong>You want seven agent CLIs.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent, mixed freely across terminals. Antigravity, Kimi and Grok are not among the agents Conductor documents.',
            '<strong>You want one searchable history across vendors,</strong> with any conversation resumable back into a live terminal.',
            '<strong>You want the agents to maintain the task board.</strong> The kanban is updated by the agents over MCP while they work, not by you afterwards.',
            '<strong>You want to be told, not to check.</strong> Desktop notifications fire when an agent finishes or needs input.',
            '<strong>You are managing provider limits.</strong> The quota indicator shows where you stand before an agent stalls mid-task.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conductor alternatives on Windows',
          id: 'windows-alternative',
        },
        {
          type: 'paragraph',
          text: 'If you found Conductor, liked the idea and then discovered its local app is macOS only, this is the section you came for. As of August 25, 2026 there is no Windows desktop build. That leaves a few honest options.',
        },
        {
          type: 'list',
          items: [
            '<strong>CodeAgentSwarm</strong> runs on macOS and Windows, with parallel terminals, worktrees per session, live diffs, desktop notifications and a shared task board. It is ours, it is closed source and it is beta, so weigh that.',
            '<strong>Paseo</strong> ships desktop builds for Windows and Linux as well as macOS, is open source under AGPLv3, and adds mobile and web clients. Detail in <a href="/en/guides/paseo-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo vs CodeAgentSwarm</a>.',
            '<strong>T3 Code</strong> also runs beyond macOS. We compare it in <a href="/en/guides/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code vs CodeAgentSwarm</a>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Whichever you pick, the isolation primitive is the one Conductor uses, and it is worth understanding on its own before you trust several agents with one repository. The <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI coding agents</a> guide covers it without reference to any product.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Can you use both?',
      content: [
        {
          type: 'paragraph',
          text: 'On a Mac, yes. Neither tool is a model provider and both drive CLIs installed on your machine with your own credentials, so running Conductor for the repositories where you want its review and merge flow and CodeAgentSwarm for the ones where you want seven agents and a shared board is workable.',
        },
        {
          type: 'paragraph',
          text: 'The rule is the same as with any pair of orchestrators: never point both at the same branch of the same repository at once. Separate worktrees or separate projects, and they stay out of each other’s way. On Windows the question does not arise, because only one of the two runs there.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Conductor run on Windows?',
      answer: 'No. Conductor offers a macOS app and cloud workspaces, but no Windows desktop build as of August 25, 2026. CodeAgentSwarm runs locally on macOS and Windows. Neither product has a Linux desktop build.',
    },
    {
      question: 'Is Conductor open source?',
      answer: 'There is no public repository for Conductor as of August 25, 2026. It is proprietary software built by Melty Labs, so there is no commit history you can inspect. CodeAgentSwarm is also closed source with no public application repository. If source access is required, look at Paseo, which publishes its code under AGPLv3.',
    },
    {
      question: 'What agents does each one support?',
      answer: 'Conductor supports Claude Code, Codex, Cursor and OpenCode. CodeAgentSwarm supports seven CLIs: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent. Both run Cursor and OpenCode; CodeAgentSwarm also runs Antigravity CLI, Kimi Code and Grok Build.',
    },
    {
      question: 'Is there a free way to try both?',
      answer: 'Yes. CodeAgentSwarm is free during its beta with Pro included. Conductor has a $0 Free plan for local Mac workspaces; Pro costs $50/month, Teams costs $60/user/month and Enterprise is custom. Conductor says cloud compute has no additional usage fee yet, but usage pricing is planned. Both products use the agent subscriptions you bring.',
    },
  ],
}

export default guide
