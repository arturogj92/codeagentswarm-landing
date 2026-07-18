import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-vs-claude-code',
    locale: 'en',
    title: 'Kimi Code vs Claude Code: Which Terminal Agent Should You Use?',
    metaTitle: 'Kimi Code vs Claude Code: An Honest Comparison (2026)',
    metaDescription: 'Kimi Code vs Claude Code compared on model, pricing, config, hooks, MCP and maturity. Where each one wins, what actually transfers, and why you may want both.',
    intro: `Kimi Code is Moonshot AI's terminal coding agent, and it is the most direct Claude Code competitor to ship so far. Not in a vague "also an AI CLI" way: Kimi Code clones Claude Code's tool names outright (Bash, Write, Edit, Read, even the mcp__ prefix for MCP tools), reads the same shared skills folder, and its config accepts the same project-level .mcp.json. If you know Claude Code, you already know most of Kimi Code.

The differences are real, though, and they cut both ways. Kimi Code runs Moonshot's Kimi K3, a 2.8 trillion parameter model with a context window of up to a million tokens and aggressive pricing. Claude Code runs Anthropic's Claude family with a far more mature harness around it. One of these tools has years of production hardening; the other shipped its flagship model on July 16, 2026 and currently releases about once a day.

This comparison goes through what each one actually does better, what carries over between them, and the setup a lot of people land on: not choosing, and running both side by side.`,
    ctaText: 'The fastest way to settle Kimi Code vs Claude Code is to run both at once. CodeAgentSwarm gives each agent its own terminal, with live diffs, desktop notifications and searchable history across every session.',
    highlightedWords: ['Kimi Code', 'Claude Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
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
          text: '<strong><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a></strong> is Moonshot AI\'s answer. Same shape: a TUI agent you start with the <code>kimi</code> command inside a project, which then plans, edits, runs and loops. It is open source (MIT, TypeScript), moves extremely fast (dozens of releases in its first two months), and is built to showcase Kimi K3, the model Moonshot launched on July 16, 2026.',
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
          text: 'Kimi Code is a terminal agent powered by Kimi K3: a 2.8 trillion parameter Mixture of Experts model with a 1,048,576 token context window and native vision. K3 always reasons. As of July 2026, <code>reasoning_effort</code> only accepts <code>max</code>, so every request thinks at full depth. That makes it strong on genuinely hard problems and slower than it needs to be on trivial ones.',
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
            '<strong>Kimi K3 pricing is aggressive</strong>: on the pay-per-token platform, $0.30 per million tokens on cache hits, $3.00 on cache misses, $15.00 for output, flat across the whole 1M context',
            '<strong>Up to 1M tokens of context</strong>, with the honest footnote that the full window is gated by subscription plan (256k on the cheaper tier)',
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
            '<strong>Always-on reasoning</strong> has no low-effort mode yet, so quick edits burn more time and quota than they should',
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
          text: 'Kimi Code works with a Kimi subscription (plans from free to $199/month, sharing one credit pool with the rest of the Kimi membership) or with pay-per-token API keys. Quota refreshes weekly with a rolling 5 hour window on top. The full breakdown, including which plan actually unlocks what, is in <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code plans and pricing</a>.',
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
            '<strong>Price per unit of work</strong>: Claude usage is premium-priced compared to K3\'s token rates, especially for long-context work',
            '<strong>Context window</strong>: Claude Code does not match K3\'s 1M token ceiling',
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
          text: '<strong>Kimi Code is the most credible challenger yet</strong>, and it is not close to done. It ships roughly daily, its K3 pricing undercuts Claude substantially on token costs, the 1M context ceiling is real (on the right plan), and because it deliberately mirrors Claude Code\'s conventions, trying it costs you almost nothing in learning time.',
        },
        {
          type: 'paragraph',
          text: 'The practical answer for a lot of developers is to stop treating this as a binary choice. The two agents share your .mcp.json and your skills folder already. Run Claude Code on the work you cannot afford to babysit, hand Kimi Code the long-context or high-volume tasks where K3\'s pricing shines, and compare results on your own repository instead of on benchmarks.',
        },
      ],
    },
    {
      id: 'run-both-codeagentswarm',
      title: 'Run both side by side in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'This is exactly the setup <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> was built for. It is a desktop workspace (macOS and Windows) that runs multiple AI CLI terminals in parallel, and Kimi Code is a first-class agent in it alongside Claude Code, Codex CLI, Antigravity CLI and opencode.',
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
      answer: 'It is heavily inspired by it, to the point of using the same internal tool names (Bash, Write, Edit, Read) and the same mcp__ naming for MCP tools. It is not a fork though: it is its own open source TypeScript codebase, with its own hook system (16 TOML-configured events), its own session format and Moonshot\'s Kimi K3 as the model.',
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
      answer: 'On raw token prices, yes, by a wide margin as of July 2026: Kimi K3 costs $0.30 per million tokens on cache hits, $3.00 on cache misses and $15.00 on output. Subscriptions are harder to compare directly because Kimi plans share one credit pool across the whole Kimi membership with a weekly refresh plus a rolling 5 hour window. See our Kimi Code plans and pricing guide for the full picture.',
    },
    {
      question: 'Can I run Kimi Code and Claude Code at the same time?',
      answer: 'Yes. They are separate processes, they can even share the same repo-level .mcp.json config, and running them in parallel is the fastest way to learn which model suits which task. CodeAgentSwarm runs both side by side in one workspace, with per-terminal diffs, notifications and searchable history.',
    },
    {
      question: 'Should I switch from Claude Code to Kimi Code?',
      answer: 'Switch outright, probably not yet: Kimi Code is pre-1.0, moves very fast, and has known rough edges on Windows and around silent hangs. Add it alongside Claude Code, very possibly: the learning cost is minimal, K3 pricing is aggressive, and your MCP servers and skills largely carry over.',
    },
  ],
}

export default guide
