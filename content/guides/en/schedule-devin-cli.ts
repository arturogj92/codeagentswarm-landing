import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-devin-cli",
    "locale": "en",
    "title": "How to schedule Devin CLI: cloud Automations vs local runs",
    "metaTitle": "Schedule Devin CLI: Cloud Automations vs Local Cron Runs",
    "metaDescription": "Devin Automations schedule cloud sessions; Devin CLI has no schedule command. Run Devin CLI locally with devin -p in cron, or with CodeAgentSwarm.",
    "intro": "Devin can run on a schedule, but in Devin's web app: Automations start cloud sessions on a timer or on events. Devin CLI, which works in your local project, has no schedule command. This guide covers both and shows how to schedule the CLI on your machine.",
    "ctaText": "Schedule Devin CLI in CodeAgentSwarm 2.5.0 and keep every run on your machine, in a Chat you can continue.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin CLI"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-devin-cli"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can Devin CLI run on a schedule?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Devin cloud:</strong> yes, with Automations (schedule, Slack, GitHub, Linear or webhook triggers).",
            "<strong>Devin CLI on your machine:</strong> not by itself. Use cron with <code>devin -p</code>, or CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Devin Automations and scheduled sessions",
      "content": [
        {
          "type": "paragraph",
          "text": "Automations can repeat every N minutes, hours, days, weeks or months, follow an RRULE, or run once. The default limit is 50 runs per hour, and you can cap the compute (ACUs) a session may use. <a href=\"https://docs.devin.ai/product-guides/automations\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin Automations</a>. The older scheduled sessions are a legacy feature that keeps working; new scheduled work is created as an automation. <a href=\"https://docs.devin.ai/product-guides/scheduled-sessions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Scheduled sessions</a>"
        },
        {
          "type": "paragraph",
          "text": "The <a href=\"https://docs.devin.ai/cli/reference/commands.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin CLI command reference</a> has no schedule command, so Automations are a Devin cloud feature, separate from the CLI you run in a local folder."
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Devin CLI cron job with devin -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 08:00\n0 8 * * 1-5 cd ~/code/my-app && devin -p \"Run the tests and explain failures. Do not edit files.\" >> ~/logs/devin-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Print mode cannot show the workspace trust prompt, so in a folder Devin does not trust yet it fails; Cognition documents <code>--respect-workspace-trust false</code> to skip that check in scripts. <a href=\"https://docs.devin.ai/cli/reference/commands.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin CLI commands</a> Keep the default permission mode for unattended jobs unless the project is disposable."
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Devin CLI in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Devin CLI Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Devin CLI</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
            "Write the prompt the agent should run every time.",
            "Under <strong>When</strong>, choose <em>At set times</em> (up to 24 a day), <em>Every few hours</em> (1, 2, 3, 4, 6, 8 or 12) or <em>When I run it</em>, and the days.",
            "Choose <strong>Visible</strong> (opens a Chat) or <strong>Headless</strong> (no tab, result in Scheduled), and whether each run continues the same conversation or starts a new one. Press <strong>Create schedule</strong>."
          ]
        },
        {
          "type": "image",
          "src": "/images/guides/schedule-editor-times.webp",
          "alt": "CodeAgentSwarm schedule editor set to At set times, Every day at 21:00, with the next three runs and the Visible option",
          "caption": "The editor shows the next runs before you save. Real capture from CodeAgentSwarm 2.5.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "examples",
      "title": "Prompts worth scheduling with Devin CLI",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 08:00: run the tests in this local checkout and explain anything that fails.",
            "Every 8 hours: read the local log folder and summarise new errors.",
            "Fridays at 17:00: list the files changed this week that have no test coverage."
          ]
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Devin CLI agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/how-to-use-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">How to use Devin CLI</a>",
            "<a href=\"/en/guides/devin-cli-models-usage-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin CLI models and usage limits</a>",
            "<a href=\"/en/guides/devin-cli-mcp-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Devin CLI MCP and history</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Can Devin run on a schedule?",
      "answer": "Devin cloud can, with Automations. Devin CLI has no schedule command; run it from cron or CodeAgentSwarm."
    },
    {
      "question": "Do Devin Automations use my local files?",
      "answer": "They start Devin sessions, not your local CLI. To work on your local checkout, schedule Devin CLI on your machine."
    },
    {
      "question": "How do I run Devin CLI from cron?",
      "answer": "Add a crontab line that changes to the project and runs devin -p with your prompt, writing the output to a log."
    }
  ]
}

export default guide
