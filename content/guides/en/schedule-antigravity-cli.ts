import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-antigravity-cli",
    "locale": "en",
    "title": "How to schedule Antigravity CLI (agy): cron and recurring runs",
    "metaTitle": "Schedule Antigravity CLI (agy): Cron and Recurring Runs",
    "metaDescription": "Antigravity CLI has no documented scheduler. Run agy on a schedule with agy -p in cron, or with CodeAgentSwarm in a Chat you can continue.",
    "intro": "Google's Antigravity CLI (<code>agy</code>, the successor to Gemini CLI) has no documented way to run on a schedule. Its changelog mentions a schedule tool the agent can use inside a session, but no docs page explains it. To run agy every morning you have two solid options: cron with headless mode, or CodeAgentSwarm Scheduled Conversations.",
    "ctaText": "Schedule Antigravity CLI in CodeAgentSwarm 2.5.0 and read every run in its own Chat.",
    "ctaAgent": "antigravity",
    "highlightedWords": [
      "Antigravity CLI"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-antigravity-cli"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can Antigravity CLI run on a schedule?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/antigravity-icon.png",
          "alt": "Antigravity CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Not as a documented feature. Use one of these:"
        },
        {
          "type": "list",
          "items": [
            "<strong>cron plus <code>agy -p</code>.</strong> Headless mode runs one prompt and prints the answer.",
            "<strong>CodeAgentSwarm.</strong> Pick Antigravity CLI as the agent, set the times and read each run in a Chat you can continue."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "What Antigravity CLI offers today",
      "content": [
        {
          "type": "paragraph",
          "text": "The official docs cover headless mode but no scheduler. The <a href=\"https://raw.githubusercontent.com/google-antigravity/antigravity-cli/refs/heads/main/CHANGELOG.md\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">changelog</a> lists a <code>schedule</code> tool for recurring and one-shot timers inside the agent, without a page that explains how long those schedules live. Treat it as an in-session helper, not a cron replacement, until Google documents it."
        }
      ]
    },
    {
      "id": "cron",
      "title": "An agy cron job with headless mode",
      "content": [
        {
          "type": "paragraph",
          "text": "Sign in once interactively, then cron can call headless mode:"
        },
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 09:00\n0 9 * * 1-5 cd ~/code/my-app && agy -p \"Explain any failing test. Do not edit files.\" --output-format text >> ~/logs/agy-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Options include <code>--output-format text|json|stream-json</code> and <code>--model</code>. Skipping permission prompts in an unattended job is risky; keep the prompt read-only. <a href=\"https://antigravity.google/docs/cli/headless\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Antigravity headless docs</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Antigravity CLI in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Antigravity CLI Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Antigravity CLI</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
            "Write the prompt the agent should run every time.",
            "Under <strong>When</strong>, choose <em>At set times</em> (up to 24 a day), <em>Every few hours</em> (1, 2, 3, 4, 6, 8 or 12) or <em>When I run it</em>, and the days.",
            "Choose <strong>Visible</strong> (opens a Chat) or <strong>Headless</strong> (no tab, result in Scheduled), and whether each run continues the same conversation or starts a new one. Press <strong>Create schedule</strong>."
          ]
        },
        {
          "type": "image",
          "src": "/images/guides/schedule-agent-picker.webp",
          "alt": "CodeAgentSwarm schedule editor with the agent list open, showing Claude Code, Codex CLI, Antigravity CLI, opencode and Kimi Code",
          "caption": "Antigravity CLI appears in the agent list once agy is installed. Real capture from CodeAgentSwarm 2.5.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "examples",
      "title": "Prompts worth scheduling with Antigravity CLI",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 09:00: read the open issues and draft a plan for the top one, without editing files.",
            "Every 8 hours: run the tests and explain any failure in plain words.",
            "Sundays at 20:00: review this week's commits and list risky changes."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Antigravity CLI agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/how-to-use-antigravity-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">How to use Antigravity CLI (agy)</a>",
            "<a href=\"/en/guides/antigravity-yolo-mode\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Antigravity CLI permissions and YOLO mode</a>",
            "<a href=\"/en/guides/antigravity-cli-conversation-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Antigravity CLI conversation history</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does Antigravity CLI have a scheduler?",
      "answer": "Not a documented one. The changelog mentions an in-session schedule tool, but the docs only describe headless mode, which you can call from cron."
    },
    {
      "question": "How do I run agy from cron?",
      "answer": "Sign in once, then add a crontab line that changes to the project and runs agy -p with your prompt, writing output to a log."
    },
    {
      "question": "Can I schedule Antigravity CLI and still continue the conversation?",
      "answer": "Yes, in CodeAgentSwarm. With Continue the same conversation, every run lands in the same Antigravity Chat and you can reply to it."
    }
  ]
}

export default guide
