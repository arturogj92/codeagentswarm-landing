import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'codex-yolo-mode',
    locale: 'en',
    title: 'Codex CLI YOLO Mode: Full-Auto Approvals Explained, and How to Run It Safely',
    metaTitle: 'Codex CLI YOLO Mode (--full-auto): How to Run It Safely (2026)',
    metaDescription: 'What YOLO mode means in OpenAI Codex CLI: the approval modes, the --full-auto flag, the sandbox, and how to keep full-auto runs from wrecking your repo.',
    intro: `If you use OpenAI Codex CLI for more than a few minutes, the approval prompts get old fast. Every file write, every shell command, every network call stops and waits for you to say yes. So people reach for full auto and turn the approvals off, and the community started calling that "YOLO mode".

Codex never officially ships a button labelled YOLO. The term just describes a state: Codex running with approvals bypassed so it can read, write, and run commands unattended. The speed is real, and for well-scoped work it feels great. The risk is also real, because once approvals are off there is nothing between Codex and a destructive command.

This guide explains what Codex actually offers, from suggest-only up to full auto and the sandbox, what genuinely goes wrong when you run with approvals off, and how to get full-auto speed without losing control. That last part is where CodeAgentSwarm's per-terminal permissions and Turbo Mode come in, so you can run a whole Codex swarm in full auto and still keep guardrails on the dangerous operations.`,
    ctaText: 'Run Codex CLI in full auto without the gamble. Turbo Mode plus per-terminal permissions let you auto-approve the safe work and block the dangerous commands, across every Codex terminal at once.',
    highlightedWords: ['Codex CLI', 'YOLO mode'],
    publishedAt: '2026-06-07',
    updatedAt: '2026-06-07',
    alternateSlug: 'modo-yolo-codex',
  },
  sections: [
    {
      id: 'what-is-codex-yolo',
      title: 'What "YOLO mode" means for Codex CLI',
      content: [
        {
          type: 'image',
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker with claude-code, gemini cli and codex cli options plus an Enable Turbo Mode toggle for safe full-auto runs',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you set a terminal to codex cli and flip Enable Turbo Mode for full-auto speed, while per-terminal permissions still gate the dangerous operations. That is YOLO-style full auto without losing control.',
        },
        {
          type: 'paragraph',
          text: '"YOLO mode" is the community nickname for running <a href="https://github.com/openai/codex" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex CLI</a> with approvals bypassed, so it works full auto without stopping to ask you. OpenAI does not call it that. The name stuck because it captures the feeling: you only live once, so turn the prompts off and let the agent run.',
        },
        {
          type: 'paragraph',
          text: 'The motivation is the same one every coding agent runs into. When Codex is iterating on a feature, fixing a bug, or refactoring, it pauses before each action: writing a file, running a test, installing a package, hitting the network. On a real task that is dozens of confirmations, and most people just hold down yes anyway, which quietly defeats the point of having approvals at all.',
        },
        {
          type: 'paragraph',
          text: 'Running with approvals off removes all of that. Codex reads, writes, and runs commands on its own. For repetitive or tightly scoped work it feels like the agent is finally working at full speed. The tradeoff is that you also remove every guardrail at the same moment, including the ones you would actually want to keep.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'YOLO is the informal term. What Codex really exposes is a set of approval modes plus a sandbox. Understanding those two dials, approvals and sandboxing, is what lets you run fast without running blind.',
        },
        {
          type: 'paragraph',
          text: 'If your real goal is running several Codex agents at once rather than just one in full auto, the <a href="/en/guides/codex-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex agent swarm</a> guide covers that side, and the broader <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">AI CLI agent swarm</a> overview compares it across every CLI.',
        },
      ],
    },
    {
      id: 'what-modes-do',
      title: 'What the Codex approval modes actually do',
      content: [
        {
          type: 'paragraph',
          text: 'Codex CLI does not have a single on/off switch. It has a range of approval behaviours that decide how much it asks before acting, paired with a sandbox that decides how much it is allowed to touch. The exact labels and flag names shift between Codex versions, so treat the names below as the shape of the system rather than something to memorise. Always check <code>codex --help</code> for the flags your installed version uses.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'The approval spectrum',
          id: 'approval-spectrum',
        },
        {
          type: 'list',
          items: [
            '<strong>Suggest / ask</strong> - Codex proposes changes and commands but waits for you to approve each one. The most cautious end, and the slowest.',
            '<strong>Auto / on-failure</strong> - Codex runs the routine work itself and only stops to ask when something looks riskier or when a command fails. A middle ground that cuts most prompts.',
            '<strong>Full auto</strong> - Codex acts without asking, running commands and editing files on its own. This is the level people mean when they say "YOLO mode".',
          ],
        },
        {
          type: 'paragraph',
          text: 'Codex CLI exposes a full-auto level through a flag, commonly <code>--full-auto</code>, which lets it work without stopping for approvals. There is also a way to bypass approvals entirely for fully unattended runs, intended for sandboxed or throwaway environments. Because the precise flag names change between releases, confirm them with the help output rather than copying a flag you saw in an old blog post.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Check what your installed version actually supports\ncodex --help\n\n# Full-auto style run (verify the exact flag for your version)\ncodex --full-auto "refactor the auth module"',
        },
        {
          type: 'heading',
          level: 3,
          text: 'The sandbox dial',
          id: 'sandbox-dial',
        },
        {
          type: 'paragraph',
          text: 'Approvals decide whether Codex asks. The sandbox decides what Codex can reach when it does act. Codex can run with filesystem and network access constrained, so even in full auto it is limited to a defined working area instead of your whole machine. Tightening the sandbox is one of the safest ways to run full auto, because it caps the blast radius even when no human is in the loop.',
        },
        {
          type: 'paragraph',
          text: 'The important mental model is two independent dials. One controls how often Codex stops to ask. The other controls how far it can reach when it does not ask. "YOLO mode" usually turns the first dial all the way to full auto. The mistake is also leaving the second dial wide open at the same time.',
        },
      ],
    },
    {
      id: 'real-risks',
      title: 'The real risks of running Codex with approvals off',
      content: [
        {
          type: 'paragraph',
          text: 'These are not hypotheticals. When you run Codex full auto on a live repo with a real Git history and real data, any of these can happen inside a single session, with no prompt to catch it first.',
        },
        {
          type: 'list',
          items: [
            '<strong>Git push to the wrong branch</strong> - Codex decides to commit and push half-finished work to main, or force-pushes and overwrites a teammate.',
            '<strong>Deleting files or directories</strong> - A misread instruction turns into <code>rm -rf</code> on a path you did not mean to remove.',
            '<strong>Irreversible shell commands</strong> - <code>DROP TABLE</code>, <code>docker system prune</code>, or anything that cannot be undone once it runs.',
            '<strong>Installing the wrong dependency</strong> - <code>npm install</code> on a typosquatted or compromised package that looked correct at a glance.',
            '<strong>Unintended network calls</strong> - Hitting production endpoints, sending data to external services, or triggering webhooks you did not expect.',
            '<strong>Overwriting uncommitted work</strong> - Codex edits files you were mid-change on, and your uncommitted work is gone before you notice.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'The deeper problem is that the raw approval modes are close to all-or-nothing. You can ask about everything or skip almost everything, but you cannot easily say "auto-approve file edits and tests, but always stop before git push" from the flags alone. That gap is exactly where full-auto accidents live.',
        },
        {
          type: 'paragraph',
          text: 'Full auto is not bad in itself. It is the right setting for a lot of work. The risk comes from running it without a layer that keeps the genuinely dangerous operations gated while everything safe flies through. The next section is about building that layer.',
        },
      ],
    },
    {
      id: 'run-safely',
      title: 'How to run Codex full auto safely',
      content: [
        {
          type: 'paragraph',
          text: 'There are a few approaches, from least controlled to most. The goal is the same throughout: keep full-auto speed on the safe operations while never letting a destructive command run unattended.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Method 1: The raw full-auto flag (fine for throwaway work)',
          id: 'method-raw-flag',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'codex --full-auto "rename this symbol everywhere"',
        },
        {
          type: 'paragraph',
          text: 'This is fine for quick, isolated tasks where you are confident nothing destructive can happen, on a throwaway branch or a scratch project. For anything touching Git, deletions, or the network on a real repo, running the raw flag with the sandbox wide open is a gamble.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Method 2: Full auto plus a tight sandbox',
          id: 'method-sandbox',
        },
        {
          type: 'paragraph',
          text: 'A better baseline is to pair full auto with a constrained sandbox, so even when Codex does not ask, it cannot reach outside a defined working area or make arbitrary network calls. This caps the blast radius. The catch is that the sandbox is coarse: it limits where Codex can act, but it does not understand that "git push" is different from "git status", so it cannot selectively block the one dangerous Git command while allowing the safe ones.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Method 3: CodeAgentSwarm Turbo Mode plus per-terminal permissions (recommended)',
          id: 'method-turbo-mode',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm sits above Codex CLI and adds the layer the raw flags are missing. You run Codex in each terminal, flip on Turbo Mode for full-auto speed, and then use per-terminal permissions to decide exactly which operations auto-approve and which always stop. It is the difference between one blunt switch and a real policy. You pick codex cli in the SELECT AI AGENT picker shown at the top of this guide, and the Enable Turbo Mode toggle right beside it is what turns on that fast-but-guarded full auto. If you want that visual layer for everything Codex does, not just approvals, the <a href="/en/guides/codex-gui" class="text-neon-cyan hover:text-neon-purple transition-colors">Codex GUI guide</a> covers the full desktop experience.',
        },
        {
          type: 'paragraph',
          text: 'Here is what that layer gives you on top of Codex:',
        },
        {
          type: 'list',
          items: [
            '<strong>Per-terminal scope</strong> - Each Codex terminal has its own permission policy. You can run one agent wide open on a throwaway branch and another locked down on the main repo, in the same window.',
            '<strong>Granular permissions per category</strong> - Set Allow, Ask, or Deny for file operations, shell commands, Git actions, and network access independently, instead of one global on/off.',
            '<strong>Git guardrails</strong> - Keep status, diff, and log on auto-approve while blocking push, force-push, merge, and branch delete. This single setting prevents the most common full-auto disasters.',
            '<strong>Live file diffs</strong> - Watch what each Codex agent is changing in real time, per terminal, so a full-auto run is never a black box.',
          ],
        },
        {
          type: 'paragraph',
          text: 'The practical effect is that you get the speed of running Codex with approvals off, without the part where one misread instruction nukes your branch. You configure the policy once, and Codex flies through the safe work while the dangerous commands still stop for you. For a step-by-step walkthrough of the same permission system on the Claude Code side, the <a href="/en/guides/claude-code-yolo-mode-explained" class="text-neon-cyan hover:text-neon-purple transition-colors">Claude Code YOLO Turbo Mode guide</a> covers every configuration screen, and it works the same way whether the agent is Codex or Claude Code.',
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Because the permission policy is per terminal, this is what makes a full-auto Codex swarm actually safe. You can run several Codex agents at once, all in Turbo Mode, each with Git push blocked, and supervise the whole thing from one window instead of babysitting prompts.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Best practices for full-auto Codex runs',
      content: [
        {
          type: 'paragraph',
          text: 'Whichever method you use, these habits keep the worst full-auto accidents off the table:',
        },
        {
          type: 'list',
          items: [
            '<strong>Always work on a feature branch, never main.</strong> If Codex makes a mess, you throw the branch away. If it messes up main, the whole team feels it.',
            '<strong>Commit before starting a full-auto run.</strong> A clean restore point means <code>git checkout .</code> brings you straight back if something goes wrong.',
            '<strong>Block dangerous Git operations.</strong> Push, force-push, merge, and branch delete should always stop for confirmation, even in full auto. These are the highest-impact, hardest-to-undo actions.',
            '<strong>Tighten the sandbox.</strong> Constrain filesystem and network access so even an unattended run cannot reach beyond the working area.',
            '<strong>Watch the diff.</strong> A live, per-terminal file change view turns full auto from a black box into something you can actually supervise.',
            '<strong>Keep prompts focused.</strong> "Refactor the auth middleware to use JWT" is far safer in full auto than "improve the codebase". The tighter the scope, the less room Codex has to go off-script.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Feature branch plus blocked Git push plus a live diff gives you almost all of the full-auto speed with almost none of the risk. Most people who set this up never go back to running the raw flag with everything open.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'What is Codex CLI YOLO mode?',
      answer: 'YOLO mode is the community nickname for running OpenAI Codex CLI with approvals bypassed, so it works full auto without stopping to ask before each action. OpenAI does not use the term officially. What Codex actually exposes is a set of approval modes from suggest-only up to full auto, plus a sandbox that limits what it can reach.',
    },
    {
      question: 'What does --full-auto do in Codex?',
      answer: 'The full-auto level lets Codex run commands and edit files without stopping to ask for approval on each action. Codex CLI commonly exposes this through a --full-auto flag, though exact flag names change between versions, so confirm with codex --help. There is also a separate way to bypass approvals entirely for fully unattended runs, intended for sandboxed environments.',
    },
    {
      question: 'Is it safe to run Codex with approvals off?',
      answer: 'Running with approvals off is fast but removes every guardrail at once, so destructive actions like git push, rm -rf, or DROP TABLE can run with no prompt. It is reasonable on a throwaway branch with a tight sandbox. On a real repo, pair full auto with a permission layer like CodeAgentSwarm Turbo Mode that auto-approves safe work while still blocking dangerous Git and shell commands.',
    },
    {
      question: 'What is the difference between Codex approval modes and the sandbox?',
      answer: 'Approval modes control how often Codex stops to ask you before acting, ranging from suggest-only up to full auto. The sandbox controls what Codex can reach when it does act, by constraining filesystem and network access. They are independent dials. YOLO mode usually turns approvals to full auto, and the common mistake is leaving the sandbox wide open at the same time.',
    },
    {
      question: 'How do I run a Codex swarm in full auto without losing control?',
      answer: 'Run Codex CLI in CodeAgentSwarm, pick codex cli in the SELECT AI AGENT picker for each terminal, and enable Turbo Mode. Per-terminal permissions let you auto-approve safe operations while blocking push, force-push, merge, and branch delete on every agent. You get full-auto speed across several Codex agents at once, supervised from a single window.',
    },
    {
      question: 'Can full auto delete my files or push to the wrong branch?',
      answer: 'Yes. With approvals off and no permission layer, Codex can run rm -rf, overwrite uncommitted work, and commit or force-push to the wrong branch, all without asking. Blocking dangerous Git operations and working on a feature branch are the two changes that prevent the most common accidents.',
    },
    {
      question: 'Is YOLO an official Codex feature?',
      answer: 'No. YOLO is an informal community term for running with approvals off. The actual features are the approval modes and the sandbox. Use codex --help to see the exact flags and modes your installed version supports, since OpenAI changes the names between releases.',
    },
    {
      question: 'Is there a codex --yolo flag?',
      answer: 'There is no literal --yolo flag. YOLO mode is just the nickname. The real way to run Codex with approvals off is the full-auto level, commonly the --full-auto flag, or a separate bypass-approvals option for fully unattended runs. Run codex --help to confirm the exact flag your installed version uses.',
    },
    {
      question: 'What is Codex auto mode and auto-approve?',
      answer: 'Auto mode is the middle of the Codex approval spectrum: Codex runs routine work on its own and only stops to ask on riskier actions or when a command fails, instead of approving every step or none. Auto-approve means letting specific actions through without a prompt. In CodeAgentSwarm you can auto-approve safe categories like file edits and tests per terminal while still blocking dangerous Git and shell commands.',
    },
    {
      question: 'How do I run Codex in YOLO mode?',
      answer: 'Run Codex with approvals off using its full-auto level (check codex --help for the exact flag, commonly --full-auto), ideally on a feature branch with a tight sandbox. For a safer setup, run Codex inside CodeAgentSwarm, enable Turbo Mode, and set per-terminal permissions so safe work auto-approves while push, force-push, and deletions still stop for you.',
    },
  ],
}

export default guide
