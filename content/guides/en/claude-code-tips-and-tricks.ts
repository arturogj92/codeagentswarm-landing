import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-tips-and-tricks',
    locale: 'en',
    title: '20 Claude Code Tips & Tricks to Boost Your Productivity',
    metaTitle: '20 Claude Code Tips & Tricks You Wish You Knew Earlier (2026)',
    metaDescription: 'Boost your Claude Code productivity with 20 tips and tricks: CLAUDE.md files, keyboard shortcuts, parallel sessions, history management, MCP servers, and advanced workflows. Updated 2026.',
    intro: `Most people start using Claude Code and immediately ask it to "fix things". That works, but you are leaving a lot of productivity on the table.

After months of daily use across dozens of projects, these are the 20 tips that actually make a difference. Some are native Claude Code features you might not know about, others are workflow patterns that compound over time.

Whether you are just getting started or already running Claude Code daily, there is something here for you. Let's go.`,
    ctaText: 'Take your Claude Code workflow to the next level with CodeAgentSwarm. Multiple terminals, notifications, history, and more.',
    highlightedWords: ['tips', 'Claude Code'],
    publishedAt: '2026-04-15',
    updatedAt: '2026-04-15',
    alternateSlug: 'trucos-y-consejos-claude-code',
  },
  sections: [
    {
      id: 'getting-started',
      title: 'Getting started right',
      content: [
        {
          type: 'paragraph',
          text: 'Before you ask Claude to write a single line of code, these five habits will set you up for consistently better results. They take minutes to implement and pay off on every session.',
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 1: Create a CLAUDE.md file in every project.</strong> Claude reads this file automatically when it starts a session. Put your architecture decisions, naming conventions, tech stack, and anything Claude should always know. This is the single highest-impact thing you can do because it gives Claude persistent context without you repeating yourself.',
            '<strong>Tip 2: Use clear, specific first messages.</strong> "Fix the JWT expiration bug in auth middleware" will always get better results than "fix the login bug". The more precise your first message, the less back-and-forth you need. Think of it as writing a good ticket title.',
            '<strong>Tip 3: One task per conversation.</strong> Resist the urge to pile unrelated tasks into the same session. One focused conversation per task keeps context clean, avoids confusion, and makes your <a href="/en/guides/claude-code-history-complete-guide" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history</a> actually searchable later.',
            '<strong>Tip 4: Always work on a feature branch.</strong> Never let Claude work directly on main. Create a branch first, let Claude do its thing, review the changes, then merge. If something goes wrong, you can throw the branch away with zero risk.',
            '<strong>Tip 5: Commit before complex tasks.</strong> Before asking Claude to do a large refactor or multi-file change, commit your current work. This creates a checkpoint you can <code>git reset</code> back to if Claude goes off track. Cheap insurance.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'The CLAUDE.md file supports nested files too. You can have a global one at ~/.claude/CLAUDE.md and project-specific ones in each repo root. Claude reads all of them.',
        },
      ],
    },
    {
      id: 'productivity-shortcuts',
      title: 'Productivity shortcuts',
      content: [
        {
          type: 'paragraph',
          text: 'These are the commands and patterns that save you the most time day to day. Most Claude Code users only discover them after weeks of use.',
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 6: Use <code>claude -c</code> to resume your last conversation.</strong> Instead of starting fresh and re-explaining what you were working on, just resume. Claude picks up right where you left off with full context. Resume is almost always better than restart.',
            '<strong>Tip 7: Use <code>/compact</code> to reduce context when conversations get long.</strong> Long conversations eat up the context window and slow Claude down. The /compact command summarizes the conversation so far and frees up space. Use it whenever you notice Claude starting to lose track.',
            '<strong>Tip 8: Pipe files directly to Claude.</strong> You do not have to copy-paste code into the chat. Feed files, logs, and error output directly from your terminal.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `cat src/auth/middleware.py | claude "explain this code"
npm test 2>&1 | claude "fix the failing tests"
git diff | claude "review these changes"`,
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 9: Use <code>--print</code> for quick one-shot questions.</strong> When you just need a quick answer without starting an interactive session, use the print flag. No conversation overhead, just the answer.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `claude --print "what does this regex do: ^[a-z]+$"
claude --print "convert this curl to fetch: curl -X POST https://api.example.com/data"`,
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 10: Create custom slash commands.</strong> Put reusable prompts in your <code>.claude/commands/</code> directory and invoke them as slash commands. Great for repetitive workflows like generating tests, writing docs, or running code reviews with your team\'s standards.',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Custom commands are just markdown files. Create <code>.claude/commands/review.md</code> with your review criteria, then use <code>/project:review</code> in any session.',
        },
      ],
    },
    {
      id: 'advanced-workflows',
      title: 'Advanced workflows',
      content: [
        {
          type: 'paragraph',
          text: 'Once you have the basics down, these techniques will help you work on multiple things at once and integrate Claude into your broader toolchain.',
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 11: Run multiple Claude Code sessions in parallel.</strong> Do not wait for one task to finish before starting another. Open a second terminal, start a new session, and work on something else while the first one runs. If you want a proper setup for this, check out the guide on <a href="/en/guides/run-multiple-claude-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Claude Code sessions</a>.',
            '<strong>Tip 12: Set up MCP servers for your tools.</strong> MCP (Model Context Protocol) lets Claude interact directly with services like GitHub, Supabase, Notion, and databases. Instead of copy-pasting data between tools, Claude can query and act on them directly. See the guide on <a href="/en/guides/best-mcp-servers-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">best MCP servers for Claude Code</a>.',
            '<strong>Tip 13: Use YOLO mode wisely with guardrails.</strong> Skipping confirmations makes Claude much faster, but you need guardrails. Block dangerous operations like git push and file deletion while allowing reads and edits to auto-approve. Full walkthrough in the <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">YOLO mode guide</a>.',
            '<strong>Tip 14: Use <code>/init</code> to bootstrap CLAUDE.md.</strong> If you are starting with a new project and do not want to write the CLAUDE.md from scratch, run <code>/init</code>. Claude will analyze your project structure, dependencies, and code patterns, then generate a CLAUDE.md for you. It is a solid starting point that you can refine.',
            '<strong>Tip 15: Review changes in real time.</strong> Do not wait until Claude says "done" to check what it changed. Use a live diff viewer to see modifications as they happen. This lets you catch issues early instead of reviewing a massive diff at the end. Here is how to <a href="/en/guides/view-claude-code-changes-real-time" class="text-neon-cyan hover:text-neon-purple transition-colors">view Claude Code changes in real time</a>.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'When running parallel sessions that touch the same files, be careful with merge conflicts. Assign each session to a different area of the codebase, or use separate branches.',
        },
      ],
    },
    {
      id: 'power-user',
      title: 'Power user secrets',
      content: [
        {
          type: 'paragraph',
          text: 'These are the tips that separate casual users from people who have built Claude Code into every part of their workflow. Each one unlocks a different kind of leverage.',
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 16: Use conversation history as documentation.</strong> Every Claude Code session records the decisions you made, the trade-offs you considered, and the reasoning behind your code. That is documentation you get for free. Search your <a href="/en/guides/claude-code-history-complete-guide" class="text-neon-cyan hover:text-neon-purple transition-colors">conversation history</a> when you need to remember why something was built a certain way.',
            '<strong>Tip 17: Set up notifications so you stop watching the terminal.</strong> If Claude is working on a long task, you do not need to stare at the terminal waiting. Set up desktop notifications to get pinged when Claude finishes, encounters an error, or needs your input. More details in the <a href="/en/guides/codeagentswarm-notifications" class="text-neon-cyan hover:text-neon-purple transition-colors">notifications guide</a>.',
            '<strong>Tip 18: Use Claude Code for code review.</strong> Feed it a diff or PR and ask for a thorough review. Claude will catch bugs, suggest improvements, and flag potential issues. This works especially well when piped directly from git.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `git diff main..feature/auth | claude "review these changes, focus on security"
gh pr diff 42 | claude "review this PR"`,
        },
        {
          type: 'list',
          items: [
            '<strong>Tip 19: Automate repetitive tasks with hooks and scripts.</strong> If you find yourself giving Claude the same instructions over and over, automate it. Use custom commands, hooks, or even shell scripts that pipe context into Claude. The less you type manually, the more you get done.',
            '<strong>Tip 20: Use CodeAgentSwarm to orchestrate everything.</strong> All of the tips above work on their own, but they work even better together. CodeAgentSwarm gives you multiple terminals in one workspace, notifications when sessions finish, searchable history across all sessions, a task board, and MCP marketplace. It is the control center that ties the whole workflow together.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'You do not have to adopt all 20 tips at once. Start with tips 1-5, add the shortcuts from tips 6-10 as they become relevant, and layer in the advanced workflows once you are comfortable.',
        },
      ],
    },
    {
      id: 'quick-reference',
      title: 'Quick reference cheat sheet',
      content: [
        {
          type: 'paragraph',
          text: 'A quick summary of the most useful commands and patterns covered in this guide.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Resume last conversation
claude -c

# One-shot question (no interactive session)
claude --print "your question here"

# Pipe files and output to Claude
cat file.py | claude "explain this"
npm test 2>&1 | claude "fix these"
git diff | claude "review this"

# Bootstrap CLAUDE.md for a new project
claude
> /init

# Compact a long conversation
> /compact

# Use a custom command
> /project:your-command`,
        },
        {
          type: 'divider',
        },
        {
          type: 'paragraph',
          text: 'That is the full list. These 20 tips cover everything from your first session to running a multi-terminal, multi-project workflow. The best part is that they all stack: each tip you adopt makes the others more effective.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is the most important Claude Code tip?',
      answer: 'Create a CLAUDE.md file in your project root. It gives Claude persistent context about your architecture, conventions, and tech stack so you do not have to repeat yourself every session. This single habit improves every interaction.',
    },
    {
      question: 'How do I make Claude Code faster?',
      answer: 'Use YOLO/Turbo mode for safe operations so Claude skips confirmations. Resume conversations with claude -c instead of re-explaining context. Use /compact to free up the context window on long sessions. Run parallel sessions for independent tasks.',
    },
    {
      question: 'Can Claude Code do code reviews?',
      answer: 'Yes. Pipe a diff or PR directly to Claude and ask for a review. For example: git diff main..feature | claude "review these changes". Claude will analyze the code, flag potential bugs, and suggest improvements.',
    },
    {
      question: 'What is CLAUDE.md?',
      answer: 'A markdown file you place in your project root that Claude reads automatically at the start of every session. Use it to document your architecture, naming conventions, tech stack, and key decisions. You can also have a global one at ~/.claude/CLAUDE.md for preferences that apply across all projects.',
    },
    {
      question: 'How do I manage multiple Claude Code projects?',
      answer: 'Use CodeAgentSwarm for multi-project management. It gives you separate terminals for each project or task, searchable conversation history across all sessions, a task board for tracking work, and notifications so you do not have to watch every terminal.',
    },
    {
      question: 'What are the best Claude Code keyboard shortcuts?',
      answer: 'The most useful commands are /compact to reduce context usage, /clear to start a fresh conversation, /init to generate a CLAUDE.md for your project, and custom slash commands from your .claude/commands/ directory for project-specific workflows.',
    },
  ],
}

export default guide
