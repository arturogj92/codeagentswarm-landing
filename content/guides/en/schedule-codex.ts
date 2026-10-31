import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-codex",
    "locale": "en",
    "title": "Codex scheduled tasks: what they do and how to schedule Codex CLI",
    "metaTitle": "Codex Scheduled Tasks: Schedule Codex CLI and Cron Jobs",
    "metaDescription": "Codex scheduled tasks live in the ChatGPT app, not the CLI. How to schedule Codex CLI with codex exec in cron, or with CodeAgentSwarm on your machine.",
    "intro": "Codex has scheduled tasks (they used to be called automations), but you create them in the ChatGPT desktop app or on the web. The Codex CLI has no scheduler of its own. This guide covers the native option, a cron job with <code>codex exec</code>, and scheduling Codex CLI in CodeAgentSwarm.",
    "ctaText": "Schedule Codex CLI in CodeAgentSwarm 2.5.0 and get every run in a Chat you can answer.",
    "ctaAgent": "codex",
    "highlightedWords": [
      "Codex"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-codex"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can I schedule Codex?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/codex-icon.svg",
          "alt": "Codex",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Yes, three ways:"
        },
        {
          "type": "list",
          "items": [
            "<strong>Scheduled tasks in the ChatGPT desktop app.</strong> Runs locally in your project or a new worktree, with the computer on and the app running.",
            "<strong>cron plus <code>codex exec</code>.</strong> Works with the CLI alone; you get a log.",
            "<strong>CodeAgentSwarm.</strong> Schedules the Codex CLI you already use, in a Chat you can continue, with the same editor you use for your other agents."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Codex scheduled tasks in the ChatGPT app",
      "content": [
        {
          "type": "paragraph",
          "text": "You manage them under <strong>Scheduled</strong> in the ChatGPT desktop app or the web. In the desktop app a task runs in your local project or in a new worktree, and OpenAI asks you to keep the computer on and the app running when the task needs local files. Web tasks cannot reach a folder on your computer. Team Tasks, set up by workspace admins, run in the cloud. Availability depends on your plan and workspace settings."
        },
        {
          "type": "paragraph",
          "text": "The docs say it plainly: the Codex CLI and the IDE extension do not provide the Scheduled management interface. <a href=\"https://learn.chatgpt.com/docs/automations?surface=app\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">OpenAI: scheduled tasks</a>"
        },
        {
          "type": "paragraph",
          "text": "If you work in the ChatGPT app all day, its scheduled tasks are the natural choice. If you use Codex from the terminal, or next to Claude Code and other agents, CodeAgentSwarm schedules the CLI directly."
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Codex cron job with codex exec",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>codex exec</code> runs one task without the interactive UI. By default it uses a read-only sandbox; add <code>--sandbox workspace-write</code> only when the job must edit files."
        },
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: every day at 07:00\n0 7 * * * cd ~/code/my-app && codex exec \"List failing tests and the likely cause. Do not edit files.\" >> ~/logs/codex-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "For CI, OpenAI recommends its GitHub Action. <a href=\"https://learn.chatgpt.com/docs/non-interactive-mode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Non-interactive mode</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Codex in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Codex Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Codex CLI</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
            "Write the prompt the agent should run every time.",
            "Under <strong>When</strong>, choose <em>At set times</em> (up to 24 a day), <em>Every few hours</em> (1, 2, 3, 4, 6, 8 or 12) or <em>When I run it</em>, and the days.",
            "Choose <strong>Visible</strong> (opens a Chat) or <strong>Headless</strong> (no tab, result in Scheduled), and whether each run continues the same conversation or starts a new one. Press <strong>Create schedule</strong>."
          ]
        },
        {
          "type": "image",
          "src": "/images/guides/schedule-run-chat.webp",
          "alt": "A Codex Chat in CodeAgentSwarm with a Schedule divider, the scheduled prompt and Codex listing pending items",
          "caption": "A scheduled Codex run arriving in its Chat. Real capture from CodeAgentSwarm 2.5.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "examples",
      "title": "Prompts worth scheduling with Codex",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Every day at 21:00\nReview my notes for pending items and tell me what's left."
        },
        {
          "type": "list",
          "items": [
            "Every weekday at 09:00: summarise the pull requests waiting for review in this repo.",
            "Every 6 hours: run the linter and the type checker, and fix only formatting issues.",
            "Mondays at 08:00: list TODO comments added last week with the file and line."
          ]
        },
        {
          "type": "paragraph",
          "text": "The first prompt is the one in the capture above. Codex reads the notes folder of that project and answers in the same Chat every evening."
        }
      ]
    },
    {
      "id": "what-happens",
      "title": "What happens on each run",
      "content": [
        {
          "type": "list",
          "items": [
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Codex agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
            "The Chat marks every scheduled run, so you can tell your own messages from the scheduled ones and reply to a run like any other message.",
            "If CodeAgentSwarm was closed or the computer asleep at the set time, <strong>If missed, run when the app opens</strong> runs it once, late. A week away gives one run, not seven.",
            "Schedules run on your computer, so CodeAgentSwarm has to be open. Your phone can list, edit and run them from the <strong>Scheduled</strong> tab."
          ]
        }
      ]
    },
    {
      "id": "related",
      "title": "Keep going",
      "content": [
        {
          "type": "paragraph",
          "text": "For every agent side by side, the repeat rules and the phone, read the <a href=\"/en/guides/schedule-ai-coding-agents\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">guide to scheduling AI coding agents</a>."
        },
        {
          "type": "list",
          "items": [
            "<a href=\"/en/guides/codex-yolo-mode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Codex approvals, sandbox and auto mode</a>",
            "<a href=\"/en/guides/codex-cli-conversation-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Find and resume Codex conversations</a>",
            "<a href=\"/en/guides/run-multiple-codex-sessions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Run several Codex sessions at once</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Where are Codex scheduled tasks?",
      "answer": "Under Scheduled in the ChatGPT desktop app and on the web. They were called automations before. The Codex CLI has no scheduling interface."
    },
    {
      "question": "Do Codex scheduled tasks run locally?",
      "answer": "Desktop app tasks run in your local project or a new worktree, with the computer on and the app running. Web tasks cannot access local folders; Team Tasks run in the cloud."
    },
    {
      "question": "How do I run Codex CLI on a cron?",
      "answer": "Call codex exec with your prompt from a crontab line, after changing to the project folder. It runs read-only unless you pass a sandbox that allows writes."
    },
    {
      "question": "Can CodeAgentSwarm schedule Codex with a specific model?",
      "answer": "Yes. A schedule can set the model, reasoning and permissions, or leave them on Default to follow your Codex configuration."
    }
  ]
}

export default guide
