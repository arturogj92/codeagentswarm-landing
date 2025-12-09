import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codeagentswarm-notifications',
    locale: 'en',
    title: 'How to Use CodeAgentSwarm Notifications to Stay in Focus with Claude Code',
    metaTitle: 'How to Use CodeAgentSwarm Notifications to Stay in Focus with Claude Code',
    metaDescription: 'Learn how to use CodeAgentSwarm notifications to know when Claude Code finishes or needs your attention, without having to constantly watch the terminal.',
    intro: `If you use Claude Code while you're working on other things, this will sound familiar:

You ask Claude to implement something relatively big, you can see it's going to take a few minutes, and you think: "in the meantime I'll check email / Slack / another repo".

By the time you come back, Claude has been waiting for your reply for 10 minutes. If you add that up across all your Claude Code interactions in a single day, you end up wasting a ridiculous amount of time.

Yes, Claude has its own notifications inside the terminal, but let's be honest: they don't work that well in real life.

With CodeAgentSwarm the idea is the opposite: You keep doing your thing and the app is the one that tells you when Claude has finished or needs something from you.

In this guide I'll show you how CodeAgentSwarm notifications work and how to use them so you don't lose focus while working with Claude Code.`,
    introVideo: '/terminal-notifications.mp4',
    ctaText: 'Enable CodeAgentSwarm notifications and stop watching the terminal. The app will let you know when Claude finishes or needs your attention.',
    alternateSlug: 'notificaciones-codeagentswarm',
  },
  sections: [
    {
      id: 'the-real-problem',
      title: 'The real problem: waiting for the AI without knowing when it\'s done',
      content: [
        {
          type: 'paragraph',
          text: 'Working with Claude Code "raw" usually looks like this:',
        },
        {
          type: 'list',
          items: [
            'You ask for a big implementation or a serious refactor.',
            'The model takes several minutes to process it.',
            'You change context: open another tab, review some code, check an incident, whatever.',
            'When you go back to the terminal, you realise Claude had finished a while ago... and you had no idea.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If that happens once, fine. But when you repeat it many times a day, it turns into:',
        },
        {
          type: 'list',
          items: [
            'Accumulated dead time',
            'Constant micro-interruptions',
            'That feeling of "I\'m not really getting the most out of this AI"',
          ],
        },
        {
          type: 'paragraph',
          text: 'And if you also do divide & conquer - several Claude Code terminals in parallel, each one with a different task, and you jumping between projects... without a decent notification system it\'s just a matter of time before you lose the thread.',
        },
        {
          type: 'paragraph',
          text: 'The question is simple: who is in control here? Are you controlling the AI, or is the AI working and the app tells you when you\'re needed?',
        },
      ],
    },
    {
      id: 'what-notifications-do',
      title: 'What CodeAgentSwarm notifications actually do',
      content: [
        {
          type: 'paragraph',
          text: 'The app notifies you at the moments that really matter:',
        },
        {
          type: 'heading',
          level: 3,
          text: 'When Claude finishes the task you asked for',
          id: 'when-claude-finishes',
        },
        {
          type: 'list',
          items: [
            'It implements a feature.',
            'It completes a refactor.',
            'It prepares some tests.',
            'It finishes the part you had assigned to that terminal.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'When Claude is waiting for something from you',
          id: 'when-claude-waits',
        },
        {
          type: 'list',
          items: [
            'It needs a confirmation to continue.',
            'It asks you to choose between options.',
            'It needs more context or data before going on.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Instead of having to constantly watch the terminal, CodeAgentSwarm tells you clearly: "Hey, this terminal has finished" or "This terminal is waiting for your decision".',
        },
      ],
    },
    {
      id: 'see-terminal-status',
      title: 'Seeing multiple terminals\' status at a glance',
      content: [
        {
          type: 'paragraph',
          text: 'On top of notifications, CodeAgentSwarm also shows the status of your terminals visually.',
        },
        {
          type: 'paragraph',
          text: 'The idea is that you can glance at the app for one second and know:',
        },
        {
          type: 'list',
          items: [
            'Which terminals are still working',
            'Which ones have already finished',
            'Which ones are blocked waiting for you',
          ],
        },
        {
          type: 'paragraph',
          text: 'For example:',
        },
        {
          type: 'list',
          items: [
            '"Notifications backend" terminal in finished state.',
            '"UI Panel" terminal still generating code.',
            '"Tests" terminal waiting for your confirmation before applying changes.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Each state is reflected with clear colours and statuses in the terminal UI, so you don\'t have to guess what\'s going on.',
        },
        {
          type: 'image',
          alt: 'Several terminals with different colours and statuses (running, finished, waiting) showing how you can quickly spot which one has completed a specific task',
          src: '/images/guides/terminal-status-indicators.png',
          caption: 'Colours and statuses let you see at a glance what\'s happening in each terminal.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'how-to-enable-notifications',
      title: 'How to enable notifications in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'For all of this to actually help in your day-to-day work, you first need notifications properly enabled.',
        },
        {
          type: 'paragraph',
          text: 'The flow should look something like this:',
        },
        {
          type: 'list',
          items: [
            'Open CodeAgentSwarm and log in as usual.',
            'Go to the app settings / configuration section.',
            'Find the notifications section.',
            'Enable the options to: receive notifications when a terminal finishes a task, and receive notifications when a terminal is waiting for something from you.',
          ],
        },
        {
          type: 'paragraph',
          text: 'On some systems you might also need to grant permission to the operating system itself so it can show desktop notifications. If the app asks for it, allow it so the alerts can appear while you\'re working in other windows.',
        },
        {
          type: 'image',
          alt: 'Notifications settings section in CodeAgentSwarm showing how to toggle notifications on',
          src: '/images/guides/enable-notifications-settings.jpg',
          caption: 'Enable notifications from the app settings.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm notifications are not there "just because it\'s nice to have them". They\'re there to prevent exactly what happens when you work with Claude Code with no control: dead time, forgotten tabs and answers that arrive too late.',
        },
        {
          type: 'paragraph',
          text: 'Once you have them properly configured:',
        },
        {
          type: 'list',
          items: [
            'You can safely ask Claude for bigger tasks without worrying you\'ll forget about them',
            'You can use multiple terminals in parallel without losing the thread',
            'And you can keep doing your own work knowing that, if something happens, you\'ll hear about it',
          ],
        },
        {
          type: 'paragraph',
          text: 'The AI handles the heavy lifting in the background. CodeAgentSwarm lets you know exactly when it needs you back. You just decide what the next step is.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Do notifications work even if the app is minimised?',
      answer: 'Yes. Desktop notifications appear even if the app is minimised or you\'re in another window, as long as you\'ve granted the necessary permissions to the operating system.',
    },
    {
      question: 'Can I disable notifications if I don\'t want them?',
      answer: 'Yes. You can enable or disable notifications anytime from the app settings.',
    },
    {
      question: 'Do notifications work with multiple terminals at once?',
      answer: 'Yes. Each terminal sends its own notifications independently, so you know exactly which one has finished or which one needs you.',
    },
    {
      question: 'What happens when I click on a notification?',
      answer: 'It takes you directly to the terminal that generated it. You don\'t have to search for it - the app positions you automatically.',
    },
  ],
}

export default guide
