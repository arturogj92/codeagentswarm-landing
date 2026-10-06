import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'muse-code-on-linux',
    locale: 'en',
    title: 'How to Install Muse Code (Meta) on Linux',
    metaTitle: 'How to Install Muse Code (Meta) on Linux: Setup, Login and Errors (2026)',
    metaDescription: 'Install Meta\'s Muse Code on Linux with the official one-line installer. Requirements, browser or API key login, SSH servers, common errors and how to run several Muse sessions at once.',
    intro: `Muse Code, Meta's coding agent for the terminal, runs on Linux. Open a terminal, run "curl -fsSL https://dev.meta.ai/install.sh | bash", then type "muse" inside a project folder and sign in with your Meta account or an API key.

In this guide we cover the install, what the installer changes on your system, logging in on a machine with no browser, the Linux sandbox and the errors you are most likely to hit.

Once Muse is working, we also show how to run several Muse sessions side by side on the same Linux machine, next to other agents like Claude Code or Codex.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64) and can install and launch Muse Code for you. Download it free and run several agent terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'muse',
    highlightedWords: ['Muse Code', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-10-05',
    alternateSlug: 'muse-code-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Muse Code on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer in any terminal. No sudo needed. When it finishes, open a new terminal, type <code>muse</code> in your project and sign in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official installer for macOS and Linux
curl -fsSL https://dev.meta.ai/install.sh | bash

# Verify the install
muse --version

# Start it inside a project
cd ~/my-project
muse`,
        },
        {
          type: 'paragraph',
          text: 'The official docs pipe the script to <code>sh</code>, but the script is written for Bash, so piping it to <code>bash</code> is the safer choice on Ubuntu and Debian, where <code>sh</code> is a different shell. It is also what CodeAgentSwarm runs when it installs Muse for you. The commands in this guide come from the <a href="https://dev.meta.ai/docs/muse-code" target="_blank" rel="noopener noreferrer" class="' + link + '">official Muse Code documentation</a>.',
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
            'A Linux machine with <code>curl</code> and <code>mktemp</code> available. The installer stops with "required command not found" if either is missing.',
            'Bash, Zsh or fish. The installer adds Muse to your PATH in the matching startup file.',
            'A Meta account for browser sign-in, or a Meta API key.',
            'A working sandbox helper. On Linux, Muse Code runs shell commands inside a bundled bubblewrap helper.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Meta\'s docs list the Linux features as the same as macOS, including voice input and session messaging between local sessions. Both are unavailable on Windows.',
        },
      ],
    },
    {
      id: 'what-the-installer-does',
      title: 'What the installer changes',
      content: [
        {
          type: 'paragraph',
          text: 'The script downloads the Muse launcher, checks its checksum and places it in <code>~/.local/bin/muse</code>. You can pick another folder with the <code>MUSE_INSTALL_DIR</code> environment variable.',
        },
        {
          type: 'paragraph',
          text: 'If <code>~/.local/bin</code> is not on your PATH yet, it appends one line to <code>~/.bashrc</code>, <code>~/.zshrc</code>, your fish config or <code>~/.profile</code>, depending on your shell. Set <code>MUSE_NO_MODIFY_PATH</code> if you prefer to edit your PATH yourself.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Install into a custom folder
curl -fsSL https://dev.meta.ai/install.sh | MUSE_INSTALL_DIR="$HOME/bin" bash`,
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
            'Open a terminal in a project folder and type <code>muse</code>.',
            'Muse asks whether you trust the workspace. Only say yes for folders you own.',
            'Choose browser sign-in to approve the session in your browser, or paste a Meta API key directly.',
            'Type <code>/login</code> inside a session to open the login options again, and run <code>muse logout</code> to clear the stored session and key.',
          ],
        },
        {
          type: 'paragraph',
          text: 'On a server or over SSH, where no browser can open, use an API key. Export <code>META_API_KEY</code> and it takes priority over any stored key or browser session. Meta Managed Account users must use an API key too, because browser sign-in is not available to them. Details are on the <a href="https://dev.meta.ai/docs/muse-code/auth" target="_blank" rel="noopener noreferrer" class="' + link + '">official authentication page</a>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Scripts and CI: no interactive UI
META_API_KEY="$MUSE_KEY" muse exec "Summarize the README"`,
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
            '<strong>"muse: command not found" after installing:</strong> the PATH change only applies to new shells. Open a new terminal, or run the <code>source</code> line the installer printed.',
            '<strong>"required command not found: curl" or "mktemp":</strong> install the missing tool with your package manager and run the installer again.',
            '<strong>Every shell command fails as an environment error:</strong> the bubblewrap sandbox helper is not working on this host. Meta notes that a musl build without the helper fails the same way.',
            '<strong>Muse cannot write to .git or .muse:</strong> this is expected. The sandbox gives write access to the workspace and a temp folder, keeps the rest of the filesystem read-only, and protects <code>.git</code>, <code>.muse</code> and <code>.agents</code>.',
            '<strong>The browser login went through but the wrong account is used:</strong> check whether <code>META_API_KEY</code> is set in your shell. It wins over the browser session.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The <a href="https://dev.meta.ai/docs/muse-code/permissions" target="_blank" rel="noopener noreferrer" class="' + link + '">permissions and safety reference</a> explains the sandbox limits in full.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Muse Code sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With Muse working, the next limit shows up quickly: one terminal is one task at a time. You give Muse a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for approval and what each one changed.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It can install and launch Muse Code on Linux, puts several agent terminals side by side and adds desktop notifications when an agent finishes or needs input, searchable history across every session and a live diff of what each terminal changed. You can run Muse next to Claude Code, Codex and other agents in the same window.',
        },
        {
          type: 'paragraph',
          text: 'Good next steps: <a href="/en/guides/how-to-use-muse-code" class="' + link + '">how to use Muse Code</a> for your first real task, and <a href="/en/guides/muse-code-models-pricing-privacy" class="' + link + '">Muse Code models, pricing and privacy</a> to understand billing before you run several sessions.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Muse Code is one curl command away. Use browser sign-in on a desktop and <code>META_API_KEY</code> on servers, and if shell commands fail, check the bubblewrap sandbox first. When one terminal stops being enough, CodeAgentSwarm lets you run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Muse Code work on Linux?',
      answer: 'Yes. Meta ships one installer for macOS and Linux, and its docs list full feature support on both, including voice input and session messaging.',
    },
    {
      question: 'How do I install Muse Code on Ubuntu or Fedora?',
      answer: 'Run "curl -fsSL https://dev.meta.ai/install.sh | bash" in a terminal, open a new terminal and type "muse". You need curl and Bash, which most distributions include.',
    },
    {
      question: 'Can I use Muse Code on a Linux server over SSH?',
      answer: 'Yes. Install it the same way and log in with a Meta API key instead of the browser. Set the META_API_KEY environment variable, or paste the key when Muse asks you to sign in. For scripts and CI, use "muse exec".',
    },
    {
      question: 'Why does every shell command fail inside Muse on Linux?',
      answer: 'Muse runs shell commands inside a bundled bubblewrap sandbox. If that helper cannot run on your host, Muse reports every shell command as an environment error. Fix the sandbox before changing permissions.',
    },
    {
      question: 'Does CodeAgentSwarm support Muse Code on Linux?',
      answer: 'CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It can install and launch Muse Code on Linux and run it next to Claude Code, Codex and other agents.',
    },
  ],
}

export default guide
