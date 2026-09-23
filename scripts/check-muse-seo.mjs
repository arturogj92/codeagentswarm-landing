import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

const pairs = [
  ['how-to-use-muse-code', 'como-usar-muse-code'],
  ['muse-code-on-windows', 'muse-code-en-windows'],
  ['muse-code-models-pricing-privacy', 'muse-code-modelos-precios-privacidad'],
  ['muse-code-mcp-skills-workflows', 'muse-code-mcp-skills-workflows'],
]
const base = 'https://www.codeagentswarm.com'
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8')
const sitemap = await read('.next/server/app/sitemap.xml.body')
const llms = await read('public/llms.txt')
const titles = new Set()
const hubs = await Promise.all(['en/guides', 'es/guias'].map(route => read(`.next/server/app/${route}.html`)))
for (const pair of pairs) {
  const guides = await Promise.all(pair.map(async (slug, i) => {
    const source = await read(`content/guides/${i ? 'es' : 'en'}/${slug}.ts`)
    return (await import('data:text/javascript,' + encodeURIComponent(stripTypeScriptTypes(source, { mode: 'strip' })))).default
  }))
  assert.deepEqual(guides[0].sections.map(s => s.content.map(b => b.type)), guides[1].sections.map(s => s.content.map(b => b.type)), 'translation structure')
  for (const [i, guide] of guides.entries()) {
    const { meta } = guide
    const route = i ? 'es/guias' : 'en/guides'
    const alternateRoute = i ? 'en/guides' : 'es/guias'
    const url = `${base}/${route}/${meta.slug}`
    assert.equal(meta.ctaAgent, 'muse')
    assert.equal(meta.alternateSlug, pair[1 - i])
    assert.ok(meta.metaTitle.length <= 65 && !titles.has(meta.metaTitle), meta.slug + ' title')
    titles.add(meta.metaTitle)
    assert.ok(meta.metaDescription.length >= 120 && meta.metaDescription.length <= 165, meta.slug + ' description')
    assert.ok(new Set(guide.sections.map(s => s.id)).size === guide.sections.length, 'unique anchors')
    const html = await read(`.next/server/app/${route}/${meta.slug}.html`)
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    assert.ok(html.includes(`rel="canonical" href="${url}"`), 'canonical ' + url)
    assert.ok(html.includes(`href="${base}/${alternateRoute}/${meta.alternateSlug}"`), 'alternate ' + url)
    assert.ok(html.includes(`hrefLang="x-default" href="${base}/en/guides/${pair[0]}"`), 'x-default')
    assert.match(html, /name="robots" content="index, follow"/)
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1)
    assert.doesNotMatch(visible, /[—–]|&mdash;|&ndash;/, 'long dash in visible copy')
    assert.doesNotMatch(visible, /<video[ >]/, 'unrelated product footage')
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), 'sitemap ' + url)
    assert.ok(llms.includes(url), 'llms ' + url)
    assert.ok(hubs[i].includes(`/${route}/${meta.slug}`), 'guide hub')
    assert.ok(html.includes(meta.socialImage), 'social image')
    await access(new URL('../public' + meta.socialImage, import.meta.url))
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
    assert.ok(schemas.some(s => s['@type'] === 'Article' && s.dateModified === meta.updatedAt))
    assert.ok(schemas.some(s => s['@type'] === 'BreadcrumbList'))
    const faq = schemas.find(s => s['@type'] === 'FAQPage')
    assert.deepEqual(faq.mainEntity.map(q => q.name), guide.faq.map(q => q.question))
    assert.deepEqual(faq.mainEntity.map(q => q.acceptedAnswer.text), guide.faq.map(q => q.answer))
    for (const block of guide.sections.flatMap(s => s.content).filter(b => b.type === 'image')) {
      await access(new URL('../public' + block.src, import.meta.url))
      assert.ok(html.includes(block.alt), 'image alt')
    }
    for (const match of JSON.stringify(guide).matchAll(/href=\\"(\/[^"\\#]+)(?:#[^"\\]*)?\\"/g)) {
      await access(new URL('../.next/server/app' + match[1] + '.html', import.meta.url))
    }
    const availability = JSON.parse(await read(`messages/${i ? 'es' : 'en'}.json`)).guides.downloadCta.context.muse
    assert.ok(visible.includes(availability), 'final CTA preserves release availability')
  }
}
console.log('Muse SEO: 8 bilingual pages, structured data, canonical/hreflang, indexability, hub, sitemap, llms, images and internal links passed.')
