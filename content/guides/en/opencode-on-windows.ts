import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-on-windows',
    locale: 'en',
    title: 'How to Run OpenCode on Windows: Native Install or WSL',
    metaTitle: 'How to Run OpenCode on Windows (Native or WSL) (2026)',
    metaDescription: 'Run opencode on Windows. Install it with npm in PowerShell or run it inside WSL, fix the common Windows gotchas, and learn how to run several opencode sessions in parallel.',
    intro: `Yes, you can run opencode on Windows. The simplest path is to install it with npm in PowerShell, connect a model provider once, and type "opencode" inside any project folder. Because opencode is provider-agnostic, that provider can be Anthropic, OpenAI, Google or even a local model, whichever you already use.

If your stack leans on Linux tooling, you can run the exact same opencode inside WSL instead, where Linux-first projects behave like they would on a server. In this guide we cover both paths: the native Windows install with Node.js and npm, the WSL setup, when to prefer each one, and how to fix the Windows-specific errors that trip people up.

And once opencode is running, we will also show you how to go from a single opencode terminal to several agents working in parallel on Windows, without losing track of which one is doing what.`,
    ctaText: 'CodeAgentSwarm is a native Windows desktop app. Download it free and run several opencode terminals side by side in a visual workspace, with notifications, searchable history and live diffs.',
    highlightedWords: ['OpenCode', 'Windows'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-en-windows',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Quick answer: yes, opencode runs on Windows',
      content: [
        {
          type: 'image',
          alt: 'Multiple opencode terminals running in parallel in a single CodeAgentSwarm workspace on a desktop',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'opencode on the desktop: multiple independent sessions side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: install Node.js, then open PowerShell and install <code>opencode-ai</code> globally with npm. When it finishes, run <code>opencode</code> inside a project folder and connect your provider (Anthropic, OpenAI, Google or a local model).',
        },
        {
          type: 'code',
          language: 'powershell',
          code: `# PowerShell - install opencode globally with npm
npm install -g opencode-ai

# Verify the install
opencode --version

# Start opencode inside a project folder
opencode`,
        },
        {
          type: 'paragraph',
          text: 'That is the whole native path on Windows: Node.js plus one npm install. You do not need WSL just to run opencode. WSL becomes the better option only when your project itself depends on Linux tooling, which we cover further down.',
        },
        {
          type: 'paragraph',
          text: 'opencode is SST\'s open-source terminal agent. For the exact installation commands and the latest options, check the <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official opencode site</a> and the <a href="https://github.com/sst/opencode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode GitHub repository</a>, since the install method evolves over time. This guide mirrors our <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code on Windows guide</a> and the <a href="/en/guides/codex-cli-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI on Windows guide</a>, but for opencode.',
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
            'Windows 10 or Windows 11, 64-bit. opencode is a command-line tool you run from a terminal.',
            'Node.js (a recent LTS release) and npm, which ships with Node.js. This is what the native Windows install relies on.',
            'A terminal: Windows Terminal or PowerShell, both of which come with Windows. PowerShell is fine for installing and running opencode.',
            'An account or API key with at least one model provider (Anthropic, OpenAI, Google or a local model setup). opencode is provider-agnostic, so it connects to whichever provider you choose the first time you run it.',
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
          text: 'Once Node.js is in place, installing opencode natively on Windows takes about a minute:',
        },
        {
          type: 'list',
          items: [
            'Open Windows Terminal or PowerShell. You do not need to run it as administrator.',
            'Confirm Node.js is ready with <code>node --version</code> and <code>npm --version</code>.',
            'Install opencode globally: <code>npm install -g opencode-ai</code>',
            'Close and reopen the terminal so the new command is on your PATH.',
            'Run <code>opencode --version</code> to confirm it is installed.',
          ],
        },
        {
          type: 'paragraph',
          text: 'To update opencode later, run the same npm install command again, which pulls the latest published version:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: 'npm install -g opencode-ai@latest',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'If <code>npm install -g</code> fails with a permissions error, avoid running PowerShell as administrator just to force it through. The cleaner fix is a Node.js setup where your global npm folder lives under your user profile, which a standard Node.js installer on Windows already handles.',
        },
      ],
    },
    {
      id: 'first-run',
      title: 'First run: connecting a provider',
      content: [
        {
          type: 'list',
          items: [
            'Open a terminal in a project folder and type <code>opencode</code>.',
            'Connect a provider (for example with <code>opencode auth login</code>): pick Anthropic, OpenAI, Google or another provider, then sign in or paste an API key.',
            'Once the provider is connected, ask opencode something about your code and let it work.',
          ],
        },
        {
          type: 'paragraph',
          text: 'After you connect a provider once, opencode stores those credentials, so the next time you run <code>opencode</code> in any folder it starts straight away. Its global config lives under <code>~/.config/opencode</code> in your user profile, and each terminal you open is its own independent opencode session. The exact auth command can change, so check the <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official opencode docs</a> if the flow looks different on your version.',
        },
      ],
    },
    {
      id: 'wsl-install',
      title: 'Running opencode in WSL (and when to prefer it)',
      content: [
        {
          type: 'paragraph',
          text: 'WSL (Windows Subsystem for Linux) lets you run a real Linux environment inside Windows. opencode runs there exactly the same way, and there are two scenarios where WSL is the better choice:',
        },
        {
          type: 'list',
          items: [
            '<strong>Your project depends on Linux tooling.</strong> If your build chain, scripts or dependencies assume Linux, run opencode where your project actually runs so paths and shell commands match.',
            '<strong>You want Linux-native command behaviour.</strong> Some sandboxing and shell commands only line up properly inside a Linux environment, which on Windows means WSL 2.',
          ],
        },
        {
          type: 'paragraph',
          text: 'To run opencode inside WSL, open your WSL distribution terminal (not PowerShell), make sure Node.js and npm are installed inside that Linux environment, and install opencode there:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Inside your WSL (Linux) terminal\nnpm install -g opencode-ai\n\n# Then run it from your project\nopencode',
        },
        {
          type: 'paragraph',
          text: 'One thing to watch in WSL: connecting your provider from a Linux terminal sometimes shows you a code or URL to complete in your Windows browser instead of redirecting automatically. If that happens, finish the flow in the browser and return to the terminal, and keep your project files inside the Linux filesystem for the best performance.',
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
            '<strong>WSL 2:</strong> best for Linux toolchains and Linux-native command behaviour. Your files live in the Linux filesystem, so Linux-first projects behave exactly as they would on a server.',
            '<strong>WSL 1:</strong> only if WSL 2 is not available on your machine. It has known issues running native binaries, so prefer WSL 2 whenever you can.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you are unsure, start native. It is the path of least friction on Windows and you can always add a WSL install later; both can coexist on the same machine, and you can even point different opencode terminals at different setups.',
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
            "<strong>\"opencode is not recognized as a command\":</strong> the global npm bin folder is not on your PATH, or you did not reopen the terminal after installing. Close and reopen PowerShell, and confirm <code>npm config get prefix</code> points at a folder that is on your PATH.",
            "<strong>\"npm is not recognized\":</strong> Node.js is not installed or not on your PATH. Install Node.js LTS, reopen the terminal, and check <code>node --version</code>.",
            '<strong>EACCES or permission errors on <code>npm install -g</code>:</strong> your global npm folder is not user-writable. Reinstall Node.js with the official Windows installer or set an npm prefix under your user profile instead of forcing it with admin rights.',
            '<strong>Corporate proxy or SSL errors during install:</strong> configure npm with your proxy settings, or run the install from a network that is not behind the proxy, then update later.',
            '<strong>Provider authentication errors:</strong> usually a wrong or missing API key, or the wrong provider selected. Re-run the auth flow, and check which provider is configured in <code>~/.config/opencode/opencode.json</code>.',
            '<strong>opencode behaves oddly with Windows paths or shell commands:</strong> your project likely expects a Unix shell. Run opencode inside WSL for that project so paths and commands match.',
          ],
        },
        {
          type: 'paragraph',
          text: 'For anything else, the <a href="https://github.com/sst/opencode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official opencode repository</a> tracks known issues and the current install instructions, which is the source of truth as the tool evolves.',
        },
      ],
    },
    {
      id: 'multiple-terminals-on-windows',
      title: 'Running multiple opencode sessions on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Once opencode is working, the next bottleneck shows up fast: one terminal means one task at a time. You hand opencode something to do, and then you wait. Most developers end up opening several terminal tabs and losing track of which agent finished, which one is waiting for an approval, and what each one changed.',
        },
        {
          type: 'paragraph',
          text: 'That is the problem <a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> solves, and it is a native desktop app for both Windows and macOS. It runs your opencode sessions inside a visual workspace, so Windows developers get a real GUI plus multiple opencode terminals side by side, with desktop notifications when an agent finishes or needs input, searchable history across every session, and a live diff of what each terminal changed. It also reads opencode\'s local sessions, so past conversations stay searchable and you can resume them.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm terminal showing the SELECT AI AGENT picker where you choose the agent per terminal, including opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you pick the agent per terminal. Choose opencode in each one to run a full opencode swarm on Windows.',
        },
        {
          type: 'paragraph',
          text: 'If you want to go down that path, these guides are the natural next step: <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">running an opencode agent swarm</a>, <a href="/en/guides/run-multiple-opencode-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple opencode sessions</a>, and the broader <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview across every CLI.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'Running opencode on Windows is straightforward: install Node.js, run one npm install, and start it from PowerShell. Native is the right default for most Windows developers; WSL 2 is there when your project depends on Linux tooling or you want Linux-native command behaviour. Either way, you connect a provider once and opencode remembers it.',
        },
        {
          type: 'paragraph',
          text: 'Install it, connect your provider once, and when a single terminal stops being enough, CodeAgentSwarm gives you a native Windows GUI to run several opencode agents in parallel without losing the plot.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does opencode run on Windows?',
      answer: 'Yes. You can install opencode natively on Windows with npm in PowerShell, as long as you have Node.js installed. You can also run it inside WSL if your project depends on Linux tooling. Both approaches work, and they can coexist on the same machine.',
    },
    {
      question: 'Do I need WSL to run opencode on Windows?',
      answer: 'No. The native path is to install opencode with npm and run it from PowerShell. WSL is only the better choice when your project itself depends on Linux tooling or you want Linux-native command behaviour. For most Windows-native projects you can skip WSL entirely.',
    },
    {
      question: 'How do I install opencode on Windows?',
      answer: 'Install Node.js (a recent LTS release), open PowerShell, and run "npm install -g opencode-ai". Reopen the terminal, run "opencode --version" to confirm, then run "opencode" inside a project folder and connect your provider (Anthropic, OpenAI, Google or a local model). Check the official opencode docs for the latest exact commands.',
    },
    {
      question: 'Can I run multiple opencode sessions at once on Windows?',
      answer: 'Yes. Each opencode session is its own process, so you can open several terminals and run opencode in each one on the same project. CodeAgentSwarm is a native Windows desktop app that supervises multiple opencode terminals in one visual workspace, with notifications, searchable history and live diffs.',
    },
    {
      question: 'Does CodeAgentSwarm work on Windows?',
      answer: 'Yes. CodeAgentSwarm is a native desktop app for Windows (x64 and ARM64) and macOS. It runs on top of your existing opencode install and lets Windows developers supervise several opencode terminals in parallel with a real GUI.',
    },
  ],
}

export default guide
