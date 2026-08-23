import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ai-cli-agent-swarm',
    locale: 'en',
    title: 'AI CLI Agent Swarm: Run Multiple AI Coding Agents in Parallel',
    metaTitle: 'AI CLI Agent Swarm: Run 7 Coding Agents Together (2026)',
    metaDescription: 'Run Claude Code, Codex, Cursor Agent, Antigravity, OpenCode, Kimi Code and Grok Build in parallel as one supervised AI CLI agent swarm.',
    intro: `An AI CLI agent swarm is what you get when you stop thinking of one coding agent in one terminal and start running several of them at once. Claude Code in one terminal, Codex CLI in another, Grok Build or OpenCode in a third, all working on the same project at the same time.

The idea sounds chaotic, and done badly it is. The point of this guide is to show you how to do it well: how to actually run multiple AI coding agents in parallel, how to decide which agent handles what, and how to keep visibility over a workspace where three or four agents are editing files at the same time.

I run mixed swarms most days. This is AI coding agent orchestration at the process level: independent coding agents, one human supervisor. Below I cover the honest tradeoffs of each setup method and where a purpose-built workspace earns its place over plain terminal tabs or tmux. For the product comparison, see the <a href="/en/guides/best-tools-to-run-multiple-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">best tools for running multiple AI coding agents</a>.`,
    ctaText: 'Run Claude Code, Codex, Cursor Agent, Antigravity, OpenCode, Kimi Code and Grok Build side by side in one CodeAgentSwarm workspace. Multiple agents, shared visibility, one place to watch them all.',
    ctaAgent: 'multi',
    highlightedWords: ['AI CLI agent swarm', 'in parallel'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-08-23',
    alternateSlug: 'enjambre-de-agentes-cli-ia',
  },
  sections: [
    {
      id: 'what-is-it',
      title: 'What is an AI CLI agent swarm?',
      content: [
        {
          type: 'paragraph',
          text: 'An AI CLI agent swarm is several independent AI coding CLI agents running in parallel in one place, with shared visibility over what each one is doing. Instead of a single agent in a single terminal, you have a handful of them, each its own process, each with its own conversation and context, working on tasks at the same time.',
        },
        {
          type: 'paragraph',
          text: 'The agents are command-line tools you probably already use: <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent CLI</a>, <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="https://x.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> and Google\'s Antigravity CLI. Each one runs independently. The swarm is the layer around them that keeps the work visible.',
        },
        {
          type: 'paragraph',
          text: 'A real swarm is more than "several terminals open". The thing that makes it usable is shared context: one place where you can see what each agent is working on, get notified when one finishes or needs input, search the history across all of them, watch the file changes each one is making, and control what they are allowed to do without your confirmation. Without that layer you just have a lot of terminals and a lot of guessing.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'A swarm runs on top of the provider access you already have. Each terminal uses your own Claude, OpenAI, Google, Kimi, xAI or OpenCode-connected account or API key independently. There is no special swarm plan and no extra CodeAgentSwarm fee per parallel agent.',
        },
        {
          type: 'paragraph',
          text: 'If you only care about one vendor, the per-tool guides go deeper: <a href="/en/guides/claude-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>, <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a> and <a href="/en/guides/grok-build-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a>. This page is the cross-vendor view.',
        },
      ],
    },
    {
      id: 'which-agent-for-what',
      title: 'Which AI coding CLI should you use for what?',
      content: [
        {
          type: 'paragraph',
          text: 'The honest answer is that no single agent is best at everything, which is exactly why running a swarm pays off. You assign work to whichever agent tends to do it well, instead of forcing one tool to cover every job. Here is how I tend to split it.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Claude Code for deep refactors and reasoning',
          id: 'claude-for-refactors',
        },
        {
          type: 'paragraph',
          text: 'Claude Code is the one I reach for when a change touches a lot of files and needs careful reasoning: refactoring a module, tracing a bug through several layers, or rewriting something where I care about the structure of the result. It tends to keep a coherent mental model across a larger change and it handles Git conflicts well when it shares a project with other agents.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Codex CLI for focused, contained tasks',
          id: 'codex-for-tasks',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI is a good fit for well-scoped jobs: implement this function, add this endpoint, write tests for this file, fix this specific failure. When the task is contained and the spec is clear, it gets to a working result quickly. I often hand it the pieces I have already decided on while Claude is busy with the larger refactor.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Antigravity CLI, OpenCode, Kimi Code and Grok Build',
          id: 'other-agents',
        },
        {
          type: 'paragraph',
          text: 'Antigravity CLI (agy) is Google\'s current coding CLI and fits when you want a wide-context Google model in the swarm. OpenCode is provider agnostic, so parallel sessions can use different vendors. Kimi Code fits Moonshot models. Grok Build (xAI, binary <code>grok</code>) now uses Grok 4.6 and can be tried free before moving to paid limits or API billing. None replaces the others; the point of a swarm is to run them side by side.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'You do not have to pick once and stick with it. Per task, ask which agent is the cheapest reliable way to get a correct result, then route it there. A swarm only helps if you actually use the difference between the agents.',
        },
        {
          type: 'paragraph',
          text: 'None of this is a hard rule, models change month to month. Treat it as a starting bias, not a law, and adjust based on what you see in your own projects.',
        },
      ],
    },
    {
      id: 'worktrees-and-teams',
      title: 'Two questions people ask first',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Do I need git worktrees to run agents in parallel?',
          id: 'do-i-need-worktrees',
        },
        {
          type: 'paragraph',
          text: 'No, worktrees are optional. A common worry is that multiple agents in the same repo will trample each other, so people reach for <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees</a> to give each agent its own checkout. That can be useful when two agents are doing big, conflicting changes on the same branch. But it is not required to get started.',
        },
        {
          type: 'paragraph',
          text: 'In practice you can run several terminals against one workspace and one checkout. When agents edit different files there is no conflict at all. When they touch the same file, Git handles the merge and the agents resolve conflicts reasonably well. Worktrees are a tool for the rare cases where you want hard isolation, not a prerequisite for running a swarm.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Is this the same as Claude Code agent teams?',
          id: 'is-this-agent-teams',
        },
        {
          type: 'paragraph',
          text: 'No, they are different things. Anthropic\'s agent teams are sub-agents inside a single Claude Code session: one main agent spawns helpers that report back, all within one process and one vendor. An AI CLI agent swarm is several independent agents you supervise directly, each in its own terminal, possibly from different vendors (Claude Code, Codex, Antigravity, OpenCode, Kimi Code, Grok Build). One is delegation inside one session, the other is you running and watching several real sessions at once. They can coexist, but they solve different problems.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal windows (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The simplest swarm is the one you can build right now. Open a few terminal tabs, go to your project in each, and start a different agent in each tab.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1: deep refactor\ncd ~/my-project\nclaude\n\n# Terminal tab 2: focused task\ncd ~/my-project\ncodex\n\n# Terminal tab 3: Grok Build\ncd ~/my-project\ngrok',
        },
        {
          type: 'paragraph',
          text: 'That is a working three-agent swarm. Each tab is an independent agent on the same project, and you switch between them to give instructions.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pros',
          id: 'terminal-windows-pros',
        },
        {
          type: 'list',
          items: [
            'Free, no extra tools needed',
            'Works immediately, no setup',
            'You can mix vendors right away',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cons',
          id: 'terminal-windows-cons',
        },
        {
          type: 'list',
          items: [
            'You quickly lose track of which tab is running which agent and which task',
            'No notification when an agent finishes or stops to ask you something',
            'No shared view, you click into each tab to check status',
            'No search across the history of different agents',
            'Overlapping edits between agents catch you by surprise',
            'With three or more tabs they all start to look the same',
          ],
        },
        {
          type: 'paragraph',
          text: 'Fine for two agents. Past that, the time you spend switching and checking starts to cancel out the time the parallelism saved you.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> gives you split panes and persistent sessions, so you can see several agents at once without flipping between tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a tmux session for the swarm\ntmux new-session -s swarm\n\n# Split into panes\ntmux split-window -h\ntmux split-window -v\n\n# Run a different agent in each pane: claude, codex, grok',
        },
        {
          type: 'paragraph',
          text: 'You can also detach and reattach, so the swarm survives closing your terminal window. For a hand-rolled multi-vendor setup, this is about as good as it gets for free.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pros',
          id: 'tmux-pros',
        },
        {
          type: 'list',
          items: [
            'Free and available almost everywhere',
            'See several panes at once, no tab switching',
            'Sessions persist across disconnects',
            'Highly scriptable if you want to wire up your own layout',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cons',
          id: 'tmux-cons',
        },
        {
          type: 'list',
          items: [
            'Steep learning curve if tmux is new to you',
            'Still no desktop notifications when an agent finishes',
            'No searchable history across the different agents',
            'Text only, panes get cramped past three or four agents',
            'No task board or organization layer',
            'You set up the layout manually each time',
            'Conflict awareness between agents is entirely on you',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a great general-purpose multiplexer, but it was never built for supervising AI coding agents. The gaps show the moment you run a mixed swarm of three or more agents on a regular basis.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running an AI CLI agent swarm with real visibility and control. It runs on macOS and Windows, gives you multiple terminals in one workspace, and lets you pick the agent per terminal. It is not a model provider: every terminal uses the account and quota of the CLI you selected.',
        },
        {
          type: 'paragraph',
          text: 'Here is what the workspace gives you for managing a mixed swarm:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiple agents in parallel, your choice per terminal',
          id: 'seven-agents',
        },
        {
          type: 'paragraph',
          text: 'Each terminal has a SELECT AI AGENT picker offering Claude Code, Codex CLI, Cursor Agent, Antigravity CLI, OpenCode, Kimi Code and Grok Build. Set one terminal to Claude Code for a refactor, another to Cursor Agent for a planned change and another to Codex for a contained task. You decide the mix per terminal.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Each terminal updates its title to reflect what its agent is doing right now. Instead of three identical terminals, you see "Refactoring Auth", "Writing API Tests", "Reading Payment Module", and you can tell at a glance which agent is on which task without clicking in.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications across all agents',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'When any agent finishes its task or stops to ask you something, you get a native desktop notification. You can focus on one terminal and let the rest tell you when they need you, which is the whole point of running a swarm. The <a href="/en/guides/codeagentswarm-notifications" class="text-neon-cyan hover:text-neon-purple transition-colors">notification system guide</a> goes into the detail.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Searchable history across every agent',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation, from every agent and every vendor, is saved and searchable in one place. You can find what Codex did yesterday, resume a Grok Build session with <code>grok --continue</code> or <code>grok --resume</code>, or trace which agent made a change across the whole swarm. The <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history guide</a> covers how it works.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Per-terminal live file diffs',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each agent is making, per terminal and at project level, in real time. In a mixed swarm this is what stops overlapping edits from surprising you: you see when two agents are heading for the same file before it becomes a merge problem. More in the <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">real-time changes guide</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode with granular permissions',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'More agents means more actions happening at once, so permission control matters more, not less. Turbo Mode auto-approves the safe operations while keeping the dangerous ones gated, with granular control over exactly what each terminal can do unattended. The <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> has the full setup.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A shared task board and project tools',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits over the swarm, and the agents update it themselves over MCP as they work. Add project shortcuts, a skills marketplace, an MCP marketplace, and AI-generated git commit messages, and the workspace becomes the one place you coordinate the whole swarm from, rather than juggling tabs.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'For a step-by-step on opening and arranging terminals, see the <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">multi-terminal guide</a>. The same workspace runs Codex, OpenCode, Kimi Code and Grok Build terminals too.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'How the three ways of running a swarm stack up across what actually matters when several agents are working at once:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cost',
          id: 'compare-cost',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Free',
            '<strong>tmux/screen:</strong> Free',
            '<strong>CodeAgentSwarm:</strong> All Pro features are free during the open beta, and it runs on top of your existing agent subscriptions',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mixing vendors',
          id: 'compare-mixing',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Possible, but you track which agent is where by memory',
            '<strong>tmux/screen:</strong> Possible, panes are not labeled by agent',
            '<strong>CodeAgentSwarm:</strong> Per-terminal agent picker, with the active agent visible at all times',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notifications',
          id: 'compare-notifications',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> None',
            '<strong>tmux/screen:</strong> None unless you script it',
            '<strong>CodeAgentSwarm:</strong> Native desktop notifications when any agent finishes or needs input',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'History across agents',
          id: 'compare-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Lost when you close the tab',
            '<strong>tmux/screen:</strong> Kept while the session lives, no search',
            '<strong>CodeAgentSwarm:</strong> Saved permanently and searchable across every agent and vendor',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'File change visibility',
          id: 'compare-diffs',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Whatever each agent prints, nothing shared',
            '<strong>tmux/screen:</strong> Same, no cross-agent view',
            '<strong>CodeAgentSwarm:</strong> Live per-terminal and project-level diffs so overlapping edits are visible early',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Learning curve',
          id: 'compare-learning',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> None',
            '<strong>tmux/screen:</strong> Moderate to steep (keybindings, config, pane management)',
            '<strong>CodeAgentSwarm:</strong> Low, a visual interface with familiar patterns',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'If you only ever run two agents, terminal tabs are fine and you should not overthink it. If you already live in tmux, adding a couple of agents to your setup is natural. But once you run a mixed swarm of three or more agents regularly, and you want to see what each one is doing, get told when they need you, and catch overlapping edits before they bite, a purpose-built workspace removes the friction the other methods leave in place.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is an AI CLI agent swarm?',
      answer: 'It is several independent AI coding CLI agents (such as Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent) running in parallel in one place, with shared visibility over what each one is doing. Each agent is its own process with its own conversation and context, and the swarm is the layer around them that adds notifications, searchable history, file change visibility, and permission control.',
    },
    {
      question: 'Can I run Claude Code, Codex and Grok Build at the same time?',
      answer: 'Yes. Each agent runs as an independent CLI process, so you can run Claude Code, Codex CLI, Grok Build and the other supported CLIs side by side on the same project. CodeAgentSwarm lets you pick the agent per terminal and run multiple at once in one workspace, so you can mix vendors freely.',
    },
    {
      question: 'Which AI coding CLI should I use for what?',
      answer: 'There is no single best agent, which is why a swarm helps. Start with Claude Code for deep refactors, Codex CLI for focused tasks, OpenCode for provider flexibility, Kimi Code for Moonshot models and Grok Build for Grok 4.6. Models change often, so adjust from your own results.',
    },
    {
      question: 'Do I need git worktrees to run agents in parallel?',
      answer: 'No, worktrees are optional. You can run several agents against one workspace and one checkout. When they edit different files there is no conflict, and when they touch the same file Git handles the merge and the agents resolve it reasonably well. Git worktrees are useful when you want hard isolation for big conflicting changes, but they are not a prerequisite for running a swarm.',
    },
    {
      question: 'Is an AI CLI agent swarm the same as Claude Code agent teams?',
      answer: 'No. Claude Code agent teams are sub-agents inside a single Claude Code session, all within one process and one vendor. An AI CLI agent swarm is several independent agents you supervise directly, each in its own terminal, possibly from different vendors. One is delegation inside a session, the other is running and watching several real sessions at once. They solve different problems and can coexist.',
    },
  ],
}

export default guide
