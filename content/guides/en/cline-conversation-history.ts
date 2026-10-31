import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'cline-conversation-history',
    locale: 'en',
    title: 'Cline conversation history: find, search and resume sessions',
    metaTitle: 'Cline History: Find, Search and Resume Cline CLI Sessions',
    metaDescription: 'Where Cline CLI stores its sessions, how cline history and --id work, and how to search and reopen Cline conversations next to your other agents.',
    intro: 'Cline saves every session, but finding the one where you fixed that bug last week is another matter. This guide shows where Cline CLI keeps its history, the commands to list and resume sessions, and how CodeAgentSwarm 2.5.0, with Cline in beta, puts those sessions in one searchable history with your other agents. Cline facts were checked against the CLI reference on October 31, 2026.',
    ctaText: 'Search every Cline session in CodeAgentSwarm and reopen the right one in Chat or the terminal in two clicks.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'historial-conversaciones-cline',
    relatedSlug: 'how-to-use-cline-cli',
    socialImage: '/images/guides/cline-cli-og-en.png',
  },
  sections: [
    {
      id: 'where',
      title: 'Where Cline CLI stores its history',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'table',
          headers: ['What', 'Where'],
          rows: [
            ['Session index', '<code>~/.cline/data/db/sessions.db</code>'],
            ['Session files', '<code>~/.cline/data/sessions/&lt;id&gt;/</code>'],
            ['Move the data folder', '<code>CLINE_DATA_DIR</code> or <code>--data-dir</code>'],
          ],
          caption: `Source: ${link('https://docs.cline.bot/cli/cli-reference', 'Cline CLI reference')}, checked October 31, 2026.`,
        },
        {
          type: 'paragraph',
          text: 'The index is a SQLite database, and each session keeps its messages in its own folder. Back up the whole <code>~/.cline/data</code> folder if you want to keep your history when you move to another machine.',
        },
      ],
    },
    {
      id: 'commands',
      title: 'List and resume sessions from the terminal',
      content: [
        { type: 'code', language: 'bash', code: 'cline history            # list recent sessions\ncline history --limit 200\ncline history --json     # machine-readable list\ncline --id <session-id>  # resume one' },
        {
          type: 'paragraph',
          text: '<code>cline history</code> (or <code>cline h</code>) shows the last 50 sessions by default. It also has <code>export</code>, <code>delete</code> and <code>update</code> subcommands. To continue a session, pass its id to <code>--id</code>.',
        },
        {
          type: 'paragraph',
          text: 'The catch: the list is per tool. If you also use Claude Code, Codex or Copilot, each one keeps its own history in its own format, and there is no single place to search them all.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Cline history in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm reads the same Cline index, read-only, and lists your Cline sessions in Conversation History next to every other agent. Filter by agent to see only Cline, filter by project, or search inside the messages. Titles come from Cline\'s own session data.',
        },
        {
          type: 'image',
          src: '/images/guides/history-search-current.webp',
          alt: 'Conversation history search results in CodeAgentSwarm',
          caption: 'Conversation History search with sample conversations from other agents. Cline sessions appear in the same list, with their own agent filter.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Pick a session and reopen it where you want. The terminal view runs <code>cline --id &lt;id&gt;</code>. Chat loads the session through Cline\'s ACP server, so you keep the conversation and can switch between the two views.',
        },
        {
          type: 'image',
          src: '/images/guides/history-reopen-current.webp',
          alt: 'Conversation preview with the CLI and Chat reopening menu open',
          caption: 'After selecting a conversation, choose CLI or Chat. Sample conversation shown; the same menu appears for Cline sessions.',
          size: 'full',
        },
      ],
    },
    {
      id: 'details',
      title: 'Details worth knowing',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Only main sessions</strong>: Cline subagents run inside the session that started them, so the history shows one row per conversation you can resume.',
            '<strong>Old sessions in Chat</strong>: if your Cline version cannot load a session over ACP, Chat says so instead of opening an empty one. Update Cline or reopen it in the terminal.',
            '<strong>Cleaning up</strong>: deleting a Cline conversation from CodeAgentSwarm removes that session\'s files and leaves Cline\'s shared index intact.',
            '<strong>No forks yet</strong>: Cline\'s native conversation forks are not available in the 2.5.0 beta.',
          ],
        },
        {
          type: 'paragraph',
          text: `Related guides: ${link('/en/guides/how-to-use-cline-cli', 'how to install and use Cline CLI')}, ${link('/en/guides/cline-agent-swarm', 'running several Cline sessions in parallel')} and ${link('/en/guides/claude-code-history', 'Claude Code conversation history')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Where does Cline CLI save conversations?',
      answer: 'In ~/.cline/data: a SQLite index at db/sessions.db and one folder per session under sessions/. Set CLINE_DATA_DIR to move it.',
    },
    {
      question: 'How do I see my Cline history?',
      answer: 'Run cline history, or cline h. It lists the last 50 sessions by default; add --limit for more or --json for a machine-readable list.',
    },
    {
      question: 'How do I resume a Cline session?',
      answer: 'Run cline --id followed by the session id. In CodeAgentSwarm, pick the session in Conversation History and reopen it in the terminal or in Chat.',
    },
    {
      question: 'Can I search Cline conversations?',
      answer: 'Not across tools from the CLI. CodeAgentSwarm searches the messages of your Cline sessions together with those of your other agents.',
    },
  ],
}

export default guide
