---
title: "A Practical Workflow for Running 2 to 4 AI Coding Agents at Once"
published: false
description: "A safe workflow for splitting coding work across several AI CLI agents without losing control of files, tests, or integration."
tags: ai, programming, productivity, git
---

<!--
HOLD 2026-08-31: Do not publish this on DEV Community. DEV's current policy
requires disclosure for AI-assisted writing and warns against AI-assisted
business promotion or backlink-led articles. Keep this as source material for
a future human-authored tutorial or another suitable channel.
-->

Running several coding agents at once is useful when the work has clear boundaries. Give four agents the same vague problem and you will probably get overlapping edits, repeated investigation, and a difficult review.

This article is a focused companion to my [longer guide to running an AI CLI agent swarm](https://www.codeagentswarm.com/en/guides/ai-cli-agent-swarm). Here I will stick to one practical setup for two to four agents working on the same repository.

Disclosure: I build CodeAgentSwarm, a desktop app for supervising coding CLIs. The workflow below also works with normal terminal tabs or tmux.

## Inspect the repository first

Before opening any coding CLI, inspect the current state of the project:

```bash
git status --short
git branch --show-current
git diff --stat
```

These commands only inspect the repository. They tell you whether somebody already has unfinished work, which branch you are using, and how large the current diff is.

Do not ask an agent to clean the repository for you. Commands such as `git reset`, `git clean`, or restoring files can destroy work that belongs to another person or session. If the tree already contains changes, record which files they touch and keep new agents away from them unless one agent is explicitly assigned to continue that work.

Next, define the expected behavior before dividing the implementation. Parallel work depends on a stable contract. If the API shape, component interface, or database model is still undecided, settle that first.

## Split work by file ownership

A useful four-agent arrangement looks like this:

| Agent | Responsibility | Files it may edit |
| --- | --- | --- |
| Agent 1 | Implement the main change | The relevant source module |
| Agent 2 | Add tests for the agreed behavior | Test files only |
| Agent 3 | Update documentation and examples | Documentation files only |
| Agent 4 | Review the plan and current diff | Read-only |

With two agents, use the first two roles. With three, add documentation. The fourth agent should usually review instead of becoming another writer. A read-only reviewer can spot a missing edge case without creating another merge problem.

File ownership matters more than which model gets each task.

## Give every agent a narrow contract

I use a prompt shaped like this:

```text
Goal:
Add validation for the account settings endpoint.

You may edit:
src/api/account-settings.ts
src/api/validation.ts

Do not edit:
Database migrations
UI files
Existing local changes outside the owned files

Before editing:
Read the route, its callers, and the relevant tests.

Stop and ask:
If the change requires another file or changes the API contract.

Safety:
Do not run git reset, git clean, or restore unrelated files.
Do not commit.

Finish with:
A summary of the behavior changed, paths edited, checks run,
and any remaining risks.
```

The important parts are the owned files, stop condition, and final report. “Fix account settings” leaves too many decisions open. A bounded task tells the agent where it can act and when it needs to return control to you.

In a shared checkout, I normally ask agents not to commit. This keeps the final history under one human owner and makes it easier to review the combined change before anything enters Git history.

## Start one CLI per terminal

Open one terminal for each writing agent and start them from the same project directory:

```bash
cd /absolute/path/to/my-project
claude
```

```bash
cd /absolute/path/to/my-project
codex
```

Use whichever CLIs you already trust. For example, Claude Code, Codex CLI, Antigravity, OpenCode, Cursor Agent, Kimi Code, and Grok Build can all take part because each runs as an independent process.

Leave their normal confirmation prompts enabled while you learn how they behave in your repository. Full auto-approval saves clicks, but it also lets several agents make mistakes at the same time.

Two terminals are usually enough for a first attempt. Four active writers create more coordination work than most changes can support.

## Share a checkout only when the boundaries are strict

Several agents can share one checkout when they own completely separate paths and none of them will commit, stash, run a repository-wide formatter, or use a generator that rewrites shared files. You can inspect their combined activity with:

```bash
git status --short
git diff --name-only
git diff --check
```

`git diff --check` catches whitespace errors and conflict markers. It does not prove that the implementation works, but it is a cheap check you can run often.

If those boundaries do not hold, use Git worktrees for isolation:

```bash
git worktree add ../my-project-api -b agent/api
git worktree add ../my-project-ui -b agent/ui
git worktree list
```

Run each agent inside its assigned worktree. Each directory has its own branch and working files while sharing the same repository data.

Worktrees add integration work, so I only use them when the expected overlap justifies it. Separate files in one checkout remain the simpler option.

## Watch for overlap while agents work

You do not need to interrupt every agent every minute. Check when an agent reports progress, requests permission, or changes a file outside its assignment.

If two agents start editing the same path, pause both. Choose one owner for that file and ask the other agent to provide findings without writing. Letting both continue usually turns a small coordination issue into a manual merge.

A useful progress report contains four facts:

1. What behavior is now implemented?
2. Which paths changed?
3. Which checks passed?
4. What remains uncertain?

Long transcripts are less useful than this short operational summary.

## Integrate only after writers stop

When the agents finish, pause all writers before reviewing the combined result. Start with:

```bash
git diff --stat
git diff --check
git status --short
```

Then inspect each changed file and run the repository's documented checks. For a typical JavaScript project, that may include:

```bash
npm test
npm run lint
```

Tests can confirm expected behavior while still missing a bad assumption, unsafe permission change, or unnecessary dependency. Read the diff before committing it.

Pay special attention to boundaries between assignments. The implementation and tests may each look correct while disagreeing about an error code or return shape.

## Know when parallel agents are a poor fit

I keep one writing agent in charge when:

1. The task is smaller than the coordination needed to describe it.
2. The root cause of a bug is still unknown.
3. Several changes depend on one central schema or migration.
4. Authentication, payments, permissions, or destructive operations are involved.
5. The interface between tasks is still changing.

A second agent can still help by investigating or reviewing without editing. Parallelism is useful when tasks are independent. A read-only agent often provides the safest extra capacity.

## Choosing the supervision layer

For two agents, ordinary terminal tabs are fine. tmux works well if you already know its keybindings and want persistent panes.

Once I began running three or four agents regularly, the hard part became remembering who owned each task, noticing when an agent needed input, and finding which terminal changed a file. I built [CodeAgentSwarm](https://www.codeagentswarm.com/) to provide visible task ownership, notifications, searchable history, and per-agent diffs around the existing CLIs.

The tool is optional. Clear scopes, exclusive file ownership, approval prompts, and one human integration pass are the parts that make the workflow reliable.

Start with two agents on one well-bounded change. Add another agent only when you can name an independent piece of work for it.
