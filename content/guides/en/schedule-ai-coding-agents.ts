import type { Guide } from '../types'

const link = (href: string, text: string) =>
  `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'schedule-ai-coding-agents',
    locale: 'en',
    title: 'How to schedule AI coding agents: cron for Claude Code, Codex and 10 more',
    metaTitle: 'Schedule AI Coding Agents: Cron for Claude Code, Codex & More',
    metaDescription: 'Run an AI coding agent on a schedule: native schedulers, cron with a headless CLI, or CodeAgentSwarm Scheduled Conversations for 12 agents on your machine.',
    intro: 'You want an agent to do the same job every morning, every few hours or every Sunday without you typing the prompt again. There are three ways to get there: the scheduler your agent ships with (if it has one), system cron with a headless command, or Scheduled Conversations in CodeAgentSwarm 2.5.0. This guide compares them and shows the CodeAgentSwarm setup, which works the same for all 12 agents it supports.',
    ctaText: 'Create your first schedule in CodeAgentSwarm 2.5.0: pick a project, an agent and a prompt, and let it start on its own.',
    ctaAgent: 'multi',
    highlightedWords: ['schedule', 'cron'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'tareas-programadas-agentes-ia',
    socialImage: '/images/guides/schedule-editor-times.webp',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'How do I run an AI coding agent on a schedule?',
      content: [
        {
          type: 'paragraph',
          text: 'Pick the option that matches where the work has to happen:',
        },
        {
          type: 'list',
          items: [
            '<strong>The agent\'s own scheduler.</strong> Claude Code, Codex, Cursor, Devin and Cline have one that runs with no session open, some locally and some in the vendor\'s cloud. Antigravity CLI, Kimi Code and Copilot CLI repeat prompts inside the current conversation, and the Grok Build and Muse Code loops expire after 7 days. The per-agent guides below say what each one really offers.',
            '<strong>System cron plus a headless command.</strong> Most CLIs can run one prompt and exit (for example <code>claude -p</code> or <code>codex exec</code>). cron calls it at the time you set. It is free and local, but you get a log file, not a conversation.',
            '<strong>CodeAgentSwarm Scheduled Conversations.</strong> A schedule is a project, an agent, a prompt and a repeat rule. When the time comes the prompt goes to the agent on your computer, in a normal Chat you can read and continue. Same setup for every agent.',
          ],
        },
        {
          type: 'video',
          src: '/videos/features/scheduled-conversations.mp4',
          poster: '/videos/features/scheduled-conversations-poster.webp',
          caption: 'Real capture from CodeAgentSwarm 2.5.0: creating a daily 21:00 schedule for Codex and the run arriving in its Chat.',
        },
      ],
    },
    {
      id: 'compare',
      title: 'Native scheduler, cron or CodeAgentSwarm',
      content: [
        {
          type: 'table',
          headers: ['', 'Native scheduler', 'cron + headless CLI', 'CodeAgentSwarm'],
          rows: [
            ['Where it runs', 'Depends on the agent: Cursor and Devin run in their cloud, Claude Desktop and the ChatGPT desktop app run local tasks, Cline runs through its hub', 'Your machine', 'Your machine, in your project folder'],
            ['Agents', 'Only that vendor\'s agent', 'Any CLI with a headless mode', 'All 12 supported agents'],
            ['Result', 'Session or PR in the vendor\'s app', 'Text in a log file', 'A Chat you can read, answer and continue'],
            ['Machine off at the set time', 'Cloud runs still happen; local ones wait or skip', 'The run is lost', 'One late run when the app opens (optional)'],
            ['Change it from your phone', 'Depends on the vendor', 'No', 'Yes, in the Scheduled tab'],
          ],
        },
        {
          type: 'paragraph',
          text: 'They are not exclusive. A cloud routine is the right tool for work that must happen with your laptop closed. CodeAgentSwarm is for work that needs your local files, your tools and your signed-in CLIs, and that you want to read like any other conversation.',
        },
      ],
    },
    {
      id: 'agents',
      title: 'Scheduling guide for each agent',
      content: [
        {
          type: 'paragraph',
          text: 'Each guide checks what the agent offers on its own, from the official docs, and shows the CodeAgentSwarm setup for it.',
        },
        {
          type: 'table',
          headers: ['Agent', 'Built-in scheduling', 'Guide'],
          rows: [
            ['Claude Code', 'Yes: cloud tasks (<code>/schedule</code>), local tasks in Claude Desktop, <code>/loop</code> in a session', link('/en/guides/schedule-claude-code', 'Schedule Claude Code')],
            ['Codex', 'Yes: scheduled tasks in the ChatGPT app, not in the CLI', link('/en/guides/schedule-codex', 'Codex scheduled tasks')],
            ['Cline', 'Yes: <code>cline schedule</code> in the CLI', link('/en/guides/schedule-cline', 'Schedule Cline')],
            ['Cursor Agent', 'Automations, run as cloud agents; not in the CLI', link('/en/guides/schedule-cursor-agent', 'Schedule Cursor Agent')],
            ['Devin CLI', 'Automations in Devin cloud; not in the CLI', link('/en/guides/schedule-devin-cli', 'Schedule Devin CLI')],
            ['GitHub Copilot CLI', 'Experimental <code>/every</code> inside a session; GitHub Actions', link('/en/guides/schedule-github-copilot-cli', 'Schedule Copilot CLI')],
            ['Kimi Code', 'Cron tools inside a session only', link('/en/guides/schedule-kimi-code', 'Schedule Kimi Code')],
            ['Grok Build', '<code>/loop</code>, expires after 7 days', link('/en/guides/schedule-grok-build', 'Schedule Grok Build')],
            ['Muse Code', '<code>/loop</code>, expires after 7 days', link('/en/guides/schedule-muse-code', 'Schedule Muse Code')],
            ['Antigravity CLI', '<code>/schedule</code> inside the conversation; scheduled sidecars documented for the Antigravity app', link('/en/guides/schedule-antigravity-cli', 'Schedule Antigravity CLI')],
            ['opencode', 'None in the CLI; GitHub Action with a schedule trigger', link('/en/guides/schedule-opencode', 'Schedule opencode')],
            ['Pi', 'None', link('/en/guides/schedule-pi-coding-agent', 'Schedule Pi')],
          ],
          caption: 'Checked against official docs on 2026-10-31. "Inside a session" or "inside the conversation" means the schedule belongs to that session.',
        },
      ],
    },
    {
      id: 'set-up',
      title: 'Create a schedule in CodeAgentSwarm',
      content: [
        {
          type: 'list',
          items: [
            'Open <strong>Scheduled</strong> from the top bar and press <strong>New schedule</strong>. In any Chat, the send menu also has <strong>Schedule this prompt…</strong>, which starts from the prompt you already typed.',
            'Choose the <strong>Project</strong> and the <strong>Agent</strong>. Model, reasoning and permissions are optional and use the same choices as the Chat composer; leave them on Default to use the agent\'s own defaults.',
            'Write the <strong>Prompt</strong>: what the agent should do on every run. The name is optional; the first words of the prompt are used.',
            'Set <strong>When</strong>: <em>When I run it</em>, <em>At set times</em> or <em>Every few hours</em>, and the days.',
            'Choose <strong>How it runs</strong> (Visible or Headless) and what <strong>Each run</strong> does (continue the same conversation or start a new one), then <strong>Create schedule</strong>.',
          ],
        },
        {
          type: 'image',
          src: '/images/guides/schedule-agent-picker.webp',
          alt: 'The New Scheduled Conversation editor with the agent list open: Claude Code, Codex CLI, Antigravity CLI, opencode, Kimi Code',
          caption: 'The agent list shows every agent installed on that computer.',
          size: 'full',
        },
      ],
    },
    {
      id: 'repeat',
      title: 'Repeat rules: set times, every few hours or manual',
      content: [
        {
          type: 'table',
          headers: ['Option', 'What it does'],
          rows: [
            ['When I run it', 'Never starts by itself. Use it for a prompt you trigger with <strong>Run now</strong>.'],
            ['At set times', 'Up to 24 times a day (24-hour clock, like 07:30 and 21:00) on the days you pick.'],
            ['Every few hours', 'Every 1, 2, 3, 4, 6, 8 or 12 hours on the days you pick.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Days have three one-tap presets, <strong>Every day</strong>, <strong>Weekdays</strong> and <strong>Weekends</strong>, plus a chip for each day. The editor shows the next three runs before you save, so you can check the rule does what you meant.',
        },
        {
          type: 'image',
          src: '/images/guides/schedule-editor-times.webp',
          alt: 'Schedule editor set to At set times, Every day, 21:00, with the next runs listed and Visible selected',
          caption: 'Every day at 21:00. The next runs appear under the times.',
          size: 'full',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Times use the clock of the computer that runs the agent. If you edit a schedule from your phone in another time zone, the Scheduled tab tells you which clock the times use.',
        },
      ],
    },
    {
      id: 'visible-headless',
      title: 'Visible or headless, continue or start fresh',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Visible</strong> opens an agent with the prompt, like a session you started yourself. If that agent is already open and idle, the prompt goes straight to it; it never opens a second copy.',
            '<strong>Headless</strong> runs with no tab. The result shows in the Scheduled window, and <strong>Open as agent</strong> turns it into a normal session when you want to keep going.',
            '<strong>Continue the same conversation</strong> sends each run to the same thread, so the agent remembers yesterday. If you change the agent, model, reasoning or permissions, the next run starts a new conversation instead of feeding an old session with old settings.',
            '<strong>Start a new conversation</strong> gives every run a clean context.',
          ],
        },
        {
          type: 'image',
          src: '/images/guides/schedule-run-chat.webp',
          alt: 'A Codex Chat showing a Schedule divider with the prompt and the agent\'s answer listing pending items',
          caption: 'A visible run: the Chat marks it as a scheduled run, first run or ran again, and you can reply as usual.',
          size: 'full',
        },
      ],
    },
    {
      id: 'missed-busy',
      title: 'What happens when the app is closed or the agent is busy',
      content: [
        {
          type: 'list',
          items: [
            '<strong>If missed, run when the app opens</strong> (on by default). A slot passed while the app was closed or the computer was asleep: it runs once, marked as late. A week away gives one late run, not seven.',
            'Turn it off and missed slots are skipped; the schedule waits for its next time.',
            '<strong>Skip if still working</strong> (on by default). If the previous run is still working, that scheduled slot is skipped. Turn it off and the prompt waits in the agent\'s queue instead. <strong>Run now</strong> always queues.',
            '<strong>Git Worktree</strong> gives each new agent its own worktree, so a scheduled job does not touch the checkout you are editing.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Schedules run on your computer, not in a cloud. CodeAgentSwarm has to be open and the computer awake at the set time; otherwise the late-run option catches up when you come back.',
        },
      ],
    },
    {
      id: 'agents-phone',
      title: 'Let an agent or your phone manage schedules',
      content: [
        {
          type: 'paragraph',
          text: 'Agents get four tools through the CodeAgentSwarm MCP server: <code>list_schedules</code>, <code>save_schedules</code>, <code>run_schedule</code> and <code>delete_schedules</code>. Ask in plain words and the agent creates or edits the schedule; it only changes schedules when you ask. Swarmi, the in-app assistant, uses the same tools.',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Create a schedule for this project: every weekday at 08:30,\nCodex reads yesterday\'s CI failures and opens a task for each one.\nVisible, continue the same conversation.',
        },
        {
          type: 'paragraph',
          text: 'The CodeAgentSwarm phone app has a <strong>Scheduled</strong> tab for each connected computer. You can list schedules, edit them, pause them, press Run now and open a run\'s conversation.',
        },
        {
          type: 'image',
          src: '/images/guides/scheduled-window.webp',
          alt: 'The Scheduled window listing schedules grouped by project, with next run times, Run now and Edit',
          caption: 'The Scheduled window: schedules by project, the next runs and each run\'s status.',
          size: 'full',
        },
      ],
    },
    {
      id: 'ideas',
      title: 'Jobs that work well on a schedule',
      content: [
        {
          type: 'list',
          items: [
            'Every weekday at 08:30: read new feedback or issues and turn each one into a task on the board.',
            'Every 6 hours: run the test suite and explain any new failure.',
            'Every night: check dependencies for updates and security notes, without changing files.',
            'Sundays at 10:00: clean build caches and report what was removed.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Start read-only. Watch two or three runs, then give the schedule more permissions if you trust the result. Pair a schedule with ' + link('/en/guides/codeagentswarm-notifications', 'notifications') + ' so you hear when a run needs input, and with ' + link('/en/guides/git-worktrees-for-ai-coding-agents', 'Git worktrees') + ' when it edits code.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I put an AI coding agent on cron?',
      answer: 'Yes. Most agent CLIs have a headless mode that runs one prompt and exits, and cron can call it. You get a log, not a conversation. CodeAgentSwarm gives you the schedule plus a Chat you can continue.',
    },
    {
      question: 'Does CodeAgentSwarm run schedules when my computer is off?',
      answer: 'No. Runs happen on your computer while CodeAgentSwarm is open. With "If missed, run when the app opens" on, a missed slot runs once when you open the app.',
    },
    {
      question: 'Which agents can I schedule in CodeAgentSwarm?',
      answer: 'All 12 it supports: Claude Code, Codex, Antigravity CLI, opencode, Kimi Code, Grok Build, Cursor Agent, Pi, Devin CLI, Muse Code, Cline and GitHub Copilot CLI.',
    },
    {
      question: 'How often can a schedule run?',
      answer: 'Up to 24 set times a day on chosen days, or every 1, 2, 3, 4, 6, 8 or 12 hours. A manual schedule runs only when you press Run now.',
    },
    {
      question: 'What if the previous run is still working?',
      answer: 'By default that slot is skipped. Turn off "Skip if still working" and the new prompt waits in the agent\'s queue instead.',
    },
  ],
}

export default guide
