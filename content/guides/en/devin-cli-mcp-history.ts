import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-mcp-history",
    "locale": "en",
    "title": "Devin CLI MCP and history: connect tools and resume work",
    "metaTitle": "Devin CLI MCP, History and Session Resume",
    "metaDescription": "Configure Devin CLI MCP by scope, inspect connected tools and resume saved conversations. Includes history and optional MCP in the CodeAgentSwarm beta.",
    "intro": "MCP connects tools to an agent; history keeps the conversation you want to continue. They solve different problems. Set up one tool you trust, check that Devin can see it, then verify that the conversation can be reopened.",
    "ctaText": "Devin history, resume and optional CodeAgentSwarm MCP are in beta testing for an upcoming release. Check the current public app release notes for availability.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-11",
    "alternateSlug": "devin-cli-mcp-historial",
    "socialImage": "/images/guides/devin-cli-og-en.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Inspect tools and saved sessions",
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
          "code": "devin mcp list\ndevin list\ndevin -c"
        },
        {
          "type": "paragraph",
          "text": "Use <code>devin -c</code> for the latest session in the current directory, or <code>devin -r SESSION_ID</code> for a specific session. <a href=\"https://docs.devin.ai/cli/reference/commands\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Command reference</a>."
        }
      ]
    },
    {
      "id": "history-preview",
      "title": "Find the conversation before starting over",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-history-beta.webp",
          "alt": "Devin conversations in the CodeAgentSwarm beta history",
          "caption": "Real beta history capture. Select the original conversation to continue the same task.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "In CodeAgentSwarm beta, Devin conversations are available through history, search and bookmarks. A saved shortcut can reopen the associated conversation. Check the project and previous messages when resuming so your next request has the intended context."
        }
      ]
    },
    {
      "id": "mcp-scopes",
      "title": "Choose where an MCP server belongs",
      "content": [
        {
          "type": "table",
          "headers": [
            "Scope",
            "Configuration file"
          ],
          "rows": [
            [
              "Local",
              "<code>.devin/mcp_config.local.json</code>"
            ],
            [
              "Project",
              "<code>.devin/mcp_config.json</code>"
            ],
            [
              "User",
              "<code>~/.config/devin/mcp_config.json</code> / <code>%APPDATA%\\devin\\mcp_config.json</code>"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Use local scope for configuration specific to your checkout and project scope only for settings suitable for sharing. The current CLI uses dedicated MCP files. <a href=\"https://docs.devin.ai/cli/extensibility/mcp/configuration\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Official MCP configuration</a>."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "devin mcp add docs https://your-mcp-server.example/mcp\ndevin mcp list"
        },
        {
          "type": "paragraph",
          "text": "Replace the example URL with the endpoint of a server you trust. It is a placeholder, not a hosted service. Authenticate with that server if required and check its exposed tools before asking Devin to use them."
        }
      ]
    },
    {
      "id": "cas-mcp",
      "title": "CodeAgentSwarm MCP is optional",
      "content": [
        {
          "type": "paragraph",
          "text": "The beta can connect Devin to CodeAgentSwarm tools for supported session and workspace actions. The app setting controls this integration. If you turn it off, new Devin launches should respect that choice; do not add it back manually just to make a test request work."
        },
        {
          "type": "paragraph",
          "text": "Installing a server and authorizing one of its actions are separate decisions. Read the action and target before allowing a change, especially when a tool can modify a remote service."
        }
      ]
    },
    {
      "id": "resume-check",
      "title": "Verify resume with a small question",
      "content": [
        {
          "type": "list",
          "items": [
            "Ask Devin to identify the test command in your sample project.",
            "Close the conversation after its answer is complete.",
            "Reopen it from history and ask which command it found.",
            "Confirm that the original messages and project still match."
          ]
        },
        {
          "type": "paragraph",
          "text": "If the session is absent on Windows, check the <a href=\"/en/guides/devin-cli-on-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">native history location</a>. If it opens but cannot run a new turn, inspect <a href=\"/en/guides/devin-cli-models-usage-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">authentication and quota</a> separately from the saved transcript."
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
    }
  ],
  "faq": [
    {
      "question": "Does resume create a new conversation?",
      "answer": "Resume targets the saved session. Verify its project and earlier messages before continuing, especially if you have several similar tasks."
    },
    {
      "question": "Do I need CodeAgentSwarm MCP to use Devin?",
      "answer": "No. The CodeAgentSwarm MCP integration is optional in the beta. Devin also supports its own MCP configuration."
    },
    {
      "question": "Should I commit personal MCP credentials?",
      "answer": "No. Keep personal secrets out of shared project configuration and use the appropriate local or account authentication mechanism."
    }
  ]
}

export default guide
