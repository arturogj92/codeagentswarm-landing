import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 't3-code-vs-codeagentswarm',
    locale: 'en',
    title: 'T3 Code vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'T3 Code vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'T3 Code is an open source control plane that ends in a one-click PR. CodeAgentSwarm is a supervision workspace for seven agent CLIs. Honest 2026 comparison.',
    intro: `T3 Code is an MIT licensed, open source control plane that puts several coding agents behind one polished desktop UI and finishes each thread with a one-click pull request, while CodeAgentSwarm is a closed source desktop workspace built for supervising several agent CLIs at once, with desktop notifications, searchable cross-agent history and a kanban board the agents update themselves over MCP.

Disclosure before anything else: we build CodeAgentSwarm. T3 Code wins several rows below, and our own limitations (closed source, no Linux desktop build, Mobile Connect still in alpha, still in beta) are printed in the same table as everything else. Every third-party fact here was checked on August 25, 2026 against t3.codes and public GitHub data, and anything we could not verify is labelled as such instead of guessed. CodeAgentSwarm availability on this page was updated on August 23, 2026.

Short version: pick T3 Code if open source, Linux support and a fast path from diff to pull request matter most. Pick CodeAgentSwarm if you run agents from seven different vendors and need notifications, history and a task board to keep track of them.`,
    ctaText: 'Try both on the same repository and keep the one that fits your week. CodeAgentSwarm is free during beta, with Pro included, for macOS and Windows.',
    ctaAgent: 'comparison',
    highlightedWords: ['T3 Code', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-08-31',
    alternateSlug: 't3-code-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code is an open source control plane that wraps several coding agents in one desktop UI and optimises the path from a finished diff to a pull request, while CodeAgentSwarm is a closed source desktop workspace optimised for supervising many agent terminals at once across seven different CLI vendors.',
        },
        {
          type: 'paragraph',
          text: 'Both tools sit on top of the CLI agents you already pay for, and neither of them resells tokens. The difference is what they consider the hard part. T3 Code treats shipping the work as the hard part. CodeAgentSwarm treats keeping up with many agents as the hard part. If you want the wider field before you commit to either, the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools to run multiple AI coding agents</a> roundup covers the rest of the category, and there is a sibling comparison for <a href="/en/guides/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product. Everything we say about T3 Code was verified on August 25, 2026 against their own site (t3.codes) and public GitHub data for pingdotgg/t3code. Where a feature is not documented publicly, this page says so rather than claiming T3 Code lacks it.',
        },
      ],
    },
    {
      id: 'what-is-t3-code',
      title: 'What T3 Code is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://t3.codes" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">T3 Code</a> describes itself as "the open-source control plane for coding agents". It comes from the Ping team around Theo Browne of t3.gg, and the source lives at <a href="https://github.com/pingdotgg/t3code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">pingdotgg/t3code</a> under the MIT license. Their homepage sums the pitch up as bring your own subscription, fork the whole thing.',
        },
        {
          type: 'paragraph',
          text: 'The momentum is real and worth stating plainly. The repository was created on February 8, 2026 and had 21,084 stars when its public GitHub data was refreshed on August 31, 2026, with its last public commit that day. Roughly 21,100 stars in under seven months is the fastest growth anyone in this category has shown, and it is a legitimate reason to take T3 Code seriously.',
        },
        {
          type: 'list',
          items: [
            'A three-panel desktop layout with an integrated terminal, plus remote access to your sessions',
            'Git worktrees, so each agent thread works on its own branch without stepping on the others',
            'A per-turn diff viewer in unified or split view, so you review each turn rather than one giant diff at the end',
            'One-click Commit, Push and Create PR, with generated titles and bodies, working with your existing GitHub auth',
            'Model and reasoning-level selection, plus chat and plan modes',
            'Per-project quick actions and, per their roadmap, skills management, headless mode and CLI integration',
          ],
        },
        {
          type: 'paragraph',
          text: 'On agents, their site lists Claude Code, Codex, OpenCode, Cursor and Grok, and says more harnesses ship weekly. Distribution is unusually generous: desktop apps for macOS, Windows and Linux, a web app, and public iOS and Android apps. It is free, open source under MIT and uses your existing agent subscriptions.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS and Windows, it is closed source, and it is free during the beta with Pro included. It is not a model provider: every terminal runs on a CLI subscription you already have.',
        },
        {
          type: 'image',
          alt: 'Several AI coding agent terminals running side by side in one CodeAgentSwarm window, each with its own title and status',
          src: '/images/guides/multi-terminal.png',
          caption: 'Multiple agent terminals in a single CodeAgentSwarm workspace. Each one is a separate process with its own conversation, title and status.',
        },
        {
          type: 'paragraph',
          text: 'The design assumption is that past two or three agents, the bottleneck stops being the agents and becomes you. So the features cluster around attention: desktop notifications when an agent finishes or stops to ask something, searchable history across all seven agents and capability-aware resume, per-terminal live diffs, permissions with Turbo and YOLO modes, a quota indicator, AI commit messages, git worktrees per session, skills and MCP marketplaces, and a kanban board the agents update over MCP. If you mostly run one vendor, the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">guide to running multiple Claude Code sessions</a> is the same idea at a smaller scale.',
        },
        {
          type: 'paragraph',
          text: 'The honest limitations, in the same breath: it is closed source, there is no public app repository, there is no Linux desktop build, Mobile Connect is still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), it is beta software, it needs your own CLI subscriptions, and there is no one-click PR button (you commit from the app, then open the PR yourself). If any of those are dealbreakers, T3 Code is probably the better tool for you and the rest of this page will not change that.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'paragraph',
          text: 'Two rules filled this table: state only what the vendor documents, and label the rest. A cell that says "not documented" says nothing about whether the feature exists.',
        },
        {
          type: 'table',
          headers: ['', 'T3 Code', 'CodeAgentSwarm'],
          rows: [
            ['Platforms', 'macOS, Windows and Linux desktop; web; iOS and Android', 'macOS and Windows. Mobile Connect alpha; no Linux build'],
            ['Install and distribution', '<code>npx t3@latest</code> with nothing installed, desktop app, winget, Homebrew cask, AUR, direct downloads', 'Desktop installer for macOS and Windows'],
            ['Interface', 'Three-panel layout with an integrated terminal, plus remote access', 'Multi-terminal workspace with a kanban board, history browser and per-terminal diffs'],
            ['Supported agents', 'Claude Code, Codex, OpenCode, Cursor and Grok listed on t3.codes, with more harnesses shipping weekly', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent'],
            ['Isolation model', 'Git worktrees, one branch per agent thread', 'Git worktrees per session, one process per terminal'],
            ['Notifications', 'Not documented on their site as of August 25, 2026', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Per-turn diff viewer with chat and plan modes. A cross-agent searchable history is not documented on their site as of August 25, 2026', 'Searchable history across all seven agents and capability-aware resume'],
            ['Task management', 'Per-project quick actions, plus one-click Commit, Push and Create PR', 'Kanban board the agents update over MCP. No one-click PR button'],
            ['Open source', 'Yes, MIT (pingdotgg/t3code)', 'No. Closed source, no public app repository'],
            ['Price', 'Free, bring your own key, no subscription (their claim)', 'Free during beta with Pro included. You bring your own CLI subscriptions'],
            ['Last public commit (verified Aug 31, 2026)', 'August 31, 2026. 21,084 stars since February 8, 2026', 'Closed source, no public repo'],
          ],
          caption: 'Product facts verified on August 25, 2026 against t3.codes. Public GitHub stars and activity refreshed on August 31, 2026.',
        },
      ],
    },
    {
      id: 'when-t3-code',
      title: 'When T3 Code is the better pick',
      content: [
        {
          type: 'paragraph',
          text: 'Several situations send you to T3 Code instead of our own app, and none of them are close calls.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want open source.</strong> MIT licensed and forkable: read the code, patch it, ship your own build. CodeAgentSwarm offers none of that.',
            '<strong>You are on Linux.</strong> T3 Code ships an AppImage and is on the AUR. CodeAgentSwarm has no Linux build, so this is a hard stop rather than a trade-off.',
            '<strong>You want to try it in ten seconds.</strong> <code>npx t3@latest</code> runs it with nothing installed, a lower barrier than any installer.',
            '<strong>Your bottleneck is shipping, not supervising.</strong> One button to commit, push and open a PR with a generated title and body, including draft and stacked PRs, beats doing it by hand. We generate commit messages but have no PR button.',
            '<strong>You want public mobile apps.</strong> T3 Code ships iOS and Android apps today. CodeAgentSwarm Mobile Connect is still in alpha.',
            '<strong>You value community momentum.</strong> Roughly 21,100 stars in under seven months and frequent harness additions mean bugs get found and fixed fast.',
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
          text: 'The cases that favour us all come from the same place: many agents running at once, from different vendors, needing you at unpredictable moments.',
        },
        {
          type: 'list',
          items: [
            '<strong>You use Antigravity CLI or Kimi Code.</strong> Neither is named among the agents on t3.codes as of August 25, 2026. CodeAgentSwarm supports both, plus Claude Code, Codex CLI and OpenCode.',
            '<strong>You want to be told, not to check.</strong> Desktop notifications fire when any agent finishes or needs input, so you can leave the window and come back when something happened.',
            '<strong>You want one searchable history across vendors.</strong> Conversations from all seven agents are stored and searchable in one place instead of seven different formats, with resume when the agent supports it.',
            '<strong>You want the agents to keep your board honest.</strong> The kanban is exposed over MCP, so agents move their own tasks as they work.',
            '<strong>You watch quota.</strong> The provider quota indicator shows how much room each subscription has left before you start a long run.',
            '<strong>You want live diffs with graded permissions.</strong> Per-terminal diffs show what each agent touches in real time, and Turbo mode auto-approves the safe operations while the risky ones still stop and ask.',
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
          text: 'They are two separate desktop applications, so there is no integration between them and no shared state. But nothing stops you from installing both, because both are free to try: T3 Code is free and bring your own key, and CodeAgentSwarm is free during beta.',
        },
        {
          type: 'paragraph',
          text: 'Test them on the same repository, in the same week, on the same kind of work. Both use git worktrees, so neither has to touch your main checkout while you experiment. After a couple of real tasks, ask which friction you noticed more: not knowing what your agents were doing, or the manual steps between a good diff and a merged PR. That answer picks the tool.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is T3 Code free and open source?',
      answer: 'Yes to both. T3 Code is free with a bring-your-own-key model and no subscription, and its source is public at github.com/pingdotgg/t3code under the MIT license, an OSI approved open source license. CodeAgentSwarm is free during beta with Pro included, but closed source with no public repository.',
    },
    {
      question: 'Does T3 Code support Antigravity CLI or Kimi Code?',
      answer: 'Neither is listed among the supported agents on t3.codes as of August 25, 2026. Their site names Claude Code, Codex, OpenCode, Cursor and Grok, and says more harnesses ship weekly, so this may change. CodeAgentSwarm supports Antigravity CLI and Kimi Code today, along with Claude Code, Codex CLI and OpenCode.',
    },
    {
      question: 'Which one is more actively maintained?',
      answer: 'Both are active, and neither side wins this row. The public t3code repository had its last commit on August 31, 2026, with 21,084 stars when its GitHub data was refreshed that day. CodeAgentSwarm is closed source, so there is no public commit history to inspect: our cadence has to be taken on trust, and that is a fair criticism.',
    },
    {
      question: 'Can I try both for free?',
      answer: 'Yes. T3 Code runs with npx t3@latest without installing anything, or as a desktop app on macOS, Windows and Linux, free with your own agent subscriptions. CodeAgentSwarm is free during the beta with Pro included, for macOS and Windows. Neither resells model tokens, so you keep using the CLI subscriptions you already pay for.',
    },
  ],
}

export default guide
