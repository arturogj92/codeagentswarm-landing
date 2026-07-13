import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-task-management',
    locale: 'en',
    title: 'Claude Code Task Management: A Kanban Board Your AI Agents Update',
    metaTitle: 'Claude Code Task Management: A Kanban Board Your AI Agents Update (2026)',
    metaDescription: 'A built-in kanban board for Claude Code task management. Create tasks, assign them to terminals, and let your AI agents read and update the board over MCP.',
    intro: `When you run more than one AI coding agent at the same time, the hardest part is not the coding. It is keeping track of what each agent is actually doing. One terminal is refactoring, another is writing tests, a third is half finished and waiting, and after twenty minutes you have no clear idea of where anything stands.

CodeAgentSwarm has a built-in kanban-style Agent Task Board with four columns: Pending, In Progress, In Testing, and Completed. You create tasks and assign them to terminals, the same way you would on any project board. The difference is that the AI agents themselves read and update the board. They move their own cards across columns, write a plan before they start, drop an implementation summary when they finish, and create subtasks when a job turns out to be bigger than expected.

In this guide I will walk through what the task board is, how the agents keep it current on their own, and why that one detail changes how it feels to run several Claude Code sessions at once.`,
    highlightedWords: ['Task Management', 'Kanban Board', 'AI Agents'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    ctaText: 'Open the Agent Task Board, assign a task to a terminal, and watch the AI move its own card from Pending to Completed.',
    alternateSlug: 'gestion-de-tareas-claude-code',
  },
  sections: [
    {
      id: 'what-is-the-task-board',
      title: 'What the Claude Code task board is',
      content: [
        {
          type: 'paragraph',
          text: 'The Agent Task Board in CodeAgentSwarm is a kanban board built into the app, with four columns that map to the real lifecycle of a coding task: Pending, In Progress, In Testing, and Completed. Each card is a task with a title, a plan, and an implementation summary, and it belongs to a project.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm Agent Task Board showing four kanban columns (Pending, In Progress, In Testing, Completed) with task cards distributed across them',
          src: '/images/guides/task-board-kanban.png',
          caption: 'The Agent Task Board with its four columns. Cards move across as work progresses.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'So far this sounds like any project board you have used before. The part that makes it different is who keeps it up to date. On a normal board you drag the cards yourself. Here the AI agents are full participants: they read the board to know what they are supposed to work on, and they update it as they go.',
        },
        {
          type: 'paragraph',
          text: 'If you are new to <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, it is Anthropic\'s agentic coding tool that runs in your terminal and edits your codebase directly. CodeAgentSwarm lets you run several of those agents side by side, and the task board is what stops them from becoming an untrackable mess. The board is one piece of a wider oversight layer, covered in the <a href="/en/guides/claude-code-dashboard" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code dashboard guide</a>.',
        },
      ],
    },
    {
      id: 'agents-update-the-board',
      title: 'The agents update the board themselves',
      content: [
        {
          type: 'paragraph',
          text: 'This is the core idea, so it is worth being precise about it. The AI agents are not just executing commands while you babysit a board on the side. They read and write the board directly.',
        },
        {
          type: 'paragraph',
          text: 'A typical task moves through the columns like this:',
        },
        {
          type: 'list',
          items: [
            'You create a task and assign it to a terminal. It starts in Pending.',
            'When the agent picks it up, it moves the card to In Progress and writes a short plan of what it intends to do.',
            'As it works, it can create subtasks for the pieces that turn out to be separate jobs.',
            'When it finishes, it writes an implementation summary (which files it touched, what it changed) and moves the card to In Testing.',
            'You review the result. If it is good, the card goes to Completed.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Notice that the agent does not jump straight to Completed. Work lands in In Testing first, which gives you a clear checkpoint to look at what was done before it counts as finished. You stay the one who approves, the agent just keeps the board honest about where things actually are.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Because the agent writes the plan before it starts and the summary when it ends, the card becomes a small record of the work. You can open a Completed task weeks later and read what the AI actually did, without digging through terminal logs.',
        },
      ],
    },
    {
      id: 'how-agents-update-mcp',
      title: 'How agents update tasks (the MCP behind it)',
      content: [
        {
          type: 'paragraph',
          text: 'The reason the agents can touch the board at all is MCP, the Model Context Protocol. CodeAgentSwarm exposes the task board to each agent as a set of MCP tools, so updating a task is something the AI can do on its own, the same way it edits a file or runs a command.',
        },
        {
          type: 'paragraph',
          text: 'In practice the agent has tools to create a task, start it (move it to In Progress), write its plan, record the implementation summary, create subtasks, and submit the task for testing. You do not have to wire any of this up by hand. When you run Claude Code inside CodeAgentSwarm, those tools are already there for the agent to use.',
        },
        {
          type: 'paragraph',
          text: 'The practical effect is that the board stays current without you doing the bookkeeping. The agent that just finished a refactor is the one that marks the refactor as ready for testing, because it is the thing that knows it just finished. You are not transcribing status from a terminal into a board, the agent reports its own status directly.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'MCP is also how you connect other tools to your agents (databases, search, browsers). If you want to go deeper on that, the task board is a good example of how much smoother things get when the agent can act on a system instead of just describing it.',
        },
      ],
    },
    {
      id: 'projects-labels-subtasks',
      title: 'Projects, labels, and subtasks',
      content: [
        {
          type: 'paragraph',
          text: 'The board is not a single flat list. Tasks organize per project, so each repository or product you work on gets its own set of cards instead of everything piling into one column. When you have an agent running in a project, its tasks land under that project automatically.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Labels',
          id: 'labels',
        },
        {
          type: 'paragraph',
          text: 'You can add labels to tasks to group them by type or area: bug, feature, refactor, tests, whatever fits how you think about the work. Labels make a busy board scannable, so you can see at a glance which cards are bugs versus new features without reading every title.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Subtasks',
          id: 'subtasks',
        },
        {
          type: 'paragraph',
          text: 'Tasks support subtasks, and this is where the agent\'s ability to update the board pays off most. When an agent starts a task and realizes it is actually three jobs, it can break the work into subtasks under the parent. Subtasks inherit the project from their parent, so you do not have to re-file them, and you get a clean hierarchy instead of one giant card that means nothing specific.',
        },
        {
          type: 'paragraph',
          text: 'You can also create subtasks yourself, including under a task that is already completed, which is handy when you find a follow-up to something the AI shipped earlier.',
        },
      ],
    },
    {
      id: 'why-it-matters',
      title: 'Why this matters when you run several agents',
      content: [
        {
          type: 'paragraph',
          text: 'A single agent working on a single task does not really need a board. The board earns its keep the moment you have several agents going at once, which is exactly what CodeAgentSwarm is built for. It runs multiple AI CLI terminals (Claude Code, Codex CLI, Gemini CLI) in parallel, and once you have four or five of them working, "what is each one doing" stops being a question you can answer from memory.',
        },
        {
          type: 'paragraph',
          text: 'With the task board, that question has a visible answer. You glance at the columns and you can see that two tasks are In Progress, one is In Testing waiting for your review, and three are still Pending. Each In Progress card has a plan you can read. Each In Testing card has a summary of what was done. The swarm of agents becomes a board you can actually look at.',
        },
        {
          type: 'paragraph',
          text: 'This pairs naturally with the rest of the workspace. To set up the parallel sessions that make the board worth having, see <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">how to run multiple Claude Code sessions</a>. And for the bigger picture of coordinating different CLI tools together, see the guide on the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a>.',
        },
        {
          type: 'paragraph',
          text: 'The honest summary: the board does not make the agents smarter, it makes them legible. You still decide what gets built and you still approve the results. The board just means you never have to wonder which agent is on what, because the agents tell you themselves.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is the Claude Code task board?',
      answer: 'It is a built-in kanban board in CodeAgentSwarm, called the Agent Task Board, with four columns: Pending, In Progress, In Testing, and Completed. You create tasks and assign them to terminals running Claude Code (or Codex and Gemini), and the cards move across the columns as the work progresses.',
    },
    {
      question: 'Can AI agents update the kanban board themselves?',
      answer: 'Yes. That is the whole point. The agents read the board to know what to work on and update it as they go. They move their own cards from Pending to In Progress to In Testing, write a plan before starting, record an implementation summary when they finish, and create subtasks when a job grows.',
    },
    {
      question: 'How do agents update tasks (MCP)?',
      answer: 'CodeAgentSwarm exposes the task board to each agent as a set of MCP (Model Context Protocol) tools. The agent has tools to create a task, start it, write its plan, save an implementation summary, create subtasks, and submit it for testing. When you run Claude Code inside CodeAgentSwarm, those tools are available automatically, so you do not have to configure anything.',
    },
    {
      question: 'Can I organize tasks by project?',
      answer: 'Yes. Tasks organize per project, so each repository or product has its own set of cards instead of one shared pile. When an agent is running inside a project, the tasks it creates land under that project automatically.',
    },
    {
      question: 'Does it support subtasks?',
      answer: 'Yes. Tasks support subtasks, and they inherit the project from their parent. An agent can break a task into subtasks when it turns out to be several jobs, and you can also create subtasks yourself, including under a task that is already completed.',
    },
    {
      question: 'Do I have to move the cards myself?',
      answer: 'You can, but you usually do not need to. The agents move their own cards as they work. Your main job is reviewing tasks that land in In Testing and approving them so they move to Completed. The board stays current without you doing the manual bookkeeping.',
    },
  ],
}

export default guide
