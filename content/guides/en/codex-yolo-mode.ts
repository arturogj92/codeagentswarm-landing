import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-yolo-mode',
    locale: 'en',
    title: 'Codex CLI YOLO Mode: Commands, Approvals and Sandbox Explained',
    metaTitle: 'Codex YOLO Mode: --yolo, Approvals & Sandbox (2026)',
    metaDescription: 'See what codex --yolo disables, how to keep the sandbox without approval prompts, and why the older --full-auto flag depends on your CLI version.',
    intro: 'Codex accepts --yolo as an alias for --dangerously-bypass-approvals-and-sandbox: it disables approval prompts and the sandbox. To let Codex work with fewer interruptions inside your project, configure sandbox access and approvals separately.\n\nThis guide gives you the commands, explains the older --full-auto flag, and shows how to supervise sessions in CodeAgentSwarm. A desktop interface does not make a dangerous command safe.',
    ctaText: 'Supervise your Codex sessions in CodeAgentSwarm: see what needs a reply, search conversations and review project changes. Download the app for macOS or Windows and use your own Codex account.',
    ctaAgent: 'codex',
    highlightedWords: [
      'Codex CLI',
      'YOLO mode',
    ],
    publishedAt: '2026-06-07',
    updatedAt: '2026-09-25',
    alternateSlug: 'modo-yolo-codex',
  },
  sections: [
    {
      id: 'what-is-codex-yolo',
      title: 'Codex YOLO command and a sandboxed alternative',
      content: [
        {
          type: 'paragraph',
          text: 'To work inside the project and request approval for escalations, start Codex with this explicit configuration:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --sandbox workspace-write --ask-for-approval on-request "Review the project and run its tests"',
        },
        {
          type: 'paragraph',
          text: 'For a run without approval prompts, keep the sandbox and use <code>--ask-for-approval never</code>. Blocked operations fail instead of prompting for permission.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --sandbox workspace-write --ask-for-approval never "Run the existing tests"',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The command <code>codex --yolo</code> also bypasses the sandbox. Reserve it for an externally isolated environment without production credentials or data. A Git branch does not provide that isolation.',
        },
        {
          type: 'paragraph',
          text: 'If you need to see what Codex is doing, the <a href="/en/guides/codex-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex GUI</a> puts several conversations in one window. To divide work between agents, follow the guide to <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple Codex sessions</a>.',
        },
      ],
    },
    {
      id: 'what-modes-do',
      title: 'What approvals, sandboxing and --full-auto do',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'approval-spectrum',
          text: 'When Codex asks',
        },
        {
          type: 'table',
          headers: [
            'Configuration',
            'Behavior',
          ],
          rows: [
            [
              '--sandbox workspace-write -a on-request',
              'Works within configured boundaries and can request permission to go beyond them.',
            ],
            [
              '--sandbox workspace-write -a never',
              'Keeps the boundaries and does not request escalation; blocked operations fail.',
            ],
            [
              '--yolo',
              'Alias for --dangerously-bypass-approvals-and-sandbox. Bypasses both protections.',
            ],
            [
              '--full-auto',
              'Legacy flag. Availability depends on the version and subcommand.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'In Codex CLI 0.156.0, we checked that <code>codex --full-auto --help</code> rejects the argument while <code>codex --yolo --help</code> accepts it. The official <code>codex exec</code> reference still describes <code>--full-auto</code> as deprecated compatibility. Use explicit options and check the help for the command you intend to run.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --version\ncodex --help\ncodex exec --help',
        },
        {
          type: 'heading',
          level: 3,
          id: 'sandbox-dial',
          text: 'What the sandbox restricts',
        },
        {
          type: 'paragraph',
          text: 'The sandbox limits resources the process can access. Approval policy controls requests to act beyond those boundaries. Disabling prompts alone does not grant full access. <code>workspace-write</code> permits changes within the workspace, which can include deleting files there. Keep a backup of important work.',
        },
        {
          type: 'paragraph',
          text: 'Sources checked September 25, 2026: <a href="https://learn.chatgpt.com/docs/developer-commands?surface=cli" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenAI command reference</a>; <a href="https://learn.chatgpt.com/docs/sandboxing" class="text-neon-cyan hover:text-neon-purple transition-colors">sandbox documentation</a>.',
        },
      ],
    },
    {
      id: 'real-risks',
      title: 'Risks that remain',
      content: [
        {
          type: 'list',
          items: [
            'Writable files can be overwritten or deleted even inside a sandbox.',
            'Accessible credentials, services and paths determine what a command can reach.',
            'A branch separates Git history; it does not isolate processes, secrets or external services.',
            'AGENTS.md guides the agent; it does not replace access restrictions.',
          ],
        },
      ],
    },
    {
      id: 'run-safely',
      title: 'How to supervise Codex in CodeAgentSwarm',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'method-raw-flag',
          text: '1. Start with bounded permissions',
        },
        {
          type: 'paragraph',
          text: 'Open the project and select Codex. You can use Chat or the terminal. Check that session’s permission mode before sending the task. In the terminal, use the Codex options explained at the start of this guide.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'method-sandbox',
          text: '2. Review each session’s work',
        },
        {
          type: 'paragraph',
          text: 'Open another session for an independent task, review project changes and consult saved conversations. If both tasks will edit the same files, use <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">worktrees</a> to separate working copies.',
        },
        {
          type: 'image',
          src: '/images/guides/parallel-workspace-codex.webp',
          alt: 'Four Codex sessions in CodeAgentSwarm, with Chat and terminal views in the same grid',
          caption: 'Each session has its own task and controls. This screenshot illustrates supervision, not security isolation.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'method-turbo-mode',
          text: '3. Check what Turbo Mode enables',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Turbo Mode in the Codex terminal uses <code>--dangerously-bypass-approvals-and-sandbox</code>. Do not enable it expecting CodeAgentSwarm to automatically block a push or deletion. Visual supervision does not restore a disabled sandbox.',
        },
        {
          type: 'paragraph',
          text: 'The <a href="/en/guides/codex-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex GUI</a> guide explains how to open the app, sign in and review work. CodeAgentSwarm is a separate download from Codex and uses your provider account.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Before leaving a task running',
      content: [
        {
          type: 'list',
          items: [
            'Save unfinished work and check git status before starting.',
            'Choose a specific project and task. Keep production credentials out of the working environment.',
            'Keep the sandbox enabled and check the session’s effective permissions.',
            'Review the diff and run tests before merging or publishing changes.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is there a codex --yolo flag?',
      answer: 'Yes. --yolo is an alias for --dangerously-bypass-approvals-and-sandbox. It bypasses approvals and the sandbox. It is intended for externally isolated environments.',
    },
    {
      question: 'What does --full-auto do in Codex?',
      answer: 'It is a legacy flag. The codex exec reference marks it as deprecated compatibility; the interactive command in Codex CLI 0.156.0 that we checked rejects it. Use --sandbox workspace-write and choose approval policy explicitly.',
    },
    {
      question: 'How do I run Codex without prompts while keeping the sandbox?',
      answer: 'Use codex --sandbox workspace-write --ask-for-approval never. Codex will not request escalation; blocked operations fail. Files that are writable remain exposed to changes and deletion.',
    },
    {
      question: 'What is the difference between the sandbox and approvals?',
      answer: 'The sandbox limits accessible resources. Approval policy controls when Codex asks to extend that access. You can keep the sandbox even when you do not want prompts.',
    },
    {
      question: 'Does CodeAgentSwarm Turbo Mode block dangerous Codex commands?',
      answer: 'Do not assume that it does. Turbo Mode in the Codex terminal uses the flag that bypasses approvals and sandboxing. Keep normal permissions when you need those restrictions.',
    },
    {
      question: 'How do I supervise multiple Codex sessions?',
      answer: 'CodeAgentSwarm provides independent sessions, conversation history and project change review in a macOS and Windows app. Configure permissions for each session and use worktrees when you need separate working files.',
    },
  ],
}

export default guide
