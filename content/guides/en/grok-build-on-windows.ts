import type { Guide } from '../types'

export const guide: Guide = {
  meta: {
    slug: 'grok-build-on-windows',
    locale: 'en',
    title: 'How to Run Grok Build on Windows',
    metaTitle: 'Grok Build on Windows (xAI): Install and Setup (2026)',
    metaDescription: 'Install Grok Build on Windows with PowerShell or Git Bash, PATH notes for %USERPROFILE%\\.grok\\bin, WSL tips, and CodeAgentSwarm on Windows.',
    intro: `Grok Build runs on Windows. The official path is the PowerShell installer (or the bash installer under Git Bash / WSL). Data lands under <code>%USERPROFILE%\\.grok\\</code> unless you set <code>GROK_HOME</code>.

Grok Build is xAI's coding CLI (<code>grok</code>), not the consumer Grok chat app.`,
    ctaText: 'CodeAgentSwarm supports Windows 10/11: install Grok Build, pick it in the agent launcher, supervise it next to your other CLIs.',
    ctaAgent: 'grok-build',
    highlightedWords: ['Windows', 'Grok Build'],
    publishedAt: '2026-07-28',
    updatedAt: '2026-07-28',
    alternateSlug: 'grok-build-en-windows',
  },
  sections: [
    {
      id: 'install-win',
      title: 'Install on Windows',
      content: [
        { type: 'code', language: 'powershell', code: '# PowerShell\nirm https://x.ai/cli/install.ps1 | iex\ngrok --version' },
        { type: 'paragraph', text: 'The PowerShell installer adds <code>%USERPROFILE%\\.grok\\bin</code> to your user PATH. Open a new terminal after install. Alternatively use Git Bash with the curl installer, or WSL for a Linux-like environment.' },
        { type: 'callout', variant: 'tip', content: 'If <code>grok</code> is not found, close and reopen the terminal, or check that <code>%USERPROFILE%\\.grok\\bin</code> is on PATH.' },
      ],
    },
    {
      id: 'wsl',
      title: 'WSL vs native',
      content: [
        { type: 'paragraph', text: 'WSL installs the Linux binary and uses the Linux home for <code>~/.grok</code>. Native Windows keeps config under your Windows user profile. Pick one home for a given project to avoid split session history.' },
      ],
    },
    {
      id: 'cas-win',
      title: 'CodeAgentSwarm on Windows',
      content: [
        { type: 'paragraph', text: 'CodeAgentSwarm for Windows can launch Grok Build once the CLI is on PATH. Use the same agent picker as on macOS. For path quirks with conversation history, keep project paths consistent (avoid mixing WSL and native paths for the same repo).' },
      ],
    },
  ],
  faq: [
    { question: 'Does Grok Build support Windows?', answer: 'Yes. Use the PowerShell installer or Git Bash / WSL with the bash script.' },
    { question: 'Where is config stored on Windows?', answer: 'Typically %USERPROFILE%\\.grok unless GROK_HOME is set.' },
  ],
}

export default guide
