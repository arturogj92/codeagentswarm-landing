import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'how-to-use-multiple-claude-code-terminals',
    locale: 'en',
    title: 'How to Use Multiple Claude Code Terminals (Without Losing Your Head)',
    metaTitle: 'How to Use Multiple Claude Code Terminals in Parallel',
    metaDescription: 'Learn how to work with multiple Claude Code terminals in parallel using CodeAgentSwarm. Practical guide with tips for managing concurrent AI coding sessions.',
    intro: `If you've ever tried to run multiple Claude Code conversations at once, you know how the story ends: tabs everywhere, you lose track, and you end up thinking "wait, where was I again?".

I've been there. That's exactly why I built CodeAgentSwarm - so working in parallel feels normal, comfortable, and doesn't overwhelm you.

In this guide I'll explain, just like I'd tell a friend, how to use multiple terminals at once in a simple way without overcomplicating things.`,
    ctaText: 'Next time you have multiple parallel tasks, open several terminals and let each one work on its own thing. You\'ll notice the difference.',
    alternateSlug: 'como-usar-varios-terminales-claude-code',
  },
  sections: [
    {
      id: 'why-use-multiple-claude-code-terminals',
      title: 'Why use multiple Claude Code terminals?',
      content: [
        {
          type: 'paragraph',
          text: 'Some days you just do one thing and that\'s it. But there are other days when you\'re touching backend, interface, tests and docs all at the same time.',
        },
        {
          type: 'paragraph',
          text: 'Or you\'re even working on multiple features simultaneously. Imagine you\'re building a new project and you\'ve implemented a chat.',
        },
        {
          type: 'paragraph',
          text: 'You\'ll probably want to do several things at once with this implementation - like adding user avatars, an emoji selector, notifications. In the traditional way you\'d have a single Claude Code terminal and do all of this sequentially.',
        },
        {
          type: 'paragraph',
          text: 'Using multiple Claude Code terminals in parallel lets you:',
        },
        {
          type: 'list',
          items: [
            'Separate tasks well to go faster',
            'Each terminal has its own context, with more efficient management',
            'See the changes each terminal is making in isolation',
            'Claude handles conflicts very well - it will always resolve them automatically without any issues, very reliable',
            'You\'ll know when one finishes or needs confirmation because you\'ll get a notification',
          ],
        },
        {
          type: 'paragraph',
          text: 'Once you get the hang of it, you really notice the difference. Plus it\'s super satisfying to knock out 6 tasks in one shot.',
        },
      ],
    },
    {
      id: 'what-this-looks-like-in-practice',
      title: 'What does this look like in practice?',
      content: [
        {
          type: 'paragraph',
          text: 'Following the chat example, you could have something like this:',
        },
        {
          type: 'list',
          items: [
            'Terminal 1: Implementing user avatars',
            'Terminal 2: Adding push notifications',
            'Terminal 3: Allowing message editing',
            'Terminal 4: Easily sending gifs',
          ],
        },
        {
          type: 'image',
          alt: 'Grid view of multiple Claude Code terminals working in parallel',
          src: '/images/guides/multi-terminal.png',
          caption: 'Multiple terminals working simultaneously, each on its own feature.',
        },
        {
          type: 'paragraph',
          text: 'You see everything progressing at once. It\'s very satisfying to watch each terminal completing its part while you supervise or keep giving instructions.',
        },
        {
          type: 'paragraph',
          text: 'And when there are code conflicts (because two terminals touched the same file), Claude resolves them automatically. You don\'t have to do anything.',
        },
      ],
    },
    {
      id: 'what-codeagentswarm-offers',
      title: 'What does CodeAgentSwarm offer you?',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is the tool that makes all this possible comfortably. Out of the box you get:',
        },
        {
          type: 'list',
          items: [
            'Up to 6 Claude Code terminals in parallel',
            'Complete conversation history with built-in search to recover old conversations',
            'Notifications when a terminal finishes or needs your attention',
            'Grid view to see everything at once or tab mode',
            'Dynamic titles that automatically change based on what each terminal is doing',
          ],
        },
        {
          type: 'paragraph',
          text: 'Instead of having loose tabs or windows scattered around, you have everything in one place.',
        },
      ],
    },
    {
      id: 'how-to-get-started-step-by-step',
      title: 'How to get started (step by step)',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '1. Open CodeAgentSwarm and create your terminals',
          id: 'step-open-create',
        },
        {
          type: 'paragraph',
          text: 'Open the app and create up to 6 terminals by clicking on the following button:',
        },
        {
          type: 'image',
          alt: 'Button to create a new terminal in CodeAgentSwarm',
          src: '/images/guides/create_terminal_button_image.png',
          size: 'inline',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'You can also create tasks from the kanban and create terminals from there, sending the task directly.',
        },
        {
          type: 'image',
          alt: 'Create terminal from kanban in CodeAgentSwarm',
          src: '/images/guides/open-terminal-from-kanban.png',
          caption: 'Open a terminal directly from a kanban task.',
          size: 'small',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Give instructions to each terminal',
          id: 'step-instructions',
        },
        {
          type: 'paragraph',
          text: 'Each terminal has its own context. You explain once what it needs to do and it gets to work. It doesn\'t mix anything with the others.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Watch them work',
          id: 'step-supervise',
        },
        {
          type: 'paragraph',
          text: 'As each terminal starts working, it will dynamically change its title to show you what it\'s working on at any moment. You can also see the current changes it\'s making.',
        },
        {
          type: 'image',
          alt: 'Terminal showing dynamic title and current changes in CodeAgentSwarm',
          src: '/images/guides/terminal-title-and-changes.png',
          caption: '1. The title changes based on what it\'s doing. 2. By clicking the button you can see the changes the terminal makes in real time in diff format so you don\'t lose context of what the AI is doing.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'practical-tips',
      title: 'Practical tips',
      content: [
        {
          type: 'list',
          items: [
            'You don\'t have to use all 6 terminals always - use what you need',
            'If a task is big, break it into subtasks and give each one to a terminal',
            'Close terminals that are done to keep the workspace clean',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Claude mix contexts between terminals?',
      answer: 'No. Each terminal is completely independent. What you tell one doesn\'t affect the others.',
    },
    {
      question: 'What if two terminals touch the same file?',
      answer: 'Claude handles conflicts automatically. We\'ve tested it a lot and it\'s very reliable. You don\'t have to do anything.',
    },
    {
      question: 'How many terminals can I use at once?',
      answer: 'Up to 6 in parallel. But you don\'t have to use them all - use what you need for your task.',
    },
    {
      question: 'Do I need a special Claude subscription?',
      answer: 'You need to have Claude Code active. CodeAgentSwarm works on top of your existing subscription.',
    },
    {
      question: 'Is it really faster than a single terminal?',
      answer: 'Yes, quite a bit. Especially when you have several independent things to do. Instead of waiting for one to finish before starting another, they all go at once.',
    },
  ],
}

export default guide
