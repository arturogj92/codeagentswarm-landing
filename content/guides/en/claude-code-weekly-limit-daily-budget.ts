import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-weekly-limit-daily-budget',
    locale: 'en',
    title: 'Claude Code Weekly Limit: A Daily Budget That Makes Your Quota Last All Week',
    metaTitle: 'Claude Code Weekly Limit: Daily Budget for Every AI Agent (2026)',
    metaDescription: 'Stop burning your Claude Code weekly limit in two days. Set a daily budget per provider, spread what is left until the reset, and pause new work at the limit.',
    intro: `The weekly limit is the one that hurts. The five hour window resets while you grab lunch, but the weekly one does not care about your plans. Run four agents hard on Monday and Tuesday, and by Wednesday morning you are locked out until the reset, with half the week still ahead of you.

The problem is not that the quota is too small. It is that nothing stops you from spending the whole week in a day or two. Parallel agents make this much worse, because each one pulls from the same pool.

CodeAgentSwarm 2.4.0 adds a daily budget for every provider that reports its quota. You decide how much of the week each day may use, either a fixed share or a Smart pace that spreads what is left until the reset. When today's limit is reached, the app can warn you, pause new work, or stop it. This guide covers how it works, how to set it up, and a few habits that keep you working all week.`,
    highlightedWords: ['Weekly Limit', 'Daily Budget'],
    publishedAt: '2026-09-27',
    updatedAt: '2026-09-27',
    ctaText: 'Turn on a daily budget for your main agent and keep enough of the week left for Friday.',
    ctaAgent: 'multi',
    alternateSlug: 'limite-semanal-claude-code-presupuesto-diario',
  },
  sections: [
    {
      id: 'why-the-weekly-limit-runs-out',
      title: 'Why the weekly limit runs out by Wednesday',
      content: [
        {
          type: 'paragraph',
          text: 'Most coding agent subscriptions measure usage in two layers. Claude Code has a short rolling window of about five hours and a weekly limit on top of it. Codex works in a similar way. Cursor measures a monthly window. The short window slows you down for an afternoon. The long one can block you for days.',
        },
        {
          type: 'paragraph',
          text: `The trap is simple. Right after the weekly reset you have plenty of room, so you open more sessions, let agents run longer, and pick the biggest model for everything. Two heavy days later the week is gone. If you want the details of each plan and its windows, the <a href="/en/guides/claude-code-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code plans and pricing guide</a> and the <a href="/en/guides/codex-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex plans guide</a> go through them.`,
        },
        {
          type: 'demo',
          demo: 'daily-budget',
          caption: 'A daily budget per provider: today\'s limit, what is left this week, and what happens when you reach it.',
        },
        {
          type: 'paragraph',
          text: 'A daily budget fixes the habit, not the plan. It turns one big weekly pool into a daily allowance, so a busy Monday cannot eat Thursday.',
        },
      ],
    },
    {
      id: 'how-the-daily-budget-works',
      title: 'How the daily budget works',
      content: [
        {
          type: 'paragraph',
          text: 'The daily budget lives in Settings › Providers, in the Quota Indicator section, under "Usage budget". Each provider that reports a measurable quota gets its own row with its own switch. It is off by default, so nothing changes until you turn it on.',
        },
        {
          type: 'paragraph',
          text: 'The unit is the provider\'s own percentage. A limit of 15% on Claude means that today may use at most 15 points of the weekly window. There is no conversion to dollars or tokens, because providers do not report those in a reliable way. CodeAgentSwarm reads the provider\'s remaining quota and adds up how much of it went away today.',
        },
        {
          type: 'paragraph',
          text: 'Each row has a Cap choice with two modes:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Daily: the same limit every day',
          id: 'daily-mode',
        },
        {
          type: 'paragraph',
          text: 'You pick a number and it applies every day. If your week has seven days and you want a little slack, something around 14% or 15% a day is a sensible start. It is predictable and easy to reason about.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Smart pace: spread what is left until the reset',
          id: 'smart-pace',
        },
        {
          type: 'paragraph',
          text: 'Smart pace looks at what is left of the week and how many days remain until the reset, and suggests a daily share: roughly what is left divided by the days left. If Monday was heavy, the suggestion for the rest of the week goes down. If you had a quiet day, it goes up. You can type your own number, and the "auto" button takes you back to the live suggestion.',
        },
        {
          type: 'paragraph',
          text: 'Smart pace also warns you when your current pace would empty the window before the reset, so you find out on Tuesday instead of on Thursday.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'The budget day ends at local midnight, in your system time zone. The provider\'s own reset is separate: the weekly window still resets when the provider says it does.',
        },
      ],
    },
    {
      id: 'which-providers-are-covered',
      title: 'Which providers have a daily budget',
      content: [
        {
          type: 'paragraph',
          text: 'The budget works for every provider that CodeAgentSwarm can measure, not only Claude. Only installed providers show a row.',
        },
        {
          type: 'table',
          headers: ['Provider', 'Window the budget paces'],
          rows: [
            ['Claude', 'Weekly'],
            ['Codex', 'Weekly'],
            ['Antigravity', 'Weekly'],
            ['Kimi Code', 'Weekly'],
            ['Grok Build', 'Weekly'],
            ['Cursor Agent', 'Monthly'],
            ['Devin CLI', 'Weekly'],
            ['GitHub Copilot CLI', 'Monthly'],
            ['Muse Code', 'Its long quota window'],
            ['opencode, Pi', 'No budget: they do not report a quota percentage'],
          ],
          caption: 'The row names the window it measures, so you always know if a percentage is of the week or of the month.',
        },
        {
          type: 'paragraph',
          text: `If you use several accounts on the same provider, the limit you set applies to the provider and each account is counted on its own. There is more on running several logins in the guide to <a href="/en/guides/multiple-claude-code-accounts" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple Claude Code accounts</a>.`,
        },
      ],
    },
    {
      id: 'what-happens-at-the-limit',
      title: 'What happens when you reach today\'s limit',
      content: [
        {
          type: 'paragraph',
          text: 'Each row has an "On limit" choice. It decides what CodeAgentSwarm does when today\'s limit is reached:',
        },
        {
          type: 'table',
          headers: ['On limit', 'What it does'],
          rows: [
            ['Notify only', 'Warns you at 80% and at the limit. Nothing is blocked.'],
            ['Pause new work', 'Running work finishes. New sessions with that provider do not start from the app until midnight, and queued Auto tasks for it wait.'],
            ['Stop work', 'Same as Pause new work, and it also stops the work that is running with that provider.'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Pause new work is the one most people want. Nothing you are in the middle of gets cut off, but the next session waits for tomorrow. The Auto lane in the Kanban tells you why a task is not starting: it shows the provider as held by the usage cap.',
        },
        {
          type: 'paragraph',
          text: 'Two limits of the feature are worth knowing up front:',
        },
        {
          type: 'list',
          items: [
            'Usage from other apps counts. If you also use Claude Code in another terminal, in the browser or on your phone, that usage comes out of the same quota, so it shows up in today\'s total.',
            'CodeAgentSwarm can only pause work it launches. It cannot stop a Claude Code session you started somewhere else.',
          ],
        },
        {
          type: 'paragraph',
          text: 'You also see today\'s usage without opening Settings. When a provider has a budget, the quota popover in the navbar adds a "Today" line under that provider, next to its weekly numbers.',
        },
      ],
    },
    {
      id: 'extra-five-percent-and-hard-cap',
      title: '+5% today and the optional hard cap',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'When you need a little more today',
          id: 'plus-five-today',
        },
        {
          type: 'paragraph',
          text: 'Sometimes you hit the limit ten minutes before finishing something. When the limit pauses or stops work, the notice offers "+5% today", and the same button appears in the popover and in the Settings row. Each press adds five points to today\'s limit only. Tomorrow starts again from your normal number. With Smart pace, the extra is spread back out: the next days get a little less, and the Settings row shows what the extension costs the rest of the week.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Hard cap: keep part of the week untouched',
          id: 'hard-cap',
        },
        {
          type: 'paragraph',
          text: 'The Hard cap field is optional and measures something different. It is a limit on the whole window, not on today. Set it to 80% and the On limit action fires once the provider\'s window is 80% used, even if today still has room. It holds until the provider\'s window resets, not at midnight, and +5% today cannot lift it. Use it when you always want a slice of the week in reserve for an emergency fix.',
        },
      ],
    },
    {
      id: 'set-up-a-daily-budget',
      title: 'How to set up a daily budget, step by step',
      content: [
        {
          type: 'list',
          items: [
            'Open Settings › Providers and scroll to the Quota Indicator section.',
            'Find "Usage budget" and turn on the switch for the provider you want to pace, for example Claude.',
            'Under Cap, choose "Daily" for a fixed share or "Smart pace" to spread what is left until the reset.',
            'Set the %/day. With Smart pace you can keep the suggestion or type your own.',
            'Under On limit, choose "Notify only", "Pause new work" or "Stop work". Pause new work is a good default.',
            'Optional: type a Hard cap if you want a part of the window kept in reserve.',
            'Repeat for any other provider you use. Each row is independent.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Start with Notify only for two or three days. You will see how much a normal day really uses before anything gets paused.',
        },
      ],
    },
    {
      id: 'practical-plays',
      title: 'Practical ways to make the week last',
      content: [
        {
          type: 'paragraph',
          text: 'The budget is a tool. These are the habits that get the most out of it.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Give your secondary agent a smaller budget',
          id: 'smaller-budget-secondary',
        },
        {
          type: 'paragraph',
          text: 'If Claude is your main agent and Codex is the one you use for reviews or side tasks, give Codex a tight fixed share and Claude a Smart pace. The side work can never eat into the agent you rely on for the hard problems.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Move work to an agent that still has room',
          id: 'move-work-to-another-agent',
        },
        {
          type: 'paragraph',
          text: `When Claude reaches today's limit, hover the quota ring in the navbar: the popover lists your other providers and how much of their window is used, so you can see which one still has room. Open the next session with that one instead. In History, "Continue with another LLM" carries an existing conversation over to a different agent. And in the <a href="/en/guides/auto-kanban-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">Auto Kanban</a> each task can have its own agent, so you can queue the next tasks on a provider that is not at its limit.`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Let queued work wait for tomorrow',
          id: 'queued-work-waits',
        },
        {
          type: 'paragraph',
          text: 'With Pause new work, tasks in the Auto lane for a provider at its limit stay queued. After midnight the new day opens and they start by themselves. You can fill the queue in the evening and let the budget decide how much of it runs today.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Pace a whole team of agents',
          id: 'pace-a-team',
        },
        {
          type: 'paragraph',
          text: `A <a href="/en/guides/ai-coding-agent-coordinator" class="text-neon-cyan hover:text-neon-purple transition-colors">coordinator</a> can open several worker sessions at once, and each one uses the quota of its provider. A daily budget per provider keeps a big plan from spending the week in one afternoon. For the bigger picture of running agents in parallel, see the <a href="/en/guides/claude-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code agent swarm guide</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is the Claude Code weekly limit?',
      answer: 'Claude Code subscriptions have a short rolling window of about five hours and a weekly limit on top of it. When the weekly one runs out you have to wait for the reset, even if the five hour window is free. The daily budget in CodeAgentSwarm helps you spread that weekly limit across the week.',
    },
    {
      question: 'How does the daily budget measure usage?',
      answer: 'It uses the provider\'s own quota readings. A 15% daily budget on Claude means today may use at most 15 points of the weekly window. There is no conversion to money or tokens.',
    },
    {
      question: 'What is the difference between Daily and Smart pace?',
      answer: 'Daily applies the same percentage every day. Smart pace divides what is left of the window by the days until the reset, so the daily share adapts to how you actually used the week. You can adjust the Smart pace number or go back to the suggestion with "auto".',
    },
    {
      question: 'Does usage outside CodeAgentSwarm count?',
      answer: 'Yes. The budget reads the provider\'s real remaining quota, so usage from other apps or devices counts toward today. But CodeAgentSwarm can only pause work it launched itself.',
    },
    {
      question: 'When does the daily budget reset?',
      answer: 'At local midnight, in your system time zone. The provider\'s own weekly or monthly reset is separate. The optional Hard cap is the exception: it waits for the provider\'s window reset, not for midnight.',
    },
    {
      question: 'Which providers support a daily budget?',
      answer: 'Every provider that reports a measurable quota: Claude, Codex, Antigravity, Kimi Code, Grok Build, Cursor Agent, Devin CLI, Muse Code and GitHub Copilot CLI. opencode and Pi have no budget because they do not report a quota percentage.',
    },
  ],
}

export default guide
