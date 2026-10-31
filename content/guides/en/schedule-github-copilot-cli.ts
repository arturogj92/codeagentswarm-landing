import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "schedule-github-copilot-cli",
    "locale": "en",
    "title": "How to schedule GitHub Copilot CLI: /every, cron and GitHub Actions",
    "metaTitle": "Schedule GitHub Copilot CLI: /every, Cron and GitHub Actions",
    "metaDescription": "Copilot CLI /every is experimental and lives in one session. Schedule Copilot CLI with copilot -p in cron, GitHub Actions, or CodeAgentSwarm.",
    "intro": "GitHub Copilot CLI has an experimental <code>/every</code> command that repeats a prompt inside a session. For unattended runs, GitHub's own docs point you to <code>copilot -p</code> with cron, Task Scheduler or GitHub Actions. This guide covers those options and scheduling Copilot CLI in CodeAgentSwarm.",
    "ctaText": "Schedule GitHub Copilot CLI in CodeAgentSwarm 2.5.0 and read every run in a Chat you can continue.",
    "ctaAgent": "multi",
    "highlightedWords": [
      "GitHub Copilot CLI",
      "Copilot"
    ],
    "publishedAt": "2026-10-31",
    "updatedAt": "2026-10-31",
    "alternateSlug": "tareas-programadas-github-copilot-cli"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Can GitHub Copilot CLI run on a schedule?",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/copilot-icon.svg",
          "alt": "GitHub Copilot CLI",
          "size": "inline"
        },
        {
          "type": "list",
          "items": [
            "<strong>Inside a session (experimental):</strong> <code>/every</code> and <code>/after</code>.",
            "<strong>Unattended on your machine:</strong> cron or Task Scheduler with <code>copilot -p</code>, or CodeAgentSwarm.",
            "<strong>On GitHub runners:</strong> a workflow with an <code>on: schedule</code> trigger."
          ]
        }
      ]
    },
    {
      "id": "native",
      "title": "Copilot CLI /every and /after",
      "content": [
        {
          "type": "paragraph",
          "text": "<code>/every</code> (alias <code>/loop</code>) repeats a prompt between 10 seconds and 1 day apart; <code>/after</code> runs it once later. Both belong to the session and come back with <code>--continue</code> or <code>--resume</code>. They need experimental mode (<code>/experimental on</code>). <a href=\"https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/schedule-prompts\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">GitHub: schedule prompts</a>"
        },
        {
          "type": "paragraph",
          "text": "GitHub also documents running Copilot CLI from GitHub Actions. <a href=\"https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/automate-with-actions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Automate with GitHub Actions</a>"
        }
      ]
    },
    {
      "id": "cron",
      "title": "A Copilot CLI cron job with copilot -p",
      "content": [
        {
          "type": "code",
          "language": "bash",
          "code": "# crontab -e: weekdays at 09:00\n0 9 * * 1-5 cd ~/code/my-app && copilot -p \"Summarise the issues assigned to me in this repo.\" -s --no-ask-user >> ~/logs/copilot-cron.log 2>&1"
        },
        {
          "type": "paragraph",
          "text": "Grant only the tools the job needs with <code>--allow-tool</code>; GitHub advises against <code>--allow-all</code> outside a sandbox. <a href=\"https://docs.github.com/en/copilot/how-tos/copilot-cli/automate-copilot-cli/run-cli-programmatically\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Run Copilot CLI programmatically</a>"
        }
      ]
    },
    {
      "id": "set-up",
      "title": "Schedule GitHub Copilot CLI in CodeAgentSwarm",
      "content": [
        {
          "type": "list",
          "items": [
            "Open <strong>Scheduled</strong> in the top bar and press <strong>New schedule</strong>. Or type the prompt in a GitHub Copilot CLI Chat and pick <strong>Schedule this prompt…</strong> from the send menu.",
            "Pick the <strong>Project</strong> and choose <strong>GitHub Copilot CLI</strong> as the agent. Model, reasoning and permissions are optional: leave them on Default or set them like in the Chat composer.",
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
      "title": "Prompts worth scheduling with GitHub Copilot CLI",
      "content": [
        {
          "type": "list",
          "items": [
            "Every weekday at 09:00: summarise the issues assigned to me in this repo and suggest an order.",
            "Every 4 hours: run the tests locally and explain new failures.",
            "Fridays at 17:00: draft release notes from the commits merged this week."
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
            "With <strong>Continue the same conversation</strong>, a visible run goes to the GitHub Copilot CLI agent that already holds the conversation, and never opens a second copy. With <strong>Start a new conversation</strong>, each run opens a fresh agent. If it is busy, <strong>Skip if still working</strong> (on by default) skips that slot; turn it off and the prompt waits in the queue.",
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
      "question": "What is /every in GitHub Copilot CLI?",
      "answer": "An experimental command that repeats a prompt inside the current session, from every 10 seconds to once a day. It needs experimental mode."
    },
    {
      "question": "How do I run Copilot CLI on a cron?",
      "answer": "Call copilot -p from a crontab line or Task Scheduler, with only the tools the job needs allowed. GitHub documents this pattern."
    },
    {
      "question": "Can CodeAgentSwarm schedule Copilot CLI with my GitHub account?",
      "answer": "Yes. Scheduled runs use the Copilot CLI login on the computer that runs them."
    }
  ]
}

export default guide
