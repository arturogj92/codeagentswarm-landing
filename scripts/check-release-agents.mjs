// Run after npm run build. Checks the public release announcement and SEO output.
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8')
const base = 'https://www.codeagentswarm.com'
const pairs = [
  ['muse', 'Muse Code', 'how-to-use-muse-code', 'como-usar-muse-code'],
  ['pi', 'Pi', 'how-to-use-pi-coding-agent', 'como-usar-pi-coding-agent'],
  ['devin', 'Devin CLI', 'how-to-use-devin-cli', 'como-usar-devin-cli'],
]
for (const locale of ['en', 'es']) {
  const html = await read(`.next/server/app/${locale}.html`)
  const visible = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  assert.match(visible, /2\.4\.0/)
  assert.doesNotMatch(visible, /In preparation|En preparación|Not yet included|Todavía no están/)
  assert.ok(html.includes(`rel="canonical" href="${base}/${locale}"`))
  for (const [agent, name, en, es] of pairs) {
    const url = `/${locale}/${locale === 'en' ? 'guides' : 'guias'}/${locale === 'en' ? en : es}`
    assert.ok(visible.includes(`href="${url}"`), `${name}: linked guide`)
    assert.ok(visible.includes(`/icons/apps/${agent}-icon.svg`), `${name}: icon`)
    const guide = await read(`.next/server/app${url}.html`)
    assert.match(guide, /2\.4\.0/)
    assert.match(guide, /name="robots" content="index, follow"/)
  }
  for (const [language, route] of [['en', 'en'], ['es', 'es'], ['x-default', 'en']]) {
    assert.ok(html.includes(`hrefLang="${language}" href="${base}/${route}"`))
  }
  assert.match(html, /name="robots" content="index, follow"/)
  assert.match(html, /property="og:image"/)
  assert.match(html, /name="twitter:card" content="summary_large_image"/)
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]))
  const app = schemas.find(s => s['@type'] === 'SoftwareApplication')
  for (const [, name] of pairs) assert.ok(app.description.includes(name))
  assert.ok(schemas.some(s => s['@type'] === 'FAQPage'))
}
const llms = await read('public/llms.txt')
assert.doesNotMatch(llms, /upcoming integration|not announced as available|integration is in beta testing|Devin CLI CLI/)
assert.match(llms, /2\.4\.0/)
const robots = await read('.next/server/app/robots.txt.body')
assert.match(robots, /Allow: \//)
assert.match(robots, /Sitemap: https:\/\/www.codeagentswarm.com\/sitemap.xml/)
console.log('Release agents: EN/ES home, guide links, availability, metadata, schemas, robots and llms passed.')
