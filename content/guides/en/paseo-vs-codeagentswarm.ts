import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'paseo-vs-codeagentswarm',
    locale: 'en',
    title: 'Paseo vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Paseo vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'Paseo is a self-hosted, open source agent orchestrator you can drive from your phone. CodeAgentSwarm is a macOS, Windows and Linux desktop workspace for ten agent CLIs.',
    intro: `Paseo is an open source, self-hosted agentic development environment you can supervise from your phone, while CodeAgentSwarm is a macOS, Windows and Linux desktop workspace that runs ten agent CLIs in parallel terminals. That is the difference in one line, and most of the decision follows from it.

Full disclosure: we build CodeAgentSwarm. That is exactly why this page says out loud where Paseo is the better tool instead of pretending we win every row. Both products are judged on the same criteria, our limitations sit next to our features, and every third-party fact below was checked on October 31, 2026 against paseo.sh, its docs, the public getpaseo/paseo repository and public GitHub data. CodeAgentSwarm availability and supported agents were updated on October 5, 2026.

Short version: if you want to start a job at your desk and check on it from a train, or you need software you can host and audit yourself, Paseo fits better. If you work at a desk on macOS, Windows or Linux and want your agent CLIs side by side in parallel terminals, a task board the agents keep updated and one searchable history across all of them, that is where CodeAgentSwarm earns its place.`,
    ctaText: 'If your work happens at a desk on macOS, Windows or Linux and you want ten agent CLIs, live diffs and a shared task board in one window, download CodeAgentSwarm and run your next batch of agents in parallel.',
    ctaAgent: 'comparison',
    highlightedWords: ['Paseo', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'paseo-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Paseo is an open source, self-hosted agentic development environment with desktop, mobile, web and CLI clients talking to a daemon on your own machine, while CodeAgentSwarm is a closed source desktop app for macOS, Windows and Linux that runs ten agent CLIs side by side in parallel terminals.',
        },
        {
          type: 'paragraph',
          text: 'Both let you run several coding agents at once. They disagree about where you are standing while that happens. Paseo assumes you might be anywhere and puts a phone in your pocket as the control surface. CodeAgentSwarm assumes you are at a computer and spends its effort on what one screen can show: terminals, live diffs, notifications and a task board. For the wider field, see the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: we build CodeAgentSwarm, so treat this as a comparison written by an interested party. Everything stated about Paseo was verified on October 31, 2026 against paseo.sh, its docs, its public repository and public GitHub data. Where something is not documented publicly, this page says so instead of guessing.',
        },
      ],
    },
    {
      id: 'what-is-paseo',
      title: 'What Paseo is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://paseo.sh" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo</a> describes itself as an agentic development environment: run many coding agents at once, on any machine, from your desk and from your phone. Architecturally it is a local daemon that manages your agents, plus desktop, mobile, web and CLI clients that connect to it. You install the daemon on the machine that holds your code and your credentials, then reach it from whatever device is in front of you, over your network, an end to end encrypted relay or your own tunnel.',
        },
        {
          type: 'paragraph',
          text: 'The public repository is <a href="https://github.com/getpaseo/paseo" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">getpaseo/paseo</a>. It had about 22,600 stars on October 31, 2026, its most recent public commit landed that same day, and the latest release was v0.14.0 on October 29. Since August 27, 2026 the LICENSE file places Paseo\'s own code under Apache 2.0, replacing the earlier AGPLv3, while third-party components keep their own licenses.',
        },
        {
          type: 'list',
          items: [
            '<strong>Truly cross-device:</strong> native iOS and Android apps they describe as having full feature parity with desktop, plus web and a scriptable CLI',
            '<strong>Self-hosted by design:</strong> the daemon and the agents run on your laptop, VM or dev server, and the desktop app bundles and starts the daemon for you',
            '<strong>Multi-provider:</strong> native support for Claude Code, Codex, OpenCode, Pi, Antigravity and Muse Code, plus dozens more through an ACP catalog that includes GitHub Copilot, Cursor, Kimi Code CLI, Grok and Devin CLI',
            '<strong>A full dev workflow:</strong> file editor, terminals, diff review, pull requests and a built-in browser in split panes',
            '<strong>Orchestration:</strong> agents can create worktrees, launch other agents and talk to them, and schedules start agents on a cron cadence',
            '<strong>Git worktrees:</strong> optional worktree isolation per workspace so each task works on its own branch',
            '<strong>Push notifications:</strong> the repository contains push and agent attention notification code',
            '<strong>Local voice control</strong> and a stated policy of no telemetry, no tracking and no forced login',
            '<strong>Optional Hub:</strong> GitHub, Slack and Discord triggers that start agents on your daemons, free to self-host or hosted by Paseo',
          ],
        },
        {
          type: 'paragraph',
          text: 'That is a strong product and we will not pretend otherwise. The mobile story in particular is not a checkbox: they say the native phone app has full feature parity with the desktop app. CodeAgentSwarm offers Mobile Connect in alpha, with a web beta for every account and native access by request while the desktop stays open. That is not the same as Paseo shipping public native clients.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS, Windows and Linux, it is not a model provider, and it drives the agent CLIs you already have installed: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'list',
          items: [
            'Parallel terminals, each with its own agent, project and conversation',
            'Desktop notifications when an agent finishes or stops to ask you something',
            'Searchable conversation history across all ten agents and capability-aware resume back into a terminal',
            'Per-terminal live file diffs while the agent is still working',
            'Permission control, including a Turbo mode when you want to stop approving every step',
            'A kanban task board the agents update themselves over MCP',
            'Git worktrees per session, so parallel agents do not fight over one working directory',
            'Skills and MCP marketplaces, a provider quota indicator, AI commit messages and multi-project switching',
          ],
        },
        {
          type: 'paragraph',
          text: 'The limitations, stated plainly: CodeAgentSwarm is closed source with no public app repository, Mobile Connect is still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), it is beta software, and it needs your own subscriptions for whichever CLIs you run. If public native mobile access or self-hosting is a hard requirement, Paseo is the honest recommendation.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'table',
          headers: ['', 'Paseo', 'CodeAgentSwarm'],
          rows: [
            [
              '<strong>Platforms</strong>',
              'macOS (13 or newer), Windows and Linux desktop apps, iOS and Android apps, web app, CLI and Docker',
              'macOS, Windows and Linux desktop app. Mobile Connect alpha: web beta for every account, native iOS and Android access by request, desktop must stay open',
            ],
            [
              '<strong>Interface</strong>',
              'Desktop app that bundles its own daemon, plus mobile, web and CLI clients that can connect to a daemon on any machine',
              'Desktop workspace plus Mobile Connect alpha. Web beta for every account; native access by request; desktop must stay open',
            ],
            [
              '<strong>Supported agents</strong>',
              'Native: Claude Code, Codex, OpenCode, Pi, Antigravity and Muse Code. Dozens more through its ACP catalog, including GitHub Copilot, Cursor, Kimi Code CLI, Grok, Gemini CLI and Devin CLI',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI',
            ],
            [
              '<strong>Isolation model</strong>',
              'Workspaces with local or git worktree isolation, one branch per worktree',
              'Git worktree per session plus a separate process per terminal',
            ],
            [
              '<strong>Notifications</strong>',
              'Push notifications, including to mobile (push and attention notification code is public in the repo)',
              'Desktop notifications when an agent finishes or needs input',
            ],
            [
              '<strong>Conversation history</strong>',
              'The app has a History view and the repo contains agent history search code. How search and resume work across providers is not documented in their docs as of October 31, 2026',
              'Searchable across all ten agents and capability-aware resume',
            ],
            [
              '<strong>Task management</strong>',
              'Schedules, heartbeats and agent-to-agent orchestration, plus GitHub, Slack and Discord triggers through the optional Hub. A kanban-style task board is not documented as of October 31, 2026',
              'Kanban board the agents update over MCP',
            ],
            [
              '<strong>Open source</strong>',
              'Yes. Apache 2.0 for Paseo\'s own code (third-party components keep their licenses), self-hostable, no telemetry',
              'No. Closed source, no public app repository',
            ],
            [
              '<strong>Price</strong>',
              'Free and open source per their FAQ, with your own agent credentials. The optional Hub is free to self-host; hosted Hub has a free tier (50 agent runs a month, 1 seat) and Pro at $15 per seat per month',
              'Free during beta with Pro included, and you bring your own CLI subscriptions',
            ],
            [
              '<strong>Last public commit</strong>',
              'October 31, 2026, on a repo with about 22,600 stars that day. Latest release v0.14.0 on October 29',
              'Closed source, no public repo',
            ],
          ],
          caption: 'Paseo facts checked on October 31, 2026 against paseo.sh, its docs and the public getpaseo/paseo repository, including GitHub stars and activity. Rows marked as not documented mean we could not find them published, not that the feature is missing.',
        },
      ],
    },
    {
      id: 'when-paseo',
      title: 'When Paseo is the better choice',
      content: [
        {
          type: 'paragraph',
          text: 'There is a real set of people for whom this comparison is not close, and we would rather say so than waste your afternoon.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want public native mobile access today.</strong> Paseo has public iOS and Android apps. CodeAgentSwarm Mobile Connect is still in alpha, native access is by request and the desktop must stay open.',
            '<strong>You need to self-host.</strong> Paseo is a daemon you run on your own laptop, VM or dev server. That is the architecture, not an add-on.',
            '<strong>Open source is a requirement.</strong> The code is public under Apache 2.0, so you can read it, fork it and keep running it whatever happens to the project. With us you take our word for things.',
            '<strong>You care about telemetry and forced logins.</strong> Paseo states it has neither, which is an easy answer if procurement asks.',
            '<strong>You use an agent outside our ten.</strong> GitHub Copilot, Gemini CLI, Amp, goose and dozens more are in Paseo\'s provider list or ACP catalog, and every agent CodeAgentSwarm supports appears there too. On agent coverage, Paseo is wider.',
            '<strong>You want the agent, editor and browser in one window.</strong> Paseo bundles a file editor, terminals, diff review, pull requests and a built-in browser, and its stated goal is to replace your IDE for agent-driven work.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'A useful test: picture yourself twenty minutes from your desk with an agent halfway through a task. If that scenario matters to you, that is Paseo territory, and no amount of desktop polish replaces it.',
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'When CodeAgentSwarm is the better choice',
      content: [
        {
          type: 'paragraph',
          text: 'The flip side is a workflow that lives at a desk, on macOS, Windows or Linux, where the bottleneck is not access but attention: too many agents, not enough eyes.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want each agent in its own terminal.</strong> CodeAgentSwarm runs the vendors\' CLIs side by side in parallel terminals. Paseo drives agents through native integrations and ACP inside its own interface, and for Antigravity its docs say full access is the only mode, with every tool call approved automatically.',
            '<strong>You want one searchable history across vendors,</strong> with any conversation resumable back into a live terminal.',
            '<strong>You want the agents to keep the board updated.</strong> The kanban is written by the agents over MCP while they work.',
            '<strong>You review as you go.</strong> Live diffs per terminal catch a wrong turn during the task, not in the pull request. Paseo has diff review too, so try both on a real task.',
            '<strong>You are juggling provider limits.</strong> The quota indicator tells you where you stand before an agent stalls. Paseo\'s repository also has usage plugins for several providers.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Worktrees deserve a note, because both tools take them seriously and they are what makes parallel agents survivable. If you have not set that up, <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI coding agents</a> explains the pattern product by product. And if you are on a Mac weighing a Mac-native option, <a href="/en/guides/conductor-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor vs CodeAgentSwarm</a> is the companion to this page.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Can you use both?',
      content: [
        {
          type: 'paragraph',
          text: 'Yes, and it is less strange than it sounds, because neither tool is a model provider. Both drive the CLIs already installed on your machine with your own credentials, so Paseo can handle the jobs you want to check from your phone while CodeAgentSwarm handles the deep desk sessions.',
        },
        {
          type: 'paragraph',
          text: 'One caution: do not point two orchestrators at the same repository and branch at once. Give each its own worktree, or its own project, and they coexist. If that sounds like more coordination than you want, pick the one that matches where you actually work.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Paseo open source?',
      answer: 'Yes. Paseo is developed in public at github.com/getpaseo/paseo. Since August 27, 2026 its LICENSE file places Paseo\'s own code under Apache 2.0, replacing the earlier AGPLv3, and third-party components keep their original licenses. The repository had about 22,600 stars on October 31, 2026. CodeAgentSwarm, by contrast, is closed source with no public application repository.',
    },
    {
      question: 'Can I supervise CodeAgentSwarm from my phone?',
      answer: 'Yes, through Mobile Connect alpha. The web beta is available to every account, while native iOS and Android access is by request, and the desktop app must stay open because it remains the source of truth. Paseo still wins on public native availability and self-hosting: its iOS, Android and web clients connect to a daemon you run.',
    },
    {
      question: 'Does Paseo support Antigravity CLI or Kimi Code?',
      answer: 'Yes, both, as of October 31, 2026. Antigravity is a native Paseo provider that uses your installed agy CLI, and its docs say it runs only in full access mode there. Kimi Code CLI is in Paseo\'s ACP catalog. CodeAgentSwarm supports Antigravity CLI and Kimi Code too, alongside Claude Code, Codex CLI and OpenCode. Paseo\'s provider list changes often, so check its supported providers page.',
    },
    {
      question: 'Are both projects actively maintained?',
      answer: 'Paseo is verifiably active: its most recent public commit was on October 31, 2026, and v0.14.0 shipped on October 29. Its site says it is maintained full time by one person. CodeAgentSwarm is under active development too, but it is closed source, so there is no public commit history you can inspect to confirm that yourself. That asymmetry is worth weighing.',
    },
  ],
}

export default guide
