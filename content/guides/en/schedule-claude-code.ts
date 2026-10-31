import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-claude-code",
    "locale": "en",
    "title": "How to schedule Claude Code: /schedule, cron jobs and local runs",
    "metaTitle": "Schedule Claude Code: /schedule, Cron Jobs and Local Runs",
    "metaDescription": "How to schedule Claude Code tasks: cloud scheduled tasks with /schedule, Desktop local tasks, /loop, a cron job with claude -p, or CodeAgentSwarm.",
    "intro": "Claude Code has more scheduling options than any other agent: cloud tasks you create with <code>/schedule</code>, local tasks in Claude Desktop, and <code>/loop</code> inside a session. You can also put <code>claude -p</code> in cron. This guide explains what each one does, where it runs and when CodeAgentSwarm Scheduled Conversations are the better fit.",
    "ctaText": "Schedule Claude Code next to your other agents in CodeAgentSwarm 2.5.0, and read every run in a Chat you can continue.",
    "ctaAgent": "claude-code",
    "highlightedWords": [
      "Claude Code"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-claude-code"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "How do I schedule Claude Code?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/claude-icon.svg",
          "alt": "Claude Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Choose by where the run has to happen:"
        },
        {
          "type": "list",
          "items": [
            "<strong>Your laptop can be off:</strong> a cloud scheduled task (<code>/schedule</code>). It runs on Anthropic's cloud against a fresh clone of your GitHub repository.",
            "<strong>It needs your local files and Claude Code is your only agent:</strong> a local scheduled task in Claude Desktop.",
            "<strong>Repeat something while you work:</strong> <code>/loop</code> in the open session.",
            "<strong>You also schedule Codex, Cursor or another agent, or want to manage it from the CodeAgentSwarm phone app:</strong> CodeAgentSwarm Scheduled Conversations."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "What Claude Code offers on its own",
      "content": [
        {
          "type": "table",
          "headers": [
            "",
            "Cloud task (<code>/schedule</code>)",
            "Desktop local task",
            "<code>/loop</code>"
          ],
          "rows": [
            [
              "Runs on",
              "Anthropic's cloud, fresh clone",
              "Your machine",
              "Your machine, inside the session"
            ],
            [
              "Machine must be on",
              "No",
              "Yes, app open and awake",
              "Yes, session open"
            ],
            [
              "Local files",
              "No",
              "Yes",
              "Yes"
            ],
            [
              "Shortest interval",
              "1 hour",
              "1 hour in the form, 1 minute if Claude sets it",
              "1 minute"
            ],
            [
              "Missed runs",
              "Not applicable",
              "One catch-up run for the last 7 days",
              "Lost with the session"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Cloud scheduled tasks were called routines until recently; <code>/routines</code> still works as an alias. They are available on Pro, Max, Ultra, Team and Enterprise plans and need GitHub access to clone your repositories. <a href=\"https://code.claude.com/docs/en/routines\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cloud scheduled tasks</a> · <a href=\"https://code.claude.com/docs/en/desktop-scheduled-tasks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Desktop scheduled tasks</a> · <a href=\"https://code.claude.com/docs/en/scheduled-tasks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">/loop</a>"
        },
        {
          "type": "paragraph",
          "text": "Desktop local tasks are close to what CodeAgentSwarm does for every agent: they run in a local folder, can use a worktree and catch up once after sleep. If Claude Code is the only agent you use and you already live in Claude Desktop, they are a good choice."
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Claude Code cron job with claude -p",
      "content": [
        {
          "type": "paragraph",
          "text": "Without any app, cron can call Claude Code in print mode. It runs one prompt and exits:"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 08:30\n30 8 * * 1-5 cd ~/code/my-app && claude -p \"Summarise yesterday's CI failures. Do not edit files.\" >> ~/logs/claude-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Cheap and local, but you get text in a log file. Nobody answers a permission prompt, so set the allowed tools for the job, and if your Mac was asleep at 08:30 cron simply skips it."
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Claude Code in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Claude Code Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Claude Code</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Claude Code",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Every weekday at 08:30\nRead the open issues labelled \"bug\" and yesterday's CI failures.\nGroup them by cause and tell me which one to fix first. Do not edit files."
        },
        {
          "type": "list",
          "items": [
            "Every night: run the test suite and explain any new failure since the last run.",
            "Every 4 hours on weekdays: check the dependency audit and summarise anything new.",
            "Fridays at 17:00: write the changelog for this week from the merged commits."
          ]
        },
        {
          "type": "paragraph",
          "text": "Leave permissions on Default or ask-first mode for the first runs. Once the output is right, a schedule can use the permissions you trust, and the <strong>Git Worktree</strong> option keeps its edits out of your working checkout."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Claude Code agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/claude-code-yolo-mode-explained\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Claude Code permission modes and YOLO, explained</a>",
            "<a href=\"/en/guides/claude-code-history-complete-guide\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Find and resume Claude Code conversations</a>",
            "<a href=\"/en/guides/claude-code-weekly-limit-daily-budget\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Keep scheduled runs inside a daily budget</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "What does /schedule do in Claude Code?",
      "answer": "It creates a cloud scheduled task (formerly a routine). The task runs on Anthropic's cloud against a fresh clone of your GitHub repository, at least one hour apart, even with your computer off."
    },
    {
      "question": "Can Claude Code run scheduled tasks on my own machine?",
      "answer": "Yes, with Claude Desktop local scheduled tasks or /loop in an open session. CodeAgentSwarm also runs Claude Code on a schedule locally, alongside the other agents it supports."
    },
    {
      "question": "How do I set up a Claude Code cron job?",
      "answer": "Add a crontab line that changes to the project folder and runs claude -p with your prompt, redirecting output to a log. Allow only the tools the job needs."
    },
    {
      "question": "Why use CodeAgentSwarm if Claude Desktop already schedules tasks?",
      "answer": "Use it when you schedule more than one agent, want each run in the same Chat as your other sessions, or want to edit and run schedules from the CodeAgentSwarm phone app."
    }
  ]
}

export default guide
