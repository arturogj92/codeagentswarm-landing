import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'devin-cli-on-linux',
    locale: 'en',
    title: 'How to Install Devin CLI on Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'Devin CLI on Linux: Install, Login over SSH and Fix Errors (2026)',
    metaDescription: 'Install Devin CLI on Linux with the official one-line script. Requirements, where it installs, login on a server over SSH, common errors and how to run several Devin sessions at once.',
    intro: `Devin CLI runs natively on Linux. Open a terminal, run "curl -fsSL https://cli.devin.ai/install.sh | bash", follow the setup wizard it opens at the end, then type "devin" inside a project folder. The installer supports x64 and ARM64 machines.

In this guide we cover the install, what it puts on your system, logging in on a server with no browser, the errors you are most likely to hit and how to check your setup.

Once Devin is working, we also show how to run several Devin sessions side by side on the same Linux machine, next to other agents like Claude Code or Codex.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free, install Devin CLI from the app and run several Devin terminals side by side with notifications, searchable history and live diffs.',
    ctaAgent: 'devin',
    highlightedWords: ['Devin CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'devin-cli-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Devin CLI on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer in any terminal. No sudo needed. It finishes by starting <code>devin setup</code>, a short wizard for login and MCP. Then open a new terminal and type <code>devin</code> in your project.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official installer for macOS, Linux and WSL
curl -fsSL https://cli.devin.ai/install.sh | bash

# Verify the install
devin --version

# Start it inside a project
cd ~/my-project
devin`,
        },
        {
          type: 'paragraph',
          text: 'The commands in this guide come from the <a href="https://docs.devin.ai/cli" target="_blank" rel="noopener noreferrer" class="' + link + '">official Devin CLI installation page</a> and the <a href="https://docs.devin.ai/cli/reference/commands" target="_blank" rel="noopener noreferrer" class="' + link + '">official command reference</a>.',
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
            'A 64-bit Linux on x64 (x86_64) or ARM64 (aarch64). The installer stops with "Unsupported platform" on any other architecture.',
            'Bash and <code>curl</code>, plus <code>tar</code> and <code>sha256sum</code> (or <code>shasum</code>). The installer uses them to download the release and check its checksum.',
            'A Devin account with CLI access. On Enterprise plans, your administrator has to give you a role with the "Use Devin CLI" permission.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cognition does not publish a list of supported distributions. The installer only checks the operating system and the architecture, so the same command works on Ubuntu, Debian, Fedora and WSL.',
        },
      ],
    },
    {
      id: 'what-gets-installed',
      title: 'What the installer puts on your system',
      content: [
        {
          type: 'table',
          headers: ['Item', 'Linux location'],
          rows: [
            ['Launcher', '<code>~/.local/bin/devin</code>'],
            ['Installed versions', '<code>~/.local/share/devin/cli/_versions</code>'],
            ['Login token', '<code>~/.local/share/devin/credentials.toml</code>'],
          ],
          caption: 'If XDG_DATA_HOME is set, the last two folders live under it instead of ~/.local/share.',
        },
        {
          type: 'paragraph',
          text: 'Everything stays in your home folder, which is why no sudo is needed. To update later, run <code>devin update</code>. Add <code>--force</code> to reinstall the current version.',
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
            'The installer starts <code>devin setup</code> when it finishes. It walks you through login and MCP configuration. You can run it again at any time.',
            'To log in on its own, run <code>devin auth login</code>. It opens the browser sign-in.',
            'On a server or over SSH, where no browser can open, run <code>devin auth login --force-manual-token-flow</code> and paste the token by hand. <code>devin setup --force-manual-token-flow</code> does the same inside the wizard.',
            'Check the result with <code>devin auth status</code>. <code>devin auth logout</code> removes the stored credentials.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The token in <code>credentials.toml</code> does not expire by default. Anyone who can read that file can use your account, so keep it out of backups you share and never commit it.',
        },
        {
          type: 'paragraph',
          text: 'Enterprise users pick "Log in with Devin for Enterprise" to sign in through their company identity provider. See the <a href="https://docs.devin.ai/cli/enterprise/devin-auth" target="_blank" rel="noopener noreferrer" class="' + link + '">official authentication page</a>.',
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
            '<strong>"devin: command not found" after installing:</strong> <code>~/.local/bin</code> is not on your PATH. Open a new terminal, or add <code>export PATH="$HOME/.local/bin:$PATH"</code> to your <code>~/.bashrc</code> or <code>~/.zshrc</code>.',
            '<strong>"Error: Unsupported platform":</strong> your machine is not x86_64 or aarch64. Check it with <code>uname -m</code>. 32-bit systems are not supported.',
            '<strong>"Cannot verify checksum (no sha256sum or shasum)":</strong> install coreutils (it provides <code>sha256sum</code>) from your package manager and run the installer again.',
            '<strong>"Failed to fetch manifest":</strong> the machine cannot reach Devin\'s download servers. Check your proxy or firewall and try again.',
            '<strong>Login never finishes over SSH:</strong> the browser flow cannot reach your server. Use <code>--force-manual-token-flow</code> as shown above.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, run <code>devin doctor</code>. It checks your local configuration and exits with an error if something is wrong.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Devin sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With Devin working, the next limit shows up quickly: one terminal runs one task at a time. You give Devin a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for you and what each one changed.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. On Linux it can install Devin CLI for you and launch it. It puts several agent terminals side by side, mixes Devin with Claude Code, Codex and other agents, and adds desktop notifications, searchable history across every session and a live diff of what each terminal changed.',
        },
        {
          type: 'paragraph',
          text: 'Next steps: <a href="/en/guides/how-to-use-devin-cli" class="' + link + '">how to use Devin CLI</a> for your first tasks, and <a href="/en/guides/devin-cli-mcp-history" class="' + link + '">Devin CLI MCP and history</a> to resume conversations and add tools.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Devin CLI is one curl command away and lives in your home folder. Use <code>--force-manual-token-flow</code> to log in over SSH, <code>devin doctor</code> when something looks off and <code>devin update</code> to stay current. When one terminal is not enough, CodeAgentSwarm lets you run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Devin CLI work on Linux?',
      answer: 'Yes. The official installer supports Linux on x64 and ARM64, and also works inside WSL. Cognition does not publish a list of supported distributions; the installer only checks the architecture.',
    },
    {
      question: 'How do I install Devin CLI on Ubuntu?',
      answer: 'Run "curl -fsSL https://cli.devin.ai/install.sh | bash" in a terminal, complete the setup wizard, open a new terminal and type "devin". The same command works on Debian, Fedora and other distributions.',
    },
    {
      question: 'Can I log in to Devin CLI on a server over SSH?',
      answer: 'Yes. Run "devin auth login --force-manual-token-flow" to skip the browser and paste the token by hand. Then check the result with "devin auth status".',
    },
    {
      question: 'How do I update Devin CLI on Linux?',
      answer: 'Run "devin update". It checks for a new version and installs it. Use "devin update --force" to reinstall the current version.',
    },
    {
      question: 'Does CodeAgentSwarm support Devin on Linux?',
      answer: 'CodeAgentSwarm runs on Linux as a .deb or an AppImage, on x64 and ARM64, and it can install and launch Devin CLI there. You can run several Devin sessions side by side and mix them with other agents.',
    },
  ],
}

export default guide
