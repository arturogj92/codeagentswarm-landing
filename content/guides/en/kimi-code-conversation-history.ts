import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-conversation-history',
    locale: 'en',
    title: 'Kimi Code Conversation History: Find, Name and Resume Sessions',
    metaTitle: 'Kimi Code Conversation History: Resume and Search Sessions (2026)',
    metaDescription: 'Where Kimi Code stores your sessions on disk, how to resume the last one with kimi --continue or any one with --session, and how to search your whole history.',
    intro: `Kimi Code keeps every session on your machine, and you can get back into one whenever you want. Resume the most recent session for the current project with <code>kimi --continue</code>, or open a specific one with <code>kimi --session &lt;id&gt;</code>. Sessions are stored per project as plain files under <code>~/.kimi-code/sessions/</code>, so nothing is lost when you close the terminal.

The native tooling is solid for the simple case: get back into your last conversation. It gets thin the moment you have real history. There is no full-text search across sessions, session ids are not something a human remembers, and the one tool you get for finding a session later is naming it yourself with <code>/title</code> while it is still open.

This guide maps out exactly where Kimi Code history lives on disk (it is more inspectable than most agents), the resume flags and their gotchas, and how CodeAgentSwarm turns that same history into a searchable, cross-project, cross-agent memory you can reopen from any terminal.`,
    ctaText: 'Stop hunting for session ids. CodeAgentSwarm searches your full Kimi Code history by keyword, alongside your Claude Code, Codex and opencode conversations, and resumes the right one from any terminal.',
    highlightedWords: ['Kimi Code', 'history', 'resume'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'historial-conversaciones-kimi-code',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'The quick answer: resume with --continue or --session',
      content: [
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: Kimi Code saves sessions locally and per project. <code>kimi --continue</code> (short form <code>-c</code>) reopens the most recent session for the directory you are in. <code>kimi --session &lt;id&gt;</code> reopens a specific one. Name the session you are in with <code>/title</code> so you can find it again later.',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code conversation history is the record of everything a session contained: what you asked, what the agent did, and the context it built up along the way. Because context is the expensive part of working with a coding agent, being able to reopen a session instead of re-explaining a module from scratch is worth real time and real tokens.',
        },
        {
          type: 'paragraph',
          text: 'If you are still setting the CLI up, start with the <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use Kimi Code</a> guide. Everything below assumes you have sessions worth going back to.',
        },
      ],
    },
    {
      id: 'resume-flags',
      title: 'Resuming: the flags and their gotchas',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: `# Reopen the most recent session for the current directory
kimi --continue    # short form: -c

# Reopen a specific session by id
kimi --session <session-id>`,
        },
        {
          type: 'paragraph',
          text: 'Two details matter here. First, <code>--continue</code> is scoped to the directory you run it from: it reopens the latest session for that project, not the latest session globally. Run it in the wrong repo and you get the wrong conversation. Second, <code>-r</code> and <code>--resume</code> exist as hidden aliases of <code>--session</code>, so habits from Claude Code mostly carry over, but the documented spelling is <code>--session</code>.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Mode flags override a resumed session. If you pass <code>--yolo</code>, <code>--auto</code> or <code>--plan</code> while resuming, the flag replaces the mode the session had saved. A careful session resumed with a leftover <code>-y</code> silently becomes a full-auto one. The <a href="/en/guides/kimi-code-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code YOLO mode</a> guide covers this in depth.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Name sessions with /title while you still remember them',
          id: 'name-with-title',
        },
        {
          type: 'paragraph',
          text: 'Inside a session, <code>/title &lt;text&gt;</code> gives it a name, and that name is persisted to disk with the session. This is the single most useful habit for Kimi Code history: a session called "auth migration to JWT" is findable in a week; an anonymous session id is not. Titling costs five seconds while the context is fresh and saves minutes every time you go looking later.',
        },
      ],
    },
    {
      id: 'where-history-lives',
      title: 'Where Kimi Code stores sessions on disk',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code is unusually transparent about its history: sessions are plain files, organized per project, with no database in the way. Everything lives under <code>~/.kimi-code/sessions/</code>, with one directory per project and one subdirectory per session:',
        },
        {
          type: 'code',
          language: 'bash',
          code: `~/.kimi-code/
  session_index.jsonl              # global index: session id -> directory + project
  sessions/
    <workDirKey>/                  # one bucket per project (derived from its path)
      <sessionId>/
        state.json                 # title, timestamps, session state
        agents/main/wire.jsonl     # the actual transcript, one event per line`,
        },
        {
          type: 'paragraph',
          text: 'The pieces fit together like this: the <code>workDirKey</code> is derived from a hash of the normalized project path, so each project gets its own bucket. Inside a session, <code>state.json</code> holds the title (including anything you set with <code>/title</code>) and timestamps, while <code>agents/main/wire.jsonl</code> is the transcript itself, a JSONL stream of everything that happened. The global <code>session_index.jsonl</code> at the top maps every session id to its directory and working dir, which is the cheapest way to enumerate all sessions across all projects.',
        },
        {
          type: 'paragraph',
          text: 'Because it is all plain JSONL, you can inspect it with standard tools. A quick <code>grep</code> over <code>wire.jsonl</code> files answers "which session mentioned the payments webhook" without any special tooling, though at that point you are building your own search engine one command at a time.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Treat this layout as informative, not contractual. Kimi Code ships releases almost daily and is pre-1.0, so paths and file shapes can evolve. The resume flags and <code>/title</code> are the stable, documented surface.',
        },
      ],
    },
    {
      id: 'where-it-hurts',
      title: 'Where native Kimi Code history starts to hurt',
      content: [
        {
          type: 'paragraph',
          text: 'Native resume nails the common case: your last session in the current project, one flag away. The friction starts as soon as the session you want is not that one:',
        },
        {
          type: 'list',
          items: [
            '<strong>No full-text search.</strong> There is no built-in way to search across sessions for "that migration conversation from last week". Your options are remembering, titling diligently, or grepping raw JSONL.',
            '<strong>Session ids are not memorable.</strong> Anything older than the latest session needs an id for <code>--session</code>, and you have to go find that id first.',
            '<strong>History is per project.</strong> The per-project layout keeps things tidy, but it means finding work from another repo starts with cd-ing there first.',
            '<strong>No view across agents.</strong> If you also run Claude Code, Codex or opencode, each keeps its own history in its own format in its own place. Four agents means four places to look.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Casual use never hits these walls. Daily use across several repositories hits all of them, usually in the same week.',
        },
      ],
    },
    {
      id: 'searchable-history-codeagentswarm',
      title: 'Searchable Kimi Code history with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> runs Kimi Code as a first-class agent and reads the session history it already stores locally. That history becomes a searchable archive that spans every project and every agent: your Kimi Code, Claude Code, Codex, Antigravity CLI and opencode conversations, together in one view.',
        },
        {
          type: 'list',
          items: [
            '<strong>Full-text search.</strong> Type what you remember (a module, a bug, a library) and it searches inside the content of every conversation, with matching messages shown so you can confirm the session before opening it. No ids involved.',
            '<strong>Filter by project.</strong> Conversations are grouped by project with their own colors, so history stays readable even when the volume grows.',
            '<strong>Cross-agent view.</strong> Search "auth refactor" and see the Kimi Code session where you explored it next to the Claude Code session where you shipped it.',
            '<strong>Resume from any terminal.</strong> Open a found conversation into a terminal with its context, without navigating to the right directory or copying a session id.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The flow inside the app is one click: the History button in any terminal opens the searchable view, and resume mode when opening a project lists that project\'s past conversations so you pick exactly where to continue. It is the same flow for every agent, which is the point: one memory, not four.',
        },
        {
          type: 'paragraph',
          text: 'If you run several Kimi Code agents at once, history matters double, because "what did that terminal do while I watched the other one" becomes a daily question. The <a href="/en/guides/run-multiple-kimi-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple Kimi Code sessions</a> guide covers that workflow.',
        },
      ],
    },
    {
      id: 'native-vs-codeagentswarm',
      title: 'Native resume vs searchable history: when each is enough',
      content: [
        {
          type: 'paragraph',
          text: 'Both approaches reopen a past Kimi Code conversation with its context. The difference is how you find it:',
        },
        {
          type: 'list',
          items: [
            '<strong>Getting back into your last session:</strong> native <code>kimi --continue</code> is perfect. Nothing to improve.',
            '<strong>An older session you titled well:</strong> native works if you can find the id; the title was the hard part and you already did it.',
            '<strong>An older session by content:</strong> native has no search; CodeAgentSwarm finds it by keyword with message previews.',
            '<strong>Work from another project:</strong> native means going there first; CodeAgentSwarm searches across projects from wherever you are.',
            '<strong>Work from another agent:</strong> native history is siloed per tool; CodeAgentSwarm holds all of them in one view.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The honest summary: if Kimi Code is your only agent and you title sessions religiously, native tooling gets you far. The moment you mix agents or projects, a single searchable history stops being a luxury. And if you also want the same trick for other CLIs, the companion guides on <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code history</a> and <a href="/en/guides/opencode-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode history</a> cover their native equivalents.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Kimi Code save conversation history?',
      answer: 'Yes. Every session is saved locally as plain files under ~/.kimi-code/sessions/, organized per project, with a global index at ~/.kimi-code/session_index.jsonl. Closing the terminal loses nothing: resume the latest session for a project with kimi --continue or a specific one with kimi --session <id>.',
    },
    {
      question: 'How do I resume a previous Kimi Code session?',
      answer: 'Run kimi --continue (short form -c) in the project directory to reopen its most recent session, or kimi --session <id> for a specific one (-r and --resume exist as hidden aliases). Watch the mode flags: passing --yolo, --auto or --plan while resuming overrides the mode the session had saved.',
    },
    {
      question: 'Where does Kimi Code store its sessions on disk?',
      answer: 'Under ~/.kimi-code/sessions/<workDirKey>/<sessionId>/, where the workDirKey is derived from a hash of the project path. Each session holds a state.json with its title and timestamps and the full transcript at agents/main/wire.jsonl in JSONL format. The layout can evolve between releases, so treat it as inspectable rather than guaranteed.',
    },
    {
      question: 'How do I name a Kimi Code session?',
      answer: 'Inside the session, run /title <text>. The title is persisted with the session on disk, so it is how you recognize the conversation later. Titling sessions while the context is fresh is the best native defense against hunting through anonymous session ids a week later.',
    },
    {
      question: 'Can I search across all my Kimi Code conversations?',
      answer: 'Not natively: Kimi Code has no built-in full-text search across sessions. Since transcripts are plain JSONL you can grep them by hand. CodeAgentSwarm indexes that same history and gives you keyword search with message previews across every project, and across your other agents too.',
    },
    {
      question: 'Can I see Kimi Code and Claude Code history together?',
      answer: 'Yes, in CodeAgentSwarm. Because the agent is chosen per terminal, conversation history is not siloed by tool: the same searchable view holds Kimi Code, Claude Code, Codex, Antigravity CLI and opencode sessions, and any of them can be reopened into a terminal from there.',
    },
  ],
}

export default guide
