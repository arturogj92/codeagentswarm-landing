import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-on-linux',
    locale: 'en',
    title: 'How to Install Antigravity CLI on Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'How to Install Antigravity CLI (agy) on Linux: Ubuntu, Debian, Fedora (2026)',
    metaDescription: 'Install Antigravity CLI on Linux in one line. Requirements, signing in over SSH or with an API key, common Linux errors like a locked keyring, and how to run several agy sessions at once.',
    intro: `Antigravity CLI runs natively on Linux. Open a terminal, run "curl -fsSL https://antigravity.google/cli/install.sh | bash", then type "agy" inside a project folder and sign in with your Google account. It is a single binary, so there is no Node.js or Python to install first.

In this guide we cover the requirements (the one that matters is your glibc version), what the installer does, signing in on a desktop, over SSH or with an API key, and the Linux errors people hit most often.

Once agy is running, we also show how to go from one terminal to several Antigravity sessions working in parallel on the same Linux machine.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Antigravity CLI terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'antigravity-cli-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Antigravity CLI on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer in any terminal. No sudo, no Node.js. When it finishes, open a new terminal, type <code>agy</code> in your project and sign in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official installer for macOS and Linux
curl -fsSL https://antigravity.google/cli/install.sh | bash

# Start it inside a project
cd ~/my-project
agy`,
        },
        {
          type: 'paragraph',
          text: 'This is the same command CodeAgentSwarm uses when it installs Antigravity for you on Linux. Every command in this guide comes from the <a href="https://antigravity.google/docs/getting-started?tab=cli" target="_blank" rel="noopener noreferrer" class="' + link + '">official Antigravity CLI getting started page</a> and its <a href="https://antigravity.google/docs/cli/install" target="_blank" rel="noopener noreferrer" class="' + link + '">install and auth guide</a>.',
        },
      ],
    },
    {
      id: 'requirements',
      title: 'Requirements',
      content: [
        {
          type: 'list',
          items: [
            'A 64-bit Linux on x64 or ARM64.',
            'glibc 2.28 or newer and glibcxx 3.4.25 or newer. Google gives Ubuntu 20, Debian 10, Fedora 36 and RHEL 8 as examples of distributions that meet it.',
            'Bash or Zsh, plus <code>curl</code> to run the installer.',
            'A Google account. Antigravity has a free tier, and paid Google AI plans raise the limits. For headless machines you can use a Gemini API key instead.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Check your glibc with <code>ldd --version</code>. The requirement is glibc, so musl-based distributions such as Alpine are not in the supported list.',
        },
      ],
    },
    {
      id: 'install',
      title: 'What the installer does',
      content: [
        {
          type: 'paragraph',
          text: 'The script downloads the <code>agy</code> binary to <code>~/.local/bin/agy</code> and adds that folder to the PATH in your shell profile. Nothing goes into system directories, which is why it needs no root. That is also why you should open a new terminal afterwards: the current one has not read the updated profile yet.',
        },
        {
          type: 'paragraph',
          text: 'agy updates itself in the background, so there is no apt or dnf package to upgrade. If you manage versions yourself, set <code>AGY_CLI_DISABLE_AUTO_UPDATE=true</code> in your environment to turn the updater off.',
        },
        {
          type: 'paragraph',
          text: 'Antigravity keeps its settings and conversations under <code>~/.gemini</code>, the same home Gemini CLI used. If you had Gemini CLI installed, the first launch offers to import your old config. The <a href="/en/guides/how-to-use-antigravity-cli" class="' + link + '">guide to using Antigravity CLI</a> covers that import and the everyday commands.',
        },
      ],
    },
    {
      id: 'first-run-and-login',
      title: 'First run and signing in (also over SSH)',
      content: [
        {
          type: 'list',
          items: [
            'Open a terminal in a project folder and type <code>agy</code>. The first launch asks for a color scheme and rendering mode and whether you trust the workspace.',
            'On a Linux desktop, agy stores your credentials in the system keyring through Secret Service (GNOME Keyring or KWallet). It either signs you in silently or opens your browser for the Google login.',
            'Over SSH, agy prints a sign-in URL. Open it in a browser on your own machine, then paste the code it gives you back into the terminal.',
            'On headless servers or in CI, export <code>GEMINI_API_KEY</code> and set <code>{"modelProvider": "gemini"}</code> in <code>~/.gemini/antigravity-cli/settings.json</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'To sign out, run <code>/logout</code> inside agy. It disconnects your account and removes the saved credentials.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Common Linux errors and how to fix them',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"bash: agy: command not found" after installing:</strong> <code>~/.local/bin</code> is not on your PATH yet. Open a new terminal, or add <code>export PATH="$HOME/.local/bin:$PATH"</code> to your <code>~/.bashrc</code> or <code>~/.zshrc</code> and reload it with <code>source</code>.',
            '<strong>"secret keyring is locked":</strong> GNOME Keyring or KWallet is locked or unreachable. Open it and enter its password, and on a headless or SSH session start a D-Bus session first with <code>export $(dbus-launch)</code>. On servers, the API key route above avoids the keyring entirely.',
            '<strong>"local pasteboard is empty or unreachable over SSH connection":</strong> plain SSH does not forward the clipboard. Use a terminal that supports it, such as Ghostty or iTerm2, and if you work inside tmux add <code>set -s set-clipboard on</code> to your tmux config.',
            '<strong>"another background updater process is already active (update.lock)":</strong> an earlier update crashed and left its lock behind. Delete it with <code>rm -f ~/.gemini/antigravity-cli/updater/update.lock</code> and check that you can write to <code>~/.local/bin</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, see the <a href="https://antigravity.google/docs/cli/troubleshooting" target="_blank" rel="noopener noreferrer" class="' + link + '">official Antigravity CLI troubleshooting page</a>.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Antigravity sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'One agy session already coordinates its own sub-agents for the task in front of it. But one terminal is still one task. When you want a feature in one project and a bug fix in another, you open more tabs in GNOME Terminal or tmux, and soon you lose track of which session finished, which one is waiting for approval and what each one changed.',
        },
        {
          type: 'image',
          alt: 'Several AI coding agent terminals running side by side in one CodeAgentSwarm window',
          src: '/images/guides/multi-terminal.png',
          caption: 'Several agent terminals side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It puts several Antigravity terminals side by side and adds desktop notifications when an agent finishes or needs input, searchable history across every session and a live diff of what each terminal changed. You can mix agy with Claude Code, Codex and other agents in the same window, and each session keeps using your own Google sign-in.',
        },
        {
          type: 'paragraph',
          text: 'Good next steps: <a href="/en/guides/run-multiple-antigravity-cli-sessions" class="' + link + '">run multiple Antigravity CLI sessions</a> and, if you also work on Windows, <a href="/en/guides/antigravity-cli-on-windows" class="' + link + '">Antigravity CLI on Windows</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Antigravity CLI is one curl command away. Check your glibc version, open a new terminal after installing, and sign in through the browser, the SSH code flow or an API key. When a single terminal stops being enough, CodeAgentSwarm lets you run several agy sessions at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Antigravity CLI work on Linux?',
      answer: 'Yes. Antigravity CLI runs natively on Linux, on x64 and ARM64. It needs glibc 2.28 or newer, which covers Ubuntu 20, Debian 10, Fedora 36, RHEL 8 and later releases.',
    },
    {
      question: 'How do I install Antigravity CLI on Ubuntu?',
      answer: 'Run "curl -fsSL https://antigravity.google/cli/install.sh | bash" in a terminal, open a new terminal and type "agy". The binary goes to ~/.local/bin/agy and updates itself, so you do not need sudo or a package repository.',
    },
    {
      question: 'Do I need Node.js or Python to run Antigravity CLI on Linux?',
      answer: 'No. Antigravity CLI is a single compiled binary. Unlike Gemini CLI, which was installed through npm, there is no runtime to set up first.',
    },
    {
      question: 'Can I use Antigravity CLI on a Linux server over SSH?',
      answer: 'Yes. Install it the same way and run "agy". Over SSH it prints a sign-in URL that you open in a browser on your own machine, then you paste the code back into the terminal. For fully headless use, set the GEMINI_API_KEY environment variable and choose the gemini model provider in ~/.gemini/antigravity-cli/settings.json.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It uses your existing Antigravity install and lets you run several agy sessions in parallel.',
    },
  ],
}

export default guide
