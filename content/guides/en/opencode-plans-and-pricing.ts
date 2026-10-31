import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'opencode-plans-and-pricing',
    locale: 'en',
    title: 'OpenCode Plans and Pricing: Free CLI, Optional Go Plan, and What Parallel Agents Cost',
    metaTitle: 'OpenCode Pricing 2026: Free CLI, Zen, BYOK and Real Cost',
    metaDescription: 'OpenCode CLI is free and open source. Go costs $10 or $40 a month, Zen credits are pay per token. Plus what several agents at once do to your bill.',
    intro: `OpenCode is the odd one out in this category, and the short answer is genuinely short: <strong>the CLI is free, and a subscription is optional</strong>. You can bring your own API key from any provider, in which case that provider bills you directly and OpenCode takes nothing. You can buy prepaid credits on OpenCode's pay-as-you-go service, which its docs now call OpenCode Console (the old Zen docs redirect there). Or, as of October 31, 2026, you can subscribe to <a href="https://opencode.ai/docs/go/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode Go</a> for $10 or $40 a month.

On your own key or on Console credits there is no 5 hour window, no weekly cap and no tier to outgrow. There is also no ceiling: OpenCode will never stop you because a quota ran out, only because your balance did. Go is the exception, with 5 hour, weekly and monthly limits per model.

This guide covers what each route actually costs, the free models Console carries, the one number that decides your bill, and the honest trade-off against a subscription CLI like <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>.`,
    ctaText: 'Pay-as-you-go means nothing stops a runaway agent except you watching it. CodeAgentSwarm keeps every OpenCode session visible in one workspace, so you always know what is running and for how long.',
    ctaAgent: 'opencode',
    highlightedWords: ['OpenCode', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'planes-y-precios-de-opencode',
  },
  sections: [
    {
      id: 'two-routes',
      title: 'Three routes, and only one is a subscription',
      content: [
        {
          type: 'paragraph',
          text: 'Everything about OpenCode pricing comes down to which of these three you pick, and you can switch between them per project or per session.',
        },
        {
          type: 'table',
          headers: ['Route', 'What you pay', 'Who bills you', 'Monthly fee'],
          rows: [
            ['Bring your own key (BYOK)', 'Your provider\'s normal API rates', 'Anthropic, OpenAI, Google, whoever', 'None'],
            ['OpenCode Console (formerly Zen)', 'Per-token rates on prepaid credits', 'OpenCode, at cost plus a processing fee', 'None'],
            ['OpenCode Go', 'Go $10/month, Go Plus $40/month, Go Teams $20 per member', 'OpenCode', 'Yes, with limits per model'],
          ],
          caption: 'OpenCode pricing routes from the official OpenCode docs, verified October 31, 2026.',
        },
        {
          type: 'paragraph',
          text: '<strong>BYOK</strong> is the purest form: OpenCode is just a client. Point it at an Anthropic or OpenAI key you already have and the tokens are billed directly by that provider, exactly as if you had called their API yourself. OpenCode is not in the payment path at all and takes no cut.',
        },
        {
          type: 'paragraph',
          text: '<strong>Console</strong>, the service OpenCode used to call Zen, is a curated gateway. You add credits, use whichever models you want at published per-token rates, and can set an auto-recharge rule. It works like any other provider inside OpenCode: run <code>/connect</code> and pick the OpenCode pay-as-you-go provider, so switching to it is a configuration change, not a migration.',
        },
        {
          type: 'paragraph',
          text: '<strong>Go</strong> is the optional subscription. It gives you an API key for a list of mostly open coding models, such as GLM, Kimi, Qwen, DeepSeek and MiniMax, plus Grok 4.7, GPT 6 Luna, Claude Haiku 5.5 and Gemini 4 Argon. Each model has a monthly dollar limit, and you can use 20% of it per 5 hours and 50% per week.',
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
      title: 'What OpenCode Zen, now Console, actually costs',
      content: [
        {
          type: 'paragraph',
          text: 'Console publishes per-million-token rates split into input, output, cached reads and cached writes. The spread across the catalogue is enormous, which is the single most useful thing to understand about it. As of October 31, 2026:',
        },
        {
          type: 'table',
          headers: ['Model', 'Input / 1M', 'Output / 1M'],
          rows: [
            ['Big Pickle, GLM-5.3-Flash Free and other temporary free models', '$0.00', '$0.00'],
            ['GPT 6 Luna', '$0.10', '$0.50'],
            ['Claude Sonnet 5.5', '$2.00', '$10.00'],
            ['GPT 5.5 Pro', '$30.00', '$180.00'],
          ],
          caption: 'A sample of OpenCode Console rates, verified October 31, 2026. The full catalogue is on the Console models page of the OpenCode docs.',
        },
        {
          type: 'paragraph',
          text: 'Read that table again, because the range is the point: <strong>the top of the catalogue costs 360 times the budget tier on output</strong>. On a subscription CLI your model choice changes how fast you burn a fixed allowance. Here it changes your bill directly and by two orders of magnitude. Picking the right model for the task is not a micro-optimisation on Zen, it is the whole cost story.',
        },
        {
          type: 'paragraph',
          text: 'Console also carries models listed at $0 input and $0 output. OpenCode marks several of them as limited-time offers, so check the live catalogue before relying on one for a long-running workflow.',
        },
        {
          type: 'paragraph',
          text: 'Console sells <strong>at cost</strong>, with markup only to cover processing: a fee of 4.6% plus $0.31 is added to each credit purchase, so a $50 top-up costs $52.61. That is a payment fee rather than a service fee, and it is the argument for topping up in larger amounts less often rather than in small increments.',
        },
      ],
    },
    {
      id: 'auto-reload',
      title: 'The auto-recharge rule, and how to set it',
      content: [
        {
          type: 'paragraph',
          text: 'Auto-recharge buys credits when your balance runs low, using a threshold and an amount you set in Settings, Billing. This is convenient and it is also the mechanism by which a misbehaving agent quietly spends real money overnight.',
        },
        {
          type: 'paragraph',
          text: 'Auto-recharge is a rule you add, and you can remove it. <strong>Running without it turns your balance into a hard spending cap</strong>: once the balance reaches zero, paid requests fail and the balance never goes negative. That is the closest thing OpenCode has to the safety of a subscription: the agent stops when the money runs out, exactly like hitting a weekly limit, except you chose the number.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Before you leave an OpenCode agent running unattended overnight or in CI, decide deliberately what happens when the balance empties. Auto-recharge on means the run continues and keeps charging; auto-recharge off means it stops. Neither is wrong, but finding out which one you had by reading a statement is a bad way to learn.',
        },
        {
          type: 'paragraph',
          text: 'This is the honest counterweight to "no quota wall". A subscription protects you from your own agents. Pay-as-you-go does not, unless you build the protection yourself.',
        },
      ],
    },
    {
      id: 'parallel-agents',
      title: 'What running several OpenCode sessions at once does to the cost',
      content: [
        {
          type: 'paragraph',
          text: 'On your own key or on Console credits, OpenCode bills per token, so there is no shared allowance to divide and no wall to hit. Go is the exception: its per-model limits behave like a subscription quota, so parallel sessions on the same Go model reach its 5 hour share sooner. Two agents working at the same time simply consume tokens at the same time, and your spend over an hour tracks the number of agents that are actually busy rather than the number of terminals you have open.',
        },
        {
          type: 'paragraph',
          text: 'That makes a parallel workflow easy to reason about and easy to underestimate. The model matters more than the count: three sessions on a budget model can cost less than one session on a frontier model, given the spread in the Console catalogue. What the count changes is how fast the balance drains, and therefore how often auto-recharge fires.',
        },
        {
          type: 'table',
          headers: ['Sessions at once', 'What to expect', 'What to watch'],
          rows: [
            ['1', 'Spend tracks the per-token rate of the model you picked, and nothing else.', 'Model choice. Console output rates run from $0 to $180 per million tokens.'],
            ['2 to 3', 'Roughly two to three times the token spend of one session over the same period, because each agent reads files, reasons and calls tools on its own.', 'Your auto-recharge threshold arrives sooner, and each top-up adds the 4.6% plus $0.31 processing fee. On Go, the 5 hour share of each model limit arrives sooner too.'],
            ['4 or more', 'Spend scales roughly with the number of busy agents. There is no quota to run out of, so nothing stops the run except the balance.', 'Turn auto-recharge off before any unattended run so the balance becomes a hard cap.'],
          ],
          caption: 'A rule of thumb, not a published rate. OpenCode has no per-session pricing, so the real number depends on the model and the work.',
        },
        {
          type: 'paragraph',
          text: 'The practical side of that is in <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the OpenCode agent swarm guide</a>, and the mechanics of getting several sessions going are in <a href="/en/guides/run-multiple-opencode-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">how to run multiple OpenCode sessions</a>.',
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
          text: 'A subscription starts as a fixed cost with included capacity. Many providers now let you enable paid overflow, so the ceiling is optional and the final bill may not be fixed. Pay-as-you-go has no monthly floor: a week off costs nothing, and a week of heavy refactoring costs whatever it costs. OpenCode Go now offers the subscription side inside OpenCode too, from $10 a month.',
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
          text: 'Every number in that table has its own page with the full tier list and the fine print: <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/en/guides/grok-build-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> and <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
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
          text: 'What costs money is the model behind it. Console currently has a zero-cost path through temporary free models, but the catalogue can change.',
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
            '<strong>Match the model to the task.</strong> The 360x output spread across the Console catalogue means routine work on a frontier model is the single most expensive mistake available to you.',
            '<strong>Set the balance as a cap.</strong> Turn auto-recharge off before any unattended run, so an empty balance stops the agent instead of refilling itself.',
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
      answer: 'Yes. The CLI is free and open source with no paid edition. Model usage is separate. OpenCode Console, formerly Zen, currently carries temporary models at $0 input and $0 output, but their availability can change.',
    },
    {
      question: 'How much does OpenCode cost per month?',
      answer: 'Nothing, unless you choose OpenCode Go at $10 or $40 a month. Otherwise you bring your own API key and pay your provider directly, or buy OpenCode Console (formerly Zen) credits at per-token rates. On those routes a quiet month costs $0, which no subscription CLI can offer.',
    },
    {
      question: 'What is OpenCode Zen?',
      answer: 'The pay-as-you-go gateway that OpenCode now documents as OpenCode Console: tested models at per-token rates, sold at cost plus a 4.6% + $0.31 processing fee on each credit purchase. You add credits and can set an auto-recharge rule. Inside OpenCode it behaves like any other provider, so switching to it is a configuration change.',
    },
    {
      question: 'Does OpenCode have usage limits or a weekly quota?',
      answer: 'Not on your own key or on Console credits: there is no 5 hour window and no weekly cap, and only an empty balance stops you. OpenCode Go does have limits: per model, 20% of the monthly limit per 5 hours and 50% per week.',
    },
    {
      question: 'How do I stop an OpenCode agent from spending too much?',
      answer: 'Turn off auto-recharge so your balance becomes a hard cap, and pick the model deliberately. Console rates range from $0 to $180 per million output tokens, so running routine work on a frontier model is by far the most expensive mistake available.',
    },
    {
      question: 'Is OpenCode cheaper than Claude Code or Codex?',
      answer: 'It depends entirely on how much you use it. Bursty or occasional work is cheaper on OpenCode because quiet weeks cost nothing. Steady heavy daily use on a frontier model usually costs more than a $100 subscription. The most common good answer is to run both: a subscription for daily work, OpenCode for overflow and automation.',
    },
    {
      question: 'Is there an OpenCode subscription?',
      answer: 'Yes, an optional one: OpenCode Go costs $10/month, Go Plus $40/month and Go Teams $20 per member. It covers a list of mostly open coding models with limits per model. The CLI itself stays free, and your own key or Console credits need no subscription at all.',
    },
    {
      question: 'Does running several OpenCode agents at once cost more?',
      answer: 'Yes, and roughly in proportion. Each agent reads files, reasons and calls tools on its own, so token spend over a given hour tracks how many agents are actually busy. On your own key or Console credits there is no quota wall, so your balance and the auto-recharge setting are the only brakes. On Go, each model\'s 5 hour and weekly limits stop you sooner.',
    },
    {
      question: 'What is the cheapest way to use OpenCode?',
      answer: 'The CLI itself is free and open source. If you already pay for an Anthropic or OpenAI key, bringing it costs nothing extra. Console, formerly Zen, also lists temporary models at $0 input and $0 output, though OpenCode marks several of them as limited-time offers.',
    },
  ],
}

export default guide
