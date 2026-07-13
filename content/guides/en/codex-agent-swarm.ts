import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-agent-swarm',
    locale: 'en',
    title: 'Codex Agent Swarm: Run Multiple Codex CLI Agents in Parallel',
    metaTitle: 'Codex Agent Swarm: Run Multiple Codex CLI Agents in Parallel (2026)',
    metaDescription: 'A codex agent swarm runs several Codex CLI agents in parallel. Learn 3 ways to do it: terminal tabs, tmux, and CodeAgentSwarm, with full-auto and supervision.',
    intro: `A codex agent swarm just means several Codex CLI agents working in parallel instead of one at a time. Since every Codex session is its own process, nothing stops you from running a handful of them side by side, each on a different task.

The catch is not whether you can start the processes. It is how you keep track of them once three or four agents are editing files, asking for approvals, and finishing at different moments. That part is where most swarm setups fall apart.

In this guide I walk through the three practical ways to run a Codex swarm, compare them honestly, and show where each one starts to hurt. If you want the broader picture across every CLI, start with the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview, and if Claude Code is your main agent see <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>.`,
    ctaText: 'Run your Codex agent swarm in CodeAgentSwarm. Several Codex CLI terminals in full-auto, with Turbo Mode and per-terminal permissions keeping them honest.',
    highlightedWords: ['Codex agent swarm', 'Codex CLI'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'enjambre-de-agentes-codex',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'The short answer: yes, you can run a Codex swarm',
      content: [
        {
          type: 'image',
          alt: 'Multiple OpenAI Codex CLI terminals running in parallel in a single CodeAgentSwarm workspace, each an independent Codex session',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'A Codex agent swarm: several independent Codex CLI sessions running side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: 'A <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> session is just a process. You start it with the <code>codex</code> command, sign in once with <code>codex login</code>, and from then on each session has its own conversation, its own context, and its own working directory. Two sessions know nothing about each other.',
        },
        {
          type: 'paragraph',
          text: 'So a codex agent swarm is not some special mode you unlock. It is simply more than one Codex CLI agent running at the same time. Open a second terminal, run <code>codex</code> again, and you now have two independent agents. One can be migrating a database layer while the other writes integration tests. Add a third and a fourth and you have a small swarm.',
        },
        {
          type: 'paragraph',
          text: 'You are not limited to Codex either. Because each agent is its own process, you can put Codex CLI in some terminals and Claude Code or Gemini CLI in others, all working the same repository.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Each Codex agent uses your existing OpenAI account independently. There is no separate "swarm" plan and no premium for running several agents in parallel. You pay for what each agent actually does.',
        },
        {
          type: 'paragraph',
          text: 'The real work is managing the swarm once it grows. Codex agents pause for approvals, finish at different times, and sometimes touch the same files. The three methods below handle that coordination with very different amounts of friction.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal windows (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The most obvious way to build a Codex swarm is to open several terminal tabs, move into your project in each one, and start Codex CLI. Nothing to install beyond Codex itself.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\ncodex\n\n# Terminal tab 2\ncd ~/my-project\ncodex\n\n# Terminal tab 3\ncd ~/my-project\ncodex',
        },
        {
          type: 'paragraph',
          text: 'Each tab is now an independent Codex agent. You can hand each one a different task and switch between them as they work. If you run Codex in an approval mode rather than full auto, each tab will stop and wait for you to approve actions, which means you are bouncing between tabs to keep them moving.',
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
            'No notification when a Codex agent finishes or stops for an approval',
            'No shared view, you have to click into each tab to check progress',
            'No way to search across the conversation history of different agents',
            'If two agents edit the same file, untangling it is on you',
            'With three or more tabs they all look the same',
          ],
        },
        {
          type: 'paragraph',
          text: 'For two agents this is fine. Beyond that, the time you spend hunting for the tab that needs an approval starts to cancel out the speed you gained by going parallel in the first place.',
        },
      ],
    },
    {
      id: 'method-tmux',
      title: 'Method 2: tmux or screen (free, advanced)',
      content: [
        {
          type: 'paragraph',
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> lets you split one window into panes and keep sessions alive in the background. You can watch several Codex agents at once without flipping between tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s codex-swarm\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run codex in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux also lets you detach and reattach, so your Codex agents keep running even after you close the terminal window. That is genuinely useful for long migrations or refactors that run in full auto.',
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
            'Still no desktop notification when an agent finishes or asks for approval',
            'No conversation history or cross-agent search',
            'Text-only panes get cramped past three or four Codex agents',
            'No task board or organization layer on top',
            'You rebuild the layout by hand every session unless you script it',
            'Conflicts between agents touching the same file are still your problem',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a great general-purpose multiplexer and plenty of developers already use it. But it was never built for supervising AI agents specifically. The moment a Codex agent in pane 3 quietly stops for an approval while you are reading pane 1, you feel the gap.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running and supervising a swarm of AI CLI agents in one place. It runs on macOS and Windows, gives you multiple terminals in a single workspace, and lets you choose the agent per terminal. For a Codex swarm you just pick "codex cli" in the SELECT AI AGENT picker in each terminal you want running Codex.',
        },
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker with claude-code, gemini cli and codex cli options plus an Enable Turbo Mode toggle',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you choose the agent per terminal. Set each one to codex cli to build a Codex swarm, with a Turbo Mode toggle for full-auto runs.',
        },
        {
          type: 'paragraph',
          text: 'Here is what that gives you when the agents are all Codex (or a mix):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiple Codex agents in parallel',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Set every terminal to "codex cli" for a pure Codex swarm, or mix in Claude Code and Gemini CLI where they fit better. Each terminal is a fully independent Codex process with its own conversation and project context. CodeAgentSwarm runs on top of your existing subscriptions, so it is not a model provider, it just orchestrates the agents you already pay for.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Every terminal updates its own title to reflect what its Codex agent is doing right now. Instead of several tabs all labelled "codex", you read titles like "Migrating User Schema", "Writing API Tests", "Refactoring Auth". You can tell which agent is on which task without clicking into any of them.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'This is the single biggest fix for a swarm. When a Codex agent finishes its task or stops to ask for an approval, you get a native desktop notification. You stop babysitting panes and let the agents call you when they actually need you, which is the whole point of running them in parallel.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full conversation history, searchable',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation across every terminal is saved and searchable, including across different agents. You can go back and find what a Codex agent decided yesterday, resume it, or trace exactly which agent made a given change. With a swarm running, that audit trail is what keeps the whole thing legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Built-in task board',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits next to your terminals, and the agents update it themselves over MCP. You create tasks, hand them to terminals, and watch cards move as each Codex agent picks up, works, and finishes. When several agents are chipping away at related features, the board keeps the plan visible instead of living in your head. The visual layer itself, capability by capability, is covered in the <a href="/en/guides/codex-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex GUI guide</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo Mode and granular permissions',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Codex has its own approval modes, from suggest-only up to full auto with <code>--full-auto</code>, plus a sandbox. CodeAgentSwarm sits above that with Turbo Mode and per-terminal permissions, so you can let agents run in full auto on the safe operations while still gating the dangerous ones. That is the practical way to keep a Codex swarm fast without leaving it unsupervised. The <a href="/en/guides/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> covers the setup.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Per-terminal live file diffs',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each Codex agent is making in real time, per terminal and at the project level. When two agents edit the same file, you see it as it happens instead of discovering it in a messy diff later. Git still handles the merge, but the visibility means overlapping edits never surprise you.',
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
          text: 'Here is how the three ways to run a Codex swarm compare on the things that actually bite once you scale past two agents:',
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
            '<strong>CodeAgentSwarm:</strong> Native desktop notifications when an agent finishes or needs an approval',
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
            '<strong>CodeAgentSwarm:</strong> Saved permanently and searchable across every agent',
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
            '<strong>tmux/screen:</strong> Visible in panes, but no guardrails or per-agent policy',
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
          text: 'If you only ever need two Codex agents at once, terminal tabs are perfectly fine. If you already run your day inside tmux, dropping a few Codex sessions into your existing panes is natural. But once you regularly run three or more Codex agents in full auto and want to actually see what each one is doing, CodeAgentSwarm removes the coordination overhead that the other two leave on your plate.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a Codex agent swarm?',
      answer: 'A Codex agent swarm is simply several OpenAI Codex CLI agents running in parallel instead of one at a time. Each agent is its own process with its own conversation and context, so they can work on different tasks in the same repository at the same time. It is not a special Codex feature, just a way of working that you can set up with terminal tabs, tmux, or a tool like CodeAgentSwarm.',
    },
    {
      question: 'Can you run multiple Codex CLI sessions at once?',
      answer: 'Yes. Each time you run the codex command you get an independent session, so you can open several terminals and run Codex CLI in each one. They do not share context or step on each other unless they edit the same files. CodeAgentSwarm supports multiple terminals so you can supervise the whole swarm in one window.',
    },
    {
      question: 'Can I mix Codex CLI and Claude Code in one swarm?',
      answer: 'Yes. Because every agent is just a separate process, you can run Codex CLI in some terminals and Claude Code or Gemini CLI in others, all on the same project. In CodeAgentSwarm you choose the agent per terminal with the SELECT AI AGENT picker, so a mixed swarm is the default rather than a workaround.',
    },
    {
      question: 'Does running multiple Codex agents cost more?',
      answer: 'There is no surcharge for running agents in parallel. Each Codex agent uses your existing OpenAI account and you are billed for the work each one actually does, the same as if you ran them one after another. Running them at the same time finishes sooner, it does not change the per-agent cost.',
    },
    {
      question: 'Codex agent swarm vs tmux?',
      answer: 'tmux can absolutely host a Codex swarm in split panes, and it is free. What it lacks is anything built for AI agents: no desktop notification when an agent finishes or asks for an approval, no searchable history across agents, no dynamic titles, no task board, and no permission layer for full-auto runs. CodeAgentSwarm adds all of that on top, which matters most exactly when you are running several Codex agents at once.',
    },
  ],
}

export default guide
