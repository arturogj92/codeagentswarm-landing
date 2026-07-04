import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'share-skills-between-claude-code-codex-antigravity',
    locale: 'en',
    title: 'How to Share Your Skills Between Claude Code, Codex and Antigravity',
    metaTitle: 'Share Skills Between Claude Code, Codex and Antigravity (CodeAgentSwarm, 2026)',
    metaDescription: 'Your Claude Code skills only live in Claude. Here is how to copy the same SKILL.md skills to Codex and Antigravity in one click with CodeAgentSwarm, instead of moving folders by hand.',
    intro: `You spent time setting up good skills for Claude Code. Then you open Codex or Antigravity for a task, and none of them are there. Same SKILL.md format, same machine, but each agent only reads its own folder.

I hit this myself while using several agents in the same day, so I added a way to fix it in CodeAgentSwarm: pick a source agent, pick where you want the skills, and export them in one click.

In this guide I'll explain, plain and simple, why your skills get stuck in one agent and how to share them across Claude Code, Codex and Antigravity without copying folders by hand.`,
    ctaText: 'Set up your skills once in Claude Code, then export them to Codex and Antigravity in one click so every agent works with the same toolkit.',
    highlightedWords: ['skills', 'Codex', 'Antigravity'],
    publishedAt: '2026-07-04',
    updatedAt: '2026-07-04',
    alternateSlug: 'compartir-skills-entre-claude-code-codex-antigravity',
  },
  sections: [
    {
      id: 'why-skills-are-stuck-in-one-agent',
      title: 'Why your skills get stuck in one agent',
      content: [
        {
          type: 'paragraph',
          text: 'A skill is just a folder with a <a href="https://code.claude.com/docs/en/skills" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">SKILL.md</a> file inside. The nice part is that Claude Code, Codex, Antigravity and OpenCode all read the exact same format. The annoying part is that each one reads it from its own folder.',
        },
        {
          type: 'list',
          items: [
            'Claude Code reads skills from ~/.claude/skills',
            'Codex reads them from ~/.codex/skills',
            'Antigravity reads them from ~/.gemini/antigravity-cli/skills',
            'OpenCode reads them from ~/.config/opencode/skills',
          ],
        },
        {
          type: 'paragraph',
          text: 'So a skill you installed for Claude is simply invisible to Codex and Antigravity. Nothing is broken. It just lives in a folder the other agents never look at.',
        },
        {
          type: 'paragraph',
          text: 'If you only use one agent, this never comes up. But the moment you jump between Claude Code, Codex and Antigravity in the same project, you notice that half your toolkit is missing depending on which one you opened.',
        },
      ],
    },
    {
      id: 'the-manual-way',
      title: 'The manual way (and why it gets old)',
      content: [
        {
          type: 'paragraph',
          text: 'Because the format is identical, you can move a skill by hand. Copy the folder from one agent to the other:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'cp -r ~/.claude/skills/my-skill ~/.codex/skills/\ncp -r ~/.claude/skills/my-skill ~/.gemini/antigravity-cli/skills/',
        },
        {
          type: 'paragraph',
          text: 'That works for one skill. It gets old fast when you have twenty, when you want them in two agents at once, and when you have to remember which ones you already copied and which ones you edited later.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Copying folders blindly also overwrites a skill you may have tweaked for a specific agent. Doing this by hand, it is easy to clobber your own changes without noticing.',
        },
      ],
    },
    {
      id: 'export-skills-in-one-click',
      title: 'Export your skills in one click with CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm does the same copy, but it shows you exactly what will happen and lets you pick. Here is the whole flow.',
        },
        {
          type: 'heading',
          level: 3,
          text: '1. Open the Skills tab and click Export to agent',
          id: 'step-open',
        },
        {
          type: 'paragraph',
          text: 'Go to Settings, open the Skills tab, and stay on Installed. Next to Refresh and Open Folder you will find the Export to agent button.',
        },
        {
          type: 'image',
          alt: 'The Export to agent button in the CodeAgentSwarm Skills tab',
          src: '/images/guides/export-skills-entry.png',
          caption: 'Export to agent lives in the Skills header, next to Refresh and Open Folder.',
          size: 'medium',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Pick the source, pick the targets, pick the skills',
          id: 'step-pick',
        },
        {
          type: 'paragraph',
          text: 'The modal asks three things. Where the skills come from (the source agent), where they should go (one or more target agents), and which skills you actually want. Every skill starts selected, so you deselect the ones you do not need.',
        },
        {
          type: 'image',
          alt: 'The Export skills modal in CodeAgentSwarm with source and target agents and the skill list',
          src: '/images/guides/export-skills-modal.png',
          caption: 'Source on the left, one or more targets on the right, and the full list of skills below with search and select all.',
        },
        {
          type: 'paragraph',
          text: 'Each skill tells you whether it is New in the target or Already in it, so you are never guessing what you are about to overwrite.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Choose overwrite or skip, then export',
          id: 'step-overwrite',
        },
        {
          type: 'paragraph',
          text: 'The Overwrite existing toggle controls what happens with skills that are already in a target. Off (the default) skips them and keeps whatever is there. On replaces them with the source version. When you are ready, click Export and watch it run, agent by agent.',
        },
        {
          type: 'image',
          alt: 'The result screen after exporting skills, with a per-agent breakdown',
          src: '/images/guides/export-skills-result.png',
          caption: 'When it finishes you get a per-agent summary: what was copied, what was skipped, and anything that failed.',
        },
      ],
    },
    {
      id: 'overwrite-or-skip',
      title: 'Overwrite or skip: which one to pick',
      content: [
        {
          type: 'paragraph',
          text: 'A simple rule that keeps you out of trouble:',
        },
        {
          type: 'list',
          items: [
            'Leave Overwrite off when you just want the target to have your skills and you do not want to touch anything already there. Anything that exists is skipped.',
            'Turn Overwrite on when you edited a skill in the source and want the target to match it exactly. It replaces the target copy.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Off is the safe default on purpose. It will never quietly replace a skill you tuned for a specific agent.',
        },
      ],
    },
    {
      id: 'one-toolkit-everywhere',
      title: 'One toolkit across every agent',
      content: [
        {
          type: 'paragraph',
          text: 'The point of this is simple. You set up your skills once, in whichever agent you like, and then every agent you use has the same toolkit. No reinstalling the same skill three times, no folder juggling.',
        },
        {
          type: 'paragraph',
          text: 'If you are still building your skill collection, the built in marketplace is the fastest way to fill it: <a href="/en/guides/claude-code-skills-marketplace" class="text-neon-cyan hover:text-neon-purple transition-colors">How to browse and install skills from the CodeAgentSwarm marketplace</a>. Install them once, then export them everywhere.',
        },
        {
          type: 'paragraph',
          text: 'And if you are running several agents side by side, this pairs well with the multi agent workflow: <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">How to run Claude Code, Codex and Gemini agents in parallel</a>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Do Claude Code, Codex and Antigravity use the same skill format?',
      answer: 'Yes. All three read a folder with a SKILL.md file in the same format. The only difference is the folder each one looks in, which is why a skill installed for one is not seen by the others until you copy it over.',
    },
    {
      question: 'Can I copy my Claude Code skills to Codex or Antigravity?',
      answer: 'Yes. In CodeAgentSwarm open the Skills tab, click Export to agent, choose Claude as the source, pick Codex, Antigravity and/or OpenCode as the target, and export. It copies the real SKILL.md folders into the target agent, no format conversion needed.',
    },
    {
      question: 'Where does each agent store its skills?',
      answer: 'Claude Code uses ~/.claude/skills, Codex uses ~/.codex/skills, Antigravity uses ~/.gemini/antigravity-cli/skills, and OpenCode uses ~/.config/opencode/skills. Each folder holds one subfolder per skill with its SKILL.md inside.',
    },
    {
      question: 'Will exporting overwrite skills I already edited in the target?',
      answer: 'No, not by default. Skills that already exist in the target are skipped, so your edits are safe. If you actually want the target to match the source, turn on the Overwrite existing toggle before you export.',
    },
    {
      question: 'Do I have to reinstall each skill from the marketplace for every agent?',
      answer: 'No. Install a skill once, then export it to the other agents. You do not need to go through the marketplace again for each agent.',
    },
    {
      question: 'Does this work on Windows and macOS?',
      answer: 'Yes. CodeAgentSwarm runs on both, and the export works the same way on each. Only the skill folder paths differ per operating system, and the app handles that for you.',
    },
  ],
}

export default guide
