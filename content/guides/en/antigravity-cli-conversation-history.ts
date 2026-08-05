import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-conversation-history',
    locale: 'en',
    title: 'Antigravity CLI Conversation History: Where It Lives and How to Resume',
    metaTitle: 'Antigravity CLI Conversation History and Resume (2026)',
    metaDescription: 'How Antigravity CLI stores conversations, why they live under ~/.gemini, how to resume with agy -c and --conversation, and why the transcript does not know which project it belongs to.',
    intro: `Antigravity CLI keeps every conversation, and you resume them with two commands: <code>agy -c</code> for the most recent one and <code>agy --conversation &lt;id&gt;</code> for a specific one.

Underneath, the storage has a quirk that surprises people the first time they go looking: <strong>Antigravity conversations live under <code>~/.gemini</code></strong>, not under a directory named after Antigravity. That is a legacy of its lineage, and it means your existing data and history are exactly where they were.

There is a second, less obvious quirk that matters more if you run several projects: <strong>the conversation transcript does not record which project it belongs to</strong>. Conversations are stored flat, in one directory, with no folder-per-project structure and no working-directory field in the transcript itself. This guide covers where everything actually is, how to resume reliably, and what to do about the project problem.`,
    ctaText: 'Finding an old agy conversation by id is tedious when you have dozens across several projects. CodeAgentSwarm gives you searchable history across every Antigravity session, with the right project attached to each one.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Conversation', 'History'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'historial-conversaciones-antigravity',
  },
  sections: [
    {
      id: 'resuming',
      title: 'Resuming a conversation: the two commands',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# Start a fresh session in the current directory\nagy\n\n# Continue your most recent conversation, wherever you left it\nagy -c\n\n# Resume a specific conversation by id\nagy --conversation <id>',
        },
        {
          type: 'paragraph',
          text: '<code>agy -c</code> is the one you will use ninety percent of the time. It picks up your most recent conversation exactly where it ended, with the full context intact, which is what you want after stepping away for lunch or reviewing a diff and deciding the agent needs another pass.',
        },
        {
          type: 'paragraph',
          text: '<code>agy --conversation &lt;id&gt;</code> is for everything else: the session from Tuesday, the one on the other project, the one you abandoned halfway and now want to finish. It needs the conversation id, and getting hold of that id is the part nobody documents.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Resuming is not the same as starting a new session and pasting context in. A resumed conversation keeps the agent\'s accumulated understanding of the codebase, which is usually worth more than the tokens it took to build. Reaching for -c is almost always cheaper than re-explaining.',
        },
      ],
    },
    {
      id: 'where-it-lives',
      title: 'Where the history actually lives',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity reuses <code>~/.gemini</code> as its home directory, and conversations sit under <code>~/.gemini/antigravity-cli/</code>.',
        },
        {
          type: 'paragraph',
          text: 'The important structural fact is that they are stored <strong>flat</strong>. There is no directory per project and no nesting by workspace: every conversation from every project you have ever worked on lands in the same folder, identified only by its id. If you are used to agents that organise history into a folder per repository, this will look wrong the first time you see it.',
        },
        {
          type: 'paragraph',
          text: 'Each conversation is represented by two things: a transcript in JSONL, which is the clean, readable record of the exchange, and a per-conversation SQLite database named after the conversation id. The transcript is what you would read; the database is where the interesting metadata hides.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Because the storage is shared with the wider Gemini home directory, do not "clean up" ~/.gemini expecting to only remove Antigravity data. Deleting that directory removes conversation history for anything else that uses it too.',
        },
      ],
    },
    {
      id: 'project-problem',
      title: 'The project problem: the transcript does not know where it ran',
      content: [
        {
          type: 'paragraph',
          text: 'Here is the detail that makes flat storage genuinely awkward rather than merely untidy: <strong>the clean transcript carries no working directory and no workspace field</strong>. Open a conversation JSONL and you can read every message, but nothing in it tells you which repository the agent was working in.',
        },
        {
          type: 'paragraph',
          text: 'With one project that does not matter. With five, you have a single flat folder of conversations and no way to tell from the transcript which ones belong to which codebase, which is exactly when you most need to find an old session.',
        },
        {
          type: 'paragraph',
          text: 'The information does exist, but it is in the per-conversation database rather than the transcript, and it arrives by one of two routes depending on how the session was started:',
        },
        {
          type: 'list',
          items: [
            '<strong>A registered workspace.</strong> When <code>agy</code> starts inside a workspace it recognises, the database records the workspace as an absolute <code>file:///</code> path in its trajectory metadata. This is the authoritative answer when it is present.',
            '<strong>No registered workspace.</strong> Sessions that were not started in a recognised workspace, which includes <code>agy</code> launched from inside a plain project directory, have no such path. For those, the only signal is the working directory that the agent\'s own shell commands ran in, recorded step by step in the database.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The practical consequence: <strong>a tool that reads only the transcript cannot label your conversations correctly</strong>, and will fall back to a generic label. Recovering the real project means reading the database and taking whichever of those two signals is available.',
        },
      ],
    },
    {
      id: 'practical-habits',
      title: 'Two habits that save you the archaeology',
      content: [
        {
          type: 'paragraph',
          text: 'You can avoid most of the above by changing how you work rather than by digging through SQLite.',
        },
        {
          type: 'paragraph',
          text: '<strong>Reach for <code>-c</code> before you reach for an id.</strong> The most recent conversation is always one keystroke away and needs no lookup. If you are disciplined about finishing one thread before starting another, you will rarely need to resume by id at all.',
        },
        {
          type: 'paragraph',
          text: '<strong>Note the id when a session matters.</strong> If you are stopping mid-task on something you will definitely come back to, the id is worth thirty seconds in a scratch file or a commit message. Finding it later costs considerably more than that.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'This is a good argument for finishing a task in one conversation rather than spreading it across several. Antigravity resumes cleanly, so a long-running thread on one piece of work is both easier to find later and cheaper to continue than a fresh session that has to relearn the codebase.',
        },
      ],
    },
    {
      id: 'searchable-history',
      title: 'Searchable history across every session',
      content: [
        {
          type: 'paragraph',
          text: 'The flat-storage-plus-missing-project combination is manageable with one agent on one project and genuinely painful once you have dozens of conversations across several repositories. You end up knowing that a session exists in which you solved a problem, and having no reasonable way to find it.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace for running several AI CLI agents in parallel, indexes Antigravity conversations and gives you full-text search across all of them, with each conversation attached to its real project. It resolves the project by reading the per-conversation database and taking the registered workspace where one exists, falling back to the dominant working directory of the session\'s own shell commands where it does not, which is the same two-signal approach described above.',
        },
        {
          type: 'paragraph',
          text: 'From there you can reopen any conversation in a terminal directly, without hunting for an id. It works the same way across your other agents, so a mixed setup of Antigravity, Claude and Codex sessions is searchable from one place, which pairs with the pattern in <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity agent swarm guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How do I resume a conversation in Antigravity CLI?',
      answer: 'Use agy -c to continue your most recent conversation exactly where it ended, or agy --conversation <id> to resume a specific one by its id. Resuming keeps the agent accumulated understanding of the codebase, which is usually worth more than the tokens it took to build.',
    },
    {
      question: 'Where does Antigravity CLI store conversation history?',
      answer: 'Under ~/.gemini/antigravity-cli/. Antigravity reuses the ~/.gemini home directory, which is why the path does not mention Antigravity at all. Each conversation has a JSONL transcript plus a per-conversation SQLite database named after its id.',
    },
    {
      question: 'Why are all my Antigravity conversations in one folder?',
      answer: 'Because Antigravity stores them flat: there is no directory per project and no nesting by workspace. Every conversation from every project lands in the same folder, identified only by its id.',
    },
    {
      question: 'How do I tell which project an old agy conversation belongs to?',
      answer: 'Not from the transcript, which carries no working directory or workspace field. The information lives in the per-conversation database: either as an absolute file:/// workspace path in the trajectory metadata, or, for sessions started outside a recognised workspace, as the working directory recorded against the agent own shell commands.',
    },
    {
      question: 'Can I delete ~/.gemini to clear Antigravity history?',
      answer: 'You can, but be careful: that directory is shared rather than exclusive to Antigravity, so deleting it removes history and data for anything else using the same home directory. Removing just ~/.gemini/antigravity-cli/ is the narrower option.',
    },
    {
      question: 'How do I search across all my Antigravity conversations?',
      answer: 'Antigravity has no built-in search across sessions. CodeAgentSwarm indexes them and provides full-text search with each conversation attached to its real project, resolved from the per-conversation database rather than the transcript, and lets you reopen any of them in a terminal without looking up an id.',
    },
  ],
}

export default guide
