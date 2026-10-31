import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-plans-and-pricing',
    locale: 'en',
    title: 'Antigravity Plans and Pricing: Free Tier, Rate Limits and Parallel Agents',
    metaTitle: 'Antigravity Pricing 2026: Free, Pro, Ultra and Rate Limits',
    metaDescription: 'Antigravity pricing: free tier, Plus $4.99, Pro $19.99, Ultra 5x $99.99, 20x $199.99. Plus what several agy sessions at once do to the weekly limit.',
    intro: `Antigravity does not have its own subscription. Access rides on a Google AI plan, and as of October 31, 2026 that means: a free tier, Google AI Plus at $4.99/month, Google AI Pro at $19.99, Google AI Ultra 5x at $99.99, Google AI Ultra 20x at $199.99, and an organisation route through Google Cloud.

The free tier is the story here. Unlike <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, which is not on its free tier at all, Antigravity's free plan gives you access to a variety of agent models, unlimited tab completions and unlimited command requests, gated by weekly rate limits rather than by feature. You can do real work on it without paying.

There is a catch worth knowing before you build a workflow around it, and it is not a subtle one: <strong>Google has cut the free limits repeatedly since launch</strong>. This guide covers the tiers, what the free plan currently allows, how the credit pool works, and how much of that you should treat as stable.`,
    ctaText: 'Antigravity meters you on rate limits rather than a bill, so knowing how close you are matters. CodeAgentSwarm reads Antigravity\'s real quota and shows it per terminal, alongside every other agent you run.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'planes-y-precios-de-antigravity',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity access is bundled into Google AI subscriptions rather than sold separately. As of October 31, 2026 the US ladder looks like this:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'What changes'],
          rows: [
            ['Individual (free)', '$0', 'A variety of agent models, basic weekly rate limits'],
            ['Google AI Plus', '$4.99/month', 'Limited agent requests, same models as free'],
            ['Google AI Pro', '$19.99/month', 'Expanded rate limits, Gemini 4 Argon, Claude Opus and Sonnet 5.5, flexible credit pool'],
            ['Google AI Ultra 5x', '$99.99/month', 'Higher agent requests'],
            ['Google AI Ultra 20x', '$199.99/month', 'Highest agent requests'],
            ['Organisation', 'Via Google Cloud', 'Standard or Plus seats from $30/month, or pay as you go with no seat fee'],
          ],
          caption: 'Antigravity access tiers from antigravity.google/pricing, the Antigravity model docs and Google\'s US AI plans page, verified October 31, 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Google does not publish the monthly prices on the Antigravity pricing page itself, which lists the tiers and their features but leaves the numbers to the <a href="https://one.google.com/intl/en_us/about/google-ai-plans/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Google AI plans page</a>. The figures above are the US prices shown there on October 31, 2026. Verify them in your own Google account before paying: prices vary by country, and Google has repriced this ladder more than once.',
        },
        {
          type: 'paragraph',
          text: 'The live Google One ladder now names the two top plans Google AI Ultra 5x and Google AI Ultra 20x. Older comparisons may call the $200 tier Ultra Max or quote $250; use the current Google account checkout before buying.',
        },
        {
          type: 'paragraph',
          text: 'Google now describes Antigravity access as limited, expanded, higher and highest across the ladder. That wording is relative rather than a published request count, so choose a plan from the usage shown in your account instead of converting the 5x and 20x plan names into invented quotas.',
        },
      ],
    },
    {
      id: 'free-tier',
      title: 'The free tier: what it allows, and what has been taken away',
      content: [
        {
          type: 'paragraph',
          text: 'The free plan is unusually generous on paper. According to the <a href="https://antigravity.google/docs/models" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity model docs</a>, free and Plus users get <strong>Gemini 3.8 Flash</strong>, plus Claude Sonnet 4.6, Claude Opus 4.6 and GPT-OSS 120B until Google removes those three on November 2, 2026. Tab completions and command requests are unlimited. The gate is weekly rate limits on agent requests, not a feature wall.',
        },
        {
          type: 'paragraph',
          text: 'That combination is genuinely unusual, at least until November 2. Gemini 4 Argon and the Claude 5.5 models need Google AI Pro or higher, so after the removal the free tier keeps a Flash model only. For evaluating whether an agentic workflow suits you at all, it is still one of the best free options in the category.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Free tier limits have been cut repeatedly since Antigravity launched in November 2025, and the reductions have been steep rather than incremental. Whatever the current daily or weekly request allowance is when you read this, treat it as a snapshot rather than a commitment, and do not build a team workflow that depends on the free tier staying where it is.',
        },
        {
          type: 'paragraph',
          text: 'The honest way to read that history: Google is still finding the sustainable level for giving away frontier-model agent access, and it has adjusted downward each time it found the answer was "less than this". That is not a criticism of the product, it is a reason to plan for the free tier shrinking rather than growing.',
        },
        {
          type: 'paragraph',
          text: 'The practical consequence for anyone running several agents: the free tier is sized for one person driving one agent thoughtfully. It is not sized for the parallel-agent pattern, and you will notice that within a session.',
        },
      ],
    },
    {
      id: 'credits',
      title: 'The credit pool: what happens past the included quota',
      content: [
        {
          type: 'paragraph',
          text: 'Google documents extra AI credits for Pro and Ultra users after the included quota runs out. The amount deducted follows standard API pricing and varies by model and task complexity, so there is no reliable flat $0.01 conversion for every Antigravity request.',
        },
        {
          type: 'paragraph',
          text: 'This puts Antigravity in the same broad category as <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> and paid Claude plans: you can fund work beyond the included quota instead of always waiting for a reset. Whether that is good news depends on whether you budgeted for it.',
        },
        {
          type: 'paragraph',
          text: 'The rule of thumb transfers too: if you are buying credits regularly, the next tier up is almost certainly cheaper than the habit. Credits are priced for convenience, not for volume.',
        },
        {
          type: 'paragraph',
          text: 'The free tier has no credit pool. When the free rate limits are exhausted, you wait.',
        },
      ],
    },
    {
      id: 'parallel-agents',
      title: 'What running several Antigravity sessions at once does to the cost',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity meters you on weekly rate limits rather than on a running bill, so parallel agents do not produce a bigger invoice. They produce an earlier wall. Every agy session draws from the same account allowance, so the limit arrives in proportion to how many of them are actually working.',
        },
        {
          type: 'paragraph',
          text: 'What happens at that wall depends on your plan. Pro and Ultra can keep going on the credit pool, which follows standard API pricing and varies by model and task complexity. The free tier has no credit pool at all, so when the weekly limits are exhausted every session stops and you wait for the reset.',
        },
        {
          type: 'table',
          headers: ['Sessions at once', 'What to expect', 'What to watch'],
          rows: [
            ['1', 'This is roughly what the free tier is sized for: one person driving one agent thoughtfully.', 'Little. You feel the weekly rate limits only in a heavy week.'],
            ['2 to 3', 'The weekly rate limits arrive around two to three times sooner than with a single session.', 'On the free tier this is where the limits start to bite mid-session, with no credits to fall back on.'],
            ['4 or more', 'The parallel-agent pattern is not what the free tier is sized for, and you notice it inside a single session.', 'On Pro and Ultra the overflow lands on credits priced by model and task complexity, so budget for them or move up a tier.'],
          ],
          caption: 'A rule of thumb, not a published quota. Google describes Antigravity access relatively rather than as a request count, so check the usage shown in your own account.',
        },
        {
          type: 'paragraph',
          text: 'How to split work across those sessions is in <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity agent swarm guide</a>, and the setup itself is in <a href="/en/guides/run-multiple-antigravity-cli-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">how to run multiple Antigravity CLI sessions</a>.',
        },
      ],
    },
    {
      id: 'quota-visibility',
      title: 'The visibility problem, and one thing it breaks',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity is metered on rate limits rather than on a running bill, which makes knowing your position more important than it is on a pay-per-token agent. Running out is a stop, not a charge.',
        },
        {
          type: 'paragraph',
          text: 'There is a specific gotcha here worth flagging, because it costs people real debugging time. Antigravity exposes its state through a local language server, and <strong>a logged-out session is externally indistinguishable from a session that is not running at all</strong>. Any tool reading that state, including Antigravity\'s own integrations, will report "not running" when the truthful answer is "running, but your credentials expired".',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If your quota display suddenly reports Antigravity as off while you can see the agent working in front of you, check whether you are still logged in before you go looking for a bug. That failure mode is by far the most common cause, and it is invisible from the outside.',
        },
        {
          type: 'paragraph',
          text: 'The same architecture makes quota reading platform-sensitive: the discovery mechanism that finds the local server differs between macOS, Linux and Windows, and tooling that assumes Unix process utilities will simply report nothing on Windows rather than failing loudly. If quota shows on one of your machines and not another, that is usually the reason rather than an account problem.',
        },
      ],
    },
    {
      id: 'vs-others',
      title: 'How Antigravity pricing compares',
      content: [
        {
          type: 'paragraph',
          text: 'Put side by side with the other CLIs in this category, Antigravity occupies a clear position at the entry end and a less distinctive one above it.',
        },
        {
          type: 'list',
          items: [
            '<strong>Against Claude Code</strong>: Antigravity wins decisively at $0, because Claude Code has no free tier at all. At $20 against $20 the comparison becomes about the models and the agent rather than the price.',
            '<strong>Against Codex</strong>: similar structure, both metered with a credit top-up. Google AI Plus at $4.99 undercuts Codex Go at $8, but Plus only gets limited agent requests; Antigravity also wins on the free tier.',
            '<strong>Against <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a></strong>: different philosophies entirely. Antigravity gives you a bounded free allowance with no bill; OpenCode gives you an unbounded bill with no wall. Bursty work suits OpenCode, predictable work suits Antigravity.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The genuinely useful takeaway is that <strong>Antigravity is the best free option and a middling paid one</strong>. Use the free tier to evaluate agentic coding without committing to anything, and make the paid decision on the merits of the agent rather than on price, because around $20 and $100 the whole category charges roughly the same.',
        },
        {
          type: 'table',
          headers: ['Agent', 'Free tier', 'Cheapest paid', 'Top individual tier', 'How you are billed'],
          rows: [
            ['Claude Code', 'No (Free plan has no Claude Code)', 'Pro, $20/month', 'Ultra, $200/month', 'Claude plan with 5 hour and weekly limits (verified Ultra accounts have no 5 hour limit); API tokens optional'],
            ['Codex CLI', 'Limited', 'Go, $8/month', 'Pro, $500/month', 'ChatGPT plan shared across the CLI, web and IDE; API tokens optional'],
            ['Kimi Code', 'CLI is free, model usage is not', 'Plus, ¥99/month', 'Ultra, ¥1,399/month', 'Membership credits plus a 5 hour Kimi Code limit; API per token'],
            ['OpenCode', 'CLI is free and open source', 'OpenCode Go, $10/month', 'Go Plus, $40/month', 'Your own provider key, prepaid Console credits per token, or a Go subscription'],
            ['Antigravity', 'Yes, with weekly rate limits', 'Google AI Plus, $4.99/month', 'Google AI Ultra 20x, $199.99/month', 'Google AI plan with rate limits and credits'],
            ['Grok Build', 'Yes, limited usage', 'X Subscription Plus, $8/month', 'X Subscription Ultra, $200/month', 'X Subscription pool shared with Grok and Cursor; API per token'],
            ['Cursor Agent', 'Free, limited usage', 'Plus, $8/month', 'Ultra, $200/month', 'Weekly pool for Cursor models; third-party models billed by usage'],
          ],
          caption: 'Entry and top tiers per agent CLI, all verified October 31, 2026. Prices change often; each linked guide carries its own verification date.',
        },
        {
          type: 'paragraph',
          text: 'Every number in that table has its own page with the full tier list and the fine print: <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/en/guides/grok-build-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> and <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
        },
      ],
    },
    {
      id: 'watching-quota',
      title: 'Watching Antigravity quota while agents run',
      content: [
        {
          type: 'paragraph',
          text: 'On a rate-limited plan, the wall arrives without warning and stops the agent mid-task. With one terminal that is an interruption. With several it means working out which sessions stopped, where each one got to, and whether any of them left a change half-applied.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace for running several AI CLI agents in parallel, reads Antigravity\'s real quota from its local endpoint and shows it alongside your other agents\' usage, with the platform-specific discovery handled for you on macOS and Windows. You see the wall approaching while the agents work.',
        },
        {
          type: 'paragraph',
          text: 'It pairs with the mitigation that actually works on a free or Pro plan: keep a second agent on a different meter for overflow. Antigravity, Claude and Codex bill from entirely separate pools, so exhausting one rarely stops the session, which is the pattern in <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity agent swarm guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Antigravity free?',
      answer: 'Yes, genuinely. The free tier gives access to a variety of agent models, unlimited tab completions and unlimited command requests, gated by weekly rate limits rather than by feature. It is the most usable free tier in this category, though the limits have been reduced repeatedly since launch.',
    },
    {
      question: 'How much does Antigravity cost per month?',
      answer: 'There is no Antigravity subscription. Access comes with a Google AI plan. In the US, as of October 31, 2026: free, Plus at $4.99/month, Pro at $19.99, Ultra 5x at $99.99 and Ultra 20x at $199.99. Verify the current price in your Google account before paying.',
    },
    {
      question: 'How many requests does the Antigravity free tier allow?',
      answer: 'Google has changed this several times since the November 2025 launch, always downward, so any specific number dates quickly. The structure is weekly rate limits on agent requests with unlimited tab completions and command requests. Check your account for the current allowance rather than trusting an article, including this one.',
    },
    {
      question: 'What are Antigravity credits and when do they get used?',
      answer: 'Pro and Ultra users can buy extra AI credits after the included quota runs out. Consumption follows standard API pricing and varies by model and task complexity, rather than one fixed price per request. Free users wait for the limit to reset.',
    },
    {
      question: 'Why does my quota display say Antigravity is not running when it is?',
      answer: 'Most often because your session is logged out. Antigravity exposes its state through a local language server, and a logged-out session looks externally identical to no session at all. Check that you are still signed in before assuming the tool is broken.',
    },
    {
      question: 'Is Antigravity cheaper than Claude Code?',
      answer: 'At the free tier, decisively yes, because Claude Code has no free tier. At the paid tiers the two are priced almost identically ($19.99 against $20, $99.99 against $100), so the decision should be about the models and the agent rather than the bill.',
    },
    {
      question: 'What are the Antigravity plans?',
      answer: 'There is no Antigravity subscription. Access rides on a Google AI plan: free, Plus at $4.99/month, Pro at $19.99, Ultra 5x at $99.99 and Ultra 20x at $199.99 in the US, plus an organisation route through Google Cloud. Google does not publish these prices on the Antigravity page itself, so verify them in your Google account before paying.',
    },
    {
      question: 'Do I need Google AI Pro to use Antigravity CLI (agy)?',
      answer: 'No. The free tier already gives access to agent models, unlimited tab completions and unlimited command requests, gated by weekly rate limits rather than by feature. Pro raises those limits, adds Gemini 4 Argon and the Claude 5.5 models, and adds the credit pool that lets you keep working past the included quota.',
    },
    {
      question: 'What happens to the rate limit when I run several agy sessions at once?',
      answer: 'They all draw from the same account allowance, so the weekly rate limits arrive sooner in proportion to how many sessions are actually busy. On Pro and Ultra the overflow goes to credits. On the free tier there is no credit pool, so every session stops until the limit resets.',
    },
  ],
}

export default guide
