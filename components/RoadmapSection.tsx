'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Code2,
  Brain,
  Lightbulb,
  Monitor,
  ChevronRight,
  Circle,
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
        t('items.multiAgent.features.deepseek'),
        t('items.multiAgent.features.gemini'),
        t('items.multiAgent.features.orchestration'),
      ],
      icon: Code2,
      status: 'in-progress',
      gradient: 'from-neon-cyan to-blue-500',
    },
    {
      quarter: 'Q2',
      year: '2026',
      title: t('items.crossPlatform.title'),
      description: t('items.crossPlatform.description'),
      features: [
        t('items.crossPlatform.features.windows'),
        t('items.crossPlatform.features.linux'),
        t('items.crossPlatform.features.sync'),
        t('items.crossPlatform.features.native'),
      ],
      icon: Monitor,
      status: 'upcoming',
      gradient: 'from-purple-500 to-pink-500',
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
      gradient: 'from-orange-500 to-red-500',
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
      gradient: 'from-emerald-500 to-teal-500',
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-3xl" />
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
          <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gradient-to-b from-neon-cyan/50 via-neon-purple/30 to-neon-cyan/50 lg:hidden" />

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
                    <div className="relative rounded-2xl overflow-hidden glass border border-white/5 hover:border-white/10 transition-all duration-500">
                      {/* Top accent bar - visible on mobile */}
                      <div className={`h-1 bg-gradient-to-r ${item.gradient}`} />

                      {/* Gradient overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />

                      <div className="relative p-4 sm:p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-2 sm:p-3 shadow-lg flex-shrink-0 ${
                                item.status === 'in-progress' ? 'animate-pulse' : ''
                              }`}
                            >
                              <item.icon className="w-full h-full text-white" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                  item.status === 'in-progress'
                                    ? 'bg-neon-cyan/20 text-neon-cyan'
                                    : 'bg-white/10 text-white/50'
                                }`}>
                                  {item.quarter}
                                </span>
                                <span className="text-xs text-white/30">{item.year}</span>
                              </div>
                              <h3 className="text-base sm:text-xl font-display font-semibold text-white truncate">
                                {item.title}
                              </h3>
                            </div>
                          </div>

                          {/* Status Badge */}
                          <span
                            className={`hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                              item.status === 'in-progress'
                                ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30'
                                : 'bg-white/10 text-white/50'
                            }`}
                          >
                            {item.status === 'in-progress' ? `● ${t('status.inProgress')}` : t('status.upcoming')}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-white/50 text-sm sm:text-base mb-4">{item.description}</p>

                        {/* Features Preview - Mobile only */}
                        <div className="lg:hidden mb-3 pt-3 border-t border-white/5">
                          <div className="flex flex-wrap gap-2">
                            {item.features.slice(0, 2).map((feature) => (
                              <span key={feature} className={`text-xs px-2 py-1 rounded-full bg-gradient-to-r ${item.gradient} bg-opacity-10 text-white/70`}>
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
                                  className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`}
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
                        className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${item.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
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
