import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-models-subscriptions',
    locale: 'en',
    title: 'Pi models and subscriptions: ChatGPT, Claude and local providers',
    metaTitle: 'Pi Models: ChatGPT, Claude and Subscription Setup',
    metaDescription: 'Connect Pi to ChatGPT, Claude, APIs or local models. Understand subscription billing, sign in with /login and fix missing providers in the model picker.',
    intro: 'Pi can use several model providers, but the account you connect determines the available models and how usage is billed. Start by choosing the provider, then select a model. A Claude model name alone does not tell you which service is handling the request.',
    ctaText: 'Use Pi with your chosen model provider in CodeAgentSwarm 2.4.0. Download the app for macOS or Windows.',
    ctaAgent: 'pi',
    socialImage: '/images/guides/pi-coding-agent-og-en.png',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-24',
    alternateSlug: 'pi-coding-agent-modelos-suscripciones',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'Quick answer',
      content: [
        {
          type: 'image',
          src: '/icons/apps/pi-icon.svg',
          alt: 'Pi coding agent',
          size: 'inline',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Pi keeps its own provider connections. A ChatGPT subscription, an API key and a custom gateway are different ways to access models. Check the provider label in the model picker before sending a task.',
        },
      ],
    },
    {
      id: 'pi-in-action',
      title: 'Pi in CodeAgentSwarm, in pictures',
      content: [
        {
          type: 'image',
          src: '/images/guides/pi-model-picker-beta.webp',
          alt: 'Pi model picker showing the OpenAI Codex provider',
          size: 'full',
          caption: 'Models depend on the connected account. Captured in the macOS beta.',
        },
        {
          type: 'paragraph',
          text: 'The picker shows the model and its provider. You can inspect that connection without leaving the project, while Chat keeps the task messages and tools together.',
        },
      ],
    },
    {
      id: 'practical-check',
      title: 'Diagnose model access by symptom',
      content: [
        {
          type: 'table',
          headers: [
            'What you see',
            'What to check',
          ],
          rows: [
            [
              'No models',
              'Run /login inside Pi on the host that runs this session.',
            ],
            [
              'Only a custom gateway',
              'Add your intended provider through /login, preserving the gateway configuration.',
            ],
            [
              'A model appears but the request fails',
              'Read the provider error; verify account access, credentials and available usage.',
            ],
            [
              'Desktop works, Cloud does not',
              'Configure Pi on the Cloud host. Your desktop login stays on the desktop.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'Read both parts of a selection such as “GPT-5.5 · openai-codex”: the first names the model, the second identifies the connection. The screenshot is one configured account at capture time; your menu may contain a different set of models.',
        },
      ],
    },
    {
      id: 'subscription',
      title: 'Can Pi use an existing subscription?',
      content: [
        {
          type: 'table',
          headers: [
            'Connection',
            'What to expect',
          ],
          rows: [
            [
              'ChatGPT Plus or Pro',
              'Pi supports subscription sign-in through its OpenAI Codex provider.',
            ],
            [
              'Claude Pro or Max',
              'Pi documents third-party harness usage as extra usage billed per token, outside the included plan limits.',
            ],
            [
              'GitHub Copilot',
              'Sign in with GitHub; available models depend on the account and enabled access.',
            ],
            [
              'Provider API key',
              'Usage follows that API account\'s billing.',
            ],
            [
              'Local model server',
              'Connect your own inference server and a model it can serve.',
            ],
          ],
        },
        {
          type: 'paragraph',
          text: 'These are provider connections, not a subscription sold by Pi. Review <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/providers.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi\'s provider documentation</a> and <a href="https://support.claude.com/en/articles/13189465-log-in-to-your-claude-account" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Anthropic\'s rules for third-party access</a> before using a paid account. Signing in is not a guarantee that usage is included.',
        },
      ],
    },
    {
      id: 'login',
      title: 'Connect ChatGPT or another provider',
      content: [
        {
          type: 'list',
          items: [
            'Start <code>pi</code> in your project. If it is not installed, follow the <a href="/en/guides/how-to-use-pi-coding-agent" class="text-neon-cyan hover:text-neon-purple transition-colors">installation guide</a>.',
            'Enter <code>/login</code> inside Pi and choose the provider and authentication method.',
            'Complete the browser or code flow shown by Pi.',
            'Open <code>/model</code> and choose from the models available to that connection.',
          ],
        },
        {
          type: 'paragraph',
          text: 'In CodeAgentSwarm\'s Pi integration, complete this in CLI view and then open a new Pi Chat. Chat shows the model and provider together. Authenticating Codex elsewhere in CAS does not authenticate Pi: the two agents keep separate credentials.',
        },
      ],
    },
    {
      id: 'models',
      title: 'Which models can Pi use?',
      content: [
        {
          type: 'paragraph',
          text: 'The supported providers include OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Kimi and gateways such as OpenRouter. Exact model IDs change, and a provider\'s catalog is not a promise that your account can use every entry. Use the installed Pi catalog to choose rather than copying a stale model name.',
        },
        {
          type: 'paragraph',
          text: 'A model can appear through different providers. Compare the provider as well as the name when you want a particular subscription or API account to pay for the request. Reasoning and image support also depend on the selected model.',
        },
      ],
    },
    {
      "id": "inspect-catalog",
      "title": "Inspect the catalog before copying a model name",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "pi --list-models\npi --list-models codex"
        },
        {
          "type": "paragraph",
          "text": "These commands inspect the installed catalog without sending a coding task. The filtered command helps locate Codex entries; use a search term for the provider you actually connected. A listed entry is still not proof of billing eligibility or remaining allowance."
        },
        {
          "type": "paragraph",
          "text": "For a support request, record Pi version, provider, model ID and the error message. Remove account identifiers and credentials. Keep the CLI version with the result: a provider catalog can change independently of the model name in an older screenshot."
        }
      ]
    },
    {
      id: 'missing-provider',
      title: 'Why is only one provider showing?',
      content: [
        {
          type: 'paragraph',
          text: 'Check the configuration on the machine that runs Pi. A custom entry in <code>~/.pi/agent/models.json</code> can add a gateway alongside built-in providers. In CAS Chat, a suffix such as <code>· my-gateway</code> identifies that provider; it is not a different coding agent.',
        },
        {
          type: 'list',
          items: [
            'Confirm you signed in inside Pi, using the intended provider.',
            'Check which host owns the chat: desktop and CAS Cloud have separate local configuration.',
            'Preserve existing custom providers while adding another connection. Do not delete the whole configuration to change models.',
            'After signing in from CLI view, open a new Pi Chat so CAS obtains a fresh model list.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Never post <code>auth.json</code> or API keys in a support message. The provider name and model ID are enough to start diagnosing a missing option.',
        },
      ],
    },
    {
      id: 'local-models',
      title: 'Connect a local model',
      content: [
        {
          type: 'paragraph',
          text: 'Pi can connect to Ollama, LM Studio or another supported API endpoint through <code>models.json</code>. Start the model server first and use its actual model ID and endpoint. A local server with no key may still need a placeholder credential for the model to appear in Pi. <a href="https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/models.md" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Custom model configuration</a>.',
        },
        {
          type: 'paragraph',
          text: 'Test tool calls on a disposable project before handing the model a larger task. A server accepting chat requests does not prove that the selected model handles coding tools or image inputs correctly. For a comparison of agent behavior, read <a href="/en/guides/pi-vs-opencode" class="text-neon-cyan hover:text-neon-purple transition-colors">Pi vs OpenCode</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does logging into Codex in CAS also log Pi in?',
      answer: 'No. Pi has its own provider credentials. Sign in from Pi\'s CLI with /login, then open a new Pi Chat.',
    },
    {
      question: 'Does Claude Max include all Pi usage?',
      answer: 'Do not assume that. Pi documents Claude third-party harness usage as additional per-token usage, and Anthropic may charge third-party access against usage credits.',
    },
    {
      question: 'Why does the same model have a different provider suffix?',
      answer: 'The suffix identifies the connection serving that model. A custom gateway and a direct provider can expose similarly named models with different accounts and billing.',
    },
  ],
}

export default guide
