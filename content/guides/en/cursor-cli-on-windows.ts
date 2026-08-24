import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-on-windows',
    locale: 'en',
    title: 'How to Install and Run Cursor CLI on Windows',
    metaTitle: 'Cursor CLI on Windows: Native Install (2026)',
    metaDescription: 'Install Cursor Agent CLI natively on Windows with the official PowerShell installer, sign in, avoid the Grok agent conflict and start ACP Chat.',
    intro: `Cursor provides a native Windows installer for Cursor Agent CLI. Run the official PowerShell command, verify the explicit <code>cursor-agent</code> executable and sign in with your Cursor account. You do not need to substitute the generic <code>agent</code> command.

That command name matters. On a Windows machine that also has Grok installed, <code>agent</code> may belong to Grok. Cursor's documented binary is <code>cursor-agent</code>, and CodeAgentSwarm detects that exact executable.`,
    ctaText: 'Install Cursor Agent natively on Windows and run its ACP Chat beside your other coding agents in CodeAgentSwarm.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Windows'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'cursor-cli-en-windows',
  },
  sections: [
    {
      id: 'requirements',
      title: 'What you need before installing Cursor CLI',
      content: [
        { type: 'list', items: ['A Windows user account that can run PowerShell commands', 'A Cursor account for interactive login, or CURSOR_API_KEY', 'A project folder that Cursor Agent can access', 'CodeAgentSwarm if you want the ACP Chat interface and multi-agent supervision'] },
        { type: 'callout', variant: 'info', content: 'Cursor Agent CLI is currently described by Cursor as beta software. Commands and capabilities can change between releases, so check the official Cursor documentation when upgrading.' },
      ],
    },
    {
      id: 'install-native',
      title: 'Install Cursor Agent with the official Windows command',
      content: [
        { type: 'paragraph', text: 'Open PowerShell and run Cursor\'s native Windows installer:' },
        { type: 'code', language: 'powershell', code: "irm 'https://cursor.com/install?win32=true' | iex" },
        { type: 'paragraph', text: 'Close and reopen PowerShell if the installer changed your PATH. Then verify the installed command:' },
        { type: 'code', language: 'powershell', code: 'cursor-agent --version\nGet-Command cursor-agent' },
        { type: 'paragraph', text: 'CodeAgentSwarm can run the same official installer when Cursor Agent is missing. It checks the native <code>cursor-agent.cmd</code> before starting Chat.' },
      ],
    },
    {
      id: 'authenticate',
      title: 'Sign in and check authentication',
      content: [
        { type: 'code', language: 'powershell', code: 'cursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'The login flow connects the CLI to your Cursor account, and Cursor consumes the subscription or usage attached to that account. For a non-interactive environment, provide <code>CURSOR_API_KEY</code> through your normal secret-management process.' },
        { type: 'paragraph', text: 'Use <code>cursor-agent logout</code> when you need to remove the current login from the machine.' },
      ],
    },
    {
      id: 'avoid-agent-conflict',
      title: 'Avoid the agent command conflict with Grok',
      content: [
        { type: 'paragraph', text: 'Do not use <code>agent</code> as a shortcut for Cursor. Another installed CLI can own that command, and Grok is a known example. A successful response from <code>agent --version</code> does not prove that Cursor is installed.' },
        { type: 'code', language: 'powershell', code: 'Get-Command cursor-agent\nGet-Command agent -ErrorAction SilentlyContinue\n\n# Start Cursor explicitly\ncursor-agent' },
        { type: 'callout', variant: 'warning', content: 'If <code>agent</code> resolves to Grok, leave it alone. Use <code>cursor-agent</code> for Cursor and let each product keep its own executable.' },
      ],
    },
    {
      id: 'run-in-codeagentswarm',
      title: 'Start Cursor ACP Chat in CodeAgentSwarm',
      content: [
        { type: 'paragraph', text: 'Select Cursor Agent when creating a Chat. CodeAgentSwarm launches <code>cursor-agent acp</code> over stdio, completes the ACP handshake and streams text and tool calls into the conversation.' },
        { type: 'paragraph', text: 'You can use Agent, Plan or Ask when the session exposes those modes, choose available models, answer permission requests and cancel an active response. Project and user MCP servers are read from <code>.cursor/mcp.json</code>.' },
        { type: 'paragraph', text: 'For the complete feature flow, read the <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent CLI ACP guide</a>. To organize several Windows sessions, continue with the <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent swarm guide</a>.' },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Fix common Cursor CLI problems on Windows',
      content: [
        { type: 'list', items: ['<strong>cursor-agent is not recognized:</strong> reopen PowerShell after installation and run <code>Get-Command cursor-agent</code>. If it is still missing, rerun the official installer.', '<strong>The wrong agent opens:</strong> confirm you typed <code>cursor-agent</code>, not <code>agent</code>. Use <code>Get-Command</code> to see which executable Windows resolved.', '<strong>Authentication fails:</strong> run <code>cursor-agent status</code>, then repeat <code>cursor-agent login</code> or check CURSOR_API_KEY.', '<strong>History Chat times out:</strong> run <code>cursor-agent update</code>. Older ACP versions may not advertise <code>loadSession</code>.', '<strong>MCP tools are missing:</strong> check the project or user <code>.cursor/mcp.json</code> and restart the session after correcting it.'] },
        { type: 'paragraph', text: 'The <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI conversation history guide</a> explains why resume is conditional. Plan and usage details are in <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI pricing and usage</a>.' },
      ],
    },
  ],
  faq: [
    { question: 'Does Cursor Agent CLI run natively on Windows?', answer: 'Yes. Cursor provides an official native Windows PowerShell installer at https://cursor.com/install?win32=true.' },
    { question: 'What command installs Cursor CLI on Windows?', answer: "Run irm 'https://cursor.com/install?win32=true' | iex in PowerShell, then reopen the shell and verify cursor-agent --version." },
    { question: 'Should I run agent or cursor-agent?', answer: 'Run cursor-agent. The generic agent command can belong to another product such as Grok, so it is not a reliable way to launch Cursor.' },
    { question: 'How do I sign in to Cursor CLI on Windows?', answer: 'Run cursor-agent login and confirm with cursor-agent status. Non-interactive environments can use CURSOR_API_KEY.' },
    { question: 'Why can I start a new Cursor Chat but not resume one?', answer: 'Your installed Cursor version may support new ACP sessions without advertising loadSession. Run cursor-agent update and check again.' },
  ],
}

export default guide
