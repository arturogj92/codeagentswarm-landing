import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "muse-code-on-windows",
    "locale": "en",
    "title": "Muse Code on Windows: PowerShell Setup and Troubleshooting",
    "metaTitle": "Muse Code on Windows: PowerShell Setup and Troubleshooting",
    "metaDescription": "Install Muse Code on Windows with PowerShell, check PATH and sign in. Diagnose shell, sandbox and account issues, and understand current platform limits.",
    "intro": "Muse Code has a native Windows installer. The first useful check is whether PowerShell can launch the installed command from the project you intend to edit. Work through installation, authentication and a small task separately so each failure has a clear cause.",
    "socialImage": "/images/guides/muse-code-og-en.png",
    "ctaText": "Use Muse Code in CodeAgentSwarm 2.4.0 for macOS and Windows. Meta account access and billing are separate.",
    "ctaAgent": "muse",
    "highlightedWords": [
      "Muse"
    ],
    "publishedAt": "2026-09-22",
    "updatedAt": "2026-09-24",
    "alternateSlug": "muse-code-en-windows"
  },
  "sections": [
    {
      "id": "install",
      "title": "Install from PowerShell",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/muse-icon.svg",
          "alt": "Muse Code",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Open PowerShell in your normal Windows account and use Meta’s <a href=\"https://dev.meta.ai/docs/muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">official Windows installer</a>. These commands belong in PowerShell, not Command Prompt or a Bash window. Start with the official installer before adding custom wrappers or copying a binary from another machine."
        },
        {
          "type": "code",
          "language": "powershell",
          "code": "irm https://dev.meta.ai/install.ps1 | iex\nmuse --version\nGet-Command muse -All"
        },
        {
          "type": "paragraph",
          "text": "The version confirms that Muse starts. <code>Get-Command</code> shows how the shell resolves its name. If installation succeeds but resolution fails, open a new PowerShell window and repeat those two checks. A terminal opened before installation can retain an older PATH. Do not reinstall repeatedly without first checking which command the shell sees."
        }
      ]
    },
    {
      "id": "path",
      "title": "Check the executable and the working directory",
      "content": [
        {
          "type": "code",
          "language": "powershell",
          "code": "Get-Command muse -All | Select-Object CommandType, Source\nGet-Location\nSet-Location \"C:\\src\\sample-project\"\nmuse --model muse-spark-1.3 --reasoning-effort medium"
        },
        {
          "type": "paragraph",
          "text": "Replace the sample path with an existing repository. Quoting it also handles spaces. If more than one Muse command appears, compare their locations and versions before removing anything. A stale wrapper can make two terminals seem to run different releases. The command output is better evidence than the installer’s completion message."
        },
        {
          "type": "paragraph",
          "text": "Start the session from the package you actually want to inspect. For a repository containing several applications, name the relevant subdirectory in your request. When Muse cites files, confirm that they come from that checkout rather than a similarly named project elsewhere."
        }
      ]
    },
    {
      "id": "account",
      "title": "Confirm the intended account without printing secrets",
      "content": [
        {
          "type": "paragraph",
          "text": "Complete Muse’s browser sign-in flow on Windows. Use <code>/login</code> inside the interactive session if you need to reopen it. Authentication on a Mac does not prove that the Windows host is signed in. Follow the <a href=\"https://dev.meta.ai/docs/muse-code/auth\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">official authentication flow</a> on each machine."
        },
        {
          "type": "code",
          "language": "powershell",
          "code": "if (Test-Path Env:META_API_KEY) {\n  \"META_API_KEY is set in this PowerShell process\"\n} else {\n  \"META_API_KEY is not set in this PowerShell process\"\n}"
        },
        {
          "type": "paragraph",
          "text": "This check reports presence without displaying the key. Use it if a successful browser login still seems to use a different billing route. Inspect where your own shell configuration sets that variable before changing it. Keep credentials out of screenshots, support messages and repository files. See <a href=\"/en/guides/muse-code-models-pricing-privacy\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Muse billing and privacy</a> for the distinction between API usage and subscription access."
        }
      ]
    },
    {
      "id": "task",
      "title": "Ask for commands that work on Windows",
      "content": [
        {
          "type": "code",
          "language": "text",
          "code": "Read this project’s README and build configuration.\nIdentify the test command for Windows PowerShell.\nExplain any Bash-only setup steps. Do not modify files."
        },
        {
          "type": "paragraph",
          "text": "If the response suggests <code>export</code> or a Unix-only helper, ask for a PowerShell equivalent and compare it with the project’s documented Windows setup. A cross-platform language does not guarantee cross-platform scripts. Build tooling may still depend on Unix paths, shell quoting or an executable that is absent from this host."
        },
        {
          "type": "paragraph",
          "text": "For the next task, choose one test that already runs on Windows. Preserve its output before changing code. When a later failure appears, you can distinguish a regression from a pre-existing environment problem. For the full first-session sequence, use <a href=\"/en/guides/how-to-use-muse-code\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">the Muse Code getting-started guide</a>."
        }
      ]
    },
    {
      "id": "limits",
      "title": "Know which Windows differences matter",
      "content": [
        {
          "type": "table",
          "headers": [
            "Situation",
            "What to check"
          ],
          "rows": [
            [
              "Shell syntax errors",
              "Use PowerShell commands and quote Windows paths."
            ],
            [
              "Sandbox initialization prompt",
              "Confirm that the UAC prompt belongs to the intended Muse setup."
            ],
            [
              "Voice input unavailable",
              "Use typed prompts on Windows."
            ],
            [
              "No peer session messaging",
              "This Muse feature is currently limited to macOS and Linux."
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Meta documents a possible UAC prompt when the Windows sandbox first initializes; normal use does not require an administrator terminal. A sandbox error should be investigated as an environment problem before changing permissions. The <a href=\"https://dev.meta.ai/docs/muse-code/permissions\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">permissions reference</a> describes the boundary and startup behavior."
        },
        {
          "type": "paragraph",
          "text": "Workflow availability also depends on the installed build and rollout. Check the commands exposed by <code>muse --help</code> before following a workflow example. The <a href=\"/en/guides/muse-code-mcp-skills-workflows\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP, skills and workflows guide</a> explains how to separate unavailable features from misconfigured ones."
        }
      ]
    },
    {
      "id": "beta",
      "title": "Windows status in CodeAgentSwarm",
      "content": [
        {
          "type": "callout",
          "variant": "info",
          "content": "Muse is available in CodeAgentSwarm 2.4.0 for Windows. These steps cover the official native CLI. Upstream Muse features still depend on the installed build and platform."
        },
        {
          "type": "paragraph",
          "text": "When reporting a Windows issue, include the Muse version, Windows architecture, resolved command path and exact error. Describe whether it happened before login, during sandbox setup or after a prompt. That short report helps reproduce the failure without exposing your account or project contents."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Do I need WSL to install Muse Code?",
      "answer": "The official installer supports native Windows through PowerShell. These instructions use that path; a WSL installation is a separate Linux environment and should be diagnosed separately."
    },
    {
      "question": "Why does Muse work in one terminal but not another?",
      "answer": "Compare Get-Command output and reopen the older terminal. Different PATH values, profiles or installed wrappers can change which executable launches."
    },
    {
      "question": "Does native Windows support include voice and session messaging?",
      "answer": "No. Meta currently documents both features as unavailable on Windows. Use typed prompts and check platform support before designing a workflow around peer messages."
    }
  ]
}

export default guide
