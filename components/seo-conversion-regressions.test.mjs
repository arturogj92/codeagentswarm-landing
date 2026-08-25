import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'

const guideTypesSource = await readFile(new URL('../content/guides/types.ts', import.meta.url), 'utf8')
const guideTypesUrl = `data:text/javascript,${encodeURIComponent(stripTypeScriptTypes(guideTypesSource, { mode: 'transform' }))}`
const { pickRelatedGuideMeta } = await import(guideTypesUrl)

const guide = (slug, ctaAgent = 'codex') => ({
  meta: { slug, ctaAgent, title: `Title ${slug}`, intro: `Intro ${slug}` },
  sections: [],
})

test('related-guide selection stays on topic and returns metadata only', () => {
  const current = guide('b')
  const result = pickRelatedGuideMeta([current, guide('c'), guide('a'), guide('other', 'opencode')], current)

  assert.deepEqual(result, { slug: 'a', title: 'Title a', intro: 'Intro a' })
  assert.equal(pickRelatedGuideMeta([current, guide('other', 'opencode')], current), null)
})

test('guide pages do not import the full content registry into the client bundle', async () => {
  const source = await readFile(new URL('./guides/GuideLayout.tsx', import.meta.url), 'utf8')
  assert.doesNotMatch(source, /from ['"]@\/content\/guides['"]/)
})

test('beta conversion links point to the real download section', async () => {
  for (const file of ['./BetaHeroSection.tsx', './BetaPricingSection.tsx']) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /href="#download"/)
    assert.doesNotMatch(source, /beta-signup-form/)
  }
})

test('the home validates the free beta instead of selling future plans', async () => {
  const home = await readFile(new URL('../app/[locale]/page.tsx', import.meta.url), 'utf8')
  const betaAccess = await readFile(new URL('./BetaPricingSection.tsx', import.meta.url), 'utf8')

  assert.match(home, /<BetaPricingSection sectionId="pricing" \/>/)
  assert.doesNotMatch(home, /<PricingSection \/>/)
  assert.match(betaAccess, /track\('beta_pricing_cta_click', \{ section: sectionId \}\)/)
  assert.doesNotMatch(betaAccess, /€6\.99\/mo/)
})

test('shared navigation sends content-page section links to the localized home', async () => {
  const header = await readFile(new URL('./Header.tsx', import.meta.url), 'utf8')
  const footer = await readFile(new URL('./Footer.tsx', import.meta.url), 'utf8')

  assert.match(header, /homeSectionHref/)
  assert.match(header, /if \(!link\.href\.startsWith\('#'\)\) return/)
  assert.match(footer, /homeSectionHref/)
})

test('waitlist success is recorded only after an accepted response', async () => {
  const source = await readFile(new URL('./CTASection.tsx', import.meta.url), 'utf8')
  assert.equal(source.match(/setSubmitted\(true\)/g)?.length, 1)
  assert.ok(source.indexOf("window.umami?.track('fomo_email_submit'") > source.indexOf('if (response.ok'))
  assert.match(source, /setFailed\(true\)/)
  assert.match(source, /fomo_email_error/)
})

test('real-user web vitals are sent through the existing Umami tracker', async () => {
  const component = await readFile(new URL('./WebVitals.tsx', import.meta.url), 'utf8')
  const layout = await readFile(new URL('../app/[locale]/layout.tsx', import.meta.url), 'utf8')

  assert.match(component, /useReportWebVitals/)
  assert.match(component, /track\('web_vital'/)
  assert.match(component, /metric\.rating/)
  assert.match(layout, /<WebVitals \/>/)
})

test('the most reused large guide images use responsive Next image output', async () => {
  const source = await readFile(new URL('./guides/ContentRenderer.tsx', import.meta.url), 'utf8')

  for (const image of [
    'task-board-kanban.png',
    'codex-agent-swarm.png',
    'multi-terminal.png',
    'multi-cli-agent-selector.png',
    'antigravity-agent-swarm.png',
    'multi-cli-three-agents.png',
    'opencode-agent-swarm.png',
  ]) {
    assert.match(source, new RegExp(image.replace('.', '\\.')))
  }
  assert.match(source, /<Image[\s\S]*sizes=\{sizes\}/)
})

test('guide prerenders stay inside their own locale', async () => {
  const english = await readFile(new URL('../app/[locale]/guides/[slug]/page.tsx', import.meta.url), 'utf8')
  const spanish = await readFile(new URL('../app/[locale]/guias/[slug]/page.tsx', import.meta.url), 'utf8')

  assert.match(english, /if \(locale !== 'en'\) return \[\]/)
  assert.match(spanish, /if \(locale !== 'es'\) return \[\]/)
})

test('about and comparison pages expose current authorship and Mobile Connect facts', async () => {
  const about = await readFile(new URL('../app/[locale]/about/page.tsx', import.meta.url), 'utf8')
  const footer = await readFile(new URL('./Footer.tsx', import.meta.url), 'utf8')
  const guideLayout = await readFile(new URL('./guides/GuideLayout.tsx', import.meta.url), 'utf8')
  const sitemap = await readFile(new URL('../app/sitemap.ts', import.meta.url), 'utf8')
  const comparisons = [
    '../content/guides/en/best-tools-to-run-multiple-ai-coding-agents.ts',
    '../content/guides/en/claude-squad-vs-codeagentswarm.ts',
    '../content/guides/en/conductor-vs-codeagentswarm.ts',
    '../content/guides/en/nimbalyst-vs-codeagentswarm.ts',
    '../content/guides/en/paseo-vs-codeagentswarm.ts',
    '../content/guides/en/superset-vs-codeagentswarm.ts',
    '../content/guides/en/t3-code-vs-codeagentswarm.ts',
    '../content/guides/en/vibe-kanban-vs-codeagentswarm.ts',
    '../content/guides/es/mejores-herramientas-agentes-ia-en-paralelo.ts',
    '../content/guides/es/claude-squad-vs-codeagentswarm.ts',
    '../content/guides/es/conductor-vs-codeagentswarm.ts',
    '../content/guides/es/nimbalyst-vs-codeagentswarm.ts',
    '../content/guides/es/paseo-vs-codeagentswarm.ts',
    '../content/guides/es/superset-vs-codeagentswarm.ts',
    '../content/guides/es/t3-code-vs-codeagentswarm.ts',
    '../content/guides/es/vibe-kanban-vs-codeagentswarm.ts',
  ]

  assert.match(about, /'@type': 'AboutPage'/)
  assert.match(about, /name: 'Arturo García'/)
  assert.match(footer, /href: '\/about', internal: true/)
  assert.match(guideLayout, /href=\{`\/\$\{locale\}\/about`\}/)
  assert.match(sitemap, /\$\{locale\}\/about/)

  for (const file of comparisons) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /Mobile Connect/)
    assert.match(source, /updatedAt: '2026-08-25'/)
  }
})

test('volatile pricing, token and competitor facts carry the current verification date', async () => {
  const pricingFiles = [
    '../content/guides/en/antigravity-plans-and-pricing.ts',
    '../content/guides/en/cursor-cli-pricing.ts',
    '../content/guides/en/kimi-code-plans-and-pricing.ts',
    '../content/guides/en/opencode-plans-and-pricing.ts',
    '../content/guides/en/grok-build-pricing.ts',
    '../content/guides/en/claude-code-plans-and-pricing.ts',
    '../content/guides/en/codex-plans-and-pricing.ts',
    '../content/guides/es/precios-y-uso-cursor-cli.ts',
    '../content/guides/es/planes-y-precios-de-antigravity.ts',
    '../content/guides/es/planes-y-precios-de-kimi-code.ts',
    '../content/guides/es/planes-y-precios-de-opencode.ts',
    '../content/guides/es/precios-y-acceso-grok-build.ts',
    '../content/guides/es/planes-y-precios-de-claude-code.ts',
    '../content/guides/es/planes-y-precios-de-codex.ts',
  ]

  for (const file of pricingFiles) {
    const source = await readFile(new URL(file, import.meta.url), 'utf8')
    assert.match(source, /updatedAt: '2026-08-25'/)
  }

  const llms = await readFile(new URL('../public/llms.txt', import.meta.url), 'utf8')
  const facts = JSON.parse(await readFile(new URL('../scripts/competitor-facts.json', import.meta.url), 'utf8'))

  assert.match(llms, /Available on every xAI plan, including Free/)
  assert.equal(facts.verified_at, '2026-08-25')
})
