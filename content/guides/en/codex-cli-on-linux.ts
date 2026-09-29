import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'codex-cli-on-linux',
    locale: 'en',
    title: 'How to Install and Run Codex CLI on Linux',
    metaTitle: 'How to Install OpenAI Codex CLI on Linux (Ubuntu, Fedora) - 2026',
    metaDescription: 'Install OpenAI Codex CLI on Linux with the official script or npm, sign in over SSH with device auth, fix the usual PATH and npm errors, and run several Codex sessions in parallel.',
    intro: `Codex CLI runs natively on Linux. The quickest path is OpenAI's install script: run "curl -fsSL https://chatgpt.com/codex/install.sh | sh", then type "codex" in a project folder and sign in with your ChatGPT account or an API key. If you already use Node.js, "npm install -g @openai/codex" works just as well.

In this guide we cover both install methods, signing in on a server with no browser, the errors that come up most on Linux, and how the new ChatGPT desktop app for Linux compares.

Once Codex is running, we also show how to run several Codex sessions in parallel on the same Linux machine without losing track of them.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Codex CLI terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'codex-cli-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Codex CLI on Linux',
      content: [
        {
          type: 'image',
          alt: 'Multiple OpenAI Codex CLI terminals running in parallel in a single CodeAgentSwarm workspace',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'Several Codex CLI sessions side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official install script, open a new terminal, then run <code>codex</code> inside a project and pick how to sign in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official install script (no Node.js needed)
curl -fsSL https://chatgpt.com/codex/install.sh | sh

# Or with npm, if you already have Node.js
npm install -g @openai/codex

# Verify and start
codex --version
cd ~/my-project
codex`,
        },
        {
          type: 'paragraph',
          text: 'Codex is also available through Homebrew on Linux and as prebuilt binaries. Install options change from time to time, so check the <a href="https://developers.openai.com/codex/cli" target="_blank" rel="noopener noreferrer" class="' + link + '">official Codex CLI docs</a> for the current list.',
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
            'A 64-bit Linux on x64 or ARM64. Ubuntu, Debian and Fedora all work.',
            'Node.js only if you install through npm. The install script and the binaries do not need it.',
            'A ChatGPT plan that includes Codex, or an OpenAI API key.',
            'Git is strongly recommended: work inside a repository so every change Codex makes is easy to review and undo.',
          ],
        },
      ],
    },
    {
      id: 'sign-in',
      title: 'Signing in, including over SSH',
      content: [
        {
          type: 'paragraph',
          text: 'The first time you run <code>codex</code> it asks how to sign in: with your ChatGPT account or with an API key. On a desktop, choosing ChatGPT opens the browser and returns to the terminal on its own.',
        },
        {
          type: 'paragraph',
          text: 'On a server, a container or an SSH session, the browser callback cannot reach the CLI. Use device authentication instead:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex login --device-auth',
        },
        {
          type: 'paragraph',
          text: 'Open the link it prints on any device, sign in, and type the one-time code. Some ChatGPT workspaces must enable device code login in their security settings first. If it is not available, the <a href="https://developers.openai.com/codex/auth" target="_blank" rel="noopener noreferrer" class="' + link + '">authentication docs</a> list the fallbacks.',
        },
      ],
    },
    {
      id: 'chatgpt-desktop-on-linux',
      title: 'What about the ChatGPT desktop app on Linux?',
      content: [
        {
          type: 'paragraph',
          text: 'OpenAI has released its ChatGPT desktop app for Linux as a preview, and it includes Codex. It targets Ubuntu, Debian and Fedora on x64 and ARM64, and some features, such as Computer Use, are not available on Linux yet. If you want OpenAI\'s own app, it is worth a try.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is not a replacement for it. It is built around the Codex CLI you just installed: several Codex terminals at once, next to Claude Code and other agents if you use them, with one place to see which agent is done and what each one changed.',
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
            '<strong>"codex: command not found":</strong> the install folder is not on your PATH yet. Open a new terminal first. With npm, run <code>npm prefix -g</code> and make sure its <code>bin</code> folder is on your PATH.',
            '<strong>EACCES errors with <code>npm install -g</code>:</strong> do not use sudo. Install Node.js with nvm, or point npm at a folder you own with <code>npm config set prefix ~/.npm-global</code> and add <code>~/.npm-global/bin</code> to your PATH. Or skip npm and use the install script.',
            '<strong>Login hangs on a remote machine:</strong> the browser callback cannot reach the server. Use <code>codex login --device-auth</code>.',
            '<strong>Wrong account or expired session:</strong> run <code>codex logout</code>, then <code>codex login</code> again.',
          ],
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Codex sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Once Codex works, one terminal quickly feels slow: you give it a task and wait. More tabs or a tmux layout help, until you forget which session finished, which one is waiting for an approval and what each one touched.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for running several agent terminals at once, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. You pick Codex in each terminal and get desktop notifications when an agent finishes or needs input, searchable history across sessions and a live diff per terminal.',
        },
        {
          type: 'paragraph',
          text: 'Next steps: <a href="/en/guides/codex-agent-swarm" class="' + link + '">running a Codex agent swarm</a> and <a href="/en/guides/run-multiple-codex-sessions" class="' + link + '">running multiple Codex sessions</a>. Want Claude Code on the same machine? See <a href="/en/guides/claude-code-on-linux" class="' + link + '">Claude Code on Linux</a>.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI on Linux is one script or one npm install away. Sign in with ChatGPT on a desktop or with device auth on a server, work inside a git repository, and when one terminal is not enough, run several side by side in CodeAgentSwarm.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Codex CLI work on Linux?',
      answer: 'Yes. OpenAI Codex CLI runs natively on Linux, on x64 and ARM64. You can install it with the official install script, with npm, with Homebrew or from prebuilt binaries.',
    },
    {
      question: 'How do I install Codex on Ubuntu?',
      answer: 'Run "curl -fsSL https://chatgpt.com/codex/install.sh | sh", open a new terminal and run "codex" inside a project folder. If you already use Node.js, "npm install -g @openai/codex" works too.',
    },
    {
      question: 'How do I log in to Codex on a headless Linux server?',
      answer: 'Run "codex login --device-auth", open the printed link on any device, sign in and enter the one-time code. Some ChatGPT workspaces need to enable device code login in their security settings first.',
    },
    {
      question: 'Is there a Codex desktop app for Linux?',
      answer: 'OpenAI\'s ChatGPT desktop app, which includes Codex, is available for Linux as a preview. CodeAgentSwarm is a separate desktop app that runs your Codex CLI in several terminals at once, alongside other agents.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It uses your existing Codex CLI install.',
    },
  ],
}

export default guide
