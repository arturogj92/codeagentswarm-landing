import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-agent-swarm',
    locale: 'en',
    title: 'Claude Code Agent Swarm: Run Multiple Claude Agents in Parallel',
    metaTitle: 'Claude Code Agent Swarm: Run Multiple Claude Agents in Parallel (2026)',
    metaDescription: 'A Claude agent swarm runs several independent Claude Code sessions at once. How it differs from subagents, the 3 ways to set one up, and how to keep it from turning into merge chaos.',
    intro: `A Claude code swarm is several independent Claude Code sessions running at the same time, each on its own task. Every time you run <code>claude</code> you get a separate process with its own conversation and its own context window, so nothing stops you from having four of them working the same repository at once.

The first thing worth clearing up: this is not the same as Claude Code's built-in subagents. Those live inside one session and share its context and usage. A swarm is several sessions that know nothing about each other. The difference decides which one you actually want, so the next section covers it before anything else.

The second thing is that starting the processes is trivial and supervising them is not. Three Claude agents finish at different moments, stop for different permission prompts, and occasionally edit the same file. This guide covers the three practical ways to run a Claude agent swarm, where each one breaks, and how to stop parallel agents from stepping on each other. For the same setup on other CLIs, see the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview or the <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex agent swarm</a> guide.`,
    ctaText: 'Run your Claude agent swarm in CodeAgentSwarm. Several Claude Code terminals in one window, with desktop notifications, live diffs and per-terminal permissions so parallel agents stay supervised.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code Agent Swarm', 'Claude Agents'],
    publishedAt: '2026-07-31',
    updatedAt: '2026-07-31',
    alternateSlug: 'enjambre-de-agentes-claude-code',
  },
  sections: [
    {
      id: 'swarm-vs-subagents',
      title: 'Swarm vs subagents: the distinction that matters first',
      content: [
        {
          type: 'paragraph',
          text: 'Search for a Claude agent swarm and you get two different things mixed together. They are not interchangeable, and picking the wrong one wastes a lot of time.',
        },
        {
          type: 'table',
          headers: ['', 'Subagents / agent teams', 'A Claude swarm'],
          rows: [
            ['What it is', 'Helpers spawned inside one Claude Code session', 'Several separate Claude Code sessions'],
            ['Who is in charge', 'Claude orchestrates them for you', 'You assign the work'],
            ['Context', 'Shared with the parent session', 'Each one has its own, fully isolated'],
            ['Lifetime', 'Ephemeral, they end with the task', 'As long as you keep the session open'],
            ['Best for', 'Splitting one task into parallel steps', 'Several unrelated tasks at once'],
            ['Can mix vendors', 'No, all Claude', 'Yes, Claude plus Codex, opencode, others'],
          ],
        },
        {
          type: 'paragraph',
          text: 'The rule of thumb: if the work is <strong>one problem</strong> that decomposes, use subagents and let Claude coordinate. If the work is <strong>several unrelated problems</strong>, run a swarm so each one gets a clean context window and cannot pollute the others.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'These stack rather than compete. A single terminal in your swarm can be running a Claude session that spins up its own subagents. The <a href="/en/guides/claude-code-agent-teams-vs-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">agent teams comparison</a> goes deeper on using both together.',
        },
        {
          type: 'paragraph',
          text: 'The rest of this guide is about the swarm: several independent Claude Code sessions, and how to run them without losing track.',
        },
      ],
    },
    {
      id: 'short-answer',
      title: 'The short answer: yes, and there is no special mode',
      content: [
        {
          type: 'image',
          alt: 'Several independent Claude Code sessions running in parallel terminals inside one CodeAgentSwarm workspace',
          src: '/images/guides/multi-terminal.png',
          caption: 'A Claude agent swarm: several independent Claude Code sessions side by side in one window.',
        },
        {
          type: 'paragraph',
          text: 'A <a href="https://docs.claude.com/en/docs/claude-code/overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> session is just a process. You start it with <code>claude</code>, sign in once, and from then on that session has its own conversation, its own context window, and its own working directory. Two sessions know nothing about each other.',
        },
        {
          type: 'paragraph',
          text: 'So there is nothing to unlock. Open a second terminal, run <code>claude</code> again, and you have two independent agents. One can be migrating a schema while the other writes tests. Add a third and a fourth and you have a swarm.',
        },
        {
          type: 'paragraph',
          text: 'You are not limited to Claude either. Because each agent is its own process, you can put Claude Code in some terminals and Codex CLI or opencode in others, all on the same repository, and pick whichever agent suits each task.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Each agent uses your existing Anthropic subscription independently. There is no separate swarm plan and no premium for parallelism. Running four agents for one hour costs roughly what running one agent for four hours costs, it just finishes sooner. What it does consume faster is your rate limit, which is the real ceiling on how wide a swarm you can run.',
        },
      ],
    },
    {
      id: 'method-terminal-tabs',
      title: 'Method 1: Multiple terminal tabs (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The obvious approach. Open several terminal tabs, move into your project in each, and start Claude Code. Nothing to install.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nclaude\n\n# Terminal tab 2\ncd ~/my-project\nclaude\n\n# Terminal tab 3\ncd ~/my-project\nclaude',
        },
        {
          type: 'paragraph',
          text: 'Each tab is an independent Claude agent. Hand each one a different task and switch between them as they work.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pros',
          id: 'tabs-pros',
        },
        {
          type: 'list',
          items: [
            'Free, nothing to set up beyond Claude Code itself',
            'Works instantly with the terminal you already have',
            'Easy to reason about, one tab is one agent',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cons',
          id: 'tabs-cons',
        },
        {
          type: 'list',
          items: [
            'Every tab is labelled the same, so you lose track of which is which almost immediately',
            'No notification when an agent finishes or stops for a permission prompt',
            'Agents sit idle waiting for a yes you never saw',
            'No shared view, you click into each tab to check progress',
            'No way to search across the history of different agents',
            'If two agents edit the same file, untangling it is on you',
          ],
        },
        {
          type: 'paragraph',
          text: 'For two agents this is fine. Past that, the time spent hunting for the tab that is blocked cancels out the speed you gained by going parallel. The <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple sessions guide</a> covers the mechanics in more detail.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> splits one window into panes and keeps sessions alive in the background, so you can watch several Claude agents at once without flipping tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s claude-swarm\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run claude in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux also lets you detach and reattach, so agents keep running after you close the window. Genuinely useful for long refactors.',
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
            'Free and available on almost any Unix machine',
            'Several panes visible at once, no tab switching',
            'Sessions survive disconnects, good for long runs',
            'Scriptable, you can define a reusable swarm layout',
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
            'Real learning curve if you have never used tmux',
            'Still no desktop notification when an agent finishes or asks permission',
            'No searchable history across agents',
            'Text panes get cramped past three or four agents',
            'No task board or organization layer',
            'File conflicts between agents are still your problem',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is an excellent multiplexer that was never built for supervising AI agents. The moment an agent in pane 3 quietly stops for a permission prompt while you are reading pane 1, you feel the gap.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running and supervising a swarm of AI CLI agents in one place. It runs on macOS and Windows, gives you multiple terminals in one workspace, and lets you pick the agent per terminal. For a Claude swarm you select "claude code" in the SELECT AI AGENT picker in each terminal.',
        },
        {
          type: 'image',
          alt: 'The CodeAgentSwarm SELECT AI AGENT picker showing claude code, codex cli and opencode options with a Turbo Mode toggle',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Choose the agent per terminal. Set every one to claude code for a pure Claude swarm, or mix agents where they fit better.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications when an agent needs you',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'This is the single biggest fix for a swarm. When a Claude agent finishes or stops to ask permission, you get a native desktop notification. You stop babysitting panes and let the agents call you, which is the entire point of running them in parallel.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Dynamic titles instead of six identical tabs',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Every terminal updates its own title to reflect what its agent is doing right now. Instead of tabs all labelled "claude", you read "Migrating User Schema", "Writing API Tests", "Refactoring Auth", and you know the state of the swarm at a glance.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Live file diffs per terminal',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'You watch the changes each agent makes in real time, per terminal and across the project. When two agents touch the same file you see it as it happens rather than discovering it in a painful diff later. This is the feature that matters most as the swarm grows.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Searchable history across every agent',
          id: 'history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation in every terminal is saved and searchable, including across agents from different vendors. You can find what an agent decided yesterday, resume it, or trace which agent made a given change. See the <a href="/en/guides/claude-code-history-complete-guide" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code history guide</a> for how the underlying sessions are stored.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode with per-terminal permissions',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Claude Code can skip permission prompts with <code>--dangerously-skip-permissions</code>, which is what makes a swarm flow without constant interruptions and also what makes it risky. CodeAgentSwarm wraps that in Turbo Mode with per-terminal permissions, so you can let the safe agents run unattended while still gating the ones touching production code. The <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> covers the tradeoffs honestly.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A task board the agents update themselves',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban board sits next to the terminals and the agents move their own cards over MCP. You create tasks, hand them to terminals, and watch the board instead of holding the plan in your head.',
        },
      ],
    },
    {
      id: 'avoiding-conflicts',
      title: 'Keeping a swarm from turning into merge chaos',
      content: [
        {
          type: 'paragraph',
          text: 'The failure mode nobody warns you about is not a crashed agent. It is three agents editing the same file and each overwriting the others, so you only notice when the tests break. Two practical defences:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Give each agent its own git worktree',
          id: 'worktrees',
        },
        {
          type: 'paragraph',
          text: 'A git worktree is a second checkout of the same repository on its own branch, in its own directory. Give each agent one and they physically cannot touch each other\'s files. You merge at the end like any normal branch.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# One worktree per agent, each on its own branch\ngit worktree add ../proj-auth   -b feature/auth\ngit worktree add ../proj-tests  -b feature/tests\n\n# Then start an agent in each directory\ncd ../proj-auth && claude',
        },
        {
          type: 'paragraph',
          text: 'This is the single most effective thing you can do for a swarm past two agents. The <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">worktrees guide</a> covers the workflow, and <a href="/en/guides/git-worktree-vs-branch-parallel-ai-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">worktree vs branch</a> explains when a plain branch is enough.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Split by module, not by layer',
          id: 'split-by-module',
        },
        {
          type: 'paragraph',
          text: 'If you must share one checkout, assign each agent a directory rather than a role. "Agent 1 owns /auth, agent 2 owns /billing" produces almost no collisions. "Agent 1 writes the code, agent 2 writes the tests" produces constant ones, because both need the same files.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Do not run several agents in full-auto on one shared checkout without worktrees. It works right up until two of them refactor the same module, and then you spend longer reconciling the mess than you saved by going parallel.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'table',
          headers: ['', 'Terminal tabs', 'tmux', 'CodeAgentSwarm'],
          rows: [
            ['Cost', 'Free', 'Free', 'Free tier, Pro for advanced'],
            ['Setup', 'None', '10-30 min to learn', 'A couple of minutes'],
            ['Notifications', 'None', 'None', 'Native desktop'],
            ['History', 'Gone with the tab', 'No search', 'Saved and searchable'],
            ['Live diffs', 'No', 'No', 'Per terminal, real time'],
            ['Permission control', 'All or nothing', 'All or nothing', 'Per terminal'],
            ['Learning curve', 'None', 'Moderate to steep', 'Low'],
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'If you only ever need two Claude agents, terminal tabs are perfectly fine and you should not install anything. If you already run your day in tmux, dropping Claude sessions into your existing panes is the natural move. Once you regularly run three or more agents and want to see what each is doing without clicking around, CodeAgentSwarm removes the coordination overhead the other two leave with you.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a Claude code swarm?',
      answer: 'A Claude code swarm is several independent Claude Code sessions running in parallel instead of one at a time. Each session is its own process with its own conversation and context window, so they can work different tasks in the same repository simultaneously. It is not a Claude feature you enable, just a way of working you can set up with terminal tabs, tmux, or a tool like CodeAgentSwarm.',
    },
    {
      question: 'Is a Claude agent swarm the same as subagents or agent teams?',
      answer: 'No. Subagents and agent teams are helpers spawned inside a single Claude Code session, sharing that session\'s context and usage, orchestrated by Claude to split one task. A swarm is several fully separate sessions with isolated context that you assign work to yourself. Use subagents for one problem that decomposes, a swarm for several unrelated problems. They combine fine: any terminal in your swarm can run a session that uses subagents.',
    },
    {
      question: 'How many Claude Code agents can I run at once?',
      answer: 'There is no hard limit in Claude Code itself, so the technical ceilings are your machine\'s memory and your Anthropic rate limit, which several parallel agents consume noticeably faster than one. In practice you hit a different ceiling first: past three or four agents the bottleneck tends to be your own attention, because every agent that stops for a permission prompt is waiting on you. That is exactly the limit that notifications and per-terminal permissions push back.',
    },
    {
      question: 'Does running a Claude swarm cost more?',
      answer: 'There is no surcharge for parallelism. Each agent uses your existing Anthropic subscription and you pay for the work each one actually does, the same as running them sequentially. Running them at once finishes sooner, it does not change the per-agent cost. It does burn through rate limits faster, which is the real constraint.',
    },
    {
      question: 'How do I stop parallel Claude agents from overwriting each other?',
      answer: 'Give each agent its own git worktree, which is a separate checkout on its own branch, so they physically cannot touch the same files and you merge at the end like normal branches. If you share one checkout, assign each agent a directory rather than a role, since splitting by module produces far fewer collisions than splitting code from tests. Live per-terminal diffs also let you catch an overlap while it is happening instead of after.',
    },
    {
      question: 'Can I mix Claude Code with Codex or opencode in one swarm?',
      answer: 'Yes. Every agent is a separate process, so you can run Claude Code in some terminals and Codex CLI, opencode or Kimi Code in others, all on the same project. In CodeAgentSwarm you pick the agent per terminal, so a mixed swarm is the default rather than a workaround.',
    },
  ],
}

export default guide
