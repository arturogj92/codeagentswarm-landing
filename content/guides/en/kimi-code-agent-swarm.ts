import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-agent-swarm',
    locale: 'en',
    title: 'Kimi Code Agent Swarm: Run Multiple Kimi Agents in Parallel',
    metaTitle: 'Kimi Code Agent Swarm: Run Multiple Kimi Agents in Parallel (2026)',
    metaDescription: 'A Kimi Code agent swarm runs several kimi sessions in parallel. Learn 3 ways: terminal tabs, tmux, and CodeAgentSwarm, plus how the shared K3 quota behaves.',
    intro: `A Kimi Code agent swarm just means several Kimi Code agents working in parallel instead of one at a time. Every time you run the <code>kimi</code> command you start an independent session with its own conversation and its own context, so nothing stops you from running three or four of them side by side, each on a different task, all powered by Kimi K3.

The catch is not starting the processes. It is keeping track of them once several agents are editing files, pausing for permission prompts, and finishing at different moments. Kimi Code adds one twist the other CLIs do not have in this exact shape: every agent in your swarm draws from the same Kimi subscription quota, which refreshes weekly and is also limited by a rolling 5 hour window. A swarm gets more done per hour, and it also burns that shared pool faster.

In this guide I walk through the three practical ways to run a Kimi Code swarm, how the shared quota behaves when you go parallel, and where each method starts to hurt. For the broader picture across every CLI, start with the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview, and for the session mechanics specifically see <a href="/en/guides/run-multiple-kimi-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Kimi Code sessions</a>.`,
    ctaText: 'Run your Kimi Code agent swarm in CodeAgentSwarm. Several kimi terminals in parallel with live diffs, desktop notifications and a quota indicator that shows how much of your weekly and 5 hour windows the swarm has used.',
    highlightedWords: ['Kimi Code Agent Swarm', 'Kimi'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'enjambre-de-agentes-kimi-code',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'The short answer: yes, you can run a Kimi Code swarm',
      content: [
        {
          type: 'paragraph',
          text: 'A <a href="https://github.com/MoonshotAI/kimi-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a> session is just a process. You install the CLI once (the official script is <code>curl -fsSL https://code.kimi.com/kimi-code/install.sh | bash</code>, or <code>npm install -g @moonshot-ai/kimi-code</code> if you already have Node 22.19 or later), log in once with <code>/login</code>, and from then on every <code>kimi</code> you start is an independent agent with its own conversation, its own context, and its own working directory. Two sessions know nothing about each other.',
        },
        {
          type: 'paragraph',
          text: 'So a Kimi Code agent swarm is not a special mode you unlock. It is simply more than one Kimi Code agent running at the same time. Open a second terminal, run <code>kimi</code> again, and you have two independent agents. One can be migrating a database layer while the other writes integration tests. Add a third and a fourth and you have a small swarm, every one of them running Kimi K3 with its huge context window.',
        },
        {
          type: 'paragraph',
          text: 'Each session also leaves a real trace on disk. Kimi Code stores every session as plain files under <code>~/.kimi-code/sessions/</code>, organized per project, with the transcript and the session title. That matters for a swarm because you can name sessions with <code>/title</code>, resume the last one in a directory with <code>kimi --continue</code>, and tell your agents apart later. The <a href="/en/guides/kimi-code-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code conversation history guide</a> covers that side in detail.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Do not confuse a swarm with Kimi Code sub-agents. Kimi Code ships three built-in sub-agents (coder, explore and plan) that run inside a single session. A swarm is different: several fully independent sessions, each with its own terminal, its own task and its own transcript. Sub-agents parallelize steps of one task, a swarm parallelizes whole tasks.',
        },
        {
          type: 'paragraph',
          text: 'The real work is managing the swarm once it grows. Kimi Code agents pause for approval before risky actions unless you loosen permissions, they finish at different times, and sometimes they touch the same files. The three methods below handle that coordination with very different amounts of friction.',
        },
      ],
    },
    {
      id: 'shared-quota',
      title: 'One subscription, many agents: how the quota behaves',
      content: [
        {
          type: 'paragraph',
          text: 'This is the most important Kimi-specific fact before you scale up. Every Kimi Code agent you run signs in with the same account, and they all draw from one shared quota pool. That quota refreshes on a weekly cycle, and there is a rolling 5 hour window on top, so a burst of heavy parallel work can hit the short window even when plenty of weekly quota remains.',
        },
        {
          type: 'paragraph',
          text: 'In practice the 5 hour window is the ceiling a swarm actually feels. Four agents chewing through a big repository at the same time consume in one hour what a single agent would spread across the afternoon. Nothing breaks, you just reach the window sooner and wait for it to roll. If you want the full detail on plans, multipliers and what each tier includes, see the <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code plans and pricing guide</a>.',
        },
        {
          type: 'list',
          items: [
            'All agents share one pool: there is no per-terminal quota, so a swarm spends faster than a single agent',
            'Weekly refresh: the pool resets on a 7 day cycle from your subscription date',
            'Rolling 5 hour window: short bursts are limited separately, which is what parallel work tends to hit first',
            'Check usage anytime with the <code>/usage</code> command inside any session',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Match the swarm size to the work, not the other way around. Two or three agents on genuinely independent tasks is usually the sweet spot: real parallel progress without draining the 5 hour window on coordination overhead.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal windows (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The most obvious way to build a Kimi Code swarm is to open several terminal tabs, move into your project in each one, and start kimi. Nothing to install beyond Kimi Code itself.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nkimi\n\n# Terminal tab 2\ncd ~/my-project\nkimi\n\n# Terminal tab 3\ncd ~/my-project\nkimi',
        },
        {
          type: 'paragraph',
          text: 'Each tab is now an independent Kimi Code agent. You can hand each one a different task and switch between them as they work. When an agent stops to ask for approval before running a command or writing a file, that tab just sits there waiting, which means you are bouncing between tabs to keep the swarm moving.',
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
            'Free, nothing to set up beyond Kimi Code',
            'Works instantly with tools you already have',
            'Easy to reason about, one tab is one agent',
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
            'No notification when a Kimi Code agent finishes or stops for a permission prompt',
            'No shared view, you have to click into each tab to check progress',
            'No way to search across the conversation history of different agents',
            'If two agents edit the same file, untangling it is on you',
            'No view of how much shared quota the swarm has consumed until you ask each session',
          ],
        },
        {
          type: 'paragraph',
          text: 'For two agents this is fine. Beyond that, the time you spend hunting for the tab that needs input starts to cancel out the speed you gained by going parallel in the first place.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> lets you split one window into panes and keep sessions alive in the background. You can watch several Kimi Code agents at once without flipping between tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s kimi-swarm\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run kimi in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux also lets you detach and reattach, so your Kimi Code agents keep running after you close the terminal window. One honest caveat for unattended runs: Kimi Code is a young, fast-moving CLI, and there are open upstream reports of sessions stalling silently when a request hangs. A stalled pane in a detached tmux session looks exactly like a working one, so check in on long runs rather than assuming silence means progress.',
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
            'Sessions survive disconnects, good for long runs',
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
            'Still no desktop notification when an agent finishes or asks for a permission',
            'No conversation history or cross-agent search',
            'Text-only panes get cramped past three or four agents',
            'A silently stalled agent looks identical to a busy one',
            'You rebuild the layout by hand every session unless you script it',
            'Conflicts between agents touching the same file are still your problem',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a great general-purpose multiplexer and plenty of developers already use it. But it was never built for supervising AI agents. The moment a Kimi Code agent in pane 3 quietly stops for a permission prompt while you are reading pane 1, you feel the gap.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running and supervising a swarm of AI CLI agents in one place. It runs on macOS and Windows, gives you multiple terminals in a single workspace, and lets you choose the agent per terminal. Kimi Code is a first-class agent alongside Claude Code, Codex CLI, Antigravity CLI and opencode, so for a Kimi swarm you just pick Kimi Code in the agent picker in each terminal you want running kimi.',
        },
        {
          type: 'paragraph',
          text: 'Here is what that gives you when the agents are all Kimi Code (or a mix):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiple Kimi Code agents in parallel',
          id: 'multiple-kimi-agents',
        },
        {
          type: 'paragraph',
          text: 'Set every terminal to Kimi Code for a pure Kimi swarm, or mix in Claude Code and Codex CLI where they fit better. Each terminal is a fully independent kimi process with its own conversation and project context. CodeAgentSwarm runs on top of your existing Kimi subscription, so it is not a model provider, it just orchestrates the agents you already pay for.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Quota visibility for the whole swarm',
          id: 'quota-visibility',
        },
        {
          type: 'paragraph',
          text: 'Because every Kimi agent drains the same pool, CodeAgentSwarm shows a usage indicator that reads your real Kimi quota, both the weekly cycle and the rolling 5 hour window. You see how much the swarm has consumed at a glance instead of typing /usage into each session and adding it up in your head.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Every terminal updates its own title to reflect what its agent is doing right now. Instead of several tabs all labelled "kimi", you read titles like "Migrating User Schema", "Writing API Tests", "Refactoring Auth". You can tell which agent is on which task without clicking into any of them.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'This is the single biggest fix for a swarm. When a Kimi Code agent finishes its task or stops to ask for a permission, you get a native desktop notification. You stop babysitting panes and let the agents call you when they actually need you. It is also the practical answer to the stalled-session problem: when an agent that should have pinged you stays quiet for too long, you notice.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full conversation history, searchable',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code stores its sessions locally as plain files, and CodeAgentSwarm reads them, so every Kimi conversation is saved and searchable, including across different agents and different CLIs. You can go back and find what an agent decided yesterday, resume it, or trace exactly which agent made a given change. With a swarm running, that audit trail is what keeps the whole thing legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Built-in task board',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits next to your terminals, and the agents update it themselves over MCP. Kimi Code speaks the same MCP tool conventions as Claude Code, so the board integration works the same way: you create tasks, hand them to terminals, and watch cards move as each agent picks up, works, and finishes.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Per-terminal live file diffs',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each Kimi Code agent is making in real time, per terminal and at the project level. When two agents edit the same file, you see it as it happens instead of discovering it in a messy diff later. This matters even more if you run agents with <code>--yolo</code>: the <a href="/en/guides/kimi-code-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code YOLO mode guide</a> covers how to keep an auto-approving agent accountable.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Running agents in the same repository can still produce overlapping edits. For bigger swarms, give each agent its own copy of the repo with git worktrees. The <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI agents guide</a> shows the setup.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how the three ways to run a Kimi Code swarm compare on the things that actually bite once you scale past two agents:',
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
            '<strong>CodeAgentSwarm:</strong> Free tier available, Pro for advanced features. Your Kimi usage is billed through your existing Kimi subscription either way.',
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
            '<strong>Terminal tabs:</strong> Zero, just open tabs and run kimi',
            '<strong>tmux/screen:</strong> 10-30 minutes to learn the basics, longer to script a reusable layout',
            '<strong>CodeAgentSwarm:</strong> A couple of minutes to download, open, and pick Kimi Code per terminal',
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
            '<strong>CodeAgentSwarm:</strong> Native desktop notifications when an agent finishes or needs a permission',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Quota visibility',
          id: 'compare-quota',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Type /usage in each session and add it up yourself',
            '<strong>tmux/screen:</strong> Same, per pane',
            '<strong>CodeAgentSwarm:</strong> A usage indicator that reads your Kimi weekly and 5 hour windows for the whole swarm',
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
            '<strong>Terminal tabs:</strong> On disk, but nothing to search it with',
            '<strong>tmux/screen:</strong> Same, plus scrollback while the pane lives',
            '<strong>CodeAgentSwarm:</strong> Reads Kimi Code\'s locally stored sessions and makes them searchable across every agent',
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
          text: 'If you only ever need two Kimi Code agents at once, terminal tabs are perfectly fine. If you already run your day inside tmux, dropping a few kimi sessions into your existing panes is natural. But once you regularly run three or more agents against one shared quota and want to actually see what each one is doing and spending, CodeAgentSwarm removes the coordination overhead that the other two leave on your plate.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a Kimi Code agent swarm?',
      answer: 'A Kimi Code agent swarm is simply several Kimi Code agents running in parallel instead of one at a time. Each agent is its own kimi process with its own conversation and context, so they can work on different tasks in the same repository at the same time. It is not a special Kimi Code feature, just a way of working that you can set up with terminal tabs, tmux, or a tool like CodeAgentSwarm.',
    },
    {
      question: 'Can you run multiple Kimi Code sessions at once?',
      answer: 'Yes. Each time you run the kimi command you get an independent session, so you can open several terminals and run kimi in each one. They do not share context or step on each other unless they edit the same files. CodeAgentSwarm supports multiple terminals so you can supervise the whole swarm in one window.',
    },
    {
      question: 'Do parallel Kimi Code agents cost more?',
      answer: 'There is no surcharge for parallelism, but there is a shared pool. Every agent draws from the same Kimi subscription quota, which refreshes weekly and is also limited by a rolling 5 hour window. Running four agents at once does the work sooner while consuming quota faster, so heavy swarms tend to feel the 5 hour window first. The total amount of work you can buy with your plan does not change.',
    },
    {
      question: 'Is a swarm the same as Kimi Code sub-agents?',
      answer: 'No. Kimi Code ships three built-in sub-agents (coder, explore and plan) that run inside a single session and share that session\'s context and quota. A swarm is several fully independent sessions, each in its own terminal with its own task and transcript. Sub-agents parallelize steps within one task, a swarm parallelizes whole tasks.',
    },
    {
      question: 'Can I mix Kimi Code and Claude Code in one swarm?',
      answer: 'Yes. Because every agent is just a separate process, you can run Kimi Code in some terminals and Claude Code, Codex CLI or opencode in others, all on the same project. In CodeAgentSwarm you choose the agent per terminal, so a mixed swarm is the default rather than a workaround. And if you want the K3 model inside Claude Code itself, that setup exists too and is covered in the Kimi K3 with Claude Code guide.',
    },
    {
      question: 'Kimi Code agent swarm vs tmux?',
      answer: 'tmux can absolutely host a Kimi Code swarm in split panes, and it is free. What it lacks is anything built for AI agents: no desktop notification when an agent finishes or asks for a permission, no searchable history across agents, no quota view, and no live diffs. Those gaps matter more with Kimi Code than with most CLIs, because all your agents drain one shared quota and a stalled session can sit silent in a pane looking exactly like a busy one.',
    },
  ],
}

export default guide
