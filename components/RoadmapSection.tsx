'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Code2,
  Brain,
  Lightbulb,
  Monitor,
  ChevronRight,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function RoadmapSection() {
  const t = useTranslations('roadmap')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [expandedItem, setExpandedItem] = useState<number | null>(0)

  const roadmapItems = [
    {
      quarter: 'Q1',
      year: '2026',
      title: t('items.multiAgent.title'),
      description: t('items.multiAgent.description'),
      features: [
        t('items.multiAgent.features.codex'),
        t('items.multiAgent.features.gemini'),
        t('items.multiAgent.features.orchestration'),
      ],
      icon: Code2,
      status: 'completed',
      current: true,
    },
    {
      quarter: 'Q2',
      year: '2026',
      title: t('items.crossPlatform.title'),
      description: t('items.crossPlatform.description'),
      features: [
        t('items.crossPlatform.features.windows'),
        t('items.crossPlatform.features.linux'),
      ],
      icon: Monitor,
      status: 'in-progress',
    },
    {
      quarter: 'Q3',
      year: '2026',
      title: t('items.agenticTask.title'),
      description: t('items.agenticTask.description'),
      features: [
        t('items.agenticTask.features.decomposition'),
        t('items.agenticTask.features.prioritization'),
        t('items.agenticTask.features.autonomous'),
        t('items.agenticTask.features.collaboration'),
      ],
      icon: Brain,
      status: 'upcoming',
    },
    {
      quarter: 'Q4',
      year: '2026',
      title: t('items.knowledge.title'),
      description: t('items.knowledge.description'),
      features: [
        t('items.knowledge.features.patterns'),
        t('items.knowledge.features.library'),
        t('items.knowledge.features.reuse'),
        t('items.knowledge.features.recommendations'),
      ],
      icon: Lightbulb,
      status: 'upcoming',
    },
  ]

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neutral-700/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-20"
        >
          <h2 className="heading-lg mb-6">
            <span className="text-white">{t('title')}</span>{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line - Desktop */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent hidden lg:block" />

          {/* Timeline Line - Mobile */}
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-amber-400/50 via-white/20 to-amber-400/50 lg:hidden" />

          {/* Timeline Items */}
          <div className="space-y-6 lg:space-y-16">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Timeline Node - Mobile */}
                <div className="absolute left-4 -translate-x-1/2 lg:hidden flex items-center justify-center z-10">
                  <motion.div
                    animate={
                      item.status === 'in-progress'
                        ? { scale: [1, 1.3, 1], boxShadow: ['0 0 0 0px rgba(0, 255, 255, 0.4)', '0 0 0 8px rgba(0, 255, 255, 0)'] }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-4 h-4 rounded-full border-2 ${
                      item.status === 'in-progress'
                        ? 'bg-neon-cyan border-neon-cyan shadow-lg shadow-neon-cyan/50'
                        : 'bg-dark-900 border-white/30'
                    }`}
                  />
                </div>

                {/* Timeline Node - Desktop */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center justify-center">
                  <motion.div
                    animate={
                      item.status === 'in-progress'
                        ? { scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }
                        : {}
                    }
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`w-4 h-4 rounded-full ${
                      item.status === 'in-progress'
                        ? 'bg-neon-cyan shadow-neon-cyan'
                        : 'bg-white/20'
                    }`}
                  />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full pl-10 lg:pl-0 lg:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'
                  }`}
                >
                  <motion.div
                    className="relative group cursor-pointer"
                    onClick={() =>
                      setExpandedItem(expandedItem === index ? null : index)
                    }
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Card */}
                    <div className={`relative rounded-2xl overflow-hidden glass border transition-all duration-500 ${'current' in item && item.current ? 'border-green-500/40 shadow-[0_0_30px_rgba(34,197,94,0.2)] hover:shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:border-green-400/50' : 'border-white/5 hover:border-white/10'}`}>
                      {/* Top accent bar - visible on mobile */}
                      <div className={`h-1 bg-gradient-to-r ${item.status === 'completed' ? 'from-green-500 to-green-400' : item.status === 'in-progress' ? 'from-neon-cyan to-neon-purple' : 'from-white/20 to-white/5'}`} />

                      {/* Gradient overlay */}
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />

                      <div className="relative p-4 sm:p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-neon-cyan/30 transition-all duration-300 ${
                                item.status === 'completed' ? 'shadow-[0_0_20px_rgba(34,197,94,0.3)]' : item.status === 'in-progress' ? 'shadow-[0_0_20px_rgba(0,245,255,0.3)]' : ''
                              }`}
                            >
                              {/* Icon glow on hover */}
                              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <item.icon className={`relative z-10 w-6 h-6 ${item.status === 'completed' ? 'text-green-400' : item.status === 'in-progress' ? 'text-neon-cyan' : 'text-white/70'} group-hover:text-neon-cyan transition-colors duration-300`} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  item.status === 'completed'
                                    ? 'bg-green-500/20 text-green-400'
                                    : item.status === 'in-progress'
                                    ? 'bg-neon-cyan/20 text-neon-cyan'
                                    : 'bg-white/10 text-white/50'
                                }`}>
                                  {item.quarter}
                                </span>
                                <span className="text-xs text-white/30">{item.year}</span>
                                {'current' in item && item.current && (
                                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/30 text-green-300 border border-green-400/50 animate-pulse">
                                    ✓ NOW
                                  </span>
                                )}
                              </div>
                              <h3 className="text-base sm:text-xl font-display font-semibold text-white truncate">
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                              item.status === 'completed'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : item.status === 'in-progress'
                                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                                : 'bg-white/10 text-white/50'
                            }`}
                          >
                            {item.status === 'completed' ? `✓ ${t('status.completed')}` : item.status === 'in-progress' ? `● ${t('status.inProgress')}` : t('status.upcoming')}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-white/50 text-sm sm:text-base mb-4">{item.description}</p>

                        {/* Features Preview - Mobile only */}
                        <div className="lg:hidden mb-3 pt-3 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {item.features.slice(0, 2).map((feature) => (
                              <span key={feature} className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                                {feature}
                              </span>
                            ))}
                            {item.features.length > 2 && (
                              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40">
                                +{item.features.length - 2}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Expandable Features */}
                        <motion.div
                          initial={false}
                          animate={{
                            height: expandedItem === index ? 'auto' : 0,
                            opacity: expandedItem === index ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/5 space-y-2">
                            {item.features.map((feature, featureIndex) => (
                              <motion.div
                                key={feature}
                                initial={{ opacity: 0, x: -10 }}
                                animate={
                                  expandedItem === index
                                    ? { opacity: 1, x: 0 }
                                    : { opacity: 0, x: -10 }
                                }
                                transition={{ delay: featureIndex * 0.05 }}
                                className="flex items-center gap-2"
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${item.status === 'completed' ? 'bg-green-400' : item.status === 'in-progress' ? 'bg-neon-cyan' : 'bg-white/40'}`}
                                />
                                <span className="text-sm text-white/60">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Expand Indicator */}
                        <div className="flex items-center justify-center mt-4">
                          <motion.div
                            animate={{ rotate: expandedItem === index ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/50 transition-colors" />
                          </motion.div>
                        </div>
                      </div>

                      {/* Corner glow */}
                      <div
                        className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-neon-cyan to-neon-purple rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
