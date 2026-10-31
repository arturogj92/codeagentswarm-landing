import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'how-to-use-cline-cli',
    locale: 'en',
    title: 'How to install and use Cline CLI',
    metaTitle: 'Cline CLI: How to Install, Sign In and Use It',
    metaDescription: 'Install Cline CLI with npm, connect a model provider with cline auth, resume sessions and run Cline in Chat or the terminal next to your other agents.',
    intro: 'Cline is an open source coding agent that started as a VS Code extension and now ships as the <code>cline</code> command. This guide covers installation, sign-in, the flags you will use every day, where Cline keeps its files and how CodeAgentSwarm 2.5.0 runs it, in beta. Cline facts were checked against the official docs and the npm package (version 3.0.74) on October 31, 2026.',
    ctaText: 'Pick Cline in the agent picker, let CodeAgentSwarm install it, and keep its sessions next to Claude Code, Codex and the rest.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline CLI'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'como-usar-cline-cli',
    relatedSlug: 'cline-vs-claude-code',
    socialImage: '/images/guides/cline-cli-og-en.png',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'What Cline CLI is',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'paragraph',
          text: `Cline CLI is a terminal agent: it reads your project, edits files and runs commands. Run <code>cline</code> on its own to open the interactive terminal UI, or <code>cline "your task"</code> to run one task and exit. It is the same agent as the Cline extension for VS Code and JetBrains, and both share rules and skills. The npm package is published under the Apache-2.0 license.`,
        },
        {
          type: 'paragraph',
          text: 'Cline does not lock you to one model vendor. You can use the Cline provider, which bills inference by usage, or bring your own key for Anthropic, OpenAI, Google Gemini, OpenRouter, AWS Bedrock, GCP Vertex, Groq, Cerebras or any OpenAI-compatible endpoint. That is the main reason people pick it over a single-vendor CLI.',
        },
      ],
    },
    {
      id: 'install',
      title: 'Install Cline CLI',
      content: [
        { type: 'code', language: 'bash', code: 'npm install -g cline\ncline version' },
        {
          type: 'paragraph',
          text: `The package ships native binaries for macOS, Linux and Windows on x64 and ARM64, and npm picks the right one through an optional dependency. Cline's ${link('https://docs.cline.bot/cline-cli/installation', 'installation docs')} ask for Node.js 20 or later and recommend 22. A nightly build is available as <code>cline@nightly</code>. To update later, run <code>cline update</code>.`,
        },
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Cline selected in the CodeAgentSwarm agent picker with its beta badge',
          caption: 'Real capture from the CodeAgentSwarm 2.5.0 release demo: Cline selected in the agent picker, ready to start in CLI or Chat view.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'In CodeAgentSwarm you do not need the terminal for this. Pick Cline in the agent picker, or press Install in Settings > Providers, and the app installs the official npm package for you. It first makes sure Node.js 22.19 or later is present (on Windows and Linux it can set up its own Node runtime; on macOS it uses the Node.js you already have), then checks the result with <code>cline --version</code>. Settings > Providers shows the next step for each agent: Install, Sign in or Ready.',
        },
      ],
    },
    {
      id: 'sign-in',
      title: 'Connect a model provider with cline auth',
      content: [
        { type: 'code', language: 'bash', code: 'cline auth' },
        {
          type: 'paragraph',
          text: 'Run <code>cline auth</code> without options and it walks you through choosing a provider, a key or account and a default model. Credentials are saved under <code>~/.cline/data/settings/</code> and reused by every later session, including Chat in CodeAgentSwarm. For OAuth providers, run <code>cline auth</code> first: a normal start does not open a browser.',
        },
        {
          type: 'paragraph',
          text: 'If you open Cline in Chat before signing in, CodeAgentSwarm opens the terminal and gives you the <code>cline auth</code> command to run. Your provider bills the usage; CodeAgentSwarm does not resell model access.',
        },
      ],
    },
    {
      id: 'everyday-flags',
      title: 'Flags you will use every day',
      content: [
        {
          type: 'table',
          headers: ['Flag or command', 'What it does'],
          rows: [
            ['<code>cline</code>', 'Opens the interactive terminal UI'],
            ['<code>cline "fix the failing test"</code>', 'Runs one task and exits'],
            ['<code>-p</code>, <code>--plan</code>', 'Starts in plan mode instead of act mode'],
            ['<code>-m</code>, <code>--model</code>', 'Picks the model for the selected provider'],
            ['<code>--thinking</code>', 'Sets reasoning effort: none, low, medium, high or xhigh'],
            ['<code>--auto-approve true|false</code>', 'Turns automatic tool approval on or off'],
            ['<code>--id &lt;session-id&gt;</code>', 'Resumes a saved session'],
            ['<code>cline history</code>', 'Lists saved sessions'],
            ['<code>--worktree</code>', 'Runs the task in a detached git worktree'],
          ],
          caption: `Source: ${link('https://docs.cline.bot/cli/cli-reference', 'Cline CLI reference')}, checked October 31, 2026.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The CLI reference lists auto-approve as on by default, except in ACP mode where it is off. If you want to review each tool call in the terminal, start Cline with <code>--auto-approve false</code>.',
        },
      ],
    },
    {
      id: 'chat-and-terminal',
      title: 'Use Cline in Chat or in the terminal',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm gives Cline two views. The terminal view runs the normal <code>cline</code> interface. Chat talks to Cline through its Agent Client Protocol server (<code>cline --acp</code>) and shows the models your provider offers, plan and act modes, image attachments, a stop button and every permission request.',
        },
        {
          type: 'list',
          items: [
            '<strong>Ask before actions</strong>: Cline waits for your approval before it edits a file or runs a command.',
            '<strong>Auto-accept edits</strong>: workspace edits go through; commands and risky actions still ask.',
            '<strong>Full access</strong>: no approval prompts, the same as <code>--auto-approve true</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Chat always starts Cline with auto-approve off and applies the mode you pick. The app remembers your last choice for Cline and reuses it for new sessions. In the terminal it adds <code>--auto-approve true</code> only when that last choice was Full access; otherwise Cline follows its own setting.',
        },
      ],
    },
    {
      id: 'files',
      title: 'Where Cline keeps its files',
      content: [
        {
          type: 'table',
          headers: ['What', 'Where'],
          rows: [
            ['Configuration folder', '<code>~/.cline</code> (or <code>CLINE_DIR</code>)'],
            ['Providers and keys', '<code>~/.cline/data/settings/providers.json</code>'],
            ['MCP servers', '<code>~/.cline/data/settings/cline_mcp_settings.json</code>'],
            ['Global rules and skills', '<code>~/.cline/rules/</code> and <code>~/.cline/skills/</code>'],
            ['Project rules', '<code>.clinerules/</code>, <code>.cline/rules/</code> or <code>AGENTS.md</code> in the project root'],
            ['Session index', '<code>~/.cline/data/db/sessions.db</code>'],
          ],
          caption: 'Paths from the Cline CLI reference and rules docs, checked October 31, 2026.',
        },
        {
          type: 'paragraph',
          text: 'When you allow it in Settings > Privacy, CodeAgentSwarm adds its task and title tools as one MCP entry, a short rule file at <code>~/.cline/rules/codeagentswarm.md</code> and small hooks that report when a task finishes and which files changed. Your own servers and hooks stay as they are, and turning each option off removes only what the app added.',
        },
      ],
    },
    {
      id: 'beta-limits',
      title: 'What the 2.5.0 beta does not do yet',
      content: [
        {
          type: 'list',
          items: [
            'Cline reports the cost and tokens of each session, so the usage panel shows session spend. There is no account quota to read, so there is no percentage ring or daily budget for Cline.',
            'Conversation titles and commit messages need a run without tools, which Cline does not offer. Pick another provider for those two helpers.',
            'Cline\'s native conversation forks are not available inside CodeAgentSwarm.',
            'If your Cline version cannot load an old session over ACP, Chat says so instead of starting an empty one. Update Cline or open the session in the terminal.',
          ],
        },
        {
          type: 'paragraph',
          text: 'More on Cline in CodeAgentSwarm:',
        },
        {
          type: 'list',
          items: [
            `${link('/en/guides/cline-vs-claude-code', 'Cline vs Claude Code')}: pricing, models, rules and permissions side by side.`,
            `${link('/en/guides/cline-agent-swarm', 'Run multiple Cline sessions in parallel')}, each in its own folder or worktree.`,
            `${link('/en/guides/cline-cli-on-windows-and-linux', 'Cline CLI on Windows and Linux')}: install, Node.js and paths.`,
            `${link('/en/guides/cline-conversation-history', 'Cline conversation history')}: find, search and resume old sessions.`,
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Cline CLI free?',
      answer: 'The CLI is open source and free to install. You pay for the model you use: through the Cline provider, which bills inference by usage, or through your own provider key. CodeAgentSwarm does not include model usage.',
    },
    {
      question: 'How do I install Cline CLI?',
      answer: 'Run npm install -g cline with Node.js 20 or later (22 is recommended), then cline auth to connect a provider. In CodeAgentSwarm, picking Cline in the agent picker installs it for you.',
    },
    {
      question: 'How do I resume a Cline session?',
      answer: 'Run cline history to list sessions and cline --id followed by the session id to resume one. CodeAgentSwarm lists the same sessions in Conversation History and reopens them in Chat or the terminal.',
    },
    {
      question: 'Does Cline CLI read AGENTS.md?',
      answer: 'Yes. Cline reads AGENTS.md in the project root along with .clinerules and .cline/rules, plus global rules in ~/.cline/rules.',
    },
    {
      question: 'Is Cline stable in CodeAgentSwarm?',
      answer: 'Cline arrives in CodeAgentSwarm 2.5.0 with a beta label. Installation, Chat, history, permissions and session spend work; titles, commit messages and native forks are not available yet.',
    },
  ],
}

export default guide
