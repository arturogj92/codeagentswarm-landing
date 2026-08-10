import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-plans-and-pricing',
    locale: 'en',
    title: 'Claude Code Plans and Pricing: What Each Tier Actually Gets You',
    metaTitle: 'Claude Code Pricing: Every Plan Explained (2026)',
    metaDescription: 'Every Claude Code plan explained: Pro at $20, Max 5x at $100, Max 20x at $200, Team seats, and pay-per-token. How the weekly and 5 hour limits really work.',
    intro: `Claude Code comes with a Claude subscription, and as of August 2026 the plans are: Free (no Claude Code), Pro at $20/month, Max 5x from $100/month, Max 20x at $200/month, Team from $20/seat and Enterprise. There is also a pay-per-token path through the Anthropic API if you would rather not subscribe.

That is the one-paragraph answer. The details are where the money is: Anthropic publishes multipliers, not token counts, so "5x" is relative to Pro rather than a number you can budget against. There are two quota layers stacked on top of each other, a rolling 5 hour window and a weekly cycle, and the weekly cycle is actually two separate caps. Your Claude Code usage and your Claude chat usage draw from the same pool, so a heavy day in the chat app eats your coding budget.

This guide lays out what is known, dates every number, and flags the parts you should re-check on the official pricing page before paying.`,
    ctaText: 'Running several Claude Code agents against a shared weekly quota is a lot less stressful when you can see it. CodeAgentSwarm shows your real Claude usage per terminal, alongside every other agent you run.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Plans', 'Pricing'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'planes-y-precios-de-claude-code',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'As of August 2026, this is the lineup on Anthropic\'s own pricing page. The important column is the last one: Claude Code is not on the free tier at all.',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'Claude Code', 'Usage'],
          rows: [
            ['Free', '$0', 'No', 'Chat only'],
            ['Pro', '$17/mo annual, $20/mo monthly', 'Yes', 'The 1x baseline'],
            ['Max 5x', 'From $100/month', 'Yes', '5x Pro'],
            ['Max 20x', '$200/month', 'Yes', '20x Pro'],
            ['Team', '$20/seat annual, $25/seat monthly', 'Yes', 'More than Pro'],
            ['Team premium seat', '$100/seat annual, $125/seat monthly', 'Yes', 'Max-tier allowance per seat'],
            ['Enterprise', 'Custom, seat plus usage', 'Yes', 'Scales with the contract'],
          ],
          caption: 'Anthropic plan lineup as published on claude.com/pricing, August 2026.',
        },
        {
          type: 'paragraph',
          text: 'Two things matter more than the multipliers. First, <strong>one pool per account</strong>: Claude Code, the Claude desktop and web apps and everything else in your subscription draw from the same allowance, so an afternoon of long chat conversations directly reduces how much coding you can do that week. Second, <strong>the multipliers describe relative capacity, not tokens</strong>. Anthropic deliberately does not publish a token quota for any plan, because burn rate depends on your context size, the model you pick and how much the agent reads before it acts.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The annual discount on Pro is real and often missed: $17/month billed annually against $20/month billed monthly, so a year costs $204 instead of $240. On Team the gap is wider in absolute terms, $20 against $25 per seat per month.',
        },
      ],
    },
    {
      id: 'how-quota-works',
      title: 'How the quota actually works: a 5 hour window and two weekly caps',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code quota has two layers, and you will feel both. The first is a <strong>rolling 5 hour window</strong>. It starts with your first message, not at a fixed clock time, and it slides forward. An intense afternoon can exhaust it while your weekly allowance is barely touched, and the only fix is to wait for the window to move.',
        },
        {
          type: 'paragraph',
          text: 'The second layer is a <strong>weekly cycle</strong>, and this is the part most people get wrong: it is not one cap, it is two. There is a weekly limit across all models combined, and a second weekly limit that caps Opus specifically. You can therefore be locked out of Opus for the rest of the week while still having plenty of combined allowance left for Sonnet. Both reset at a fixed time tied to your account, which you can see under Settings then Usage. Nothing rolls over.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The two-layer model is why "I have barely used it this week" and "you have hit your limit" can both be true at the same time. Before assuming something is broken, check which of the three caps you actually hit: the 5 hour window, the combined weekly limit, or the model-specific weekly limit.',
        },
        {
          type: 'paragraph',
          text: 'Anthropic introduced the weekly limits in August 2025 and has said they affect fewer than 5% of subscribers, which is accurate for chat users and much less reassuring for anyone running coding agents. A single agent working through a large refactor consumes more in an hour than a chat user does in a week.',
        },
        {
          type: 'paragraph',
          text: 'To check where you stand, run <code>/usage</code> inside a Claude Code session. It reports your current consumption and which windows are close to their ceiling.',
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
          text: 'This is the honest framing for choosing: if you drive one agent at a time and mostly review its output, Pro is enough and Max is money you do not need to spend. If you keep three or four agents busy across different projects, Pro will stop you daily and Max 5x is the real entry point. Max 20x is for people running agents more or less continuously, or for a small team sharing one account, which Anthropic\'s terms do not encourage.',
        },
        {
          type: 'paragraph',
          text: 'That pattern is exactly what <a href="/en/guides/claude-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Claude Code agent swarm guide</a> covers, and it is why watching quota while agents run matters more on Claude than on a pay-per-token setup: the wall is a hard stop, not a bigger invoice.',
        },
      ],
    },
    {
      id: 'pay-per-token',
      title: 'The pay-per-token alternative: the Anthropic API',
      content: [
        {
          type: 'paragraph',
          text: 'You do not have to subscribe. Claude Code accepts an Anthropic API key and bills per token instead, with no monthly fee and no weekly wall. As of August 2026 the headline rates per million tokens are:',
        },
        {
          type: 'table',
          headers: ['Model', 'Input', 'Output'],
          rows: [
            ['Claude Opus 5', '$5.00', '$25.00'],
            ['Claude Sonnet 5', '$3.00', '$15.00'],
            ['Claude Haiku 4.5', '$1.00', '$5.00'],
          ],
          caption: 'Anthropic first-party API rates, August 2026. Bedrock and Vertex are partner-operated and priced separately.',
        },
        {
          type: 'paragraph',
          text: 'The number that decides whether this is cheap or ruinous is <strong>prompt caching</strong>. Cache reads cost roughly a tenth of the base input price, and coding agents resend a large, mostly stable context on every turn, which is exactly the traffic caches are built for. A well-behaved agent session leans heavily on the cached rate. An agent that keeps invalidating its cache does not.',
        },
        {
          type: 'paragraph',
          text: 'The trade-off is the obvious one: no monthly ceiling means a runaway agent is a runaway bill, where a subscription simply stops. For daily driving the subscription\'s predictable cost usually wins. For bursts, CI pipelines and evaluation runs, the API is cleaner, and you can set a spend cap in the console.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'You can switch per project. Claude Code reads ANTHROPIC_API_KEY when it is set, so a CI job can bill per token while your laptop keeps using the subscription. Just be careful not to leave that variable exported in the shell you code in, or you will silently pay twice.',
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
          text: 'The realistic budget framing: evaluating Claude Code costs $20 or less, using it as a daily single-agent coding assistant costs $20/month, and running it as a parallel agent workflow costs $100/month.',
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
      answer: 'As of August 2026: Pro $20 (or $17 billed annually), Max 5x from $100, Max 20x $200, and Team from $20 per seat billed annually. All of them include Claude Code and all of them share one usage pool with the Claude chat apps.',
    },
    {
      question: 'What is the difference between Max 5x and Max 20x?',
      answer: 'Only the amount of usage: 5x and 20x the Pro allowance respectively, for $100 and $200 a month. Both include the same models and the same features. Pick by how many agents you run in parallel, not by how many hours you work.',
    },
    {
      question: 'What is the Claude Code 5 hour limit?',
      answer: 'A rolling window that starts with your first message and slides forward, layered on top of the weekly limits. Heavy usage inside any 5 hour span can exhaust it, at which point Claude Code stops until the window moves. Parallel agent sessions reach it several times faster than a single terminal.',
    },
    {
      question: 'Why am I blocked on Opus but Sonnet still works?',
      answer: 'Because the weekly limit is really two limits: one across all models combined, and a separate one capping Opus. Hitting the Opus cap leaves your combined allowance intact, so Sonnet keeps working for the rest of the week.',
    },
    {
      question: 'Does unused Claude Code quota roll over?',
      answer: 'No. Both the 5 hour window and the weekly cycle reset without carrying anything forward. Burning nothing all week still leaves you starting the next cycle with the same allowance.',
    },
    {
      question: 'How do I check my Claude Code usage?',
      answer: 'Run /usage inside a Claude Code session, or open Settings then Usage in the Claude web app for the weekly reset time. If you run Claude Code inside CodeAgentSwarm, the app tracks the windows for you and shows them in its quota indicator.',
    },
  ],
}

export default guide
