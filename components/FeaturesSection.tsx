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
      guideSlug: locale === 'es' ? 'modo-yolo-claude-code-explicado' : 'claude-code-yolo-mode-explained'
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
      <div className="absolute inset-0 bg-grid-pattern [background-size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,black_30%,transparent_75%)]" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.10)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80 mb-4">
            {t('badge')}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {t('titlePre')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: index * 0.07 }}
              className="group"
            >
              <div className="relative flex flex-col h-full p-6 rounded-2xl bg-white/[0.02] border border-white/[0.07] hover:border-neon-cyan/35 hover:bg-white/[0.035] hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(420px_circle_at_30%_0%,rgba(251,191,36,0.08),transparent_65%)] pointer-events-none" />

                {/* Icon */}
                <div className="relative z-10 w-11 h-11 rounded-xl bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center text-neon-cyan mb-4 group-hover:shadow-neon-cyan transition-shadow duration-300">
                  <feature.icon className="w-[22px] h-[22px]" />
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-white font-semibold text-[17px] tracking-[-0.01em] mb-2">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-white/60 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                {feature.guideSlug && (
                  <Link
                    href={`/${locale}/${guideBasePath}/${feature.guideSlug}`}
                    className="relative z-10 mt-auto w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/40 transition-all text-xs font-medium"
                  >
                    {t('viewGuide')}
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
