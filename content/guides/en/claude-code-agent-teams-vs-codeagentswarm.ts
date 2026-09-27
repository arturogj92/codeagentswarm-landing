import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-agent-teams-vs-codeagentswarm',
    locale: 'en',
    title: 'Claude Code Agent Teams vs CodeAgentSwarm: What Is the Difference?',
    metaTitle: 'Claude Code Agent Teams vs CodeAgentSwarm: What Is the Difference? (2026)',
    metaDescription: 'Compare Claude Code teams of independent sessions with CodeAgentSwarm: context, coordination, providers and how to enable Agent Teams.',
    intro: 'Agent Teams coordinates several Claude Code sessions with their own context. CodeAgentSwarm brings sessions from different providers into a desktop workspace for macOS and Windows. Both support delegation: in CodeAgentSwarm you can supervise work directly or use a <a href="/en/guides/ai-coding-agent-coordinator" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm coordinator</a>.\n\nThe useful distinction is the workspace, the providers and how you review results. This comparison also explains how to enable the experimental Claude Code feature.',
    ctaText: 'Coordinate Claude Code and Codex sessions in CodeAgentSwarm, with tasks, history and change review in one workspace.',
    ctaAgent: 'comparison',
    highlightedWords: [
      'Claude Code Agent Teams',
      'CodeAgentSwarm',
    ],
    publishedAt: '2026-06-07',
    updatedAt: '2026-09-27',
    alternateSlug: 'agent-teams-de-claude-code-vs-codeagentswarm',
    relatedSlug: 'ai-coding-agent-coordinator',
  },
  sections: [
    {
      id: 'bluf',
      title: 'The one-sentence difference',
      content: [
        {
          type: 'image',
          alt: 'OpenAI Codex, the retired Google Gemini CLI showing its migration notice, and Anthropic Claude Code running side by side in CodeAgentSwarm',
          src: '/images/guides/multi-cli-three-agents.png',
          caption: 'Codex, Claude Code and the migration notice from the retired Gemini CLI in a historical CodeAgentSwarm screenshot.',
        },
        {
          type: 'paragraph',
          text: 'Agent Teams organizes a team of Claude Code sessions; CodeAgentSwarm organizes sessions from several providers and adds a visual workspace for supervision and coordination.',
        },
      ],
    },
    {
      id: 'what-are-agent-teams',
      title: 'What Claude Code Agent Teams are',
      content: [
        {
          type: 'paragraph',
          text: 'The <a href="https://code.claude.com/docs/en/agent-teams" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code Agent Teams</a> documentation describes teammates with separate context windows. A lead session coordinates the team through shared tasks and messages.',
        },
        {
          type: 'paragraph',
          text: 'Subagents are a different delegation mechanism: they work within a session, have their own context and return results to their caller. They should not be confused with Agent Team teammates.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Agent Teams is experimental. Resumption, task coordination and shutdown have limitations; check the documentation for your version before relying on it.',
        },
      ],
    },
    {
      id: 'enable-agent-teams',
      title: 'How to enable Agent Teams',
      content: [
        {
          type: 'paragraph',
          text: 'Enable the environment variable when starting an interactive Claude Code session. On macOS or Linux:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 claude',
        },
        {
          type: 'paragraph',
          text: 'In PowerShell:',
        },
        {
          type: 'code',
          language: 'powershell',
          code: '$env:CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS="1"\nclaude',
        },
        {
          type: 'paragraph',
          text: 'Then request a team with specific responsibilities, such as separate accessibility and test reviews of a change. The feature is disabled by default.',
        },
      ],
    },
    {
      id: 'what-is-codeagentswarm',
      title: 'What CodeAgentSwarm adds',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm lets you run independent sessions, search their history, review changes and follow tasks in a desktop app. You can combine Claude Code, Codex and other supported agents without automatically sharing their conversations.',
        },
        {
          type: 'paragraph',
          text: 'To delegate the organization, the <a href="/en/guides/ai-coding-agent-coordinator" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm coordinator</a> takes a goal, opens worker sessions and gives them assignments. You can also work directly with each session.',
        },
      ],
    },
    {
      id: 'comparison',
      title: 'Comparison and when to use each',
      content: [
        {
          type: 'heading',
          level: 3,
          id: 'compare-relation',
          text: 'How agents relate',
        },
        {
          type: 'paragraph',
          text: 'In Agent Teams, a lead coordinates Claude Code teammates. In CodeAgentSwarm, you can manage sessions directly or ask another agent to coordinate them.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-control',
          text: 'Who directs the work',
        },
        {
          type: 'paragraph',
          text: 'Both support delegation. Define the scope, check decisions and review the result before integrating it.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-vendors',
          text: 'Providers',
        },
        {
          type: 'paragraph',
          text: 'Agent Teams belongs to Claude Code. CodeAgentSwarm lets you choose among several agents and providers in one workspace.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-context',
          text: 'Context and usage',
        },
        {
          type: 'paragraph',
          text: 'Independent contexts do not mean independent quotas. Agents authenticated with the same account can consume shared limits. More parallel work can increase usage.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-fit',
          text: 'Best fit',
        },
        {
          type: 'paragraph',
          text: 'Use Agent Teams for collaboration within Claude Code. Consider CodeAgentSwarm when you need to mix providers, organize several projects or review sessions through a common interface.',
        },
        {
          type: 'heading',
          level: 3,
          id: 'compare-visibility',
          text: 'Visibility',
        },
        {
          type: 'paragraph',
          text: 'Claude Code lets you interact with teammates. CodeAgentSwarm adds a workspace overview, searchable history, notifications and change review across sessions.',
        },
      ],
    },
    {
      id: 'use-both',
      title: 'Using both options',
      content: [
        {
          type: 'paragraph',
          text: 'You can start Claude Code in a CodeAgentSwarm terminal and enable its native Agent Teams feature. Use the display mode and configuration supported by that terminal; do not assume every teammate will appear as a separate CodeAgentSwarm session.',
        },
        {
          type: 'paragraph',
          text: 'Define which files or tasks each team owns. For changes that may overlap, use separate branches and checkouts and review diffs before integrating.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What are Claude Code Agent Teams?',
      answer: 'They are teams of Claude Code sessions with separate context, coordinated through a lead, shared tasks and messages.',
    },
    {
      question: 'Are they the same as subagents?',
      answer: 'No. Subagents delegate work within a session and return results to their caller; they also have their own context. Agent Teams coordinates multiple sessions.',
    },
    {
      question: 'How do I enable them?',
      answer: 'Set CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 in the environment of an interactive Claude Code session. The feature is experimental and disabled by default.',
    },
    {
      question: 'Can CodeAgentSwarm coordinate agents too?',
      answer: 'Yes. A coordinator can plan work and open sessions with different agents and models. The user can also supervise and direct each session.',
    },
    {
      question: 'Do multiple sessions give me more quota?',
      answer: 'No. Separating conversations does not expand an account’s limits. Usage depends on the provider, authentication and each agent’s work.',
    },
  ],
}

export default guide
