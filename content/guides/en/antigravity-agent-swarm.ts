import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-agent-swarm',
    locale: 'en',
    title: 'Antigravity Agent Swarm: Running Several agy Sessions in Parallel',
    metaTitle: 'Antigravity Agent Swarm: Run Multiple agy Sessions (2026)',
    metaDescription: 'How to run several Antigravity CLI agents at once: worktree isolation, why approval mode does not scale, splitting work across agents, and keeping every session supervisable.',
    intro: `An Antigravity swarm is several <code>agy</code> sessions working at the same time, each on its own task, each in its own isolated directory. Every session is an independent process, so nothing in Antigravity stops you doing this today.

What stops most people is not the agent, it is everything around it: agents editing each other's files, four terminals with no way to tell which is which, no notification when one finishes, and approval prompts that turn four working agents into four processes waiting on one human.

This guide covers the three things that actually make a swarm work rather than just run: isolation so the agents cannot collide, autonomy so they do not block on you, and visibility so you can supervise them without watching them.`,
    ctaText: 'A swarm is only useful if you can see it. CodeAgentSwarm runs every Antigravity session in its own labelled terminal with live status, desktop notifications and searchable history across all of them.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'Agent', 'Swarm'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-05',
    alternateSlug: 'enjambre-de-agentes-antigravity',
  },
  sections: [
    {
      id: 'why-parallel',
      title: 'Why parallel agents, and where the gain actually comes from',
      content: [
        {
          type: 'paragraph',
          text: 'The intuitive reason to run several agents is throughput: four agents should finish four times the work. In practice that is not where most of the gain comes from, because you are still the bottleneck on reviewing what they produce.',
        },
        {
          type: 'paragraph',
          text: 'The real gain is <strong>eliminating your own idle time</strong>. A single agent leaves you waiting: it thinks, it reads files, it runs a test suite, and during all of that you are doing nothing useful. With three sessions, there is essentially always one that needs your attention, and the other two keep working while you deal with it. You stop waiting for agents and agents start waiting for you, which is the correct direction for that relationship.',
        },
        {
          type: 'paragraph',
          text: 'That reframing tells you how to split the work. Tasks that are independent and long-running are ideal, because they maximise the time each agent spends not needing you. Tasks that need constant steering are worse in a swarm than alone, because you end up context-switching between three half-formed plans.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Three agents is the sweet spot for most people. Two is not enough to remove idle time; five or more is past the point where a single human can hold three codebases in their head, and the review queue becomes the new bottleneck.',
        },
      ],
    },
    {
      id: 'isolation',
      title: 'Isolation: one worktree per agent, not one checkout',
      content: [
        {
          type: 'paragraph',
          text: 'This is the part people skip and then regret. If two <code>agy</code> sessions run in the same directory, they edit the same files. Neither is aware of the other, so agent A reads a file, agent B rewrites it, and agent A then writes back a version based on what it read a minute ago. Nothing errors. You just end up with a working tree containing two half-applied changes and no way to separate them.',
        },
        {
          type: 'paragraph',
          text: 'The fix is a <strong>git worktree per agent</strong>: each session gets its own directory on its own branch, sharing one repository and one object store.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# One worktree per task, each on its own branch\ngit worktree add ../proj-auth   -b feature/auth\ngit worktree add ../proj-api    -b feature/api\ngit worktree add ../proj-docs   -b chore/docs\n\n# Then start an agent in each\ncd ../proj-auth && agy\ncd ../proj-api  && agy\ncd ../proj-docs && agy',
        },
        {
          type: 'paragraph',
          text: 'This gives you three properties that matter: the agents physically cannot touch each other\'s files, each one produces a branch you can review and merge independently, and a session that goes badly wrong is discarded by removing one worktree rather than by untangling a shared tree.',
        },
        {
          type: 'paragraph',
          text: 'The full mechanics, including the trap where a worktree confuses tooling into thinking it is a different project, are in <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">the worktrees guide</a>.',
        },
      ],
    },
    {
      id: 'autonomy',
      title: 'Autonomy: approval mode does not scale past one agent',
      content: [
        {
          type: 'paragraph',
          text: 'By default <code>agy</code> asks before it changes anything. With one agent that is a reasonable review process. With four it is a disaster, and the arithmetic is worth stating plainly: <strong>four agents in approval mode do not give you four times the throughput, they give you one human round-robining between four blocked processes</strong>. Each agent spends most of its life idle, waiting for a person who is busy unblocking someone else.',
        },
        {
          type: 'paragraph',
          text: 'The flag that fixes it is <code>agy --dangerously-skip-permissions</code>, which auto-approves everything. That is a genuine trade, not a free win: you give up seeing each action before it happens in exchange for the agents actually running. It is only a good trade when the end state is reviewable, which is exactly what the worktree setup above guarantees.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Commit before you start each session. With a clean tree and a dedicated worktree, an unattended agent produces a diff you can read, stage selectively or throw away entirely. Without that, YOLO mode across several agents is genuinely reckless rather than merely fast.',
        },
        {
          type: 'paragraph',
          text: 'The reasoning behind that trade, including when not to take it, is in <a href="/en/guides/antigravity-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity YOLO mode guide</a>.',
        },
      ],
    },
    {
      id: 'quota',
      title: 'The constraint nobody plans for: shared quota',
      content: [
        {
          type: 'paragraph',
          text: 'Four Antigravity agents draw from one Google AI allowance, and they draw roughly four times as fast. This is the constraint that decides how big your swarm can actually be, and it is invisible until it stops you.',
        },
        {
          type: 'paragraph',
          text: 'On the free tier this arrives quickly: the free plan is sized for one person driving one agent thoughtfully, not for a swarm, and you will notice within a session. On Pro it is comfortable for a small swarm. The details of the tiers and the credit pool are in <a href="/en/guides/antigravity-plans-and-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity plans and pricing guide</a>.',
        },
        {
          type: 'paragraph',
          text: 'The mitigation that works better than upgrading is <strong>mixing providers</strong>. Antigravity, Claude and Codex bill from entirely separate pools, so a swarm split across two agents rarely stops completely: exhausting one provider leaves the other running. That is a better reason to run a mixed setup than any benchmark comparison, and it is why the cross-agent pattern in <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the multi-CLI swarm guide</a> is more robust than a single-vendor one.',
        },
      ],
    },
    {
      id: 'visibility',
      title: 'Visibility: the problem that appears at three sessions',
      content: [
        {
          type: 'paragraph',
          text: 'Once the agents are isolated and autonomous, a new problem shows up, and it is the one that actually kills most swarm attempts. Agents that never stop to ask also never announce themselves.',
        },
        {
          type: 'paragraph',
          text: 'A session that finished twenty minutes ago looks identical to one still working. A session stuck in a loop looks identical to one making progress. And when you do notice something, you are looking at a wall of near-identical terminal windows trying to work out which one is the auth refactor. In practice people respond to this by watching one agent and forgetting the others, which throws away the entire point of running several.',
        },
        {
          type: 'paragraph',
          text: 'Three things fix it, and none of them are features of the CLI itself:',
        },
        {
          type: 'list',
          items: [
            '<strong>A label per session</strong>, so you know which agent is doing what without reading its scrollback.',
            '<strong>A status per session</strong>, distinguishing working from waiting from finished at a glance.',
            '<strong>A notification when a session finishes</strong>, so you can genuinely do something else instead of polling four terminals.',
          ],
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace built for exactly this, gives each Antigravity session its own labelled terminal with a live status and fires a desktop notification the moment any of them finishes. It also indexes the conversations so you can search across every session afterwards, which matters more for Antigravity than for most agents because of how its history is stored, as covered in <a href="/en/guides/antigravity-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">the conversation history guide</a>.',
        },
        {
          type: 'paragraph',
          text: 'And because each terminal can run a different agent, the same window handles a mixed swarm: Antigravity on one task, Claude on another, Codex on a third, each on its own quota and all visible together.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I run several Antigravity CLI sessions at once?',
      answer: 'Yes. Each agy session is an independent process, so nothing stops you opening several. What you need to add is isolation (a git worktree per agent), autonomy (auto-approve, or the agents block on you), and visibility (labels, status and notifications).',
    },
    {
      question: 'How do I stop two Antigravity agents from editing the same files?',
      answer: 'Give each one its own git worktree, so each session gets a separate directory on its own branch while sharing one repository. Without that, two agents in one checkout will overwrite each other silently, with no error to tell you it happened.',
    },
    {
      question: 'How many Antigravity agents should I run at once?',
      answer: 'Three is the sweet spot for most people. Two is not enough to remove your idle time; five or more pushes past what one person can review, so the review queue becomes the new bottleneck. Your quota tier is the other limit.',
    },
    {
      question: 'Do I need YOLO mode to run an Antigravity swarm?',
      answer: 'In practice yes. Approval mode does not scale past one agent: four agents waiting for confirmations means one human round-robining between four blocked processes. Use agy --dangerously-skip-permissions, but commit first and give each agent its own worktree so the output stays reviewable.',
    },
    {
      question: 'Will running several Antigravity agents burn through my quota?',
      answer: 'Yes, roughly in proportion to how many you run, because they share one Google AI allowance. The free tier is sized for one agent, not a swarm. The most effective mitigation is mixing providers, since Antigravity, Claude and Codex bill from entirely separate pools.',
    },
    {
      question: 'How do I keep track of several Antigravity sessions?',
      answer: 'You need a label, a status and a finish notification per session, none of which the CLI provides. CodeAgentSwarm gives each session its own labelled terminal with live status, notifies you when one finishes, and indexes every conversation for later search.',
    },
  ],
}

export default guide
