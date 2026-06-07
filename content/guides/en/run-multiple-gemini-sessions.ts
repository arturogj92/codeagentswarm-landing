import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'run-multiple-gemini-sessions',
    locale: 'en',
    title: 'How to Run Multiple Gemini CLI Sessions in Parallel',
    metaTitle: 'How to Run Multiple Gemini CLI Sessions in Parallel (2026)',
    metaDescription: 'Learn how to run multiple Gemini CLI sessions in parallel. Three methods compared: terminal tabs, tmux, and CodeAgentSwarm. Step by step, with pros and cons.',
    intro: `Running multiple Gemini CLI sessions in parallel is straightforward once you know the moves. Each session is its own process, so you can open the gemini command in several terminals and point each one at a different task. The hard part is keeping them organized once you have more than two going at the same time.

This is a practical how-to, not a concept piece. I will show you the three ways to run Gemini CLI in parallel, with exact commands for each: native terminal tabs, tmux, and CodeAgentSwarm. For each method you get the steps, the pros, and the cons.

By the end you will know which approach fits the way you work, whether you want two quick sessions, a persistent terminal setup, or a visual workspace that also lets you run Gemini and Claude Code together.`,
    ctaText: 'Run multiple Gemini CLI sessions in parallel with CodeAgentSwarm. Six terminals, one workspace, and a notification the moment each session finishes.',
    highlightedWords: ['multiple Gemini CLI sessions', 'parallel'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'ejecutar-multiples-sesiones-gemini',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Short answer: open the gemini command more than once',
      content: [
        {
          type: 'image',
          alt: 'Six Gemini CLI sessions running in parallel inside a single CodeAgentSwarm workspace, each terminal an independent gemini process',
          src: '/images/guides/gemini-agent-swarm.png',
          caption: 'Multiple Gemini CLI sessions in parallel: six independent gemini processes running side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: 'To run multiple Gemini CLI sessions in parallel, open a terminal, run <code>gemini</code>, then open another terminal and run <code>gemini</code> again. Each <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Gemini CLI</a> session is an independent process with its own conversation, its own context window, and its own working state. Nothing is shared between them.',
        },
        {
          type: 'paragraph',
          text: 'That independence is what makes the parallelism safe. One session can refactor your API layer while another writes tests and a third updates docs. They will not collide unless two of them edit the same file. Google signs you in with a Google account and gives you a generous free tier and a large context window per session, so spinning up several at once is practical and does not blow a metered budget.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'There is no special multi-session plan to buy. Each terminal uses your own Google sign-in. The three methods below differ only in how you keep the sessions organized once several are running. For the concept behind running them as a coordinated group, see <a href="/en/guides/gemini-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Gemini agent swarm guide</a>.',
        },
        {
          type: 'paragraph',
          text: 'The rest of this guide is about that organization problem. Here are the three methods, from the simplest to the most capable.',
        },
      ],
    },
    {
      id: 'method-terminal-tabs',
      title: 'Method 1: Multiple terminal tabs (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The fastest way to run Gemini CLI in parallel is the one you already know. Open a few terminal tabs or windows, move into your project in each one, and start a session with <code>gemini</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\ngemini\n\n# Terminal tab 2\ncd ~/my-project\ngemini\n\n# Terminal tab 3\ncd ~/my-project\ngemini',
        },
        {
          type: 'paragraph',
          text: 'Each tab now holds an independent Gemini CLI session. Switch between them and give each one a different instruction. If you want a session to keep going without stopping for confirmation on every action, Gemini CLI has a yolo style auto-approve flag for unattended runs. Use it with care, since an auto-approving session will run commands you might have wanted to review first.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pros',
          id: 'terminal-tabs-pros',
        },
        {
          type: 'list',
          items: [
            'Free, nothing to install beyond the Gemini CLI itself',
            'Works the second you open a tab, zero setup',
            'Easy to reason about, one tab equals one session',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cons',
          id: 'terminal-tabs-cons',
        },
        {
          type: 'list',
          items: [
            'You quickly lose track of which tab is running which task',
            'No notification when a session finishes or stops to ask something',
            'No shared view, you click into each tab to check on it',
            'No way to search across the conversation history of different sessions',
            'If two sessions edit the same file, the conflict is yours to resolve',
            'With three or more tabs they all start looking identical',
          ],
        },
        {
          type: 'paragraph',
          text: 'For two sessions this is perfectly fine. Past that, the time you spend hunting through tabs starts canceling out the time the parallel sessions were meant to save. If you are choosing between vendors first, the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> guide mirrors this exact method for Claude.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you are comfortable in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> gives you split panes and persistent sessions. You can watch several Gemini CLI sessions on one screen without flipping between tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s gemini\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run gemini in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux also lets you detach and reattach, so your Gemini CLI sessions keep running even after you close the terminal window. That helps when one session is grinding through a long migration in auto-approve mode and you want to step away.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pros',
          id: 'tmux-pros',
        },
        {
          type: 'list',
          items: [
            'Free and available almost everywhere',
            'See several panes at once without tab switching',
            'Persistent sessions that survive disconnects',
            'Deeply configurable through dotfiles',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cons',
          id: 'tmux-cons',
        },
        {
          type: 'list',
          items: [
            'Real learning curve if tmux is new to you',
            'Still no desktop notification when a Gemini session finishes',
            'No conversation history or search across sessions',
            'Text-only panes get cramped past 3 or 4 sessions',
            'No task board or organization layer for the work',
            'You rebuild the pane layout by hand every time',
            'Conflict resolution between sessions is still on you',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a great tool and plenty of developers live in it. But it was built as a general terminal multiplexer, not as a control room for parallel AI sessions. The gaps become obvious once you run three or more Gemini CLI sessions every day.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running several AI CLI sessions in parallel with real visibility and control. It runs on macOS and Windows, gives you up to six terminals in one workspace, and lets you choose the agent per terminal. To run Gemini CLI in parallel you just pick "gemini cli" in each terminal you want, and you can mix in Claude Code or Codex CLI alongside it.',
        },
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker with claude-code, gemini cli, and codex cli options plus an Enable Turbo Mode toggle',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you choose the agent per terminal. Set each one to gemini cli to run multiple Gemini sessions in one workspace.',
        },
        {
          type: 'paragraph',
          text: 'It runs on top of your existing setup. CodeAgentSwarm is not a model provider, so each Gemini session keeps using your own Google sign-in and your Gemini CLI. The app just gives the sessions a place to live. Here is what that adds:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Up to 6 Gemini sessions in parallel',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Run up to six terminals at once and set each one to gemini cli through the SELECT AI AGENT picker. Each session is independent, with its own conversation and project context. If a task fits a different model better, you can point that one terminal at Claude Code or Codex CLI instead, all in the same window.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Each terminal updates its own title based on what the session is doing right now. Instead of six identical "gemini" tabs you see titles like "Migrating DB Layer", "Writing API Tests", "Refactoring Router". One glance tells you what every session is up to.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'When a Gemini session finishes its task or needs your input, you get a native desktop notification. You stop babysitting tabs to find out whether something is done. Focus on one session and let the others ping you when they actually need attention. The <a href="/en/guides/codeagentswarm-notifications" class="text-neon-cyan hover:text-neon-purple transition-colors">notification system guide</a> goes deeper on how this works.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Searchable conversation history across sessions',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation across every terminal is saved and searchable. You can find what a Gemini session did yesterday, resume a thread, or review the full history of changes. When you run many sessions, being able to trace what happened where is what keeps the workflow from turning into noise.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A kanban task board sessions update over MCP',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban-style board connects to your terminals, and the sessions update it themselves over MCP. Create tasks, assign them, and watch the board move as work progresses. When two Gemini sessions are building related features, the board keeps the big picture in one place.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode with granular permissions',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Running several sessions means more actions happening at once, which makes permissions matter more. Turbo Mode auto-approves safe operations while keeping risky ones gated, so a Gemini session can move fast without you waving through everything blindly. You set the line between what is automatic and what still needs a yes. The <a href="/en/guides/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> covers the full setup.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Per-terminal live file diffs',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'When two sessions touch the same file, you can see it as it happens. CodeAgentSwarm tracks live file changes per terminal and at the project level, so overlapping edits do not surprise you later. The <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">real-time changes guide</a> has more on this.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Running Gemini in parallel is one flavor of a broader pattern. For the full picture across vendors start with <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the AI CLI agent swarm hub</a>, then compare it with <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Codex CLI sessions</a>.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how the three ways to run multiple Gemini CLI sessions compare across what actually matters once you go past two:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cost',
          id: 'compare-cost',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Free',
            '<strong>tmux/screen:</strong> Free',
            '<strong>CodeAgentSwarm:</strong> Free tier available, Pro for advanced features, runs on top of your Gemini account',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Setup time',
          id: 'compare-setup',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Zero, just open tabs',
            '<strong>tmux/screen:</strong> 10 to 30 minutes to learn the basics, more to customize',
            '<strong>CodeAgentSwarm:</strong> About 2 minutes to download and open',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notifications',
          id: 'compare-notifications',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> None',
            '<strong>tmux/screen:</strong> None unless you script something custom',
            '<strong>CodeAgentSwarm:</strong> Native desktop notifications when a session finishes or needs input',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conversation history',
          id: 'compare-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Lost when you close the tab',
            '<strong>tmux/screen:</strong> Kept while the session is alive, no search',
            '<strong>CodeAgentSwarm:</strong> Saved permanently and searchable across every session',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mixing agents',
          id: 'compare-mixing',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Possible, but you track it in your head',
            '<strong>tmux/screen:</strong> Possible with named panes, still manual',
            '<strong>CodeAgentSwarm:</strong> Pick gemini cli, claude-code, or codex cli per terminal from one picker',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Learning curve',
          id: 'compare-learning',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> None',
            '<strong>tmux/screen:</strong> Moderate to steep (keybindings, config files, pane management)',
            '<strong>CodeAgentSwarm:</strong> Low, a visual interface with familiar patterns',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'If you only need two Gemini sessions now and then, terminal tabs are fine. If you already live in tmux, adding Gemini CLI sessions to your setup is natural. But once you run three or more sessions regularly and want to actually see what each one is doing, CodeAgentSwarm removes the friction the other two approaches leave behind.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How do I run multiple Gemini CLI sessions in parallel?',
      answer: 'Open a terminal, run gemini, then open another terminal and run gemini again. Each session is an independent process with its own conversation and context. You can do this with plain terminal tabs, with tmux split panes, or in CodeAgentSwarm, which runs up to six terminals at once and lets you set each one to gemini cli from the SELECT AI AGENT picker.',
    },
    {
      question: 'Can you run multiple Gemini agents at the same time?',
      answer: 'Yes. Because each Gemini CLI session is a separate process, you can run as many agents as your machine handles. They do not share memory and will only collide if they edit the same files. One agent can refactor code while another writes tests and a third updates documentation.',
    },
    {
      question: 'How do I run Gemini CLI in multiple terminals?',
      answer: 'In each terminal, change into your project directory and run gemini. That is all it takes. tmux lets you split one window into several panes so you see every session at once, and CodeAgentSwarm gives you up to six visual terminals in one workspace with dynamic titles so you can tell them apart at a glance.',
    },
    {
      question: 'Can I run Gemini and Claude Code together?',
      answer: 'Yes. Since every terminal is independent, you can run a Gemini CLI session next to a Claude Code session and a Codex CLI session. In CodeAgentSwarm you set the agent per terminal from the SELECT AI AGENT picker, so a mixed setup lives in one workspace with one shared, searchable history.',
    },
    {
      question: 'How many Gemini CLI sessions can I run at once?',
      answer: 'There is no hard limit from Gemini CLI itself, since each session is just a process. In practice your machine resources, screen space, and the limits on your Google account are the constraints. CodeAgentSwarm supports up to six simultaneous terminals with a layout that keeps everything readable.',
    },
    {
      question: 'Is the Gemini CLI free tier enough to run several sessions?',
      answer: 'For many workflows, yes. Google offers a generous free tier with a Google sign-in, which makes running several Gemini sessions in parallel practical without a metered bill per call. Heavy or sustained use can hit limits, so for large or long-running setups keep an eye on your quota and the limits attached to your account.',
    },
    {
      question: 'What happens if two Gemini sessions edit the same file?',
      answer: 'They do not share memory, so a conflict only appears when two sessions write to the same file. The second write can overwrite the first or create a Git conflict you resolve yourself. To avoid this, give each session a different slice of the codebase. CodeAgentSwarm adds per-terminal live file diffs so you can see overlapping edits as they happen.',
    },
  ],
}

export default guide
