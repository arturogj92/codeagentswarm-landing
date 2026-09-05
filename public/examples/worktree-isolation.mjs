// Run with Node.js and Git installed: node worktree-isolation.mjs
// Creates and removes only its own temporary repository. No model/API calls.
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = mkdtempSync(join(tmpdir(), 'cas-isolation-'))
const git = (cwd, ...args) => execFileSync('git', [
  '-c', 'user.name=Worktree demo', '-c', 'user.email=demo@example.invalid',
  '-c', 'commit.gpgsign=false', '-c', 'core.hooksPath=', ...args,
], { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim()
try {
  git(root, 'init', '-b', 'main')
  writeFileSync(join(root, 'example.txt'), 'baseline\n')
  git(root, 'add', 'example.txt')
  git(root, 'commit', '-m', 'Baseline')
  const a = join(root, 'checkout-a')
  const b = join(root, 'checkout-b')
  git(root, 'worktree', 'add', '-b', 'agent-a', a)
  git(root, 'worktree', 'add', '-b', 'agent-b', b)
  writeFileSync(join(a, 'example.txt'), 'change A\n')
  writeFileSync(join(b, 'example.txt'), 'change B\n')
  assert.equal(readFileSync(join(root, 'example.txt'), 'utf8'), 'baseline\n')
  assert.equal(readFileSync(join(a, 'example.txt'), 'utf8'), 'change A\n')
  assert.equal(readFileSync(join(b, 'example.txt'), 'utf8'), 'change B\n')
  assert.equal(git(a, 'branch', '--show-current'), 'agent-a')
  assert.equal(git(b, 'branch', '--show-current'), 'agent-b')
  console.log('PASS: main=baseline; agent-a=change A; agent-b=change B')
  console.log('File isolation verified. Merge conflicts and shared services are not tested.')
} finally {
  rmSync(root, { recursive: true, force: true })
}
