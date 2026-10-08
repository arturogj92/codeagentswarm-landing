import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

// GitHub Copilot CLI guide pairs: run after `npm run build`.
const pairs = [
  ['how-to-use-github-copilot-cli', 'como-usar-github-copilot-cli'],
  ['github-copilot-cli-models-ai-credits', 'github-copilot-cli-modelos-creditos-ia'],
  ['github-copilot-cli-on-windows', 'github-copilot-cli-en-windows'],
  ['github-copilot-cli-on-linux', 'github-copilot-cli-en-linux'],
  ['github-copilot-cli-mcp-history', 'github-copilot-cli-mcp-historial'],
  ['github-copilot-cli-agent-swarm', 'enjambre-de-agentes-github-copilot-cli'],
  ['github-copilot-cli-yolo-mode', 'modo-yolo-github-copilot-cli'],
  ['github-copilot-cli-vs-claude-code', 'github-copilot-cli-vs-claude-code'],
]
const base = 'https://www.codeagentswarm.com'
const read = (path) => readFile(new URL('../' + path, import.meta.url), 'utf8')
const sitemap = await read('.next/server/app/sitemap.xml.body')
const llms = await read('public/llms.txt')
const load = async (locale, slug) => {
  const js = stripTypeScriptTypes(await read(`content/guides/${locale}/${slug}.ts`), { mode: 'strip' })
  return (await import('data:text/javascript,' + encodeURIComponent(js))).default
}
const visible = (html) => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
const titles = new Set()
for (const pair of pairs) {
  const guides = await Promise.all([load('en', pair[0]), load('es', pair[1])])
  assert.deepEqual(guides[0].sections.map(s => s.content.map(b => b.type)), guides[1].sections.map(s => s.content.map(b => b.type)), 'EN/ES block structure differs')
  assert.equal(guides[0].faq.length, guides[1].faq.length)
  for (const [i, guide] of guides.entries()) {
    const { meta } = guide
    const route = i ? 'es/guias' : 'en/guides'
    const url = `${base}/${route}/${meta.slug}`
    assert.equal(meta.alternateSlug, pair[1 - i])
    assert.equal(meta.ctaAgent, 'copilot')
    assert.ok(!titles.has(meta.metaTitle), 'duplicate title')
    titles.add(meta.metaTitle)
    assert.ok(meta.metaTitle.length <= 65, meta.slug + ' title too long: ' + meta.metaTitle.length)
    assert.ok(meta.metaDescription.length >= 120 && meta.metaDescription.length <= 165, meta.slug + ' description length ' + meta.metaDescription.length)
    const images = guide.sections.flatMap(s => s.content).filter(b => b.type === 'image')
    assert.ok(images.some(b => b.src === '/icons/apps/copilot-icon.svg'), 'Copilot icon missing')
    assert.ok(images.every(b => b.src.endsWith('.svg') || (b.caption && b.alt)), 'every capture needs alt and caption')
    for (const block of images) await access(new URL('../public' + block.src, import.meta.url))
    const html = await read(`.next/server/app/${route}/${meta.slug}.html`)
    for (const block of images) assert.ok(html.includes(block.alt), 'image alt missing from HTML')
    assert.ok(html.includes(`rel="canonical" href="${url}"`), 'canonical ' + url)
    assert.ok(html.includes(`href="${base}/${i ? 'en/guides' : 'es/guias'}/${meta.alternateSlug}"`), 'alternate ' + url)
    assert.match(html, /name="robots" content="index, follow"/)
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), 'sitemap ' + url)
    assert.ok(llms.includes(url), 'llms ' + url)
    assert.ok(html.includes(meta.socialImage), 'social image missing')
    await access(new URL('../public' + meta.socialImage, import.meta.url))
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1)
    assert.doesNotMatch(visible(html), /[—–]|&mdash;|&ndash;/, 'long dash in visible copy')
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
    assert.ok(schemas.some(s => s['@type'] === 'Article' && s.dateModified === meta.updatedAt), 'Article schema')
    const faq = schemas.find(s => s['@type'] === 'FAQPage')
    assert.deepEqual(faq.mainEntity.map(q => q.name), guide.faq.map(q => q.question))
    assert.deepEqual(faq.mainEntity.map(q => q.acceptedAnswer.text), guide.faq.map(q => q.answer))
    for (const match of JSON.stringify(guide).matchAll(/href=\\"(\/[^"\\#]+)(?:#[^"\\]*)?\\"/g)) {
      await access(new URL('../.next/server/app' + match[1] + '.html', import.meta.url))
    }
  }
}
console.log(`Copilot SEO: ${pairs.length * 2} bilingual pages, matching FAQs, canonical/hreflang, indexability, sitemap, llms and internal links passed.`)
