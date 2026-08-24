import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pages = [
  ['en/claude-code-vs-cursor-vs-codex.ts', ['/en/guides/cursor-agent-cli-acp-codeagentswarm', '/en/guides/cursor-cli-vs-claude-code']],
  ['es/claude-code-vs-cursor-vs-codex.ts', ['/es/guias/cursor-agent-cli-acp-codeagentswarm', '/es/guias/cursor-cli-vs-claude-code']],
]

test('the established Cursor comparison links to the Cursor CLI cluster', async () => {
  for (const [file, links] of pages) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    for (const link of links) assert.ok(source.includes(link), `${file} is missing ${link}`)
  }
})
