import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-vs-opencode',
    locale: 'en',
    title: 'Pi vs OpenCode: models, tools, permissions and integration',
    metaTitle: 'Pi vs OpenCode: Coding Agent Differences Explained',
    metaDescription: 'Compare Pi and OpenCode by model access, plan mode, permissions, MCP and integration protocol. Choose a coding workflow without confusing agents with models.',
    intro: 'Pi and OpenCode can work on the same kind of coding tasks, and they can connect to overlapping model providers. Their differences are in the agent workflow around the model. This comparison separates model access from planning, tools and integration.',
    ctaText: 'Pi support in CodeAgentSwarm is in beta testing. The download below is the current public app; check its release notes for Pi availability.',
    ctaAgent: 'pi',
    socialImage: '/images/guides/pi-coding-agent-og-en.png',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-22',
    alternateSlug: 'pi-vs-opencode',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Quick answer',
      content: [
        {
          type: 'image',
          src: '/icons/apps/pi-icon.svg',
          alt: 'Pi coding agent',
          size: 'inline',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Pi offers a small core you can extend; OpenCode includes built-in planning and subagent workflows. Both can connect to multiple model providers. Choose by the workflow you need, then compare a real task with the same model connection.',
        },
      ],
    },
    {
      "id": "which-should-you-choose",
      "title": "Pi or OpenCode: which should you choose?",
      "content": [
        {
          "type": "paragraph",
          "text": "Choose Pi if you want to keep your agent setup small and are willing to add the workflows you need. Choose OpenCode if your first task already needs its built-in Plan agent, subagents or MCP configuration. Neither choice establishes which model will write better code for your project."
        },
        {
          "type": "table",
          "headers": [
            "Your immediate need",
            "Start by evaluating",
            "What to verify"
          ],
          "rows": [
            [
              "Explain a repository and make one contained fix",
              "Either agent",
              "The same provider, model and project checks."
            ],
            [
              "Plan before changing files",
              "OpenCode",
              "Which edits and commands the Plan agent permits in your configuration."
            ],
            [
              "Build a custom tool or project workflow",
              "Pi",
              "The extension source, its permissions and maintenance cost."
            ],
            [
              "Connect an existing MCP service",
              "OpenCode",
              "Server authentication and which tools it exposes."
            ],
            [
              "Use Pi from a desktop chat",
              "CodeAgentSwarm beta",
              "Release availability and the documented limits of the Pi integration."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Treat this as a shortlist, then test the workflow that matters to you. Installing ten extensions just to reproduce a feature you already use is a cost; so is adopting a larger workflow you never need."
        }
      ]
    },
    {
      id: 'pi-in-action',
      title: 'Pi in CodeAgentSwarm, in pictures',
      content: [
        {
          type: 'image',
          src: '/images/guides/pi-chat-beta.webp',
          alt: 'Pi in CodeAgentSwarm Chat with a sample project',
          size: 'full',
          caption: 'Real CodeAgentSwarm beta capture on macOS: Pi running with a sample project. This image does not announce availability in the public download.',
        },
        {
          type: 'paragraph',
          text: 'The picker shows the model and its provider. You can inspect that connection without leaving the project, while Chat keeps the task messages and tools together.',
        },
      ],
    },
    {
      id: 'practical-check',
      title: 'Compare them on one bounded task',
      content: [
        {
          type: 'list',
          items: [
            'Create one worktree for Pi and another for OpenCode from the same commit.',
            'Use the same provider and model where both support that connection.',
            'Give both the same acceptance condition, such as fixing one failing test without changing the public API.',
            'Compare the diff, test results, tool approvals and the amount of correction you needed.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Record differences in permissions and available tools alongside the result. If one agent has extra project instructions or an MCP service the other lacks, describe that setup difference before attributing the outcome to the agent.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Pi and OpenCode at a glance',
      content: [
        {
          type: 'table',
          headers: [
            'Area',
            'Pi',
            'OpenCode',
          ],
          rows: [
            [
              'Model choice',
              'Multiple providers, subscription logins and API connections.',
              'Multiple providers and configurable models.',
            ],
            [
              'Planning and subagents',
              'Extensions can add workflows; not native defaults.',
              'Built-in Build and Plan agents, plus subagents.',
            ],
            [
              'Integration',
              'Native RPC and an SDK.',
              'Documented ACP integration.',
            ],
            [
              'MCP',
              'Add through extensions; CAS owns a limited Swarm bridge.',
              'Native MCP server configuration.',
            ],
            [
              'Tool permissions',
              'In CAS beta Chat, the managed extension asks for tool approval.',
              'Configurable allow, ask and deny rules.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'See the official <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/README.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi overview</a>, <a href="https://opencode.ai/docs/agents/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode agents</a> and <a href="https://opencode.ai/docs/permissions/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode permissions</a>. Availability depends on the version and configuration you run.',
        },
      ],
    },
    {
      id: 'same-model',
      title: 'The same model does not make the agents identical',
      content: [
        {
          type: 'paragraph',
          text: 'An agent decides what context to send and exposes tools the model can call. Even when both menus contain the same model, the prompt, tool definitions, permissions and conversation history can differ. Compare them on a small task in separate checkouts and review the resulting diff and tests.',
        },
        {
          type: 'paragraph',
          text: 'Use the same provider connection when you want to compare agent behavior. Selecting a gateway in one agent and a subscription in the other changes more than the harness. The <a href="/en/guides/pi-coding-agent-models-subscriptions" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi model and subscription guide</a> explains the provider label and separate sign-in.',
        },
      ],
    },
    {
      id: 'protocol',
      title: 'Does Pi have ACP like OpenCode?',
      content: [
        {
          type: 'paragraph',
          text: 'Pi\'s native process interface is <code>pi --mode rpc</code>, using JSON lines for commands and events. CodeAgentSwarm\'s Pi beta connects to that interface. It does not launch an ACP adapter. OpenCode documents a separate <code>opencode acp</code> entry point for ACP clients.',
        },
        {
          type: 'paragraph',
          text: 'For an integration, check the actual commands and events you need: streaming, model changes, questions, tool approval and resume. A protocol name alone does not prove that all of those behave the same. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/rpc.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi RPC reference</a>; <a href="https://opencode.ai/docs/acp/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode ACP reference</a>.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'Extensions and permission boundaries',
      content: [
        {
          type: 'paragraph',
          text: 'OpenCode has <a href="https://opencode.ai/docs/mcp-servers/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">native MCP server configuration</a>. Pi can add functionality through extensions. In CAS beta, its managed extension bridges only the Swarm-owned MCP server and preserves unrelated configuration. That is not a claim that every custom MCP server is imported into Pi.',
        },
        {
          type: 'paragraph',
          text: 'CAS beta Chat applies its manual, auto-approve edits or full-access choices to Pi tool requests. CLI view retains Pi\'s own behavior. These approvals are not an operating-system sandbox. If you need a restricted environment, provide that environment separately.',
        },
      ],
    },
    {
      id: 'choose',
      title: 'Which workflow fits your project?',
      content: [
        {"type": "paragraph", "text": "If you are also considering Meta’s agent, the <a href=\"/en/guides/how-to-use-muse-code\">Muse Code setup guide</a> covers its separate account and first task. Keep that agent choice separate from this Pi/OpenCode comparison."},
        {
          type: 'list',
          items: [
            'Choose a small Pi setup when you want to select a model provider and shape the workflow with a few extensions.',
            'Evaluate OpenCode when built-in planning, subagents or native MCP configuration are central to your workflow.',
            'Keep files isolated when comparing agents on the same task, then inspect their changes instead of judging only the final message.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Start with <a href="/en/guides/how-to-use-pi-coding-agent" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi installation</a> or the <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode workflow guide</a>. <strong>Pi in CodeAgentSwarm remains in beta testing; the SEO guide is not a public release announcement.</strong>',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Pi an OpenCode model provider?',
      answer: 'No. Pi and OpenCode are separate coding agents. Each can connect to model providers, and a provider menu should not be confused with the agent itself.',
    },
    {
      question: 'Does CodeAgentSwarm connect Pi through ACP?',
      answer: 'No. The Pi beta uses Pi\'s native RPC process interface. OpenCode has its own documented ACP interface.',
    },
    {
      question: 'Which one produces better code?',
      answer: 'There is no universal result established here. Compare a defined task with controlled model access, separate worktrees, diff review and the project\'s tests.',
    },
  ],
}

export default guide
