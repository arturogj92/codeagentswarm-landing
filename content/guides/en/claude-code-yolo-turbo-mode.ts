import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-yolo-turbo-mode',
    locale: 'en',
    title: 'Claude Code YOLO mode safely: Turbo Mode with permissions and Git guardrails',
    metaTitle: 'Claude Code YOLO mode safely: enable dangerously-skip-permissions with permissions and Git guardrails',
    metaDescription: 'A practical guide to Claude Code YOLO mode (`--dangerously-skip-permissions`) without losing control: Turbo Mode in CodeAgentSwarm, granular tool and MCP permissions, and safeguards to prevent risky git push or merge.',
    intro: `If you use Claude Code daily, you know that confirmations slow you down, and often you approve changes without really knowing what it's doing.

That's why people talk about "Claude Code YOLO mode", usually tied to the \`--dangerously-skip-permissions\` flag. The idea is simple: skip permission prompts so Claude can keep moving.

The risk is also simple: if you bypass permissions without guardrails, a bad command or a Git action at the wrong time can cause real damage fast.

In CodeAgentSwarm, Turbo Mode gives you the "skip confirmations" workflow paired with permission controls. You decide what auto-approves and what gets blocked, so you can go fast and safe.`,
    ctaText: 'Enable Turbo Mode with configured permissions and work with Claude Code at maximum speed without sacrificing safety.',
    highlightedWords: ['YOLO mode', 'Turbo Mode'],
    alternateSlug: 'claude-code-yolo-turbo-mode',
  },
  sections: [
    {
      id: 'what-dangerously-skip-permissions-does',
      title: 'What `--dangerously-skip-permissions` actually does',
      content: [
        {
          type: 'paragraph',
          text: 'When people say "YOLO mode" for Claude Code, they usually mean reducing confirmation prompts. On the CLI, the term you will see most is `--dangerously-skip-permissions`.',
        },
        {
          type: 'paragraph',
          text: 'In practice: Claude stops asking for approval every time it wants to run a tool or execute a command. That makes repetitive work much faster because you are not confirming dozens of actions while iterating.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Important nuance',
          id: 'important-nuance',
        },
        {
          type: 'paragraph',
          text: 'Even with "accept edits on", Claude will still ask for confirmation in many situations. That is why YOLO mode can still feel slower than expected on long or repetitive tasks.',
        },
      ],
    },
    {
      id: 'real-world-risks',
      title: 'Real world risks of dangerously-skip-permissions',
      content: [
        {
          type: 'paragraph',
          text: 'Things that happen in real projects:',
        },
        {
          type: 'list',
          items: [
            'deleting the wrong files or folders',
            'overwriting files via scripts',
            'running dangerous commands',
            'Git actions at the wrong time: push, merge, create or delete branches',
            'MCP tools with data access executing unintended operations',
          ],
        },
      ],
    },
    {
      id: 'turbo-mode-what-changes',
      title: 'Turbo Mode in CodeAgentSwarm: what changes',
      content: [
        {
          type: 'paragraph',
          text: 'Turbo Mode in CodeAgentSwarm is "skip confirmations", but with permission control. The point is not chaos. The point is speed where it is safe, and friction where it matters.',
        },
        {
          type: 'paragraph',
          text: 'Practically:',
        },
        {
          type: 'list',
          items: [
            'Go faster while still blocking risky actions.',
            'Allow reads and diffs without prompts, block what has real impact.',
            'Apply the same model to MCP tools.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'The usual tradeoff',
          id: 'usual-tradeoff',
        },
        {
          type: 'paragraph',
          text: 'When you run fast, you also want visibility. Otherwise you notice changes too late. That is why Turbo Mode pairs really well with the per terminal live diff viewer. You can see how it works in this guide: <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">view Claude Code changes in real time</a>.',
        },
      ],
    },
    {
      id: 'how-to-enable-turbo-mode',
      title: 'How to enable Turbo Mode',
      content: [
        {
          type: 'paragraph',
          text: 'On the project start screen, enable "Enable Turbo Mode (skip confirmations)".',
        },
        {
          type: 'image',
          alt: 'Enable Turbo Mode (skip confirmations) on the project start screen in CodeAgentSwarm',
          src: '/images/guides/turbo-mode-enable.png',
          caption: 'Enable Turbo Mode when starting or resuming a project.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'quick-security-presets',
      title: 'Quick security presets',
      content: [
        {
          type: 'paragraph',
          text: 'Use Global Permissions Manager presets:',
        },
        {
          type: 'list',
          items: [
            'Allow All Tools',
            'Block Dangerous Git (merge, branch, push)',
            'Block Delete Commands (rm, del, etc.)',
          ],
        },
        {
          type: 'paragraph',
          text: 'One click applies the policy. You will usually need to restart the Claude session for changes to fully take effect.',
        },
        {
          type: 'image',
          alt: 'Global Permissions Manager with presets: Allow All Tools, Block Dangerous Git, Block Delete Commands',
          src: '/images/guides/permissions-global-presets.png',
          caption: 'Quick presets to keep YOLO style speed without nasty surprises.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'tool-permissions',
      title: 'Tool permissions: Allow, Ask, Deny',
      content: [
        {
          type: 'paragraph',
          text: 'You can fine tune permissions per category and per tool:',
        },
        {
          type: 'list',
          items: [
            'Allow: auto run',
            'Ask: confirm',
            'Deny: blocked',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Note about "Ask" in Turbo Mode',
          id: 'ask-in-turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'In practice, Ask may behave like Allow if you are using "skip confirmations".',
        },
        {
          type: 'image',
          alt: 'Permission categories by tool type: System, Network, Development, Search, Web',
          src: '/images/guides/tool-permissions-categories.png',
          size: 'medium',
        },
        {
          type: 'image',
          alt: 'Per tool permissions under File Operations with Allow, Ask, Deny',
          src: '/images/guides/permissions-global-presets.png',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Simple mental model:',
        },
        {
          type: 'list',
          items: [
            'If you are fine with it auto running, use Allow.',
            'If you never want it to run without you noticing, use Deny.',
            'Use Ask only if you sometimes run without Turbo Mode.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Parallel terminals tip',
          id: 'parallel-terminals-tip',
        },
        {
          type: 'paragraph',
          text: 'Turbo Mode is even more useful with multiple terminals running in parallel. The downside is visibility: it is easy to lose track of which terminal finished or needs your input.',
        },
        {
          type: 'paragraph',
          text: 'Notifications solve that. If you are going to run several terminals, enable them and let the app ping you when something finishes or gets blocked. You can set them up following this guide: <a href="/en/guides/codeagentswarm-notifications" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm notifications</a>.',
        },
      ],
    },
    {
      id: 'mcp-permissions',
      title: 'MCP permissions',
      content: [
        {
          type: 'paragraph',
          text: 'With MCP servers, Claude can interact with data sources. CodeAgentSwarm lets you control permissions per MCP server and per MCP tool.',
        },
        {
          type: 'image',
          alt: 'MCP permissions panel listing servers (Supabase, Playwright, Brave Search, PostgreSQL, Notion)',
          src: '/images/guides/mcp-permissions-modal.png',
          size: 'medium',
        },
        {
          type: 'image',
          alt: 'Per tool permissions inside Supabase MCP (list_projects, get_project, execute_sql, etc.)',
          src: '/images/guides/mcp-permissions-supabase-tools.png',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Rule of thumb:',
        },
        {
          type: 'list',
          items: [
            'list and read: Allow',
            'destructive actions (write, delete): Deny',
          ],
        },
      ],
    },
    {
      id: 'recommended-setup',
      title: 'Recommended fast and safe setup',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Git',
          id: 'setup-git',
        },
        {
          type: 'list',
          items: [
            'status/diff/log: Allow',
            'commit: Deny',
            'push/merge/branch: Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'File operations',
          id: 'setup-file-ops',
        },
        {
          type: 'list',
          items: [
            'read/edit: Allow',
            'write: Allow',
            'delete: Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Network',
          id: 'setup-network',
        },
        {
          type: 'list',
          items: [
            'mostly Deny',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'MCP',
          id: 'setup-mcp',
        },
        {
          type: 'list',
          items: [
            'list/read: Allow',
            'write/migrate: Deny',
            'delete: Deny',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How to use Claude Code YOLO mode?',
      answer: 'Enable "Turbo Mode (skip confirmations)" in CodeAgentSwarm on the project start screen. This gives you YOLO-style speed with granular permission controls, so you can go fast without compromising safety.',
    },
    {
      question: 'How to enable dangerously-skip-permissions Claude Code?',
      answer: 'In CodeAgentSwarm, activate "Enable Turbo Mode" on the project start screen. This implements the same behavior as --dangerously-skip-permissions but with a permission system that lets you control which actions auto-approve.',
    },
    {
      question: 'What does Claude Code dangerously-skip-permissions mean?',
      answer: 'It is a CLI flag that makes Claude Code skip permission confirmations for tools and commands. It speeds up workflow but can be risky without additional controls. CodeAgentSwarm implements this as Turbo Mode with configurable permissions.',
    },
    {
      question: 'How to bypass permissions in Claude Code safely?',
      answer: 'Use Turbo Mode in CodeAgentSwarm with permission presets. Start with "Block Dangerous Git" and "Block Delete Commands" while allowing read operations. This gives you speed without the risk of accidental destructive actions.',
    },
    {
      question: 'How to prevent Claude Code git push?',
      answer: 'Use the "Block Dangerous Git" preset in Global Permissions Manager. This automatically blocks push, merge, and branch operations. You can still allow status, diff, and log to review changes safely.',
    },
    {
      question: 'How to block git push merge branch Claude Code?',
      answer: 'Apply the "Block Dangerous Git" preset in CodeAgentSwarm. It sets all risky Git operations (push, merge, branch create/delete) to Deny while keeping safe operations like status and diff on Allow.',
    },
    {
      question: 'How do Claude Code tool permissions Allow Ask Deny work?',
      answer: 'Allow: action runs automatically. Ask: prompts for confirmation (but acts like Allow in Turbo Mode). Deny: blocks the action completely. You can configure these per category and per individual tool.',
    },
    {
      question: 'How do Claude Code MCP permissions work?',
      answer: 'MCP permissions use the same Allow/Ask/Deny model as tool permissions, but are configured per MCP server and per individual tool. This lets you, for example, allow Supabase reads while blocking writes or migrations.',
    },
  ],
}

export default guide
