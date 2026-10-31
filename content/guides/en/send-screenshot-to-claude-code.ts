import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'send-screenshot-to-claude-code',
    locale: 'en',
    title: 'How to Send a Screenshot to Claude Code',
    metaTitle: 'How to Add a Screenshot to Claude Code (Mac and Windows)',
    metaDescription: 'How to add a screenshot to Claude Code: paste, drag and drop or a file path, plus capture-to-agent, Appshots and phone photos in CodeAgentSwarm.',
    intro: `A screenshot often explains a bug faster than a paragraph: a broken layout, an error dialog, a chart that looks wrong. Claude Code can read images, so the only question is how to get the picture into the session without saving files to the desktop and hunting for paths.\n\nThis guide starts with the three ways Claude Code supports on its own, then shows how CodeAgentSwarm turns a screenshot into a message for an agent in a couple of keystrokes.`,
    ctaText: 'Press the Screenshot to Agent shortcut in CodeAgentSwarm, draw on the capture, add a note and send it to the session that needs it.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Screenshot', 'Claude Code'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'enviar-captura-a-claude-code',
    relatedSlug: 'claude-code-tips-and-tricks',
  },
  sections: [
    {
      id: 'claude-code-built-in',
      title: 'The three built-in ways',
      content: [
        {
          type: 'paragraph',
          text: `Anthropic's <a href="https://code.claude.com/docs/en/common-workflows" ${EXT}>common workflows</a> page lists three ways to add an image to a Claude Code session:`,
        },
        {
          type: 'list',
          items: [
            '<strong>Drag and drop</strong> the image file into the Claude Code window.',
            '<strong>Paste</strong> it with <code>Ctrl+V</code>, or <code>Alt+V</code> on Windows and WSL. On a Mac this is Control, not Command.',
            '<strong>Give the path</strong> in your prompt, for example: <code>Analyze this image: /path/to/your/image.png</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Then ask a concrete question about it: "the button in this screenshot overlaps the footer at 390 px, fix the CSS" works better than "look at this".',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'To copy a region straight to the clipboard on macOS, use <code>Cmd+Ctrl+Shift+4</code>. On Windows, <code>Win+Shift+S</code> does the same. Then paste it into Claude Code.',
        },
      ],
    },
    {
      id: 'screenshot-to-agent',
      title: 'Screenshot to Agent in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for macOS, Windows and Linux that runs Claude Code, Codex and other agents side by side. It has a capture flow made for this job.',
        },
        {
          type: 'list',
          items: [
            'Press <code>Cmd+Shift+P</code> on macOS or <code>Ctrl+Shift+P</code> on Windows and Linux. You can change the shortcut in Settings.',
            'Drag over the part of the screen you want, on any monitor. The capture happens when you release the mouse.',
            'A preview opens. The session you were working in is already selected, and you can pick another open session or start a new agent in one of your projects.',
            'Click the image to draw on it with a pencil, arrows or text, write what is wrong, and press Send.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The agent receives your note and the path to the image in one message, so it can open the file itself. This works the same for Claude Code, Codex and the other agents.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Need to capture another app? Click the camera button at the bottom of a Chat. It waits 5 seconds so you can switch windows, then opens the same region selector. Click it again or press Esc to cancel.',
        },
      ],
    },
    {
      id: 'appshots',
      title: 'Appshots: capture a whole window with two keys (macOS)',
      content: [
        {
          type: 'paragraph',
          text: 'On a Mac, press both Shift keys at the same time to capture the window of the app in front, with no selection to draw. Captures collect in a small tray. In any Chat, the <strong>Add Appshots</strong> button next to the camera adds them to the message you are writing, and you can still edit the images and the text before sending.',
        },
        {
          type: 'paragraph',
          text: 'Appshots need two macOS permissions, Input Monitoring and Screen Recording. In <strong>Settings > Capture > Appshots</strong> you can grant them, switch the key pair to both Command or both Option, or turn the gesture off.',
        },
      ],
    },
    {
      id: 'paste-in-codeagentswarm',
      title: 'Paste and drop also work',
      content: [
        {
          type: 'list',
          items: [
            'In a CodeAgentSwarm terminal, <code>Cmd+V</code> on a Mac pastes a copied image. The app saves it to a temporary file and hands the path to the agent.',
            'Drop an image file onto a terminal or a Chat to attach it.',
            'In the Chat, click a pending image before sending to draw on it.',
          ],
        },
      ],
    },
    {
      id: 'from-phone',
      title: 'From your phone',
      content: [
        {
          type: 'paragraph',
          text: `With the CodeAgentSwarm phone app paired to your computer, you can attach a photo from the camera or the gallery to any Chat session, draw on it, and send it. Handy for a bug you just saw on a real device. Setup is in <a href="/en/guides/control-claude-code-from-phone" ${A}>how to control Claude Code from your phone</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How do I paste a screenshot into Claude Code on a Mac?',
      answer: 'Copy the image and press Ctrl+V (Control, not Command) in the Claude Code terminal. You can also drag the file into the window or type its path. In a CodeAgentSwarm terminal, Cmd+V works too.',
    },
    {
      question: 'How do I paste an image into Claude Code on Windows?',
      answer: 'Anthropic documents Alt+V for image paste on Windows and WSL. Drag and drop and file paths work as well.',
    },
    {
      question: 'Can Claude Code read screenshots?',
      answer: 'Yes. Claude Code can analyze images you add to the conversation, such as error screens, UI mockups or diagrams.',
    },
    {
      question: 'Does Screenshot to Agent work with Codex?',
      answer: 'Yes. In CodeAgentSwarm the capture flow sends the image path and your note to whichever session you pick, including Codex, OpenCode and the other supported agents.',
    },
  ],
}

export default guide
