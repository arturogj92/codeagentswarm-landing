import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-mcp-history',
    locale: 'en',
    title: 'GitHub Copilot CLI MCP, instructions and session history',
    metaTitle: 'GitHub Copilot CLI MCP Setup and Session Resume',
    metaDescription: 'Add MCP servers to GitHub Copilot CLI with mcp-config.json or copilot mcp add, load custom instructions and skills, and resume saved sessions by ID or name.',
    intro: 'MCP servers give GitHub Copilot CLI extra tools, instruction files tell it how your project works, and saved sessions let you pick up where you stopped. This guide shows where each one lives and the commands to check them, tested with Copilot CLI 1.0.93 on October 8, 2026.',
    ctaText: 'Search every GitHub Copilot CLI session and reopen it in Chat or the terminal with CodeAgentSwarm, starting with the release after 2.4.3.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-mcp-historial',
    relatedSlug: 'how-to-use-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Check what a session will load',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: `Three commands answer most questions before you start: which MCP servers are configured, which instruction files apply in this folder, and how to continue your last session. If Copilot is not installed yet, start with ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
        },
        { type: 'code', language: 'bash', code: 'copilot mcp list\ncopilot instruction list\ncopilot --continue' },
        {
          type: 'paragraph',
          text: 'Everything below lives under <code>~/.copilot</code> unless you set <code>COPILOT_HOME</code>, which moves the whole folder.',
        },
      ],
    },
    {
      id: 'mcp-config',
      title: 'Add an MCP server in mcp-config.json',
      content: [
        {
          type: 'paragraph',
          text: 'Your personal MCP servers go in <code>~/.copilot/mcp-config.json</code>, under the <code>mcpServers</code> key. A local server runs as a process on your machine and talks over stdio, so it needs <code>type: "local"</code>, the <code>command</code> to start it and its <code>args</code>. This is the example from the GitHub docs:',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "mcpServers": {\n    "playwright": {\n      "type": "local",\n      "command": "npx",\n      "args": ["@playwright/mcp@latest"],\n      "env": {},\n      "tools": ["*"]\n    }\n  }\n}',
        },
        {
          type: 'paragraph',
          text: `<code>"tools": ["*"]</code> exposes every tool the server offers. List tool names instead to expose only those. Source: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers', 'Adding MCP servers for GitHub Copilot CLI')}, checked October 8, 2026.`,
        },
      ],
    },
    {
      id: 'mcp-add',
      title: 'How to add an MCP server from the command line',
      content: [
        {
          type: 'paragraph',
          text: 'If you prefer not to edit JSON, <code>copilot mcp add</code> writes the same user file for you. Put the command of a local server after <code>--</code>, or pass <code>--transport http</code> and a URL for a remote one.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Local (stdio) server\ncopilot mcp add playwright -- npx @playwright/mcp@latest\n\n# Remote (HTTP) server\ncopilot mcp add --transport http docs https://your-mcp-server.example/mcp\n\n# Check the result\ncopilot mcp list\ncopilot mcp get playwright',
        },
        {
          type: 'paragraph',
          text: 'In 1.0.93, <code>copilot mcp add</code> also accepts <code>--env KEY=VALUE</code> and <code>--header</code>, both repeatable, and <code>--tools</code> with <code>"*"</code> for all tools, a comma separated list, or <code>""</code> for none. <code>copilot mcp enable</code>, <code>disable</code> and <code>remove</code> manage a server later. Inside a session, <code>/mcp</code> opens a dashboard with each server and its status, and <code>/mcp list</code> prints the same as text.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `The HTTP URL above is a placeholder, not a real service. Add only servers you trust, and keep tokens out of files you commit. Adding a server does not approve its actions: Copilot still asks before running its tools unless you allow them, which ${link('/en/guides/github-copilot-cli-yolo-mode', 'GitHub Copilot CLI YOLO mode')} explains.`,
        },
      ],
    },
    {
      id: 'mcp-scopes',
      title: 'Where MCP configuration can live',
      content: [
        {
          type: 'table',
          headers: ['Source', 'Where', 'Good for'],
          rows: [
            ['User', '<code>~/.copilot/mcp-config.json</code>', 'Servers you want in every project'],
            ['Workspace, local', '<code>.mcp.json</code> in the project', 'Setup for one checkout'],
            ['Workspace, shared', '<code>.github/mcp.json</code> in the project', 'Configuration you commit for the team'],
            ['One session', '<code>--additional-mcp-config</code>', 'Trying a server without saving it'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Plugins can bring their own servers too. <code>--additional-mcp-config</code> takes a JSON string or a file path prefixed with <code>@</code>, can be repeated, and adds to your user config for that session only.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --additional-mcp-config @./extra-mcp.json\ncopilot --disable-mcp-server playwright\ncopilot --disable-builtin-mcps',
        },
        { type: 'heading', level: 3, text: 'The built-in GitHub MCP server', id: 'builtin-github-mcp' },
        {
          type: 'paragraph',
          text: 'Copilot CLI ships with the GitHub MCP server already connected, so GitHub tools are available without any setup. By default the CLI gets a subset of the GitHub tools; <code>--enable-all-github-mcp-tools</code> turns on the rest (from <code>copilot help</code> in 1.0.93). <code>--disable-builtin-mcps</code> switches off every built-in server, which in 1.0.93 means <code>github-mcp-server</code> and <code>githubiq</code>. To drop a single server, use <code>--disable-mcp-server</code> with its name.',
        },
      ],
    },
    {
      id: 'instructions',
      title: 'Custom instructions: copilot-instructions.md and AGENTS.md',
      content: [
        {
          type: 'table',
          headers: ['File', 'Applies to'],
          rows: [
            ['<code>~/.copilot/copilot-instructions.md</code>', 'You, in every project'],
            ['<code>.github/copilot-instructions.md</code>', 'Everyone working in the repository'],
            ['<code>.github/instructions/**/*.instructions.md</code>', 'The repository, split into several files'],
            ['<code>AGENTS.md</code>, <code>CLAUDE.md</code>, <code>GEMINI.md</code>', 'The repository, shared with other agents'],
          ],
        },
        {
          type: 'paragraph',
          text: `Copilot reads repository instructions from the git root and from your current folder. One trap: an <code>AGENTS.md</code> in your home folder is not loaded, so personal rules belong in <code>copilot-instructions.md</code>. <code>COPILOT_CUSTOM_INSTRUCTIONS_DIRS</code> adds more folders, and <code>--no-custom-instructions</code> starts a session without any. Source: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-custom-instructions', 'Adding custom instructions for GitHub Copilot CLI')}, checked October 8, 2026.`,
        },
        { type: 'code', language: 'bash', code: 'copilot instruction list' },
      ],
    },
    {
      id: 'skills',
      title: 'Skills folders',
      content: [
        {
          type: 'list',
          items: [
            'Project skills: <code>.github/skills/</code>, <code>.agents/skills/</code> or <code>.claude/skills/</code>.',
            'Personal skills: <code>~/.copilot/skills/</code> or <code>~/.agents/skills/</code>.',
            'Manage them with <code>copilot skill list</code>, <code>add</code>, <code>remove</code>, <code>enable</code> and <code>disable</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: `Because Copilot also reads <code>.claude/skills/</code> and <code>.agents/skills/</code>, a project can keep one set of skills for several agents. See ${link('/en/guides/share-skills-between-claude-code-codex-antigravity', 'how to share skills between agents')}.`,
        },
      ],
    },
    {
      id: 'sessions',
      title: 'Where sessions live and how to resume them',
      content: [
        {
          type: 'paragraph',
          text: 'Each session gets its own folder. <code>workspace.yaml</code> holds the ID, working directory, name and timestamps; <code>events.jsonl</code> holds the conversation.',
        },
        {
          type: 'code',
          language: 'text',
          code: '~/.copilot/session-state/<session-id>/\n  workspace.yaml\n  events.jsonl',
        },
        {
          type: 'table',
          headers: ['Command', 'What it does'],
          rows: [
            ['<code>copilot --resume</code>', 'Opens a picker with your saved sessions'],
            ['<code>copilot --resume=&lt;value&gt;</code>', 'Resumes by session ID, ID prefix of 7 or more hex characters, or exact name (case does not matter)'],
            ['<code>copilot --continue</code>', 'Resumes the most recent session'],
            ['<code>copilot --session-id=&lt;uuid&gt;</code>', 'Resumes that session, or uses the UUID for a new one'],
            ['<code>copilot -n "my feature"</code>', 'Names a new session so you can resume it by name later'],
          ],
          caption: 'From copilot help in GitHub Copilot CLI 1.0.93.',
        },
        {
          type: 'paragraph',
          text: 'Inside a session, <code>/rename</code> changes its name. <code>copilot sessions import</code> brings in a session saved as JSONL. Add <code>--allow-all-tools</code> to a resume command only if you want that session to run tools without asking.',
        },
      ],
    },
    {
      id: 'codeagentswarm-history',
      title: 'Find and reopen sessions in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'GitHub Copilot CLI support arrives in the CodeAgentSwarm release after 2.4.3; it is not in a published version yet. With it, Conversation History lists your Copilot sessions next to those of your other agents. You can filter by agent and project, search inside the messages, bookmark a conversation and reopen it in Chat or in the terminal.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-history.webp',
          alt: 'GitHub Copilot CLI conversations filtered in CodeAgentSwarm history',
          caption: 'Real capture from a CodeAgentSwarm development build, with a sample conversation created for testing.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Subagent turns stay inside the session that started them, so each row is one conversation you can resume. A session started in Chat continues in the terminal through <code>copilot --resume</code>. The first time Copilot opens in a folder, it asks whether you trust that folder; answer once, or ask it to remember.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'A Chat conversation resumed in the GitHub Copilot CLI terminal with the folder trust prompt',
          caption: 'Real capture from a CodeAgentSwarm development build: a session started in Chat continues in the terminal, and Copilot asks for folder trust.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'You can also save a session as a shortcut and clean up old sessions one conversation at a time.',
        },
      ],
    },
    {
      id: 'codeagentswarm-mcp',
      title: 'The CodeAgentSwarm MCP entry is optional',
      content: [
        {
          type: 'paragraph',
          text: 'If you allow it in Settings > Privacy, CodeAgentSwarm adds its task and title tools as one entry in <code>~/.copilot/mcp-config.json</code> and a short section in <code>copilot-instructions.md</code>. Your own servers stay as they are.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Turning the option off removes only the CodeAgentSwarm entry. Copilot works without it.',
        },
        {
          type: 'paragraph',
          text: `For models and monthly usage, read ${link('/en/guides/github-copilot-cli-models-ai-credits', 'GitHub Copilot CLI models, AI credits and usage limits')}. To run several Copilot sessions side by side, see ${link('/en/guides/github-copilot-cli-agent-swarm', 'the GitHub Copilot CLI agent swarm guide')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Where is the MCP config file for GitHub Copilot CLI?',
      answer: 'Your personal servers live in ~/.copilot/mcp-config.json. A project can add .mcp.json or .github/mcp.json. Run copilot mcp list to see every server a session will load.',
    },
    {
      question: 'Do I need to add the GitHub MCP server myself?',
      answer: 'No. It is built in and available without setup. Start Copilot with --disable-builtin-mcps if you want a session without it.',
    },
    {
      question: 'Does Copilot CLI read AGENTS.md?',
      answer: 'Yes, from the repository: the git root and your current folder. An AGENTS.md in your home folder is not loaded; use ~/.copilot/copilot-instructions.md for personal instructions.',
    },
    {
      question: 'How do I resume a GitHub Copilot CLI session?',
      answer: 'Run copilot --continue for the most recent session, copilot --resume to pick one from a list, or copilot --resume with an ID, ID prefix or name for a specific one.',
    },
    {
      question: 'Can CodeAgentSwarm reopen sessions I started in the terminal?',
      answer: 'Yes, from the release after 2.4.3. Conversation History lists Copilot sessions, searches their messages and reopens any of them in Chat or in the terminal.',
    },
  ],
}

export default guide
