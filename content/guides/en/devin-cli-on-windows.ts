import type { Guide } from '../types'

const guide: Guide = {
  "meta": {
    "slug": "devin-cli-on-windows",
    "locale": "en",
    "title": "Devin CLI on Windows: native install and troubleshooting",
    "metaTitle": "Devin CLI on Windows: Install, Login and Fix PATH",
    "metaDescription": "Set up Devin CLI natively on Windows with PowerShell. Check PATH, sign in and locate its files, with real Windows CodeAgentSwarm beta evidence.",
    "intro": "A native Windows installation lets Devin use your Windows project paths and account. Start in PowerShell, verify the executable, then sign in. WSL is a separate environment and should be treated as a separate installation.",
    "ctaText": "Native Windows support for Devin is available in CodeAgentSwarm 2.4.0. Download the app and sign in with your Devin account.",
    "ctaAgent": "devin",
    "highlightedWords": [
      "Devin"
    ],
    "publishedAt": "2026-09-11",
    "updatedAt": "2026-09-24",
    "alternateSlug": "devin-cli-en-windows",
    "socialImage": "/images/guides/devin-cli-og-en.png"
  },
  "sections": [
    {
      "id": "quick-answer",
      "title": "Install from PowerShell",
      "content": [
        {
          "type": "image",
          "src": "/icons/apps/devin-icon.svg",
          "alt": "Devin CLI",
          "size": "inline"
        },
        {
          "type": "paragraph",
          "text": "Open PowerShell and run the official installer. Reopen your terminal afterwards. <a href=\"https://docs.devin.ai/cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">Cognition installation instructions</a>."
        },
        {
          "type": "code",
          "language": "powershell",
          "code": "irm https://static.devin.ai/cli/setup.ps1 | iex\ndevin --version"
        }
      ]
    },
    {
      "id": "native-preview",
      "title": "Devin running in the Windows beta",
      "content": [
        {
          "type": "image",
          "src": "/images/guides/devin-windows-beta.webp",
          "alt": "Devin CLI installation dialog in CodeAgentSwarm on Windows",
          "caption": "Real Windows beta capture of the installation dialog. Devin is available from CodeAgentSwarm 2.4.0.",
          "size": "full"
        }
      ]
    },
    {
      "id": "check-path",
      "title": "If Windows cannot find devin",
      "content": [
        {
          "type": "code",
          "language": "powershell",
          "code": "Get-Command devin -All\nwhere.exe devin"
        },
        {
          "type": "paragraph",
          "text": "If these return no result, close and reopen the terminal after installation. If the terminal finds Devin but CodeAgentSwarm does not, reopen CodeAgentSwarm too. A process opened before the installer can keep its earlier PATH."
        },
        {
          "type": "paragraph",
          "text": "If multiple executables appear, compare their paths and versions. In our native Windows verification, installer discovery and process execution were checked separately: detecting a file is only useful if that executable can actually start."
        }
      ]
    },
    {
      "id": "login-project",
      "title": "Connect the account and open a Windows project",
      "content": [
        {
          "type": "code",
          "language": "powershell",
          "code": "devin auth login\ndevin auth status\nSet-Location C:\\Projects\\sample-app\ndevin"
        },
        {
          "type": "paragraph",
          "text": "Use your actual project path. In CodeAgentSwarm, select that same project when creating a Devin session. If you authenticated inside WSL, repeat the login in the native Windows CLI before expecting the native app to use it."
        }
      ]
    },
    {
      "id": "windows-files",
      "title": "Find the actual configuration and history files",
      "content": [
        {
          "type": "table",
          "headers": [
            "Data",
            "Native Windows location"
          ],
          "rows": [
            [
              "Configuration",
              "<code>%APPDATA%\\devin</code>"
            ],
            [
              "History",
              "<code>%APPDATA%\\devin\\cli\\sessions.db</code>"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "These are the locations verified with our native Windows installation. The executable can be installed under Local while Devin keeps its account and session data under Roaming. CodeAgentSwarm resolves these locations separately."
        },
        {
          "type": "paragraph",
          "text": "Do not move account files between those folders to fix discovery. Verify the CLI version and the actual environment first. For additional MCP files and scopes, see <a href=\"/en/guides/devin-cli-mcp-history\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">MCP and history</a>."
        }
      ]
    },
    {
      "id": "verify",
      "title": "Check the complete workflow",
      "content": [
        {
          "type": "list",
          "items": [
            "Ask Devin to read a known file and verify the answer.",
            "Close the conversation and find it in history.",
            "Resume it and ask a question about the previous turn.",
            "Check the selected model and account quota before a longer task."
          ]
        },
        {
          "type": "paragraph",
          "text": "The <a href=\"/en/guides/how-to-use-devin-cli\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">getting started guide</a> includes a small first prompt. The <a href=\"/en/guides/devin-cli-models-usage-limits\" class=\"text-neon-cyan hover:text-neon-purple transition-colors\">quota guide</a> explains why a valid installation can still encounter an account limit."
        }
      ]
    },
    {
      "id": "codeagentswarm-beta",
      "title": "Devin in CodeAgentSwarm: available in 2.4.0",
      "content": [
        {
          "type": "paragraph",
          "text": "Devin is available in CodeAgentSwarm 2.4.0 for macOS and Windows. The screenshots were captured during beta testing. Sign in with the official Devin CLI on the computer that runs the agent."
        }
      ]
    }
  ],
  "faq": [
    {
      "question": "Does Devin CLI require WSL?",
      "answer": "The official CLI provides a native Windows installer. WSL is an alternative environment, not a requirement for the native installation."
    },
    {
      "question": "Why is Devin installed but not detected?",
      "answer": "Check Get-Command devin -All and reopen the terminal and app after installation. They may still have the PATH from before the install."
    },
    {
      "question": "Where did the Windows history go?",
      "answer": "Our native installation stored sessions under %APPDATA%\\devin\\cli\\sessions.db, separately from configuration in %APPDATA%\\devin."
    }
  ]
}

export default guide
