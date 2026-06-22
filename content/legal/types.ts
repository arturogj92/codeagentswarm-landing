// Shared types for legal documents (Privacy Policy, Terms of Service, Cookie Notice).
// Content is kept separate from presentation, mirroring the guides system, so the same
// renderer (components/legal/LegalPage.tsx) can display any legal document in EN or ES.

export type LegalBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string; id?: string }
  | { type: 'list'; items: string[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'callout'; variant?: 'info' | 'warning' | 'tip'; text: string }

export interface LegalSection {
  // Stable id used for the in-page table of contents and anchor deep-links.
  id: string
  title: string
  blocks: LegalBlock[]
}

export type LegalSlug = 'privacy' | 'terms' | 'cookies'
export type LegalLocale = 'en' | 'es'

export interface LegalDoc {
  slug: LegalSlug
  locale: LegalLocale
  // H1 on the page.
  title: string
  // <title> tag / SEO.
  metaTitle: string
  metaDescription: string
  // ISO date (YYYY-MM-DD) of the last substantive change.
  lastUpdated: string
  // Optional intro paragraph(s) shown above the table of contents.
  intro?: string
  sections: LegalSection[]
}
