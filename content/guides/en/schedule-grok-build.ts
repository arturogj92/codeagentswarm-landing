import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-grok-build",
    "locale": "en",
    "title": "How to schedule Grok Build: /loop, grok -p in cron and CodeAgentSwarm",
    "metaTitle": "Schedule Grok Build: /loop, Cron with grok -p, CodeAgentSwarm",
    "metaDescription": "Grok Build /loop repeats a prompt and expires after 7 days. Run Grok Build at set times with grok -p in cron, or locally with CodeAgentSwarm.",
    "intro": "Grok Build has <code>/loop</code>, which runs a prompt now and then again on an interval, and loops expire after 7 days. For a job pinned to 08:00 every weekday that keeps going, use cron with <code>grok -p</code> or CodeAgentSwarm Scheduled Conversations.",
    "ctaText": "Schedule Grok Build in CodeAgentSwarm 2.5.0 and get every run in a Chat you can answer.",
    "ctaAgent": "grok-build",
    "highlightedWords": [
      "Grok Build"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-grok-build"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can Grok Build run on a schedule?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/grok-icon.svg",
          "alt": "Grok Build",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Repeat something for a while:</strong> <code>/loop 30m &lt;prompt&gt;</code>.",
            "<strong>At set times, week after week:</strong> cron with <code>grok -p</code>, or CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Grok Build /loop",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>/loop</code> \"runs a prompt on a recurring interval\". The interval takes <code>Ns</code> (minimum 60), <code>Nm</code>, <code>Nh</code> or <code>Nd</code>; the prompt fires immediately and then repeats, each firing as a new agent turn. Loops expire after 7 days and at most 50 scheduled tasks can be active at once. <a href=\"https://docs.x.ai/build/features/background-tasks\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Grok Build background tasks</a>"
        },
        {
          "type": "paragraph",
          "text": "xAI also notes that <code>/loop</code> is one of the commands that appear only when their feature is available. <a href=\"https://docs.x.ai/build/modes-and-commands\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Modes and commands</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Grok Build cron job with grok -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 09:00\n0 9 * * 1-5 cd ~/code/my-app && grok -p \"Review yesterday's commits and flag risky changes.\" --output-format plain >> ~/logs/grok-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Output formats are <code>plain</code>, <code>json</code> or <code>streaming-json</code>. Scripts can authenticate with <code>XAI_API_KEY</code>, and <code>--no-auto-update</code> skips background update checks. The <a href=\"/en/guides/grok-build-headless-ci\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Grok Build headless guide</a> covers the flags in detail. <a href=\"https://docs.x.ai/build/cli/headless-scripting\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">xAI headless docs</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Grok Build in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Grok Build Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Grok Build</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Grok Build",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 09:00: review yesterday's commits and flag anything that needs a second look.",
            "Every 4 hours: run the tests and explain new failures, without editing files.",
            "Sundays at 11:00: update the README sections that no longer match the code, and show the diff."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Grok Build agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/grok-build-headless-ci\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Grok Build headless mode for scripts and CI</a>",
            "<a href=\"/en/guides/how-to-use-grok-build\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">How to use Grok Build</a>",
            "<a href=\"/en/guides/grok-build-conversation-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Grok Build conversation history</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Is /loop in Grok Build a cron job?",
      "answer": "Not quite. It runs a prompt now and then on an interval of at least 60 seconds, and loops expire after 7 days. It is not pinned to clock times."
    },
    {
      "question": "How do I run Grok Build from cron?",
      "answer": "Add a crontab line that changes to the project and runs grok -p with your prompt. XAI_API_KEY and --no-auto-update help for unattended runs."
    },
    {
      "question": "Can I schedule Grok Build on Windows?",
      "answer": "Yes. CodeAgentSwarm schedules work the same on macOS, Windows and Linux, so you do not need Task Scheduler."
    }
  ]
}

export default guide
