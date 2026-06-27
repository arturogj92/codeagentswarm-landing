import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'claude-code-skills-marketplace',
    locale: 'en',
    title: 'Claude Code Skills Marketplace: Browse and Install Agent Skills',
    metaTitle: 'Claude Code Skills Marketplace: Browse and Install Agent Skills (2026)',
    metaDescription: 'Browse and one-click install Claude Code skills from a marketplace with tens of thousands of agent skills. Install the same skill to Claude, Gemini or Codex.',
    intro: `If you have ever wanted to give Claude Code a reusable capability (a way to write commits, run a release, generate a changelog) you have probably ended up copying SKILL.md files around by hand, dropping folders into hidden directories, and hoping you got the path right.

CodeAgentSwarm ships with a built-in Skills Marketplace so you do not have to do any of that. It mirrors a large public catalogue of agent skills (tens of thousands of them), lets you search and sort by stars, and installs the one you want with a single click.

The part I like most: when you install a skill, you choose where it goes. You can install it to Claude, to Gemini, to Codex, or to all of them at once. So one skill you found becomes a capability shared across every CLI agent you run, instead of something locked to a single tool.`,
    highlightedWords: ['Skills Marketplace', 'Agent Skills', 'Install'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'marketplace-de-skills-claude-code',
    ctaText: 'Open the Skills Marketplace in CodeAgentSwarm, find a skill you actually want, and install it to Claude, Gemini or Codex in one click.',
  },
  sections: [
    {
      id: 'what-it-is',
      title: 'What the Claude Code Skills Marketplace is',
      content: [
        {
          type: 'paragraph',
          text: 'The Skills Marketplace is a screen inside CodeAgentSwarm where you browse agent skills and install them with one click. Think of it as an app store for capabilities you can hand to your CLI agents.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm Skills Marketplace showing a grid of skill cards, each with a name, description, star count and an Install button',
          src: '/images/guides/skills-marketplace.png',
          caption: 'The Skills Marketplace: a grid of skill cards with search, star counts and one-click Install buttons.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'A skill is a small bundle: a SKILL.md file that describes what the skill does and when to use it, plus its folder of supporting files (scripts, templates, references). When an agent has that skill installed, it can pick it up automatically when the task matches.',
        },
        {
          type: 'paragraph',
          text: 'The marketplace mirrors a large public catalogue, so you are not limited to a handful of curated examples. There are tens of thousands of skills to look through, you can search by keyword, and you can sort by stars to surface the ones other people actually rely on.',
        },
        {
          type: 'paragraph',
          text: 'If you are new to <a href="https://docs.anthropic.com/en/docs/claude-code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code</a>, it is Anthropic\'s agentic coding tool that runs in your terminal. Skills are how you extend what it knows how to do without retyping the same instructions in every session.',
        },
      ],
    },
    {
      id: 'how-to-install',
      title: 'How to install a Claude Code skill (and where it goes)',
      content: [
        {
          type: 'paragraph',
          text: 'Installing is the easy part. You open the marketplace, find a skill, and click Install. What makes it interesting is the choice you get about where to install it.',
        },
        {
          type: 'paragraph',
          text: 'On a skill\'s detail view you do not just get a single Install button. You get a set of targets:',
        },
        {
          type: 'list',
          items: [
            'Install to Claude, dropping the skill into Claude Code\'s skills directory',
            'Install to Gemini, so the Gemini CLI can use the same skill',
            'Install to Codex, so the Codex CLI can use it too',
            'Install all, which puts the skill into every agent at once',
          ],
        },
        {
          type: 'image',
          alt: 'A skill detail view in CodeAgentSwarm with Install to Claude, Install to Gemini, Install to Codex and Install all buttons',
          src: '/images/guides/skills-install-multi-cli.png',
          caption: 'On a skill\'s detail view you choose the target: Claude, Gemini, Codex, or all of them at once.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'The practical flow looks like this:',
        },
        {
          type: 'list',
          items: [
            'Open the Skills Marketplace in CodeAgentSwarm.',
            'Search for what you need, or sort by stars to see the popular ones.',
            'Open a skill to read its description and what it is for.',
            'Click Install to Claude (or Gemini, Codex, or Install all).',
            'Start a session and the agent can use the skill from then on.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'If you are not sure which agent you will use a skill with, just pick Install all. The skill is small, and having it available everywhere means you never have to come back and install it again for a different CLI.',
        },
      ],
    },
    {
      id: 'where-stored',
      title: 'Where Claude Code skills are stored',
      content: [
        {
          type: 'paragraph',
          text: 'When you install a skill to Claude, CodeAgentSwarm writes it into your Claude Code skills directory at ~/.claude/skills/. Each skill lives in its own folder there, with its SKILL.md and any supporting files alongside it.',
        },
        {
          type: 'paragraph',
          text: 'Because they are plain files on disk, nothing is hidden or magic. You can open the folder, read the SKILL.md, tweak it, or delete a skill you no longer want. The marketplace just saves you the manual copying.',
        },
        {
          type: 'paragraph',
          text: 'Installing to Gemini or Codex works the same way, each CLI has its own skills location, and CodeAgentSwarm puts the files where that agent expects them. That is the whole point of the multi-target install: one source, written to the right place for each tool.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Because skills are just folders, they play nicely with version control. If you keep a dotfiles repo, you can track your installed skills there and carry your setup between machines.',
        },
      ],
    },
    {
      id: 'across-clis',
      title: 'One skill library across Claude, Gemini and Codex',
      content: [
        {
          type: 'paragraph',
          text: 'This is the reason the marketplace matters more inside CodeAgentSwarm than it would as a standalone catalogue. CodeAgentSwarm is built to run several CLI agents in parallel, many terminals across Claude Code, the Codex CLI and the Gemini CLI at the same time.',
        },
        {
          type: 'paragraph',
          text: 'If your skills only worked with one agent, you would end up with a good toolbox for Claude and an empty one for Gemini and Codex. The multi-target install fixes that. Find a useful skill once, install it everywhere, and every agent in your swarm has the same capability.',
        },
        {
          type: 'paragraph',
          text: 'For example, a "generate a release changelog" skill installed to all three means it does not matter which terminal handles the release. The Codex terminal, the Gemini terminal and the Claude terminal all know how to do it the same way.',
        },
        {
          type: 'paragraph',
          text: 'If you want the bigger picture of running multiple CLI agents together, see this guide: <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">How to Build an AI CLI Agent Swarm with Claude, Codex and Gemini</a>.',
        },
      ],
    },
    {
      id: 'skills-vs-mcp',
      title: 'Skills vs MCP servers: when to use which',
      content: [
        {
          type: 'paragraph',
          text: 'People sometimes mix up skills and MCP servers because both extend what an agent can do. They solve different problems, and you will usually want both.',
        },
        {
          type: 'paragraph',
          text: 'A skill is knowledge and instructions, packaged. It teaches the agent how to do something (a workflow, a convention, a recipe) using the tools it already has. It is text and supporting files, installed locally.',
        },
        {
          type: 'paragraph',
          text: 'An MCP server is a connection to an external capability or system: a database, an issue tracker, a browser, an API. It gives the agent new tools to call, not just instructions to follow.',
        },
        {
          type: 'paragraph',
          text: 'A rough rule: if you want the agent to know how to do a task it could already attempt, reach for a skill. If you want the agent to reach into a system it cannot touch otherwise, reach for an MCP server. To pick MCP servers, see this guide: <a href="/en/guides/best-mcp-servers-claude-code" class="text-neon-cyan hover:text-neon-purple transition-colors">The Best MCP Servers for Claude Code</a>.',
        },
      ],
    },
    {
      id: 'create-your-own',
      title: 'Creating and sharing your own skill',
      content: [
        {
          type: 'paragraph',
          text: 'Once you have used a few installed skills, you will probably want to make your own for the workflows specific to your projects.',
        },
        {
          type: 'paragraph',
          text: 'A skill is just a folder with a SKILL.md file. The SKILL.md describes what the skill does, when the agent should use it, and the steps or rules to follow. Add any scripts, templates or reference files the skill needs into the same folder.',
        },
        {
          type: 'list',
          items: [
            'Create a folder for your skill inside the skills directory (for Claude, that is ~/.claude/skills/).',
            'Write a SKILL.md that explains the purpose, the trigger ("use this when..."), and the steps.',
            'Drop in any helper files the skill relies on.',
            'Start a session and try it. Refine the SKILL.md until the agent uses it the way you want.',
          ],
        },
        {
          type: 'paragraph',
          text: 'To share a skill, you can publish it to the public catalogue the marketplace mirrors, or simply commit the folder to a repo your team clones. Either way, the format is the same, so anything you build is portable across Claude, Gemini and Codex.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Start by copying a skill you already installed and editing it. Reading a working SKILL.md is the fastest way to learn the format before writing one from scratch.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What are Claude Code skills?',
      answer: 'A Claude Code skill is a reusable capability you give the agent. It is a SKILL.md file describing what the skill does and when to use it, plus a folder of supporting files (scripts, templates, references). Once installed, Claude Code can pick up the skill automatically when a task matches it, instead of you retyping the same instructions every session.',
    },
    {
      question: 'How do I install a Claude Code skill?',
      answer: 'Open the Skills Marketplace inside CodeAgentSwarm, search or sort by stars to find a skill, open it, and click Install. On the skill\'s detail view you choose the target: Install to Claude, Install to Gemini, Install to Codex, or Install all. The files are written to the right place automatically.',
    },
    {
      question: 'Where are Claude Code skills stored?',
      answer: 'Skills installed to Claude live in your Claude Code skills directory at ~/.claude/skills/, with each skill in its own folder next to its SKILL.md. They are plain files, so you can open, edit, version control or delete them. Gemini and Codex each have their own skills location, and CodeAgentSwarm writes the files where each agent expects them.',
    },
    {
      question: 'Can I use the same skill with Codex and Gemini?',
      answer: 'Yes. When you install a skill from the marketplace you choose the target, and you can pick Install to Codex, Install to Gemini, Install to Claude, or Install all. Choosing Install all puts the same skill into every CLI agent at once, so one skill library works across all of them.',
    },
    {
      question: 'How do I create my own skill?',
      answer: 'Make a folder inside your skills directory (for Claude, ~/.claude/skills/) and add a SKILL.md that explains what the skill does, when to use it, and the steps to follow. Include any scripts or templates the skill needs in the same folder. Start a session to test it and refine the SKILL.md until the agent behaves the way you want. The easiest start is to copy an installed skill and edit it.',
    },
    {
      question: 'How many skills are in the marketplace?',
      answer: 'The marketplace mirrors a large public catalogue with tens of thousands of skills. You can search by keyword to narrow things down and sort by stars to see the ones people rely on most.',
    },
    {
      question: 'What is the difference between a skill and an MCP server?',
      answer: 'A skill is packaged knowledge and instructions: it teaches the agent how to do a task with the tools it already has. An MCP server connects the agent to an external system (a database, a browser, an API) and gives it new tools to call. They complement each other, and you will usually use both.',
    },
  ],
}

export default guide
