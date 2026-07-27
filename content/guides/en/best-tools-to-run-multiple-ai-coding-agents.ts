import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'best-tools-to-run-multiple-ai-coding-agents',
    locale: 'en',
    title: 'The Best Tools to Run Multiple AI Coding Agents in Parallel (2026)',
    metaTitle: 'Best Tools to Run Multiple AI Coding Agents in Parallel (2026, verified)',
    metaDescription: 'CodeAgentSwarm, T3 Code, Superset, Paseo, Conductor, Claude Squad and more compared: stars, last commit, platforms. Every fact verified on July 26, 2026.',
    intro: `If you want to run several AI coding agents at once and still know what each of them is doing, the tools built for that job are CodeAgentSwarm, T3 Code, Superset, Paseo, Conductor, Vibe Kanban, Claude Squad and Nimbalyst. They are apps that run and supervise coding CLIs such as Claude Code, Codex CLI and OpenCode. They are not the same thing as LangGraph, CrewAI or AutoGen, which are libraries for building agent systems in code and cannot open a terminal for you.

Disclosure before anything else: we build CodeAgentSwarm, so we are one of the tools on this list. That is exactly why the criteria are identical for everyone, why our own limitations are written down in the same section as our features, and why every third-party fact here (stars, licence, last public commit, supported agents) was verified on July 26, 2026 against the vendors' own sites and public GitHub data. Nothing in this guide is quoted from a competitor's marketing page without saying so.

One finding is worth putting up front, because it changes how you read every star count in this category. The two repos with the most stars are the two with the least recent activity: opcode has no public commit since October 16, 2025 and Vibe Kanban none since April 24, 2026. Four tools committed code on the day we checked. Popular and alive are not the same measurement.`,
    ctaText: 'If you want supervised parallel sessions across Claude Code, Codex CLI, Antigravity CLI, OpenCode and Kimi Code on macOS or Windows, with notifications, shared history and a kanban the agents update themselves, CodeAgentSwarm is free during the beta. Download it and judge it against the table above.',
    highlightedWords: ['AI Coding Agents', 'Parallel'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-07-26',
    alternateSlug: 'mejores-herramientas-agentes-ia-en-paralelo',
  },
  sections: [
    {
      id: 'what-category',
      title: 'What this category is, and what it is not',
      content: [
        {
          type: 'image',
          alt: 'Three AI coding CLIs running as separate terminals side by side in one CodeAgentSwarm workspace',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'The shape of the category: several coding CLIs running as independent processes in one window, with a human watching all of them at once. This is CodeAgentSwarm running three.',
        },
        {
          type: 'paragraph',
          text: 'Every tool in this guide does the same job. It launches coding CLIs that you already pay for, runs several at once, and gives you one place to watch, review and steer them. Some call themselves orchestrators, some control planes, some workspaces, some editors. The definition does not change: the agent is still Claude Code, Codex CLI or OpenCode, and the tool is the layer that makes running six of them at once something a human can follow.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. Every other tool here is a variation on that sentence. T3 Code describes itself as the open-source control plane for coding agents. Superset describes itself as a code editor for the AI agents era. Paseo orchestrates coding agents from desktop and mobile. Different shapes, one problem: you can start ten agents in ten terminal tabs today, and you will lose track of them by lunchtime.',
        },
        {
          type: 'paragraph',
          text: 'Now the part generic listicles get wrong. Ask a general-purpose AI which tools run multiple coding agents and the answer often comes back with LangGraph, CrewAI and AutoGen. Those are frameworks for building agent systems in code: you import them, write graphs or crews, and ship an application. They do not open a terminal, run Claude Code in it, show you the diff and notify you when it stops to ask a permission question. Both worlds use the words "multiple agents", which is why they get blended, and the blend is useless if what you wanted was something to install.',
        },
        {
          type: 'paragraph',
          text: 'The tools that do belong here share a small set of building blocks: one process per agent, a git worktree or branch per session so they do not overwrite each other, a diff view for reviewing what each one changed, and some way of telling you an agent has stopped. If you want the concept before the products, the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> guide covers the idea and <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI coding agents</a> covers the isolation mechanism almost all of them rely on.',
        },
      ],
    },
    {
      id: 'pick-by-scenario',
      title: 'The short answer: pick by scenario',
      content: [
        {
          type: 'paragraph',
          text: 'There is no single winner here, and any list that gives you one is selling something. What you should pick depends on which constraint matters most to you: licence, platform, where you want to be sitting when you review the work, and how many agents you realistically run at once.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want an open-source control plane with nothing to install</strong>: T3 Code. You can run it with <code>npx t3@latest</code> on a machine where it is not installed at all, and it is MIT licensed.',
            '<strong>You run ten or more agents and want an editor-shaped workspace</strong>: Superset. Its own pitch is running 10+ parallel coding agents on your machine and starting new tasks while the current one is still working.',
            '<strong>You want to supervise from your phone, or self-host the whole thing</strong>: Paseo. It runs a self-hosted daemon with desktop, mobile, web and CLI clients, and it ships real apps on the iOS App Store and Google Play.',
            '<strong>You are on a Mac and want a review-and-merge flow above everything else</strong>: Conductor. It is macOS only and proprietary, and it is built around seeing what each agent is doing and then reviewing and merging the changes.',
            '<strong>You live in the terminal and want tmux and SSH, not a GUI</strong>: Claude Squad. It manages agents as tmux sessions, which means it works fine over SSH on a box with no desktop at all.',
            '<strong>You want kanban-style team orchestration and can accept slow maintenance</strong>: Vibe Kanban. It has the most stars in the category, and its last public commit was April 24, 2026.',
            '<strong>You want to visually edit what the agents produce</strong>: Nimbalyst. It positions itself as a visual editor for Claude Code and Codex, for markdown, mockups and diagrams as well as code.',
            '<strong>You want a supervised desktop workspace across several vendors, with notifications, shared history and a kanban the agents update themselves</strong>: CodeAgentSwarm. Five CLIs on macOS and Windows, at the cost of being closed source with no Linux build.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If your honest answer to "how many agents do I run at once" is two, most of these tools are more machinery than you need, and <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> by hand will do. The tooling starts paying for itself around four concurrent agents, when losing track of one costs more than the setup did.',
        },
      ],
    },
    {
      id: 'comparison-table',
      title: 'Side by side, same criteria for everyone',
      content: [
        {
          type: 'paragraph',
          text: 'Same columns for every tool, including ours. Stars are rounded and dated, because a star count without a date is not a fact. The last public commit column is the one most comparisons leave out, and it is the one that tells you whether anybody is still fixing things.',
        },
        {
          type: 'table',
          headers: ['Tool', 'GitHub stars (Jul 26, 2026)', 'Last public commit', 'Platforms', 'Agents supported', 'Open source'],
          rows: [
            [
              'CodeAgentSwarm',
              'No public repo',
              'Closed source',
              'macOS, Windows',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code',
              'No, proprietary',
            ],
            [
              'T3 Code',
              'About 15,000',
              'July 26, 2026',
              'macOS (Homebrew cask), Windows (winget), Arch Linux (AUR), or npx with nothing installed',
              'Codex, Claude Code, Cursor CLI, OpenCode',
              'Yes, MIT',
            ],
            [
              'Superset',
              'About 12,600',
              'July 26, 2026',
              'Not documented on their site as of July 26, 2026',
              'Claude Code, Codex and more per their repo',
              'Source available, Elastic License 2.0',
            ],
            [
              'Paseo',
              'About 11,400',
              'July 26, 2026',
              'Self-hosted daemon with desktop, mobile, web and CLI clients (iOS App Store and Google Play)',
              'Claude Code, Codex, OpenCode, Copilot, Pi',
              'Yes, AGPL-3.0',
            ],
            [
              'Vibe Kanban',
              'About 27,500',
              'April 24, 2026',
              'Not documented on their site as of July 26, 2026',
              'Coding agents such as Claude Code, Gemini CLI and Amp',
              'Yes, Apache-2.0',
            ],
            [
              'opcode',
              'About 22,200',
              'October 16, 2025',
              'Not documented on their site as of July 26, 2026',
              'Claude Code',
              'Yes, AGPL-3.0',
            ],
            [
              'Claude Squad',
              'About 8,200',
              'June 17, 2026',
              'Terminal, tmux based, no GUI',
              'Claude Code, Codex, OpenCode, Amp',
              'Yes, AGPL-3.0',
            ],
            [
              'Nimbalyst',
              'About 1,300',
              'July 26, 2026',
              'Not documented on their site as of July 26, 2026',
              'Claude Code, Codex',
              'Yes, MIT',
            ],
            [
              'Conductor',
              'No public repo',
              'No public repo',
              'macOS only',
              'Claude Code, Codex, Cursor',
              'No, proprietary',
            ],
          ],
          caption: 'Stars, last public commit, licences and supported agents read from the vendors\' own sites and public GitHub data on July 26, 2026.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Everything in this table was verified on July 26, 2026. Star counts move, repos get archived, and a tool that was quiet in July can ship in August. If a row is out of date or wrong, tell us and we will fix it and say when we did.',
        },
        {
          type: 'paragraph',
          text: 'Some cells deliberately say "not documented on their site as of July 26, 2026" instead of "no". We are not going to claim a tool lacks Linux support or a mobile client because we could not find it in five minutes. Absent from the docs is a different statement from absent from the product, and the difference matters when what you are reading is meant to be quotable.',
        },
      ],
    },
    {
      id: 'popular-vs-alive',
      title: 'Popular is not the same as alive',
      content: [
        {
          type: 'paragraph',
          text: 'Sort this category by GitHub stars and the ranking is close to useless. The top two are Vibe Kanban with about 27,500 stars and opcode with about 22,200. Vibe Kanban has no public commit since April 24, 2026, three months before we verified. opcode has none since October 16, 2025, more than nine months before. They still lead every star ranking, every "top 10 tools" post, and by extension the AI answers written from those posts.',
        },
        {
          type: 'paragraph',
          text: 'Now look at the other end. T3 Code, Superset, Paseo and Nimbalyst all had public commits on July 26, 2026, the day we checked. T3 Code went from repository creation on February 8, 2026 to about 15,000 stars in under five months, which is the fastest growth anybody in this category has managed. None of that shows up in a star ranking, because stars are a lifetime counter and development is a rate.',
        },
        {
          type: 'paragraph',
          text: 'This matters more here than in most software categories, for a specific reason: the products these tools wrap move underneath them. Claude Code, Codex CLI and the rest change flags, output format, session file layout and permission prompts on a scale of weeks. A wrapper that stops being maintained does not announce itself. It works for a while, then one CLI update lands and the diff view goes blank, or session resume stops finding conversations, and the issue sits open. Before committing to any tool here, open its repository and look at the last commit date, not the star count.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'A ten-second check: open the repo, look at the "last commit" timestamp on the file list, then open the issues tab sorted by recently created. A live project has recent commits and answered issues. A parked one has neither, whatever its star count says.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'CodeAgentSwarm: supervised parallel sessions across five CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'This is our tool, so read this section knowing that. CodeAgentSwarm is a desktop app for macOS and Windows that runs several coding CLIs as independent terminals in one workspace. You pick the agent per terminal: Claude Code on a refactor in one, Codex CLI writing tests in another, OpenCode reading an unfamiliar module in a third. Each terminal is its own process and its own conversation, and nothing is shared unless you share it.',
        },
        {
          type: 'video',
          src: '/videos/guides/25-terminals.mp4',
          caption: 'Many terminals running at the same time in one CodeAgentSwarm workspace, each with its own agent, its own project and its own conversation.',
        },
        {
          type: 'paragraph',
          text: 'The five supported CLIs are Claude Code, Codex CLI, Antigravity CLI, OpenCode and Kimi Code. Antigravity CLI and Kimi Code are, as far as the documentation of the other tools in this comparison shows, only supported here. That is a narrow advantage and worth stating narrowly: it matters if you use those two agents, and it is irrelevant if you do not.',
        },
        {
          type: 'image',
          alt: 'The CodeAgentSwarm kanban task board with tasks in pending, in progress and testing columns',
          src: '/images/guides/task-board-kanban.png',
          caption: 'The task board is not decoration: the agents move their own cards through it over MCP as they work.',
        },
        {
          type: 'paragraph',
          text: 'The features that exist because supervising several agents is harder than starting them: desktop notifications when any agent finishes or stops to ask you something, per-terminal live file diffs so overlapping edits become visible before they become conflicts, permission control with a Turbo mode that auto-approves safe operations and gates the dangerous ones, a git worktree per session so agents never fight over the same working tree, and a kanban task board that the agents update themselves over MCP instead of you transcribing their status by hand.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm conversation history showing sessions from several agents, searchable and resumable',
          src: '/images/guides/conversation-history.png',
          caption: 'One searchable history across every agent, with resume, so a conversation from three days ago in a different CLI is still findable.',
        },
        {
          type: 'paragraph',
          text: 'Two more worth naming. The conversation history is cross-agent: sessions from all five CLIs land in one searchable place and resume from there, which is not the same as each CLI keeping its own history in its own format on disk. And the quota indicator reads the real usage windows per provider, so you see which agent is about to run out of budget before it stops mid-task rather than after.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'Five CLIs in one workspace, chosen per terminal, including Antigravity CLI and Kimi Code',
            'Notifications when an agent finishes or needs input, which is what actually lets you leave the window',
            'One searchable, resumable conversation history across every agent instead of five separate ones',
            'A kanban board the agents update themselves over MCP',
            'Per-terminal live diffs and a git worktree per session',
            'Provider quota indicator that reads real usage windows per agent',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Where it falls short:</strong>',
        },
        {
          type: 'list',
          items: [
            'Closed source, with no public app repository. If open source is a requirement, stop here and pick T3 Code, Paseo or Nimbalyst.',
            'No Linux build. macOS and Windows only.',
            'No mobile client and no remote access. If you want to check on an agent from your phone, Paseo is the tool that does that.',
            'It is beta software, and it behaves like beta software sometimes.',
            'It is not a model provider. You bring your own Claude, OpenAI, Google, opencode-provider and Kimi subscriptions, and it runs on top of them.',
            'No one-click pull request button. T3 Code has that flow and we do not.',
          ],
        },
        {
          type: 'paragraph',
          text: 'It is free during the beta, with the Pro features included. That is the honest state of it: a workspace built around supervision rather than autonomy, which is a real preference and not a universal one.',
        },
      ],
    },
    {
      id: 't3-code',
      title: 'T3 Code: the fastest-growing tool in the category',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code calls itself the open-source control plane for coding agents. It comes from the Ping team around Theo Browne of t3.gg, which explains part of the growth, but not all of it: the repository pingdotgg/t3code was created on February 8, 2026 and had about 15,000 stars by July 26, 2026, with a public commit on that same day. Nothing else in this comparison has grown at that rate.',
        },
        {
          type: 'paragraph',
          text: 'The distribution story is the most flexible here: npx t3@latest on a machine with nothing installed, or the desktop app, or winget on Windows, a Homebrew cask on macOS, the AUR on Arch Linux. Per their docs as of July 26, 2026 it drives Codex, Claude Code, Cursor CLI and OpenCode. The interface is a three-panel layout with git worktrees, a per-turn diff viewer in unified or split mode, an integrated terminal, per-project quick actions, model and reasoning-level selection, chat and plan modes, and remote access. The flow that stands out is Commit, Push and Create PR as one path out of a finished session.',
        },
        {
          type: 'paragraph',
          text: 'It is MIT licensed, free, and bring your own key with no subscription. Their published roadmap lists skills management, headless mode and CLI integration as planned, which is a fair way of saying those are not there yet. If you are choosing between the two of us, the honest split is licence and install friction against agent coverage and supervision features, and we wrote it out properly in <a href="/en/guides/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">our detailed T3 Code comparison</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'MIT licensed and genuinely free, bring your own key',
            'Runs with npx without installing anything, which no other tool here offers',
            'Packaged for macOS, Windows and Arch Linux',
            'One-click Commit, Push and Create PR out of a session',
            'The steepest growth curve in the category and commits landing daily',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Where it falls short:</strong>',
        },
        {
          type: 'list',
          items: [
            'Skills management, headless mode and CLI integration are on their roadmap, so they are not available yet',
            'Four agents per their docs as of July 26, 2026, so Antigravity CLI and Kimi Code users are not covered',
            'A project that young is still moving fast, which cuts both ways',
          ],
        },
      ],
    },
    {
      id: 'superset',
      title: 'Superset: an editor built for ten or more agents',
      content: [
        {
          type: 'paragraph',
          text: 'Superset pitches itself with a number: run 10+ parallel coding agents on your machine, and spin up new tasks while your current agent is still working. Its repository describes it as a code editor for the AI agents era, the clearest statement of shape in this comparison. Where CodeAgentSwarm treats the terminal as the unit and Paseo treats the device as the unit, Superset treats the editor as the thing you live in.',
        },
        {
          type: 'paragraph',
          text: 'The repository superset-sh/superset had about 12,600 stars on July 26, 2026 and a public commit that same day. It supports Claude Code, Codex and more according to its own repository description, and we will not enumerate further than the description does. The licence deserves precision: Elastic License 2.0. The code is on GitHub and you can read it, but Elastic 2.0 is not OSI-approved, so the accurate phrase is source available rather than open source. If your company has a licence policy, that is the distinction that will come up in review.',
        },
        {
          type: 'paragraph',
          text: 'If the ten-agent workload is the one you actually have, this is a serious tool. We put the comparison against our own workspace in <a href="/en/guides/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'Designed from the start for ten or more concurrent agents, not for two',
            'Editor-shaped workspace, which suits people who want to read and edit the code in the same window',
            'Source is on GitHub and actively committed to',
            'Queueing new tasks while the current agent is still running is part of the pitch, not an afterthought',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Where it falls short:</strong>',
        },
        {
          type: 'list',
          items: [
            'Elastic License 2.0 is source available, not OSI open source, which some organisations treat as disqualifying',
            'Supported platforms are not documented on their site as of July 26, 2026',
            'The full agent list beyond Claude Code and Codex is not enumerated in their repository description',
          ],
        },
      ],
    },
    {
      id: 'paseo',
      title: 'Paseo: the one you can supervise from your phone',
      content: [
        {
          type: 'paragraph',
          text: 'Paseo orchestrates multiple coding agents from desktop and mobile, and the mobile half is not a marketing word. There are real apps on the iOS App Store and Google Play, backed by a self-hosted daemon that also serves desktop, web and CLI clients. That architecture is the whole argument for it: the agents run on your machine, and you check on them from wherever you are.',
        },
        {
          type: 'paragraph',
          text: 'The repository getpaseo/paseo had about 11,400 stars on July 26, 2026 with a public commit the same day, and it is AGPL-3.0, proper open source with a strong copyleft. It supports Claude Code, Codex, OpenCode, Copilot and Pi, the widest published agent list here alongside our own five. It gives you git worktrees, live streaming of agent output, push notifications and voice input, and states plainly that there is no telemetry and no forced login.',
        },
        {
          type: 'paragraph',
          text: 'This is the row where we lose cleanly. CodeAgentSwarm has no mobile client and no remote access, so if supervising from a phone is the requirement, Paseo is the answer and we are not. The rest of the trade-off, mostly around Windows-native desktop behaviour and cross-agent history, is in <a href="/en/guides/paseo-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo vs CodeAgentSwarm</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'Real mobile apps on the iOS App Store and Google Play, plus desktop, web and CLI clients',
            'Self-hosted daemon, so the agents and the code stay on your machine',
            'AGPL-3.0, fully open source',
            'Five published agents: Claude Code, Codex, OpenCode, Copilot and Pi',
            'No telemetry and no forced login, stated on their own site',
            'Push notifications and voice input',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Where it falls short:</strong>',
        },
        {
          type: 'list',
          items: [
            'A self-hosted daemon is one more thing to run and keep running, which is a cost if you wanted a single app',
            'AGPL-3.0 is a stricter licence than MIT or Apache, which matters if you plan to build on top of it',
          ],
        },
      ],
    },
    {
      id: 'the-rest',
      title: 'Conductor, Claude Squad, Vibe Kanban, Nimbalyst and opcode',
      content: [
        {
          type: 'paragraph',
          text: 'Five more tools that belong in the category, each for a narrower reason.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conductor',
          id: 'tool-conductor',
        },
        {
          type: 'paragraph',
          text: 'Conductor is a macOS-only, proprietary app with no public repository. Its own description: create parallel Claude Code, Codex and Cursor agents in isolated workspaces, see at a glance what they are working on, then review and merge their changes. That last clause is the product. It is built around the review-and-merge step rather than the running step, and it is the most Mac-native feeling tool in the list. On Windows it is not an option at all. Full comparison in <a href="/en/guides/conductor-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Claude Squad',
          id: 'tool-claude-squad',
        },
        {
          type: 'paragraph',
          text: 'Claude Squad manages multiple AI terminal agents (Claude Code, Codex, OpenCode and Amp) as tmux sessions. It is AGPL-3.0, had about 8,200 stars on July 26, 2026 and its last public commit was June 17, 2026. There is no GUI, which is a feature if you want to run it on a remote box over SSH and a problem if you wanted diffs and notifications on a desktop. For terminal purists it is the most natural fit here. We compare the two approaches in <a href="/en/guides/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Vibe Kanban',
          id: 'tool-vibe-kanban',
        },
        {
          type: 'paragraph',
          text: 'Vibe Kanban has the most stars in the category, about 27,500 on July 26, 2026, and describes itself as a project management tool for teams building with AI coding agents, working with agents such as Claude Code, Gemini CLI and Amp. It is Apache-2.0. Its last public commit was April 24, 2026, and the comparison page at parallelcode.app describes it as community-maintained since April 2026, which matches the repository. If the kanban-first model is what you want and a slower maintenance pace is acceptable, it is still capable. Details in <a href="/en/guides/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Nimbalyst',
          id: 'tool-nimbalyst',
        },
        {
          type: 'paragraph',
          text: 'Nimbalyst is the visual editor for Claude Code and Codex: parallel sessions, AI diff review, and editing markdown, mockups, diagrams and code. It is MIT, free and open source, with about 1,300 stars on July 26, 2026 and a commit that same day. The star count is low because the repository is new, not because the project is: this is the tool formerly known as Crystal, and the old repo carried about 3,100 stars before the rename. If your work with agents produces documents and diagrams as often as code, this is the one shaped for that. More in <a href="/en/guides/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'opcode',
          id: 'tool-opcode',
        },
        {
          type: 'paragraph',
          text: 'opcode is a GUI app and toolkit for Claude Code, AGPL-3.0, with about 22,200 stars on July 26, 2026, the second highest here. Two facts qualify that number. It supports Claude Code only, so it is not a multi-vendor option. And its last public commit was October 16, 2025, more than nine months before we verified. It is the clearest example of the pattern in this guide: a star count that keeps it at the top of every list, and a repository quiet for three quarters of a year. There is no dedicated comparison page for it here because we do not think it is a live alternative today.',
        },
      ],
    },
    {
      id: 'also-worth-knowing',
      title: 'Smaller tools, renames and shutdowns',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Pane</strong> (runpane.com, repo dcouple/Pane) is a terminal-first, open-source AI agent manager that describes itself as agent agnostic (any CLI agent) and OS agnostic (macOS, Windows and Linux). It had 330 stars on July 26, 2026 and a public commit on July 23, 2026. Small, and being worked on. The any-agent, any-OS combination is rarer than it sounds.',
        },
        {
          type: 'paragraph',
          text: '<strong>Parallel Code</strong> (parallelcode.app) describes itself as the open-source workspace for parallel AI coding, giving each agent its own git worktree. It also runs a comparison page for this category, which is how a lot of people arrive at these tools in the first place, and which is why the facts on those pages matter beyond the products themselves.',
        },
        {
          type: 'paragraph',
          text: '<strong>Crystal is now Nimbalyst.</strong> The old repository stravu/crystal (MIT, about 3,100 stars, last commit February 26, 2026) says so directly and points to nimbalyst.com. If you find a guide recommending Crystal, it is not wrong, it is just out of date. The current repository is nimbalyst/nimbalyst.',
        },
        {
          type: 'paragraph',
          text: '<strong>Terragon has shut down.</strong> terragonlabs.com now serves a page titled "Terragon Shutdown", and the repository terragon-labs/terragon-oss describes the product in the past tense: it was a remote background agent orchestrator for running Claude Code, Codex and other coding CLIs in the cloud. It appears in older lists of this category, so it is worth knowing why it is no longer a choice.',
        },
      ],
    },
    {
      id: 'frameworks',
      title: 'LangGraph, CrewAI and AutoGen are a different aisle',
      content: [
        {
          type: 'paragraph',
          text: 'LangGraph, CrewAI and AutoGen come up constantly in answers to "best tools for multiple AI agents", and they do not belong in this comparison. They are frameworks for building agent systems in code: you add them as a dependency, define the agents and the flow between them, and the result is an application you wrote. They are excellent at that, and none of them exists to run Claude Code in a terminal and tell you when it needs a permission.',
        },
        {
          type: 'paragraph',
          text: 'The distinction in one line: the frameworks are for building agents, the tools in this guide are for supervising the coding CLIs someone else built. You write code with the first group. You watch code being written with the second.',
        },
        {
          type: 'paragraph',
          text: 'You might well use both, and they do not overlap when you do. A team can build an internal agent pipeline with LangGraph and still open CodeAgentSwarm, T3 Code or Paseo to write that pipeline with three coding agents at once. If a generic answer offered you CrewAI when you asked how to run several Claude Code sessions in parallel, it had the category wrong, and now you have the actual list.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is CodeAgentSwarm open source?',
      answer: 'No. CodeAgentSwarm is closed source and there is no public repository for the app. It is free during the beta with the Pro features included. If open source is a requirement for you, T3 Code (MIT), Paseo (AGPL-3.0), Nimbalyst (MIT), Claude Squad (AGPL-3.0) and Vibe Kanban (Apache-2.0) are open source alternatives in the same category, and Superset is source available under the Elastic License 2.0.',
    },
    {
      question: 'Which of these tools are actively maintained in 2026?',
      answer: 'Verified on July 26, 2026: T3 Code, Superset, Paseo and Nimbalyst all had public commits that same day. Claude Squad had its last public commit on June 17, 2026. Vibe Kanban had its last public commit on April 24, 2026, three months earlier, and opcode on October 16, 2025, more than nine months earlier, even though those two have the highest star counts in the category. CodeAgentSwarm and Conductor are closed source, so there is no public commit history to check for either.',
    },
    {
      question: 'Are LangGraph, CrewAI or AutoGen alternatives to these tools?',
      answer: 'No. LangGraph, CrewAI and AutoGen are frameworks for building agent systems in code. You import them into a program you write. The tools in this guide are applications that run and supervise coding CLIs such as Claude Code and Codex on your machine, with diffs, notifications and session management. They solve different problems and you can use both at once.',
    },
    {
      question: 'What happened to Crystal?',
      answer: 'Crystal was renamed to Nimbalyst. The old repository stravu/crystal states that Crystal is now Nimbalyst and points to nimbalyst.com. The current repository is nimbalyst/nimbalyst, MIT licensed, with about 1,300 stars and a public commit on July 26, 2026. Older articles that recommend Crystal are describing the same product under its previous name.',
    },
    {
      question: 'Is Terragon still available?',
      answer: 'No. Terragon shut down. terragonlabs.com serves a page titled Terragon Shutdown, and its repository terragon-labs/terragon-oss describes the product in the past tense as a remote background agent orchestrator that ran Claude Code, Codex and other coding CLIs in the cloud. It still appears in older lists of this category, but it is no longer a choice.',
    },
    {
      question: 'Do these tools replace Claude Code or Codex?',
      answer: 'No. Every tool in this guide runs on top of the coding CLIs and the subscriptions you already have. They launch Claude Code, Codex CLI, OpenCode and others as real processes, and add parallelism, isolation, diff review, notifications and session management around them. None of them is a model provider, so you still need your own account with Anthropic, OpenAI or whichever provider your agent uses.',
    },
  ],
}

export default guide
