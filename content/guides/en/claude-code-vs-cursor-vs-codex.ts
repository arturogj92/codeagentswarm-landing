import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-vs-cursor-vs-codex',
    locale: 'en',
    title: 'Claude Code vs Cursor vs Codex CLI: AI Coding Tools Compared',
    metaTitle: 'Claude Code vs Cursor vs Codex CLI: Which One to Use in 2026?',
    metaDescription: 'One is an IDE, two are terminal agents, and the price gap is real. What each tool does best, where each one falls short, and how to pick the right one in 2026.',
    intro: `The AI coding tools landscape has exploded. Claude Code, Cursor, and Codex CLI are three of the most popular options, but they are fundamentally different tools designed for different workflows.

This guide compares what each one does, where it fits and what it costs so you can choose one workflow or combine them deliberately.`,
    ctaText: 'Use Claude Code, Codex CLI, or Antigravity CLI? Run them all in parallel with CodeAgentSwarm. Multiple terminals, one workspace.',
    ctaAgent: 'multi',
    highlightedWords: ['Claude Code', 'Cursor', 'Codex CLI'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-08-23',
    alternateSlug: 'claude-code-vs-cursor-vs-codex',
  },
  sections: [
    {
      id: 'overview',
      title: 'Three different tools for three different workflows',
      content: [
        {
          type: 'paragraph',
          text: 'The first thing to understand is that Claude Code, Cursor, and Codex CLI are not direct competitors in the traditional sense. They approach AI-assisted coding from different angles and serve different needs.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a></strong> is a CLI agent. It runs in your terminal, reads your codebase, makes changes across files, runs commands, and handles complex multi-step tasks autonomously. It is built by Anthropic and powered by Claude Sonnet and Opus models.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://cursor.com" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor</a></strong> is an IDE. Specifically, it is a fork of VS Code with AI deeply integrated into the editing experience. It provides inline completions, a chat sidebar, an agent mode for larger tasks, and background agents. It supports multiple AI models.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a></strong> is OpenAI\'s terminal coding agent. Similar in concept to Claude Code, it runs in your terminal, reads your repository, and makes changes. It is powered by OpenAI\'s models and is included with ChatGPT subscriptions.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'One important distinction: this page compares the Cursor IDE with two terminal agents. Cursor also offers a separate CLI called <code>cursor-agent</code>. Read the <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI setup guide</a> or see <a href="/en/guides/cursor-cli-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI vs Claude Code</a>.',
        },
      ],
    },
    {
      id: 'claude-code',
      title: 'Claude Code',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'What it is',
          id: 'claude-code-what',
        },
        {
          type: 'paragraph',
          text: 'Claude Code is Anthropic\'s agentic coding tool. It runs entirely in your terminal as a CLI application. You give it instructions in natural language, and it reads your codebase, plans an approach, edits files, runs tests, and iterates until the task is done.',
        },
        {
          type: 'paragraph',
          text: 'It is powered by Claude Sonnet (for speed) and Claude Opus (for complex reasoning). The key word here is "agentic": Claude Code does not just suggest code, it takes action. It creates files, modifies existing ones, runs shell commands, and chains multiple steps together to complete a task.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Key strengths',
          id: 'claude-code-strengths',
        },
        {
          type: 'list',
          items: [
            '<strong>Codebase inspection:</strong> Claude Code can inspect project files, follow their relationships and keep context during a session',
            '<strong>Agentic multi-step workflows:</strong> It plans, executes, and iterates. Ask it to refactor a module and it will read the code, plan the changes, edit multiple files, run tests, and fix failures',
            '<strong>MCP integrations:</strong> Full support for Model Context Protocol servers, letting you connect Claude Code to databases, APIs, browsers, and other tools',
            '<strong>Terminal-native:</strong> Works in any terminal. No editor lock-in. Use it alongside VS Code, Neovim, JetBrains, or whatever you prefer',
            '<strong>Conversation continuity:</strong> Maintains context within sessions and can resume previous conversations',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pricing',
          id: 'claude-code-pricing',
        },
        {
          type: 'paragraph',
          text: 'Claude Code requires a Claude Pro subscription ($20/month, or $17/month billed annually) or Claude Max ($100/month for 5x Pro usage, $200/month for 20x). The Pro tier gives you a solid amount of usage for everyday development. Max is for heavy, all-day coding sessions where you need higher rate limits.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Best for',
          id: 'claude-code-best-for',
        },
        {
          type: 'paragraph',
          text: 'Complex refactors, multi-file changes, agentic workflows, developers who prefer working in the terminal, and anyone who wants an AI that can take autonomous action across their codebase.',
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
          text: 'Cursor is a full IDE built on top of VS Code. It looks and feels like VS Code (extensions, themes, keybindings all carry over), but with AI capabilities baked into every part of the editing experience.',
        },
        {
          type: 'paragraph',
          text: 'This comparison uses <strong>Cursor</strong> to mean the IDE: the editor with inline suggestions, Chat and Agent mode. Cursor also ships a separate <code>cursor-agent</code> CLI. Compare that interface directly in <a href="/en/guides/cursor-cli-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI vs Claude Code</a>.',
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
            '<strong>Familiar IDE experience:</strong> Cursor is based on VS Code, and many VS Code extensions and settings carry over',
            '<strong>Inline Tab completions:</strong> Cursor\'s autocomplete predicts your next edit as you type. Accept suggestions with Tab, which feels very natural for line-by-line coding',
            '<strong>Multi-model support:</strong> use current Claude, GPT, Gemini and Grok models, switching between them by task',
            '<strong>Agent mode:</strong> For larger tasks, Cursor\'s agent mode can make multi-file changes, run commands, and iterate, similar to what CLI agents do',
            '<strong>Background agents:</strong> Run tasks in the background while you keep coding in the foreground',
            '<strong>Team features:</strong> Admin controls, usage analytics, and shared configurations for teams',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pricing',
          id: 'cursor-pricing',
        },
        {
          type: 'paragraph',
          text: 'Cursor has a free Hobby tier for evaluation. Paid individual plans as of August 23, 2026 are Pro at $20/month, Pro Plus at $60/month and Ultra at $200/month. Teams Standard is $40 per user/month and Teams Premium is $120 per user/month. Included usage depends on model token costs, and optional on-demand usage continues after the included amount with a spend limit you control.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Best for',
          id: 'cursor-best-for',
        },
        {
          type: 'paragraph',
          text: 'Developers who want AI assistance directly inside their editor, people who love inline code suggestions while typing, teams needing admin controls, and anyone who prefers the IDE approach over terminal agents.',
        },
      ],
    },
    {
      id: 'codex-cli',
      title: 'Codex CLI',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'What it is',
          id: 'codex-cli-what',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI is OpenAI\'s open-source terminal coding agent. Conceptually, it is similar to Claude Code: you run it in your terminal, point it at a repository, and it reads files, makes changes and runs commands. Current Codex models include GPT-5.6 Sol, Terra and Luna.',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI has a strong focus on being lightweight and sandboxed. By default, it runs in a sandboxed environment with network disabled, which means it can safely experiment with code changes without affecting your system.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Key strengths',
          id: 'codex-cli-strengths',
        },
        {
          type: 'list',
          items: [
            '<strong>Included with ChatGPT subscription:</strong> ChatGPT Plus and Pro include Codex CLI within the plan\'s usage limits',
            '<strong>Installable through npm:</strong> Install it, point it at your repository and start a terminal session',
            '<strong>Open source:</strong> The public code allows inspection and community contributions',
            '<strong>MCP support:</strong> Like Claude Code, Codex CLI supports Model Context Protocol for external tool integrations',
            '<strong>Sandboxed execution:</strong> Runs in a sandbox by default, making it safer for experimental changes',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pricing',
          id: 'codex-cli-pricing',
        },
        {
          type: 'paragraph',
          text: 'Codex CLI is included with ChatGPT Free, Go ($8/month), Plus ($20/month) and Pro, which is offered from $100/month for 5x usage or $200/month for 20x. Included usage is measured in credits shared across OpenAI\'s agentic features, and credits can extend it. You can also use an OpenAI API key for pay-per-use.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Best for',
          id: 'codex-cli-best-for',
        },
        {
          type: 'paragraph',
          text: 'Developers already in the OpenAI ecosystem, quick terminal coding tasks, anyone who wants a lightweight CLI agent without additional subscriptions beyond ChatGPT, and developers who value open-source tools. For a focused, head-to-head look at just these two, see <a href="/en/guides/codex-cli-vs-cursor" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI vs Cursor</a>.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Side-by-side comparison',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how the three tools compare across the dimensions that matter most for everyday development:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tool type and approach',
          id: 'comparison-type',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> CLI agent (runs in your terminal)',
            '<strong>Cursor:</strong> Full IDE (VS Code fork with built-in AI)',
            '<strong>Codex CLI:</strong> CLI agent (runs in your terminal)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pricing',
          id: 'comparison-pricing',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Claude Pro $20/month, Max $100/month (5x) or $200/month (20x)',
            '<strong>Cursor:</strong> Free Hobby tier, Pro $20/month, Pro Plus $60/month, Ultra $200/month, Teams Standard $40/user and Premium $120/user',
            '<strong>Codex CLI:</strong> limited on ChatGPT Free, Go $8/month, Plus $20/month; Pro from $100/month (5x) or $200/month (20x)',
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
            '<strong>Claude Code:</strong> Claude models only (Sonnet, Opus)',
            '<strong>Cursor:</strong> multiple current Claude, GPT, Gemini and Grok models',
            '<strong>Codex CLI:</strong> OpenAI models only, including GPT-5.6 Sol, Terra and Luna',
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
            '<strong>Claude Code:</strong> Full MCP integration',
            '<strong>Cursor:</strong> Limited MCP support',
            '<strong>Codex CLI:</strong> Full MCP integration',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Agentic coding',
          id: 'comparison-agentic',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Strong. Built from the ground up as an agentic tool',
            '<strong>Cursor:</strong> Good. Agent mode and background agents available, but the core experience is IDE-first',
            '<strong>Codex CLI:</strong> Good. Solid agentic capabilities with sandboxed execution',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Inline code completions',
          id: 'comparison-inline',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> No (it is a terminal agent, not an editor)',
            '<strong>Cursor:</strong> Yes. Tab completions are one of its strongest features',
            '<strong>Codex CLI:</strong> No (it is a terminal agent, not an editor)',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Terminal workflow',
          id: 'comparison-terminal',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Native terminal tool',
            '<strong>Cursor:</strong> Has an embedded terminal, but the main experience is the editor',
            '<strong>Codex CLI:</strong> Native terminal tool',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Conversation history',
          id: 'comparison-history',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Basic native history (resume last session). Rich searchable history with CodeAgentSwarm',
            '<strong>Cursor:</strong> Chat history within sessions',
            '<strong>Codex CLI:</strong> Basic conversation history',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multiple parallel sessions',
          id: 'comparison-sessions',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> Yes, run multiple instances. Multiple organized terminals with CodeAgentSwarm',
            '<strong>Cursor:</strong> Limited. Background agents help, but you are mostly working in one editor',
            '<strong>Codex CLI:</strong> Yes, run multiple instances in separate terminals',
          ],
        },
      ],
    },
    {
      id: 'when-to-use',
      title: 'When to use each tool',
      content: [
        {
          type: 'paragraph',
          text: 'There is no single "best" tool here. Each one fits different situations and preferences.',
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
            'You love inline Tab completions for quick code suggestions',
            'You prefer a familiar VS Code interface and want to keep your existing extensions',
            'You work in a team that needs admin controls and usage management',
            'You want to switch between current Claude, GPT, Gemini and Grok models depending on the task',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use Claude Code if...',
          id: 'when-claude-code',
        },
        {
          type: 'list',
          items: [
            'You prefer working in the terminal and want an AI that operates alongside your editor, not inside it',
            'You need deep agentic capabilities for complex, multi-step tasks',
            'You work on large refactors that touch many files and require planning and iteration',
            'You rely on MCP integrations to connect your AI to databases, browsers, or external services',
            'You want to keep using your preferred editor (Neovim, JetBrains, VS Code) without switching to Cursor',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use Codex CLI if...',
          id: 'when-codex',
        },
        {
          type: 'list',
          items: [
            'You are already paying for ChatGPT and want a terminal agent at no extra cost',
            'You prefer OpenAI\'s models and are comfortable in that ecosystem',
            'You want a lightweight, open-source CLI agent',
            'You value sandboxed execution for safer experimentation',
            'You want a quick terminal agent for straightforward coding tasks',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use multiple tools together',
          id: 'when-multiple',
        },
        {
          type: 'paragraph',
          text: 'Here is what many experienced developers actually do: they use more than one tool. A common setup is Cursor for inline edits and quick code suggestions while coding, plus Claude Code or Codex CLI for bigger tasks that require multi-file changes and autonomous execution.',
        },
        {
          type: 'paragraph',
          text: 'These tools are not mutually exclusive. Cursor can handle inline assistance while Claude Code or Codex CLI runs larger multi-file tasks in a separate terminal.',
        },
      ],
    },
    {
      id: 'all-together-codeagentswarm',
      title: 'Running all of them together with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'If you use CLI agents like Claude Code, Codex CLI, or Antigravity CLI, there is a practical problem: managing multiple terminal sessions gets messy fast. You lose track of which terminal is doing what, you miss when an agent finishes, and switching between sessions is a constant context switch.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> solves this by giving you a unified workspace where you can run multiple AI agent terminals simultaneously, organized in a clean visual layout.',
        },
        {
          type: 'list',
          items: [
            '<strong>Mix different CLI tools in the same workspace:</strong> Run Claude Code in terminal 1, Codex CLI in terminal 2, Antigravity CLI in terminal 3, and plain bash in terminal 4. All visible at once',
            '<strong>Real-time notifications:</strong> Get notified when an agent finishes or needs input, so completions are easier to notice',
            '<strong>Conversation history across all sessions:</strong> Search and resume any past conversation, organized by project and date',
            '<strong>See what each agent is changing:</strong> Track file changes in real time for each terminal independently',
            '<strong>Task tracking:</strong> Know what each terminal is working on at a glance',
          ],
        },
        {
          type: 'paragraph',
          text: 'The idea is simple: you should not have to choose just one CLI tool. Different models have different strengths. Sometimes Claude handles a task better, sometimes a current GPT model does. With CodeAgentSwarm, you run them all and let each one do what it does best.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'For a step-by-step guide on setting up multiple terminals, see <a href="/en/guides/how-to-use-multiple-claude-code-terminals" class="text-neon-cyan hover:text-neon-purple transition-colors">How to Use Multiple Claude Code Terminals in Parallel</a>.',
        },
        {
          type: 'paragraph',
          text: 'Whether you are a Claude Code power user, a Codex CLI enthusiast, or someone who likes to mix tools depending on the task, CodeAgentSwarm gives you a workspace that keeps everything organized and visible. No more losing track of what your agents are doing.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Claude Code better than Cursor?',
      answer: 'They are different tools. Claude Code is a terminal agent designed for agentic, multi-step coding tasks. Cursor is an IDE with built-in AI for inline assistance and code suggestions. Many developers use both: Cursor for everyday editing and Claude Code for complex multi-file refactors.',
    },
    {
      question: 'Is Codex CLI free?',
      answer: 'Yes, with limited usage on ChatGPT Free. It is also included with ChatGPT Go, Plus and Pro, and credits can extend the included amount.',
    },
    {
      question: 'Can I use Claude Code and Cursor together?',
      answer: 'Yes, and many developers do exactly that. You can use Cursor as your primary editor for inline suggestions and quick edits, while running Claude Code in a separate terminal for complex multi-file tasks and agentic workflows.',
    },
    {
      question: 'Which AI coding tool is best for beginners?',
      answer: 'Cursor is generally the most beginner-friendly option because it looks and works like VS Code. You get inline suggestions as you type and a chat panel for questions. There is less terminal knowledge required compared to Claude Code or Codex CLI.',
    },
    {
      question: 'Can I run Claude Code and Codex CLI at the same time?',
      answer: 'Yes. You can run them in separate terminal windows. CodeAgentSwarm makes this even easier by letting you run Claude Code, Codex CLI, and Antigravity CLI side by side in multiple organized terminals with notifications, history, and file change tracking for each one.',
    },
    {
      question: 'Does Cursor support MCP?',
      answer: 'Cursor has some MCP support, but it is more limited compared to Claude Code\'s full MCP integration. Claude Code and Codex CLI both offer deeper MCP capabilities for connecting to external tools like databases, browsers, and APIs.',
    },
    {
      question: 'What is the cheapest AI coding setup?',
      answer: 'Cursor Hobby and limited Codex on ChatGPT Free both start at $0. Claude Code starts with Pro at $20/month or metered API use. Test the free options first, then pay for the workflow whose limits you actually reach.',
    },
  ],
}

export default guide
