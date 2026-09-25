import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-cli-conversation-history',
    locale: 'en',
    title: 'How to Find and Resume Your Codex CLI Conversation History',
    metaTitle: 'Codex CLI Conversation History: How to Find and Resume Your Sessions (2026)',
    metaDescription: 'How to find your Codex CLI conversation history, resume a past session, and search every Codex conversation by keyword. Native Codex resume plus CodeAgentSwarm searchable history across all your agents.',
    intro: 'Run codex resume to pick a saved conversation, codex resume --last to continue the most recent, or codex resume --all to include other projects. Transcripts are stored in $CODEX_HOME/sessions, which defaults to ~/.codex/sessions.\n\nThis guide explains how to resume a session and bring conversations from different agents into one view in CodeAgentSwarm.',
    ctaText: 'Search your Codex conversations by content and filter by project in CodeAgentSwarm. Open the session you need alongside your other tasks. Available for macOS and Windows.',
    ctaAgent: 'codex',
    highlightedWords: ['history', 'Codex CLI', 'resume'],
    publishedAt: '2026-06-24',
    updatedAt: '2026-09-25',
    alternateSlug: 'historial-conversaciones-codex',
  },
  sections: [
    {
      id: 'what-is-codex-history',
      title: 'What is Codex CLI conversation history',
      content: [
        {
          type: 'paragraph',
          text: 'To return to a conversation, open the session picker:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex resume',
        },
        {
          type: 'paragraph',
          text: 'If the conversation is missing, try <code>codex resume --all</code> to remove the current-directory filter. Also check that you are using the same <code>CODEX_HOME</code> configuration.',
        },
        {
          type: 'paragraph',
          text: 'To search conversations across agents from one window, see the <a href="/en/guides/codex-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex GUI</a>. To continue several tasks at once, follow the <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">parallel Codex sessions guide</a>.',
        },
      ],
    },
    {
      id: 'native-codex-history',
      title: 'Native Codex CLI history and resume',
      content: [
        {
          type: 'table',
          headers: [
            'Command',
            'Use',
          ],
          rows: [
            [
              'codex resume',
              'Open the session picker.',
            ],
            [
              'codex resume --last',
              'Continue the most recent session.',
            ],
            [
              'codex resume --all',
              'Include sessions from other directories.',
            ],
            [
              'codex resume SESSION_ID',
              'Resume a session by ID.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Options checked with <code>codex resume --help</code> in Codex CLI 0.156.0 on September 25, 2026. Check your installed version’s help if its behavior differs.',
        },
        {
          type: 'paragraph',
          text: 'Transcripts live in <code>$CODEX_HOME/sessions</code>, which defaults to <code>~/.codex/sessions</code>. See <a href="https://learn.chatgpt.com/docs/reference/troubleshooting" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenAI’s documented paths</a>. Keep a private backup of important conversations before changing or cleaning up those files.',
        },
      ],
    },
    {
      id: 'the-problem',
      title: 'When a shared history across agents helps',
      content: [
        {
          type: 'paragraph',
          text: 'The native Codex picker already lets you resume sessions from other projects with <code>--all</code>. If you also use Claude Code or other agents, CodeAgentSwarm brings available conversations into a view with content search and project and agent filters.',
        },
      ],
    },
    {
      id: 'searchable-history-codeagentswarm',
      title: 'Searchable Codex history across agents with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> runs your Codex CLI agents in a desktop workspace and records every conversation automatically: what you wrote, what Codex did, which project you were in, and when it happened. That record becomes a searchable history that works across every project and, crucially, across every agent. The same view holds your Codex, Claude Code, and Antigravity CLI conversations together.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full-text search across every Codex conversation',
          id: 'full-text-search',
        },
        {
          type: 'paragraph',
          text: 'Type what you remember - a module name, a bug, a technology - and CodeAgentSwarm searches inside the content of all your conversations, not just titles. Results show the conversation title, the project, the date, and the matching messages, so you can confirm it is the right Codex session before you open it.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Filter by project',
          id: 'filter-by-project',
        },
        {
          type: 'paragraph',
          text: 'Conversations are organized by project, each with its own color, so a long history stays readable. When you work across several repositories at once you can filter to a single project and see only the Codex sessions that belong to it, instead of one giant flat list.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Works across agents, not just Codex',
          id: 'across-agents',
        },
        {
          type: 'paragraph',
          text: 'Because CodeAgentSwarm lets you pick the agent per terminal, your history is not siloed by tool. Search "auth refactor" and you see the Codex session where you started it and the Claude Code session where you finished it, side by side. For the broader picture of running mixed agents, see the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview, and for Codex specifically the <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex agent swarm</a> guide.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Resume from any terminal',
          id: 'resume-any-terminal',
        },
        {
          type: 'paragraph',
          text: 'Found the conversation you need? Open it and CodeAgentSwarm brings it back with its previous context, in any terminal, regardless of which project it started in. You do not navigate to a directory and remember a session id by hand. You search, select, and keep working.',
        },
      ],
    },
    {
      id: 'how-to-open-history',
      title: 'How to open your Codex history from any terminal',
      content: [
        {
          type: 'paragraph',
          text: 'No matter which Codex terminal you are in, the history is one click away:',
        },
        {
          type: 'list',
          items: [
            'In any terminal, click the "History" button.',
            'A modal opens with your recent conversations across projects and agents.',
            'From there you can search the content, filter by project, and open any conversation.',
          ],
        },
        {
          type: 'image',
          alt: 'History modal opened from a Codex terminal in CodeAgentSwarm with a search bar at the top and a list of past conversations below',
          src: '/images/guides/conversation-history-button.png',
          caption: 'The History button gives you instant access to every past Codex conversation, with search and project filters.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'resume-a-codex-conversation',
      title: 'How to resume a past Codex conversation',
      content: [
        {
          type: 'paragraph',
          text: 'When you open a project in CodeAgentSwarm you can choose resume mode instead of starting a blank conversation. In resume mode you see all your recent conversations for that project and pick exactly which Codex session to continue.',
        },
        {
          type: 'paragraph',
          text: 'From that view you can:',
        },
        {
          type: 'list',
          items: [
            'See all your previous conversations organized by date',
            'Search the content to find a specific session, not just scroll',
            'Choose exactly which Codex conversation to continue',
            'Or start a fresh conversation if that is what you want',
          ],
        },
        {
          type: 'image',
          alt: 'Current CodeAgentSwarm Conversation History with search, agent and project filters, and selectable past sessions',
          src: '/images/guides/resume-conversation.png',
          caption: 'Search, filter and select the Codex conversation you want to resume from the current Conversation History.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'If you searched first, selecting a conversation shows the messages where your search terms appear, so you confirm it is the right one before opening it. Once you choose it, CodeAgentSwarm reopens it with the prior context so Codex remembers what you decided and what you built, and you continue as if no time had passed.',
        },
      ],
    },
    {
      id: 'why-history-matters',
      title: 'Why Codex conversation history changes how you work',
      content: [
        {
          type: 'paragraph',
          text: 'Treating your Codex history as a searchable memory, rather than a pile of old sessions, has a direct effect on day-to-day work:',
        },
        {
          type: 'list',
          items: [
            '<strong>Stop re-explaining modules.</strong> If you spent fifteen minutes giving Codex context on your auth layer, resume that session instead of explaining it again from zero.',
            '<strong>Keep decisions consistent.</strong> Architecture choices pile up across sessions. Resuming the right one keeps you from contradicting a decision you made days ago.',
            '<strong>Save tokens and time.</strong> Re-explaining context burns both. Continuing a session that already has the context is cheaper and faster.',
            '<strong>Handle many projects calmly.</strong> When you can search and resume any Codex conversation from any project, switching repositories stops being a context-switching tax.',
            '<strong>Never lose a fix.</strong> That clever solution from late last night is in your history. Search for it, resume it, reuse it.',
          ],
        },
        {
          type: 'paragraph',
          text: 'History pays off even more when you run several Codex agents at once. If that is your setup, the guide on <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Codex sessions</a> covers how to keep a swarm organized.',
        },
      ],
    },
    {
      id: 'native-vs-codeagentswarm',
      title: 'Native Codex resume vs CodeAgentSwarm history',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI lets you pick a session, continue the last one or include other projects. CodeAgentSwarm adds a shared view of conversations from several agents. You can use the native picker for a specific session and the app to organize work across projects.',
        },
      ],
    },

  ],
  faq: [
    {
      question: 'Does Codex CLI save conversation history?',
      answer: 'Yes. You can continue a saved conversation with codex resume. Keep a private backup if you need to protect history from deletion or configuration changes.',
    },
    {
      question: 'How do I resume a previous Codex session?',
      answer: 'Run codex resume to pick it, codex resume --last to continue the most recent, or codex resume SESSION_ID if you know its identifier.',
    },
    {
      question: 'Where is Codex CLI history stored?',
      answer: 'Transcripts are stored in $CODEX_HOME/sessions, which defaults to ~/.codex/sessions. If you changed CODEX_HOME, check that location.',
    },
    {
      question: 'Can I search across all my Codex conversations?',
      answer: 'CodeAgentSwarm lets you search the content of available conversations and filter by project and agent. To choose a session in Codex CLI, use codex resume.',
    },
    {
      question: 'Does Codex history work across different projects?',
      answer: 'Yes. Run codex resume --all to include sessions from other directories. CodeAgentSwarm also provides project filters in its shared history across agents.',
    },
    {
      question: 'Can I see my Codex and Claude Code history together?',
      answer: 'Yes, in CodeAgentSwarm. Because you pick the agent per terminal, history is not siloed by tool. The same searchable view holds your Codex, Claude Code and Antigravity CLI conversations, so you can trace and resume work no matter which agent did it.',
    },
  ],
}

export default guide
