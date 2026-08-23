import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'conductor-vs-codeagentswarm',
    locale: 'en',
    title: 'Conductor vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Conductor vs CodeAgentSwarm: Honest Comparison (2026)',
    metaDescription: 'Conductor is a Mac-only app for parallel Claude Code, Codex and Cursor agents. CodeAgentSwarm runs seven agent CLIs on macOS and Windows. Honest comparison.',
    intro: `Conductor is a macOS-only app for running Claude Code, Codex and Cursor agents in parallel isolated workspaces, while CodeAgentSwarm is a desktop workspace for macOS and Windows that runs seven agent CLIs in parallel terminals. Same idea, different reach.

Full disclosure: we build CodeAgentSwarm. This page still gives Conductor its due, and where their site does not document something we write "not documented" instead of claiming the feature is missing. Every third-party fact below was checked on July 26, 2026 against conductor.build itself, including their FAQ and the structured data they publish on their homepage. CodeAgentSwarm availability on this page was updated on August 23, 2026.

Short version: if you and your team are all on Macs and you want a native app built around reviewing and merging agent work, Conductor is a focused, credible choice. If anyone touches Windows, or you want more than three agent CLIs, CodeAgentSwarm covers ground Conductor does not.`,
    ctaText: 'Need a parallel agent workspace that also runs on Windows, with seven agent CLIs instead of three? Download CodeAgentSwarm and set up your first batch of parallel terminals.',
    ctaAgent: 'comparison',
    highlightedWords: ['Conductor', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-23',
    alternateSlug: 'conductor-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Conductor is a Mac-only app that creates parallel Claude Code, Codex and Cursor agents in isolated workspaces so you can review and merge their changes, while CodeAgentSwarm is a macOS and Windows desktop workspace that runs seven agent CLIs in parallel terminals with notifications, live diffs and a shared task board.',
        },
        {
          type: 'paragraph',
          text: 'Both agree on the core insight: give each agent its own isolated workspace, then make the result reviewable. They diverge on reach. Conductor commits fully to the Mac and to three agents, and gets a tight native product out of that focus. CodeAgentSwarm spreads across two operating systems and seven agent vendors, which matters if your machines and CLIs are mixed. For the wider field, start with the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product, so read this as a comparison written by an interested party. All third-party facts were verified on July 26, 2026 against conductor.build, using their own copy, their FAQ and their published structured data. Conductor has no public repository, so several rows below are marked as not documented rather than guessed at.',
        },
      ],
    },
    {
      id: 'what-is-conductor',
      title: 'What Conductor is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://conductor.build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor</a> describes itself in its own words: "Create parallel Claude Code, Codex, and Cursor agents in isolated workspaces. See at a glance what they are working on, then review and merge their changes." The headline is more direct still: run parallel coding agents on your Mac. It is built by Melty Labs, a Y Combinator company based in San Francisco, and their site lists macOS as the operating system.',
        },
        {
          type: 'paragraph',
          text: 'The documented workflow is short. You add a repository, Conductor clones it and works entirely on your Mac. Every agent you spin up gets an isolated workspace, and their FAQ confirms what that means underneath: "each Conductor workspace is a new git worktree". Their own description adds that each workspace also gets its own branch, run environment and shared context folder. Then you look at a list showing who is working and what needs attention, and you review the code.',
        },
        {
          type: 'list',
          items: [
            '<strong>Mac-native focus:</strong> one platform, one design target, no cross-platform compromises',
            '<strong>Isolated workspaces:</strong> a git worktree, a branch, a run environment and a shared context folder per agent',
            '<strong>Review and merge in the app:</strong> the product is organized around landing agent output, not just launching agents',
            '<strong>Cursor agents:</strong> one of their three supported agents and also a first-class CodeAgentSwarm integration through Cursor\'s official ACP server',
            '<strong>Uses your existing login:</strong> their FAQ says Conductor uses Claude Code however you are already logged in, whether that is an API key or a Claude Pro or Max plan',
          ],
        },
        {
          type: 'paragraph',
          text: 'A note on what we could not verify. Conductor has no public repository, so there is no commit history or star count to cite, and their site does not publish a pricing page (the /pricing path returned a 404 when checked on July 26, 2026). Conversation history, a task board and desktop notifications are also not documented on their site as of that date. That does not mean those things do not exist. It means we will not tell you either way.',
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
              'macOS only, per their own site',
              'macOS and Windows. No Linux build',
            ],
            [
              '<strong>Interface</strong>',
              'Mac app with a workspace list showing who is working and what needs attention, plus code review',
              'Desktop workspace with parallel terminals, live diffs and a task board',
            ],
            [
              '<strong>Supported agents</strong>',
              'Claude Code, Codex and Cursor, per their FAQ',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent',
            ],
            [
              '<strong>Isolation model</strong>',
              'One git worktree per workspace, plus its own branch, run environment and shared context folder',
              'Git worktree per session plus a separate process per terminal',
            ],
            [
              '<strong>Notifications</strong>',
              'Their site says the workspace view shows what needs attention. Desktop notifications are not documented as of July 26, 2026',
              'Desktop notifications when an agent finishes or needs input',
            ],
            [
              '<strong>Conversation history</strong>',
              'Not documented on their site as of July 26, 2026',
              'Searchable across all seven agents and capability-aware resume',
            ],
            [
              '<strong>Task management</strong>',
              'Not documented on their site as of July 26, 2026',
              'Kanban board the agents update over MCP',
            ],
            [
              '<strong>Open source</strong>',
              'No public repository as of July 26, 2026. Built by Melty Labs',
              'No. Closed source, no public app repository',
            ],
            [
              '<strong>Price</strong>',
              'Not published as plain text on their site as of July 26, 2026. Their FAQ does say Conductor uses your existing Claude Code login',
              'Free during beta with Pro included, and you bring your own CLI subscriptions',
            ],
            [
              '<strong>Last public commit</strong>',
              'No public repo',
              'Closed source, no public repo',
            ],
          ],
          caption: 'All Conductor data checked on July 26, 2026 against conductor.build, including their FAQ and homepage structured data. Rows marked as not documented mean we could not find them published, not that the feature is absent.',
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
            '<strong>You want Cursor agents in the mix.</strong> Cursor is one of their three supported agents. CodeAgentSwarm does not drive Cursor.',
            '<strong>You like the isolated workspace as a first-class concept.</strong> A branch, a worktree, a run environment and a shared context folder per agent is a clean mental model.',
            '<strong>You want fewer moving parts.</strong> Three agents instead of seven is less to configure and keep updated, and for some teams that is the right trade.',
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
            '<strong>You want seven agent CLIs.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent, mixed freely across terminals. Antigravity, OpenCode, Kimi and Grok are not among the agents Conductor documents.',
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
          text: 'If you found Conductor, liked the idea and then discovered it is macOS only, this is the section you came for. Their site lists macOS as the operating system, so as of July 26, 2026 there is no Windows build to wait for. That leaves a few honest options.',
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
      answer: 'No. Conductor lists macOS as its operating system on its own site, and its headline is about running parallel coding agents on your Mac, so as of July 26, 2026 there is no Windows version. CodeAgentSwarm runs on macOS and Windows, which is the main reason people comparing the two end up here. Neither product has a Linux build.',
    },
    {
      question: 'Is Conductor open source?',
      answer: 'There is no public repository for Conductor as of July 26, 2026. It is a proprietary Mac app built by Melty Labs, a Y Combinator company based in San Francisco, so there is no commit history you can inspect. CodeAgentSwarm is also closed source with no public application repository, so neither product gives you source access. If open source is a requirement, look at Paseo, which publishes its code under AGPLv3.',
    },
    {
      question: 'What agents does each one support?',
      answer: 'Conductor supports Claude Code, Codex and Cursor, according to the FAQ on its site. CodeAgentSwarm supports seven CLIs: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent. Both run Cursor; CodeAgentSwarm also runs Antigravity CLI, OpenCode, Kimi Code and Grok Build.',
    },
    {
      question: 'Is there a free way to try both?',
      answer: 'CodeAgentSwarm is free during its beta with Pro included, and you bring your own subscriptions for the agent CLIs. For Conductor, their site does not publish pricing as plain text as of July 26, 2026 and the /pricing path returns a 404, so we will not make a claim about what it costs. Their FAQ does document that Conductor uses your existing Claude Code login, whether that is an API key or a Claude Pro or Max plan. Check conductor.build for current terms.',
    },
  ],
}

export default guide
