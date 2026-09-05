import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

const pairs = [
  ['how-to-use-pi-coding-agent', 'como-usar-pi-coding-agent'],
  ['pi-coding-agent-models-subscriptions', 'pi-coding-agent-modelos-suscripciones'],
  ['pi-vs-opencode', 'pi-vs-opencode'],
  ['pi-coding-agent-on-windows', 'pi-coding-agent-en-windows'],
]
const base = 'https://www.codeagentswarm.com'
const read = (path) => readFile(new URL('../' + path, import.meta.url), 'utf8')
const sitemap = await read('.next/server/app/sitemap.xml.body')
const llms = await read('public/llms.txt')
const prerender = JSON.parse(await read('.next/prerender-manifest.json'))
for (const [, url] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(url).pathname
  if (/^\/(en\/guides|es\/guias)\//.test(path)) {
    assert.ok(prerender.routes[path], 'guide missing from prerendered build: ' + path)
  }
}
assert.ok(!Object.keys(prerender.routes).some(path => /^\/(es\/guides|en\/guias)\//.test(path)), 'wrong-language guide prerender')
const load = async (locale, slug) => {
  const source = await read(`content/guides/${locale}/${slug}.ts`)
  const js = stripTypeScriptTypes(source, { mode: 'strip' })
  return (await import('data:text/javascript,' + encodeURIComponent(js))).default
}
const titles = new Set()
for (const pair of pairs) {
  const guides = await Promise.all([load('en', pair[0]), load('es', pair[1])])
  assert.deepEqual(guides[0].sections.map(s => s.content.map(b => b.type)), guides[1].sections.map(s => s.content.map(b => b.type)))
  for (const [i, guide] of guides.entries()) {
    const { meta } = guide
    const route = i ? 'es/guias' : 'en/guides'
    const alternateRoute = i ? 'en/guides' : 'es/guias'
    const url = `${base}/${route}/${meta.slug}`
    assert.equal(meta.alternateSlug, pair[1 - i])
    assert.equal(meta.ctaAgent, 'pi')
    assert.match(meta.ctaText, /beta/)
    assert.ok(!titles.has(meta.metaTitle), 'duplicate title')
    titles.add(meta.metaTitle)
    assert.ok(meta.metaTitle.length <= 65, meta.slug + ' title too long')
    assert.ok(meta.metaDescription.length >= 120 && meta.metaDescription.length <= 165, meta.slug + ' description length')
    const html = await read(`.next/server/app/${route}/${meta.slug}.html`)
    assert.ok(html.includes(`rel="canonical" href="${url}"`), 'canonical ' + url)
    assert.ok(html.includes(`href="${base}/${alternateRoute}/${meta.alternateSlug}"`), 'alternate ' + url)
    assert.match(html, /name="robots" content="index, follow"/)
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), 'sitemap ' + url)
    assert.ok(llms.includes(url), 'llms ' + url)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1)
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
    assert.ok(schemas.some(s => s['@type'] === 'Article' && s.dateModified === meta.updatedAt))
    const faq = schemas.find(s => s['@type'] === 'FAQPage')
    assert.deepEqual(faq.mainEntity.map(q => q.name), guide.faq.map(q => q.question))
    assert.deepEqual(faq.mainEntity.map(q => q.acceptedAnswer.text), guide.faq.map(q => q.answer))
    assert.doesNotMatch(html, /<video[ >]/, 'unrelated product footage')
    for (const match of JSON.stringify(guide).matchAll(/href=\\"(\/[^"\\#]+)(?:#[^"\\]*)?\\"/g)) {
      await access(new URL('../.next/server/app' + match[1] + '.html', import.meta.url))
    }
  }
}
console.log('Pi SEO: 8 bilingual pages, matching FAQs, canonical/hreflang, indexability, sitemap, llms and internal links passed.')
