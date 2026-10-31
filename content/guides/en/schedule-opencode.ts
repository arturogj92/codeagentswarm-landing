import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-opencode",
    "locale": "en",
    "title": "How to schedule opencode: cron with opencode run, or CodeAgentSwarm",
    "metaTitle": "Schedule opencode: Cron with opencode run or CodeAgentSwarm",
    "metaDescription": "opencode has no built-in scheduler. Put opencode run in cron, use its GitHub Action on a schedule, or schedule it locally in CodeAgentSwarm.",
    "intro": "opencode does not ship a scheduler in the CLI. If you search \"how do I put opencode on a cron\", the answer is one of three: a crontab line with <code>opencode run</code>, the official GitHub Action with a <code>schedule</code> trigger, or CodeAgentSwarm Scheduled Conversations on your own machine.",
    "ctaText": "Schedule opencode in CodeAgentSwarm 2.5.0 with any provider you connected, and read each run in a Chat.",
    "ctaAgent": "opencode",
    "highlightedWords": [
      "opencode"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-opencode"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "How do I put opencode on a cron?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/opencode-icon.svg",
          "alt": "opencode",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Local, log only:</strong> cron calls <code>opencode run</code>.",
            "<strong>On GitHub runners:</strong> the official opencode GitHub Action with <code>on: schedule</code>.",
            "<strong>Local, with a conversation:</strong> CodeAgentSwarm runs opencode at the times you set and keeps every run in a Chat."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "What opencode offers on its own",
      "content": [
        {
          "type": "paragraph",
          "text": "The CLI reference has no schedule command. The official <a href=\"https://opencode.ai/docs/github/\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">GitHub integration</a> accepts a <code>schedule</code> cron trigger, which runs on GitHub's machines against your repository. Community plugins add scheduling too, but they are not part of opencode."
        }
      ]
    },
    {
      "id": "cron",
      "title": "An opencode cron job with opencode run",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: every 6 hours\n0 */6 * * * cd ~/code/my-app && opencode run \"Run the tests and explain new failures. Do not edit files.\" >> ~/logs/opencode-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>opencode run</code> accepts <code>-m</code> for the model and <code>--format json</code> for machine-readable output, and can attach to a running <code>opencode serve</code>. <a href=\"https://opencode.ai/docs/cli/\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">opencode CLI docs</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule opencode in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a opencode Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>opencode</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with opencode",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 08:00: pull the latest main, run the tests and report what broke overnight.",
            "Every 12 hours: check the error log in this project and group new errors by cause.",
            "Saturdays at 10:00: look for unused files and exports and list them, without deleting anything."
          ]
        },
        {
          "type": "paragraph",
          "text": "opencode works with many providers. Set the model in the schedule if a job must always use the same one; leave it on Default to follow your opencode configuration."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the opencode agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/run-multiple-opencode-sessions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Run several opencode sessions at once</a>",
            "<a href=\"/en/guides/opencode-yolo-mode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">opencode permissions and YOLO mode</a>",
            "<a href=\"/en/guides/opencode-conversation-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">opencode conversation history</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does opencode have a built-in scheduler?",
      "answer": "No. The CLI has no schedule command. You can use cron with opencode run, the GitHub Action with a schedule trigger, or CodeAgentSwarm."
    },
    {
      "question": "Can I schedule opencode with a different provider per job?",
      "answer": "Yes. In CodeAgentSwarm each schedule can set its own model; in cron, pass -m to opencode run."
    },
    {
      "question": "Does the GitHub Action run on my machine?",
      "answer": "No. It runs on GitHub Actions runners against the repository. For local files and your local setup, use cron or CodeAgentSwarm."
    }
  ]
}

export default guide
