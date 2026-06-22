import privacyEn from './privacy.en'
import privacyEs from './privacy.es'
import termsEn from './terms.en'
import termsEs from './terms.es'
import cookiesEn from './cookies.en'
import cookiesEs from './cookies.es'
import type { LegalDoc, LegalLocale, LegalSlug } from './types'

const legalDocs: Record<LegalSlug, Record<LegalLocale, LegalDoc>> = {
  privacy: { en: privacyEn, es: privacyEs },
  terms: { en: termsEn, es: termsEs },
  cookies: { en: cookiesEn, es: cookiesEs },
}

export function getLegalDoc(slug: LegalSlug, locale: string): LegalDoc {
  const normalized: LegalLocale = locale === 'es' ? 'es' : 'en'
  return legalDocs[slug][normalized]
}

export default legalDocs
