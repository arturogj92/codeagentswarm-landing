import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-pricing',
    locale: 'en',
    title: 'Grok Build Pricing and Access: Plans, API Cost and Parallel Agents',
    metaTitle: 'Grok Build Pricing 2026: Free, SuperGrok and API Cost',
    metaDescription: 'Grok Build is free to try. SuperGrok $30, SuperGrok Plus $100, API $2 in and $6 out. Plus what several sessions at once do to your limits.',
    intro: `Grok Build is now available to try free. xAI also lists SuperGrok at $30/month and SuperGrok Plus at $100/month for higher usage, with additional individual and business tiers shown on its live comparison page. For automation there is a separate pay-per-token route through the xAI API.

Before anything else, the disambiguation that most pages skip. Three different things are called Grok: the <strong>Grok chatbot</strong> (xAI's consumer chat app), <strong>Grok Build</strong> (xAI's official coding CLI, the <code>grok</code> command, which is what this page is about and what CodeAgentSwarm supports), and various unaffiliated community projects on GitHub named <code>grok-cli</code>. If you install the wrong one, nothing here applies.

The current source of truth is xAI's <a href="https://x.ai/build" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build page</a> and <a href="https://x.ai/pricing" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">plan comparison</a>. Older articles that describe Grok Build as paid-only are no longer accurate.`,
    ctaText: 'CodeAgentSwarm is a workspace on top of your xAI access, not a reseller of it. You bring an xAI account or API key; we add multi-terminal supervision, quota visibility and searchable history.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build', 'Pricing', 'Access'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-09-01',
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
      id: 'parallel-agents',
      title: 'What running several Grok Build sessions at once does to the cost',
      content: [
        {
          type: 'paragraph',
          text: 'On a plan, extra sessions add no fee. They consume the same account allowance faster, because each agent independently reads files, runs tools and reasons. Four Grok Build terminals draw from exactly the allowance four separate terminals would, which is why the deciding number is how many agents you keep busy rather than which app they run in.',
        },
        {
          type: 'paragraph',
          text: 'On an API key the effect is a direct cost instead of an earlier wall. Grok 4.6 bills $2 per million input tokens, $0.50 per million cached input tokens and $6 per million output tokens at the standard context tier, with higher pricing above 200K context, so spend over an hour tracks how many agents are actually working.',
        },
        {
          type: 'table',
          headers: ['Sessions at once', 'What to expect', 'What to watch'],
          rows: [
            ['1', 'One session against your plan limits, or one stream of tokens against the API key.', 'Nothing unusual. Check the account usage view for the limits that apply to you.'],
            ['2 to 3', 'Plan limits arrive roughly two to three times sooner. On the API, token spend rises in about the same proportion.', 'Requests above 200K context cost more, and long investigations reach that tier faster.'],
            ['4 or more', 'No swarm fee on the xAI side, but the shared allowance drains at the pace of the busy agents.', 'On an API key, set a spend cap on the xAI side before leaving agents unattended.'],
          ],
          caption: 'A rule of thumb, not a published quota. xAI describes limits relatively and does not publish one stable request count for every Grok Build tier.',
        },
        {
          type: 'paragraph',
          text: 'How to divide work between those sessions, and how to stop them duplicating each other, is in <a href="/en/guides/grok-build-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Grok Build agent swarm guide</a>.',
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
          text: 'Every number in that table has its own page with the full tier list and the fine print: <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex</a>, <a href="/en/guides/kimi-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code</a>, <a href="/en/guides/opencode-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">OpenCode</a>, <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity</a> and <a href="/en/guides/cursor-cli-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Cursor CLI</a>.',
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
    {
      question: 'Is there a Grok Build subscription?',
      answer: 'Not a standalone one. Grok Build comes with your xAI plan: Free with limited usage, SuperGrok at $30/month and SuperGrok Plus at $100/month, with other individual tiers shown in the live comparison. An xAI API key is the separate pay-per-token route for headless work.',
    },
    {
      question: 'Does Grok Build cost more when several sessions run at once?',
      answer: 'On a plan there is no extra fee, but the shared account limits arrive faster because each session reads files, runs tools and reasons on its own. On an API key it is a direct cost: Grok 4.6 bills $2 per million input tokens and $6 per million output tokens at the standard context tier, and more above 200K context.',
    },
  ],
}

export default guide
