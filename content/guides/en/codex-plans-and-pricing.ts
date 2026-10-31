import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-plans-and-pricing',
    locale: 'en',
    title: 'Codex CLI Pricing: Every Plan, and Which One You Need for Parallel Agents',
    metaTitle: 'Codex CLI Pricing 2026: Plans, Limits, Parallel Agent Cost',
    metaDescription: 'Free tier, Go $8, Plus $20, Pro $100 to $500, Business seats, credits. Plus what OpenAI skips: which plan survives 3 or 4 Codex sessions at once.',
    intro: `There is no Codex subscription. Codex rides on whatever ChatGPT plan you already have, and as of October 31, 2026 <a href="https://learn.chatgpt.com/docs/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenAI's Codex pricing page</a> lists: Free (quick tasks), Go at $8/month, Plus at $20/month, Pro at $100, $200 or $500/month, Business at $25/user/month ($20 billed annually), and Enterprise. If you would rather not subscribe, Codex also accepts an OpenAI API key and bills per token.

That is the one-paragraph answer, and it already contains the thing most comparison articles get wrong: <strong>Pro is now three different prices</strong>, and none of them has a 5 hour limit at the moment. Plus still has one, with a published range of messages per model.

The rest of the detail is where people get surprised: Codex on the web, in the CLI and in the IDE draws from one plan allowance, Plus adds a weekly cap on top of the 5 hour window, and running out does not stop you if you have credits on the account.`,
    ctaText: 'Codex quota is shared across the CLI, the web app and the IDE, so it drains faster than you expect when several sessions run at once. CodeAgentSwarm shows what each terminal is burning, next to every other agent you run.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'planes-y-precios-de-codex',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'As of October 31, 2026, Codex access maps onto the ChatGPT plans like this. There is no plan you can buy that gives you Codex and nothing else.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'Codex access', 'Usage'],
          rows: [
            ['Free', '$0', 'Limited', 'Quick coding tasks with GPT-6 Luna'],
            ['Go', '$8/month', 'Yes', 'Lightweight coding tasks with GPT-6 Luna'],
            ['Plus', '$20/month', 'Yes', 'GPT-6.1 Sol and GPT-6 Luna, with a 5 hour limit and weekly limits'],
            ['Pro', '$100/month', 'Yes', 'No 5 hour limit for now; weekly limits may apply'],
            ['Pro', '$200/month', 'Yes', 'No 5 hour limit for now; weekly limits may apply'],
            ['Pro', '$500/month', 'Yes', 'Same, plus Ultrafast mode'],
            ['Business', '$25/user/month ($20 annual, min. 2 users)', 'Yes', 'Team workspace and admin'],
            ['Enterprise and Edu', 'Contact sales', 'Yes', 'Priority processing and enterprise controls'],
          ],
          caption: 'ChatGPT plan lineup and Codex access from learn.chatgpt.com/docs/pricing, verified October 31, 2026.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Pro is the single most common source of out-of-date advice about Codex pricing. Any article that says "Pro is $200" without qualification, or that stops at the $100 and $200 tiers, is behind: the pricing page now lists $100, $200 and $500. Check the current lineup before you pay, because OpenAI has moved this ladder more than once this year.',
        },
        {
          type: 'paragraph',
          text: 'The Codex pricing page does <strong>not</strong> publish a usage multiplier for each Pro tier. It sends you to OpenAI\'s Pro help article to compare limits. What the pricing page does state: Pro plans currently have no 5 hour limit, weekly limits may still apply, and only Pro $500 gets Ultrafast mode. If Codex is the only reason you are paying, start at $100 and move up only when the weekly limit stops you.',
        },
        {
          type: 'paragraph',
          text: 'Go at $8/month is the cheapest paid door, but OpenAI pitches it at lightweight coding tasks and lists GPT-6 Luna for it, not GPT-6.1 Sol. It is fine for small jobs, not for a working day.',
        },
      ],
    },
    {
      id: 'shared-quota',
      title: 'The trap: one quota across the CLI, the web and the IDE',
      content: [
        {
          type: 'paragraph',
          text: 'This is the detail that catches people out, and it is worth putting above the mechanics of the windows themselves: <strong>Codex CLI usage draws from the same plan allowance as Codex on the web and Codex in your IDE</strong>. OpenAI\'s pricing page says local messages and cloud chats share your plan\'s usage allowance, and that ChatGPT Work and Codex share usage too.',
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
          text: 'On Plus and Business, Codex meters you on two layers. The first is a <strong>rolling 5 hour window</strong>: an intense session can exhaust it while your weekly allowance is barely touched, and the fix is to wait for the window to slide forward. Pro plans currently skip this layer.',
        },
        {
          type: 'paragraph',
          text: 'The second is a <strong>weekly cap</strong> on top, which OpenAI says "may also apply" on every plan. When both apply, being blocked tells you nothing by itself about which ceiling you hit.',
        },
        {
          type: 'paragraph',
          text: 'What makes Codex unusual is that the published figures are given <strong>per model, as ranges</strong>, rather than as a single number. On Plus, OpenAI estimates 15 to 160 local messages per 5 hours with GPT-6.1 Sol, 35 to 285 with GPT-6.1 Terra and 350 to 3,000 with GPT-6 Luna, because a model that thinks longer consumes more of the same allowance. The practical consequence is that your model choice changes your effective quota more than it changes your bill, which is the opposite of how pay-per-token works.',
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
            ['1 session', 'Plus at $20/month, or Go at $8/month for light work', 'Plus gets GPT-6.1 Sol and a published range per model; Go is pitched at lightweight tasks'],
            ['2 to 3 sessions', 'Pro at $100/month', 'Two or three sessions would drain a Plus 5 hour window two to three times faster; Pro currently has no 5 hour limit'],
            ['4 or more sessions', 'Pro at $200 or $500/month', 'Four terminals plus an IDE extension are five consumers on one meter, so the weekly limit becomes the wall'],
          ],
          caption: 'Rule of thumb, not a session count OpenAI promises. The Codex pricing page publishes per-model ranges for Plus and no multiplier per Pro tier, so your model choice moves this too.',
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
          text: 'When you run past your included allowance, Codex does not simply stop if you have credits on the account. Credits are a top-up balance that maps onto token usage, priced separately for input, cached input and output tokens: GPT-6.1 Sol costs 50 credits per million input tokens and 250 per million output tokens, and Fast mode doubles the rate. OpenAI says the purchase price of a credit depends on your plan or agreement, so check it in your account.',
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
          text: 'Codex accepts an OpenAI API key instead of a ChatGPT login, which swaps the whole quota system for per-token billing. As of October 31, 2026, <a href="https://developers.openai.com/api/docs/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenAI\'s API pricing</a> lists GPT-6.1 Sol at $2.00 per million input tokens, $0.10 for cached input and $10.00 per million output tokens, and GPT-6 Luna at $0.10 input and $0.50 output.',
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
          text: 'A price only means something next to the alternatives. The $8 Go tier puts Codex at the low end of the category, next to the $8 Plus plans from Cursor and xAI and Google AI Plus at $4.99, and its allowance is shared with ChatGPT on the web and in your IDE. Here is the whole category, one line each, checked on the same day.',
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
          text: 'The realistic budget framing: evaluating Codex costs $0, using it as a daily single-agent assistant costs $20/month, with Go at $8 for light work, and running it as a parallel agent workflow costs $100/month or more.',
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
      answer: 'The CLI is free and open source, and ChatGPT Free includes limited Codex access for quick coding tasks, so you can genuinely try it without paying. It is sized for evaluation rather than work: expect to hit the ceiling on your first real task. Paid access starts at $8/month on the Go plan.',
    },
    {
      question: 'How much does Codex cost per month?',
      answer: 'As of October 31, 2026 it depends on your ChatGPT plan: Go $8, Plus $20, Pro $100, $200 or $500, Business $25 per user ($20 billed annually, minimum two users). There is no standalone Codex subscription.',
    },
    {
      question: 'What is the difference between ChatGPT Pro at $100 and at $200?',
      answer: 'Mostly the amount of usage. OpenAI\'s Codex pricing page lists Pro at $100, $200 and $500 a month, says Pro plans currently have no 5 hour limit, and reserves Ultrafast mode for Pro $500. It does not publish a multiplier for each tier on that page, so compare the limits in OpenAI\'s Pro help article before upgrading.',
    },
    {
      question: 'Does Codex CLI have its own separate quota from Codex on the web?',
      answer: 'No, and this catches people out. OpenAI says local messages and cloud chats share your plan\'s usage allowance, so the CLI, the web version and the IDE extension all draw from your ChatGPT plan. A morning on the web reduces what your terminal can do that afternoon.',
    },
    {
      question: 'What happens when I run out of Codex usage?',
      answer: 'If you have credits on the account, Codex keeps working and bills against them at a per-model rate, for example 250 credits per million output tokens on GPT-6.1 Sol. If you do not, it stops until the window resets. Claude paid plans can also enable usage credits, so compare each provider\'s overflow rates and controls before relying on them.',
    },
    {
      question: 'Should I use a ChatGPT plan or an OpenAI API key for Codex?',
      answer: 'Subscription for interactive work, API key for automation. Per-token billing is output-heavy and coding agents produce a lot of output, but a CI job should never fail because a person exhausted their personal quota. Running both at once is a valid setup.',
    },
    {
      question: 'What are the Codex plans?',
      answer: 'There is no standalone Codex plan. Codex rides on your ChatGPT plan: Free with limited access, Go at $8/month, Plus at $20, Pro at $100, $200 or $500, Business at $25 per user and Enterprise. An OpenAI API key is the pay-per-token alternative.',
    },
    {
      question: 'Do I need a ChatGPT subscription to use Codex CLI?',
      answer: 'Not strictly. ChatGPT Free includes limited Codex access, and Codex also accepts an OpenAI API key and bills per token instead. For daily work a subscription is the cheaper and more predictable route, starting at $8/month on Go.',
    },
    {
      question: 'Which Codex plan do I need to run several sessions in parallel?',
      answer: 'Plus at $20 handles one session comfortably. Two or three usually point at Pro at $100, which currently has no 5 hour limit, and four or more at Pro at $200 or $500. Remember the allowance is shared with Codex on the web and in your IDE, so those surfaces count as extra sessions.',
    },
  ],
}

export default guide
