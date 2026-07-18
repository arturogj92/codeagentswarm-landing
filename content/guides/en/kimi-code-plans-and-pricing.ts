import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-plans-and-pricing',
    locale: 'en',
    title: 'Kimi Code Plans and Pricing: What Each Tier Actually Gets You',
    metaTitle: 'Kimi Code Plans and Pricing: Every Tier Explained (2026)',
    metaDescription: 'Every Kimi Code plan explained: the free tier, paid tiers from $19 to $199, usage multipliers, the weekly quota with its 5 hour window, and pay-per-token rates.',
    intro: `Kimi Code runs on a Kimi subscription, and as of July 2026 the plans are: Adagio (free), Moderato at $19/month, Allegretto at $39/month, Allegro at $99/month and Vivace at $199/month. Paid tiers scale your Kimi Code usage roughly 1x, 5x, 15x and 30x, and every plan draws from one shared credit pool that also covers the rest of your Kimi membership. If you would rather not subscribe at all, there is a pay-per-token path through the Moonshot Open Platform.

That is the one-paragraph answer. The details are where people get surprised: quota refreshes on a weekly cycle but there is also a rolling 5 hour window that can stop you with plenty of weekly quota left, the famous 1 million token context is not actually available on every plan, and Moonshot's own pages have not always agreed about which tier unlocks Kimi Code.

This guide lays out what is known, dates every number, and flags the parts you should re-check on the official pricing page before paying, because Moonshot is iterating on this fast.`,
    ctaText: 'Running Kimi Code agents against a weekly quota is a lot less stressful when you can see it. CodeAgentSwarm tracks Kimi\'s real weekly and 5 hour windows per terminal, alongside every other agent you run.',
    highlightedWords: ['Kimi Code', 'Plans', 'Pricing'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-07-18',
    alternateSlug: 'planes-y-precios-de-kimi-code',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'Moonshot names its subscription tiers after musical tempos. As of July 2026, the lineup for a Kimi membership looks like this:',
        },
        {
          type: 'list',
          items: [
            '<strong>Adagio</strong>: free. The entry point to Kimi, with tight limits',
            '<strong>Moderato</strong>: $19/month. The first paid tier, 1x Kimi Code usage',
            '<strong>Allegretto</strong>: $39/month, roughly 5x usage',
            '<strong>Allegro</strong>: $99/month, roughly 15x usage',
            '<strong>Vivace</strong>: $199/month, roughly 30x usage',
          ],
        },
        {
          type: 'paragraph',
          text: 'Two things matter more than the multipliers. First, there is <strong>one credit pool per membership</strong>: Kimi Code, the Kimi chat app and anything else in the membership all draw from the same balance, so a heavy chat day eats into your coding budget. Second, the multipliers describe relative capacity, not hard token counts, and Moonshot has adjusted plan details more than once since Kimi K3 launched on July 16, 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Moonshot\'s own pages have disagreed about which plan unlocks Kimi Code: some material pointed at Moderato, other pages suggested Allegretto. Plans are moving fast right now. Before you pay, confirm on the official Kimi pricing page which tier includes Kimi Code access and how much usage it grants.',
        },
      ],
    },
    {
      id: 'how-quota-works',
      title: 'How the quota actually works: weekly refresh plus a 5 hour window',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi Code quota has two layers, and you will feel both. The first layer is a <strong>weekly cycle</strong>: your quota refreshes every 7 days counted from your subscription date, and unused quota does not roll over. Burn nothing all week and you still start the next cycle with the same allowance.',
        },
        {
          type: 'paragraph',
          text: 'The second layer is a <strong>rolling 5 hour window</strong> on top. Even with most of your weekly quota untouched, an intense session can hit the 5 hour ceiling and stop you until the window slides forward. This is the layer that surprises people running several agents in parallel: four terminals of always-reasoning K3 chew through a 5 hour window fast.',
        },
        {
          type: 'paragraph',
          text: 'If you run out, Moonshot sells <strong>booster top-ups</strong>: a wallet balance you can spend to keep working past your included quota. Boosters are a stopgap; if you need them regularly, the next tier up or the pay-per-token platform is usually cheaper.',
        },
        {
          type: 'paragraph',
          text: 'To check where you stand, type <code>/usage</code> inside the Kimi Code TUI. There is no <code>kimi usage</code> shell subcommand as of July 2026, so you check from inside a session. The readout covers your current usage, your limits and windows, and any booster balance.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The 7-day-plus-5-hour model is nearly identical to how Anthropic meters Claude. If you already pace Claude Code around its weekly and 5 hour limits, your instincts transfer directly to Kimi Code.',
        },
      ],
    },
    {
      id: 'context-gate',
      title: 'The 1M context is gated by plan',
      content: [
        {
          type: 'paragraph',
          text: 'Kimi K3\'s headline feature is its 1,048,576 token context window. What the headline skips: <strong>on Moderato you get 256k tokens of context, and the full 1M requires Allegretto or higher</strong>, as of July 2026.',
        },
        {
          type: 'paragraph',
          text: 'This matters for agent work specifically. A quarter-million tokens is still a lot, but if you picked Kimi for whole-repository context or giant refactors, the cheapest paid plan quietly does not deliver the thing you came for. Worse, an agent that believes it has 1M tokens while running against a 256k ceiling starts compacting its history earlier than you expect, and long tasks lose context you thought was safe.',
        },
        {
          type: 'paragraph',
          text: 'If the 1M window is the reason you are here, budget for Allegretto ($39/month) as the real entry price, or use the pay-per-token platform where the model serves its full window.',
        },
      ],
    },
    {
      id: 'pay-per-token',
      title: 'The pay-per-token alternative: Moonshot Open Platform',
      content: [
        {
          type: 'paragraph',
          text: 'You do not have to subscribe at all. The Moonshot Open Platform serves Kimi K3 (model id <code>kimi-k3</code>) with an API key and per-token billing. As of July 2026 the rates are:',
        },
        {
          type: 'list',
          items: [
            '<strong>$0.30 per million input tokens</strong> on cache hits',
            '<strong>$3.00 per million input tokens</strong> on cache misses',
            '<strong>$15.00 per million output tokens</strong>',
            '<strong>Flat across the whole 1M context</strong>: no long-context surcharge tiers',
          ],
        },
        {
          type: 'paragraph',
          text: 'The 10x gap between cache hits and misses is the number to internalize. Coding agents resend large, mostly stable context on every turn, which is exactly the traffic prompt caches love. In practice a well-behaved agent session leans heavily on the $0.30 rate, which is why K3 undercuts most frontier models on real agent workloads and not just on paper.',
        },
        {
          type: 'paragraph',
          text: 'The trade-off: pay-per-token has no flat monthly ceiling, so a runaway agent is a runaway bill. Rate limits on the platform also scale with your cumulative top-up, and the entry tier is tight for agent work. For daily driving, the subscription\'s predictable cost usually wins; for burst workloads or evaluation, the platform is cleaner.',
        },
        {
          type: 'paragraph',
          text: 'A related but separate option: Moonshot also runs Anthropic-compatible endpoints, so you can point Claude Code at K3 and skip the Kimi Code CLI entirely. We cover that setup, including its two different endpoints and auth variables, in <a href="/en/guides/kimi-k3-with-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi K3 with Claude Code</a>.',
        },
      ],
    },
    {
      id: 'free-tier',
      title: 'Is Kimi Code free? The Adagio reality',
      content: [
        {
          type: 'paragraph',
          text: 'The Kimi Code CLI itself is free and open source (MIT license, installable in one line; see <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">the setup guide</a>). What costs money is the model behind it.',
        },
        {
          type: 'paragraph',
          text: 'The free Adagio tier exists, and depending on current promotions it may include some Kimi Code usage, but treat it as a taste rather than a working allowance: an always-reasoning 2.8T parameter model is expensive to serve, and free quotas for it are correspondingly small. It is enough to evaluate whether K3\'s output quality justifies a paid plan for your work, and not much more.',
        },
        {
          type: 'paragraph',
          text: 'The honest budget framing: evaluating Kimi Code costs $0 to $19, and using it as a daily coding agent realistically starts at $19 to $39/month depending on which tier currently carries Kimi Code access and whether you need the full context window.',
        },
      ],
    },
    {
      id: 'watching-quota',
      title: 'Watching Kimi quota while agents run',
      content: [
        {
          type: 'paragraph',
          text: 'Quota systems with rolling windows have one operational problem: you find out you hit the wall when the agent stops. That is annoying with one terminal and expensive with several, because parallel agents multiply your burn rate against the same shared pool.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace for running several AI CLI agents in parallel, reads Kimi\'s real quota (the weekly cycle and the 5 hour window, per Moonshot\'s own usage endpoint) and shows it alongside your other agents\' quotas: a usage ring in the navbar and a breakdown per provider. You see the wall approaching while the agents work, instead of discovering it from a stalled terminal.',
        },
        {
          type: 'paragraph',
          text: 'That pairs naturally with the multi-agent pattern from <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Kimi Code agent swarm guide</a>: run Kimi where its pricing shines, keep <a href="/en/guides/kimi-code-vs-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> or another agent on the rest, and let the quota display tell you when to rebalance.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Kimi Code free?',
      answer: 'The CLI is free and open source, and the free Adagio tier gives you a small taste of the K3 model. For real work you need a paid Kimi plan (from $19/month as of July 2026) or a pay-per-token API key from the Moonshot Open Platform.',
    },
    {
      question: 'How much does Kimi Code cost per month?',
      answer: 'As of July 2026: Moderato $19, Allegretto $39, Allegro $99 and Vivace $199 per month, with Kimi Code usage scaling roughly 1x, 5x, 15x and 30x across those tiers. All of them share one credit pool with the rest of your Kimi membership.',
    },
    {
      question: 'Which Kimi plan includes Kimi Code?',
      answer: 'Moonshot\'s own pages have been inconsistent about this: some pointed at Moderato ($19), others at Allegretto ($39). Check the official pricing page at the moment you subscribe. If you want the full 1M token context rather than 256k, plan on Allegretto or higher regardless.',
    },
    {
      question: 'Does unused Kimi Code quota roll over?',
      answer: 'No. Quota refreshes every 7 days from your subscription date and unused allowance is gone at the reset. There is also a rolling 5 hour window on top, so you can be blocked temporarily even with weekly quota remaining.',
    },
    {
      question: 'What is the Kimi Code 5 hour limit?',
      answer: 'A rolling rate window layered on top of the weekly quota. Heavy usage inside any 5 hour span can hit it, at which point Kimi Code stops until the window slides forward. Parallel agent sessions reach it much faster than a single terminal.',
    },
    {
      question: 'How do I check my Kimi Code usage?',
      answer: 'Type /usage inside a Kimi Code session. There is no kimi usage shell subcommand as of July 2026. If you run Kimi Code inside CodeAgentSwarm, the app tracks the weekly and 5 hour windows for you and shows them in its quota indicator.',
    },
  ],
}

export default guide
