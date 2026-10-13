import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

const guide: Guide = {
  meta: {
    slug: 'gpt-6-1-sol-for-coding',
    locale: 'en',
    title: 'GPT-6.1 Sol for Coding: Price, Benchmarks and How to Use It in Codex',
    metaTitle: 'GPT-6.1 Sol for Coding: Price, Benchmarks and Codex Setup',
    metaDescription: 'OpenAI released GPT-6.1 Sol on September 29, 2026. See API prices, independent benchmarks and how to use it in Codex CLI and CodeAgentSwarm.',
    intro: 'GPT-6.1 Sol is OpenAI’s cheaper alternative to GPT-6 Astra for agentic coding. OpenAI released it on September 29, 2026, at DevDay, and says it comes close to GPT-6 Astra for one-fifth of Astra’s token price. You can use it in Codex with a Plus, Pro, Business, Enterprise or Edu plan, and in the API as <code>gpt-6.1-sol</code>.',
    ctaText: 'Run GPT-6.1 Sol in Codex inside CodeAgentSwarm, next to Claude Code and other agents, and switch models when the task needs it.',
    ctaAgent: 'codex',
    highlightedWords: ['GPT-6.1 Sol'],
    publishedAt: '2026-10-13',
    updatedAt: '2026-10-13',
    alternateSlug: 'gpt-6-1-sol-para-programar',
    relatedSlug: 'codex-plans-and-pricing',
  },
  sections: [
    {
      id: 'what-is-gpt-6-1-sol',
      title: 'What GPT-6.1 Sol is',
      content: [
        {
          type: 'paragraph',
          text: 'GPT-6.1 Sol is the upgrade to GPT-6 Sol, OpenAI’s cheaper model for long coding and agent tasks. GPT-6 Astra remains the most capable and most expensive option. As <a href="https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/" class="' + link + '">TechCrunch</a> reports, OpenAI says the new model “delivers nearly the same level of intelligence as GPT-6 Astra for agentic coding, computer use, and professional work, at one-fifth the standard input and output token prices.”',
        },
        {
          type: 'table',
          headers: ['Item', 'GPT-6.1 Sol'],
          rows: [
            ['API model ID', '<code>gpt-6.1-sol</code>'],
            ['Released', 'September 29, 2026'],
            ['Where to use it', 'Codex and ChatGPT Work on Plus, Pro, Business, Enterprise and Edu plans; OpenAI API'],
            ['Context window', '1,050,000 tokens, with up to 128,000 output tokens'],
            ['Knowledge cutoff', 'April 30, 2026'],
            ['Reasoning effort in the API', 'low, medium (default), high, xhigh, max'],
          ],
          caption: 'Source: OpenAI model documentation, checked on October 13, 2026.',
        },
        {
          type: 'paragraph',
          text: 'OpenAI also reports two gains over GPT-6 Sol. On DeepSWE, a long software-engineering benchmark, the new model is 6.4 points higher and matches Astra at about one-fifth of the cost. Its factual error rate at low effort fell from 11.4% to 7.7%. These are OpenAI’s own measurements.',
        },
      ],
    },
    {
      id: 'prices',
      title: 'What GPT-6.1 Sol costs',
      content: [
        {
          type: 'paragraph',
          text: 'The <a href="https://developers.openai.com/api/docs/models/gpt-6.1-sol" class="' + link + '">model page</a> lists these API prices in US dollars per one million tokens.',
        },
        {
          type: 'table',
          headers: ['Token category', 'GPT-6.1 Sol', 'GPT-6 Astra'],
          rows: [
            ['Input', '$2.00', '$10.00'],
            ['Cached input', '$0.10', '$1.00'],
            ['Output', '$10.00', '$50.00'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Take a task that uses 200,000 input tokens and 20,000 output tokens. With Sol it costs <code>0.2 × 2 + 0.02 × 10 = $0.60</code>. With Astra it costs <code>0.2 × 10 + 0.02 × 50 = $3.00</code>. Above 272,000 input tokens a long-context rate applies to the whole request: twice the input and cached-input price, and 1.5 times the output price. OpenAI states this threshold on Astra’s page; check it for Sol.',
        },
        {
          type: 'paragraph',
          text: 'In Codex with a ChatGPT login you do not pay per token. Each task uses part of your plan’s limits instead. The <a href="/en/guides/codex-plans-and-pricing" class="' + link + '">Codex plans and pricing guide</a> explains those limits.',
        },
      ],
    },
    {
      id: 'benchmarks',
      title: 'GPT-6.1 Sol benchmarks',
      content: [
        {
          type: 'image',
          src: '/images/guides/gpt-6-1-sol-score-price-en.webp',
          alt: 'Bar charts comparing the Artificial Analysis Intelligence Index and API output price of GPT-6.1 Sol, GPT-6 Astra, Claude Opus 5.5 and Muse Wonder',
          size: 'full',
          caption: 'Chart made by CodeAgentSwarm from Artificial Analysis scores and published API prices, October 13, 2026.',
        },
        {
          type: 'paragraph',
          text: '<a href="https://artificialanalysis.ai/models/gpt-6-1-sol" class="' + link + '">Artificial Analysis</a> runs its own tests. It gives GPT-6.1 Sol 52 points. GPT-6 Astra scores 53, Muse Wonder 52 and Claude Opus 5.5 leads with 58. Sol lands one point below Astra and costs one-fifth as much per token.',
        },
        {
          type: 'table',
          headers: ['Vals AI benchmark', 'GPT-6.1 Sol', 'Rank'],
          rows: [
            ['Vals Index', '61.15%', '9 of 47'],
            ['Terminal-Bench 4.0', '55.05%', '7 of 47'],
            ['Vibe Code Bench v1.1', '88.93%', '8 of 112'],
            ['SRE Bench', '50.76%', '2 of 33'],
          ],
          caption: 'Source: Vals AI model page, max reasoning effort, checked on October 13, 2026.',
        },
        {
          type: 'paragraph',
          text: '<a href="https://www.vals.ai/models/openai_gpt-6.1-sol" class="' + link + '">Vals AI</a> is another independent evaluator. Sol ranks near the top on terminal and operations work, not first. Each evaluator uses its own setup, so compare scores within one source, not across sources.',
        },
        {
          type: 'paragraph',
          text: 'GPT-6.1 Sol is not the strongest model, but it gives near-top results for far less money. That makes it a good default for long or frequent tasks. Keep a stronger model for the hardest problems.',
        },
      ],
    },
    {
      id: 'use-in-codex',
      title: 'Use GPT-6.1 Sol in Codex CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Start Codex with the model selected, or switch inside a session with <code>/model</code>, which also sets the reasoning effort:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'cd /path/to/your/project\ncodex -m gpt-6.1-sol',
        },
        {
          type: 'paragraph',
          text: 'To make it your default, set it in <code>~/.codex/config.toml</code>:',
        },
        {
          type: 'code',
          language: 'toml',
          code: 'model = "gpt-6.1-sol"\nmodel_reasoning_effort = "high"',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'On October 13, 2026, a ChatGPT Pro account with Codex CLI 0.159.0 already listed <code>gpt-6.1-sol</code> as its default model. Codex also offered an <code>ultra</code> reasoning level, which the API model page does not list. Check <code>/model</code> on your own plan.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Use GPT-6.1 Sol inside CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> runs the official Codex CLI with your own ChatGPT login. It does not sell model access. In Chat view, the model menu shows the models your Codex account returns, so GPT-6.1 Sol appears there as soon as your plan has it.',
        },
        {
          type: 'image',
          src: '/images/guides/gpt-6-1-sol-codex-model-menu.webp',
          alt: 'CodeAgentSwarm Chat with Codex using GPT-6.1-Sol and the model menu listing GPT-6.1-Sol, GPT-6-Astra, GPT-6-Sol, GPT-6-Luna and GPT-5.6 models',
          size: 'full',
          caption: 'Codex in CodeAgentSwarm with GPT-6.1-Sol selected. The model list matches what a ChatGPT Pro account returned on October 13, 2026. Sample conversation.',
        },
        {
          type: 'list',
          items: [
            'Install Codex CLI and run <code>codex login</code> once.',
            'In CodeAgentSwarm, click New Agent and choose Codex.',
            'Open the model menu in the Chat composer and select GPT-6.1-Sol.',
            'Set the reasoning level next to it. Higher levels use more of your plan.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The Terminal view runs the same CLI, so <code>/model</code> works there too. Projects, task board, notifications and searchable history work the same way with every agent.',
        },
      ],
    },
    {
      id: 'no-lock-in',
      title: 'Pick the model per task, not per tool',
      content: [
        {
          type: 'paragraph',
          text: 'The rankings change often. Today GPT-6.1 Sol is the cheapest of the four models in the chart, Claude Opus 5.5 leads the Artificial Analysis index and Meta reports that <a href="/en/guides/muse-wonder-for-coding" class="' + link + '">Muse Wonder</a> leads Meta’s long-task coding benchmarks. Next month the order may change again.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm runs Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI side by side. Run the same task with Sol and with another agent in separate Git worktrees, compare the diffs, and keep the winner for that kind of work. From the model menu, <strong>Continue in another LLM</strong> opens a new session with another installed agent and passes it a summary plus the full transcript.',
        },
        {
          type: 'paragraph',
          text: 'To run several agents at once, see <a href="/en/guides/ai-cli-agent-swarm" class="' + link + '">the AI CLI agent swarm guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is GPT-6.1 Sol?',
      answer: 'GPT-6.1 Sol is an OpenAI model for agentic coding and professional work, released on September 29, 2026. It is the upgrade to GPT-6 Sol and is available in Codex, ChatGPT Work and the API as gpt-6.1-sol.',
    },
    {
      question: 'How much does GPT-6.1 Sol cost?',
      answer: 'In the OpenAI API it costs $2.00 per million input tokens, $0.10 per million cached input tokens and $10.00 per million output tokens, checked on October 13, 2026. In Codex with a ChatGPT plan, usage counts against your plan limits.',
    },
    {
      question: 'Is GPT-6.1 Sol better than GPT-6 Astra?',
      answer: 'Not quite. Artificial Analysis gives Sol 52 points and Astra 53. Sol costs one-fifth of Astra’s token price, so it is often the better value for long or frequent tasks.',
    },
    {
      question: 'How do I use GPT-6.1 Sol in Codex CLI?',
      answer: 'Run codex -m gpt-6.1-sol, choose it with /model inside a session, or set model = "gpt-6.1-sol" in ~/.codex/config.toml.',
    },
    {
      question: 'Can I use GPT-6.1 Sol in CodeAgentSwarm?',
      answer: 'Yes. CodeAgentSwarm runs Codex CLI with your ChatGPT login. Choose GPT-6.1-Sol in the Chat model menu or use /model in the Terminal view.',
    },
  ],
}

export default guide
