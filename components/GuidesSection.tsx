'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Eye, Zap, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function GuidesSection() {
  const t = useTranslations('guides')
  const locale = useLocale()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const guides = [
    {
      icon: Users,
      slug: locale === 'es' ? 'como-usar-varios-terminales-claude-code' : 'how-to-use-multiple-claude-code-terminals',
      gradient: 'from-neon-purple/30 to-neon-cyan/20'
    },
    {
      icon: Eye,
      slug: locale === 'es' ? 'ver-cambios-claude-code-tiempo-real' : 'view-claude-code-changes-real-time',
      gradient: 'from-emerald-500/30 to-teal-500/20'
    },
    {
      icon: Zap,
      slug: locale === 'es' ? 'claude-code-yolo-turbo-mode' : 'claude-code-yolo-turbo-mode',
      gradient: 'from-yellow-500/30 to-amber-500/20'
    },
  ]

  const guideBasePath = locale === 'es' ? 'guias' : 'guides'

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">{t('sectionTitle')} </span>
            <span className="gradient-text">{t('sectionHighlight')}</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {t('sectionSubtitle')}
          </p>
        </motion.div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
            >
              <Link
                href={`/${locale}/${guideBasePath}/${guide.slug}`}
                className="relative group block h-full"
              >
                {/* Border glow on hover */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

                {/* Card */}
                <div className="relative p-6 rounded-2xl glass h-full flex flex-col">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${guide.gradient} flex items-center justify-center mb-4`}>
                    <guide.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {t(`featured.${index}.title`)}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
                    {t(`featured.${index}.description`)}
                  </p>

                  <div className="flex items-center text-neon-cyan text-sm font-medium group-hover:text-neon-purple transition-colors">
                    {t('readGuide')}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
