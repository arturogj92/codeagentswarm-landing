import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-plans-and-pricing',
    locale: 'en',
    title: 'Kimi Code Pricing: Monthly, Annual and API Costs',
    metaTitle: 'Kimi Code Pricing: Monthly, Annual & API Costs (2026)',
    metaDescription: 'Compare Kimi Code monthly and annual plans, credit multipliers, weekly and 5-hour limits, plus current Kimi K2.7 Code API prices per million tokens.',
    intro: `As of August 11, 2026, Kimi has four paid membership tiers. Monthly prices run from $19 to $199; annual billing brings the effective monthly range down to $15 to $159. Kimi Code capacity scales 1x, 5x, 15x and 30x across those tiers. All membership features share one credit pool, while Kimi Code also has its own weekly allowance and 5-hour rate limit.

There is also a pay-per-token route. The current default coding model, Kimi K2.7 Code, costs $0.19 per million cached input tokens, $0.95 per million uncached input tokens and $4 per million output tokens through the Kimi API. Its context window is 262,144 tokens.

This guide separates those two billing systems and links every changing number to Kimi's official documentation. Prices can move, so use the date above and confirm the checkout total before paying.`,
    ctaText: 'Running Kimi Code agents against rate limits is less stressful when you can see them. CodeAgentSwarm tracks Kimi usage alongside every other agent you run.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Pricing'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-08-11',
    alternateSlug: 'planes-y-precios-de-kimi-code',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'Kimi Code plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi\'s <a href="https://www.kimi.com/help/membership/membership-pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official pricing page</a> lists these four paid plans as of August 11, 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Monthly', 'Annual, effective monthly', 'Kimi Code credits'],
          rows: [
            ['Moderato', '$19', '$15 ($180/year)', '1x'],
            ['Allegretto', '$39', '$31 ($372/year)', '5x'],
            ['Allegro', '$99', '$79 ($948/year)', '15x'],
            ['Vivace', '$199', '$159 ($1,908/year)', '30x'],
          ],
        },
        {
          type: 'paragraph',
          text: 'The multiplier is relative capacity, not a published token allowance. The <a href="https://www.kimi.com/help/membership/membership-overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">membership overview</a> says Kimi Code, Kimi Work, Deep Research, Slides, websites and the other membership features all draw from one shared credit pool. Heavy use elsewhere can therefore reduce what remains for coding.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The $15, $31, $79 and $159 figures are monthly equivalents when you pay for a full year. Month-to-month billing is $19, $39, $99 and $199. Taxes may be added at checkout.',
        },
      ],
    },
    {
      id: 'how-quota-works',
      title: 'How Kimi Code limits work',
      content: [
        {
          type: 'paragraph',
          text: 'Two counters matter. Membership credits reset at the start of each monthly billing cycle. Kimi Code also has a separate <strong>weekly allowance and 5-hour rate limit</strong>. That Kimi Code limit does not consume the limits of other membership features, but the underlying membership credit pool is shared.',
        },
        {
          type: 'paragraph',
          text: 'Kimi does not publish a fixed token count for each 1x multiplier because task consumption varies. A long repository session can cost more credits than a short edit, and several parallel terminals reach the 5-hour limit faster than one.',
        },
        {
          type: 'paragraph',
          text: 'Type <code>/usage</code> inside the Kimi Code interface to inspect the limits attached to your account. Treat that live account view as the final authority for your remaining capacity.',
        },
      ],
    },
    {
      id: 'current-model',
      title: 'The current Kimi Code model and context window',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://www.kimi.com/es-419/resources/kimi-k2-7-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi\'s K2.7 Code documentation</a> says Kimi K2.7 Code is now the default model in Kimi Code. It has a 256K context window (262,144 tokens), one trillion total parameters and 32 billion active parameters per token.',
        },
        {
          type: 'paragraph',
          text: 'K2.7 Code always runs with reasoning enabled. If you disable reasoning in Kimi Code, the request is served by K2.6 instead. That makes older claims that Kimi Code always runs K3 with a one-million-token context incorrect for the current default setup.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Kimi K3 is a separate model and remains available in Kimi products. Do not use K3 pricing or its one-million-token context to estimate a default Kimi Code session running K2.7 Code.',
        },
      ],
    },
    {
      id: 'pay-per-token',
      title: 'Kimi K2.7 Code API pricing',
      content: [
        {
          type: 'paragraph',
          text: 'If you prefer usage billing, the Kimi API exposes model id <code>kimi-k2.7-code</code>. Kimi\'s official K2.7 Code page lists these rates as of August 11, 2026:',
        },
        {
          type: 'list',
          items: [
            '<strong>$0.19 per million input tokens</strong> on cache hits',
            '<strong>$0.95 per million input tokens</strong> on cache misses',
            '<strong>$4.00 per million output tokens</strong>',
            '<strong>262,144-token context window</strong>',
          ],
        },
        {
          type: 'paragraph',
          text: 'Automatic context caching makes repeated repository context cheaper: a cache hit costs one fifth of an uncached input token. The trade-off is that API billing has no flat monthly ceiling, so set platform budgets before leaving an autonomous agent unattended.',
        },
        {
          type: 'paragraph',
          text: 'If you specifically want to route the separate K3 model through an Anthropic-compatible client, see <a href="/en/guides/kimi-k3-with-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 with Claude Code</a>. Its model, limits and prices should not be mixed with the K2.7 Code figures above.',
        },
      ],
    },
    {
      id: 'free-tier',
      title: 'Is Kimi Code free?',
      content: [
        {
          type: 'paragraph',
          text: 'The Kimi Code CLI is open source under the MIT license and free to install. Model usage is separate. The current official membership table starts with Moderato at $19 month-to-month, or $15 per month when billed annually, and the API charges per token.',
        },
        {
          type: 'paragraph',
          text: 'Kimi may offer trials or promotions, but they can change and are not a reliable production budget. Confirm any free allowance inside your account rather than assuming an older Adagio offer still applies.',
        },
      ],
    },
    {
      id: 'watching-quota',
      title: 'Watching Kimi usage while agents run',
      content: [
        {
          type: 'paragraph',
          text: 'Rate limits become an operational problem when several agents share them: you usually discover the wall when work stops. <a href="/en" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> shows provider usage alongside parallel terminals so you can rebalance work before a session stalls.',
        },
        {
          type: 'paragraph',
          text: 'That pairs with the workflow in the <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code agent swarm guide</a>: use Kimi where it fits, keep another provider available for overflow, and monitor the shared limits instead of guessing.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Kimi Code free?',
      answer: 'The Kimi Code CLI is free and open source. Model usage is billed separately through a Kimi membership or the Kimi API. As of August 11, 2026, the official paid membership table starts at $19 month-to-month or $15 per month with annual billing.',
    },
    {
      question: 'How much does Kimi Code cost per month?',
      answer: 'Monthly plans are Moderato $19, Allegretto $39, Allegro $99 and Vivace $199. With annual billing, their effective monthly prices are $15, $31, $79 and $159. Kimi Code credits scale 1x, 5x, 15x and 30x.',
    },
    {
      question: 'Which Kimi plan includes Kimi Code?',
      answer: 'All four paid tiers in the current official membership table list Kimi Code credits: Moderato 1x, Allegretto 5x, Allegro 15x and Vivace 30x.',
    },
    {
      question: 'How do Kimi Code limits reset?',
      answer: 'Membership credits reset at the start of each monthly billing cycle. Kimi Code also has its own weekly allowance and 5-hour rate limit. Check /usage inside Kimi Code for the limits and remaining capacity on your account.',
    },
    {
      question: 'What model does Kimi Code use?',
      answer: 'Kimi K2.7 Code is the default as of August 11, 2026. It always reasons and has a 262,144-token context window. Requests with reasoning disabled are served by K2.6 instead.',
    },
    {
      question: 'How much does the Kimi K2.7 Code API cost?',
      answer: 'The official rates are $0.19 per million cached input tokens, $0.95 per million uncached input tokens and $4 per million output tokens for model kimi-k2.7-code, with a 262,144-token context window.',
    },
  ],
}

export default guide
