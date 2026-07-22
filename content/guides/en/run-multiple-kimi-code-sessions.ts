import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'run-multiple-kimi-code-sessions',
    locale: 'en',
    title: 'How to Run Multiple Kimi Code Sessions at Once',
    metaTitle: 'How to Run Multiple Kimi Code Sessions at Once (3 Methods, 2026)',
    metaDescription: 'Run multiple Kimi Code sessions at once. How kimi sessions, --continue and /title work, 3 practical methods, and what parallel agents do to your K3 quota.',
    intro: `Yes, you can run multiple Kimi Code sessions at once. Each time you run the <code>kimi</code> command you start an independent session with its own conversation and context, so two or more of them can work on different tasks in the same repository at the same time without sharing anything.

The part that takes a bit of thought is not starting the processes. It is keeping the sessions legible: which terminal is on which task, which one is waiting for a permission, and how fast they are draining the one quota they all share. Kimi Code gives you decent primitives for this (sessions are stored on disk per project, you can name them with <code>/title</code> and resume them with <code>--continue</code>), but nothing ties them together out of the box.

This guide covers how Kimi Code sessions actually work, the three practical ways to run several side by side, and what going parallel does to your quota. For the bigger picture of a full swarm, see the <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code agent swarm</a> guide.`,
    ctaText: 'Run several Kimi Code sessions at once in CodeAgentSwarm. Multiple terminals in one window, desktop notifications when a session finishes, searchable history and a live view of your shared Kimi quota.',
    highlightedWords: ['multiple Kimi Code sessions', 'at once'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'ejecutar-multiples-sesiones-kimi-code',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Short answer: yes, each kimi process is its own session',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://github.com/MoonshotAI/kimi-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a> is Moonshot AI\'s terminal coding agent, powered by Kimi K3. You install it once (<code>curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash</code>, or <code>npm install -g @moonshot-ai/kimi-code</code> with Node 22.19+), log in once with <code>/login</code>, and start it with the <code>kimi</code> command. Every invocation is a separate process with its own conversation, its own context, and its own working directory.',
        },
        {
          type: 'paragraph',
          text: 'So running multiple Kimi Code sessions at once is not a special mode. Open a second terminal, run <code>kimi</code> again, and you already have two independent sessions. One can be migrating a database layer while the other writes integration tests. If you are new to Kimi Code itself, start with <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use Kimi Code</a> and come back.',
        },
        {
          type: 'paragraph',
          text: 'You are not limited to Kimi either. Because each agent is its own process, you can run Kimi Code in some terminals and Claude Code or Codex CLI in others, all on the same repository. The <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview shows how the different tools fit side by side.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'All your Kimi Code sessions sign in with the same account and share one subscription quota, with a weekly refresh and a rolling 5 hour window. Parallel sessions do not cost extra, they just spend the same pool faster. More on that below.',
        },
      ],
    },
    {
      id: 'how-sessions-work',
      title: 'How Kimi Code sessions work: disk, --continue and /title',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code stores every session on disk as plain files, organized per project directory under <code>~/.kimi-code/sessions/</code>. Each session keeps its metadata (title, timestamps) and the full transcript. This is what makes parallel sessions manageable: they are real, named, resumable things, not just scrollback.',
        },
        {
          type: 'list',
          items: [
            '<code>kimi</code> starts a fresh session in the current directory',
            '<code>kimi --continue</code> (or <code>-c</code>) resumes the most recent session for that directory',
            '<code>kimi --session &lt;id&gt;</code> resumes one specific session by id',
            '<code>/title My migration</code> inside a session names it, so you can tell your terminals apart later',
          ],
        },
        {
          type: 'paragraph',
          text: 'Two habits pay off as soon as you run more than one session. First, give each session a title the moment you start it: three unnamed sessions in one repo become indistinguishable within the hour. Second, note that <code>--continue</code> is per directory, so if you run several sessions in the same folder it resumes the latest one, not necessarily the one you meant. When that ambiguity bites, resume by id instead. The <a href="/en/guides/kimi-code-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code conversation history guide</a> goes deeper on where sessions live and how to find old ones.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal tabs (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The most direct way to run two Kimi Code sessions at once is to open several terminal tabs, move into your project in each one, and start kimi.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nkimi\n# then inside: /title API tests\n\n# Terminal tab 2\ncd ~/my-project\nkimi\n# then inside: /title Schema migration',
        },
        {
          type: 'paragraph',
          text: 'Each tab is now an independent Kimi Code session. Hand each one a different task and switch between them as they work. When a session stops to ask for approval before a command or a file write, that tab waits silently for you, so you end up bouncing between tabs to keep things moving.',
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
            'Free, nothing to set up beyond Kimi Code',
            'Works instantly with tools you already have',
            'Easy to reason about, one tab is one session',
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
            'You lose track of which tab is running which task almost immediately',
            'No notification when a session finishes or stops for a permission prompt',
            'No shared view, you have to click into each tab to check progress',
            'No way to search across the history of different sessions',
            'If two sessions edit the same file, untangling it is on you',
          ],
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> lets you split one window into panes and keep sessions alive in the background, so you can watch several Kimi Code sessions at once without flipping between tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s kimi\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run kimi in each one',
        },
        {
          type: 'paragraph',
          text: 'Detach and reattach works as usual, so sessions survive closing the window. The caveats are the usual tmux ones: no desktop notifications, no cross-session search, and panes get cramped past three or four sessions. One extra Kimi-specific caution: there are open upstream reports of sessions stalling silently when a request hangs, and in a detached tmux pane a stalled session looks exactly like a busy one.',
        },
      ],
    },
    {
      id: 'git-worktrees',
      title: 'Same repo or separate worktrees?',
      content: [
        {
          type: 'paragraph',
          text: 'Running several sessions in the same working copy is fine while their tasks touch different areas. The moment two sessions edit the same files, you inherit the merge. If you plan to keep several Kimi Code sessions busy on the same repository for hours, give each one its own git worktree: same repo, separate folders, separate branches, zero stepping on each other.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'git worktree add ../my-project-tests feature/tests\ngit worktree add ../my-project-migration feature/migration\n\n# Session 1\ncd ../my-project-tests && kimi\n\n# Session 2\ncd ../my-project-migration && kimi',
        },
        {
          type: 'paragraph',
          text: 'As a bonus, worktrees make <code>--continue</code> unambiguous, because each session lives in its own directory. The <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI agents guide</a> covers the full setup, and <a href="/en/guides/git-worktree-vs-branch-parallel-ai-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">worktree vs branch</a> explains when each is worth it.',
        },
      ],
    },
    {
      id: 'quota',
      title: 'What parallel sessions do to your quota',
      content: [
        {
          type: 'paragraph',
          text: 'Every Kimi Code session draws from the same subscription pool: a quota that refreshes on a weekly cycle plus a rolling 5 hour window on top. Three sessions working flat out consume roughly three times faster than one, so heavy parallel bursts tend to hit the 5 hour window first, even with weekly quota to spare. Nothing breaks when you hit it, you just wait for the window to roll.',
        },
        {
          type: 'paragraph',
          text: 'You can check consumption with <code>/usage</code> inside any session. The practical advice: run parallel sessions for genuinely independent tasks, and keep it to the two or three that you can actually supervise. The <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">plans and pricing guide</a> has the detail on tiers and multipliers.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for macOS and Windows built for running and supervising several AI CLI sessions in one place. Kimi Code is a first-class agent alongside Claude Code, Codex CLI, Antigravity CLI and opencode: you choose the agent per terminal, so running three Kimi Code sessions means opening three terminals and picking Kimi Code in each.',
        },
        {
          type: 'paragraph',
          text: 'What that adds on top of raw terminals:',
        },
        {
          type: 'list',
          items: [
            '<strong>Dynamic titles:</strong> each terminal shows what its session is working on right now, instead of three tabs all labelled "kimi"',
            '<strong>Desktop notifications:</strong> a native notification when a session finishes or stops to ask for a permission, so no more babysitting tabs',
            '<strong>Searchable history:</strong> CodeAgentSwarm reads Kimi Code\'s locally stored sessions, so you can search and resume conversations across every terminal and every agent',
            '<strong>Quota indicator:</strong> a live view of your shared Kimi quota, both the weekly cycle and the 5 hour window, for all sessions combined',
            '<strong>Live file diffs:</strong> watch what each session changes in real time, per terminal and per project',
            '<strong>Task board:</strong> a kanban next to your terminals that the agents themselves update over MCP',
          ],
        },
        {
          type: 'paragraph',
          text: 'If Claude Code is your main agent, the same setup is covered in <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>, and mixed setups work the same way: pick a different agent per terminal and supervise everything in one window.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'New to running several terminals at once? The <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">multi-terminal guide</a> walks through the layout and workflow, and it applies the same whether the agent is Kimi Code or Claude Code.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can you run multiple Kimi Code sessions at once?',
      answer: 'Yes. Each time you run the kimi command you get an independent session with its own conversation and context, so you can open several terminals and run kimi in each one. They do not share state or step on each other unless they edit the same files. CodeAgentSwarm supports multiple terminals so you can supervise several Kimi Code sessions in one window.',
    },
    {
      question: 'How do I resume a specific Kimi Code session?',
      answer: 'Use kimi --continue (or -c) to resume the most recent session for the current directory, or kimi --session with the session id to resume one specific session. Sessions are stored per project under ~/.kimi-code/sessions/, and naming them with /title as you go makes finding the right one much easier.',
    },
    {
      question: 'Do multiple Kimi Code sessions cost more?',
      answer: 'There is no surcharge for running sessions in parallel, but they all draw from the same subscription quota, which refreshes weekly and has a rolling 5 hour window on top. Parallel sessions finish the work sooner while spending the shared pool faster, so heavy bursts tend to feel the 5 hour window first. The total work your plan buys does not change.',
    },
    {
      question: 'Can I run Kimi Code and Claude Code together?',
      answer: 'Yes. Each agent is a separate process, so you can run Kimi Code in some terminals and Claude Code or Codex CLI in others, on the same project. In CodeAgentSwarm you pick the agent per terminal, so a mixed setup is the default. There is also a different option if you want one harness: running the K3 model inside Claude Code, covered in the Kimi K3 with Claude Code guide.',
    },
    {
      question: 'Should parallel Kimi Code sessions share one repo or use worktrees?',
      answer: 'Same repo is fine while tasks touch different areas. For longer parallel work, git worktrees are better: each session gets its own folder and branch, so sessions never edit the same working copy, and --continue becomes unambiguous because each directory has its own session history.',
    },
    {
      question: 'How many Kimi Code sessions can I run at once?',
      answer: 'Kimi Code itself does not impose a hard limit, since each session is just a process. In practice your shared quota and your attention are the constraints: the rolling 5 hour window throttles heavy bursts, and unsupervised sessions pile up permission prompts. Two to four supervised sessions is the practical sweet spot for most work.',
    },
  ],
}

export default guide
