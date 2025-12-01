'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Users, Kanban, Bell, Activity, MessageSquare, Zap } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BetaWhatIs() {
  const t = useTranslations('beta.whatIs')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Users,
      title: t('point1.title'),
      description: t('point1.description'),
      gradient: 'from-neon-purple/30 to-neon-cyan/20'
    },
    {
      icon: Kanban,
      title: t('point2.title'),
      description: t('point2.description'),
      gradient: 'from-neon-cyan/30 to-neon-purple/20'
    },
    {
      icon: Bell,
      title: t('point3.title'),
      description: t('point3.description'),
      gradient: 'from-amber-500/30 to-orange-500/20'
    },
    {
      icon: Activity,
      title: t('point4.title'),
      description: t('point4.description'),
      gradient: 'from-emerald-500/30 to-teal-500/20'
    },
    {
      icon: MessageSquare,
      title: t('point5.title'),
      description: t('point5.description'),
      gradient: 'from-blue-500/30 to-indigo-500/20'
    },
    {
      icon: Zap,
      title: t('point6.title'),
      description: t('point6.description'),
      gradient: 'from-yellow-500/30 to-amber-500/20'
    },
  ]

  return (
    <section
      id="beta-what-is"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-3xl" />
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-white">{t('titlePre')} </span>
            <span className="gradient-text">{t('titleHighlight')}</span>
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
              {/* Border glow on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-2xl glass h-full">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
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
              {/* Border glow on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-2xl glass h-full">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
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
              {/* Border glow on hover */}
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

              {/* Card */}
              <div className="relative flex items-start gap-4 p-6 rounded-2xl glass h-full">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
