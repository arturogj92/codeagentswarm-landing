import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-vs-claude-code',
    locale: 'en',
    title: 'Kimi Code vs Claude Code: Which Terminal Agent Should You Use?',
    metaTitle: 'Kimi Code vs Claude Code: An Honest Comparison (2026)',
    metaDescription: 'Kimi Code vs Claude Code compared on model, pricing, config, hooks, MCP and maturity. Where each one wins, what actually transfers, and why you may want both.',
    intro: `Kimi Code is Moonshot AI's terminal coding agent, and it is the most direct Claude Code competitor to ship so far. Not in a vague "also an AI CLI" way: Kimi Code clones Claude Code's tool names outright (Bash, Write, Edit, Read, even the mcp__ prefix for MCP tools), can import your Claude Code skills in one step, and its config accepts the same project-level .mcp.json. If you know Claude Code, you already know most of Kimi Code.

The differences are real, though, and they cut both ways. Kimi Code's default model id now serves K2.8 Preview with up to a 1M context window, and Moonshot's newest flagship, K3.1 Pro, is one command away. Claude Code runs Anthropic's Claude models with a far more mature harness around it. One tool has years of production hardening; the other jumped from 0.43 to 2.0 in September 2026 and still changes quickly.

This comparison goes through what each one actually does better, what carries over between them, and the setup a lot of people land on: not choosing, and running both side by side.`,
    ctaText: 'The fastest way to settle Kimi Code vs Claude Code is to run both at once. CodeAgentSwarm gives each agent its own terminal, with live diffs, desktop notifications and searchable history across every session.',
    ctaAgent: 'multi',
    highlightedWords: ['Kimi Code', 'Claude Code'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-10-31',
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
          text: '<strong><a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a></strong> is Moonshot AI\'s answer. Same shape: a TUI agent you start with the <code>kimi</code> command inside a project, which then plans, edits, runs and loops. It is open source (MIT, TypeScript), moves quickly, and its default <code>kimi-for-coding</code> model id currently serves K2.8 Preview, with K3.1 Pro available through <code>/model</code>.',
        },
        {
          type: 'paragraph',
          text: 'The lineage is not subtle. Kimi Code\'s internal tools carry the exact names Claude Code uses: <code>Bash</code>, <code>Write</code>, <code>Edit</code>, <code>Read</code>, and MCP tools appear as <code>mcp__server__tool</code>, identical to Claude\'s naming. That is good news for you: workflows, mental models and even some config files transfer between the two with very little friction.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Do not confuse Kimi Code with kimi-cli. Moonshot has two CLIs: kimi-cli is the older Python agent, now archived and no longer maintained, and Kimi Code is the current TypeScript one. Both install a binary called kimi. Run kimi --version to check: 2.x means you have the current Kimi Code (it jumped from 0.43 to 2.0.0 in September 2026), 1.x means you are on the legacy Python tool. Our <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code setup guide</a> covers how to avoid installing the wrong one.',
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
          text: 'Kimi Code\'s default <code>kimi-for-coding</code> model id has served K2.8 Preview since September 11, 2026, replacing K2.7 Code. It offers low, high and max reasoning effort and up to a 1M token context window on every plan. On Plus and above you can switch to K3.1 Pro, Moonshot\'s newest flagship since October 23, 2026, or to K3 with <code>/model</code>; their 1M window needs Pro or above. The <a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official model list</a> has the current ids and limits.',
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
            '<strong>A pay-per-token option</strong>: Moonshot publishes per-token rates for its K3 models on its <a href="https://platform.kimi.ai/docs/pricing/chat" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official pricing page</a>, with automatic context caching',
            '<strong>Up to a 1M context window</strong> on the default model for every plan, and on K3.1 Pro from the Pro plan up',
            '<strong>Familiar by design</strong>: Claude-style tool names, project-level .mcp.json support, and a built-in <code>/import-from-cc-codex</code> skill that copies Claude Code and Codex instructions, skills and MCP settings into Kimi Code',
            '<strong>A bigger hook surface than Claude Code</strong>: 16 lifecycle events configured in TOML, validated with kimi doctor',
            '<strong>Open source and fast-moving</strong>: MIT license, public repo, new releases every few days',
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
            '<strong>Maturity</strong>: it moves fast and it shows. It went from 0.43 to 2.0 in September 2026 and renamed its permission modes along the way. Users have reported sessions that hang silently after rate limits or stalled streams, which is painful when you are not watching the terminal',
            '<strong>Windows is rough</strong>: it requires Git for Windows as its shell, and there is a known open issue where the TUI prints raw ANSI codes in some Windows terminals. See <a href="/en/guides/kimi-code-on-windows" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code on Windows</a> for the workarounds',
            '<strong>No custom sub-agents</strong>: you get three built-ins (coder, explore, plan) and that is it',
            '<strong>K3.1 Pro always reasons</strong>: you can lower the effort to low or high, but requests with thinking turned off are rejected',
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
          text: 'Kimi Code works with a paid Kimi membership or a pay-per-token API key. On the plans Moonshot launched in October 2026, Kimi Code needs Plus or above (Go has no coding quota), and new members have no weekly allowance: a rolling 5 hour window and the membership\'s monthly total apply. Prices are on Kimi\'s plan page and the rules are on the <a href="https://www.kimi.com/code/docs/en/kimi-code/membership.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">membership page</a>. The dated breakdown is in <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code plans and pricing</a>.',
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
          text: 'Claude Code is Anthropic\'s agentic coding tool, running the Claude models (Opus 5.5, Sonnet 5.5 and Haiku 5.5 on the Anthropic API, plus Fable where available). It established most of the conventions Kimi Code now follows: natural-language instructions in a terminal, autonomous multi-file edits, command execution, MCP integrations and a permission system that keeps you in the loop.',
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
            '<strong>The Claude models</strong>: Opus and Fable for hard reasoning, Sonnet and Haiku for speed, with effort control so simple tasks do not overthink',
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
            '<strong>API price per token</strong>: compare Anthropic\'s and Moonshot\'s official pricing pages for the models you would actually use; subscription value depends on your real workload',
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
          text: 'Claude Code comes with Claude Pro ($20/month, or $17/month billed annually), Max ($100/month) or Ultra ($200/month), or pay-per-use through the Anthropic API. Check <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Anthropic\'s pricing page</a> for current limits.',
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
            '<strong>Claude Code</strong>: skills in ~/.claude/skills and the project\'s .claude/skills',
            '<strong>Kimi Code</strong>: reads the shared ~/.agents/skills/ and .agents/skills/ folders plus its own ~/.kimi-code/skills/, but not ~/.claude/skills. Its /import-from-cc-codex skill copies your Claude Code skills over once. If you maintain skills across several CLIs, see <a href="/en/guides/share-skills-between-claude-code-codex-antigravity" class="text-neon-cyan hover:text-neon-purple transition-colors">sharing skills between agents</a>',
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
            '<strong>Kimi Code</strong>: macOS and Linux are solid. Windows needs Git for Windows and has a known rendering issue in some terminals, still open as of October 2026',
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
          text: '<strong>Kimi Code is a credible challenger</strong>, and it is not close to done. Its default model now has up to 1M context on every plan, K3.1 Pro is one command away, and the harness deliberately mirrors enough Claude Code conventions that trying it costs little learning time.',
        },
        {
          type: 'paragraph',
          text: 'The practical answer for a lot of developers is to stop treating this as a binary choice. The two agents can share your repo\'s .mcp.json, and Kimi Code can import your Claude Code skills. Run Claude Code on the work you cannot afford to babysit, try Kimi Code on high-volume tasks where its pricing fits, and compare results on your own repository instead of on benchmarks.',
        },
      ],
    },
    {
      id: 'run-both-codeagentswarm',
      title: 'Run both side by side in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'This is exactly the setup <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> was built for. It is a desktop workspace (macOS, Windows and Linux) that runs multiple AI CLI terminals in parallel, and Kimi Code is a first-class agent in it alongside Claude Code, Codex CLI, Antigravity CLI, opencode and Grok Build.',
        },
        {
          type: 'list',
          items: [
            '<strong>Pick the agent per terminal</strong>: Claude Code in one, Kimi Code in the next, on the same project',
            '<strong>Desktop notifications</strong> when any agent finishes or needs an approval, so a silent Kimi hang does not eat your afternoon',
            '<strong>Live diffs per terminal</strong>, so you can audit what each model actually changed',
            '<strong>Searchable history across agents</strong>: every Claude and Kimi session in one search box',
            '<strong>Quota tracking</strong> that understands Kimi\'s quota windows, so you see the wall before you hit it',
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
      answer: 'It is heavily inspired by it, to the point of using the same internal tool names (Bash, Write, Edit, Read) and the same mcp__ naming for MCP tools. It is not a fork: it is its own open-source TypeScript codebase, with its own hook system and session format. Its default kimi-for-coding id currently serves K2.8 Preview, and K3.1 Pro is available with /model.',
    },
    {
      question: 'Does Kimi Code read CLAUDE.md?',
      answer: 'Not natively. Kimi Code follows the AGENTS.md convention instead: a global AGENTS.md in its config folder, the shared ~/.agents/AGENTS.md, and a per-project AGENTS.md. It ships an /import-from-cc-codex skill that migrates your Claude Code or Codex setup once, with confirmation.',
    },
    {
      question: 'Do Claude Code skills work in Kimi Code?',
      answer: 'Mostly yes, after one step. Kimi Code reads the shared ~/.agents/skills/ folder and its own skills folders, but not ~/.claude/skills, so run its /import-from-cc-codex skill or move cross-agent skills to ~/.agents/skills/. Its Claude-style tool names mean skills that reference Bash, Write or Edit behave as expected. Hooks are the exception: Claude hooks are JSON, Kimi hooks are TOML with different payloads, so those need rewriting.',
    },
    {
      question: 'Is Kimi Code cheaper than Claude Code?',
      answer: 'It depends on the model and the workload. Both companies publish per-token API rates on their official pricing pages, and Moonshot\'s K2 models, including K2.7 Code, are closed to new API accounts from October 31, 2026. Subscriptions are not directly comparable because their allowances and limits differ. See the Kimi Code pricing guide for the dated breakdown.',
    },
    {
      question: 'Can I run Kimi Code and Claude Code at the same time?',
      answer: 'Yes. They are separate processes, they can even share the same repo-level .mcp.json config, and running them in parallel is the fastest way to learn which model suits which task. CodeAgentSwarm runs both side by side in one workspace, with per-terminal diffs, notifications and searchable history.',
    },
    {
      question: 'Should I switch from Claude Code to Kimi Code?',
      answer: 'Switch outright, probably not yet: Kimi Code moves very fast and has rough edges on Windows and around silent hangs. Adding it alongside Claude Code can make sense: the learning cost is low, its default model has up to 1M context on every plan, and your MCP servers carry over while skills import in one step.',
    },
  ],
}

export default guide
