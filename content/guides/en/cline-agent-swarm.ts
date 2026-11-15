import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'cline-agent-swarm',
    locale: 'en',
    title: 'Run multiple Cline sessions in parallel (Cline agent swarm)',
    metaTitle: 'Cline Agent Swarm: Run Multiple Cline CLI Sessions',
    metaDescription: 'Run several Cline CLI sessions at once without them colliding: one folder or git worktree each, separate models, and one place to see which needs you.',
    intro: 'One Cline session is easy to follow. Three or four running at once, each on its own task, is where it gets messy: which one is waiting for approval, which one finished, which branch did each touch. This guide shows how to run Cline in parallel with plain terminals and with CodeAgentSwarm 2.5.0, where Cline arrives in beta.',
    ctaText: 'Open a Cline session per task in CodeAgentSwarm, give each its own worktree and come back only when one needs you.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'enjambre-de-agentes-cline',
    relatedSlug: 'how-to-use-cline-cli',
    socialImage: '/images/guides/cline-cli-og-en.png',
  },
  sections: [
    {
      id: 'why',
      title: 'Why run several Cline sessions',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'paragraph',
          text: 'An agent spends most of its time reading files and waiting for the model. While one Cline session writes tests, another can fix a bug and a third can draft docs. Because Cline lets you pick the provider per run, you can also put a cheap model on the routine task and a stronger one on the hard task.',
        },
        {
          type: 'paragraph',
          text: 'The rule that keeps this safe: never let two sessions edit the same working copy. Give each one its own folder or git worktree.',
        },
      ],
    },
    {
      id: 'plain-terminals',
      title: 'The plain terminal way',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# terminal 1\ncd ~/code/app && cline --worktree "add tests for the billing module"\n\n# terminal 2\ncd ~/code/app && cline --worktree -m <model-id> "fix the date parsing bug"',
        },
        {
          type: 'paragraph',
          text: `<code>--worktree</code> runs the task in a detached git worktree under <code>~/.cline/worktrees/</code>, so the two sessions never touch each other's files. You merge the result yourself when you are happy with it. Source: ${link('https://docs.cline.bot/cli/cli-reference', 'Cline CLI reference')}, checked October 31, 2026.`,
        },
        {
          type: 'paragraph',
          text: 'This works, but you have to keep an eye on every terminal to know which session is waiting for you and which one is done.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Run a Cline agent swarm in CodeAgentSwarm',
      content: [
        {
          type: 'image',
          src: '/images/guides/workspace-list.webp',
          alt: 'CodeAgentSwarm List view with several agent sessions, their status and current activity',
          caption: 'CodeAgentSwarm List view with sample sessions. It shows the general workspace, not a Cline-only setup.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm keeps every session in one window. Pick Cline in the agent picker for each session you want, choose CLI or Chat view, and turn on Git Worktree for the session so it gets its own branch. Cline sessions sit next to Claude Code, Codex, OpenCode, Kimi Code, Antigravity, Grok Build, Cursor Agent, Muse Code, Pi, Devin CLI and GitHub Copilot CLI, so you can mix agents in the same project.',
        },
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Starting a Cline session in CodeAgentSwarm with the CLI view and the Git Worktree option',
          caption: 'Real capture from the CodeAgentSwarm 2.5.0 release demo: Cline selected, with the CLI and Chat views and the Coordinator and Git Worktree options below.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            '<strong>See who needs you</strong>: each session shows whether it is working or waiting, and you get a desktop notification when a Cline task finishes.',
            '<strong>Review changes as they happen</strong>: the app follows the files Cline edits, so you can check the diff before you merge.',
            '<strong>Approve from one place</strong>: in Chat, every permission request appears in the session, with Ask before actions, Auto-accept edits or Full access.',
            '<strong>Track spend</strong>: the usage panel shows what each Cline session cost, from Cline\'s own token and cost data.',
          ],
        },
        {
          type: 'paragraph',
          text: `More on the shared pieces: ${link('/en/guides/git-worktrees-for-ai-coding-agents', 'git worktrees for AI coding agents')} and ${link('/en/guides/codeagentswarm-notifications', 'CodeAgentSwarm notifications')}.`,
        },
      ],
    },
    {
      id: 'isolation',
      title: 'How CodeAgentSwarm keeps Cline sessions apart',
      content: [
        {
          type: 'paragraph',
          text: 'By default Cline can share one background hub process between sessions. CodeAgentSwarm starts each Cline session in local mode instead, so every session has its own process and the CodeAgentSwarm tools always know which session called them.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Cline also has its own subagents. They run inside the session that started them, and the conversation history shows only the main session, so each row is something you can resume.',
        },
      ],
    },
    {
      id: 'tips',
      title: 'Tips for a calm Cline swarm',
      content: [
        {
          type: 'list',
          items: [
            'One task per session, written so it can finish without you: what to change, how to check it, when to stop.',
            'Start risky sessions in plan mode (<code>-p</code> in the terminal, or the plan mode switch in Chat) and switch to act once the plan looks right.',
            'Keep shared rules in <code>AGENTS.md</code> or <code>.clinerules/</code> so every session follows the same conventions.',
            'Cap how many sessions edit code at once. Four focused sessions usually beat ten you cannot review.',
          ],
        },
        {
          type: 'paragraph',
          text: `New to Cline? Read ${link('/en/guides/how-to-use-cline-cli', 'how to install and use Cline CLI')} first. For the cross-agent picture, see ${link('/en/guides/ai-cli-agent-swarm', 'how an AI CLI agent swarm works')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I run multiple Cline CLI sessions at once?',
      answer: 'Yes. Each cline process is independent. Give each one its own folder or git worktree, for example with cline --worktree, so they do not edit the same files.',
    },
    {
      question: 'What is a Cline agent swarm?',
      answer: 'Several Cline sessions working on separate tasks at the same time, usually in separate worktrees, with one person reviewing and merging the results.',
    },
    {
      question: 'Can each Cline session use a different model?',
      answer: 'Yes. Pass -m (and -P for the provider) per run in the terminal, or pick the model per session in CodeAgentSwarm Chat.',
    },
    {
      question: 'Does CodeAgentSwarm show Cline usage limits?',
      answer: 'It shows what each session spent, using Cline\'s own cost and token data. Cline has no account quota to read, so there is no percentage ring or daily budget for it.',
    },
  ],
}

export default guide
