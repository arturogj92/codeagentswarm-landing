import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'
const docs = 'https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs'

export const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-on-linux',
    locale: 'en',
    title: 'How to Install Pi Coding Agent on Linux (Ubuntu, Debian, Fedora)',
    metaTitle: 'How to Install Pi Coding Agent on Linux (2026)',
    metaDescription: 'Install Pi coding agent on Linux with the official installer or npm. Requirements, /login over SSH, common Linux errors and how to run several Pi sessions at once.',
    intro: `Pi runs on Linux. Install it with the official installer ("curl -fsSL https://pi.dev/install.sh | sh") or with npm, open a terminal in your project, type "pi" and run /login to connect a model provider.

In this guide we cover both install methods, the Node.js version Pi needs, logging in on a server with no browser, the errors people hit most often on Linux, and how to run several Pi sessions side by side once one terminal is not enough.`,
    ctaText: 'CodeAgentSwarm now runs on Linux (deb and AppImage, x64 and ARM64). Download it free and run several Pi terminals side by side, with notifications, searchable history and live diffs.',
    ctaAgent: 'pi',
    highlightedWords: ['Pi', 'Linux'],
    publishedAt: '2026-09-29',
    updatedAt: '2026-09-29',
    alternateSlug: 'pi-coding-agent-en-linux',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Quick answer: install Pi on Linux',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official installer, or install the npm package if you already have Node.js 22.19 or newer. Then type <code>pi</code> inside a project folder and run <code>/login</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official installer for macOS and Linux
curl -fsSL https://pi.dev/install.sh | sh

# Or with npm (Node.js 22.19 or newer)
npm install -g --ignore-scripts @earendil-works/pi-coding-agent

# Verify the install
pi --version`,
        },
        {
          type: 'paragraph',
          text: 'Every command in this guide comes from the <a href="' + docs + '/quickstart.md" target="_blank" rel="noopener noreferrer" class="' + link + '">official Pi quickstart</a>.',
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
            'A Linux machine with a terminal. The official installer supports macOS and Linux.',
            'Node.js 22.19 or newer if you install with npm. CodeAgentSwarm verified Pi 0.85.1 on that Node version.',
            'Access to a model: a subscription, an API key or a local model through a supported provider.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Pi has no subscription of its own. The provider you connect decides which models you can use and how you are billed. See <a href="/en/guides/pi-coding-agent-models-subscriptions" class="' + link + '">Pi subscriptions and models</a>.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install with npm or the official installer',
      content: [
        {
          type: 'paragraph',
          text: 'Both methods give you the same <code>pi</code> command. Use the installer if you want a guided setup. Use npm if you already manage Node.js with your distro or a version manager and want Pi to live next to your other global packages.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `node --version
npm --version
npm install -g --ignore-scripts @earendil-works/pi-coding-agent
pi --version`,
        },
        {
          type: 'paragraph',
          text: 'The <code>--ignore-scripts</code> flag is part of the official command: Pi does not need dependency lifecycle scripts for a normal npm install. Older tutorials may still use the former <code>@mariozechner</code> package name.',
        },
        {
          type: 'paragraph',
          text: 'To remove Pi later, run <code>npm uninstall -g @earendil-works/pi-coding-agent</code>, or run the installer again and choose <strong>Uninstall Pi</strong> if you used it.',
        },
      ],
    },
    {
      id: 'first-run-and-login',
      title: 'First run and logging in (also over SSH)',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: `cd ~/my-project
pi`,
        },
        {
          type: 'list',
          items: [
            'Inside Pi, run <code>/login</code>, choose a provider and follow its subscription or API key flow.',
            'Run <code>/model</code> to pick a model your account can use.',
            'On a server or over SSH, the OAuth callback may not reach Pi. When Pi asks, paste the final redirect URL or the authorization code back into it.',
            'You can also skip <code>/login</code> and set the provider key as an environment variable, such as <code>ANTHROPIC_API_KEY</code> or <code>OPENAI_API_KEY</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Pi saves credentials in <code>auth.json</code> inside its agent directory. That file can hold API keys and OAuth tokens, so keep it private and never commit it. Details are in the <a href="' + docs + '/providers.md" target="_blank" rel="noopener noreferrer" class="' + link + '">official provider authentication page</a>.',
        },
        {
          type: 'paragraph',
          text: 'Pi saves sessions automatically. Run <code>pi --continue</code> to pick up the last session in the same folder, or <code>/resume</code> to choose another one.',
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
            '<strong>"pi: command not found" after installing:</strong> open a new terminal first. If it still fails, run <code>command -v pi</code> and <code>npm config get prefix</code> and check that the npm global bin folder is on your PATH.',
            '<strong>Pi installed under a different Node:</strong> version managers such as nvm keep one set of global packages per Node version. Check <code>node --version</code> and reinstall Pi in the Node you actually use.',
            '<strong>Node.js too old:</strong> the npm package needs Node.js 22.19 or newer. Distro packages are often behind, so check the version before installing.',
            '<strong>Login stuck on a remote machine:</strong> the browser callback cannot reach the server. Paste the redirect URL or code into Pi when it asks, or use an API key environment variable.',
            '<strong>Shift+Enter submits inside tmux:</strong> tmux can merge modified keys with plain Enter. Enable extended keys as described in the <a href="' + docs + '/tmux.md" target="_blank" rel="noopener noreferrer" class="' + link + '">official tmux page</a>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Pi\'s tools run with the permissions of the Pi process and it does not ask before every tool call. For untrusted repositories or unattended work, run it in a container or another sandbox.',
        },
      ],
    },
    {
      id: 'multiple-sessions-on-linux',
      title: 'Running several Pi sessions on Linux',
      content: [
        {
          type: 'paragraph',
          text: 'Once Pi works, the next limit is time: one terminal handles one task. More tabs or tmux panes help until you lose track of which session finished, which one needs you and what each one changed.',
        },
        {
          type: 'image',
          alt: 'Several AI coding agent terminals running side by side in one CodeAgentSwarm window',
          src: '/images/guides/multi-terminal.png',
          caption: 'Several agent terminals side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> is a free desktop app for that, and it now runs on Linux as a .deb (Ubuntu, Debian and derivatives) or an AppImage (Fedora and most other distros), for x64 and ARM64. It puts several Pi terminals side by side, with desktop notifications when an agent finishes or needs input, searchable history across sessions and a live diff of what each terminal changed. You can mix Pi with Claude Code, Codex and other agents in the same window.',
        },
        {
          type: 'paragraph',
          text: 'On Linux, CodeAgentSwarm installs Pi with its own bundled Node on x64 and ARM64, using the same official package: <code>npm install -g --ignore-scripts @earendil-works/pi-coding-agent</code>. Your credentials still come from Pi\'s own <code>/login</code>.',
        },
        {
          type: 'paragraph',
          text: 'Next steps: <a href="/en/guides/how-to-use-pi-coding-agent" class="' + link + '">how to use Pi coding agent</a> for your first real task, and <a href="/en/guides/pi-coding-agent-models-subscriptions" class="' + link + '">Pi subscriptions and models</a> to choose a provider.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On Linux, Pi is one installer command or one npm install away. Check your Node version, run <code>/login</code>, and paste the redirect URL when you work over SSH. When a single terminal stops being enough, CodeAgentSwarm runs several Pi sessions at once.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Pi coding agent work on Linux?',
      answer: 'Yes. Pi runs in a Linux terminal. You can install it with the official installer for macOS and Linux or with the @earendil-works/pi-coding-agent npm package.',
    },
    {
      question: 'Which Node.js version does Pi need?',
      answer: 'The npm package requires Node.js 22.19 or newer. CodeAgentSwarm verified Pi 0.85.1 on that version.',
    },
    {
      question: 'Can I log in to Pi on a server over SSH?',
      answer: 'Yes. Run /login. If the OAuth callback cannot reach the server, paste the final redirect URL or authorization code into Pi when it asks. You can also use a provider API key through an environment variable.',
    },
    {
      question: 'Where does Pi store my credentials on Linux?',
      answer: 'In auth.json inside Pi\'s agent directory. It can contain API keys and OAuth tokens, so keep it private and out of version control.',
    },
    {
      question: 'Does CodeAgentSwarm support Pi on Linux?',
      answer: 'Yes. CodeAgentSwarm runs on Linux as a .deb or an AppImage, on x64 and ARM64, and Pi is available in it for macOS, Windows and Linux. It installs Pi with its own bundled Node and lets you run several Pi sessions in parallel.',
    },
  ],
}

export default guide
