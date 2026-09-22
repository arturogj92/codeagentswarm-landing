import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "how-to-use-muse-code",
    "locale": "en",
    "title": "How to Use Muse Code: Install, Sign In and Run a Task",
    "metaTitle": "How to Use Muse Code: Install, Sign In and Run a Task",
    "metaDescription": "Install Muse Code, choose Muse Spark 1.3, sign in and verify your first coding task. Learn project rules, resume commands and the CodeAgentSwarm beta status.",
    "intro": "Muse Code is Meta’s terminal coding agent. Start with a small repository you understand, ask it to inspect the project and verify its first edit with a check you can run yourself. This guide takes you from installation to a saved conversation you can resume.",
    "socialImage": "/images/guides/muse-code-og-en.png",
    "ctaText": "Muse support is in beta testing for an upcoming CodeAgentSwarm release. This button downloads the current public app; check its release notes for Muse availability.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-22",
    "alternateSlug": "como-usar-muse-code"
  },
  "sections": [
    {
      "id": "install",
      "title": "Install and identify your Muse Code version",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "On macOS or Linux, use the installer linked in the <a href=\"https://dev.meta.ai/docs/muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">official Muse Code quickstart</a>. Then check the installed version before copying commands from a tutorial. The examples here were checked against the Muse 1.3.0 command surface."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "curl -fsSL https://dev.meta.ai/install.sh | sh\nmuse --version\nmuse --help"
        },
        {
          "type": "paragraph",
          "text": "Use a normal terminal in your own account. If the command is missing after installation, open a fresh terminal so it receives the updated PATH. Record the version when reporting a failure. For native PowerShell commands and platform differences, follow <a href=\"/en/guides/muse-code-on-windows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse Code on Windows</a>."
        }
      ]
    },
    {
      "id": "login",
      "title": "Open a project and sign in",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "cd /path/to/your/project\nmuse --model muse-spark-1.3 --reasoning-effort medium"
        },
        {
          "type": "paragraph",
          "text": "Replace the sample path with your checkout. Choose the browser sign-in option offered by Muse, or use your own Meta API key. The interactive <code>/login</code> command reopens authentication. An existing API key can take precedence over browser credentials; check <a href=\"https://dev.meta.ai/docs/muse-code/auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Meta’s authentication guidance</a> if the account or billing route looks wrong."
        },
        {
          "type": "paragraph",
          "text": "The explicit model flag makes this example reproducible. Some Muse setup pages still name Spark 1.2 as the default, while the current model catalog lists 1.3. Do not infer the active model from the age of an article. Read the model shown in your session and use <a href=\"/en/guides/muse-code-models-pricing-privacy\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">the models, pricing and privacy guide</a> before choosing a different tier."
        }
      ]
    },
    {
      "id": "first-request",
      "title": "Make the first request easy to verify",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Read README.md and the project’s build configuration.\nExplain how this application starts and identify one test command\nthat already exists. Cite the files you used. Do not edit files."
        },
        {
          "type": "paragraph",
          "text": "Choose a repository whose purpose you know. If it has no README, name the actual entry point or configuration file instead. Compare the response with the files on disk. A plausible test command is insufficient: it must exist in this checkout and apply to the package you intend to change."
        },
        {
          "type": "paragraph",
          "text": "For a second request, pick one observable defect, such as an incorrect validation message. Describe the input that triggers it and the expected result. Ask Muse to inspect its callers, make the smallest correction and run the relevant check. Review <code>git diff</code> yourself before accepting the result. This gives you a useful baseline for later model comparisons."
        }
      ]
    },
    {
      "id": "project-rules",
      "title": "Add project instructions without replacing existing rules",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "muse init --dry-run"
        },
        {
          "type": "paragraph",
          "text": "Preview the proposed instructions first. The dry run does not create a file. If there is no <code>AGENTS.md</code> and the proposal is correct, run <code>muse init</code>, then review the generated file. If the repository already contains an <code>AGENTS.md</code>, read and edit that file deliberately. Keep commands that help the agent work: the package directory, the test command and a restriction that matters. Avoid filling it with generic programming advice. <a href=\"https://dev.meta.ai/docs/muse-code/configuration\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Configuration and project context</a> explains how Muse loads those files."
        },
        {
          "type": "paragraph",
          "text": "Trust the correct workspace when Muse asks. Project instructions and hooks are part of that trust decision. A prompt saying “do not edit” communicates your task scope, but it does not itself change the tool permission profile. Review <a href=\"https://dev.meta.ai/docs/muse-code/permissions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse permissions</a> when you need enforced read-only access."
        }
      ]
    },
    {
      "id": "resume",
      "title": "Resume the original task and inspect its state",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "muse resume --last"
        },
        {
          "type": "paragraph",
          "text": "Run this from the intended project when you return. Before asking for more changes, tell Muse what changed outside the conversation: a dependency update, another developer’s commit or a manual edit. Session history cannot guarantee that the current files match the earlier discussion."
        },
        {
          "type": "paragraph",
          "text": "If you interrupt an edit, inspect the diff before issuing a replacement request. A cancelled answer does not mean every file is untouched. Ask the agent to explain the current state, then continue from that evidence. The <a href=\"https://dev.meta.ai/docs/muse-code/interactive\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">interactive controls reference</a> covers session management and interruption."
        }
      ]
    },
    {
      "id": "next",
      "title": "When the first task works",
      "content": [
        {
          "type": "paragraph",
          "text": "Keep the setup small until you have a verified edit. Add <a href=\"/en/guides/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP tools, skills or workflows</a> when a real task needs them. For a repeatable review, save the exact prompt and acceptance condition; that is enough to compare results across sessions."
        },
        {
          "type": "callout",
          "variant": "info",
          "content": "Muse integration is being tested for an upcoming CodeAgentSwarm release. Follow the standalone CLI steps in this guide and check the public release notes before expecting Muse support in the downloaded app."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does Muse Code run models entirely on my computer?",
      "answer": "The CLI runs locally and works on local files, but its Muse Spark requests use Meta’s hosted service. A local terminal does not make model inference offline."
    },
    {
      "question": "Why select muse-spark-1.3 explicitly?",
      "answer": "It identifies the model used by the example even when installed defaults or documentation change. Check your account’s available models before starting a real task."
    },
    {
      "question": "Can I start by letting Muse rewrite the whole project?",
      "answer": "A small change gives you a clearer result to evaluate. Verify one edit and its test first, then expand the scope once you understand how approvals, context and review work."
    }
  ]
}

export default guide
