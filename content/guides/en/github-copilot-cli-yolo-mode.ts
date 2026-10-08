import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-yolo-mode',
    locale: 'en',
    title: 'GitHub Copilot CLI YOLO mode, permissions and autopilot',
    metaTitle: 'Copilot CLI YOLO Mode: --yolo, Allow All Tools, Autopilot',
    metaDescription: 'What copilot --yolo and --allow-all really allow, how to approve only git or file edits with --allow-tool rules, and how autopilot decides when to stop.',
    intro: 'By default GitHub Copilot CLI asks before it edits a file or runs a command, and it only touches the folder you started it in. <code>--yolo</code> turns all of that off at once. This guide explains what each permission flag allows, how to approve only the tools a task needs, and how autopilot mode behaves. We checked everything against Copilot CLI 1.0.93 and the GitHub docs on October 8, 2026.',
    ctaText: 'Pick Ask before actions, Auto-approve edits or Always approve for each GitHub Copilot CLI session in CodeAgentSwarm, and see at a glance which agent is waiting for you.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'modo-yolo-github-copilot-cli',
    relatedSlug: 'how-to-use-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'what-yolo-does',
      title: 'What --yolo does in GitHub Copilot CLI',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Out of the box, Copilot asks for approval before it uses a tool, and file access is limited to the current folder, its subfolders and the system temp directory. <code>--yolo</code> and <code>--allow-all</code> are the same flag. Both equal three separate flags:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --yolo\n\n# same as\ncopilot --allow-all-tools --allow-all-paths --allow-all-urls',
        },
        {
          type: 'table',
          headers: ['Flag or variable', 'What it allows'],
          rows: [
            ['<code>--allow-all-tools</code>', 'Every tool runs without asking: shell commands, file writes and MCP tools.'],
            ['<code>--allow-all-paths</code>', 'Turns off the path check, so Copilot can read and write anywhere on disk.'],
            ['<code>--allow-all-urls</code>', 'Any URL, with no confirmation.'],
            ['<code>--allow-all</code> or <code>--yolo</code>', 'All three of the above.'],
            ['<code>COPILOT_ALLOW_ALL=true</code>', 'Approves tools without asking and also trusts the working folder, so Copilot loads its skills, plugins, MCP servers and hooks.'],
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: `GitHub recommends using these options only in an isolated environment, and warns against an alias that adds them every time you start Copilot (${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools', 'Allowing and denying tool use')}, checked October 8, 2026).`,
        },
        {
          type: 'paragraph',
          text: `Inside a running session, <code>/allow-all</code> switches to the same mode without a restart. If you have not installed Copilot yet, start with ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'granular-rules',
      title: 'Safer: approve only what the task needs',
      content: [
        {
          type: 'paragraph',
          text: '<code>--allow-tool</code> skips the prompt for tools that match a pattern. <code>--deny-tool</code> blocks them. Patterns take the form <code>kind(argument)</code>, and the argument is optional.',
        },
        {
          type: 'table',
          headers: ['Pattern', 'Matches'],
          rows: [
            ['<code>shell(git:*)</code>', 'Every git command. The <code>:*</code> suffix matches by prefix.'],
            ['<code>shell(git push)</code>', 'Only <code>git push</code>.'],
            ['<code>write</code>', 'Every tool that creates or changes files, except shell commands.'],
            ['<code>write(path)</code>', 'File writes to that path.'],
            ['<code>&lt;mcp-server&gt;(tool)</code>', 'One tool from an MCP server, or all of its tools if you leave out the tool name.'],
            ['<code>url(domain)</code>', 'Requests to that domain.'],
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: "# git without prompts, except push\ncopilot --allow-tool='shell(git:*)' --deny-tool='shell(git push)'\n\n# everything without prompts, still no push\ncopilot --allow-all-tools --deny-tool='shell(git push)'",
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Deny always wins. A <code>--deny-tool</code> rule still applies with <code>--allow-all</code> or <code>--yolo</code>, and also over approvals you saved earlier.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'hide-tools',
          text: 'Hide tools from the model',
        },
        {
          type: 'paragraph',
          text: '<code>--available-tools</code> and <code>--excluded-tools</code> work one step earlier: they decide which tools the model can see at all. <code>--available-tools</code> keeps only the tools you list. <code>--excluded-tools</code> removes only the ones you list. An allow rule never brings back a tool you filtered out this way.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'saved-approvals',
          text: 'Approvals you saved earlier',
        },
        {
          type: 'paragraph',
          text: `When you approve a tool for the current location, Copilot saves it in <code>~/.copilot/permissions-config.json</code>. <code>/reset-allowed-tools</code> revokes what you granted in the current session. To drop saved approvals for another location, edit or delete its entry in that file. Source: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools', 'GitHub docs')}, checked October 8, 2026.`,
        },
      ],
    },
    {
      id: 'paths-and-trust',
      title: 'Paths, extra folders and folder trust',
      content: [
        {
          type: 'paragraph',
          text: 'If a task needs a second folder, such as a shared library next to your repo, grant that one folder instead of every path on disk. <code>--disallow-temp-dir</code> also removes the default access to the system temp directory.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --add-dir ../shared-lib\ncopilot --disallow-temp-dir',
        },
        {
          type: 'paragraph',
          text: 'The first time you open Copilot interactively in a folder, it asks you to confirm folder trust: Yes, Yes and remember the folder for future sessions, or No. <code>COPILOT_ALLOW_ALL=true</code> skips that question and trusts the folder for you.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Trusting a folder loads its skills, plugins, MCP servers and hooks. Read a repository you cloned from someone else before you trust it, and do not set <code>COPILOT_ALLOW_ALL=true</code> globally.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'GitHub Copilot CLI asking to confirm folder trust with three options',
          caption: 'Real capture from a CodeAgentSwarm development build: Copilot asks for folder trust the first time the terminal opens it in a test folder.',
          size: 'full',
        },
      ],
    },
    {
      id: 'autopilot',
      title: 'Autopilot mode and --max-autopilot-continues',
      content: [
        {
          type: 'paragraph',
          text: `Autopilot lets Copilot keep working on a task without waiting for you after each step. Press Shift+Tab until you reach it, or start with <code>--autopilot</code> or <code>--mode autopilot</code>. When you enter it, Copilot offers to enable all permissions. If you choose manual approval instead, it automatically denies every tool request that needs approval, which can leave the task unfinished (${link('https://docs.github.com/en/copilot/concepts/agents/copilot-cli/autopilot', 'GitHub autopilot docs')}, checked October 8, 2026).`,
        },
        {
          type: 'code',
          language: 'bash',
          code: 'copilot --autopilot --max-autopilot-continues 3',
        },
        {
          type: 'list',
          items: [
            'It stops when Copilot decides the task is complete.',
            'It stops when a problem occurs or you press Ctrl+C.',
            'It pauses after 5 automatic continuation messages by default. <code>--max-autopilot-continues</code> changes that number.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: `Each continuation is another model call, so autopilot spends AI credits without you sending a message. A low limit keeps that in check. Plans and credits are in ${link('/en/guides/github-copilot-cli-models-ai-credits', 'GitHub Copilot CLI models and AI credits')}.`,
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Permission modes in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot support arrives in the CodeAgentSwarm release after 2.4.3. In Chat, the app talks to Copilot through its ACP server and shows each permission request so you can approve or reject it. You choose one of three modes per session:',
        },
        {
          type: 'table',
          headers: ['Mode', 'What happens'],
          rows: [
            ['Ask before actions', 'Every file edit and command waits for your approval.'],
            ['Auto-approve edits', 'File changes go through; commands still ask.'],
            ['Always approve', 'The same as <code>copilot --yolo</code>.'],
          ],
        },
        {
          type: 'image',
          src: '/images/guides/copilot-chat-real.webp',
          alt: 'GitHub Copilot CLI in CodeAgentSwarm Chat with the Always approve mode selected',
          caption: 'Real capture from a CodeAgentSwarm development build: GitHub Copilot CLI 1.0.93 in Chat with Always approve selected, answering a test prompt.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: `The terminal view runs the normal <code>copilot</code> interface, so the flags and the folder trust prompt in this guide apply there unchanged. You can run several Copilot sessions side by side, each in its own project or ${link('/en/guides/git-worktrees-for-ai-coding-agents', 'git worktree')}, and see which one is waiting for an approval. ${link('/en/guides/github-copilot-cli-agent-swarm', 'Running a GitHub Copilot CLI agent swarm')} covers that setup.`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Always approve gives Copilot the same freedom as <code>--yolo</code>. CodeAgentSwarm does not add a sandbox on top, so keep production credentials out of that session.',
        },
      ],
    },
    {
      id: 'checklist',
      title: 'Before you turn on YOLO',
      content: [
        {
          type: 'list',
          items: [
            'Commit or stash your work and check <code>git status</code>.',
            'Try a narrow rule first, such as <code>--allow-tool=\'shell(git:*)\'</code> or <code>--allow-tool=write</code>.',
            'Add <code>--deny-tool</code> for the commands you never want to run unattended, like <code>git push</code>.',
            'Use <code>--add-dir</code> for one extra folder instead of <code>--allow-all-paths</code>.',
            'In autopilot, set a low <code>--max-autopilot-continues</code> and review the diff before you merge.',
          ],
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is YOLO mode in GitHub Copilot CLI?',
      answer: 'It is the --yolo flag, also called --allow-all. Copilot runs every tool without asking, can access any path and any URL. It equals --allow-all-tools --allow-all-paths --allow-all-urls. Inside a session, /allow-all does the same.',
    },
    {
      question: 'Is --allow-all-tools the same as --yolo?',
      answer: 'No. --allow-all-tools only removes tool approval prompts. File access still stays inside the current folder and URLs still ask. --yolo adds --allow-all-paths and --allow-all-urls.',
    },
    {
      question: 'How do I allow everything except git push?',
      answer: "Run copilot --allow-all-tools --deny-tool='shell(git push)'. Deny rules always win, even with --yolo, so Copilot will still be blocked from pushing.",
    },
    {
      question: 'What is autopilot mode in Copilot CLI?',
      answer: 'A mode where Copilot keeps working on a task without waiting for you after each step. Start it with Shift+Tab, --autopilot or --mode autopilot. By default it pauses after 5 automatic continuations; --max-autopilot-continues changes that.',
    },
    {
      question: 'Where does Copilot save approvals I chose not to be asked about again?',
      answer: 'In ~/.copilot/permissions-config.json, per location. /reset-allowed-tools revokes what you granted in the current session. For other locations, edit or delete their entry in that file.',
    },
  ],
}

export default guide
