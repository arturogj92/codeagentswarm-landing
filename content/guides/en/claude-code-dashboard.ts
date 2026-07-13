import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-dashboard',
    locale: 'en',
    title: 'Claude Code Dashboard: Manage Every Session From One Window',
    metaTitle: 'Claude Code Dashboard: Manage Every Session in One Place (2026)',
    metaDescription: 'A Claude Code dashboard lets you monitor and manage every session from one window: per-terminal status, a kanban task board, notifications and history.',
    intro: `A Claude Code dashboard is a single window where you monitor and manage every running Claude Code session: which terminal is working, which one finished, which one is stuck waiting for your answer, and what task each of them is on. Instead of clicking through a stack of terminal tabs to check on each agent, you glance at one screen and know where everything stands.

That matters because Claude Code itself gives you none of this. Anthropic ships it as a CLI, so each session is a wall of text in its own window, and once you run three or four of them the real work becomes remembering who is doing what.

CodeAgentSwarm is that dashboard. It is a free desktop app for macOS and Windows that runs your sessions in one workspace and adds the oversight layer on top: per-terminal status, a kanban task board the agents update themselves, desktop notifications, searchable history, live file changes and one-click project switching. This guide is about using it as a Claude Code manager: seeing everything, catching the terminal that needs you, and keeping a swarm of agents under control.`,
    ctaText: 'Put every Claude Code session on one dashboard: see each terminal\'s status, its tasks and its changes at a glance, and let the sessions tell you when they need you.',
    highlightedWords: ['Claude Code Dashboard', 'Every Session'],
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    alternateSlug: 'panel-de-control-claude-code',
  },
  sections: [
    {
      id: 'the-status-problem',
      title: 'The status problem: many sessions, zero visibility',
      content: [
        {
          type: 'paragraph',
          text: 'Picture a normal parallel afternoon. One Claude Code session is refactoring the auth module, another is writing tests, a third is migrating a database schema. In a plain terminal, all three look identical: a tab named "claude" with text scrolling past. To know the state of any of them, you have to click into it, read the last screen of output, and reconstruct what happened.',
        },
        {
          type: 'paragraph',
          text: 'Meanwhile the failure modes pile up quietly. The test session finished eight minutes ago and has been idle since. The migration session hit a permission prompt right after you switched away, so it has been waiting for a yes from you the whole time. You do not find out about either until you happen to click the right tab. Running agents in parallel was supposed to save time, and instead you spend it polling tabs.',
        },
        {
          type: 'paragraph',
          text: 'This is a management problem, not a coding problem. The agents are fine, you just cannot see them. A Claude Code session manager exists to answer three questions continuously and without being asked: what is each session doing, which ones are done, and which one is blocked on me.',
        },
        {
          type: 'paragraph',
          text: 'If what you are actually looking for is an explanation of graphical interfaces for the CLI in general, that is a different question, and it has its own page: <a href="/en/guides/claude-code-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">the Claude Code GUI guide</a>. This one assumes you already run sessions and focuses on overseeing them at scale.',
        },
      ],
    },
    {
      id: 'what-the-dashboard-shows',
      title: 'What the dashboard shows you',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm puts the whole answer on one screen. Here is what the dashboard surfaces, capability by capability.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Every terminal in one window, each with its own status',
          id: 'terminals-with-status',
        },
        {
          type: 'paragraph',
          text: 'All your sessions run as terminals inside a single workspace, so there is no tab hunting. Each terminal carries a dynamic title that reflects what the agent is doing ("Refactoring Auth", "Writing API Tests") plus a visual status: still working, finished, or waiting for your input. One second of looking at the grid tells you which terminals need attention. The setup itself is covered in <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm dashboard showing several terminals with different colours and statuses, some running, some finished, some waiting for input',
          src: '/images/guides/terminal-status-indicators.png',
          caption: 'The core of the dashboard: every session with its status visible, so the blocked one cannot hide.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A task board wired to your terminals',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'The Agent Task Board is a kanban board with four columns: Pending, In Progress, In Testing, and Completed. You create tasks and assign them to terminals, and the agents themselves move the cards over MCP as they work: they write a plan when they start, drop an implementation summary when they finish, and park the card in In Testing for your review. The board is your project-level view of the swarm, and the <a href="/en/guides/claude-code-task-management" class="text-neon-cyan hover:text-neon-purple transition-colors">task management guide</a> covers it in depth.',
        },
        {
          type: 'image',
          alt: 'The Agent Task Board in CodeAgentSwarm with kanban columns for Pending, In Progress, In Testing and Completed, each card linked to a terminal',
          src: '/images/guides/task-board-kanban.png',
          caption: 'Tasks linked to terminals: the board shows what each session is supposed to be doing, and the agents keep it current.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notifications when an agent finishes or gets stuck',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'When a session completes its task or stops to ask you something, you get a native desktop notification. This flips the management model: instead of you polling the sessions, the sessions ping you. You can give one terminal your full attention and trust the rest to raise a hand when they are done or blocked.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Searchable history of every conversation',
          id: 'searchable-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation from every terminal is saved and searchable in one place. When you need to know which session touched the payment flow last Tuesday, you search for it, read the conversation, and resume it if you want to continue. A manager is only useful if it also covers what happened yesterday, and the <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history guide</a> shows how far that goes.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'File changes at a glance',
          id: 'file-changes',
        },
        {
          type: 'paragraph',
          text: 'Each terminal exposes the file changes its session is making, in diff format, per terminal and at project level. When two sessions work near each other in the same repo, you can see the overlap forming instead of discovering it at commit time.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'One-click project switching',
          id: 'project-switching',
        },
        {
          type: 'paragraph',
          text: 'Project shortcuts in the navbar open a new terminal already inside a given project, with the agent and launch settings you saved for it. Managing sessions across several repos stops meaning "navigate to the folder and retype the command" and becomes a single click per project.',
        },
      ],
    },
    {
      id: 'managing-a-real-session',
      title: 'Managing a real working session from the dashboard',
      content: [
        {
          type: 'paragraph',
          text: 'Here is what a concrete stretch of work looks like with the dashboard in front of you, rather than a feature list.',
        },
        {
          type: 'list',
          items: [
            'You open CodeAgentSwarm and click two project shortcuts: one terminal opens in your API repo, another in the web app. You add a third terminal in the API repo for tests.',
            'You create three tasks on the Agent Task Board and assign one to each terminal. All three start in Pending.',
            'The agents pick up their tasks, move the cards to In Progress, and each writes its plan. The terminal titles update to reflect the work.',
            'You focus on the web app terminal. Twenty minutes later a notification tells you the tests terminal finished: its card sits in In Testing with an implementation summary of what it changed.',
            'Another notification: the API terminal is waiting for a confirmation. Its status shows blocked, so you jump in, answer, and it continues. No time lost idling.',
            'Before reviewing the test work, you check the file changes for that terminal to see exactly which files it touched.',
            'The result looks good, so you move the card to Completed. The board now reads: one Completed, two In Progress, and you know exactly where both of those stand.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Nothing in that flow required reading terminal scrollback to figure out state. The status came to you: from the terminal indicators, from the board, from the notifications. That is the difference between running sessions and managing them.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The dashboard is not Claude-only. Each terminal has an agent picker, so the same board and the same statuses work when some of your sessions run Codex, Gemini CLI or opencode alongside Claude Code.',
        },
      ],
    },
    {
      id: 'dashboard-vs-plain-terminals',
      title: 'Dashboard vs juggling plain terminals',
      content: [
        {
          type: 'paragraph',
          text: 'Terminal tabs and tmux panes can hold multiple sessions. What they cannot do is manage them, because they were never built to know what an AI agent is doing. The honest comparison is about oversight, not about running.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'What tabs and tmux leave on you',
          id: 'tabs-tmux-gaps',
        },
        {
          type: 'list',
          items: [
            'Status: you are the status system. Knowing if a session is done means clicking in and reading output.',
            'Blocked sessions: a permission prompt in a background tab waits silently until you find it.',
            'Task tracking: which session owns which piece of work lives in your head or a separate tool.',
            'History: scrollback dies with the tab, and you cannot search across sessions or days.',
            'Changes: figuring out what an agent modified means reading its output or running git yourself.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'What the dashboard takes over',
          id: 'dashboard-takes-over',
        },
        {
          type: 'list',
          items: [
            'Per-terminal status and dynamic titles answer "what is each one doing" at a glance.',
            'Notifications surface finished and blocked sessions the moment it happens.',
            'The task board ties every session to a card, with a plan and a summary written by the agent.',
            'History is saved and searchable across every terminal, and conversations can be resumed.',
            'File changes are visible per terminal and per project, as diffs.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For one occasional session, tabs are fine and you do not need any of this. The dashboard earns its place at the point where checking on your sessions starts costing more than the sessions save you, which in practice is around the third parallel agent.',
        },
      ],
    },
    {
      id: 'getting-started',
      title: 'Getting started with the dashboard',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a free download for macOS and Windows, available from the home page. It installs locally, runs the real Claude Code CLI in real terminals, and uses your existing Claude subscription. There is no separate plan and no different model: the dashboard is a layer over the tool you already use, not a replacement for it.',
        },
        {
          type: 'paragraph',
          text: 'Getting to a managed setup takes a few minutes: open the app, point a terminal at your project, and start Claude Code in it. Add more terminals as you need them, create tasks on the board, and turn on notifications. From there, the oversight is ambient: statuses, cards and pings instead of tab checking.',
        },
        {
          type: 'paragraph',
          text: 'And because every terminal has an agent picker, the same dashboard manages Codex, Gemini CLI and opencode sessions too. One window, every agent, every status.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is there an official Anthropic Claude Code dashboard?',
      answer: 'No. Anthropic ships Claude Code as a command-line tool, and it does not include a graphical dashboard for monitoring sessions. Dashboards come from desktop apps built around the CLI. CodeAgentSwarm is one of those: it runs the real Claude Code in real terminals and adds the management layer on top, with per-terminal status, a task board, notifications and searchable history.',
    },
    {
      question: 'Can I manage multiple Claude Code sessions from one dashboard?',
      answer: 'Yes, that is exactly what CodeAgentSwarm is for. All your sessions run as terminals in a single workspace, each with a dynamic title and a visible status. You assign tasks to terminals on the kanban board, get notified when a session finishes or needs input, and search the history of every conversation from one place.',
    },
    {
      question: 'Does the dashboard show Claude Code usage or token costs?',
      answer: 'No. CodeAgentSwarm is a session and task dashboard, not a cost analytics tool. It shows you what each session is doing, its status, its tasks, its conversation history and its file changes. It does not track token consumption or spending. If you are searching for usage dashboards in that billing sense, that is a different category of tool.',
    },
    {
      question: 'Does the dashboard change how Claude Code works?',
      answer: 'No. Underneath, it is the same Claude Code CLI running in a real terminal, with the same model and your own Claude subscription. The dashboard adds visibility and control around it: statuses, tasks, notifications, history and diffs. You can go back to a bare terminal at any time, nothing gets locked in.',
    },
    {
      question: 'Can the same dashboard manage agents other than Claude Code?',
      answer: 'Yes. Each terminal in CodeAgentSwarm has an agent picker, so the same workspace can run Claude Code, Codex, Gemini CLI and opencode side by side. The task board, statuses, notifications and history work the same regardless of which agent a terminal runs.',
    },
    {
      question: 'How does the dashboard tell me a session needs my input?',
      answer: 'Two ways. The terminal itself shows a waiting status, so a glance at the workspace reveals which session is blocked. And a native desktop notification fires when a session stops to ask you something or finishes its task, so you find out even when you are focused on another terminal or another app.',
    },
  ],
}

export default guide
