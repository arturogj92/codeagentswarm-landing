import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'

const source = await readFile(new URL('./guide-video.ts', import.meta.url), 'utf8')
const moduleUrl = `data:text/javascript,${encodeURIComponent(stripTypeScriptTypes(source, { mode: 'transform' }))}`
const { pickGuideVideo } = await import(moduleUrl)

test('uses the product feature that matches the guide intent', () => {
  assert.equal(pickGuideVideo('opencode-conversation-history'), 'guide-conversation-history.mp4')
  assert.equal(pickGuideVideo('guia-completa-historial-claude-code'), 'guide-conversation-history.mp4')
  assert.equal(pickGuideVideo('run-multiple-claude-code-sessions'), 'guide-terminals.mp4')
  assert.equal(pickGuideVideo('ejecutar-multiples-sesiones-codex'), 'guide-terminals.mp4')
  assert.equal(pickGuideVideo('git-worktrees-for-ai-coding-agents'), 'guide-gitmanager.mp4')
  assert.equal(pickGuideVideo('claude-code-task-management'), 'guide-kanban.mp4')
  assert.equal(pickGuideVideo('codeagentswarm-notifications'), 'guide-terminal-notifications.mp4')
})

test('uses the matching real agent surface for agent-specific guides', () => {
  assert.equal(pickGuideVideo('codex-yolo-mode'), 'agent-codex.mp4')
  assert.equal(pickGuideVideo('modo-yolo-codex'), 'agent-codex.mp4')
  assert.equal(pickGuideVideo('kimi-code-en-windows'), 'agent-chat-kimi.mp4')
  assert.equal(pickGuideVideo('codex-cli-on-windows'), 'agent-chat-codex.mp4')
  assert.equal(pickGuideVideo('how-to-use-antigravity-cli'), 'agent-chat-antigravity.mp4')
  assert.equal(pickGuideVideo('grok-build-plan-mode'), 'agent-chat-grok.mp4')
})

test('keeps the multi-model video for mixed and generic guides', () => {
  assert.equal(pickGuideVideo('kimi-code-vs-claude-code'), 'multi-model-v2.mp4')
  assert.equal(pickGuideVideo('best-mcp-servers-claude-code'), 'agent-chat-claude.mp4')
})
