import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'run-multiple-claude-chats',
    locale: 'en',
    title: 'Can You Run Multiple Claude Chats at Once?',
    metaTitle: 'Can You Run Multiple Claude Chats at Once? Yes, Here Is How (2026)',
    metaDescription: 'Yes, you can run multiple Claude chats at the same time. On claude.ai use separate browser tabs or Projects. With Claude Code in the terminal, each session is its own process you can run in parallel.',
    intro: `Yes, you can run multiple Claude chats at once, and there are two different ways depending on what you mean. If you mean the claude.ai web app, you can open several conversations at the same time in separate browser tabs, and Projects let you keep each chat organized around its own files and context. If you mean Claude Code in your terminal, each session is an independent process, so you can run several in parallel on the same machine, with no special plan needed.

These are two separate questions that share the same search, so this guide answers both. The web app section is short because the answer is simple: open more tabs. The terminal section goes deeper, because running several Claude Code sessions in parallel is where it gets genuinely useful, and where a tool like CodeAgentSwarm makes the difference.

Pick the path that matches what you are trying to do. If you are chatting in the browser, read the next section. If you are coding in the terminal, jump to the developer section below.`,
    ctaText: 'Run up to six Claude Code sessions in parallel in one CodeAgentSwarm workspace, with notifications, searchable history and live diffs so nothing gets lost.',
    highlightedWords: ['multiple Claude chats', 'at once'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'varios-chats-de-claude-a-la-vez',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'Short answer: yes, both ways',
      content: [
        {
          type: 'image',
          alt: 'Two CodeAgentSwarm terminals running side by side, one of them a Claude Code session, with the SELECT AI AGENT picker open',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'Two terminals at once in CodeAgentSwarm, one running a Claude Code session, with the per-terminal agent picker open.',
        },
        {
          type: 'paragraph',
          text: 'There are two things people mean by "running multiple Claude chats at once", and both are possible.',
        },
        {
          type: 'list',
          items: [
            '<strong>The claude.ai web app:</strong> open multiple conversations in separate browser tabs, or use Projects to keep each chat tied to its own files and instructions. Each conversation is independent.',
            '<strong>Claude Code in the terminal:</strong> each session is its own process with its own conversation and context, so you can run several side by side on one machine and have them work in parallel.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'There is no special "multi-chat" plan and no extra cost for running conversations in parallel. Whether in the browser or the terminal, you are using the same Claude subscription from more than one place.',
        },
        {
          type: 'paragraph',
          text: 'The rest of this page splits by audience. If you are working in the browser, the next section is for you. If you are coding in the terminal, skip ahead to the developer section, where parallel sessions actually start to pay off.',
        },
      ],
    },
    {
      id: 'web-app',
      title: 'If you mean the claude.ai web app',
      content: [
        {
          type: 'paragraph',
          text: 'On <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">claude.ai</a>, every conversation is independent, so running several at once is just a matter of opening more of them.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use separate browser tabs',
          id: 'separate-tabs',
        },
        {
          type: 'paragraph',
          text: 'The simplest way is to open claude.ai in a second tab and start a new chat there. Each tab holds its own conversation with its own context, and they do not share memory. You can have one tab drafting an email while another helps you plan a trip, switching between them like any other browser tabs.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Use Projects to keep chats organized',
          id: 'projects',
        },
        {
          type: 'paragraph',
          text: 'If you keep coming back to the same topic, Projects are a better fit than loose tabs. A Project groups related conversations and lets you attach files and custom instructions that every chat in that Project can see. You can run several Projects at once, each its own workspace, so a chat about your finances does not bleed into a chat about your novel.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'One thing to know: separate conversations do not share context. If you want two chats to know the same background, you either repeat the context in each one or put the shared material in a Project so every chat inside it can see it.',
        },
        {
          type: 'paragraph',
          text: 'That is really all there is to the web app. Multiple chats at once means multiple tabs or multiple Projects. If that answers your question, you are done. If you are actually here about coding in the terminal, keep reading.',
        },
      ],
    },
    {
      id: 'developer',
      title: 'If you mean Claude Code in the terminal',
      content: [
        {
          type: 'paragraph',
          text: 'This is where parallel sessions get genuinely powerful. <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a> is the command-line coding agent, and each session you start with <code>claude</code> is its own independent process. It has its own conversation thread, its own context window, and its own working state. Nothing is shared between sessions.',
        },
        {
          type: 'paragraph',
          text: 'That means you can open a second terminal, run <code>claude</code> again, and now have two completely separate Claude Code sessions running at the same time. One can refactor your auth module while the other writes tests for your API layer. They do not know about each other, and that is exactly what makes parallel work possible.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Terminal tab 1\ncd ~/my-project\nclaude\n\n# Terminal tab 2 (a second, independent session)\ncd ~/my-project\nclaude',
        },
        {
          type: 'paragraph',
          text: 'For just two sessions, plain terminal tabs work fine. The friction shows up once you run three or more: you lose track of which tab is doing what, you have to click into each one to check progress, there are no notifications when a session finishes or needs input, and overlapping edits to the same file can catch you off guard. The full breakdown of the free options versus a dedicated tool is in the <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">multiple Claude Code sessions guide</a>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Where CodeAgentSwarm fits',
          id: 'codeagentswarm',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app built specifically for running parallel AI coding sessions with real visibility. It gives you up to six terminals in one workspace, and it runs on top of your existing subscription, so it is not a model provider. Here is what it adds over a pile of terminal tabs.',
        },
        {
          type: 'list',
          items: [
            '<strong>Up to 6 terminals in parallel:</strong> run several Claude Code sessions at once, and pick a different agent per terminal if you want to mix in Codex CLI or Gemini CLI.',
            '<strong>Dynamic titles:</strong> each terminal shows what its session is doing right now, like "Refactoring Auth" or "Writing API Tests", instead of six identical tabs.',
            '<strong>Desktop notifications:</strong> when a session finishes or stops to ask you something, you get a native notification, so you can focus on one terminal and let the rest call you.',
            '<strong>Searchable history:</strong> every conversation across all terminals is saved and searchable, so you can trace what a session did yesterday or resume it later.',
            '<strong>Live file diffs:</strong> watch the changes each session is making in real time, per terminal and at project level, so overlapping edits are visible before they become a merge problem.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Because every conversation is saved, you can step away from a session and pick it back up later, or go digging through what an earlier chat actually did. The <a href="/en/guides/claude-code-history" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history guide</a> goes deeper on how that history works across parallel sessions. And if you want to run a mixed setup with Claude Code, Codex and Gemini together rather than just multiple Claude Code sessions, the <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm guide</a> covers that cross-vendor workflow in detail.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'When two sessions touch the same file, the second save hits a Git conflict and Claude Code usually resolves it on its own. The live diffs in CodeAgentSwarm let you see overlapping edits early, before they turn into manual cleanup.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can you run multiple Claude chats at once?',
      answer: 'Yes. In the claude.ai web app you can open multiple conversations in separate browser tabs, or use Projects to keep each chat organized around its own files. With Claude Code in the terminal, each session is an independent process, so you can run several in parallel on the same machine.',
    },
    {
      question: 'Can I run two Claude chats at once?',
      answer: 'Yes. In the browser, open claude.ai in a second tab and start a new conversation, and you have two independent chats. In the terminal, open a second terminal and run claude again to get a second independent Claude Code session.',
    },
    {
      question: 'Can I have multiple Claude conversations at once?',
      answer: 'Yes. On claude.ai every conversation is independent, so multiple tabs or multiple Projects give you as many parallel conversations as you want. Note that separate conversations do not share context unless you put shared material in a Project.',
    },
    {
      question: 'How do I run Claude in parallel for coding?',
      answer: 'Open more than one terminal and run claude in each. Each Claude Code session is its own process with its own context, so they run in parallel without interfering. CodeAgentSwarm makes this easier by giving you up to six terminals in one workspace, with notifications, searchable history and live file diffs.',
    },
    {
      question: 'Can Claude run multiple chats at the same time?',
      answer: 'Yes. Whether you mean browser conversations or terminal sessions, Claude handles each one independently. There is no special multi-chat plan and no extra cost for running them in parallel, you are just using the same subscription from more than one place.',
    },
    {
      question: 'Do separate Claude chats share memory or context?',
      answer: 'No. Each conversation on claude.ai is independent and does not see what other chats discussed, and each Claude Code session in the terminal has its own context window. If you need shared context in the web app, use a Project so every chat inside it can see the same files and instructions.',
    },
  ],
}

export default guide
