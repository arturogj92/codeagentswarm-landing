import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-k3-with-claude-code',
    locale: 'en',
    title: 'How to Use Kimi K3 with Claude Code: Full Setup Guide',
    metaTitle: 'Kimi K3 with Claude Code: Setup, Env Vars and Real Limits (2026)',
    metaDescription: 'Run Moonshot Kimi K3 inside Claude Code through the Anthropic-compatible endpoint. Both setups, the env vars that matter, and the limits nobody tells you about.',
    intro: `Moonshot shipped Kimi K3 on July 16, 2026, and the first question everyone asked was whether they could point Claude Code at it. The answer is yes. Moonshot ships an Anthropic-compatible endpoint, so Claude Code talks to Kimi K3 with a few environment variables and no new tool to learn. You keep the CLI you already know, your hooks, your MCP servers and your muscle memory, and you swap the model underneath.

This guide covers both ways to do it, because there are two different endpoints with two different auth variables and two different model ids, and mixing them up is the most common reason people end up staring at a 401. It also covers the part most posts skip: what stops working once you switch. Tool Search has to be off, WebFetch is gone, and on one of the two endpoints images stop working entirely. Those are real trade-offs and you should know them before you move a real project onto this.

Everything below was checked against Moonshot's official docs. Their CLI ships roughly one release a day right now, so treat their docs as the source of truth if something drifts.`,
    ctaText: 'Running Kimi K3 in one terminal and Claude in another is the fastest way to find out which model suits which job. CodeAgentSwarm runs both side by side, each in its own terminal, with live diffs, desktop notifications and searchable history across all of them.',
    highlightedWords: ['Kimi K3', 'Claude Code'],
    publishedAt: '2026-07-17',
    updatedAt: '2026-07-17',
    alternateSlug: 'kimi-k3-con-claude-code',
  },
  sections: [
    {
      id: 'what-is-kimi-k3',
      title: 'What Kimi K3 is, and why plug it into Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi K3 is Moonshot AI\'s flagship model, released on July 16, 2026. It is a 2.8 trillion parameter Mixture of Experts model with a 1,048,576 token context window and native vision. Moonshot markets it as the first open 3T-class model, and says the full weights land by July 27, 2026.',
        },
        {
          type: 'paragraph',
          text: 'The detail that matters most in daily use is that K3 always reasons. Right now <code>reasoning_effort</code> only accepts <code>max</code>, and there is no non-thinking variant. Moonshot has said low and high effort modes are coming, but at launch every request thinks at full depth. That makes it strong on hard problems and slow and expensive on easy ones.',
        },
        {
          type: 'paragraph',
          text: 'Pay-per-token pricing is $0.30 per million tokens for cache hits, $3.00 for cache misses and $15.00 for output, flat across the whole 1M context with no long-context surcharge. That 10x cache-hit discount matters a lot for an agent that resends a big repo context on every turn.',
        },
        {
          type: 'paragraph',
          text: 'So why run it through <a href="/en/guides/claude-code-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> instead of Moonshot\'s own CLI? Because Claude Code is a harness you have already configured. Your hooks, your MCP servers, your <code>CLAUDE.md</code>, your skills and your slash commands all keep working. Switching the model is an environment variable. Switching the harness is a weekend.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Do not confuse the model with the CLI. Kimi K3 is the model. Kimi Code CLI is Moonshot\'s own terminal agent, a separate product that competes with Claude Code. This guide is about running the K3 model inside Claude Code, which needs no new CLI at all.',
        },
      ],
    },
    {
      id: 'two-endpoints',
      title: 'Pick your endpoint first: subscription or pay per token',
      content: [
        {
          type: 'paragraph',
          text: 'This is the step people skip, and it is the reason most setup failures happen. Moonshot runs two separate Anthropic-compatible endpoints. They have different hosts, different auth variable names and different model ids. A key from one returns a 401 on the other. Decide which one you are on before you copy any config.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Option A: the Kimi Code subscription',
          id: 'option-subscription',
        },
        {
          type: 'paragraph',
          text: 'You pay a flat monthly fee and get a quota. The endpoint is <code>https://api.kimi.com/coding/</code>, you authenticate with <code>ANTHROPIC_API_KEY</code> using a key from the Kimi Code Console, and the model id is <code>k3[1m]</code>. Quota refreshes every 7 days from your subscription date and does not roll over, and there is also a rolling 5 hour rate window on top, so you can hit a wall even with quota left.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Option B: the Moonshot Open Platform',
          id: 'option-platform',
        },
        {
          type: 'paragraph',
          text: 'You pay per token with no monthly commitment. The endpoint is <code>https://api.moonshot.ai/anthropic</code>, you authenticate with <code>ANTHROPIC_AUTH_TOKEN</code> using a key from platform.kimi.ai, and the model id is <code>kimi-k3</code>. Rate limits are tiered by how much you have topped up in total, and the entry tier is genuinely unusable for agent work: at Tier 0 you get 1 concurrent request and 3 requests per minute. You need at least $10 of cumulative top-up to reach Tier 1 and its 50 concurrent requests.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The auth variable is different on purpose and they fight each other. The platform endpoint uses ANTHROPIC_AUTH_TOKEN, and Moonshot explicitly says to remove ANTHROPIC_API_KEY if you have one set, because the two conflict. If you have ever exported an Anthropic key in your shell profile, unset it before you test.',
        },
      ],
    },
    {
      id: 'setup-subscription',
      title: 'Setup A: Kimi K3 in Claude Code on a Kimi Code subscription',
      content: [
        {
          type: 'paragraph',
          text: 'Get a key from the Kimi Code Console, then export these before launching Claude Code:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'export ANTHROPIC_BASE_URL=https://api.kimi.com/coding/\nexport ANTHROPIC_API_KEY=your_kimi_code_key\nexport ANTHROPIC_MODEL="k3[1m]"\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1048576\nexport CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576\nexport CLAUDE_CODE_EFFORT_LEVEL=max',
        },
        {
          type: 'paragraph',
          text: 'Then run <code>claude</code> and type <code>/status</code>. The base URL it reports should be <code>https://api.kimi.com/coding/</code>. If it still shows Anthropic, your exports did not reach the process, which usually means you set them in a different shell than the one that launched the CLI.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The 1M context is gated by your plan. K3 gives you 256k on Moderato and the full 1M only on Allegretto and above. If you are on the cheaper tier and you copy CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576 anyway, you are telling Claude Code about a context window your plan does not grant, and Moonshot warns this causes premature compaction and errors. On Moderato, use 262144 instead.',
        },
        {
          type: 'paragraph',
          text: 'That gating is worth understanding before you subscribe, because the 1M context is the main selling point and it is not on the entry tier. Moonshot\'s own pages currently disagree about whether Kimi Code access starts at Moderato or at Allegretto, so check what your plan actually includes at checkout rather than trusting any table you read in a blog post, this one included.',
        },
      ],
    },
    {
      id: 'setup-platform',
      title: 'Setup B: Kimi K3 in Claude Code paying per token',
      content: [
        {
          type: 'paragraph',
          text: 'Get a key from platform.kimi.ai, make sure no <code>ANTHROPIC_API_KEY</code> is set, and export this:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'unset ANTHROPIC_API_KEY\n\nexport ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic\nexport ANTHROPIC_AUTH_TOKEN=your_platform_key\nexport ANTHROPIC_MODEL=kimi-k3\nexport ANTHROPIC_DEFAULT_OPUS_MODEL=kimi-k3\nexport ANTHROPIC_DEFAULT_SONNET_MODEL=kimi-k3\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL=kimi-k3\nexport CLAUDE_CODE_SUBAGENT_MODEL=kimi-k3\nexport ENABLE_TOOL_SEARCH=false\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1048576',
        },
        {
          type: 'paragraph',
          text: 'The three <code>ANTHROPIC_DEFAULT_*</code> lines matter more than they look. Claude Code picks different models for different jobs, and if you only set <code>ANTHROPIC_MODEL</code> it can still try to reach for a Haiku or Sonnet id that does not exist on Moonshot\'s endpoint. Pointing all of them at <code>kimi-k3</code>, plus <code>CLAUDE_CODE_SUBAGENT_MODEL</code> for subagents, keeps every internal call on the same model.',
        },
        {
          type: 'paragraph',
          text: 'Once it runs, remember the tier ladder is keyed to your cumulative top-up, not to a plan you choose. Tier 0 at 3 requests per minute will make an agentic session feel broken rather than slow, so if you are testing this seriously, top up to at least Tier 1 first.',
        },
      ],
    },
    {
      id: 'what-breaks',
      title: 'What stops working: the honest list',
      content: [
        {
          type: 'paragraph',
          text: 'An Anthropic-compatible endpoint is compatible, not identical. Some Claude Code features do not survive the switch, and it is better to know now than to debug it at midnight.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Tool Search has to be off, and it is not optional',
          id: 'tool-search-off',
        },
        {
          type: 'paragraph',
          text: 'Moonshot\'s docs say the endpoint does not support Tool Search yet and that it must be set to <code>false</code>. That reads like a nice-to-have until you see what happens if you ignore it: there is an open report where <code>tool_reference</code> messages poison the session on the subscription endpoint and every follow-up request fails with a persistent HTTP 400. The session never recovers. Your only way out is starting a new one. Set <code>ENABLE_TOOL_SEARCH=false</code> and leave it.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'WebFetch is gone',
          id: 'no-webfetch',
        },
        {
          type: 'paragraph',
          text: 'WebFetch is not currently available on the Kimi endpoint. If your workflow leans on the agent reading docs pages on its own, it will quietly lose that tool. Nothing errors loudly, the capability just is not there.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Images depend on which endpoint you chose',
          id: 'images-asymmetry',
        },
        {
          type: 'paragraph',
          text: 'This one is a real fork in the road. The subscription endpoint at api.kimi.com/coding does not accept image input at all. There is an open request about it, and Claude Code, Roo Code and Cursor are all named as unable to pass images through. So if you paste a screenshot into your agent as part of your normal loop, that stops working on Option A.',
        },
        {
          type: 'paragraph',
          text: 'The pay-per-token platform endpoint does support vision, because K3 is natively multimodal. But it only accepts base64 or <code>ms://</code> file ids, never public image URLs. So images survive on Option B, with a caveat.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If screenshots are part of how you work, that alone decides your endpoint. Pay per token keeps your images, the subscription does not.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Every request thinks, and you pay for it',
          id: 'always-thinking',
        },
        {
          type: 'paragraph',
          text: 'Because K3 only supports max reasoning effort today, cheap questions cost real money. Simon Willison\'s launch test spent 13,241 reasoning tokens to produce 3,417 tokens of answer, and called it out as expensive. For a coding agent that fires a lot of small tool calls, this adds up in a way a raw price-per-token comparison hides.',
        },
      ],
    },
    {
      id: 'side-by-side',
      title: 'Run Kimi K3 and Claude side by side instead of choosing',
      content: [
        {
          type: 'image',
          alt: 'The CodeAgentSwarm agent picker where you choose which AI CLI runs in each terminal',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Each terminal in CodeAgentSwarm carries its own agent and its own environment, so a Kimi K3 terminal and a Claude terminal can run in the same window on the same repo.',
        },
        {
          type: 'paragraph',
          text: 'The honest answer to "is Kimi K3 better than Claude for my work" is that nobody knows yet. K3 is days old, every quality signal in circulation is a first impression, and the thing that actually matters for a coding agent, reliable tool calling as a conversation gets long, has no public data behind it at all. Willison made exactly that point at launch: the benchmarks going around do not touch it.',
        },
        {
          type: 'paragraph',
          text: 'Which means the only useful test is your own repo, your own tasks, both models, at the same time. That is awkward with one terminal, because the setup is a set of environment variables you have to keep swapping. It stops being awkward when each terminal owns its own agent and its own environment.',
        },
        {
          type: 'paragraph',
          text: 'That is what <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> does. You give one terminal the Kimi env and one terminal your normal Claude setup, point both at the same task, and watch. Every terminal gets live diffs of what its agent touched, a desktop notification when it needs you, and searchable history afterwards, so comparing two runs is reading two histories instead of trusting your memory of what happened twenty minutes ago.',
        },
        {
          type: 'paragraph',
          text: 'If you want the wider picture, the <a href="/en/guides/claude-code-vs-cursor-vs-codex" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code vs Cursor vs Codex</a> comparison covers how the harnesses differ, and <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> covers the parallel workflow this builds on.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting the setup',
      content: [
        {
          type: 'list',
          items: [
            '<strong>401 Unauthorized</strong>: you are almost certainly using a key from the wrong platform. Keys from platform.kimi.ai and platform.kimi.com are completely independent, and a key from one returns 401 on the other. Same story if you mix a Kimi Code Console key with the platform endpoint.',
            '<strong>/status still shows the Anthropic base URL</strong>: your exports did not reach the process. Export them in the same shell that launches the CLI, or put them in your shell profile and open a new terminal.',
            '<strong>Persistent HTTP 400 that never recovers</strong>: this is the Tool Search bug. Set ENABLE_TOOL_SEARCH=false and start a fresh session, because a poisoned session stays poisoned.',
            '<strong>Context gets compacted way too early</strong>: your context setting does not match what your plan grants. On Moderato use 262144, not 1048576.',
            '<strong>Both an API key and an auth token set</strong>: on the platform endpoint, unset ANTHROPIC_API_KEY. Moonshot documents the conflict explicitly.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I use Kimi K3 with Claude Code?',
      answer: 'Yes. Moonshot ships an Anthropic-compatible endpoint, so Claude Code talks to Kimi K3 with only environment variables and no new CLI. Set ANTHROPIC_BASE_URL to https://api.kimi.com/coding/ with a Kimi Code subscription key, or to https://api.moonshot.ai/anthropic with a pay-per-token platform key, then set ANTHROPIC_MODEL to k3[1m] or kimi-k3 respectively.',
    },
    {
      question: 'Why do I get a 401 when using my Kimi key with Claude Code?',
      answer: 'Almost always because the key and the endpoint do not match. Moonshot runs two independent platforms, and a key from platform.kimi.ai returns 401 on platform.kimi.com and the other way around. The subscription endpoint also uses ANTHROPIC_API_KEY while the pay-per-token endpoint uses ANTHROPIC_AUTH_TOKEN, and Moonshot says to unset ANTHROPIC_API_KEY on the platform endpoint because the two conflict.',
    },
    {
      question: 'Does Kimi K3 support the full 1M context in Claude Code?',
      answer: 'Only on the right plan. K3 gives 256k context on Moderato and the full 1,048,576 tokens on Allegretto and above. Setting CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576 on a plan that only grants 256k causes premature compaction and errors, so use 262144 on the lower tier.',
    },
    {
      question: 'What does not work when running Kimi K3 in Claude Code?',
      answer: 'Tool Search must be disabled with ENABLE_TOOL_SEARCH=false, and ignoring that can poison a session into permanent HTTP 400 errors. WebFetch is not available on the Kimi endpoint. Images are not supported at all on the subscription endpoint, and on the pay-per-token endpoint they work only as base64 or ms:// file ids, never as public URLs.',
    },
    {
      question: 'Is Kimi K3 cheaper than Claude for coding?',
      answer: 'Per token it looks much cheaper at $0.30 per million for cache hits, $3.00 for cache misses and $15.00 for output. But K3 only supports max reasoning effort right now, so every request thinks at full depth and burns reasoning tokens even on simple questions. The real cost depends on your workload, which is why running it in one terminal next to your normal setup for a few days tells you more than any price table.',
    },
    {
      question: 'Is Kimi K3 the same thing as Kimi Code CLI?',
      answer: 'No. Kimi K3 is the model, and you can run it inside Claude Code as this guide describes. Kimi Code CLI is Moonshot\'s own terminal agent, a separate product that competes with Claude Code and has its own config, hooks and sessions. You do not need it to use K3.',
    },
  ],
}

export default guide
