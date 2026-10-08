import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-models-ai-credits',
    locale: 'en',
    title: 'GitHub Copilot CLI models, AI credits and usage limits',
    metaTitle: 'GitHub Copilot CLI Models, AI Credits and Limits',
    metaDescription: 'How GitHub Copilot CLI uses AI credits on Free, Pro, Pro+ and Max, how to pick a model and reasoning level, and how to read monthly usage before a long run.',
    intro: 'Copilot CLI spends the monthly AI credits of your GitHub Copilot plan. Here is what each plan includes, how to choose a model and where to see what is left. Plan figures were checked against GitHub documentation on October 8, 2026.',
    ctaText: 'See the GitHub Copilot CLI monthly allowance next to your other agents and switch models from Chat in CodeAgentSwarm.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-modelos-creditos-ia',
    relatedSlug: 'how-to-use-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'plans',
      title: 'What each Copilot plan includes',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'table',
          headers: ['Copilot plan', 'Price', 'Monthly AI credits'],
          rows: [
            ['Free', 'Free', 'None; Copilot CLI uses automatic model selection within a limited monthly Chat allowance'],
            ['Pro', '$10 per month', '1,500 (1,000 base + 500 flex)'],
            ['Pro+', '$39 per month', '7,000 (3,900 base + 3,100 flex)'],
            ['Max', '$100 per month', '20,000 (10,000 base + 10,000 flex)'],
          ],
        },
        {
          type: 'paragraph',
          text: `Copilot CLI, Copilot Chat, cloud agents and Spark use AI credits. Code completions in the editor do not. The allowance resets to the full amount at 00:00 UTC on the first day of each month, and unused credits do not carry over. With a budget set, extra usage costs $0.01 per credit. Source: ${link('https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals', 'GitHub billing for individuals')}.`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Accounts on the legacy billing platform see <strong>premium requests</strong> instead of AI credits. Copilot CLI shows whichever applies to your account.',
        },
      ],
    },
    {
      id: 'models',
      title: 'Choose a model',
      content: [
        { type: 'code', language: 'bash', code: 'copilot --model auto' },
        {
          type: 'paragraph',
          text: 'Inside the CLI, <code>/model</code> opens the picker and shows the relative cost of each model. <code>auto</code> lets Copilot route each request. The catalog depends on your plan and organization policy, so the list on your machine can differ from someone else\'s. Copilot Free only offers automatic selection.',
        },
        {
          type: 'paragraph',
          text: 'In CodeAgentSwarm Chat, the model picker shows the catalog Copilot reports when the session starts. The choice is remembered for new Copilot conversations.',
        },
      ],
    },
    {
      id: 'reasoning',
      title: 'Reasoning effort is set when Copilot starts',
      content: [
        { type: 'code', language: 'bash', code: 'copilot --reasoning-effort high' },
        {
          type: 'paragraph',
          text: 'Accepted levels are <code>none</code>, <code>minimal</code>, <code>low</code>, <code>medium</code>, <code>high</code>, <code>xhigh</code> and <code>max</code>. In the ACP server used by Chat the level is also a launch option, not a per-session setting, so CodeAgentSwarm does not show an effort selector for Copilot in Chat. Higher levels usually take longer and can use more credits.',
        },
      ],
    },
    {
      id: 'context-vs-allowance',
      title: 'Context size is not your monthly allowance',
      content: [
        {
          type: 'table',
          headers: ['Where', 'What it tells you'],
          rows: [
            ['<code>/context</code>', 'How full the current conversation\'s context window is.'],
            ['<code>/usage</code>', 'Credits and tokens used by this session.'],
            ['Footer or <code>/statusline</code> quota', 'What remains of your monthly plan allowance.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Starting a new conversation empties the context window but does not give back credits. A session can have plenty of context left while the account is almost out of credits.',
        },
      ],
    },
    {
      id: 'usage-panel',
      title: 'See the monthly allowance in CodeAgentSwarm',
      content: [
        {
          type: 'image',
          src: '/images/guides/copilot-usage-panel.webp',
          alt: 'GitHub Copilot CLI monthly usage in the CodeAgentSwarm usage panel',
          caption: 'Real interface with test values: 7% left is a fixture, not a real account balance.',
          size: 'small',
        },
        {
          type: 'paragraph',
          text: 'The usage panel shows how much of the monthly allowance is left and when it resets, next to your other agents. It reads the same account information Copilot clients use, with a token from <code>COPILOT_GITHUB_TOKEN</code>, <code>GH_TOKEN</code>, <code>GITHUB_TOKEN</code> or GitHub CLI. It never opens the system keychain, because macOS would ask you for permission every time.',
        },
        {
          type: 'paragraph',
          text: 'If you signed in only with <code>copilot login</code> and have no GitHub CLI, the panel shows the allowance as not available. That means it could not read it, not that you have unlimited usage. On Copilot Free, which has no AI credits, the panel shows that monthly Chat allowance instead.',
        },
      ],
    },
    {
      id: 'before-a-long-run',
      title: 'A quick check before a long task',
      content: [
        {
          type: 'list',
          items: [
            'Confirm which GitHub account Copilot uses. If <code>gh</code> is signed in and Copilot has no login of its own, it uses the GitHub CLI account.',
            'Check the remaining allowance and the reset date.',
            'Pick the model on purpose instead of assuming <code>auto</code> picked a cheap one.',
            'Set a budget in GitHub if a large task could go past the allowance.',
          ],
        },
        {
          type: 'paragraph',
          text: `Installation and sign-in are covered in ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does GitHub Copilot CLI use AI credits or premium requests?',
      answer: 'AI credits on the current billing platform. Accounts still on the legacy platform see premium requests. Either way, Copilot CLI counts against the same monthly plan allowance as Copilot Chat.',
    },
    {
      question: 'How many AI credits does Copilot Pro include?',
      answer: 'Copilot Pro includes 1,500 AI credits per month (1,000 base and 500 flex) for $10. Pro+ includes 7,000 for $39 and Max includes 20,000 for $100, as of October 8, 2026.',
    },
    {
      question: 'When do GitHub Copilot AI credits reset?',
      answer: 'At 00:00 UTC on the first day of each calendar month. Unused credits are forfeited.',
    },
    {
      question: 'Can I choose the model on Copilot Free?',
      answer: 'No. Copilot Free uses automatic model selection only. Paid plans can pick a model with /model or the --model option.',
    },
    {
      question: 'Why does CodeAgentSwarm show my Copilot usage as not available?',
      answer: 'It needs a token from COPILOT_GITHUB_TOKEN, GH_TOKEN, GITHUB_TOKEN or a signed-in GitHub CLI. It does not read the keychain, so a login made only with copilot login is not enough.',
    },
  ],
}

export default guide
