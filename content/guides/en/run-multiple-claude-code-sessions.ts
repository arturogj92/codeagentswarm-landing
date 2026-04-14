import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'run-multiple-claude-code-sessions',
    locale: 'en',
    title: 'Can You Run Multiple Claude Code Sessions at Once? Yes, Here\'s How',
    metaTitle: 'Can You Run Multiple Claude Code Sessions at Once? 3 Methods Compared (2026)',
    metaDescription: 'Yes, you can run multiple Claude Code chats simultaneously. Learn 3 methods: native terminal tabs, tmux/screen, and CodeAgentSwarm. Pros, cons, and step-by-step for each approach.',
    intro: `If you have ever wondered whether you can run more than one Claude Code session at the same time, the answer is yes. Each session is its own independent process with its own conversation and context.

The real question is not whether you can do it, but how you should do it. There are a few different approaches, and each one has tradeoffs. Some are free and minimal, others give you real visibility and control.

In this guide I will walk you through the three main methods, compare them honestly, and help you pick the right one depending on how you work.`,
    ctaText: 'Try running multiple Claude Code sessions with CodeAgentSwarm. Six terminals, one workspace, zero context switching.',
    highlightedWords: ['multiple sessions', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'ejecutar-multiples-sesiones-claude-code',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'The short answer: yes, you can',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code sessions are independent processes. When you open a terminal and run <code>claude</code>, that session has its own conversation thread, its own context window, and its own working state. Nothing about it is shared with other sessions.',
        },
        {
          type: 'paragraph',
          text: 'That means you can open a second terminal, run <code>claude</code> again, and you now have two completely separate AI coding sessions running side by side. One can be refactoring your auth module while the other writes tests for your API layer. They do not know about each other.',
        },
        {
          type: 'paragraph',
          text: 'This is not limited to Claude Code either. The same principle applies to Codex CLI and Gemini CLI. You can even mix different agents in parallel if your workflow calls for it.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Each terminal session uses your Claude subscription independently. There is no special "multi-session" plan or extra cost for running sessions in parallel.',
        },
        {
          type: 'paragraph',
          text: 'The question is really about how you manage those sessions once you have more than one or two running. That is where the three methods below come in.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal windows (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The simplest approach is one you probably already know. Open multiple terminal tabs or windows, navigate to your project directory in each one, and start a Claude Code session.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nclaude\n\n# Terminal tab 2\ncd ~/my-project\nclaude\n\n# Terminal tab 3\ncd ~/my-project\nclaude',
        },
        {
          type: 'paragraph',
          text: 'That is it. Each tab now has an independent Claude Code session. You can switch between tabs and give each one different instructions.',
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
            'Works immediately, no setup required',
            'Simple to understand',
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
            'You quickly lose track of which tab is doing what',
            'No notifications when a session finishes or needs input',
            'No shared visibility across sessions, you have to click into each tab to check',
            'Cannot search across conversation history from different sessions',
            'If two sessions edit the same file, you have to resolve conflicts manually',
            'Tabs start looking identical, especially with three or more',
          ],
        },
        {
          type: 'paragraph',
          text: 'This method works fine for two sessions. Once you go beyond that, the overhead of switching and tracking starts to eat into the time you saved by going parallel.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you are comfortable in the terminal, tmux gives you split panes and persistent sessions. You can see multiple Claude Code sessions on screen at the same time without switching tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s coding\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run claude in each one',
        },
        {
          type: 'paragraph',
          text: 'With tmux you can also detach from a session and reattach later, which means your Claude Code sessions survive if you close your terminal window.',
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
            'Free and widely available',
            'See multiple panes at once without tab switching',
            'Persistent sessions that survive disconnects',
            'Highly customizable with configuration files',
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
            'Steep learning curve if you have never used tmux before',
            'Still no desktop notifications when a session finishes',
            'No conversation history or search across sessions',
            'Text-only interface, panes get cramped with more than 3-4 sessions',
            'No task management or organization layer',
            'Manual setup every time you start a new coding session',
            'Conflict resolution between sessions is still on you',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a solid tool and many developers already use it daily. But it was built as a general-purpose terminal multiplexer, not specifically for managing parallel AI coding agents. The gaps show up once you are running three or more Claude Code sessions regularly.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm was built specifically for this problem: running multiple AI coding sessions in parallel with real visibility and control. It is a desktop app that gives you up to six terminals in a single workspace, with features designed around how parallel AI agents actually behave.',
        },
        {
          type: 'image',
          alt: 'Six Claude Code terminals running in parallel in CodeAgentSwarm workspace',
          src: '/images/guides/multi-terminal.png',
          caption: 'Six AI terminals running simultaneously, each with its own context, dynamic title, and real-time status.',
        },
        {
          type: 'paragraph',
          text: 'Here is what you get out of the box:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Up to 6 AI terminals in parallel',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Run Claude Code, Codex CLI, or Gemini CLI in any combination. Each terminal is independent, with its own conversation and project context. You can mix and match agents depending on the task.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Each terminal automatically updates its title based on what the agent is currently doing. Instead of six identical "claude" tabs, you see titles like "Refactoring Auth", "Writing API Tests", "Fixing CSS Layout". At a glance, you know exactly what each session is working on.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'When a session finishes its task or needs your input, you get a native desktop notification. No more switching between tabs to check if something is done. You can focus on one terminal and let the others notify you when they need attention. For a deeper look at how this works, check the <a href="/en/guides/codeagentswarm-notifications" class="text-neon-cyan hover:text-neon-purple transition-colors">notification system guide</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full conversation history, searchable',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation across all terminals is saved and searchable. You can go back and find what a session did yesterday, resume a conversation, or review the full history of changes. This is especially useful when you are running many parallel sessions and need to trace what happened where. More details in the <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history guide</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Built-in task board',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'Organize your work with a kanban-style task board that connects directly to your terminals. Create tasks, assign them to terminals, and track progress visually. When two terminals are working on related features, the task board helps you keep the big picture in focus.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Permission controls with Turbo Mode',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Running multiple sessions means more actions happening in parallel, which makes permission management more important. Turbo Mode lets you auto-approve safe operations while keeping dangerous ones gated. You decide what gets approved automatically and what still needs your confirmation. See the <a href="/en/guides/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> for the full setup.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conflict awareness',
          id: 'conflict-awareness',
        },
        {
          type: 'paragraph',
          text: 'When two terminals touch the same file, CodeAgentSwarm helps you see it happening. You can track real-time file changes per terminal and at project level, so overlapping edits do not catch you off guard. Claude handles Git conflicts well on its own, but having visibility into what each session is changing makes the whole workflow smoother. Learn more in the <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">real-time changes guide</a>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'For a detailed walkthrough on setting up and using multiple terminals, see the <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">complete multi-terminal guide</a>.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how the three methods stack up across the things that matter when running multiple AI coding sessions:',
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
            '<strong>CodeAgentSwarm:</strong> Free tier available, Pro for advanced features',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Setup time',
          id: 'compare-setup',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Zero, just open tabs',
            '<strong>tmux/screen:</strong> 10-30 minutes to learn basics, longer to customize',
            '<strong>CodeAgentSwarm:</strong> 2 minutes to download and open',
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
            '<strong>tmux/screen:</strong> None (unless you script something custom)',
            '<strong>CodeAgentSwarm:</strong> Native desktop notifications when sessions finish or need input',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conversation history',
          id: 'compare-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Lost when you close the tab',
            '<strong>tmux/screen:</strong> Preserved while session is alive, no search',
            '<strong>CodeAgentSwarm:</strong> Full history saved permanently, searchable across all sessions',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiple projects',
          id: 'compare-projects',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Possible but disorganized',
            '<strong>tmux/screen:</strong> Possible with named sessions',
            '<strong>CodeAgentSwarm:</strong> Project-aware workspaces with per-project file tracking',
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
            '<strong>tmux/screen:</strong> Moderate to steep (keybindings, config files, pane management)',
            '<strong>CodeAgentSwarm:</strong> Low, visual interface with familiar patterns',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'If you just need two sessions occasionally, terminal tabs work fine. If you already live in tmux, adding Claude Code sessions to your existing setup is natural. But if you regularly run three or more parallel sessions and want real visibility into what each one is doing, CodeAgentSwarm removes the friction that the other approaches leave in place.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can you run two Claude Code chats at the same time?',
      answer: 'Yes. Each terminal runs an independent Claude Code process with its own conversation and context. You can run as many as your machine can handle.',
    },
    {
      question: 'Does running multiple Claude Code sessions cost more?',
      answer: 'Each session uses your Claude subscription normally. There is no extra cost for running sessions in parallel - you are just using the same subscription from multiple terminals.',
    },
    {
      question: 'Can multiple Claude Code terminals work on the same project?',
      answer: 'Yes, and this is one of the most powerful use cases. Two or more sessions can work on the same codebase simultaneously. When they edit different files there is no issue at all. When they touch the same file, Git handles the merge and Claude resolves conflicts automatically. CodeAgentSwarm adds visibility so you can see which files each session is changing in real time.',
    },
    {
      question: 'What happens when two Claude Code sessions edit the same file?',
      answer: 'The second session to save will encounter a Git conflict. Claude Code is quite good at detecting and resolving these conflicts automatically. In practice, it handles this reliably without manual intervention.',
    },
    {
      question: 'Can I mix Claude Code with Codex or Gemini CLI?',
      answer: 'Yes. Since each terminal is independent, you can run different AI agents in different terminals. CodeAgentSwarm supports Claude Code, Codex CLI, and Gemini CLI in the same workspace, so you can use whichever agent fits the task.',
    },
    {
      question: 'How many Claude Code sessions can I run at once?',
      answer: 'There is no hard limit from Claude Code itself - each session is just a process. Practically, your machine resources and screen space are the constraints. CodeAgentSwarm supports up to 6 simultaneous terminals with a visual layout that keeps everything manageable.',
    },
    {
      question: 'Is tmux better than CodeAgentSwarm for multiple terminals?',
      answer: 'tmux is an excellent terminal multiplexer and it is free. If you already use it and only need basic pane splitting, it works well. CodeAgentSwarm adds layers that tmux does not have: desktop notifications, searchable conversation history, dynamic titles showing what each agent is doing, a task board, and real-time file change tracking. For managing AI coding agents specifically, CodeAgentSwarm is purpose-built for that workflow.',
    },
  ],
}

export default guide
