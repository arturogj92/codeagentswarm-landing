import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-agent-swarm',
    locale: 'en',
    title: 'OpenCode Agent Swarm: Run Multiple opencode Agents in Parallel',
    metaTitle: 'OpenCode Agent Swarm: Run Multiple opencode Agents in Parallel (2026)',
    metaDescription: 'An opencode agent swarm runs several opencode agents in parallel. Learn 3 ways: terminal tabs, tmux, and CodeAgentSwarm, with each agent on any model provider.',
    intro: `An opencode agent swarm just means several opencode agents working in parallel instead of one at a time. Since every opencode session is its own process, nothing stops you from running a handful of them side by side, each on a different task.

The catch is not whether you can start the processes. It is how you keep track of them once three or four agents are editing files, waiting on permissions, and finishing at different moments. That part is where most swarm setups fall apart. opencode adds one twist worth knowing up front: because it is provider-agnostic, the agents in your swarm do not even have to share a model vendor.

In this guide I walk through the three practical ways to run an opencode swarm, compare them honestly, and show where each one starts to hurt. If you want the broader picture across every CLI, start with the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview, and if you want the mechanics of parallel sessions specifically see <a href="/en/guides/run-multiple-opencode-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple opencode sessions</a>.`,
    ctaText: 'Run your opencode agent swarm in CodeAgentSwarm. Several opencode terminals in parallel, on any model provider, with live diffs and desktop notifications keeping every agent honest.',
    highlightedWords: ['OpenCode Agent Swarm', 'opencode'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'enjambre-de-agentes-opencode',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'The short answer: yes, you can run an opencode swarm',
      content: [
        {
          type: 'image',
          alt: 'Multiple opencode terminals running in parallel in a single CodeAgentSwarm workspace, each an independent opencode session',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'An opencode agent swarm: several independent opencode sessions running side by side in one CodeAgentSwarm window.',
        },
        {
          type: 'paragraph',
          text: 'An <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a> session is just a process. You start it with the <code>opencode</code> command, connect a model provider once (check the official opencode docs for the exact auth flow, something like <code>opencode auth login</code>), and from then on each session has its own conversation, its own context, and its own working directory. Two sessions know nothing about each other.',
        },
        {
          type: 'paragraph',
          text: 'So an opencode agent swarm is not some special mode you unlock. It is simply more than one opencode agent running at the same time. Open a second terminal, run <code>opencode</code> again, and you now have two independent agents. One can be migrating a database layer while the other writes integration tests. Add a third and a fourth and you have a small swarm.',
        },
        {
          type: 'paragraph',
          text: 'opencode has a property most other CLI agents do not: it is provider-agnostic, so it works with Anthropic, OpenAI, Google, and local models. That means a swarm does not have to be single-vendor at the model level. You can point one terminal at Anthropic, another at OpenAI, a third at Google, and a fourth at a local model, all on the same repository. Each agent picks whichever model fits its task, and none of them care what the others are running on.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'opencode is open source. Each agent uses whatever provider account you connected to it, so there is no separate "swarm" plan and no premium for running several agents in parallel. You pay each provider for what each agent actually does.',
        },
        {
          type: 'paragraph',
          text: 'The real work is managing the swarm once it grows. Depending on your permission config, opencode agents pause for approval on some actions, they finish at different times, and sometimes they touch the same files. The three methods below handle that coordination with very different amounts of friction.',
        },
      ],
    },
    {
      id: 'method-terminal-windows',
      title: 'Method 1: Multiple terminal windows (free, basic)',
      content: [
        {
          type: 'paragraph',
          text: 'The most obvious way to build an opencode swarm is to open several terminal tabs, move into your project in each one, and start opencode. Nothing to install beyond opencode itself (<code>npm install -g opencode-ai</code>).',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nopencode\n\n# Terminal tab 2\ncd ~/my-project\nopencode\n\n# Terminal tab 3\ncd ~/my-project\nopencode',
        },
        {
          type: 'paragraph',
          text: 'Each tab is now an independent opencode agent. You can hand each one a different task and switch between them as they work. If your permission config makes agents ask before running commands or writing files, each tab will stop and wait for you, which means you are bouncing between tabs to keep them moving. Point each tab at a different provider and you also have to remember which model is behind which tab.',
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
            'Free, nothing to set up beyond opencode',
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
            'No notification when an opencode agent finishes or stops for a permission prompt',
            'No shared view, you have to click into each tab to check progress',
            'No way to search across the conversation history of different agents',
            'If two agents edit the same file, untangling it is on you',
            'With three or more tabs they all look the same, and nothing shows which provider each one is using',
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
          text: 'If you live in the terminal, <a href="https://github.com/tmux/tmux/wiki" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">tmux</a> lets you split one window into panes and keep sessions alive in the background. You can watch several opencode agents at once without flipping between tabs.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new tmux session\ntmux new-session -s opencode-swarm\n\n# Split horizontally\ntmux split-window -h\n\n# Split the right pane vertically\ntmux split-window -v\n\n# Now you have 3 panes - run opencode in each one',
        },
        {
          type: 'paragraph',
          text: 'tmux also lets you detach and reattach, so your opencode agents keep running even after you close the terminal window. That is genuinely useful for long migrations or refactors, especially when one pane is on a slower or cheaper model than the others and takes longer to finish.',
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
            'Text-only panes get cramped past three or four opencode agents',
            'No task board or organization layer on top',
            'You rebuild the layout by hand every session unless you script it',
            'Conflicts between agents touching the same file are still your problem',
          ],
        },
        {
          type: 'paragraph',
          text: 'tmux is a great general-purpose multiplexer and plenty of developers already use it. But it was never built for supervising AI agents specifically. The moment an opencode agent in pane 3 quietly stops for a permission prompt while you are reading pane 1, you feel the gap.',
        },
      ],
    },
    {
      id: 'method-codeagentswarm',
      title: 'Method 3: CodeAgentSwarm (visual, full-featured)',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built for exactly this: running and supervising a swarm of AI CLI agents in one place. It runs on macOS, Linux and Windows, gives you multiple terminals in a single workspace, and lets you choose the agent per terminal. For an opencode swarm you just pick "opencode" in the SELECT AI AGENT picker in each terminal you want running opencode.',
        },
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker where you choose the agent per terminal, including opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you choose the agent per terminal. Set each one to opencode to build an opencode swarm.',
        },
        {
          type: 'paragraph',
          text: 'Here is what that gives you when the agents are all opencode (or a mix):',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiple opencode agents in parallel',
          id: 'six-terminals',
        },
        {
          type: 'paragraph',
          text: 'Set every terminal to "opencode" for a pure opencode swarm, or mix in Claude Code and Codex CLI where they fit better. Each terminal is a fully independent opencode process with its own conversation and project context, and each one can point at whichever provider you connected. CodeAgentSwarm runs on top of your existing accounts, so it is not a model provider, it just orchestrates the agents you already pay for.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Real-time visibility with dynamic titles',
          id: 'dynamic-titles',
        },
        {
          type: 'paragraph',
          text: 'Every terminal updates its own title to reflect what its opencode agent is doing right now. Instead of several tabs all labelled "opencode", you read titles like "Migrating User Schema", "Writing API Tests", "Refactoring Auth". You can tell which agent is on which task without clicking into any of them.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'desktop-notifications',
        },
        {
          type: 'paragraph',
          text: 'This is the single biggest fix for a swarm. When an opencode agent finishes its task or stops to ask for a permission, you get a native desktop notification. You stop babysitting panes and let the agents call you when they actually need you, which is the whole point of running them in parallel.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full conversation history, searchable',
          id: 'conversation-history',
        },
        {
          type: 'paragraph',
          text: 'opencode stores its sessions locally, and CodeAgentSwarm reads them, so every opencode conversation is saved and searchable, including across different agents. You can go back and find what an opencode agent decided yesterday, resume it, or trace exactly which agent made a given change. The <a href="/en/guides/opencode-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode conversation history guide</a> covers how that works. With a swarm running, that audit trail is what keeps the whole thing legible.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Built-in task board',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits next to your terminals, and the agents update it themselves over MCP. You create tasks, hand them to terminals, and watch cards move as each opencode agent picks up, works, and finishes. When several agents are chipping away at related features, the board keeps the plan visible instead of living in your head.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Full auto driven by opencode config',
          id: 'full-auto-config',
        },
        {
          type: 'paragraph',
          text: 'opencode has no single full-auto or danger-bypass flag. How autonomous an agent runs is decided by its permission config in <code>opencode.json</code>, which you can set globally at <code>~/.config/opencode/opencode.json</code>, per project, or per agent. So the way to run a swarm hands-off is to loosen the permissions in that config, not to flip a switch. Because of that, CodeAgentSwarm does not add a Turbo Mode toggle for opencode the way it does for Claude Code and Codex. Instead it keeps a permissive opencode config supervised: you get the live diffs and desktop notifications below so a hands-off config never runs blind. The <a href="/en/guides/opencode-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode YOLO mode guide</a> has the full picture on autonomy and permissions.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Per-terminal live file diffs',
          id: 'file-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each opencode agent is making in real time, per terminal and at the project level. When two agents edit the same file, you see it as it happens instead of discovering it in a messy diff later. Git still handles the merge, but the visibility means overlapping edits never surprise you. This matters more with opencode precisely because there is no full-auto switch to lean on: live diffs are how you keep a permissive config accountable.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'New to running several terminals at once? The <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">multi-terminal guide</a> walks through the layout and workflow, and applies the same way whether the agent is opencode or Claude Code.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how the three ways to run an opencode swarm compare on the things that actually bite once you scale past two agents:',
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
            '<strong>CodeAgentSwarm:</strong> Free tier available, Pro for advanced features. Your opencode usage is billed by whichever providers you connect.',
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
            '<strong>Terminal tabs:</strong> Zero, just open tabs and run opencode',
            '<strong>tmux/screen:</strong> 10-30 minutes to learn the basics, longer to script a reusable layout',
            '<strong>CodeAgentSwarm:</strong> A couple of minutes to download, open, and pick opencode per terminal',
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
          text: 'Conversation history',
          id: 'compare-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Terminal tabs:</strong> Gone when you close the tab',
            '<strong>tmux/screen:</strong> Kept while the session lives, no search',
            '<strong>CodeAgentSwarm:</strong> Reads opencode\'s locally stored sessions and makes them searchable across every agent',
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
            '<strong>tmux/screen:</strong> Visible in panes, but no guardrails on top',
            '<strong>CodeAgentSwarm:</strong> opencode\'s config decides autonomy, CodeAgentSwarm adds live diffs, notifications and per-terminal visibility so permissive configs stay supervised',
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
          text: 'If you only ever need two opencode agents at once, terminal tabs are perfectly fine. If you already run your day inside tmux, dropping a few opencode sessions into your existing panes is natural. But once you regularly run three or more opencode agents, especially across different model providers, and want to actually see what each one is doing, CodeAgentSwarm removes the coordination overhead that the other two leave on your plate.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is an opencode agent swarm?',
      answer: 'An opencode agent swarm is simply several opencode agents running in parallel instead of one at a time. Each agent is its own process with its own conversation and context, so they can work on different tasks in the same repository at the same time. It is not a special opencode feature, just a way of working that you can set up with terminal tabs, tmux, or a tool like CodeAgentSwarm.',
    },
    {
      question: 'Can you run multiple opencode sessions at once?',
      answer: 'Yes. Each time you run the opencode command you get an independent session, so you can open several terminals and run opencode in each one. They do not share context or step on each other unless they edit the same files. CodeAgentSwarm supports multiple terminals so you can supervise the whole swarm in one window.',
    },
    {
      question: 'Can I mix opencode and Claude Code in one swarm?',
      answer: 'Yes. Because every agent is just a separate process, you can run opencode in some terminals and Claude Code or Codex CLI in others, all on the same project. In CodeAgentSwarm you choose the agent per terminal with the SELECT AI AGENT picker, so a mixed swarm is the default rather than a workaround.',
    },
    {
      question: 'Can each opencode agent use a different model provider?',
      answer: 'Yes, and this is one of opencode\'s strengths. opencode is provider-agnostic, so it works with Anthropic, OpenAI, Google, and local models. In a swarm you can put each terminal on a different provider: one agent on Anthropic, another on OpenAI, another on a local model, all in the same repository. Each agent runs on whichever provider you connected to it, so you can match the model to the task rather than being locked to a single vendor.',
    },
    {
      question: 'Does running multiple opencode agents cost more?',
      answer: 'There is no surcharge for running agents in parallel. Each opencode agent uses whichever provider account you connected, and each provider bills you for the work its agent actually does, the same as if you ran them one after another. Running them at the same time finishes sooner, it does not change the per-agent cost.',
    },
    {
      question: 'OpenCode agent swarm vs tmux?',
      answer: 'tmux can absolutely host an opencode swarm in split panes, and it is free. What it lacks is anything built for AI agents: no desktop notification when an agent finishes or asks for a permission, no searchable history across agents, no dynamic titles, no task board, and no live diffs to keep a permissive opencode config accountable. CodeAgentSwarm adds all of that on top, which matters most exactly when you are running several opencode agents at once, possibly on different providers.',
    },
  ],
}

export default guide
