import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'how-to-use-grok-build',
    locale: 'en',
    title: 'How to Use Grok Build: Install, Login and Core Commands',
    metaTitle: 'How to Use Grok Build (xAI): Install, Login and Commands (2026)',
    metaDescription: 'Grok Build is xAI\'s terminal coding agent (the grok command). Install it, sign in with SuperGrok or X Premium+, learn the commands that matter, and supervise several sessions in CodeAgentSwarm.',
    intro: `Grok Build is xAI's terminal coding agent: a TUI that reads your repo, edits files, runs commands, searches the web, and manages multi-step work from the shell. You install the <code>grok</code> binary, authenticate, and work inside a project folder the same way you would with Claude Code or Codex CLI.

Three different products share the word Grok: the consumer Grok chatbot, xAI's official coding CLI called Grok Build (the <code>grok</code> command this guide is about), and unaffiliated community tools named grok-cli on GitHub. CodeAgentSwarm integrates Grok Build, not the chat app.

This guide covers install, first login, the flags you will actually use, session resume, and how CodeAgentSwarm runs Grok Build as a first-class agent next to the rest of your swarm.`,
    ctaText: 'Pick Grok Build in any CodeAgentSwarm terminal and run it next to Claude Code, Codex, OpenCode or Kimi Code. Desktop notifications, searchable history and live diffs come free.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'como-usar-grok-build',
  },
  sections: [
    {
      id: 'what-is',
      title: 'What is Grok Build?',
      content: [
        { type: 'paragraph', text: 'Grok Build is the official coding CLI from <a href="https://x.ai" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">xAI</a>. It runs as an interactive TUI, as a headless one-shot command with <code>grok -p</code>, or as an agent process for editor integrations. Version strings look like <code>grok 0.2.x</code> when you run <code>grok --version</code>.' },
        { type: 'paragraph', text: 'Data lives under <code>~/.grok/</code> by default (config, auth, sessions, skills, rules). You can relocate the whole tree with the <code>GROK_HOME</code> environment variable. Skills follow the agentskills.io layout under <code>~/.grok/skills/</code>, and MCP servers are configured in <code>~/.grok/config.toml</code>.' },
        { type: 'callout', variant: 'info', content: 'Grok Build moves quickly. Install and auth details can change; when something disagrees with this page, prefer the official xAI CLI docs and <code>grok --help</code> on your machine.' },
      ],
    },
    {
      id: 'install',
      title: 'Install Grok Build',
      content: [
        { type: 'paragraph', text: 'The recommended path is the official install script. It works on macOS and Linux, and on Windows via Git Bash or the native PowerShell installer.' },
        { type: 'code', language: 'bash', code: '# macOS / Linux / Git Bash\ncurl -fsSL https://x.ai/cli/install.sh | bash\n\n# Verify\ngrok --version' },
        { type: 'code', language: 'powershell', code: '# Windows PowerShell\nirm https://x.ai/cli/install.ps1 | iex' },
        { type: 'paragraph', text: 'The installer places the binary under <code>~/.grok/bin</code> (or <code>%USERPROFILE%\\.grok\\bin</code> on Windows) and adds it to your PATH. Update later with <code>grok update</code>.' },
        { type: 'callout', variant: 'tip', content: 'After install, run <code>grok doctor</code> to check terminal, clipboard and color support before your first long session.' },
      ],
    },
    {
      id: 'login',
      title: 'First launch and authentication',
      content: [
        { type: 'paragraph', text: 'From a project directory, run <code>grok</code>. On first launch the CLI opens a browser to authenticate (typically against grok.com). Credentials land in <code>~/.grok/auth.json</code> and refresh automatically.' },
        { type: 'paragraph', text: 'For CI or headless environments without a browser, set an API key instead:' },
        { type: 'code', language: 'bash', code: 'export XAI_API_KEY="xai-..."\ngrok -p "Summarize this repository"' },
        { type: 'callout', variant: 'warning', content: 'Interactive use is gated by your xAI account tier (publicly framed as SuperGrok or X Premium+ during the beta era). Confirm current access on xAI before you plan a whole team rollout. See the <a href="/en/guides/grok-build-pricing" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build pricing and access guide</a>.' },
      ],
    },
    {
      id: 'commands',
      title: 'Commands and flags that matter',
      content: [
        { type: 'paragraph', text: 'You do not need every flag. These are the ones that show up daily:' },
        { type: 'list', items: ['<code>grok</code> - start the interactive TUI in the current directory', '<code>grok "fix the flaky test"</code> - open the TUI with an initial prompt', '<code>grok -p "..."</code> (or <code>--single</code>) - one-shot headless prompt to stdout', '<code>grok --continue</code> / <code>-c</code> - continue the most recent session for this cwd', '<code>grok --resume</code> / <code>-r</code> - resume by session id or title', '<code>grok --always-approve</code> - auto-approve tool runs (YOLO-style; use carefully)', '<code>grok --worktree=name</code> - start in a new git worktree', '<code>grok --no-plan</code> / <code>--no-subagents</code> - disable plan mode or native subagents', '<code>grok sessions list</code> / <code>search</code> - find past sessions', '<code>grok export</code> - export a transcript as Markdown'] },
        { type: 'paragraph', text: 'Permission modes include <code>default</code>, <code>acceptEdits</code>, <code>auto</code>, <code>dontAsk</code>, <code>bypassPermissions</code> and <code>plan</code> via <code>--permission-mode</code>. Plan Mode is covered in depth in the <a href="/en/guides/grok-build-plan-mode" class="text-neon-cyan hover:text-neon-purple transition-colors">Plan Mode guide</a>.' },
        { type: 'code', language: 'bash', code: 'grok --help\ngrok doctor\ngrok sessions list' },
      ],
    },
    {
      id: 'cas',
      title: 'Run Grok Build inside CodeAgentSwarm',
      content: [
        { type: 'image', alt: 'CodeAgentSwarm SELECT AI AGENT picker including Grok Build', src: '/images/guides/multi-cli-agent-selector.png', caption: 'Pick Grok Build per terminal like any other agent.' },
        { type: 'paragraph', text: 'CodeAgentSwarm is a desktop workspace that runs on top of the official CLIs. Install Grok Build on the machine, open CodeAgentSwarm, and choose <strong>Grok Build</strong> in the SELECT AI AGENT picker for that terminal. From there you get desktop notifications when a session finishes or needs input, searchable history across agents, live per-terminal diffs, and the ability to mix Grok Build with Claude Code, Codex, Antigravity, OpenCode and Kimi Code in one window.' },
        { type: 'paragraph', text: 'That is different from Grok Build\'s own native subagents: those stay inside one vendor session. A CodeAgentSwarm swarm is several independent terminals you supervise. The <a href="/en/guides/grok-build-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Grok Build agent swarm guide</a> and the <a href="/en/guides/grok-build-subagents-vs-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">subagents vs swarm comparison</a> spell out the difference.' },
      ],
    },
  ],
  faq: [
    { question: 'Is Grok Build the same as the Grok chatbot?', answer: 'No. Grok Build is xAI\'s coding CLI (the grok command). The Grok chatbot is a separate consumer product. CodeAgentSwarm integrates the CLI.' },
    { question: 'How do I install Grok Build?', answer: 'On macOS and Linux run curl -fsSL https://x.ai/cli/install.sh | bash. On Windows PowerShell use irm https://x.ai/cli/install.ps1 | iex. Then run grok --version.' },
    { question: 'Does Grok Build work inside CodeAgentSwarm?', answer: 'Yes. Install the CLI, pick Grok Build in the agent picker, and run it like any other supported agent with notifications, history and live diffs.' },
    { question: 'How do I resume a Grok Build session?', answer: 'Use grok --continue for the latest session in the current directory, or grok --resume with a session id or title. grok sessions list helps you find them.' },
  ],
}

export default guide
