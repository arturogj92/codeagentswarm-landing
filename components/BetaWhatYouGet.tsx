'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Crown, Zap, Rocket, TrendingUp, MessageCircle, DollarSign } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BetaWhatYouGet() {
  const t = useTranslations('beta.whatYouGet')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Crown,
      text: t('features.fullPro'),
      gradient: 'from-neon-purple to-neon-magenta',
    },
    {
      icon: Zap,
      text: t('features.priority'),
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Rocket,
      text: t('features.earlyAccess'),
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: TrendingUp,
      text: t('features.influence'),
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: MessageCircle,
      text: t('features.feedback'),
      gradient: 'from-neon-cyan to-blue-500',
    },
    {
      icon: DollarSign,
      text: t('features.noPayments'),
      gradient: 'from-pink-500 to-rose-500',
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card */}
              <div className="relative h-full rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all">
                <div className="absolute inset-0 glass" />

                {/* Content */}
                <div className="relative p-6 flex items-center gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} p-3 flex-shrink-0`}>
                    <feature.icon className="w-full h-full text-white" />
                  </div>

                  {/* Text */}
                  <p className="text-white/80 font-medium">
                    {feature.text}
                  </p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 blur-2xl`} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
