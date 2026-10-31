import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'nimbalyst-vs-codeagentswarm',
    locale: 'en',
    title: 'Nimbalyst vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Nimbalyst (Crystal) vs CodeAgentSwarm: Honest Comparison 2026',
    metaDescription: 'Nimbalyst, formerly Crystal, is a visual editor for what Claude Code and Codex produce. CodeAgentSwarm supervises ten agent CLIs. Honest comparison, verified in 2026.',
    intro: `Nimbalyst, the project formerly known as Crystal, is an open-source visual workspace for Claude Code, Codex and other coding agents, built around editing what they produce. CodeAgentSwarm is a supervision workspace for ten agent CLIs, built around the terminals rather than around the documents.

We make CodeAgentSwarm, so this is an interested comparison and you should check it. That is also why this page is generous where Nimbalyst deserves it (it is open source, it runs on Linux, it has an iOS app and desktop notifications, and it had a public commit the day we verified) and why our own limits are on the page: closed source, Mobile Connect still in alpha, still in beta, and you bring your own agent subscriptions. Every third-party fact here was verified on October 31, 2026 against nimbalyst.com (home, pricing, download, mobile and docs pages), the public Nimbalyst README and public GitHub data.

Pick Nimbalyst if the work you care about is the artefact: markdown, mockups, diagrams, documents you want to edit alongside the agent. Pick CodeAgentSwarm if the work you care about is the sessions: several agent CLIs running at once and you needing to know what each one is doing.`,
    ctaText: 'If you want to supervise ten different agent CLIs at once, with notifications, live per-terminal diffs and one searchable history, download CodeAgentSwarm and see how it feels next to Nimbalyst.',
    ctaAgent: 'comparison',
    highlightedWords: ['Nimbalyst', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'nimbalyst-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Nimbalyst, formerly Crystal, is an open-source visual workspace for Claude Code, Codex and other coding agents, letting you review and edit the markdown, mockups and diagrams alongside the agent, while CodeAgentSwarm is a supervision workspace for ten agent CLIs, built around the running terminals.',
        },
        {
          type: 'paragraph',
          text: 'These are the two honest halves of the same day. For the full landscape, read <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">the best tools to run multiple AI coding agents</a>, and if watching edits land is the part you care about, our guide on how to <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">view Claude Code changes in real time</a> covers our side of it.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product. All third-party facts on this page were verified on October 31, 2026 against nimbalyst.com, their docs, the public nimbalyst/nimbalyst README and public GitHub data, including the Crystal rename. Where their documentation does not mention something, we say it is not documented rather than claiming it is absent.',
        },
      ],
    },
    {
      id: 'what-is-nimbalyst',
      title: 'What Nimbalyst is (and its Crystal history)',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://nimbalyst.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst</a> now presents two products on its site: Nimbalyst Wiki, a free plugin that has your agents write a wiki of notes, open questions and decisions (it works in Claude Code, Codex, Cowork, Cursor, VS Code or any MCP agent, with no app needed), and the Nimbalyst App, a visual workspace for agents, tasks, docs, wiki, diagrams and code. This page compares the app. Their README describes built-in WYSIWYG editors for markdown, mockups with annotations, Mermaid, Excalidraw, CSV, data models and code through Monaco, where you approve agent changes as red and green diffs, then edit and annotate them.',
        },
        {
          type: 'paragraph',
          text: 'This is the project formerly called Crystal. The old repository, <a href="https://github.com/stravu/crystal" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">stravu/crystal</a>, still says in its own description that Crystal is now Nimbalyst and points at nimbalyst.com. That repository is MIT with about 3,100 stars and its last public commit was February 26, 2026. Development moved to <a href="https://github.com/nimbalyst/nimbalyst" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">nimbalyst/nimbalyst</a>, also MIT, with about 2,000 stars on October 31, 2026, a public commit that same day and a latest release, v0.82.4, from October 27. So if you remember Crystal, the star count looks like it dropped: it did not, the project changed address.',
        },
        {
          type: 'list',
          items: [
            'Open source under the MIT license, with builds for macOS (Apple Silicon and Intel), Windows and Linux (.deb and AppImage) per their README',
            'An iOS app for iPhone and iPad on the App Store, with a session dashboard, voice or text replies, swipe-through diff review and push notifications when agents need you. Their mobile page says Android is planned',
            'Desktop notifications when a session completes, with a system notification when Nimbalyst is not the active window and optional completion sounds, per their docs',
            'Session management: run sessions in parallel, search and resume them, link sessions to the files they touched, and see them in a kanban view',
            'Task tracking that the agent can edit as well as you',
            'Developer tooling: git state management, AI commit messages, worktrees and an embedded Ghostty terminal',
            'An extension system with pluggable editors, plus MCP server support',
          ],
        },
        {
          type: 'paragraph',
          text: 'Their docs list Claude Agent (their own integrated Claude coding agent), OpenAI Codex and an opt-in Claude Code CLI provider, plus alpha providers for OpenCode, GitHub Copilot, Grok Build, Cursor Agent and Gemini through Antigravity. The shorter list in their README still names Codex, Claude Code, Opencode (alpha) and Copilot (alpha). Their pricing page says the app and your personal wiki are free, with no feature limits, and that you bring your own Claude Code or Codex subscription, an API key or local models through LM Studio. The paid plan is Wiki Teams, a shared wiki for your team, at $20 per user per month or $200 per user per year, free while it is in beta.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. Each terminal is a real agent process, and you choose per terminal between Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: 'The design is terminal-first. You get desktop notifications when an agent finishes or needs input, searchable conversation history across all ten agents and capability-aware resume, per-terminal live file diffs, permission control with a Turbo mode for the operations you trust, a kanban board the agents update over MCP, git worktrees per session, multi-project switching, AI commit messages, a provider quota indicator, and skills and MCP marketplaces shared across agents.',
        },
        {
          type: 'paragraph',
          text: 'And the limits: closed source with no public repository, Mobile Connect still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), still in beta with Pro included, and no models of our own, so your existing subscriptions do the work.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'table',
          headers: ['', 'Nimbalyst (formerly Crystal)', 'CodeAgentSwarm'],
          rows: [
            ['Platforms', 'macOS (Apple Silicon and Intel), Windows and Linux desktop, plus an iOS app for iPhone and iPad (Android planned), per their README and site', 'macOS, Windows and Linux desktop. Mobile Connect alpha: web beta for every account, native iOS and Android access by request, desktop must stay open'],
            ['Interface', 'Desktop app built around visual editors, with a session kanban, an embedded terminal and a wiki your agents write', 'Desktop workspace built around live agent terminals'],
            ['Supported agents', 'Claude Agent, Codex and an opt-in Claude Code CLI, plus OpenCode, GitHub Copilot, Grok Build, Cursor Agent and Gemini through Antigravity in alpha, per their docs', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI'],
            ['Isolation model', 'Parallel sessions, each in its own git worktree, per their README', 'A separate process per terminal, with optional git worktrees per session'],
            ['Notifications', 'Desktop notifications when a session completes, optional completion sounds, and push notifications in their iOS app, per their docs', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Search and resume sessions, with sessions linked to the files they touched', 'Searchable history across all ten agents and capability-aware resume'],
            ['Task management', 'Task tracking plus a kanban view of sessions, editable by you and by the agent', 'Kanban board that the agents update over MCP'],
            ['Open source', 'Yes, MIT, about 2,000 stars on the current repository', 'No, closed source with no public app repository'],
            ['Price', 'App and personal wiki free. Wiki Teams is $20 per user per month or $200 per user per year, free during beta. You bring your own subscription or API key', 'Free during beta with Pro included, and you bring your own agent subscriptions'],
            ['Last public commit (verified Oct 31, 2026)', 'October 31, 2026 on nimbalyst/nimbalyst (latest release v0.82.4, October 27); February 26, 2026 on the old stravu/crystal repository', 'Closed source, no public repo'],
          ],
          caption: 'All Nimbalyst facts and repository data were verified on October 31, 2026 against nimbalyst.com, their docs and public GitHub data.',
        },
      ],
    },
    {
      id: 'when-nimbalyst',
      title: 'When Nimbalyst is the better choice',
      content: [
        {
          type: 'paragraph',
          text: 'Nimbalyst wins several of these outright, and if any of them is your situation you should use it rather than us.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want to edit what the agent produces, visually.</strong> Markdown, mockups with annotations, Mermaid, Excalidraw, CSV and data models in WYSIWYG editors, approving changes as red and green diffs. We have no equivalent to that at all.',
            '<strong>You want open source.</strong> MIT, public repository, and a very active one: there was a public commit on October 31, 2026, the day we checked, and several releases in the last week of October. CodeAgentSwarm is closed source.',
            '<strong>You want a public native mobile app today.</strong> Their iOS app, on the App Store for iPhone and iPad, offers a session dashboard, push notifications, voice or text replies and swipe-through diff approval. CodeAgentSwarm Mobile Connect is still in alpha: web beta is available, while native iOS and Android access is by request and the desktop must stay open.',
            '<strong>Non-developers are involved.</strong> Product and design people can work on documents and mockups in the same tool, and Wiki Teams lets teammates read and edit shared pages in the browser. A terminal workspace does not really allow that.',
            '<strong>You want to extend the tool.</strong> Their extension system lets you build custom editors for your own file types.',
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
            '<strong>You use agents Nimbalyst does not list.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI are all first-class here. Kimi Code, Muse Code, Pi and Devin CLI are not among the providers in the Nimbalyst docs as of October 31, 2026, and OpenCode, Copilot, Grok Build, Cursor Agent and Gemini are still alpha there.',
            '<strong>You want the terminals, not an abstraction over them.</strong> Every session is a real CLI in a pane you can read, scroll and type into, which matters when an agent does something unexpected. In Nimbalyst the default Claude integration is their own Claude Agent, and the raw Claude Code CLI is an opt-in provider.',
            '<strong>You want one history across every vendor.</strong> Search a phrase and find the session, whichever of the ten agents ran it, then resume it when that agent supports resume.',
            '<strong>You want fine-grained permission control.</strong> Turbo mode auto-approves the operations you trust and keeps the rest gated, instead of approving everything or nothing.',
            '<strong>You keep running into plan limits.</strong> The provider quota indicator tells you how much allowance is left before an agent stops mid-task.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'A blunt way to choose: if your day is mostly editing the artefacts around the code, Nimbalyst is built for that. If your day is mostly keeping several agent sessions moving, that is what we built.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Using both',
      content: [
        {
          type: 'paragraph',
          text: 'Both are desktop apps working against the same repositories and both support git worktrees, so running them side by side is straightforward. A practical split: CodeAgentSwarm for the parallel agent sessions and the supervision around them, Nimbalyst when you want to sit with a document, a mockup or a diagram and iterate on it visually.',
        },
        {
          type: 'paragraph',
          text: 'Still comparing? The <a href="/en/guides/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad comparison</a> covers the terminal-only approach and the <a href="/en/guides/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban comparison</a> covers the kanban-first one.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Nimbalyst the same as Crystal?',
      answer: 'Yes, it is the same project renamed. The old repository stravu/crystal states in its own description that Crystal is now Nimbalyst and links to nimbalyst.com. Crystal is MIT with about 3,100 stars and its last public commit was February 26, 2026, while development continues at nimbalyst/nimbalyst, also MIT, with about 2,000 stars and a public commit on October 31, 2026. All of this was verified on October 31, 2026.',
    },
    {
      question: 'Is Nimbalyst open source?',
      answer: 'Yes. The nimbalyst/nimbalyst repository is published under the MIT license, with about 2,000 stars (2,006 when checked on October 31, 2026). Their README notes that the collaboration sync server behind their team features is a separate project. CodeAgentSwarm is closed source with no public application repository, so if open source is a requirement, Nimbalyst wins that point.',
    },
    {
      question: 'Is Nimbalyst actively maintained?',
      answer: 'When checked on October 31, 2026, the nimbalyst/nimbalyst repository had a public commit from that same day and its latest release, v0.82.4, was from October 27, so it was very active at the time of verification. The predecessor repository, stravu/crystal, last saw a public commit on February 26, 2026, which is expected after the rename. Check the repository yourself before committing a workflow to any tool.',
    },
    {
      question: 'Does Nimbalyst support Antigravity CLI or Kimi Code?',
      answer: 'Kimi Code is not among the providers in the Nimbalyst docs as of October 31, 2026. For Antigravity, they offer Gemini through Antigravity in alpha, which uses the language server bundled with Google\'s Antigravity desktop app rather than the Antigravity CLI. Their docs also list Claude Agent, Codex and an opt-in Claude Code CLI, plus OpenCode, GitHub Copilot, Grok Build and Cursor Agent in alpha. CodeAgentSwarm runs Antigravity CLI and Kimi Code directly, alongside eight other agent CLIs.',
    },
  ],
}

export default guide
