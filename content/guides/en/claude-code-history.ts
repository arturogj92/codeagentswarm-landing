import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-history',
    locale: 'en',
    title: 'How to Use Claude Code History to Recover Context and Save Time',
    metaTitle: 'How to Use Claude Code History in CodeAgentSwarm to Recover Context and Save Time',
    metaDescription: 'Learn how to use Claude Code history in CodeAgentSwarm to search past conversations, recover context in seconds, and avoid repeating the same explanations.',
    intro: `In CodeAgentSwarm, every time you work with a Claude Code terminal, the system automatically stores everything: what you write, what Claude replies, which project you were working in, and when it happened.

Together, that becomes your Claude Code conversation history. It is your long term memory of what you have been building with the AI, organized and ready to search or resume whenever you need it.

In short: Everything you talk about with Claude Code stays stored, organized by project, and ready to search or resume later.`,
    alternateSlug: 'historial-claude-code',
  },
  sections: [
    {
      id: 'why-history-matters',
      title: 'Why history is so important',
      content: [
        {
          type: 'paragraph',
          text: 'Claude is not just a chat that spits out answers. When you keep using the same conversation for a specific part of your system, that thread accumulates:',
        },
        {
          type: 'list',
          items: [
            'Design decisions',
            'Explanations you already gave',
            'Functional context',
            'Domain details you do not want to repeat',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you lose that conversation, you have to explain the module again from scratch, rework previous logic, and risk taking different decisions without noticing.',
        },
        {
          type: 'paragraph',
          text: 'With CodeAgentSwarm history, you can go back to those conversations and keep building on top of what you already did instead of restarting every time.',
        },
      ],
    },
    {
      id: 'how-history-is-organized',
      title: 'How history is organized by project and date',
      content: [
        {
          type: 'paragraph',
          text: 'To avoid a giant flat list of chats, history is organized like this:',
        },
        {
          type: 'list',
          items: [
            'By project',
            'By date, with the most recent first',
            'By conversation chain, grouping continuations together',
            'With colors per project so you can recognize them quickly',
          ],
        },
        {
          type: 'image',
          alt: 'Overview of Claude Code history showing list of conversations with project colors and dates visible',
          src: '/images/guides/conversation-history.png',
          caption: 'History view with conversations organized by project and date.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'how-to-access-history',
      title: 'How to open history from any terminal',
      content: [
        {
          type: 'paragraph',
          text: 'No matter which terminal you are in, history is always one click away:',
        },
        {
          type: 'list',
          items: [
            'In any Claude Code terminal, click the "History" button.',
            'A modal opens with your recent conversations.',
            'From there you can search, filter and open conversations.',
          ],
        },
        {
          type: 'image',
          alt: 'History modal open from a terminal with search bar at the top and list of conversations below',
          src: '/images/guides/conversation-history-button.png',
          caption: 'The History modal gives you quick access to all your past conversations.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'searching-past-conversations',
      title: 'How to search past conversations by text and project',
      content: [
        {
          type: 'paragraph',
          text: 'The history search does not only look at titles. It can search inside the content of your conversations.',
        },
        {
          type: 'paragraph',
          text: 'You can search by:',
        },
        {
          type: 'list',
          items: [
            'Things you wrote - like "Add dark mode" or "Fix auth bug"',
            'Functional concepts - like "authentication" or "database migration"',
            'Domain specific module names - like "MCP Marketplace"',
            'And you can filter by project if you work on several at once',
          ],
        },
      ],
    },
    {
      id: 'real-example-mcp-marketplace',
      title: 'Real example: searching for MCP Marketplace conversations',
      content: [
        {
          type: 'paragraph',
          text: 'In my case, in the project at work we have a part of the system called MCP Marketplace.',
        },
        {
          type: 'paragraph',
          text: 'It is a fairly complex area of the code: integrations, business rules, data models. Not something you want to explain from scratch to Claude every week.',
        },
        {
          type: 'paragraph',
          text: 'Instead of opening a brand new chat and rewriting the whole story, the ideal flow is:',
        },
        {
          type: 'list',
          items: [
            'Open history from a terminal.',
            'Search for "MCP Marketplace".',
            'See all the conversations where you already worked on that module.',
            'Open the conversation that makes the most sense.',
            'Keep working from there.',
          ],
        },
        {
          type: 'image',
          alt: 'Search results for MCP Marketplace showing multiple conversations with title, project and date',
          src: '/images/guides/mcp-marketplace-search.png',
          caption: 'Finding past work is as simple as searching for the module name.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'resuming-old-conversations',
      title: 'How to resume an old conversation in a new terminal',
      content: [
        {
          type: 'list',
          items: [
            'You find the conversation you want in history.',
            'You click to open it.',
            'CodeAgentSwarm opens a new terminal with all the previous context loaded.',
            'Claude remembers what you decided and what you built in that conversation.',
            'You keep working as if no time had passed.',
          ],
        },
        {
          type: 'image',
          alt: 'Old conversation opened in a new terminal with previous messages visible and input ready to continue',
          src: '/images/guides/resume-conversation.png',
          caption: 'Resume any conversation exactly where you left off.',
          size: 'medium',
        },
      ],
    },
    {
      id: 'real-benefits',
      title: 'Real benefits of using history properly',
      content: [
        {
          type: 'paragraph',
          text: 'Using Claude Code history like this has a direct impact on your everyday work:',
        },
        {
          type: 'list',
          items: [
            'You never lose context on important parts of the system',
            'You stop re-explaining the same modules to Claude every week',
            'Architecture decisions stay consistent over time',
            'Handling multiple projects at once becomes much more manageable',
            'The time you spend "bringing the AI up to speed" drops a lot',
            'You save tokens by not having to repeat context that already exists in previous conversations',
          ],
        },
      ],
    },
    {
      id: 'typical-use-cases',
      title: 'Typical use cases',
      content: [
        {
          type: 'paragraph',
          text: 'Some classic scenarios where Claude Code history shines:',
        },
        {
          type: 'list',
          items: [
            '"How did we fix that auth bug three days ago?" - Search "auth" and see exactly what you did.',
            '"I want to continue what I was doing yesterday." - Open History, pick the latest relevant conversation and continue.',
          ],
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'Claude Code history in CodeAgentSwarm is not just a pile of old chats. It is your living memory of how you have been building your projects with AI.',
        },
        {
          type: 'paragraph',
          text: 'Next time you have to work on some functionality, instead of explaining everything to Claude from scratch, use the conversation history and pick up where you left off.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Do I have to manually mark what gets stored?',
      answer: 'No. CodeAgentSwarm automatically stores your Claude Code conversations, associated with project, date and conversation chain.',
    },
    {
      question: 'Can I search by things Claude wrote, not just what I wrote?',
      answer: 'Yes. The search engine looks at the full content of the conversation.',
    },
    {
      question: 'What if I work on many projects at once?',
      answer: 'Even better. History is organized by project, so it is easy to see what belongs where.',
    },
    {
      question: 'Does history disappear if I close the app?',
      answer: 'No. It is persistent. Close the app, shut down your laptop, come back tomorrow. Everything will still be there.',
    },
  ],
}

export default guide
