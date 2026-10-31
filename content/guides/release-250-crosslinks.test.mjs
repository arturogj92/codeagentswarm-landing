import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

// Release 2.5.0 guides: established guides link in, and the new guides link to each other.
const pages = [
  ['en/codeagentswarm-notifications.ts', ['/en/guides/control-claude-code-from-phone']],
  ['es/notificaciones-codeagentswarm.ts', ['/es/guias/controlar-claude-code-desde-el-movil']],
  ['en/claude-code-gui.ts', ['/en/guides/claude-code-mobile-app']],
  ['es/interfaz-grafica-claude-code.ts', ['/es/guias/app-movil-claude-code']],
  ['en/codex-gui.ts', ['/en/guides/codex-mobile-app']],
  ['es/interfaz-grafica-codex.ts', ['/es/guias/app-movil-codex']],
  ['en/claude-code-agent-teams-vs-codeagentswarm.ts', ['/en/guides/claude-code-subagents']],
  ['es/agent-teams-de-claude-code-vs-codeagentswarm.ts', ['/es/guias/subagentes-claude-code']],
  ['en/claude-code-tips-and-tricks.ts', ['/en/guides/send-screenshot-to-claude-code']],
  ['es/trucos-y-consejos-claude-code.ts', ['/es/guias/enviar-captura-a-claude-code']],
  ['en/control-claude-code-from-phone.ts', ['/en/guides/claude-code-mobile-app', '/en/guides/codeagentswarm-notifications']],
  ['es/controlar-claude-code-desde-el-movil.ts', ['/es/guias/app-movil-claude-code', '/es/guias/notificaciones-codeagentswarm']],
  ['en/claude-code-mobile-app.ts', ['/en/guides/control-claude-code-from-phone', '/en/guides/codex-mobile-app']],
  ['es/app-movil-claude-code.ts', ['/es/guias/controlar-claude-code-desde-el-movil', '/es/guias/app-movil-codex']],
  ['en/codex-mobile-app.ts', ['/en/guides/codex-gui', '/en/guides/control-claude-code-from-phone']],
  ['es/app-movil-codex.ts', ['/es/guias/interfaz-grafica-codex', '/es/guias/controlar-claude-code-desde-el-movil']],
  ['en/send-screenshot-to-claude-code.ts', ['/en/guides/control-claude-code-from-phone']],
  ['es/enviar-captura-a-claude-code.ts', ['/es/guias/controlar-claude-code-desde-el-movil']],
  ['en/claude-code-subagents.ts', ['/en/guides/claude-code-agent-teams-vs-codeagentswarm', '/en/guides/ai-coding-agent-coordinator']],
  ['es/subagentes-claude-code.ts', ['/es/guias/agent-teams-de-claude-code-vs-codeagentswarm', '/es/guias/coordinador-agentes-ia']],
]

test('release 2.5.0 guides are linked both ways', async () => {
  for (const [file, links] of pages) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    for (const link of links) assert.ok(source.includes(`href="${link}"`), `${file} is missing ${link}`)
  }
})

test('the landing never mentions the notch bubble in release 2.5.0 guides', async () => {
  for (const [file] of pages.slice(10)) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.doesNotMatch(source, /notch/i, `${file} mentions the notch`)
  }
})
