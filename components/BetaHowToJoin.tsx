'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Download, MessageSquare, Info } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BetaHowToJoin() {
  const t = useTranslations('beta.howToJoin')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const steps = [
    {
      number: 1,
      icon: FileText,
      title: t('step1.title'),
      description: t('step1.description'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      number: 2,
      icon: Download,
      title: t('step2.title'),
      description: t('step2.description'),
      gradient: 'from-neon-purple to-neon-magenta',
    },
    {
      number: 3,
      icon: MessageSquare,
      title: t('step3.title'),
      description: t('step3.description'),
      gradient: 'from-neon-cyan to-blue-500',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-lg mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                <div className="absolute inset-0 glass" />

                {/* Content */}
                <div className="relative p-8">
                  {/* Step Number and Icon */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white/40 text-sm font-bold">
                      {step.number}
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} p-3`}>
                      <step.icon className="w-full h-full text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-display font-semibold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-white/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-5 blur-2xl`} />
                </div>
              </div>

              {/* Connector Line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gradient-to-r from-white/20 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12"
        >
          <div className="flex items-start gap-3 p-4 rounded-xl glass border border-neon-cyan/20 max-w-3xl mx-auto">
            <Info className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
            <p className="text-white/60 text-sm leading-relaxed">
              {t('note')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
