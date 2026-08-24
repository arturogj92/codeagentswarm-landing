import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pages = [
  ['en/claude-code-history-complete-guide.ts', ['/en/guides/codex-cli-conversation-history', '/en/guides/opencode-conversation-history']],
  ['es/guia-completa-historial-claude-code.ts', ['/es/guias/historial-conversaciones-codex', '/es/guias/historial-conversaciones-opencode']],
  ['en/run-multiple-claude-chats.ts', ['/en/guides/run-multiple-codex-sessions', '/en/guides/run-multiple-opencode-sessions']],
  ['es/varios-chats-de-claude-a-la-vez.ts', ['/es/guias/ejecutar-multiples-sesiones-codex', '/es/guias/ejecutar-multiples-sesiones-opencode']],
]

test('the highest-visibility Claude guides link to the Codex and OpenCode clusters', async () => {
  for (const [file, links] of pages) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    for (const link of links) assert.ok(source.includes(`href="${link}"`), `${file} is missing ${link}`)
  }
})
