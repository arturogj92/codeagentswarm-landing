import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'claude-code-mobile-app',
    locale: 'en',
    title: 'Claude Code Mobile App: What Exists and Which One to Use',
    metaTitle: 'Claude Code Mobile App: What Exists and What to Use (2026)',
    metaDescription: 'Is there a Claude Code mobile app? What the Claude app Code tab does, how cloud sessions and Remote Control differ, and when the CodeAgentSwarm app fits.',
    intro: `If you search the App Store for "Claude Code", you will not find a separate app. Anthropic puts Claude Code on the phone inside the regular Claude app, in a tab called Code. What that tab can do depends on where the work runs: in Anthropic's cloud or on your own computer.\n\nThis guide explains the official options, with their requirements, and where the CodeAgentSwarm phone app fits if you run Claude Code next to other agents on your computer.`,
    ctaText: 'Run Claude Code in CodeAgentSwarm on your computer and keep every Chat session in your pocket with the CodeAgentSwarm phone app.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Mobile App'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'app-movil-claude-code',
    relatedSlug: 'control-claude-code-from-phone',
  },
  sections: [
    {
      id: 'is-there-an-app',
      title: 'Is there a Claude Code mobile app?',
      content: [
        {
          type: 'paragraph',
          text: `Not a separate one. The <a href="https://code.claude.com/docs/en/mobile" ${EXT}>Claude Code on mobile</a> docs say it plainly: cloud sessions and Remote Control both live in the <strong>Code</strong> tab of the Claude app for iOS and Android. The app is a client for Claude Code sessions. Code never runs on the phone.`,
        },
        {
          type: 'paragraph',
          text: 'To install it, run <code>/mobile</code> in a Claude Code session. It shows a QR code that opens the right store for your phone. Sign in with the same claude.ai account you use for Claude Code. If you do not see the Code tab, your plan or organization may not include it.',
        },
      ],
    },
    {
      id: 'official-options',
      title: 'What the Code tab can connect to',
      content: [
        {
          type: 'table',
          headers: ['Option', 'Where the work runs', 'Good for'],
          rows: [
            ['Cloud sessions', 'Anthropic cloud infrastructure', 'Repositories on GitHub; the task keeps going with your laptop closed'],
            ['Remote Control', 'A Claude Code session on your computer', 'Work that needs your local files, tools or MCP servers'],
            ['Dispatch', 'The Claude Desktop app on your computer', 'Messaging a task and letting Dispatch decide how to run it (Pro, Max or Ultra)'],
            ['Projects', 'The cloud', 'A stream of related work split into parallel threads'],
          ],
          caption: 'Source: Claude Code on mobile, Anthropic documentation.',
        },
        {
          type: 'paragraph',
          text: 'Cloud sessions and Remote Control need a claude.ai account. They are not reachable with an Anthropic Console API key or through a third-party provider such as Amazon Bedrock.',
        },
        { type: 'heading', level: 3, id: 'cloud-sessions', text: 'Cloud sessions' },
        {
          type: 'paragraph',
          text: 'You pick a repository and a branch, describe the task and submit it. The session runs in the cloud, so it continues when you put the phone away, and you can pick it up later from your laptop. Cloud sessions and projects are the options that keep working with your computer off.',
        },
        { type: 'heading', level: 3, id: 'remote-control', text: 'Remote Control' },
        {
          type: 'paragraph',
          text: `You start <code>claude remote-control</code> on your computer and drive that session from the phone. Files, tools and MCP servers stay on your machine, and photos you attach in the app reach the local session. The step-by-step setup is in <a href="/en/guides/control-claude-code-from-phone" ${A}>how to control Claude Code from your phone</a>.`,
        },
        { type: 'heading', level: 3, id: 'limits', text: 'Limits of the official app' },
        {
          type: 'list',
          items: [
            'Terminal-only commands such as <code>/plugin</code> and <code>/resume</code> do not work from the app.',
            'Bypass permissions cannot be selected from the app. Cloud sessions offer Accept edits, Plan and Auto; Remote Control adds Manual.',
            'Dispatch is not available on Team or Enterprise plans.',
          ],
        },
      ],
    },
    {
      id: 'codeagentswarm-app',
      title: 'Where the CodeAgentSwarm phone app fits',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for macOS, Windows and Linux where you run Claude Code, Codex, OpenCode and other coding agents side by side. Its phone app pairs with that desktop app once, by QR code, and then shows every session you have open there in Chat view.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm phone app, demo mode: Chat sessions grouped by project with their status',
          src: '/images/guides/phone-app-demo-sessions.webp',
          caption: 'CodeAgentSwarm phone app in demo mode, with sample data. Your Chat sessions, grouped by project.',
          size: 'small',
        },
        {
          type: 'list',
          items: [
            'Your Chat sessions in one list, grouped by project, with their status.',
            'Reply, answer questions and approvals, and start new sessions in your projects.',
            'Attach photos, draw on them, attach files or dictate a voice note.',
            'Push notifications on iPhone and Android when a session needs you.',
            'End-to-end encryption between phone and computer: the relay cannot read your conversations.',
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
          type: 'paragraph',
          text: `Get it on the <a href="https://apps.apple.com/app/codeagentswarm/id6801180696" ${EXT}>App Store</a> (iPhone and Apple Watch), request the Android beta in the <a href="https://discord.com/channels/1444798143672750164/1540046825938096140" ${EXT}>#mobile-relay-beta Discord channel</a>, or open <a href="https://web.codeagentswarm.com" ${EXT}>web.codeagentswarm.com</a> in any browser.`,
        },
      ],
    },
    {
      id: 'which-one',
      title: 'Which one should you use?',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Your computer will be off</strong>: cloud sessions or projects in the Claude app.',
            '<strong>You run one Claude Code session in a terminal</strong>: Remote Control in the Claude app.',
            '<strong>You run several agents or many sessions on your computer</strong>: the CodeAgentSwarm phone app, paired with CodeAgentSwarm.',
          ],
        },
        {
          type: 'paragraph',
          text: `Using Codex too? OpenAI has its own option inside the ChatGPT app. It is covered in <a href="/en/guides/codex-mobile-app" ${A}>Codex mobile app</a>. For a desktop interface around Claude Code, see <a href="/en/guides/claude-code-gui" ${A}>Claude Code GUI</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is there a Claude Code app for iPhone or Android?',
      answer: 'Not a separate one. Claude Code is in the Code tab of the Claude app for iOS and Android. From there you reach cloud sessions and, with Remote Control, sessions running on your computer.',
    },
    {
      question: 'Can I write code on my phone with Claude Code?',
      answer: 'You can give instructions and review results, but the code runs elsewhere: in Anthropic cloud sessions or on your own computer through Remote Control.',
    },
    {
      question: 'Does the Claude Code mobile app work with an API key?',
      answer: 'No. Cloud sessions and Remote Control require a claude.ai account and are not reachable with a Console API key or through providers such as Amazon Bedrock.',
    },
    {
      question: 'What is the CodeAgentSwarm phone app?',
      answer: 'A companion for the CodeAgentSwarm desktop app. You pair it once and then follow and answer every agent session you run in Chat view on your computer, including Claude Code and Codex. Sessions switched to the Terminal (CLI) view are not reachable from the phone. It is on the App Store for iPhone, in beta for Android and available as a web app.',
    },
  ],
}

export default guide
