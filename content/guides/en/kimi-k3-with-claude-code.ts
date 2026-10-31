import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-k3-with-claude-code',
    locale: 'en',
    title: 'How to Use Kimi K3 with Claude Code: Full Setup Guide',
    metaTitle: 'Kimi K3 with Claude Code: Setup, Env Vars and Real Limits (2026)',
    metaDescription: 'Run Moonshot Kimi K3 inside Claude Code through the Anthropic-compatible endpoint. Both setups, the env vars that matter, and the limits nobody tells you about.',
    intro: `Moonshot shipped Kimi K3 on July 16, 2026, and the first question everyone asked was whether they could point Claude Code at it. The answer is yes, and on October 23, 2026 the same question came back with K3.1 Pro. Moonshot ships an Anthropic-compatible endpoint, so Claude Code talks to Kimi K3 with a few environment variables and no new tool to learn. You keep the CLI you already know, your hooks, your MCP servers and your muscle memory, and you swap the model underneath.

This guide covers both ways to do it, because there are two different endpoints with two different auth variables and two different model ids, and mixing them up is the most common reason people end up staring at a 401. It also covers the part most posts skip: what changes once you switch. Tool Search is better off, WebFetch may not work, and image support depends on the model and endpoint you pick. Those are real trade-offs and you should know them before you move a real project onto this.

Everything below was rechecked against Moonshot's official docs in October 2026. Their models and plans change often, so treat their docs as the source of truth if something drifts.`,
    ctaText: 'Running Kimi K3 in one terminal and Claude in another is the fastest way to find out which model suits which job. CodeAgentSwarm runs both side by side, each in its own terminal, with live diffs, desktop notifications and searchable history across all of them.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Kimi K3', 'Claude Code'],
    publishedAt: '2026-07-17',
    updatedAt: '2026-10-31',
    alternateSlug: 'kimi-k3-con-claude-code',
  },
  sections: [
    {
      id: 'what-is-kimi-k3',
      title: 'What Kimi K3 is, and why plug it into Claude Code',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi K3 is the Moonshot AI model released on July 16, 2026: a 2.8 trillion parameter Mixture of Experts model with a 1,048,576 token context window, native vision and open weights. On October 23, 2026 Moonshot followed it with K3.1 Pro, a post-trained version of K3 with the same 1M window, and now calls K3 its previous-generation flagship. Everything in this guide works with both; only the model id changes.',
        },
        {
          type: 'paragraph',
          text: 'The detail that matters most in daily use is that K3 always reasons. At launch <code>reasoning_effort</code> only accepted <code>max</code>. Moonshot has since added <code>low</code> and <code>high</code>, and K3.1 Pro offers the same three levels. Thinking cannot be turned off on K3.1 Pro: requests without it are rejected. Inside Claude Code you switch level with <code>/effort</code>, as Moonshot\'s <a href="https://www.kimi.com/code/docs/en/third-party-tools/claude-code.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code setup page</a> explains.',
        },
        {
          type: 'paragraph',
          text: 'Pay-per-token rates for K3 and K3.1 Pro are on Moonshot\'s <a href="https://platform.kimi.ai/docs/pricing/chat" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official pricing page</a>. Context caching is automatic and cache hits are billed at the cheaper cached-input price, which matters a lot for an agent that resends a big repo context on every turn.',
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
        {
          type: 'paragraph',
          text: 'If you do want to try Moonshot\'s own CLI instead, we cover it separately: <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">how to install and use Kimi Code</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">what each Kimi plan actually includes</a>, and the head to head <a href="/en/guides/kimi-code-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code vs Claude Code</a>. You also do not have to pick one harness: CodeAgentSwarm runs Kimi Code as a first-class agent next to Claude Code, one terminal on each, on the same project.',
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
          text: 'You pay a flat monthly fee and get a quota. The endpoint is <code>https://api.kimi.ai/coding/</code> (<code>https://api.kimi.com/coding/</code> for accounts in mainland China), you authenticate with <code>ANTHROPIC_API_KEY</code> using a key from the Kimi Code Console, and the model id is <code>k3.1-pro</code>, or <code>k3.1-pro[1m]</code> for the full 1M window (<code>k3</code> and <code>k3[1m]</code> still work for K3). On the plans Moonshot launched in October 2026 the weekly quota is gone: a rolling 5 hour rate window and the membership\'s monthly total remain. Legacy plans keep the 7 day refresh. The <a href="https://www.kimi.com/code/docs/en/kimi-code/membership.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">membership page</a> has the current rules.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Option B: the Moonshot Open Platform',
          id: 'option-platform',
        },
        {
          type: 'paragraph',
          text: 'You pay per token with no monthly commitment. The endpoint is <code>https://api.moonshot.ai/anthropic</code>, you authenticate with <code>ANTHROPIC_AUTH_TOKEN</code> using a key from platform.kimi.ai, and Moonshot\'s own <a href="https://platform.kimi.ai/docs/guide/claude-code-kimi" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code example</a> uses <code>kimi-k3[1m]</code>. Flagship models unlock after a minimum $1 top-up, and your cumulative top-up sets your account tier, which decides concurrency and requests per minute. The low tiers are tight for agent work, so read the <a href="https://platform.kimi.ai/docs/pricing/limits" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Recharge and Rate Limits</a> page before you judge the speed.',
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
          code: 'export ANTHROPIC_BASE_URL=https://api.kimi.ai/coding/\nexport ANTHROPIC_API_KEY=your_kimi_code_key\nexport ANTHROPIC_MODEL="k3.1-pro[1m]"\nexport ANTHROPIC_DEFAULT_OPUS_MODEL=$ANTHROPIC_MODEL\nexport ANTHROPIC_DEFAULT_SONNET_MODEL=$ANTHROPIC_MODEL\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL=$ANTHROPIC_MODEL\nexport ANTHROPIC_DEFAULT_FABLE_MODEL=$ANTHROPIC_MODEL\nexport CLAUDE_CODE_SUBAGENT_MODEL=$ANTHROPIC_MODEL\nexport CLAUDE_CODE_EFFORT_LEVEL=high\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1048576\nexport CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576',
        },
        {
          type: 'paragraph',
          text: 'Then run <code>claude</code> and type <code>/status</code>. The base URL it reports should be <code>https://api.kimi.ai/coding/</code>. If it still shows Anthropic, your exports did not reach the process, which usually means you set them in a different shell than the one that launched the CLI.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The 1M context is gated by your plan. K3.1 Pro and K3 give you 262,144 tokens on Plus (legacy Moderato) and the full 1M only on Pro (legacy Allegretto) and above. On the lower tier, drop the <code>[1m]</code> suffix and set both context variables to 262144. If you tell Claude Code about a window your plan does not grant, Moonshot warns you get context overflow errors; set it too small and it compacts too early.',
        },
        {
          type: 'paragraph',
          text: 'That gating is worth understanding before you subscribe, because the 1M context is a main selling point and it is not on the entry coding tier. Moonshot renamed its plans in October 2026 (Plus and Pro replace Moderato and Allegretto for new members, and Go has no coding quota at all), so check the official <a href="https://www.kimi.com/code/docs/en/kimi-code/membership.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">membership page</a> at checkout rather than any table in a blog post, this one included.',
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
          code: 'unset ANTHROPIC_API_KEY\n\nexport ANTHROPIC_BASE_URL=https://api.moonshot.ai/anthropic\nexport ANTHROPIC_AUTH_TOKEN=your_platform_key\nexport ANTHROPIC_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_OPUS_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_SONNET_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_HAIKU_MODEL="kimi-k3[1m]"\nexport ANTHROPIC_DEFAULT_FABLE_MODEL="kimi-k3[1m]"\nexport CLAUDE_CODE_SUBAGENT_MODEL="kimi-k3[1m]"\nexport CLAUDE_CODE_EFFORT_LEVEL=max\nexport CLAUDE_CODE_AUTO_COMPACT_WINDOW=1000000\nexport ENABLE_TOOL_SEARCH=false',
        },
        {
          type: 'paragraph',
          text: 'The <code>ANTHROPIC_DEFAULT_*</code> lines matter more than they look. Claude Code picks different models for different jobs, and if you only set <code>ANTHROPIC_MODEL</code> it can still reach for a Haiku or Sonnet id that does not exist on Moonshot\'s endpoint. Pointing all of them at the same Kimi model, plus <code>CLAUDE_CODE_SUBAGENT_MODEL</code> for subagents, keeps every internal call working. Moonshot\'s example routes the Haiku tier to <code>kimi-k2.7-code</code>, but K2 models are closed to new platform accounts from October 31, 2026 and are planned for retirement by the end of December, so this setup keeps every tier on K3.',
        },
        {
          type: 'paragraph',
          text: 'Once it runs, remember that platform limits follow your cumulative top-up, not a plan you choose. If an agent session feels broken rather than slow, check your tier on the <a href="https://platform.kimi.ai/docs/pricing/limits" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Recharge and Rate Limits</a> page before you blame the model.',
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
          text: 'Keep Tool Search off',
          id: 'tool-search-off',
        },
        {
          type: 'paragraph',
          text: 'Tool Search is the setting to watch. Since Claude Code v2.1.304, tool search is on by default when <code>ANTHROPIC_BASE_URL</code> points to a gateway, so requests carry <code>defer_loading</code> fields and <code>tool_reference</code> blocks that a non-Anthropic endpoint may not accept (<a href="https://code.claude.com/docs/en/mcp" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code MCP docs</a>). Newer versions retry without tool search after an unrecognized 400, at the cost of an extra rejected request. Setting <code>ENABLE_TOOL_SEARCH=false</code> loads every MCP tool upfront and skips those failed requests. There is also an open user report on Moonshot\'s tracker of subscription-endpoint sessions stuck on HTTP 400 after <code>tool_reference</code> blocks. It is unconfirmed, but the explicit <code>false</code> in the setup above costs you nothing.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'WebFetch errors out',
          id: 'no-webfetch',
        },
        {
          type: 'paragraph',
          text: 'Earlier versions of Moonshot\'s FAQ said WebFetch was not available on the Kimi endpoint and returned a "temporarily unavailable" error or no content. The current Kimi Code FAQ no longer mentions it, and we could not confirm whether the limitation still applies. Test one WebFetch call on your endpoint before you rely on it. If it fails, paste the page content into the chat or use an MCP scraping tool.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Images depend on which endpoint you chose',
          id: 'images-asymmetry',
        },
        {
          type: 'paragraph',
          text: 'This one is murkier than most posts make it sound. There is an open request asking Moonshot to support image input on the subscription endpoint from third-party tools, and it names Claude Code, Roo Code and Cursor as affected. But that is a single user request with no official reply, and the real-world evidence cuts against a total block: there are documented sessions of that same endpoint decoding base64 PNG and JPEG just fine, with only webp and gif rejected. When a third-party client cannot get images through, the culprit tends to be on the client side, not the endpoint refusing images outright.',
        },
        {
          type: 'paragraph',
          text: 'The pay-per-token platform endpoint documents vision, because K3 and K3.1 Pro are natively multimodal. Its vision guide shows base64 images and files uploaded by file id (<code>ms://</code> ids). If a pasted image fails in Kimi\'s own tools, the FAQ says the current model lacks image input and you should switch to a vision-capable one.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If screenshots are part of how you work, test image paste with your own client on your chosen endpoint before committing. The platform endpoint has documented vision support; the subscription endpoint is where third-party image reports get murky.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Every request thinks, and you pay for it',
          id: 'always-thinking',
        },
        {
          type: 'paragraph',
          text: 'At launch K3 only supported max reasoning effort, and cheap questions cost real money: Simon Willison\'s launch test spent 13,241 reasoning tokens to produce 3,417 tokens of answer. Now that low and high exist, set the level per task with <code>/effort</code>. Moonshot\'s subscription guide recommends high for K3.1 Pro and K3. For a coding agent that fires a lot of small tool calls, effort adds up in a way a raw price-per-token comparison hides.',
        },
      ],
    },
    {
      id: 'side-by-side',
      title: 'Run Kimi K3 and Claude side by side instead of choosing',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: 'The honest answer to "is Kimi K3 better than Claude for my work" is that benchmarks will not tell you. Every model release comes with its own charts, and the thing that actually matters for a coding agent, reliable tool calling as a conversation gets long, rarely shows up in them. Willison made exactly that point at K3\'s launch.',
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
            '<strong>Persistent HTTP 400 that never recovers</strong>: set ENABLE_TOOL_SEARCH=false. Since Claude Code v2.1.304 tool search is on by default behind a custom ANTHROPIC_BASE_URL, and a non-Anthropic endpoint may reject its tool_reference blocks. Then start a fresh session.',
            '<strong>Context gets compacted way too early or overflows</strong>: your context setting does not match what your plan grants. On Plus or legacy Moderato use 262144, not 1048576.',
            '<strong>Both an API key and an auth token set</strong>: on the platform endpoint, unset ANTHROPIC_API_KEY. Moonshot documents the conflict explicitly.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I use Kimi K3 with Claude Code?',
      answer: 'Yes. Moonshot ships Anthropic-compatible endpoints, so Claude Code talks to Kimi K3 or K3.1 Pro with only environment variables and no new CLI. With a Kimi Code subscription key, set ANTHROPIC_BASE_URL to https://api.kimi.ai/coding/ (https://api.kimi.com/coding/ in mainland China) and ANTHROPIC_MODEL to k3.1-pro or k3. With a pay-per-token platform key, use https://api.moonshot.ai/anthropic and kimi-k3[1m].',
    },
    {
      question: 'Why do I get a 401 when using my Kimi key with Claude Code?',
      answer: 'Almost always because the key and the endpoint do not match. Moonshot runs two independent platforms, and a key from platform.kimi.ai returns 401 on platform.kimi.com and the other way around. The subscription endpoint also uses ANTHROPIC_API_KEY while the pay-per-token endpoint uses ANTHROPIC_AUTH_TOKEN, and Moonshot says to unset ANTHROPIC_API_KEY on the platform endpoint because the two conflict.',
    },
    {
      question: 'Does Kimi K3 support the full 1M context in Claude Code?',
      answer: 'Only on the right plan. K3.1 Pro and K3 give 262,144 tokens on Plus (legacy Moderato) and the full 1,048,576 tokens on Pro (legacy Allegretto) and above. Setting CLAUDE_CODE_MAX_CONTEXT_TOKENS=1048576 on a plan that only grants 256K causes context errors, so use 262144 and the model id without [1m] on the lower tier.',
    },
    {
      question: 'What does not work when running Kimi K3 in Claude Code?',
      answer: 'Set ENABLE_TOOL_SEARCH=false: since Claude Code v2.1.304 tool search is on by default behind a custom base URL, and a non-Anthropic endpoint may reject its tool_reference blocks. Older Moonshot FAQs said WebFetch was unavailable on the Kimi endpoint; the current FAQ no longer says so, so test it once. Image input works only with vision-capable models, and the platform endpoint documents base64 images and ms:// file ids.',
    },
    {
      question: 'Is Kimi K3 cheaper than Claude for coding?',
      answer: 'It depends on your workload. Moonshot publishes per-token rates for K3 and K3.1 Pro on its official pricing page, and cache hits are billed at a lower price. Reasoning effort matters as much as the rate: at launch K3 only supported max effort, while K3 and K3.1 Pro now offer low, high and max. Running it in one terminal next to your normal setup for a few days tells you more than any price table.',
    },
    {
      question: 'Is Kimi K3 the same thing as Kimi Code CLI?',
      answer: 'No. Kimi K3 is the model, and you can run it inside Claude Code as this guide describes. Kimi Code CLI is Moonshot\'s own terminal agent, a separate product that competes with Claude Code and has its own config, hooks and sessions. You do not need it to use K3.',
    },
  ],
}

export default guide
