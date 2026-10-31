import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'how-to-use-kimi-code',
    locale: 'en',
    title: 'How to Use Kimi Code: Install, Login, Commands, and the kimi-cli Trap',
    metaTitle: 'How to Use Kimi Code CLI: Install, Login and Commands (2026)',
    metaDescription: 'Kimi Code CLI explained: install Moonshot AI\'s terminal coding agent, log in, learn the commands that matter, and avoid installing the legacy kimi-cli by mistake.',
    intro: `Kimi Code is Moonshot AI's command-line coding agent. Its default model id currently serves K2.8 Preview, with up to a 1M token context window, and Moonshot's newest flagship, K3.1 Pro, is one <code>/model</code> away. You install it, run <code>kimi</code> inside a project, and it reads your code, edits files, and runs commands the same way Claude Code or Codex CLI do.

There is one thing you should know before you type a single install command: Moonshot has shipped two different products that both install a binary called <code>kimi</code>, and the package names are crossed in a way that sends a lot of people to the wrong one. This guide covers that trap first, because it is the most common way a Kimi Code setup goes sideways, and then walks through installation, login, the flags and conventions you will actually use, and how to run Kimi Code inside CodeAgentSwarm next to your other agents.

Kimi Code moves fast, with new releases every few days, so where something is likely to drift I will say so and point you at the official docs.`,
    ctaText: 'Run Kimi Code as a first-class agent in CodeAgentSwarm, next to Claude Code, Codex and the rest. Parallel terminals, desktop notifications, searchable history and live diffs, with Kimi\'s quota visible at a glance.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-10-31',
    alternateSlug: 'como-usar-kimi-code',
  },
  sections: [
    {
      id: 'what-is-kimi-code',
      title: 'What is Kimi Code?',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code is the official terminal coding agent from <a href="https://github.com/MoonshotAI/kimi-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Moonshot AI</a>, the company behind the Kimi models. It is open source under the MIT license, written in TypeScript, and invoked with the <code>kimi</code> command. You run it inside a project folder, describe what you want, and it plans, edits files, and executes shell commands with your approval.',
        },
        {
          type: 'paragraph',
          text: 'The default model id, <code>kimi-for-coding</code>, has served K2.8 Preview since September 11, 2026, replacing K2.7 Code. It offers low, high and max reasoning effort and up to a 1M token context window on every plan. On Plus and above, <code>/model</code> also lists K3.1 Pro, Moonshot\'s newest flagship since October 23, 2026, and K3; their full 1M window needs Pro or above. The <a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official model list</a> has the current ids, and the <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">plans and pricing guide</a> has the current subscription and API costs.',
        },
        {
          type: 'paragraph',
          text: 'If you already use Claude Code, Kimi Code will feel familiar on purpose. Its tools carry the same names (Bash, Read, Write, Edit), it follows the AGENTS.md convention for project instructions, and its MCP configuration is compatible with the <code>.mcp.json</code> file Claude Code already reads. The <a href="/en/guides/kimi-code-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code vs Claude Code comparison</a> covers exactly where they differ.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Kimi Code ships new releases every few days: it jumped from 0.43 to 2.0.0 in September 2026 and reached 2.4.1 on October 30. That pace means fixes arrive fast, and it also means details in any guide (this one included) can drift. When in doubt, the <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/guides/getting-started" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Kimi Code docs</a> are the source of truth.',
        },
      ],
    },
    {
      id: 'the-two-kimis-trap',
      title: 'Before you install: the two kimis trap',
      content: [
        {
          type: 'paragraph',
          text: 'Moonshot has shipped two terminal agents, and both of them install a binary called <code>kimi</code>. Getting this wrong is the number one way people end up confused, and most posts about Kimi Code never mention it.',
        },
        {
          type: 'list',
          items: [
            '<strong>kimi-cli (legacy):</strong> the original Python agent, in the MoonshotAI/kimi-cli repository, with its data under <code>~/.kimi/</code>. The repository is now archived and no longer maintained (its last release was 1.52.0), but it has years of stars and blog posts pointing at it, so search results and AI assistants still send people there.',
            '<strong>Kimi Code (current):</strong> the TypeScript agent this guide is about, in the MoonshotAI/kimi-code repository, with its data under <code>~/.kimi-code/</code>. This is the one under active development.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The package names make it worse, because they are crossed. The PyPI package called <code>kimi-code</code> belongs to the legacy Python agent: its own description now says it is archived and not the new Kimi Code CLI. The real Kimi Code lives on npm as <code>@moonshot-ai/kimi-code</code>. So installing "kimi-code" from pip gets you the old product, and the new product comes from npm or from the official install script.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Check which kimi you actually have\nkimi --version\n\n# 2.x -> Kimi Code, the current TypeScript CLI (this guide)\n# 1.x -> kimi-cli, the legacy Python agent (archived)',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Never decide by command name, decide by version. If <code>kimi --version</code> prints a 2.x version you have Kimi Code (older Kimi Code builds were 0.x); a 1.x version means the legacy Python kimi-cli. The official installer handles collisions for you: it detects legacy Python shims on your PATH, renames the first one to <code>kimi-legacy</code>, and removes duplicates, so after a clean install <code>kimi</code> means Kimi Code.',
        },
      ],
    },
    {
      id: 'install',
      title: 'How to install Kimi Code',
      content: [
        {
          type: 'paragraph',
          text: 'The recommended path is the official install script, which does not require Node.js. It downloads the latest release, verifies the checksum, and puts the <code>kimi</code> executable on your PATH (the binary itself lands in <code>~/.kimi-code/bin/</code>).',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# macOS and Linux\ncurl -fsSL https://code.kimi.com/kimi-code/install.sh | bash',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '# Windows (PowerShell)\nirm https://code.kimi.com/kimi-code/install.ps1 | iex',
        },
        {
          type: 'paragraph',
          text: 'If you prefer a package manager, Kimi Code is on npm. This route needs Node.js 22.19.0 or later:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Check your Node version first\nnode --version\n\n# npm\nnpm install -g @moonshot-ai/kimi-code\n\n# or pnpm\npnpm add -g @moonshot-ai/kimi-code',
        },
        {
          type: 'paragraph',
          text: 'Either way, open a fresh terminal afterward and confirm the install with <code>kimi --version</code>. You should see a 2.x version. To update later, run <code>kimi upgrade</code> and the CLI checks for the latest version itself, or reinstall with <code>npm install -g @moonshot-ai/kimi-code@latest</code>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'On Windows, install Git for Windows before the first launch: Kimi Code uses Git Bash as its shell environment. The <a href="/en/guides/kimi-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code on Windows guide</a> covers that requirement, the current rendering issues, and the WSL route in detail.',
        },
      ],
    },
    {
      id: 'login',
      title: 'First run and logging in',
      content: [
        {
          type: 'paragraph',
          text: 'Start Kimi Code inside a project folder by typing <code>kimi</code>. On first run, use the <code>/login</code> command inside the TUI. It opens a platform selector with two options:',
        },
        {
          type: 'list',
          items: [
            '<strong>Sign in with your Kimi account:</strong> an OAuth device-code flow. Kimi Code shows you a link, you confirm in the browser, and the CLI picks the session up. This is the route for Kimi subscription plans.',
            '<strong>API key:</strong> paste a key from the Moonshot platform if you pay per token instead of subscribing.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Credentials are stored locally under <code>~/.kimi-code/</code>. Once you are logged in, every new <code>kimi</code> session in any folder reuses them. Inside the TUI, <code>/usage</code> shows where you stand against your quota. On the plans Moonshot launched in October 2026 that means a rolling 5-hour window plus the membership\'s monthly total; legacy plans also keep a weekly allowance.',
        },
      ],
    },
    {
      id: 'everyday-usage',
      title: 'Everyday usage: the commands and flags that matter',
      content: [
        {
          type: 'paragraph',
          text: 'Day to day you will live inside the interactive session, with a handful of flags for starting, resuming and automating:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a session in the current project\nkimi\n\n# Continue the last session in this folder\nkimi --continue        # or: kimi -c\n\n# Resume a specific session by id (or pick from a list)\nkimi --session <id>\n\n# One-shot headless run (no TUI), like claude -p\nkimi -p "explain what this repo does"\n\n# Permission and plan modes\nkimi --plan     # plan before acting\nkimi --yolo     # Ask When Needed: routine work runs, risky actions ask\nkimi --auto     # Never Ask: approves everything (careful)',
        },
        {
          type: 'paragraph',
          text: 'A few input details worth knowing: Enter sends your message, and Ctrl-J or Alt-Enter inserts a newline. <code>/title</code> names the current session, which makes it much easier to find later. And if you resume a session while passing <code>--yolo</code>, <code>--auto</code> or <code>--plan</code>, the flag overrides whatever mode the session was saved with. The difference between <code>--yolo</code> and <code>--auto</code> deserves its own risk discussion, which is exactly what the <a href="/en/guides/kimi-code-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code YOLO mode guide</a> is for.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Project instructions: AGENTS.md',
          id: 'agents-md',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code follows the AGENTS.md convention. It reads a global file at <code>~/.kimi-code/AGENTS.md</code>, a shared one at <code>~/.agents/AGENTS.md</code>, and your project\'s <code>AGENTS.md</code>. There is no KIMI.md, and it does not read CLAUDE.md natively, though it ships an import skill that converts an existing Claude Code or Codex setup once, with your confirmation.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Skills are shared, not ported',
          id: 'skills',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code reads skills natively from <code>~/.agents/skills/</code>, the same shared folder other CLI agents use, plus its own <code>~/.kimi-code/skills/</code> and per-project skill folders. If you already maintain skills for Claude Code or Codex, Kimi Code picks them up without any porting. That makes the workflow in <a href="/en/guides/share-skills-between-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">sharing skills between agents</a> apply to Kimi out of the box.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'MCP servers',
          id: 'mcp',
        },
        {
          type: 'paragraph',
          text: 'MCP configuration is file-based. Kimi Code reads a global <code>~/.kimi-code/mcp.json</code>, then your repository\'s <code>.mcp.json</code> at the git root (the same file Claude Code uses, so one file can serve both agents), then a per-project <code>.kimi-code/mcp.json</code>, with the more specific file winning. Tool names follow the same <code>mcp__server__tool</code> pattern as Claude Code. There is no <code>--mcp-config</code> flag, configuration lives in files only. For deeper automation there is also a full hooks system, configured in TOML inside <code>~/.kimi-code/config.toml</code> and validated with <code>kimi doctor</code>.',
        },
      ],
    },
    {
      id: 'kimi-code-in-codeagentswarm',
      title: 'Running Kimi Code inside CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'One Kimi Code session is one process working on one task. The moment you want a second task moving at the same time, you are into multiple terminals, and that is where <a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> comes in. It is a desktop app for macOS, Windows and Linux that runs several AI CLI terminals in one visual workspace, and Kimi Code is a first-class agent in it, alongside Claude Code, Codex CLI, Antigravity CLI, opencode and Grok Build.',
        },
        {
          type: 'paragraph',
          text: 'You pick the agent per terminal, so you can run three Kimi Code sessions side by side, or mix Kimi with Claude Code on the same project and compare how each handles its task. On top of the terminals you get desktop notifications when an agent finishes or asks for input, searchable conversation history across every agent, per-terminal live diffs of what each session changed, a kanban board the agents update over MCP, and a quota indicator that reads Kimi\'s quota windows so you see a wall coming before you hit it.',
        },
        {
          type: 'paragraph',
          text: 'From here, the natural next steps are <a href="/en/guides/run-multiple-kimi-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Kimi Code sessions</a> for the mechanics, and the <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code agent swarm guide</a> for the full parallel workflow. If you would rather keep your existing harness and just use the model, you can also <a href="/en/guides/kimi-k3-with-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">run Kimi K3 inside Claude Code</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is Kimi Code?',
      answer: 'Kimi Code is Moonshot AI\'s open-source terminal coding agent, run with the kimi command. It works like Claude Code or Codex CLI: you start it inside a project, describe what you want, and it reads code, edits files and runs commands with your approval. Its default kimi-for-coding model id currently serves K2.8 Preview, and K3.1 Pro is available with /model on Plus plans and above.',
    },
    {
      question: 'How do I install Kimi Code CLI?',
      answer: 'On macOS and Linux run the official script: curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash. On Windows PowerShell: irm https://code.kimi.com/kimi-code/install.ps1 | iex. Or install from npm with npm install -g @moonshot-ai/kimi-code, which needs Node.js 22.19 or later. Verify with kimi --version and update later with kimi upgrade.',
    },
    {
      question: 'What is the difference between kimi-cli and Kimi Code?',
      answer: 'kimi-cli is Moonshot\'s legacy Python agent, now archived and no longer maintained. Kimi Code is the current TypeScript agent under active development. Both install a binary called kimi, and confusingly the PyPI package named kimi-code installs the legacy Python product. The real Kimi Code comes from the official install script or the npm package @moonshot-ai/kimi-code. Check with kimi --version: 2.x is Kimi Code, 1.x is the legacy kimi-cli.',
    },
    {
      question: 'Is Kimi Code free?',
      answer: 'The CLI itself is open source (MIT) and free to install. Using it requires either a Kimi membership or a Moonshot platform API key billed per token. On the plans Moonshot launched in October 2026, Kimi Code needs Plus or above (Go has no coding quota), and usage works as a rolling 5-hour window plus a monthly total. Check Moonshot\'s membership page and our Kimi Code pricing guide for the current lineup.',
    },
    {
      question: 'Does Kimi Code work with my existing Claude Code setup?',
      answer: 'Large parts of it carry over. Kimi Code reads the same .mcp.json file at your repository root for MCP servers, uses the same mcp__server__tool naming, and reads shared skills from ~/.agents/skills/ natively. Project instructions use AGENTS.md rather than CLAUDE.md, and there is a one-shot import skill for converting an existing Claude Code or Codex configuration.',
    },
    {
      question: 'How do I run several Kimi Code sessions at once?',
      answer: 'Each kimi session is an independent process, so you can run one per terminal. CodeAgentSwarm makes that manageable: it is a desktop app for macOS, Windows and Linux where Kimi Code is a supported agent, and it adds desktop notifications, searchable history, live diffs and a quota indicator across all your parallel sessions.',
    },
  ],
}

export default guide
