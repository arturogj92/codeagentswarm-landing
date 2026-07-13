import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-gui',
    locale: 'en',
    title: 'Codex GUI: A Visual Desktop App for OpenAI Codex CLI',
    metaTitle: 'Codex GUI: The Desktop App for OpenAI Codex CLI (2026)',
    metaDescription: 'A Codex GUI is a graphical desktop app on top of OpenAI Codex CLI. CodeAgentSwarm gives Codex a visual workspace, task board, diffs and notifications.',
    intro: `A Codex GUI is a graphical desktop app that runs OpenAI Codex CLI inside a visual workspace instead of a bare terminal. The agent underneath stays exactly the same: same CLI, same model, same OpenAI account, just with a visual layer around it.

That layer is what the terminal cannot give you. Codex CLI is text scrolling past in one window, which is fine for a single session and painful the moment you run two or three, forget which one is doing what, and scroll back to find what changed.

CodeAgentSwarm is that kind of Codex GUI app. It runs on macOS and Windows, gives Codex multiple terminals side by side, a task board, searchable history, live diffs, desktop notifications and clickable permission controls. It does not replace Codex CLI and it does not change how the agent works. It gives the same CLI a dashboard.`,
    ctaText: 'Give OpenAI Codex a real desktop app: a visual workspace with several Codex terminals, a task board, live diffs and notifications, all on top of the CLI and the OpenAI account you already use.',
    highlightedWords: ['Codex GUI', 'desktop app'],
    publishedAt: '2026-07-13',
    updatedAt: '2026-07-13',
    alternateSlug: 'interfaz-grafica-codex',
  },
  sections: [
    {
      id: 'what-is-a-codex-gui',
      title: 'What is a Codex GUI?',
      content: [
        {
          type: 'image',
          alt: 'Multiple OpenAI Codex CLI terminals running side by side in one CodeAgentSwarm window, the visual workspace at the core of a Codex GUI',
          src: '/images/guides/codex-agent-swarm.png',
          caption: 'A Codex GUI: several Codex CLI sessions in their own terminals in one visual window, the part a plain terminal cannot give you.',
        },
        {
          type: 'paragraph',
          text: 'A Codex GUI is a graphical interface that wraps the <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenAI Codex CLI</a> in a desktop app. The agent itself does not change: it still runs in a real terminal, still reads and writes files in your repository, still signs in with <code>codex login</code> and uses your own OpenAI account. The GUI adds a visual layer on top so you can see what each Codex session is doing and control it with clicks instead of memorizing flags and scrollback.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a Codex GUI in this sense. It is a desktop app for macOS and Windows that gives the CLI a real workspace: multiple terminals side by side, a task board, searchable conversation history, live file diffs, native notifications, permission controls, project shortcuts, and a skills and MCP marketplace. None of that replaces the agent. It is an OpenAI Codex GUI and manager built around the tool you already run.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'A GUI is not a different model or a different plan. CodeAgentSwarm runs on top of your existing OpenAI account, and the same workspace can drive Claude Code, Gemini CLI and opencode alongside Codex. You keep the full CLI power, you just get a visual layer around it.',
        },
        {
          type: 'paragraph',
          text: 'If what you mostly want is to run more than one Codex agent at once, the deeper guides are <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Codex CLI sessions</a> and the <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex agent swarm</a> guide. This page answers the question "what is Codex GUI" on its own terms: what the graphical layer gives you that a bare terminal does not.',
        },
      ],
    },
    {
      id: 'what-you-get-in-the-gui',
      title: 'What you get in a Codex GUI app',
      content: [
        {
          type: 'paragraph',
          text: 'The point of a Codex interface is to surface the things the terminal hides. Here is what the visual layer actually gives you, capability by capability.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A visual workspace with multiple Codex terminals',
          id: 'visual-workspace',
        },
        {
          type: 'paragraph',
          text: 'Instead of one terminal in one window, you get a grid of terminals in a single app. Each one runs its own independent Codex CLI session, on the same project or different projects, and each terminal has an agent picker so you decide what runs where. You can lay them out, focus one, and glance at the rest, which is the core of any usable Codex dashboard. The step-by-step setup is in <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Codex CLI sessions</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'A task board the agents update themselves',
          id: 'task-board',
        },
        {
          type: 'paragraph',
          text: 'A kanban task board sits over the workspace, and the agents update it over MCP as they work. You create tasks, hand them to terminals, and watch cards move through in progress and done, so you have a visual record of what got built without reading logs. When several Codex sessions are chipping away at related features, the board keeps the plan visible instead of living in your head.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Searchable history across every session',
          id: 'searchable-history',
        },
        {
          type: 'paragraph',
          text: 'Every conversation is saved and searchable in one place, instead of vanishing when you close a terminal tab. You can find what a Codex session decided last week, resume it, and trace which terminal made a particular change. This is one of the biggest gaps a Codex GUI fills, and the <a href="/en/guides/codex-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex conversation history guide</a> covers it in depth.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Live diffs of what Codex changed',
          id: 'live-diffs',
        },
        {
          type: 'paragraph',
          text: 'You can watch the file changes each Codex session is making, per terminal and at project level, in real time. No more guessing what the agent touched: you see the diff as it happens and you can review it before committing. When two sessions edit the same file, you notice while it happens instead of discovering it in a messy diff later.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Desktop notifications',
          id: 'notifications',
        },
        {
          type: 'paragraph',
          text: 'When a Codex session finishes its task or stops to ask for an approval, you get a native desktop notification. You can work in one terminal and let the rest tell you when they need you, instead of babysitting a prompt that may take minutes to respond.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Approval and permission controls you can click',
          id: 'permission-controls',
        },
        {
          type: 'paragraph',
          text: 'Codex has its own approval modes, from suggest-only up to full auto with <code>--full-auto</code>, plus a sandbox. The GUI sits above that with Turbo Mode and per-terminal permissions, so you can let a session run unattended on the safe operations while the dangerous ones stay gated behind your approval. You configure it in the interface rather than juggling command-line flags, which matters more once several sessions are acting at once.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Project shortcuts and a skills + MCP marketplace',
          id: 'shortcuts-marketplace',
        },
        {
          type: 'paragraph',
          text: 'Project shortcuts let you jump straight into the repos you work on without retyping paths. A built-in skills marketplace and MCP marketplace let you add capabilities and connect external tools from the GUI, so the workspace grows with you instead of staying a plain terminal.',
        },
      ],
    },
    {
      id: 'codex-cli-vs-codex-gui',
      title: 'Codex CLI vs Codex GUI',
      content: [
        {
          type: 'paragraph',
          text: 'The Codex CLI vs Codex GUI question has a simple honest answer: it is not either-or. The GUI runs the real CLI underneath, so the comparison is really about what the visual layer adds and when it is worth having.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'What the raw Codex CLI already does well',
          id: 'cli-strengths',
        },
        {
          type: 'list',
          items: [
            'It is already installed once you have Codex, nothing extra needed',
            'For a single session focused on one task, it is all you need',
            'Full agent power, nothing is hidden or removed by a wrapper',
            'It scripts and pipes like any other command-line tool',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where the terminal gets painful',
          id: 'cli-pain',
        },
        {
          type: 'list',
          items: [
            'Several Codex sessions at once turn into a stack of identical-looking tabs',
            'No notification when a session finishes or stops for an approval',
            'History is scrollback, which you cannot search across sessions or days',
            'You read text to figure out what changed, instead of seeing a diff',
            'Approval modes and context live in flags and memory, not in a visible UI',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'What the GUI adds on top',
          id: 'gui-adds',
        },
        {
          type: 'paragraph',
          text: 'The GUI does not take anything away. Underneath, it is still running real Codex CLI in a real terminal, with the same model and the same OpenAI account. What it adds is everything around the prompt: a workspace you can see, a task board, searchable history, live diffs, notifications, and clickable permissions. If you only ever run one Codex session at a time, the raw terminal is fine and you should not overthink it. Once you run several, or you keep losing track of what each one did, the visual layer is what removes that friction.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm dashboard showing a kanban task board with columns for tasks, on top of AI CLI agent terminals',
          src: '/images/guides/task-board-kanban.png',
          caption: 'One surface of the GUI: a kanban task board the agents update as they work while you watch.',
          size: 'medium',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Because the GUI drives the CLI rather than replacing it, you can switch back to a bare terminal any time. Nothing about CodeAgentSwarm locks Codex in: it is a layer, not a fork. If Claude Code is your main agent, the same idea is covered in the <a href="/en/guides/claude-code-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code GUI guide</a>.',
        },
      ],
    },
    {
      id: 'codex-gui-download',
      title: 'Codex GUI download: getting started',
      content: [
        {
          type: 'paragraph',
          text: 'Getting a Codex GUI running takes a couple of minutes. CodeAgentSwarm is a free download from the home page, for macOS and Windows, and it works with the Codex CLI you already have installed.',
        },
        {
          type: 'list',
          items: [
            'Download CodeAgentSwarm from the home page and install it like any desktop app',
            'Open a terminal in the workspace and point it at your project',
            'Pick "codex cli" in the SELECT AI AGENT picker for that terminal',
            'If you have not signed in yet, run <code>codex login</code> once, then work as usual',
          ],
        },
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker with claude-code, gemini cli and codex cli options plus an Enable Turbo Mode toggle',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Each terminal has its own agent picker. Set it to codex cli and the terminal becomes a Codex session inside the GUI.',
        },
        {
          type: 'paragraph',
          text: 'From there, everything in this guide is one click away: open more terminals for more Codex sessions, bring up the task board, search past conversations, and watch diffs as the agent works. There is a free tier, with Pro for advanced features, and your Codex usage is billed by OpenAI as usual.',
        },
        {
          type: 'paragraph',
          text: 'On platforms: the Codex GUI story today is macOS and Windows. There is no Codex GUI for Linux from CodeAgentSwarm right now, so on Linux the practical options remain the terminal and multiplexers like tmux.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a Codex GUI?',
      answer: 'A Codex GUI is a graphical desktop app that runs OpenAI Codex CLI inside a visual workspace. The agent underneath is the real CLI, unchanged, using your own OpenAI account. The GUI adds the layer the terminal lacks: multiple Codex terminals side by side, a task board, searchable conversation history, live file diffs, desktop notifications and clickable permission controls. CodeAgentSwarm is a Codex GUI in exactly this sense.',
    },
    {
      question: 'Is there a Codex GUI for Windows?',
      answer: 'Yes. CodeAgentSwarm is a desktop app for both Windows and macOS. It installs locally, runs the Codex CLI on your machine, and uses your existing OpenAI account. There is no separate model or plan involved, so a Codex GUI on Windows works the same way it does on a Mac.',
    },
    {
      question: 'Is there a Codex GUI for Linux?',
      answer: 'Not from CodeAgentSwarm today. The app currently ships for macOS and Windows only, so there is no Codex GUI for Linux right now. On Linux, the practical way to run several Codex sessions remains the terminal itself, with tools like tmux for split panes.',
    },
    {
      question: 'Does a GUI replace Codex CLI?',
      answer: 'No. A GUI like CodeAgentSwarm runs Codex CLI in a real terminal under the hood and adds a visual layer around it. The agent, the model and your OpenAI account stay exactly the same. The GUI is a dashboard and manager on top of the CLI, not a different tool, and you can go back to a bare terminal whenever you want.',
    },
    {
      question: 'Does it work with my existing ChatGPT or OpenAI subscription?',
      answer: 'Yes. CodeAgentSwarm is not a model provider. Each Codex terminal signs in with codex login and uses your existing OpenAI account, exactly like the CLI in a bare terminal. Your Codex usage is billed by OpenAI as usual, and the GUI adds no surcharge on top of it.',
    },
    {
      question: 'Where do I download a Codex GUI?',
      answer: 'CodeAgentSwarm is a free download from the codeagentswarm.com home page, for macOS and Windows. Install it, open a terminal in the workspace, pick codex cli in the SELECT AI AGENT picker, and the terminal becomes a Codex session with the full visual layer around it. There is a free tier, with Pro for advanced features.',
    },
    {
      question: 'Can the same GUI run Claude Code and Gemini too?',
      answer: 'Yes. CodeAgentSwarm is not tied to a single vendor. Each terminal has an agent picker, so you can set one to Codex CLI, another to Claude Code, another to Gemini CLI or opencode, all in the same visual workspace. A mixed setup is the default rather than a workaround, and the Codex agent swarm guide covers running several agents in parallel.',
    },
  ],
}

export default guide
