'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface GuideInlineCTAProps {
  locale: 'en' | 'es'
  slug: string
}

// Subtle in-content CTA shown mid-guide. SEO-safe: a regular anchor in the
// document flow (no sticky/fixed positioning, no interstitial, no layout shift).
export default function GuideInlineCTA({ locale, slug }: GuideInlineCTAProps) {
  const text =
    locale === 'es'
      ? 'CodeAgentSwarm hace todo esto por ti: varios terminales de Claude Code, historial buscable y vista de cambios en tiempo real, en una sola app.'
      : 'CodeAgentSwarm does all of this for you: multiple Claude Code terminals, searchable history and real-time change tracking, in a single app.'
  const buttonLabel = locale === 'es' ? 'Descárgalo gratis' : 'Download it free'

  return (
    <aside className="my-12 p-6 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <p className="flex-1 text-white/80 leading-relaxed m-0">{text}</p>
        <Link
          href={`/${locale}#download`}
          onClick={() => {
            window.umami?.track('guide_cta_click', { guide: slug, position: 'inline' })
          }}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 bg-neon-cyan text-black font-semibold rounded-full hover:bg-amber-400 transition-colors"
        >
          {buttonLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  )
}
