import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-on-linux',
    locale: 'en',
    title: 'How to Install Claude Code on Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'How to Install Claude Code on Linux: Ubuntu, Debian, Fedora (2026)',
    metaDescription: 'Install Claude Code on Linux in one line, or from the official apt, dnf and apk repositories. Requirements, login over SSH, common errors and how to run several Claude Code sessions at once.',
    intro: `Claude Code runs natively on Linux. Open a terminal, run "curl -fsSL https://claude.ai/install.sh | bash", then type "claude" inside a project folder and log in. It works on x64 and ARM64, and Anthropic officially supports Ubuntu 20.04+, Debian 10+ and Alpine 3.19+, with signed package repositories for Debian, Ubuntu, Fedora, RHEL and Alpine.

In this guide we cover the one-line install, the apt and dnf repositories (and when to prefer them), logging in on a server with no browser, the errors people hit most often, and where the official Claude desktop app for Linux fits in.

Once Claude Code is running, we also show how to go from one terminal to several Claude Code sessions working in parallel on the same Linux machine.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Claude Code terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'claude-code-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Claude Code on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer in any terminal. No sudo, no Node.js. When it finishes, open a new terminal, type <code>claude</code> in your project and log in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official native installer (recommended)
curl -fsSL https://claude.ai/install.sh | bash

# Verify the install
claude --version

# Start it inside a project
cd ~/my-project
claude`,
        },
        {
          type: 'paragraph',
          text: 'The installer puts the launcher in <code>~/.local/bin/claude</code> and keeps itself updated in the background. Every command in this guide comes from the <a href="https://code.claude.com/docs/en/setup" target="_blank" rel="noopener noreferrer" class="' + link + '">official Claude Code setup documentation</a>.',
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
            'A 64-bit Linux on x64 or ARM64. Officially supported: Ubuntu 20.04+, Debian 10+ and Alpine Linux 3.19+. Fedora and RHEL get an official dnf repository.',
            'At least 4 GB of RAM and an internet connection.',
            'Bash or Zsh.',
            'A Claude Pro, Max, Team, Enterprise or Console account. The free claude.ai plan does not include Claude Code.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You do not need Node.js. The npm package still exists, but it only downloads the same native binary, so the one-line installer is simpler.',
        },
      ],
    },
    {
      id: 'package-managers',
      title: 'Install with apt or dnf (official repositories)',
      content: [
        {
          type: 'paragraph',
          text: 'If you prefer updates to arrive with the rest of your system, Anthropic publishes signed repositories. The trade-off: package manager installs do not auto-update; you upgrade them like any other package.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ubuntu and Debian (apt)',
          id: 'apt',
        },
        {
          type: 'code',
          language: 'bash',
          code: `sudo apt install curl gnupg
sudo install -d -m 0755 /etc/apt/keyrings
sudo curl -fsSL https://downloads.claude.ai/keys/claude-code.asc \\
  -o /etc/apt/keyrings/claude-code.asc
echo "deb [signed-by=/etc/apt/keyrings/claude-code.asc] https://downloads.claude.ai/claude-code/apt/stable stable main" \\
  | sudo tee /etc/apt/sources.list.d/claude-code.list
sudo apt update
sudo apt install claude-code

# Later: sudo apt update && sudo apt upgrade claude-code`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Fedora and RHEL (dnf)',
          id: 'dnf',
        },
        {
          type: 'code',
          language: 'bash',
          code: `sudo tee /etc/yum.repos.d/claude-code.repo <<'EOF'
[claude-code]
name=Claude Code
baseurl=https://downloads.claude.ai/claude-code/rpm/stable
enabled=1
gpgcheck=1
gpgkey=https://downloads.claude.ai/keys/claude-code.asc
EOF
sudo dnf install claude-code

# Later: sudo dnf upgrade claude-code`,
        },
        {
          type: 'paragraph',
          text: 'Both commands use the <code>stable</code> channel, which is usually about a week behind and skips releases with major regressions. Alpine has an apk repository too; on Alpine you also need <code>bash</code>, <code>curl</code>, <code>libgcc</code>, <code>libstdc++</code> and <code>ripgrep</code> installed first.',
        },
      ],
    },
    {
      id: 'first-run-and-login',
      title: 'First run and logging in (also over SSH)',
      content: [
        {
          type: 'list',
          items: [
            'Open a terminal in a project folder and type <code>claude</code>.',
            'Your browser opens with the Anthropic login. Sign in with your Claude account.',
            'On a server or over SSH, where no browser can open, press <code>c</code> to copy the login URL and open it on any other device.',
            'If the <code>ANTHROPIC_API_KEY</code> environment variable is set, Claude Code asks you once to approve the key instead of opening a browser.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If something looks wrong afterwards, <code>claude doctor</code> prints a read-only report of your install, your settings and the last update attempt.',
        },
      ],
    },
    {
      id: 'claude-desktop-on-linux',
      title: 'What about the Claude desktop app on Linux?',
      content: [
        {
          type: 'paragraph',
          text: 'Anthropic now ships a <a href="https://code.claude.com/docs/en/desktop-linux" target="_blank" rel="noopener noreferrer" class="' + link + '">Claude desktop app for Linux</a> in beta, for Ubuntu 22.04+ and Debian 12+ on x64 and ARM64, and it includes Claude Code. If you want the official graphical app for one Claude conversation at a time, that is the place to start.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm solves a different problem: running several terminal agents at once and keeping track of them. It works with the Claude Code CLI you just installed, mixes it with Codex and other agents in the same window, and ships as an AppImage too, so it also runs on Fedora and most other distributions.',
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
            '<strong>"claude: command not found" after installing:</strong> <code>~/.local/bin</code> is not on your PATH yet. Open a new terminal, or add <code>export PATH="$HOME/.local/bin:$PATH"</code> to your <code>~/.bashrc</code> or <code>~/.zshrc</code>.',
            '<strong>"NO_PUBKEY BAA929FF1A7ECACE" on apt update:</strong> the signing key did not download. Check that your network reaches <code>downloads.claude.ai</code> and run the key download again.',
            '<strong>"not found" when running the installer on Alpine:</strong> Alpine has no <code>bash</code> or <code>curl</code> by default. Install them with <code>apk add bash curl libgcc libstdc++ ripgrep</code>.',
            '<strong>Search inside Claude Code fails:</strong> Claude Code relies on ripgrep. On musl distributions install it from your package manager and set <code>USE_BUILTIN_RIPGREP=0</code>.',
            '<strong>Permission errors with npm:</strong> never use <code>sudo npm install -g</code>. Switch to the native installer, which needs no root.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, the <a href="https://code.claude.com/docs/en/troubleshoot-install" target="_blank" rel="noopener noreferrer" class="' + link + '">official install troubleshooting page</a> lists every known error with its fix.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Claude Code sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With Claude Code working, the next limit shows up quickly: one terminal is one task at a time. You hand Claude a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for permission and what each one changed.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It puts several Claude Code terminals side by side and adds desktop notifications when an agent finishes or needs input, searchable history across every session and a live diff of what each terminal changed.',
        },
        {
          type: 'paragraph',
          text: 'Good next steps: <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="' + link + '">how to use multiple Claude Code terminals</a> and <a href="/en/guides/run-multiple-claude-code-sessions" class="' + link + '">run multiple Claude Code sessions</a>. Setting up Codex on the same machine? See <a href="/en/guides/codex-cli-on-linux" class="' + link + '">Codex CLI on Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Claude Code is one curl command away, or one apt or dnf install if you want your system to manage it. Run <code>claude doctor</code> if anything looks off, and when a single terminal stops being enough, CodeAgentSwarm is there to run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Claude Code work on Linux?',
      answer: 'Yes. Claude Code runs natively on Linux, on x64 and ARM64. Anthropic officially supports Ubuntu 20.04+, Debian 10+ and Alpine 3.19+, and publishes signed apt, dnf and apk repositories, which cover Fedora and RHEL too.',
    },
    {
      question: 'How do I install Claude Code on Ubuntu?',
      answer: 'Run "curl -fsSL https://claude.ai/install.sh | bash" in a terminal, open a new terminal and type "claude". If you prefer apt, add the official Claude Code repository and run "sudo apt install claude-code". The apt version does not auto-update.',
    },
    {
      question: 'Do I need Node.js to run Claude Code on Linux?',
      answer: 'No. The native installer and the apt, dnf and apk packages install a standalone binary. Node.js is only involved if you choose the npm package, and even then the binary it installs does not use Node at runtime.',
    },
    {
      question: 'Can I use Claude Code on a Linux server over SSH?',
      answer: 'Yes. Install it the same way, run "claude", and when it asks you to log in, press "c" to copy the login URL and open it in a browser on any other device. You can also use an API key through the ANTHROPIC_API_KEY environment variable.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It uses your existing Claude Code install and lets you run several sessions in parallel.',
    },
  ],
}

export default guide
