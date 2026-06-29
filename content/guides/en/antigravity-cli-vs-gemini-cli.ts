import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'antigravity-cli-vs-gemini-cli',
    locale: 'en',
    title: 'Antigravity CLI vs Gemini CLI: What Changed and How to Migrate',
    metaTitle: 'Antigravity CLI vs Gemini CLI: What Changed and How to Migrate (2026)',
    metaDescription: 'Gemini CLI was retired and replaced by Antigravity CLI. See what changed between the two, whether you have to migrate, and the exact steps to move over while keeping your config.',
    intro: `If you opened a terminal expecting the gemini command and it was not there, you are not imagining it. Google retired Gemini CLI and replaced it with Antigravity CLI, the new agent that runs under the agy command. The good news is that the move was designed to be easy, and most of your old setup comes along with you.

This guide is a straight comparison plus a migration walkthrough. First I cover what actually happened to Gemini CLI and when. Then I lay out the real differences between Antigravity CLI and Gemini CLI, dimension by dimension, so you know what you are gaining and what changed under your feet. After that you get the exact migration steps, including the import prompt that pulls your old config across.

Gemini CLI was a good tool and it earned its audience, so this is not a hype piece about a replacement. Since Gemini CLI is shut down, migrating to Antigravity CLI is simply the path forward, and as you will see, that path is short.`,
    ctaText: 'Moving from Gemini CLI to Antigravity CLI does not mean losing your multi-session workflow. Run several Antigravity CLI terminals side by side in CodeAgentSwarm, next to Claude Code and Codex CLI, in one workspace.',
    highlightedWords: ['Antigravity CLI', 'Gemini CLI', 'Migrate'],
    publishedAt: '2026-06-29',
    updatedAt: '2026-06-29',
    alternateSlug: 'antigravity-cli-vs-gemini-cli',
  },
  sections: [
    {
      id: 'gemini-cli-retired',
      title: 'What happened: Gemini CLI was retired',
      content: [
        {
          type: 'paragraph',
          text: 'Gemini CLI was Google\'s first terminal coding agent. It shipped as an open-source, Node-based tool you installed from npm and ran with the <code>gemini</code> command, signed in with a Google account, and pointed at a project. It got popular fast because it was free to start, had a large context window per session, and lived right in the terminal where developers already worked.',
        },
        {
          type: 'paragraph',
          text: 'On June 18, 2026, Google retired Gemini CLI and transitioned it into <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" class="text-neon-cyan hover:text-neon-purple transition-colors">Antigravity CLI</a>, the official successor that runs under the <code>agy</code> command. This was announced ahead of time on the Google developers blog, and the project repository carries a pinned discussion explaining the change and the timeline.',
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
          content: 'Short version: Gemini CLI is not getting new features, and the <code>gemini</code> command is being wound down. Antigravity CLI is where Google is putting its terminal-agent work now. If you used Gemini CLI, the next step is to install Antigravity CLI and let it import your old config, which is what the rest of this guide walks through.',
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
            '<strong>Antigravity CLI:</strong> Eight models in the same terminal, including Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6, and GPT-OSS 120B. It defaults to Gemini 3.5 Flash and auto-selects the right model for the task, so there is no <code>--model</code> flag to manage.',
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          content: 'This is the biggest practical change. Antigravity CLI is no longer a Gemini-only tool. It still leads with Gemini and defaults to Gemini 3.5 Flash, but it can route a task to a Claude or open-weight model when that fits better, all from the one <code>agy</code> session.',
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
            '<strong>Antigravity CLI:</strong> Reuses the same <code>~/.gemini</code> home, and on first launch it offers to import your old Gemini CLI config automatically into <code>~/.gemini/antigravity-cli/settings.json</code>. That is what makes the migration painless.',
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
          text: 'The first time you run <code>agy</code>, it detects your existing <code>~/.gemini</code> home and offers to import your Gemini CLI configuration. Accept it. Your settings are written into <code>~/.gemini/antigravity-cli/settings.json</code>, so the old and new tools coexist on the same home directory.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# First launch - it will ask to import your old Gemini CLI config\nagy',
        },
        {
          type: 'paragraph',
          text: 'What the import brings across:',
        },
        {
          type: 'list',
          items: [
            'Your registered MCP servers, so your tools are available immediately',
            'Your allowed-without-confirmation commands, so you do not re-approve everything',
            'Your keybindings',
            'Your theme',
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Because Antigravity CLI reuses <code>~/.gemini</code>, you are not starting from a blank config. If you spent time wiring MCP servers or tuning which commands run without a prompt under Gemini CLI, that work carries over instead of being thrown away.',
        },
        {
          type: 'heading',
          level: 3,
          text: '3. Verify it works',
          id: 'migrate-verify',
        },
        {
          type: 'paragraph',
          text: 'Open a project, start a session, and confirm your MCP servers and approvals behave the way they did before. Try continuing your last conversation and resuming a specific one to make sure your history is reachable.',
        },
        {
          type: 'code',
          language: 'bash',
          code: '# Continue your last conversation\nagy -c\n\n# Resume a specific conversation by id\nagy --conversation <id>',
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Do not assume the import happened if you skipped the prompt. If your MCP servers or approvals are missing, you probably declined or missed the import on first launch. Check that <code>~/.gemini/antigravity-cli/settings.json</code> exists and contains your servers, and re-run the import flow if it does not.',
        },
        {
          type: 'paragraph',
          text: 'That is the whole migration. Since Gemini CLI is retired, this is the move that keeps you current, and it costs a couple of minutes.',
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
          alt: 'A CodeAgentSwarm terminal showing the SELECT AI AGENT picker, where you choose Antigravity CLI for a terminal alongside Claude Code and Codex CLI options',
          src: '/images/guides/multi-cli-agent-selector.png',
          caption: 'In CodeAgentSwarm you pick the agent per terminal. Set a terminal to Antigravity CLI and run it next to Claude Code or Codex CLI in the same window.',
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm is a desktop app for running several AI CLI sessions in parallel with real visibility. It runs on macOS and Windows, and it is not a model provider, so each Antigravity CLI session keeps using your own Google sign-in and your own <code>agy</code> install. The app just gives the sessions a place to live: multiple terminals in one workspace, the agent chosen per terminal from the SELECT AI AGENT picker.',
        },
        {
          type: 'image',
          alt: 'Several Antigravity CLI sessions running in parallel inside a single CodeAgentSwarm workspace, each terminal an independent agy process',
          src: '/images/guides/antigravity-agent-swarm.png',
          caption: 'Several Antigravity CLI sessions in parallel: independent agy processes running side by side in one CodeAgentSwarm window.',
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
          text: 'If you are coming from the old Gemini guides, the <a href="/en/guides/run-multiple-gemini-sessions" class="text-neon-cyan hover:text-neon-purple transition-colors">running multiple Gemini CLI sessions</a> and <a href="/en/guides/gemini-agent-swarm" class="text-neon-cyan hover:text-neon-purple transition-colors">Gemini agent swarm</a> guides describe the same workflow you can now carry over to Antigravity CLI.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Is Gemini CLI dead or deprecated?',
      answer: 'Yes. Google retired Gemini CLI on June 18, 2026 and transitioned it to Antigravity CLI, which runs under the agy command. Gemini CLI is not getting new features, and Antigravity CLI is the official successor. The announcement is on the Google developers blog and there is a pinned discussion on the gemini-cli GitHub repo with the details.',
    },
    {
      question: 'Do I have to migrate from Gemini CLI to Antigravity CLI?',
      answer: 'Practically, yes, because Gemini CLI is shut down and will not get updates. The upside is that migration is short: install Antigravity CLI with one script, then accept the import prompt on first launch. Your existing config comes across, so you are not rebuilding your setup from scratch.',
    },
    {
      question: 'Will my Gemini CLI config and MCP servers transfer?',
      answer: 'Yes. Antigravity CLI reuses the same ~/.gemini home directory, and on first launch it offers to import your Gemini CLI configuration into ~/.gemini/antigravity-cli/settings.json. That import brings over your registered MCP servers, your allowed-without-confirmation commands, your keybindings, and your theme. If something is missing afterward, you likely skipped the prompt and should re-run the import.',
    },
    {
      question: 'What is the difference between Antigravity CLI and Gemini CLI?',
      answer: 'Antigravity CLI ships as one compiled binary with no Node or Python runtime, while Gemini CLI was an npm/Node tool. Antigravity CLI runs eight models in the same terminal, including Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6, and GPT-OSS 120B, whereas Gemini CLI was Gemini only. Antigravity CLI is multi-agent by default and can coordinate sub-agents, while Gemini CLI was a single linear chat. It also reuses the ~/.gemini home and imports your old config.',
    },
    {
      question: 'Is Antigravity CLI better than Gemini CLI?',
      answer: 'It is the supported successor, so it is the one that will keep improving. It adds real capabilities over Gemini CLI: a single-binary install with no Node runtime, multiple models in one terminal with automatic selection, and a multi-agent design. Whether every change suits your workflow is up to you, but since Gemini CLI is retired, Antigravity CLI is the current tool to use.',
    },
    {
      question: 'Can I still use Gemini CLI?',
      answer: 'An existing Gemini CLI install may still run for now, but it is retired and no longer maintained, so it will not receive updates or new features. The recommended path is to install Antigravity CLI and import your config. Treat any continued Gemini CLI use as temporary rather than a long-term setup.',
    },
    {
      question: 'Does Antigravity CLI use Gemini models?',
      answer: 'Yes, and it leads with them. Antigravity CLI defaults to Gemini 3.5 Flash and auto-selects the best model for the task, with no --model flag to manage. It also goes beyond Gemini: the same terminal can use Gemini 3.x, Claude Sonnet 4.6, Claude Opus 4.6, and GPT-OSS 120B, among eight models in total.',
    },
  ],
}

export default guide
