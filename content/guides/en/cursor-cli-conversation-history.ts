import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-conversation-history',
    locale: 'en',
    title: 'Cursor CLI Conversation History: Find and Resume Sessions',
    metaTitle: 'Cursor CLI Conversation History and Resume Guide (2026)',
    metaDescription: 'Find Cursor CLI conversation history, check ACP resume support and reopen compatible Cursor Agent sessions in CodeAgentSwarm.',
    intro: `Cursor Agent CLI keeps sessions that you can return to later. The catch is that ACP resume support depends on the installed Cursor version. A recent version can advertise <code>agentCapabilities.loadSession: true</code> and reopen a session in Chat. Older versions can still start new chats, but they should not offer a resume action that will time out.

CodeAgentSwarm checks that capability before enabling Chat resume. You can browse Cursor conversations with the rest of your agent history, then reopen a compatible session or continue in a terminal when the installed CLI needs an update.`,
    ctaText: 'Keep Cursor Agent sessions visible beside your other coding agents, with resume controls that match the capability reported by your installed CLI.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Conversation History', 'Resume'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'historial-conversaciones-cursor-cli',
  },
  sections: [
    {
      id: 'how-history-works',
      title: 'How Cursor CLI conversation history works',
      content: [
        { type: 'callout', variant: 'tip', content: 'Quick answer: CodeAgentSwarm finds Cursor session records in the local history store. ACP loads the selected session in Chat only when the CLI handshake confirms <code>loadSession</code> support.' },
        { type: 'paragraph', text: 'A saved Cursor Agent session contains the context accumulated during a conversation. Reopening it can spare you from repeating the project goal, earlier decisions and the work already completed.' },
        { type: 'paragraph', text: 'CodeAgentSwarm presents Cursor sessions in the same history view as your other supported agents. That gives you one place to find work by project and date while Cursor remains responsible for the underlying session and model usage.' },
      ],
    },
    {
      id: 'check-resume-support',
      title: 'Check whether your Cursor CLI can resume through ACP',
      content: [
        { type: 'paragraph', text: 'ACP clients learn about resume support during the initial handshake. CodeAgentSwarm looks for <code>agentCapabilities.loadSession: true</code>. It does not assume that every installed Cursor version supports <code>session/load</code>.' },
        { type: 'code', language: 'bash', code: 'cursor-agent --version\ncursor-agent status\ncursor-agent update' },
        { type: 'callout', variant: 'info', content: 'If Chat resume is disabled, update Cursor Agent and open History again. A new Chat still works on older versions, so the missing capability does not prevent you from using Cursor Agent.' },
      ],
    },
    {
      id: 'resume-in-codeagentswarm',
      title: 'Resume a Cursor Agent session in CodeAgentSwarm',
      content: [
        { type: 'list', items: ['Open History from a CodeAgentSwarm terminal.', 'Choose a Cursor Agent conversation.', 'Select Chat when resume is available, or Terminal when the installed CLI does not advertise it.', 'Continue with the previous session context after Cursor loads it.'] },
        { type: 'paragraph', text: 'The capability check prevents the <code>session/load</code> timeout seen with older Cursor releases. When Chat resume is unavailable, the app explains that <code>cursor-agent update</code> is required instead of leaving the session waiting.' },
        { type: 'paragraph', text: 'For setup details, authentication, modes and MCP behavior, read the <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent CLI ACP guide</a>.' },
      ],
    },
    {
      id: 'history-in-a-swarm',
      title: 'Keep history useful when several agents are running',
      content: [
        { type: 'paragraph', text: 'History becomes more valuable when one project has several active sessions. Give each Cursor Agent a focused task, then use project and session context to return to the right thread instead of opening another blank chat.' },
        { type: 'paragraph', text: 'The <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent swarm guide</a> explains how to split work across sessions. If you are setting up another machine, the <a href="/en/guides/cursor-cli-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI on Windows guide</a> covers the native installer and command conflict that can affect detection.' },
      ],
    },
    {
      id: 'privacy-and-ownership',
      title: 'Who owns the session and its usage',
      content: [
        { type: 'paragraph', text: 'Cursor authenticates with your account through <code>cursor-agent login</code> or <code>CURSOR_API_KEY</code>. Its models, subscription and usage remain with Cursor. CodeAgentSwarm acts as the ACP client that displays and supervises the conversation.' },
        { type: 'paragraph', text: 'Your project and user MCP configuration still comes from <code>.cursor/mcp.json</code>. Resuming a session does not require duplicating that configuration in CodeAgentSwarm.' },
        { type: 'paragraph', text: 'For current plan details and the limits of published usage information, see <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI pricing and usage</a>.' },
      ],
    },
  ],
  faq: [
    { question: 'Can Cursor CLI resume old conversations?', answer: 'It can when the installed Cursor version advertises ACP loadSession support. CodeAgentSwarm checks that capability before enabling Chat resume.' },
    { question: 'Why is Chat resume disabled for a Cursor conversation?', answer: 'Your installed Cursor CLI may not advertise agentCapabilities.loadSession. Run cursor-agent update, then reopen History. You can still start a new Cursor Chat meanwhile.' },
    { question: 'Should I protect important work before updating Cursor Agent?', answer: 'Yes. Commit or otherwise checkpoint important project changes first, and check Cursor release notes if session retention matters to you. Cursor owns its session storage; CodeAgentSwarm does not rewrite it during an update.' },
    { question: 'Can I see Cursor sessions beside other agent conversations?', answer: 'Yes. CodeAgentSwarm presents Cursor Agent sessions in its shared conversation history alongside other supported agents.' },
    { question: 'Does resumed Cursor usage count against my Cursor plan?', answer: 'Yes. Authentication and model usage remain with your Cursor account or CURSOR_API_KEY whether you start a new session or resume a compatible one.' },
  ],
}

export default guide
