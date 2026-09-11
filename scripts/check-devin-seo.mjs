import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

const pairs = [
  ["swe-2-benchmarks", "swe-2-benchmarks-comparativa"],
  [
    "how-to-use-devin-cli",
    "como-usar-devin-cli"
  ],
  [
    "devin-cli-on-windows",
    "devin-cli-en-windows"
  ],
  [
    "devin-cli-models-usage-limits",
    "devin-cli-modelos-cuotas"
  ],
  [
    "devin-cli-mcp-history",
    "devin-cli-mcp-historial"
  ]
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
    assert.equal(meta.ctaAgent, 'devin')
    assert.match(meta.ctaText, /beta/)
    assert.ok(!titles.has(meta.metaTitle), 'duplicate title')
    titles.add(meta.metaTitle)
    assert.ok(meta.metaTitle.length <= 65, meta.slug + ' title too long')
    assert.ok(meta.metaDescription.length >= 120 && meta.metaDescription.length <= 165, meta.slug + ' description length')
    const images = guide.sections.flatMap(s => s.content).filter(b => b.type === 'image')
    assert.ok(images.some(b => b.src === '/icons/apps/devin-icon.svg'), 'Devin icon missing')
    assert.ok(images.some(b => b.src.startsWith('/images/guides/devin-') && b.caption && b.alt), 'captioned Devin capture missing')
    for (const block of images) await access(new URL('../public' + block.src, import.meta.url))
    const html = await read(`.next/server/app/${route}/${meta.slug}.html`)
    for (const block of images) assert.ok(html.includes(block.alt), 'image alt missing from HTML')
    assert.ok(html.includes(`rel="canonical" href="${url}"`), 'canonical ' + url)
    assert.ok(html.includes(`href="${base}/${alternateRoute}/${meta.alternateSlug}"`), 'alternate ' + url)
    assert.match(html, /name="robots" content="index, follow"/)
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), 'sitemap ' + url)
    assert.ok(llms.includes(url), 'llms ' + url)
    assert.ok(html.includes(meta.socialImage), 'social image missing')
    await access(new URL('../public' + meta.socialImage, import.meta.url))
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1)
    assert.doesNotMatch(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''), /[—–]|&mdash;|&ndash;/, 'long dash in visible copy')
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
    assert.ok(schemas.some(s => s['@type'] === 'Article' && s.dateModified === meta.updatedAt))
    const faq = schemas.find(s => s['@type'] === 'FAQPage')
    assert.deepEqual(faq.mainEntity.map(q => q.name), guide.faq.map(q => q.question))
    assert.deepEqual(faq.mainEntity.map(q => q.acceptedAnswer.text), guide.faq.map(q => q.answer))
    assert.doesNotMatch(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, ''), /<video[ >]|data-guide-product-block|Sáltate el montaje manual|Skip the manual setup/, 'unrelated product footage')
    for (const match of JSON.stringify(guide).matchAll(/href=\\"(\/[^"\\#]+)(?:#[^"\\]*)?\\"/g)) {
      await access(new URL('../.next/server/app' + match[1] + '.html', import.meta.url))
    }
  }
}
console.log('Devin SEO: 10 bilingual pages, matching FAQs, canonical/hreflang, indexability, sitemap, llms and internal links passed.')
