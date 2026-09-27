import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'auto-kanban-ai-coding-agents',
    locale: 'en',
    title: 'Auto Kanban for AI Coding Agents: Tasks That Start on Their Own',
    metaTitle: 'Auto Kanban for AI Coding Agents: Queue Tasks, Agents Run Them (2026)',
    metaDescription: 'Drop tasks into the Auto lane and each one starts its own session with the agent, model, reasoning and permissions you chose. Finished work lands in In Testing.',
    intro: `A task board tells you what needs doing. Until now it could not do anything about it. You still had to open a session, pick an agent, paste the task and wait, one card at a time.

CodeAgentSwarm 2.4.0 adds an Auto lane to the Kanban. Drop a task into it and the app starts it for you: a new session opens with the agent, model, reasoning and permissions you picked for that task, in a Git worktree or in the project folder, and the agent gets to work. When it is done the card moves to In Testing, where you review it.

This guide covers how to queue tasks, the settings each task can carry, how many run at once, what the agent receives, and a simple workflow for letting your backlog move while you do something else.`,
    highlightedWords: ['Auto Kanban', 'AI Coding Agents'],
    publishedAt: '2026-09-27',
    updatedAt: '2026-09-27',
    ctaText: 'Queue three tasks in the Auto lane tonight and review them in In Testing tomorrow.',
    ctaAgent: 'multi',
    alternateSlug: 'kanban-automatico-agentes-ia',
  },
  sections: [
    {
      id: 'what-is-the-auto-lane',
      title: 'What the Auto lane is',
      content: [
        {
          type: 'paragraph',
          text: 'The Auto lane is a column in the Kanban, between Pending and In Progress, marked with a lightning icon. Tasks in it are waiting to be picked up. As soon as there is a free slot, the app opens a session for the next task and moves it to In Progress.',
        },
        {
          type: 'demo',
          demo: 'auto-kanban',
          caption: 'Tasks in the Auto lane start on their own, each with its own agent and model.',
        },
        {
          type: 'paragraph',
          text: `Everything else about the board works as before: projects, labels, subtasks, and agents that update their own cards. If you are new to the board itself, read the <a href="/en/guides/claude-code-task-management" class="text-neon-cyan hover:text-neon-purple transition-colors">task management guide</a> first. This one only covers what the Auto lane adds.`,
        },
      ],
    },
    {
      id: 'queue-a-task',
      title: 'How to queue a task',
      content: [
        {
          type: 'paragraph',
          text: 'There are three ways to put a task in Auto:',
        },
        {
          type: 'list',
          items: [
            'Drag a card from Pending into the Auto lane. It uses your Auto defaults.',
            'Click the lightning button on a Pending card ("Run automatically"). It opens the settings for that task only. Change what you need and click "Queue task". Your Auto defaults stay the same.',
            'When you create a task, turn on "Start automatically". The task is saved straight into the Auto lane and starts as soon as a slot is free.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The task needs a project, because that is where the session runs. If it has none, the app asks you to assign one before it can go into Auto. You can also queue tasks from the mobile app, and an agent can create a task that is already queued when you ask it to.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The gear in the Auto lane header opens Auto settings, where you set the defaults used by every drag and drop. The small chip next to it shows the current default agent and workspace at a glance.',
        },
      ],
    },
    {
      id: 'run-automatically-settings',
      title: 'The settings each task carries',
      content: [
        {
          type: 'paragraph',
          text: 'The "Run automatically" settings travel with the task, so every card can run differently:',
        },
        {
          type: 'table',
          headers: ['Setting', 'What it controls'],
          rows: [
            ['Agent', 'Which installed agent runs the task: Claude, Codex, Kimi Code, Grok Build and the rest.'],
            ['Model', 'The model for that agent, from the same list the Chat picker shows.'],
            ['Reasoning', 'The reasoning level, when the chosen model has one. Otherwise the field is disabled.'],
            ['Permissions', 'The same permission modes as Chat, from asking for approval to full access, depending on what the agent supports.'],
            ['Workspace', '"Git worktree" for a separate working copy, or "Project folder" to use the existing folder.'],
            ['Work style', '"Normal", "Ask only for blockers" or "Use best judgment".'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Work style is how much the agent should stop and ask. "Normal" adds nothing to the task. The other two add a short instruction, and you can read the exact text under "Instructions added to the task" before queueing. "Use best judgment" is the one for tasks you want finished without questions, while "Ask only for blockers" still stops when a missing fact or decision really blocks the work.',
        },
        {
          type: 'paragraph',
          text: `Worktrees are used only when the project supports them. If it does not, for example a repository with no commits yet, Auto uses the project folder and tells you why. Why worktrees matter when several agents work on one repo is explained in the <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">Git worktrees guide</a>.`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Once a task is queued its settings are read only. To change them, take the card out of Auto, edit, and queue it again.',
        },
      ],
    },
    {
      id: 'how-many-run-at-once',
      title: 'How many tasks run at once',
      content: [
        {
          type: 'paragraph',
          text: 'By default there is no Auto limit: every queued task gets its own session when there is room, in the same project or across projects. If you want fewer at a time, open Auto settings › Advanced settings and set "Maximum tasks in parallel" to Custom with a number. That maximum applies to all your local projects together. Lowering it never interrupts work that is already running.',
        },
        {
          type: 'paragraph',
          text: 'Your plan\'s session limit still applies. The lane header shows the live count, for example "2 running · 3 queued", plus the maximum when you set one.',
        },
        {
          type: 'paragraph',
          text: `Pickup runs every few seconds, even with the Kanban window closed, so you can queue work and forget about the board. If you use a <a href="/en/guides/claude-code-weekly-limit-daily-budget" class="text-neon-cyan hover:text-neon-purple transition-colors">daily budget</a> with "Pause new work", tasks for a provider at its limit stay queued and the header tells you they are held by the usage cap. They start again when the new day opens.`,
        },
      ],
    },
    {
      id: 'what-the-session-receives',
      title: 'What the task session receives',
      content: [
        {
          type: 'paragraph',
          text: 'Each task opens a Chat session with the agent and settings on the card. The first message is the task itself:',
        },
        {
          type: 'list',
          items: [
            'The task number and title.',
            'The description, if the task has one.',
            'Any images attached to the task.',
            'The work style instructions, if you chose "Ask only for blockers" or "Use best judgment".',
            'A final line that marks the task as In Progress and links it to that session.',
          ],
        },
        {
          type: 'paragraph',
          text: 'That is all. The more useful the description, the better the result, so write tasks as if you were handing them to a colleague: what to change, where, and how you will know it works.',
        },
        {
          type: 'paragraph',
          text: 'While it runs, the card in In Progress has a "Go to session" button that takes you straight to the conversation, so you can watch or answer a question.',
        },
      ],
    },
    {
      id: 'when-a-task-finishes',
      title: 'When a task finishes',
      content: [
        {
          type: 'paragraph',
          text: 'The agent follows the normal task flow: when it is done it writes its summary and moves the card to In Testing. Auto never marks anything Completed. That step stays yours, after you review the result.',
        },
        {
          type: 'paragraph',
          text: 'The session stays open after the task, so you can read what happened, ask for a change, or commit. The slot is freed and the next queued task starts.',
        },
        {
          type: 'paragraph',
          text: 'When things go wrong, Auto is careful not to run the same task twice:',
        },
        {
          type: 'list',
          items: [
            'If you close a session before the task is finished, or the session fails to start, the card stays where it is and leaves Auto. It does not retry on its own.',
            'If the app restarts in the middle of a task, it does not relaunch it, because that would open a duplicate conversation. You can queue it again or resume the conversation yourself.',
            'A session waiting for your answer keeps its slot while it waits.',
          ],
        },
      ],
    },
    {
      id: 'overnight-backlog-workflow',
      title: 'A practical workflow: queue the backlog, review in the morning',
      content: [
        {
          type: 'paragraph',
          text: 'The Auto lane shines with a list of small, well described tasks. A routine that works:',
        },
        {
          type: 'list',
          items: [
            'At the end of the day, write or clean up five to ten small tasks: bug fixes, tests, copy changes, small refactors.',
            'Pick the agent per task. Claude for the tricky refactor, Codex for the tests, a faster model for copy changes.',
            'Use a Git worktree for each one so they never step on each other.',
            'Set the work style to "Use best judgment" for tasks you want finished without questions.',
            'Queue them, and set a daily budget so the queue cannot eat tomorrow\'s quota.',
            'In the morning, open In Testing and review each card with its summary and its session.',
          ],
        },
        {
          type: 'paragraph',
          text: `When the work is one big goal instead of a list, with parts that depend on each other, a <a href="/en/guides/ai-coding-agent-coordinator" class="text-neon-cyan hover:text-neon-purple transition-colors">coordinator</a> is the better tool. And to compare this with other ways of running agents side by side, see the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm guide</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is the Auto lane in the Kanban?',
      answer: 'It is a column between Pending and In Progress. Tasks you put there start on their own: the app opens a session with the agent, model and settings chosen for that task, and the agent works through it.',
    },
    {
      question: 'Can each task use a different agent and model?',
      answer: 'Yes. Every task carries its own agent, model, reasoning, permissions, workspace and work style. Drag and drop uses your Auto defaults, and the lightning button lets you set them for one task.',
    },
    {
      question: 'How many Auto tasks run at the same time?',
      answer: 'There is no Auto limit by default. You can set a maximum in Auto settings › Advanced settings, which applies across all your local projects. Your plan\'s session limit still applies.',
    },
    {
      question: 'Does Auto mark tasks as Completed?',
      answer: 'No. The agent moves the card to In Testing when it is done, and you move it to Completed after reviewing it.',
    },
    {
      question: 'What happens if a task fails or I close its session?',
      answer: 'The card stays in its column and leaves Auto. Auto does not retry by itself, so the same task never runs twice by accident. You can queue it again when you are ready.',
    },
    {
      question: 'Can I hide the Auto lane?',
      answer: 'Yes. Auto settings has "Hide Auto column". Queued tasks keep running. To bring the column back, use Settings › General › Kanban › Show Auto column.',
    },
  ],
}

export default guide
