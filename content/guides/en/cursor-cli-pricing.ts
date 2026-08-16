import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-pricing',
    locale: 'en',
    title: 'Cursor CLI Pricing and Usage Explained',
    metaTitle: 'Cursor CLI Pricing, Plans and Usage (2026)',
    metaDescription: 'Understand Cursor CLI pricing and usage: Hobby Free, Pro from $20 monthly, Teams at $40 per user monthly and the current 3x and 20x options.',
    intro: `Cursor Agent CLI uses your Cursor account. There is no separate CodeAgentSwarm model bill for running it through ACP. You sign in with <code>cursor-agent login</code> or provide <code>CURSOR_API_KEY</code>, and Cursor applies the subscription and usage attached to that account.

As shown on Cursor's pricing page on 16 August 2026, Hobby is Free, Pro starts at $20 per month and Teams costs $40 per user per month. Cursor also shows individual options with 3x and 20x usage. Prices and included usage can change, so confirm the <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Cursor pricing page</a> before buying.`,
    ctaText: 'Bring your own Cursor account to CodeAgentSwarm and supervise Cursor Agent sessions without moving model billing away from Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Pricing', 'Usage'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-16',
    alternateSlug: 'precios-y-uso-cursor-cli',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'Cursor plans at a glance',
      content: [
        { type: 'table', headers: ['Plan', 'Published price or usage position', 'What this guide can verify'], rows: [
          ['Hobby', 'Free', 'The free individual entry plan'],
          ['Pro', 'From $20/month', 'The paid individual entry plan'],
          ['Pro+', '3x Pro Agent limits', 'The higher individual usage tier'],
          ['Ultra', '20x Pro Agent limits', 'The power-user tier'],
          ['Teams', '$40/user/month', 'Per-user team pricing'],
        ], caption: 'Cursor pricing changes over time. Verify the current page and your account before budgeting.' },
        { type: 'callout', variant: 'warning', content: 'The table records what Cursor displayed on 16 August 2026. It does not promise a fixed price, request count or model allowance.' },
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
      id: 'usage-multipliers',
      title: 'What the 3x and 20x usage labels mean',
      content: [
        { type: 'paragraph', text: 'Cursor currently presents higher individual tiers with 3x and 20x usage labels. Those multipliers describe relative included usage on the pricing page. They are not a verified promise of a fixed number of agent requests.' },
        { type: 'paragraph', text: 'Actual consumption depends on the work, selected model and number of active sessions. A long repository investigation can consume more than a short question, and several parallel agents draw usage independently.' },
        { type: 'callout', variant: 'info', content: 'Check the usage information inside your Cursor account for the allowance that applies to you. Public plan labels are not a substitute for account-specific usage data.' },
      ],
    },
    {
      id: 'parallel-agents',
      title: 'Budget usage for multiple Cursor agents',
      content: [
        { type: 'paragraph', text: 'A parallel workflow can finish independent tasks sooner, but it also has more sessions reading code and invoking models. Give each agent a clear task and stop sessions that no longer have useful work.' },
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
      id: 'choose-a-plan',
      title: 'Choose a plan with your own workload',
      content: [
        { type: 'list', items: ['Start with the current plan available to your account and test representative repository work.', 'Watch Cursor account usage while running one session before adding parallel agents.', 'Compare individual and Teams requirements using the current official pricing page.', 'Recheck pricing before renewal or a team rollout because plan terms can change.'] },
        { type: 'paragraph', text: 'A pricing page cannot predict the cost of your repository. Measure a normal week of tasks, then choose the smallest plan that covers that workload with reasonable room.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Cursor Agent CLI free?', answer: 'Cursor shows a Hobby Free plan as of 16 August 2026. The CLI uses your Cursor account, and the features or usage available to that account can change. Check cursor.com/pricing for current terms.' },
    { question: 'How much does Cursor Pro cost?', answer: 'Cursor lists Pro from $20 per month as of 16 August 2026. Verify the official pricing page because prices and included usage can change.' },
    { question: 'How much does Cursor Teams cost?', answer: 'Cursor lists Teams at $40 per user per month as of 16 August 2026. Confirm current billing terms with Cursor before a rollout.' },
    { question: 'What do 3x and 20x mean on Cursor pricing?', answer: 'They are relative usage labels shown for higher individual options. They do not establish a fixed number of agent requests in this guide.' },
    { question: 'Does CodeAgentSwarm charge for Cursor models?', answer: 'No separate model usage is created by the ACP integration. Cursor authentication, subscription and usage remain with your Cursor account or CURSOR_API_KEY.' },
  ],
}

export default guide
