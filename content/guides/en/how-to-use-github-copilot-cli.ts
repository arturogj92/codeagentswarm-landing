import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'how-to-use-github-copilot-cli',
    locale: 'en',
    title: 'How to install and use GitHub Copilot CLI',
    metaTitle: 'GitHub Copilot CLI: Install, Sign In and Use It',
    metaDescription: 'Install GitHub Copilot CLI on macOS, Windows or Linux, sign in with a device code and run it in Chat or the terminal, with resumable history.',
    intro: 'GitHub Copilot CLI is the coding agent GitHub ships as the <code>copilot</code> command. This guide covers installation, sign-in, models, MCP, history and the limits we found while testing version 1.0.93 on October 8, 2026.',
    ctaText: 'Install GitHub Copilot CLI from the agent picker, sign in from Chat and keep its sessions next to your other agents in CodeAgentSwarm.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'como-usar-github-copilot-cli',
    relatedSlug: 'github-copilot-cli-models-ai-credits',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'What GitHub Copilot CLI is',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: `GitHub Copilot CLI is a terminal agent: it reads your project, edits files and runs commands after you approve them. The command is <code>copilot</code> and the npm package is <code>@github/copilot</code>. It also runs as an Agent Client Protocol server with <code>copilot --acp --stdio</code>, which GitHub lists as a ${link('https://docs.github.com/en/copilot/reference/copilot-cli-reference/acp-server', 'public preview')}.`,
        },
        {
          type: 'paragraph',
          text: 'It is a different product from the old <code>gh copilot</code> extension, which only suggested and explained shell commands.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install it on macOS, Linux or Windows',
      content: [
        {
          type: 'table',
          headers: ['Method', 'Command'],
          rows: [
            ['Official script (macOS, Linux)', '<code>curl -fsSL https://gh.io/copilot-install | bash</code>'],
            ['Homebrew (macOS, Linux)', '<code>brew install --cask copilot-cli</code>'],
            ['WinGet (Windows)', '<code>winget install GitHub.Copilot</code>'],
            ['npm (Node.js 22 or later)', '<code>npm install -g @github/copilot</code>'],
          ],
        },
        {
          type: 'paragraph',
          text: `Source: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli', 'GitHub installation docs')}, checked October 8, 2026. Without root access, the script installs <code>~/.local/bin/copilot</code>. Check the result with <code>copilot --version</code>.`,
        },
        {
          type: 'image',
          src: '/images/guides/copilot-install.webp',
          alt: 'GitHub Copilot CLI installation dialog in CodeAgentSwarm',
          caption: 'Real capture from a CodeAgentSwarm development build. The Install automatically button downloads the official release archive and checks its SHA-256 before extracting it.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'In CodeAgentSwarm, pick GitHub Copilot CLI in the agent picker or press Install in Settings > Providers. The app downloads the official archive for your system from the GitHub release, verifies it against the published checksums and puts the binary in the same <code>~/.local/bin</code> folder as the script. Updates follow the method you used: npm, Homebrew, WinGet or the app installer.',
        },
      ],
    },
    {
      id: 'windows',
      title: 'Windows on x64 and ARM64',
      content: [
        {
          type: 'paragraph',
          text: 'GitHub publishes separate Windows builds for x64 and ARM64. WinGet picks the right one. The CodeAgentSwarm installer downloads the matching zip, checks it and extracts <code>copilot.exe</code> to <code>%LOCALAPPDATA%\\copilot-cli</code>. An existing WinGet or npm installation is detected and used instead.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'On Windows, Copilot runs shell commands with PowerShell. The <code>powershellFlags</code> setting controls how it starts.',
        },
      ],
    },
    {
      id: 'sign-in',
      title: 'Sign in with a device code',
      content: [
        { type: 'code', language: 'bash', code: 'copilot login --device-code' },
        {
          type: 'paragraph',
          text: 'The command prints <code>https://github.com/login/device</code> and a one-time code. Open the page, enter the code and approve access. Chat runs the same flow when you press Sign in, so you never paste anything back.',
        },
        {
          type: 'paragraph',
          text: `Copilot stores the token in the system keychain. It also accepts <code>COPILOT_GITHUB_TOKEN</code>, <code>GH_TOKEN</code> and <code>GITHUB_TOKEN</code>, in that order, and otherwise uses the account of a signed-in GitHub CLI (<code>gh</code>). See ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli', 'GitHub authentication docs')}.`,
        },
        {
          type: 'paragraph',
          text: 'A custom model provider (BYOK) through the <code>COPILOT_PROVIDER_*</code> variables needs no GitHub login.',
        },
      ],
    },
    {
      id: 'chat',
      title: 'Use it in Chat or in the terminal',
      content: [
        {
          type: 'image',
          src: '/images/guides/copilot-chat-real.webp',
          alt: 'GitHub Copilot CLI answering in CodeAgentSwarm Chat',
          caption: 'Real reply from GitHub Copilot CLI 1.0.93 in a CodeAgentSwarm development build, with a test prompt.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Chat talks to the ACP server. It shows the models your account offers, the Agent, Plan and Autopilot modes, permission requests you can approve, image attachments and a stop button. The terminal view runs the normal <code>copilot</code> interface, and a session started in Chat continues in the terminal.',
        },
        {
          type: 'list',
          items: [
            '<strong>Ask before actions</strong>: every file edit and command waits for your approval.',
            '<strong>Auto-approve edits</strong>: file changes go through; commands still ask.',
            '<strong>Always approve</strong>: the equivalent of <code>copilot --yolo</code>.',
          ],
        },
      ],
    },
    {
      id: 'history',
      title: 'History, resume and folder trust',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot keeps each session in <code>~/.copilot/session-state/&lt;id&gt;/</code>. CodeAgentSwarm lists those sessions in Conversation History, filters them by agent and project, searches their messages and reopens one in Chat or with <code>copilot --resume &lt;id&gt;</code>. Subagent turns stay inside the session that started them, so each row is a conversation you can resume.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-history.webp',
          alt: 'GitHub Copilot CLI conversations filtered in CodeAgentSwarm history',
          caption: 'Real interface with a sample conversation created for testing.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'The first time the terminal opens Copilot in a folder, Copilot asks whether you trust it. That prompt comes from Copilot itself; answer it once, or choose to remember the folder.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'A Chat conversation resumed in the GitHub Copilot CLI terminal with the folder trust prompt',
          caption: 'Real capture: the session started in Chat continues in the terminal, and Copilot asks for folder trust.',
          size: 'full',
        },
      ],
    },
    {
      id: 'mcp',
      title: 'MCP servers, instructions and skills',
      content: [
        {
          type: 'table',
          headers: ['What', 'Where'],
          rows: [
            ['MCP servers', '<code>~/.copilot/mcp-config.json</code>, plus <code>.mcp.json</code> or <code>.github/mcp.json</code> in a project'],
            ['Personal instructions', '<code>~/.copilot/copilot-instructions.md</code>'],
            ['Skills', '<code>~/.copilot/skills/</code>, <code>.github/skills/</code>, <code>.agents/skills/</code> or <code>.claude/skills/</code>'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Run <code>copilot mcp list</code> and <code>copilot instruction list</code> to see what a session will load. <code>COPILOT_HOME</code> moves the whole <code>~/.copilot</code> folder.',
        },
        {
          type: 'paragraph',
          text: 'When you allow it in Settings > Privacy, CodeAgentSwarm adds its task and title tools as one MCP entry and a short instruction section. Your own servers stay as they are, and turning the option off removes only that entry.',
        },
      ],
    },
    {
      id: 'limits',
      title: 'Limits to know before you rely on it',
      content: [
        {
          type: 'list',
          items: [
            'Reasoning effort is a launch option (<code>--reasoning-effort</code>), so Chat has no effort selector for Copilot. A level chosen elsewhere carries over when you open the terminal.',
            'Conversation titles and commit messages need a run without tools. Copilot 1.0.93 stalled in that mode, so pick another provider for those two helpers.',
            'The ACP server is a public preview. Commands that need a picker, such as <code>/login</code> or <code>/resume</code>, do not work inside Chat.',
            'Text from a subagent can appear in the Chat stream before the main answer.',
          ],
        },
        {
          type: 'paragraph',
          text: `Plans and usage are covered in ${link('/en/guides/github-copilot-cli-models-ai-credits', 'GitHub Copilot CLI models, AI credits and usage limits')}. To compare it with other tools, see ${link('/en/guides/best-tools-to-run-multiple-ai-coding-agents', 'the best tools to run multiple AI coding agents')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is GitHub Copilot CLI free?',
      answer: 'Copilot Free has no AI credits, but Copilot CLI works on it with automatic model selection within a limited monthly Chat allowance. Paid plans add AI credits that Copilot CLI consumes. CodeAgentSwarm does not include a Copilot subscription.',
    },
    {
      question: 'Do I need Node.js to install GitHub Copilot CLI?',
      answer: 'Only for the npm package, which requires Node.js 22 or later. The official script, Homebrew, WinGet and the CodeAgentSwarm installer use the standalone binary.',
    },
    {
      question: 'Does GitHub Copilot CLI work on Windows ARM64?',
      answer: 'Yes. GitHub publishes Windows builds for x64 and ARM64, and both WinGet and the CodeAgentSwarm installer choose the one that matches the machine.',
    },
    {
      question: 'Where does GitHub Copilot CLI save its sessions?',
      answer: 'In ~/.copilot/session-state, one folder per session. Set COPILOT_HOME to move it. CodeAgentSwarm reads that folder to list, search and resume sessions.',
    },
    {
      question: 'Why does Copilot use my GitHub CLI account?',
      answer: 'Copilot falls back to GitHub CLI credentials when it has no login or token of its own. Run copilot login to sign in with a different account.',
    },
  ],
}

export default guide
