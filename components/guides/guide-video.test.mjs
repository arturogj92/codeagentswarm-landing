import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { stripTypeScriptTypes } from 'node:module'
import test from 'node:test'

const source = await readFile(new URL('./guide-video.ts', import.meta.url), 'utf8')
const moduleUrl = `data:text/javascript,${encodeURIComponent(stripTypeScriptTypes(source, { mode: 'transform' }))}`
const { pickGuideVideo } = await import(moduleUrl)

test('uses the multi-model video in every guide product block', () => {
  assert.equal(pickGuideVideo(), 'multi-model-v2.mp4')
})
