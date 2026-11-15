'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarClock, Check } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import Link from 'next/link'

// Release 2.5.0: Scheduled Conversations. The clip is the What's New GIF from the app
// (release-notes/2.5.0/scheduled.gif) re-encoded to H.264; the poster is one of its frames.
export default function ScheduledConversationsSection() {
  const t = useTranslations('scheduled250')
  const locale = useLocale()
  const guideHref = locale === 'es' ? '/es/guias/tareas-programadas-agentes-ia' : '/en/guides/schedule-ai-coding-agents'
  const ref = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const inView = useInView(ref, { margin: '-120px' })
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (inView && !reduceMotion) void video.play().catch(() => {})
    else video.pause()
  }, [inView, reduceMotion])

  return (
    <section
      ref={ref}
      id="scheduled-conversations"
      aria-labelledby="scheduled-title"
      className="relative py-16 md:py-24 px-4 sm:px-6 scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80 mb-3.5">
            <CalendarClock className="w-3.5 h-3.5" aria-hidden="true" />
            {t('eyebrow')}
          </span>
          <h2 id="scheduled-title" className="text-white font-bold text-[clamp(1.6rem,3vw,2.15rem)] leading-[1.12] tracking-[-0.025em] mb-4">
            {t('titlePre')} <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-white/70 text-base leading-[1.7]">{t('description')}</p>
          <ul className="grid gap-2.5 mt-[22px]">
            {(['check1', 'check2', 'check3'] as const).map(key => (
              <li key={key} className="flex items-start gap-2.5 text-white/70 text-[14.5px]">
                <span className="flex-none mt-px w-[18px] h-[18px] rounded-md bg-neon-cyan/10 border border-neon-cyan/25 flex items-center justify-center text-neon-cyan">
                  <Check className="w-[11px] h-[11px]" strokeWidth={3} />
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-white/45 text-[13px] leading-relaxed">{t('note')}</p>
          <Link
            href={guideHref}
            className="mt-[22px] w-fit flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan/70 hover:text-neon-cyan hover:bg-neon-cyan/20 hover:border-neon-cyan/40 transition-all text-xs font-medium"
          >
            {t('viewGuide')}
            <ArrowRight className="w-3 h-3" />
          </Link>
        </motion.div>
        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="min-w-0"
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#0b0a14] border border-white/10 shadow-[0_0_40px_rgba(0,212,255,0.06)]">
            <video
              ref={videoRef}
              data-testid="scheduled-conversations-demo"
              className="h-full w-full object-cover"
              loop
              muted
              playsInline
              preload="metadata"
              poster="/videos/features/scheduled-conversations-poster.webp"
              aria-label={t('videoLabel')}
            >
              <source src="/videos/features/scheduled-conversations.mp4" type="video/mp4" />
            </video>
          </div>
          <figcaption className="mt-3 text-center text-white/40 text-xs">{t('caption')}</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
