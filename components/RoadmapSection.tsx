'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

type Status = 'shipped' | 'in-progress' | 'planned'

interface RoadmapItem {
  quarter: string
  year: string
  key: string
  status: Status
  featureKeys: string[]
}

const roadmapItems: RoadmapItem[] = [
  {
    quarter: 'Q1',
    year: '2026',
    key: 'multiAgent',
    status: 'shipped',
    featureKeys: ['codex', 'antigravity', 'opencode', 'orchestration'],
  },
  {
    quarter: 'Q2',
    year: '2026',
    key: 'windows',
    status: 'shipped',
    featureKeys: ['win', 'installer', 'arm'],
  },
  {
    quarter: 'Q3',
    year: '2026',
    key: 'linux',
    status: 'in-progress',
    featureKeys: ['distros', 'packages', 'parity'],
  },
  {
    quarter: 'Q4',
    year: '2026',
    key: 'autonomous',
    status: 'planned',
    featureKeys: ['decomposition', 'prioritization', 'execution', 'collaboration'],
  },
]

const shippedCount = roadmapItems.filter((i) => i.status === 'shipped').length

// Rail fill reaches the middle of the in-progress node: each of the 4 node
// slots is 25% wide, so node N sits at (N * 25) + 12.5 percent.
const inProgressIndex = roadmapItems.findIndex((i) => i.status === 'in-progress')
const railFillPercent = inProgressIndex * 25 + 12.5

function StatusChip({ status, t }: { status: Status; t: ReturnType<typeof useTranslations> }) {
  if (status === 'shipped') {
    return (
      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/25 whitespace-nowrap">
        ✓ {t('status.shipped')}
      </span>
    )
  }
  if (status === 'in-progress') {
    return (
      <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-amber-400/15 text-amber-400 border border-amber-400/40 whitespace-nowrap">
        ● {t('status.inProgress')}
      </span>
    )
  }
  return (
    <span className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10 whitespace-nowrap">
      {t('status.planned')}
    </span>
  )
}

function RailNode({ status, size = 'lg' }: { status: Status; size?: 'lg' | 'sm' }) {
  const dim = size === 'lg' ? 'w-[22px] h-[22px]' : 'w-5 h-5'
  if (status === 'shipped') {
    return (
      <div className={`${dim} rounded-full border-[1.5px] border-green-400/70 bg-[#0c1510] text-green-400 flex items-center justify-center text-[11px] z-10`}>
        ✓
      </div>
    )
  }
  if (status === 'in-progress') {
    return (
      <motion.div
        animate={{ boxShadow: [
          '0 0 0 4px rgba(251,191,36,0.10), 0 0 18px rgba(251,191,36,0.45)',
          '0 0 0 7px rgba(251,191,36,0.16), 0 0 30px rgba(251,191,36,0.65)',
          '0 0 0 4px rgba(251,191,36,0.10), 0 0 18px rgba(251,191,36,0.45)',
        ] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={`${dim} rounded-full border-[1.5px] border-amber-400 bg-[#1a1508] flex items-center justify-center z-10`}
      >
        <div className="w-2 h-2 rounded-full bg-amber-400" />
      </motion.div>
    )
  }
  return (
    <div className={`${dim} rounded-full border-[1.5px] border-dashed border-white/25 bg-dark-900 flex items-center justify-center z-10`}>
      <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
    </div>
  )
}

export default function RoadmapSection() {
  const t = useTranslations('roadmap')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section
      id="roadmap"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="heading-lg mb-6">
            <span className="text-white">{t('title')}</span>{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
          <div className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-white/30 border border-white/10 bg-white/[0.03] px-4 py-1.5 rounded-full">
            <span className="text-green-400 font-semibold">
              {t('progress.shipped', { count: shippedCount, total: roadmapItems.length })}
            </span>
            <span>·</span>
            <span>{t('progress.onTrack')}</span>
          </div>
        </motion.div>

        {/* ===== Desktop: progress rail + card grid ===== */}
        <div className="hidden lg:block">
          {/* Rail */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-2 mb-10"
          >
            <div className="relative h-0.5 bg-white/10 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${railFillPercent}%` } : { width: 0 }}
                transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                className="absolute left-0 top-0 bottom-0 rounded-full bg-gradient-to-r from-green-400/90 to-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.5)]"
              />
            </div>
            <div className="absolute -inset-y-2.5 inset-x-0 grid grid-cols-4">
              {roadmapItems.map((item) => (
                <div key={item.key} className="flex items-center justify-center">
                  <RailNode status={item.status} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-4 gap-4">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.12 }}
              >
                <div
                  className={`h-full flex flex-col gap-3.5 rounded-2xl p-6 glass backdrop-blur-md border transition-all duration-300 ${
                    item.status === 'shipped'
                      ? 'border-green-500/15'
                      : item.status === 'in-progress'
                      ? 'border-amber-400/50 bg-gradient-to-b from-amber-400/[0.07] to-white/[0.02] shadow-[0_0_40px_rgba(251,191,36,0.12)] -translate-y-1.5'
                      : 'border-dashed border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-wider text-white/30">
                      <b className="text-white/80 font-semibold">{item.quarter}</b> · {item.year}
                    </span>
                    <StatusChip status={item.status} t={t} />
                  </div>
                  <h3 className={`text-lg font-display font-semibold ${item.status === 'shipped' ? 'text-white/85' : 'text-white'}`}>
                    {t(`items.${item.key}.title`)}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t(`items.${item.key}.description`)}
                  </p>
                  <ul className="mt-auto pt-3.5 border-t border-white/[0.08] space-y-2">
                    {item.featureKeys.map((fk) => (
                      <li key={fk} className={`flex items-start gap-2.5 text-[13px] leading-snug ${item.status === 'shipped' ? 'text-white/40' : 'text-white/50'}`}>
                        {item.status === 'shipped' ? (
                          <span className="text-green-400 text-xs mt-px">✓</span>
                        ) : (
                          <span className={`w-[5px] h-[5px] rounded-full mt-1.5 flex-shrink-0 ${item.status === 'in-progress' ? 'bg-amber-400' : 'bg-white/25'}`} />
                        )}
                        {t(`items.${item.key}.features.${fk}`)}
                      </li>
                    ))}
                  </ul>
                  <div className={`font-mono text-[11px] ${
                    item.status === 'shipped' ? 'text-green-400/60' : item.status === 'in-progress' ? 'text-amber-400/75' : 'text-white/30'
                  }`}>
                    {t(`eta.${item.status === 'shipped' ? 'shipped' : item.status === 'in-progress' ? 'inDevelopment' : 'planned'}`)} · {item.quarter} {item.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ===== Mobile: compact release log ===== */}
        <div className="lg:hidden relative">
          {/* Vertical rail */}
          <div className="absolute left-[52px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-green-400/60 via-amber-400 to-white/10" />

          <div className="space-y-3.5">
            {roadmapItems.map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="grid grid-cols-[36px_32px_1fr] items-start"
              >
                <div className="text-right pt-5">
                  <span className="font-mono text-sm font-bold text-white/80 block">{item.quarter}</span>
                  <span className="font-mono text-[10px] text-white/30 block mt-0.5">{item.year}</span>
                </div>
                <div className="flex justify-center pt-[22px]">
                  <RailNode status={item.status} size="sm" />
                </div>
                <div
                  className={`rounded-xl px-4 py-4 glass backdrop-blur-md border ${
                    item.status === 'shipped'
                      ? 'border-white/[0.08] opacity-80'
                      : item.status === 'in-progress'
                      ? 'border-amber-400/50 bg-gradient-to-b from-amber-400/[0.07] to-white/[0.02] shadow-[0_0_30px_rgba(251,191,36,0.1)]'
                      : 'border-dashed border-white/10'
                  }`}
                >
                  <div className="flex items-center flex-wrap gap-2 mb-1.5">
                    <h3 className="text-base font-display font-semibold text-white">
                      {t(`items.${item.key}.title`)}
                    </h3>
                    <StatusChip status={item.status} t={t} />
                  </div>
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    {t(`items.${item.key}.description`)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.featureKeys.map((fk) => (
                      <span
                        key={fk}
                        className={`text-[11px] px-2.5 py-1 rounded-full border ${
                          item.status === 'in-progress'
                            ? 'border-amber-400/35 text-amber-400 bg-amber-400/10'
                            : 'border-white/10 text-white/50 bg-white/5'
                        }`}
                      >
                        {t(`items.${item.key}.features.${fk}`)}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
