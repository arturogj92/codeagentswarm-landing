import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-agent-cli-acp-codeagentswarm',
    locale: 'en',
    title: 'Cursor CLI Guide: Install, Agent Mode and ACP',
    metaTitle: 'Cursor CLI Guide: Install Cursor Agent and Use ACP',
    metaDescription: 'Install Cursor CLI, sign in and run cursor-agent through ACP. Use Agent, Plan or Ask mode with streaming, permissions, MCP, Skills and images.',
    intro: `Cursor Agent CLI can run as a first-class agent inside CodeAgentSwarm through the official Agent Client Protocol (ACP). You keep your Cursor account, models, rules, skills and MCP configuration. CodeAgentSwarm adds a supervised Chat interface for streaming responses, tool activity, permission requests and cancellation.

The important command is <code>cursor-agent</code>. CodeAgentSwarm does not use the generic <code>agent</code> alias because another installed CLI can own that name. Cursor IDE and Cursor Agent CLI belong to the same product, but they are different interfaces: the IDE is the editor, while <code>cursor-agent</code> works from a terminal or an ACP client.`,
    ctaText: 'Run Cursor Agent beside your other coding agents with streaming Chat, visible permissions, project history and one place to supervise the work.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor Agent CLI', 'ACP'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-agent-cli-acp-codeagentswarm',
  },
  sections: [
    {
      id: 'what',
      title: 'What the Cursor ACP integration does',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm starts <code>cursor-agent acp</code> over stdio and speaks JSON-RPC. Cursor remains the model and tool provider. The app is the client that presents each turn, tool call and decision in the same workspace as Claude Code, Codex CLI, OpenCode, Kimi Code, Antigravity CLI and Grok Build.' },
        { type: 'list', items: ['Stream text and tool activity as Cursor produces it', 'Approve or reject command permissions without blocking the session', 'Cancel an active answer', 'Choose Cursor Agent, Plan or Ask mode', 'Choose models exposed by the active Cursor session', 'Attach images when the installed Cursor version advertises image support'] },
      ],
    },
    {
      id: 'install',
      title: 'Install and authenticate Cursor Agent CLI',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm detects <code>cursor-agent</code> explicitly and can run Cursor\'s official installer for macOS, Linux or native Windows when the CLI is missing.' },
        { type: 'code', language: 'bash', code: '# macOS or Linux\ncurl https://cursor.com/install -fsS | bash\n\n# Native Windows PowerShell\nirm \'https://cursor.com/install?win32=true\' | iex\n\ncursor-agent --version\ncursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'For CI or another non-interactive environment, Cursor also accepts <code>CURSOR_API_KEY</code>. In normal desktop use, the browser login uses your existing Cursor account and its subscription or usage.' },
        { type: 'callout', variant: 'info', content: 'On Windows, CodeAgentSwarm downloads Cursor\'s official PowerShell installer and verifies the native cursor-agent.cmd before starting Chat. It never falls back to a generic agent command.' },
      ],
    },
    {
      id: 'modes',
      title: 'Use Agent, Plan and Ask mode',
      content: [
        { type: 'paragraph', text: 'Choose the interaction before sending a prompt. <strong>Agent</strong> can inspect and change the project, <strong>Plan</strong> prepares an implementation approach before editing, and <strong>Ask</strong> is the read-only choice for explanations and investigation. CodeAgentSwarm preserves that selection when you reopen the Chat or move a session from the terminal view into Chat.' },
        { type: 'paragraph', text: 'The same Chat can display Cursor model choices and image attachments when the connected version advertises those ACP capabilities. Responses, tool calls and permission requests appear as they happen, and Stop cancels the active turn.' },
      ],
    },
    {
      id: 'mcp',
      title: 'MCP, rules, skills and Cursor extensions',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm reads user and project MCP servers from <code>.cursor/mcp.json</code> without modifying either file. Project entries override same-named user entries, and the merged servers are sent through ACP\'s native <code>mcpServers</code> field. Cursor rules and skills remain owned by Cursor.' },
        { type: 'paragraph', text: 'The ACP adapter also understands Cursor-specific requests for questions, plans, todos, delegated tasks and generated images. They become native CodeAgentSwarm timeline items instead of raw JSON.' },
        { type: 'paragraph', text: 'Keep installation, mode selection, MCP and Skills on this page. For focused workflows, continue with the guides to <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI conversation history</a>, <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">running a Cursor Agent swarm</a> or <a href="/en/guides/cursor-cli-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">using Cursor CLI on Windows</a>.' },
      ],
    },
    {
      id: 'resume',
      title: 'Conversation history and version compatibility',
      content: [
        { type: 'paragraph', text: 'Cursor versions differ in ACP resume support. CodeAgentSwarm enables ACP <code>session/load</code> only when the handshake reports <code>agentCapabilities.loadSession: true</code>. That avoids a resume button that could never work.' },
        { type: 'code', language: 'bash', code: 'cursor-agent update\n# cursor-agent upgrade works too' },
        { type: 'callout', variant: 'info', content: 'An older Cursor CLI can still start a new Chat. CodeAgentSwarm shows an update instruction and does not save that Chat as resumable until the capability is available.' },
        { type: 'paragraph', text: 'The dedicated <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">history and resume guide</a> explains what changes when an older ACP version reports <code>loadSession: false</code>.' },
      ],
    },
    {
      id: 'parallel',
      title: 'Run Cursor Agent beside other coding agents',
      content: [
        { type: 'paragraph', text: 'Create a Cursor Chat for one task and start Codex, Claude Code or another supported CLI for the next. Each agent gets its own session and project context while CodeAgentSwarm keeps status, permissions, task progress and history visible in one place.' },
        { type: 'paragraph', text: 'This is useful when you want Cursor models and project rules without moving every task into the Cursor editor, or when a mixed-agent workflow needs one shared supervision surface.' },
        { type: 'paragraph', text: 'See the <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent swarm guide</a> for isolation and task-splitting patterns, or compare the workflow in <a href="/en/guides/cursor-cli-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI vs Claude Code</a>.' },
      ],
    },
  ],
  faq: [
    { question: 'Does CodeAgentSwarm use the official Cursor Agent CLI?', answer: 'Yes. It launches the official cursor-agent binary in ACP mode over stdio and JSON-RPC.' },
    { question: 'Does Cursor Agent use my Cursor subscription?', answer: 'Yes. Sign in with cursor-agent login or provide CURSOR_API_KEY. Authentication and usage remain with Cursor.' },
    { question: 'Does Cursor MCP configuration still work?', answer: 'Yes. CodeAgentSwarm reads user and project .cursor/mcp.json files without modifying them and sends the merged servers through ACP.' },
    { question: 'Can CodeAgentSwarm resume every Cursor conversation?', answer: 'Only when the installed Cursor CLI advertises ACP loadSession support. Older versions can start new chats but show an update instruction instead of a broken resume action.' },
    { question: 'Does Cursor Agent CLI work on Windows?', answer: 'Yes. CodeAgentSwarm can install and run Cursor Agent natively on Windows with Cursor\'s official PowerShell installer.' },
  ],
}

export default guide
