import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-agent-swarm',
    locale: 'en',
    title: 'How to Run a Cursor Agent Swarm',
    metaTitle: 'Cursor Agent Swarm: Run Multiple CLI Sessions (2026)',
    metaDescription: 'Run multiple Cursor Agent CLI sessions in CodeAgentSwarm. Split tasks, use Agent, Plan or Ask, supervise permissions and keep Cursor MCP settings.',
    intro: `A Cursor Agent swarm is a group of Cursor CLI sessions working on separate tasks at the same time. Each session has its own conversation and project context. CodeAgentSwarm puts those sessions in one desktop workspace so you can see which one is working, waiting for permission or ready for your input.

This setup uses the official <code>cursor-agent</code> command and its ACP transport. Your Cursor login, subscription, model usage and <code>.cursor/mcp.json</code> configuration stay with Cursor.`,
    ctaText: 'Run focused Cursor Agent sessions in parallel and supervise their progress, permissions and history from one workspace.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor Agent', 'Swarm'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'enjambre-de-agentes-cursor-cli',
  },
  sections: [
    {
      id: 'what-is-a-cursor-swarm',
      title: 'What is a Cursor Agent swarm?',
      content: [
        { type: 'callout', variant: 'tip', content: 'A useful swarm gives each Cursor Agent one bounded task. Parallel sessions help only when their responsibilities are clear enough to avoid editing the same code blindly.' },
        { type: 'paragraph', text: 'The word swarm describes the workflow, not a separate Cursor product. You start several official Cursor Agent CLI sessions, assign independent work and supervise the results together.' },
        { type: 'paragraph', text: 'CodeAgentSwarm starts Cursor through <code>cursor-agent acp</code>. Text, tool activity, permission requests and cancellations flow through ACP while each session continues to use your Cursor account.' },
      ],
    },
    {
      id: 'prepare-cursor',
      title: 'Prepare Cursor Agent CLI',
      content: [
        { type: 'code', language: 'bash', code: 'cursor-agent --version\ncursor-agent login\ncursor-agent status' },
        { type: 'paragraph', text: 'You can use <code>CURSOR_API_KEY</code> instead of interactive login where appropriate. CodeAgentSwarm detects <code>cursor-agent</code> explicitly, which matters on machines where the generic <code>agent</code> command belongs to Grok.' },
        { type: 'paragraph', text: 'The complete installation and ACP flow is documented in the <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent CLI setup guide</a>. Native Windows setup has its own <a href="/en/guides/cursor-cli-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI on Windows guide</a>.' },
      ],
    },
    {
      id: 'split-the-work',
      title: 'Split work into parallel Cursor sessions',
      content: [
        { type: 'paragraph', text: 'Start with tasks that have different files or clear handoff points. One session can inspect a failing test while another drafts documentation. A third can use Plan mode to map a larger change before anyone edits it.' },
        { type: 'list', items: ['Use Agent mode for implementation that needs tools and file changes.', 'Use Plan mode to investigate and produce an approach before execution.', 'Use Ask mode for explanations and questions that should not begin a coding task.', 'Give each session a concrete outcome and a project path.', 'Review permission requests and changed files before combining related work.'] },
        { type: 'callout', variant: 'warning', content: 'Two agents editing the same lines can still conflict. Separate the work by component, file set or dependency order, then integrate it with normal version control review.' },
      ],
    },
    {
      id: 'supervise-the-swarm',
      title: 'Supervise streaming, permissions and cancellation',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm streams Cursor text and tool calls into each Chat. A permission request remains visible and can be approved or rejected from the app, so one waiting session does not hide among terminal tabs.' },
        { type: 'paragraph', text: 'Cancel the active response when a task is heading in the wrong direction. Cancellation stops that turn without requiring you to close the whole workspace.' },
        { type: 'paragraph', text: 'Cursor extensions such as questions, plans, todos, delegated tasks and generated images appear as structured timeline items when the active CLI exposes them.' },
      ],
    },
    {
      id: 'mcp-and-models',
      title: 'Keep Cursor MCP servers, models and images',
      content: [
        { type: 'paragraph', text: 'Cursor reads project or user MCP configuration from <code>.cursor/mcp.json</code>. CodeAgentSwarm passes the merged server configuration through ACP instead of asking you to maintain another copy.' },
        { type: 'paragraph', text: 'Each Chat can use the modes and model choices exposed by the Cursor session. Image attachments are available when the installed Cursor version advertises image support.' },
        { type: 'paragraph', text: 'Usage across parallel sessions draws from your Cursor account. Check <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI pricing and usage</a> before deciding how many agents to keep active.' },
      ],
    },
    {
      id: 'history-and-resume',
      title: 'Return to the right Cursor session',
      content: [
        { type: 'paragraph', text: 'Several parallel sessions create several histories. Name work clearly and use the shared History view to return to the session that already knows the task.' },
        { type: 'paragraph', text: 'ACP Chat resume is enabled only when Cursor reports <code>agentCapabilities.loadSession: true</code>. The <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI conversation history guide</a> explains the fallback for older versions.' },
      ],
    },
  ],
  faq: [
    { question: 'Can I run multiple Cursor Agent sessions at once?', answer: 'Yes. Each cursor-agent process can run a separate task, and CodeAgentSwarm gives those sessions one workspace for status, streaming, permissions and history.' },
    { question: 'Does a Cursor Agent swarm require a separate Cursor account?', answer: 'No. Sessions authenticate through your existing Cursor login or CURSOR_API_KEY and consume that account\'s subscription or usage.' },
    { question: 'Which Cursor mode should each agent use?', answer: 'Use Agent for implementation, Plan for investigation and planning, and Ask for questions or explanations. The available choices come from the Cursor ACP session.' },
    { question: 'Do Cursor MCP servers work in every swarm session?', answer: 'CodeAgentSwarm reads user and project .cursor/mcp.json and passes the merged configuration through ACP for Cursor sessions.' },
    { question: 'How do I avoid conflicts between Cursor agents?', answer: 'Assign separate components, files or stages of work. Review permissions and changes before integrating work that touches related code.' },
  ],
}

export default guide
