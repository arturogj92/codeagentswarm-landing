'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Kanban, Bell, Activity, Search, Zap, ArrowRight } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function FeaturesSection() {
  const t = useTranslations('features')
  const locale = useLocale()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const guideBasePath = locale === 'es' ? 'guias' : 'guides'

  const features = [
    {
      icon: Users,
      title: t('items.multiTerminal.title'),
      description: t('items.multiTerminal.description'),
      guideSlug: locale === 'es' ? 'como-usar-varios-terminales-claude-code' : 'how-to-use-multiple-claude-code-terminals'
    },
    {
      icon: Kanban,
      title: t('items.taskWorkflow.title'),
      description: t('items.taskWorkflow.description'),
    },
    {
      icon: Bell,
      title: t('items.notifications.title'),
      description: t('items.notifications.description'),
      guideSlug: locale === 'es' ? 'notificaciones-codeagentswarm' : 'codeagentswarm-notifications'
    },
    {
      icon: Activity,
      title: t('items.visibility.title'),
      description: t('items.visibility.description'),
      guideSlug: locale === 'es' ? 'ver-cambios-claude-code-tiempo-real' : 'view-claude-code-changes-real-time'
    },
    {
      icon: Search,
      title: t('items.history.title'),
      description: t('items.history.description'),
      guideSlug: locale === 'es' ? 'historial-claude-code' : 'claude-code-history'
    },
    {
      icon: Zap,
      title: t('items.turboMode.title'),
      description: t('items.turboMode.description'),
      guideSlug: 'claude-code-yolo-turbo-mode'
    },
  ]

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('titlePre')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        {/* Features List */}
        <div className="space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="p-5 md:p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.04] transition-all duration-300">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/[0.05] flex items-center justify-center mt-0.5">
                    <feature.icon className="w-6 h-6 text-white/40 group-hover:text-white/60 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-1.5">
                      <h3 className="text-white font-medium text-base md:text-lg">
                        {feature.title}
                      </h3>
                      {feature.guideSlug && (
                        <Link
                          href={`/${locale}/${guideBasePath}/${feature.guideSlug}`}
                          className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/40 transition-all text-xs font-medium"
                        >
                          {t('viewGuide')}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
