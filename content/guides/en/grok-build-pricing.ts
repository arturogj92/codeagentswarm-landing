import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-pricing',
    locale: 'en',
    title: 'Grok Build Pricing and Access: What Each xAI Plan Gets You',
    metaTitle: 'Grok Build Pricing: SuperGrok, X Premium+ and Heavy (2026)',
    metaDescription: 'Every route into Grok Build: SuperGrok at $30, X Premium+ at $40, SuperGrok Heavy at $300, and the xAI API for CI. What is verified, what is not, and what CodeAgentSwarm bills.',
    intro: `There is no standalone Grok Build subscription. Access rides on an xAI or X plan, and as of August 2026 that means: SuperGrok at $30/month, X Premium+ at $40/month, or SuperGrok Heavy at $300/month with the highest limits. For automation there is a separate pay-per-token route through the xAI API.

Before anything else, the disambiguation that most pages skip. Three different things are called Grok: the <strong>Grok chatbot</strong> (xAI's consumer chat app), <strong>Grok Build</strong> (xAI's official coding CLI, the <code>grok</code> command, which is what this page is about and what CodeAgentSwarm supports), and various unaffiliated community projects on GitHub named <code>grok-cli</code>. If you install the wrong one, nothing here applies.

The access story has already changed once, and knowing that matters more than any single number: Grok Build launched on 14 May 2026 restricted to SuperGrok Heavy only, and ten days later xAI opened it to the far cheaper SuperGrok and X Premium+ tiers. Anything written in that first window is wrong now.`,
    ctaText: 'CodeAgentSwarm is a workspace on top of your xAI access, not a reseller of it. You bring SuperGrok, X Premium+ or an API key; we add multi-terminal supervision, quota visibility and searchable history.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build', 'Pricing', 'Access'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-05',
    alternateSlug: 'precios-y-acceso-grok-build',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'Grok Build is bundled into xAI and X subscriptions rather than sold on its own. As of August 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'Grok Build', 'Notes'],
          rows: [
            ['Free', '$0', 'No', 'Chat only'],
            ['SuperGrok', '$30/month', 'Yes', 'The cheapest route in'],
            ['X Premium+', '$40/month', 'Yes', 'Same CLI access, bundled with X'],
            ['SuperGrok Heavy', '$300/month', 'Yes', 'Highest limits; the only tier at launch'],
            ['xAI API', 'Per token', 'Yes, headless', 'For CI and automation'],
          ],
          caption: 'Routes into Grok Build, August 2026. Verify on your xAI account before budgeting a rollout.',
        },
        {
          type: 'paragraph',
          text: 'Two things worth pulling out. First, <strong>SuperGrok at $30 and X Premium+ at $40 both unlock the same CLI</strong>, so if you do not otherwise want X, SuperGrok is the cheaper door. Second, the $300 Heavy tier is not a different product; it is the same Grok Build with much higher limits, which matters only if you run agents more or less continuously.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'xAI moves fast and has already repriced access to this CLI once. Treat the table above as dated rather than permanent, and confirm on your own account before committing a team. If a page quotes exact "requests per hour" for Grok Build without a primary xAI source, treat it as stale.',
        },
      ],
    },
    {
      id: 'what-we-do-not-know',
      title: 'What is published, and what is not',
      content: [
        {
          type: 'paragraph',
          text: 'This guide gives prices because prices are published. It deliberately does not give you a request quota, because xAI does not publish one for Grok Build at any tier, and every article that states a specific number has invented it.',
        },
        {
          type: 'paragraph',
          text: 'What is observable is the shape of the metering: <strong>usage is tracked on a weekly cycle</strong>, in the same way Anthropic and Moonshot meter their coding agents. So the practical planning advice transfers. Your burn rate depends on how many agents you run in parallel far more than on how many hours you sit at the keyboard, because each agent independently reads files, runs tools and reasons.',
        },
        {
          type: 'paragraph',
          text: 'If you are pricing a parallel-agent workflow, that is the number that decides your tier, and it is the argument developed in <a href="/en/guides/grok-build-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Grok Build agent swarm guide</a>.',
        },
      ],
    },
    {
      id: 'api-route',
      title: 'The pay-per-token route: the xAI API',
      content: [
        {
          type: 'paragraph',
          text: 'For anything unattended, <code>XAI_API_KEY</code> is the headless path and swaps the subscription quota for per-token billing. As of August 2026 the coding model is priced at roughly $0.20 per million input tokens and $1.50 per million output tokens.',
        },
        {
          type: 'paragraph',
          text: 'Those are aggressive rates by the standards of this category, and it makes the API genuinely attractive rather than a fallback. Compare against the <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code rates</a>, where output runs an order of magnitude higher.',
        },
        {
          type: 'paragraph',
          text: 'The usual trade applies: a subscription stops when you hit the wall, an API key keeps going and bills you. For a CI pipeline that is exactly what you want, because a build should not fail because a person exhausted their personal allowance. Set a spend cap on the xAI side and keep the key in your CI secret store rather than in the shell you code in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Interactive: browser login on first launch\ngrok\n\n# Headless / CI\nexport XAI_API_KEY=...\ngrok -p "run the migration and report what changed"',
        },
      ],
    },
    {
      id: 'cas-cost',
      title: 'What CodeAgentSwarm costs on top',
      content: [
        {
          type: 'paragraph',
          text: 'Nothing on the model side. <a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a> does not resell Grok tokens and does not sit between you and xAI. You pay xAI or X for model access, exactly as you would running <code>grok</code> in a bare terminal.',
        },
        {
          type: 'paragraph',
          text: 'Running four Grok Build terminals inside CodeAgentSwarm therefore adds no swarm fee on the xAI side. It draws from the same allowance four separate terminals would, just with the sessions labelled, their status visible and their history searchable.',
        },
        {
          type: 'paragraph',
          text: 'What it does add is the thing a weekly quota makes valuable: the app reads your real SuperGrok usage and shows it alongside your other agents, so you see the wall approaching while the agents work instead of discovering it from a stalled terminal.',
        },
      ],
    },
    {
      id: 'vs-others',
      title: 'How Grok Build pricing compares',
      content: [
        {
          type: 'paragraph',
          text: 'Set against the other CLIs, Grok Build sits at the expensive end of the entry tier and the cheap end of the API.',
        },
        {
          type: 'list',
          items: [
            '<strong>Entry price is the highest in the category.</strong> $30 against $20 for <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> and <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a>, and $8 for <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a> on its Go plan.',
            '<strong>There is no free tier.</strong> Like Claude Code and unlike Antigravity, you cannot evaluate Grok Build without paying.',
            '<strong>The API undercuts everyone.</strong> At roughly $0.20 and $1.50 per million tokens it is dramatically cheaper per token than the frontier alternatives, which makes it a strong candidate for automation even if you drive something else interactively.',
            '<strong>The top tier is in a different league.</strong> $300 for Heavy against $200 for the most expensive Claude and ChatGPT tiers.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The honest reading: Grok Build is not the cheapest way to get one agent, and it is a strong candidate for the automation half of a mixed setup. Running it alongside another agent also means two entirely separate quotas, so exhausting one rarely stops the whole session, which is the argument in <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the multi-CLI swarm guide</a>.',
        },
      ],
    },
    {
      id: 'check',
      title: 'How to verify on your machine',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# Which CLI do you actually have?\ngrok --version\n\n# First interactive launch surfaces auth if you are not signed in\ngrok',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If auth fails, check your subscription status on the xAI or X account side before debugging anything else. An expired plan and a broken install look identical from the terminal.',
        },
        {
          type: 'paragraph',
          text: 'Grok Build keeps its data under <code>~/.grok</code>, relocatable with <code>GROK_HOME</code>. That is also where sessions live, which matters when you want to find an old one: see <a href="/en/guides/grok-build-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">the Grok Build conversation history guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Grok Build free?',
      answer: 'No. There is no free tier and no standalone Grok Build subscription. The cheapest route is SuperGrok at $30/month, with X Premium+ at $40/month unlocking the same CLI, or a pay-per-token xAI API key for headless use.',
    },
    {
      question: 'How much does Grok Build cost per month?',
      answer: 'As of August 2026: SuperGrok $30, X Premium+ $40, and SuperGrok Heavy $300 for the highest limits. All three unlock the same CLI; the tiers differ in how much you can use it.',
    },
    {
      question: 'What is the difference between SuperGrok and X Premium+ for Grok Build?',
      answer: 'For CLI access, nothing: both unlock Grok Build. X Premium+ costs $10 more and bundles X features. If you do not want those, SuperGrok is the cheaper door.',
    },
    {
      question: 'How many requests does Grok Build allow?',
      answer: 'xAI does not publish a request quota for Grok Build at any tier, so any article stating a specific number has invented it. What is observable is that usage is metered on a weekly cycle, and that parallel agents burn through it several times faster than a single terminal.',
    },
    {
      question: 'Can I use an API key instead of a subscription?',
      answer: 'Yes, for headless and CI use via XAI_API_KEY, billed per token at roughly $0.20 per million input and $1.50 per million output tokens. Interactive browser login remains the default for humans. Running both is a valid setup: the subscription for your laptop, a capped key for the pipeline.',
    },
    {
      question: 'Does CodeAgentSwarm include Grok usage?',
      answer: 'No. CodeAgentSwarm is the workspace, not a reseller. Model usage is billed by xAI or against your own API key, and running four Grok Build terminals adds no swarm fee beyond your existing allowance.',
    },
  ],
}

export default guide
