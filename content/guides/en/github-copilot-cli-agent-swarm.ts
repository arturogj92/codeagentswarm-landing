import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-agent-swarm',
    locale: 'en',
    title: 'Run multiple GitHub Copilot CLI sessions in parallel',
    metaTitle: 'GitHub Copilot CLI Agent Swarm: Run Sessions in Parallel',
    metaDescription: 'Run several GitHub Copilot CLI sessions at once, one per project or git worktree. How it compares with /fleet and /delegate, and how to watch your AI credits.',
    intro: `You can run as many <code>copilot</code> sessions as you like, each in its own terminal and folder. Copilot also has two ways to parallelize from inside a session: <code>/fleet</code> starts subagents, and <code>/delegate</code> hands a task to the cloud agent on GitHub. This guide explains when each one fits, how to keep parallel sessions from editing the same files, and why the monthly AI credits matter more once several sessions run at once. If you have not installed Copilot CLI yet, start with ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
    ctaText: 'Open one GitHub Copilot CLI session per worktree in CodeAgentSwarm and get a notification when each one finishes or needs your approval.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'enjambre-de-agentes-github-copilot-cli',
    relatedSlug: 'github-copilot-cli-models-ai-credits',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Yes, you can run several Copilot CLI sessions at once',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Each time you run <code>copilot</code> you start a separate session with its own conversation, model and working folder. Copilot saves it in <code>~/.copilot/session-state/&lt;id&gt;/</code>, so two sessions never share context. Open a second terminal, run <code>copilot</code> again, and you have two agents working at the same time.',
        },
        {
          type: 'paragraph',
          text: 'That is the simplest way to run a Copilot swarm. GitHub also gives you two built-in options that work from inside a single session. The next section compares the three.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'GitHub Copilot CLI support in CodeAgentSwarm arrives in the release after 2.4.3. The app behavior described here comes from a development build.',
        },
      ],
    },
    {
      id: 'sessions-fleet-delegate',
      title: 'Separate sessions, /fleet and /delegate',
      content: [
        {
          type: 'table',
          headers: ['Option', 'Where the work runs', 'Good for'],
          rows: [
            ['Several <code>copilot</code> sessions', 'Your machine, one process per terminal, each in its own folder', 'Independent tasks you want to follow and review one by one'],
            ['<code>/fleet</code> or <code>--fleet</code>', 'Inside one session: the main agent splits the prompt and runs subagents in parallel', 'One task that breaks into independent pieces'],
            ['<code>/delegate</code> or the <code>&amp;</code> prefix', 'Copilot cloud agent on GitHub, on a new branch with a draft pull request', 'Work you hand off and review later as a pull request'],
          ],
          caption: 'Sources: GitHub Docs pages for /fleet and /delegate, checked October 8, 2026.',
        },
        {
          type: 'paragraph',
          text: `With ${link('https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet', '/fleet')}, the main agent decides whether the prompt can be split and acts as orchestrator for the subagents. GitHub notes that subagents use a low-cost model by default, and that splitting work this way may consume more AI credits than letting the main agent do it. <code>/tasks</code> lists the subtasks while they run. You can also start a session in fleet mode from the command line:`,
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --fleet -p "Refactor the utils package and update everything that calls it" --allow-tool write',
        },
        {
          type: 'paragraph',
          text: `${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/delegate-tasks-to-cca', '/delegate')} sends the task to the cloud. Copilot offers to commit your unstaged changes as a checkpoint on a new branch, then the cloud agent opens a draft pull request, works in the background and asks you for a review. It keeps going even if you turn off your computer.`,
        },
        {
          type: 'paragraph',
          text: 'You can combine them. Subagents from <code>/fleet</code> stay inside their parent session, so a swarm of separate sessions can still use <code>/fleet</code> in any of them. Separate sessions are the right choice when the tasks have nothing to do with each other and you want to see each one finish on its own.',
        },
      ],
    },
    {
      id: 'by-hand',
      title: 'Doing it by hand with terminal tabs',
      content: [
        {
          type: 'paragraph',
          text: 'Without any extra tool, give each task its own git worktree and start a named session in each one:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# one worktree per task\ngit worktree add ../app-auth -b feat/auth\ngit worktree add ../app-tests -b chore/tests\n\n# terminal tab 1\ncd ../app-auth && copilot -n auth\n\n# terminal tab 2\ncd ../app-tests && copilot -n tests\n\n# later, pick up a session by name\ncopilot --resume auth',
        },
        {
          type: 'paragraph',
          text: 'The first time Copilot opens in a new folder it asks whether you trust it, so expect that question once per worktree. After that, the tabs work, but the overhead grows with every session you add:',
        },
        {
          type: 'list',
          items: [
            'No alert when a session finishes or stops to ask for approval.',
            'The tabs tend to look the same, so you click through them to find the one waiting.',
            'Searching old conversations means digging through <code>~/.copilot/session-state</code> folder by folder.',
            'Your other agents, such as Claude Code or Codex, live in other windows.',
          ],
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Running the swarm in CodeAgentSwarm',
      content: [
        {
          type: 'image',
          src: '/images/guides/workspace-list.webp',
          alt: 'CodeAgentSwarm List view with several agent sessions, their status and current activity',
          caption: 'CodeAgentSwarm List view with sample sessions. It shows the general workspace, not a Copilot-only setup.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm puts every session in one window. Pick GitHub Copilot CLI in the agent picker for each session you want, and open each one in its own project or git worktree. Copilot sessions sit next to Claude Code, Codex, OpenCode, Kimi Code, Antigravity, Grok Build, Cursor Agent, Pi, Devin CLI and Muse Code.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Grid, tabs or list',
          id: 'grid-tabs-list',
        },
        {
          type: 'paragraph',
          text: 'Grid shows several sessions side by side. Tabs give each one the full window. List shows every session as a row with its agent, status and current activity, which is the fastest way to scan a large swarm.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Notifications and status per session',
          id: 'notifications-status',
        },
        {
          type: 'paragraph',
          text: `Each Copilot session has its own status, and you get a desktop notification when one finishes or waits for you. You stop checking tabs and come back when a session actually needs you. More on that in ${link('/en/guides/codeagentswarm-notifications', 'CodeAgentSwarm notifications')}.`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Chat or terminal for each session',
          id: 'chat-or-terminal',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-chat-real.webp',
          alt: 'GitHub Copilot CLI answering in CodeAgentSwarm Chat',
          caption: 'Real capture from a CodeAgentSwarm development build: a reply from GitHub Copilot CLI 1.0.93 to a test prompt.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'Chat talks to Copilot through its ACP server, with the model picker, the Agent, Plan and Autopilot modes and permission requests you approve in place. The terminal view runs the normal <code>copilot</code> interface, and switching keeps the conversation. Run fleet prompts from the terminal view.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'One history for every session',
          id: 'history',
        },
        {
          type: 'paragraph',
          text: 'Conversation History lists your Copilot sessions, filters them by agent and project, searches their messages and reopens any of them in Chat or in the terminal. Subagent turns from <code>/fleet</code> stay inside their parent conversation instead of showing up as separate rows.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-history.webp',
          alt: 'GitHub Copilot CLI conversations filtered in CodeAgentSwarm history',
          caption: 'Real capture from a CodeAgentSwarm development build, with a sample conversation created for testing.',
          size: 'full',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: `The Always approve permission level equals <code>copilot --yolo</code>. In a swarm it saves you approvals, but every session can then edit and run commands on its own. Read ${link('/en/guides/github-copilot-cli-yolo-mode', 'GitHub Copilot CLI YOLO mode')} before you turn it on everywhere.`,
        },
      ],
    },
    {
      id: 'split-work',
      title: 'How to split work and avoid file conflicts',
      content: [
        {
          type: 'list',
          items: [
            '<strong>One task per session.</strong> A clear goal per session is easier to review than one session juggling three changes.',
            '<strong>One git worktree per session.</strong> Each session edits its own copy of the repository on its own branch, and you merge through git when it is done.',
            '<strong>Name the sessions.</strong> <code>copilot -n auth</code> makes the session easy to find and resume later.',
            '<strong>Keep shared files with one owner.</strong> Lockfiles, migrations and shared config should change in a single session, not in three.',
            '<strong>Keep folder access narrow.</strong> By default Copilot can only touch the working folder, its subfolders and the system temp folder. <code>--add-dir</code> widens that, so use it only when a task really needs another folder.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Two sessions started in the same folder work on the same files and can overwrite each other\'s changes. Separate worktrees avoid that.',
        },
        {
          type: 'paragraph',
          text: `For the details of worktrees, see ${link('/en/guides/git-worktrees-for-ai-coding-agents', 'git worktrees for AI coding agents')} and ${link('/en/guides/git-worktree-vs-branch-parallel-ai-agents', 'git worktree vs branch for parallel agents')}.`,
        },
      ],
    },
    {
      id: 'ai-credits',
      title: 'Keep an eye on the monthly AI credits',
      content: [
        {
          type: 'paragraph',
          text: `Every Copilot CLI session draws from the same monthly allowance. Pro includes 1,500 AI credits a month, Pro+ 7,000 and Max 20,000. Copilot Free has no AI credits and runs the CLI with automatic model selection inside a limited monthly Chat allowance. The allowance resets at 00:00 UTC on the first day of each month, and unused credits do not carry over. With a budget set, extra usage costs $0.01 per credit. Source: ${link('https://docs.github.com/en/copilot/concepts/billing/billing-for-individuals', 'GitHub billing for individuals')}, checked October 8, 2026.`,
        },
        {
          type: 'paragraph',
          text: 'Several sessions working at once empty that pool faster than one. A few habits help:',
        },
        {
          type: 'list',
          items: [
            'Check the remaining budget in the Copilot footer, and run <code>/usage</code> in a session to see what it has used so far.',
            'Pick the model per session with <code>/model</code>. <code>auto</code> lets Copilot route each request.',
            'Remember that <code>/fleet</code> may consume more credits than the same task done by one agent.',
            'In CodeAgentSwarm, the usage panel shows the Copilot monthly allowance and reset date next to your other agents. It reads it from an environment token or a signed-in GitHub CLI, never from the keychain.',
          ],
        },
        {
          type: 'paragraph',
          text: `Plans, models and the usage panel are covered in ${link('/en/guides/github-copilot-cli-models-ai-credits', 'GitHub Copilot CLI models, AI credits and usage limits')}.`,
        },
      ],
    },
    {
      id: 'limits',
      title: 'Limits to know',
      content: [
        {
          type: 'list',
          items: [
            'The ACP server that Chat uses is a public preview. Commands that need a picker, such as <code>/login</code>, <code>/resume</code> or <code>/diff</code>, do not work inside Chat.',
            'Reasoning effort is a launch option (<code>--reasoning-effort</code>), so Chat has no effort selector for Copilot.',
            'Subagent text can appear inline in the Chat stream.',
            'The terminal asks for folder trust once per folder, which means once per new worktree.',
          ],
        },
        {
          type: 'paragraph',
          text: `To compare Copilot with other agents you can run in the same swarm, see ${link('/en/guides/github-copilot-cli-vs-claude-code', 'GitHub Copilot CLI vs Claude Code')} and ${link('/en/guides/ai-cli-agent-swarm', 'AI CLI agent swarm')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I run multiple GitHub Copilot CLI sessions at once?',
      answer: 'Yes. Every copilot command starts an independent session with its own conversation and working folder. Open several terminals, ideally one git worktree each, and run copilot in each one.',
    },
    {
      question: 'What is the difference between /fleet and running several sessions?',
      answer: '/fleet works inside one session: the main agent splits a prompt into subtasks and runs subagents in parallel as their orchestrator. Separate sessions are fully independent, each with its own task, folder and conversation that you follow and review on its own.',
    },
    {
      question: 'What does /delegate do in Copilot CLI?',
      answer: 'It hands the task to the Copilot cloud agent on GitHub. Copilot creates a branch, opens a draft pull request and works in the background, so the task continues even if your computer is off. You review the result as a pull request.',
    },
    {
      question: 'Do parallel Copilot CLI sessions use more AI credits?',
      answer: 'Each session spends credits for the work it does, and they all come from the same monthly allowance, so several sessions at once empty it faster. GitHub also notes that /fleet may consume more credits than one agent doing the same task.',
    },
    {
      question: 'Does CodeAgentSwarm already support GitHub Copilot CLI?',
      answer: 'Support arrives in the release after 2.4.3. It covers installation, sign-in from Chat, Chat and terminal views, history, notifications and status for Copilot sessions next to your other agents.',
    },
  ],
}

export default guide
