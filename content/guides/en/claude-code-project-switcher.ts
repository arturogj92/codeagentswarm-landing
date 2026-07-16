import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-project-switcher',
    locale: 'en',
    title: 'Claude Code Project Switcher: Jump Between Projects in One Click',
    metaTitle: 'Claude Code Project Switcher: Jump Between Projects in One Click (2026)',
    metaDescription: 'A Claude Code project switcher that opens any repo in one click. Save navbar shortcuts with their own colour, icon and presets like resume or Turbo mode.',
    intro: `If you jump between several repos during the day, you probably know this little ritual: open a terminal, cd into the right folder, run claude, remember whether you wanted to resume the last session or start fresh, and repeat that every single time you switch projects.

It is not hard, it is just friction. And when you do it twenty times a day across five or six repos, that friction adds up and quietly breaks your flow.

CodeAgentSwarm has navbar project shortcuts for exactly this. You save a shortcut for a project, give it its own colour and icon, and from then on a single click opens a terminal already sitting in that project, with the settings you chose. In this guide I will show you how the project switcher works and how to set it up so changing repos stops being a chore.`,
    highlightedWords: ['project switcher', 'one click'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'cambio-rapido-de-proyecto-claude-code',
    ctaText: 'Save a shortcut for each repo you work in and switch between Claude Code projects with a single click, already in the mode you want.',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'What the Claude Code project switcher is',
      content: [
        {
          type: 'paragraph',
          text: 'The project switcher in CodeAgentSwarm is a row of shortcut buttons in the navbar. Each button represents one of your projects. Click it and the app opens a new terminal already inside that project, running Claude Code (or whichever CLI agent you set), with the options you saved for it.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm navbar showing a row of project shortcut buttons, each with its own colour and icon, plus small preset icons for resume mode and Turbo mode',
          src: '/images/guides/project-shortcuts.png',
          caption: 'Each shortcut is a project. The small icons next to it show the presets it opens with, like resume and Turbo mode.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'So instead of opening a blank terminal, navigating to the folder and typing the same command every time, you click once. The project, the agent and the launch settings are all baked into the shortcut.',
        },
        {
          type: 'paragraph',
          text: 'This is built for people juggling several repos at once. If you are running a few sessions in parallel, the switcher pairs naturally with <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>, since each click can spin up another terminal in a different project. If you are new to <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, it is Anthropic\'s agentic coding tool that runs in your terminal.',
        },
      ],
    },
    {
      id: 'how-to-save-a-shortcut',
      title: 'How to save a project shortcut',
      content: [
        {
          type: 'paragraph',
          text: 'Setting up a shortcut takes a few seconds and you only do it once per project. The flow looks like this:',
        },
        {
          type: 'list',
          items: [
            'Pick the project folder you want the shortcut to point at.',
            'Give it a colour and an icon so you can recognise it instantly in the navbar.',
            'Choose the launch settings: which agent it runs, and whether it opens in resume mode, Turbo mode, or a plain fresh session.',
            'Save it. The shortcut now lives in the navbar, ready to click.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The colour and icon are not just decoration. When you have five or six shortcuts lined up, recognising "the purple hex one is the backend" or "the lobster is my side project" is much faster than reading folder names. You end up navigating by shape and colour, almost without thinking.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Give related projects visually distinct colours rather than five shades of blue. The whole point is to tell them apart at a glance, so make the differences obvious.',
        },
      ],
    },
    {
      id: 'presets',
      title: 'Presets: resume mode, Turbo mode and more',
      content: [
        {
          type: 'paragraph',
          text: 'The part that saves the most time is the presets. A shortcut does not just open a project, it opens it the way you want to work in that project.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Resume mode',
          id: 'resume-mode',
        },
        {
          type: 'paragraph',
          text: 'If a project is one you come back to constantly, you can set its shortcut to open in resume mode, which continues the last Claude Code session instead of starting from scratch. One click and you are back where you left off, with the previous context already loaded. No re-explaining what you were doing.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Turbo mode',
          id: 'turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'For repos where you trust the AI to move fast, you can preset the shortcut to launch directly in Turbo mode, so Claude can run commands and edit files without stopping to ask for permission on every step. If you want the full picture on what that mode does and how to keep it safe, read the <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">Turbo Mode guide</a> before turning it on for a project.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Be deliberate about which projects get a Turbo preset. It is great for a sandbox or a side project, less so for a production repo where you want to review each action. Save Turbo shortcuts only for repos where you are comfortable letting the AI run.',
        },
        {
          type: 'paragraph',
          text: 'You can mix and match. One project might have a calm "open and ask me" shortcut, another a "resume and go fast" shortcut. The point is that each repo opens in the mode that fits how you actually work in it.',
        },
      ],
    },
    {
      id: 'why-it-matters',
      title: 'Why a one-click switcher actually matters',
      content: [
        {
          type: 'paragraph',
          text: 'On its own, opening a terminal and cd-ing into a folder is trivial. The cost is not in any single time you do it, it is in the repetition and the context switch around it.',
        },
        {
          type: 'paragraph',
          text: 'Every time you switch projects manually you have to remember the path, remember the right command, remember whether you wanted to resume or start clean, and re-load all of that in your head. The project switcher takes those small decisions and freezes them into a button, so switching repos costs one click and zero thinking.',
        },
        {
          type: 'list',
          items: [
            'You stop typing the same cd and claude commands dozens of times a day.',
            'You stop second-guessing whether to resume the last session, because the shortcut already decided.',
            'You can stand up several projects in parallel quickly, each in its own mode.',
            'Your navbar becomes a map of the repos you actually work in, colour-coded and one click away.',
          ],
        },
        {
          type: 'paragraph',
          text: 'It is a small feature that you feel every single day, especially if you are the kind of person who has four or five repos open at any given moment.',
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'Project shortcuts turn the constant chore of switching repos into a single click. Each shortcut carries its own colour, icon and launch settings, so the project opens exactly how you want it: resuming the last session, going fast in Turbo mode, or starting plain and fresh.',
        },
        {
          type: 'paragraph',
          text: 'If you work across several repos with Claude Code, set up a shortcut for each one you touch regularly. After a day or two you will wonder how you put up with retyping the same commands every time you changed projects.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How do I switch between projects in Claude Code?',
      answer: 'With CodeAgentSwarm, you save a shortcut for each project in the navbar and click it to open a terminal already inside that project running Claude Code. There is no need to open a blank terminal, cd into the folder or retype the command, the shortcut does all of that in one click.',
    },
    {
      question: 'What are project shortcuts in CodeAgentSwarm?',
      answer: 'Project shortcuts are buttons in the navbar, one per project, each with its own colour and icon. Clicking a shortcut opens a new terminal in that project with the launch settings you saved, such as which agent runs and whether it starts in resume or Turbo mode. They act as a one-click project switcher.',
    },
    {
      question: 'Can a shortcut resume my last session?',
      answer: 'Yes. When you create the shortcut you can set it to open in resume mode, which continues the last Claude Code session for that project instead of starting from scratch. One click brings you back with the previous context already loaded.',
    },
    {
      question: 'Can a shortcut start in Turbo mode?',
      answer: 'Yes. You can preset a shortcut to launch directly in Turbo mode, so Claude can run commands and edit files without asking permission on every step. Use it for repos where you trust the AI to move fast, and read the Turbo Mode guide to understand how to keep it safe.',
    },
    {
      question: 'How many shortcuts can I save?',
      answer: 'You can save a shortcut for each project you work in and line them up in the navbar. In practice you keep one per repo you touch regularly, so the row stays readable and you navigate by colour and icon at a glance.',
    },
  ],
}

export default guide
