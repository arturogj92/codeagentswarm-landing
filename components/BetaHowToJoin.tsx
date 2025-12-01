'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { FileText, Download, Info } from 'lucide-react'

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)
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
      icon: DiscordIcon,
      title: t('step3.title'),
      description: t('step3.description'),
      gradient: 'from-[#5865F2] to-[#7289DA]',
    },
  ]

  return (
    <section
      id="beta-how-to-join"
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
