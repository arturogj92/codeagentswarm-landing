import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-plans-and-pricing',
    locale: 'en',
    title: 'Kimi Code Pricing: Monthly, Annual and API Costs',
    metaTitle: 'Kimi Code Pricing: Monthly, Annual & API Costs (2026)',
    metaDescription: 'Compare current Kimi membership tiers, K3 access, weekly and 5-hour limits, plus K3 and K2.7 Code API prices per million tokens.',
    intro: `As of August 25, 2026, Kimi's official membership table has four tiers: Andante at ¥49/month, Moderato at ¥99, Allegretto at ¥199 and Allegro at ¥699. Every tier includes Kimi Code. K3 starts at Moderato, while Allegretto and higher unlock up to a one-million-token context in Kimi Code.

There is also a pay-per-token route through Kimi Open Platform. Its current public rates are ¥2 cached input, ¥20 uncached input and ¥100 output per million tokens for K3. K2.7 Code costs ¥1.30 cached input, ¥6.50 uncached input and ¥27 output per million tokens.

This guide separates those two billing systems and links every changing number to Kimi's official documentation. Prices can move, so use the date above and confirm the checkout total before paying.`,
    ctaText: 'Running Kimi Code agents against rate limits is less stressful when you can see them. CodeAgentSwarm tracks Kimi usage alongside every other agent you run.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'Pricing'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-08-25',
    alternateSlug: 'planes-y-precios-de-kimi-code',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'Kimi Code plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi\'s <a href="https://www.kimi.com/en/help/membership/membership-overview" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official membership page</a> lists these four paid plans as of August 25, 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Published monthly price', 'Positioning', 'Kimi Code'],
          rows: [
            ['Andante', '¥49', 'Everyday use', 'Included; K2.7 Code'],
            ['Moderato', '¥99', 'Productivity', 'Included; K3 up to 256K'],
            ['Allegretto', '¥199', 'Professional', 'Included; K3 up to 1M'],
            ['Allegro', '¥699', 'All-in-one premium', 'Included; K3 up to 1M'],
          ],
        },
        {
          type: 'paragraph',
          text: 'The plan credits are consumed according to actual token use. Kimi Code, Kimi Work, Deep Research, Slides, websites and the other membership features draw from one shared monthly pool, so heavy use elsewhere can reduce what remains for coding.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The official Help Center publishes these prices in Chinese yuan. Kimi can localise checkout pricing by market, so confirm the currency, taxes and annual discount shown in your own account before paying.',
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
          text: 'Kimi does not publish a fixed token count per agent credit because task consumption varies. A long repository session can cost more credits than a short edit, and several parallel terminals reach the 5-hour limit faster than one.',
        },
        {
          type: 'paragraph',
          text: 'Type <code>/usage</code> inside the Kimi Code interface to inspect the limits attached to your account. Treat that live account view as the final authority for your remaining capacity.',
        },
      ],
    },
    {
      id: 'current-model',
      title: 'Current Kimi Code models and context windows',
      content: [
        {
          type: 'paragraph',
          text: '<a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code\'s model documentation</a> now lists K3 as the default model. Moderato includes K3 with up to 256K context; Allegretto and higher unlock up to 1M. The separate <code>k3-256k</code> option uses less quota for routine work.',
        },
        {
          type: 'paragraph',
          text: 'K2.7 Code remains available to every paid member under <code>kimi-for-coding</code>, with a 262,144-token context. Its HighSpeed variant requires Allegretto or higher and consumes roughly three times the quota. Disabling reasoning routes K3 or K2.7 requests to K2.6.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'K3 and K2.7 Code have different context windows, entitlements and token prices. Record the model id used by each agent before comparing cost or quota consumption.',
        },
      ],
    },
    {
      id: 'pay-per-token',
      title: 'Kimi K3 and K2.7 Code API pricing',
      content: [
        {
          type: 'paragraph',
          text: 'If you prefer usage billing, Kimi Open Platform publishes these rates as of August 25, 2026:',
        },
        {
          type: 'list',
          items: [
            '<strong>K3:</strong> ¥2 cached input, ¥20 uncached input and ¥100 output per million tokens; up to 1M context',
            '<strong>K2.7 Code:</strong> ¥1.30 cached input, ¥6.50 uncached input and ¥27 output per million tokens; 256K context',
          ],
        },
        {
          type: 'paragraph',
          text: 'Automatic context caching makes repeated repository context cheaper. API billing has no flat monthly ceiling, so set platform budgets before leaving an autonomous agent unattended.',
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
          text: 'The Kimi Code CLI is open source under the MIT license and free to install. Model usage is separate. The current official membership table starts with Andante at ¥49 per month, and the API charges per token.',
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
          text: 'That pairs with the <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code agent swarm guide</a>: use Kimi where it fits and keep another provider for overflow. If Cursor is the alternative, compare its subscription in the <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI pricing guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Kimi Code free?',
      answer: 'The Kimi Code CLI is free and open source. Model usage is billed separately through a Kimi membership or the Kimi API. As of August 25, 2026, the official membership table starts with Andante at ¥49 per month.',
    },
    {
      question: 'How much does Kimi Code cost per month?',
      answer: 'The official Help Center lists Andante at ¥49, Moderato at ¥99, Allegretto at ¥199 and Allegro at ¥699 per month. Check your account for local currency, tax and annual pricing.',
    },
    {
      question: 'Which Kimi plan includes Kimi Code?',
      answer: 'All four paid tiers include Kimi Code. K3 starts at Moderato. Kimi Code documentation gives Allegretto and higher access to the up-to-1M K3 context.',
    },
    {
      question: 'How do Kimi Code limits reset?',
      answer: 'Membership credits reset at the start of each monthly billing cycle. Kimi Code also has its own weekly allowance and 5-hour rate limit. Check /usage inside Kimi Code for the limits and remaining capacity on your account.',
    },
    {
      question: 'What model does Kimi Code use?',
      answer: 'K3 is the current default in Kimi Code. K2.7 Code remains available as kimi-for-coding with a 262,144-token context. Plan level controls K3 access and its maximum context.',
    },
    {
      question: 'How much do Kimi K3 and K2.7 Code cost through the API?',
      answer: 'Kimi Open Platform lists K3 at ¥2 cached input, ¥20 input and ¥100 output per million tokens. K2.7 Code is ¥1.30 cached input, ¥6.50 input and ¥27 output.',
    },
  ],
}

export default guide
