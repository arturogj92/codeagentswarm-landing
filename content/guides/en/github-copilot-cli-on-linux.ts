import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-on-linux',
    locale: 'en',
    title: 'How to install GitHub Copilot CLI on Linux (and sign in over SSH)',
    metaTitle: 'GitHub Copilot CLI on Linux: Install, SSH Login and Fixes',
    metaDescription: 'Install GitHub Copilot CLI on Linux with the official script, Homebrew or npm, run it on Alpine, sign in over SSH with a device code or token, and fix common errors.',
    intro: 'GitHub Copilot CLI runs on Linux as a single binary called <code>copilot</code>. This guide covers the three install methods, the Alpine (musl) case the script does not handle, signing in on a server with no browser, tokens for headless machines, local models, updates and the errors you are likely to see. We checked the commands against the 1.0.93 install script and the GitHub docs on October 8, 2026.',
    ctaText: 'Running Copilot on your Linux desktop? Starting with the release after 2.4.3, CodeAgentSwarm installs the right glibc or musl build for you and keeps several Copilot sessions side by side with your other agents.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-en-linux',
    relatedSlug: 'how-to-use-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'quick-install',
      title: 'Quick answer: install GitHub Copilot CLI on Linux',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'callout',
          variant: 'tip',
          content: 'Quick answer: run the official script, no sudo needed. It installs <code>~/.local/bin/copilot</code> and checks the download against GitHub\'s published checksums. Then run <code>copilot</code> inside a project and sign in.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Official script for Linux and macOS (wget -qO- works too)
curl -fsSL https://gh.io/copilot-install | bash

# Check the install
copilot --version

# Start it inside a project
cd ~/my-project
copilot`,
        },
        {
          type: 'paragraph',
          text: `Sources: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli', 'GitHub installation docs')} and ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli', 'GitHub authentication docs')}, checked October 8, 2026. For a general tour of the agent, read ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'install-methods',
      title: 'Script, Homebrew or npm',
      content: [
        {
          type: 'table',
          headers: ['Method', 'Command', 'Good to know'],
          rows: [
            ['Official script', '<code>curl -fsSL https://gh.io/copilot-install | bash</code>', 'Standalone binary. <code>~/.local/bin</code> as a normal user, <code>/usr/local/bin</code> as root.'],
            ['Homebrew', '<code>brew install --cask copilot-cli</code>', 'Prerelease: <code>copilot-cli@prerelease</code>.'],
            ['npm', '<code>npm install -g @github/copilot</code>', 'Needs Node.js 22 or later. Prerelease: <code>@github/copilot@prerelease</code>.'],
          ],
          caption: 'Install methods listed in the GitHub docs, checked October 8, 2026.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Install into a folder you choose and pin a version
curl -fsSL https://gh.io/copilot-install | VERSION="v1.0.93" PREFIX="$HOME/tools" bash
# The binary ends up in $HOME/tools/bin/copilot`,
        },
        {
          type: 'paragraph',
          text: 'The script reads two variables. <code>PREFIX</code> picks the base folder and the binary goes into <code>$PREFIX/bin</code>. <code>VERSION</code> picks a release (the default is the latest; <code>prerelease</code> also works if <code>git</code> is installed). When <code>sha256sum</code> or <code>shasum</code> is available, the script verifies the archive against <code>SHA256SUMS.txt</code> before extracting it, and stops if the checksum does not match.',
        },
      ],
    },
    {
      id: 'alpine-musl',
      title: 'Alpine and other musl distributions',
      content: [
        {
          type: 'paragraph',
          text: `GitHub publishes two Linux builds for each architecture: <code>copilot-linux-x64</code> and <code>copilot-linux-arm64</code> for glibc distributions (Ubuntu, Debian, Fedora and most others), and <code>copilot-linuxmusl-x64</code> and <code>copilot-linuxmusl-arm64</code> for musl distributions such as Alpine. When we read the ${link('https://gh.io/copilot-install', 'install script')} on October 8, 2026, it always downloaded the glibc build. On Alpine, download the musl archive from the ${link('https://github.com/github/copilot-cli/releases', 'release page')} yourself:`,
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Alpine on x64 (use copilot-linuxmusl-arm64 on ARM64)
BASE=https://github.com/github/copilot-cli/releases/latest/download
curl -fsSLO $BASE/copilot-linuxmusl-x64.tar.gz
curl -fsSLO $BASE/SHA256SUMS.txt
grep copilot-linuxmusl-x64.tar.gz SHA256SUMS.txt | sha256sum -c -
mkdir -p ~/.local/bin
tar -xz -C ~/.local/bin -f copilot-linuxmusl-x64.tar.gz
copilot --version`,
        },
        {
          type: 'callout',
          variant: 'info',
          content: 'Not sure which one you have? Run <code>ldd --version</code>. If the output mentions musl, or <code>/etc/alpine-release</code> exists, use the musl build. The npm package is another route on Alpine if you already have Node.js 22 or later.',
        },
      ],
    },
    {
      id: 'sign-in-over-ssh',
      title: 'Sign in over SSH with a device code',
      content: [
        {
          type: 'paragraph',
          text: 'On a desktop, <code>copilot login</code> opens the browser. Over SSH, in dev containers, in CI and on headless Linux, it uses the device code flow by default, so you can sign in from any other device.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `copilot login                 # device code by default over SSH
copilot login --device-code   # force the device code flow
copilot login --web-flow      # force the browser flow`,
        },
        {
          type: 'list',
          items: [
            'The command prints <code>https://github.com/login/device</code> and a one-time code. Open that page on your laptop or phone, enter the code and approve access.',
            'Inside the interactive interface, <code>/login</code> does the same. <code>/user list</code> and <code>/user switch</code> handle several accounts.',
            'For GitHub Enterprise Cloud with data residency, add <code>--host https://example.ghe.com</code> (with your own domain) or set <code>COPILOT_GH_HOST</code>.',
            'The first time you open Copilot in a folder, it asks you to confirm folder trust. Answer once, or choose to remember the folder.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Copilot stores the token in the system keychain. A headless server often has no keychain (for example, no <code>libsecret</code>). In that case Copilot asks whether to save the token in plain text in <code>~/.copilot/config.json</code>. Say yes only on a machine you control, and keep that file out of backups you share. <code>/logout</code> removes the local token but does not revoke it on GitHub.',
        },
      ],
    },
    {
      id: 'token-headless',
      title: 'Headless machines and CI: COPILOT_GITHUB_TOKEN',
      content: [
        {
          type: 'paragraph',
          text: 'When nobody can type a device code, give Copilot a token. It must be a fine-grained personal access token with the <strong>Copilot Requests</strong> permission:',
        },
        {
          type: 'list',
          items: [
            `Open ${link('https://github.com/settings/personal-access-tokens/new', 'the fine-grained token page')} on GitHub.`,
            'Under Resource owner, pick your personal account.',
            'In Account permissions, add <strong>Copilot Requests</strong>, then generate the token.',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Option 1: environment variable, nothing saved on disk
export COPILOT_GITHUB_TOKEN="github_pat_..."
copilot

# Option 2: store it once (read from stdin)
copilot login --with-token < ~/copilot-token.txt`,
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Classic tokens that start with <code>ghp_</code> do not work. Copilot checks <code>COPILOT_GITHUB_TOKEN</code>, then <code>GH_TOKEN</code>, then <code>GITHUB_TOKEN</code>, then the keychain, and finally a signed-in GitHub CLI. If a server already exports a <code>GITHUB_TOKEN</code> for something else, Copilot may pick it up; set <code>COPILOT_GITHUB_TOKEN</code> to make the choice explicit.',
        },
      ],
    },
    {
      id: 'byok-offline',
      title: 'Your own model, or fully offline',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot CLI can talk to your own provider (BYOK) instead of GitHub models, and then it needs no GitHub login. <code>COPILOT_PROVIDER_TYPE</code> accepts <code>openai</code> (the default, for any endpoint compatible with the OpenAI Chat Completions API), <code>azure</code> or <code>anthropic</code>. A remote provider also takes <code>COPILOT_PROVIDER_API_KEY</code>.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `# Example from the GitHub docs: a local Ollama server
export COPILOT_PROVIDER_BASE_URL=http://localhost:11434
export COPILOT_MODEL=YOUR-MODEL-NAME
# Optional: never contact GitHub servers
export COPILOT_OFFLINE=true
copilot`,
        },
        {
          type: 'list',
          items: [
            'The model has to support tool calling and streaming. GitHub recommends a context window of at least 128k tokens.',
            '<code>COPILOT_OFFLINE=true</code> requires a local provider. GitHub notes that offline mode only isolates you fully if the provider also runs locally or inside the same isolated network.',
            '<code>--model</code> on the command line does the same as <code>COPILOT_MODEL</code>.',
          ],
        },
        {
          type: 'paragraph',
          text: `Source: ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-byok-models', 'GitHub docs on BYOK models')}, checked October 8, 2026.`,
        },
      ],
    },
    {
      id: 'updates',
      title: 'Updates, and turning them off in CI',
      content: [
        {
          type: 'table',
          headers: ['Installed with', 'How it updates'],
          rows: [
            ['Script or release archive', 'Downloads updates on its own and applies them on the next launch. <code>copilot update</code> does it now.'],
            ['npm', 'Only tells you a newer version exists. Update with <code>npm install -g @github/copilot</code>.'],
            ['Homebrew', 'Update with <code>brew upgrade --cask copilot-cli</code>.'],
          ],
          caption: 'Auto-update is already off by default in CI.',
        },
        {
          type: 'code',
          language: 'bash',
          code: `copilot update              # latest stable
copilot update prerelease   # latest prerelease

# Keep a pinned version on a shared server or build image
copilot --no-auto-update
export COPILOT_AUTO_UPDATE=false`,
        },
        {
          type: 'paragraph',
          text: 'On a build image, pin the version with <code>VERSION</code> when you install and keep auto-update off, so every job runs the same binary.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Common Linux errors and how to fix them',
      content: [
        {
          type: 'list',
          items: [
            '<strong>"copilot: command not found" after installing:</strong> <code>~/.local/bin</code> is not on your PATH. The script offers to add it to <code>~/.profile</code>, <code>~/.bash_profile</code> or <code>~/.zprofile</code>. Otherwise add <code>export PATH="$HOME/.local/bin:$PATH"</code> yourself and open a new shell.',
            '<strong>"Error: Unsupported architecture":</strong> the script supports x86_64 and aarch64 only. Check with <code>uname -m</code>.',
            '<strong>The binary exists but will not run on Alpine:</strong> you have the glibc build on a musl system. Install the <code>linuxmusl</code> archive as shown above.',
            '<strong>"Could not create directory ... You may not have write permissions":</strong> set <code>PREFIX</code> to a folder you own, or run the script as root to install into <code>/usr/local/bin</code>.',
            '<strong>"No sha256sum or shasum found, skipping checksum validation":</strong> install coreutils from your package manager and run the script again.',
            '<strong>Login never finishes over SSH:</strong> force <code>copilot login --device-code</code>.',
            '<strong>A token is rejected:</strong> it is probably a classic <code>ghp_</code> token, or a fine-grained token without the Copilot Requests permission.',
            '<strong>The npm package fails to install or start:</strong> check <code>node --version</code>. The package needs Node.js 22 or later.',
          ],
        },
        {
          type: 'paragraph',
          text: 'Logs live in <code>~/.copilot/logs/</code>. Raise the detail with <code>--log-level</code>, or send them elsewhere with <code>--log-dir</code>.',
        },
      ],
    },
    {
      id: 'remote-server-and-codeagentswarm',
      title: 'On a remote server and in CodeAgentSwarm',
      content: [
        {
          type: 'paragraph',
          text: 'On a remote server, start Copilot inside <code>tmux</code> or <code>screen</code> so a dropped SSH connection does not end the session. If it does end, <code>copilot --continue</code> reopens the latest session and <code>copilot --resume &lt;id&gt;</code> reopens a specific one. Sessions live in <code>~/.copilot/session-state/</code> on that server.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-install.webp',
          alt: 'GitHub Copilot CLI installation dialog in CodeAgentSwarm',
          caption: 'Real capture from a CodeAgentSwarm development build. Pressing Install downloads the official release archive and checks its SHA-256 before extracting it.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: `On a Linux desktop, ${link('/en', 'CodeAgentSwarm')} adds GitHub Copilot CLI support in the release after 2.4.3. Pick GitHub Copilot CLI in the agent picker or install it from Settings > Providers: the app downloads the official archive for your machine, glibc or musl, verifies <code>SHA256SUMS</code> and installs <code>~/.local/bin/copilot</code>. If you already installed Copilot with npm or Homebrew, the app detects it and updates it through that tool. You sign in from Chat with a device code, and a session started in Chat continues in the terminal view.`,
        },
        {
          type: 'image',
          src: '/images/guides/copilot-usage-panel.webp',
          alt: 'GitHub Copilot CLI monthly allowance in the CodeAgentSwarm usage panel',
          caption: 'Real interface from a CodeAgentSwarm development build. The 7% left shown here comes from test fixtures, not a real account.',
          size: 'medium',
        },
        {
          type: 'paragraph',
          text: `The usage panel shows your monthly Copilot allowance and reset date next to your other agents. It reads it with a token from the environment or a signed-in GitHub CLI, never from the keychain. You can run several Copilot sessions side by side, each in its own project or ${link('/en/guides/git-worktrees-for-ai-coding-agents', 'git worktree')}, next to Claude Code, Codex and the other supported agents. Next: ${link('/en/guides/github-copilot-cli-mcp-history', 'Copilot CLI MCP and history')} and ${link('/en/guides/github-copilot-cli-models-ai-credits', 'models and AI credits')}.`,
        },
      ],
    },
    {
      id: 'conclusion',
      title: 'Conclusion',
      content: [
        {
          type: 'paragraph',
          text: 'On most Linux machines, one <code>curl</code> line installs GitHub Copilot CLI into your home folder. Alpine needs the musl archive by hand. Over SSH the device code flow is the default, headless machines take a fine-grained token in <code>COPILOT_GITHUB_TOKEN</code>, and <code>COPILOT_OFFLINE=true</code> with a local model keeps everything on your network. Turn auto-update off where you need a fixed version.',
        },
      ],
    },
  ],
  faq: [
    {
      question: 'How do I install GitHub Copilot CLI on Linux?',
      answer: 'Run "curl -fsSL https://gh.io/copilot-install | bash". It installs the binary in ~/.local/bin as a normal user, or /usr/local/bin as root. Homebrew ("brew install --cask copilot-cli") and npm ("npm install -g @github/copilot", Node.js 22 or later) also work.',
    },
    {
      question: 'Does GitHub Copilot CLI work on Alpine Linux?',
      answer: 'Yes. GitHub publishes musl builds for x64 and ARM64 (copilot-linuxmusl-x64 and copilot-linuxmusl-arm64). The install script we checked on October 8, 2026 always fetched the glibc build, so download the musl archive from the release page or use npm.',
    },
    {
      question: 'How do I sign in to Copilot CLI on a server without a browser?',
      answer: 'Run "copilot login". Over SSH it uses the device code flow by default: it prints github.com/login/device and a code you enter on any other device. For machines where nobody can type, export COPILOT_GITHUB_TOKEN with a fine-grained token that has the Copilot Requests permission.',
    },
    {
      question: 'Can I use GitHub Copilot CLI offline?',
      answer: 'Yes, with your own local model. Set COPILOT_PROVIDER_BASE_URL and COPILOT_MODEL for the local provider, then COPILOT_OFFLINE=true. The model must support tool calling and streaming. No GitHub login is needed in that setup.',
    },
    {
      question: 'How do I stop GitHub Copilot CLI from updating itself?',
      answer: 'Start it with --no-auto-update or set COPILOT_AUTO_UPDATE=false. In CI, auto-update is already off by default. npm installs never update themselves; they only report a newer version.',
    },
  ],
}

export default guide
