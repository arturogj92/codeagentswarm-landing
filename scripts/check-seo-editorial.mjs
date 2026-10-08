// Run after npm run build. Check the catalog and the actual rendered bilingual pages.
import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8')
const moduleUrl = source => 'data:text/javascript,' + encodeURIComponent(stripTypeScriptTypes(source))
const cdn = moduleUrl(await read('lib/cdn.ts'))
const { pickRelatedGuideMeta } = await import(moduleUrl(await read('content/guides/types.ts')))
const catalog = []
for (const locale of ['en', 'es']) {
  for (const file of await readdir(new URL(`../content/guides/${locale}/`, import.meta.url))) {
    if (!file.endsWith('.ts')) continue
    const source = (await read(`content/guides/${locale}/${file}`)).replace("'@/lib/cdn'", JSON.stringify(cdn))
    catalog.push((await import(moduleUrl(source))).default)
  }
}
const pathOf = meta => `/${meta.locale}/${meta.locale === 'es' ? 'guias' : 'guides'}/${meta.slug}`
const paths = new Map(catalog.map(g => [pathOf(g.meta), g]))
let editorialCount = 0
for (const guide of catalog) {
  const { meta } = guide
  const alternate = catalog.find(g => g.meta.locale !== meta.locale && g.meta.slug === meta.alternateSlug)
  assert.equal(alternate?.meta.alternateSlug, meta.slug)
  if (meta.relatedSlug) {
    const related = catalog.find(g => g.meta.locale === meta.locale && g.meta.slug === meta.relatedSlug)
    assert.ok(related, `${meta.slug}: editorial destination exists`)
    assert.notEqual(related.meta.slug, meta.slug)
    assert.equal(pickRelatedGuideMeta(catalog, guide)?.slug, related.meta.slug)
    assert.equal(alternate.meta.relatedSlug, related.meta.alternateSlug, 'bilingual editorial intent')
    const html = await read(`.next/server/app${pathOf(meta)}.html`)
    assert.ok(html.includes(`href="${pathOf(related.meta)}"`), `${meta.slug}: rendered next step`)
    editorialCount++
  }
  for (const [, href] of JSON.stringify(guide).matchAll(/href=\\?"([^"\\]+)\\?"/g)) {
    if (!/^\/(en\/guides|es\/guias)\//.test(href)) continue
    const [path, hash] = href.split('#')
    const target = paths.get(path)
    assert.ok(target, `${meta.slug}: broken link ${href}`)
    if (hash) {
      const ids = target.sections.flatMap(s => [s.id, ...s.content.filter(b => b.type === 'heading').map(b => b.id)])
      assert.ok(ids.includes(decodeURIComponent(hash)), `${meta.slug}: missing fragment ${href}`)
    }
  }
}
assert.equal(editorialCount, 30)
const corrected = [
  'claude-code-agent-teams-vs-codeagentswarm', 'agent-teams-de-claude-code-vs-codeagentswarm',
  'claude-code-agent-swarm', 'enjambre-de-agentes-claude-code',
  'ai-cli-agent-swarm', 'enjambre-de-agentes-cli-ia',
]
for (const guide of catalog.filter(g => corrected.includes(g.meta.slug))) {
  const path = pathOf(guide.meta)
  const html = await read(`.next/server/app${path}.html`)
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
  assert.deepEqual(schemas.find(s => s['@type'] === 'FAQPage').mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })), guide.faq)
  assert.ok(html.includes(`rel="canonical" href="https://www.codeagentswarm.com${path}"`))
  assert.doesNotMatch(JSON.stringify(guide), /agent teams are sub-?agents|agent teams.*sharing that session|Los agent teams.*son subagentes/i)
  assert.ok(html.includes('<details'), 'FAQs usable before hydration')
  assert.ok(html.includes(`href="#${guide.sections[0].id}"`), 'native contents navigation')
  if (guide.meta.slug.includes('vs-codeagentswarm')) {
    assert.ok(html.includes('CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS'))
  }
}
console.log(`${catalog.length} guides: reciprocal alternates, internal links/fragments, ${editorialCount} editorial next steps; six corrected pages with FAQ/schema parity and canonical URLs passed.`)
