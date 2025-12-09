'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import type { Guide } from '@/content/guides/types'
import { extractTOC } from '@/content/guides'
import GuidesHeader from './GuidesHeader'
import Breadcrumbs from './Breadcrumbs'
import TableOfContents from './TableOfContents'
import ContentRenderer from './ContentRenderer'
import FAQAccordion from './FAQAccordion'

interface GuideLayoutProps {
  guide: Guide
}

export default function GuideLayout({ guide }: GuideLayoutProps) {
  const { meta, sections, faq } = guide
  const locale = meta.locale
  const toc = extractTOC(sections)

  // Breadcrumb configuration
  const guidesLabel = locale === 'es' ? 'Guías' : 'Guides'
  const guidesHref = locale === 'es' ? '/es/guias' : '/en/guides'
  const ctaText = locale === 'es' ? 'Probar CodeAgentSwarm' : 'Try CodeAgentSwarm'
  const ctaHref = `/${locale}`

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <GuidesHeader />

      {/* Background effects */}
      <div className="fixed inset-0 bg-gradient-to-b from-dark-900 via-black to-dark-900 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neon-cyan/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 lg:pt-28 lg:pb-20">
        {/* Breadcrumbs */}
        <Breadcrumbs
          locale={locale}
          items={[
            { label: guidesLabel, href: guidesHref },
            { label: meta.title },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Main content */}
          <article className="min-w-0">
            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                {meta.title}
              </h1>
              <div className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
                {meta.intro}
              </div>
              {meta.introVideo && (
                <figure className="mt-8">
                  <div className="relative rounded-xl border border-white/10 overflow-hidden">
                    <video
                      src={meta.introVideo}
                      controls
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full"
                    />
                  </div>
                </figure>
              )}
            </motion.header>

            {/* Divider */}
            <hr className="border-t border-white/10 mb-10" />

            {/* Content sections */}
            <ContentRenderer sections={sections} />

            {/* FAQ section */}
            {faq && faq.length > 0 && <FAQAccordion items={faq} locale={locale} />}

            {/* Final note / CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-16 p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/10 via-neon-purple/10 to-neon-magenta/10" />
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/30 via-neon-purple/30 to-neon-magenta/30 opacity-50" />
              <div className="relative text-center">
                <p className="text-white/80 mb-6">
                  {meta.ctaText ?? (locale === 'es'
                    ? 'Usa el historial de conversaciones la próxima vez que retomes un proyecto. Vas a notar enseguida lo cómodo que es no tener que explicar todo desde cero a Claude.'
                    : 'Use conversation history next time you resume a project. You\'ll instantly notice how comfortable it is not having to explain everything from scratch to Claude.')}
                </p>
                <Link
                  href={ctaHref}
                  className="inline-flex items-center gap-2 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                >
                  {ctaText}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </article>

          {/* Sidebar with TOC (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={toc} locale={locale} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
