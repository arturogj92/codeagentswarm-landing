import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'superset-vs-codeagentswarm',
    locale: 'en',
    title: 'Superset (Paradev) vs CodeAgentSwarm: Honest Comparison 2026',
    metaTitle: 'Superset (Paradev) vs CodeAgentSwarm: Honest Comparison 2026',
    metaDescription: 'Superset, now Paradev, is a source available IDE for running 100+ parallel coding agents. CodeAgentSwarm is a supervision workspace for ten agent CLIs. Honest comparison.',
    intro: `Superset is now called Paradev. The team announced the new name on October 12, 2026, and says only the name changed: same product, account and workspaces. superset.sh now redirects to paradev.com, the GitHub repository moved to ParadevAI/Paradev, and the CLI command is still superset. We kept the old name in the title because that is what most people still search for, and we say Paradev below when we describe the product as it is today.

Superset (now Paradev) is a source available desktop IDE for running many CLI coding agents in parallel, each task in its own git worktree, with code review, pull requests, an in-app browser, automations and an iPhone app. CodeAgentSwarm is a closed source desktop workspace for supervising ten supported agent CLIs, with desktop notifications, searchable cross-agent history and a kanban board the agents update themselves over MCP.

Disclosure up front: we build CodeAgentSwarm. That is the reason this page states where Paradev is better instead of pretending otherwise, and why our own limitations (closed source, Mobile Connect still in alpha, still in beta) sit in the same table as everything else. Every third-party fact was verified on October 31, 2026 against paradev.com, docs.paradev.com and the public ParadevAI/Paradev repository, and anything we could not verify is labelled rather than guessed. CodeAgentSwarm availability and supported agents were updated on October 5, 2026.

Short version: pick Paradev if you want an IDE-shaped environment, source you can inspect, team plans or an iPhone app today. Pick CodeAgentSwarm if you need Windows today, searchable cross-agent history and graded permissions, with Pro included free during the beta.`,
    ctaText: 'Both are free to start, so run them on the same repository for a week. CodeAgentSwarm is free during beta, with Pro included, for macOS, Windows and Linux.',
    ctaAgent: 'comparison',
    highlightedWords: ['Superset', 'Paradev', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'superset-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Superset (now Paradev) is an IDE for running a large number of parallel agents in isolated git worktrees and reviewing what they ship, while CodeAgentSwarm is a supervision workspace for a curated set of ten agent CLIs, built around noticing when one of them needs you.',
        },
        {
          type: 'paragraph',
          text: 'The two products agree on the premise: one agent at a time wastes your time, and parallel agents need isolation. They now overlap more than they used to: both show agent status, send notifications, read subscription quota and give agents a task board over MCP. Where they still differ is the shape. Paradev builds an IDE with review, an in-app browser, automations, remote and cloud workspaces, and team plans. CodeAgentSwarm builds a supervision workspace with cross-agent history, graded permissions and a local board, and it runs on Windows. For the wider field, see the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a> roundup, and there is a sibling page for <a href="/en/guides/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product. Everything stated here about Superset (now Paradev) was verified on October 31, 2026 against their own site (paradev.com), their documentation (docs.paradev.com) and public GitHub data for ParadevAI/Paradev, formerly superset-sh/superset. Where something is not documented publicly, this page says so rather than claiming Paradev lacks it.',
        },
      ],
    },
    {
      id: 'what-is-superset',
      title: 'What Superset (now Paradev) is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://paradev.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paradev</a>, formerly Superset, now calls itself "The IDE for Parallel Agents" and promises to scale to 100+ agents running at once. Its repository, <a href="https://github.com/ParadevAI/Paradev" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">ParadevAI/Paradev</a> (the old superset-sh/superset address redirects there), describes it as "an agentic IDE to orchestrate 100+ coding agents in parallel". Their README adds that it is not a coding agent itself: you bring your own agent subscriptions and API keys, and it does not proxy model calls. It is also unrelated to Apache Superset, the business intelligence tool.',
        },
        {
          type: 'paragraph',
          text: 'The licensing deserves precision, because it is easy to get wrong. Paradev is source available under the Elastic License 2.0. That is not an OSI approved open source license: you can read the code, fork it and self-host it for your team, but you cannot resell it as a hosted service, and the usual open source freedoms do not all apply. Their README says the desktop app is "free forever" for running agents on your own machine. On October 31, 2026 the repository had about 15,800 stars, its last public commit that same day and desktop release v2.0.2 from October 29, 2026. It has been public since October 21, 2025.',
        },
        {
          type: 'list',
          items: [
            'One git worktree, branch and set of terminals per task, so parallel work does not collide',
            'A Changes pane to review, commit and push, and a pull request pane with checks, review threads and merge',
            'An in-app browser that previews each workspace\'s dev server, plus a file editor and a chat pane',
            'Agent status in the sidebar, completion chimes, dock badges and notifications when an agent finishes or needs input',
            'Resume after a crash or restart, fork a session, or hand its context to a different agent',
            'A Tasks view with list and kanban board views (Linear, GitHub issues and native tasks), and an MCP server whose tools let agents create and update those tasks',
            'Quota meters for Claude Code, Codex, Grok, Antigravity and OpenCode logins, and a token usage page',
            'Automations on a schedule or an event, remote hosts, cloud workspaces (beta) and an iPhone and iPad app, all on paid plans',
            'A CLI, a TypeScript SDK and one-click handoff to Cursor, VS Code or any editor',
          ],
        },
        {
          type: 'paragraph',
          text: 'Their README lists 21 built-in agents as fully supported: Amp Code, Antigravity CLI, Claude Code, Codex CLI, Cursor Agent, Devin, Droid, fx, Gemini CLI, GitHub Copilot, Grok, Hermes, Kimi Code, Kiro, Mastra Code, Mistral Vibe, Muse Code, Oh My Pi, OpenCode, Pi and Polygraph, and any other CLI agent works as a custom agent. Their docs are honest that integration depth varies: some agents report status, resume and usage, others run as plain terminal programs. The desktop app supports macOS (Apple Silicon and Intel); Linux ships as an experimental x64 AppImage; Windows is planned with no date. The iPhone and iPad app is on the App Store and needs Paradev Pro and iOS 26 or later. Android is on a waitlist.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS, Windows and Linux, it is closed source, and it is free during the beta with Pro included. It never sells you model access: each terminal runs on a CLI subscription you already hold.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: 'Instead of accepting any terminal command, CodeAgentSwarm integrates ten agents deliberately: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI. That narrower scope pays for the rest of the feature set: desktop notifications when an agent finishes or needs input, searchable history across all ten and capability-aware resume when the provider supports it, per-terminal live diffs, permissions with Turbo and YOLO modes, git worktrees per session, skills and MCP marketplaces, a quota indicator, AI commit messages, multi-project switching, and a kanban board the agents update over MCP. If you run one vendor for now, the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">guide to running multiple Claude Code sessions</a> is the smaller version of the same idea.',
        },
        {
          type: 'paragraph',
          text: 'The limitations, stated plainly: closed source with no public repository, Mobile Connect still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), beta software, it requires your own CLI subscriptions, and there is no one-click PR button. If you want to read the source of the tool that drives your agents, Paradev lets you do that and we do not.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'paragraph',
          text: 'One rule filled this table: state only what the vendor documents. A cell marked "not documented" says nothing about whether the capability exists.',
        },
        {
          type: 'table',
          headers: ['', 'Superset (now Paradev)', 'CodeAgentSwarm'],
          rows: [
            ['Platforms', 'macOS (Apple Silicon and Intel); experimental Linux x64 AppImage; Windows planned with no date; iPhone and iPad app (Pro, iOS 26 or later); Android on a waitlist', 'macOS, Windows and Linux'],
            ['Install and distribution', 'Desktop download from paradev.com or GitHub releases, plus a standalone CLI. Self-hosting from source is allowed subject to the Elastic License 2.0 terms', 'Desktop installer for macOS and Windows; .deb and AppImage for Linux'],
            ['Interface', 'IDE ("The IDE for Parallel Agents") with terminals, a Changes pane, a PR pane, an in-app browser, a file editor and a chat pane, plus open-in-any-IDE', 'Multi-terminal workspace with a kanban board, history browser and per-terminal diffs'],
            ['Supported agents', '21 built-in agents listed as fully supported, among them Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok, Cursor Agent, Muse Code, Pi, Devin, Gemini CLI and GitHub Copilot, plus any CLI as a custom agent. Status, resume and usage support vary by agent', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI, integrated individually'],
            ['Isolation model', 'One git worktree, branch and terminals per task; remote hosts and cloud workspaces (beta) on paid plans', 'Git worktrees per session, one process per terminal'],
            ['Notifications', 'Sidebar status, completion chimes, dock badges and notifications when an agent finishes or needs input (the needs-input state depends on the agent). Mobile push notifications are listed as coming', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Resume after restart, fork and hand-off to another agent are documented. A searchable history across agents is not documented on their site as of October 31, 2026', 'Searchable history across all ten agents and capability-aware resume'],
            ['Task management', 'Tasks view with list and kanban board (Linear, GitHub issues, native tasks), MCP task tools on their hosted server, and automations on paid plans', 'Kanban board the agents update themselves over MCP. No one-click PR button'],
            ['Open source', 'No. Source available (Elastic License 2.0), which is not an OSI approved open source license', 'No. Closed source, no public app repository'],
            ['Price', 'Free: $0 for 1 user with local workspaces, the desktop app and the CLI. Pro $20 per user per month ($16 billed yearly), Team $60 ($54 yearly), Ultra $200, Enterprise custom', 'Free during beta with Pro included. You bring your own CLI subscriptions'],
            ['Public repo activity (verified Oct 31, 2026)', 'ParadevAI/Paradev: last commit October 31, 2026, about 15,800 stars, public since October 21, 2025', 'Closed source, no public repo'],
          ],
          caption: 'Product, pricing and GitHub facts verified on October 31, 2026 against paradev.com, docs.paradev.com and github.com/ParadevAI/Paradev.',
        },
      ],
    },
    {
      id: 'when-superset',
      title: 'When Superset (now Paradev) is the better pick',
      content: [
        {
          type: 'paragraph',
          text: 'Several of these are cases where we would point you at Paradev without hesitating.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want an IDE, not a terminal grid.</strong> Paradev puts terminals, diff review, a PR pane with checks and merge, an in-app browser and a file editor in one window. If you want to review, preview and ship what your agents wrote without leaving the app, that shape fits better than ours.',
            '<strong>You want to run any CLI agent, not a curated list.</strong> Paradev lists 21 built-in agents and accepts any other terminal agent as a custom one. We integrate ten agent CLIs: better for those ten, worse for everything else.',
            '<strong>You want to read the source.</strong> Elastic License 2.0 is not open source, but source available still beats a closed binary if you need to audit behaviour or self-host under their terms.',
            '<strong>You want automations and remote or cloud machines.</strong> Scheduled and event-driven automations, remote hosts and cloud workspaces point at unattended workflows that CodeAgentSwarm does not document. They need a paid plan.',
            '<strong>You work as a team or need an iPhone app now.</strong> Team and Enterprise plans, SSO, audit logs and a SOC 2 Type II report are on their pricing page, and the iPhone and iPad app is already on the App Store.',
            '<strong>You want a very large number of agents at once.</strong> 100+ parallel agents is their stated design target, and they have been shipping against it publicly since October 2025.',
          ],
        },
      ],
    },
    {
      id: 'when-codeagentswarm',
      title: 'When CodeAgentSwarm is the better pick',
      content: [
        {
          type: 'paragraph',
          text: 'Our advantages come from the narrower scope: ten agents we integrate individually, and a workspace designed around the moment an agent stops and waits for you. Some things we used to list here, like notifications, quota and a board the agents update, Paradev now documents too, so we no longer count them as differences.',
        },
        {
          type: 'list',
          items: [
            '<strong>You need Windows today.</strong> Paradev says Windows is planned with no date. CodeAgentSwarm ships a Windows desktop build.',
            '<strong>You want one searchable history across vendors.</strong> Conversations from all ten agents are stored and searchable in one place instead of ten CLI formats on disk, with resume when the agent supports it. Paradev documents resume, fork and hand-off, but not a searchable history across agents.',
            '<strong>You want the board to stay on your machine.</strong> Our kanban is exposed through a local MCP server, so agents move their own tasks while they work. Paradev\'s task tools run on its hosted MCP server, tied to your organization.',
            '<strong>You want graded permissions with live diffs.</strong> Per-terminal diffs show what each agent touches in real time, and Turbo mode auto-approves the safe operations while the risky ones still stop and ask. Paradev\'s default Claude Code and Codex commands turn approval prompts off, which you can change in its settings.',
            '<strong>You want the paid features without a per-seat plan, for now.</strong> CodeAgentSwarm is free during the beta with Pro included. On Paradev, remote access, automations and mobile start at $16 per user per month billed yearly.',
          ],
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Can you use both?',
      content: [
        {
          type: 'paragraph',
          text: 'They are separate desktop applications with no integration and no shared state, so "using both" means running both, not combining them. That is entirely reasonable: Paradev has a free plan and CodeAgentSwarm is free during beta, so trying each costs you time rather than money.',
        },
        {
          type: 'paragraph',
          text: 'Test them on the same repository, in the same week. Both isolate agents in git worktrees, so neither has to touch your main checkout. After a few real tasks you will know which friction bothered you more: reviewing and shipping the code, or keeping track of which agent needs you next.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Superset free and open source?',
      answer: 'Superset is now called Paradev. It has a free plan at $0 for one user, with local workspaces, the desktop app and the CLI. Paid plans start at $20 per user per month ($16 billed yearly) for Pro, and add remote access, automations and the mobile app. On licensing the precise answer is that Paradev is source available under the Elastic License 2.0, which is not an OSI approved open source license: you can inspect the code, fork it and self-host it for your team, but it is not open source in the strict sense. CodeAgentSwarm is free during beta with Pro included, and closed source with no public repository.',
    },
    {
      question: 'Does Superset support Antigravity CLI, Kimi Code or Grok?',
      answer: 'Yes. The Paradev README (formerly Superset) lists Antigravity CLI, Kimi Code and Grok as fully supported, alongside Claude Code, Codex CLI, Cursor Agent, OpenCode and others. Its docs note that Antigravity does not report a "needs input" state and that Kimi Code has no usage history or quota meter there. CodeAgentSwarm also integrates all three.',
    },
    {
      question: 'Which one is more actively maintained?',
      answer: 'Both are actively developed, and neither side wins this row. On October 31, 2026 the public ParadevAI/Paradev repository (formerly superset-sh/superset) had its last commit that same day, about 15,800 stars, desktop release v2.0.2 from October 29, 2026 and a public history going back to October 21, 2025. CodeAgentSwarm is closed source, so there is no public commit history to check: our cadence has to be taken on trust, which is a fair point against us.',
    },
    {
      question: 'Can I try both for free?',
      answer: 'Yes. Paradev, formerly Superset, offers a free plan and a desktop download from paradev.com, and CodeAgentSwarm is free during the beta with Pro included on macOS, Windows and Linux. Neither resells model access, so you keep using the CLI subscriptions you already pay for, and comparing them costs you only time.',
    },
  ],
}

export default guide
