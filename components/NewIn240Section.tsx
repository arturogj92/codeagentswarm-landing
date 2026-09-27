'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import CoordinatorsDemo from '@/components/release240/CoordinatorsDemo'
import AutoKanbanDemo from '@/components/release240/AutoKanbanDemo'
import DailyBudgetDemo from '@/components/release240/DailyBudgetDemo'

// "New in 2.4.0" section, ported from docs/plans/2026-09-26-release-240-features-design.html.
// The demos keep their English product UI on both locales; only the copy around them is translated.

type FeatureKey = 'coordinators' | 'autoKanban' | 'budget'

const FEATURES: { key: FeatureKey; n: string; id: string; slug: { en: string; es: string } }[] = [
  { key: 'coordinators', n: '01', id: 'f-coord', slug: { en: 'ai-coding-agent-coordinator', es: 'coordinador-agentes-ia' } },
  { key: 'autoKanban', n: '02', id: 'f-kanban', slug: { en: 'auto-kanban-ai-coding-agents', es: 'kanban-automatico-agentes-ia' } },
  { key: 'budget', n: '03', id: 'f-budget', slug: { en: 'claude-code-weekly-limit-daily-budget', es: 'limite-semanal-claude-code-presupuesto-diario' } },
]

function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function NewIn240Section() {
  const t = useTranslations('release240')
  const locale = useLocale()
  const guideBasePath = locale === 'es' ? 'guias' : 'guides'
  const guideHref = (f: (typeof FEATURES)[number]) => `/${locale}/${guideBasePath}/${locale === 'es' ? f.slug.es : f.slug.en}`

  const [coord, kanban, budget] = FEATURES

  const heading = (f: (typeof FEATURES)[number]) => (
    <>
      <span className="block font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80 mb-3.5">
        {f.n} · {t(`${f.key}.eyebrow`)}
      </span>
      <h3 className="text-white font-bold text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.12] tracking-[-0.025em] mb-4">
        {t(`${f.key}.titlePre`)} <span className="gradient-text">{t(`${f.key}.titleHighlight`)}</span>
      </h3>
      <p className="text-white/70 text-base leading-[1.7]">{t(`${f.key}.description`)}</p>
    </>
  )

  const checks = (f: (typeof FEATURES)[number], className = '') => (
    <ul className={`grid gap-2.5 ${className}`}>
      {(['check1', 'check2', 'check3'] as const).map(c => (
        <li key={c} className="flex items-start gap-2.5 text-white/70 text-[14.5px]">
          <span className="flex-none mt-px w-[18px] h-[18px] rounded-md bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan">
            <Check className="w-[11px] h-[11px]" strokeWidth={3} />
          </span>
          {t(`${f.key}.${c}`)}
        </li>
      ))}
    </ul>
  )

  const guide = (f: (typeof FEATURES)[number]) => (
    <Link
      href={guideHref(f)}
      className="mt-[26px] w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/40 transition-all text-xs font-medium"
    >
      {t('viewGuide')}
      <ArrowRight className="w-3 h-3" />
    </Link>
  )

  // Wide layout: copy in two columns above, demo full width below.
  const wide = (f: (typeof FEATURES)[number], demo: ReactNode) => (
    <article id={f.id} className="relative mb-24 lg:mb-32 flex flex-col gap-8 lg:gap-10 scroll-mt-24">
      <Reveal className="lg:grid lg:grid-cols-2 lg:gap-x-14 lg:items-end">
        <div>{heading(f)}</div>
        <div className="flex flex-col">
          {checks(f, 'mt-[22px] lg:mt-0')}
          {guide(f)}
        </div>
      </Reveal>
      <Reveal delay={0.1}>{demo}</Reveal>
    </article>
  )

  return (
    <section
      id="new-in-240"
      aria-labelledby="new240-title"
      className="relative pt-20 md:pt-28 pb-8 md:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-x-0 top-0 h-[640px] pointer-events-none bg-grid-pattern [background-size:44px_44px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_0%,black_30%,transparent_75%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <Reveal className="text-center mb-16 sm:mb-24">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80 mb-4">
            {t('eyebrow')}
            <em className="not-italic text-[10px] tracking-[0.1em] px-2 py-0.5 rounded-full bg-neon-cyan text-black">{t('badge')}</em>
          </span>
          <h2 id="new240-title" className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-[-0.03em] leading-[1.1]">
            {t('titlePre')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="mt-4 text-white/50 max-w-[620px] mx-auto leading-relaxed">{t('subtitle')}</p>
          <nav className="mt-7 flex justify-center gap-2 flex-wrap" aria-label={t('jumpLabel')}>
            {FEATURES.map(f => (
              <a
                key={f.key}
                href={`#${f.id}`}
                className="inline-flex items-center gap-2 text-[13px] text-white/70 hover:text-white px-3.5 py-[7px] rounded-full border border-white/[0.08] hover:border-neon-cyan/35 bg-white/[0.02] transition-colors"
              >
                <b className="font-mono text-[10px] font-semibold text-neon-cyan">{f.n}</b>
                {t(`jump.${f.key}`)}
              </a>
            ))}
          </nav>
        </Reveal>

        {wide(coord, <CoordinatorsDemo />)}
        {wide(kanban, <AutoKanbanDemo />)}

        {/* Flip layout: demo left, copy right (copy first when stacked). */}
        <article id={budget.id} className="relative mb-24 lg:mb-32 grid grid-cols-1 lg:grid-cols-[7fr_5fr] gap-8 lg:gap-14 items-center scroll-mt-24">
          <Reveal className="lg:order-2">
            {heading(budget)}
            {checks(budget, 'mt-[22px]')}
            {guide(budget)}
          </Reveal>
          <Reveal delay={0.1} className="min-w-0">
            <DailyBudgetDemo />
          </Reveal>
        </article>
      </div>
    </section>
  )
}
