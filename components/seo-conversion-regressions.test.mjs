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

test('waitlist success is recorded only after an accepted response', async () => {
  const source = await readFile(new URL('./CTASection.tsx', import.meta.url), 'utf8')
  assert.equal(source.match(/setSubmitted\(true\)/g)?.length, 1)
  assert.ok(source.indexOf("window.umami?.track('fomo_email_submit'") > source.indexOf('if (response.ok'))
  assert.match(source, /setFailed\(true\)/)
  assert.match(source, /fomo_email_error/)
})
