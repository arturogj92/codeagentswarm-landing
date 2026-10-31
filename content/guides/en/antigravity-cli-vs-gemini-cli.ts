import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-vs-gemini-cli',
    locale: 'en',
    title: 'Antigravity CLI vs Gemini CLI: What Changed and How to Migrate',
    metaTitle: 'Antigravity CLI vs Gemini CLI: What Changed and How to Migrate (2026)',
    metaDescription: 'Google moved free and AI Pro users from Gemini CLI to Antigravity CLI. See what changed, who can still use Gemini CLI and how to migrate your config.',
    intro: `If you opened a terminal expecting the gemini command and it was not there, you are not imagining it. Google stopped serving Gemini CLI for personal accounts and moved those users to Antigravity CLI, the new agent that runs under the agy command. The good news is that the move was designed to be easy, and most of your old setup comes along with you.

This guide is a straight comparison plus a migration walkthrough. First I cover what actually happened to Gemini CLI and when. Then I lay out the real differences between Antigravity CLI and Gemini CLI, dimension by dimension, so you know what you are gaining and what changed under your feet. After that you get the exact migration steps, including the import prompt that pulls your old config across.

Gemini CLI was a good tool and it earned its audience, so this is not a hype piece about a replacement. Since Gemini CLI no longer serves personal accounts, migrating to Antigravity CLI is simply the path forward, and as you will see, that path is short.`,
    ctaText: 'Moving from Gemini CLI to Antigravity CLI does not mean losing your multi-session workflow. Run several Antigravity CLI terminals side by side in CodeAgentSwarm, next to Claude Code and Codex CLI, in one workspace.',
    ctaAgent: 'antigravity',
    highlightedWords: ['Antigravity CLI', 'Gemini CLI', 'Migrate'],
    publishedAt: '2026-06-29',
    updatedAt: '2026-10-31',
    alternateSlug: 'antigravity-cli-vs-gemini-cli',
  },
  sections: [
    {
      id: 'gemini-cli-retired',
      title: 'What happened: Gemini CLI was retired for personal accounts',
      content: [
        {
          type: 'paragraph',
          text: 'Gemini CLI was Google\'s first terminal coding agent. It shipped as an open-source, Node-based tool you installed from npm and ran with the <code>gemini</code> command, signed in with a Google account, and pointed at a project. It got popular fast because it was free to start, had a large context window per session, and lived right in the terminal where developers already worked.',
        },
        {
          type: 'paragraph',
          text: 'On June 18, 2026, Gemini CLI stopped serving free users, Google AI Pro and Ultra subscribers and Gemini Code Assist for individuals, and Google moved them to <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity CLI</a>, the successor that runs under the <code>agy</code> command. Google announced it on its developers blog on May 19, 2026, and the project repository carries a pinned discussion explaining the change and the timeline.',
        },
        {
          type: 'list',
          items: [
            '<a href="https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">An important update: transitioning Gemini CLI to Antigravity CLI</a> (the official announcement)',
            '<a href="https://github.com/google-gemini/gemini-cli/discussions/27274" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">The GitHub discussion</a> on the gemini-cli repo, with the rationale and migration notes',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Short version: Gemini CLI still exists, but only for enterprise Gemini Code Assist workflows on Google Cloud and paid Gemini API keys, as its <a href="https://github.com/google-gemini/gemini-cli" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">README</a> and the announcement explain. If you used Gemini CLI with a personal Google account, the next step is to install Antigravity CLI and let it import your old config, which is what the rest of this guide walks through.',
        },
        {
          type: 'paragraph',
          text: 'The reason for the change is more than a rename. Antigravity CLI is a different architecture: a single compiled binary instead of a Node package, multiple models in the same terminal instead of Gemini only, and a multi-agent design instead of a single linear chat. The next section breaks those differences down.',
        },
      ],
    },
    {
      id: 'what-changed',
      title: 'Antigravity CLI vs Gemini CLI: what changed',
      content: [
        {
          type: 'paragraph',
          text: 'Here is how Antigravity CLI compares to Gemini CLI across the things that actually affect your day. Each dimension lists the old behavior and the new one so you can see exactly what moved.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Runtime and install',
          id: 'compare-runtime',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> An npm package that needed Node installed. You updated it like any other Node tool, and your version depended on your local runtime.',
            '<strong>Antigravity CLI:</strong> One compiled binary, no Node or Python runtime required. You install it with a single script and run <code>agy</code> directly.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Install Antigravity CLI (one binary, no Node needed)\ncurl -fsSL https://antigravity.google/cli/install.sh | bash\n\n# Then run it\nagy',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Models',
          id: 'compare-models',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> Gemini models only. The whole point was a Gemini-powered terminal agent, and you selected the Gemini model you wanted.',
            '<strong>Antigravity CLI:</strong> Gemini, Claude and open-weight models in the same terminal, depending on your plan. As of October 2026 the <a href="https://antigravity.google/docs/models" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official model list</a> offers Gemini 3.8 Flash on every plan, Gemini 4 Argon, Claude Sonnet 5.5 and Claude Opus 5.5 on paid Google AI plans, and Claude Sonnet 4.6, Claude Opus 4.6 and GPT-OSS 120B on the free tier until November 2, 2026. You choose with <code>/model</code> or <code>--model</code>.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'This is the biggest practical change. Antigravity CLI is no longer a Gemini-only tool. It still leads with Gemini, but you can switch to a Claude or open-weight model when that fits the task better, without leaving <code>agy</code>.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Multi-agent vs single chat',
          id: 'compare-multi-agent',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> A single linear chat. One conversation, one agent, working through your request step by step.',
            '<strong>Antigravity CLI:</strong> Multi-agent by default. It can dispatch and coordinate sub-agents to work on parts of a task, rather than running everything as one thread.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Config and home directory',
          id: 'compare-config',
        },
        {
          type: 'list',
          items: [
            '<strong>Gemini CLI:</strong> Stored its settings, registered MCP servers, and preferences under the <code>~/.gemini</code> home directory.',
            '<strong>Antigravity CLI:</strong> Reuses the same <code>~/.gemini</code> home, and on first launch it offers to convert your old Gemini CLI extensions and settings. Settings go to <code>~/.gemini/antigravity-cli/settings.json</code> and MCP servers to <code>~/.gemini/config/mcp_config.json</code>. That is what makes the migration painless.',
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Flags and everyday commands',
          id: 'compare-flags',
        },
        {
          type: 'list',
          items: [
            '<strong>Turbo / skip permissions:</strong> run <code>agy --dangerously-skip-permissions</code> for an unattended, auto-approving session. As with any yolo-style flag, use it carefully, since the agent will run actions you might have wanted to review.',
            '<strong>Continue the last conversation:</strong> <code>agy -c</code>.',
            '<strong>Resume a specific conversation:</strong> <code>agy --conversation &lt;id&gt;</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: 'If you want a fuller tour of the new tool on its own terms, the <a href="/en/guides/how-to-use-antigravity-cli" class="text-neon-cyan hover:text-neon-purple transition-colors">how to use Antigravity CLI</a> guide covers the basics end to end.',
        },
      ],
    },
    {
      id: 'how-to-migrate',
      title: 'How to migrate from Gemini CLI to Antigravity CLI',
      content: [
        {
          type: 'paragraph',
          text: 'Migration is short on purpose. In practice it is two things: install Antigravity CLI, then accept the import prompt on first launch. Here are the steps.',
        },
        {
          type: 'heading',
          level: 3,
          text: '1. Install Antigravity CLI',
          id: 'migrate-install',
        },
        {
          type: 'paragraph',
          text: 'Run the install script. It drops a single binary, so you do not need to touch Node or your old npm install of Gemini CLI.',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'curl -fsSL https://antigravity.google/cli/install.sh | bash',
        },
        {
          type: 'heading',
          level: 3,
          text: '2. Launch agy and accept the import prompt',
          id: 'migrate-import',
        },
        {
          type: 'paragraph',
          text: 'The first time you run <code>agy</code>, it detects your existing <code>~/.gemini</code> home and shows a checklist of the Gemini CLI extensions and settings it can convert. Pick what you want. Settings land in <code>~/.gemini/antigravity-cli/settings.json</code>, MCP servers in <code>~/.gemini/config/mcp_config.json</code>, and the old and new tools coexist in the same home directory.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# First launch - it will ask to import your old Gemini CLI config\nagy',
        },
        {
          type: 'paragraph',
          text: 'What the import brings across, according to the <a href="https://antigravity.google/docs/cli/gcli-migration" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">official migration guide</a>:',
        },
        {
          type: 'list',
          items: [
            'Your MCP servers, moved into <code>~/.gemini/config/mcp_config.json</code>',
            'Your extensions, converted into Antigravity plugins (custom commands become skills)',
            'Your session tokens, moved into the system keyring',
            'Not always: custom terminal themes, and workspace skills in <code>.gemini/skills/</code>, which you move to <code>.agents/skills/</code> by hand',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Because Antigravity CLI reuses <code>~/.gemini</code>, you are not starting from a blank config. If you spent time wiring MCP servers or writing a global <code>~/.gemini/GEMINI.md</code> under Gemini CLI, that work carries over instead of being thrown away.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Verify it works',
          id: 'migrate-verify',
        },
        {
          type: 'paragraph',
          text: 'Open a project, start a session, and confirm your MCP servers and instructions behave the way they did before. Try continuing your last conversation and resuming a specific one to make sure your history is reachable.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Continue your last conversation\nagy -c\n\n# Resume a specific conversation by id\nagy --conversation <id>',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Do not assume the import happened if you skipped the prompt. If your MCP servers or extensions are missing, you probably declined or missed the import on first launch. Check <code>~/.gemini/config/mcp_config.json</code> for your servers, or run <code>agy plugin import gemini</code> to convert them now.',
        },
        {
          type: 'paragraph',
          text: 'That is the whole migration. Since Gemini CLI no longer serves personal accounts, this is the move that keeps you current, and it costs a couple of minutes.',
        },
      ],
    },
    {
      id: 'running-both',
      title: 'Running Antigravity CLI (and Claude and Codex) in one workspace',
      content: [
        {
          type: 'paragraph',
          text: 'If you ran several Gemini CLI sessions at once, the thing you do not want to lose in the move is that multi-session workflow. Antigravity CLI sessions are still independent processes, so you can run many of them, and you can keep them in one place with CodeAgentSwarm.',
        },
        {
          type: 'image',
          alt: 'CodeAgentSwarm in List mode with agents, statuses, current activities and project shortcuts',
          src: '/images/guides/workspace-list.webp',
          caption: 'CodeAgentSwarm List view: each session shows its agent, status and current activity. Sample tasks shown.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for running several AI CLI sessions in parallel with real visibility. It runs on macOS, Windows and Linux, and it is not a model provider, so each Antigravity CLI session keeps using your own Google sign-in and your own <code>agy</code> install. The app just gives the sessions a place to live: multiple terminals in one workspace, the agent chosen per terminal from the SELECT AI AGENT picker.',
        },
        {
          type: 'paragraph',
          text: 'This matters most during a transition. If your team had Gemini CLI sessions spread across tabs, you can move them to Antigravity CLI and keep the exact same multi-session setup, without juggling terminals by hand. And because the agent is per terminal, you are not locked in: one terminal on Antigravity CLI, another on Claude Code, a third on Codex CLI, all sharing one searchable history.',
        },
        {
          type: 'list',
          items: [
            'Run several Antigravity CLI sessions at once, each independent',
            'Mix Antigravity CLI with Claude Code and Codex CLI per terminal',
            'Get a desktop notification when a session finishes or needs input',
            'Keep a searchable conversation history across every terminal',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'For the step-by-step on running many Antigravity sessions at once, see <a href="/en/guides/run-multiple-antigravity-cli-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">run multiple Antigravity CLI sessions</a>. For the broader pattern across vendors, start with <a href="/en/guides/ai-cli-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">the AI CLI agent swarm hub</a>.',
        },
        {
          type: 'paragraph',
          text: 'If you are coming from the old Gemini CLI workflow, it carries over directly: <a href="/en/guides/run-multiple-antigravity-cli-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Antigravity CLI sessions</a> and the <a href="/en/guides/antigravity-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity agent swarm guide</a> describe the same pattern on agy.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Gemini CLI dead or deprecated?',
      answer: 'For personal accounts, yes. On June 18, 2026 Gemini CLI stopped serving free users and Google AI Pro and Ultra subscribers, and Google moved them to Antigravity CLI, which runs under the agy command. Gemini CLI is still maintained for enterprise Gemini Code Assist customers on Google Cloud and works with paid Gemini API keys. The announcement is on the Google developers blog and there is a pinned discussion on the gemini-cli GitHub repo with the details.',
    },
    {
      question: 'Do I have to migrate from Gemini CLI to Antigravity CLI?',
      answer: 'If you used Gemini CLI with a personal Google account, yes, because it no longer serves those accounts. Enterprise Code Assist customers and paid API key users can keep it. The upside is that migration is short: install Antigravity CLI with one script, then accept the import prompt on first launch. Your existing config comes across, so you are not rebuilding your setup from scratch.',
    },
    {
      question: 'Will my Gemini CLI config and MCP servers transfer?',
      answer: 'Mostly. Antigravity CLI reuses the same ~/.gemini home directory and on first launch offers to convert your Gemini CLI extensions and settings. MCP servers move into ~/.gemini/config/mcp_config.json and your global ~/.gemini/GEMINI.md keeps working. Custom terminal themes may not carry over, and workspace skills in .gemini/skills/ need moving to .agents/skills/. If something is missing, run agy plugin import gemini.',
    },
    {
      question: 'What is the difference between Antigravity CLI and Gemini CLI?',
      answer: 'Antigravity CLI ships as one compiled binary with no Node or Python runtime, while Gemini CLI was an npm/Node tool. Antigravity CLI offers Gemini, Claude and open-weight models in the same terminal, depending on your plan, whereas Gemini CLI was Gemini only. Antigravity CLI is multi-agent by default and can coordinate sub-agents, while Gemini CLI was a single linear chat. It also reuses the ~/.gemini home and imports your old config.',
    },
    {
      question: 'Is Antigravity CLI better than Gemini CLI?',
      answer: 'It is the supported successor, so it is the one that will keep improving. It adds real capabilities over Gemini CLI: a single-binary install with no Node runtime, several model families in one terminal, and a multi-agent design. Whether every change suits your workflow is up to you, but for personal accounts Gemini CLI no longer works, so Antigravity CLI is the current tool to use.',
    },
    {
      question: 'Can I still use Gemini CLI?',
      answer: 'Only in some setups. Gemini CLI is still maintained for enterprise Gemini Code Assist customers on Google Cloud and accepts paid Gemini API keys. With a free account or a Google AI Pro or Ultra subscription it stopped serving requests on June 18, 2026, so the path for those users is to install Antigravity CLI and import their config.',
    },
    {
      question: 'Does Antigravity CLI use Gemini models?',
      answer: 'Yes, and it leads with them. As of October 2026 Gemini 3.8 Flash is available on every plan and Gemini 4 Argon on paid Google AI plans. It also goes beyond Gemini: the same terminal offers Claude models and, on the free tier until November 2, 2026, GPT-OSS 120B. Choose with /model or --model, and run agy models to see what your plan includes.',
    },
  ],
}

export default guide
