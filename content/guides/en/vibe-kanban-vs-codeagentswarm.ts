import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'vibe-kanban-vs-codeagentswarm',
    locale: 'en',
    title: 'Vibe Kanban vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaTitle: 'Vibe Kanban vs CodeAgentSwarm: An Honest Comparison (2026)',
    metaDescription: 'Vibe Kanban turns agent work into a kanban of issues. CodeAgentSwarm lets you watch and drive the agent terminals. Honest comparison with facts verified October 2026.',
    intro: 'Vibe Kanban turns agent work into a kanban of issues for teams. CodeAgentSwarm lets you watch and drive the agent terminals themselves, with the board as one feature rather than the whole product.\n\nWe build CodeAgentSwarm, and you should read this page knowing that. It is why we list our own limits here (closed source, Mobile Connect still in alpha, still in beta, and you supply your own agent subscriptions) and why we credit Vibe Kanban for the things it does better, starting with being open source and having by far the biggest community in this category. Every third-party fact below was verified on October 31, 2026 against the vendor\'s own site, their docs, their public README, npm and public GitHub data, including a public status change we cover in full. CodeAgentSwarm availability and supported agents were updated on October 5, 2026.\n\nIf your bottleneck is planning and reviewing work as a team, a kanban-first tool is the right shape. If your bottleneck is keeping up with several agent sessions running at once, a supervision workspace is.\n\nOn October 31, 2026 their README and site banner still read "Vibe Kanban is sunsetting", and the site adds that the project will continue as open source and community maintained. Commits keep landing on the default branch (the latest on October 28, 2026), while the last GitHub release is v0.1.44 from April 24, 2026.',
    ctaText: 'If you want to see what each agent is doing right now, get notified the moment one needs you, and keep a task board that the agents update themselves, download CodeAgentSwarm and try it on your next parallel session.',
    ctaAgent: 'comparison',
    highlightedWords: ['Vibe Kanban', 'CodeAgentSwarm'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'vibe-kanban-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'paragraph',
          text: 'Vibe Kanban turns agent work into a kanban of issues that a team can plan and review, while CodeAgentSwarm lets you run and supervise the agent terminals themselves, with a task board as one part of a wider workspace.',
        },
        {
          type: 'paragraph',
          text: 'Put another way: their product is the board, ours is the room where the agents work. For the wider field, see <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">the best tools to run multiple AI coding agents</a>, and if the board itself is what you care about, our <a href="/en/guides/claude-code-task-management" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code task management</a> guide shows how agents update tasks over MCP.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Disclosure: CodeAgentSwarm is our product, so read this as an interested comparison and verify the claims. All third-party facts here were checked on October 31, 2026 against vibekanban.com, their docs, the public BloopAI/vibe-kanban README, npm and public GitHub data. Where their documentation does not cover something, we say it is not documented rather than claiming it is missing.',
        },
      ],
    },
    {
      id: 'what-is-vibe-kanban',
      title: 'What Vibe Kanban is',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://vibekanban.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban</a> describes itself as project management for teams building with AI coding agents. You plan work as kanban issues, then create a workspace where an agent executes: their README says each workspace gives an agent a branch, a terminal and a dev server. You review the diff, leave inline comments that go straight back to the agent, preview the app in a built-in browser and open a pull request with an AI-written description.',
        },
        {
          type: 'paragraph',
          text: 'It starts with a single command, <code>npx vibe-kanban</code>, and their README says it supports 10+ coding agents and names ten: Claude Code, Codex, Gemini CLI, GitHub Copilot, Amp, Cursor, OpenCode, Droid, CCR and Qwen Code. Their docs list the same ten, and also cover a Vibe Kanban MCP server, GitHub and Azure Repos integrations, a VSCode extension and self-hosting with Docker Compose.',
        },
        {
          type: 'list',
          items: [
            'Open source under Apache-2.0, with about 28,500 stars on GitHub on October 31, 2026, the largest community of any tool in this comparison',
            'Kanban issues as the primary unit of work, built for teams rather than one developer',
            'Diff review with inline comments sent back to the agent without leaving the UI',
            'A built-in browser preview with devtools, inspect mode and device emulation',
            'Pull request creation and merge from inside the tool',
            'Sound effects and browser push notifications when tasks complete or need attention, per their settings docs',
            'Last public commit on the default branch: October 28, 2026 (GitHub Copilot fixes and a local CI script). Last GitHub release: v0.1.44 on April 24, 2026',
          ],
        },
        {
          type: 'paragraph',
          text: 'There is one more fact you should have before choosing it, and it comes from their own site. On April 10, 2026 the company behind Vibe Kanban, bloop, published <a href="https://www.vibekanban.com/blog/shutdown" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">an announcement</a> that it was shutting down, and that the project would continue as open source and community maintained. The same announcement says remote services would remain available for 30 days, after which Vibe Kanban would move to a fully local architecture, with the remote pieces removed being kanban issues, comments, projects and organisations, while local workspaces keep working. As of October 31, 2026, the README on their default branch and a banner across vibekanban.com still say "Vibe Kanban is sunsetting" and link to that post. The announcement promised a roadmap for the community maintained edition within weeks; their blog has no later post. On npm, version 0.1.45 was published on September 19, 2026, but the latest tag still points to 0.1.44, which is what npx vibe-kanban installs by default.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'We are stating dates, not delivering a verdict. Apache-2.0 code with about 28,500 stars does not evaporate, and community-maintained projects can outlive their companies. Read the announcement, check the repository activity yourself, and decide what that means for the way your team works.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. It runs on macOS, Windows and Linux, each terminal is a real agent process, and you pick the agent per terminal from Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI, GitHub Copilot CLI and Cline.',
        },
        {
          type: 'image',
          alt: 'Current Kanban board with Pending, Auto, In Progress, In Testing and Completed columns',
          src: '/images/guides/task-board-current.webp',
          caption: 'Sample tasks from three projects, with separate project colors and the Auto queue visible.',
        },
        {
          type: 'paragraph',
          text: 'The board exists, but it is not the point. The point is supervision: desktop notifications when an agent finishes or needs input, searchable conversation history across all twelve agents and capability-aware resume, per-terminal live file diffs, permission control with a Turbo mode, git worktrees per session, multi-project switching, AI commit messages, a provider quota indicator, and skills and MCP marketplaces shared across agents.',
        },
        {
          type: 'paragraph',
          text: 'Our limits, plainly: closed source with no public repository, Mobile Connect still in alpha (web beta for every account, native iOS and Android access by request, desktop must stay open), still in beta with Pro included, and we are not a model provider, so you bring your own subscriptions.',
        },
      ],
    },
    {
      id: 'table',
      title: 'Side by side',
      content: [
        {
          type: 'table',
          headers: ['', 'Vibe Kanban', 'CodeAgentSwarm'],
          rows: [
            ['Platforms', 'Runs locally with npx vibe-kanban and is used in the browser; their docs cover macOS, Linux and Windows, and Docker Compose self-hosting', 'Desktop app for macOS, Windows and Linux'],
            ['Interface', 'Kanban board and workspace UI in the browser, with a built-in app preview', 'Desktop workspace with live terminal panes'],
            ['Supported agents', 'Claude Code, Codex, Gemini CLI, GitHub Copilot, Amp, Cursor, OpenCode, Droid, CCR and Qwen Code per their README', 'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI, GitHub Copilot CLI and Cline'],
            ['Isolation model', 'One workspace per issue, each with its own branch, terminal and dev server', 'A separate process per terminal, with optional git worktrees per session'],
            ['Notifications', 'Sound effects and browser push notifications when tasks complete or need attention, per their settings docs', 'Desktop notifications when an agent finishes or needs input'],
            ['Conversation history', 'Sessions per workspace with a chat interface and a changes panel, documented per workspace', 'Searchable history across all twelve agents and capability-aware resume'],
            ['Task management', 'The whole product: kanban issues, filtering, board customisation, team assignment. Their April 10, 2026 announcement lists kanban issues among the remote services removed', 'One feature of the workspace: a kanban the agents update over MCP'],
            ['Open source', 'Yes, Apache-2.0, about 28,500 stars', 'No, closed source with no public app repository'],
            ['Price', 'Free and open source. Their April 10, 2026 announcement says paid subscriptions were terminated, though the pricing page still lists Free, Pro at $30 per user per month and Enterprise', 'Free during beta with Pro included, and you bring your own agent subscriptions'],
            ['Last public commit (verified Oct 31, 2026)', 'October 28, 2026', 'Closed source, no public repo'],
          ],
          caption: 'Verified on October 31, 2026 from vibekanban.com, their public README, their docs, npm and GitHub.',
        },
      ],
    },
    {
      id: 'when-vibe-kanban',
      title: 'When Vibe Kanban is the better choice',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Your unit of work is an issue, not a session.</strong> If planning and assigning tickets is the job and agents are how the tickets get done, a kanban-first tool matches that model better than a terminal workspace.',
            '<strong>You want open source you can host.</strong> Apache-2.0, about 28,500 stars, and documented Docker Compose self-hosting. Our app is closed source and there is nothing to self-host.',
            '<strong>You review in the browser.</strong> Inline comments on a diff that go straight back to the agent, plus a built-in preview with devtools and device emulation, are genuinely nice and we do not have an equivalent.',
            '<strong>You use Gemini CLI, Amp, Droid, CCR or Qwen Code.</strong> All five are on their list of ten agents and none is on ours. GitHub Copilot is on both lists, as GitHub Copilot CLI in CodeAgentSwarm 2.5.0. Their list has ten agents and ours twelve, with different picks.',
            '<strong>You want pull requests handled in the tool.</strong> Opening a PR with an AI-written description and merging from the same UI is part of their flow.',
            '<strong>You want nothing to install.</strong> It runs from npx wherever Node runs. CodeAgentSwarm is a desktop app you install.',
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
            '<strong>You want to see the agents work.</strong> Live terminal panes, per-terminal file diffs as they happen, and titles that tell you what each session is on right now.',
            '<strong>You want native desktop notifications.</strong> CodeAgentSwarm tells you the moment an agent finishes or stops to ask a question, from a desktop app instead of a browser tab. Vibe Kanban documents sound effects and browser push notifications, so this is a difference of form, not a missing feature on their side.',
            '<strong>You use Antigravity CLI or Kimi Code.</strong> Neither is listed among the agents in the Vibe Kanban README or docs as of October 31, 2026. Both are first-class here, alongside Claude Code, Codex CLI and OpenCode.',
            '<strong>You want one searchable history across vendors.</strong> Every conversation from every agent in one search box and capability-aware resume from any point.',
            '<strong>You want permission control per operation.</strong> Turbo mode auto-approves what you trust and keeps the rest gated, instead of an all-or-nothing switch.',
            '<strong>You want to know your quota before the agent stalls.</strong> The provider quota indicator shows how much allowance is left.',
            '<strong>You want a maintained desktop app on Windows or Linux.</strong> We ship signed builds for macOS and Windows, .deb and AppImage builds for Linux, and update them regularly.',
          ],
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Using both',
      content: [
        {
          type: 'paragraph',
          text: 'It is a reasonable pairing. Plan and triage the team backlog in Vibe Kanban, then supervise the actual execution in CodeAgentSwarm, where you can watch several agents at once and get told when one needs you. Both work on top of git branches, so nothing about the repository layout has to change.',
        },
        {
          type: 'paragraph',
          text: 'Comparing more than these two? The <a href="/en/guides/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad comparison</a> covers the terminal-first approach, and <a href="/en/guides/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst, formerly Crystal</a>, covers the visual editor approach.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Vibe Kanban open source?',
      answer: 'Yes. Vibe Kanban is published at github.com/BloopAI/vibe-kanban under the Apache-2.0 license, with about 28,500 stars when verified on October 31, 2026, the largest community of any tool compared here. CodeAgentSwarm is closed source with no public application repository.',
    },
    {
      question: 'Is Vibe Kanban still maintained?',
      answer: 'bloop, the company behind it, shut down on April 10, 2026, and as of October 31, 2026 the README and site banner still say Vibe Kanban is sunsetting and will continue as open source and community maintained. The code still moves: the latest commits, on October 26 and 28, 2026, fix GitHub Copilot sessions and approvals and add a local CI script. No GitHub release has been published since v0.1.44 on April 24, 2026; version 0.1.45 reached npm on September 19, 2026, but the npm latest tag still points to 0.1.44.',
    },
    {
      question: 'Can I still use the Vibe Kanban cloud and team features?',
      answer: 'Their April 10, 2026 announcement states that remote services would remain available for 30 days and then be removed, with Vibe Kanban transitioning to a fully local architecture. The remote pieces listed as being removed are kanban issues, comments, projects and organisations, paid subscriptions were terminated with refunds for the previous 30 days, and local workspaces continue to function. The latest version at that time included a data export feature. As of October 31, 2026 their docs still include the Cloud and self-hosting pages, and the pricing page still lists Free, Pro and Enterprise plans, so check with the project before planning a team rollout.',
    },
    {
      question: 'Does Vibe Kanban support Antigravity CLI or Kimi Code?',
      answer: 'Neither is listed among the coding agents in the Vibe Kanban README or docs as of October 31, 2026, which name Claude Code, Codex, Gemini CLI, GitHub Copilot, Amp, Cursor, OpenCode, Droid, CCR and Qwen Code. CodeAgentSwarm supports Antigravity CLI and Kimi Code directly, along with Claude Code, Codex CLI and OpenCode.',
    },
  ],
}

export default guide
