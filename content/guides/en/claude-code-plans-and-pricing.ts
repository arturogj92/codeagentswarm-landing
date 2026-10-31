import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-plans-and-pricing',
    locale: 'en',
    title: 'Claude Code Pricing: Every Plan, and Which One You Need for Parallel Agents',
    metaTitle: 'Claude Code Pricing 2026: Plans, Limits, Parallel Agent Cost',
    metaDescription: 'Pro $20, Max $100, Ultra $200, Team seats, API tokens. Plus what the official page skips: which plan survives 3 or 4 Claude Code agents at once.',
    intro: `Claude Code comes with a Claude subscription. As of October 31, 2026, <a href="https://claude.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Anthropic's pricing page</a> lists: Free (no Claude Code), Pro at $20/month, Max at $100/month, Ultra at $200/month, Team from $20/seat and Enterprise. There is also a pay-per-token path through the Anthropic API if you would rather not subscribe.

That is the one-paragraph answer, and it already contains the change most comparison articles miss: <strong>Max 5x and Max 20x are gone from the page</strong>. Max is now one $100 tier with 5x Pro usage, and the $200 tier is Ultra, which gives 10x Pro usage per week and no 5 hour limit for verified accounts.

The details are where the money is. Anthropic publishes multipliers, not token counts, so "5x" is relative to Pro rather than a number you can budget against. Most plans stack two layers, a rolling 5 hour window and a weekly cycle, and Max and Ultra add a separate weekly limit for Fable. Your Claude Code usage and your Claude chat usage draw from the same pool, so a heavy day in the chat app eats your coding budget.

This guide lays out what is known, dates every number, and flags the parts you should re-check on the official pricing page before paying.`,
    ctaText: 'Running several Claude Code agents against a shared weekly quota is a lot less stressful when you can see it. CodeAgentSwarm shows your real Claude usage per terminal, alongside every other agent you run.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-10-31',
    alternateSlug: 'planes-y-precios-de-claude-code',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'As of October 31, 2026, this is the lineup on Anthropic\'s own pricing page. Two columns matter most: Claude Code is not on the free tier at all, and only Ultra drops the 5 hour limit.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'Claude Code', 'Usage'],
          rows: [
            ['Free', '$0', 'No', 'Chat only'],
            ['Pro', '$17/mo annual, $20/mo monthly', 'Yes', 'The 1x baseline, every 5 hours and every week'],
            ['Max', '$100/month', 'Yes', '5x Pro every 5 hours and every week'],
            ['Ultra', '$200/month', 'Yes', '10x Pro every week, no 5 hour limit for verified accounts'],
            ['Team standard seat', '$20/seat annual, $25/seat monthly', 'Yes', 'More than Pro'],
            ['Team premium seat', '$100/seat annual, $125/seat monthly', 'Yes', '5x a standard seat'],
            ['Enterprise', '$20/seat annual (20 seat minimum) plus usage at API rates', 'Yes', 'Scales with model and task'],
          ],
          caption: 'Anthropic plan lineup as published on claude.com/pricing, verified October 31, 2026.',
        },
        {
          type: 'paragraph',
          text: 'Two things matter more than the multipliers. First, <strong>one pool per account</strong>: Claude Code, the Claude desktop and web apps and everything else in your subscription draw from the same allowance, so an afternoon of long chat conversations directly reduces how much coding you can do that week. Second, <strong>the multipliers describe relative capacity, not tokens</strong>. Anthropic deliberately does not publish a token quota for any plan, because burn rate depends on your context size, the model you pick and how much the agent reads before it acts.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The annual discount on Pro is real and often missed: $200 billed up front for the year, or $17/month, against $20/month billed monthly, so a year costs $200 instead of $240. Max and Ultra are billed monthly only. On Team the gap is $20 against $25 per standard seat per month.',
        },
      ],
    },
    {
      id: 'how-quota-works',
      title: 'How the quota actually works: a 5 hour window and two weekly caps',
      content: [
        {
          type: 'paragraph',
          text: 'On Pro and Max, Claude Code quota has two layers, and you will feel both. The first is a <strong>rolling 5 hour window</strong>. It starts with your first message, not at a fixed clock time, and it slides forward. An intense afternoon can exhaust it while your weekly allowance is barely touched. You can wait for the window to move or enable usage credits for work beyond the included limit. Ultra is the exception: Anthropic says verified Ultra accounts have no 5 hour limit, only the weekly one.',
        },
        {
          type: 'paragraph',
          text: 'The second layer is a <strong>weekly cycle</strong>, and this is the part most people get wrong: it is not always one cap. There is a weekly limit across all models combined, and on Max and Ultra a separate weekly limit for Fable, which can use up to half of your weekly allowance. Claude Code can also report a model-specific limit, such as "You\'ve hit your Opus limit", and in that case switching to a model outside that family keeps you working. The weekly reset time is tied to your account and shown under Settings then Usage. Nothing rolls over.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The layered model is why "I have barely used it this week" and "you have hit your limit" can both be true at the same time. Before assuming something is broken, check which cap you actually hit: the 5 hour window, the combined weekly limit, or a model-specific limit. Switching models only helps with the last one.',
        },
        {
          type: 'paragraph',
          text: 'Anthropic introduced the weekly limits in August 2025 and has said they affect fewer than 5% of subscribers, which is accurate for chat users and much less reassuring for anyone running coding agents. A single agent working through a large refactor consumes more in an hour than a chat user does in a week.',
        },
        {
          type: 'paragraph',
          text: 'To check where you stand, run <code>/usage</code> inside a Claude Code session. On a subscription it shows your plan usage bars plus a breakdown of what used them, such as subagents, MCP servers and long context, with suggested fixes (<a href="https://code.claude.com/docs/en/costs" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code docs</a>).',
        },
      ],
    },
    {
      id: 'parallel-agents',
      title: 'The multiplier that actually matters: how many agents you run',
      content: [
        {
          type: 'paragraph',
          text: 'The plan comparison everyone makes is Pro against Max, framed as "do I code enough to justify $100". That is the wrong axis. The question that decides your tier is <strong>how many Claude Code sessions you run at the same time</strong>.',
        },
        {
          type: 'paragraph',
          text: 'One terminal on Pro is comfortable for most people most days. Four terminals working in parallel burn through a 5 hour window roughly four times faster, because each one is independently reading files, running tools and thinking. The multiplier on your plan is not really about how many hours you work, it is about how wide you work.',
        },
        {
          type: 'paragraph',
          text: 'This is the honest framing for choosing: if you drive one agent at a time and mostly review its output, Pro is enough and Max is money you do not need to spend. If you keep two or three agents busy across different projects, Pro will stop you daily and Max is the real entry point. Ultra is for people running agents more or less continuously: the missing 5 hour limit means a burst of four agents is no longer cut off mid-afternoon, although the weekly limit still applies.',
        },
        {
          type: 'paragraph',
          text: 'That pattern is exactly what <a href="/en/guides/claude-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Claude Code agent swarm guide</a> covers. Watching quota still matters because included usage can disappear quickly, but paid plans can now enable <a href="https://support.claude.com/en/articles/12429409-manage-usage-credits-for-paid-claude-plans" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">usage credits</a> instead of waiting for a reset.',
        },
        {
          type: 'table',
          headers: ['Sessions at once', 'Tier that usually holds', 'Why'],
          rows: [
            ['1 session', 'Pro, $20/month', 'The 1x baseline is sized for one agent you drive and review as it works'],
            ['2 to 3 sessions', 'Max, $100/month', 'Two or three agents drain the same 5 hour window roughly two to three times faster than one, and Max gives 5x Pro on both layers'],
            ['4 or more sessions', 'Ultra, $200/month', 'Four agents would hit a 5 hour ceiling about four times faster; verified Ultra accounts have none, so only the 10x weekly limit is left to watch'],
          ],
          caption: 'Rule of thumb derived from the multipliers Anthropic publishes, not a session count it promises. Real burn depends on context size, model choice and how much each agent reads before it acts.',
        },
        {
          type: 'paragraph',
          text: 'Treat that as a starting point rather than a guarantee. Anthropic publishes multipliers, not token counts, so the only honest test is a week on the cheaper tier with <code>/usage</code> open. If you finish the week without hitting a wall, the upgrade is money you do not need to spend.',
        },
      ],
    },
    {
      id: 'pay-per-token',
      title: 'The pay-per-token alternative: the Anthropic API',
      content: [
        {
          type: 'paragraph',
          text: 'You do not have to subscribe. Claude Code accepts an Anthropic API key and bills per token instead, with no monthly fee and no weekly wall. As of October 31, 2026 the current models cost, per million tokens:',
        },
        {
          type: 'table',
          headers: ['Model', 'Input', 'Output'],
          rows: [
            ['Claude Fable 5.1', '$10.00', '$50.00'],
            ['Claude Opus 5.5', '$4.00', '$20.00'],
            ['Claude Sonnet 5.5', '$2.00', '$10.00'],
            ['Claude Haiku 5.5', '$0.10 ($0.50 above 100K prompt tokens)', '$0.50 ($2.50 above 100K prompt tokens)'],
          ],
          caption: 'Anthropic first-party API rates from the official pricing docs, verified October 31, 2026. Bedrock and Google Cloud are partner-operated and priced separately.',
        },
        {
          type: 'paragraph',
          text: 'The number that decides whether this is cheap or ruinous is <strong>prompt caching</strong>. On Opus 5.5 and Sonnet 5.5, cache hits cost 0.05x the base input price, a twentieth, and on Fable 5.1 0.025x (<a href="https://platform.claude.com/docs/en/about-claude/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Anthropic pricing docs</a>). Coding agents resend a large, mostly stable context on every turn, which is exactly the traffic caches are built for. A well-behaved agent session leans heavily on the cached rate. An agent that keeps invalidating its cache does not.',
        },
        {
          type: 'paragraph',
          text: 'The trade-off is the obvious one: metered usage can turn a runaway agent into a runaway bill. A subscription stays predictable only while usage credits are disabled; when they are enabled, work beyond the included limit is billed at standard API rates. For bursts, CI pipelines and evaluation runs, a dedicated API key is easier to budget and cap.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You can switch per project. Claude Code reads ANTHROPIC_API_KEY when it is set, so a CI job can bill per token while your laptop keeps using the subscription. Just be careful not to leave that variable exported in the shell you code in, or you will silently pay twice. One more trap: the $100 and $200 of monthly API credits that come with Max and Ultra cannot be used in Claude Code or the Claude apps, only on the Claude Platform.',
        },
      ],
    },
    {
      id: 'compare-across-agents',
      title: 'How Claude Code pricing compares with the other agent CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'A price only means something next to the alternatives. Claude Code is the only one of the seven compared here with no free path at all, and its entry price sits in the middle of the pack rather than at the top. Here are the compared agents, one line each, checked on the same day.',
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
          text: 'Each row has its own guide with the full ladder and the quota mechanics behind it: <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, <a href="/en/guides/grok-build-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a> and <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent</a>.',
        },
      ],
    },
    {
      id: 'is-it-free',
      title: 'Is Claude Code free? The honest answer',
      content: [
        {
          type: 'paragraph',
          text: 'No. This is the one place where Claude differs from most of its rivals: <strong>the free Claude tier does not include Claude Code at all</strong>. OpenCode is free and open source, Antigravity has a real free tier, and Codex is limited but present on ChatGPT Free. Claude Code starts at $20/month, full stop.',
        },
        {
          type: 'paragraph',
          text: 'The CLI itself is a free download and you can install it in one line. What you cannot do is run it without a paid plan or an API key with credit on it. If you want to evaluate Claude Code before paying, the cheapest honest path is a month of Pro at $20, or a small API top-up, which for evaluation purposes is usually a few dollars.',
        },
        {
          type: 'paragraph',
          text: 'The realistic budget framing: evaluating Claude Code costs $20 or less, using it as a daily single-agent coding assistant costs $20/month, and running it as a parallel agent workflow costs $100 to $200/month.',
        },
      ],
    },
    {
      id: 'watching-quota',
      title: 'Watching Claude quota while agents run',
      content: [
        {
          type: 'paragraph',
          text: 'Quota systems with rolling windows have one operational problem: you find out you hit the wall when the agent stops. That is annoying with one terminal and genuinely expensive with several, because parallel agents multiply your burn rate against the same shared pool, and an agent that stops mid-refactor leaves you to work out where it got to.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace for running several AI CLI agents in parallel, reads your real Claude usage and shows it alongside your other agents\' quotas: a usage ring in the navbar and a breakdown per provider. You see the wall approaching while the agents work, instead of discovering it from a stalled terminal.',
        },
        {
          type: 'paragraph',
          text: 'It also pairs with the obvious mitigation: when Claude is close to its weekly ceiling, move the less demanding work to another agent for a day rather than upgrading a tier you only need occasionally. <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a> bills per token with no wall, and <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> has its own separate quota, so a mixed setup rarely stops entirely.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Claude Code free?',
      answer: 'No. Unlike most rival CLIs, Claude Code is not included in the free Claude tier at all. The cheapest way in is Pro at $20/month ($17/month billed annually), or an Anthropic API key with pay-per-token billing.',
    },
    {
      question: 'How much does Claude Code cost per month?',
      answer: 'As of October 31, 2026: Pro $20 (or $17 billed annually), Max $100, Ultra $200, and Team from $20 per seat billed annually. All of them include Claude Code and all of them share one usage pool with the Claude chat apps.',
    },
    {
      question: 'What is the difference between Max 5x and Max 20x?',
      answer: 'Anthropic\'s pricing page no longer lists Max 20x. It now sells Max at $100 a month with 5x Pro usage every 5 hours and every week, and Ultra at $200 a month with 10x Pro usage per week and no 5 hour limit for verified accounts. Pick by how many agents you run in parallel, not by how many hours you work.',
    },
    {
      question: 'What is the Claude Code 5 hour limit?',
      answer: 'A rolling window that starts with your first message and slides forward, layered on top of the weekly limits on Pro and Max. Heavy usage inside any 5 hour span can exhaust it, at which point Claude Code stops until the window moves or you use usage credits. Parallel agent sessions reach it several times faster than a single terminal. Verified Ultra accounts have no 5 hour limit.',
    },
    {
      question: 'Why am I blocked on Opus but Sonnet still works?',
      answer: 'Because you hit a model-specific limit, not your session or weekly limit. Claude Code shows it as "You\'ve hit your Opus limit", and switching to a model outside that family, such as Sonnet, keeps you working. The session and weekly limits are shared across all models, so switching does not help once you hit one of those.',
    },
    {
      question: 'Does unused Claude Code quota roll over?',
      answer: 'No. Both the 5 hour window and the weekly cycle reset without carrying anything forward. Burning nothing all week still leaves you starting the next cycle with the same allowance.',
    },
    {
      question: 'How do I check my Claude Code usage?',
      answer: 'Run /usage inside a Claude Code session: on a subscription it shows your plan usage bars and what used them. Settings then Usage in the Claude web app shows the weekly reset time. If you run Claude Code inside CodeAgentSwarm, the app tracks the windows for you and shows them in its quota indicator.',
    },
    {
      question: 'Which Claude subscription do I need for Claude Code?',
      answer: 'Any paid one. Pro at $20/month is the entry point, Max at $100 and Ultra at $200 add usage on top, and Team seats start at $20. The Free plan does not include Claude Code at all. Pick by how many sessions you keep running at once, not by how many hours you work.',
    },
    {
      question: 'Is there a separate Claude Code plan, or are the Claude plans the same thing?',
      answer: 'They are the same thing. There is no Claude Code subscription: Claude Code comes with the Claude plans and draws from the same usage pool as the Claude chat apps. The only separate billing route is an Anthropic API key, which bills per token instead.',
    },
    {
      question: 'What is the cheapest way to run several Claude Code agents at once?',
      answer: 'Max at $100/month is the realistic entry point for two or three parallel sessions, because Pro will stop you daily. For four or more, Ultra at $200 removes the 5 hour limit on verified accounts. Cheaper still is spreading the work: keep Claude for the hard parts and move routine tasks to an agent on a separate meter, since the quotas are independent.',
    },
  ],
}

export default guide
