import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ai-coding-agent-coordinator',
    locale: 'en',
    title: 'AI Coding Agent Coordinator: One Agent That Plans and Runs the Others',
    metaTitle: 'AI Coding Agent Coordinator: One Agent Runs Your Whole Team (2026)',
    metaDescription: 'A coordinator agent splits your goal, opens worker sessions with the right agent and model for each job, and reports back in one Chat. Project and global modes.',
    intro: `Running five agents in parallel is great until you notice who is really coordinating them: you. You write five prompts, pick five models, keep five contexts in your head, and copy answers from one session into another.

CodeAgentSwarm 2.4.0 adds coordinators. A coordinator is a Chat with one job: take what you ask for, plan it, and hand the pieces to worker sessions. It picks the agent and model that fit each piece, opens the workers in the background, and you keep talking to one conversation. Workers can be different LLMs, a Codex session next to a Claude session next to a Kimi session, and they can ask each other questions when they need to.

This guide explains the two kinds of coordinator, how to start one, what it does and does not do, and a few prompts that show what it is good at.`,
    highlightedWords: ['Coordinator', 'AI Coding Agent'],
    publishedAt: '2026-09-27',
    updatedAt: '2026-09-27',
    ctaText: 'Start a coordinator, give it one real goal, and let it open the worker sessions for you.',
    ctaAgent: 'multi',
    alternateSlug: 'coordinador-agentes-ia',
  },
  sections: [
    {
      id: 'what-a-coordinator-is',
      title: 'What an AI coding agent coordinator is',
      content: [
        {
          type: 'paragraph',
          text: 'A coordinator is a normal CodeAgentSwarm Chat with a special role. You give it a goal in plain words. It decides what it can do itself and what should go to separate worker sessions, then opens those workers, sends each one its assignment and keeps track of them. You stay in one conversation instead of juggling many.',
        },
        {
          type: 'demo',
          demo: 'coordinators',
          caption: 'A coordinator plans the work, opens worker sessions in the background and reports back in the same Chat.',
        },
        {
          type: 'paragraph',
          text: 'It is not a black box. Every worker is a real session you can open, read and talk to. Messages the coordinator sends to a worker are marked in that worker\'s Chat with a Coordinator strip and the kind of message, such as Assignment, Follow-up or Correction. You always know which instructions came from you and which came from the coordinator.',
        },
        {
          type: 'paragraph',
          text: `If you have never run agents in parallel, start with the <a href="/en/guides/claude-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code agent swarm guide</a>. A coordinator is the next step: the same swarm, with one agent in charge of the handoffs.`,
        },
      ],
    },
    {
      id: 'project-vs-global-coordinator',
      title: 'Project coordinator vs global coordinator',
      content: [
        {
          type: 'paragraph',
          text: 'There are two kinds, and you can run both at the same time.',
        },
        {
          type: 'table',
          headers: ['', 'Project coordinator', 'Global coordinator'],
          rows: [
            ['Scope', 'One project, including its worktrees', 'All your local projects, from one Chat'],
            ['Sees', 'The open Chats of that project', 'Every configured project, new ones included automatically'],
            ['Delegates to', 'Worker sessions', 'Project coordinators or worker sessions directly'],
            ['How many', 'One per project', 'One'],
            ['Good for', 'A feature, a batch of bugs, a refactor in one repo', 'Work that spans several repos: web, API and mobile'],
          ],
        },
        {
          type: 'paragraph',
          text: 'If a coordinator for that scope already exists, the app offers "Open coordinator" and takes you back to the same conversation instead of creating a second one. Coordinators are pinned ahead of the other sessions in Grid, Tabs and List. In Tabs and List they get a coloured border, and List has its own Coordinators group.',
        },
      ],
    },
    {
      id: 'start-a-coordinator',
      title: 'How to start a coordinator',
      content: [
        {
          type: 'list',
          items: [
            'Turn on Session communication in Settings › Privacy. Coordinators need it, and it applies to new sessions only.',
            'Click New agent.',
            'For a global coordinator, choose "Global coordinator" above the project search. For a project coordinator, choose the project and enable "Coordinator" in the launch options.',
            'Pick the agent the coordinator runs on and click "Start coordinator".',
            'Choose the model inside the Chat, like any other Chat session.',
            'Write your goal. The first real message is the objective. A "hi" or a question about the assistant itself does not count, so you can say hello first without starting a plan.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'You can also start a coordinator from the mobile app: New session › Coordinator, then Project or Global and the agent. It runs on your desktop.',
        },
      ],
    },
    {
      id: 'what-the-coordinator-does',
      title: 'What the coordinator does with your goal',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'It splits the work, and does the small parts itself',
          id: 'splits-the-work',
        },
        {
          type: 'paragraph',
          text: 'Not everything needs a new session. Reading a file to answer a question, a one line fix or a git status check the coordinator does on its own. It delegates the substantial pieces: implementation that needs tests, work that takes hours, independent parts that can run in parallel, or anything you explicitly ask to run in its own session. If a suitable session is already open, it reuses it before opening another.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'It opens workers in the background, with the right agent and model',
          id: 'opens-workers',
        },
        {
          type: 'paragraph',
          text: 'For each piece, the coordinator opens a worker session with the agent and model that fit the job. It can be a different LLM from the coordinator itself. Workers open in the background: your current conversation, tab and keyboard focus stay where they are. Click a worker whenever you want to watch it or step in.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sessions talk to each other',
          id: 'sessions-talk',
        },
        {
          type: 'paragraph',
          text: 'Sessions with Session communication can ask another session a focused question and get the answer back, shown as a request card in the Chat. The frontend worker can ask the API worker what an endpoint returns, instead of guessing or waiting for you.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'It reports back in the same Chat',
          id: 'reports-back',
        },
        {
          type: 'paragraph',
          text: 'Workers save their results and blockers. The coordinator does not watch them in the background: after it delegates, it ends its turn and waits for you. When you ask "how is it going?", it checks the workers and answers in the same Chat. The icon next to the Chat title opens Coordinator settings, with the home project, the assignments and the evidence each worker reported.',
        },
        {
          type: 'paragraph',
          text: 'The rest of the app is reachable from Chat too. Any agent can open sessions, create shortcuts, switch views or find an old conversation for you, so the coordinator can set up the workspace as well as the work.',
        },
      ],
    },
    {
      id: 'example-prompts',
      title: 'Example prompts that show what it can do',
      content: [
        {
          type: 'paragraph',
          text: 'The best coordinator prompts describe the result and the constraints, not the steps. Four examples:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Ship a pricing page across web, API and mobile',
          id: 'prompt-pricing-page',
        },
        {
          type: 'code',
          language: 'text',
          code: 'We are launching a yearly plan. Add it to the pricing page in the web project, add the price and the checkout option in the API, and show it on the mobile upgrade screen. Use Claude for the API, Codex for the web page, and a cheaper model for the mobile copy. Tell me when all three are ready to review.',
        },
        {
          type: 'paragraph',
          text: 'This is a job for the global coordinator, because it touches three projects.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: `Workers follow your saved Git worktree preference. Keep worktrees on when two workers touch the same repo, so they never edit the same folder. The <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">worktrees guide</a> explains why.`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Fix a batch of bugs',
          id: 'prompt-bug-batch',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Here are six bug reports from this week. Group the ones that share a cause, fix each group in its own session with a regression test, and give me one summary with what changed and what you could not reproduce.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Prepare a release',
          id: 'prompt-release',
        },
        {
          type: 'code',
          language: 'text',
          code: 'Prepare version 3.2. One worker runs the test suite and fixes what fails, another updates the changelog from the commits since 3.1, another checks the docs for screens that changed. Do not push anything. I will review and publish.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Compare two approaches before choosing one',
          id: 'prompt-compare',
        },
        {
          type: 'code',
          language: 'text',
          code: 'We need to replace our date library. Have one worker try the migration with library A and another with library B, and give me a comparison: size of the diff, failing tests and anything that looked risky.',
        },
      ],
    },
    {
      id: 'coordinator-vs-auto-kanban-vs-sessions',
      title: 'Coordinator, Auto Kanban or plain parallel sessions?',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm gives you three ways to run work in parallel. They solve different problems.',
        },
        {
          type: 'table',
          headers: ['Use', 'When'],
          rows: [
            ['Coordinator', 'One goal that has to be split, with parts that depend on each other, different agents per part, and a single place to ask how it is going.'],
            ['Auto Kanban', 'A list of independent tasks you already know. You queue them with the settings for each and they start on their own.'],
            ['Parallel sessions', 'A few jobs you want to drive yourself, prompt by prompt.'],
          ],
        },
        {
          type: 'paragraph',
          text: `The <a href="/en/guides/auto-kanban-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">Auto Kanban guide</a> covers the queue in detail, and <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> covers the manual way. They mix well: a coordinator for the feature, the Auto lane for the backlog of small fixes.`,
        },
      ],
    },
    {
      id: 'limits-and-safety',
      title: 'Limits and safety: what needs your confirmation',
      content: [
        {
          type: 'paragraph',
          text: 'A coordinator can do a lot, so it helps to know where the lines are:',
        },
        {
          type: 'list',
          items: [
            'Closing a worker that is still working, has queued messages or is waiting for an approval needs your confirmation in the desktop app. A coordinator can only close workers it opened.',
            'The coordinator\'s own Chat keeps its normal file, command and approval permissions. Being a coordinator does not grant extra ones.',
            'It does not poll or wake itself up. Nothing happens between your messages except the work the workers are doing.',
            'Corrections to a worker in the middle of a turn work natively with Claude and Codex. Other agents receive the coordinator\'s messages when they are idle.',
            'Closing the coordinator Chat ends its role. Running workers are not interrupted, and the conversation stays in History.',
            'Coordinators run on your desktop. CAS Cloud hosts and paired remote machines do not offer them.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `Every worker uses the quota of its own provider. A plan with five workers can spend a lot in one afternoon. A <a href="/en/guides/claude-code-weekly-limit-daily-budget" class="text-neon-cyan hover:text-neon-purple transition-colors">daily budget per provider</a> keeps that under control.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is an AI coding agent coordinator?',
      answer: 'It is an agent whose job is to plan and delegate. In CodeAgentSwarm, a coordinator is a Chat that takes your goal, splits it, opens worker sessions with the agent and model that fit each part, and reports back in the same conversation.',
    },
    {
      question: 'What is the difference between a project and a global coordinator?',
      answer: 'A project coordinator works inside one project and its worktrees. A global coordinator covers all your local projects from one Chat and can direct project coordinators or workers directly. You can have one global coordinator and one per project.',
    },
    {
      question: 'Can the workers use different agents and models?',
      answer: 'Yes. The coordinator picks the agent and model for each worker, so a Claude coordinator can open Codex, Kimi or Grok workers, each with its own model.',
    },
    {
      question: 'Does the coordinator check on workers automatically?',
      answer: 'No. After delegating, it waits for your next message. Workers save their reports, and when you ask for an update the coordinator checks them and answers in the same Chat.',
    },
    {
      question: 'Can a coordinator close my sessions?',
      answer: 'Only the workers it opened. If one of them is still working, has queued messages or is waiting for an approval, the desktop app asks you to confirm first.',
    },
    {
      question: 'What do I need to turn on first?',
      answer: 'Session communication, in Settings › Privacy. It applies to new sessions, so turn it on before you start the coordinator.',
    },
  ],
}

export default guide
