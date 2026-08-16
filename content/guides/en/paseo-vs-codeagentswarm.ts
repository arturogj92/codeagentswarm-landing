import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'paseo-vs-codeagentswarm',
    locale: 'en',
    title: 'Paseo vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Paseo vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'Paseo is a self-hosted, open source agent orchestrator you can drive from your phone. CodeAgentSwarm is a macOS and Windows desktop workspace for seven agent CLIs.',
    intro: `Paseo is a self-hosted, open source orchestrator you can supervise from your phone, while CodeAgentSwarm is a macOS and Windows desktop workspace that runs seven agent CLIs in parallel terminals. That is the difference in one line, and most of the decision follows from it.

Full disclosure: we build CodeAgentSwarm. That is exactly why this page says out loud where Paseo is the better tool instead of pretending we win every row. Both products are judged on the same criteria, our limitations sit next to our features, and every third-party fact below was checked on July 26, 2026 against paseo.sh, the public getpaseo/paseo repository and public GitHub data.

Short version: if you want to start a job at your desk and check on it from a train, or you need software you can host and audit yourself, Paseo fits better. If you work on a Mac or a Windows machine and want seven agent CLIs, a shared task board and one searchable history across all of them, that is where CodeAgentSwarm earns its place.`,
    ctaText: 'If your work happens at a desk on macOS or Windows and you want seven agent CLIs, live diffs and a shared task board in one window, download CodeAgentSwarm and run your next batch of agents in parallel.',
    ctaAgent: 'comparison',
    highlightedWords: ['Paseo', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-11',
    alternateSlug: 'paseo-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Paseo is a self-hosted, open source orchestrator with desktop, mobile, web and CLI clients talking to a daemon on your own machine, while CodeAgentSwarm is a closed source desktop app for macOS and Windows that runs seven agent CLIs side by side in parallel terminals.',
        },
        {
          type: 'paragraph',
          text: 'Both let you run several coding agents at once. They disagree about where you are standing while that happens. Paseo assumes you might be anywhere and puts a phone in your pocket as the control surface. CodeAgentSwarm assumes you are at a computer and spends its effort on what one screen can show: terminals, live diffs, notifications and a task board. For the wider field, see the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: we build CodeAgentSwarm, so treat this as a comparison written by an interested party. Everything stated about Paseo was verified on July 26, 2026 against paseo.sh, its public repository and public GitHub data. Where something is not documented publicly, this page says so instead of guessing.',
        },
      ],
    },
    {
      id: 'what-is-paseo',
      title: 'What Paseo is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://paseo.sh" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo</a> describes itself as a way to orchestrate coding agents from your desk and your phone. Architecturally it is a local daemon that manages your agents, plus desktop, mobile, web and CLI clients that connect to it. You install the daemon on the machine that holds your code and your credentials, then reach it from whatever device is in front of you, over your network, an end to end encrypted relay or your own tunnel.',
        },
        {
          type: 'paragraph',
          text: 'The public repository is <a href="https://github.com/getpaseo/paseo" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">getpaseo/paseo</a>. At the time of checking it had about 11,400 stars (11,428 exactly) and its most recent public commit landed on July 26, 2026, the same day this page was written. The LICENSE file places the code under AGPLv3, with third-party components under their own licenses.',
        },
        {
          type: 'list',
          items: [
            '<strong>Truly cross-device:</strong> native iOS and Android apps, plus desktop, web and a scriptable CLI',
            '<strong>Self-hosted by design:</strong> the daemon and the agents run on your laptop, VM or dev server',
            '<strong>Multi-provider:</strong> their FAQ lists Claude Code, Codex, Cursor, OpenCode and Pi, and the README also lists GitHub Copilot',
            '<strong>Git worktrees:</strong> optional per-agent worktrees so each one works on its own branch',
            '<strong>Push notifications:</strong> the repository contains push and agent attention notification code',
            '<strong>Local voice control</strong> and a stated policy of no telemetry, no tracking and no forced login',
          ],
        },
        {
          type: 'paragraph',
          text: 'That is a strong product and we will not pretend otherwise. The mobile story in particular is not a checkbox: they lean on parity between the phone app and the desktop app. CodeAgentSwarm has nothing comparable.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS and Windows, it is not a model provider, and it drives the agent CLIs you already have installed: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm terminal tabs showing per-terminal status badges so you can see which agents are working, which need input and which are done',
          src: '/images/guides/terminal-status-indicators.png',
          caption: 'Status badges on each terminal tab: the workspace is built around seeing the state of every agent on one screen.',
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
            'Git worktrees per session, so parallel agents do not fight over one working directory',
            'Skills and MCP marketplaces, a provider quota indicator, AI commit messages and multi-project switching',
          ],
        },
        {
          type: 'paragraph',
          text: 'The limitations, stated plainly: CodeAgentSwarm is closed source with no public app repository, there is no Linux build, there is no mobile or remote client, it is beta software, and it needs your own subscriptions for whichever CLIs you run. If any of those is a hard requirement, Paseo is the honest recommendation.',
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
              'macOS, Windows and Linux desktop builds, iOS and Android apps, web and CLI',
              'macOS and Windows desktop app. No Linux build',
            ],
            [
              '<strong>Interface</strong>',
              'Self-hosted daemon plus desktop, mobile, web and CLI clients',
              'One desktop workspace with parallel terminals, diffs and a task board',
            ],
            [
              '<strong>Supported agents</strong>',
              'Claude Code, Codex, Cursor, OpenCode and Pi per their FAQ, plus GitHub Copilot in the README',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent',
            ],
            [
              '<strong>Isolation model</strong>',
              'Optional git worktree per agent, one branch per job',
              'Git worktree per session plus a separate process per terminal',
            ],
            [
              '<strong>Notifications</strong>',
              'Push notifications, including to mobile (push and attention notification code is public in the repo)',
              'Desktop notifications when an agent finishes or needs input',
            ],
            [
              '<strong>Conversation history</strong>',
              'Not documented on their site as of July 26, 2026',
              'Searchable across all seven agents and capability-aware resume',
            ],
            [
              '<strong>Task management</strong>',
              'Their docs list schedules and orchestration workflows. A task board is not documented as of July 26, 2026',
              'Kanban board the agents update over MCP',
            ],
            [
              '<strong>Open source</strong>',
              'Yes. Public repo under AGPLv3, self-hostable, no telemetry',
              'No. Closed source, no public app repository',
            ],
            [
              '<strong>Price</strong>',
              'Their FAQ states Paseo is free and open source, and you bring your own agent credentials',
              'Free during beta with Pro included, and you bring your own CLI subscriptions',
            ],
            [
              '<strong>Last public commit</strong>',
              'July 26, 2026, on a repo with about 11,400 stars',
              'Closed source, no public repo',
            ],
          ],
          caption: 'All Paseo data checked on July 26, 2026 against paseo.sh, the getpaseo/paseo repository and public GitHub data. Rows marked as not documented mean we could not find them published, not that the feature is missing.',
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
            '<strong>You want to supervise agents from your phone.</strong> Paseo has native iOS and Android apps. CodeAgentSwarm is desktop only, so there is nothing to compare.',
            '<strong>You need to self-host.</strong> Paseo is a daemon you run on your own laptop, VM or dev server. That is the architecture, not an add-on.',
            '<strong>Open source is a requirement.</strong> The code is public under AGPLv3, so you can read it and keep running it whatever happens to the company. With us you take our word for things.',
            '<strong>You care about telemetry and forced logins.</strong> Paseo states it has neither, which is an easy answer if procurement asks.',
            '<strong>You use GitHub Copilot or Pi.</strong> Both are listed by Paseo and neither is among the seven CLIs we drive.',
            '<strong>You are on Linux.</strong> Paseo ships a Linux build. We do not.',
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
          text: 'The flip side is a workflow that lives at a desk, on macOS or Windows, where the bottleneck is not access but attention: too many agents, not enough eyes.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want Antigravity CLI or Kimi Code.</strong> Neither is listed among the agents Paseo documents as of July 26, 2026. We run both, alongside Claude Code, Codex CLI and OpenCode.',
            '<strong>You want one searchable history across vendors,</strong> with any conversation resumable back into a live terminal.',
            '<strong>You want the agents to keep the board updated.</strong> The kanban is written by the agents over MCP while they work.',
            '<strong>You review as you go.</strong> Live diffs per terminal catch a wrong turn during the task, not in the pull request.',
            '<strong>You are juggling provider limits.</strong> The quota indicator tells you where you stand before an agent stalls.',
            '<strong>You want everything on one screen,</strong> without stitching a daemon and its clients together.',
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
      answer: 'Yes. Paseo is developed in public at github.com/getpaseo/paseo and its LICENSE file places the code under AGPLv3, with third-party components keeping their original licenses. As of July 26, 2026 the repository had about 11,400 stars. CodeAgentSwarm, by contrast, is closed source with no public application repository.',
    },
    {
      question: 'Can I supervise CodeAgentSwarm from my phone?',
      answer: 'No. CodeAgentSwarm is a desktop application for macOS and Windows, with no mobile app and no remote client. Paseo wins clearly here: it ships native iOS and Android apps plus a web client, all connecting to a daemon you host, so you can start a task at your desk and check on it from anywhere. If mobile supervision is what you need, choose Paseo.',
    },
    {
      question: 'Does Paseo support Antigravity CLI or Kimi Code?',
      answer: 'Neither is listed among the agents documented by Paseo as of July 26, 2026. Their FAQ names Claude Code, Codex, Cursor, OpenCode and Pi, and the README also lists GitHub Copilot. CodeAgentSwarm supports Antigravity CLI and Kimi Code alongside Claude Code, Codex CLI and OpenCode. Paseo advertises further providers, so check their current docs first.',
    },
    {
      question: 'Are both projects actively maintained?',
      answer: 'Paseo is verifiably active: its most recent public commit at the time of checking was July 26, 2026, the same day these facts were gathered. CodeAgentSwarm is under active development too, but it is closed source, so there is no public commit history you can inspect to confirm that yourself. That asymmetry is worth weighing.',
    },
  ],
}

export default guide
