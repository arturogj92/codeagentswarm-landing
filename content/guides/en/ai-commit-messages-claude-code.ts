import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'ai-commit-messages-claude-code',
    locale: 'en',
    title: 'AI Commit Messages: Generate a Good Commit From Your Claude Code Diff',
    metaTitle: 'AI Commit Message Generator Built Into Your Claude Code Workspace (2026)',
    metaDescription: 'Generate a clear commit message with AI from your staged diff, then stage, commit and push without leaving CodeAgentSwarm. A built-in Git Manager for Claude Code.',
    intro: `If you run several Claude Code sessions in parallel, you know what the end of a session looks like: a pile of changed files, three or four agents that touched different parts of the repo, and a commit waiting to be written.

That's the moment where most people get lazy. You type "wip", or "fixes", or "stuff", and move on. A week later you're staring at git log trying to remember what "fixes 2" actually did.

CodeAgentSwarm has a built-in Git Manager for exactly this. It reads your staged files and the diff, generates a clear commit message with AI, and lets you stage, commit, push and pull without leaving the app. You can get a short, concise message or a more detailed one with a body. In this guide I'll show you how it works and how I use it after a busy session.`,
    highlightedWords: ['AI Commit Messages', 'commit', 'Claude Code'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'mensajes-de-commit-con-ia-claude-code',
    ctaText: 'Next time your agents leave a pile of changes, open the Git Manager, generate the commit message with AI, and commit without leaving CodeAgentSwarm.',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'What the AI commit message generator does',
      content: [
        {
          type: 'paragraph',
          text: 'Short version: CodeAgentSwarm reads the changes you have staged, looks at the actual diff, and writes a commit message that describes what changed. You review it, tweak it if you want, and commit. No copy-pasting diffs into a chat window, no switching to a separate Git client.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm Git Manager showing the list of changed files on one side and the Generate commit message with AI control, with a generated message in the commit box',
          src: '/images/guides/ai-commit-message.png',
          caption: 'The Git Manager: changed files on the left, the AI generated commit message ready to review and commit.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'The whole point is to remove the friction at the end of a session. The AI did the heavy lifting in the code, and now writing a decent commit message is one click instead of a chore you skip. If you are new to <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, it is Anthropic\'s agentic coding tool that runs in your terminal and edits files across your project.',
        },
      ],
    },
    {
      id: 'how-it-works',
      title: 'How it works: from changed files to a committed message',
      content: [
        {
          type: 'paragraph',
          text: 'The Git Manager works on top of your real repository, so what you see is what Git sees. The flow looks like this:',
        },
        {
          type: 'list',
          items: [
            'Open the Git Manager for the project you are working on.',
            'Review the list of changed files. You can stage the ones you want to include and leave the rest out.',
            'Click the control to generate the commit message with AI.',
            'It reads the staged changes and the diff, then writes a message that summarises what changed.',
            'Read it, edit it if something is off, and commit. From there you can push too.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Because it reads the actual diff and not just the file names, the message reflects what the code does, not a generic "updated files". If you renamed a function, added a guard clause, or fixed an off by one, that tends to show up in the message.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Stage only what belongs in this commit before generating. The AI writes the message from what is staged, so a clean staging area gives you a clean, focused message instead of one trying to summarise ten unrelated things.',
        },
      ],
    },
    {
      id: 'concise-vs-detailed',
      title: 'Concise or detailed: pick the message you need',
      content: [
        {
          type: 'paragraph',
          text: 'Not every commit deserves the same treatment. Sometimes you want a single tidy line. Sometimes the change is big enough that future you will want a paragraph explaining why.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm lets you get either one:',
        },
        {
          type: 'list',
          items: [
            'Concise: a short, single line summary. Good for small, self explanatory changes and for repos that like a clean one line history.',
            'Detailed: a subject line plus a body that explains what changed and, where it can infer it, why. Good for bigger refactors, features, or anything you might have to justify in a review.',
          ],
        },
        {
          type: 'paragraph',
          text: 'My rule of thumb: concise for the small stuff, detailed when a single line would lie about how much actually changed. Either way you can edit the result before committing, so treat it as a strong first draft rather than something you have to accept verbatim.',
        },
      ],
    },
    {
      id: 'why-it-matters',
      title: 'Why this matters when several agents are working',
      content: [
        {
          type: 'paragraph',
          text: 'This feature earns its keep when you are running things in parallel. With one terminal, writing a commit by hand is not a big deal. With four or six agents, each one having touched a different module, the diff at the end can be large and spread across the repo.',
        },
        {
          type: 'paragraph',
          text: 'Reading all of that and condensing it into a sentence is exactly the kind of summarisation the AI is good at. Instead of scrolling through the whole diff to remember what happened, you let it draft the message and you spend your attention on whether it is accurate. If you want to learn how to run those sessions in the first place, see this guide: <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">How to run multiple Claude Code sessions in parallel</a>.',
        },
        {
          type: 'paragraph',
          text: 'There is a natural order here that works well: review first, then commit. You look at what changed using the diff viewers, confirm it is what you wanted, then generate the message and commit. If you have not seen how the diff side works, read this: <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">How to view Claude Code changes in real time</a>.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'A generated message is a draft, not gospel. Always read it before committing, especially for detailed messages where the AI infers intent. If it claims you did something you did not, fix the line. It is faster than rewriting from scratch, but it is not a substitute for a quick read.',
        },
      ],
    },
    {
      id: 'commit-push-pull',
      title: 'Stage, commit, push and pull without leaving the app',
      content: [
        {
          type: 'paragraph',
          text: 'The Git Manager is not just a commit message generator bolted onto the side. It covers the everyday Git loop so you do not have to bounce to a terminal or a separate client for the common operations:',
        },
        {
          type: 'list',
          items: [
            'Stage and unstage files from the changed files list.',
            'Commit with the message you generated or wrote.',
            'Push your commits to the remote.',
            'Pull to bring in changes before you start, or before you push.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Keeping it in one place matters more than it sounds. When you are juggling several terminals, every context switch costs you a little focus. Doing the commit right where the changes happened, next to the agents that made them, keeps you in the flow instead of alt tabbing to wrangle Git somewhere else.',
        },
        {
          type: 'paragraph',
          text: 'This works on both macOS and Windows, on top of your existing Git setup. The AI message generation is available on the Pro plan, and it runs on top of the subscriptions you already pay for, so there is no separate model key to manage just for commits.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How do I generate a commit message with AI?',
      answer: 'Open the Git Manager in CodeAgentSwarm, stage the files you want in the commit, then click the control to generate the commit message with AI. It reads the staged diff and writes a message you can review, edit and commit.',
    },
    {
      question: 'Does CodeAgentSwarm have Git integration?',
      answer: 'Yes. It has a built-in Git Manager that lets you stage and unstage files, review changes, commit, push and pull without leaving the app, plus AI commit message generation on top.',
    },
    {
      question: 'Can it write the commit message from my diff?',
      answer: 'Yes. The generator reads your staged changes and the actual diff, not just the file names, so the message reflects what the code does rather than a generic placeholder.',
    },
    {
      question: 'Can I commit and push from the app?',
      answer: 'Yes. After generating or editing the message you can commit and push directly from the Git Manager, and you can pull to bring in remote changes too. No separate Git client needed for the everyday loop.',
    },
    {
      question: 'Concise vs detailed commit messages: which should I use?',
      answer: 'Use a concise single line for small, self explanatory changes. Use a detailed message with a body for bigger refactors and features where you want to explain what changed and why. You can edit either result before committing.',
    },
    {
      question: 'Is the AI commit message generator available on macOS and Windows?',
      answer: 'Yes, CodeAgentSwarm runs on both macOS and Windows. The Git Manager and the AI message generation work on both, on top of your existing Git installation. The AI generation is part of the Pro plan.',
    },
  ],
}

export default guide
