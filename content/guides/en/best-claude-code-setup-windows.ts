import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'best-claude-code-setup-windows',
    locale: 'en',
    title: 'The Best Claude Code Setup for Windows: Terminal, Shell and Workflow',
    metaTitle: 'Best Claude Code Setup for Windows (2026): Terminal, Git Bash & Multi-Session Workflow',
    metaDescription: 'The Windows setup that makes Claude Code actually pleasant: Windows Terminal, Git Bash as shell, auto-updates, when to add WSL 2, and how to scale to multiple parallel sessions.',
    intro: `The short version: install Claude Code natively, use Windows Terminal, and install Git for Windows so Claude uses Git Bash as its shell instead of PowerShell. That combination removes most of the friction people associate with Claude Code on Windows.

This guide goes through each piece of that setup and why it matters: terminal choice, shell configuration, update channels, when WSL 2 earns its place, and what to do when one Claude Code session is no longer enough.

It assumes you already have Claude Code installed. If not, start with our guide on <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">how to install Claude Code on Windows</a> and come back.`,
    ctaText: 'Ready to scale past one terminal? Download CodeAgentSwarm for Windows free and run up to 6 supervised Claude Code sessions in parallel.',
    highlightedWords: ['Claude Code', 'Windows'],
    publishedAt: '2026-06-12',
    updatedAt: '2026-06-12',
    alternateSlug: 'mejor-setup-claude-code-windows',
  },
  sections: [
    {
      id: 'recommended-stack',
      title: 'The recommended stack at a glance',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: <strong>Windows Terminal + native Claude Code install + Git for Windows (Git Bash as shell)</strong>. Add WSL 2 only if you need Linux tooling or sandboxed command execution. Add CodeAgentSwarm when you want several sessions running in parallel.',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal:</strong> Windows Terminal (free, in the Microsoft Store) with PowerShell 7 or Git Bash profiles.',
            '<strong>Claude Code install:</strong> native installer, which auto-updates in the background.',
            '<strong>Shell for Claude:</strong> Git Bash via Git for Windows, for much better compatibility with bash-style commands.',
            '<strong>Optional:</strong> WSL 2 for Linux-first projects or sandboxing.',
            '<strong>Scaling up:</strong> CodeAgentSwarm to supervise multiple sessions at once.',
          ],
        },
      ],
    },
    {
      id: 'terminal-choice',
      title: 'Pick the right terminal: Windows Terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code works in plain PowerShell, CMD, Git Bash and WSL shells. But the terminal application you run those shells in matters for day-to-day comfort, and on Windows the clear winner is Windows Terminal: tabs, panes, proper Unicode rendering and sane copy-paste.',
        },
        {
          type: 'list',
          items: [
            'Install Windows Terminal from the Microsoft Store if you do not have it.',
            'If you want a newer shell, install PowerShell 7+ from aka.ms/powershell; Claude Code works fine with the built-in Windows PowerShell too.',
            'Add a Git Bash profile to Windows Terminal once you install Git for Windows, so you can choose per tab.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Not sure which shell you are in? If the prompt starts with <code>PS C:\\...</code> you are in PowerShell. If it is just <code>C:\\...</code> you are in CMD.',
        },
      ],
    },
    {
      id: 'git-bash-shell',
      title: 'Install Git for Windows and let Claude use Git Bash',
      content: [
        {
          type: 'paragraph',
          text: 'This is the single highest-impact tweak in this guide. Without Git for Windows, Claude Code uses PowerShell to execute the commands it runs while working on your code. That works, but a huge share of developer tooling, scripts and one-liners assume a bash-like shell. With Git for Windows installed, Claude Code automatically uses Git Bash instead, and far fewer commands need translating or fail in odd ways.',
        },
        {
          type: 'list',
          items: [
            'Download Git for Windows from git-scm.com and install it with the default options.',
            'Restart your terminal. Claude Code detects Git Bash automatically.',
            'You also get git itself, which Claude Code needs for anything version-control related anyway.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If Claude Code does not pick up Git Bash (for example with a custom Git install path), point it there explicitly in your settings.json:',
        },
        {
          type: 'code',
          language: 'json',
          code: `{
  "env": {
    "CLAUDE_CODE_GIT_BASH_PATH": "C:\\\\Program Files\\\\Git\\\\bin\\\\bash.exe"
  }
}`,
        },
      ],
    },
    {
      id: 'updates-and-channels',
      title: 'Keep it updated (and pick a release channel)',
      content: [
        {
          type: 'list',
          items: [
            'If you used the native installer, you are done: it auto-updates in the background and applies the update on next launch.',
            'If you installed via WinGet, updates are manual (<code>winget upgrade Anthropic.ClaudeCode</code>), or set <code>CLAUDE_CODE_PACKAGE_MANAGER_AUTO_UPDATE=1</code> to opt into auto-updates.',
            'Claude Code ships fast. If you prefer fewer surprises over day-one features, switch the release channel from "latest" to "stable" in your settings; stable lags about a week and skips major regressions.',
          ],
        },
      ],
    },
    {
      id: 'when-wsl2',
      title: 'When WSL 2 earns a place in your setup',
      content: [
        {
          type: 'paragraph',
          text: 'For most Windows-native work you do not need WSL at all. Two cases justify it:',
        },
        {
          type: 'list',
          items: [
            '<strong>Linux-first projects:</strong> if your stack assumes Linux (Docker-heavy backends, deployment scripts, Makefiles full of Linux-isms), run Claude Code inside WSL 2 where the project actually behaves like production.',
            '<strong>Sandboxing:</strong> Claude Code\'s sandboxed command execution works on WSL 2 only. Native Windows and WSL 1 do not support it. If you want stronger isolation when letting Claude run commands freely, WSL 2 is the way.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Native and WSL installs coexist fine on the same machine, so you can keep native as your default and use WSL 2 for the projects that need it. More detail in our guide on <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">running Claude Code on Windows</a>.',
        },
      ],
    },
    {
      id: 'project-hygiene',
      title: 'Project hygiene: CLAUDE.md and permissions',
      content: [
        {
          type: 'paragraph',
          text: 'Two habits make every Claude Code session noticeably better, on any OS:',
        },
        {
          type: 'list',
          items: [
            '<strong>Keep a CLAUDE.md in your repo.</strong> Run <code>/init</code> once in a project and Claude generates one: build commands, conventions, structure. Every future session starts with that context for free.',
            '<strong>Tune permissions instead of approving everything by hand.</strong> Allow the safe, repetitive commands (your test runner, your linter) and keep confirmation for the destructive ones. If you are tempted to just turn everything off, read our guide on <a href="/en/guides/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">using YOLO / Turbo mode safely</a> first.',
          ],
        },
      ],
    },
    {
      id: 'multi-session-workflow',
      title: 'The real upgrade: from one session to several',
      content: [
        {
          type: 'paragraph',
          text: 'Once your single-terminal setup is smooth, the bottleneck becomes Claude itself: while it works, you wait. The developers getting the most out of Claude Code on Windows run several sessions in parallel: one fixing a bug, one writing tests, one on a refactor.',
        },
        {
          type: 'paragraph',
          text: 'You can do that with raw Windows Terminal tabs, but you lose visibility fast: no notification when an agent finishes, no overview of what each one changed, history scattered per session.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> is a Windows (and macOS) desktop app built exactly for this: up to 6 Claude Code terminals side by side, desktop notifications when an agent finishes or needs input, searchable history across all sessions, live per-terminal diffs and a kanban board the agents themselves keep updated. It runs on top of your existing Claude Code install, so everything in this guide still applies.',
        },
        {
          type: 'paragraph',
          text: 'To plan that workflow, see <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use multiple Claude Code terminals</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'A good Claude Code setup on Windows is not complicated: Windows Terminal for comfort, the native installer for zero-maintenance updates, Git Bash so commands just work, WSL 2 only when the project demands it, and a multi-session tool when one terminal stops being enough.',
        },
        {
          type: 'paragraph',
          text: 'Set it up once and Claude Code on Windows feels every bit as smooth as on a Mac.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Should I use PowerShell or Git Bash with Claude Code?',
      answer: 'Install Git for Windows and let Claude Code use Git Bash: bash-style commands, which most developer tooling assumes, work much more reliably. PowerShell remains a perfectly valid fallback.',
    },
    {
      question: 'Is WSL 2 faster than native Claude Code on Windows?',
      answer: 'Not as a rule. For Windows-native projects, native Claude Code is simpler and avoids filesystem boundary overhead. WSL 2 wins when the project itself is Linux-first or when you need sandboxed execution.',
    },
    {
      question: 'Can I run several Claude Code sessions at once on Windows?',
      answer: 'Yes. Each terminal runs its own independent session. Plain terminal tabs work but offer no supervision; CodeAgentSwarm for Windows gives you up to 6 sessions with notifications, history and live diffs.',
    },
    {
      question: 'Does this setup need admin rights?',
      answer: 'No. The native Claude Code installer, Windows Terminal and Git for Windows all install per-user without administrator permissions.',
    },
  ],
}

export default guide
