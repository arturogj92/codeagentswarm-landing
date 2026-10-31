import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-muse-code",
    "locale": "en",
    "title": "How to schedule Muse Code: /loop, muse exec in cron and CodeAgentSwarm",
    "metaTitle": "Schedule Muse Code: /loop, Cron with muse exec, CodeAgentSwarm",
    "metaDescription": "Muse Code /loop only repeats inside a session. Run Meta's Muse Code on a real schedule with muse exec in cron, or with CodeAgentSwarm.",
    "intro": "Muse Code, Meta's terminal coding agent, has <code>/loop</code> for repeating a prompt inside an interactive session. Nothing in its docs starts Muse on its own at a set time with no session open. For that, use cron with <code>muse exec</code> or CodeAgentSwarm Scheduled Conversations.",
    "ctaText": "Schedule Muse Code in CodeAgentSwarm 2.5.0 and read each run in a Chat you can continue.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse Code"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-muse-code"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can Muse Code run on a schedule?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Inside a session:</strong> <code>/loop</code>, with shorthand like 1h or a cron expression.",
            "<strong>At set times with nothing open:</strong> cron with <code>muse exec</code>, or CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Muse Code /loop",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>/loop</code> takes shorthand (5m, 1h, 2d) or a five-field cron expression and defaults to every 10 minutes. It lives in the interactive session, and recurring jobs expire after 7 days. <a href=\"https://dev.meta.ai/docs/muse-code/interactive\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse Code interactive docs</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Muse Code cron job with muse exec",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 09:00\n0 9 * * 1-5 cd ~/code/my-app && muse exec \"Read the new issues and suggest quick fixes. Do not edit files.\" >> ~/logs/muse-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>--json</code> gives machine-readable output and <code>--prompt-file</code> reads a longer prompt from disk. <code>--disable-approval</code> keeps the sandbox; <code>--yolo</code> removes both approvals and sandbox, so leave it out of unattended jobs. <a href=\"https://dev.meta.ai/docs/muse-code/extending\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse Code automation docs</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Muse Code in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Muse Code Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Muse Code</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Muse Code",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 09:00: read the new issues and suggest which ones are quick fixes.",
            "Every 6 hours: run the tests and explain any failure.",
            "Saturdays at 10:00: review the docs folder and list pages that mention removed functions."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Muse Code agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/how-to-use-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">How to use Muse Code</a>",
            "<a href=\"/en/guides/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse Code MCP, skills and workflows</a>",
            "<a href=\"/en/guides/muse-code-models-pricing-privacy\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse Code models, pricing and privacy</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Is Muse Code /loop a cron job?",
      "answer": "No. It repeats a prompt inside an interactive session and recurring jobs expire after 7 days. It does not start Muse when no session is open."
    },
    {
      "question": "How do I run Muse Code from cron?",
      "answer": "Add a crontab line that changes to the project and runs muse exec with your prompt, writing the output to a log."
    },
    {
      "question": "Can I schedule Muse Code on Windows?",
      "answer": "Yes. CodeAgentSwarm schedules work the same on macOS, Windows and Linux."
    }
  ]
}

export default guide
