import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "swe-2-benchmarks",
    "locale": "en",
    "title": "SWE-2 benchmarks: results, limits and how to test it",
    "metaTitle": "SWE-2 Benchmarks: Results vs Fable and GPT-6",
    "metaDescription": "Compare published SWE-2 benchmarks with Fable 5.1 and GPT-6 Astra. Understand the evaluation setup and test a real repository task before choosing a model.",
    "intro": "Choosing a coding model means checking which tasks it solves, how long it takes and how much work it leaves for the reviewer. This guide brings together published results and a simple way to test whether SWE-2 fits your project.",
    "ctaText": "Try the Devin model picker and compare conversations in CodeAgentSwarm 2.4.0.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "SWE-2"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-24",
    "alternateSlug": "swe-2-benchmarks-comparativa",
    "socialImage": "/images/guides/devin-cli-og-en.png"
  },
  "sections": [
    {
      "id": "what-is-swe-2",
      "title": "What is SWE-2, and how is it related to Devin?",
      "content": [
        {
          "type": "paragraph",
          "text": "SWE-2 is Cognition’s coding model. Devin CLI is an agent that can run it and other models. SWE-bench is a benchmark name, not another name for SWE-2. Keep the model, agent and evaluation separate when reading a score or choosing what to install."
        },
        {
          "type": "paragraph",
          "text": "To try it, follow <a href=\"/en/guides/how-to-use-devin-cli\">Devin CLI setup</a>, open <code>/model</code> and select SWE-2 from your account’s catalog. Check the <a href=\"/en/guides/devin-cli-models-usage-limits\">pricing and quota guide</a> before a long test. The published comparison below was checked against Cognition’s source on September 22, 2026."
        }
      ]
    },
    {
      "id": "published-results",
      "title": "Results published by Cognition",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "<a href=\"https://cognition.com/blog/swe-2\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cognition published this comparison</a> on September 10, 2026. These are vendor-reported figures, not tests run by CodeAgentSwarm."
        },
        {
          "type": "table",
          "headers": [
            "Benchmark",
            "SWE-2",
            "Fable 5.1",
            "GPT-6 Astra"
          ],
          "rows": [
            [
              "FrontierCode 1.1 Main",
              "50.0%",
              "50.9%",
              "53.3%"
            ],
            [
              "DeepSWE 1.1",
              "73.0%",
              "67.4%",
              "74.1%"
            ],
            [
              "Terminal-Bench 2.1",
              "92.8%",
              "91.4%",
              "89.9%"
            ],
            [
              "Terminal-Bench 4",
              "27.3%",
              "55.8%",
              "57.9%"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "SWE-2 stands out on Terminal-Bench 2.1 but trails substantially on Terminal-Bench 4. The choice depends on the task."
        }
      ]
    },
    {
      "id": "methodology",
      "title": "How to read this comparison",
      "content": [
        {
          "type": "paragraph",
          "text": "The <a href=\"https://cognition.com/blog/swe-2#appendix-a-evaluation-methodology\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">methodology appendix</a> combines public results with internal evaluations, uses different agents and selects the best reasoning effort per model. It is not a fixed-configuration comparison."
        },
        {
          "type": "paragraph",
          "text": "<a href=\"https://cognition.com/blog/frontier-code-1.1\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">FrontierCode 1.1 Main</a> contains the 100 hardest tasks from Extended. Cognition develops both this benchmark and SWE-2. Keep that relationship in mind when interpreting the results."
        },
        {
          "type": "paragraph",
          "text": "Keep the benchmark name and version attached to every score. An aggregate result is not the probability that an agent will solve your next bug: your project may use different tools, languages and constraints."
        }
      ]
    },
    {
      "id": "reasoning",
      "title": "Choose a specific reasoning effort",
      "content": [
        {
          "type": "paragraph",
          "text": "<a href=\"https://docs.devin.ai/desktop/models\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">The model documentation</a> lists SWE-2 Medium, High and Max. Record which one you test so you can repeat the comparison."
        },
        {
          "type": "image",
          "src": "/images/guides/devin-models-beta.webp",
          "alt": "Devin model picker in CodeAgentSwarm beta",
          "caption": "Real beta capture showing the picker. It does not depict a benchmark run.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "Start with the effort you would normally use and retry failures that justify more time. If you change effort, keep the failed attempt in your record too: discarding it would make the comparison look better than it was."
        }
      ]
    },
    {
      "id": "your-repository",
      "title": "A small test on your repository",
      "content": [
        {
          "type": "paragraph",
          "text": "This is our suggested local evaluation; we have not run this protocol as a SWE-2 benchmark. Pick a reproducible bug, an interface change and a maintenance task that you know well."
        },
        {
          "type": "list",
          "items": [
            "Use the same starting commit, dependencies and tests for each attempt.",
            "Give each model the same request and tools. Keep their changes separate.",
            "Record total time, human intervention and actual usage, including retries.",
            "Review the diff and run the tests before scoring the solution."
          ]
        },
        {
          "type": "code",
          "language": "text",
          "code": "Task | Model + effort | Tests passed | Review fixes | Elapsed time | Usage\nBug fix | SWE-2 High | ... | ... | ... | ..."
        },
        {
          "type": "paragraph",
          "text": "A useful result is a change you would accept in the project. Count your own fixes and review time; a quick response can become expensive if it needs corrections."
        }
      ]
    },
    {
      "id": "acceptance-test",
      "title": "Define success before reading the answer",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Fix the failing test described below. Start from the supplied commit.\nPreserve the public API and avoid unrelated dependency changes.\nExplain the root cause, make the smallest fix and run the relevant tests.\nReport commands, results and anything you could not verify."
        },
        {
          "type": "paragraph",
          "text": "Replace “the failing test” with a real reproduction and expected behavior. Run the project check yourself from the final checkout. Reject a solution that makes the test pass by deleting its assertion or changing the required behavior. Count a manual rescue as intervention even if the final diff is good."
        },
        {
          "type": "table",
          "headers": [
            "Record",
            "Why it changes the conclusion"
          ],
          "rows": [
            [
              "First attempt and retries",
              "A successful retry still consumed time and usage."
            ],
            [
              "Human review minutes",
              "Correct-looking code can cost more to verify than to generate."
            ],
            [
              "Tests that passed and tests not run",
              "A confident final message is not evidence of a working change."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Keep failures and incomplete runs in the sample; otherwise your success rate describes only the attempts you chose to keep."
        }
      ]
    },
    {
      "id": "price",
      "title": "Assess cost after checking quality",
      "content": [
        {
          "type": "paragraph",
          "text": "For Pro pricing, the temporary promotion and its end dates, see <a href=\"/en/guides/devin-cli-models-usage-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">the Devin models and quota guide</a>. Record your account terms on the test date so the result remains understandable when the offer changes."
        },
        {
          "type": "paragraph",
          "text": "If you have not installed the agent, start with <a href=\"/en/guides/how-to-use-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin CLI installation and login</a>."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Did CodeAgentSwarm run these benchmarks?",
      "answer": "No. The table contains results published by Cognition. The suggested local test is a way to evaluate the model on your own project."
    },
    {
      "question": "Is SWE-2 the best model for every task?",
      "answer": "The table does not establish that. Test representative tasks and consider correctness, human review, time and usage before choosing."
    },
    {
      "question": "Can I compare the CodeAgentSwarm beta with another CLI?",
      "answer": "Yes, but you will be comparing the model together with its execution environment. Record the tools, permissions and settings in each environment."
    }
  ]
}

export default guide
