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
      <div className="absolute inset-0 bg-black" />

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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-neutral-900 border border-white/10"
          >
            <Sparkles className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-400">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="gradient-text">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
              className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-neutral-950 hover:border-white/20 transition-all group"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <point.icon className="w-5 h-5 text-neutral-400" />
              </div>
              <div className="flex items-start gap-3 pt-2">
                <CheckCircle2 className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-0.5" />
                <p className="text-neutral-400 leading-relaxed">
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
