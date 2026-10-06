import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-on-linux',
    locale: 'en',
    title: 'How to Install Kimi Code on Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'How to Install Kimi Code on Linux: Install, Login and Fixes (2026)',
    metaDescription: 'Install Kimi Code on Linux with the official one-line script or npm. Requirements, x64 and ARM64 support, login over SSH, the Alpine catch, common errors and how to run several Kimi Code sessions at once.',
    intro: `Kimi Code runs on Linux with one command. Open a terminal, run "curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash", open a new terminal, type "kimi" inside a project folder and log in with /login. The installer ships native builds for x64 and ARM64 and needs no Node.js.

In this guide we cover the one-line install, the npm alternative (and the one case where you need it), logging in on a server with no browser, the errors people hit most often, and where your Kimi Code data lives on disk.

Once Kimi Code is running, we also show how to go from one terminal to several Kimi Code sessions working in parallel on the same Linux machine.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Kimi Code terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'kimi-code-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Kimi Code on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official install script in any terminal. No sudo, no Node.js. When it finishes, open a new terminal, type <code>kimi</code> in your project and run <code>/login</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official install script (recommended)
curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash

# Open a new terminal, then verify the install
kimi --version

# Start it inside a project
cd ~/my-project
kimi`,
        },
        {
          type: 'paragraph',
          text: 'The script downloads the latest release for your architecture, verifies its checksum, installs it under <code>~/.kimi-code/bin</code> and adds that folder to your PATH in <code>~/.bashrc</code>, <code>~/.zshrc</code> or your fish config. The install and login steps in this guide come from the <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/guides/getting-started" target="_blank" rel="noopener noreferrer" class="' + link + '">official Kimi Code getting started guide</a>.',
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
            'A 64-bit Linux on x64 or ARM64 with glibc. That covers Ubuntu, Debian, Fedora and most mainstream distros.',
            '<code>curl</code> or <code>wget</code> to download, and <code>sha256sum</code> (or <code>shasum</code>) so the script can verify the download.',
            'Bash, Zsh or fish.',
            'A Kimi account for subscription plans, or an API key from the Kimi platform if you pay per token.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You only need Node.js 22.19.0 or later if you install through npm instead of the script. The script installs a standalone binary.',
        },
      ],
    },
    {
      id: 'npm-install',
      title: 'Install with npm (and the Alpine case)',
      content: [
        {
          type: 'paragraph',
          text: 'If you already manage your CLI tools with Node, Kimi Code is on npm as <code>@moonshot-ai/kimi-code</code>. Careful with the name: the PyPI package called <code>kimi-code</code> installs the legacy Python kimi-cli, not this one.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Needs Node.js 22.19.0 or later
node --version

npm install -g @moonshot-ai/kimi-code
# or
pnpm add -g @moonshot-ai/kimi-code`,
        },
        {
          type: 'paragraph',
          text: 'On Alpine and other musl distributions npm is the only route: the install script only ships glibc builds and stops early on musl. Updates work the same either way: run <code>kimi upgrade</code>, or <code>npm install -g @moonshot-ai/kimi-code@latest</code> if you used npm.',
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
            'Open a terminal in a project folder and type <code>kimi</code>.',
            'Inside the session, run <code>/login</code> and choose how to sign in.',
            '<strong>Kimi account:</strong> a device code flow. Kimi Code shows a link and a code; open the link on any device, sign in and enter the code. Because the browser does not have to be on the same machine, this also works on a server over SSH.',
            '<strong>API key:</strong> paste a key from <code>platform.kimi.com</code> or <code>platform.kimi.ai</code> if you pay per token.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Kimi Code keeps its data in <code>~/.kimi-code/</code>: settings in <code>config.toml</code>, OAuth tokens in <code>credentials/</code>, sessions in <code>sessions/</code> and a diagnostic log in <code>logs/kimi-code.log</code>. Set <code>KIMI_CODE_HOME</code> to move all of it somewhere else, and run <code>/logout</code> to clear your credentials. The <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/configuration/data-locations.html" target="_blank" rel="noopener noreferrer" class="' + link + '">data locations reference</a> lists every file.',
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
            '<strong>"kimi: command not found" after installing:</strong> your shell has not read the new PATH yet. Open a new terminal, or check that your shell config has the line <code>export PATH="$HOME/.kimi-code/bin:$PATH"</code>.',
            '<strong>"Alpine / musl Linux is not currently supported":</strong> the script only ships glibc builds. Install Node.js 22.19 or later and use <code>npm install -g @moonshot-ai/kimi-code</code>.',
            '<strong>"curl or wget is required" or "shasum or sha256sum required to verify download":</strong> common on minimal containers. Install curl and coreutils with your package manager and run the script again.',
            '<strong>"unsupported architecture":</strong> the script only covers x64 and ARM64. On anything else, try the npm package.',
            '<strong><code>kimi --version</code> prints 1.4x:</strong> you are running the legacy Python kimi-cli. Kimi Code prints a 0.x version. The install script renames an old <code>kimi</code> shim to <code>kimi-legacy</code> so the new one wins.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If a session misbehaves later, <code>~/.kimi-code/logs/kimi-code.log</code> is the first place to look. For the flags and commands you will use day to day, see <a href="/en/guides/how-to-use-kimi-code" class="' + link + '">how to use Kimi Code</a>.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Kimi Code sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With Kimi Code working, the next limit shows up quickly: one terminal is one task at a time. You give Kimi a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for approval and what each one changed.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It puts several Kimi Code terminals side by side and adds desktop notifications when an agent finishes or needs input, searchable history across every session and a live diff of what each terminal changed. You can also mix agents, with Kimi Code in one terminal and Claude Code or Codex in the next.',
        },
        {
          type: 'paragraph',
          text: 'Good next step: <a href="/en/guides/run-multiple-kimi-code-sessions" class="' + link + '">run multiple Kimi Code sessions</a>. Setting up Claude Code on the same machine? See <a href="/en/guides/claude-code-on-linux" class="' + link + '">Claude Code on Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Kimi Code is one curl command away, or one npm install if you are on Alpine or prefer Node. Log in with <code>/login</code>, which works over SSH too, and check <code>~/.kimi-code/logs</code> if anything looks off. When a single terminal stops being enough, CodeAgentSwarm lets you run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Kimi Code work on Linux?',
      answer: 'Yes. The official install script supports Linux on x64 and ARM64 with glibc, which covers Ubuntu, Debian, Fedora and most mainstream distros. On Alpine and other musl distros, install it with npm instead.',
    },
    {
      question: 'How do I install Kimi Code on Ubuntu?',
      answer: 'Run "curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash" in a terminal, open a new terminal and type "kimi". If you prefer npm, run "npm install -g @moonshot-ai/kimi-code" with Node.js 22.19 or later. Update later with "kimi upgrade".',
    },
    {
      question: 'Do I need Node.js to run Kimi Code on Linux?',
      answer: 'No. The install script puts a standalone binary in ~/.kimi-code/bin. You only need Node.js 22.19.0 or later if you choose the npm package, which is also the route for Alpine.',
    },
    {
      question: 'Can I log in to Kimi Code on a Linux server over SSH?',
      answer: 'Yes. Run "kimi", then "/login" and pick the Kimi account option. It uses a device code flow: open the link on any device, sign in and enter the code. You can also paste an API key from the Kimi platform instead.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It uses your existing Kimi Code install and lets you run several sessions in parallel, next to Claude Code, Codex and other agents.',
    },
  ],
}

export default guide
