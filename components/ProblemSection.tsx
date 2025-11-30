'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AlertTriangle, RefreshCw, Brain, Eye, MessageSquare } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function ProblemSection() {
  const t = useTranslations('problem')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const painPoints = [
    {
      icon: RefreshCw,
      text: t('painPoints.switching'),
    },
    {
      icon: Eye,
      text: t('painPoints.noView'),
    },
    {
      icon: MessageSquare,
      text: t('painPoints.repeating'),
    },
    {
      icon: Brain,
      text: t('painPoints.confidence'),
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />

      {/* Subtle red glow for "problem" feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-red-500/20"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-white/70">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="text-red-400/80">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-red-500/20 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-red-400/70" />
              </div>
              <p className="text-white/60 leading-relaxed pt-2">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
