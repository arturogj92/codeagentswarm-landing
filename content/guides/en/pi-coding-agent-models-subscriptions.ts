import type { Guide } from '../types'

const guide: Guide = {
  meta: {
    slug: 'pi-coding-agent-models-subscriptions',
    locale: 'en',
    title: 'Pi models and subscriptions: ChatGPT, Claude and local providers',
    metaTitle: 'Pi Models: ChatGPT, Claude and Subscription Setup',
    metaDescription: 'Connect Pi to ChatGPT, Claude, APIs or local models. Understand subscription billing, sign in with /login and fix missing providers in the model picker.',
    intro: 'Pi can use several model providers, but the account you connect determines the available models and how usage is billed. Start by choosing the provider, then select a model. A Claude model name alone does not tell you which service is handling the request.',
    ctaText: 'Pi support in CodeAgentSwarm is in beta testing. The download below is the current public app; check its release notes for Pi availability.',
    ctaAgent: 'pi',
    highlightedWords: [
      'Pi',
    ],
    publishedAt: '2026-09-06',
    updatedAt: '2026-09-06',
    alternateSlug: 'pi-coding-agent-modelos-suscripciones',
  },
  sections: [
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
          text: 'In CodeAgentSwarm\'s Pi beta, complete this in CLI view and then open a new Pi Chat. Chat shows the model and provider together. Authenticating Codex elsewhere in CAS does not authenticate Pi: the two agents keep separate credentials.',
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
