import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "how-to-use-devin-cli",
    "locale": "en",
    "title": "Devin CLI: installation, login and your first coding task",
    "metaTitle": "Devin CLI: Install, Sign In and Start Coding",
    "metaDescription": "Install Devin CLI, sign in and run a first task you can verify. See real CodeAgentSwarm beta screenshots and learn where models, quota and history fit.",
    "intro": "Devin CLI brings a coding agent to your local project. Start with a small task, verify that it can read the right files, and keep the resulting conversation for the next step. This guide covers the standalone CLI and the CodeAgentSwarm 2.4.0 integration.",
    "ctaText": "Devin Chat, installation and history are available in CodeAgentSwarm 2.4.0 for macOS and Windows.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-24",
    "alternateSlug": "como-usar-devin-cli",
    "socialImage": "/images/guides/devin-cli-og-en.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "What do you need to get started?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Install the official CLI, authenticate with Devin and open a project directory. Devin CLI works with local files; Devin Cloud runs in a separate environment. <a href=\"https://docs.devin.ai/cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Official quickstart</a>."
        }
      ]
    },
    {
      "id": "chat-preview",
      "title": "A real task in the CodeAgentSwarm beta",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-chat-beta.webp",
          "alt": "Devin explaining a sample project in CodeAgentSwarm Chat",
          "caption": "Real macOS beta capture with a sample project. Devin is available from CodeAgentSwarm 2.4.0.",
          "size": "full"
        },
        {
          "type": "paragraph",
          "text": "Chat keeps the prompt, response and model controls together. Use a specific acceptance condition: the agent should identify the actual test command from the repository, rather than guess a command that sounds plausible."
        }
      ]
    },
    {
      "id": "install",
      "title": "Install on macOS or Linux",
      "content": [
        {
          "type": "paragraph",
          "text": "Run the installer published by Cognition from a system terminal, then reopen the terminal and check that the command is available. On Windows, follow the <a href=\"/en/guides/devin-cli-on-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">native Windows instructions</a>."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "curl -fsSL https://cli.devin.ai/install.sh | bash\ndevin --version"
        },
        {
          "type": "paragraph",
          "text": "CodeAgentSwarm also provides Devin installation and update controls. If detection fails after a successful system installation, reopen the app so it receives the updated environment."
        }
      ]
    },
    {
      "id": "login",
      "title": "Sign in before opening Chat",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "devin auth login\ndevin auth status\ncd /path/to/project\ndevin"
        },
        {
          "type": "paragraph",
          "text": "Complete the browser sign-in flow with the account you intend to use. In CodeAgentSwarm, perform this step in the Devin CLI view, then open a new Devin Chat. Authentication belongs to Devin on that host. <a href=\"https://docs.devin.ai/cli/enterprise/devin-auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin authentication</a>."
        }
      ]
    },
    {
      "id": "first-task",
      "title": "Try a task with an observable result",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Read README.md and package.json. Explain what this project does\nand give me the exact test command. Do not change any files."
        },
        {
          "type": "list",
          "items": [
            "Check the project path before sending the request.",
            "Compare the answer with the scripts in package.json.",
            "For your next request, ask for one change and review its diff and test result."
          ]
        },
        {
          "type": "paragraph",
          "text": "This first read-only request separates account or directory problems from problems with an edit. If it fails, fix that prerequisite before asking the agent to change code."
        }
      ]
    },
    {
      "id": "next-steps",
      "title": "Choose a model and keep the conversation",
      "content": [
        {
          "type": "paragraph",
          "text": "Use the <a href=\"/en/guides/devin-cli-models-usage-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">models and usage guide</a> to understand the model picker and account quota. When you return to a task, use <a href=\"/en/guides/devin-cli-mcp-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">history and resume</a> so you can continue the original conversation."
        },
        {
          "type": "paragraph",
          "text": "If two agents will edit overlapping files, give them separate Git worktrees. Separate chats alone do not isolate the checkout."
        }
      ]
    },
    {
      "id": "codeagentswarm-beta",
      "title": "Devin in CodeAgentSwarm: available in 2.4.0",
      "content": [
        {
          "type": "paragraph",
          "text": "Devin is available in CodeAgentSwarm 2.4.0 for macOS and Windows. The screenshots were captured during beta testing. Sign in with the official Devin CLI on the computer that runs the agent."
        },
        {
          "type": "paragraph",
          "text": "Before choosing a model, see <a href=\"/en/guides/swe-2-benchmarks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">SWE-2 benchmarks and a practical test</a>."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Is Devin CLI the same as Devin Cloud?",
      "answer": "No. Devin CLI works in your local environment; Devin Cloud uses a separate cloud environment. This guide is about the local CLI."
    },
    {
      "question": "Do I sign in through CodeAgentSwarm?",
      "answer": "In CodeAgentSwarm, run the official Devin sign-in flow from its CLI view. Then open a new Devin Chat on the same host."
    },
    {
      "question": "Is Devin included in the current public app?",
      "answer": "Yes. Devin is included in CodeAgentSwarm 2.4.0 for macOS and Windows."
    }
  ]
}

export default guide
