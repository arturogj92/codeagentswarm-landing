import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-pricing',
    locale: 'en',
    title: 'Grok Build Pricing and Access: What Each xAI Plan Gets You',
    metaTitle: 'Grok Build Pricing: Free, SuperGrok and API Costs (2026)',
    metaDescription: 'Grok Build can be tried free. Compare Free, SuperGrok at $30, SuperGrok Plus at $100 and current Grok 4.6 API pricing for CI and automation.',
    intro: `Grok Build is now available to try free. xAI also lists SuperGrok at $30/month and SuperGrok Plus at $100/month for higher usage, with additional individual and business tiers shown on its live comparison page. For automation there is a separate pay-per-token route through the xAI API.

Before anything else, the disambiguation that most pages skip. Three different things are called Grok: the <strong>Grok chatbot</strong> (xAI's consumer chat app), <strong>Grok Build</strong> (xAI's official coding CLI, the <code>grok</code> command, which is what this page is about and what CodeAgentSwarm supports), and various unaffiliated community projects on GitHub named <code>grok-cli</code>. If you install the wrong one, nothing here applies.

The current source of truth is xAI's <a href="https://x.ai/build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build page</a> and <a href="https://x.ai/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">plan comparison</a>. Older articles that describe Grok Build as paid-only are no longer accurate.`,
    ctaText: 'CodeAgentSwarm is a workspace on top of your xAI access, not a reseller of it. You bring an xAI account or API key; we add multi-terminal supervision, quota visibility and searchable history.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build', 'Pricing', 'Access'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-08-25',
    alternateSlug: 'precios-y-acceso-grok-build',
  },
  sections: [
    {
      id: 'plans-at-a-glance',
      title: 'The plans at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'xAI offers Grok Build on every plan, including Free, with paid plans providing higher limits. The official pages show this current lineup as of August 25, 2026:',
        },
        {
          type: 'table',
          headers: ['Plan', 'Price', 'Grok Build', 'Notes'],
          rows: [
            ['Free', '$0', 'Yes', 'Available to try with limited usage'],
            ['SuperGrok', '$30/month', 'Yes', 'Higher rate limits'],
            ['SuperGrok Plus', '$100/month', 'Yes', 'Significantly higher usage across Build and other xAI features'],
            ['Other individual tiers', 'Check live checkout', 'Check your account', 'Lite and Heavy pricing can vary or be omitted from public page text'],
            ['xAI API', 'Per token', 'Yes, headless', 'For CI and automation'],
          ],
          caption: 'Routes into Grok Build, verified August 25, 2026. Check the live xAI page before budgeting a rollout.',
        },
        {
          type: 'paragraph',
          text: 'The important change is that payment is no longer required for evaluation. SuperGrok raises the limits, while SuperGrok Plus explicitly includes significantly higher usage across Build, Chat, Imagine and Voice. xAI lists Lite and Heavy in its comparison, but does not expose a stable public price for every tier in the page text, so use the live checkout for those plans.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'xAI changes plans quickly. Treat the table above as a dated snapshot and confirm the live checkout before committing a team. If a page says Grok Build is paid-only or quotes exact request counts without a primary xAI source, treat it as stale.',
        },
      ],
    },
    {
      id: 'what-we-do-not-know',
      title: 'What is published, and what is not',
      content: [
        {
          type: 'paragraph',
          text: 'This guide gives the prices xAI publishes. It deliberately does not invent a request quota because xAI describes limits relatively and does not publish one stable request count for every Grok Build tier.',
        },
        {
          type: 'paragraph',
          text: 'The practical planning advice still transfers: your burn rate depends on how many agents you run in parallel because each agent independently reads files, runs tools and reasons. Check the account usage view for your current limits instead of budgeting from an old article.',
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
          text: 'For unattended work, <code>XAI_API_KEY</code> is the headless path and swaps account limits for per-token billing. Grok Build is now powered by Grok 4.6. Its standard API rate is $2 per million input tokens, $0.50 per million cached input tokens and $6 per million output tokens, with higher pricing when a request exceeds 200K context.',
        },
        {
          type: 'paragraph',
          text: 'Grok 4.6 has a 500K context window. Its $2 input rate matches Claude Sonnet 5, while its $6 output rate is lower. Compare the current figures with the <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code rates</a> before choosing a CI model.',
        },
        {
          type: 'paragraph',
          text: 'The API key keeps working while credit and rate limits allow it, so unattended usage needs a budget and alerts. Set a spend cap on the xAI side and keep the key in your CI secret store rather than in the shell you code in.',
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
          text: 'What it does add is usage visibility: the app shows your xAI usage alongside your other agents, so you can react before a session stalls.',
        },
      ],
    },
    {
      id: 'vs-others',
      title: 'How Grok Build pricing compares',
      content: [
        {
          type: 'paragraph',
          text: 'Set against the other CLIs, Grok Build starts free and its standard API tier costs $2 per million input tokens, $0.50 for cached input and $6 for output.',
        },
        {
          type: 'list',
          items: [
            '<strong>Evaluation starts at $0.</strong> The official Grok Build page says it is available to try free.',
            '<strong>SuperGrok starts at $30.</strong> That is above the $20 entry plans for <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> and Cursor, but paid access is optional for a first test.',
            '<strong>SuperGrok Plus costs $100.</strong> It adds significantly higher usage across Build and other xAI features.',
            '<strong>The current API is $2 input and $6 output.</strong> Cached input is $0.50 per million tokens, and requests above 200K context cost more.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The practical reading: use the free access to test Grok Build, pay for higher limits only when your account usage proves you need them, and use the API for controlled automation. Running it alongside another agent also gives you separate provider limits, which is the argument in <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the multi-CLI swarm guide</a>.',
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
          content: 'If auth fails, check that the xAI account has Grok Build access or that the API key has credit before debugging the installation.',
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
      answer: 'Yes. xAI says Grok Build is available to try free. SuperGrok at $30/month and SuperGrok Plus at $100/month raise usage limits, while an xAI API key provides pay-per-token access for headless work.',
    },
    {
      question: 'How much does Grok Build cost per month?',
      answer: 'As of August 25, 2026, Grok Build is available on every plan, including Free. xAI lists SuperGrok at $30/month and SuperGrok Plus at $100/month. Other individual tiers appear in the live comparison, so verify their current checkout prices before paying.',
    },
    {
      question: 'What does SuperGrok Plus add for Grok Build?',
      answer: 'xAI describes SuperGrok Plus as significantly higher usage across Build, Chat, Imagine and Voice, plus priority access and faster replies. It costs $100/month compared with $30/month for SuperGrok.',
    },
    {
      question: 'How many requests does Grok Build allow?',
      answer: 'xAI does not publish one stable request count for every Grok Build tier. Limits vary by plan and can change, so check the live account usage view. Parallel agents consume the same account allowance faster than one terminal.',
    },
    {
      question: 'Can I use an API key instead of a subscription?',
      answer: 'Yes. Grok 4.6 API usage costs $2 per million input tokens, $0.50 per million cached input tokens and $6 per million output tokens at the standard context tier. Requests above 200K context cost more. Keep a capped key in the pipeline and use account login interactively.',
    },
    {
      question: 'Does CodeAgentSwarm include Grok usage?',
      answer: 'No. CodeAgentSwarm is the workspace, not a reseller. Model usage is billed by xAI or against your own API key, and running four Grok Build terminals adds no swarm fee beyond your existing allowance.',
    },
  ],
}

export default guide
