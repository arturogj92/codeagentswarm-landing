import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-models-usage-limits",
    "locale": "en",
    "title": "Devin Pro pricing, free SWE-2 and CLI usage limits",
    "metaTitle": "Devin Pro Pricing: Free SWE-2 and CLI Usage Limits",
    "metaDescription": "Check Devin Pro pricing, the free SWE-2 promotion and its conflicting official end dates. Understand model selection, context tokens and daily or weekly quota.",
    "intro": "Looking for unlimited SWE-2 with Devin Pro? The current offer provides temporary free use in Desktop and CLI. Check the date and selected model before subscribing. Verified September 11, 2026.",
    "ctaText": "The Devin model picker and quota panel are in CodeAgentSwarm beta testing. Check the public release notes for availability; the app download does not include a Devin subscription.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-11",
    "alternateSlug": "devin-cli-modelos-cuotas",
    "socialImage": "/images/guides/devin-cli-og-en.png"
  },
  "sections": [
    {
      "id": "pro-swe-2",
      "title": "Devin Pro costs $20 per month",
      "content": [
        {
          "type": "paragraph",
          "text": "<a href=\"https://devin.ai/pricing\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Official pricing</a> lists Pro at <strong>$20 per month</strong> with free SWE-2 in Desktop and CLI through <strong>October 10, 2026</strong>."
        },
        {
          "type": "paragraph",
          "text": "On September 10, <a href=\"https://x.com/devindesktop/status/2098092331140296972\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin Desktop announced a month of unlimited usage on X</a> for Pro and Teams. The offer covers SWE-2 in Desktop and CLI."
        },
        {
          "type": "callout",
          "variant": "info",
          "content": "The <a href=\"https://docs.devin.ai/desktop/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">model documentation</a> gives a different end date: <strong>October 8, 2026</strong>. Confirm the terms in the picker and your account before paying."
        },
        {
          "type": "paragraph",
          "text": "<a href=\"https://docs.devin.ai/desktop/accounts/quota\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">The quota documentation</a> says free models do not use your allowance. While SWE-2 is marked free, that is the practical benefit of the promotion. Other paid models still consume their allowance; the announcement does not establish free Devin Cloud or unrestricted availability."
        },
        {
          "type": "paragraph",
          "text": "To assess its performance, see <a href=\"/en/guides/swe-2-benchmarks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">SWE-2 benchmarks and a repeatable test on your project</a>."
        }
      ]
    },
    {
      "id": "quick-answer",
      "title": "Choose from the models your account exposes",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "devin models list"
        },
        {
          "type": "paragraph",
          "text": "Inside the CLI, use <code>/model</code> to open its picker. The available catalog can change; organization settings may restrict it. Adaptive is a routing option, rather than a promise of one fixed underlying model. <a href=\"https://docs.devin.ai/cli/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Official model documentation</a>."
        }
      ]
    },
    {
      "id": "model-picker",
      "title": "The model picker in Chat",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-models-beta.webp",
          "alt": "Devin model picker in CodeAgentSwarm beta",
          "caption": "Real beta capture. Model names reflect the account and CLI used for this session; your catalog can differ.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "Read the selected model before sending a prompt. For a comparison, keep the task and project the same, then compare correctness and the checks that pass. A fast answer that names a nonexistent file is not a successful result."
        }
      ]
    },
    {
      "id": "meters",
      "title": "Context usage is not account quota",
      "content": [
        {
          "type": "table",
          "headers": [
            "Indicator",
            "What it tells you"
          ],
          "rows": [
            [
              "Context tokens",
              "How much conversation context the session is using."
            ],
            [
              "Daily / weekly quota",
              "Account allowance consumed within the reported window."
            ],
            [
              "Reset time",
              "When that reported allowance is due to refresh."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "A conversation can have plenty of context remaining while the account has little quota left. Conversely, starting a new conversation can reduce its context size without replenishing the account allowance."
        }
      ]
    },
    {
      "id": "quota-panel",
      "title": "Read daily and weekly usage in the beta",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-quota-beta.webp",
          "alt": "Devin daily and weekly quota panel in CodeAgentSwarm beta",
          "caption": "Real beta interface with deterministic demo quota values, 75% daily and 20% weekly. These are illustrative values, not an actual account balance or plan allowance.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "The CodeAgentSwarm beta reads the current Devin CLI profile and shows the usage windows returned for it. The percentages are used quota. A missing or failed response should not be interpreted as zero consumption."
        }
      ]
    },
    {
      "id": "plans",
      "title": "Check the plan before assuming a limit",
      "content": [
        {
          "type": "paragraph",
          "text": "Devin documents daily and weekly allowances for Pro and Teams full seats, and a weekly allowance without a daily cap for Max. Included quota can be shared across Devin products; on-demand credits have separate billing rules. Consult <a href=\"https://docs.devin.ai/admin/billing/self-serve\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin billing</a> for the current terms."
        },
        {
          "type": "paragraph",
          "text": "CodeAgentSwarm does not turn its own subscription into Devin credit. Use the Devin account dashboard to verify your plan, billing and any additional usage before deciding to continue a large task."
        }
      ]
    },
    {
      "id": "practical-check",
      "title": "A quick check before a long run",
      "content": [
        {
          "type": "list",
          "items": [
            "Confirm the Devin account on the machine running the session.",
            "Read the selected model and the available quota windows.",
            "Split the task into changes you can review and test independently."
          ]
        },
        {
          "type": "paragraph",
          "text": "If authentication is missing, return to <a href=\"/en/guides/how-to-use-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">installation and login</a>. To pick up an existing task, use <a href=\"/en/guides/devin-cli-mcp-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">history and resume</a> instead of repeatedly pasting the same project context."
        }
      ]
    },
    {
      "id": "codeagentswarm-beta",
      "title": "Devin in CodeAgentSwarm: beta status",
      "content": [
        {
          "type": "paragraph",
          "text": "The integration is being tested for an upcoming CodeAgentSwarm release. The screenshots show that beta, not a promise that the current public installer already includes Devin. Sign in with the official Devin CLI on the computer that runs the agent."
        }
      ]
    },
    {
      "id": "after-promotion",
      "title": "What changes after the promotion",
      "content": [
        {
          "type": "paragraph",
          "text": "<a href=\"https://docs.devin.ai/desktop/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">The model table</a> lists these post-promotion rates per million tokens: $3 input, $15 output and $0.30 cached input. Check the current picker price. These are usage rates, separate from the monthly subscription."
        },
        {
          "type": "paragraph",
          "text": "Budget for the end of the promotion. Keep a representative task, its results and observed usage so you can decide whether it remains worthwhile when the model is no longer marked free."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Is SWE-2 unlimited forever with Devin Pro?",
      "answer": "There is no permanent promise. The promotion is temporary, and official sources disagree between October 8 and October 10, 2026. Confirm the end date and price label in your account."
    },
    {
      "question": "Are context tokens the same as Devin quota?",
      "answer": "No. Context describes the current conversation. Account quota describes usage within the allowance windows reported for your plan."
    },
    {
      "question": "Does every Devin plan have a daily limit?",
      "answer": "No. The current Devin billing documentation describes Max as weekly quota without a daily cap. Check your actual plan and account dashboard."
    },
    {
      "question": "Does CodeAgentSwarm include Devin usage?",
      "answer": "No. Devin account access and usage are separate from the CodeAgentSwarm subscription. The integration is currently in beta testing."
    }
  ]
}

export default guide
