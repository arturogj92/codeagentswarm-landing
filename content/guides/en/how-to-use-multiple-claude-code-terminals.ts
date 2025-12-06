import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'how-to-use-multiple-claude-code-terminals',
    locale: 'en',
    title: 'How to Use Multiple Claude Code Terminals (Without Losing Your Head)',
    metaTitle: 'How to Use Multiple Claude Code Terminals in Parallel (Human-Friendly Guide)',
    metaDescription: 'A relaxed, practical guide explaining how to work with multiple Claude Code terminals in parallel using CodeAgentSwarm—written in natural human language, not robotic.',
    intro: `If you've ever tried to keep several Claude Code sessions open at the same time, you already know how messy it gets. One tab here, another conversation there… and suddenly you're scrolling like crazy just to remember what you were doing.

I've been there. That's literally why CodeAgentSwarm exists — so you can work on several things at once without your brain melting.

This guide explains, in a simple, down-to-earth way, how to actually use multiple Claude Code terminals without getting lost or drowning in tabs.`,
    alternateSlug: 'como-usar-varios-terminales-claude-code',
  },
  sections: [
    {
      id: 'why-multiple-terminals',
      title: 'Why multiple terminals are actually a lifesaver',
      content: [
        {
          type: 'paragraph',
          text: 'There are days when you work in a straight line. And then there are days when you\'re juggling three, four, even six mini-tasks.',
        },
        {
          type: 'paragraph',
          text: 'Multiple terminals let you:',
        },
        {
          type: 'list',
          items: [
            'split your work cleanly',
            'keep each context totally separate',
            'jump between things without losing the thread',
            'let one terminal think while you do something useful in another',
          ],
        },
        {
          type: 'paragraph',
          text: 'It feels natural once you get used to it — like having a small team helping you out.',
        },
      ],
    },
    {
      id: 'what-this-solves',
      title: 'What this solves (in real life)',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '1. Every task has its own space',
          id: 'every-task-own-space',
        },
        {
          type: 'paragraph',
          text: 'One terminal → backend changes. Another → UI tweaks. Another → documentation. Another → testing.',
        },
        {
          type: 'paragraph',
          text: 'Your brain stops having to "reload context" every time.',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Claude doesn\'t mix anything',
          id: 'claude-doesnt-mix',
        },
        {
          type: 'paragraph',
          text: 'Each terminal has its own memory. No weird cross-talk, no "why is it talking about X when I\'m doing Y?".',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. You can see everything happening in real time',
          id: 'see-everything-realtime',
        },
        {
          type: 'image',
          alt: 'Grid view of 4 terminals working at the same time',
          src: '#',
          caption: 'Four terminals visible in a grid layout, each one doing something different.',
        },
        {
          type: 'paragraph',
          text: 'It\'s honestly satisfying to watch.',
        },
        {
          type: 'heading',
          level: 3,
          text: '4. You keep your focus',
          id: 'keep-your-focus',
        },
        {
          type: 'paragraph',
          text: 'Switching terminals takes one click. No tabs, no scrolling, no chaos.',
        },
      ],
    },
    {
      id: 'how-codeagentswarm-helps',
      title: 'How CodeAgentSwarm makes all this painless',
      content: [
        {
          type: 'paragraph',
          text: 'Here\'s what you get right out of the box:',
        },
        {
          type: 'list',
          items: [
            'Up to 6 terminals at once',
            'Each with its own full conversation history',
            'Real-time activity indicators so you know when something is happening',
            'Custom names so everything stays organized',
            'A workspace where you actually see everything',
          ],
        },
        {
          type: 'image',
          alt: 'Rename terminal popup',
          src: '#',
          caption: 'Simple modal to rename your terminals and keep things organized.',
        },
      ],
    },
    {
      id: 'realistic-example',
      title: 'A realistic example (this is what I do)',
      content: [
        {
          type: 'paragraph',
          text: 'When I\'m deep into a project, my setup usually looks like:',
        },
        {
          type: 'list',
          items: [
            '"API refactor" terminal',
            '"UI updates" terminal',
            '"Tests & coverage" terminal',
            '"Docs updates" terminal',
          ],
        },
        {
          type: 'paragraph',
          text: 'While one terminal is generating something, I work in another. Nothing mixes, nothing gets lost.',
        },
        {
          type: 'paragraph',
          text: 'It genuinely feels like having 4 little assistants.',
        },
      ],
    },
    {
      id: 'step-by-step',
      title: 'How to work like this (step by step)',
      content: [
        {
          type: 'heading',
          level: 3,
          text: '1. Open CodeAgentSwarm',
          id: 'step-open-app',
        },
        {
          type: 'paragraph',
          text: 'Open the app. It will either load your last workspace or show you a clean one.',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Create one terminal per task',
          id: 'step-create-terminals',
        },
        {
          type: 'paragraph',
          text: 'Avoid throwing everything into a single conversation. That\'s where confusion starts.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Give each terminal a simple, human name',
          id: 'step-name-terminals',
        },
        {
          type: 'paragraph',
          text: 'Something like:',
        },
        {
          type: 'list',
          items: [
            '"API cleanup"',
            '"Landing page"',
            '"Unit tests"',
            '"Docs"',
          ],
        },
        {
          type: 'image',
          alt: 'Terminal naming UI in context',
          src: '#',
          caption: 'Keep your terminal names short and clear.',
        },
        {
          type: 'paragraph',
          text: 'Future you will thank present you.',
        },
        {
          type: 'heading',
          level: 3,
          text: '4. Let each terminal keep its own context',
          id: 'step-context',
        },
        {
          type: 'paragraph',
          text: 'No need to re-explain everything all the time. Talk to each terminal as if it were a teammate in charge of that specific area.',
        },
        {
          type: 'heading',
          level: 3,
          text: '5. Jump between terminals freely',
          id: 'step-jump-freely',
        },
        {
          type: 'paragraph',
          text: 'Switch whenever you need to check progress, give new instructions, or review outputs. It becomes second nature very quickly.',
        },
        {
          type: 'heading',
          level: 3,
          text: '6. Watch progress live',
          id: 'step-watch-progress',
        },
        {
          type: 'paragraph',
          text: 'You can keep an eye on active terminals while working on another one. It\'s a nice feeling when you see several parts of your project moving forward at the same time.',
        },
      ],
    },
    {
      id: 'tips',
      title: 'Tips to make this even smoother',
      content: [
        {
          type: 'list',
          items: [
            'Break larger tasks into smaller ones and give each one a terminal',
            'Keep terminal names short and obvious',
            'Close terminals you\'re done with so the workspace stays clean',
            'Avoid mixing totally unrelated topics in the same terminal',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Claude mix contexts across terminals?',
      answer: 'No. Each terminal is completely independent.',
    },
    {
      question: 'Is this faster than one long conversation with everything inside?',
      answer: 'Yes. It\'s faster, clearer, and much less mentally draining.',
    },
    {
      question: 'Is this useful even for simple tasks?',
      answer: 'Definitely. Even small tasks feel nicer when they\'re not all stacked on top of each other.',
    },
  ],
}

export default guide
