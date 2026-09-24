import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "muse-code-mcp-skills-workflows",
    "locale": "en",
    "title": "Muse Code MCP, Skills and Workflows: A Practical Setup",
    "metaTitle": "Muse Code MCP, Skills and Workflows: A Practical Setup",
    "metaDescription": "Set up Muse Code MCP and reusable skills, diagnose required-server failures and check workflow availability before designing parallel agent tasks.",
    "intro": "An MCP server gives Muse access to tools. A skill supplies reusable instructions. A workflow organizes several agent tasks. Choose the smallest addition that solves your current problem, and test it separately before combining all three in a production project.",
    "socialImage": "/images/guides/muse-code-og-en.png",
    "ctaText": "Use Muse Code in CodeAgentSwarm 2.4.0 for macOS and Windows. Meta account access and billing are separate.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-24",
    "alternateSlug": "muse-code-mcp-skills-workflows"
  },
  "sections": [
    {
      "id": "choose",
      "title": "Choose the extension that matches the task",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "table",
          "headers": [
            "Need",
            "Starting point",
            "First useful check"
          ],
          "rows": [
            [
              "Read an external issue or document",
              "An MCP server for that service",
              "Retrieve one known item."
            ],
            [
              "Repeat your team’s review procedure",
              "A project skill",
              "Apply it to one small diff."
            ],
            [
              "Review independent parts of a large change",
              "A supported workflow",
              "Return findings with file references."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Keep the first exercise specific. For an issue tracker, use a harmless issue whose contents you already know. For a skill, use an existing change that has an obvious review finding. This makes it possible to distinguish a working connection from an agent that simply produced a convincing explanation."
        }
      ]
    },
    {
      "id": "mcp",
      "title": "Connect one MCP server and verify its tools",
      "content": [
        {
          "type": "paragraph",
          "text": "Muse reads MCP servers from <code>mcp_servers</code> in its user settings. The usual file is <code>~/.config/muse/settings.json</code>. Preserve existing settings when adding a server and retain <code>schema_version: 1</code>. Use the server provider’s actual launch command or URL. The <a href=\"https://dev.meta.ai/docs/muse-code/extending\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">extension reference</a> documents the supported transports."
        },
        {
          "type": "paragraph",
          "text": "Merge this entry into your existing settings; do not replace the whole file. The example URL is a placeholder. Replace it with your server’s real MCP endpoint before starting Muse. This example makes the server required because the task depends on it."
        },
        {
          "type": "code",
          "language": "json",
          "code": "{\n  \"schema_version\": 1,\n  \"mcp_servers\": {\n    \"issue-tracker\": {\n      \"transport\": \"streamable_http\",\n      \"url\": \"https://mcp.example.com/mcp\",\n      \"headers\": {},\n      \"enabled\": true,\n      \"mode\": \"required\"\n    }\n  }\n}"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "muse mcp login issue-tracker"
        },
        {
          "type": "paragraph",
          "text": "This login example assumes you already configured a remote server named <code>issue-tracker</code> that requires OAuth. Replace that name with your real configured server. Authentication to Muse itself and authentication to an external tool are separate checks. Inside the interactive session, inspect <code>/mcp</code> to confirm the tools are connected before requesting data."
        },
        {
          "type": "paragraph",
          "text": "Ask for one known item and compare the returned fields with its source. Do not begin by asking the agent to change a hundred tickets. If the tool inventory is empty, capture the server name and startup error; investigate the connection before rewriting the task prompt."
        }
      ]
    },
    {
      "id": "startup",
      "title": "Understand why one server can block a run",
      "content": [
        {
          "type": "paragraph",
          "text": "A required MCP server failure aborts startup. Marking a server optional changes that behavior, so make the choice according to the task’s dependency on its tools. An optional calendar might be acceptable for a code-only review. A required policy check should not be silently skipped because it is inconvenient to start."
        },
        {
          "type": "paragraph",
          "text": "Check the executable path, arguments and environment available to the process that launches Muse. A server that starts in your interactive shell may depend on a profile file or a variable missing from a desktop app. Avoid pasting resolved tokens into configuration examples or support logs. Change one setting at a time and retry the same small read."
        },
        {
          "type": "paragraph",
          "text": "When reporting a failed resume, distinguish the original conversation from a fork and include the exact error. Start from the conversation that contains your task rather than creating copies until one happens to open."
        }
      ]
    },
    {
      "id": "skills",
      "title": "Turn a repeatable review into a project skill",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "muse skills list\nmuse skills inspect review-validation"
        },
        {
          "type": "paragraph",
          "text": "The second command assumes a skill with that ID exists. A project skill can live at <code>.agents/skills/review-validation/SKILL.md</code>. Inspect the content before invoking it, especially when it comes from a third-party repository. If it is absent from the list, check the file location and whether the project is trusted."
        },
        {
          "type": "code",
          "language": "markdown",
          "code": "---\nname: review-validation\ndescription: Review validation changes and report evidence without editing files.\n---\n\nReview the current validation change. Trace its callers.\nIdentify one input that should fail and one that should pass.\nRun the existing targeted test when available.\nReturn file references and unresolved findings. Do not edit."
        },
        {
          "type": "paragraph",
          "text": "Save that file at <code>.agents/skills/review-validation/SKILL.md</code>, validate it, then open Muse in the trusted project and enter <code>/review-validation</code>. Test against a diff with a known edge case and check that the review identifies it."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "muse skills validate .agents/skills/review-validation\nmuse skills list"
        }
      ]
    },
    {
      "id": "workflows",
      "title": "Check workflow availability before planning around it",
      "content": [
        {
          "type": "callout",
          "variant": "info",
          "content": "Workflows depend on the installed build and rollout. The Muse 1.3.0 CLI help checked for this guide did not expose a workflows command. Check muse --help and the interactive command palette first. Do not assume documented workflow commands work in every installation."
        },
        {
          "type": "paragraph",
          "text": "If your build supports them, the <a href=\"https://dev.meta.ai/docs/muse-code/workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">official workflow guide</a> explains parallel groups and dependent stages. Try a bounded read-only review before allowing several writers to touch a repository. Require each finding to include evidence and let a final reviewer reject unsupported claims."
        },
        {
          "type": "code",
          "language": "text",
          "code": "If workflows are available, review this change with two readers.\nOne checks public API compatibility; one checks test coverage.\nHave a final reviewer verify the findings against the actual diff.\nReturn one report with file references. Do not edit or commit."
        },
        {
          "type": "paragraph",
          "text": "When workflows are unavailable, run the same two reviews sequentially in an ordinary session. Keep each question and its output distinct. Parallelism saves time only when the tasks can proceed independently; it adds little to a tiny edit with one clear test."
        }
      ]
    },
    {
      "id": "sessions",
      "title": "Separate coordination from file isolation",
      "content": [
        {
          "type": "paragraph",
          "text": "Native <a href=\"https://dev.meta.ai/docs/muse-code/session-messaging\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">session messaging</a> connects eligible local sessions on macOS and Linux; it is unavailable on Windows. A message can carry a finding, but it does not merge working copies or approve an action for the recipient. Give concurrent writers separate Git worktrees and review their changes before integrating them."
        },
        {
          "type": "paragraph",
          "text": "Muse is available from CodeAgentSwarm 2.4.0. Start with <a href=\"/en/guides/how-to-use-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">a verified standalone task</a> and review <a href=\"/en/guides/muse-code-models-pricing-privacy\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">model and data choices</a> before connecting private services."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does installing a skill also configure MCP?",
      "answer": "Treat instructions and tool connections separately. Read the skill, configure any required server deliberately and confirm its tool inventory before relying on the workflow."
    },
    {
      "question": "Why does Muse stop before answering after I add MCP?",
      "answer": "A required server that fails startup can abort the run. Check the named server’s startup error and configuration rather than repeatedly changing the model or prompt."
    },
    {
      "question": "Can I use Muse workflows on every platform?",
      "answer": "No universal availability is established. Verify your installed build and rollout first; the checked 1.3.0 help lacked the workflows command family."
    },
    {
      "question": "Do separate agent sessions protect files from simultaneous edits?",
      "answer": "No. Sessions in the same checkout can edit the same files. Use separate Git worktrees for parallel writers and integrate the resulting changes deliberately."
    }
  ]
}

export default guide
