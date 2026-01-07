'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Kanban, Bell, Activity, MessageSquare, Zap, ArrowRight } from 'lucide-react'
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
      icon: MessageSquare,
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
      className="relative py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('titlePre')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
        </motion.div>

        {/* Features Grid - 2 columns on top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {features.slice(0, 2).map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-colors h-full">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-neutral-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  {feature.guideSlug && (
                    <Link
                      href={`/${locale}/${guideBasePath}/${feature.guideSlug}`}
                      className="inline-flex items-center text-neutral-500 hover:text-white text-xs font-medium transition-colors group/link"
                    >
                      {t('viewGuide')}
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Middle row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          {features.slice(2, 4).map((feature, index) => (
            <motion.div
              key={index + 2}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: (index + 2) * 0.1 + 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-colors h-full">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-neutral-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  {feature.guideSlug && (
                    <Link
                      href={`/${locale}/${guideBasePath}/${feature.guideSlug}`}
                      className="inline-flex items-center text-neutral-500 hover:text-white text-xs font-medium transition-colors group/link"
                    >
                      {t('viewGuide')}
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom row - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.slice(4).map((feature, index) => (
            <motion.div
              key={index + 4}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: (index + 4) * 0.1 + 0.2 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-2xl bg-neutral-950 border border-white/10 hover:border-white/20 transition-colors h-full">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-neutral-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400 text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  {feature.guideSlug && (
                    <Link
                      href={`/${locale}/${guideBasePath}/${feature.guideSlug}`}
                      className="inline-flex items-center text-neutral-500 hover:text-white text-xs font-medium transition-colors group/link"
                    >
                      {t('viewGuide')}
                      <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
