import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "muse-code-models-pricing-privacy",
    "locale": "en",
    "title": "Muse Code Models, Pricing and Privacy: What to Check",
    "metaTitle": "Muse Code Models, Pricing and Privacy: What to Check",
    "metaDescription": "Compare Muse Code Standard and Contributor models, API token prices and subscriptions. Check training, retention and credentials before sending project code.",
    "intro": "Choosing a Muse model also means choosing how your project data is treated. Keep that decision separate from how you pay. This guide covers the model IDs, a worked API cost example and the account checks that prevent a subscription session from accidentally using a separate API key.",
    "socialImage": "/images/guides/muse-code-og-en.png",
    "ctaText": "Use Muse Code in CodeAgentSwarm 2.4.0 for macOS and Windows. Meta account access and billing are separate.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-24",
    "alternateSlug": "muse-code-modelos-precios-privacidad"
  },
  "sections": [
    {
      "id": "model",
      "title": "Choose an explicit model and data tier",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "For a Standard session, launch the model explicitly. The <a href=\"https://dev.meta.ai/docs/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">official model catalog</a> lists Muse Spark 1.3 and its Contributor variant. The suffix is meaningful: a model selection can change the data terms that apply to your prompts and responses."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "muse --model muse-spark-1.3 --reasoning-effort medium"
        },
        {
          "type": "table",
          "headers": [
            "Model ID",
            "Tier",
            "Training choice"
          ],
          "rows": [
            [
              "muse-spark-1.3",
              "Standard",
              "Prompts and completions excluded from training."
            ],
            [
              "muse-spark-1.3-contributor",
              "Contributor",
              "Allows training on prompts and completions."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "For a team project, record the selected model alongside the task result. If a request fails because of availability or quota, resolve that issue before changing tiers. A cheaper model is not an interchangeable fallback when its data terms differ. Ask the project owner to make that choice explicitly."
        },
        {
          "type": "paragraph",
          "text": "Do not submit sensitive, personal or confidential material to Contributor, including code you must keep confidential. Check regional eligibility as well as training consent. These restrictions are in <a href=\"https://dev.meta.ai/legal/terms-of-service\">Meta’s terms, section 6.2</a>."
        }
      ]
    },
    {
      "id": "api-prices",
      "title": "API token prices and a worked example",
      "content": [
        {
          "type": "paragraph",
          "text": "The <a href=\"https://dev.meta.ai/docs/pricing-rate-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">published API rates</a> checked on September 22, 2026 are in US dollars per one million tokens. These are metered API rates, not monthly subscription prices."
        },
        {
          "type": "table",
          "headers": [
            "Token category",
            "Standard",
            "Contributor"
          ],
          "rows": [
            [
              "Uncached input",
              "$1.25",
              "$0.10"
            ],
            [
              "Cached input",
              "$0.15",
              "$0.002"
            ],
            [
              "Output",
              "$4.25",
              "$0.20"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Suppose a small evaluation consumes 200,000 uncached input tokens and 20,000 output tokens. Standard token charges would be <code>0.2 × 1.25 + 0.02 × 4.25 = $0.335</code>. Contributor would be <code>0.2 × 0.10 + 0.02 × 0.20 = $0.024</code>. This is arithmetic for that stated workload, not a prediction of the cost of fixing one bug."
        },
        {
          "type": "paragraph",
          "text": "An agent can call the model repeatedly while inspecting files and testing an edit. Measure the whole completed task, including unsuccessful attempts, before estimating a weekly budget. The example excludes separate tool charges, taxes and any account-specific adjustments. Cached input only belongs in the calculation when usage actually reports it."
        }
      ]
    },
    {
      "id": "subscription",
      "title": "Subscription access is tied to its Muse credential",
      "content": [
        {
          "type": "paragraph",
          "text": "Meta documents Everyday Usage, High Usage and Power Usage plans. Availability and benefits can differ by region, so use the price and allowance shown during your own onboarding. The <a href=\"https://dev.meta.ai/docs/muse-code/subscriptions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">subscription documentation</a> does not establish a single monthly price for every reader."
        },
        {
          "type": "paragraph",
          "text": "Subscription access uses the credential connected during Muse Code onboarding. Additional API keys created in the account use pay-as-you-go billing. Before comparing invoices, identify which credential path each task used. Keep a short record of the date, selected model and whether the task ran through subscribed Muse access or a separate API key."
        },
        {
          "type": "paragraph",
          "text": "An API key in the environment takes precedence over a browser session. Check <a href=\"https://dev.meta.ai/docs/muse-code/auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">authentication priority</a> if you signed in but usage appears under an unexpected account. Do not print a credential to prove which route is active; inspect your shell or CI configuration and the account’s billing view."
        }
      ]
    },
    {
      "id": "privacy",
      "title": "No training does not mean zero retention",
      "content": [
        {
          "type": "paragraph",
          "text": "Standard excludes training on prompts and completions. It does not by itself establish zero retention. Meta’s <a href=\"https://dev.meta.ai/legal/terms-of-service\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Model API terms</a> describe retention and other processing, including service operation and safety. Read those terms for the selected tier before sending proprietary code."
        },
        {
          "type": "paragraph",
          "text": "Treat three questions separately: may the provider train on this content, how is submitted content retained, and what do local tools store? A local log setting cannot answer the provider-retention question. Likewise, deleting a local transcript is not evidence that a hosted service deleted the requests it received."
        },
        {
          "type": "paragraph",
          "text": "For a first evaluation, use a repository you are authorized to submit. Avoid production credentials and customer records in sample prompts. If a result needs an error log, reduce it to the lines that reproduce the problem and remove secrets before giving it to the agent. This also makes the technical task easier to inspect."
        }
      ]
    },
    {
      "id": "compare",
      "title": "Compare models with the same acceptance condition",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Find the cause of this failing validation case.\nExplain the relevant call path before editing.\nMake one correction and run the existing targeted test.\nReport the diff, test result and any unresolved assumption."
        },
        {
          "type": "paragraph",
          "text": "Run a representative task on a clean checkout and save its starting commit. Compare the correctness of the edit, review time and total usage. A fast answer that introduces a second defect is a poor result even if the token bill is small. Repeat a comparison only when the task or configuration changes enough to justify it."
        },
        {
          "type": "paragraph",
          "text": "Keep model choice stable while diagnosing <a href=\"/en/guides/muse-code-on-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Windows setup</a> or adding <a href=\"/en/guides/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP and skills</a>. Changing the model, credentials and tools together makes it harder to identify why the result changed."
        }
      ]
    },
    {
      "id": "beta",
      "title": "What CodeAgentSwarm’s beta establishes",
      "content": [
        {
          "type": "callout",
          "variant": "info",
          "content": "The Muse integration in CodeAgentSwarm 2.4.0 explicitly selects Standard unless the user chooses another model, with no silent Contributor fallback. Observed host usage is not a verified account-wide quota, and an empty usage view must not be read as unlimited remaining capacity."
        },
        {
          "type": "paragraph",
          "text": "Use <a href=\"/en/guides/how-to-use-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">the first-task guide</a> to validate the standalone CLI before adding a desktop integration. Muse is included from CodeAgentSwarm 2.4.0."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Is Muse Code free?",
      "answer": "The CLI connects to a service with metered API billing or eligible subscription access. Check your account’s current offer; installation alone does not establish a free usage allowance."
    },
    {
      "question": "Can a Muse subscription cover any API key I create?",
      "answer": "Meta’s documentation ties the subscription to the Muse Code credential connected during onboarding. Additional API keys are billed pay-as-you-go."
    },
    {
      "question": "Does Standard mean that Meta retains nothing?",
      "answer": "No. The training exclusion and retention terms are separate. Consult the current Model API terms and any arrangement applicable to your account."
    },
    {
      "question": "Should I switch to Contributor after hitting a limit?",
      "answer": "First check the content restrictions and regional eligibility. Accepting training does not permit confidential code or personal data. Diagnose the limit before deciding whether an eligible task can use Contributor."
    }
  ]
}

export default guide
