import type { Guide } from '../types'

const A = 'class="text-neon-cyan hover:text-neon-purple transition-colors"'
const EXT = `target="_blank" rel="noopener noreferrer" ${A}`

export const guide: Guide = {
  meta: {
    slug: 'claude-code-subagents',
    locale: 'en',
    title: 'Claude Code Subagents: What They Are and How to Use Them',
    metaTitle: 'Claude Code Subagents: What They Are and How to Use Them',
    metaDescription: 'What Claude Code subagents are, the built-in ones, how to create your own in .claude/agents, and how to see each subagent, its model and its step.',
    intro: `A subagent is a helper that Claude Code hands a side task to. It works in its own context window, does the noisy part (searching the codebase, reading logs, reviewing a diff) and sends back only the result, so your main conversation stays short and focused.\n\nThis guide covers what Anthropic's docs say about subagents, how to write your own, and how CodeAgentSwarm shows every subagent while it works, with its model and current step, and lets agents start subagents on any model you are signed in to.`,
    ctaText: 'Open a Claude Code Chat in CodeAgentSwarm and watch each subagent, its model and its current step, instead of a single "delegating" line.',
    ctaAgent: 'claude-code',
    highlightedWords: ['Claude Code', 'Subagents'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'subagentes-claude-code',
    relatedSlug: 'claude-code-agent-teams-vs-codeagentswarm',
  },
  sections: [
    {
      id: 'what-are-subagents',
      title: 'What subagents are',
      content: [
        {
          type: 'paragraph',
          text: `In Anthropic's words, from the <a href="https://code.claude.com/docs/en/sub-agents" ${EXT}>subagents documentation</a>, each subagent "runs in its own context window with a custom system prompt, specific tool access, and independent permissions." When a task matches a subagent's description, Claude delegates to it and gets the result back.`,
        },
        {
          type: 'list',
          items: [
            '<strong>Clean context</strong>: the subagent does not see your conversation history. It reads what it needs and returns a summary.',
            '<strong>Limited tools</strong>: you can give a reviewer read-only tools and keep Edit and Write away from it.',
            '<strong>Its own model</strong>: a quick search can run on a smaller model while the main session stays on a bigger one.',
            '<strong>Same usage limits</strong>: a subagent sends its own requests, and they count toward the same limits as your main conversation.',
          ],
        },
      ],
    },
    {
      id: 'built-in',
      title: 'The built-in subagents',
      content: [
        {
          type: 'list',
          items: [
            '<strong>Explore</strong>: a fast, read-only agent for searching and analyzing a codebase.',
            '<strong>Plan</strong>: a read-only research agent used in plan mode to gather context before proposing a plan.',
            '<strong>general-purpose</strong>: for complex, multi-step tasks that need both exploration and changes.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Claude picks them on its own. You can also ask for one directly, for example: "use the Explore subagent to find every place we read the session cookie".',
        },
      ],
    },
    {
      id: 'create',
      title: 'How to create your own subagent',
      content: [
        {
          type: 'paragraph',
          text: 'A subagent is a Markdown file with YAML frontmatter. Put it in <code>.claude/agents/</code> to share it with a project, or in <code>~/.claude/agents/</code> to use it in all your projects. Only <code>name</code> and <code>description</code> are required.',
        },
        {
          type: 'code',
          language: 'markdown',
          code: '---\nname: code-reviewer\ndescription: Reviews code for quality and best practices\ntools: Read, Glob, Grep\nmodel: sonnet\n---\n\nYou are a code reviewer. When invoked, analyze the code and provide\nspecific, actionable feedback on quality, security, and best practices.',
        },
        {
          type: 'list',
          items: [
            '<code>description</code> tells Claude when to delegate. Keep it short and specific.',
            '<code>tools</code> limits what the subagent can use. Leave it out and it inherits the available tools.',
            '<code>model</code> accepts <code>sonnet</code>, <code>opus</code>, <code>haiku</code>, <code>fable</code>, a full model ID or <code>inherit</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'You do not have to write the file by hand. Ask Claude Code to create the subagent for you and review what it writes.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Subagents can run in the foreground, blocking the main conversation until they finish, or in the background while you keep working.',
        },
      ],
    },
    {
      id: 'subagents-vs-teams',
      title: 'Subagents vs Agent Teams vs separate sessions',
      content: [
        {
          type: 'paragraph',
          text: `Subagents live inside one session and report back to it. Agent Teams coordinate several Claude Code sessions through a lead (see <a href="/en/guides/claude-code-agent-teams-vs-codeagentswarm" ${A}>Claude Code Agent Teams vs CodeAgentSwarm</a>). Separate sessions are fully independent, and you can still ask one agent to plan the work and hand it out with a <a href="/en/guides/ai-coding-agent-coordinator" ${A}>coordinator</a>.`,
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'See every subagent in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'In a plain terminal, a subagent is a line that says work was delegated, and what it does stays out of sight. The CodeAgentSwarm Chat gives each turn a subagents block. Every row shows:',
        },
        {
          type: 'list',
          items: [
            'The agent icon and the subagent name.',
            'What it is doing right now.',
            'Its model and reasoning level, when the agent reports them (for Claude Code, when the call names a model such as Haiku).',
            'Its status and how long it has been running.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Click a row to open that subagent\'s own conversation: its instructions, its replies and the tools it used. A breadcrumb takes you back to the main conversation. Next to the message box, a counter shows how many subagents are running; it lists the ones waiting for you first, then the running ones, then the finished ones, so you can open any of them later.',
        },
        { type: 'heading', level: 3, id: 'any-model', text: 'Subagents on any model you are signed in to' },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm also gives every agent a way to start its own subagents, and they can run on any model you are signed in to in CodeAgentSwarm, not only the parent\'s. The rules are simple:',
        },
        {
          type: 'list',
          items: [
            'If you name an agent or a model ("ask a Codex subagent to review this"), it uses that one.',
            'Otherwise the subagent uses the same agent, model and reasoning as the parent.',
            'The agent only picks another provider when a second opinion or a better-suited model clearly helps, and only if that provider still has quota left.',
            'It tells you why in one short line, and these subagents show when they are waiting for an answer from you.',
          ],
        },
        {
          type: 'paragraph',
          text: `If you ask for the work to go to another agent yourself, CodeAgentSwarm opens it as a normal, visible session instead, so you can follow it like any other. For running many sessions at once, see <a href="/en/guides/claude-code-agent-swarm" ${A}>Claude Code agent swarm</a>.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is a subagent in Claude Code?',
      answer: 'A specialized helper with its own context window, system prompt, tools and permissions. Claude delegates a task to it and receives only the result, which keeps the main conversation focused.',
    },
    {
      question: 'Where do I put custom subagents?',
      answer: 'In .claude/agents/ for one project or ~/.claude/agents/ for all your projects. Each subagent is a Markdown file with name and description in its frontmatter, plus optional tools and model.',
    },
    {
      question: 'Do subagents use more of my plan?',
      answer: 'They send their own requests, and those count toward the same usage limits as your main conversation.',
    },
    {
      question: 'Can a subagent use a different model?',
      answer: 'Yes. Set model in the frontmatter (sonnet, opus, haiku, fable, a full model ID or inherit). In CodeAgentSwarm, agents can also start subagents on another provider you are signed in to, such as Codex.',
    },
    {
      question: 'How do I see what a subagent is doing?',
      answer: 'In the CodeAgentSwarm Chat, each subagent appears as a row with its current step, model, status and time. Click it to open its full conversation.',
    },
  ],
}

export default guide
