import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-gui',
    locale: 'en',
    title: 'Codex GUI: A Visual Desktop App for OpenAI Codex CLI',
    metaTitle: 'Codex GUI: The Desktop App for OpenAI Codex CLI (2026)',
    metaDescription: 'A Codex GUI is a graphical desktop app on top of OpenAI Codex CLI. CodeAgentSwarm gives Codex a visual workspace, task board, diffs and notifications.',
    intro: 'CodeAgentSwarm is an independent app for working with Codex on macOS and Windows. Open sessions in Chat or terminal views, find saved conversations and review project changes from one window.\n\nUse your own Codex account. Downloading CodeAgentSwarm does not include model access or replace provider billing. This guide explains when a graphical interface helps and how to get started with your project.',
    ctaText: 'Open your project and start a Codex session in CodeAgentSwarm. Review one task and its changes before adding more agents. The app is available for macOS and Windows.',
    ctaAgent: 'codex',
    highlightedWords: [
      'Codex GUI',
      'desktop app',
    ],
    publishedAt: '2026-07-13',
    updatedAt: '2026-09-25',
    alternateSlug: 'interfaz-grafica-codex',
  },
  sections: [
    {
      id: 'what-is-a-codex-gui',
      title: 'When to use a Codex GUI',
      content: [
        {
          type: 'paragraph',
          text: 'If you need a command or want to continue one session, Codex CLI can do that. CodeAgentSwarm helps when you want to see several sessions, switch projects or find a conversation across agents. It is an independent application, not the official OpenAI app.',
        },
        {
          type: 'table',
          headers: [
            'Your goal',
            'Where to start',
          ],
          rows: [
            [
              'Run a task in the terminal',
              'Use Codex CLI with the appropriate project and permissions.',
            ],
            [
              'Supervise several sessions',
              '<a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">Set up multiple Codex sessions</a>',
            ],
            [
              'Find and continue a conversation',
              '<a href="/en/guides/codex-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Read the history guide</a>',
            ],
            [
              'Get started on Windows',
              '<a href="/en/guides/codex-cli-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Check the Codex Windows setup</a>',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'To try the app, download CodeAgentSwarm using the button on this page, open your project and select Codex when creating a session. Choose Chat for an integrated conversation or the terminal if you prefer the CLI interface.',
        },
      ],
    },
    {
      id: 'what-you-get-in-the-gui',
      title: 'What you can do in CodeAgentSwarm',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'visual-workspace',
          text: 'See independent sessions',
        },
        {
          type: 'paragraph',
          text: 'Each session can work on a task or project. Read titles and statuses in the grid or list, then open the conversation that needs your attention. Prepare separate worktrees if two tasks will modify the same files.',
        },
        {
          type: 'image',
          src: '/images/guides/parallel-workspace-codex.webp',
          alt: 'Codex Chat and terminal sessions inside CodeAgentSwarm',
          caption: 'One window with several Codex tasks. Each session keeps its own controls.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'task-board',
          text: 'Organize tasks',
        },
        {
          type: 'paragraph',
          text: 'Use the board to organize work. With the CodeAgentSwarm MCP configured, you can ask an agent to read and update the relevant tasks. Check the result before considering a task finished.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'searchable-history',
          text: 'Search conversations',
        },
        {
          type: 'paragraph',
          text: 'Search text in saved conversations and filter by project or agent. Open a result to recover its context. Codex also provides its own resume commands; the app adds a shared view across agents.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'live-diffs',
          text: 'Review changes',
        },
        {
          type: 'paragraph',
          text: 'Review modified files and the project diff before committing. Sessions that share a folder also share its files: opening two chats does not automatically separate their changes.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'notifications',
          text: 'Act on notifications',
        },
        {
          type: 'paragraph',
          text: 'Use notifications and session statuses to return to a conversation when it needs a reply. Check operating-system notification permissions if alerts do not arrive.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'permission-controls',
          text: 'Choose permissions',
        },
        {
          type: 'paragraph',
          text: 'Check each session’s permission mode. Turbo Mode in the Codex terminal bypasses approvals and sandboxing; it does not add an automatic dangerous-command block. The <a href="/en/guides/codex-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex YOLO and sandbox guide</a> explains the options.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'shortcuts-marketplace',
          text: 'Set up projects and tools',
        },
        {
          type: 'paragraph',
          text: 'Save the projects you use and add the skills or MCP connections you need. External tools may require their own setup and account.',
        },
      ],
    },
    {
      id: 'codex-cli-vs-codex-gui',
      title: 'Codex CLI or a graphical interface',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'cli-strengths',
          text: 'One task from the terminal',
        },
        {
          type: 'paragraph',
          text: 'The CLI provides conversation, command execution and session resumption. If that workflow already works for you, keep using it. You do not need another app to enable Codex options.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'cli-pain',
          text: 'Several projects and agents',
        },
        {
          type: 'paragraph',
          text: 'When you switch between tasks, a shared view helps you find the right conversation and check what is pending. That is a reason to try CodeAgentSwarm with real work.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'gui-adds',
          text: 'Try it with a familiar task',
        },
        {
          type: 'paragraph',
          text: 'Start with a familiar project and a small task. Check how messages appear, where to find history and how to review the diff. Add a second session once you understand that workflow.',
        },
      ],
    },
    {
      id: 'codex-gui-download',
      title: 'Download and set up CodeAgentSwarm for Codex',
      content: [
        {
          type: 'list',
          items: [
            'Download the CodeAgentSwarm installer for your system using the button on this page. On a phone, you can email yourself the link.',
            'Install the app and open or add your project folder.',
            'Create a session, select Codex, and choose Chat or terminal.',
            'Complete Codex setup and sign-in if needed. Use your own provider account.',
            'Check permissions, send a small task and review the changes before continuing.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The public app is available for macOS and Windows. Model access and limits depend on your Codex account. CodeAgentSwarm does not include an OpenAI subscription.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a Codex GUI?',
      answer: 'A visual interface for working with Codex. CodeAgentSwarm provides Chat, terminals, history and project change review in an independent app for macOS and Windows.',
    },
    {
      question: 'Is CodeAgentSwarm the official OpenAI app?',
      answer: 'No. It is an independent application that integrates Codex alongside other agents. It uses your provider account and does not include additional model access.',
    },
    {
      question: 'Can I use CodeAgentSwarm with Codex on Windows?',
      answer: 'Yes. Download the Windows installer, open your project, select Codex and complete its setup and sign-in.',
    },
    {
      question: 'Is there a Linux version of CodeAgentSwarm?',
      answer: 'The public CodeAgentSwarm app is available for macOS and Windows. To use Codex on Linux, check its native options.',
    },
    {
      question: 'Do I need Turbo Mode?',
      answer: 'No. You can work with normal permissions. Codex terminal Turbo Mode bypasses approvals and sandboxing, and is not required to open several sessions.',
    },
    {
      question: 'Can I use my Codex account?',
      answer: 'Yes. Use your Codex account with its applicable limits. CodeAgentSwarm does not replace provider access or billing.',
    },
  ],
}

export default guide
