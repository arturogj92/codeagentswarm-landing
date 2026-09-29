import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-on-linux',
    locale: 'en',
    title: 'How to Install Cursor CLI (Cursor Agent) on Linux',
    metaTitle: 'Cursor CLI on Linux: Install Cursor Agent on Ubuntu, Debian, Fedora (2026)',
    metaDescription: 'Install Cursor CLI (Cursor Agent) on Linux with the official one-line installer. Requirements, PATH setup, login over SSH, common errors and how to run several Cursor Agent sessions at once.',
    intro: `Cursor CLI, also called Cursor Agent, runs natively on Linux. Open a terminal, run "curl https://cursor.com/install -fsS | bash", open a new terminal and type "agent" (or "cursor-agent") inside a project folder. The installer supports x64 and ARM64 and does not need root.

In this guide we cover the install, the two command names it creates and which one to use, logging in on a server with no browser, and the errors people hit most often on Linux.

Once Cursor Agent is running, we also show how to run several Cursor Agent sessions in parallel on the same Linux machine, next to Claude Code, Codex and other agents.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Cursor Agent sessions side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'cursor-cli-en-linux',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install Cursor CLI on Linux in one line',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer in any terminal. No sudo needed. When it finishes, open a new terminal, type <code>agent</code> in your project and log in with your Cursor account.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official installer (macOS, Linux and WSL)
curl https://cursor.com/install -fsS | bash

# Verify the install
agent --version

# Start it inside a project
cd ~/my-project
agent`,
        },
        {
          type: 'paragraph',
          text: 'The installer downloads the build for your architecture into <code>~/.local/share/cursor-agent</code> and creates two links in <code>~/.local/bin</code>: <code>agent</code> and <code>cursor-agent</code>. The commands in this guide come from the <a href="https://cursor.com/docs/cli/installation" target="_blank" rel="noopener noreferrer" class="' + link + '">official Cursor CLI installation docs</a> and the <a href="https://cursor.com/docs/cli/reference/authentication" target="_blank" rel="noopener noreferrer" class="' + link + '">authentication reference</a>.',
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
            'A 64-bit Linux on x64 or ARM64. The installer stops with "Unsupported architecture" on anything else.',
            '<code>curl</code>, <code>tar</code> and <code>bash</code>, which most distributions ship by default.',
            'A Cursor account for the browser login, or a user API key from the Cursor dashboard for servers and CI.',
            '<code>~/.local/bin</code> on your PATH. The installer tells you if it is missing.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You do not need the Cursor editor installed. The CLI is a separate download and works on its own, including on a headless server.',
        },
      ],
    },
    {
      id: 'agent-or-cursor-agent',
      title: 'agent or cursor-agent: which command to use',
      content: [
        {
          type: 'paragraph',
          text: 'Both names point to the same binary. Cursor\'s docs now use <code>agent</code> as the primary name and keep <code>cursor-agent</code> as the legacy one. Either works for daily use.',
        },
        {
          type: 'paragraph',
          text: 'The catch: <code>agent</code> is a generic name, and another CLI on your machine can claim it. Grok is a known example. If you have several agents installed, use <code>cursor-agent</code> in scripts and check what each name resolves to:',
        },
        {
          type: 'code',
          language: 'bash',
          code: `command -v cursor-agent
command -v agent
cursor-agent --version`,
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm always launches <code>cursor-agent</code> for this reason, so it never opens the wrong tool by mistake.',
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
            'Run <code>agent login</code>. Your default browser opens and you sign in with your Cursor account.',
            'On a server or over SSH, where no browser can open, run <code>NO_OPEN_BROWSER=1 agent login</code> and open the printed URL on any other device.',
            'For CI or scripts, create a user API key in the Cursor dashboard and export it as <code>CURSOR_API_KEY</code>, or pass it with <code>--api-key</code>.',
            'Run <code>agent status</code> to confirm you are logged in and see which account is active. <code>agent logout</code> removes the stored login.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Headless login
NO_OPEN_BROWSER=1 agent login

# Or with an API key
export CURSOR_API_KEY=your_api_key_here

agent status`,
        },
        {
          type: 'paragraph',
          text: 'After that, <code>agent</code> opens an interactive session, <code>agent "your prompt"</code> starts one with a task, and <code>agent -p "your prompt"</code> prints the answer without the interactive screen. <code>agent ls</code> and <code>agent resume</code> bring back earlier conversations.',
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
            '<strong>"agent: command not found" after installing:</strong> <code>~/.local/bin</code> is not on your PATH yet. Open a new terminal, or add <code>export PATH="$HOME/.local/bin:$PATH"</code> to your <code>~/.bashrc</code> or <code>~/.zshrc</code>.',
            '<strong>"agent" opens a different tool:</strong> another CLI owns that name. Run <code>command -v agent</code> to see which one, and start Cursor with <code>cursor-agent</code> instead.',
            '<strong>"Unsupported architecture" from the installer:</strong> Cursor only ships x64 and ARM64 builds. 32-bit and other architectures are not supported.',
            '<strong>"Download failed" from the installer:</strong> your machine could not reach Cursor\'s download server. Check your network or proxy and run the installer again.',
            '<strong>The login never opens a browser:</strong> use <code>NO_OPEN_BROWSER=1 agent login</code> and visit the URL yourself.',
            '<strong>Authentication fails:</strong> run <code>agent status</code>, then <code>agent login</code> again, or check that <code>CURSOR_API_KEY</code> holds a valid key.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The CLI updates itself by default. To force it, run <code>agent update</code>, or run the one-line installer again, which puts the latest version in place.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Cursor Agent sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'With Cursor Agent working, the next limit shows up quickly: one terminal is one task at a time. You hand the agent a job and wait. Opening more tabs in GNOME Terminal or tmux helps, until you lose track of which session finished, which one is waiting for permission and what each one changed.',
        },
        {
          type: 'image',
          alt: 'Several AI coding agent terminals running side by side in one CodeAgentSwarm window',
          src: '/images/guides/multi-terminal.png',
          caption: 'Several agent terminals side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a desktop app for exactly that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It puts several agent sessions side by side and adds desktop notifications when one finishes or needs input, searchable history across every session and a live diff of what each one changed. You can mix Cursor Agent with Claude Code, Codex and other agents in the same window.',
        },
        {
          type: 'paragraph',
          text: 'Good next steps: the <a href="/en/guides/cursor-agent-swarm" class="' + link + '">Cursor Agent swarm guide</a> and the <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="' + link + '">Cursor Agent CLI ACP guide</a>, which explains how Chat works with Cursor.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Cursor CLI is one curl command away. Use <code>cursor-agent</code> if another tool already owns <code>agent</code>, log in with <code>NO_OPEN_BROWSER=1</code> on servers, and when a single terminal stops being enough, CodeAgentSwarm lets you run several at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Cursor CLI work on Linux?',
      answer: 'Yes. Cursor CLI (Cursor Agent) runs natively on Linux on x64 and ARM64. Cursor installs it with the same one-line script it uses for macOS and WSL.',
    },
    {
      question: 'How do I install Cursor CLI on Ubuntu?',
      answer: 'Run "curl https://cursor.com/install -fsS | bash" in a terminal, open a new terminal and type "agent". If the command is not found, add ~/.local/bin to your PATH in ~/.bashrc.',
    },
    {
      question: 'Should I run agent or cursor-agent on Linux?',
      answer: 'Both start the same program. agent is the primary name in Cursor\'s docs and cursor-agent is the legacy name. If another CLI such as Grok already owns agent, use cursor-agent.',
    },
    {
      question: 'Can I use Cursor CLI on a Linux server over SSH?',
      answer: 'Yes. Run "NO_OPEN_BROWSER=1 agent login" and open the printed URL on any other device, or set the CURSOR_API_KEY environment variable with a user API key from the Cursor dashboard.',
    },
    {
      question: 'Does CodeAgentSwarm work on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb for Ubuntu, Debian and derivatives or as an AppImage for Fedora and most other distros, on x64 and ARM64. It uses your existing Cursor Agent install and lets you run several sessions in parallel.',
    },
  ],
}

export default guide
