import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-plans-and-pricing',
    locale: 'en',
    title: 'Antigravity Plans and Pricing: What the Free Tier Really Gives You',
    metaTitle: 'Antigravity CLI Pricing: Free, Pro and Ultra Explained (2026)',
    metaDescription: 'Antigravity pricing explained: the free tier and what it actually allows, Google AI Pro and Ultra, the credit pool, and why the free limits have been cut repeatedly.',
    intro: `Antigravity does not have its own subscription. Access rides on a Google AI plan, and as of August 2026 that means: a genuinely usable free tier, Google AI Pro, Google AI Ultra, an Ultra Max tier above it, and an organisation route through Google Cloud with consumption-based pricing.

The free tier is the story here. Unlike <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, which is not on its free tier at all, Antigravity's free plan gives you access to multiple frontier models, unlimited tab completions and unlimited command requests, gated by weekly rate limits rather than by feature. You can do real work on it without paying.

There is a catch worth knowing before you build a workflow around it, and it is not a subtle one: <strong>Google has cut the free limits repeatedly since launch</strong>. This guide covers the tiers, what the free plan currently allows, how the credit pool works, and how much of that you should treat as stable.`,
    ctaText: 'Antigravity meters you on rate limits rather than a bill, so knowing how close you are matters. CodeAgentSwarm reads Antigravity\'s real quota and shows it per terminal, alongside every other agent you run.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-11',
    alternateSlug: 'planes-y-precios-de-antigravity',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'Antigravity access is bundled into Google AI subscriptions rather than sold separately. As of August 2026 the ladder looks like this:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'What changes'],
          rows: [
            ['Individual (free)', '$0', 'All models, basic weekly rate limits'],
            ['Google AI Pro', '$20/month', 'More generous rate limits, flexible credit pool'],
            ['Google AI Ultra', '$100/month', '5x the Pro limits'],
            ['Ultra Max', '$200/month', '20x the Pro limits'],
            ['Organisation', 'Via Google Cloud', 'Consumption-based API pricing'],
          ],
          caption: 'Antigravity access tiers, August 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Google does not publish the monthly prices on the Antigravity pricing page itself, which lists the tiers and their features but leaves the numbers to the Google AI subscription pages. The figures above are consistent across sources as of August 2026, but this is the one table in this guide you should verify against your own Google account before paying, not least because Google has repriced this ladder at least once already.',
        },
        {
          type: 'paragraph',
          text: 'That repricing is worth knowing about because it went in the customer\'s favour, which is rare. Google introduced the $100 Ultra tier as a middle step, and the previous top tier came down from $250 to $200 and was renamed Ultra Max. If you are reading an older comparison that quotes $250, it predates that change.',
        },
        {
          type: 'paragraph',
          text: 'The 5x and 20x multipliers are measured against Pro, not against the free tier. This matters when you are working out what an upgrade actually buys you: the jump from free to Pro is the one that changes your day, and the jumps above it are for people running agents more or less continuously.',
        },
      ],
    },
    {
      id: 'free-tier',
      title: 'The free tier: what it allows, and what has been taken away',
      content: [
        {
          type: 'paragraph',
          text: 'The free plan is unusually generous on paper. It carries <strong>access to multiple frontier models</strong>, including Gemini and Claude models, plus unlimited tab completions and unlimited command requests. The gate is weekly rate limits on agent requests, not a feature wall.',
        },
        {
          type: 'paragraph',
          text: 'That combination is genuinely unusual. Most free tiers restrict you to the vendor\'s cheapest model; Antigravity\'s does not. For evaluating whether an agentic workflow suits you at all, it is the best free option in the category.',
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
          text: 'Pro and Ultra include a flexible credit pool. Credits are consumed once your included plan quota runs out, so the plan quota is a floor rather than a hard ceiling, and they are priced at roughly $0.01 each as of August 2026, with bulk purchase available (around $199 for 20,000 credits).',
        },
        {
          type: 'paragraph',
          text: 'This puts Antigravity in the same category as <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> rather than Claude Code: hitting your limit is a prompt to spend rather than a wall you have to wait out. Whether that is good news depends entirely on whether you noticed.',
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
            '<strong>Against Codex</strong>: similar structure, both metered with a credit top-up. Codex undercuts on the entry paid tier thanks to its $8 Go plan; Antigravity wins on the free tier.',
            '<strong>Against <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a></strong>: different philosophies entirely. Antigravity gives you a bounded free allowance with no bill; OpenCode gives you an unbounded bill with no wall. Bursty work suits OpenCode, predictable work suits Antigravity.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The genuinely useful takeaway is that <strong>Antigravity is the best free option and a middling paid one</strong>. Use the free tier to evaluate agentic coding without committing to anything, and make the paid decision on the merits of the agent rather than on price, because at $20 and $100 the whole category charges roughly the same.',
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
      answer: 'Yes, genuinely. The free tier gives access to multiple frontier models, unlimited tab completions and unlimited command requests, gated by weekly rate limits rather than by feature. It is the most usable free tier in this category, though the limits have been reduced repeatedly since launch.',
    },
    {
      question: 'How much does Antigravity cost per month?',
      answer: 'There is no Antigravity subscription. Access comes with a Google AI plan: free, Pro at around $20/month, Ultra at around $100/month for 5x the Pro limits, and Ultra Max at around $200/month for 20x. Verify current prices on your Google account, as Google does not list them on the Antigravity pricing page.',
    },
    {
      question: 'How many requests does the Antigravity free tier allow?',
      answer: 'Google has changed this several times since the November 2025 launch, always downward, so any specific number dates quickly. The structure is weekly rate limits on agent requests with unlimited tab completions and command requests. Check your account for the current allowance rather than trusting an article, including this one.',
    },
    {
      question: 'What are Antigravity credits and when do they get used?',
      answer: 'A flexible pool on the Pro and Ultra plans that is consumed once your included quota runs out, priced at roughly $0.01 each with bulk purchase available. The free tier has no credit pool, so free users simply wait for the limit to reset.',
    },
    {
      question: 'Why does my quota display say Antigravity is not running when it is?',
      answer: 'Most often because your session is logged out. Antigravity exposes its state through a local language server, and a logged-out session looks externally identical to no session at all. Check that you are still signed in before assuming the tool is broken.',
    },
    {
      question: 'Is Antigravity cheaper than Claude Code?',
      answer: 'At the free tier, decisively yes, because Claude Code has no free tier. At the paid tiers the two are priced almost identically ($20 and $100), so the decision should be about the models and the agent rather than the bill.',
    },
  ],
}

export default guide
