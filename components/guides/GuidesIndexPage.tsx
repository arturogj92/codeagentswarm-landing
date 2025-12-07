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

export default function GuidesIndexPage({ guides, locale }: GuidesIndexPageProps) {
  const isSpanish = locale === 'es'

  const pageTitle = isSpanish ? 'Guías' : 'Guides'
  const pageSubtitle = isSpanish
    ? 'Aprende a sacar el máximo partido a CodeAgentSwarm con nuestras guías prácticas.'
    : 'Learn how to get the most out of CodeAgentSwarm with our practical guides.'
  const readMoreText = isSpanish ? 'Leer guía' : 'Read guide'
  const guidesBasePath = isSpanish ? '/es/guias' : '/en/guides'

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

        {/* Guides Grid */}
        <div className="grid gap-6">
          {guides.map((guide, index) => (
            <motion.article
              key={guide.meta.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <Link
                href={`${guidesBasePath}/${guide.meta.slug}`}
                className="block p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-neon-cyan/30 hover:bg-white/[0.07] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                      {guide.meta.title}
                    </h2>
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
          ))}
        </div>

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
