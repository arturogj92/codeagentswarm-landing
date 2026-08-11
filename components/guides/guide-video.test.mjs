import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'

const source = await readFile(new URL('./guide-video.ts', import.meta.url), 'utf8')
const moduleUrl = `data:text/javascript,${encodeURIComponent(stripTypeScriptTypes(source, { mode: 'transform' }))}`
const { pickGuideVideo } = await import(moduleUrl)

test('uses the matching chat-opening video for single-agent guides', () => {
  assert.equal(pickGuideVideo('kimi-code-en-windows'), 'agent-chat-kimi.mp4')
  assert.equal(pickGuideVideo('run-multiple-claude-code-sessions'), 'agent-chat-claude.mp4')
  assert.equal(pickGuideVideo('codex-cli-on-windows'), 'agent-chat-codex.mp4')
  assert.equal(pickGuideVideo('how-to-use-antigravity-cli'), 'agent-chat-antigravity.mp4')
  assert.equal(pickGuideVideo('opencode-conversation-history'), 'agent-chat-opencode.mp4')
  assert.equal(pickGuideVideo('grok-build-plan-mode'), 'agent-chat-grok.mp4')
})

test('keeps the multi-model video for mixed and generic guides', () => {
  assert.equal(pickGuideVideo('kimi-code-vs-claude-code'), 'multi-model-v2.mp4')
  assert.equal(pickGuideVideo('ai-cli-agent-swarm'), 'multi-model-v2.mp4')
})
