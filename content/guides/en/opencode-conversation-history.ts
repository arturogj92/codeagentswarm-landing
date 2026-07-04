import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-conversation-history',
    locale: 'en',
    title: 'How to Find and Resume Your OpenCode Conversation History',
    metaTitle: 'OpenCode Conversation History: Find and Resume Your Sessions (2026)',
    metaDescription: 'Find your opencode conversation history, resume the last session with --continue or a specific one with --session, and search every opencode conversation by keyword across projects.',
    intro: `opencode keeps a history of your sessions. Each conversation is stored locally as you work, and you can resume a past one to pick up where you left off. Resume the most recent session with \`opencode --continue\`, or jump straight to a specific one with \`opencode --session <id>\`. That alone saves you from re-explaining the same module to opencode over and over.

The limitation shows up once you have dozens of opencode sessions across several projects. The native history is fine for continuing your last conversation, but it has no full-text search, no preview of what each session was actually about, and it makes you remember session ids to reach anything older than the last one.

The short version: your opencode history is already on your machine and you can resume from it. CodeAgentSwarm turns that history into a searchable, cross-project memory you can resume from any terminal, even when the conversation belongs to a different opencode session, a different project, or a different agent entirely.`,
    ctaText: 'Stop scrolling through old opencode sessions one by one. Search your full opencode history by keyword and resume the right conversation from any terminal in CodeAgentSwarm.',
    highlightedWords: ['history', 'OpenCode', 'resume'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'historial-conversaciones-opencode',
  },
  sections: [
    {
      id: 'what-is-opencode-history',
      title: 'What is opencode conversation history',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: opencode saves your sessions locally as you work. Resume the last one with <code>opencode --continue</code> or a specific one with <code>opencode --session &lt;id&gt;</code>. The rest of this guide shows how to resume natively, and how to make every opencode conversation searchable across all your projects.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm searchable conversation history showing past opencode sessions organized by project with a search bar and dates',
          src: '/images/guides/conversation-history.png',
          caption: 'Searchable conversation history in CodeAgentSwarm, with your opencode sessions organized by project and date.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'opencode conversation history is the record of your past sessions with the agent: what you asked, what opencode did, and the context that built up along the way. Because each opencode session is its own conversation, that history is what lets you come back to a piece of work later instead of re-explaining everything from scratch.',
        },
        {
          type: 'paragraph',
          text: 'If you already use <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a>, SST\'s open-source terminal agent, you have probably resumed a previous session at least once. That native resume is genuinely useful, but it is built for the simple case: get back into a recent conversation. Once you accumulate many opencode sessions across multiple projects, you need a way to actually find the right one, and that is where this guide goes next.',
        },
      ],
    },
    {
      id: 'native-opencode-history',
      title: 'Native opencode history and resume',
      content: [
        {
          type: 'paragraph',
          text: 'opencode stores your sessions on your machine as you work, so a conversation is not lost the moment you close the terminal. Unlike some agents, opencode ships clear resume commands, so you do not have to guess at flags: continue your most recent session, or open a specific one by its id.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Resume your most recent opencode session
opencode --continue    # short form: -c

# Resume a specific session by id
opencode --session <session-id>    # short form: -s`,
        },
        {
          type: 'paragraph',
          text: 'In practice that means you can:',
        },
        {
          type: 'list',
          items: [
            'Jump back into your last session with <code>opencode --continue</code> and keep going where you stopped',
            'Pick a specific session with <code>opencode --session &lt;id&gt;</code> if you know its id',
            'Keep the context a session built up - decisions, explanations, the shape of the code you discussed',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'opencode is provider-agnostic and configured from <code>~/.config/opencode/opencode.json</code>. Exactly where sessions are stored on disk, and any extra history tooling, are documented in the official opencode docs. The resume commands above are the part you use day to day.',
        },
        {
          type: 'paragraph',
          text: 'This is the same idea as resuming a Claude Code conversation, just for opencode. If you also run Claude Code, the companion guide on <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code conversation history</a> covers the equivalent flow for that agent.',
        },
      ],
    },
    {
      id: 'the-problem',
      title: 'Where native opencode history starts to hurt',
      content: [
        {
          type: 'paragraph',
          text: 'Native resume is perfect when the conversation you want is your last one. <code>opencode --continue</code> nails that case. The friction starts when it is not. Once you are running opencode seriously, across several projects and many sessions, the limitations stack up fast:',
        },
        {
          type: 'list',
          items: [
            '<strong>No full-text search.</strong> You cannot search for "that database migration session from last week" across your opencode history. You are left remembering which session it was.',
            '<strong>You need the session id.</strong> Resuming a specific session means passing <code>--session &lt;id&gt;</code>, and session ids are not memorable. Past the last conversation, you are hunting for the id before you can even resume.',
            '<strong>No content preview.</strong> An id or a bare list tells you little about what a session actually contained, so you open the wrong one and back out more than once.',
            '<strong>No cross-project view.</strong> History is anchored to where the session ran. Finding work from another project means going there first.',
            '<strong>No view across agents.</strong> If you also run Claude Code or Codex, each agent keeps its own history in its own place, so there is no single place to look.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you use opencode on one project now and then, none of this matters. If opencode is part of your daily workflow across many repositories, you start spending real time just trying to find the conversation you want to resume.',
        },
      ],
    },
    {
      id: 'searchable-history-codeagentswarm',
      title: 'Searchable opencode history across agents with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> runs your opencode agents in a desktop workspace and reads the sessions opencode already stores locally: what you wrote, what opencode did, which project you were in, and when it happened. That record becomes a searchable history that works across every project and, crucially, across every agent. The same view holds your opencode, Claude Code, and Codex conversations together.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full-text search across every opencode conversation',
          id: 'full-text-search',
        },
        {
          type: 'paragraph',
          text: 'Type what you remember - a module name, a bug, a technology - and CodeAgentSwarm searches inside the content of all your conversations, not just titles. Results show the conversation title, the project, the date, and the matching messages, so you can confirm it is the right opencode session before you open it. No session id required.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Filter by project',
          id: 'filter-by-project',
        },
        {
          type: 'paragraph',
          text: 'Conversations are organized by project, each with its own color, so a long history stays readable. When you work across several repositories at once you can filter to a single project and see only the opencode sessions that belong to it, instead of one giant flat list.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Works across agents, not just opencode',
          id: 'across-agents',
        },
        {
          type: 'paragraph',
          text: 'Because CodeAgentSwarm lets you pick the agent per terminal, your history is not siloed by tool. Search "auth refactor" and you see the opencode session where you started it and the Claude Code session where you finished it, side by side. For the broader picture of running mixed agents, see the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview, and for opencode specifically the <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode agent swarm</a> guide.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Resume from any terminal',
          id: 'resume-any-terminal',
        },
        {
          type: 'paragraph',
          text: 'Found the conversation you need? Open it and CodeAgentSwarm brings it back with its previous context, in any terminal, regardless of which project it started in. You do not navigate to a directory and paste a session id by hand. You search, select, and keep working.',
        },
      ],
    },
    {
      id: 'how-to-open-history',
      title: 'How to open your opencode history from any terminal',
      content: [
        {
          type: 'paragraph',
          text: 'No matter which opencode terminal you are in, the history is one click away:',
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
          alt: 'History modal opened from an opencode terminal in CodeAgentSwarm with a search bar at the top and a list of past conversations below',
          src: '/images/guides/conversation-history-button.png',
          caption: 'The History button gives you instant access to every past opencode conversation, with search and project filters.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'resume-an-opencode-conversation',
      title: 'How to resume a past opencode conversation',
      content: [
        {
          type: 'paragraph',
          text: 'When you open a project in CodeAgentSwarm you can choose resume mode instead of starting a blank conversation. In resume mode you see all your recent conversations for that project and pick exactly which opencode session to continue.',
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
            'Choose exactly which opencode conversation to continue',
            'Or start a fresh conversation if that is what you want',
          ],
        },
        {
          type: 'image',
          alt: 'A past opencode conversation reopened in a CodeAgentSwarm terminal with previous messages visible and the input ready to continue',
          src: '/images/guides/resume-conversation.png',
          caption: 'Resume any opencode conversation exactly where you left off, with its previous context loaded.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'If you searched first, selecting a conversation shows the messages where your search terms appear, so you confirm it is the right one before opening it. Once you choose it, CodeAgentSwarm reopens it with the prior context so opencode remembers what you decided and what you built, and you continue as if no time had passed.',
        },
      ],
    },
    {
      id: 'why-history-matters',
      title: 'Why opencode conversation history changes how you work',
      content: [
        {
          type: 'paragraph',
          text: 'Treating your opencode history as a searchable memory, rather than a pile of old sessions, has a direct effect on day-to-day work:',
        },
        {
          type: 'list',
          items: [
            '<strong>Stop re-explaining modules.</strong> If you spent fifteen minutes giving opencode context on your auth layer, resume that session instead of explaining it again from zero.',
            '<strong>Keep decisions consistent.</strong> Architecture choices pile up across sessions. Resuming the right one keeps you from contradicting a decision you made days ago.',
            '<strong>Save tokens and time.</strong> Re-explaining context burns both. Continuing a session that already has the context is cheaper and faster.',
            '<strong>Handle many projects calmly.</strong> When you can search and resume any opencode conversation from any project, switching repositories stops being a context-switching tax.',
            '<strong>Never lose a fix.</strong> That clever solution from late last night is in your history. Search for it, resume it, reuse it.',
          ],
        },
        {
          type: 'paragraph',
          text: 'History pays off even more when you run several opencode agents at once. If that is your setup, the guide on <a href="/en/guides/run-multiple-opencode-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple opencode sessions</a> covers how to keep a swarm organized.',
        },
      ],
    },
    {
      id: 'native-vs-codeagentswarm',
      title: 'Native opencode resume vs CodeAgentSwarm history',
      content: [
        {
          type: 'paragraph',
          text: 'Both let you resume a past opencode conversation. The difference is how easily you find the right one once you have many of them:',
        },
        {
          type: 'list',
          items: [
            '<strong>Resuming your last session:</strong> Native opencode handles this well with <code>--continue</code>.',
            '<strong>Finding an older session by keyword:</strong> Native needs you to know the id for <code>--session</code>; CodeAgentSwarm searches inside the content.',
            '<strong>Working across projects:</strong> Native history is anchored to where the session ran; CodeAgentSwarm gives you one cross-project view.',
            '<strong>Working across agents:</strong> Each CLI keeps its own history; CodeAgentSwarm holds opencode, Claude Code and Codex conversations together.',
            '<strong>Resuming from anywhere:</strong> Native means navigating to the right place; CodeAgentSwarm resumes any conversation from any terminal.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you only ever bounce back into your most recent opencode session, native resume is all you need. The moment you are hunting for "which session did I fix that in," searchable history is the better answer.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does opencode save conversation history?',
      answer: 'Yes. opencode keeps your sessions locally as you work, so a conversation is not lost when you close the terminal. Resume the most recent one with opencode --continue, or a specific one with opencode --session <id>, to continue it with its previous context.',
    },
    {
      question: 'How do I resume a previous opencode session?',
      answer: 'Run opencode --continue (short form -c) to resume your most recent session, or opencode --session <id> (short form -s) to resume a specific one by id. In CodeAgentSwarm you open the History view or resume mode, find the conversation, and reopen it in any terminal with its previous context loaded.',
    },
    {
      question: 'Where is opencode history stored?',
      answer: 'opencode stores sessions locally on your machine, and the exact location is documented in the official opencode docs. CodeAgentSwarm reads those sessions so you can search and resume across projects and agents without touching raw file paths.',
    },
    {
      question: 'Can I search across all my opencode conversations?',
      answer: 'Native opencode history has no full-text search, so you rely on session ids or memory. CodeAgentSwarm provides instant full-text search across every opencode conversation, in every project, with message previews so you can confirm the right session before opening it.',
    },
    {
      question: 'Does opencode history work across different projects?',
      answer: 'Native opencode history is anchored to where each session ran, so finding work from another project means going there first. CodeAgentSwarm organizes conversations by project, lets you filter to one, and resumes any of them from any terminal.',
    },
    {
      question: 'Can I see my opencode and Claude Code history together?',
      answer: 'Yes, in CodeAgentSwarm. Because you pick the agent per terminal, history is not siloed by tool. The same searchable view holds your opencode, Claude Code and Codex conversations, so you can trace and resume work no matter which agent did it.',
    },
  ],
}

export default guide
