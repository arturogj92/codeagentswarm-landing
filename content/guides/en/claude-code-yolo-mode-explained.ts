import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-yolo-mode-explained',
    locale: 'en',
    title: 'Claude Code YOLO Mode Explained: What It Is, Risks & How to Enable It',
    metaTitle: 'Claude Code YOLO Mode: What --dangerously-skip-permissions Does & How to Enable It Safely (2026)',
    metaDescription: 'Everything about Claude Code YOLO mode: what --dangerously-skip-permissions actually does, the real risks, how to enable it, Auto mode as safer alternative, and best practices for auto-approve workflows.',
    intro: `If you have spent more than a day working with Claude Code, you have probably run into the same frustration: constant permission prompts. Every file edit, every shell command, every MCP tool call - Claude asks for confirmation, and you click "yes" without really reading what it says.

That is where "YOLO mode" comes in. The community started calling it that because of the \`--dangerously-skip-permissions\` flag, which does exactly what it sounds like: skips every permission prompt so Claude can work without interruption.

The speed gain is real. But so are the risks. This guide covers what YOLO mode actually does under the hood, what can go wrong, and how to get the same speed safely - whether through Anthropic's newer Auto mode or CodeAgentSwarm's Turbo Mode with granular permission controls.`,
    ctaText: 'Skip confirmations safely with CodeAgentSwarm Turbo Mode. Granular permissions, Git guardrails, and MCP controls built in.',
    highlightedWords: ['YOLO mode', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'modo-yolo-claude-code-explicado',
  },
  sections: [
    {
      id: 'what-is-yolo-mode',
      title: 'What is YOLO mode in Claude Code?',
      content: [
        {
          type: 'paragraph',
          text: '"YOLO mode" is the community nickname for running Claude Code with the <code>--dangerously-skip-permissions</code> flag. The name is not official - Anthropic does not call it that - but it stuck because it captures the idea perfectly: you only live once, so skip the prompts and let Claude do its thing.',
        },
        {
          type: 'paragraph',
          text: 'The core motivation is simple. When you are iterating on a feature, fixing bugs, or refactoring code, Claude asks for permission before every action: editing a file, running a test, installing a package, using an MCP tool. On a typical task, that can mean dozens of prompts. Most developers just spam "yes" anyway, which defeats the purpose of having safeguards.',
        },
        {
          type: 'paragraph',
          text: 'YOLO mode removes all those prompts at once. Claude reads, writes, runs commands, and calls tools without asking. For repetitive or well-scoped tasks, this feels like unlocking the real potential of an AI coding agent.',
        },
        {
          type: 'paragraph',
          text: 'The tradeoff is that you lose all guardrails. Every action auto-approves, including the ones you would normally want to review. That is why the flag is named "dangerously" - it is an honest warning from Anthropic that this mode trades safety for speed.',
        },
      ],
    },
    {
      id: 'what-flag-does',
      title: 'What --dangerously-skip-permissions actually does',
      content: [
        {
          type: 'paragraph',
          text: 'Normally, Claude Code asks for explicit permission before performing actions in these categories:',
        },
        {
          type: 'list',
          items: [
            '<strong>File operations</strong> - Writing, editing, or creating files in your project',
            '<strong>Shell commands</strong> - Running anything in the terminal (npm install, git commands, scripts)',
            '<strong>Network access</strong> - Making HTTP requests or accessing external services',
            '<strong>MCP tools</strong> - Calling tools from connected MCP servers (Supabase, Playwright, etc.)',
          ],
        },
        {
          type: 'paragraph',
          text: 'With <code>--dangerously-skip-permissions</code>, all of these auto-approve without any prompt. Claude gets full autonomy over your machine within the session.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'How to run it',
          id: 'how-to-run-it',
        },
        {
          type: 'paragraph',
          text: 'The simplest way is passing the flag directly:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --dangerously-skip-permissions "refactor the auth module"',
        },
        {
          type: 'paragraph',
          text: 'You can also set it as a permission mode, which is equivalent:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --permission-mode bypassPermissions',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Auto mode - a safer built-in alternative',
          id: 'auto-mode-alternative',
        },
        {
          type: 'paragraph',
          text: 'Anthropic introduced a middle ground called <a href="https://www.anthropic.com/engineering/claude-code-auto-mode" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Auto mode</a>. Instead of skipping everything or asking everything, it uses a classifier to decide which actions are safe to auto-approve and which need your confirmation. You can read more about all available options in the <a href="https://code.claude.com/docs/en/permission-modes" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">permission modes documentation</a>:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --permission-mode auto',
        },
        {
          type: 'paragraph',
          text: 'Auto mode is a step in the right direction - it reduces prompts for low-risk actions like reading files or running tests while still asking about riskier ones. However, you do not control the classification. What the classifier considers "safe" might not match your preferences, and it can still interrupt you on actions you are comfortable auto-approving.',
        },
      ],
    },
    {
      id: 'real-risks',
      title: 'The real risks of YOLO mode',
      content: [
        {
          type: 'paragraph',
          text: 'Let us be direct about this: the risks are not theoretical. These are things that actually happen when developers use <code>--dangerously-skip-permissions</code> without additional safeguards.',
        },
        {
          type: 'list',
          items: [
            '<strong>Git push to the wrong branch</strong> - Claude decides to commit and push your half-finished changes to main. Or worse, force-pushes and overwrites your team\'s work.',
            '<strong>Deleting files or directories</strong> - A misinterpreted instruction leads to <code>rm -rf</code> on a directory you did not intend to remove.',
            '<strong>Destructive shell commands</strong> - <code>DROP TABLE</code>, <code>docker system prune</code>, or any command that cannot be undone.',
            '<strong>Installing malicious packages</strong> - Claude runs <code>npm install</code> for a package that looks right but is a typosquat or compromised dependency.',
            '<strong>Unintended network requests</strong> - API calls to production endpoints, sending data to external services, or triggering webhooks you did not expect.',
            '<strong>Overwriting uncommitted changes</strong> - Claude starts editing files you were working on, and your uncommitted changes are lost before you noticed.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'These are not edge cases. In active projects with real data and real Git histories, any of these can happen within a single session. The more autonomous Claude is, the more important it is to have some form of guardrails.',
        },
        {
          type: 'paragraph',
          text: 'The key insight is that YOLO mode is not inherently bad. The problem is that it is all-or-nothing. You either ask for everything or skip everything, with no way to say "auto-approve file edits but block git push" using the native CLI flag alone.',
        },
      ],
    },
    {
      id: 'enable-safely',
      title: 'How to enable YOLO mode safely',
      content: [
        {
          type: 'paragraph',
          text: 'There are three approaches, from most risky to most controlled.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Method 1: The raw flag (not recommended for daily use)',
          id: 'method-raw-flag',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --dangerously-skip-permissions "your prompt here"',
        },
        {
          type: 'paragraph',
          text: 'This works for quick, isolated tasks where you are confident Claude will not do anything destructive. Think "rename this variable everywhere" or "add JSDoc to these functions." For anything involving Git operations, file deletions, or network calls, this is a gamble.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Method 2: Auto mode (Anthropic\'s official safer alternative)',
          id: 'method-auto-mode',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'claude --permission-mode auto',
        },
        {
          type: 'paragraph',
          text: 'Auto mode uses an internal classifier to auto-approve actions it deems safe and prompt for risky ones. It is better than the raw flag, but you cannot customize what counts as "safe" - the classifier decides for you. If you want reads and diffs to auto-approve but Git operations to always ask, you cannot configure that with Auto mode.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Method 3: CodeAgentSwarm Turbo Mode (recommended)',
          id: 'method-turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'Turbo Mode in CodeAgentSwarm gives you the speed of YOLO mode with the control you actually need. Instead of a single on/off switch, you get a full permission system where you decide exactly what auto-approves and what gets blocked.',
        },
        {
          type: 'paragraph',
          text: 'Here is what makes it different:',
        },
        {
          type: 'list',
          items: [
            '<strong>Granular permissions per tool category</strong> - Set Allow, Ask, or Deny for file operations, shell commands, Git actions, network access, and more. Each category is independent.',
            '<strong>Git guardrails</strong> - Block push, force-push, merge, and branch delete while keeping status, diff, and log on auto-approve. This single setting prevents the most common YOLO disasters.',
            '<strong>MCP tool permissions</strong> - Control which MCP tools can auto-execute and which need confirmation. Allow Supabase reads but block migrations, for example.',
            '<strong>Visual permission manager</strong> - A UI where you configure everything instead of editing JSON files or remembering CLI flags.',
          ],
        },
        {
          type: 'image',
          alt: 'Permission presets in CodeAgentSwarm: Allow All, Block Dangerous Git, Block Delete Commands',
          src: '/images/guides/permissions-global-presets.png',
          caption: 'One-click presets give you a safe starting point. "Block Dangerous Git" is the most popular choice.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: 'The practical difference is significant. With the raw flag, you either accept all risk or spend your day clicking "yes." With Turbo Mode, you configure once and get the speed of YOLO mode where it is safe, with automatic blocks where it matters.',
        },
        {
          type: 'paragraph',
          text: 'For a step-by-step walkthrough of setting up Turbo Mode, including screenshots of every configuration screen, check the dedicated guide: <a href="/en/guides/claude-code-yolo-turbo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code YOLO Turbo Mode setup guide</a>.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Best practices for auto-approve workflows',
      content: [
        {
          type: 'paragraph',
          text: 'Regardless of which method you use, these habits will save you from the worst YOLO-mode accidents:',
        },
        {
          type: 'list',
          items: [
            '<strong>Always work on a feature branch, never main.</strong> If Claude makes a mess, you can throw away the branch. If it messes up main, your whole team feels it.',
            '<strong>Commit before starting a YOLO session.</strong> This gives you a clean restore point. If something goes wrong, <code>git checkout .</code> brings you back instantly.',
            '<strong>Block dangerous Git operations.</strong> Push, force-push, merge, and branch delete should require manual confirmation even in YOLO mode. These are the highest-impact actions and the hardest to undo.',
            '<strong>Review changes before committing.</strong> Use a live diff viewer to see what Claude changed in real time. In CodeAgentSwarm, the <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">per-terminal file change tracker</a> shows exactly what was modified during the session.',
            '<strong>Start with "Block Dangerous" preset, loosen as needed.</strong> It is much safer to start restrictive and open up specific permissions than to start open and try to lock things down after something goes wrong.',
            '<strong>Keep sessions focused.</strong> The more specific your prompt, the less likely Claude is to go off-script. "Refactor the auth middleware to use JWT" is safer than "improve the codebase."',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The combination of feature branches + blocked Git push + live diff gives you 90% of YOLO speed with almost none of the risk. Most developers who try this setup never go back to the raw flag.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What does --dangerously-skip-permissions do in Claude Code?',
      answer: 'It skips all permission prompts. Claude Code will auto-approve every action - file edits, shell commands, network requests, MCP tool calls - without asking for your confirmation. This gives maximum speed but removes all safety guardrails.',
    },
    {
      question: 'Is YOLO mode safe to use?',
      answer: 'The raw --dangerously-skip-permissions flag is risky because it auto-approves everything, including destructive actions like git push or file deletion. For safer alternatives, use Anthropic\'s Auto mode (which classifies actions by risk) or CodeAgentSwarm Turbo Mode (which lets you configure permissions per tool category).',
    },
    {
      question: 'How do I enable YOLO mode in Claude Code?',
      answer: 'Run claude --dangerously-skip-permissions followed by your prompt, or use claude --permission-mode bypassPermissions. For a safer approach, use claude --permission-mode auto or enable Turbo Mode in CodeAgentSwarm.',
    },
    {
      question: 'What is the difference between YOLO mode and Auto mode?',
      answer: 'YOLO mode (--dangerously-skip-permissions) skips every single permission prompt. Auto mode (--permission-mode auto) uses an internal classifier to auto-approve actions it considers safe while still prompting for risky ones. Auto mode is safer but you cannot customize what it considers "safe."',
    },
    {
      question: 'Can YOLO mode delete my files?',
      answer: 'Yes. Without guardrails, Claude can run rm -rf, delete directories, overwrite files, and execute any destructive shell command - all without asking. This is one of the main reasons to use a permission system like CodeAgentSwarm Turbo Mode instead of the raw flag.',
    },
    {
      question: 'What is Turbo Mode in CodeAgentSwarm?',
      answer: 'Turbo Mode is CodeAgentSwarm\'s implementation of auto-approve for Claude Code, with granular permission controls. You can set Allow, Ask, or Deny per tool category, block specific Git operations, and control MCP tool permissions. It gives you YOLO-mode speed with configurable safety.',
    },
    {
      question: 'Can I use YOLO mode in VS Code?',
      answer: 'Yes. In the Claude Code VS Code extension settings, enable "Allow Dangerously Skip Permissions." This is the equivalent of the --dangerously-skip-permissions CLI flag but applied within the extension. The same risks apply.',
    },
    {
      question: 'What is the safest way to skip confirmations in Claude Code?',
      answer: 'Use CodeAgentSwarm Turbo Mode with the "Block Dangerous Git" preset. This auto-approves file edits and reads while blocking push, force-push, merge, and branch delete. Combined with working on a feature branch, this gives you fast iteration with minimal risk.',
    },
  ],
}

export default guide
