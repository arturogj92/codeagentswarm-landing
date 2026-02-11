'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Eye, Zap, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import LogoText from './LogoText'

export default function GuidesSection() {
  const t = useTranslations('guides')
  const locale = useLocale()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const guides = [
    {
      icon: Users,
      slug: locale === 'es' ? 'como-usar-varios-terminales-claude-code' : 'how-to-use-multiple-claude-code-terminals',
    },
    {
      icon: Eye,
      slug: locale === 'es' ? 'ver-cambios-claude-code-tiempo-real' : 'view-claude-code-changes-real-time',
    },
    {
      icon: Zap,
      slug: locale === 'es' ? 'claude-code-yolo-turbo-mode' : 'claude-code-yolo-turbo-mode',
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
      {/* Gradient glow - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neutral-800/20 rounded-full blur-3xl" />

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
            <LogoText className="text-3xl md:text-4xl lg:text-5xl" />
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
                {/* Card with glass effect */}
                <div className="relative h-full flex items-start gap-4 p-5 md:p-6 rounded-2xl glass border border-white/10 group-hover:border-neon-cyan/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(251,191,36,0.1)]">
                  {/* Icon Container */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/30 transition-all duration-300">
                    <guide.icon className="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors duration-300" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white mb-2 leading-tight group-hover:text-white transition-colors">
                      {t(`featured.${index}.title`)}
                    </h3>

                    <p className="text-white/50 text-sm leading-relaxed mb-3 group-hover:text-white/70 transition-colors duration-300">
                      {t(`featured.${index}.description`)}
                    </p>

                    <div className="flex items-center text-neon-cyan text-sm font-medium group-hover:text-white transition-colors">
                      {t('readGuide')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
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
