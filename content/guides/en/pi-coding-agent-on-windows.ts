import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-on-windows',
    locale: 'en',
    title: 'Run Pi coding agent on Windows: installation and PowerShell',
    metaTitle: 'Pi Coding Agent on Windows: Install and Use PowerShell',
    metaDescription: 'Install Pi coding agent on Windows, choose Git Bash or its PowerShell tool, fix PATH problems and understand how the CodeAgentSwarm Pi beta runs commands.',
    intro: 'Pi can run on Windows, but the terminal you launch it from and the shell its model uses are separate choices. This guide covers installation and the PowerShell tool, then explains the behavior verified in CodeAgentSwarm\'s Windows beta.',
    ctaText: 'Pi support in CodeAgentSwarm is in beta testing. The download below is the current public app; check its release notes for Pi availability.',
    ctaAgent: 'pi',
    socialImage: '/images/guides/pi-coding-agent-og-en.png',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-22',
    alternateSlug: 'pi-coding-agent-en-windows',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Quick answer',
      content: [
        {
          type: 'image',
          src: '/icons/apps/pi-icon.svg',
          alt: 'Pi coding agent',
          size: 'inline',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Pi runs on native Windows. Install the current npm package, then choose Git Bash or configure its PowerShell tool. In CodeAgentSwarm beta Chat, the integration selects the native PowerShell tool for Windows.',
        },
      ],
    },
    {
      id: 'pi-in-action',
      title: 'Pi in CodeAgentSwarm, in pictures',
      content: [
        {
          type: 'image',
          src: '/images/guides/pi-chat-beta.webp',
          alt: 'Pi in CodeAgentSwarm Chat with a sample project',
          size: 'full',
          caption: 'Real CodeAgentSwarm beta capture on macOS: Pi running with a sample project. This image does not announce availability in the public download. This illustrates the Chat interface; it is not a Windows screenshot.',
        },
        {
          type: 'paragraph',
          text: 'The picker shows the model and its provider. You can inspect that connection without leaving the project, while Chat keeps the task messages and tools together.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install the current Pi package',
      content: [
        {
          type: 'paragraph',
          text: 'For the version verified by CodeAgentSwarm, Pi 0.85.1, use Node.js 22.19.0 or newer. Open PowerShell and check Node and npm before installing. You do not need to start this task in an elevated administrator terminal.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: 'node --version\nnpm --version\nnpm install -g --ignore-scripts @earendil-works/pi-coding-agent\npi --version',
        },
        {
          type: 'paragraph',
          text: 'If the command is unavailable after installation, reopen the terminal before changing system settings. The <a href="/en/guides/how-to-use-pi-coding-agent" class="text-neon-cyan hover:text-neon-purple transition-colors">general Pi setup guide</a> covers your first project and session.',
        },
      ],
    },
    {
      id: 'shell',
      title: 'PowerShell window versus the model\'s shell tool',
      content: [
        {
          type: 'paragraph',
          text: 'Starting Pi in PowerShell does not automatically replace its model-facing <code>bash</code> tool. Pi\'s documented Windows default uses Git Bash. If you want Bash, install Git for Windows. If you want native PowerShell commands instead, Pi supports a <code>powershell</code> tool.',
        },
        {
          type: 'paragraph',
          text: 'Merge this setting into <code>~/.pi/agent/settings.json</code>, preserving any other settings. The <code>~</code> directory is your Windows user profile.',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "defaultTools": ["read", "powershell", "edit", "write"]\n}',
        },
        {
          type: 'paragraph',
          text: 'The tool uses <code>pwsh.exe</code> when available and otherwise Windows PowerShell. Pi\'s interactive <code>!</code> and <code>!!</code> shortcuts still use Bash. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/windows.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Official Windows setup</a>.',
        },
      ],
    },
    {
      id: 'login',
      title: 'Sign in and verify a small task',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: 'Set-Location C:\\path\\to\\project\npi',
        },
        {
          type: 'list',
          items: [
            'Inside Pi, enter <code>/login</code> and connect your provider.',
            'Use <code>/model</code> to pick a model your account can access.',
            'Ask it to list the project files with the selected shell tool.',
            'Before requesting edits, ask which test command the project defines and check the answer.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Provider choice determines model access and billing. See <a href="/en/guides/pi-coding-agent-models-subscriptions" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi subscriptions and models</a> for ChatGPT, Claude and API connections.',
        },
      ],
    },
    {
      id: 'practical-check',
      title: 'Verify the Windows shell before editing',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: 'Get-Command pi -All\nnode --version\npi --version',
        },
        {
          type: 'paragraph',
          text: 'Inside Pi, ask it to print the working directory and list the project files using the selected command tool. Inspect the tool name and output. Then ask it to read the project test script before running anything that changes files.',
        },
        {
          type: 'paragraph',
          text: 'If you switch to WSL, treat that as another environment: its home directory, installed Pi command and credentials can differ from native Windows. Choose the environment used by the project and finish its setup there.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Fix command and path problems',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Pi is not recognized:</strong> run <code>Get-Command pi -All</code> and <code>npm config get prefix</code>. Confirm the npm command directory belongs to this installation and is on PATH.',
            '<strong>Missing Bash:</strong> choose Git Bash or configure the PowerShell tool. A PowerShell terminal alone does not change Pi\'s default tool.',
            '<strong>Wrong installation:</strong> more than one Node installation can expose different Pi commands. Check the resolved path before signing in or updating.',
            '<strong>Project expects Linux:</strong> use an appropriate Linux environment such as WSL for that project. Keep its Pi installation, configuration and files together.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Do not fix an agent setup by globally relaxing your machine\'s execution policy. Use the documented tool setup and inspect the specific error first.',
        },
      ],
    },
    {
      id: 'cas-windows',
      title: 'What the CodeAgentSwarm Windows beta does',
      content: [
        {
          type: 'paragraph',
          text: '<strong>Pi support is in beta testing and has not yet been announced for the standard public download.</strong> In the tested CAS Chat integration, the managed Pi extension selects Pi\'s native PowerShell tool on Windows. Chat tool execution therefore does not require Git Bash.',
        },
        {
          type: 'paragraph',
          text: 'CAS CLI view keeps Pi\'s own terminal behavior. The beta verification used an actual Pi process on Windows 11 ARM64 with a local model endpoint to check tool execution, allow/deny decisions, edit diffs and resume. That proves the exercised integration paths, not every upstream provider\'s availability.',
        },
        {
          type: 'paragraph',
          text: 'For workflow differences rather than installation, continue with <a href="/en/guides/pi-vs-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi vs OpenCode</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Do I need WSL to run Pi on Windows?',
      answer: 'Not for native Windows use. Choose the documented Git Bash setup or Pi\'s PowerShell tool. Use WSL when the project itself needs a Linux environment.',
    },
    {
      question: 'Does launching Pi in PowerShell make its commands use PowerShell?',
      answer: 'No. Configure the powershell tool for standalone Pi. In CAS beta Chat, the managed extension selects that tool on Windows.',
    },
    {
      question: 'Is Windows support tested in CodeAgentSwarm?',
      answer: 'The Pi beta integration was checked with real Pi on Windows 11 ARM64, including shell commands, permission decisions and resume. Public download availability is a separate release decision.',
    },
  ],
}

export default guide
