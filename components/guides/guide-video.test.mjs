import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'

const source = await readFile(new URL('./guide-video.ts', import.meta.url), 'utf8')
const moduleUrl = `data:text/javascript,${encodeURIComponent(stripTypeScriptTypes(source, { mode: 'transform' }))}`
const { pickGuideVideo } = await import(moduleUrl)

test('picks agent-specific videos without overriding topic demos', () => {
  const expected = {
    'how-to-use-grok-build': 'agent-grok.mp4',
    'como-usar-kimi-code': 'agent-kimi.mp4',
    'opencode-yolo-mode': 'agent-opencode.mp4',
    'how-to-use-antigravity-cli': 'agent-antigravity.mp4',
    'codex-cli-plans': 'agent-codex.mp4',
    'claude-code-yolo-mode': 'agent-claude.mp4',
    'grok-vs-claude-code': 'multi-model-v2.mp4',
    'gemini-cli-yolo-mode': 'multi-model-v2.mp4',
    'grok-conversation-history': 'conversation_history.mp4',
    'claude-code-git-changes': 'gitmanager.mp4',
    'run-parallel-ai-agents': 'terminals.mp4',
  }

  for (const [slug, video] of Object.entries(expected)) {
    assert.equal(pickGuideVideo(slug), video, slug)
  }
})
