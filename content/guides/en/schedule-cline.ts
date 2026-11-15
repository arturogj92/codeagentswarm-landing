import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-cline",
    "locale": "en",
    "title": "How to schedule Cline: cline schedule vs CodeAgentSwarm",
    "metaTitle": "Schedule Cline: cline schedule, Cron and CodeAgentSwarm",
    "metaDescription": "The Cline CLI has its own cron scheduler, cline schedule. What it does, how it compares with scheduling Cline in CodeAgentSwarm, and when to use each.",
    "intro": "Cline is one of the few agents with a real scheduler: <code>cline schedule</code> in the Cline CLI runs agents on cron expressions, keeps schedules across restarts and needs no open terminal. This guide shows the native command and when CodeAgentSwarm Scheduled Conversations are the better fit.",
    "ctaText": "Schedule Cline next to your other agents in CodeAgentSwarm 2.5.0 and read every run in a Chat.",
    "ctaAgent": "multi",
    "highlightedWords": [
      "Cline"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-cline"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "How do I schedule Cline?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/cline-icon.svg",
          "alt": "Cline",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Cline only, from the terminal:</strong> <code>cline schedule create</code>.",
            "<strong>Cline next to other agents, with each run in a Chat you can answer and phone control:</strong> CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "cline schedule",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "cline schedule create \"weekday triage\" \\\n  --cron \"0 9 * * MON-FRI\" \\\n  --prompt \"Sort new issues by priority. Do not edit files.\" \\\n  --workspace ~/code/my-app"
        },
        {
          "type": "paragraph",
          "text": "Schedules run through the Cline hub, which starts on its own, use your local time zone and survive restarts. Other subcommands: <code>list</code>, <code>trigger</code>, <code>pause</code>, <code>resume</code>, <code>delete</code> and <code>executions</code>. Scheduled runs approve their own tool calls, so write the prompt with that in mind. The feature is in the Cline CLI, SDK and Kanban, not in the VS Code or JetBrains extensions. <a href=\"https://docs.cline.bot/cli/scheduling\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cline scheduling docs</a>"
        },
        {
          "type": "paragraph",
          "text": "If Cline is your only agent and you like the terminal, <code>cline schedule</code> does the job. CodeAgentSwarm adds one editor for every agent you use, visible or headless runs, a Chat per run that you can continue, and a Scheduled tab on your phone."
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Cline in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Cline Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Cline</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Cline",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 08:30: run the tests and explain new failures, without editing files.",
            "Every 6 hours: check the open pull requests of this repo and summarise review comments.",
            "Sundays at 10:00: list dependencies with a newer major version and what would break."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Cline agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/ai-cli-agent-swarm\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Run several AI coding CLIs side by side</a>",
            "<a href=\"/en/guides/git-worktrees-for-ai-coding-agents\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Git worktrees for AI coding agents</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does Cline have a scheduler?",
      "answer": "Yes. The Cline CLI has cline schedule, which runs agents on cron expressions through the Cline hub and keeps schedules across restarts."
    },
    {
      "question": "Does cline schedule work in the VS Code extension?",
      "answer": "No. Cline documents it for the CLI, SDK and Kanban, not for the VS Code or JetBrains extensions."
    },
    {
      "question": "Why schedule Cline in CodeAgentSwarm instead?",
      "answer": "When you schedule several agents in one place, want each run in a Chat you can reply to, or want to manage schedules from your phone."
    }
  ]
}

export default guide
