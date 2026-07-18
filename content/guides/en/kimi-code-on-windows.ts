import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-on-windows',
    locale: 'en',
    title: 'How to Run Kimi Code on Windows: Installer, Git Bash, and the Rough Edges',
    metaTitle: 'How to Run Kimi Code on Windows (Native or WSL) (2026)',
    metaDescription: 'Run Kimi Code on Windows: the PowerShell installer, the Git for Windows requirement, the ANSI rendering bug you should know about, and WSL as the reliable fallback.',
    intro: `Kimi Code runs on Windows, and Moonshot ships a first-party PowerShell installer for it. But the Windows story has two catches the macOS one does not: Kimi Code requires Git for Windows before its first launch, because it uses Git Bash as its shell environment, and current 0.26.x builds have a known rendering issue that can dump raw escape sequences into some Windows terminals.

This guide walks the honest version of the setup: what to install and in which order, what the Git Bash dependency means, what the rendering bug looks like when it bites, and when running Kimi Code inside WSL is simply the calmer choice. None of this is a reason to skip the tool, but going in with eyes open saves you an evening of confusion.

If you are setting up other agents on the same machine, our <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code on Windows</a> and <a href="/en/guides/opencode-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode on Windows</a> guides follow the same shape.`,
    ctaText: 'CodeAgentSwarm is a native Windows desktop app that runs your AI coding agents in parallel terminals, and Kimi Code is a supported agent. Notifications, searchable history and live diffs, all in one workspace.',
    highlightedWords: ['Kimi Code', 'Windows'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'kimi-code-en-windows',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Quick answer: yes, with two prerequisites',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: install <strong>Git for Windows</strong> first, then run the official installer in PowerShell: <code>irm https://code.kimi.com/kimi-code/install.ps1 | iex</code>. Open a new terminal, run <code>kimi</code> inside a project folder, and log in with <code>/login</code>.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '# 1. Install Git for Windows first (required, Kimi Code uses Git Bash as its shell)\nwinget install Git.Git\n\n# 2. Install Kimi Code with the official PowerShell installer\nirm https://code.kimi.com/kimi-code/install.ps1 | iex\n\n# 3. Open a NEW terminal, then verify\nkimi --version',
        },
        {
          type: 'paragraph',
          text: 'That is the short path. The order matters: Git for Windows has to be there before Kimi Code\'s first launch, not after. The sections below explain why, cover the npm alternative, and go through the rendering issue that is currently the biggest Windows-specific caveat.',
        },
        {
          type: 'paragraph',
          text: 'If Kimi Code itself is new to you, start with <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use Kimi Code</a>, which also covers the trap of the two Moonshot CLIs that both install a <code>kimi</code> binary.',
        },
      ],
    },
    {
      id: 'requirements',
      title: 'What you need before installing',
      content: [
        {
          type: 'list',
          items: [
            'Windows 10 or Windows 11, 64-bit, and a terminal (Windows Terminal or PowerShell).',
            '<strong>Git for Windows.</strong> This is not optional. Kimi Code uses the bundled Git Bash as its shell environment, so it must be installed before the first launch. Install it from git-scm.com or with <code>winget install Git.Git</code>.',
            'Node.js 22.19.0 or later, but only if you choose the npm install route instead of the PowerShell installer. The official installer needs no Node at all.',
            'A Kimi account (for subscription plans) or a Moonshot platform API key (for pay-per-token).',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'If Git Bash lives in a non-standard location, set the <code>KIMI_SHELL_PATH</code> environment variable to the absolute path of your <code>bash.exe</code> so Kimi Code can find its shell.',
        },
      ],
    },
    {
      id: 'install-native',
      title: 'Native install step by step',
      content: [
        {
          type: 'paragraph',
          text: 'With Git for Windows in place, the official installer is the recommended route because it needs no runtime:',
        },
        {
          type: 'list',
          items: [
            'Open PowerShell (no administrator rights needed).',
            'Run <code>irm https://code.kimi.com/kimi-code/install.ps1 | iex</code>. It downloads the latest release, verifies the checksum, and puts the <code>kimi</code> executable on your PATH.',
            'Close and reopen the terminal so the PATH change is picked up.',
            'Run <code>kimi --version</code>. You should see a 0.x version, which confirms you have the current TypeScript CLI and not the legacy Python kimi-cli.',
            'Move into a project folder, run <code>kimi</code>, and log in with <code>/login</code> (browser sign-in for subscriptions, API key for pay-per-token).',
          ],
        },
        {
          type: 'paragraph',
          text: 'Prefer npm? That works on Windows too, as long as you have Node.js 22.19 or later:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '# Check Node first\nnode --version\n\n# Install globally\nnpm install -g @moonshot-ai/kimi-code\n\n# Verify\nkimi --version',
        },
        {
          type: 'paragraph',
          text: 'To update later, run <code>kimi upgrade</code>, or <code>npm install -g @moonshot-ai/kimi-code@latest</code> if you installed through npm.',
        },
      ],
    },
    {
      id: 'ansi-rendering-bug',
      title: 'The rendering bug you should know about',
      content: [
        {
          type: 'paragraph',
          text: 'Here is the part most write-ups skip. As of the 0.26.x releases, the Kimi Code repository has an open issue (#1792) where the TUI dumps raw ANSI escape sequences instead of rendering them, in Windows Terminal, PowerShell and cmd. When it hits, the screen fills with sequences like <code>[38;2;255m</code> instead of a usable interface.',
        },
        {
          type: 'paragraph',
          text: 'It does not bite every machine, and with a release cadence of roughly one version a day it may be fixed by the time you read this. But if you launch <code>kimi</code> on Windows and the output looks like garbage rather than a UI, you are not doing anything wrong: it is a known upstream problem. Check the <a href="https://github.com/MoonshotAI/kimi-code/issues" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">issue tracker</a> for the current state before you spend time on your own config.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'If the TUI renders broken for you in native Windows terminals, you have two practical outs today: run Kimi Code inside WSL, or run the model rather than the CLI by pointing Claude Code at Kimi K3, as covered in <a href="/en/guides/kimi-k3-with-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 with Claude Code</a>.',
        },
      ],
    },
    {
      id: 'wsl-route',
      title: 'The WSL route: the reliable fallback',
      content: [
        {
          type: 'paragraph',
          text: 'WSL 2 gives you a real Linux environment inside Windows, and inside it Kimi Code behaves like it does on Linux: the bash dependency is native, and the rendering path is the one most of its users exercise daily. If your project already leans on Linux tooling, or the native TUI misbehaves on your machine, this is the calm route.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inside your WSL (Linux) terminal\ncurl -fsSL https://code.kimi.com/kimi-code/install.sh | bash\n\n# Then, from your project folder\nkimi',
        },
        {
          type: 'paragraph',
          text: 'Two practical notes: keep your project files inside the Linux filesystem for performance, and when the OAuth login shows you a link, finish it in your Windows browser and come back to the terminal. Everything else works the same as the native setup.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Common Windows errors and fixes',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"kimi is not recognized as a command":</strong> you did not reopen the terminal after installing, or the installer\'s PATH change did not stick. Open a fresh PowerShell window; if it persists, check that the Kimi Code bin folder is on your PATH.',
            '<strong>Kimi Code complains about the shell or fails to run commands:</strong> Git for Windows is missing or Git Bash is somewhere unusual. Install Git for Windows, or point <code>KIMI_SHELL_PATH</code> at your <code>bash.exe</code>.',
            '<strong>Screen full of raw escape codes:</strong> that is issue #1792 described above, not your config. Use WSL or check the issue tracker for a fixed release.',
            '<strong><code>kimi --version</code> prints 1.4x:</strong> you have the legacy Python kimi-cli, not Kimi Code. Install with the official script or npm package <code>@moonshot-ai/kimi-code</code>; the installer renames legacy shims to <code>kimi-legacy</code> for you.',
            '<strong>npm install fails on Node version:</strong> Kimi Code needs Node 22.19.0 or later. Update Node, or skip npm entirely and use the PowerShell installer, which bundles everything.',
          ],
        },
      ],
    },
    {
      id: 'multiple-sessions-on-windows',
      title: 'Running multiple Kimi Code sessions on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Once Kimi Code works, the next ceiling is one terminal, one task. Every <code>kimi</code> session is an independent process, so nothing stops you from opening several terminals and running one session in each. What gets hard is keeping track: which agent finished, which one is waiting on an approval, and what each one changed.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> is a native desktop app for Windows and macOS built for that supervision problem. Kimi Code is a supported agent in it, next to Claude Code, Codex CLI, Antigravity CLI and opencode, and you choose the agent per terminal. You get desktop notifications when a session finishes or needs input, searchable history across every agent, live per-terminal diffs, and a quota indicator that reads Kimi\'s weekly and 5-hour windows.',
        },
        {
          type: 'paragraph',
          text: 'For the full parallel workflow, continue with <a href="/en/guides/run-multiple-kimi-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Kimi Code sessions</a> and the <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code agent swarm guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Kimi Code run on Windows?',
      answer: 'Yes. Moonshot ships an official PowerShell installer (irm https://code.kimi.com/kimi-code/install.ps1 | iex), and there is an npm package for machines with Node 22.19 or later. The one hard requirement is Git for Windows, which must be installed before first launch because Kimi Code uses Git Bash as its shell environment.',
    },
    {
      question: 'Why does Kimi Code need Git for Windows?',
      answer: 'Kimi Code runs its shell commands through Git Bash rather than PowerShell or cmd, so it needs the bash that ships with Git for Windows. If your Git Bash is installed somewhere unusual, set the KIMI_SHELL_PATH environment variable to the absolute path of bash.exe.',
    },
    {
      question: 'Why does Kimi Code show garbled text or escape codes on Windows?',
      answer: 'Current 0.26.x builds have a known open issue (#1792) where the TUI prints raw ANSI escape sequences in Windows Terminal, PowerShell and cmd on some machines. It is an upstream bug, not your configuration. Kimi Code releases almost daily, so check the GitHub issue tracker; until it is fixed on your setup, WSL is the reliable route.',
    },
    {
      question: 'Should I use WSL for Kimi Code on Windows?',
      answer: 'Use WSL 2 if your project depends on Linux tooling, or if the native Windows TUI renders incorrectly on your machine. Inside WSL, Kimi Code installs with the same one-line script as Linux and behaves like it does for the bulk of its users. For Windows-native projects where the TUI renders fine, the native install is simpler.',
    },
    {
      question: 'Can I run several Kimi Code sessions at once on Windows?',
      answer: 'Yes. Each kimi session is its own process, so you can run one per terminal. CodeAgentSwarm, a native Windows desktop app, manages that for you: Kimi Code is a supported agent, and you get notifications, searchable history, live diffs and a Kimi quota indicator across all your parallel sessions.',
    },
  ],
}

export default guide
