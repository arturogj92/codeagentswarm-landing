import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-cli-on-windows',
    locale: 'en',
    title: 'How to Run Codex CLI on Windows: Native Install or WSL',
    metaTitle: 'How to Run Codex CLI on Windows (Native or WSL) (2026)',
    metaDescription: 'Run OpenAI Codex CLI on Windows. Install it with npm in PowerShell or run it inside WSL, fix the common Windows gotchas, and learn the cleanest way to run several Codex sessions in parallel.',
    intro: `Yes, you can run OpenAI Codex CLI on Windows. The simplest path is to install it with npm in PowerShell, sign in once, and type "codex" inside any project folder. If your stack leans on Linux tooling, you can run the exact same Codex CLI inside WSL instead, where Linux-first projects behave like they would on a server.

In this guide we cover both paths: the native Windows install with Node.js and npm, the WSL setup, when to prefer each one, and how to fix the Windows-specific errors that trip people up.

And once Codex is running, we will also show you how to go from a single Codex terminal to several agents working in parallel on Windows, without losing track of which one is doing what.`,
    ctaText: 'CodeAgentSwarm is a native Windows desktop app. Download it free and run several Codex CLI terminals side by side in a visual workspace, with notifications, searchable history and live diffs.',
    highlightedWords: ['Codex CLI', 'Windows'],
    publishedAt: '2026-06-24',
    updatedAt: '2026-06-24',
    alternateSlug: 'codex-cli-en-windows',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Quick answer: yes, Codex CLI runs on Windows',
      content: [
        {
          type: 'image',
          alt: 'Multiple OpenAI Codex CLI terminals running in parallel in a single CodeAgentSwarm workspace on a desktop',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'OpenAI Codex CLI running on the desktop: multiple independent Codex sessions side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: install Node.js, then open PowerShell and install <code>@openai/codex</code> with npm. When it finishes, run <code>codex</code> inside a project folder and sign in with your OpenAI account.',
        },
        {
          type: 'code',
          language: 'powershell',
          code: `# PowerShell - install Codex CLI globally with npm
npm install -g @openai/codex

# Verify the install
codex --version

# Start Codex inside a project folder
codex`,
        },
        {
          type: 'paragraph',
          text: 'That is the whole native path on Windows: Node.js plus one npm install. You do not need WSL just to run Codex CLI. WSL becomes the better option only when your project itself depends on Linux tooling, which we cover further down.',
        },
        {
          type: 'paragraph',
          text: 'For the exact installation commands and the latest options, check the <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official OpenAI Codex CLI repository</a>, since the install method evolves over time. This guide mirrors our <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code on Windows guide</a>, but for OpenAI Codex.',
        },
      ],
    },
    {
      id: 'requirements',
      title: 'What you need before installing',
      content: [
        {
          type: 'list',
          items: [
            'Windows 10 or Windows 11, 64-bit. Codex CLI is a command-line tool you run from a terminal.',
            'Node.js (a recent LTS release) and npm, which ships with Node.js. This is what the native Windows install relies on.',
            'A terminal: Windows Terminal or PowerShell, both of which come with Windows. PowerShell is fine for installing and running Codex.',
            'An OpenAI account with Codex access, so you can sign in the first time you run it.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'If you do not have Node.js yet, install it from the official Node.js site or with a Windows package manager like WinGet (<code>winget install OpenJS.NodeJS.LTS</code>). After installing, close and reopen your terminal so <code>node</code> and <code>npm</code> are on your PATH.',
        },
      ],
    },
    {
      id: 'native-install-step-by-step',
      title: 'Native Windows install step by step',
      content: [
        {
          type: 'paragraph',
          text: 'Once Node.js is in place, installing Codex CLI natively on Windows takes about a minute:',
        },
        {
          type: 'list',
          items: [
            'Open Windows Terminal or PowerShell. You do not need to run it as administrator.',
            'Confirm Node.js is ready with <code>node --version</code> and <code>npm --version</code>.',
            'Install Codex CLI globally: <code>npm install -g @openai/codex</code>',
            'Close and reopen the terminal so the new command is on your PATH.',
            'Run <code>codex --version</code> to confirm it is installed.',
          ],
        },
        {
          type: 'paragraph',
          text: 'To update Codex later, run the same npm install command again, which pulls the latest published version:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: 'npm install -g @openai/codex@latest',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'If <code>npm install -g</code> fails with a permissions error, avoid running PowerShell as administrator just to force it through. The cleaner fix is a Node.js setup where your global npm folder lives under your user profile, which a standard Node.js installer on Windows already handles.',
        },
      ],
    },
    {
      id: 'first-run-and-login',
      title: 'First run: signing in',
      content: [
        {
          type: 'list',
          items: [
            'Open a terminal in a project folder and type <code>codex</code>.',
            'The first time, Codex walks you through signing in with your OpenAI account.',
            'Your browser opens for the OpenAI login. Sign in, then return to the terminal.',
            'Back in the terminal, you are ready: ask Codex something about your code and let it work.',
          ],
        },
        {
          type: 'paragraph',
          text: 'After you sign in once, Codex remembers your credentials, so the next time you run <code>codex</code> in any folder it starts straight away. Each terminal you open is its own independent Codex session.',
        },
      ],
    },
    {
      id: 'wsl-install',
      title: 'Running Codex CLI in WSL (and when to prefer it)',
      content: [
        {
          type: 'paragraph',
          text: 'WSL (Windows Subsystem for Linux) lets you run a real Linux environment inside Windows. Codex CLI runs there exactly the same way, and there are two scenarios where WSL is the better choice:',
        },
        {
          type: 'list',
          items: [
            '<strong>Your project depends on Linux tooling.</strong> If your build chain, scripts or dependencies assume Linux, run Codex CLI where your project actually runs so paths and shell commands match.',
            '<strong>You want stronger isolation for command execution.</strong> Some sandboxing and Linux-native command behavior only lines up properly inside a Linux environment, which on Windows means WSL 2.',
          ],
        },
        {
          type: 'paragraph',
          text: 'To run Codex inside WSL, open your WSL distribution terminal (not PowerShell), make sure Node.js and npm are installed inside that Linux environment, and install Codex CLI there:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inside your WSL (Linux) terminal\nnpm install -g @openai/codex\n\n# Then run it from your project\ncodex',
        },
        {
          type: 'paragraph',
          text: 'One thing to watch in WSL: the browser-based sign-in sometimes shows you a code instead of redirecting back automatically. If that happens, paste the code into the terminal when it asks for it, and keep your project files inside the Linux filesystem for the best performance.',
        },
      ],
    },
    {
      id: 'native-vs-wsl',
      title: 'Native Windows vs WSL: which one should you use?',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Native Windows:</strong> best for Windows-native projects (.NET, Unity, general web dev with Windows tooling). Simplest setup, just Node.js plus an npm install, and it runs straight from PowerShell.',
            '<strong>WSL 2:</strong> best for Linux toolchains and stronger command isolation. Your files live in the Linux filesystem, so Linux-first projects behave exactly as they would on a server.',
            '<strong>WSL 1:</strong> only if WSL 2 is not available on your machine. It has known issues running native binaries, so prefer WSL 2 whenever you can.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you are unsure, start native. It is the path of least friction on Windows and you can always add a WSL install later; both can coexist on the same machine, and you can even point different Codex terminals at different setups.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Common Windows errors and how to fix them',
      content: [
        {
          type: 'list',
          items: [
            "<strong>\"codex is not recognized as a command\":</strong> the global npm bin folder is not on your PATH, or you did not reopen the terminal after installing. Close and reopen PowerShell, and confirm <code>npm config get prefix</code> points at a folder that is on your PATH.",
            "<strong>\"npm is not recognized\":</strong> Node.js is not installed or not on your PATH. Install Node.js LTS, reopen the terminal, and check <code>node --version</code>.",
            '<strong>EACCES or permission errors on <code>npm install -g</code>:</strong> your global npm folder is not user-writable. Reinstall Node.js with the official Windows installer or set an npm prefix under your user profile instead of forcing it with admin rights.',
            '<strong>Corporate proxy or SSL errors during install:</strong> configure npm with your proxy settings, or run the install from a network that is not behind the proxy, then update later.',
            '<strong>Codex behaves oddly with Windows paths or shell commands:</strong> your project likely expects a Unix shell. Run Codex inside WSL for that project so paths and commands match.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, the <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Codex CLI repository</a> tracks known issues and the current install instructions, which is the source of truth as the tool evolves.',
        },
      ],
    },
    {
      id: 'multiple-terminals-on-windows',
      title: 'Running multiple Codex sessions on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Once Codex CLI is working, the next bottleneck shows up fast: one terminal means one task at a time. You hand Codex something to do, and then you wait. Most developers end up opening several terminal tabs and losing track of which agent finished, which one is waiting for an approval, and what each one changed.',
        },
        {
          type: 'paragraph',
          text: 'That is the problem <a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> solves, and it is a native desktop app for both Windows and macOS. It runs your Codex CLI inside a visual workspace, so Windows developers get a real GUI plus multiple Codex terminals side by side, with desktop notifications when an agent finishes or needs input, searchable history across every session, and a live diff of what each terminal changed.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm terminal showing the SELECT AI AGENT picker with claude-code, gemini cli and codex cli options',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you pick the agent per terminal. Choose codex cli in each one to run a full Codex swarm on Windows.',
        },
        {
          type: 'paragraph',
          text: 'If you want to go down that path, these guides are the natural next step: <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">running a Codex agent swarm</a>, <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Codex sessions</a>, and the broader <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview across every CLI.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'Running Codex CLI on Windows is straightforward: install Node.js, run one npm install, and start it from PowerShell. Native is the right default for most Windows developers; WSL 2 is there when your project depends on Linux tooling or you want stronger command isolation.',
        },
        {
          type: 'paragraph',
          text: 'Install it, sign in once, and when a single terminal stops being enough, CodeAgentSwarm gives you a native Windows GUI to run several Codex agents in parallel without losing the plot.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Codex CLI run on Windows?',
      answer: 'Yes. You can install OpenAI Codex CLI natively on Windows with npm in PowerShell, as long as you have Node.js installed. You can also run it inside WSL if your project depends on Linux tooling. Both approaches work, and they can coexist on the same machine.',
    },
    {
      question: 'Do I need WSL to run Codex CLI on Windows?',
      answer: 'No. The native path is to install Codex CLI with npm and run it from PowerShell. WSL is only the better choice when your project itself depends on Linux tooling or you want stronger command isolation. For most Windows-native projects you can skip WSL entirely.',
    },
    {
      question: 'How do I install Codex CLI on Windows?',
      answer: 'Install Node.js (a recent LTS release), open PowerShell, and run "npm install -g @openai/codex". Reopen the terminal, run "codex --version" to confirm, then run "codex" inside a project folder and sign in with your OpenAI account. Check the official OpenAI Codex repository for the latest exact commands.',
    },
    {
      question: 'Can I run multiple Codex sessions at once on Windows?',
      answer: 'Yes. Each Codex CLI session is its own process, so you can open several terminals and run codex in each one on the same project. CodeAgentSwarm is a native Windows desktop app that supervises multiple Codex terminals in one visual workspace, with notifications, searchable history and live diffs.',
    },
    {
      question: 'Does CodeAgentSwarm work on Windows?',
      answer: 'Yes. CodeAgentSwarm is a native desktop app for Windows (x64 and ARM64) and macOS. It runs on top of your existing Codex CLI install and lets Windows developers supervise several Codex terminals in parallel with a real GUI.',
    },
  ],
}

export default guide
