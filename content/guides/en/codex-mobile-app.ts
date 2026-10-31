import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'codex-mobile-app',
    locale: 'en',
    title: 'Codex Mobile App: How to Use OpenAI Codex From Your Phone',
    metaTitle: 'Codex Mobile App: Use OpenAI Codex From Your Phone (2026)',
    metaDescription: 'What OpenAI offers for Codex on mobile in the ChatGPT app, what it needs, and how to reach Codex CLI sessions on your own computer from your phone.',
    intro: `OpenAI does not ship a standalone Codex app for phones. Codex on mobile lives inside the ChatGPT app for iOS and Android, and it connects to Codex Cloud or to a Mac or Windows PC running the ChatGPT desktop app.\n\nThat covers a lot of people. It does not cover the Codex CLI you run in a terminal: OpenAI's docs say mobile setup cannot be started from the CLI or the IDE extension. This guide explains the official option first, then how the CodeAgentSwarm phone app reaches Codex CLI sessions running on your own computer.`,
    ctaText: 'Run Codex CLI in CodeAgentSwarm on macOS, Windows or Linux and follow every Codex session from the CodeAgentSwarm phone app.',
    ctaAgent: 'codex',
    highlightedWords: ['Codex', 'Mobile App'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'app-movil-codex',
    relatedSlug: 'codex-gui',
  },
  sections: [
    {
      id: 'official-option',
      title: "What OpenAI offers: Codex in the ChatGPT app",
      content: [
        {
          type: 'paragraph',
          text: `According to OpenAI's <a href="https://learn.chatgpt.com/docs/mobile" ${EXT}>Codex on mobile</a> page, you use the ChatGPT mobile app to start tasks, follow progress, send new instructions, approve or deny commands, and review changed files, diffs and test results. The tasks run in Codex Cloud or on a connected computer.`,
        },
        { type: 'heading', level: 3, id: 'official-setup', text: 'How to set it up' },
        {
          type: 'list',
          items: [
            'On your Mac or PC, open the ChatGPT desktop app and go to <strong>Settings</strong> > <strong>Connections</strong> > <strong>Control this Mac or PC</strong>.',
            'Scan the QR code with your phone, sign in to the same ChatGPT account and workspace, and approve the connection.',
            'In the ChatGPT app, open <strong>Codex</strong>, choose your computer and start or continue a task.',
          ],
        },
        { type: 'heading', level: 3, id: 'official-requirements', text: 'Requirements and limits' },
        {
          type: 'list',
          items: [
            'Codex access in your ChatGPT account and workspace, and the latest ChatGPT mobile app.',
            'The computer must run the ChatGPT desktop app on macOS or Windows and stay awake, online and signed in to the same account.',
            'If you use Codex through a workspace, your admin may need to enable Remote Control access. Availability depends on rollout and workspace settings.',
            `OpenAI's <a href="https://learn.chatgpt.com/docs/remote-connections" ${EXT}>Remote connections</a> page says you cannot set this up from the Codex CLI or the IDE extension, and it does not list Linux as a host.`,
          ],
        },
      ],
    },
    {
      id: 'cli-gap',
      title: 'If you run Codex CLI in a terminal',
      content: [
        {
          type: 'paragraph',
          text: 'Plenty of developers use Codex as a CLI, often next to Claude Code, and sometimes on Linux. For that setup the official mobile option does not apply, because it pairs the phone with the ChatGPT desktop app, not with the <code>codex</code> command.',
        },
        {
          type: 'paragraph',
          text: `CodeAgentSwarm fills that gap. It is a desktop app for macOS, Windows and Linux where you run Codex CLI, Claude Code and other agents side by side (see <a href="/en/guides/codex-gui" ${A}>Codex GUI</a>). Its phone app pairs with CodeAgentSwarm, so your Codex sessions on that computer show up on the phone.`,
        },
      ],
    },
    {
      id: 'codeagentswarm-app',
      title: 'Use Codex from the CodeAgentSwarm phone app',
      content: [
        {
          type: 'image',
          alt: 'CodeAgentSwarm for iPhone and Apple Watch on the App Store',
          src: '/og-app-store.png',
          caption: 'CodeAgentSwarm for iPhone and Apple Watch. Android is in beta and there is a web app.',
          size: 'medium',
        },
        { type: 'heading', level: 3, id: 'cas-setup', text: 'Setup' },
        {
          type: 'list',
          items: [
            `Install the phone app: <a href="https://apps.apple.com/app/codeagentswarm/id6801180696" ${EXT}>App Store</a> for iPhone, the Android beta (request it in the <a href="https://discord.com/channels/1444798143672750164/1540046825938096140" ${EXT}>#mobile-relay-beta Discord channel</a>) or the web app at <a href="https://web.codeagentswarm.com" ${EXT}>web.codeagentswarm.com</a>.`,
            'In CodeAgentSwarm on your computer, sign in, open the account menu and choose <strong>Connect a device</strong>.',
            'Scan the QR code (or type the one-time code in the web app), check that the verification code matches on both devices and accept the phone on the computer.',
          ],
        },
        { type: 'heading', level: 3, id: 'cas-what', text: 'What you can do' },
        {
          type: 'list',
          items: [
            'See every Codex session with its status, next to your Claude Code and other agent sessions.',
            'Reply, answer questions and approvals, and start a new Codex session in one of your projects.',
            'Attach photos and files, or dictate a voice note that becomes editable text.',
            'Get a notification on iPhone or Android when a session needs you.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Codex keeps running on your computer with the login it already has. The phone and the computer talk through an end-to-end encrypted relay, so the relay cannot read your conversations.',
        },
      ],
    },
    {
      id: 'compare',
      title: 'Side by side',
      content: [
        {
          type: 'table',
          headers: ['', 'Codex in the ChatGPT app', 'CodeAgentSwarm phone app'],
          rows: [
            ['Desktop side', 'ChatGPT desktop app (macOS, Windows) or Codex Cloud', 'CodeAgentSwarm (macOS, Windows, Linux)'],
            ['Codex CLI in a terminal', 'Not a supported setup', 'Yes'],
            ['Other agents', 'Codex', 'Codex, Claude Code, OpenCode and the other agents in CodeAgentSwarm'],
            ['Work with the computer off', 'Yes, with Codex Cloud', 'No, the computer must be on'],
          ],
        },
        {
          type: 'paragraph',
          text: `If you live in the ChatGPT desktop app, OpenAI's own option is the natural choice. If your Codex is a CLI, or you run it with other agents, the CodeAgentSwarm app is the one that reaches it. Running Claude Code too? See <a href="/en/guides/control-claude-code-from-phone" ${A}>how to control Claude Code from your phone</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is there a Codex mobile app?',
      answer: 'Not a separate one. Codex on mobile is part of the ChatGPT app for iOS and Android. It connects to Codex Cloud or to a Mac or Windows PC running the ChatGPT desktop app.',
    },
    {
      question: 'Can I use the Codex CLI from my phone?',
      answer: "OpenAI's docs say the mobile connection cannot be set up from the Codex CLI or the IDE extension. To reach Codex CLI sessions from your phone, run them in CodeAgentSwarm and pair the CodeAgentSwarm phone app.",
    },
    {
      question: 'Does Codex on mobile work with Linux?',
      answer: "OpenAI's Remote connections page lists the ChatGPT desktop app on macOS and Windows as hosts, plus SSH hosts added from that app. CodeAgentSwarm runs on Linux, so its phone app can reach Codex sessions on a Linux computer.",
    },
    {
      question: 'Does my computer need to stay on?',
      answer: 'For any session that runs on your computer, yes. Only Codex Cloud tasks keep going with the computer off.',
    },
  ],
}

export default guide
