import type { Guide } from '../types'

const link = (href: string, text: string) => `<a href="${href}" class="text-neon-cyan hover:text-neon-purple transition-colors">${text}</a>`

const guide: Guide = {
  meta: {
    slug: 'github-copilot-cli-on-windows',
    locale: 'en',
    title: 'GitHub Copilot CLI on Windows: install, PATH, PowerShell and sign-in',
    metaTitle: 'GitHub Copilot CLI on Windows: Install, PATH and Sign In',
    metaDescription: 'Install GitHub Copilot CLI on Windows x64 or ARM64 with WinGet, MSI, zip or npm. Fix PATH errors, set up PowerShell, sign in with a device code and update.',
    intro: 'GitHub Copilot CLI runs natively on Windows, on both x64 and ARM64. This guide covers the four ways to install it, the PATH problems that make PowerShell say <code>copilot</code> is not recognized, the PowerShell version Copilot expects, sign-in and updates. The commands were checked against the official docs on October 8, 2026.',
    ctaText: 'Starting with the release after 2.4.3, install GitHub Copilot CLI on Windows from the agent picker, sign in from Chat and run several Copilot sessions side by side in CodeAgentSwarm.',
    ctaAgent: 'copilot',
    highlightedWords: ['GitHub Copilot CLI'],
    publishedAt: '2026-10-08',
    updatedAt: '2026-10-08',
    alternateSlug: 'github-copilot-cli-en-windows',
    relatedSlug: 'how-to-use-github-copilot-cli',
    socialImage: '/images/guides/copilot-cli-og-en.png',
  },
  sections: [
    {
      id: 'quick-answer',
      title: 'The short version: WinGet',
      content: [
        { type: 'image', src: '/icons/apps/copilot-icon.svg', alt: 'GitHub Copilot CLI', size: 'inline' },
        {
          type: 'paragraph',
          text: 'Open PowerShell and run these two lines. WinGet picks the x64 or ARM64 build for you. Close the terminal and open a new one before you run <code>copilot --version</code>, so it sees the updated PATH.',
        },
        { type: 'code', language: 'powershell', code: 'winget install GitHub.Copilot\ncopilot --version' },
        {
          type: 'paragraph',
          text: `GitHub lists two prerequisites for Windows: an active Copilot subscription and PowerShell 6 or later (${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/install-copilot-cli', 'GitHub installation docs')}, checked October 8, 2026). The general walkthrough for every platform is in ${link('/en/guides/how-to-use-github-copilot-cli', 'how to install and use GitHub Copilot CLI')}.`,
        },
      ],
    },
    {
      id: 'install-methods',
      title: 'Four ways to install it on Windows',
      content: [
        {
          type: 'table',
          headers: ['Method', 'What you run or download'],
          rows: [
            ['WinGet', '<code>winget install GitHub.Copilot</code>'],
            ['MSI installer', '<code>copilot-x64.msi</code> or <code>copilot-arm64.msi</code>'],
            ['Zip', '<code>copilot-win32-x64.zip</code> or <code>copilot-win32-arm64.zip</code>, each with a single <code>copilot.exe</code>'],
            ['npm (Node.js 22 or later)', '<code>npm install -g @github/copilot</code>'],
          ],
          caption: 'File names from the v1.0.93 release on GitHub.',
        },
        {
          type: 'paragraph',
          text: `The MSI and zip files are on the ${link('https://github.com/github/copilot-cli/releases', 'copilot-cli releases page')}, next to <code>SHA256SUMS.txt</code>. Pick the file that matches your processor: Settings > System > About shows it under System type. For prerelease builds, use <code>winget install GitHub.Copilot.Prerelease</code> or <code>npm install -g @github/copilot@prerelease</code>.`,
        },
        {
          type: 'paragraph',
          text: 'Only the npm package needs Node.js. WinGet, the MSI and the zip all give you the standalone binary.',
        },
      ],
    },
    {
      id: 'zip-install',
      title: 'Manual install from the zip',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: '$dir = "$env:LOCALAPPDATA\\copilot-cli"\n$base = "https://github.com/github/copilot-cli/releases/latest/download"\nInvoke-WebRequest "$base/copilot-win32-x64.zip" -OutFile copilot.zip\nInvoke-WebRequest "$base/SHA256SUMS.txt" -OutFile SHA256SUMS.txt\n(Get-FileHash copilot.zip -Algorithm SHA256).Hash\nSelect-String -Path SHA256SUMS.txt -Pattern "copilot-win32-x64.zip"\nExpand-Archive copilot.zip -DestinationPath $dir\n$userPath = [Environment]::GetEnvironmentVariable("Path", "User")\n[Environment]::SetEnvironmentVariable("Path", "$userPath;$dir", "User")',
        },
        {
          type: 'paragraph',
          text: 'On an ARM64 machine, replace <code>x64</code> with <code>arm64</code> in both file names. The two hashes must match; PowerShell prints its hash in capitals and the file uses lowercase, which is fine. The last two lines add the folder to your user PATH, so open a new terminal afterwards.',
        },
        {
          type: 'paragraph',
          text: 'The folder <code>%LOCALAPPDATA%\\copilot-cli</code> is only a suggestion. It is the same one the CodeAgentSwarm installer uses, which keeps things tidy if you later switch.',
        },
      ],
    },
    {
      id: 'not-recognized',
      title: 'When PowerShell says copilot is not recognized',
      content: [
        {
          type: 'code',
          language: 'powershell',
          code: 'Get-Command copilot -All\nwhere.exe copilot\nnpm prefix -g',
        },
        {
          type: 'list',
          items: [
            '<strong>The terminal was open during the install.</strong> A window keeps the PATH it started with. Open a new one, and restart any app that launches Copilot for you.',
            `<strong>You installed with npm.</strong> On Windows, npm puts global commands directly in the folder that <code>npm prefix -g</code> prints, by default <code>%AppData%\\npm</code> (${link('https://docs.npmjs.com/cli/v11/configuring-npm/folders', 'npm folders docs')}, checked October 8, 2026). That folder must be in PATH.`,
            '<strong>You unpacked the zip.</strong> Nothing adds the folder to PATH for you. Use the last two lines of the zip example above.',
            '<strong>Several copies show up.</strong> Run <code>copilot --version</code> from each path that <code>Get-Command</code> lists and keep the one you want. Two installs updated by different tools drift apart.',
          ],
        },
      ],
    },
    {
      id: 'powershell',
      title: 'PowerShell is the shell Copilot uses',
      content: [
        {
          type: 'paragraph',
          text: `On Windows, Copilot runs its shell commands through PowerShell. It prefers PowerShell 7 or later (<code>pwsh</code>) and falls back to Windows PowerShell (<code>powershell.exe</code>) when <code>pwsh</code> is missing (${link('https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-config-dir-reference', 'GitHub configuration reference')}, checked October 8, 2026). Windows PowerShell 5.1 is the version that comes with Windows, and it is older than the PowerShell 6 that GitHub lists as a prerequisite. Check which one you have and install PowerShell 7 if needed:`,
        },
        {
          type: 'code',
          language: 'powershell',
          code: '$PSVersionTable.PSVersion\nwinget install --id Microsoft.PowerShell --source winget',
        },
        {
          type: 'paragraph',
          text: `The install command comes from ${link('https://learn.microsoft.com/en-us/powershell/scripting/install/install-powershell-on-windows', 'Microsoft\'s PowerShell install guide')}, checked October 8, 2026. PowerShell 7 runs side by side with Windows PowerShell 5.1; it does not replace it. The <code>powershellFlags</code> setting in <code>settings.json</code>, inside the <code>.copilot</code> folder of your user profile, decides how Copilot starts PowerShell. The default is:`,
        },
        {
          type: 'code',
          language: 'json',
          code: '{\n  "powershellFlags": ["-NoProfile", "-NoLogo"]\n}',
        },
        {
          type: 'paragraph',
          text: 'With <code>-NoProfile</code>, your PowerShell profile does not load, so aliases and functions defined there are not available to Copilot. Leave the default unless a command really depends on your profile. The file accepts comments, and <code>COPILOT_HOME</code> moves the whole folder.',
        },
      ],
    },
    {
      id: 'sign-in',
      title: 'Sign in with a device code',
      content: [
        { type: 'code', language: 'powershell', code: 'copilot login --device-code' },
        {
          type: 'paragraph',
          text: `On a normal Windows desktop, <code>copilot login</code> opens the browser. The <code>--device-code</code> flag prints <code>https://github.com/login/device</code> and a one-time code instead, which also works over SSH or in a remote session. Copilot stores the token in the system keychain. Details in the ${link('https://docs.github.com/en/copilot/how-tos/copilot-cli/set-up-copilot-cli/authenticate-copilot-cli', 'GitHub authentication docs')}.`,
        },
        {
          type: 'list',
          items: [
            'Classic personal access tokens that start with <code>ghp_</code> are not supported. Use a fine-grained token with the Copilot Requests permission and pass it with <code>copilot login --with-token</code>.',
            'If <code>COPILOT_GITHUB_TOKEN</code>, <code>GH_TOKEN</code> or <code>GITHUB_TOKEN</code> is set, Copilot uses it before the keychain, in that order. Without any of them, it falls back to a signed-in GitHub CLI.',
            '<code>/logout</code> removes the local token but does not revoke it.',
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          content: 'Signed in with one account but Copilot uses another? Look for a <code>GH_TOKEN</code> or <code>GITHUB_TOKEN</code> saved in your Windows user variables. It wins over the account you just signed in with.',
        },
      ],
    },
    {
      id: 'updates',
      title: 'Keep it updated',
      content: [
        {
          type: 'table',
          headers: ['Installed with', 'How to update'],
          rows: [
            ['WinGet', '<code>winget upgrade GitHub.Copilot</code>'],
            ['Zip', '<code>copilot update</code>, or let the automatic update apply on the next launch'],
            ['npm', '<code>npm install -g @github/copilot</code> (Copilot only tells you a newer version exists)'],
            ['CodeAgentSwarm installer', 'The app updates its own copy, and updates WinGet or npm installs through those tools'],
          ],
        },
        {
          type: 'paragraph',
          text: 'Standalone installs download updates by themselves and apply them the next time Copilot starts. To turn that off, start Copilot with <code>--no-auto-update</code> or set <code>COPILOT_AUTO_UPDATE=false</code>. <code>copilot update prerelease</code> switches to prerelease builds. GitHub does not document how MSI installs update, so check <code>copilot --version</code> afterwards.',
        },
      ],
    },
    {
      id: 'gh-copilot',
      title: 'copilot is not gh copilot',
      content: [
        {
          type: 'paragraph',
          text: 'If you used GitHub CLI before, you may still have the old <code>gh copilot</code> extension. It only suggested and explained shell commands. GitHub Copilot CLI is a different program: the command is <code>copilot</code>, and it reads your project, edits files and runs commands after you approve them.',
        },
        {
          type: 'paragraph',
          text: 'So if <code>gh copilot suggest</code> works but <code>copilot</code> is not recognized, you have the old extension and not the agent. Install Copilot CLI with one of the methods above. The two do share one thing: a signed-in GitHub CLI can provide the account Copilot CLI uses.',
        },
      ],
    },
    {
      id: 'codeagentswarm',
      title: 'GitHub Copilot CLI in CodeAgentSwarm on Windows',
      content: [
        {
          type: 'paragraph',
          text: 'Copilot support arrives in the CodeAgentSwarm release after 2.4.3. It is not part of 2.4.3 or earlier versions. Here is how it works in the current development build, tested on macOS.',
        },
        {
          type: 'image',
          src: '/images/guides/copilot-install.webp',
          alt: 'GitHub Copilot CLI installation dialog in CodeAgentSwarm',
          caption: 'Real capture from a CodeAgentSwarm development build. Pressing Install downloads the official release archive and checks its SHA-256 before extracting it.',
          size: 'full',
        },
        {
          type: 'list',
          items: [
            '<strong>Install</strong>: pick GitHub Copilot CLI in the agent picker or press Install in Settings > Providers. On Windows the app downloads the x64 or ARM64 zip, verifies it against <code>SHA256SUMS</code> and puts <code>copilot.exe</code> in <code>%LOCALAPPDATA%\\copilot-cli</code>. If you already installed it with WinGet or npm, the app detects that copy and updates it with the same tool.',
            '<strong>Sign in</strong>: press Sign in in Chat. It runs the device code flow, so you only open the GitHub page and enter the code.',
            '<strong>Chat or terminal</strong>: Chat shows the models your account offers, the Agent, Plan and Autopilot modes and permission requests. The terminal view runs the normal <code>copilot</code> interface, and a Chat session continues there with <code>--resume</code>.',
            '<strong>History and usage</strong>: Conversation History lists your Copilot sessions by project, and the Usage panel shows your monthly allowance and reset date next to your other agents.',
          ],
        },
        {
          type: 'image',
          src: '/images/guides/copilot-cli-resume.webp',
          alt: 'A Chat conversation resumed in the GitHub Copilot CLI terminal with the folder trust prompt',
          caption: 'Real capture from a CodeAgentSwarm development build: a session started in Chat continues in the terminal, and Copilot asks for folder trust the first time.',
          size: 'full',
        },
        {
          type: 'paragraph',
          text: `Each session can live in its own project or git worktree, next to Claude Code, Codex and the other agents. Read ${link('/en/guides/github-copilot-cli-agent-swarm', 'running a GitHub Copilot CLI agent swarm')} to set that up, ${link('/en/guides/github-copilot-cli-yolo-mode', 'GitHub Copilot CLI YOLO mode')} before you approve everything, and ${link('/en/guides/github-copilot-cli-on-linux', 'GitHub Copilot CLI on Linux')} if you also work in WSL or on a server.`,
        },
      ],
    },
  ],
  faq: [
    {
      question: 'Do I need WSL to run GitHub Copilot CLI on Windows?',
      answer: 'No. GitHub publishes native Windows builds for x64 and ARM64, plus a WinGet package and an MSI. Inside WSL you would be running the Linux build, which is a separate install.',
    },
    {
      question: 'Does GitHub Copilot CLI work on Windows on ARM?',
      answer: 'Yes. There is a native ARM64 zip and an ARM64 MSI. WinGet and the CodeAgentSwarm installer pick the right build for the machine.',
    },
    {
      question: 'Which shell does Copilot use for commands on Windows?',
      answer: 'PowerShell. It prefers PowerShell 7 or later (pwsh) and falls back to Windows PowerShell when pwsh is not installed. GitHub lists PowerShell 6 or later as a prerequisite, so install PowerShell 7 if you only have the built-in 5.1.',
    },
    {
      question: 'Why is copilot not recognized right after installing it?',
      answer: 'Usually the terminal was opened before the install and still has the old PATH. Open a new terminal. For npm installs, the folder that npm prefix -g prints must be in PATH; for the zip, you add the folder yourself.',
    },
    {
      question: 'Is gh copilot the same as GitHub Copilot CLI?',
      answer: 'No. gh copilot is an old GitHub CLI extension that suggested and explained shell commands. GitHub Copilot CLI is the copilot command, an agent that edits files and runs commands after you approve them.',
    },
  ],
}

export default guide
