import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'control-claude-code-from-phone',
    locale: 'en',
    title: 'How to Control Claude Code From Your Phone',
    metaTitle: 'Control Claude Code From Your Phone: 2 Ways That Work (2026)',
    metaDescription: 'Control Claude Code from your phone with Anthropic Remote Control or the CodeAgentSwarm app. Setup steps, requirements and what each one can do.',
    intro: `You start a long task in Claude Code, then you need to leave the desk. The work does not have to stop. There are two ways to keep driving that session from your phone while Claude Code keeps running on your own computer, with your files, tools and MCP servers.\n\nThe first is Remote Control, built into Claude Code by Anthropic. The second is the CodeAgentSwarm phone app, which pairs with the CodeAgentSwarm desktop app and also covers Codex and the other agents you run there. This guide shows the setup for both and when each one fits.`,
    ctaText: 'Pair your phone with CodeAgentSwarm once and follow every Claude Code Chat session from the App Store app, the Android beta or the web app.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Phone'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'controlar-claude-code-desde-el-movil',
    relatedSlug: 'claude-code-mobile-app',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'The short answer',
      content: [
        {
          type: 'paragraph',
          text: 'In both options the phone is a remote. Claude Code keeps running on your computer, so the computer has to stay on and awake. Pick by where you already work:',
        },
        {
          type: 'list',
          items: [
            '<strong>Remote Control</strong>: you run Claude Code in a terminal and have a Pro, Max, Ultra, Team or Enterprise plan. You drive the session from the Code tab of the Claude app.',
            '<strong>CodeAgentSwarm phone app</strong>: you run several agents in CodeAgentSwarm (Claude Code, Codex, OpenCode and others) and want all of them on the phone, in one list.',
          ],
        },
      ],
    },
    {
      id: 'remote-control',
      title: 'Option 1: Claude Code Remote Control',
      content: [
        {
          type: 'paragraph',
          text: `Anthropic's <a href="https://code.claude.com/docs/en/remote-control" ${EXT}>Remote Control</a> connects the Claude app for iOS and Android, or claude.ai/code in a browser, to a Claude Code session on your machine. Code execution and file access stay local.`,
        },
        { type: 'heading', level: 3, id: 'remote-control-requirements', text: 'Requirements' },
        {
          type: 'list',
          items: [
            'A Pro, Max, Ultra, Team or Enterprise plan. API keys are not supported.',
            'On Team and Enterprise, an Owner must first turn on Remote Control in the Claude Code admin settings.',
            'Claude Code signed in through claude.ai (run <code>/login</code> if you have not).',
          ],
        },
        { type: 'heading', level: 3, id: 'remote-control-start', text: 'Start a session' },
        {
          type: 'paragraph',
          text: 'Run one of these on your computer. The first starts a server that can host several sessions; the second starts a normal interactive session with Remote Control on; the slash command turns it on in a session you already have open.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude remote-control\n\n# or an interactive session with Remote Control on\nclaude --remote-control\n\n# or, inside a running session\n/remote-control',
        },
        {
          type: 'paragraph',
          text: 'Then scan the QR code the terminal shows, or open the Claude app, tap <strong>Code</strong> and pick the session from the list.',
        },
        { type: 'heading', level: 3, id: 'remote-control-limits', text: 'Limits worth knowing' },
        {
          type: 'list',
          items: [
            'If you close the terminal or stop the <code>claude</code> process, the session goes offline.',
            'Outside server mode, each Claude Code process supports one remote session at a time.',
            'From the phone you can pick Manual, Accept edits, Plan or Auto permission modes, but not Bypass permissions.',
            'Terminal-only commands such as <code>/plugin</code> and <code>/resume</code> do not work from the app.',
          ],
        },
      ],
    },
    {
      id: 'codeagentswarm-app',
      title: 'Option 2: the CodeAgentSwarm phone app',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for macOS, Windows and Linux that runs your coding agents side by side. Its phone app pairs with that desktop app, so every session you have open there in Chat view shows up on the phone. Claude Code still runs on your computer with the login it already has.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm phone app, demo mode: Chat sessions grouped by project with their status',
          src: '/images/guides/phone-app-demo-sessions.webp',
          caption: 'CodeAgentSwarm phone app in demo mode, with sample data. Your Chat sessions, grouped by project.',
          size: 'small',
        },
        { type: 'heading', level: 3, id: 'get-the-app', text: 'Get the app' },
        {
          type: 'list',
          items: [
            `iPhone and Apple Watch: <a href="https://apps.apple.com/app/codeagentswarm/id6801180696" ${EXT}>CodeAgentSwarm on the App Store</a>.`,
            `Android: in beta. Request access in the <a href="https://discord.com/channels/1444798143672750164/1540046825938096140" ${EXT}>#mobile-relay-beta channel on Discord</a>.`,
            `Any other device: the web app at <a href="https://web.codeagentswarm.com" ${EXT}>web.codeagentswarm.com</a>.`,
          ],
        },
        { type: 'heading', level: 3, id: 'pair-phone', text: 'Pair your phone (once)' },
        {
          type: 'list',
          items: [
            'Open CodeAgentSwarm on your computer and sign in.',
            'Open the account menu and choose <strong>Connect a device</strong>. A QR code and a one-time code appear.',
            'Scan the QR code with the phone. In a browser, open the web app and type the one-time code instead.',
            'Check that the same verification code shows on both devices, then accept the phone on the computer.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'In the same window, turn on <strong>Keep this computer available</strong>. It stops the computer from going to sleep while CodeAgentSwarm is open, so the phone can still reach it. The screen can still lock.',
        },
      ],
    },
    {
      id: 'what-you-can-do',
      title: 'What you can do from the phone',
      content: [
        {
          type: 'paragraph',
          text: 'Once paired, the phone shows your Chat sessions grouped by project, with the status of each one. From there you can:',
        },
        {
          type: 'list',
          items: [
            'Open a session, read what Claude Code did and send the next message.',
            'Answer a question or an approval the agent is waiting on.',
            'Start a new session with Claude Code, Codex or another agent in one of the projects on your computer.',
            'Attach photos from the camera or gallery, draw on them before sending, or attach files.',
            'Dictate a message: the voice note is turned into text you can edit before sending.',
            'Get a notification on iPhone or Android when a session needs you, and tap it to open that conversation.',
          ],
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm phone app, demo mode: a Codex reply and a question waiting for an answer',
          src: '/images/guides/phone-app-demo-chat.webp',
          caption: 'Demo mode, sample data: read the reply and answer the question the agent is waiting on.',
          size: 'small',
        },
        {
          type: 'callout',
          variant: 'info',
          content: '<strong>Chat sessions only.</strong> The phone shows the sessions you run in Chat view in CodeAgentSwarm. A session switched to the Terminal (CLI) view is not reachable from the phone until you switch it back to Chat on the computer. Sessions you start from the phone open as Chats.',
        },
        {
          type: 'paragraph',
          text: `The phone is useful for the moments when an agent stops to ask something. On the computer, <a href="/en/guides/codeagentswarm-notifications" ${A}>CodeAgentSwarm notifications</a> do the same job while you are at the desk.`,
        },
      ],
    },
    {
      id: 'which-one',
      title: 'Which one should you use?',
      content: [
        {
          type: 'table',
          headers: ['', 'Remote Control', 'CodeAgentSwarm phone app'],
          rows: [
            ['Phone app', 'Claude app (Code tab)', 'CodeAgentSwarm for iPhone, Android beta, web'],
            ['Agents', 'Claude Code', 'Claude Code, Codex, OpenCode and the other agents in CodeAgentSwarm'],
            ['Where the agent runs', 'Your computer', 'Your computer'],
            ['Account', 'claude.ai plan (no API keys)', 'CodeAgentSwarm account; each agent uses its own login'],
            ['Several sessions', 'Server mode, or one per process', 'Every open Chat session, across projects'],
          ],
        },
        {
          type: 'paragraph',
          text: `If you only use Claude Code in a terminal, Remote Control is already in your hands. If you run several sessions or several agents at once, the CodeAgentSwarm app keeps them in one list. For more on the phone options around Claude Code, including cloud sessions, see <a href="/en/guides/claude-code-mobile-app" ${A}>Claude Code mobile app: what exists</a>.`,
        },
      ],
    },
    {
      id: 'security',
      title: 'Is it safe?',
      content: [
        {
          type: 'paragraph',
          text: 'With CodeAgentSwarm, the phone and the computer talk through a relay with end-to-end encryption. The relay moves the messages but cannot read your conversations, commands or approvals. You do not need to open a port on your router or be on the same Wi-Fi.',
        },
        {
          type: 'paragraph',
          text: 'Every new phone needs your approval on the computer, and you can disconnect a phone from the same window at any time.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Can I control Claude Code from my phone?',
      answer: 'Yes. Use Remote Control in the Claude app (run claude remote-control on your computer and open the Code tab), or pair the CodeAgentSwarm phone app with CodeAgentSwarm on your computer. In both cases Claude Code keeps running on your computer.',
    },
    {
      question: 'Does my computer have to stay on?',
      answer: 'Yes. The phone only sends messages to the session. If the computer sleeps or the session stops, the phone cannot reach it. CodeAgentSwarm has a Keep this computer available switch that prevents sleep while the app is open.',
    },
    {
      question: 'Does Remote Control work with an API key?',
      answer: 'No. Anthropic documents Remote Control for Pro, Max, Ultra, Team and Enterprise plans, and API keys are not supported.',
    },
    {
      question: 'Is there an Android version of the CodeAgentSwarm app?',
      answer: 'Yes, in beta. Request access in the #mobile-relay-beta channel on the CodeAgentSwarm Discord. You can also use the web app at web.codeagentswarm.com from any browser.',
    },
    {
      question: 'Can I control Codex from the phone too?',
      answer: 'With CodeAgentSwarm, yes: Codex Chat sessions show up next to Claude Code ones. See the Codex mobile app guide for the options OpenAI offers.',
    },
  ],
}

export default guide
