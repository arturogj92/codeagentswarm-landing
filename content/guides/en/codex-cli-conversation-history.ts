import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-cli-conversation-history',
    locale: 'en',
    title: 'How to Find and Resume Your Codex CLI Conversation History',
    metaTitle: 'Codex CLI Conversation History: How to Find and Resume Your Sessions (2026)',
    metaDescription: 'How to find your Codex CLI conversation history, resume a past session, and search every Codex conversation by keyword. Native Codex resume plus CodeAgentSwarm searchable history across all your agents.',
    intro: `Codex CLI keeps a history of your sessions. Each conversation is stored locally as you work, and you can resume a past session to pick up where you left off instead of starting from a blank slate every time. That alone saves you from re-explaining the same module to Codex over and over.

The limitation shows up once you have dozens of Codex sessions across several projects. The native history is fine for jumping back into your last conversation, but it has no full-text search, no preview of what each session was actually about, and no single view across projects.

The short version: your Codex CLI history is already on your machine and you can resume from it. CodeAgentSwarm turns that history into a searchable, cross-project memory you can resume from any terminal, even when the conversation belongs to a different Codex session, a different project, or a different agent entirely.`,
    ctaText: 'Stop scrolling through old Codex sessions one by one. Search your full Codex CLI history by keyword and resume the right conversation from any terminal in CodeAgentSwarm.',
    highlightedWords: ['history', 'Codex CLI', 'resume'],
    publishedAt: '2026-06-24',
    updatedAt: '2026-06-24',
    alternateSlug: 'historial-conversaciones-codex',
  },
  sections: [
    {
      id: 'what-is-codex-history',
      title: 'What is Codex CLI conversation history',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: Codex CLI saves your sessions locally as you work, and you can resume a past session to continue it with its previous context intact. The rest of this guide shows how to resume natively, and how to make every Codex conversation searchable across all your projects.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm searchable conversation history showing past Codex CLI sessions organized by project with a search bar and dates',
          src: '/images/guides/conversation-history.png',
          caption: 'Searchable conversation history in CodeAgentSwarm, with your Codex sessions organized by project and date.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI conversation history is the record of your past sessions with the agent: what you asked, what Codex did, and the context that built up along the way. Because each Codex session is its own process with its own conversation, that history is what lets you come back to a piece of work later instead of re-explaining everything from scratch.',
        },
        {
          type: 'paragraph',
          text: 'If you already use the <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, you have probably resumed a previous session at least once. That native resume is genuinely useful, but it is built for the simple case: get back into a recent conversation. Once you accumulate many Codex sessions across multiple projects, you need a way to actually find the right one, and that is where this guide goes next.',
        },
      ],
    },
    {
      id: 'native-codex-history',
      title: 'Native Codex CLI history and resume',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI stores your sessions on your machine as you work, so a conversation is not lost the moment you close the terminal. The core capability you get out of the box is the ability to resume a previous session: instead of opening a fresh conversation, you continue an existing one with its accumulated context.',
        },
        {
          type: 'paragraph',
          text: 'In practice that means you can:',
        },
        {
          type: 'list',
          items: [
            'Resume your most recent Codex session and keep going where you stopped',
            'Pick an earlier session to continue, rather than always starting over',
            'Keep the context a session built up - decisions, explanations, the shape of the code you discussed',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Resume flags and storage paths change between Codex CLI versions, so check <code>codex --help</code> and the official Codex docs for the exact command in your version. The capability is consistent: Codex keeps your sessions and lets you continue a past one.',
        },
        {
          type: 'paragraph',
          text: 'This is the same idea as resuming a Claude Code conversation, just for Codex. If you also run Claude Code, the companion guide on <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code conversation history</a> covers the equivalent flow for that agent.',
        },
      ],
    },
    {
      id: 'the-problem',
      title: 'Where native Codex history starts to hurt',
      content: [
        {
          type: 'paragraph',
          text: 'Native resume is perfect when the conversation you want is your last one or close to it. The friction starts when it is not. Once you are running Codex seriously, across several projects and many sessions, the limitations stack up fast:',
        },
        {
          type: 'list',
          items: [
            '<strong>No full-text search.</strong> You cannot search for "that database migration session from last week" across your Codex history. You are left scrolling a list or remembering which session it was.',
            '<strong>No content preview.</strong> A list of sessions tells you little about what each one actually contained, so you open the wrong one and back out more than once.',
            '<strong>No cross-project view.</strong> History is anchored to where the session ran. Finding work from another project means going there first.',
            '<strong>No filtering.</strong> You cannot narrow down by project, by date, or by what the conversation was about.',
            '<strong>No view across agents.</strong> If you also run Claude Code or Gemini CLI, each agent keeps its own history in its own place, so there is no single place to look.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you use Codex on one project now and then, none of this matters. If Codex is part of your daily workflow across many repositories, you start spending real time just trying to find the conversation you want to resume.',
        },
      ],
    },
    {
      id: 'searchable-history-codeagentswarm',
      title: 'Searchable Codex history across agents with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> runs your Codex CLI agents in a desktop workspace and records every conversation automatically: what you wrote, what Codex did, which project you were in, and when it happened. That record becomes a searchable history that works across every project and, crucially, across every agent. The same view holds your Codex, Claude Code, and Gemini CLI conversations together.',
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
          alt: 'A past Codex conversation reopened in a CodeAgentSwarm terminal with previous messages visible and the input ready to continue',
          src: '/images/guides/resume-conversation.png',
          caption: 'Resume any Codex conversation exactly where you left off, with its previous context loaded.',
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
          text: 'Both let you resume a past Codex conversation. The difference is how easily you find the right one once you have many of them:',
        },
        {
          type: 'list',
          items: [
            '<strong>Resuming your last session:</strong> Native Codex handles this well on its own.',
            '<strong>Finding an older session by keyword:</strong> Native has no full-text search; CodeAgentSwarm searches inside the content.',
            '<strong>Working across projects:</strong> Native history is anchored to where the session ran; CodeAgentSwarm gives you one cross-project view.',
            '<strong>Working across agents:</strong> Each CLI keeps its own history; CodeAgentSwarm holds Codex, Claude Code and Gemini conversations together.',
            '<strong>Resuming from anywhere:</strong> Native means navigating to the right place; CodeAgentSwarm resumes any conversation from any terminal.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you only ever bounce back into your most recent Codex session, native resume is all you need. The moment you are hunting for "which session did I fix that in," searchable history is the better answer.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Codex CLI save conversation history?',
      answer: 'Yes. Codex CLI keeps your sessions locally as you work, so a conversation is not lost when you close the terminal. You can resume a past session to continue it with its previous context. Check codex --help and the official Codex docs for the exact resume command in your version.',
    },
    {
      question: 'How do I resume a previous Codex session?',
      answer: 'Natively, Codex CLI lets you resume a past session so you continue it instead of starting fresh. The exact flag depends on your Codex version, so check codex --help. In CodeAgentSwarm you open the History view or resume mode, find the conversation, and reopen it in any terminal with its previous context loaded.',
    },
    {
      question: 'Where is Codex CLI history stored?',
      answer: 'Codex CLI stores sessions locally on your machine, and the exact location can change between versions, so confirm it in the official Codex documentation for your install. CodeAgentSwarm records its own searchable copy of every conversation so you can search and resume across projects and agents without depending on raw file paths.',
    },
    {
      question: 'Can I search across all my Codex conversations?',
      answer: 'Native Codex history has no full-text search, so you scroll or remember. CodeAgentSwarm provides instant full-text search across every Codex conversation, in every project, with message previews so you can confirm the right session before opening it.',
    },
    {
      question: 'Does Codex history work across different projects?',
      answer: 'Native Codex history is anchored to where each session ran, so finding work from another project means going there first. CodeAgentSwarm organizes conversations by project, lets you filter to one, and resumes any of them from any terminal.',
    },
    {
      question: 'Can I see my Codex and Claude Code history together?',
      answer: 'Yes, in CodeAgentSwarm. Because you pick the agent per terminal, history is not siloed by tool. The same searchable view holds your Codex, Claude Code and Gemini CLI conversations, so you can trace and resume work no matter which agent did it.',
    },
  ],
}

export default guide
