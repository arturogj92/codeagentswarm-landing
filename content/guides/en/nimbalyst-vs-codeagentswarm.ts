import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'nimbalyst-vs-codeagentswarm',
    locale: 'en',
    title: 'Nimbalyst vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Nimbalyst (formerly Crystal) vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'Nimbalyst, formerly Crystal, is a visual editor for what Claude Code and Codex produce. CodeAgentSwarm supervises five agent CLIs. Honest comparison, verified July 2026.',
    intro: `Nimbalyst, the project formerly known as Crystal, is a visual editor for what Claude Code and Codex produce. CodeAgentSwarm is a supervision workspace for five agent CLIs, built around the terminals rather than around the documents.

We make CodeAgentSwarm, so this is an interested comparison and you should check it. That is also why this page is generous where Nimbalyst deserves it (it is open source, it runs on Linux, it has a mobile app and it was being actively committed to on the day we verified) and why our own limits are on the page: closed source, macOS and Windows only, no mobile app, still in beta, and you bring your own agent subscriptions. Every third-party fact here was verified on July 26, 2026 against nimbalyst.com, the public Nimbalyst README and public GitHub data.

Pick Nimbalyst if the work you care about is the artefact: markdown, mockups, diagrams, documents you want to edit alongside the agent. Pick CodeAgentSwarm if the work you care about is the sessions: several agent CLIs running at once and you needing to know what each one is doing.`,
    ctaText: 'If you want to supervise five different agent CLIs at once, with notifications, live per-terminal diffs and one searchable history, download CodeAgentSwarm and see how it feels next to Nimbalyst.',
    ctaAgent: 'comparison',
    highlightedWords: ['Nimbalyst', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    alternateSlug: 'nimbalyst-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Nimbalyst, formerly Crystal, is a visual editor for what Claude Code and Codex produce, letting you review and edit the markdown, mockups and diagrams alongside the agent, while CodeAgentSwarm is a supervision workspace for five agent CLIs, built around the running terminals.',
        },
        {
          type: 'paragraph',
          text: 'These are the two honest halves of the same day. For the full landscape, read <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">the best tools to run multiple AI coding agents</a>, and if watching edits land is the part you care about, our guide on how to <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">view Claude Code changes in real time</a> covers our side of it.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product. All third-party facts on this page were verified on July 26, 2026 against nimbalyst.com, the public nimbalyst/nimbalyst README and public GitHub data, including the Crystal rename. Where their documentation does not mention something, we say it is not documented rather than claiming it is absent.',
        },
      ],
    },
    {
      id: 'what-is-nimbalyst',
      title: 'What Nimbalyst is (and its Crystal history)',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://nimbalyst.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst</a> calls itself the visual editor for Claude Code and Codex: run parallel sessions, review AI diffs, and edit markdown, mockups, diagrams and code. Their README describes built-in WYSIWYG editors for markdown, mockups with annotations, Mermaid, Excalidraw, CSV, data models and code through Monaco, where you approve agent changes as red and green diffs, then edit and annotate them.',
        },
        {
          type: 'paragraph',
          text: 'This is the project formerly called Crystal. The old repository, <a href="https://github.com/stravu/crystal" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">stravu/crystal</a>, still says in its own description that Crystal is now Nimbalyst and points at nimbalyst.com. That repository is MIT with about 3,100 stars (3,106) and its last public commit was February 26, 2026. Development moved to <a href="https://github.com/nimbalyst/nimbalyst" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">nimbalyst/nimbalyst</a>, also MIT, with about 1,300 stars (1,327) and a public commit on July 26, 2026, the day we verified this page. So if you remember Crystal, the star count looks like it dropped: it did not, the project changed address.',
        },
        {
          type: 'list',
          items: [
            'Open source under the MIT license, with builds for macOS (Apple Silicon and Intel), Windows and Linux per their README',
            'A mobile app, with a session dashboard, voice or text replies, swipe-through diff review and push notifications when agents need you',
            'Session management: run sessions in parallel, search and resume them, link sessions to the files they touched, and see them in a kanban view',
            'Task tracking that the agent can edit as well as you',
            'Developer tooling: git state management, AI commit messages, worktrees and an embedded terminal',
            'An extension system with pluggable editors, and Teams and Pricing sections on their site',
          ],
        },
        {
          type: 'paragraph',
          text: 'Their supported coding agents, per their README, are Codex, Claude Code, Opencode (alpha) and Copilot (alpha). Their site says the desktop app is free for individuals and works with your existing Claude Code or Codex subscription or API key. Their navigation also lists Teams and Pricing sections, so a paid team tier exists; we are not quoting figures because we did not verify any.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. Each terminal is a real agent process, and you choose per terminal between Claude Code, Codex CLI, Antigravity CLI, OpenCode and Kimi Code.',
        },
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the title of what the agent is working on and the list of files it has changed',
          src: '/images/guides/terminal-title-and-changes.png',
          caption: 'Each terminal says what it is working on and shows the files that session has changed, so you can supervise several agents without opening every diff.',
        },
        {
          type: 'paragraph',
          text: 'The design is terminal-first. You get desktop notifications when an agent finishes or needs input, searchable conversation history across all five agents with resume, per-terminal live file diffs, permission control with a Turbo mode for the operations you trust, a kanban board the agents update over MCP, git worktrees per session, multi-project switching, AI commit messages, a provider quota indicator, and skills and MCP marketplaces shared across agents.',
        },
        {
          type: 'paragraph',
          text: 'And the limits: closed source with no public repository, macOS and Windows only (no Linux), no mobile app, still in beta and free with Pro included during that period, and no models of our own, so your existing subscriptions do the work.',
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
            ['Platforms', 'macOS (Apple Silicon and Intel), Windows and Linux, plus a mobile app, per their README', 'macOS and Windows, no Linux and no mobile app'],
            ['Interface', 'Desktop app built around visual editors, with a session kanban and an embedded terminal', 'Desktop workspace built around live agent terminals'],
            ['Supported agents', 'Codex, Claude Code, Opencode (alpha) and Copilot (alpha), per their README', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code'],
            ['Isolation model', 'Parallel sessions with git worktree support, per their README', 'A separate process per terminal, with optional git worktrees per session'],
            ['Notifications', 'Push notifications in their mobile app, per their README. Desktop notifications are not documented on their site as of July 26, 2026', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Search and resume sessions, with sessions linked to the files they touched', 'Searchable history across all five agents, with resume'],
            ['Task management', 'Task tracking plus a kanban view of sessions, editable by you and by the agent', 'Kanban board that the agents update over MCP'],
            ['Open source', 'Yes, MIT, about 1,300 stars on the current repository', 'No, closed source with no public app repository'],
            ['Price', 'Free for individuals per their site; a paid Teams tier exists per their site navigation (we did not verify any figures)', 'Free during beta with Pro included, and you bring your own agent subscriptions'],
            ['Last public commit (verified Jul 26, 2026)', 'July 26, 2026 on nimbalyst/nimbalyst; February 26, 2026 on the old stravu/crystal repository', 'Closed source, no public repo'],
          ],
          caption: 'Verified on July 26, 2026 from nimbalyst.com, the public Nimbalyst README and GitHub data for both repositories.',
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
            '<strong>You want open source.</strong> MIT, public repository, and an active one: there was a public commit on July 26, 2026, the day we verified. CodeAgentSwarm is closed source.',
            '<strong>You are on Linux.</strong> They ship a Linux build. We do not.',
            '<strong>You want your phone in the loop.</strong> Their mobile app offers a session dashboard, push notifications, voice or text replies and swipe-through diff approval. We have no mobile app.',
            '<strong>Non-developers are involved.</strong> Product and design people can work on documents and mockups in the same tool, which a terminal workspace does not really allow.',
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
            '<strong>You use more than two agent vendors.</strong> Claude Code, Codex CLI, Antigravity CLI, OpenCode and Kimi Code are all first-class here. Antigravity CLI and Kimi Code are not listed among the supported coding agents in the Nimbalyst README as of July 26, 2026.',
            '<strong>You want the terminals, not an abstraction over them.</strong> Every session is a real CLI in a pane you can read, scroll and type into, which matters when an agent does something unexpected.',
            '<strong>You want desktop notifications without reaching for a phone.</strong> Ours fire on the same machine you are working on.',
            '<strong>You want one history across every vendor.</strong> Search a phrase and find the session, whichever of the five agents ran it, then resume it in place.',
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
      answer: 'Yes, it is the same project renamed. The old repository stravu/crystal states in its own description that Crystal is now Nimbalyst and links to nimbalyst.com. Crystal is MIT with about 3,100 stars and its last public commit was February 26, 2026, while development continues at nimbalyst/nimbalyst, also MIT, with about 1,300 stars and a public commit on July 26, 2026. All verified on July 26, 2026.',
    },
    {
      question: 'Is Nimbalyst open source?',
      answer: 'Yes. The nimbalyst/nimbalyst repository is published under the MIT license, with about 1,300 stars (1,327 when verified on July 26, 2026). Their README notes that the collaboration sync server behind their team features is a separate project. CodeAgentSwarm is closed source with no public application repository, so if open source is a requirement, Nimbalyst wins that point.',
    },
    {
      question: 'Is Nimbalyst actively maintained?',
      answer: 'On July 26, 2026, the day we checked, the nimbalyst/nimbalyst repository had a public commit dated that same day, so it was active at the time of verification. The predecessor repository, stravu/crystal, last saw a public commit on February 26, 2026, which is expected after the rename. As always, check the repository yourself before committing a workflow to any tool.',
    },
    {
      question: 'Does Nimbalyst support Antigravity CLI or Kimi Code?',
      answer: 'Neither is listed among the supported coding agents in the Nimbalyst README as of July 26, 2026, which names Codex, Claude Code, Opencode (alpha) and Copilot (alpha). CodeAgentSwarm supports Antigravity CLI and Kimi Code directly, along with Claude Code, Codex CLI and OpenCode, which is the main breadth difference between the two tools.',
    },
  ],
}

export default guide
