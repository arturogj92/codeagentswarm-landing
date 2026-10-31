import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'kimi-code-yolo-mode',
    locale: 'en',
    title: 'Kimi Code YOLO Mode: The --yolo Flag, Auto Mode and Safe Use',
    metaTitle: 'Kimi Code YOLO Mode: --yolo Flag, Permissions and Safety (2026)',
    metaDescription: 'Kimi Code YOLO mode explained: what kimi --yolo approves today, why --auto is the real full bypass, and how to run it without wrecking a repo.',
    intro: `Kimi Code has a real YOLO mode, and it is one flag: <code>kimi --yolo</code>. Run it and Kimi Code stops asking for approval on routine file writes and shell commands. It is no longer a full bypass, though: current releases call it Ask When Needed, and risky actions still stop. The mode that asks nothing is <code>kimi --auto</code>. Unlike opencode, where autonomy lives in a config file, Moonshot AI went the same route as Claude Code and Codex: launch flags that turn the prompts down or off.

That switch is genuinely useful and genuinely dangerous, in the same proportions as every other agent's bypass flag. This guide covers what <code>--yolo</code> and <code>--auto</code> actually do, how they relate to <code>--plan</code>, a resume gotcha that silently overrides the mode a session had saved, and the middle path most people miss: pre-approving specific tools with permission rules in <code>config.toml</code> instead of opening everything at once.

It also covers the part that matters once the prompts are off: how to keep a full-auto run supervised. Kimi Code is a first-class agent in CodeAgentSwarm, so a YOLO run gets live per-terminal diffs, desktop notifications and searchable history instead of running as a black box.`,
    ctaText: 'Run kimi --yolo without flying blind. CodeAgentSwarm runs Kimi Code as a first-class agent, with live per-terminal diffs, desktop notifications and searchable history keeping every full-auto run honest.',
    ctaAgent: 'kimi-code',
    highlightedWords: ['Kimi Code', 'YOLO mode'],
    publishedAt: '2026-07-18',
    updatedAt: '2026-10-31',
    alternateSlug: 'modo-yolo-kimi-code',
  },
  sections: [
    {
      id: 'short-answer',
      title: 'The short answer: yes, Kimi Code has a YOLO flag',
      content: [
        {
          type: 'paragraph',
          text: '"YOLO mode" is the community nickname for running a coding agent with approvals bypassed. Claude Code has <code>--dangerously-skip-permissions</code> and Codex has <code>--full-auto</code>. Kimi Code splits the idea in two: <code>--yolo</code> auto-approves routine work but still stops for risky actions, and <code>--auto</code> approves everything and never asks. The <a href="https://www.kimi.com/code/docs/en/kimi-code-cli/guides/interaction.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official permission modes page</a> calls them Ask When Needed and Never Ask.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Full auto: no approval prompts\nkimi --yolo\n\n# Short form\nkimi -y',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code is the terminal coding agent from <a href="https://www.kimi.com/code" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Moonshot AI</a>. Its default <code>kimi-for-coding</code> model id currently serves K2.8 Preview, and K3.1 Pro is one <code>/model</code> away (<a href="https://www.kimi.com/code/docs/en/kimi-code/models.html" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">model list</a>). If you have not set it up yet, the <a href="/en/guides/how-to-use-kimi-code" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use Kimi Code</a> guide covers install and login. This guide assumes you have it running and want to know how far to open it up.',
        },
        {
          type: 'paragraph',
          text: 'There are also two hidden aliases, <code>--yes</code> and <code>--auto-approve</code>, that do the same thing as <code>--yolo</code>. They exist so scripts and muscle memory from other tools keep working, but note what they do today: they start Ask When Needed, not a full bypass. If an old script relied on <code>--yolo</code> approving everything, switch it to <code>--auto</code>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Kimi Code ships new releases every few days (2.4.1 came out on October 30, 2026) and has already renamed its permission modes once, so flags can move. If a flag in this guide does not respond the way you expect, run <code>kimi --help</code> and trust your installed version over any blog post, including this one.',
        },
      ],
    },
    {
      id: 'yolo-vs-auto-vs-plan',
      title: 'YOLO vs auto vs plan: the three run modes',
      content: [
        {
          type: 'paragraph',
          text: 'The <code>--yolo</code> flag is one of three mode switches Kimi Code accepts at launch, and it helps to know where it sits on the spectrum:',
        },
        {
          type: 'list',
          items: [
            '<strong>Default (no flag): Always Ask.</strong> Read-only actions run on their own; every edit and shell command stops and asks, and you approve or reject each one.',
            '<strong>--plan.</strong> Plan mode. The agent explores with read-only tools and presents a plan, and that plan waits for your review in every permission mode. Good for scoping a change before letting it touch anything.',
            '<strong>--auto: Never Ask.</strong> Every tool call is approved, including sensitive files and commands like <code>rm -rf</code>, and the agent never asks you questions. Only a Plan mode plan still waits. This is the real full bypass.',
            '<strong>--yolo: Ask When Needed.</strong> Routine edits and commands run automatically, while sensitive files such as <code>.env</code> or SSH keys, dangerous commands such as <code>rm -rf</code> or <code>shutdown</code>, questions and plans still ask.',
          ],
        },
        {
          type: 'paragraph',
          text: 'A sane workflow uses more than one of these. Scope a risky change with <code>--plan</code>, run routine work with <code>--yolo</code>, and save <code>--auto</code> for tasks where the blast radius is contained: a scratch branch, a throwaway repo, or an isolated worktree.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'The resume gotcha: mode flags override the saved session',
          id: 'resume-gotcha',
        },
        {
          type: 'paragraph',
          text: 'Kimi Code sessions remember the mode they were running in. When you resume one with <code>kimi --continue</code> or <code>kimi --session &lt;id&gt;</code>, it normally comes back in that saved mode. But if you pass <code>--yolo</code>, <code>--auto</code> or <code>--plan</code> alongside the resume flag, the flag wins and the saved mode is overridden.',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'This cuts both ways. Resume a careful interactive session with a leftover <code>-y</code> in your shell history and it silently becomes a YOLO session. Resume a YOLO session with <code>--plan</code> and it stops executing. Check which flags are on the command line every time you resume, especially if you lean on shell history to relaunch.',
        },
        {
          type: 'paragraph',
          text: 'Resuming sessions has its own mechanics (where they live on disk, how to find an old one, how to name them). The <a href="/en/guides/kimi-code-conversation-history" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code conversation history</a> guide covers all of it.',
        },
      ],
    },
    {
      id: 'real-risks',
      title: 'What --yolo can actually do to your machine',
      content: [
        {
          type: 'paragraph',
          text: 'With approvals off, Kimi Code runs on a live repo with a real Git history and a real shell. None of these are hypothetical; they are the standard failure modes of any coding agent in full auto, and a single misread instruction is enough:',
        },
        {
          type: 'list',
          items: [
            '<strong>Git push to the wrong branch.</strong> Half-finished work committed and pushed to main, or a force-push over a teammate.',
            '<strong>Deleted files and directories.</strong> An <code>rm -rf</code> on a path you did not mean, executed without a prompt to catch it.',
            '<strong>Irreversible commands.</strong> Database drops, <code>docker system prune</code>, anything that cannot be undone once it runs.',
            '<strong>Bad dependency installs.</strong> A typosquatted package that looked right at a glance, installed and imported before you notice.',
            '<strong>Unintended network calls.</strong> Production endpoints hit, webhooks triggered, data sent somewhere you did not expect.',
            '<strong>Overwritten uncommitted work.</strong> Your mid-change files edited underneath you, with no prompt in the way.',
          ],
        },
        {
          type: 'paragraph',
          text: 'One more failure mode is specific to unattended runs: Kimi Code has open issues where a rate-limited or stalled request can leave the session hanging silently instead of erroring out. In an interactive session you notice. In a YOLO run you left alone for an hour, a hung agent looks exactly like a working one from the outside. This is one of the strongest arguments for running full-auto sessions somewhere with real visibility.',
        },
      ],
    },
    {
      id: 'permission-rules',
      title: 'The middle path: permission rules instead of full YOLO',
      content: [
        {
          type: 'paragraph',
          text: 'Most of the time you do not actually want everything approved. You want the routine stuff (file edits, reads, your test runner) to fly through, while the dangerous stuff still stops. Kimi Code supports exactly that with <code>[[permission.rules]]</code> entries in its config file at <code>~/.kimi-code/config.toml</code>, which pre-approve specific tools so they no longer prompt, without touching anything else.',
        },
        {
          type: 'paragraph',
          text: 'That gives you a graded ladder instead of a binary switch: Always Ask with a few pre-approved tools is far less annoying than stock Always Ask, and far safer than <code>--auto</code>. The exact rule syntax is documented in the official Kimi Code docs, and it evolves with frequent releases, so check the docs for your installed version rather than copying a snippet from an old post.',
        },
        {
          type: 'paragraph',
          text: 'For sharper control there are hooks: Kimi Code has a full hook system, configured as <code>[[hooks]]</code> TOML blocks in the same <code>config.toml</code>, with 20 lifecycle events. The one that matters for safety is <code>PreToolUse</code>: a hook script that exits with code 2 blocks the tool call and sends its stderr back as the reason. That lets you write your own guardrails, like blocking force-pushes or protecting a directory, that hold even in <code>--auto</code>.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'After editing config.toml, run <code>kimi doctor</code>. It validates the configuration and catches a malformed rule or hook before you find out mid-session. Also worth knowing: hook errors other than exit 2 fail open, so a crashing guardrail script does not block anything. Test your hooks on purpose.',
        },
        {
          type: 'paragraph',
          text: 'Standing instructions belong in <code>AGENTS.md</code>, the cross-tool instructions convention Kimi Code follows (it does not read CLAUDE.md natively). House rules there, like "never push without asking", reach every session without being re-typed, though unlike a PreToolUse hook they are guidance for the model, not an enforced block.',
        },
      ],
    },
    {
      id: 'run-safely',
      title: 'How to run kimi --yolo safely',
      content: [
        {
          type: 'paragraph',
          text: 'The pattern that works is the same one that works for Claude Code and Codex in full auto: contain the blast radius, keep a restore point, and keep your eyes on the run.',
        },
        {
          type: 'list',
          items: [
            '<strong>Work on a feature branch, never main.</strong> If the run goes sideways, you throw the branch away.',
            '<strong>Commit before you start.</strong> A clean working tree means <code>git checkout .</code> is a one-line undo for anything short of a push.',
            '<strong>Use a git worktree for real isolation.</strong> A separate worktree gives the agent its own copy of the repo, so even an aggressive run cannot touch the files you are editing. The <a href="/en/guides/git-worktrees-for-ai-coding-agents" class="text-neon-cyan hover:text-neon-purple transition-colors">git worktrees for AI coding agents</a> guide covers the setup.',
            '<strong>Keep prompts scoped.</strong> "Migrate these three files to the new API" is a safe YOLO task. "Improve the codebase" is not.',
            '<strong>Add PreToolUse hooks for your red lines.</strong> Force-push, production configs, dotfiles: whatever must never happen, enforce it with an exit-2 hook rather than hoping.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Supervised YOLO in CodeAgentSwarm',
          id: 'supervised-yolo',
        },
        {
          type: 'paragraph',
          text: 'The remaining problem is visibility. A YOLO run in a lone terminal window is a black box: you find out what happened when you come back and read the scrollback. CodeAgentSwarm runs Kimi Code as a first-class agent (alongside Claude Code, Codex CLI, Antigravity CLI, OpenCode, Grok Build, Cursor Agent, Muse Code, Pi and Devin CLI) and wraps every terminal with the supervision that full-auto work needs:',
        },
        {
          type: 'list',
          items: [
            '<strong>Live per-terminal diffs.</strong> Watch exactly which files each Kimi Code agent is changing while it runs, not after.',
            '<strong>Desktop notifications.</strong> Get pinged when an agent finishes or stalls, which also catches the silent-hang failure mode instead of letting it burn an hour.',
            '<strong>Searchable history.</strong> Audit what a YOLO run actually did after the fact, and resume the session if it stopped halfway.',
            '<strong>Several agents side by side.</strong> Run one careful interactive Kimi Code terminal and one YOLO terminal on a scratch branch in the same window, and see both at a glance.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you are heading toward several Kimi Code agents at once rather than one fast one, that is its own topic: see <a href="/en/guides/run-multiple-kimi-code-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Kimi Code sessions</a> and the <a href="/en/guides/kimi-code-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Kimi Code agent swarm</a> guide.',
        },
      ],
    },
    {
      id: 'compared-to-other-clis',
      title: 'How Kimi Code YOLO compares to the other CLIs',
      content: [
        {
          type: 'paragraph',
          text: 'If you run more than one agent, the bypass flags are easy to mix up. The models differ more than the flags do:',
        },
        {
          type: 'list',
          items: [
            '<strong>Claude Code:</strong> <code>--dangerously-skip-permissions</code>, plus granular allow rules in settings. The <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code YOLO guide</a> covers it.',
            '<strong>Codex CLI:</strong> <code>--full-auto</code> and approval modes. Covered in <a href="/en/guides/codex-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex YOLO mode</a>.',
            '<strong>opencode:</strong> no flag at all; autonomy is config-driven. See <a href="/en/guides/opencode-yolo-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">opencode YOLO mode</a>.',
            '<strong>Kimi Code:</strong> <code>--auto</code> for the full bypass, <code>--yolo</code> / <code>-y</code> for Ask When Needed, permission rules and hooks in config.toml for the graded version, and mode flags that override a resumed session\'s saved mode.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Kimi Code lands closest to Claude Code, which is no accident: its tool set tracks Claude Code closely, down to tool names like <code>Read</code>, <code>Edit</code> and <code>Bash</code>. The practical consequence is that habits transfer. If you already have a safe YOLO workflow for Claude Code, the same branch hygiene, worktree isolation and supervision carry straight over to <code>kimi -y</code> and <code>kimi --auto</code>.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Kimi Code have a YOLO mode?',
      answer: 'Yes. kimi --yolo (short form -y) starts Ask When Needed: routine edits and commands run without prompts, but sensitive files, dangerous commands, questions and plans still ask. The full bypass is kimi --auto (Never Ask), which approves every tool call and never asks you anything. The hidden aliases --yes and --auto-approve behave like --yolo.',
    },
    {
      question: 'What is the difference between kimi --yolo, --auto and --plan?',
      answer: '--plan makes the agent explore read-only and propose a plan that always waits for your review. With no flag you get Always Ask, where edits and commands need approval. --yolo is Ask When Needed: routine work runs on its own and risky actions still ask. --auto is Never Ask: everything is approved and the agent never asks questions. You can also pass these flags when resuming a session, and the flag overrides the mode the session had saved.',
    },
    {
      question: 'Is kimi --yolo safe to use?',
      answer: 'It is as safe as the blast radius you give it. --yolo still asks before dangerous commands and sensitive files, while --auto does not. On a feature branch or an isolated git worktree with a clean commit behind you, a scoped run is a reasonable trade. On main, on a repo with uncommitted work, or with an open-ended prompt, --auto can push, delete and overwrite without anything stopping it. Contain it, keep a restore point, and watch the diff.',
    },
    {
      question: 'How do I make Kimi Code stop asking for permission without full YOLO?',
      answer: 'Use permission rules. [[permission.rules]] entries in ~/.kimi-code/config.toml pre-approve specific tools so they stop prompting while everything else still asks. That usually removes most of the friction without opening shell and Git actions. Run kimi doctor after editing the config to validate it.',
    },
    {
      question: 'Can I block specific actions even in YOLO mode?',
      answer: 'Yes, with hooks. Kimi Code supports [[hooks]] TOML blocks in config.toml across 20 lifecycle events, and a PreToolUse hook that exits with code 2 blocks the tool call with your stderr message as the reason. That is an enforced guardrail, unlike AGENTS.md instructions, which are guidance the model follows but nothing enforces. Note that hook scripts that crash with any other error fail open.',
    },
    {
      question: 'Does CodeAgentSwarm support Kimi Code YOLO runs?',
      answer: 'Kimi Code is a first-class agent in CodeAgentSwarm, so you can run YOLO sessions inside it with supervision around them: live per-terminal file diffs, desktop notifications when an agent finishes or stalls, dynamic terminal titles, and searchable history to audit what a run did. Running full auto with visibility is the whole point.',
    },
  ],
}

export default guide
