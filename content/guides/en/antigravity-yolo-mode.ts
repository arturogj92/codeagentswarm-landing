import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-yolo-mode',
    locale: 'en',
    title: 'Antigravity YOLO Mode: How --dangerously-skip-permissions Really Works',
    metaTitle: 'Antigravity (agy) YOLO Mode: Skip Permissions Explained (2026)',
    metaDescription: 'How to run agy with --dangerously-skip-permissions, what the flag actually skips, when YOLO mode is worth it, and how to contain the blast radius.',
    intro: `Antigravity's YOLO mode is one flag: <code>agy --dangerously-skip-permissions</code>. It turns off the confirmation prompt on every action the agent takes, so <code>agy</code> stops asking and just runs.

The name is not marketing. Google could have called it auto-approve, and other vendors do, but the flag is deliberately spelled out so you cannot type it by accident or leave it in a script without noticing. That honesty is worth respecting: this is the mode where the agent edits, deletes, installs and executes without a checkpoint.

This guide covers what the flag actually skips, why it changes how fast Antigravity feels rather than how capable it is, the three situations where it genuinely earns its place, and the containment strategies that make it safe enough to leave running.`,
    ctaText: 'YOLO mode is fastest when several agents run at once and none of them stop to ask. CodeAgentSwarm runs a whole swarm of Antigravity sessions side by side, with a notification the moment any of them finishes.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity', 'YOLO', 'Mode'],
    publishedAt: '2026-08-05',
    updatedAt: '2026-09-01',
    alternateSlug: 'modo-yolo-antigravity',
  },
  sections: [
    {
      id: 'the-flag',
      title: 'The flag, and what it actually does',
      content: [
        {
          type: 'heading',
          level: 3,
          text: 'agy --dangerously-skip-permissions: what the flag skips',
          id: 'agy-skip-permissions',
        },
        {
          type: 'paragraph',
          text: '<code>agy --dangerously-skip-permissions</code> skips the confirmation prompt on every action that changes something: writing a file, deleting one, running a shell command, installing a dependency. agy stops asking and just runs. It is the same agent making the same decisions, so what the flag removes is your veto, not the agent\'s caution.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Normal: agy asks before it acts\nagy\n\n# YOLO / turbo: auto-approve everything, no confirmation prompts\nagy --dangerously-skip-permissions',
        },
        {
          type: 'paragraph',
          text: 'By default, <code>agy</code> pauses before actions that change something and waits for you to approve them. Reading a file is free; writing one, deleting one, running a shell command or installing a dependency is not. Each of those stops the agent until you say yes.',
        },
        {
          type: 'paragraph',
          text: '<code>--dangerously-skip-permissions</code> removes that gate entirely. The agent still decides what to do in exactly the same way and is exactly as capable as before. <strong>What changes is the latency between its decision and the action</strong>, and therefore how far it can get without you.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The flag does not make the agent more aggressive, more autonomous in its planning, or more willing to attempt risky things. It only removes your veto. An agent that would have proposed deleting the wrong directory still proposes it; you simply are not there to say no.',
        },
        {
          type: 'paragraph',
          text: 'That distinction matters when you are deciding whether to use it. The question is not "do I trust the agent more in this mode", because it is the same agent. The question is "am I going to catch a bad action at the prompt, or would I have clicked yes anyway".',
        },
      ],
    },
    {
      id: 'why-it-matters',
      title: 'Why approval prompts cost more than they look like they cost',
      content: [
        {
          type: 'paragraph',
          text: 'A confirmation prompt takes a second to answer. The reason YOLO mode feels transformative rather than marginally convenient is that the cost is not the second, it is the <strong>interruption</strong>.',
        },
        {
          type: 'paragraph',
          text: 'An agent working through a refactor might touch thirty files. In approval mode that is thirty moments where the agent is idle and waiting for a human, and thirty moments where you cannot be doing anything else because the agent is blocked on you. The agent works at your attention span rather than at its own speed.',
        },
        {
          type: 'paragraph',
          text: 'This gets dramatically worse with parallel agents, which is the case that actually motivates the flag. Four Antigravity sessions in approval mode do not give you four times the throughput; they give you one human round-robining between four blocked processes, and the agents spend most of their time waiting. <strong>Approval mode does not scale past one agent.</strong> That is the real argument for YOLO, and it is the same argument that applies in <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity agent swarm guide</a>.',
        },
        {
          type: 'paragraph',
          text: 'The flip side is honest: in approval mode you see every action before it happens, which is a real review process. YOLO trades continuous review for a single review at the end, and that trade is only good if the end state is something you can actually review.',
        },
      ],
    },
    {
      id: 'when-to-use-it',
      title: 'The three situations where YOLO genuinely earns its place',
      content: [
        {
          type: 'paragraph',
          text: 'Blanket advice in either direction is useless here. These are the cases where the trade actually pays:',
        },
        {
          type: 'list',
          items: [
            '<strong>Mechanical work with a clear finish line.</strong> Renaming a symbol across a codebase, migrating a deprecated API, updating imports after a move. The agent will make dozens of near-identical edits, you would approve all of them, and the diff at the end is easy to read.',
            '<strong>Anything with a test suite as the safety net.</strong> If a green test run is the real gate, the approval prompt is a worse version of the same check. Let the agent work and let the tests judge it.',
            '<strong>Parallel sessions.</strong> Once you are running more than one agent, approval mode stops being a safety feature and starts being a bottleneck that keeps every agent idle.',
          ],
        },
        {
          type: 'paragraph',
          text: 'And the cases where it does not:',
        },
        {
          type: 'list',
          items: [
            '<strong>Exploratory work</strong>, where you are still deciding what the right change is. The prompts are where you steer.',
            '<strong>Anything touching infrastructure, credentials or production</strong>. The blast radius of a wrong action is not bounded by <code>git</code>.',
            '<strong>An unfamiliar codebase</strong>, where you cannot yet tell a reasonable edit from an unreasonable one by reading the diff.',
          ],
        },
      ],
    },
    {
      id: 'containment',
      title: 'Containing the blast radius',
      content: [
        {
          type: 'paragraph',
          text: 'YOLO mode is safe in proportion to how easily you can undo it. Three habits do almost all of the work, and none of them involve trusting the agent more.',
        },
        {
          type: 'paragraph',
          text: '<strong>Commit before you start.</strong> This is the whole strategy in one line. A clean working tree before an unattended run means the agent\'s entire output is a diff you can read, stage selectively, or throw away with one command. It costs five seconds and it converts "what did it do to my files" into a normal code review.',
        },
        {
          type: 'paragraph',
          text: '<strong>Give each agent its own worktree.</strong> If several YOLO sessions share one checkout, they will edit each other\'s files and you will not be able to tell whose change was whose. A git worktree per agent gives each one an isolated directory on its own branch, which is covered in <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">the worktrees guide</a>.',
        },
        {
          type: 'paragraph',
          text: '<strong>Scope the task, not the permissions.</strong> A tightly-specified task is a better safety mechanism than a confirmation prompt on a vague one. "Update these four files to use the new client" fails safely. "Clean up the codebase" does not, in any mode.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Do not put --dangerously-skip-permissions in a shell alias for agy. The flag is verbose on purpose, and hiding it behind a short alias means you will eventually run an exploratory session in YOLO mode without realising it. Keep the typing cost; it is doing a job.',
        },
      ],
    },
    {
      id: 'session-flags',
      title: 'The other flags worth knowing alongside it',
      content: [
        {
          type: 'code',
          language: 'bash',
          code: '# Start a new session in the current project\nagy\n\n# Continue your most recent conversation\nagy -c\n\n# Resume a specific conversation by id\nagy --conversation <id>',
        },
        {
          type: 'paragraph',
          text: 'These matter for YOLO specifically because an unattended run is exactly the kind of session you will want to come back to. <code>agy -c</code> picks up your most recent conversation where it ended, which is the one you will reach for after reviewing a diff and deciding the agent needs one more pass.',
        },
        {
          type: 'paragraph',
          text: 'When you have several sessions and need an older one, <code>agy --conversation &lt;id&gt;</code> resumes it by id. Finding that id is its own small problem, and it is covered in <a href="/en/guides/antigravity-cli-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">the Antigravity conversation history guide</a>.',
        },
      ],
    },
    {
      id: 'running-several',
      title: 'Running several YOLO agents without losing track',
      content: [
        {
          type: 'paragraph',
          text: 'The moment YOLO mode pays off is also the moment it becomes hard to supervise. Agents that never stop to ask also never announce themselves, so a session that finished twenty minutes ago looks exactly like one still working, and a session that went wrong looks exactly like one going well.',
        },
        {
          type: 'paragraph',
          text: '<a href="/" class="text-neon-cyan hover:text-neon-purple transition-colors">CodeAgentSwarm</a>, the desktop workspace for running several AI CLI agents in parallel, gives every Antigravity session its own terminal with a live status, so you can see at a glance which agents are working, which are waiting and which are done, and it fires a desktop notification the moment any of them finishes. Combined with a worktree per agent, that is what makes a swarm of YOLO sessions supervisable rather than just fast.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is YOLO mode in Antigravity CLI?',
      answer: 'It is the auto-approve mode, enabled with agy --dangerously-skip-permissions. Antigravity stops asking for confirmation before actions that change things (writing files, running commands, installing dependencies) and simply runs them.',
    },
    {
      question: 'Does YOLO mode make Antigravity more capable?',
      answer: 'No. It is exactly the same agent making exactly the same decisions. The only thing that changes is that your approval step is removed, so the agent gets further without waiting for you. It does not become more aggressive or more autonomous in its planning.',
    },
    {
      question: 'Is --dangerously-skip-permissions safe?',
      answer: 'It is as safe as your ability to undo it. Commit before you start so the agent output is a reviewable diff, give each agent its own git worktree so parallel sessions cannot collide, and keep the task tightly scoped. Do not use it on infrastructure, credentials, production, or a codebase you cannot review by reading the diff.',
    },
    {
      question: 'How do I run agy with --dangerously-skip-permissions?',
      answer: 'Type the flag in full when you start the session: agy --dangerously-skip-permissions. From then on agy auto-approves every action for that run. Commit before you start so the output is a reviewable diff, keep the task tightly scoped, and give each parallel session its own git worktree.',
    },
    {
      question: 'Is there an agy skip permissions flag?',
      answer: 'Yes, and --dangerously-skip-permissions is all of it. There is no shorter option: the flag is spelled out on purpose so you cannot type it by accident or leave it in a script without noticing. It skips the approval prompt on file writes, deletions, shell commands and installs.',
    },
    {
      question: 'Why does the flag have such an alarming name?',
      answer: 'Deliberately, so you cannot type it by accident or leave it in a script without noticing. That is also why you should not hide it behind a shell alias: the typing cost is doing a job.',
    },
    {
      question: 'When is YOLO mode actually worth it?',
      answer: 'Three cases: mechanical work with a clear finish line (mass renames, API migrations), anything where a test suite is the real gate, and any time you run more than one agent at once. Approval mode does not scale past a single agent, because one human cannot unblock four waiting processes.',
    },
    {
      question: 'How do I run several Antigravity YOLO sessions at once?',
      answer: 'Each agy session is an independent process, so you can open several. Give each one its own git worktree so they cannot edit each other files, and use a workspace like CodeAgentSwarm to keep every session visible with its status and get a notification when one finishes.',
    },
  ],
}

export default guide
