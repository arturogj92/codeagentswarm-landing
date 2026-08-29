# CodeAgentSwarm

[CodeAgentSwarm](https://www.codeagentswarm.com/en) is a third-party desktop Agentic Development Environment (ADE) for running and supervising multiple AI coding agents in parallel.

It works on top of the official agent CLIs and your existing provider subscriptions. CodeAgentSwarm is the orchestration workspace, not a model provider. It supports Claude Code, OpenAI Codex CLI, Google Antigravity CLI, OpenCode, Kimi Code, Grok Build and Cursor Agent on macOS and Windows.

## What it does

- Runs independent AI coding sessions side by side.
- Shows live terminal output and file diffs for each agent.
- Sends desktop notifications when an agent finishes or needs input.
- Keeps searchable conversation history across agents and projects.
- Can isolate parallel sessions with optional Git worktrees.
- Provides permission controls, a Kanban board agents can update through MCP, and skills and MCP server marketplaces.

## Product links

- [Website](https://www.codeagentswarm.com/en)
- [Download / open beta](https://www.codeagentswarm.com/en/beta)
- [Guides](https://www.codeagentswarm.com/en/guides)
- [About CodeAgentSwarm](https://www.codeagentswarm.com/en/about)

## About this repository

This repository contains the public CodeAgentSwarm website. It is a Next.js application with English and Spanish product pages and technical guides.

```bash
npm ci --legacy-peer-deps
npm run dev
```

Run `npm run build` to verify a production build.
