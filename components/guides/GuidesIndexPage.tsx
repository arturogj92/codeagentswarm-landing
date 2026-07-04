'use client'

import { motion } from 'framer-motion'
import { BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Guide } from '@/content/guides/types'
import GuidesHeader from './GuidesHeader'

interface GuidesIndexPageProps {
  guides: Guide[]
  locale: 'en' | 'es'
}

// Tool family for each guide, keyed by its canonical English slug so the
// grouping works the same in both locales. Anything not listed falls back to
// the Claude Code family.
type Family = 'cross' | 'claude' | 'codex' | 'antigravity' | 'opencode' | 'gemini'

const FAMILY_BY_EN_SLUG: Record<string, Family> = {
  'ai-cli-agent-swarm': 'cross',
  'git-worktrees-for-ai-coding-agents': 'cross',
  'git-worktree-vs-branch-parallel-ai-agents': 'cross',
  'codex-agent-swarm': 'codex',
  'run-multiple-codex-sessions': 'codex',
  'codex-yolo-mode': 'codex',
  'how-to-use-antigravity-cli': 'antigravity',
  'run-multiple-antigravity-cli-sessions': 'antigravity',
  'antigravity-cli-vs-gemini-cli': 'antigravity',
  'opencode-agent-swarm': 'opencode',
  'run-multiple-opencode-sessions': 'opencode',
  'opencode-vs-cursor': 'opencode',
  'opencode-on-windows': 'opencode',
  'opencode-yolo-mode': 'opencode',
  'opencode-conversation-history': 'opencode',
  'gemini-agent-swarm': 'gemini',
  'run-multiple-gemini-sessions': 'gemini',
}

const FAMILY_ORDER: Family[] = ['cross', 'claude', 'codex', 'antigravity', 'opencode', 'gemini']

const FAMILY_META: Record<Family, { en: string; es: string; icons: string[] }> = {
  cross: {
    en: 'Cross-CLI & Agent Swarm',
    es: 'Cross-CLI y enjambre de agentes',
    icons: ['/icons/apps/claude-icon.svg', '/icons/apps/codex-icon.svg', '/icons/apps/antigravity-icon.png'],
  },
  claude: { en: 'Claude Code', es: 'Claude Code', icons: ['/icons/apps/claude-icon.svg'] },
  codex: { en: 'Codex CLI', es: 'Codex CLI', icons: ['/icons/apps/codex-icon.svg'] },
  antigravity: { en: 'Antigravity CLI', es: 'Antigravity CLI', icons: ['/icons/apps/antigravity-icon.png'] },
  opencode: { en: 'OpenCode', es: 'OpenCode', icons: ['/icons/apps/opencode-icon.svg'] },
  gemini: { en: 'Gemini CLI', es: 'Gemini CLI', icons: ['/icons/apps/gemini-icon.svg'] },
}

// Helper function to highlight keywords in title
function highlightTitle(title: string, keywords?: string[]) {
  if (!keywords || keywords.length === 0) {
    return title
  }

  // Create a regex pattern that matches any of the keywords (case insensitive)
  const pattern = new RegExp(`(${keywords.join('|')})`, 'gi')
  const parts = title.split(pattern)

  return (
    <>
      {parts.map((part, index) => {
        // Check if this part matches any keyword (case insensitive)
        const isKeyword = keywords.some(
          keyword => keyword.toLowerCase() === part.toLowerCase()
        )

        if (isKeyword) {
          return (
            <span key={index} className="text-neon-cyan">
              {part}
            </span>
          )
        }

        return <span key={index}>{part}</span>
      })}
    </>
  )
}

export default function GuidesIndexPage({ guides, locale }: GuidesIndexPageProps) {
  const isSpanish = locale === 'es'

  const pageTitle = isSpanish ? 'Guías' : 'Guides'
  const pageSubtitle = isSpanish
    ? 'Aprende a sacar el máximo partido a CodeAgentSwarm con nuestras guías prácticas, agrupadas por la CLI que uses.'
    : 'Learn how to get the most out of CodeAgentSwarm with our practical guides, grouped by the CLI you use.'
  const readMoreText = isSpanish ? 'Leer guía' : 'Read guide'
  const guidesBasePath = isSpanish ? '/es/guias' : '/en/guides'

  // Group guides by tool family (using the canonical EN slug as the key)
  const familyOf = (guide: Guide): Family => {
    const enSlug = locale === 'en' ? guide.meta.slug : guide.meta.alternateSlug
    return FAMILY_BY_EN_SLUG[enSlug] ?? 'claude'
  }

  const groups = FAMILY_ORDER.map(family => ({
    family,
    label: FAMILY_META[family][isSpanish ? 'es' : 'en'],
    icons: FAMILY_META[family].icons,
    items: guides.filter(g => familyOf(g) === family),
  })).filter(group => group.items.length > 0)

  let cardIndex = 0
  const renderCard = (guide: Guide) => {
    const delay = Math.min(cardIndex * 0.05, 0.4)
    cardIndex += 1
    return (
      <motion.article
        key={guide.meta.slug}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="group relative"
      >
        <Link
          href={`${guidesBasePath}/${guide.meta.slug}`}
          className="block p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-cyan/30 hover:bg-white/[0.07] transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 transition-colors">
                {highlightTitle(guide.meta.title, guide.meta.highlightedWords)}
              </h3>
              <p className="text-white/60 line-clamp-2">
                {guide.meta.metaDescription}
              </p>
            </div>
            <div className="flex items-center gap-2 text-neon-cyan font-medium shrink-0">
              <span>{readMoreText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.article>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <GuidesHeader />

      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-dark-900 via-black to-dark-900 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-20">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-6">
            <BookOpen className="w-5 h-5 text-neon-cyan" />
            <span className="text-sm font-medium text-neon-cyan">{pageTitle}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {pageTitle}
          </h1>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {pageSubtitle}
          </p>
        </motion.div>

        {/* Guides grouped by tool family */}
        {groups.map(group => (
          <section key={group.family} className="mb-12 last:mb-0">
            <div className="flex items-center gap-2.5 mb-5 pl-1">
              <span className="flex items-center gap-1.5">
                {group.icons.map(icon => (
                  <img key={icon} src={icon} alt="" aria-hidden="true" className="w-5 h-5" />
                ))}
              </span>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-neon-cyan/80">
                {group.label}
              </h2>
            </div>
            <div className="grid gap-6">
              {group.items.map(renderCard)}
            </div>
          </section>
        ))}

        {/* Empty state */}
        {guides.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-white/20 mx-auto mb-4" />
            <p className="text-white/50">
              {isSpanish ? 'Próximamente más guías...' : 'More guides coming soon...'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}
