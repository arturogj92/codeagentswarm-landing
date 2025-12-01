'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, GitBranch, Kanban, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BetaWhatIs() {
  const t = useTranslations('beta.whatIs')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const points = [
    { icon: Users, text: t('point1') },
    { icon: GitBranch, text: t('point2') },
    { icon: Kanban, text: t('point3') },
    { icon: Zap, text: t('point4') },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
        </motion.div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              className="relative"
            >
              {/* Border glow */}
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-transparent" />

              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-xl glass">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-neon-cyan" />
                </div>
                <p className="text-white/80 leading-relaxed pt-2">
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
