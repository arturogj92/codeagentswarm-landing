import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-plans-and-pricing',
    locale: 'en',
    title: 'Codex CLI Pricing: Every Plan, and Which One You Need for Parallel Agents',
    metaTitle: 'Codex CLI Pricing 2026: Plans, Limits, Parallel Agent Cost',
    metaDescription: 'Free tier, Go $8, Plus $20, Pro $100 or $200, Business seats, credits. Plus what OpenAI skips: which plan survives 3 or 4 Codex sessions at once.',
    intro: `There is no Codex subscription. Codex rides on whatever ChatGPT plan you already have, and as of August 2026 that lineup is: Free (limited Codex), Go at $8/month, Plus at $20/month, Pro at $100/month for 5x usage or $200/month for 20x, Business at $25/user/month, and Enterprise. If you would rather not subscribe, Codex also accepts an OpenAI API key and bills per token.

That is the one-paragraph answer, and it already contains the thing most comparison articles get wrong: <strong>Pro is now two different prices</strong>. OpenAI added a $100 Pro tier in April 2026, sitting between Plus and the original $200 Pro, and the two differ in usage multiplier and in what else they bundle rather than in which models you get.

The rest of the detail is where people get surprised: the CLI, the web version and the IDE extension all draw from one shared quota, that quota has both a 5 hour window and a weekly cap, and running out does not stop you if you have credits on the account.`,
    ctaText: 'Codex quota is shared across the CLI, the web app and the IDE, so it drains faster than you expect when several sessions run at once. CodeAgentSwarm shows what each terminal is burning, next to every other agent you run.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-09-01',
    alternateSlug: 'planes-y-precios-de-codex',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'As of August 2026, Codex access maps onto the ChatGPT plans like this. There is no plan you can buy that gives you Codex and nothing else.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'Codex access', 'Usage'],
          rows: [
            ['Free', '$0', 'Limited', 'Enough to try it, not to work'],
            ['Go', '$8/month', 'Yes', 'The cheapest real access'],
            ['Plus', '$20/month', 'Yes', 'The 1x baseline most people mean'],
            ['Pro', '$100/month', 'Yes', '5x Plus'],
            ['Pro', '$200/month', 'Yes', '20x Plus, plus the rest of the Pro bundle'],
            ['Business', '$25/user/month ($20 annual, min. 2 users)', 'Yes', 'Team pooling and admin'],
            ['Enterprise', 'Custom', 'Yes', 'Negotiated'],
          ],
          caption: 'ChatGPT plan lineup and Codex access, August 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The $100 Pro tier is new as of April 2026 and is the single most common source of out-of-date advice about Codex pricing. Any article that says "Pro is $200" without qualification predates it. Check the current lineup before you pay, because OpenAI has moved this ladder more than once in the last year.',
        },
        {
          type: 'paragraph',
          text: 'The two Pro tiers give you <strong>the same model suite</strong>. The difference is the multiplier, 5x against 20x, and what else comes in the box: the $200 tier bundles the rest of the Pro package while the $100 tier is deliberately the coding-focused option. If Codex is the only reason you are paying, $100 is the tier that exists for you.',
        },
        {
          type: 'paragraph',
          text: 'Go at $8/month deserves a mention because it is genuinely the cheapest way to run a real coding agent from any of the major vendors. It is tight, but it is not a demo.',
        },
      ],
    },
    {
      id: 'shared-quota',
      title: 'The trap: one quota across the CLI, the web and the IDE',
      content: [
        {
          type: 'paragraph',
          text: 'This is the detail that catches people out, and it is worth putting above the mechanics of the windows themselves: <strong>Codex CLI usage draws from the same limits as Codex on the web and Codex in your IDE</strong>. They are three front ends onto one allowance.',
        },
        {
          type: 'paragraph',
          text: 'In practice that means a morning spent driving Codex from the web interface directly reduces what your terminal can do that afternoon, and it means the IDE extension quietly running in the background counts against the agent you thought had the quota to itself. If you use more than one surface, your effective allowance is smaller than any single-surface estimate suggests.',
        },
        {
          type: 'paragraph',
          text: 'Add parallel terminals on top and the arithmetic gets unforgiving fast. Four Codex sessions plus an IDE extension is five consumers on one meter.',
        },
      ],
    },
    {
      id: 'how-quota-works',
      title: 'How the quota actually works: a 5 hour window plus a weekly cap',
      content: [
        {
          type: 'paragraph',
          text: 'Like most of its rivals, Codex meters you on two layers. The first is a <strong>rolling 5 hour window</strong>: an intense session can exhaust it while your weekly allowance is barely touched, and the fix is to wait for the window to slide forward.',
        },
        {
          type: 'paragraph',
          text: 'The second is a <strong>weekly cap</strong> on top. Both apply at once, so being blocked tells you nothing by itself about which ceiling you hit.',
        },
        {
          type: 'paragraph',
          text: 'What makes Codex unusual is that the published figures are given <strong>per model, as ranges</strong>, rather than as a single number. On Plus, for example, the documented per-five-hour ranges differ substantially between the reasoning-heavy models and the fast ones, because a model that thinks longer consumes more of the same allowance. The practical consequence is that your model choice changes your effective quota more than it changes your bill, which is the opposite of how pay-per-token works.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If you keep hitting the wall, try dropping to a faster model for routine work before you upgrade a tier. On a subscription the cheaper model does not save you money, it buys you more requests inside the same window, which is usually what you actually wanted.',
        },
      ],
    },
    {
      id: 'parallel-agents',
      title: 'Which plan you need when several Codex sessions run at once',
      content: [
        {
          type: 'paragraph',
          text: 'Because the CLI, the web version and the IDE extension share one allowance, the question that decides your tier is not how many hours you code, it is <strong>how many Codex sessions are consuming at the same time</strong>. Every extra terminal is another consumer on the same meter, and so is the IDE extension you forgot was running.',
        },
        {
          type: 'table',
          headers: ['Sessions at once', 'Tier that usually holds', 'Why'],
          rows: [
            ['1 session', 'Go at $8/month, or Plus at $20/month', 'Plus is the 1x baseline most people mean; Go is tight but it is real access, not a demo'],
            ['2 to 3 sessions', 'Pro at $100/month, 5x Plus', 'Two or three sessions drain the same 5 hour window two to three times faster, and each surface you also use counts on top'],
            ['4 or more sessions', 'Pro at $200/month, 20x Plus', 'Four terminals plus an IDE extension are five consumers on one meter, so the weekly cap arrives fast'],
          ],
          caption: 'Rule of thumb derived from the published multipliers, not a session count OpenAI promises. Codex publishes per-model ranges rather than fixed numbers, so your model choice moves this too.',
        },
        {
          type: 'paragraph',
          text: 'Before you upgrade, check the two cheaper levers this guide already covers: drop to a faster model for routine work, which buys more requests inside the same window, and keep credits for the occasional deadline. The mechanics of driving several terminals are in <a href="/en/guides/run-multiple-codex-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">run multiple Codex sessions</a>, and the wider workflow in <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Codex agent swarm guide</a>.',
        },
      ],
    },
    {
      id: 'credits',
      title: 'Credits: the pressure valve on top of the plan',
      content: [
        {
          type: 'paragraph',
          text: 'When you run past your included allowance, Codex does not simply stop if you have credits on the account. Credits are a top-up balance that maps onto token usage, priced separately for input, cached input and output tokens, and they cost roughly $0.04 each as of August 2026.',
        },
        {
          type: 'paragraph',
          text: 'This is a genuinely useful design: on Codex you can buy your way through a deadline. Claude paid plans can now do something similar with usage credits, so the real difference is how each provider meters and prices overflow. Treat credits as an occasional rescue rather than part of normal capacity, or a $20 subscription stops being a $20 budget.',
        },
        {
          type: 'paragraph',
          text: 'The honest rule of thumb: if you buy credits more than once or twice a month, the next tier up is cheaper than the habit.',
        },
      ],
    },
    {
      id: 'pay-per-token',
      title: 'The pay-per-token alternative: an OpenAI API key',
      content: [
        {
          type: 'paragraph',
          text: 'Codex accepts an OpenAI API key instead of a ChatGPT login, which swaps the whole quota system for per-token billing. As of August 2026, GPT-5.3-Codex is priced at $1.75 per million input tokens and $14.00 per million output tokens.',
        },
        {
          type: 'paragraph',
          text: 'For interactive work this is usually the worse deal: coding agents are output-heavy and output is where per-token billing bites. Where it wins is <strong>automation</strong>. A CI job, a scheduled refactor, a batch of repository migrations, anything that runs unattended and must not fail because a human\'s personal quota happened to be exhausted, belongs on an API key with a spending cap set in the OpenAI console.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'The two paths are not exclusive. Run your laptop on the subscription and give your CI pipeline its own API key, and neither can starve the other. Just make sure the key lives in the CI secret store and not in the shell profile you code in.',
        },
      ],
    },
    {
      id: 'compare-across-agents',
      title: 'How Codex pricing compares with the other agent CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'A price only means something next to the alternatives. The $8 Go tier makes Codex the cheapest real entry in the category, and Codex is also the only one whose quota is shared with a web app and an IDE extension. Here is the whole category, one line each, checked on the same day.',
        },
        {
          type: 'table',
          headers: ['Agent', 'Free tier', 'Cheapest paid', 'Top individual tier', 'How you are billed'],
          rows: [
            ['Claude Code', 'No (Free plan has no Claude Code)', 'Pro, $20/month', 'Max 20x, $200/month', 'Subscription with 5 hour and weekly windows; API tokens optional'],
            ['Codex CLI', 'Limited', 'Go, $8/month', 'Pro, $200/month', 'ChatGPT subscription shared with web and IDE; API tokens optional'],
            ['Kimi Code', 'CLI is free, model usage is not', 'Andante, ¥49/month', 'Allegro, ¥699/month', 'Membership with weekly and 5 hour limits; API per token'],
            ['OpenCode', 'CLI is free and open source', 'None, pay as you go', 'None', 'Your own provider key, or OpenCode Zen prepaid per token'],
            ['Antigravity', 'Yes, with weekly rate limits', 'Google AI Plus, around $8/month', 'Google AI Ultra 20x, $200/month', 'Google AI plan with rate limits and credits'],
            ['Grok Build', 'Yes, limited usage', 'SuperGrok, $30/month', 'SuperGrok Plus, $100/month', 'xAI plan rate limits; API per token'],
            ['Cursor Agent', 'Hobby, free', 'Pro, $20/month', 'Ultra, $200/month', 'Cursor plan with usage pools per model'],
          ],
          caption: 'Entry and top tiers per agent CLI, all verified August 25, 2026. Prices change often; each linked guide carries its own verification date.',
        },
        {
          type: 'paragraph',
          text: 'Each row has its own guide with the full ladder and the quota mechanics behind it: <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/en/guides/grok-build-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> and <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>.',
        },
      ],
    },
    {
      id: 'is-it-free',
      title: 'Is Codex free? What the free tier actually allows',
      content: [
        {
          type: 'paragraph',
          text: 'Partly. The Codex CLI is a free, open-source download, and ChatGPT Free does include some Codex access. Unlike <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, which is absent from its free tier entirely, you can genuinely try Codex without paying.',
        },
        {
          type: 'paragraph',
          text: 'What you cannot do is work on it. The free allowance is sized to let you form an opinion, not to carry a project. Expect to hit the ceiling on your first real task.',
        },
        {
          type: 'paragraph',
          text: 'The realistic budget framing: evaluating Codex costs $0, using it as a daily single-agent assistant costs $8 to $20/month, and running it as a parallel agent workflow costs $100/month. That $8 Go tier makes Codex the cheapest serious entry point in the category.',
        },
      ],
    },
    {
      id: 'watching-quota',
      title: 'Watching Codex quota while agents run',
      content: [
        {
          type: 'paragraph',
          text: 'A shared quota across three surfaces, metered on two windows, with per-model ranges rather than fixed counts, is not something you can track in your head. And the failure mode is the usual one: you find out when the agent stops.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace for running several AI CLI agents in parallel, shows your Codex usage alongside your other agents\' quotas, so you can see the wall approaching while the agents work rather than discovering it from a stalled terminal.',
        },
        {
          type: 'paragraph',
          text: 'It pairs with the pattern from <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Codex agent swarm guide</a>: spread work across agents on different meters, so that exhausting one provider does not stop the whole session. Codex and Claude bill from entirely separate pools, which is a better reason to run both than any benchmark.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Codex free?',
      answer: 'The CLI is free and open source, and ChatGPT Free includes limited Codex access, so you can genuinely try it without paying. It is sized for evaluation rather than work: expect to hit the ceiling on your first real task. Paid access starts at $8/month on the Go plan.',
    },
    {
      question: 'How much does Codex cost per month?',
      answer: 'As of August 2026 it depends on your ChatGPT plan: Go $8, Plus $20, Pro $100 (5x Plus) or $200 (20x Plus), Business $25 per user ($20 billed annually, minimum two users). There is no standalone Codex subscription.',
    },
    {
      question: 'What is the difference between ChatGPT Pro at $100 and at $200?',
      answer: 'The usage multiplier and the rest of the bundle, not the models. Both give the same model suite; $100 gives 5x Plus usage and is the coding-focused option, $200 gives 20x plus the full Pro package. The $100 tier launched in April 2026, which is why older articles only mention $200.',
    },
    {
      question: 'Does Codex CLI have its own separate quota from Codex on the web?',
      answer: 'No, and this catches people out. The CLI, the web version and the IDE extension all draw from one shared allowance on your ChatGPT plan. A morning on the web reduces what your terminal can do that afternoon.',
    },
    {
      question: 'What happens when I run out of Codex usage?',
      answer: 'If you have credits on the account, Codex keeps working and bills against them at roughly $0.04 per credit. If you do not, it stops until the window resets. Claude paid plans can also enable usage credits, so compare each provider\'s overflow rates and controls before relying on them.',
    },
    {
      question: 'Should I use a ChatGPT plan or an OpenAI API key for Codex?',
      answer: 'Subscription for interactive work, API key for automation. Per-token billing is output-heavy and coding agents produce a lot of output, but a CI job should never fail because a person exhausted their personal quota. Running both at once is a valid setup.',
    },
    {
      question: 'What are the Codex plans?',
      answer: 'There is no standalone Codex plan. Codex rides on your ChatGPT plan: Free with limited access, Go at $8/month, Plus at $20, Pro at $100 (5x Plus) or $200 (20x Plus), Business at $25 per user and Enterprise. An OpenAI API key is the pay-per-token alternative.',
    },
    {
      question: 'Do I need a ChatGPT subscription to use Codex CLI?',
      answer: 'Not strictly. ChatGPT Free includes limited Codex access, and Codex also accepts an OpenAI API key and bills per token instead. For daily work a subscription is the cheaper and more predictable route, starting at $8/month on Go.',
    },
    {
      question: 'Which Codex plan do I need to run several sessions in parallel?',
      answer: 'Plus at $20 handles one session comfortably. Two or three usually point at Pro at $100, which is 5x Plus, and four or more at Pro at $200. Remember the allowance is shared with Codex on the web and in your IDE, so those surfaces count as extra sessions.',
    },
  ],
}

export default guide
