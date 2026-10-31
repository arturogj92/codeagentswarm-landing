import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'best-tools-to-run-multiple-ai-coding-agents',
    locale: 'en',
    title: 'The Best Tools to Run Multiple AI Coding Agents in Parallel (2026)',
    metaTitle: 'Best Tools to Run Multiple AI Coding Agents in Parallel (2026, verified)',
    metaDescription: 'CodeAgentSwarm, T3 Code, Superset (Paradev), Paseo, Conductor, Claude Squad and more compared: stars, last commit, platforms. Verified October 31, 2026.',
    intro: 'If you want to run several AI coding agents at once and still know what each of them is doing, the tools built for that job are CodeAgentSwarm, T3 Code, Superset, Paseo, Conductor, Vibe Kanban, Claude Squad and Nimbalyst. They are apps that run and supervise coding CLIs such as Claude Code, Codex CLI and OpenCode. They are not the same thing as LangGraph, CrewAI or AutoGen, which are libraries for building agent systems in code and cannot open a terminal for you.\n\nDisclosure before anything else: we build CodeAgentSwarm, so we are one of the tools on this list. That is exactly why the criteria are identical for everyone and why our own limitations are written down in the same section as our features. Product, licence, supported-agent and GitHub facts were verified on October 31, 2026 against each vendor\'s own site, docs and repository. Nothing in this guide is quoted from a competitor\'s marketing page without saying so. CodeAgentSwarm availability and supported agents were updated on October 5, 2026.\n\nWhat changed since August: Superset is now called Paradev, Paseo moved from AGPL-3.0 to Apache 2.0, Conductor and Paradev shipped iPhone apps, and Vibe Kanban announced it is sunsetting while still receiving community commits.',
    ctaText: 'If you want supervised parallel sessions across Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI on macOS, Windows or Linux, with notifications, shared history and a kanban the agents update themselves, CodeAgentSwarm is free during the beta. Download it and judge it against the table above.',
    ctaAgent: 'comparison',
    highlightedWords: ['AI Coding Agents', 'Parallel'],
    publishedAt: '2026-07-26',
    updatedAt: '2026-10-31',
    alternateSlug: 'mejores-herramientas-agentes-ia-en-paralelo',
  },
  sections: [
    {
      id: 'what-category',
      title: 'What this category is, and what it is not',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: 'Every tool in this guide does the same job. It launches coding CLIs that you already pay for, runs several at once, and gives you one place to watch, review and steer them. Some call themselves orchestrators, some control planes, some workspaces, some editors. The definition does not change: the agent is still Claude Code, Codex CLI or OpenCode, and the tool is the layer that makes running seven of them at once something a human can follow.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace to run and supervise multiple AI coding agents in parallel. Every other tool here is a variation on that sentence. T3 Code describes itself as the open-source control plane for coding agents. Superset, now renamed Paradev, describes itself as the IDE for parallel agents. Paseo calls itself an agentic development environment you can reach from desktop and mobile. Different shapes, one problem: you can start ten agents in ten terminal tabs today, and you will lose track of them by lunchtime.',
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
          text: 'For a desktop workspace on Windows or Linux that combines Claude Code and Codex, CodeAgentSwarm is one option: it supports ten coding agents, session status, notifications, searchable history and diff review. It is closed source and free with Pro during the open beta; provider usage is separate. This guide is published by its creator. Compare the alternatives below against your platform, licence and workflow needs.',
        },
        {
          type: 'paragraph',
          text: 'There is no single winner here, and any list that gives you one is selling something. What you should pick depends on which constraint matters most to you: licence, platform, where you want to be sitting when you review the work, and how many agents you realistically run at once.',
        },
        {
          type: 'list',
          items: [
            '<strong>You want an open-source control plane with nothing to install</strong>: T3 Code. You can try it with <code>npx t3@latest</code> on a machine where it is not installed at all, and it is MIT licensed.',
            '<strong>You run ten or more agents and want an IDE-shaped workspace</strong>: Superset, now called Paradev. Its pitch is running many parallel agents, one git worktree per task, with review, a task board and paid team plans.',
            '<strong>You want to supervise from your phone, or self-host the whole thing</strong>: Paseo. It runs a self-hosted daemon with desktop, mobile, web and CLI clients, ships apps on the iOS App Store and Google Play, and is Apache 2.0.',
            '<strong>You want managed cloud sandboxes and multiplayer collaboration</strong>: Conductor. Its local app is macOS only, while cloud workspaces can keep agents running after the app closes.',
            '<strong>You live in the terminal and want tmux and SSH, not a GUI</strong>: Claude Squad. It manages agents as tmux sessions, which means it works fine over SSH on a box with no desktop at all.',
            '<strong>You want to organize work in a kanban</strong>: evaluate Vibe Kanban knowing that it is officially sunsetting and now community maintained. Commits were still landing in late October 2026.',
            '<strong>You want to visually edit what the agents produce</strong>: Nimbalyst. It positions itself as a visual editor for Claude Code and Codex, for markdown, mockups and diagrams as well as code.',
            '<strong>You want a supervised desktop workspace across several vendors, with notifications, shared history and a kanban the agents update themselves</strong>: CodeAgentSwarm. Ten CLIs on macOS, Windows and Linux, at the cost of being closed source.',
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
          headers: ['Tool', 'GitHub stars (Oct 31, 2026)', 'Last public commit', 'Platforms', 'Agents supported', 'Open source'],
          rows: [
            [
              'CodeAgentSwarm',
              'No public repo',
              'Closed source',
              'macOS, Windows and Linux',
              'Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI',
              'No, proprietary',
            ],
            [
              'T3 Code',
              'About 33,800',
              'October 31, 2026',
              'macOS, Windows and Linux desktop; web; iOS and Android',
              'Claude Code, Codex, Cursor, Grok Build, OpenCode and Antigravity, plus ACP agents such as Pi',
              'Yes, MIT',
            ],
            [
              'Superset (now Paradev)',
              'About 15,800 (repo ParadevAI/Paradev)',
              'October 31, 2026',
              'macOS; experimental Linux AppImage; Windows planned; iPhone and iPad app on Pro',
              '21 built-in, including Claude Code, Codex, Antigravity, OpenCode, Kimi Code, Grok, Cursor Agent and Gemini CLI, plus any CLI',
              'Source available, Elastic License 2.0',
            ],
            [
              'Paseo',
              'About 22,600',
              'October 31, 2026',
              'Self-hosted daemon with macOS, Windows and Linux desktop, iOS and Android apps, web and CLI',
              'Claude Code, Codex, OpenCode, Pi, Antigravity and Muse Code natively, plus dozens via ACP (Copilot, Cursor, Kimi, Grok, Devin)',
              'Yes, Apache 2.0 since August 27, 2026',
            ],
            [
              'Vibe Kanban',
              'About 28,500',
              'October 28, 2026',
              'Runs locally in the browser (npx), docs cover macOS, Windows and Linux; Docker self-hosting',
              'Ten, including Claude Code, Codex, GitHub Copilot, Gemini CLI, Amp, Cursor Agent CLI and OpenCode',
              'Yes, Apache-2.0',
            ],
            [
              'opcode',
              'About 22,400',
              'September 18, 2026, README only (last code change October 16, 2025)',
              'macOS and Linux builds in its last release, v0.2.0 (August 31, 2025)',
              'Claude Code',
              'Yes, AGPL-3.0',
            ],
            [
              'Claude Squad',
              'About 8,700',
              'August 20, 2026',
              'Terminal, tmux based, no GUI; macOS and Linux, Windows via WSL',
              'Claude Code, Codex, Gemini, Aider and any local command',
              'Yes, AGPL-3.0',
            ],
            [
              'Nimbalyst',
              'About 2,000',
              'October 31, 2026',
              'macOS, Windows and Linux; iOS app',
              'Claude Code and Codex; OpenCode, Copilot, Grok Build and Cursor Agent in alpha',
              'Yes, MIT',
            ],
            [
              'Conductor',
              'No public repo',
              'No public repo',
              'macOS app for local work; managed cloud workspaces; iOS app since October 2026',
              'Claude Code, Codex, Cursor, OpenCode',
              'No, proprietary',
            ],
          ],
          caption: 'Product, licence and supported-agent facts were read from each vendor\'s own site, docs or repository on October 31, 2026. GitHub stars and last commits were checked the same day.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Every fact in this table was verified on October 31, 2026. Star counts move, repos get renamed or archived, products change names, and a tool that was quiet in September can ship in October. If a row is out of date or wrong, tell us and we will fix it and say when we did.',
        },
        {
          type: 'paragraph',
          text: 'When a vendor does not document something, this guide says "not documented" instead of "no". We are not going to claim a tool lacks Linux support or a mobile client because we could not find it in five minutes. Absent from the docs is a different statement from absent from the product, and the difference matters when what you are reading is meant to be quotable.',
        },
      ],
    },
    {
      id: 'popular-vs-alive',
      title: 'Popular is not the same as alive',
      content: [
        {
          type: 'paragraph',
          text: 'Stars measure accumulated interest, not software health. Two examples from the October 31 check. Vibe Kanban has about 28,500 stars and commits from October 28, 2026, yet its README and site say the project is sunsetting and will continue as open source and community maintained, as explained in their <a href="https://www.vibekanban.com/blog/shutdown" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">shutdown post</a>. opcode has about 22,400 stars, but its last code change was on October 16, 2025; the only commit since is a <a href="https://github.com/winfunc/opcode/commit/d1ca30a3c0c39fff01fde2f86c2d5af6a1db658b" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">README edit</a> on September 18, 2026, and its last release, v0.2.0, is from August 31, 2025.',
        },
        {
          type: 'paragraph',
          text: 'Star counts and dates in the table were read on October 31, 2026. Before choosing, review recent changes, releases and issues relevant to your workflow. Today\'s count will not be current next month either.',
        },
        {
          type: 'paragraph',
          text: 'This matters more here than in most software categories, for a specific reason: the products these tools wrap move underneath them. Claude Code, Codex CLI and the rest change flags, output format, session file layout and permission prompts on a scale of weeks. A wrapper that stops being maintained does not announce itself. It works for a while, then one CLI update lands and the diff view goes blank, or session resume stops finding conversations, and the issue sits open. Before committing to any tool here, open its repository and look at the last commit date, not the star count.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Open the commits and inspect what changed. Then check releases and issue responses. A push or README edit is not the same as a new functional release.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'CodeAgentSwarm: supervised parallel sessions across ten CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'This is our tool, so read this section knowing that. CodeAgentSwarm is a desktop app for macOS, Windows and Linux that runs several coding CLIs as independent terminals in one workspace. You pick the agent per terminal: Claude Code on a refactor in one, Codex CLI writing tests in another, OpenCode reading an unfamiliar module in a third. Each terminal is its own process and its own conversation, and nothing is shared unless you share it.',
        },
        {
          type: 'video',
          src: '/videos/guides/25-terminals.mp4',
          caption: 'Many terminals running at the same time in one CodeAgentSwarm workspace, each with its own agent, its own project and its own conversation.',
        },
        {
          type: 'paragraph',
          text: 'The ten supported CLIs are Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI. The advantage is the depth of those integrations: CodeAgentSwarm understands each agent\'s sessions, permissions and capabilities instead of treating every command as an interchangeable terminal process.',
        },
        {
          type: 'image',
          alt: 'Current Kanban board with Pending, Auto, In Progress, In Testing and Completed columns',
          src: '/images/guides/task-board-current.webp',
          caption: 'Sample tasks from three projects, with separate project colors and the Auto queue visible.',
        },
        {
          type: 'paragraph',
          text: 'The features that exist because supervising several agents is harder than starting them: desktop notifications when any agent finishes or stops to ask you something, per-terminal live file diffs so overlapping edits become visible before they become conflicts, permission control with a Turbo mode that auto-approves safe operations and gates the dangerous ones, a git worktree per session so agents never fight over the same working tree, and a kanban task board that the agents update themselves over MCP instead of you transcribing their status by hand.',
        },
        {
          type: 'image',
          alt: 'Current conversation history with agent filters and sample conversations grouped by date',
          src: '/images/guides/history-browse-current.webp',
          caption: 'Sample conversations from several projects, grouped by date with agent and project indicators.',
        },
        {
          type: 'paragraph',
          text: 'Two more worth naming. The conversation history is cross-agent: sessions from all ten CLIs land in one searchable place, with resume when the agent supports it, which is not the same as each CLI keeping its own history in its own format on disk. And the quota indicator reads the real usage windows per provider, so you see which agent is about to run out of budget before it stops mid-task rather than after.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'Ten CLIs in one workspace, chosen per terminal, including Cursor Agent, Antigravity CLI, Kimi Code and Grok Build',
            'Notifications when an agent finishes or needs input, which is what actually lets you leave the window',
            'One searchable, resumable conversation history across every agent instead of ten separate ones',
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
            'Mobile Connect is still in alpha. The web beta is available to every account, native iOS and Android access is by request, and the desktop must stay open.',
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
      title: 'T3 Code: the open-source control plane',
      content: [
        {
          type: 'paragraph',
          text: 'T3 Code calls itself the open-source control plane for coding agents. The repository pingdotgg/t3code was created on February 8, 2026 and had about 33,800 stars on October 31, 2026, up from about 21,100 two months earlier, with commits and a release (v0.1.6) that same day. Its README still describes the project as very early.',
        },
        {
          type: 'paragraph',
          text: 'The distribution story is the most flexible here: npx t3@latest on a machine with nothing installed, or the desktop app, with winget and Scoop on Windows, a Homebrew cask on macOS, the AUR and Nix on Linux, plus a web app and mobile apps. Per its README as of October 31, 2026 it drives Claude Code, Codex, Cursor, Grok Build, OpenCode and Antigravity, and its docs add agents from the ACP Registry. It offers git worktrees, a diff pane, an integrated terminal and browser, plan mode, remote access and a Commit, Push and Create PR path out of a finished session.',
        },
        {
          type: 'paragraph',
          text: 'It is MIT licensed and free with no paid plan; you bring your own subscriptions. Its T3 Connect remote access is free for now for up to three machines. If you are choosing between the two of us, the honest split is licence and install friction against supervision features, and we wrote it out properly in <a href="/en/guides/t3-code-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">our detailed T3 Code comparison</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'MIT licensed and genuinely free, with your own subscriptions',
            'Runs with npx without installing anything, which no other tool here offers',
            'Packaged for macOS, Windows and Linux, with web and mobile apps',
            'One-click Commit, Push and Create PR out of a session',
            'About 12,700 new stars in two months and commits landing daily',
          ],
        },
        {
          type: 'paragraph',
          text: '<strong>Where it falls short:</strong>',
        },
        {
          type: 'list',
          items: [
            'Its README calls the project very early and asks you to expect bugs',
            'Kimi Code, Devin CLI and Muse Code are not built-in providers; some are reachable only through the ACP Registry',
            'A project that young is still moving fast, which cuts both ways',
          ],
        },
      ],
    },
    {
      id: 'superset',
      title: 'Superset (now Paradev): an IDE built for many parallel agents',
      content: [
        {
          type: 'paragraph',
          text: 'Superset changed its name to <a href="https://paradev.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Paradev</a> on October 12, 2026; the <a href="https://paradev.com/blog" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">announcement</a> says only the name changed, and superset.sh now redirects to paradev.com. It calls itself the IDE for parallel agents, built around one git worktree per task, review, pull requests, an in-app browser and automations. Where CodeAgentSwarm treats the terminal as the unit and Paseo treats the device as the unit, Paradev treats the IDE as the thing you live in.',
        },
        {
          type: 'paragraph',
          text: 'The repository, now ParadevAI/Paradev, had about 15,800 stars and a commit on October 31, 2026. Its README lists 21 built-in agents as fully supported, including Claude Code, Codex, Antigravity, OpenCode, Kimi Code, Grok, Cursor Agent and Gemini CLI, and any CLI can be added as a custom agent. The desktop app is free; Pro is $20 per user per month, Team $60 and Ultra $200. The licence deserves precision: Elastic License 2.0. The code is on GitHub and you can read it, but Elastic 2.0 is not OSI-approved, so the accurate phrase is source available rather than open source. If your company has a licence policy, that is the distinction that will come up in review.',
        },
        {
          type: 'paragraph',
          text: 'If running many agents at once is the workload you actually have, this is a serious tool. We put the comparison against our own workspace in <a href="/en/guides/superset-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Superset vs CodeAgentSwarm</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Where it wins:</strong>',
        },
        {
          type: 'list',
          items: [
            'Designed for many concurrent agents, with 21 built-in agents and any CLI as a custom one',
            'IDE-shaped workspace with a task board, quota meters and an iPhone app on Pro',
            'Source is on GitHub and actively committed to',
            'Team plans, automations and cloud workspaces (beta) for people who work as a team',
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
            'No Windows build yet; Linux is an experimental AppImage, per their FAQ as of October 31, 2026',
            'Team features and automations sit behind paid plans, from $20 per user per month',
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
          text: 'Paseo calls itself an agentic development environment, and its mobile side is not a marketing word. There are real apps on the iOS App Store and Google Play, backed by a self-hosted daemon that also serves desktop, web and CLI clients; the desktop app starts the daemon for you. That architecture is the whole argument for it: the agents run on your machine, and you check on them from wherever you are.',
        },
        {
          type: 'paragraph',
          text: 'The repository getpaseo/paseo had about 22,600 stars and a commit on October 31, 2026, and since August 27, 2026 its own code is under <a href="https://github.com/getpaseo/paseo/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Apache 2.0</a>, replacing AGPL-3.0. It runs Claude Code, Codex, OpenCode, Pi, Antigravity and Muse Code natively and dozens more through ACP, including Copilot, Cursor, Kimi, Grok and Devin, the widest published agent list in this guide. It gives you git worktrees, diff review, live streaming of agent output and local-first voice input, and states plainly that there is no telemetry and no forced login.',
        },
        {
          type: 'paragraph',
          text: 'Paseo still wins cleanly on public mobile availability and self-hosting. CodeAgentSwarm Mobile Connect is in alpha, with a web beta for every account and native access by request, and its desktop must stay open. Paseo already ships public native clients around a daemon you host. The rest of the trade-off, mostly around Windows-native desktop behaviour and cross-agent history, is in <a href="/en/guides/paseo-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Paseo vs CodeAgentSwarm</a>.',
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
            'Apache 2.0, fully open source',
            'Six native agents plus dozens through ACP, covering every CLI we support',
            'No telemetry and no forced login, stated on their own site',
            'Local-first voice input',
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
            'Some agents run through ACP adapters rather than the vendor CLI; their docs say Antigravity only runs in full access mode',
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
          text: 'Conductor is proprietary software with a macOS app, managed cloud sandboxes and, since October 2026, an iOS app, for Claude Code, Codex, Cursor and OpenCode. Pro adds cloud workspaces that keep running after the app closes, multiplayer collaboration for up to five Pro users and a beta HTTP API; pricing starts at $0 locally and $50/month for Pro. Its install docs say it is not available for Windows or Linux yet, and there is no public repository. Full comparison in <a href="/en/guides/conductor-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Conductor vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Claude Squad',
          id: 'tool-claude-squad',
        },
        {
          type: 'paragraph',
          text: 'Claude Squad manages multiple AI terminal agents such as Claude Code, Codex, Gemini and Aider as tmux sessions, and can launch an arbitrary local command. It is AGPL-3.0 and had about 8,700 stars on October 31, 2026. Its last commit and release, v1.0.20, are from August 20, 2026; issues and pull requests were still being opened in October. There is no GUI, which is a feature if you want to run it on a remote box over SSH and a problem if you wanted diffs and notifications on a desktop. For terminal purists it is the most natural fit here. We compare the two approaches in <a href="/en/guides/claude-squad-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Squad vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Vibe Kanban',
          id: 'tool-vibe-kanban',
        },
        {
          type: 'paragraph',
          text: 'Vibe Kanban offers a kanban task workflow and publishes its code under Apache-2.0. Its README and site say it is sunsetting after bloop shut down in April 2026 and will continue as open source and community maintained (<a href="https://www.vibekanban.com/blog/shutdown" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">announcement</a>). Commits kept landing through October 28, 2026, but the last GitHub release is v0.1.44 from April 24. Evaluate current releases and issues before adopting it. More detail in <a href="/en/guides/vibe-kanban-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Vibe Kanban vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Nimbalyst',
          id: 'tool-nimbalyst',
        },
        {
          type: 'paragraph',
          text: 'Nimbalyst is an open-source visual workspace for Claude Code and Codex: parallel sessions, AI diff review, a session kanban, and editing markdown, mockups, diagrams and code, with OpenCode, Copilot, Grok Build and Cursor Agent in alpha. The app is MIT and free; a paid Wiki Teams plan is $20 per user per month. The repository had about 2,000 stars and a commit on October 31, 2026. The star count is low because the repository is new, not because the project is: this is the tool formerly known as Crystal, and the old repo carries about 3,100 stars. If your work with agents produces documents and diagrams as often as code, this is the one shaped for that. More in <a href="/en/guides/nimbalyst-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Nimbalyst vs CodeAgentSwarm</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'opcode',
          id: 'tool-opcode',
        },
        {
          type: 'paragraph',
          text: 'opcode is a desktop GUI and toolkit for Claude Code under AGPL-3.0, with macOS and Linux builds in its last release, v0.2.0, from August 31, 2025. Its latest default-branch commit, checked on October 31, 2026, is a <a href="https://github.com/winfunc/opcode/commit/d1ca30a3c0c39fff01fde2f86c2d5af6a1db658b" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">September 18 README edit</a>; the last code change is from October 16, 2025. That does not show that its Claude Code integration has kept up with a year of Claude Code releases. Review releases and functional changes before deciding whether it fits.',
        },
      ],
    },
    {
      id: 'also-worth-knowing',
      title: 'Smaller tools, renames and shutdowns',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Pane</strong> (runpane.com, now published by Greenfield, formerly Dcouple; repo greenfield-inc/Pane) is a terminal-first, AGPL-3.0 agent manager for Claude Code, Codex, Cursor Agent, Aider or any CLI agent, on macOS, Windows and Linux, with a Remote Pane mode for your phone. It had about 600 stars and a release (v2.4.212) on October 31, 2026. Small, and being worked on. The any-agent, any-OS combination is rarer than it sounds.',
        },
        {
          type: 'paragraph',
          text: '<strong>Parallel Code</strong> (parallelcode.app, repo johannesjo/parallel-code) describes itself as the open-source workspace for parallel AI coding, giving each agent its own git worktree. It is MIT, runs Claude Code, Codex CLI, OpenCode, Copilot CLI and Antigravity CLI, ships for macOS and Linux with no Windows build yet, and had about 1,100 stars and a v5.1.0 release on October 29, 2026. It also runs a comparison page for this category, which is how a lot of people arrive at these tools in the first place, and which is why the facts on those pages matter beyond the products themselves.',
        },
        {
          type: 'paragraph',
          text: '<strong>Crystal is now Nimbalyst.</strong> The old repository stravu/crystal (MIT, about 3,100 stars, last commit February 26, 2026) says so directly and points to nimbalyst.com. If you find a guide recommending Crystal, it is not wrong, it is just out of date. The current repository is nimbalyst/nimbalyst. <strong>Superset is now Paradev</strong> for the same reason: same product, new name since October 12, 2026.',
        },
        {
          type: 'paragraph',
          text: '<strong>Terragon has shut down.</strong> terragonlabs.com now serves a page titled "Terragon Shutdown" about its February 9, 2026 shutdown, and the repository terragon-labs/terragon-oss describes the product in the past tense: it was a remote background agent orchestrator for running Claude Code, Codex and other coding CLIs in the cloud. It appears in older lists of this category, so it is worth knowing why it is no longer a choice.',
        },
        {
          type: 'paragraph',
          text: '<strong>The vendors now run parallel sessions too.</strong> <a href="https://code.claude.com/docs/en/desktop" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code Desktop</a> runs parallel sessions with Git isolation, each in its own worktree, on macOS and Windows with a Linux beta. OpenAI\'s <a href="https://developers.openai.com/codex/app" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex app page</a> points to the ChatGPT desktop app, which runs projects in parallel on macOS, Windows and Linux and documents Git worktrees. Inside the CLI, Claude Code also has experimental <a href="/en/guides/claude-code-agent-teams-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Agent Teams</a>. Each of these runs only its own vendor\'s agent. If you use one agent, start there; the tools in this guide earn their place when you mix vendors.',
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
      question: 'Which tool can run Claude Code and Codex together on Windows or Linux?',
      answer: 'CodeAgentSwarm supports both agents on macOS, Windows and Linux. You can supervise separate sessions in one workspace and use Git worktrees for isolated changes. It is closed source and free during the open beta; you still need your own provider access. Compare the dated platform and licence details in the table before choosing an alternative.',
    },
    {
      question: 'Is CodeAgentSwarm open source?',
      answer: 'No. CodeAgentSwarm is closed source and there is no public repository for the app. It is free during the beta with the Pro features included. If open source is a requirement for you, T3 Code (MIT), Paseo (Apache 2.0), Nimbalyst (MIT), Claude Squad (AGPL-3.0) and Vibe Kanban (Apache-2.0) are open source alternatives in the same category, and Superset, now Paradev, is source available under the Elastic License 2.0.',
    },
    {
      question: 'Which of these tools are actively maintained in 2026?',
      answer: 'Checked on October 31, 2026: Paradev (formerly Superset), Paseo, Nimbalyst, Pane and Parallel Code all had commits in the last week. Vibe Kanban had commits on October 28 but officially announced it is sunsetting and is now community maintained. Claude Squad\'s last commit and release are from August 20, 2026. opcode\'s last code change is from October 16, 2025, with only a README edit since. CodeAgentSwarm and Conductor have no public application commit history for this comparison.',
    },
    {
      question: 'Are LangGraph, CrewAI or AutoGen alternatives to these tools?',
      answer: 'No. LangGraph, CrewAI and AutoGen are frameworks for building agent systems in code. You import them into a program you write. The tools in this guide are applications that run and supervise coding CLIs such as Claude Code and Codex on your machine, with diffs, notifications and session management. They solve different problems and you can use both at once.',
    },
    {
      question: 'What happened to Crystal?',
      answer: 'Crystal was renamed to Nimbalyst. The old repository stravu/crystal states that Crystal is now Nimbalyst and points to nimbalyst.com. The current repository is nimbalyst/nimbalyst, MIT licensed, with about 2,000 stars and a commit on October 31, 2026. Older articles that recommend Crystal are describing the same product under its previous name.',
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
