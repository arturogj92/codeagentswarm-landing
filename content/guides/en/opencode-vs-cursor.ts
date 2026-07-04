import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-vs-cursor',
    locale: 'en',
    title: 'OpenCode vs Cursor: Open Source Terminal Agent vs AI IDE',
    metaTitle: 'OpenCode vs Cursor: Which AI Coding Tool Fits You? (2026)',
    metaDescription: 'OpenCode vs Cursor compared honestly. One is an open-source terminal agent that works with any model provider, the other an AI-first IDE. See how they differ. 2026.',
    intro: `OpenCode vs Cursor is not really a fight between two versions of the same thing. They are different shapes of tool. opencode is an open-source coding agent that lives in your terminal and works with any model provider, while Cursor is an AI-first editor you actually write code inside.

That difference changes everything: how you give instructions, which models you can reach, how much runs automatically, and where each one fits in your day. Picking the "winner" depends entirely on how you like to work, and plenty of developers end up using both.

This guide compares them on capability and workflow rather than chasing benchmark numbers, then shows how CodeAgentSwarm lets you run opencode alongside Claude Code and Codex CLI in parallel.`,
    ctaText: 'Like opencode but want more than one terminal? Run several opencode agents in parallel with CodeAgentSwarm, alongside Claude Code and Codex CLI, all in one workspace.',
    highlightedWords: ['OpenCode', 'Cursor'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'opencode-vs-cursor',
  },
  sections: [
    {
      id: 'overview',
      title: 'Two different shapes of tool',
      content: [
        {
          type: 'paragraph',
          text: 'Before comparing features, it helps to be honest about what each tool actually is, because opencode and Cursor are not the same kind of product. They solve overlapping problems from opposite directions.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a></strong> is <a href="https://github.com/sst/opencode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">SST\'s open-source terminal coding agent</a>. You run it with the <code>opencode</code> command, point it at a repository, and describe what you want in natural language. It reads your files, plans an approach, edits across the codebase, runs commands, and iterates. It lives in your shell, so it is scriptable and works alongside whatever editor you already use. And unlike most agents, it is not tied to one vendor\'s models: you connect the provider you prefer.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://cursor.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor</a></strong> is an AI-first IDE, a fork of VS Code with AI woven into the editing experience. You write code inside it. As you type, it suggests inline Tab completions, a chat sidebar answers questions about your code, and an agent mode can take on larger multi-file tasks. It supports several AI models, including OpenAI and Claude.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'The core distinction: opencode is a terminal agent (it works alongside your editor and runs in your shell), while Cursor is an editor you code inside. This is the same split covered in our <a href="/en/guides/claude-code-vs-cursor-vs-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code vs Cursor vs Codex CLI comparison</a>, just narrowed to these two.',
        },
      ],
    },
    {
      id: 'opencode',
      title: 'opencode',
      content: [
        {
          type: 'image',
          alt: 'opencode running in a terminal inside CodeAgentSwarm, with several sessions available in parallel',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'opencode lives in your shell, so you can run several sessions in parallel, each on its own task.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'What it is',
          id: 'opencode-what',
        },
        {
          type: 'paragraph',
          text: 'opencode is an open-source agent built by the SST team. It runs as a TUI in your terminal, and you connect the model provider you prefer once (for example with <code>opencode auth login</code>, though you should check the official opencode docs for the exact commands). From then on, each session keeps its own conversation and working directory.',
        },
        {
          type: 'paragraph',
          text: 'It reads project instructions from an AGENTS.md file, a cross-tool standard so your rules travel with the project rather than being locked to one agent. Global settings live in <code>~/.config/opencode/opencode.json</code>, with project-level and per-agent config layered on top.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Key strengths',
          id: 'opencode-strengths',
        },
        {
          type: 'list',
          items: [
            '<strong>Lives in your terminal</strong> - Works alongside any editor (VS Code, Neovim, JetBrains, Cursor itself) with no editor lock-in',
            '<strong>Open source, no black box</strong> - The code is public, so you get transparency, community contributions, and no proprietary runtime to trust',
            '<strong>Provider-agnostic</strong> - Connect Anthropic, OpenAI, Google, or local models, the strength neither Codex nor Cursor matches, since Codex is OpenAI-only and Cursor is a proprietary app',
            '<strong>Agentic by design</strong> - It plans, edits multiple files, runs commands, and iterates on failures rather than handing you snippets to paste',
            '<strong>Config-driven permissions</strong> - Decide what runs automatically versus what asks first, defined in opencode.json globally, per project, or per agent',
            '<strong>MCP support</strong> - Connect it to databases, browsers, and other tools through the Model Context Protocol',
            '<strong>AGENTS.md standard</strong> - Your instructions travel across tools instead of being tied to one agent\'s config format',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where it falls short',
          id: 'opencode-limits',
        },
        {
          type: 'list',
          items: [
            'No inline editor experience. There is no Tab completion as you type, because it is not an editor',
            'Comfort in the terminal is assumed, which can be a hurdle if you prefer a GUI',
            'A single session is one agent in one terminal. Running several at once is easy to start but quickly hard to track',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Best for',
          id: 'opencode-best-for',
        },
        {
          type: 'paragraph',
          text: 'Developers comfortable in the terminal who want an autonomous agent for multi-file changes, anyone who wants to pick or swap model providers (or run local models), people who prefer open-source tooling, and those who want to keep their current editor. If you want to scale this up, see <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">running an opencode agent swarm</a>.',
        },
      ],
    },
    {
      id: 'cursor',
      title: 'Cursor',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'What it is',
          id: 'cursor-what',
        },
        {
          type: 'paragraph',
          text: 'Cursor is a full IDE built on top of VS Code. It looks and feels like VS Code, so your extensions, themes, and keybindings mostly carry over, but AI is baked into every part of editing. You write code inside it, and the AI helps as you go.',
        },
        {
          type: 'paragraph',
          text: 'Unlike opencode, Cursor is not a terminal tool you run next to an editor. It is the editor. The AI surfaces as inline suggestions, a chat panel, and an agent mode for larger tasks, all inside one graphical app.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Key strengths',
          id: 'cursor-strengths',
        },
        {
          type: 'list',
          items: [
            '<strong>Familiar IDE experience</strong> - If you already use VS Code, Cursor feels like home and your existing setup mostly just works',
            '<strong>Inline Tab completions</strong> - Cursor predicts your next edit as you type and lets you accept it with Tab, which is great for line-by-line coding',
            '<strong>Multi-model support</strong> - Switch between OpenAI, Claude, Gemini, and other models inside the app depending on the task',
            '<strong>Agent mode</strong> - For bigger jobs, Cursor can make multi-file changes and run commands, closer to what a CLI agent does',
            '<strong>Visual code review</strong> - You see diffs, accept or reject changes inline, and stay in one window the whole time',
            '<strong>Team features</strong> - Admin controls, usage analytics, and shared configuration for teams',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where it falls short',
          id: 'cursor-limits',
        },
        {
          type: 'list',
          items: [
            'It is a whole editor, so adopting it means switching IDEs rather than adding a tool to the one you already have',
            'Less natural to script or automate from the shell than a CLI agent',
            'If you prefer Neovim or JetBrains, you give up your editor to get the full experience',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Best for',
          id: 'cursor-best-for',
        },
        {
          type: 'paragraph',
          text: 'Developers who want AI assistance directly inside their editor, people who love inline completions while typing, anyone happy to make Cursor their primary IDE, and teams that need admin controls and a graphical workflow.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Side-by-side comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how opencode and Cursor compare across the dimensions that matter most day to day. The honest summary: they are strong at different things, so the right pick depends on how you work.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tool type',
          id: 'comparison-type',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Terminal coding agent (runs in your shell, alongside any editor)',
            '<strong>Cursor</strong> - AI-first IDE (a VS Code fork you write code inside)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where it runs',
          id: 'comparison-runs',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Any terminal on macOS, Linux, or Windows, on top of your current editor and workflow',
            '<strong>Cursor</strong> - Its own desktop application, which becomes your editor',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Inline completions',
          id: 'comparison-inline',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - No. It is an agent, not an editor, so there is no Tab completion',
            '<strong>Cursor</strong> - Yes. Tab completion as you type is one of its strongest features',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Agentic, autonomous tasks',
          id: 'comparison-agentic',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Strong. Built as an agent, with config-driven permissions for how much runs unattended',
            '<strong>Cursor</strong> - Good. Agent mode handles multi-file tasks, but the core experience is editor-first',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Automation and scripting',
          id: 'comparison-scripting',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Strong. As a CLI it fits naturally into scripts and pipelines',
            '<strong>Cursor</strong> - Limited. It is a GUI app, designed for interactive use rather than scripting',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'AI model support',
          id: 'comparison-models',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Any major provider (Anthropic, OpenAI, Google) plus local models, you choose',
            '<strong>Cursor</strong> - Multiple models inside one proprietary app (OpenAI, Claude, Gemini, and more)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Open source',
          id: 'comparison-open-source',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Fully open source, public code you can read, fork, and contribute to',
            '<strong>Cursor</strong> - Proprietary. You use the app as shipped, without access to its source',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'MCP support',
          id: 'comparison-mcp',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - Full MCP integration',
            '<strong>Cursor</strong> - MCP support, though more limited than a dedicated CLI agent',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Editor lock-in',
          id: 'comparison-lockin',
        },
        {
          type: 'list',
          items: [
            '<strong>opencode</strong> - None. Keep Neovim, JetBrains, VS Code, or anything else',
            '<strong>Cursor</strong> - You adopt Cursor as your editor to get the full experience',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pricing',
          id: 'comparison-pricing',
        },
        {
          type: 'paragraph',
          text: 'opencode itself is free and open source: you pay whichever model provider you connect, through an API key or a subscription you already have. Cursor offers a free tier plus paid plans. Rather than quote figures that go stale, check each tool\'s official site for current pricing before you decide.',
        },
      ],
    },
    {
      id: 'when-to-use',
      title: 'When to use each one',
      content: [
        {
          type: 'paragraph',
          text: 'There is no single winner here. The better question is which shape fits the work in front of you.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use opencode if...',
          id: 'when-opencode',
        },
        {
          type: 'list',
          items: [
            'You prefer working in the terminal and want the AI alongside your editor, not as your editor',
            'Open source matters to you and you want to read or fork the tool you rely on',
            'You want to choose your model provider, or run local models, instead of being locked to one vendor',
            'You want to keep your current editor (Neovim, JetBrains, VS Code, or even Cursor itself)',
            'You want config-driven autonomy, deciding in opencode.json what runs on its own and what asks first',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use Cursor if...',
          id: 'when-cursor',
        },
        {
          type: 'list',
          items: [
            'You want AI assistance directly inside your editor as you type',
            'You love inline Tab completions for fast, line-by-line coding',
            'You are happy to make Cursor your primary IDE',
            'You want to switch between models (OpenAI, Claude, Gemini) inside one app',
            'You work in a team that needs admin controls and a graphical workflow',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use both together',
          id: 'when-both',
        },
        {
          type: 'paragraph',
          text: 'These tools are not mutually exclusive. A common setup is Cursor for inline edits and quick suggestions while you write, plus opencode in a terminal for bigger tasks that need autonomous, multi-file execution. Using one does not stop you from running the other.',
        },
        {
          type: 'paragraph',
          text: 'In practice, the editor and the terminal agent cover different moments of the same workflow. You stay in Cursor for hands-on editing and hand off the heavier, repetitive, or long-running work to opencode in the background. Cursor even has an integrated terminal you could run opencode inside.',
        },
      ],
    },
    {
      id: 'skip-the-choice-codeagentswarm',
      title: 'Skip the choice at the swarm level with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'There is a third angle worth knowing about. If your real question is "how do I get the most out of terminal coding agents", you do not have to pick a single CLI either. Once opencode is doing serious work, the next problem is running more than one of it without losing track.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> is a desktop app for running and supervising a swarm of AI CLI agents in one workspace. You get multiple terminals at once, and you choose the agent per terminal. Set them all to opencode for a pure opencode swarm, or mix in Claude Code and Codex CLI where they fit better.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm SELECT AI AGENT picker where you choose the agent per terminal, including opencode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you pick the agent per terminal. Set each one to opencode for an opencode swarm.',
        },
        {
          type: 'list',
          items: [
            '<strong>Multiple agents in parallel</strong> - Run several opencode sessions side by side, each an independent process with its own task and context',
            '<strong>Desktop notifications</strong> - Get pinged when an agent finishes or stops for an approval, so you stop babysitting terminals',
            '<strong>Dynamic terminal titles</strong> - Each terminal shows what its agent is doing right now, so you read "Migrating User Schema" instead of several tabs all labelled "opencode"',
            '<strong>Searchable conversation history</strong> - opencode stores its sessions locally, and CodeAgentSwarm reads them so every conversation across every terminal is saved, searchable, and resumable in-app',
            '<strong>Per-terminal live file diffs</strong> - Watch what each agent is changing in real time, so overlapping edits never surprise you',
            '<strong>Supervision for permissive configs</strong> - opencode\'s autonomy comes from its own opencode.json permissions, and CodeAgentSwarm keeps it visible with live diffs and notifications',
          ],
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is not a model provider. It runs on top of the accounts you already pay for and just orchestrates the agents. So OpenCode vs Cursor stops being an either-or: keep Cursor as your editor if you like it, and let CodeAgentSwarm run a fleet of opencode agents in the background.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Want the full picture across every CLI agent? Start with the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview, then dive into <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">running an opencode agent swarm</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is OpenCode better than Cursor?',
      answer: 'Neither is strictly better, because they are different shapes of tool. opencode is an open-source terminal coding agent that works alongside your editor, runs autonomous multi-step tasks, and connects to any model provider. Cursor is an AI-first IDE you write code inside, with inline completions as you type. The right pick depends on whether you prefer the terminal or a graphical editor, and many developers use both.',
    },
    {
      question: 'What is the difference between OpenCode and Cursor?',
      answer: 'opencode is SST\'s open-source terminal agent: you run it in your shell, point it at a repo, and it reads files, edits across the codebase, and runs commands, using whichever model provider you connect. Cursor is an editor, a VS Code fork with AI built in, where you write code and get inline Tab completions, a chat panel, and an agent mode. One lives in the terminal alongside your editor, the other is the editor.',
    },
    {
      question: 'Can I use OpenCode and Cursor together?',
      answer: 'Yes, and it is a common setup. You can use Cursor as your editor for hands-on coding and inline suggestions, while running opencode in a terminal for bigger autonomous tasks. They do not conflict, and Cursor even has an integrated terminal you could run opencode inside.',
    },
    {
      question: 'Does OpenCode work with any editor?',
      answer: 'Yes. Because opencode lives in your terminal, it works alongside any editor, including VS Code, Neovim, JetBrains, and Cursor itself. There is no editor lock-in, which is one of the main differences from adopting Cursor as your IDE.',
    },
    {
      question: 'Which models does OpenCode support?',
      answer: 'opencode is provider-agnostic. You connect the model provider you prefer, including Anthropic, OpenAI, and Google, and it can also run local models. That is a key difference from Codex, which is OpenAI-only, and from Cursor, which offers multiple models but inside one proprietary app. Check the official opencode docs for how to connect a provider.',
    },
    {
      question: 'Can I run multiple OpenCode agents at once?',
      answer: 'Yes. Each opencode session is its own process, so you can run several in separate terminals at the same time, each on a different task. CodeAgentSwarm makes this practical by giving you multiple organized terminals with desktop notifications, searchable resumable history, and live file diffs for each agent.',
    },
    {
      question: 'How much do OpenCode and Cursor cost?',
      answer: 'opencode itself is free and open source: you pay whichever model provider you connect, through an API key or a subscription. Cursor has a free tier plus paid plans. Pricing changes over time, so check each tool\'s official site for current figures rather than relying on numbers that may be out of date.',
    },
  ],
}

export default guide
