import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-on-linux',
    locale: 'en',
    title: 'How to Install Grok Build on Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'How to Install Grok Build on Linux: Setup, Login and Fixes (2026)',
    metaDescription: 'Install xAI\'s Grok Build CLI on Linux in one line. Requirements, first login, signing in over SSH with a device code, common errors and how to run several Grok Build sessions at once.',
    intro: `Grok Build, xAI's coding agent for the terminal, runs natively on Linux. Open a terminal, run "curl -fsSL https://x.ai/cli/install.sh | bash", then type "grok" inside a project folder and sign in. The installer ships prebuilt binaries for x64 and ARM64 and needs no sudo and no Node.js.

In this guide we cover the one-line install, what the installer changes on your system, logging in on a server with no browser, and the errors people hit most often on Linux.

Once Grok Build is running, we also show how to go from one terminal to several Grok Build sessions working in parallel on the same Linux machine.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Grok Build terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'grok-build-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Grok Build on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer in any terminal. No sudo, no Node.js. When it finishes, open a new terminal, type <code>grok</code> in your project and sign in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official installer
curl -fsSL https://x.ai/cli/install.sh | bash

# Verify the install
grok --version

# Start it inside a project
cd ~/my-project
grok`,
        },
        {
          type: 'paragraph',
          text: 'Update later with <code>grok update</code>. The commands in this guide come from the <a href="https://docs.x.ai/build/overview" target="_blank" rel="noopener noreferrer" class="' + link + '">official Grok Build documentation</a> and the <a href="https://github.com/xai-org/grok-build" target="_blank" rel="noopener noreferrer" class="' + link + '">official grok-build repository</a>, which hosts the full user guide.',
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
            'A 64-bit Linux on x64 (x86_64) or ARM64 (aarch64). The installer stops on any other architecture.',
            '<code>curl</code> or <code>wget</code>, plus Bash to run the install script.',
            'A grok.com account for the browser login, or an xAI API key from <a href="https://console.x.ai" target="_blank" rel="noopener noreferrer" class="' + link + '">console.x.ai</a>.',
            'An internet connection.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You do not need Node.js or root. Grok Build is a native binary and the installer only writes inside your home folder. Plans and usage limits change often, so check the <a href="/en/guides/grok-build-pricing" class="' + link + '">Grok Build pricing and access guide</a> before rolling it out to a team.',
        },
      ],
    },
    {
      id: 'what-the-installer-does',
      title: 'What the installer changes on your system',
      content: [
        {
          type: 'list',
          items: [
            'It downloads the binary for your architecture and links it as <code>~/.grok/bin/grok</code>, plus an <code>agent</code> alias next to it.',
            'It adds <code>~/.grok/bin</code> to your PATH in <code>~/.bashrc</code>, <code>~/.zshrc</code> or your fish config, depending on your shell, and installs shell completions.',
            'If <code>~/.local/bin</code> or <code>/usr/local/bin</code> is already on your PATH and writable, it also creates a symlink there, so <code>grok</code> works right away.',
            'Config, credentials and sessions live under <code>~/.grok/</code>. Set <code>GROK_HOME</code> to move that folder somewhere else.',
          ],
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
            'Open a terminal in a project folder and type <code>grok</code>.',
            'Your browser opens so you can sign in with grok.com. Credentials are saved in <code>~/.grok/auth.json</code> and refresh on their own.',
            'On a server, over SSH or inside a container, run <code>grok login --device-auth</code>. It prints a URL and a code: open the URL on any other device, enter the code and Grok Build picks up the login.',
            'For CI or scripts, export <code>XAI_API_KEY</code> instead. Grok Build uses it when there is no active session token.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Headless login with a device code
grok login --device-auth

# Or use an API key
export XAI_API_KEY="xai-..."
grok`,
        },
        {
          type: 'paragraph',
          text: 'The <a href="https://github.com/xai-org/grok-build/blob/main/crates/codegen/xai-grok-pager/docs/user-guide/02-authentication.md" target="_blank" rel="noopener noreferrer" class="' + link + '">official authentication guide</a> also covers company SSO through OIDC and external auth scripts.',
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
            '<strong>"grok: command not found" after installing:</strong> your current shell has not read the new PATH yet. Open a new terminal, or run <code>export PATH="$HOME/.grok/bin:$PATH"</code>.',
            '<strong>"Either curl or wget is required but neither is installed":</strong> minimal images often ship without both. Install one with your package manager and run the installer again.',
            '<strong>"Unsupported architecture" or "Grok is not yet available for your system":</strong> there is no prebuilt binary for your machine. Only 64-bit x86_64 and aarch64 are published.',
            '<strong>"Authentication failed":</strong> run <code>grok logout</code> to clear cached credentials, then <code>grok login</code> (or <code>grok login --device-auth</code> over SSH).',
            '<strong>Broken copy and paste, colors or keys in tmux, over SSH or on Wayland:</strong> run <code>grok doctor</code> in your shell, or <code>/doctor</code> inside Grok Build. It checks your terminal, multiplexer and clipboard and lists the available fixes.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Need more detail? Run <code>GROK_LOG_FILE=/tmp/grok.log RUST_LOG=debug grok</code> and read the log with <code>tail -f /tmp/grok.log</code>.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Grok Build sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With Grok Build working, the next limit shows up quickly: one terminal is one task at a time. You hand Grok a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for approval and what each one changed.',
        },
        {
          type: 'image',
          alt: 'Several AI coding agent terminals running side by side in one CodeAgentSwarm window',
          src: '/images/guides/multi-terminal.png',
          caption: 'Several agent terminals side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It is a free download. Pick Grok Build in any terminal and run it next to Claude Code, Codex and other agents, with desktop notifications when an agent finishes or needs input, searchable history across every session and a live diff of what each terminal changed.',
        },
        {
          type: 'paragraph',
          text: 'Good next steps: <a href="/en/guides/how-to-use-grok-build" class="' + link + '">how to use Grok Build</a> for the commands you will use every day, and <a href="/en/guides/grok-build-headless-ci" class="' + link + '">Grok Build in headless mode and CI</a> if your Linux box is a build server.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Grok Build is one curl command away, and <code>grok login --device-auth</code> covers servers without a browser. Run <code>grok doctor</code> if anything looks off. When a single terminal stops being enough, CodeAgentSwarm lets you run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Grok Build work on Linux?',
      answer: 'Yes. xAI publishes prebuilt Grok Build binaries for Linux on x64 and ARM64. You install them with the official script at x.ai/cli/install.sh.',
    },
    {
      question: 'How do I install Grok Build on Ubuntu?',
      answer: 'Run "curl -fsSL https://x.ai/cli/install.sh | bash" in a terminal, open a new terminal and type "grok". The same command works on Debian, Fedora and other distributions.',
    },
    {
      question: 'How do I log in to Grok Build over SSH?',
      answer: 'Run "grok login --device-auth" on the server. It prints a URL and a code; open the URL on any other device and enter the code. For scripts and CI you can set the XAI_API_KEY environment variable instead.',
    },
    {
      question: 'Do I need sudo or Node.js to install Grok Build on Linux?',
      answer: 'No. Grok Build is a native binary and the installer puts it in ~/.grok/bin inside your home folder, so it needs neither root nor Node.js.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It uses your existing Grok Build install and lets you run several sessions in parallel.',
    },
  ],
}

export default guide
