// Guide registry - maps slugs to guide content

import type { Guide } from './types'

// English guides
import enMultipleTerminals from './en/how-to-use-multiple-claude-code-terminals'

// Spanish guides
import esMultipleTerminals from './es/como-usar-varios-terminales-claude-code'

// Registry of all guides by locale and slug
export const guides: Record<string, Record<string, Guide>> = {
  en: {
    'how-to-use-multiple-claude-code-terminals': enMultipleTerminals,
  },
  es: {
    'como-usar-varios-terminales-claude-code': esMultipleTerminals,
  },
}

// Get a guide by locale and slug
export function getGuide(locale: string, slug: string): Guide | null {
  return guides[locale]?.[slug] ?? null
}

// Get all guide slugs for a locale (for static generation)
export function getGuideSlugs(locale: string): string[] {
  return Object.keys(guides[locale] ?? {})
}

// Get all guides for a locale
export function getAllGuides(locale: string): Guide[] {
  return Object.values(guides[locale] ?? {})
}

// Check if a slug exists for a locale
export function guideExists(locale: string, slug: string): boolean {
  return !!guides[locale]?.[slug]
}

export { extractTOC } from './types'
export type { Guide, GuideMeta, GuideSection, ContentBlock, FAQItem } from './types'
