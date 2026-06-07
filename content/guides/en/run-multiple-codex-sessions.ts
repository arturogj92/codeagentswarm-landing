import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'run-multiple-codex-sessions',
    locale: 'en',
    title: 'How to Run Multiple Codex CLI Sessions at Once',
    metaTitle: 'How to Run Multiple Codex CLI Sessions at Once (3 Methods, 2026)',
    metaDescription: 'Run multiple Codex CLI sessions at once. 3 practical methods: terminal tabs, tmux, and CodeAgentSwarm, plus how to run Codex and Claude Code together.',
    intro: `Yes, you can run multiple Codex CLI sessions at once. Each Codex session is its own process, so two or more of them can work on different tasks in the same repository at the same time without sharing context.

The part that takes a bit of thought is not starting the processes, it is keeping track of them once several Codex agents are editing files, pausing for approvals, and finishing at different moments.

This guide walks through the three practical ways to run several Codex CLI sessions side by side: plain terminal tabs, tmux, and CodeAgentSwarm. I compare them honestly and show where each one starts to slow you down.`,
    ctaText: 'Run several Codex CLI sessions at once in CodeAgentSwarm. Up to six terminals in one window, with desktop notifications and full-auto kept in check by per-terminal permissions.',
    highlightedWords: ['multiple Codex CLI sessions', 'at once'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'ejecutar-multiples-sesiones-codex',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Short answer: yes, each Codex session is its own process',
      content: [
        {
          type: 'image',
          alt: 'Six OpenAI Codex CLI terminals running in parallel in a single CodeAgentSwarm workspace, each an independent Codex session',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'Six independent Codex CLI sessions running at once in one CodeAgentSwarm window, each on its own task.',
        },
        {
          type: 'paragraph',
          text: 'A <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> session is just a process. You start it with the <code>codex</code> command, sign in once with <code>codex login</code>, and from then on each session keeps its own conversation, its own context, and its own working directory. Two sessions know nothing about each other.',
        },
        {
          type: 'paragraph',
          text: 'So running multiple Codex CLI sessions at once is not a special mode you have to unlock. Open a second terminal, run <code>codex</code> again, and you already have two independent sessions. One can be migrating a database layer while the other writes integration tests. If you want the bigger picture of what that looks like at scale, the <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex agent swarm</a> guide covers the concept in depth.',
        },
        {
          type: 'paragraph',
          text: 'You are not limited to Codex either. Because each agent is its own process, you can run Codex CLI in some terminals and Claude Code or Gemini CLI in others, all on the same repository. Running Codex and Claude Code together is a common setup, and the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview shows how the different tools fit side by side.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Each Codex session uses your existing OpenAI account independently. There is no separate plan and no surcharge for running several sessions in parallel. You pay for what each session actually does.',
        },
        {
          type: 'paragraph',
          text: 'The real question is how you keep several sessions legible once you go past one or two. That is what the three methods below are about.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal tabs (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The most direct way to run two Codex sessions at once is to open several terminal tabs, move into your project in each one, and start Codex CLI. Nothing to install beyond Codex itself.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\ncodex\n\n# Terminal tab 2\ncd ~/my-project\ncodex\n\n# Terminal tab 3\ncd ~/my-project\ncodex',
        },
        {
          type: 'paragraph',
          text: 'Each tab is now an independent Codex session. Hand each one a different task and switch between them as they work. If you run Codex in an approval mode rather than full auto, every tab stops and waits for you to approve actions, so you end up bouncing between tabs just to keep them moving.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pros',
          id: 'terminal-windows-pros',
        },
        {
          type: 'list',
          items: [
            'Free, nothing to set up beyond Codex CLI',
            'Works instantly with tools you already have',
            'Easy to reason about, one tab is one session',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cons',
          id: 'terminal-windows-cons',
        },
        {
          type: 'list',
          items: [
            'You lose track of which tab is running which task almost immediately',
            'No notification when a Codex session finishes or stops for an approval',
            'No shared view, you have to click into each tab to check progress',
            'No way to search across the conversation history of different sessions',
            'If two sessions edit the same file, untangling it is on you',
            'With three or more tabs they all look the same',
          ],
        },
        {
          type: 'paragraph',
          text: 'For two Codex sessions this is fine. Beyond that, the time you spend hunting for the tab that is waiting on an approval starts to cancel out the speed you gained by going parallel in the first place.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> lets you split one window into panes and keep sessions alive in the background. You can watch several Codex CLI sessions at once without flipping between tabs, which is closer to running Codex CLI in parallel than tabs ever get.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s codex\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run codex in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux also lets you detach and reattach, so your Codex sessions keep running even after you close the terminal window. That is genuinely useful for long migrations or refactors running in full auto.',
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
            'Free and available on almost any Unix machine',
            'See several panes at once, no tab switching',
            'Sessions survive disconnects, good for long full-auto runs',
            'Scriptable and configurable down to the keybinding',
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
            'Real learning curve if you have never used tmux',
            'Still no desktop notification when a session finishes or asks for approval',
            'No conversation history or cross-session search',
            'Text-only panes get cramped past three or four Codex sessions',
            'No task board or organization layer on top',
            'You rebuild the layout by hand every session unless you script it',
            'Conflicts between sessions touching the same file are still your problem',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a great general-purpose multiplexer and plenty of developers already use it. But it was never built for supervising AI agents specifically. The moment a Codex session in pane 3 quietly stops for an approval while you are reading pane 1, you feel the gap.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running and supervising several AI CLI sessions in one place. It runs on macOS and Windows, gives you up to six terminals in a single workspace, and lets you choose the agent per terminal. To run Codex CLI in parallel you just pick "codex cli" in the SELECT AI AGENT picker in each terminal you want running Codex.',
        },
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker with claude-code, gemini cli and codex cli options plus an Enable Turbo Mode toggle',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you choose the agent per terminal. Set each one to codex cli to run several Codex sessions, with a Turbo Mode toggle for full-auto runs.',
        },
        {
          type: 'paragraph',
          text: 'Here is what that gives you when several Codex sessions are running at once:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Up to 6 Codex sessions in parallel',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Set every terminal to "codex cli" to run six Codex sessions at once, or mix in Claude Code and Gemini CLI where they fit better. Each terminal is a fully independent Codex process with its own conversation and project context. CodeAgentSwarm runs on top of your existing subscriptions, so it is not a model provider, it just orchestrates the agents you already pay for. If Claude Code is your main agent, the same setup is covered in the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> guide.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Every terminal updates its own title to reflect what its Codex session is doing right now. Instead of six tabs all labelled "codex", you read titles like "Migrating User Schema", "Writing API Tests", "Refactoring Auth". You can tell which session is on which task without clicking into any of them.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'This is the single biggest fix when you run several sessions. When a Codex session finishes its task or stops to ask for an approval, you get a native desktop notification. You stop babysitting panes and let the sessions call you when they actually need you, which is the whole point of running them in parallel.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full conversation history, searchable',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation across every terminal is saved and searchable, including across different agents. You can go back and find what a Codex session decided yesterday, resume it, or trace exactly which session made a given change. With several sessions running, that audit trail is what keeps the whole thing legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Built-in task board',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits next to your terminals, and the agents update it themselves over MCP. You create tasks, hand them to terminals, and watch cards move as each Codex session picks up, works, and finishes. When several sessions are chipping away at related features, the board keeps the plan visible instead of living in your head.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode and granular permissions',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Codex has its own approval modes, from suggest-only up to full auto with <code>--full-auto</code>, plus a sandbox. CodeAgentSwarm sits above that with Turbo Mode and per-terminal permissions, so you can let sessions run in full auto on the safe operations while still gating the dangerous ones. That is the practical way to keep several Codex sessions fast without leaving them unsupervised. The <a href="/en/guides/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> covers the setup.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Per-terminal live file diffs',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each Codex session is making in real time, per terminal and at the project level. When two sessions edit the same file, you see it as it happens instead of discovering it in a messy diff later. Git still handles the merge, but the visibility means overlapping edits never surprise you.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'New to running several terminals at once? The <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">multi-terminal guide</a> walks through the layout and workflow, and applies the same way whether the agent is Codex or Claude Code.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how the three ways to run multiple Codex CLI sessions compare on the things that actually bite once you scale past two:',
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
            '<strong>CodeAgentSwarm:</strong> Free tier available, Pro for advanced features. Your Codex usage is billed by OpenAI as usual.',
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
            '<strong>Terminal tabs:</strong> Zero, just open tabs and run codex',
            '<strong>tmux/screen:</strong> 10-30 minutes to learn the basics, longer to script a reusable layout',
            '<strong>CodeAgentSwarm:</strong> A couple of minutes to download, open, and pick codex cli per terminal',
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
            '<strong>CodeAgentSwarm:</strong> Native desktop notifications when a session finishes or needs an approval',
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
            '<strong>Terminal tabs:</strong> Gone when you close the tab',
            '<strong>tmux/screen:</strong> Kept while the session lives, no search',
            '<strong>CodeAgentSwarm:</strong> Saved permanently and searchable across every session',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full-auto supervision',
          id: 'compare-supervision',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> All on you, one tab at a time',
            '<strong>tmux/screen:</strong> Visible in panes, but no guardrails or per-session policy',
            '<strong>CodeAgentSwarm:</strong> Turbo Mode plus granular permissions so full-auto stays safe',
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
            '<strong>tmux/screen:</strong> Moderate to steep, with keybindings and config files',
            '<strong>CodeAgentSwarm:</strong> Low, a visual interface with familiar patterns',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'If you only ever need two Codex sessions at once, terminal tabs are perfectly fine. If you already run your day inside tmux, dropping a few Codex sessions into your existing panes is natural. But once you regularly run three or more Codex sessions in full auto and want to actually see what each one is doing, CodeAgentSwarm removes the coordination overhead that the other two leave on your plate.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can you run multiple Codex CLI sessions at once?',
      answer: 'Yes. Each time you run the codex command you get an independent session with its own conversation and context, so you can open several terminals and run Codex CLI in each one. They do not share state or step on each other unless they edit the same files. CodeAgentSwarm supports up to 6 terminals so you can supervise several Codex sessions in one window.',
    },
    {
      question: 'How do I run two Codex sessions at the same time?',
      answer: 'Open two terminal tabs, move into your project in each one with cd, and run codex in both. Each tab is now a separate Codex session you can give different instructions to. For more than two, tmux split panes or CodeAgentSwarm make the extra sessions much easier to keep track of.',
    },
    {
      question: 'Does running multiple Codex sessions cost more?',
      answer: 'There is no surcharge for running sessions in parallel. Each Codex session uses your existing OpenAI account and you are billed for the work each one actually does, the same as if you ran them one after another. Running them at the same time finishes sooner, it does not change the per-session cost.',
    },
    {
      question: 'Can I run Codex and Claude Code together?',
      answer: 'Yes. Because every agent is just a separate process, you can run Codex CLI in some terminals and Claude Code or Gemini CLI in others, all on the same project. In CodeAgentSwarm you choose the agent per terminal with the SELECT AI AGENT picker, so a mixed setup of Codex and Claude Code is the default rather than a workaround.',
    },
    {
      question: 'How do I run Codex CLI sessions in full auto?',
      answer: 'Codex has its own approval modes, from suggest-only up to full auto, which you reach with the --full-auto flag, backed by a sandbox. When you run several sessions in full auto at once, the risk is that they act without you watching. CodeAgentSwarm adds Turbo Mode and per-terminal permissions on top, so you can auto-approve safe operations while still gating the dangerous ones.',
    },
    {
      question: 'How many Codex sessions can I run at once?',
      answer: 'There is no hard limit from Codex CLI itself, since each session is just a process. In practice your machine resources and screen space are the constraints. CodeAgentSwarm supports up to 6 simultaneous terminals with a layout that keeps several Codex sessions manageable in one window.',
    },
    {
      question: 'Running multiple Codex sessions vs tmux, which is better?',
      answer: 'tmux can host several Codex sessions in split panes for free, and if you already use it that works well. What it lacks is anything built for AI agents: no desktop notification when a session finishes or asks for an approval, no searchable history across sessions, no dynamic titles, no task board, and no permission layer for full-auto runs. CodeAgentSwarm adds all of that, which matters most exactly when you are running several Codex sessions at once.',
    },
  ],
}

export default guide
