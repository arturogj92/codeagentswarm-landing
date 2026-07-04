import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'git-worktrees-for-ai-coding-agents',
    locale: 'en',
    title: 'Git Worktrees for AI Coding Agents: Give Each Agent Its Own Checkout',
    metaTitle: 'Git Worktrees for AI Coding Agents: Run Multiple Agents on One Repo (2026)',
    metaDescription: 'Running several AI agents on one repo means they fight over the same files. Git worktrees give each agent its own checkout on its own branch. Here is how.',
    intro: `Run more than one AI coding agent on the same repository and you hit a wall fast: they edit the same files and overwrite each other's uncommitted changes. Claude Code is halfway through a refactor, Codex CLI saves over one of those files, and now neither of them has a clean state to work from.

Git worktrees are the clean fix. One repository can have several working trees at once, each checked out on its own branch, all sharing a single <code>.git</code>. Give each agent its own worktree and they stop stepping on each other, without you cloning the repo five times.

In this guide I explain the problem in concrete terms, what a git worktree actually is, how to create one by hand, and how CodeAgentSwarm sets one up per terminal automatically so a parallel agent swarm just works. If you want the broader picture of running several agents at once, start with the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview.`,
    ctaText: 'Flip on Git Worktree per terminal in CodeAgentSwarm and every agent gets its own isolated checkout, on its own branch, with no setup and nothing left in your git status.',
    highlightedWords: ['Git Worktrees', 'AI Coding Agents'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'git-worktrees-para-agentes-de-ia',
  },
  sections: [
    {
      id: 'the-problem',
      title: 'The problem: several agents, one working copy',
      content: [
        {
          type: 'image',
          alt: 'Nine AI coding agent terminals running in parallel in a single CodeAgentSwarm workspace, each isolated in its own git worktree',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'Several agents running in parallel in one CodeAgentSwarm window. With a worktree per terminal, each one edits its own checkout instead of fighting over a shared one.',
        },
        {
          type: 'paragraph',
          text: 'A checkout is the set of files sitting in your project folder right now. When one agent runs in that folder, everything is fine. The trouble starts the moment a second agent runs in the same folder at the same time. Both of them read and write the exact same files.',
        },
        {
          type: 'paragraph',
          text: 'Say Claude Code is rewriting <code>auth.ts</code> and has not committed yet. In another terminal, Codex CLI opens the same file, makes its own edit, and saves. Claude Code\'s in-progress work is now partly gone, and Codex is building on top of a file that is about to change under it. Neither agent did anything wrong. They just cannot both own one working copy.',
        },
        {
          type: 'paragraph',
          text: 'This is not specific to one tool. Whether you run <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a>, <a href="https://opencode.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode</a>, or Antigravity CLI, the second any two of them share one checkout and touch overlapping files, their uncommitted changes collide.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'If your agents only ever edit different files, one checkout is fine and you do not need worktrees. The problem is real when agents overlap, or when you want two of them working the same area on separate branches at once.',
        },
        {
          type: 'paragraph',
          text: 'The obvious workaround is to give each agent its own folder. You could clone the repo several times, but that is heavy and wasteful. Git already has a lighter answer built in: worktrees.',
        },
      ],
    },
    {
      id: 'what-is-a-worktree',
      title: 'What is a git worktree?',
      content: [
        {
          type: 'paragraph',
          text: 'A git repository has exactly one <code>.git</code> directory. That is where the whole history lives: every commit, every branch, the full object store. A <strong>worktree</strong> is a working tree of that repository, a folder of checked-out files, and a repo can have more than one of them at the same time.',
        },
        {
          type: 'paragraph',
          text: 'The important part is that all the worktrees share that single <code>.git</code>. There is one history, one set of objects, one remote. What differs is the working copy: each worktree is checked out on its own branch, in its own folder. So you can have <code>main</code> checked out in one folder and <code>feature-login</code> checked out in another, side by side, backed by the same repository.',
        },
        {
          type: 'paragraph',
          text: 'The command to add one is <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktree</a>:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# From inside your repo, create a new working tree\n# at ../feature-x, checked out on a new branch feature-x\ngit worktree add ../feature-x -b feature-x',
        },
        {
          type: 'paragraph',
          text: 'That gives you a second folder, <code>../feature-x</code>, with the project files checked out on a fresh <code>feature-x</code> branch. Edit there and it does not touch your original folder at all. When you are done, you remove it:',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# List the worktrees this repo has\ngit worktree list\n\n# Remove one when you are finished with it\ngit worktree remove ../feature-x',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Why worktrees, not clones',
          id: 'worktrees-vs-clones',
        },
        {
          type: 'paragraph',
          text: 'You could get isolated folders by running <code>git clone</code> several times, but each clone is a full copy: its own <code>.git</code>, its own duplicated history, its own remote to keep in sync, and its own disk footprint. Worktrees skip all of that. They share the object store of the one repository, so a new worktree only costs the checked-out files, not another copy of the history. For giving five agents five folders, that difference adds up fast.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'One rule to know: two worktrees cannot check out the same branch at the same time. Each worktree needs its own branch. That is exactly what you want for parallel agents anyway, one branch per agent, but it is worth knowing before you try to add a worktree on a branch that is already checked out elsewhere.',
        },
      ],
    },
    {
      id: 'the-manual-way',
      title: 'The manual way: one worktree per agent',
      content: [
        {
          type: 'paragraph',
          text: 'Knowing the command, you can build an isolated swarm by hand. Give each agent its own worktree on its own branch, then start the agent inside that folder.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# From your repo, one worktree per agent\ngit worktree add ../agent-auth -b agent-auth\ngit worktree add ../agent-tests -b agent-tests\ngit worktree add ../agent-docs -b agent-docs\n\n# Then start an agent in each folder\ncd ../agent-auth && claude\n# (new terminal)\ncd ../agent-tests && codex\n# (new terminal)\ncd ../agent-docs && opencode',
        },
        {
          type: 'paragraph',
          text: 'Now each agent has its own checkout on its own branch. They can all edit <code>auth.ts</code> if they want, because each one is editing a different copy of it. Nothing collides, and you merge the branches back when the work is good.',
        },
        {
          type: 'paragraph',
          text: 'This works, and if you only spin up a swarm occasionally it is perfectly reasonable. The friction is in the bookkeeping. You create a folder and a branch per agent, remember which agent is in which folder, clean up the worktrees when you are done, and keep those extra folders out of your editor and your git status. Do it a few times a day across projects and the setup starts to cost more than it saves.',
        },
      ],
    },
    {
      id: 'automatic-in-codeagentswarm',
      title: 'How CodeAgentSwarm does it automatically',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for running a swarm of AI CLI agents in one place. It runs on top of the official CLIs (Claude Code, Codex CLI, opencode, Antigravity CLI), so it is not a model provider, it orchestrates the agents you already use. And it can create a worktree per terminal for you, so you get the isolation above without touching a single git command.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm per-terminal session config with an OPTIONS row showing a Git Worktree toggle next to Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'When you configure a terminal, the OPTIONS row has a Git Worktree toggle. Turn it on and that terminal\'s agent runs in its own isolated worktree.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'The Git Worktree toggle',
          id: 'the-toggle',
        },
        {
          type: 'paragraph',
          text: 'In the per-terminal session config there is an OPTIONS row with a <strong>Git Worktree</strong> toggle. For agents that support Turbo Mode it sits right next to Turbo; for opencode only the Git Worktree option shows. Flip it on for a terminal and, when you launch it, that agent starts inside its own worktree instead of the shared checkout.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'What it creates',
          id: 'what-it-creates',
        },
        {
          type: 'paragraph',
          text: 'Each conversation gets a worktree at <code>&lt;repoRoot&gt;/.codeagentswarm/worktrees/&lt;slug&gt;/</code>, checked out on a new branch named <code>cas/&lt;slug&gt;</code> branched from your repo\'s local HEAD. So the agent starts from exactly where you are now, on a fresh branch, in a folder of its own. That is the same <code>git worktree add ... -b ...</code> setup from above, done for you and named consistently.',
        },
        {
          type: 'paragraph',
          text: 'To keep those worktrees from cluttering your repository, CodeAgentSwarm adds <code>.codeagentswarm/</code> to the repo\'s <code>.gitignore</code> automatically. The worktree folders live under there, so they never show up in your git status and never end up in a commit by accident.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'It is fail-safe. If the directory is not a git repository, or worktree creation fails for any reason, the terminal just opens in the normal directory instead. You never end up with a terminal that refuses to start because of a git problem.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Always-on and cleanup',
          id: 'always-on-and-cleanup',
        },
        {
          type: 'paragraph',
          text: 'If you want every terminal to use a worktree without ticking the box each time, there is a global setting in Settings (<code>alwaysUseWorktree</code>, off by default) that turns it on everywhere. And when a piece of work is done, you do not have to drop back to the command line: from Settings you can merge a worktree back or remove it.',
        },
        {
          type: 'paragraph',
          text: 'So the whole lifecycle, create a branch, check out an isolated folder, keep it out of git status, merge or remove at the end, is handled in the app. The manual approach is still there under the hood; CodeAgentSwarm just runs it for you per terminal.',
        },
      ],
    },
    {
      id: 'why-it-unlocks-a-swarm',
      title: 'Why this unlocks a real parallel agent swarm',
      content: [
        {
          type: 'paragraph',
          text: 'Isolation is what turns "several terminals open" into a swarm you can actually trust. Once each agent has its own worktree on its own branch, they can all run at full speed, on overlapping parts of the codebase, without a single collision on uncommitted work. You stop rationing which agent is allowed to touch which file.',
        },
        {
          type: 'paragraph',
          text: 'It also fits how you review work. Each agent lands its changes on its own <code>cas/&lt;slug&gt;</code> branch, so you look at each one as a self-contained diff and merge the good ones. Nothing is entangled in a shared working copy, so a bad run on one branch never poisons the others.',
        },
        {
          type: 'paragraph',
          text: 'Worktrees are the isolation layer; the rest of CodeAgentSwarm is the visibility layer on top. You still get desktop notifications when an agent finishes, searchable history across all of them, and per-terminal live diffs, now with the guarantee that the agents are not overwriting each other underneath. If you want to weigh worktrees against just switching branches or cloning the repo, the <a href="/en/guides/git-worktree-vs-branch-parallel-ai-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktree vs branch comparison</a> lays out when each one makes sense.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'New to running several agents at once? See <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a> for Claude specifically, or the <a href="/en/guides/opencode-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode agent swarm</a> guide if opencode is your main agent. Worktrees apply the same way to all of them.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a git worktree?',
      answer: 'A git worktree is an additional working tree of a single repository: a folder of checked-out files on its own branch, backed by the same .git as the original. A repo can have several worktrees at once, each on a different branch, all sharing one history and object store. You create one with git worktree add <path> -b <branch> and remove it with git worktree remove <path>.',
    },
    {
      question: 'How do git worktrees help run multiple AI agents on one repo?',
      answer: 'Running several agents in one checkout means they read and write the same files, so their uncommitted changes overwrite each other. Give each agent its own worktree on its own branch and they each edit an isolated copy. They can work on the same area of the codebase in parallel with no collisions, and you merge each branch back when it is ready.',
    },
    {
      question: 'Are git worktrees better than cloning the repo for each agent?',
      answer: 'For this purpose, yes, usually. Multiple clones each carry a full copy of the history, their own remote to keep in sync, and their own disk usage. Worktrees share the single object store of one repository, so a new worktree only costs the checked-out files. You get the same folder isolation for a fraction of the weight.',
    },
    {
      question: 'How does CodeAgentSwarm use git worktrees?',
      answer: 'Each terminal has a Git Worktree toggle in its OPTIONS row. Turn it on and that agent runs in a worktree at <repoRoot>/.codeagentswarm/worktrees/<slug>/, on a new branch cas/<slug> branched from your local HEAD. CodeAgentSwarm adds .codeagentswarm/ to your .gitignore so it stays out of git status, and it is fail-safe: if the folder is not a git repo, the terminal just opens normally. A global setting can turn worktrees on for every terminal, and you can merge or remove a worktree from Settings.',
    },
    {
      question: 'Do I always need worktrees to run agents in parallel?',
      answer: 'No. If your agents only edit different files, one shared checkout works fine and Git handles the merges. Worktrees earn their place when agents overlap on the same files, or when you want two of them working the same area on separate branches at the same time. That is when hard isolation stops collisions before they happen.',
    },
  ],
}

export default guide
