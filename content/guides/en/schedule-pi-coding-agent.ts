import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-pi-coding-agent",
    "locale": "en",
    "title": "How to schedule Pi coding agent: cron with pi -p, or CodeAgentSwarm",
    "metaTitle": "Schedule Pi Coding Agent: Cron with pi -p or CodeAgentSwarm",
    "metaDescription": "Pi has no built-in scheduler. Put pi -p in cron for a log, or schedule Pi in CodeAgentSwarm and read every run in a Chat you can continue.",
    "intro": "Pi is a small, extensible coding harness, and it does not try to be a scheduler. To run Pi every morning, call its print mode from cron, or let CodeAgentSwarm start it at the times you set and keep each run as a conversation.",
    "ctaText": "Schedule Pi in CodeAgentSwarm 2.5.0 with the provider you already use, and read each run in a Chat.",
    "ctaAgent": "pi",
    "highlightedWords": [
      "Pi"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-pi-coding-agent"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "How do I put Pi on a cron?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/pi-icon.svg",
          "alt": "Pi",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Log only:</strong> a crontab line with <code>pi -p</code>.",
            "<strong>A conversation you can continue:</strong> CodeAgentSwarm Scheduled Conversations."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "What Pi offers on its own",
      "content": [
        {
          "type": "paragraph",
          "text": "Pi's README and CLI docs describe print mode, JSON mode and RPC mode, but no scheduler. You could write an extension that schedules prompts; nothing official does it today. <a href=\"https://github.com/earendil-works/pi/blob/main/packages/coding-agent/docs/cli.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Pi CLI docs</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Pi cron job with pi -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: every day at 08:30\n30 8 * * * cd ~/code/my-app && pi -p \"Read TODO.md and list the next three steps.\" >> ~/logs/pi-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>--mode json</code> prints JSON lines if a script reads the output. The npm package is now <code>@earendil-works/pi-coding-agent</code>."
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Pi in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Pi Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Pi</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Pi",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 08:30: read the TODO file of this project and tell me the three next steps.",
            "Every 12 hours: run the tests and explain any new failure.",
            "Sundays at 09:00: check for outdated dependencies and list them with their changelog links."
          ]
        },
        {
          "type": "paragraph",
          "text": "Pi works with the provider you log in to. Pick the model in the schedule if a job must not change when you switch Pi's default."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Pi agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/how-to-use-pi-coding-agent\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">How to use Pi coding agent</a>",
            "<a href=\"/en/guides/pi-coding-agent-models-subscriptions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Pi models and subscriptions</a>",
            "<a href=\"/en/guides/pi-vs-opencode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Pi vs opencode</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does Pi coding agent have a scheduler?",
      "answer": "No. The official docs describe print, JSON and RPC modes but no scheduling. Use cron with pi -p or CodeAgentSwarm."
    },
    {
      "question": "Can I schedule Pi with a specific model?",
      "answer": "Yes. In CodeAgentSwarm the schedule can set the model; otherwise Pi uses its default provider and model."
    },
    {
      "question": "Do I need to log in again for scheduled runs?",
      "answer": "No. Scheduled runs use the Pi login on the computer that runs them, like any other Pi session."
    }
  ]
}

export default guide
