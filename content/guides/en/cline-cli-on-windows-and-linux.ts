import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'cline-cli-on-windows-and-linux',
    locale: 'en',
    title: 'Cline CLI on Windows and Linux: install, Node.js and paths',
    metaTitle: 'Install Cline CLI on Windows and Linux (x64 and ARM64)',
    metaDescription: 'Install Cline CLI on Windows or Linux, x64 or ARM64: the Node.js you need, npm permission errors, PATH problems, where config lives and how to update.',
    intro: 'Cline CLI is an npm package with native binaries for Windows and Linux on x64 and ARM64, so the install is the same one command on both. What changes is how Node.js and npm are set up on each system. This guide covers both, plus the PATH and permission problems people hit most. Cline facts were checked against the official docs and the npm registry on October 31, 2026.',
    ctaText: 'On Windows or Linux, let CodeAgentSwarm install Cline and its Node.js runtime for you, then run it next to your other agents.',
    ctaAgent: 'cline',
    highlightedWords: ['Cline CLI'],
    publishedAt: '2026-10-31',
    updatedAt: '2026-10-31',
    alternateSlug: 'cline-cli-en-windows-y-linux',
    relatedSlug: 'how-to-use-cline-cli',
    socialImage: '/images/guides/cline-cli-og-en.png',
  },
  sections: [
    {
      id: 'requirements',
      title: 'What you need',
      content: [
        { type: 'image', src: '/icons/apps/cline-icon.svg', alt: 'Cline', size: 'inline' },
        {
          type: 'table',
          headers: ['System', 'Native binary in the npm package'],
          rows: [
            ['Windows x64', '<code>@cline/cli-windows-x64</code>'],
            ['Windows ARM64', '<code>@cline/cli-windows-arm64</code>'],
            ['Linux x64', '<code>@cline/cli-linux-x64</code>'],
            ['Linux ARM64', '<code>@cline/cli-linux-arm64</code>'],
          ],
          caption: 'Optional dependencies of the cline package 3.0.74 on the npm registry, checked October 31, 2026. npm installs only the one that matches your machine.',
        },
        {
          type: 'paragraph',
          text: `You need Node.js and npm to install it. Cline's ${link('https://docs.cline.bot/cline-cli/installation', 'installation docs')} ask for Node.js 20 or later and recommend 22. Check what you have with <code>node --version</code>.`,
        },
      ],
    },
    {
      id: 'windows',
      title: 'Install Cline CLI on Windows',
      content: [
        { type: 'code', language: 'powershell', code: 'node --version\nnpm install -g cline\ncline version' },
        {
          type: 'paragraph',
          text: 'Run this in PowerShell or Windows Terminal. npm puts a <code>cline.cmd</code> launcher in <code>%APPDATA%\\npm</code>, which the Node.js installer adds to your PATH. If <code>cline</code> is not found right after installing, open a new terminal so it picks up the updated PATH.',
        },
        {
          type: 'paragraph',
          text: 'Cline keeps its configuration in the <code>.cline</code> folder of your user profile. Global rules can also live in <code>Documents\\Cline\\Rules</code>, and Cline checks the OneDrive Documents folder too when Windows redirects it there.',
        },
      ],
    },
    {
      id: 'linux',
      title: 'Install Cline CLI on Linux',
      content: [
        { type: 'code', language: 'bash', code: 'node --version\nnpm install -g cline\ncline version' },
        {
          type: 'paragraph',
          text: 'If <code>npm install -g</code> fails with <code>EACCES</code>, your global npm folder belongs to root. Do not fix it with <code>sudo</code>; point npm at a folder you own instead:',
        },
        {
          type: 'code',
          language: 'bash',
          code: 'npm config set prefix ~/.npm-global\necho \'export PATH="$HOME/.npm-global/bin:$PATH"\' >> ~/.bashrc\nsource ~/.bashrc\nnpm install -g cline',
        },
        {
          type: 'paragraph',
          text: 'A Node version manager such as nvm avoids the problem too, because it installs Node in your home folder. On a server or over SSH, sign in with <code>cline auth</code> and an API key from your provider.',
        },
      ],
    },
    {
      id: 'path',
      title: 'When an editor or app cannot find cline',
      content: [
        {
          type: 'paragraph',
          text: `Apps that launch Cline as an Agent Client Protocol server do not always inherit your shell's PATH. Cline's ${link('https://docs.cline.bot/usage/acp', 'ACP docs')} suggest using the absolute path from <code>which cline</code> (or <code>where cline</code> on Windows) in that case.`,
        },
        {
          type: 'paragraph',
          text: 'CodeAgentSwarm looks in the usual places on its own: the PATH, the global npm folder (<code>%APPDATA%\\npm</code> on Windows, <code>~/.local/bin</code> and <code>/usr/local/bin</code> on Linux) and the Node runtime it manages.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'Let CodeAgentSwarm install it for you',
      content: [
        {
          type: 'image',
          src: '/images/guides/cline-agent-picker.webp',
          alt: 'Cline selected in the CodeAgentSwarm agent picker',
          caption: 'Real capture from the CodeAgentSwarm 2.5.0 release demo. Picking an agent that is not installed opens its installer.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: 'In CodeAgentSwarm 2.5.0, where Cline is in beta, pick Cline in the agent picker or press Install in Settings > Providers. On Windows and Linux the app can download its own Node.js runtime when yours is missing or older than 22.19, then installs the official <code>cline</code> package with the binary for your machine and checks it with <code>cline --version</code>.',
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'During 2.5.0 development the installer was tested on Windows ARM64 and Linux ARM64. If something looks wrong on an x64 machine, tell us from Settings > Feedback.',
        },
        {
          type: 'paragraph',
          text: `Next steps: ${link('/en/guides/how-to-use-cline-cli', 'connect a provider and learn the daily flags')}, or ${link('/en/guides/cline-agent-swarm', 'run several Cline sessions in parallel')}. Running other agents on Linux too? See ${link('/en/guides/github-copilot-cli-on-linux', 'GitHub Copilot CLI on Linux')}.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Does Cline CLI work on Windows?',
      answer: 'Yes. The npm package includes native Windows binaries for x64 and ARM64. Install it with npm install -g cline from PowerShell or Windows Terminal.',
    },
    {
      question: 'Does Cline CLI work on Linux ARM64?',
      answer: 'Yes. The package ships a Linux ARM64 binary, and npm picks it automatically on ARM64 machines.',
    },
    {
      question: 'Which Node.js version does Cline CLI need?',
      answer: 'Cline\'s installation docs ask for Node.js 20 or later and recommend 22. CodeAgentSwarm uses Node.js 22.19 or later when it installs Cline.',
    },
    {
      question: 'How do I update Cline CLI?',
      answer: 'Run cline update, or npm install -g cline again. Use cline@nightly if you want the nightly build.',
    },
    {
      question: 'Why does npm install -g cline fail with EACCES on Linux?',
      answer: 'Your global npm folder is owned by root. Set a user prefix with npm config set prefix ~/.npm-global and add its bin folder to PATH, or use a Node version manager such as nvm.',
    },
  ],
}

export default guide
