'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  CheckCircle2,
  Sparkles,
  Terminal,
  Bell,
  GitBranch,
  Layout,
  Package,
  History,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SolutionSection() {
  const t = useTranslations('solution')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const solutionPoints = [
    {
      icon: Terminal,
      text: t('points.terminals'),
    },
    {
      icon: Bell,
      text: t('points.notifications'),
    },
    {
      icon: GitBranch,
      text: t('points.git'),
    },
    {
      icon: Layout,
      text: t('points.kanban'),
    },
    {
      icon: Package,
      text: t('points.mcp'),
    },
    {
      icon: History,
      text: t('points.history'),
    },
    {
      icon: Terminal,
      text: t('points.fileTracking'),
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-emerald-950/5 to-black" />

      {/* Green/cyan glow for "solution" feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-cyan/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-500/5 rounded-full blur-[80px]" />

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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-neon-cyan/20"
          >
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-white/70">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="gradient-text">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Solution Points */}
        <div className="space-y-3">
          {solutionPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-neon-cyan/20 hover:bg-white/[0.04] transition-all group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-neon-cyan/10 flex items-center justify-center group-hover:bg-neon-cyan/20 transition-colors">
                <point.icon className="w-5 h-5 text-neon-cyan" />
              </div>
              <div className="flex items-start gap-3 pt-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <p className="text-white/70 leading-relaxed">
                  {point.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
