import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'opencode-on-linux',
    locale: 'en',
    title: 'How to Install OpenCode on Linux (Ubuntu, Debian, Fedora, Arch)',
    metaTitle: 'How to Install OpenCode on Linux: Ubuntu, Debian, Fedora, Arch (2026)',
    metaDescription: 'Install OpenCode on Linux with the official one-line script, npm, Homebrew or pacman. Requirements, connecting a provider over SSH, clipboard and PATH fixes, and running several OpenCode sessions at once.',
    intro: `OpenCode runs natively on Linux. Open a terminal, run "curl -fsSL https://opencode.ai/install | bash", then type "opencode" inside a project folder and connect a model provider with /connect. The script picks the right build for x64 or ARM64, including musl distributions like Alpine.

In this guide we cover the one-line install, the package manager alternatives (npm, Homebrew, pacman and the AUR), connecting a provider on a server with no browser, the Linux errors people hit most often, and where OpenCode keeps its files.

Once OpenCode is running, we also show how to go from one terminal to several OpenCode sessions working in parallel on the same Linux machine.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several OpenCode terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'opencode-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install OpenCode on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official install script in any terminal. No sudo and no Node.js. When it finishes, open a new terminal, type <code>opencode</code> in your project and run <code>/connect</code> to add a provider.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official install script (recommended)
curl -fsSL https://opencode.ai/install | bash

# Verify the install
opencode --version

# Start it inside a project
cd ~/my-project
opencode`,
        },
        {
          type: 'paragraph',
          text: 'The script detects your architecture (x64 or ARM64) and whether your system uses musl, downloads the matching binary and adds its folder to your PATH in your shell config. This is also the command CodeAgentSwarm uses when it installs OpenCode for you on Linux. Every command in this guide comes from the <a href="https://opencode.ai/docs" target="_blank" rel="noopener noreferrer" class="' + link + '">official OpenCode documentation</a>.',
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
            'A 64-bit Linux on x64 or ARM64. The script handles glibc distributions (Ubuntu, Debian, Fedora, Arch) and musl ones such as Alpine.',
            '<code>curl</code> and <code>tar</code> for the install script. Most distributions ship both.',
            'A modern terminal emulator. The docs name WezTerm, Alacritty, Ghostty and Kitty as examples.',
            'An account or API key with at least one model provider (Anthropic, OpenAI, Google, GitHub Copilot or another one). OpenCode does not lock you to a single vendor.',
            'On a desktop session, a clipboard tool: <code>xclip</code> or <code>xsel</code> on X11, or <code>wl-clipboard</code> on Wayland.',
          ],
        },
      ],
    },
    {
      id: 'package-managers',
      title: 'Other ways to install: npm, Homebrew, pacman',
      content: [
        {
          type: 'paragraph',
          text: 'If you prefer a package manager, OpenCode publishes several official options. Pick one and stick with it, so you do not end up with two copies on your PATH.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# npm (also works with bun, pnpm or yarn)
npm install -g opencode-ai

# Homebrew on Linux
brew install anomalyco/tap/opencode

# Arch Linux (stable)
sudo pacman -S opencode

# Arch Linux, latest from the AUR
paru -S opencode-bin`,
        },
        {
          type: 'paragraph',
          text: 'Want the binary somewhere specific? The script checks <code>$OPENCODE_INSTALL_DIR</code> first, then <code>$XDG_BIN_DIR</code>, then <code>$HOME/bin</code>, and falls back to <code>$HOME/.opencode/bin</code>. For example: <code>XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://opencode.ai/install | bash</code>. To update later, run <code>opencode upgrade</code>.',
        },
      ],
    },
    {
      id: 'first-run-and-login',
      title: 'First run and connecting a provider (also over SSH)',
      content: [
        {
          type: 'list',
          items: [
            'Open a terminal in a project folder and type <code>opencode</code>.',
            'Run <code>/connect</code>, search for your provider and enter an API key, or follow the browser sign-in for providers that offer it (such as ChatGPT Plus/Pro or GitHub Copilot).',
            'Run <code>/models</code> to pick a model, then <code>/init</code> so OpenCode analyses the project and writes an <code>AGENTS.md</code> file.',
          ],
        },
        {
          type: 'paragraph',
          text: 'On a server or over SSH, the simplest route is an API key: run <code>opencode auth login</code>, choose the provider and paste the key. Several providers also read their credentials from environment variables, which you can set in your shell profile. Everything you add is stored in <code>~/.local/share/opencode/auth.json</code>, and <code>opencode auth list</code> shows which providers are connected.',
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
            '<strong>"opencode: command not found" after installing:</strong> your shell has not reloaded its PATH yet. Open a new terminal, or add <code>export PATH=$HOME/.opencode/bin:$PATH</code> (or whichever folder the script printed) to your <code>~/.bashrc</code> or <code>~/.zshrc</code>.',
            '<strong>"Error: \'tar\' is required but not installed":</strong> minimal images and containers sometimes lack it. Install <code>tar</code> with your package manager and run the script again.',
            '<strong>Copy and paste do nothing:</strong> OpenCode needs a clipboard tool on Linux. Install <code>wl-clipboard</code> on Wayland, or <code>xclip</code> or <code>xsel</code> on X11.',
            '<strong>ProviderInitError or a broken config:</strong> remove <code>~/.local/share/opencode</code> and connect your provider again with <code>/connect</code>. This also deletes stored credentials.',
            '<strong>API call errors after an update:</strong> an old provider package may be cached. Run <code>rm -rf ~/.cache/opencode</code> and start OpenCode again.',
            '<strong>It will not start at all:</strong> run <code>opencode --print-logs</code> to see what fails, and make sure you are on the latest version with <code>opencode upgrade</code>. Log files live in <code>~/.local/share/opencode/log/</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, the <a href="https://opencode.ai/docs/troubleshooting/" target="_blank" rel="noopener noreferrer" class="' + link + '">official OpenCode troubleshooting page</a> covers logs, storage and the known fixes.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several OpenCode sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With OpenCode working, the next limit shows up quickly: one terminal is one task at a time. You give OpenCode a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for approval and what each one changed.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It puts several OpenCode terminals side by side and adds desktop notifications when an agent finishes or needs input, searchable history across every session and a live diff of what each terminal changed. You can also mix OpenCode with Claude Code, Codex and other agents in the same window.',
        },
        {
          type: 'paragraph',
          text: 'Good next steps: <a href="/en/guides/run-multiple-opencode-sessions" class="' + link + '">run multiple OpenCode sessions</a> and <a href="/en/guides/opencode-agent-swarm" class="' + link + '">build an OpenCode agent swarm</a>. Setting up other agents on the same machine? See <a href="/en/guides/claude-code-on-linux" class="' + link + '">Claude Code on Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, OpenCode is one curl command away, or one npm, brew or pacman install if you prefer a package manager. Connect a provider with <code>/connect</code> or <code>opencode auth login</code>, install a clipboard tool, and check the logs if anything fails. When a single terminal stops being enough, CodeAgentSwarm lets you run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does OpenCode work on Linux?',
      answer: 'Yes. OpenCode runs natively on Linux, on x64 and ARM64. The official install script also detects musl distributions such as Alpine, and there are official npm, Homebrew, pacman and AUR packages.',
    },
    {
      question: 'How do I install OpenCode on Ubuntu?',
      answer: 'Run "curl -fsSL https://opencode.ai/install | bash" in a terminal, open a new terminal and type "opencode". If you already use Node.js, "npm install -g opencode-ai" works too.',
    },
    {
      question: 'Do I need Node.js to run OpenCode on Linux?',
      answer: 'No. The install script, Homebrew and pacman install a standalone binary. Node.js is only needed if you choose the npm, bun, pnpm or yarn package.',
    },
    {
      question: 'Can I use OpenCode on a Linux server over SSH?',
      answer: 'Yes. Install it the same way, then run "opencode auth login" and paste an API key for your provider, which needs no browser. Credentials are saved in ~/.local/share/opencode/auth.json.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It works with OpenCode and lets you run several sessions in parallel.',
    },
  ],
}

export default guide
