import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'git-worktree-vs-branch-parallel-ai-agents',
    locale: 'en',
    title: 'Git Worktree vs Branch for Parallel AI Agents: Which to Use',
    metaTitle: 'Git Worktree vs Branch: Best Way to Run Parallel AI Agents (2026)',
    metaDescription: 'Switching branches, cloning the repo, or git worktrees? Here is why worktrees win for running parallel AI agents, and when a plain branch is still enough.',
    intro: `If you want several AI coding agents working at the same time, the question underneath is a git one: how does each agent get a place to work without overwriting the others? There are three honest answers. One working tree and you switch branches. Several full clones of the repo. Or git worktrees.

Only one of them actually lets N agents run at once cleanly, and it is not the one most people reach for first. In this guide I compare switching branches, multiple clones, and worktrees for parallel agents specifically, with an honest note on when a plain branch is all you need, and how CodeAgentSwarm uses worktrees under the hood.

For the ground-up explanation of what a worktree is and why isolation matters, read the <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI coding agents</a> guide first. This page is the comparison.`,
    ctaText: 'Skip the branch juggling. CodeAgentSwarm gives each terminal its own worktree on its own branch with one toggle, so your agents run in parallel without stepping on each other.',
    highlightedWords: ['Git Worktree vs Branch', 'Parallel AI Agents'],
    publishedAt: '2026-07-05',
    updatedAt: '2026-07-05',
    alternateSlug: 'git-worktree-vs-rama-agentes-ia-en-paralelo',
  },
  sections: [
    {
      id: 'the-real-question',
      title: 'The real question with parallel agents',
      content: [
        {
          type: 'image',
          alt: 'Several AI coding agents running in parallel in one CodeAgentSwarm workspace, each on its own branch in its own git worktree',
          src: '/images/guides/opencode-agent-swarm.png',
          caption: 'A parallel agent swarm. The setup underneath decides whether they truly run at once or take turns fighting over one working copy.',
        },
        {
          type: 'paragraph',
          text: 'A single AI agent in a single folder never has this problem. It edits files, commits, moves on. The problem is entirely about running more than one at the same time on the same repository. Each agent needs somewhere to make changes that the others are not also changing.',
        },
        {
          type: 'paragraph',
          text: 'There are three ways to give them that space, and they are not equal for parallel work. Switching branches shares one working tree. Multiple clones give each agent a full copy of the repo. Git worktrees give each agent its own working tree on top of one shared repository. Let us take them in that order.',
        },
      ],
    },
    {
      id: 'switching-branches',
      title: 'Option A: one working tree, switch branches',
      content: [
        {
          type: 'paragraph',
          text: 'The instinct many developers have is branches. Make a branch per task, and let each agent work on its own branch. It is the right idea for keeping work separate in history, but it breaks the moment you want the agents to run at the same time.',
        },
        {
          type: 'paragraph',
          text: 'The reason is that a branch is not a place to work, it is a label on a commit. You still have only one working tree, one set of files on disk. <code>git checkout other-branch</code> swaps the files in that single folder to match the other branch. Two agents in that folder still share the exact same files, no matter how many branches exist.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# One working tree. checkout swaps its files in place.\ngit checkout -b agent-auth   # folder now on agent-auth\n# ...another agent...\ngit checkout -b agent-tests  # SAME folder, now on agent-tests',
        },
        {
          type: 'paragraph',
          text: 'So if two agents try to work at once, one of two things happens. Either they take turns, checking out, doing a bit, committing or stashing, and checking out again, which is not parallel at all, it is one working copy shared in shifts. Or they both edit the folder while it is on one branch and you are back to the original collision, with the added confusion of branches that no longer match what is on disk.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Branches organize history, they do not give you parallel workspaces. You cannot have the same folder checked out on two branches at once. This is the exact gap worktrees exist to fill.',
        },
      ],
    },
    {
      id: 'multiple-clones',
      title: 'Option B: a full clone per agent',
      content: [
        {
          type: 'paragraph',
          text: 'The next idea is to give each agent a genuinely separate copy: run <code>git clone</code> a few times and point one agent at each folder. This does give real isolation. Each folder has its own files, its own branch, its own everything, so the agents cannot collide.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# A full, independent copy per agent\ngit clone git@github.com:me/app.git app-auth\ngit clone git@github.com:me/app.git app-tests\ngit clone git@github.com:me/app.git app-docs',
        },
        {
          type: 'paragraph',
          text: 'It works, but it is heavy. Every clone carries a full copy of the history and the object store, a separate remote to fetch and push, and its own disk footprint. On a large repo that is a lot of duplication for what you are trying to do. You also now maintain several independent copies: fetching updates, keeping remotes in sync, and cleaning them up are all multiplied by the number of agents.',
        },
        {
          type: 'paragraph',
          text: 'For a couple of long-lived copies that is fine. For spinning up three or four short-lived agent workspaces several times a day, cloning the whole repo each time is more machinery than the job needs.',
        },
      ],
    },
    {
      id: 'worktrees',
      title: 'Option C: git worktrees, one shared repo',
      content: [
        {
          type: 'paragraph',
          text: 'Git worktrees are the middle path that fits parallel agents exactly. A <a href="https://git-scm.com/docs/git-worktree" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">worktree</a> is an extra working tree of one repository. There is still a single <code>.git</code> shared by all of them, but each worktree is a separate folder checked out on its own branch. You get the real folder isolation of clones without duplicating the history.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# One repo, several lightweight working trees\ngit worktree add ../agent-auth -b agent-auth\ngit worktree add ../agent-tests -b agent-tests\ngit worktree add ../agent-docs -b agent-docs\n\n# Clean one up when its work is merged\ngit worktree remove ../agent-auth',
        },
        {
          type: 'paragraph',
          text: 'Now N agents can genuinely run at once. Each edits its own checkout, on its own branch, so overlapping edits are impossible. Because they share one object store, a new worktree only costs the checked-out files, not another copy of the repo, so adding an agent is cheap. And they share one remote and one history, so fetching and pushing stays simple.',
        },
        {
          type: 'paragraph',
          text: 'That is the whole reason worktrees exist: multiple working trees backed by one repository. It is the setup that maps directly onto "several agents, one repo, all at once".',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'The one constraint: two worktrees cannot check out the same branch at the same time, so each agent needs its own branch. For parallel agents that is not a limitation, it is exactly how you want them organized.',
        },
      ],
    },
    {
      id: 'quick-comparison',
      title: 'Quick comparison',
      content: [
        {
          type: 'paragraph',
          text: 'The three options across what matters when you want agents running at the same time:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'True parallelism',
          id: 'compare-parallel',
        },
        {
          type: 'list',
          items: [
            '<strong>Switch branches:</strong> No, one working tree means agents take turns or collide',
            '<strong>Multiple clones:</strong> Yes, each folder is fully independent',
            '<strong>Worktrees:</strong> Yes, each agent has its own checkout on its own branch',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Weight and disk',
          id: 'compare-weight',
        },
        {
          type: 'list',
          items: [
            '<strong>Switch branches:</strong> Lightest, but it does not solve the problem',
            '<strong>Multiple clones:</strong> Heavy, a full history and remote copied per agent',
            '<strong>Worktrees:</strong> Light, one shared object store, only checked-out files per agent',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Remotes and history',
          id: 'compare-remotes',
        },
        {
          type: 'list',
          items: [
            '<strong>Switch branches:</strong> One, but shared unsafely between agents',
            '<strong>Multiple clones:</strong> One per clone, each fetched and kept in sync separately',
            '<strong>Worktrees:</strong> One shared remote and history for all worktrees',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Cleanup',
          id: 'compare-cleanup',
        },
        {
          type: 'list',
          items: [
            '<strong>Switch branches:</strong> Nothing to remove, but nothing was isolated',
            '<strong>Multiple clones:</strong> Delete whole folders, and untangle any local-only state first',
            '<strong>Worktrees:</strong> git worktree remove, one command per agent workspace',
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'Switching branches is the wrong tool for running agents at once. Multiple clones work but are heavier than the job needs. Worktrees are the fit: real isolation, cheap to add, one repo to maintain.',
        },
      ],
    },
    {
      id: 'when-a-branch-is-fine',
      title: 'When a plain branch is fine',
      content: [
        {
          type: 'paragraph',
          text: 'None of this means worktrees are always the answer. If you are running one agent at a time, a branch per task is not just fine, it is the right call. Make a branch, let the agent work, commit, switch to the next task. There is no collision because nothing else is touching the folder, and you get all the usual benefits of branches for organizing and reviewing history.',
        },
        {
          type: 'paragraph',
          text: 'Even with several agents, if they only ever edit clearly different files, one shared checkout can hold up: the edits do not overlap, so nothing overwrites anything, and Git merges cleanly. Worktrees start to matter specifically when agents run at the same time and can touch the same files, or when you want two of them working the same area on separate branches. Reach for the isolation when the collisions are real, not by default.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Rule of thumb: one agent at a time, use branches. Several agents that might overlap, use a worktree each. The <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> guide covers the wider workflow of running several agents together.',
        },
      ],
    },
    {
      id: 'in-codeagentswarm',
      title: 'How CodeAgentSwarm uses worktrees',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for running a swarm of AI CLI agents (Claude Code, Codex CLI, opencode, Antigravity CLI) in one place, and it builds the worktree option straight into each terminal so you never run the commands yourself.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm per-terminal session config with an OPTIONS row showing a Git Worktree toggle next to Turbo Mode',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'The OPTIONS row in a terminal\'s config has a Git Worktree toggle. Turn it on and that agent runs isolated on its own branch.',
        },
        {
          type: 'paragraph',
          text: 'In the per-terminal session config, the OPTIONS row has a <strong>Git Worktree</strong> toggle (next to Turbo for agents that support it; for opencode only Git Worktree shows). Turn it on and that conversation gets a worktree at <code>&lt;repoRoot&gt;/.codeagentswarm/worktrees/&lt;slug&gt;/</code> on a new branch <code>cas/&lt;slug&gt;</code>, branched from your local HEAD. That is Option C above, one command per agent, done for you and named consistently.',
        },
        {
          type: 'paragraph',
          text: 'It keeps the mess out of your way too. CodeAgentSwarm adds <code>.codeagentswarm/</code> to your <code>.gitignore</code> so the worktrees never show up in git status, and it is fail-safe: if the folder is not a git repo, the terminal just opens normally. A global setting can turn worktrees on for every terminal, and you can merge or remove a worktree from Settings when the work is done. You get the parallelism of worktrees without the branch juggling or the cleanup.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Git worktree vs branch: what is the difference for parallel agents?',
      answer: 'A branch is a label on a commit; it does not give you a separate place to work. With one working tree, switching branches swaps the files in that single folder, so two agents cannot both use it at once without colliding or taking turns. A worktree is an actual separate folder checked out on its own branch. For running agents at the same time you need worktrees (separate working trees), not just separate branches.',
    },
    {
      question: 'Can I just switch branches to run multiple AI agents?',
      answer: 'Not for real parallelism. Switching branches works on a single working tree, so the agents share one set of files. They either take turns checking out and stashing, which is not parallel, or they edit the same folder and overwrite each other. To run several agents truly at once you give each its own working tree, which is what worktrees provide.',
    },
    {
      question: 'Are git worktrees better than cloning the repo for each agent?',
      answer: 'For parallel agents, usually yes. Multiple clones give real isolation but each carries a full copy of the history, its own remote to sync, and its own disk usage. Worktrees give the same folder isolation while sharing one repository, so a new worktree only costs the checked-out files and you maintain a single remote and history. Clones make sense for long-lived independent copies; worktrees fit short-lived agent workspaces.',
    },
    {
      question: 'When is a plain branch enough?',
      answer: 'When you run one agent at a time, or when several agents only ever edit clearly different files. In those cases a branch per task keeps history organized and nothing collides in the shared checkout. Worktrees earn their place specifically when agents run at the same time and might touch the same files.',
    },
    {
      question: 'How does CodeAgentSwarm handle worktrees?',
      answer: 'Each terminal has a Git Worktree toggle in its OPTIONS row. Turn it on and that agent runs in a worktree at <repoRoot>/.codeagentswarm/worktrees/<slug>/ on a new branch cas/<slug> from your local HEAD. It adds .codeagentswarm/ to your .gitignore so it stays out of git status, falls back to the normal directory if the folder is not a git repo, and lets you merge or remove worktrees from Settings. A global setting can enable it for every terminal.',
    },
  ],
}

export default guide
