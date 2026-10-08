// Content regression check: run with node scripts/check-guide-workspaces.mjs.
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import ts from 'typescript'

const names = ['Claude Code', 'Codex CLI', 'Antigravity CLI', 'OpenCode', 'Kimi Code', 'Grok Build', 'Cursor Agent', 'Muse Code', 'Pi', 'Devin CLI', 'GitHub Copilot CLI']
const legacy = /\/images\/guides\/(?:multi-terminal|multi-cli-agent-selector|multi-cli-three-agents|codex-agent-swarm|opencode-agent-swarm|antigravity-agent-swarm|terminal-status-indicators|terminal-title-and-changes)\.png|\/images\/guides\/parallel-workspace-codex\.webp/
const image = '/images/guides/workspace-list.webp'
const obsoleteFeatures = /\/images\/guides\/(?:task-board-kanban|skills-marketplace|skills-install-multi-cli|conversation-history|conversation_history|conversation-history-button|mcp-marketplace-search|resume-selected-conversation|resume-conversation)\.png/
let guides = 0, comparisons = 0, screenshots = 0
for (const locale of ['en', 'es']) {
  for (const file of readdirSync(`content/guides/${locale}`).filter(file => file.endsWith('.ts'))) {
    const path = `content/guides/${locale}/${file}`
    const source = readFileSync(path, 'utf8')
    guides++
    assert.doesNotMatch(source, legacy, `${path}: obsolete workspace screenshot`)
    assert.doesNotMatch(source, obsoleteFeatures, `${path}: obsolete feature screenshot`)
    const placements = source.split(image).length - 1
    assert.ok(placements <= 1, `${path}: duplicate workspace screenshot`)
    screenshots += placements
    const ast = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true)
    assert.equal(ast.parseDiagnostics.length, 0, `${path}: invalid TypeScript`)
    const visit = node => {
      if (ts.isArrayLiteralExpression(node) && node.elements.length === 3
        && ts.isStringLiteral(node.elements[0])
        && ['Supported agents', 'Agentes soportados', 'Agentes compatibles', 'Agents supported'].includes(node.elements[0].text.replace(/<[^>]+>/g, ''))) {
        const cell = node.elements[2]
        assert.ok(ts.isStringLiteral(cell), `${path}: expected supported-agent text`)
        for (const name of names) assert.ok(cell.text.includes(name), `${path}: missing ${name}`)
        comparisons++
      }
      if (ts.isPropertyAssignment(node) && node.name.getText(ast) === 'src'
        && ts.isStringLiteral(node.initializer) && node.initializer.text.startsWith('/images/')) {
        assert.ok(existsSync(`public${node.initializer.text}`), `${path}: missing ${node.initializer.text}`)
      }
      if (ts.isArrayLiteralExpression(node) && node.elements.length === 6
        && ts.isStringLiteral(node.elements[0]) && node.elements[0].text === 'CodeAgentSwarm') {
        const cell = node.elements[4]
        assert.ok(ts.isStringLiteral(cell), `${path}: expected roundup agent text`)
        for (const name of names) assert.ok(cell.text.includes(name), `${path}: roundup missing ${name}`)
        comparisons++
      }
      ts.forEachChild(node, visit)
    }
    visit(ast)
  }
}
assert.ok(comparisons === 16, `Expected EN/ES comparison tables, found ${comparisons}`)
assert.ok(screenshots >= 80, 'Expected general workspace images across guides')
assert.ok(existsSync(`public${image}`), 'Missing List screenshot')
assert.ok(readFileSync('components/guides/GuideProductBlock.tsx', 'utf8').includes(image), 'CTA must use the same screenshot')
assert.ok(readFileSync('components/BetaHeroSection.tsx', 'utf8').includes(image), 'Beta must use the current workspace')
const homeDemo = readFileSync('components/ProblemSection.tsx', 'utf8')
for (const asset of ['/videos/workspace-list-current.mp4', '/images/guides/workspace-list-poster.webp']) {
  assert.ok(homeDemo.includes(asset) && existsSync(`public${asset}`), `Missing current home demo asset: ${asset}`)
}
for (const locale of ['en', 'es']) {
  const messages = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8'))
  assert.doesNotMatch(JSON.stringify(messages.guides), /eight agent sessions|[Oo]cho sesiones/, `${locale}: stale screenshot caption`)
}
console.log(`${guides} guides checked; ${comparisons} comparison tables list all eleven agents; ${screenshots} List screenshots, with no obsolete or duplicate workspace images.`)
