// Run after npm run build. Verify the actual public HTML, including visible FAQs.
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'

const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8')
const base = 'https://www.codeagentswarm.com'
const pairs = [
  ['claude-code-gui', 'interfaz-grafica-claude-code'],
  ['codex-gui', 'interfaz-grafica-codex'],
  ['claude-code-dashboard', 'panel-de-control-claude-code'],
]
const plain = html => html.replace(/<[^>]*>/g, '').replace(/&#x27;|&#39;/g, "'")
  .replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim()
const sitemap = await read('.next/server/app/sitemap.xml.body')

for (const [i, locale] of ['en', 'es'].entries()) {
  const messages = JSON.parse(await read(`messages/${locale}.json`))
  const items = messages.faq.items
  const homeFaq = Object.keys(items).filter(key => /^q\d+$/.test(key))
    .map(key => ({ question: items[key], answer: items[key.replace('q', 'a')] }))
  const otherLocale = i ? 'en' : 'es'
  const pages = [
    { path: locale, alternate: otherLocale, faq: homeFaq },
    { path: `${locale}/about`, alternate: `${otherLocale}/about` },
  ]
  for (const pair of pairs) {
    const source = await read(`content/guides/${locale}/${pair[i]}.ts`)
    const guide = (await import('data:text/javascript,' + encodeURIComponent(stripTypeScriptTypes(source)))).default
    assert.equal(guide.meta.alternateSlug, pair[1 - i])
    pages.push({
      path: `${locale}/${i ? 'guias' : 'guides'}/${pair[i]}`,
      alternate: `${otherLocale}/${i ? 'guides' : 'guias'}/${pair[1 - i]}`,
      faq: guide.faq,
    })
  }
  for (const page of pages) {
    const html = await read(`.next/server/app/${page.path}.html`)
    const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
    const text = plain(visible)
    const url = `${base}/${page.path}`
    assert.ok(html.includes(`rel="canonical" href="${url}"`), url)
    for (const [language, path] of [[locale, page.path], [otherLocale, page.alternate], ['x-default', i ? page.alternate : page.path]]) {
      assert.ok(html.includes(`hrefLang="${language}" href="${base}/${path}"`), 'hreflang: ' + url)
    }
    assert.match(html, /name="robots" content="index, follow"/)
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), 'sitemap: ' + url)
    assert.equal((visible.match(/<h1[ >]/g) || []).length, 1, url)
    if (page.faq) {
      const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
      const faq = schemas.find(s => s['@type'] === 'FAQPage')
      assert.deepEqual(faq.mainEntity.map(q => ({ question: q.name, answer: q.acceptedAnswer.text })), page.faq, url)
      for (const item of page.faq) {
        assert.ok(text.includes(plain(item.question)), 'visible question: ' + url)
        assert.ok(text.includes(plain(item.answer)), 'visible answer: ' + url)
      }
    }
    for (const [, path] of visible.matchAll(/href="(\/(?:en|es)(?:\/[^"#?]*)?)(?:#[^"]*)?"/g)) {
      await access(new URL('../.next/server/app' + path + '.html', import.meta.url))
    }
  }
}
console.log('Product discovery: 10 EN/ES pages, visible FAQ/schema parity, canonical URLs, indexability, sitemap and internal links passed.')
