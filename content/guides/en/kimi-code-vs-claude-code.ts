import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-vs-claude-code',
    locale: 'en',
    title: 'Kimi Code vs Claude Code: Which Terminal Agent Should You Use?',
    metaTitle: 'Kimi Code vs Claude Code: An Honest Comparison (2026)',
    metaDescription: 'Kimi Code vs Claude Code compared on model, pricing, config, hooks, MCP and maturity. Where each one wins, what actually transfers, and why you may want both.',
    intro: `Kimi Code is Moonshot AI's terminal coding agent, and it is the most direct Claude Code competitor to ship so far. Not in a vague "also an AI CLI" way: Kimi Code clones Claude Code's tool names outright (Bash, Write, Edit, Read, even the mcp__ prefix for MCP tools), reads the same shared skills folder, and its config accepts the same project-level .mcp.json. If you know Claude Code, you already know most of Kimi Code.

The differences are real, though, and they cut both ways. Kimi Code now runs Kimi K2.7 Code by default, a one-trillion-parameter model with a 256K context window and low API rates. Claude Code runs Anthropic's Claude family with a far more mature harness around it. One tool has years of production hardening; the other is still pre-1.0 and changes quickly.

This comparison goes through what each one actually does better, what carries over between them, and the setup a lot of people land on: not choosing, and running both side by side.`,
    ctaText: 'The fastest way to settle Kimi Code vs Claude Code is to run both at once. CodeAgentSwarm gives each agent its own terminal, with live diffs, desktop notifications and searchable history across every session.',
    ctaAgent: 'multi',
    highlightedWords: ['Kimi Code', 'Claude Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-08-11',
    alternateSlug: 'kimi-code-vs-claude-code',
  },
  sections: [
    {
      id: 'overview',
      title: 'Two terminal agents, one obvious lineage',
      content: [
        {
          type: 'paragraph',
          text: '<strong><a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a></strong> is Anthropic\'s agentic CLI. It runs in your terminal, reads your repository, edits files, runs commands and iterates until the task is done. It has been the reference point for terminal coding agents for a while now, with a deep ecosystem of hooks, MCP servers, skills and community knowledge around it.',
        },
        {
          type: 'paragraph',
          text: '<strong><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a></strong> is Moonshot AI\'s answer. Same shape: a TUI agent you start with the <code>kimi</code> command inside a project, which then plans, edits, runs and loops. It is open source (MIT, TypeScript), moves quickly, and currently uses Kimi K2.7 Code as its default coding model.',
        },
        {
          type: 'paragraph',
          text: 'The lineage is not subtle. Kimi Code\'s internal tools carry the exact names Claude Code uses: <code>Bash</code>, <code>Write</code>, <code>Edit</code>, <code>Read</code>, and MCP tools appear as <code>mcp__server__tool</code>, identical to Claude\'s naming. That is good news for you: workflows, mental models and even some config files transfer between the two with very little friction.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Do not confuse Kimi Code with kimi-cli. Moonshot has two CLIs: kimi-cli is the older Python agent, now in wind-down, and Kimi Code is the current TypeScript one. Both install a binary called kimi. Run kimi --version to check: 0.x means you have the current Kimi Code, 1.4x means you are on the legacy Python tool. Our <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code setup guide</a> covers how to avoid installing the wrong one.',
        },
      ],
    },
    {
      id: 'kimi-code',
      title: 'Kimi Code',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'What it is',
          id: 'kimi-code-what',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code currently defaults to <a href="https://www.kimi.com/es-419/resources/kimi-k2-7-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K2.7 Code</a>: a one-trillion-parameter Mixture of Experts model with 32 billion active parameters, native vision and a 262,144-token context window. K2.7 Code always reasons; if reasoning is disabled, Kimi Code routes the request to K2.6.',
        },
        {
          type: 'paragraph',
          text: 'You install it with a one-line script or <code>npm install -g @moonshot-ai/kimi-code</code>, log in with an OAuth flow or an API key, and run <code>kimi</code> in your project. Sessions are stored as plain JSONL files on disk, organized per project, and <code>kimi --continue</code> resumes the last session in the current directory.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Key strengths',
          id: 'kimi-code-strengths',
        },
        {
          type: 'list',
          items: [
            '<strong>Low K2.7 Code API rates</strong>: $0.19 per million cached input tokens, $0.95 per million uncached input tokens and $4.00 per million output tokens',
            '<strong>A 256K context window</strong> for the default K2.7 Code model, with no long-context tier hidden behind a subscription upgrade',
            '<strong>Familiar by design</strong>: Claude-style tool names, project-level .mcp.json support, and it reads the shared ~/.agents/skills/ folder natively',
            '<strong>A bigger hook surface than Claude Code</strong>: 16 lifecycle events configured in TOML, validated with kimi doctor',
            '<strong>Open source and fast-moving</strong>: MIT license, public repo, releases land roughly daily',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where it is weaker',
          id: 'kimi-code-weaknesses',
        },
        {
          type: 'list',
          items: [
            '<strong>Maturity</strong>: it is pre-1.0 and it shows. Users have reported sessions that hang silently after rate limits or stalled streams, which is painful when you are not watching the terminal',
            '<strong>Windows is rough</strong>: it requires Git for Windows as its shell, and there is a known open issue where the TUI prints raw ANSI codes in some Windows terminals. See <a href="/en/guides/kimi-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code on Windows</a> for the workarounds',
            '<strong>No custom sub-agents</strong>: you get three built-ins (coder, explore, plan) and that is it',
            '<strong>Always-on K2.7 reasoning</strong> has no low-effort mode; disabling reasoning switches the request to K2.6 instead',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pricing',
          id: 'kimi-code-pricing',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code works with a paid Kimi membership or a pay-per-token API key. Monthly memberships run from $19 to $199, or $15 to $159 per month when billed annually. Membership features share one credit pool, and Kimi Code also has a weekly allowance and 5-hour rate limit. The dated breakdown is in <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code plans and pricing</a>.',
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
          text: 'Claude Code is Anthropic\'s agentic coding tool, running Claude Sonnet and Opus. It established most of the conventions Kimi Code now follows: natural-language instructions in a terminal, autonomous multi-file edits, command execution, MCP integrations and a permission system that keeps you in the loop.',
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
            '<strong>Maturity</strong>: years of production use, stable releases, and predictable behavior under load. When something breaks, someone has already written about it',
            '<strong>The Claude models</strong>: Opus for hard reasoning, Sonnet for speed, with effort control so simple tasks do not overthink',
            '<strong>Ecosystem depth</strong>: hooks, skills, sub-agents (including fully custom ones), MCP, a huge library of community configs and guides',
            '<strong>Cross-platform</strong>: solid native support on macOS, Linux and <a href="/en/guides/claude-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Windows</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where it is weaker',
          id: 'claude-code-weaknesses',
        },
        {
          type: 'list',
          items: [
            '<strong>API price per token</strong>: Anthropic\'s flagship model rates are higher than the listed K2.7 Code API rates, although subscription value depends on your real workload',
            '<strong>Single vendor</strong>: it runs Claude models. If you want to try another frontier model, you need another harness (or the endpoint trick below)',
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
          text: 'Claude Code comes with a Claude Pro subscription ($20/month) or Claude Max ($100/month for 5x usage, $200/month for 20x), or pay-per-use through the Anthropic API.',
        },
      ],
    },
    {
      id: 'side-by-side',
      title: 'Side by side: what actually differs',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Instructions file',
          id: 'compare-instructions',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: CLAUDE.md (global and per project)',
            '<strong>Kimi Code</strong>: the AGENTS.md convention (global in ~/.kimi-code/AGENTS.md, shared in ~/.agents/AGENTS.md, per project in AGENTS.md). There is no KIMI.md, and it does not read CLAUDE.md natively, though it ships an /import-from-cc-codex skill to migrate your setup once',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hooks',
          id: 'compare-hooks',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: 8 lifecycle events, configured in JSON settings',
            '<strong>Kimi Code</strong>: 16 lifecycle events, configured as [[hooks]] blocks in a TOML config file, with kimi doctor to validate what you wrote. More surface, but your existing Claude hooks need rewriting, not copying',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'MCP servers',
          id: 'compare-mcp',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: full MCP support, project config in .mcp.json',
            '<strong>Kimi Code</strong>: full MCP support too, and this is the best part: it reads the same <code>.mcp.json</code> at your repo root that Claude Code uses, and exposes the tools under identical mcp__server__tool names. One file configures both agents',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Skills',
          id: 'compare-skills',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: skills in ~/.claude/skills and the shared ~/.agents/skills convention',
            '<strong>Kimi Code</strong>: reads ~/.agents/skills/ natively, plus its own folders. Skills you wrote for the Claude ecosystem largely just work. If you maintain skills across several CLIs, see <a href="/en/guides/share-skills-between-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">sharing skills between agents</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sub-agents',
          id: 'compare-subagents',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: built-in and fully custom sub-agents',
            '<strong>Kimi Code</strong>: three built-ins only (coder, explore, plan), custom agents were removed on purpose',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sessions and history',
          id: 'compare-sessions',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: JSONL transcripts per project, resume with claude --resume',
            '<strong>Kimi Code</strong>: JSONL on disk too, per project, with kimi --continue and kimi --session, plus a /title command to name sessions. Details in <a href="/en/guides/kimi-code-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code conversation history</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Autonomy',
          id: 'compare-autonomy',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: permission prompts by default, with a bypass flag people call <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">YOLO mode</a>',
            '<strong>Kimi Code</strong>: same model. Prompts by default, <code>--yolo</code> to approve everything, plus TOML permission rules for a middle ground. See <a href="/en/guides/kimi-code-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code YOLO mode</a>',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Platforms',
          id: 'compare-platforms',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code</strong>: macOS, Linux, Windows (native and WSL)',
            '<strong>Kimi Code</strong>: macOS and Linux are solid. Windows needs Git for Windows and has a known rendering issue in some terminals as of July 2026',
          ],
        },
      ],
    },
    {
      id: 'middle-path',
      title: 'The middle path: Kimi K3 inside Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'There is a third option this comparison would be incomplete without. Moonshot runs Anthropic-compatible endpoints, so you can point Claude Code itself at Kimi K3 with a few environment variables. You keep Claude Code\'s mature harness, your hooks, your CLAUDE.md and your MCP setup, and swap the model underneath.',
        },
        {
          type: 'paragraph',
          text: 'That path has its own trade-offs (two different endpoints, different auth variables, and a few Claude Code features behave differently against a non-Anthropic backend), and we wrote a full setup guide for it: <a href="/en/guides/kimi-k3-with-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use Kimi K3 with Claude Code</a>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'A useful way to frame it: if you want the K3 model, Claude Code can already run it. If you want the Kimi Code harness (its hooks, its TUI, its subscription quota), that is what the kimi CLI is for.',
        },
      ],
    },
    {
      id: 'verdict',
      title: 'Verdict: who wins in 2026',
      content: [
        {
          type: 'paragraph',
          text: 'An honest call, not a fake tie: <strong>Claude Code is still the better harness</strong>. It is more stable, works on more platforms, has custom sub-agents, and its ecosystem is far deeper. If you run one terminal agent for serious daily work, Claude Code remains the safer default.',
        },
        {
          type: 'paragraph',
          text: '<strong>Kimi Code is a credible challenger</strong>, and it is not close to done. K2.7 Code has low published API rates and a 256K context window, while the harness deliberately mirrors enough Claude Code conventions that trying it costs little learning time.',
        },
        {
          type: 'paragraph',
          text: 'The practical answer for a lot of developers is to stop treating this as a binary choice. The two agents share your .mcp.json and your skills folder already. Run Claude Code on the work you cannot afford to babysit, try Kimi Code on high-volume tasks where K2.7 Code\'s pricing fits, and compare results on your own repository instead of on benchmarks.',
        },
      ],
    },
    {
      id: 'run-both-codeagentswarm',
      title: 'Run both side by side in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'This is exactly the setup <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> was built for. It is a desktop workspace (macOS and Windows) that runs multiple AI CLI terminals in parallel, and Kimi Code is a first-class agent in it alongside Claude Code, Codex CLI, Antigravity CLI, opencode and Grok Build.',
        },
        {
          type: 'list',
          items: [
            '<strong>Pick the agent per terminal</strong>: Claude Code in one, Kimi Code in the next, on the same project',
            '<strong>Desktop notifications</strong> when any agent finishes or needs an approval, so a silent Kimi hang does not eat your afternoon',
            '<strong>Live diffs per terminal</strong>, so you can audit what each model actually changed',
            '<strong>Searchable history across agents</strong>: every Claude and Kimi session in one search box',
            '<strong>Quota tracking</strong> that understands Kimi\'s weekly and 5 hour windows, so you see the wall before you hit it',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you want to go deeper on multi-agent setups, start with <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Kimi Code agent swarm guide</a> or the broader <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Kimi Code a copy of Claude Code?',
      answer: 'It is heavily inspired by it, to the point of using the same internal tool names (Bash, Write, Edit, Read) and the same mcp__ naming for MCP tools. It is not a fork: it is its own open-source TypeScript codebase, with its own hook system, session format and Kimi K2.7 Code as the current default model.',
    },
    {
      question: 'Does Kimi Code read CLAUDE.md?',
      answer: 'Not natively. Kimi Code follows the AGENTS.md convention instead: a global AGENTS.md in its config folder, the shared ~/.agents/AGENTS.md, and a per-project AGENTS.md. It ships an /import-from-cc-codex skill that migrates your Claude Code or Codex setup once, with confirmation.',
    },
    {
      question: 'Do Claude Code skills work in Kimi Code?',
      answer: 'Mostly yes. Kimi Code reads the shared ~/.agents/skills/ folder natively, which is where cross-agent skills live, and its Claude-style tool names mean skills that reference Bash, Write or Edit behave as expected. Hooks are the exception: Claude hooks are JSON, Kimi hooks are TOML with different payloads, so those need rewriting.',
    },
    {
      question: 'Is Kimi Code cheaper than Claude Code?',
      answer: 'On listed API rates, Kimi K2.7 Code is cheaper than Anthropic\'s flagship models as of August 11, 2026: $0.19 per million cached input tokens, $0.95 uncached and $4 output. Subscriptions are not directly comparable because their allowances and limits differ. See the Kimi Code pricing guide for the dated breakdown.',
    },
    {
      question: 'Can I run Kimi Code and Claude Code at the same time?',
      answer: 'Yes. They are separate processes, they can even share the same repo-level .mcp.json config, and running them in parallel is the fastest way to learn which model suits which task. CodeAgentSwarm runs both side by side in one workspace, with per-terminal diffs, notifications and searchable history.',
    },
    {
      question: 'Should I switch from Claude Code to Kimi Code?',
      answer: 'Switch outright, probably not yet: Kimi Code is pre-1.0, moves very fast, and has rough edges on Windows and around silent hangs. Adding it alongside Claude Code can make sense: the learning cost is low, K2.7 Code API rates are competitive, and your MCP servers and skills largely carry over.',
    },
  ],
}

export default guide
