import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'cursor-cli-pricing',
    locale: 'en',
    title: 'Cursor CLI Pricing and Usage: Plans, Usage Pools and Parallel Agents',
    metaTitle: 'Cursor CLI Pricing 2026: Plans, Usage Pools and Agent Cost',
    metaDescription: 'Cursor CLI pricing: Free, Plus $8, Premium $30, Super $100, Ultra $200, Teams from $30. Plus what several Cursor Agent sessions do to your usage pool.',
    intro: `Cursor Agent CLI uses your Cursor account. There is no separate CodeAgentSwarm model bill for running it through ACP. You sign in with <code>cursor-agent login</code> or provide <code>CURSOR_API_KEY</code>, and Cursor applies the subscription and usage attached to that account.

As shown on Cursor's pricing page on October 31, 2026, the current plans are Free, Plus at $8 per month, Premium at $30, Super at $100 and Ultra at $200. Teams costs $30, $100 or $200 per seat per month. The old Hobby, Pro and Pro+ plans continue only for existing customers. Prices and included usage can change, so confirm the <a href="https://cursor.com/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official Cursor pricing page</a> before buying.`,
    ctaText: 'Bring your own Cursor account to CodeAgentSwarm and supervise Cursor Agent sessions without moving model billing away from Cursor.',
    ctaAgent: 'cursor-agent',
    highlightedWords: ['Cursor CLI', 'Pricing', 'Usage'],
    publishedAt: '2026-08-16',
    updatedAt: '2026-10-31',
    alternateSlug: 'precios-y-uso-cursor-cli',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'Cursor plans at a glance',
      content: [
        { type: 'table', headers: ['Plan', 'Published price or usage position', 'What this guide can verify'], rows: [
          ['Free', '$0', 'Agent and Chat with limited usage; no third-party models'],
          ['Plus', '$8/month', 'Cursor models only: Grok 4.7, Grok 4.6, Grok 4.5 and Composer 2.5'],
          ['Premium', '$30/month', '4x Plus usage; third-party models at API list price'],
          ['Super', '$100/month', '15x Plus usage and priority model access at peak times'],
          ['Ultra', '$200/month', '50x Plus usage and earliest access to new products and models'],
          ['Teams', '$30, $100 or $200 per seat/month', 'Pooled usage for the team'],
          ['Legacy plans', 'Existing customers only', 'Hobby, Pro, Pro+, the old Ultra and Teams seats keep two monthly pools'],
        ], caption: 'From cursor.com/pricing and Cursor\'s pricing docs, verified October 31, 2026. Verify the current page and your account before budgeting.' },
        { type: 'callout', variant: 'warning', content: 'The table records what Cursor published on October 31, 2026. It does not promise a fixed request count or model allowance. Cursor now sells the same five tiers as xAI\'s X Subscription, with one pool shared across Cursor and Grok.' },
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
        { type: 'paragraph', text: 'Each current paid plan includes <strong>one weekly pool for Cursor\'s own models</strong>: Grok 4.7, Grok 4.6, Grok 4.5 and Composer 2.5. According to <a href="https://cursor.com/docs/account/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor\'s pricing docs</a>, that pool is shared across Agent in the editor, the CLI, Cloud Agents, Grok Bot and the Grok apps. Third-party models such as Claude, GPT and Gemini are not in the pool: on Premium and above they bill at the model\'s API list price from the first request, paid from prepaid credit.' },
        { type: 'paragraph', text: 'Cursor also documents a $0.25 per million token Cursor Token Rate on eligible third-party model requests. It applies on top of the model API price; Cursor\'s own models, including Grok and Composer, are exempt. Legacy plans keep the older setup: two monthly pools, Cursor Models and Other Models, with on-demand usage instead of top-ups.' },
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
          ['1', 'One session drawing from your included usage. The pace depends on the model you picked.', 'Grok and Composer draw from the weekly pool; third-party models bill at API list price.'],
          ['2 to 3', 'Two or three sessions draw from the same weekly pool at the same time, so included usage runs down two to three times faster over the same period.', 'A long repository investigation consumes far more than a short question, so keep an eye on the long-running session.'],
          ['4 or more', 'Consumption tracks the number of sessions actually working, not the number open. Cursor does not publish a session limit.', 'Stop sessions with no useful work left, and read the usage view in your account rather than the plan label.'],
        ], caption: 'A rule of thumb, not a published rate. Cursor meters a usage pool rather than sessions, and the pool is shared with the Grok apps, so real consumption depends on the model, the work and what else you use.' },
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
        { type: 'paragraph', text: 'Cursor now prices its individual tiers like xAI: free at the bottom, $8 to start and $200 at the top. What differs across the seven agent CLIs compared here is not the headline number but how each one meters you, and that is what decides the bill once several sessions run at once.' },
        { type: 'table', headers: ['Agent', 'Free tier', 'Cheapest paid', 'Top individual tier', 'How you are billed'], rows: [
          ['Claude Code', 'No (Free plan has no Claude Code)', 'Pro, $20/month', 'Ultra, $200/month', 'Claude plan with 5 hour and weekly limits (verified Ultra accounts have no 5 hour limit); API tokens optional'],
          ['Codex CLI', 'Limited', 'Go, $8/month', 'Pro, $500/month', 'ChatGPT plan shared across the CLI, web and IDE; API tokens optional'],
          ['Kimi Code', 'CLI is free, model usage is not', 'Plus, ¥99/month', 'Ultra, ¥1,399/month', 'Membership credits plus a 5 hour Kimi Code limit; API per token'],
          ['OpenCode', 'CLI is free and open source', 'OpenCode Go, $10/month', 'Go Plus, $40/month', 'Your own provider key, prepaid Console credits per token, or a Go subscription'],
          ['Antigravity', 'Yes, with weekly rate limits', 'Google AI Plus, $4.99/month', 'Google AI Ultra 20x, $199.99/month', 'Google AI plan with rate limits and credits'],
          ['Grok Build', 'Yes, limited usage', 'X Subscription Plus, $8/month', 'X Subscription Ultra, $200/month', 'X Subscription pool shared with Grok and Cursor; API per token'],
          ['Cursor Agent', 'Free, limited usage', 'Plus, $8/month', 'Ultra, $200/month', 'Weekly pool for Cursor models; third-party models billed by usage'],
        ], caption: 'Entry and top tiers per agent CLI, all verified October 31, 2026. Prices change often; each linked guide carries its own verification date.' },
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
    { question: 'Is Cursor Agent CLI free?', answer: 'Cursor shows a Free plan with limited Agent and Chat usage as of October 31, 2026, without third-party models. The CLI uses your Cursor account, and the usage available to that account can change. Check cursor.com/pricing for current terms.' },
    { question: 'How much do Cursor individual plans cost?', answer: 'As of October 31, 2026 Cursor lists Plus at $8, Premium at $30, Super at $100 and Ultra at $200 per month. Premium gives 4x the usage of Plus, Super 15x and Ultra 50x. The old Pro and Pro+ plans continue only for existing customers.' },
    { question: 'How much does Cursor Teams cost?', answer: 'Cursor lists Teams at $30, $100 or $200 per seat per month as of October 31, 2026, with usage pooled across the team. Older Teams Standard and Premium seats continue for existing customers.' },
    { question: 'How does Cursor measure included usage?', answer: 'Current paid plans have one weekly pool for Cursor\'s own models, Grok and Composer, shared with the editor, the CLI, Cloud Agents and the Grok apps. Third-party models are billed by usage at their API list price on Premium and above. Legacy plans keep separate Cursor Models and Other Models pools.' },
    { question: 'Does CodeAgentSwarm charge for Cursor models?', answer: 'No separate model usage is created by the ACP integration. Cursor authentication, subscription and usage remain with your Cursor account or CURSOR_API_KEY.' },
    { question: 'Does Cursor CLI cost extra on top of a Cursor plan?', answer: 'No. Cursor Agent CLI uses the subscription and usage already attached to your Cursor account, whether you sign in with cursor-agent login or set CURSOR_API_KEY. CodeAgentSwarm launches the official CLI through ACP and does not create a separate model bill.' },
    { question: 'Which Cursor plan do I need to run several Cursor Agent sessions at once?', answer: 'Cursor does not publish a session limit, so the answer comes from your own usage. Every paid plan has one weekly pool for Cursor\'s own models, and parallel sessions draw from it independently, so more sessions consume the included usage faster. Check the usage view in your Cursor account before committing to a tier.' },
  ],
}

export default guide
