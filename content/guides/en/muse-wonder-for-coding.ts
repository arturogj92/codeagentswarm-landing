import type { Guide } from '../types'

const link = 'text-neon-cyan hover:text-neon-purple transition-colors'

const guide: Guide = {
  meta: {
    slug: 'muse-wonder-for-coding',
    locale: 'en',
    title: 'Muse Wonder for Coding: Use Meta’s New Model Without Lock-In',
    metaTitle: 'Muse Wonder for Coding: Prices, Access and How to Use It',
    metaDescription: 'Meta released Muse Wonder and Wonder Full on October 12, 2026. See API prices, which Muse Code plans include Full, and how to try it without lock-in.',
    intro: 'Muse Wonder is Meta’s new frontier model for agents. Meta released it on October 12, 2026, together with a larger version called Muse Wonder Full. Developers can use Wonder through the Meta Model API and Muse Code, Meta’s coding agent for the terminal. Full is only for Muse Code subscribers. This guide covers what each model costs, how to start a coding task with Wonder, and how to run it in CodeAgentSwarm next to Claude Code, Codex and other agents. If a better model appears next month, you switch agents, not tools.',
    socialImage: '/images/guides/muse-code-og-en.png',
    ctaText: 'Run Muse Wonder in CodeAgentSwarm next to Claude Code, Codex and other agents, and switch when a better model appears. Meta account access and billing are separate.',
    ctaAgent: 'muse',
    highlightedWords: ['Muse Wonder'],
    publishedAt: '2026-10-13',
    updatedAt: '2026-10-13',
    alternateSlug: 'muse-wonder-para-programar',
    relatedSlug: 'muse-code-models-pricing-privacy',
  },
  sections: [
    {
      id: 'what-meta-released',
      title: 'What Meta released on October 12',
      content: [
        {
          type: 'image',
          src: '/icons/apps/muse-icon.svg',
          alt: 'Muse Code',
          size: 'inline',
        },
        {
          type: 'paragraph',
          text: 'Meta’s <a href="https://about.fb.com/news/2026/10/introducing-muse-wonder-models/" class="' + link + '">announcement</a> introduces two models for agent work. Meta stresses two abilities: <strong>active memory</strong>, which carries relevant details across conversations, and <strong>active focus</strong>, which keeps the agent working toward a goal when a task gets hard. For coding, the useful claim is the second one: try another approach, recover from errors and finish the task.',
        },
        {
          type: 'table',
          headers: ['Model', 'Where you can use it', 'What to know'],
          rows: [
            ['Muse Wonder (<code>muse-wonder-1.0</code>)', 'Meta Model API and Muse Code', 'Standard data tier only. 1,048,576-token context window.'],
            ['Muse Wonder Full', 'Muse Code subscriptions only', 'Not served through the API. Engadget reports it is part of the $50 Power Usage and $200 Maximum Usage plans.'],
            ['Muse Spark 1.3 (<code>muse-spark-1.3</code>)', 'Meta Model API and Muse Code', 'Earlier, cheaper model. Also offered as a Contributor variant.'],
          ],
          caption: 'Sources: Meta announcement, Meta model catalog and Engadget, checked on October 13, 2026.',
        },
        {
          type: 'paragraph',
          text: 'Meta compares both models with Claude Fable 5.1, GPT-6 Astra and Claude Opus 5.5. The next section shows the coding results.',
        },
      ],
    },
    {
      id: 'benchmarks',
      title: 'Muse Wonder benchmarks for coding',
      content: [
        {
          type: 'paragraph',
          text: 'The <a href="https://research.meta.ai/static/muse-wonder-model-card" class="' + link + '">Muse Wonder model card</a> includes a scorecard. Every model ran at maximum reasoning effort. Meta chose the benchmarks, and some competitor runs are its own best-effort tests, so read these numbers as the vendor’s view.',
        },
        {
          type: 'image',
          src: '/images/guides/muse-wonder-benchmarks-en.webp',
          alt: 'Bar chart of coding benchmarks for Muse Wonder Full, Muse Wonder, Claude Fable 5.1, GPT-6 Astra and Claude Opus 5.5',
          size: 'full',
          caption: 'Chart made by CodeAgentSwarm from the scorecard in Meta’s Muse Wonder model card, October 12, 2026.',
        },
        {
          type: 'table',
          headers: ['Benchmark', 'Wonder Full', 'Wonder', 'Fable 5.1', 'GPT-6 Astra', 'Opus 5.5'],
          rows: [
            ['Terminal-Bench 4.0-AA', '57.1', '52.0', '52.0', '59.1', '59.6'],
            ['DeepSWE 1.1', '79.0', '78.8', '67.4', '74.1', '74.2'],
            ['SWE-Marathon', '57.5', '53.1', '45.6', '42.5', '46.3'],
            ['ProgramBench', '59.0', '50.0', '55.5', '52.5', '70.5'],
            ['MemoryBench', '85.5', '85.6', '79.0', '81.4', '81.5'],
            ['Artificial Analysis Index', '56', '52', '53', '53', '58'],
          ],
          caption: 'Source: Muse Wonder model card. MemoryBench is an internal Meta benchmark. SWE-Marathon mixes agent harnesses, and Wonder Full ran with xhigh effort there.',
        },
        {
          type: 'paragraph',
          text: 'For coding, the picture is mixed. Muse Wonder leads on long tasks: 78.8 on DeepSWE 1.1 against 74.2 for Opus 5.5, and 53.1 on SWE-Marathon against 46.3. It trails Opus 5.5 on Terminal-Bench 4.0 (52.0 against 59.6) and on ProgramBench, which rebuilds programs from scratch (50.0 against 70.5).',
        },
        {
          type: 'paragraph',
          text: 'The Artificial Analysis Index is the one independent number. <a href="https://artificialanalysis.ai/models/muse-wonder" class="' + link + '">Artificial Analysis</a> lists Muse Wonder with 52 points, ninth of 216 models it ranks, and Wonder Full with 56. Claude Opus 5.5 scores 58. No model wins every row, so test the leaders on your own repository.',
        },
      ],
    },
    {
      id: 'prices',
      title: 'What Muse Wonder costs',
      content: [
        {
          type: 'paragraph',
          text: 'The <a href="https://dev.meta.ai/docs/pricing-rate-limits" class="' + link + '">Model API price list</a> gives these rates in US dollars per one million tokens. Wonder’s uncached input costs 3.2 times Spark’s, and its output costs 4.7 times.',
        },
        {
          type: 'table',
          headers: ['Token category', 'Muse Wonder 1.0', 'Muse Spark 1.3'],
          rows: [
            ['Uncached input', '$4.00', '$1.25'],
            ['Cached input', '$0.20', '$0.15'],
            ['Output', '$20.00', '$4.25'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Take a small task that uses 200,000 uncached input tokens and 20,000 output tokens. With Wonder it costs <code>0.2 × 4 + 0.02 × 20 = $1.20</code>. With Spark it costs <code>0.2 × 1.25 + 0.02 × 4.25 = $0.335</code>. That is arithmetic for one stated workload, not a forecast. A stronger model can still be cheaper per finished task if it needs fewer attempts.',
        },
        {
          type: 'paragraph',
          text: 'Muse Code subscriptions are a separate path. Meta lists Everyday Usage, High Usage, Power Usage and Maximum Usage plans, and says benefits can vary by region. Check the price shown in your own onboarding. The <a href="/en/guides/muse-code-models-pricing-privacy" class="' + link + '">models, pricing and privacy guide</a> explains how a subscription credential differs from an API key.',
        },
      ],
    },
    {
      id: 'try-in-muse-code',
      title: 'Start a coding task with Muse Wonder',
      content: [
        {
          type: 'paragraph',
          text: 'Install and sign in to Muse Code first. The <a href="/en/guides/how-to-use-muse-code" class="' + link + '">first-task guide</a> covers both. Then start a session in your project and select Wonder explicitly:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'cd /path/to/your/project\nmuse --model muse-wonder-1.0 --reasoning-effort high',
        },
        {
          type: 'paragraph',
          text: 'Inside a running session, open <code>/models</code> to switch. Muse Code 1.4.5 and later also accept <code>/model muse-wonder-1.0</code>. If your plan includes Wonder Full, look for it in <code>/models</code>. Meta’s model catalog does not list an ID for it, so this guide does not print one.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The model list depends on your account and on Meta’s rollout. On October 13, 2026, our test account with Muse Code 1.4.6 still listed only <code>muse-spark-1.3</code>. Check <code>/models</code> before you put the Wonder ID in a script.',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Find why the CSV export test fails for dates before 1970.\nExplain the call path before editing.\nMake one fix and run the existing targeted test.\nReport the diff, the test result and any open assumption.',
        },
        {
          type: 'paragraph',
          text: 'A prompt like this one has a clear finish line. That makes it easy to compare Wonder with the model you use today.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Use Muse Wonder inside CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: '<a href="/en" class="' + link + '">CodeAgentSwarm</a> runs Muse Code as one of its agents from version 2.4.0, on macOS, Windows and Linux. It does not replace the CLI or sell model access: it starts the official <code>muse</code> program with your own Meta account. In Chat view, the model menu shows the models that your Muse account returns. When Wonder appears in that list, you select it like any other model.',
        },
        {
          type: 'image',
          src: '/images/guides/muse-wonder-chat.webp',
          alt: 'CodeAgentSwarm in List mode with a Muse Code Chat using muse-wonder-1.0 next to sessions from other agents',
          size: 'full',
          caption: 'Illustrative capture: sample tasks and a simulated model list. Your menu shows the models your Muse account returns.',
        },
        {
          type: 'list',
          items: [
            'Install Muse Code and sign in once in a normal terminal.',
            'In CodeAgentSwarm, click New Agent and choose Muse Code.',
            'Open the model menu in the Chat composer and select <code>muse-wonder-1.0</code> if your account lists it.',
            'Set the reasoning level next to it. Higher levels use more tokens.',
          ],
        },
        {
          type: 'paragraph',
          text: 'New Muse sessions start with <code>muse-spark-1.3</code> unless you choose another model, and CodeAgentSwarm never switches you to Contributor without asking. The Terminal view runs the same CLI, so <code>/models</code> works there too.',
        },
      ],
    },
    {
      id: 'no-lock-in',
      title: 'Today’s best model will not stay the best',
      content: [
        {
          type: 'paragraph',
          text: 'New frontier models now arrive often. Today Muse Wonder may be the best fit for your work. Next month it may be a new Claude, GPT or Gemini model. If your tools only speak to one provider, every change means starting again with another setup and an empty history.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm works on top of the official CLIs: Claude Code, Codex CLI, Antigravity CLI, OpenCode, Kimi Code, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI. Projects, task board, notifications and searchable history stay the same whichever agent you choose. Each provider keeps its own login and billing.',
        },
        {
          type: 'image',
          src: '/images/guides/muse-wonder-model-menu.webp',
          alt: 'CodeAgentSwarm Chat model menu showing Muse models and a Continue in another LLM section with Claude Code, Codex, Antigravity and OpenCode',
          size: 'full',
          caption: 'Illustrative capture with a simulated model list: Muse models first, then the other installed agents under Continue in another LLM.',
        },
        {
          type: 'paragraph',
          text: 'The same menu has a <strong>Continue in another LLM</strong> section. Pick Claude Code or Codex there, for example, and CodeAgentSwarm opens a new session with that agent. It passes a short summary of the original request, your latest instructions and key checkpoints, plus the full transcript as a local reference. The Muse conversation stays as it was. Use this to get a second review of a Muse diff, or to keep working when one provider reaches its usage limit.',
        },
      ],
    },
    {
      id: 'compare',
      title: 'Compare Wonder with the model you use now',
      content: [
        {
          type: 'paragraph',
          text: 'Run the same task twice from the same commit: once with Muse Wonder and once with your current agent. Use separate Git worktrees so the edits do not collide. CodeAgentSwarm can create a worktree for each session.',
        },
        {
          type: 'list',
          items: [
            'Is the fix correct, and did the targeted test pass?',
            'How long did your review take?',
            'How many tokens or how much plan usage did the whole task consume, including failed attempts?',
          ],
        },
        {
          type: 'paragraph',
          text: 'Keep the winner for that kind of task, and test again when the next model ships. For the data terms behind each Muse model, read <a href="/en/guides/muse-code-models-pricing-privacy" class="' + link + '">Muse Code models, pricing and privacy</a>. To run several agents at once, see <a href="/en/guides/ai-cli-agent-swarm" class="' + link + '">the AI CLI agent swarm guide</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is Muse Wonder?',
      answer: 'Muse Wonder is Meta’s new frontier model for agents, released on October 12, 2026. It is available through the Meta Model API and Muse Code with the model ID muse-wonder-1.0.',
    },
    {
      question: 'What is the difference between Muse Wonder and Muse Wonder Full?',
      answer: 'Wonder is available through the API and Muse Code. Wonder Full is the larger version and is only available to Muse Code subscribers. Meta does not serve Full through the API.',
    },
    {
      question: 'Is Muse Wonder better than Claude Opus 5.5 for coding?',
      answer: 'It depends on the task. In Meta’s scorecard, Muse Wonder beats Opus 5.5 on DeepSWE 1.1 (78.8 against 74.2) and SWE-Marathon (53.1 against 46.3), but trails it on Terminal-Bench 4.0 (52.0 against 59.6) and ProgramBench (50.0 against 70.5). Test both on your own repository.',
    },
    {
      question: 'How much does Muse Wonder cost?',
      answer: 'On the Meta Model API it costs $4.00 per million uncached input tokens, $0.20 per million cached input tokens and $20.00 per million output tokens, checked on October 13, 2026.',
    },
    {
      question: 'Can I use Muse Wonder in CodeAgentSwarm?',
      answer: 'Yes, from CodeAgentSwarm 2.4.0, when your Muse account offers the model. Choose muse-wonder-1.0 in the Chat model menu, or use /models in the Terminal view. Access and billing stay with your Meta account.',
    },
    {
      question: 'Does CodeAgentSwarm tie me to Muse?',
      answer: 'No. CodeAgentSwarm runs the official CLIs of several providers, including Claude Code, Codex CLI and Muse Code. You can start another agent at any time or continue a conversation in another LLM from the Chat model menu.',
    },
  ],
}

export default guide
