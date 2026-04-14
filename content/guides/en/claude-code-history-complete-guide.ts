import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-history-complete-guide',
    locale: 'en',
    title: 'Claude Code History: The Complete Guide to Past Conversations',
    metaTitle: 'Claude Code History: Find Past Conversations, Search Sessions & Resume Chats (2026)',
    metaDescription: 'Everything about Claude Code conversation history: where it is stored, how to find past sessions, search old chats, resume conversations, and manage your history effectively. Updated for 2026.',
    intro: `If you have been using Claude Code for a while, at some point you have probably wondered: where did that conversation go?

Maybe you solved a tricky bug last week, made an architecture decision three days ago, or spent 20 minutes explaining a module to Claude and now you need to pick up where you left off.

Claude Code does keep your conversation history. But finding, searching and resuming past sessions is not as easy as it should be - unless you use the right tools.`,
    ctaText: 'Try managing your Claude Code history with CodeAgentSwarm. Search any conversation, filter by project, and resume in one click.',
    highlightedWords: ['history', 'Claude Code', 'conversations'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'guia-completa-historial-claude-code',
  },
  sections: [
    {
      id: 'where-history-is-stored',
      title: 'Where does Claude Code store your conversations?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code stores all conversation history locally on your machine in <code>~/.claude/projects/</code>. Each project gets its own subdirectory (based on the absolute path), and each conversation is saved as a JSONL file with a unique session ID.',
        },
        {
          type: 'paragraph',
          text: 'The native tools to access this history are straightforward:',
        },
        {
          type: 'list',
          items: [
            '<code>/history</code> - List recent sessions inside an active Claude Code session',
            '<code>claude -c</code> - Resume the most recent conversation for the current project',
            '<code>claude -r SESSION_ID</code> - Resume a specific conversation by its ID',
          ],
        },
        {
          type: 'paragraph',
          text: 'These commands work, but they have real limitations once you start using Claude Code seriously across multiple projects.',
        },
      ],
    },
    {
      id: 'the-problem',
      title: 'The problem with native Claude Code history',
      content: [
        {
          type: 'paragraph',
          text: 'Native history was designed for simple use: resume your last conversation or list recent sessions. Once you go beyond that, things get frustrating fast:',
        },
        {
          type: 'list',
          items: [
            '<strong>No search.</strong> You cannot search for "that authentication discussion from last week" across your conversations. You would need to grep through raw JSONL files manually.',
            '<strong>No cross-project access.</strong> History is locked to the project directory where the conversation started. Want to find a conversation from another project? Navigate there first.',
            '<strong>No visual overview.</strong> There is no way to see all your conversations at a glance, organized by project or date.',
            '<strong>No content preview.</strong> You see session IDs and timestamps, but not what the conversation was actually about.',
            '<strong>No filtering.</strong> Cannot filter by project, date range, or conversation content.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you use Claude Code on one project occasionally, this is fine. But if you work across multiple projects daily and rely on Claude Code as your main development tool, you need something better.',
        },
      ],
    },
    {
      id: 'better-way-codeagentswarm',
      title: 'Full conversation history with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> wraps Claude Code with a complete history system that solves every limitation listed above. Every conversation, across every terminal, across every project, is automatically stored, searchable and resumable.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm conversation history showing all past Claude Code sessions organized by project with search and filtering',
          src: '/images/guides/conversation_history.png',
          caption: 'All your Claude Code conversations in one place, organized by project and fully searchable.',
          size: 'full',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Search any conversation instantly',
          id: 'search-any-conversation',
        },
        {
          type: 'paragraph',
          text: 'Type what you remember - a module name, a bug description, a technology - and CodeAgentSwarm searches across all your conversations from all projects. Results show the conversation title, project, date and the matching messages so you know immediately if it is the right one.',
        },
        {
          type: 'paragraph',
          text: 'No more grepping through JSONL files. No more guessing which project a conversation belongs to.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visual history organized by project',
          id: 'visual-history-by-project',
        },
        {
          type: 'paragraph',
          text: 'Instead of a flat list of session IDs, you see all your conversations organized by project and date. Each project has its own color, so scanning through history is fast even when you have dozens of conversations.',
        },
        {
          type: 'list',
          items: [
            'Conversations grouped by project with color coding',
            'Most recent conversations first, with dates visible',
            'Conversation chains grouped together (continuations of the same thread)',
            'One-click access from any terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Resume with one click',
          id: 'resume-one-click',
        },
        {
          type: 'paragraph',
          text: 'Found the conversation you need? Click on it and CodeAgentSwarm opens a new terminal with all the previous context loaded. Claude remembers everything: the code you discussed, the decisions you made, the explanations you gave. No <code>cd</code> to the right directory, no <code>claude -r</code> with a session ID. Just click and keep working.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cross-project search',
          id: 'cross-project-search',
        },
        {
          type: 'paragraph',
          text: 'This is the feature that makes the biggest difference for developers working on multiple projects. Search for "database migration" and see results from your backend project, your microservice, and that side project where you set up Knex. All in one view, no directory switching.',
        },
        {
          type: 'image',
          alt: 'Search results showing conversations from multiple projects matching a search query with message previews',
          src: '/images/guides/mcp-marketplace-search.png',
          caption: 'Search across all projects at once. See matching messages before opening.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Resume mode when opening a project',
          id: 'resume-mode-on-open',
        },
        {
          type: 'paragraph',
          text: 'When you open a project in CodeAgentSwarm, you can choose resume mode. Instead of starting a blank conversation, you see all your recent conversations from that project and pick which one to continue. Search within them to find the exact conversation thread you need.',
        },
        {
          type: 'image',
          alt: 'Resume mode showing recent conversations for a project with search and message preview',
          src: '/images/guides/resume-selected-conversation.png',
          caption: 'Choose exactly which conversation to continue when you open a project.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'For a detailed walkthrough of all these features, see our dedicated guide: <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Using conversation history in CodeAgentSwarm</a>.',
        },
      ],
    },
    {
      id: 'why-history-matters',
      title: 'Why conversation history changes how you work with Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'This is not about convenience. It is about fundamentally changing how productive you can be with Claude Code:',
        },
        {
          type: 'list',
          items: [
            '<strong>Stop re-explaining modules.</strong> You spent 15 minutes explaining your auth system to Claude last Tuesday. With history, you resume that conversation instead of explaining it again from scratch.',
            '<strong>Keep decisions consistent.</strong> Architecture decisions accumulate across conversations. Without history, you risk contradicting a decision you made three days ago because you forgot.',
            '<strong>Save tokens.</strong> Every time you re-explain context, you are burning tokens and time. Resuming a conversation with existing context is cheaper and faster.',
            '<strong>Work across multiple projects confidently.</strong> When you can search and resume any conversation from any project, switching between projects stops being a context-switching nightmare.',
            '<strong>Never lose a solution.</strong> That clever fix you came up with at 11pm? It is in your history. Search for it, find it, reuse it.',
          ],
        },
      ],
    },
    {
      id: 'tips-for-better-history',
      title: 'Tips for getting more value from your history',
      content: [
        {
          type: 'paragraph',
          text: 'Regardless of which tools you use, these habits make your conversation history much more useful:',
        },
        {
          type: 'list',
          items: [
            '<strong>Start conversations with specific context.</strong> "Fix the JWT token expiration bug in the auth middleware" is much easier to find later than "Fix the login bug".',
            '<strong>One topic per conversation.</strong> Mixing unrelated tasks makes it harder to find and resume specific work later.',
            '<strong>Resume instead of re-explain.</strong> If you spent time explaining a module to Claude, resume that conversation next time. The context is already there.',
            '<strong>Use CLAUDE.md for permanent context.</strong> Put architecture decisions and conventions in CLAUDE.md as "permanent memory". Use conversation history as "working memory" for specific tasks.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If you work with multiple Claude Code terminals in parallel, conversation history becomes even more valuable. Check our guide on <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code terminals in parallel</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Where does Claude Code store conversation history?',
      answer: 'Claude Code stores all conversations locally in ~/.claude/projects/ on your machine. Each project gets its own subdirectory, and conversations are saved as JSONL files with unique session IDs.',
    },
    {
      question: 'Does Claude Code save conversation history automatically?',
      answer: 'Yes. Every conversation is automatically saved. You do not need to enable anything - history is on by default.',
    },
    {
      question: 'How do I find old Claude Code conversations?',
      answer: 'With native tools, use /history inside a session or browse files in ~/.claude/projects/. With CodeAgentSwarm, you get full-text search across all conversations and all projects with one click resume.',
    },
    {
      question: 'How do I resume a previous Claude Code conversation?',
      answer: 'Use "claude -c" to continue your most recent conversation, or "claude -r SESSION_ID" for a specific session. In CodeAgentSwarm, just click on any conversation in the history view to resume it.',
    },
    {
      question: 'Can I search through all my Claude Code conversations?',
      answer: 'Native Claude Code has no built-in search. You would need to grep through JSONL files manually. CodeAgentSwarm provides instant full-text search across all conversations, all projects, with message preview and filtering.',
    },
    {
      question: 'Does Claude Code history work across different projects?',
      answer: 'Native history is tied to each project directory separately. You need to navigate to the project first. CodeAgentSwarm provides cross-project search and resume from any terminal.',
    },
    {
      question: 'How do I back up my Claude Code conversation history?',
      answer: 'Copy the ~/.claude/projects/ directory to your backup location. All conversations are local files, so standard backup methods work.',
    },
    {
      question: 'Can I transfer Claude Code history to a new computer?',
      answer: 'Yes. Copy ~/.claude/ from the old machine to the new one. Note that paths are absolute, so it works best when your directory structure matches.',
    },
    {
      question: 'Does Claude Code history use a lot of disk space?',
      answer: 'No. Each conversation uses a few hundred KB to a few MB. Even heavy users rarely exceed 500MB total.',
    },
    {
      question: 'What is the difference between /history and claude -c?',
      answer: '/history lists recent sessions and their IDs inside an active session. "claude -c" starts Claude Code and automatically resumes the most recent conversation for the current project.',
    },
  ],
}

export default guide
