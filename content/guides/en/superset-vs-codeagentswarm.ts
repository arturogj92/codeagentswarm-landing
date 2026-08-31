import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'superset-vs-codeagentswarm',
    locale: 'en',
    title: 'Superset vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Superset vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'Superset is a source available code editor for running 10+ parallel agents. CodeAgentSwarm is a supervision workspace for seven agent CLIs. Honest 2026 comparison.',
    intro: `Superset is a source available code editor built around running ten or more parallel coding agents, each isolated in its own git worktree, while CodeAgentSwarm is a closed source desktop workspace built around supervising agents from seven specific CLI vendors, with desktop notifications, searchable cross-agent history and a kanban board the agents update themselves over MCP.

Disclosure up front: we build CodeAgentSwarm. That is the reason this page states where Superset is better instead of pretending otherwise, and why our own limitations (closed source, no Linux desktop build, Mobile Connect still in alpha, still in beta) sit in the same table as everything else. Both tools were judged on the same criteria. Every third-party fact was verified on August 25, 2026 against superset.sh and public GitHub data, and anything we could not verify is labelled rather than guessed. CodeAgentSwarm availability on this page was updated on August 23, 2026.

Short version: pick Superset if you want an editor-shaped environment, experimental Linux support and source you can inspect. Pick CodeAgentSwarm if you need Windows today, searchable cross-agent history and a kanban board the agents update themselves. Both now document all seven agent vendors supported by CodeAgentSwarm.`,
    ctaText: 'Both are free to start, so run them on the same repository for a week. CodeAgentSwarm is free during beta, with Pro included, for macOS and Windows.',
    ctaAgent: 'comparison',
    highlightedWords: ['Superset', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-31',
    alternateSlug: 'superset-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Superset is an editor-shaped environment for running a large number of parallel agents in isolated git worktrees, while CodeAgentSwarm is a supervision workspace for a curated set of seven agent CLIs, built around noticing when one of them needs you.',
        },
        {
          type: 'paragraph',
          text: 'The two products agree on the premise: one agent at a time wastes your time, and parallel agents need isolation. They disagree on what to build around it. Superset builds an editor with review, automation and an MCP server for programmatic control. CodeAgentSwarm builds an attention layer with notifications, history and a shared board. For the wider field, see the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a> roundup, and there is a sibling page for <a href="/en/guides/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product. Everything stated here about Superset was verified on August 25, 2026 against their own site (superset.sh) and public GitHub data for superset-sh/superset. Where something is not documented publicly, this page says so rather than claiming Superset lacks it.',
        },
      ],
    },
    {
      id: 'what-is-superset',
      title: 'What Superset is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://superset.sh" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset</a> leads with a very concrete promise: run 10+ parallel coding agents on your machine, spin up new coding tasks while waiting for your current agent to finish, and quickly switch between tasks as they need your attention. Their repository, <a href="https://github.com/superset-sh/superset" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">superset-sh/superset</a>, describes the product as a "Code Editor for the AI Agents Era".',
        },
        {
          type: 'paragraph',
          text: 'The licensing deserves precision, because it is easy to get wrong. Superset is source available under the Elastic License 2.0. That is not an OSI approved open source license: you can read the code and self-host it subject to the license terms, but the usual open source freedoms do not all apply. Their own FAQ puts it the same way. The repository had 13,538 stars when its public GitHub data was refreshed on August 31, 2026, with its last public commit that day, and it has been public since October 21, 2025.',
        },
        {
          type: 'list',
          items: [
            'Every agent runs in its own isolated git worktree, so parallel work does not collide',
            'Diff review and a pull request view, so you approve changes rather than discover them',
            'Persistent terminals that survive while you move between tasks',
            'Scheduled automations and an MCP server for programmatic control, per their own service description',
            'Open in any IDE with one click: VS Code, Cursor, Xcode, JetBrains, Finder or a plain terminal',
            'A free tier, with paid and enterprise plans listed on their site',
          ],
        },
        {
          type: 'paragraph',
          text: 'Their README now documents first-class support for Amp, Antigravity CLI, Claude Code, Codex CLI, Cursor Agent, Gemini CLI, Grok, Kimi Code and OpenCode, while also accepting custom terminal agents. Releases are available for macOS; Linux has an experimental AppImage; Windows is not yet available. An iOS app is listed as coming soon.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS and Windows, it is closed source, and it is free during the beta with Pro included. It never sells you model access: each terminal runs on a CLI subscription you already hold.',
        },
        {
          type: 'image',
          alt: 'The CodeAgentSwarm agent selector, showing the seven supported CLI agents you can assign to a terminal',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Choosing which CLI agent runs in a terminal. CodeAgentSwarm integrates seven specific vendors rather than accepting any command.',
        },
        {
          type: 'paragraph',
          text: 'Instead of accepting any terminal command, CodeAgentSwarm integrates seven agents deliberately: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent. That narrower scope pays for the rest of the feature set: desktop notifications when an agent finishes or needs input, searchable history across all seven and capability-aware resume when the provider supports it, per-terminal live diffs, permissions with Turbo and YOLO modes, git worktrees per session, skills and MCP marketplaces, a quota indicator, AI commit messages, multi-project switching, and a kanban board the agents update over MCP. If you run one vendor for now, the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">guide to running multiple Claude Code sessions</a> is the smaller version of the same idea.',
        },
        {
          type: 'paragraph',
          text: 'The limitations, stated plainly: closed source with no public repository, no Linux desktop build, Mobile Connect still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), beta software, it requires your own CLI subscriptions, and there is no one-click PR button. If you want to read the source of the tool that drives your agents, Superset lets you do that and we do not.',
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
          headers: ['', 'Superset', 'CodeAgentSwarm'],
          rows: [
            ['Platforms', 'macOS; experimental Linux AppImage; Windows not yet available; iOS coming soon', 'macOS and Windows. No Linux build'],
            ['Install and distribution', 'Desktop download from superset.sh. Self-hosting from source is allowed subject to the Elastic License 2.0 terms', 'Desktop installer for macOS and Windows'],
            ['Interface', 'Editor-shaped app ("Code Editor for the AI Agents Era") with diff and PR review, plus open-in-any-IDE (VS Code, Cursor, Xcode, JetBrains)', 'Multi-terminal workspace with a kanban board, history browser and per-terminal diffs'],
            ['Supported agents', 'Amp, Antigravity CLI, Claude Code, Codex CLI, Cursor Agent, Gemini CLI, Grok, Kimi Code and OpenCode, plus custom terminal agents', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent, integrated individually'],
            ['Isolation model', 'One isolated git worktree per agent, one branch per task', 'Git worktrees per session, one process per terminal'],
            ['Notifications', 'Completion chimes and dock badges when an agent needs attention', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Not documented on their site as of August 25, 2026', 'Searchable history across all seven agents and capability-aware resume'],
            ['Task management', 'Parallel task switching, scheduled automations and an MCP server for programmatic control', 'Kanban board the agents update themselves over MCP. No one-click PR button'],
            ['Open source', 'No. Source available (Elastic License 2.0), which is not an OSI approved open source license', 'No. Closed source, no public app repository'],
            ['Price', 'Free tier, with paid and enterprise plans listed on their site', 'Free during beta with Pro included. You bring your own CLI subscriptions'],
            ['Last public commit (verified Aug 31, 2026)', 'August 31, 2026. 13,538 stars, public since October 21, 2025', 'Closed source, no public repo'],
          ],
          caption: 'Product facts verified on August 25, 2026 against superset.sh. Public GitHub stars and activity refreshed on August 31, 2026.',
        },
      ],
    },
    {
      id: 'when-superset',
      title: 'When Superset is the better pick',
      content: [
        {
          type: 'paragraph',
          text: 'Several of these are cases where we would point you at Superset without hesitating.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want an editor, not a terminal grid.</strong> Superset is shaped like a code editor, with file navigation, diff review and a PR view in one window. If you want to read and edit the code your agents touch without leaving the app, that shape fits better than ours.',
            '<strong>You are on Linux.</strong> Superset publishes an experimental AppImage. CodeAgentSwarm has no Linux build, so Superset is the available option if experimental support fits your workflow.',
            '<strong>You want to run any CLI agent, not a curated list.</strong> Their position is that if it runs in a terminal, it runs in Superset. We integrate seven vendors: better for those seven, worse for everything else.',
            '<strong>You want to read the source.</strong> Elastic License 2.0 is not open source, but source available still beats a closed binary if you need to audit behaviour or self-host under their terms.',
            '<strong>You want scheduled automations and programmatic control.</strong> Their MCP server and scheduled automations point at unattended workflows that CodeAgentSwarm does not document.',
            '<strong>You want ten or more agents at once.</strong> That is their explicit design target, and they have been shipping against it publicly since October 2025.',
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
          text: 'Our advantages come from the narrower scope: seven agents we integrate individually, and a workspace designed around the moment an agent stops and waits for you.',
        },
        {
          type: 'list',
          items: [
            '<strong>You need Windows today.</strong> Superset says Windows is not yet available. CodeAgentSwarm ships a Windows desktop build.',
            '<strong>You want to be interrupted, not to poll.</strong> Desktop notifications fire when any agent finishes or needs input, which matters more the more parallel tasks you are supposed to watch.',
            '<strong>You want one searchable history across vendors.</strong> Conversations from all seven agents are stored and searchable in one place instead of seven CLI formats on disk, with resume when the agent supports it.',
            '<strong>You want the board updated by the agents.</strong> The kanban is exposed over MCP, so agents move their own tasks while they work.',
            '<strong>You watch your quota.</strong> The provider quota indicator tells you how much room each subscription has left before a long parallel run.',
            '<strong>You want graded permissions with live diffs.</strong> Per-terminal diffs show what each agent touches in real time, and Turbo mode auto-approves the safe operations while the risky ones still stop and ask.',
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
          text: 'They are separate desktop applications with no integration and no shared state, so "using both" means running both, not combining them. That is entirely reasonable: Superset has a free tier and CodeAgentSwarm is free during beta, so trying each costs you time rather than money.',
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
      answer: 'Superset has a free tier, with paid and enterprise plans listed on their site. On licensing the precise answer is that Superset is source available under the Elastic License 2.0, which is not an OSI approved open source license: you can inspect the code and self-host it subject to the license terms, but it is not open source in the strict sense. CodeAgentSwarm is free during beta with Pro included, and closed source with no public repository.',
    },
    {
      question: 'Does Superset support Antigravity CLI, Kimi Code or Grok?',
      answer: 'Yes. Its README lists Antigravity CLI, Kimi Code and Grok as fully supported, alongside Claude Code, Codex CLI, Cursor Agent, OpenCode and others. CodeAgentSwarm also integrates all three.',
    },
    {
      question: 'Which one is more actively maintained?',
      answer: 'Both are actively developed, and neither side wins this row. The public superset-sh/superset repository had its last commit on August 31, 2026, with 13,538 stars when its GitHub data was refreshed that day and a public history going back to October 21, 2025. CodeAgentSwarm is closed source, so there is no public commit history to check: our cadence has to be taken on trust, which is a fair point against us.',
    },
    {
      question: 'Can I try both for free?',
      answer: 'Yes. Superset offers a free tier and a desktop download from superset.sh, and CodeAgentSwarm is free during the beta with Pro included on macOS and Windows. Neither resells model access, so you keep using the CLI subscriptions you already pay for, and comparing them costs you only time.',
    },
  ],
}

export default guide
