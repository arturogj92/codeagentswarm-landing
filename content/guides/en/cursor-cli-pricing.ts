import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-pricing',
    locale: 'en',
    title: 'Cursor CLI Pricing and Usage Explained',
    metaTitle: 'Cursor CLI Pricing, Plans and Usage (2026)',
    metaDescription: 'Understand Cursor CLI pricing and usage: Hobby Free, Pro at $20, Pro+ at $60, Ultra at $200 and Teams from $40 per user monthly.',
    intro: `Cursor Agent CLI uses your Cursor account. There is no separate CodeAgentSwarm model bill for running it through ACP. You sign in with <code>cursor-agent login</code> or provide <code>CURSOR_API_KEY</code>, and Cursor applies the subscription and usage attached to that account.

As shown in Cursor's pricing documentation on August 25, 2026, Hobby is Free, Pro costs $20 per month, Pro+ $60 and Ultra $200. Teams starts at $40 per user per month. Prices and included usage can change, so confirm the <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Cursor pricing page</a> before buying.`,
    ctaText: 'Bring your own Cursor account to CodeAgentSwarm and supervise Cursor Agent sessions without moving model billing away from Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Pricing', 'Usage'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-08-25',
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
    { question: 'Is Cursor Agent CLI free?', answer: 'Cursor shows a Hobby Free plan as of August 25, 2026. The CLI uses your Cursor account, and the features or usage available to that account can change. Check cursor.com/pricing for current terms.' },
    { question: 'How much do Cursor individual plans cost?', answer: 'Cursor lists Pro at $20, Pro+ at $60 and Ultra at $200 per month as of August 25, 2026.' },
    { question: 'How much does Cursor Teams cost?', answer: 'Cursor lists Teams Standard at $40 and Teams Premium at $120 per user per month as of August 25, 2026.' },
    { question: 'How does Cursor measure included usage?', answer: 'Current individual plans use separate Cursor Models and Other Models pools. Model choice affects consumption because third-party models draw usage at their API rates.' },
    { question: 'Does CodeAgentSwarm charge for Cursor models?', answer: 'No separate model usage is created by the ACP integration. Cursor authentication, subscription and usage remain with your Cursor account or CURSOR_API_KEY.' },
  ],
}

export default guide
