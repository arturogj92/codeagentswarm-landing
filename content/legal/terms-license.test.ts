import assert from 'node:assert/strict'
import test from 'node:test'

import termsEn from './terms.en.ts'
import termsEs from './terms.es.ts'

function paragraph(doc: typeof termsEn, sectionId: string): string {
  const section = doc.sections.find((entry) => entry.id === sectionId)
  const block = section?.blocks.find((entry) => entry.type === 'paragraph')
  assert.ok(block && block.type === 'paragraph')
  return block.text
}

test('English and Spanish terms license internal organisational use', () => {
  assert.match(paragraph(termsEn, 'license'), /internal software development purposes/)
  assert.match(paragraph(termsEn, 'license'), /organisation that has accepted these Terms/)
  assert.match(paragraph(termsEs, 'license'), /fines internos de desarrollo de software/)
  assert.match(paragraph(termsEs, 'license'), /organización que haya aceptado estos Términos/)
})

test('both terms preserve separately licensed third-party and CAS Cloud rights', () => {
  assert.match(paragraph(termsEn, 'ip'), /CAS Cloud, when obtained as a separate package/)
  assert.match(paragraph(termsEs, 'ip'), /CAS Cloud, cuando se obtiene como paquete independiente/)
  assert.equal(termsEn.lastUpdated, '2026-08-31')
  assert.equal(termsEs.lastUpdated, '2026-08-31')
})
