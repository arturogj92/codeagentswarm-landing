import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-agent-teams-vs-codeagentswarm',
    locale: 'en',
    title: 'Claude Code Agent Teams vs CodeAgentSwarm: What Is the Difference?',
    metaTitle: 'Claude Code Agent Teams vs CodeAgentSwarm: What Is the Difference? (2026)',
    metaDescription: 'Claude Code agent teams are subagents inside one Claude session. CodeAgentSwarm runs several independent CLI agents in parallel. Here is the honest difference, and how to use both.',
    intro: `Claude Code agent teams and CodeAgentSwarm sound like they compete, but they solve different problems and work well together. Agent teams are Anthropic's native feature for one Claude session that spins up its own subagents to split a single task. CodeAgentSwarm is a desktop workspace that runs several fully independent CLI terminals in parallel, each its own process and conversation.

The confusion is understandable. Both involve "multiple agents". The difference is who is in charge and how independent each agent really is. With agent teams, one Claude session orchestrates ephemeral helpers that share your context and usage. With CodeAgentSwarm, you supervise several separate sessions yourself, and they can even be from different vendors.

This guide lays out what each one is, when to reach for which, and why you do not have to choose. You can run native agent teams inside a terminal that CodeAgentSwarm is hosting and get the best of both.`,
    ctaText: 'Use Claude Code agent teams for delegation inside one session, and CodeAgentSwarm to run several independent agents in parallel. Download CodeAgentSwarm and supervise the whole workspace from one place.',
    highlightedWords: ['Claude Code Agent Teams', 'CodeAgentSwarm'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'agent-teams-de-claude-code-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'image',
          alt: 'OpenAI Codex, Google Gemini CLI and Anthropic Claude Code running side by side as three separate, independent terminals in one CodeAgentSwarm workspace',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'CodeAgentSwarm runs independent agents in parallel: Codex, Gemini CLI and Claude Code as separate processes in one workspace. Native agent teams, by contrast, live inside a single Claude session.',
        },
        {
          type: 'paragraph',
          text: 'Claude Code agent teams are subagents inside one Claude Code session that delegate parts of a single task, while CodeAgentSwarm is a desktop workspace that runs several independent CLI agents in parallel, each its own process, conversation, and (if you want) vendor.',
        },
        {
          type: 'paragraph',
          text: 'That is the whole comparison in a sentence. One is delegation that happens inside a session you are already running. The other is you running and watching several real sessions at once. They are complementary, not rivals, and the rest of this guide unpacks why. If you want the broader cross-vendor picture first, the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview sets the scene.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'CodeAgentSwarm is not a model provider. It runs on top of your existing Claude, OpenAI, and Google subscriptions. Native agent teams also run on your Claude plan. Neither approach adds a separate "multi-agent" fee.',
        },
      ],
    },
    {
      id: 'what-are-agent-teams',
      title: 'What Claude Code agent teams are',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code agent teams (also discussed as subagents or swarm-style delegation) are a native feature of <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>. At a high level, one main Claude session can spawn helper agents, hand each of them a slice of the work, and pull their results back together. You give one instruction, and Claude decides internally how to break it up and delegate.',
        },
        {
          type: 'paragraph',
          text: 'The defining traits, described at a high level so we do not overstate the internals: the helpers are spawned and managed by the main session, they tend to be ephemeral (created for the task and then gone), they share your Claude context and usage pool, and the whole thing is autonomous. You are not driving each helper by hand. The main agent is.',
        },
        {
          type: 'list',
          items: [
            'One vendor, one session: everything happens inside a single Claude Code process',
            'Autonomous delegation: the main agent splits the task and assigns the pieces',
            'Shared context and usage: the helpers draw from the same conversation and the same Claude plan',
            'Ephemeral helpers: subagents are created to do a job and then go away',
            'Great for one task: when a single goal naturally breaks into parallel parts',
          ],
        },
        {
          type: 'paragraph',
          text: 'This is genuinely useful. If a task cleanly decomposes (search these ten files in parallel, draft these three modules, gather context from several places at once), letting one Claude session fan the work out and reassemble it is faster than doing it serially yourself. It is delegation done for you, inside the session you already have open.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Think of agent teams as one expert who can clone themselves for a job. The clones report to the same person, share the same notes, and disband when the job is done. The decisions still come from one place.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm is',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop workspace, for macOS and Windows, that runs multiple independent CLI terminals in parallel. Each terminal is its own process and its own conversation, and you pick the agent per terminal: Claude Code in one, Codex CLI in another, Gemini CLI in a third. They do not share context with each other, and you supervise them directly.',
        },
        {
          type: 'paragraph',
          text: 'The point is human-supervised parallelism across separate sessions, possibly across vendors. You are not asking one agent to delegate. You are running several real agents at once, each on its own task, and the workspace is the layer that keeps that legible. If your main agent is Claude Code, the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> guide goes deeper, and there is a parallel <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex agent swarm</a> guide too.',
        },
        {
          type: 'list',
          items: [
            'Cross-vendor: mix Claude Code, Codex CLI, and Gemini CLI in one workspace, your choice per terminal',
            'Independent sessions: each terminal is a separate process with its own conversation and context',
            'Human-supervised: you assign and watch the work, no single agent is orchestrating the rest',
            'Desktop notifications: get told when any agent finishes or stops to ask you something',
            'Searchable history: every conversation, from every agent and vendor, saved and searchable in one place',
            'Per-terminal live file diffs: watch what each agent changes, so overlapping edits are visible early',
            'Permission control: Turbo Mode auto-approves the safe operations and gates the dangerous ones',
            'A shared task board: a kanban the agents update themselves over MCP as they work',
          ],
        },
        {
          type: 'paragraph',
          text: 'So where agent teams are one session splitting one task, CodeAgentSwarm is several sessions running several tasks, with the visibility and control you need to keep up with all of them. It is the difference between cloning one expert for a job and managing a small team of specialists who each work on their own thing.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'An honest side-by-side, and when to use each',
      content: [
        {
          type: 'paragraph',
          text: 'Neither of these is "better". They answer different questions. Here is how they line up across the things that actually matter, followed by a simple rule of thumb for picking.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'How agents relate',
          id: 'compare-relation',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code agent teams:</strong> one main session orchestrates its own subagents',
            '<strong>CodeAgentSwarm:</strong> several independent sessions you supervise side by side',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Who is in control',
          id: 'compare-control',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code agent teams:</strong> the main agent, autonomously',
            '<strong>CodeAgentSwarm:</strong> you, directly, per terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Vendors',
          id: 'compare-vendors',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code agent teams:</strong> Claude only, inside one Claude session',
            '<strong>CodeAgentSwarm:</strong> mix Claude Code, Codex CLI, and Gemini CLI freely',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Context and usage',
          id: 'compare-context',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code agent teams:</strong> helpers share your context and your Claude usage pool',
            '<strong>CodeAgentSwarm:</strong> each terminal has its own context and uses its own plan independently',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Best fit',
          id: 'compare-fit',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code agent teams:</strong> one task that naturally splits into parallel parts you want delegated',
            '<strong>CodeAgentSwarm:</strong> several separate tasks, or several projects, you want running at once',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Visibility and notifications',
          id: 'compare-visibility',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code agent teams:</strong> the main session reports back in its own output',
            '<strong>CodeAgentSwarm:</strong> dynamic titles, desktop notifications, live diffs, and searchable history across all agents',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'The rule of thumb: reach for agent teams when you have one goal that decomposes into parallel pieces and you are happy for Claude to delegate them for you. Reach for CodeAgentSwarm when you have several distinct jobs in flight, want to mix vendors, or simply want to see and control what every agent is doing at once. Most weeks you will want both.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Can you use both together? Yes.',
      content: [
        {
          type: 'paragraph',
          text: 'This is the part people miss: agent teams and CodeAgentSwarm are not an either/or. Native agent teams are a feature of Claude Code, and CodeAgentSwarm runs Claude Code terminals. So you can open a terminal in CodeAgentSwarm, start Claude Code, and let that session use agent teams internally, while other terminals run Codex, Gemini, or another Claude session in parallel.',
        },
        {
          type: 'paragraph',
          text: 'A realistic setup: terminal 1 is a Claude Code session tackling a big refactor, and inside it Claude uses agent teams to fan out across the affected files. Terminal 2 is Codex CLI writing tests for a different module. Terminal 3 is Gemini CLI reading and summarizing an unfamiliar part of the codebase. The native delegation handles the inside of one task; CodeAgentSwarm handles running and watching all three at once.',
        },
        {
          type: 'list',
          items: [
            'Run agent teams inside any Claude Code terminal CodeAgentSwarm is hosting',
            'Let other terminals run different tasks, or different vendors, in parallel',
            'Get notified when the Claude session (teams and all) finishes, the same as any other agent',
            'Keep the searchable history and live diffs across everything, including the team-driven session',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Native delegation handles the inside of one task. CodeAgentSwarm handles the outside, running and supervising several tasks at once. Stacking them gives you autonomous fan-out within a job and human oversight across jobs.',
        },
        {
          type: 'paragraph',
          text: 'So the honest answer to "agent teams or CodeAgentSwarm?" is usually "both, for different things". Anthropic built a strong way to delegate inside a session. CodeAgentSwarm gives you a way to run several sessions, across vendors, without losing track of any of them.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What are Claude Code agent teams?',
      answer: 'Claude Code agent teams are a native Claude Code feature where one main Claude session spawns its own subagents (helper agents) to split a single task. The helpers are autonomous, ephemeral, and share your Claude context and usage pool. It is delegation that happens inside one session and one vendor, managed by the main agent rather than by you.',
    },
    {
      question: 'What is the difference between Claude Code agent teams and CodeAgentSwarm?',
      answer: 'Claude Code agent teams are subagents inside one Claude session that delegate parts of a single task autonomously. CodeAgentSwarm is a desktop workspace that runs several independent CLI agents in parallel, each its own process and conversation, which you supervise directly and which can be from different vendors (Claude Code, Codex, Gemini). One is delegation inside a session; the other is running and watching several separate sessions at once.',
    },
    {
      question: 'Is CodeAgentSwarm an alternative to Claude agent teams?',
      answer: 'Not exactly, because they solve different problems. Agent teams delegate parts of one task inside a single Claude session. CodeAgentSwarm runs several independent sessions in parallel under your supervision. They are complementary: you can run native agent teams inside a Claude Code terminal that CodeAgentSwarm is hosting, while other terminals handle other tasks or other vendors.',
    },
    {
      question: 'Can I use Claude Code agent teams inside CodeAgentSwarm?',
      answer: 'Yes. Agent teams are a feature of Claude Code, and CodeAgentSwarm runs Claude Code terminals. Open a terminal, start Claude Code, and that session can use agent teams internally exactly as it would on its own. Meanwhile your other terminals can run Codex, Gemini, or another Claude session in parallel, all watched from one workspace.',
    },
    {
      question: 'Does Claude Code swarm mode cost extra?',
      answer: 'There is no separate fee for either approach. Native agent teams run on your existing Claude plan and draw from the same usage pool as the main session. CodeAgentSwarm runs on top of the subscriptions you already pay for and is not a model provider, so each terminal uses your own Claude, OpenAI, or Google plan independently. Running agents in parallel finishes work sooner, it does not add a per-agent surcharge.',
    },
    {
      question: 'When should I use agent teams vs CodeAgentSwarm?',
      answer: 'Use Claude Code agent teams when you have one goal that naturally breaks into parallel pieces and you want Claude to delegate them for you. Use CodeAgentSwarm when you have several distinct tasks or projects running at once, when you want to mix vendors, or when you want notifications, searchable history, live file diffs, and direct control over every agent. Many developers use both, with agent teams inside individual terminals that CodeAgentSwarm is running.',
    },
    {
      question: 'Are Claude Code subagents the same as running multiple Claude Code sessions?',
      answer: 'No. Subagents (agent teams) live inside a single Claude Code session and are managed by the main agent, sharing its context and usage. Running multiple Claude Code sessions means launching several independent Claude processes, each with its own context and conversation, which you supervise yourself. CodeAgentSwarm is built for the second case, letting you run multiple independent terminals side by side.',
    },
  ],
}

export default guide
