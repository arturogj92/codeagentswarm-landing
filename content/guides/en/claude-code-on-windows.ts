import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-on-windows',
    locale: 'en',
    title: 'How to Run Claude Code on Windows: Native Install or WSL',
    metaTitle: 'How to Install & Run Claude Code on Windows (Native or WSL) - 2026 Guide',
    metaDescription: 'Claude Code runs natively on Windows, no WSL required. One-line PowerShell install, requirements, WSL 2 setup, troubleshooting and the best way to run multiple sessions on Windows.',
    intro: `Yes, Claude Code runs natively on Windows. You do not need WSL anymore: open PowerShell and run "irm https://claude.ai/install.ps1 | iex", then type "claude" to log in. It works on Windows 10 (1809 or later) and Windows 11, with PowerShell alone or with Git Bash if you have Git for Windows installed.

WSL is still a valid option, and in some cases the better one. In this guide we cover both paths: the native install step by step, the WSL 2 install, when to choose each, and how to fix the most common Windows-specific errors.

And once you have it running, we will also show you how to go from one Claude Code terminal to several working in parallel on Windows.`,
    ctaText: 'CodeAgentSwarm is now available for Windows. Download it free and run several Claude Code terminals side by side, with notifications, searchable history and live diffs.',
    highlightedWords: ['Claude Code', 'Windows'],
    publishedAt: '2026-06-12',
    updatedAt: '2026-06-12',
    alternateSlug: 'claude-code-en-windows',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Claude Code on Windows in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: open PowerShell (no admin rights needed) and run the official installer. When it finishes, type <code>claude</code> and log in with your Anthropic account in the browser window that opens.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: `# PowerShell (recommended)
irm https://claude.ai/install.ps1 | iex

# Or with WinGet
winget install Anthropic.ClaudeCode

# Verify the install
claude --version`,
        },
        {
          type: 'paragraph',
          text: 'That is the whole native install. No WSL, no Node.js setup, no admin permissions. The installer adds Claude Code to your PATH automatically and the native version keeps itself updated in the background.',
        },
        {
          type: 'paragraph',
          text: 'All commands in this guide come from the <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Claude Code setup documentation</a>.',
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
            'Windows 10 (version 1809 or later) or Windows 11, 64-bit. 32-bit Windows is not supported.',
            'PowerShell, which comes preinstalled with Windows.',
            'Git for Windows: optional but recommended. With it, Claude Code uses Git Bash as its shell, which gives better compatibility with bash commands. Without it, Claude Code falls back to PowerShell.',
            'An Anthropic account (Claude Pro/Max subscription or API access).',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You do NOT need Node.js or npm for the native installer. That requirement only applies to the legacy npm installation method.',
        },
      ],
    },
    {
      id: 'native-install-step-by-step',
      title: 'Native install step by step',
      content: [
        {
          type: 'paragraph',
          text: 'The native install takes about a minute:',
        },
        {
          type: 'list',
          items: [
            'Open Windows Terminal or PowerShell. You do not need to run it as administrator.',
            'Run the installer: <code>irm https://claude.ai/install.ps1 | iex</code>',
            'Wait for the script to finish. It installs Claude Code under your user profile and adds it to your PATH.',
            'Close and reopen the terminal so the PATH change takes effect.',
            'Run <code>claude --version</code> to confirm it is installed.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you prefer CMD over PowerShell, there is an equivalent installer:',
        },
        {
          type: 'code',
          language: 'batch',
          code: 'curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Note on updates: the native installer auto-updates in the background. If you install via WinGet instead, updates are manual: run <code>winget upgrade Anthropic.ClaudeCode</code> from time to time.',
        },
      ],
    },
    {
      id: 'first-run-and-login',
      title: 'First run: logging in',
      content: [
        {
          type: 'list',
          items: [
            'Open a terminal in a project folder and type <code>claude</code>.',
            'Your browser opens with the Anthropic login. Sign in with your Claude account.',
            'If the browser does not open, press <code>c</code> in the terminal to copy the login URL and paste it into your browser manually.',
            'Back in the terminal, you are ready: ask Claude something about your code.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If something feels off after installing, <code>claude doctor</code> runs a diagnostic that catches most common configuration problems.',
        },
      ],
    },
    {
      id: 'wsl-install',
      title: 'Installing Claude Code in WSL (and when to prefer it)',
      content: [
        {
          type: 'paragraph',
          text: 'Before native Windows support existed, WSL was the only way to run Claude Code on Windows. It is still fully supported and there are two scenarios where it remains the better choice:',
        },
        {
          type: 'list',
          items: [
            '<strong>Your project depends on Linux tooling.</strong> If your build chain, scripts or dependencies assume Linux, run Claude Code where your project actually runs.',
            '<strong>You want sandboxed command execution.</strong> Claude Code\'s sandboxing feature works on WSL 2 but not on native Windows (and not on WSL 1).',
          ],
        },
        {
          type: 'paragraph',
          text: 'To install inside WSL, open your WSL distribution terminal (not PowerShell) and run the Linux installer:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'curl -fsSL https://claude.ai/install.sh | bash',
        },
        {
          type: 'paragraph',
          text: 'Then launch <code>claude</code> from inside the WSL terminal. One gotcha with the login: in WSL the browser sometimes shows you a code instead of redirecting back automatically. Just paste that code into the terminal when it asks for it.',
        },
      ],
    },
    {
      id: 'native-vs-wsl',
      title: 'Native Windows vs WSL: which one should you use?',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Native Windows:</strong> best for Windows-native projects (.NET, Unity, general web dev with Windows tooling). Simplest setup, auto-updates, works with PowerShell or Git Bash.',
            '<strong>WSL 2:</strong> best for Linux toolchains and for sandboxed command execution. Your files live in the Linux filesystem, so Linux-first projects behave exactly as they would on a server.',
            '<strong>WSL 1:</strong> only if WSL 2 is not available on your machine. It does not support sandboxing and has known issues running native binaries.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you are unsure, start native. It is the path of least friction and you can always add a WSL install later; both can coexist on the same machine.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Common Windows errors and how to fix them',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"Claude Code on Windows requires either Git for Windows (for bash) or PowerShell":</strong> PowerShell is not on your PATH or you are in an unusual shell. Use standard Windows PowerShell, or install Git for Windows.',
            '<strong>Git Bash installed but not detected:</strong> point Claude Code to it explicitly in your settings.json: <code>{"env": {"CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"}}</code>',
            '<strong>"The process cannot access the file" during install:</strong> another process is locking the download. Delete the <code>%USERPROFILE%\\.claude\\downloads</code> folder and run the installer again.',
            '<strong>SSL/TLS errors on older Windows 10:</strong> run <code>[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12</code> in PowerShell before installing.',
            '<strong>"Exec format error" in WSL:</strong> you are on WSL 1. Upgrade the distribution to WSL 2 with <code>wsl --set-version &lt;distro&gt; 2</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, the <a href="https://code.claude.com/docs/en/troubleshoot-install" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official troubleshooting page</a> covers the full list of known install issues.',
        },
      ],
    },
    {
      id: 'multiple-terminals-on-windows',
      title: 'Running multiple Claude Code sessions on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Once Claude Code is working, the next bottleneck shows up fast: one terminal means one task at a time. You give Claude something to do, and then you wait. Most developers end up opening several terminal tabs and losing track of which agent finished, which one is waiting for permission, and what each one changed.',
        },
        {
          type: 'paragraph',
          text: 'That is the problem <a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> solves, and it now runs on Windows. It gives you multiple Claude Code terminals side by side with desktop notifications when an agent finishes or needs input, searchable history across every session, and a live diff of what each terminal changed.',
        },
        {
          type: 'paragraph',
          text: 'If you want to go down that path, these two guides are the natural next step: <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">How to use multiple Claude Code terminals</a> and <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">Run multiple Claude Code sessions</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'Running Claude Code on Windows went from "set up WSL first" to a one-line PowerShell install. Native is the right default for most Windows developers; WSL 2 is there when you need Linux tooling or sandboxing.',
        },
        {
          type: 'paragraph',
          text: 'Install it, run <code>claude doctor</code> if anything looks wrong, and when one terminal stops being enough, you know where to find us.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Do I need WSL to run Claude Code on Windows?',
      answer: 'No. Claude Code supports Windows natively since 2025. WSL 2 is only needed if you want sandboxed command execution or your project depends on Linux tooling.',
    },
    {
      question: 'Do I need Git for Windows installed?',
      answer: 'No, it is optional. Without it Claude Code uses PowerShell as its shell. With it, Claude Code uses Git Bash, which handles bash-style commands better. Installing it is recommended.',
    },
    {
      question: 'How does Claude Code update on Windows?',
      answer: 'The native installer auto-updates in the background on startup. If you installed via WinGet, run "winget upgrade Anthropic.ClaudeCode" manually, or set CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1 to opt into auto-updates.',
    },
    {
      question: 'Does CodeAgentSwarm work on Windows?',
      answer: 'Yes. CodeAgentSwarm is available for Windows (x64 and ARM64) and macOS. It runs on top of your existing Claude Code install and lets you supervise several terminals in parallel.',
    },
    {
      question: 'Can I run OpenAI Codex CLI on Windows too?',
      answer: 'Yes. Codex CLI runs on Windows, and you can run it side by side with Claude Code inside CodeAgentSwarm. For a Codex-specific install and setup walkthrough, see <a href="/en/guides/codex-cli-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">how to run Codex CLI on Windows</a>.',
    },
  ],
}

export default guide
