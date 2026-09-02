import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-pricing',
    locale: 'en',
    title: 'Cursor CLI Pricing and Usage: Plans, Usage Pools and Parallel Agents',
    metaTitle: 'Cursor CLI Pricing 2026: Plans, Usage Pools and Agent Cost',
    metaDescription: 'Cursor CLI pricing: Hobby free, Pro $20, Pro+ $60, Ultra $200, Teams from $40. Plus what several Cursor Agent sessions do to your usage pools.',
    intro: `Cursor Agent CLI uses your Cursor account. There is no separate CodeAgentSwarm model bill for running it through ACP. You sign in with <code>cursor-agent login</code> or provide <code>CURSOR_API_KEY</code>, and Cursor applies the subscription and usage attached to that account.

As shown in Cursor's pricing documentation on August 25, 2026, Hobby is Free, Pro costs $20 per month, Pro+ $60 and Ultra $200. Teams starts at $40 per user per month. Prices and included usage can change, so confirm the <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Cursor pricing page</a> before buying.`,
    ctaText: 'Bring your own Cursor account to CodeAgentSwarm and supervise Cursor Agent sessions without moving model billing away from Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Pricing', 'Usage'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-09-01',
    alternateSlug: 'precios-y-uso-cursor-cli',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'Cursor plans at a glance',
      content: [
        { type: 'table', headers: ['Plan', 'Published price or usage position', 'What this guide can verify'], rows: [
          ['Hobby', 'Free', 'The free individual entry plan'],
          ['Pro', '$20/month', 'Includes Cursor Models and Other Models usage pools'],
          ['Pro+', '$60/month', 'More included usage for daily Agent work'],
          ['Ultra', '$200/month', 'The individual power-user tier'],
          ['Teams Standard', '$40/user/month', 'Team administration and shared controls'],
          ['Teams Premium', '$120/user/month', 'Five times the Standard Agent limits'],
        ], caption: 'Cursor pricing changes over time. Verify the current page and your account before budgeting.' },
        { type: 'callout', variant: 'warning', content: 'The table records what Cursor documented on August 25, 2026. It does not promise a fixed request count or model allowance.' },
      ],
    },
    {
      id: 'cli-access',
      title: 'How Cursor Agent CLI access is billed',
      content: [
        { type: 'paragraph', text: 'Cursor Agent CLI is part of the Cursor account ecosystem. Interactive use starts with <code>cursor-agent login</code>. A non-interactive setup can use <code>CURSOR_API_KEY</code>. In both cases, authentication and usage remain with Cursor.' },
        { type: 'paragraph', text: 'CodeAgentSwarm launches the official CLI through <code>cursor-agent acp</code>. It presents streaming responses, tools and permissions, but it does not replace Cursor as the model provider.' },
        { type: 'paragraph', text: 'Installation, modes, model selection and MCP setup are covered in the <a href="/en/guides/cursor-agent-cli-acp-codeagentswarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent CLI ACP guide</a>.' },
      ],
    },
    {
      id: 'usage-pools',
      title: 'How the current usage pools work',
      content: [
        { type: 'paragraph', text: 'Pro, Pro+ and Ultra now include two monthly pools. Cursor Models covers Grok and Composer models. Other Models covers third-party models at their API rates. The model you choose therefore changes how quickly the included usage is consumed.' },
        { type: 'paragraph', text: 'Cursor also documents a $0.25 per million token Cursor Token Rate for third-party models on Teams and Enterprise. It applies on top of the model API price; first-party Cursor models are exempt.' },
        { type: 'paragraph', text: 'Actual consumption depends on the work, selected model and number of active sessions. A long repository investigation can consume more than a short question, and several parallel agents draw usage independently.' },
        { type: 'callout', variant: 'info', content: 'Check the usage information inside your Cursor account for the allowance that applies to you. Public plan labels are not a substitute for account-specific usage data.' },
      ],
    },
    {
      id: 'parallel-agents',
      title: 'Budget usage for multiple Cursor agents',
      content: [
        { type: 'paragraph', text: 'A parallel workflow can finish independent tasks sooner, but it also has more sessions reading code and invoking models. Give each agent a clear task and stop sessions that no longer have useful work.' },
        { type: 'table', headers: ['Sessions at once', 'What to expect', 'What to watch'], rows: [
          ['1', 'One session drawing from your included usage. The pace depends on the model you picked.', 'Cursor Models covers Grok and Composer; Other Models draws at third-party API rates.'],
          ['2 to 3', 'Two or three sessions draw from the same monthly pools at the same time, so included usage runs down two to three times faster over the same period.', 'A long repository investigation consumes far more than a short question, so keep an eye on the long-running session.'],
          ['4 or more', 'Consumption tracks the number of sessions actually working, not the number open. Cursor does not publish a session limit.', 'Stop sessions with no useful work left, and read the usage view in your account rather than the plan label.'],
        ], caption: 'A rule of thumb, not a published rate. Cursor meters usage pools rather than sessions, so real consumption depends on the model and the work.' },
        { type: 'paragraph', text: 'The <a href="/en/guides/cursor-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor Agent swarm guide</a> covers task boundaries, modes, permissions and cancellation. Those controls help you avoid wasting usage on duplicate work.' },
      ],
    },
    {
      id: 'history-cost',
      title: 'Does resuming a Cursor session affect usage?',
      content: [
        { type: 'paragraph', text: 'A resumed session continues to use Cursor models under the same account. CodeAgentSwarm does not create a separate quota for resumed conversations.' },
        { type: 'paragraph', text: 'ACP resume is conditional on the installed CLI reporting <code>loadSession</code>. The <a href="/en/guides/cursor-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI conversation history guide</a> explains how CodeAgentSwarm handles older versions.' },
      ],
    },
    {
      id: 'compare-across-agents',
      title: 'How Cursor CLI pricing compares with the other agent CLIs',
      content: [
        { type: 'paragraph', text: 'Cursor prices its individual tiers at the same points as most of this category: free at the bottom, $20 in the middle, $200 at the top. What differs across the seven agent CLIs is not the headline number but how each one meters you, and that is what decides the bill once several sessions run at once.' },
        { type: 'table', headers: ['Agent', 'Free tier', 'Cheapest paid', 'Top individual tier', 'How you are billed'], rows: [
          ['Claude Code', 'No (Free plan has no Claude Code)', 'Pro, $20/month', 'Max 20x, $200/month', 'Subscription with 5 hour and weekly windows; API tokens optional'],
          ['Codex CLI', 'Limited', 'Go, $8/month', 'Pro, $200/month', 'ChatGPT subscription shared with web and IDE; API tokens optional'],
          ['Kimi Code', 'CLI is free, model usage is not', 'Andante, ¥49/month', 'Allegro, ¥699/month', 'Membership with weekly and 5 hour limits; API per token'],
          ['OpenCode', 'CLI is free and open source', 'None, pay as you go', 'None', 'Your own provider key, or OpenCode Zen prepaid per token'],
          ['Antigravity', 'Yes, with weekly rate limits', 'Google AI Plus, around $8/month', 'Google AI Ultra 20x, $200/month', 'Google AI plan with rate limits and credits'],
          ['Grok Build', 'Yes, limited usage', 'SuperGrok, $30/month', 'SuperGrok Plus, $100/month', 'xAI plan rate limits; API per token'],
          ['Cursor Agent', 'Hobby, free', 'Pro, $20/month', 'Ultra, $200/month', 'Cursor plan with usage pools per model'],
        ], caption: 'Entry and top tiers per agent CLI, all verified August 25, 2026. Prices change often; each linked guide carries its own verification date.' },
        { type: 'paragraph', text: 'Every number in that table has its own page with the full tier list and the fine print: <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a> and <a href="/en/guides/grok-build-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build</a>.' },
      ],
    },
    {
      id: 'choose-a-plan',
      title: 'Choose a plan with your own workload',
      content: [
        { type: 'list', items: ['Start with the current plan available to your account and test representative repository work.', 'Watch Cursor account usage while running one session before adding parallel agents.', 'Compare individual and Teams requirements using the current official pricing page.', 'Recheck pricing before renewal or a team rollout because plan terms can change.'] },
        { type: 'paragraph', text: 'A pricing page cannot predict the cost of your repository. Measure a normal week of tasks, then choose the smallest plan that covers that workload with reasonable room.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Cursor Agent CLI free?', answer: 'Cursor shows a Hobby Free plan as of August 25, 2026. The CLI uses your Cursor account, and the features or usage available to that account can change. Check cursor.com/pricing for current terms.' },
    { question: 'How much do Cursor individual plans cost?', answer: 'Cursor lists Pro at $20, Pro+ at $60 and Ultra at $200 per month as of August 25, 2026.' },
    { question: 'How much does Cursor Teams cost?', answer: 'Cursor lists Teams Standard at $40 and Teams Premium at $120 per user per month as of August 25, 2026.' },
    { question: 'How does Cursor measure included usage?', answer: 'Current individual plans use separate Cursor Models and Other Models pools. Model choice affects consumption because third-party models draw usage at their API rates.' },
    { question: 'Does CodeAgentSwarm charge for Cursor models?', answer: 'No separate model usage is created by the ACP integration. Cursor authentication, subscription and usage remain with your Cursor account or CURSOR_API_KEY.' },
    { question: 'Does Cursor CLI cost extra on top of a Cursor plan?', answer: 'No. Cursor Agent CLI uses the subscription and usage already attached to your Cursor account, whether you sign in with cursor-agent login or set CURSOR_API_KEY. CodeAgentSwarm launches the official CLI through ACP and does not create a separate model bill.' },
    { question: 'Which Cursor plan do I need to run several Cursor Agent sessions at once?', answer: 'Cursor does not publish a session limit, so the answer comes from your own usage. Pro, Pro+ and Ultra include the Cursor Models and Other Models pools, and parallel sessions draw from them independently, so more sessions consume the included usage faster. Check the usage view in your Cursor account before committing to a tier.' },
  ],
}

export default guide
