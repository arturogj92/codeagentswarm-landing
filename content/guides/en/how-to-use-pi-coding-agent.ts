import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'how-to-use-pi-coding-agent',
    locale: 'en',
    title: 'Pi coding agent: installation, login and your first task',
    metaTitle: 'Pi Coding Agent: Install, Sign In and Start Coding',
    metaDescription: 'Learn what Pi coding agent does, install the current npm package, connect a model and resume sessions. Includes the status of Pi in CodeAgentSwarm beta.',
    intro: 'Pi is a terminal coding agent that connects a language model to your project files and tools. You choose the provider; Pi manages the conversation and tool execution. This guide gets a standalone Pi session running before explaining the CodeAgentSwarm beta integration.',
    ctaText: 'Pi support in CodeAgentSwarm is in beta testing. The download below is the current public app; check its release notes for Pi availability.',
    ctaAgent: 'pi',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-06',
    alternateSlug: 'como-usar-pi-coding-agent',
  },
  sections: [
    {
      id: 'what-is-pi',
      title: 'What is Pi, and what does the harness do?',
      content: [
        {
          type: 'paragraph',
          text: 'A coding harness supplies the working environment around a model: conversation state, project context and tools. In Pi, a request can lead to reading files, editing code and running a command. The answer depends on both the selected model and the instructions and tools available to it.',
        },
        {
          type: 'paragraph',
          text: 'Pi can be extended with skills, prompt templates and extensions. Its built-in workflow does not include a native plan mode or subagent manager. That distinction matters when comparing it with <a href="/en/guides/pi-vs-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi overview</a>.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install Pi on macOS or Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Use Node.js 22.19.0 or newer for the Pi version verified by CodeAgentSwarm, 0.85.1. Check your Node and npm versions before installing the current package. Older tutorials may use the former @mariozechner package name.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'node --version\nnpm --version\nnpm install -g --ignore-scripts @earendil-works/pi-coding-agent\npi --version',
        },
        {
          type: 'paragraph',
          text: 'Run the commands in a system shell, then open Pi from a project directory. For PowerShell and shell-tool configuration, use the <a href="/en/guides/pi-coding-agent-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Windows setup guide</a>.',
        },
      ],
    },
    {
      id: 'first-task',
      title: 'Connect a provider and try a small task',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: 'cd /path/to/your/project\npi',
        },
        {
          type: 'list',
          items: [
            'Inside Pi, enter <code>/login</code> and complete the chosen provider\'s sign-in flow.',
            'Enter <code>/model</code> and choose a model that your account can access.',
            'Start with a bounded request: "Read this project and tell me which command runs its tests. Do not change files."',
            'For the next task, request one specific change, inspect the diff and run the relevant check.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A subscription login and an API key can have different billing. Read the <a href="/en/guides/pi-coding-agent-models-subscriptions" class="text-neon-cyan hover:text-neon-purple transition-colors">models and subscriptions guide</a> before choosing your provider.',
        },
      ],
    },
    {
      id: 'history',
      title: 'Continue a conversation or split the work',
      content: [
        {
          type: 'paragraph',
          text: 'Pi keeps session files under <code>~/.pi/agent/sessions/</code>. Use the session picker to reopen previous work rather than pasting the whole conversation into a new chat.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'pi -c\n# Or choose a previous session\npi -r',
        },
        {
          type: 'paragraph',
          text: 'Two Pi processes can work independently, but two processes editing the same checkout still share files. Use separate <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">Git worktrees</a> when their edits could overlap. A conversation boundary is not filesystem isolation.',
        },
      ],
    },
    {
      id: 'codeagentswarm-beta',
      title: 'Pi in CodeAgentSwarm: beta status',
      content: [
        {
          type: 'paragraph',
          text: '<strong>The Pi integration is in beta testing. It is not yet announced as available in the standard public download.</strong> A tested beta build exposes Pi in both Chat and CLI views, with streaming, model selection, permission decisions, history and resume.',
        },
        {
          type: 'paragraph',
          text: 'The integration uses Pi\'s native RPC mode. In the beta, sign in from Pi\'s CLI view, then open a new Pi Chat to load the available model catalog. Existing Codex and Claude CLI account credentials are not copied into Pi.',
        },
        {
          type: 'paragraph',
          text: 'The same driver has been checked in the CAS Cloud package. Authentication belongs to the host running Pi; configuring your Mac does not sign in a remote host. See <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi RPC</a> for the integration protocol.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Pi a model or a coding agent?',
      answer: 'Pi is a coding agent and harness. You connect a supported model provider and choose the model used by the session.',
    },
    {
      question: 'Which npm package should I install?',
      answer: 'Use @earendil-works/pi-coding-agent. CodeAgentSwarm verified Pi 0.85.1 with Node.js 22.19.0 or newer.',
    },
    {
      question: 'Can I use Pi in the public CodeAgentSwarm download today?',
      answer: 'Pi support is in beta testing. Check the public app release notes for availability; this guide is not a release announcement.',
    },
  ],
}

export default guide
