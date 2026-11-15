import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-cursor-agent",
    "locale": "en",
    "title": "How to schedule Cursor Agent: Automations vs a local schedule",
    "metaTitle": "Schedule Cursor Agent: Automations, Cron and Local Runs",
    "metaDescription": "Cursor Automations run as cloud agents. To schedule the Cursor Agent CLI on your machine, use cron with agent -p or CodeAgentSwarm.",
    "intro": "Cursor has Automations: triggers, including a schedule, that start a Cursor Cloud Agent. They run in Cursor's cloud and are billed as cloud agent usage. The Cursor CLI docs describe a print mode for scripts but no scheduler. This guide compares the two and shows how to schedule the CLI locally.",
    "ctaText": "Schedule Cursor Agent in CodeAgentSwarm 2.5.0 and keep every run on your machine, in a Chat you can continue.",
    "ctaAgent": "cursor-agent",
    "highlightedWords": [
      "Cursor Agent"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-cursor-agent"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "How do I schedule Cursor Agent?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/cursor-icon.svg",
          "alt": "Cursor Agent",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>In Cursor's cloud:</strong> an Automation with a schedule trigger. Your computer can be off.",
            "<strong>On your machine, log only:</strong> cron calls the CLI in print mode.",
            "<strong>On your machine, with a conversation:</strong> CodeAgentSwarm runs the Cursor Agent CLI at the times you set."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Cursor Automations",
      "content": [
        {
          "type": "paragraph",
          "text": "You create Automations in the Agents window, at cursor.com/automations or with <code>/automate</code> from an agent session. A schedule trigger takes presets or a cron expression; runs may start late but never early. Each run is a Cloud Agent, billed as cloud agent usage, and cron triggers start with no repository, so you pick one if the run must change code. <a href=\"https://cursor.com/docs/cloud-agent/automations\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cursor Automations docs</a>"
        },
        {
          "type": "paragraph",
          "text": "That is the right tool for work on a GitHub repository that must happen with your laptop closed. For jobs that need your local checkout or services running on your machine, schedule the CLI itself."
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Cursor Agent cron job in print mode",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 08:00\n0 8 * * 1-5 cd ~/code/my-app && agent -p \"Run the tests and explain failures. Do not edit files.\" --output-format text >> ~/logs/cursor-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Print mode only proposes edits unless you pass <code>--force</code>; set <code>CURSOR_API_KEY</code> for unattended auth. <a href=\"https://cursor.com/docs/cli/headless\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cursor CLI headless docs</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Cursor Agent in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Cursor Agent Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Cursor Agent</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Cursor Agent",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 08:00: run the tests on the local branch and explain failures.",
            "Every 6 hours: check the dev server log in this project and summarise new errors.",
            "Fridays at 16:00: find components without tests and list them by size."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Cursor Agent agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/cursor-agent-cli-acp-codeagentswarm\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cursor Agent CLI: install and ACP</a>",
            "<a href=\"/en/guides/cursor-cli-pricing\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cursor CLI pricing and usage</a>",
            "<a href=\"/en/guides/cursor-cli-conversation-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cursor CLI conversation history</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Do Cursor Automations run on my computer?",
      "answer": "No. Each run is a Cursor Cloud Agent in Cursor's cloud, billed as cloud agent usage."
    },
    {
      "question": "Can the Cursor Agent CLI run on a schedule?",
      "answer": "The CLI docs describe print mode but no scheduler, and Automations run as cloud agents. To run the CLI locally on a schedule, call it from cron or use CodeAgentSwarm."
    },
    {
      "question": "Which should I pick?",
      "answer": "Automations for repository work that must run with your laptop off. A local schedule for work that needs your files, tools and running services."
    }
  ]
}

export default guide
