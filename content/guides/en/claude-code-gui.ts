import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-gui',
    locale: 'en',
    title: 'Claude Code GUI: A Visual Desktop App for Your AI Coding CLIs',
    metaTitle: 'Claude Code GUI: A Desktop App for Claude Code, Codex and Gemini CLI (2026)',
    metaDescription: 'A Claude Code GUI is a graphical desktop app on top of the CLI. CodeAgentSwarm gives Claude Code a visual workspace, task board, diffs and notifications.',
    intro: `Claude Code is a terminal tool. You type into a prompt, it reads and edits files, and everything you see is text scrolling past in a single window. That is great for power, and not so great when you are running several sessions, trying to remember what each one is doing, and scrolling back to find what changed.

A Claude Code GUI is a graphical desktop app that sits on top of that CLI. You still get the full command-line agent underneath, you just get a visual layer around it: a workspace with several terminals at once, a task board, searchable history, live diffs, desktop notifications, and permission controls you can click instead of memorize.

CodeAgentSwarm is exactly that kind of GUI. It runs on macOS and Windows, it does not replace Claude Code, and it does not change how the agent works. It gives the same CLI a dashboard so you can see and steer it without living inside a wall of terminal text.`,
    ctaText: 'Give Claude Code a real desktop app: a visual workspace with multiple terminals, a task board, live diffs and notifications, all on top of the CLI you already use.',
    highlightedWords: ['Claude Code GUI', 'desktop app'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'interfaz-grafica-claude-code',
  },
  sections: [
    {
      id: 'what-is-a-claude-code-gui',
      title: 'What is a Claude Code GUI?',
      content: [
        {
          type: 'image',
          alt: 'Three AI coding CLI agents running side by side as separate terminals in one CodeAgentSwarm window, the visual workspace at the core of a Claude Code GUI',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'A Claude Code GUI: several agents in their own terminals in one visual window, the part a plain terminal cannot give you.',
        },
        {
          type: 'paragraph',
          text: 'A Claude Code GUI is a graphical interface that wraps the <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> command-line agent in a desktop app. The agent itself stays the same: it still runs in a real terminal, still reads and writes files, still uses your own Claude subscription. The GUI adds a visual layer on top so you can see what the agent is doing and control it with clicks instead of remembering commands and scrollback.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a Claude Code GUI in this sense. It is a desktop app for macOS and Windows that gives the CLI a real workspace: multiple terminals side by side, a task board, searchable history, live file diffs, native notifications, permission controls, project shortcuts, and a skills and MCP marketplace. None of that replaces the agent. It is a Claude Code dashboard and manager built around the tool you already use.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'A GUI is not a different model or a different plan. CodeAgentSwarm runs on top of your existing Claude subscription, and it can drive Codex CLI and Gemini CLI in the same workspace too. You keep the full CLI power, you just get a visual layer around it.',
        },
        {
          type: 'paragraph',
          text: 'If you mostly want to run more than one agent at once, the deeper guide is <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>, and the cross-vendor view is the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> guide. This page is about the graphical layer itself: what a Claude Code UI gives you that a bare terminal does not.',
        },
      ],
    },
    {
      id: 'what-you-get-in-the-gui',
      title: 'What you get in the GUI',
      content: [
        {
          type: 'paragraph',
          text: 'The point of a Claude Code interface is to surface the things the terminal hides. Here is what the visual layer actually gives you, capability by capability.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A visual workspace with multiple terminals',
          id: 'visual-workspace',
        },
        {
          type: 'paragraph',
          text: 'Instead of one terminal in one window, you get a grid of multiple terminals in a single app. Each one runs its own Claude Code session, on the same project or different projects. You can lay them out, focus one, and glance at the rest, which is the core of any usable Claude Code dashboard. To set this up step by step, see <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A task board the agent updates itself',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits over the workspace, and Claude Code updates it over MCP as it works. You create tasks, the agent moves them through in progress and done, and you have a visual record of what got built without reading logs. The <a href="/en/guides/claude-code-task-management" class="text-neon-cyan hover:text-neon-purple transition-colors">task management guide</a> covers how the board and the agent stay in sync.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Searchable history across every session',
          id: 'searchable-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation is saved and searchable in one place, instead of vanishing when you close a terminal tab. You can find what a session did last week, resume it, and trace which terminal made a particular change. This is one of the biggest gaps a Claude Code manager fills, because raw terminal scrollback is not something you can search across days.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Live diffs of what the agent changed',
          id: 'live-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each session is making, per terminal and at project level, in real time. No more guessing what the agent touched: you see the diff as it happens, and you can review it before committing. The <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">real-time changes guide</a> goes into the live diff and Git diff views in detail.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'When a session finishes its task or stops to ask you something, you get a native desktop notification. You can work on one terminal and let the rest tell you when they need you, instead of babysitting a prompt that may take minutes to respond.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Permission controls you can click',
          id: 'permission-controls',
        },
        {
          type: 'paragraph',
          text: 'Granular permission controls let you decide what the agent can do unattended and what stays gated behind your approval. You configure it in the interface rather than juggling command-line flags, which matters more once several sessions are acting at once.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Project shortcuts and a skills + MCP marketplace',
          id: 'shortcuts-marketplace',
        },
        {
          type: 'paragraph',
          text: 'Project shortcuts let you jump straight into the repos you work on without retyping paths. A built-in skills marketplace and MCP marketplace let you add capabilities and connect external tools from the GUI, so the workspace grows with you instead of staying a plain terminal.',
        },
      ],
    },
    {
      id: 'how-it-compares-to-the-raw-terminal',
      title: 'How it compares to the raw terminal',
      content: [
        {
          type: 'paragraph',
          text: 'A GUI is not better than the CLI in some abstract sense. It is the same CLI with a visual layer on top, and that layer is worth more the more sessions you run. Here is the honest comparison.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'What the raw terminal already does well',
          id: 'terminal-strengths',
        },
        {
          type: 'list',
          items: [
            'It is free and already installed once you have Claude Code',
            'For a single session, focused on one task, it is all you need',
            'Full agent power, nothing is hidden or removed by a wrapper',
            'It scripts and pipes like any other command-line tool',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where the terminal gets painful',
          id: 'terminal-pain',
        },
        {
          type: 'list',
          items: [
            'Several sessions at once turn into a stack of identical-looking tabs',
            'No notification when the agent finishes or stops to ask you something',
            'History is scrollback, which you cannot search across sessions or days',
            'You read text to figure out what changed, instead of seeing a diff',
            'Permissions and context live in flags and memory, not in a visible UI',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'What the GUI adds on top',
          id: 'gui-adds',
        },
        {
          type: 'paragraph',
          text: 'The GUI does not take anything away. Underneath, it is still running real Claude Code in a real terminal, with the same model and the same subscription. What it adds is everything around the prompt: a workspace you can see, a task board, searchable history, live diffs, notifications, and clickable permissions. If you only ever run one session at a time, the raw terminal is fine and you should not overthink it. Once you run several, or you keep losing track of what each one did, the visual layer is what removes that friction.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm dashboard showing a kanban task board with columns for tasks, on top of Claude Code terminals',
          src: '/images/guides/task-board-kanban.png',
          caption: 'One surface of the GUI: a kanban task board the agent updates as it works while you watch.',
          size: 'medium',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Because the GUI drives the CLI rather than replacing it, you can switch back to a bare terminal any time. Nothing about CodeAgentSwarm locks the agent in: it is a layer, not a fork.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is there a GUI for Claude Code?',
      answer: 'Yes. Claude Code ships as a terminal CLI, but you can run it inside a graphical desktop app. CodeAgentSwarm is a Claude Code GUI for macOS and Windows that gives the CLI a visual workspace with multiple terminals, a task board, searchable history, live diffs, notifications and permission controls. It runs the real agent underneath, so you keep the full CLI power with a visual layer on top.',
    },
    {
      question: 'Does a Claude Code GUI replace the CLI?',
      answer: 'No. A GUI like CodeAgentSwarm runs Claude Code in a real terminal under the hood and adds a visual layer around it. The agent, the model and your subscription stay exactly the same. The GUI is a dashboard and manager on top of the CLI, not a different tool or a replacement for it.',
    },
    {
      question: 'What is the difference between the Claude Code terminal and a Claude Code dashboard?',
      answer: 'The terminal is a single text window where the agent runs. A dashboard is a graphical layer that surfaces what the terminal hides: several sessions at a glance, a task board, searchable history across days, live file diffs, and desktop notifications. The dashboard does not change how the agent works, it just makes its activity visible and clickable.',
    },
    {
      question: 'Does the Claude Code desktop app work on Windows and macOS?',
      answer: 'Yes. CodeAgentSwarm is a desktop app for both macOS and Windows. It installs locally, runs the Claude Code CLI on your machine, and uses your own Claude subscription. There is no separate model or plan involved.',
    },
    {
      question: 'Can the same GUI run Codex and Gemini too?',
      answer: 'Yes. CodeAgentSwarm is not tied to a single vendor. Each terminal has an agent picker, so you can set one to Claude Code, another to Codex CLI and another to Gemini CLI, all in the same visual workspace. The cross-vendor setup is covered in the AI CLI agent swarm guide.',
    },
    {
      question: 'Do I need a Claude Code GUI if I only run one session?',
      answer: 'Not necessarily. For a single session focused on one task, the raw terminal is enough. A GUI earns its place once you run several sessions, want notifications when the agent finishes, need searchable history, or want to see diffs and manage permissions visually instead of in scrollback and flags.',
    },
  ],
}

export default guide
