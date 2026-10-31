import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-kimi-code",
    "locale": "en",
    "title": "How to schedule Kimi Code: in-session cron, kimi -p and CodeAgentSwarm",
    "metaTitle": "Schedule Kimi Code: Cron Jobs with kimi -p or CodeAgentSwarm",
    "metaDescription": "Kimi Code only repeats prompts inside an open session. Run it on a real schedule with kimi -p in cron, or with CodeAgentSwarm on your machine.",
    "intro": "Kimi Code can repeat a prompt inside a session with its cron tools, and those tools are bound to that session. To run Kimi Code every morning with nothing open, use cron with <code>kimi -p</code> or CodeAgentSwarm Scheduled Conversations.",
    "ctaText": "Schedule Kimi Code in CodeAgentSwarm 2.5.0 and read every run in a Chat you can continue.",
    "ctaAgent": "kimi-code",
    "highlightedWords": [
      "Kimi Code"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-kimi-code"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can Kimi Code run on a schedule?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/kimi-icon.png",
          "alt": "Kimi Code",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Inside a session:</strong> yes, the agent can set recurring prompts while that session lives.",
            "<strong>With nothing open:</strong> use cron with <code>kimi -p</code>, or CodeAgentSwarm."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Kimi Code's in-session cron",
      "content": [
        {
          "type": "paragraph",
          "text": "Kimi Code has CronCreate, CronList and CronDelete tools that re-send a prompt into the same session. Those tasks are bound to that session and stay active when you resume it with <code>kimi --session</code>. A session holds up to 50, recurring ones expire after 7 days, and <code>KIMI_DISABLE_CRON=1</code> turns them off. <a href=\"https://www.kimi.com/code/docs/en/kimi-code-cli/reference/tools.html\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Kimi Code tools reference</a>"
        },
        {
          "type": "paragraph",
          "text": "That is useful for \"check the build every 10 minutes while I work\". For a job that must start at 07:30 every weekday, you need something outside the session."
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Kimi Code cron job with kimi -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 07:30\n30 7 * * 1-5 cd ~/code/my-app && kimi -p \"Sort the new issues into bug, feature and question. Do not edit files.\" >> ~/logs/kimi-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "<code>--output-format stream-json</code> gives machine-readable output. Kimi says to use <code>--yolo</code> only in trusted, version-controlled workspaces. <a href=\"https://www.kimi.com/resources/kimi-code-cheat-sheet\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Kimi Code cheat sheet</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule Kimi Code in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a Kimi Code Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>Kimi Code</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with Kimi Code",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 07:30: read the new issues and label each one as bug, feature or question in a short list.",
            "Every 6 hours: run the test suite and explain any new failure.",
            "Fridays at 18:00: write a short summary of what changed in the repo this week."
          ]
        },
        {
          "type": "paragraph",
          "text": "Every scheduled run uses your Kimi Code plan like any other session. Spread heavy jobs over the day with <em>Every few hours</em> instead of stacking them at the same minute."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the Kimi Code agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
            "<a href=\"/en/guides/how-to-use-kimi-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">How to use Kimi Code CLI</a>",
            "<a href=\"/en/guides/kimi-code-plans-and-pricing\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Kimi Code plans and limits</a>",
            "<a href=\"/en/guides/kimi-code-conversation-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Kimi Code conversation history</a>"
          ]
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does Kimi Code have cron?",
      "answer": "Inside a session: the agent can schedule prompts that repeat in that session, and recurring ones expire after 7 days. For a schedule with nothing open, use cron or CodeAgentSwarm."
    },
    {
      "question": "How do I run Kimi Code from cron?",
      "answer": "Add a crontab line that changes to the project and runs kimi -p with your prompt, writing the output to a log."
    },
    {
      "question": "Do scheduled runs count against my Kimi Code quota?",
      "answer": "Yes. Every run uses your Kimi Code plan like a normal session, so spread heavy jobs across the day."
    }
  ]
}

export default guide
