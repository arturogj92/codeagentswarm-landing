// Guide content type definitions

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string; id: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language?: string; code: string }
  | { type: 'inline-code'; text: string }
  | { type: 'image'; alt: string; src: string; caption?: string; size?: 'inline' | 'small' | 'medium' | 'full' }
  | { type: 'video'; src: string; caption?: string; poster?: string }
  | { type: 'callout'; variant: 'tip' | 'warning' | 'info'; content: string }
  | { type: 'table'; headers: string[]; rows: string[][]; caption?: string }
  | { type: 'divider' }

// Which agent (or reader intent) the guide's CTAs should speak to.
// 'multi' covers cross-agent guides (worktrees, MCP, skills) and guides about
// retired agents (Gemini). 'comparison' covers "X vs CodeAgentSwarm" pages and
// tool listicles, where the reader is choosing a tool rather than learning one.
export type GuideCtaAgent =
  | 'claude-code'
  | 'codex'
  | 'opencode'
  | 'kimi-code'
  | 'antigravity'
  | 'multi'
  | 'comparison'

// next-intl message key (under guides.downloadCta.context) for each agent.
export const CTA_AGENT_MESSAGE_KEY: Record<GuideCtaAgent, string> = {
  'claude-code': 'claudeCode',
  codex: 'codex',
  opencode: 'opencode',
  'kimi-code': 'kimiCode',
  antigravity: 'antigravity',
  multi: 'multi',
  comparison: 'comparison',
}

export interface FAQItem {
  question: string
  answer: string
}

export interface GuideSection {
  id: string
  title: string
  content: ContentBlock[]
}

export interface GuideMeta {
  slug: string
  locale: 'en' | 'es'
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  introVideo?: string // Optional video URL to show after intro
  ctaText?: string // Optional custom CTA text for the final section
  ctaAgent: GuideCtaAgent // Drives agent-aware CTA copy; see GuideCtaAgent
  highlightedWords?: string[] // Optional keywords to highlight in title (for guide index page)
  publishedAt?: string
  updatedAt?: string
  author?: string
  // For hreflang - the slug in the other language
  alternateSlug: string
}

export interface Guide {
  meta: GuideMeta
  sections: GuideSection[]
  faq?: FAQItem[]
}

// Helper to get all section IDs for Table of Contents
export function extractTOC(sections: GuideSection[]): { id: string; title: string; level: number }[] {
  const toc: { id: string; title: string; level: number }[] = []

  for (const section of sections) {
    toc.push({ id: section.id, title: section.title, level: 2 })

    for (const block of section.content) {
      if (block.type === 'heading' && block.level === 3) {
        toc.push({ id: block.id, title: block.text, level: 3 })
      }
    }
  }

  return toc
}
