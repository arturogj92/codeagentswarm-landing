import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-plans-and-pricing',
    locale: 'en',
    title: 'OpenCode Plans and Pricing: The One With No Subscription',
    metaTitle: 'OpenCode Pricing: BYOK, Zen and Real Costs (2026)',
    metaDescription: 'OpenCode pricing explained: the CLI is free and open source, bring your own key costs whatever your provider charges, and OpenCode Zen is pay-as-you-go with no monthly fee.',
    intro: `OpenCode is the odd one out in this category, and the short answer is genuinely short: <strong>there is no subscription and there is no monthly fee</strong>. The CLI is free and open source. You either bring your own API key from any provider, in which case that provider bills you directly and OpenCode takes nothing, or you use OpenCode Zen, a gateway with pay-as-you-go per-token pricing and no markup on requests.

That means there is no plan table to compare, no 5 hour window, no weekly cap and no tier to outgrow. There is also no ceiling: OpenCode will never stop you because a quota ran out, and it will never stop you because a bill got large either.

This guide covers what each route actually costs, the free models Zen carries, the one number that decides your bill, and the honest trade-off against a subscription CLI like <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>.`,
    ctaText: 'Pay-as-you-go means nothing stops a runaway agent except you watching it. CodeAgentSwarm keeps every OpenCode session visible in one workspace, so you always know what is running and for how long.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-25',
    alternateSlug: 'planes-y-precios-de-opencode',
  },
  sections: [
    {
      id: 'two-routes',
      title: 'Two routes, neither of them a subscription',
      content: [
        {
          type: 'paragraph',
          text: 'Everything about OpenCode pricing comes down to which of these two you pick, and you can switch between them per project or per session.',
        },
        {
          type: 'table',
          headers: ['Route', 'What you pay', 'Who bills you', 'Monthly fee'],
          rows: [
            ['Bring your own key (BYOK)', 'Your provider\'s normal API rates', 'Anthropic, OpenAI, Google, whoever', 'None'],
            ['OpenCode Zen', 'Per-token rates on a prepaid balance', 'Zen, no markup on requests', 'None'],
          ],
          caption: 'OpenCode pricing routes, August 2026.',
        },
        {
          type: 'paragraph',
          text: '<strong>BYOK</strong> is the purest form: OpenCode is just a client. Point it at an Anthropic or OpenAI key you already have and the tokens are billed directly by that provider, exactly as if you had called their API yourself. OpenCode is not in the payment path at all and takes no cut.',
        },
        {
          type: 'paragraph',
          text: '<strong>Zen</strong> is a curated gateway. You add a balance, use whichever models you want at published per-token rates, and it auto-tops up when you run low. Zen works like any other provider inside OpenCode, so switching to it is a configuration change, not a migration.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If you already pay for an Anthropic or OpenAI API key for something else, BYOK costs you nothing extra to try. That makes OpenCode the cheapest agent in this category to evaluate: you can be running it in minutes without creating a new billing relationship.',
        },
      ],
    },
    {
      id: 'zen-pricing',
      title: 'What OpenCode Zen actually costs',
      content: [
        {
          type: 'paragraph',
          text: 'Zen publishes per-million-token rates split into input, output, cached reads and cached writes. The spread across the catalogue is enormous, which is the single most useful thing to understand about it. As of August 25, 2026:',
        },
        {
          type: 'table',
          headers: ['Model', 'Input / 1M', 'Output / 1M'],
          rows: [
            ['Big Pickle, MiMo-V2.5 Free and other temporary free models', '$0.00', '$0.00'],
            ['GPT 5.6 Luna', '$0.20', '$1.20'],
            ['Claude Sonnet 5', '$2.00', '$10.00'],
            ['GPT 5.5 Pro', '$30.00', '$180.00'],
          ],
          caption: 'A sample of OpenCode Zen rates, verified August 25, 2026. The full catalogue is on the Zen docs page.',
        },
        {
          type: 'paragraph',
          text: 'Read that table again, because the range is the point: <strong>the top of the catalogue costs 150 times the budget tier on output</strong>. On a subscription CLI your model choice changes how fast you burn a fixed allowance. Here it changes your bill directly and by two orders of magnitude. Picking the right model for the task is not a micro-optimisation on Zen, it is the whole cost story.',
        },
        {
          type: 'paragraph',
          text: 'Zen also carries models listed at $0 input and $0 output. OpenCode marks several of them as limited-time offers, so check the live catalogue before relying on one for a long-running workflow.',
        },
        {
          type: 'paragraph',
          text: 'Zen takes <strong>no markup on requests</strong>. What it does pass along, at cost, is card processing: 4.4% plus $0.30 per transaction. That is a payment fee rather than a service fee, and it is the argument for topping up in larger amounts less often rather than in small increments.',
        },
      ],
    },
    {
      id: 'auto-reload',
      title: 'The auto-reload default, and why to change it',
      content: [
        {
          type: 'paragraph',
          text: 'By default, when your Zen balance drops below $5, the system automatically recharges $20. This is convenient and it is also the mechanism by which a misbehaving agent quietly spends real money overnight.',
        },
        {
          type: 'paragraph',
          text: 'The threshold and the amount are both adjustable, and auto-reload can be disabled entirely. <strong>Disabling it turns your balance into a hard spending cap</strong>, which is the closest thing OpenCode has to the safety of a subscription: the agent stops when the money runs out, exactly like hitting a weekly limit, except you chose the number.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Before you leave an OpenCode agent running unattended overnight or in CI, decide deliberately what happens when the balance empties. Auto-reload on means the run continues and keeps charging; auto-reload off means it stops. Neither is wrong, but finding out which one you had by reading a statement is a bad way to learn.',
        },
        {
          type: 'paragraph',
          text: 'This is the honest counterweight to "no quota wall". A subscription protects you from your own agents. Pay-as-you-go does not, unless you build the protection yourself.',
        },
      ],
    },
    {
      id: 'vs-subscription',
      title: 'Pay-as-you-go against a subscription: when each one wins',
      content: [
        {
          type: 'paragraph',
          text: 'The comparison people usually make is total monthly spend, and that is only half of it. The real difference is <strong>what happens at the edges</strong>.',
        },
        {
          type: 'paragraph',
          text: 'A subscription starts as a fixed cost with included capacity. Many providers now let you enable paid overflow, so the ceiling is optional and the final bill may not be fixed. Pay-as-you-go has no monthly floor: a week off costs nothing, and a week of heavy refactoring costs whatever it costs.',
        },
        {
          type: 'paragraph',
          text: 'That maps cleanly onto how people actually work:',
        },
        {
          type: 'list',
          items: [
            '<strong>Bursty or occasional work</strong> favours OpenCode. Two intense weeks a quarter on a subscription means paying for the ten quiet ones.',
            '<strong>Steady daily work</strong> favours a subscription. The predictable cost is worth more than the theoretical savings, and you stop thinking about it.',
            '<strong>Unattended automation</strong> favours pay-as-you-go, because a CI pipeline that dies on a personal quota is worse than one that costs a few dollars.',
            '<strong>Learning and evaluation</strong> favours OpenCode outright, thanks to the free models and BYOK.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The setup that works best in practice is not choosing at all. Keep a subscription for your daily driver and keep OpenCode on the side for overflow, for the weeks you hit a weekly cap, and for automation. Two providers on two separate meters means you are almost never fully stopped, which is the argument developed in <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the OpenCode agent swarm guide</a>.',
        },
      ],
    },
    {
      id: 'is-it-free',
      title: 'Is OpenCode free? Yes, genuinely',
      content: [
        {
          type: 'paragraph',
          text: 'The CLI is free and open source, with no paid edition, no feature gate and no seat count. This is not the "free tier" framing the other vendors use, where the free thing is a limited version of the paid thing. There is no paid version of OpenCode.',
        },
        {
          type: 'paragraph',
          text: 'What costs money is the model behind it. Zen currently has a zero-cost path through temporary free models, but the catalogue can change.',
        },
        {
          type: 'paragraph',
          text: 'The realistic budget framing: evaluating OpenCode costs $0, using it seriously costs whatever your token consumption costs, and there is no monthly floor. For most single-agent daily use on a mid-tier model, that lands well under a $20 subscription. For heavy parallel agent work on a frontier model, it lands well above one.',
        },
      ],
    },
    {
      id: 'controlling-spend',
      title: 'Keeping the bill honest while agents run',
      content: [
        {
          type: 'paragraph',
          text: 'Without a quota wall, the only thing between you and a surprise is visibility. Three habits do most of the work:',
        },
        {
          type: 'list',
          items: [
            '<strong>Match the model to the task.</strong> The 150x output spread across the Zen catalogue means routine work on a frontier model is the single most expensive mistake available to you.',
            '<strong>Set the balance as a cap.</strong> Turn auto-reload off before any unattended run, so an empty balance stops the agent instead of refilling itself.',
            '<strong>Watch what is actually running.</strong> Parallel agents multiply spend linearly, and an agent stuck in a loop looks exactly like an agent working hard.',
          ],
        },
        {
          type: 'paragraph',
          text: 'That last one is where a workspace helps. <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop app for running several AI CLI agents in parallel, keeps every OpenCode session visible at once with its current status and activity, so a session that has been busy for forty minutes on a five-minute task is obvious rather than invisible.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is OpenCode free?',
      answer: 'Yes. The CLI is free and open source with no paid edition. Model usage is separate. OpenCode Zen currently carries temporary models at $0 input and $0 output, but their availability can change.',
    },
    {
      question: 'How much does OpenCode cost per month?',
      answer: 'There is no monthly fee. You either bring your own API key and pay your provider directly, or you use OpenCode Zen on a prepaid balance at per-token rates. A quiet month costs $0, which no subscription CLI can offer.',
    },
    {
      question: 'What is OpenCode Zen?',
      answer: 'A curated gateway of benchmarked models with pay-as-you-go per-token pricing and no markup on requests. You add a balance and it auto-tops up when you run low. Inside OpenCode it behaves like any other provider, so switching to it is a configuration change.',
    },
    {
      question: 'Does OpenCode have usage limits or a weekly quota?',
      answer: 'No. There is no 5 hour window, no weekly cap and no tier. The only thing that stops you is running out of balance, and only if you have turned auto-reload off.',
    },
    {
      question: 'How do I stop an OpenCode agent from spending too much?',
      answer: 'Turn off auto-reload so your balance becomes a hard cap, and pick the model deliberately. Zen rates range from $0 to $180 per million output tokens, so running routine work on a frontier model is by far the most expensive mistake available.',
    },
    {
      question: 'Is OpenCode cheaper than Claude Code or Codex?',
      answer: 'It depends entirely on how much you use it. Bursty or occasional work is cheaper on OpenCode because quiet weeks cost nothing. Steady heavy daily use on a frontier model usually costs more than a $100 subscription. The most common good answer is to run both: a subscription for daily work, OpenCode for overflow and automation.',
    },
  ],
}

export default guide
