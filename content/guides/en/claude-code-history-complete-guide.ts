import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-history-complete-guide',
    locale: 'en',
    title: 'Claude Code History: Where It Is Stored and How to Find, Back Up & Resume It',
    metaTitle: 'Claude Code History: Find, Resume & Restore Sessions (2026)',
    metaDescription: 'Find Claude Code session files, search JSONL history, resume previous conversations, and back up or restore chats before automatic cleanup removes them.',
    intro: `Claude Code saves local transcripts in ~/.claude/projects/ by default. Run claude -c to continue the latest conversation in your current directory, or claude --resume to choose an older session.

This guide covers finding, searching and backing up conversations. If you work across several agents or projects, it also shows how CodeAgentSwarm brings their history into one desktop workspace.`,
    ctaText: 'Try managing your Claude Code history with CodeAgentSwarm. Search any conversation, filter by project, and resume in one click.',
    ctaAgent: 'claude-code',
    highlightedWords: ['history', 'Claude Code', 'conversations'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-09-05',
    alternateSlug: 'guia-completa-historial-claude-code',
  },
  sections: [
    {
      id: 'where-history-is-stored',
      title: 'Where does Claude Code store your conversations?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code stores all conversation history locally on your machine in <code>~/.claude/projects/</code>. Each project gets its own subdirectory (based on the absolute path), and each conversation is saved as a JSONL file with a unique session ID. On Windows the same folder lives under your user profile (<code>C:\\Users\\you\\.claude\\projects\\</code>) - if you work there, the <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code on Windows guide</a> covers the platform-specific setup.',
        },
        {
          type: 'paragraph',
          text: 'The native tools to access this history are straightforward:',
        },
        {
          type: 'list',
          items: [
            '<code>/resume</code> - List recent sessions inside an active Claude Code session',
            '<code>claude -c</code> - Resume the most recent conversation for the current project',
            '<code>claude -r SESSION_ID</code> - Resume a specific conversation by its ID',
          ],
        },
        {
          type: 'paragraph',
          text: 'You can find full details on these commands in the <a href="https://code.claude.com/docs/en/cli-reference" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Claude Code documentation</a>. Commands and picker behavior were checked against the official documentation on September 5, 2026.',
        },
      ],
    },
    {
      id: 'history-deleted-after-30-days',
      title: 'Why does Claude Code history disappear after 30 days?',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code deletes conversation transcripts older than 30 days by default. Before assuming deletion, check the project and <code>CLAUDE_CONFIG_DIR</code> used for the session. See the <a href="https://code.claude.com/docs/en/claude-directory#application-data" class="text-neon-cyan hover:text-neon-purple transition-colors">retention rules and exceptions</a>.',
        },
        {
          type: 'paragraph',
          text: 'You can change the retention period with the <code>cleanupPeriodDays</code> setting in <code>~/.claude/settings.json</code>. Merge this value into your existing settings; keep the other keys. A longer retention window does not replace backups:',
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "cleanupPeriodDays": 3650\n}',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Change this setting before you need it. It controls future cleanup runs, but it cannot bring back transcripts that were already deleted - for those, your only options are a backup of ~/.claude/projects/ or a tool that archived them while they still existed.',
        },
      ],
    },
    {
      id: 'the-problem',
      title: 'How to search and preview native Claude Code history',
      content: [
        {
          type: 'paragraph',
          text: 'The current <a href="https://code.claude.com/docs/en/sessions#use-the-session-picker" class="text-neon-cyan hover:text-neon-purple transition-colors">session picker</a> supports search and previews: type to filter, press Space to preview, or Ctrl+A to include other projects. For previous prompts, use Ctrl+R in the input to search <a href="https://code.claude.com/docs/en/interactive-mode#command-history" class="text-neon-cyan hover:text-neon-purple transition-colors">command history</a>.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm adds a shared desktop view across your agents, with content search, project filters and conversations you can reopen beside your running terminals.',
        },
      ],
    },
    {
      id: 'backup-and-restore',
      title: 'How to back up and restore Claude Code history',
      content: [
        {
          type: 'paragraph',
          text: 'Close the sessions you want to back up, then copy the projects folder to a separate backup location, preserving its subdirectories. If you set CLAUDE_CONFIG_DIR, use its projects folder. Keep the backup private: transcripts can contain source code and tool output. To restore, first back up the current folder, then copy only the missing session files into their original project subdirectory without overwriting newer files. Keep the same project path when possible and check the restored session with claude --resume. Raising retention cannot recover a deleted file.',
        },
      ],
    },
    {
      id: 'better-way-codeagentswarm',
      title: 'Full conversation history with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/en#download" class="text-neon-cyan hover:text-neon-purple transition-colors">Download CodeAgentSwarm</a> to search conversation content, filter by project and agent, and resume a session beside your other terminals. Follow the workflow below using your existing conversations.',
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
          text: 'Found the conversation you need? Click on it and CodeAgentSwarm opens a new terminal with all the previous context loaded. The saved conversation provides context; long sessions may have been compacted. No <code>cd</code> to the right directory, no <code>claude -r</code> with a session ID. Just click and keep working.',
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
          text: 'For a detailed walkthrough, see <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history in CodeAgentSwarm</a>. If you work across several CLIs, the companion guides cover <a href="/en/guides/codex-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex conversation history</a> and <a href="/en/guides/opencode-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode conversation history</a>. Cursor users should follow the separate <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI history guide</a> because ACP resume depends on the installed version.',
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
            '<strong>Reuse context.</strong> Resuming saves re-explanation, but long histories still consume context and tokens.',
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
      answer: 'Open claude --resume from your shell or /resume inside a session. You can also browse the local JSONL files. CodeAgentSwarm brings conversation search into the same workspace as your terminals.',
    },
    {
      question: 'How do I resume a previous Claude Code conversation?',
      answer: 'Use "claude -c" to continue your most recent conversation, or "claude -r SESSION_ID" for a specific session. In CodeAgentSwarm, just click on any conversation in the history view to resume it.',
    },
    {
      question: 'Can I search through all my Claude Code conversations?',
      answer: 'Yes. The native picker supports filtering and previews. CodeAgentSwarm offers content search in its history view alongside your other agents.',
    },
    {
      question: 'Does Claude Code history work across different projects?',
      answer: 'Yes. The native picker can include other projects. CodeAgentSwarm provides project and agent filters in one desktop view.',
    },
    {
      question: 'How do I back up my Claude Code conversation history?',
      answer: 'Copy the ~/.claude/projects/ directory to your backup location. All conversations are local files, so standard backup methods work.',
    },
    {
      question: 'Can I transfer Claude Code history to a new computer?',
      answer: 'Back up the destination first, then transfer the projects folder privately, preserving project paths where possible. Sign in separately on the new computer. Avoid copying credentials or overwriting newer transcripts.',
    },
    {
      question: 'Does Claude Code history use a lot of disk space?',
      answer: 'Size depends on session length and tool output. Check the size of your projects folder before choosing backup storage; there is no useful universal size limit.',
    },
    {
      question: 'What is the difference between /resume and claude -c?',
      answer: 'Use /resume to choose a session. The claude -c command continues the latest conversation in the current directory.',
    },
    {
      question: 'Why did my Claude Code history disappear?',
      answer: 'Claude Code deletes transcripts older than 30 days by default. Add "cleanupPeriodDays" with a higher value to ~/.claude/settings.json to keep sessions longer. Already-deleted transcripts can only be recovered from a backup of ~/.claude/projects/.',
    },
    {
      question: 'How do I stop Claude Code from deleting old conversations?',
      answer: 'Set "cleanupPeriodDays" in ~/.claude/settings.json to a large number, for example 3650. This raises the retention window for future cleanup runs so your transcripts stay on disk.',
    },
  ],
}

export default guide
