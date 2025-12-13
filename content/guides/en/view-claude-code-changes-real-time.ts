import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'view-claude-code-changes-real-time',
    locale: 'en',
    title: 'How to view Claude Code changes in real time (and know what the AI is doing)',
    metaTitle: 'How to view Claude Code changes in real time (terminal diff, Git diff, and dynamic titles)',
    metaDescription: 'Learn how to see what Claude Code is changing in your code in real time with CodeAgentSwarm session diff, how to review project-level changes with the Git diff viewer, and how to use dynamic titles to know what the AI is doing in each terminal.',
    intro: `If you use Claude Code to make changes to your code, there's something that has probably happened to you more than once.

You ask it to refactor an entire module, or to implement a complete feature, it responds with a pretty convincing "all done", but you're left wondering: okay, but what exactly did you touch in the repo.

And if you have several terminals working at the same time, the question splits in two: what is the AI doing right now in each terminal, and what exactly has changed in the code.

In CodeAgentSwarm the idea is precisely to avoid that black box feeling. The app combines three things: a live diff per terminal to see Claude Code changes in real time for that specific session, a Git diff viewer to see project-level changes against the repository, and dynamic titles in terminals (with history) to know what the AI is doing at any moment.`,
    alternateSlug: 'ver-cambios-claude-code-tiempo-real',
    introVideo: '/see-claude-code-changes-real-time.mp4',
  },
  sections: [
    {
      id: 'three-ways-to-see-changes',
      title: 'Three ways to see what has changed and know what the AI is doing',
      content: [
        {
          type: 'paragraph',
          text: 'Quick summary of the system:',
        },
        {
          type: 'list',
          items: [
            'The live diff per terminal tells you: this is exactly what Claude has changed in this session, in these files',
            'The Git diff tells you: this is everything that has changed in the project compared to Git, whether from Claude or manual changes',
            'Dynamic titles tell you: this terminal is currently working on X task, module or part of the system, plus you can see the title history',
          ],
        },
        {
          type: 'paragraph',
          text: 'All three together answer: what is the AI doing right now, what has changed in this session, and what has changed in the project overall.',
        },
      ],
    },
    {
      id: 'live-diff-per-terminal',
      title: 'Live diff per terminal: see what Claude changes in that session',
      content: [
        {
          type: 'paragraph',
          text: 'Imagine you have a Claude Code terminal working on something specific, for example "refactoring the notifications module".',
        },
        {
          type: 'paragraph',
          text: 'As Claude writes files, CodeAgentSwarm hooks into everything it does using Claude Code hooks:',
        },
        {
          type: 'list',
          items: [
            'Every time it uses Write or Edit on a file',
            'Every time it makes changes via Bash (sed, echo, redirections...)',
          ],
        },
        {
          type: 'paragraph',
          text: 'Those changes are stored in memory, associated with the terminal where it is working and the file it has touched.',
        },
        {
          type: 'paragraph',
          text: 'Each terminal has its own isolated session, so if you have four terminals at once, each one accumulates its changes separately. This is key if you want to see Claude Code changes in real time per session without mixing contexts.',
        },
        {
          type: 'paragraph',
          text: 'In the UI you see it with a button in the terminal bar with a change counter, and a modal specific to that session.',
        },
        {
          type: 'video',
          src: '/claude-code-session-changes.mp4',
          caption: 'The change counter goes up while Claude works. Click to see the diff for that session.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'What you see inside the Session file changes modal',
          id: 'session-file-changes-modal',
        },
        {
          type: 'paragraph',
          text: 'Inside the Session file changes modal you have:',
        },
        {
          type: 'list',
          items: [
            'A side panel with the list of files Claude has touched in that session',
            'A diff per file with added and removed lines',
            'Collapsed sections so you don\'t have to go through the whole file if it\'s very large',
            'A Clear session button to reset when you start a new task',
          ],
        },
        {
          type: 'paragraph',
          text: 'The important thing here: you only see what that specific terminal has changed, it doesn\'t mix changes from other terminals, and you don\'t depend on the project having Git configured.',
        },
        {
          type: 'paragraph',
          text: 'It\'s a magnifying glass placed on top of what that Claude Code instance is doing. If you\'re wondering how to see what Claude Code has changed before applying anything or before asking it more things, this is the place.',
        },
      ],
    },
    {
      id: 'git-diff',
      title: 'Git diff: see changes at project level',
      content: [
        {
          type: 'paragraph',
          text: 'The other diff viewer in CodeAgentSwarm is the classic one you expect when working with Git repos.',
        },
        {
          type: 'paragraph',
          text: 'It compares the current state of your files against:',
        },
        {
          type: 'list',
          items: [
            'The staging area, to see changes you have prepared for commit',
            'The working tree, to see changes you haven\'t added to staging yet',
          ],
        },
        {
          type: 'paragraph',
          text: 'And it shows them in a diff modal with two ways to view it:',
        },
        {
          type: 'list',
          items: [
            'Column view, original on the left and modified on the right',
            'Unified view, all in a single column with added and removed lines',
          ],
        },
        {
          type: 'image',
          alt: 'Screenshot of the Git diff modal in CodeAgentSwarm with split view, sidebar of modified files and synchronized scroll',
          src: '#',
          caption: 'The Git diff viewer gives you the complete picture of changes in the project.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'From the interface you usually get to this diff from the project\'s Git panel or from Diff buttons associated with modified files.',
        },
        {
          type: 'paragraph',
          text: 'This diff doesn\'t distinguish whether the changes come from Claude, from you, or from an external script. It\'s the global picture of the project against the repository, and it\'s the answer to the classic question before committing: what exactly am I going to push.',
        },
      ],
    },
    {
      id: 'dynamic-titles',
      title: 'How to know what the AI is doing in each terminal (dynamic titles and history)',
      content: [
        {
          type: 'paragraph',
          text: 'So far we\'ve talked about what has changed. But there\'s another equally important part: knowing what the AI is doing right now in each terminal.',
        },
        {
          type: 'paragraph',
          text: 'That\'s where CodeAgentSwarm\'s dynamic titles come in.',
        },
        {
          type: 'paragraph',
          text: 'Claude, while working, can update the terminal title with what it\'s doing. Something like:',
        },
        {
          type: 'list',
          items: [
            'Refactor notifications service',
            'Implement checkout flow',
            'Write tests for payment retries',
            'Clean up old feature flags',
          ],
        },
        {
          type: 'paragraph',
          text: 'That gives you instant context: you open the terminals view, read the titles, and you know right away what each one is tackling, without having to read 200 lines of logs.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'The title history',
          id: 'title-history',
        },
        {
          type: 'paragraph',
          text: 'In addition to that, CodeAgentSwarm saves a history of titles per terminal. If you want to see what the AI has been doing over time in that terminal, you can review the list of previous titles and reconstruct quite clearly the timeline of tasks it has been working on.',
        },
        {
          type: 'paragraph',
          text: 'Dynamic titles:',
        },
        {
          type: 'list',
          items: [
            'Reflect the task or objective of that terminal',
            'Help you quickly identify: this one is payments, this one is notifications, this one is tests',
            'And with the title history they allow you to see how work has evolved in that terminal',
          ],
        },
        {
          type: 'paragraph',
          text: 'They combine very well with diffs: you see the current title or the title history to understand what Claude was doing, you open the session diff to see what has changed in that stage, and you use the Git diff to see how it all fits in the project.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Titles don\'t depend on Git or the diff system. They\'re another channel of information, focused on task context and the timeline of what the AI has been doing in that terminal.',
        },
      ],
    },
    {
      id: 'multiple-terminals',
      title: 'How this fits when working with multiple terminals at once',
      content: [
        {
          type: 'paragraph',
          text: 'Where all this is most noticeable is when you do what CodeAgentSwarm is designed for, which is working with multiple Claude Code terminals in parallel.',
        },
        {
          type: 'paragraph',
          text: 'Example with three terminals:',
        },
        {
          type: 'list',
          items: [
            'Terminal 1 - dynamic title: Refactor notifications service - session diff: changes only to the notifications module',
            'Terminal 2 - dynamic title: Implement profile page UI - session diff: changes to frontend components',
            'Terminal 3 - dynamic title: Add integration tests for X - session diff: only tests',
          ],
        },
        {
          type: 'paragraph',
          text: 'With that combination: dynamic titles tell you what the AI is doing in each place, the live diff per terminal tells you what has changed in that specific session, and the Git diff gives you the complete picture of the project before committing anything.',
        },
        {
          type: 'paragraph',
          text: 'You stop having the feeling of "I have three AIs doing things and I don\'t really know what\'s happening in the repo".',
        },
      ],
    },
    {
      id: 'when-to-use-each',
      title: 'When to use each one',
      content: [
        {
          type: 'paragraph',
          text: 'Simple way to see it.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use the live diff per terminal when',
          id: 'use-terminal-diff',
        },
        {
          type: 'list',
          items: [
            'You want to see what Claude has changed in that specific session',
            'You\'re testing an idea and want to review its changes before continuing',
            'You\'re in a project without Git but want control over AI changes',
            'You want to see Claude Code changes in real time per terminal',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use the Git diff when',
          id: 'use-git-diff',
        },
        {
          type: 'list',
          items: [
            'You\'re preparing a commit',
            'You want to review all project changes, whether from Claude or from you',
            'You want to see the before and after at repository level',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Rely on dynamic titles and their history when',
          id: 'use-titles',
        },
        {
          type: 'list',
          items: [
            'You have several terminals at once and want to quickly know what each one is doing',
            'You want to go back to a specific terminal that you remember by the task, not by the number',
            'You want to reconstruct what the AI has been doing over time in that terminal',
            'You want the workspace to be readable at a glance without opening diffs all the time',
          ],
        },
      ],
    },
    {
      id: 'advantages-limitations',
      title: 'Advantages and limitations of each approach',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'Live diff per terminal',
          id: 'advantages-terminal-diff',
        },
        {
          type: 'paragraph',
          text: 'Advantages:',
        },
        {
          type: 'list',
          items: [
            'Doesn\'t depend on Git',
            'Shows you exactly what Claude has done in that session',
            'Isolated per terminal, ideal when working in parallel',
            'You can reset it when you change tasks',
          ],
        },
        {
          type: 'paragraph',
          text: 'Limitations:',
        },
        {
          type: 'list',
          items: [
            'Only sees changes that Claude Code makes, not your manual edits',
            'Data lives in memory, if you close the app it\'s lost',
            'On very large files it might take a bit to calculate the diff',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Git diff',
          id: 'advantages-git-diff',
        },
        {
          type: 'paragraph',
          text: 'Advantages:',
        },
        {
          type: 'list',
          items: [
            'It\'s the classic Git diff, integrated in the workspace',
            'Shows you the picture ready for commit or changes in the working tree',
            'Includes both Claude\'s changes and yours',
          ],
        },
        {
          type: 'paragraph',
          text: 'Limitations:',
        },
        {
          type: 'list',
          items: [
            'Requires the project to be a Git repository',
            'Doesn\'t tell you which part came from Claude and which from you',
            'Not organized by terminal session',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How can I see Claude Code changes in real time in CodeAgentSwarm?',
      answer: 'You open the terminal where Claude is working, click on the file changes button and the live diff modal for that session opens. There you see file by file what has changed in that specific session.',
    },
    {
      question: 'How do I know what the AI is doing in each terminal?',
      answer: 'Through dynamic titles. Claude updates the terminal title with the task it\'s doing, and you can also check the title history of that terminal to see what it has been doing over time.',
    },
    {
      question: 'Can I see what Claude has changed before applying a commit?',
      answer: 'Yes, at two levels. First you review the live diff of the terminal to see what the AI has done in that session and then you use the Git diff to review the entire set of changes that will go into the repo.',
    },
    {
      question: 'Do I need Git to see Claude Code diffs?',
      answer: 'For the live diff per terminal, no. It works even if the project doesn\'t have Git. For the Git diff viewer, yes, it relies on the repo to compare against HEAD or the staging area.',
    },
    {
      question: 'Does the live diff per terminal also see changes I make manually in the editor?',
      answer: 'No. That diff is designed to track what Claude Code does through hooks. Your manual changes then appear in the Git diff, not in the session diff.',
    },
  ],
}

export default guide
