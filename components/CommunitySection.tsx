'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useTranslations } from 'next-intl'

// Line illustrations drawn for this section (same language as CapabilitiesGrid:
// layered strokes for depth). Each one carries a single amber segment that marks
// what the user gets: the feature peeking out, the broken line, the vote that
// counts, the workflow you share.
const strokeProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  strokeWidth: 1.5,
}

const AMBER = '#fbbf24'

function SneakPeekArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 80" aria-hidden="true" {...strokeProps}>
      {/* the window still hidden behind, emerging */}
      <path d="M30 14h36a5 5 0 0 1 5 5v6" stroke={AMBER} />
      <path d="M30 14a5 5 0 0 0-5 5v6" stroke={AMBER} />
      <path d="M25 25h46" stroke={AMBER} strokeOpacity="0.55" />
      <rect x="19" y="24" width="52" height="34" rx="5" fill="#000" opacity="0.55" />
      <rect x="19" y="24" width="52" height="34" rx="5" opacity="0.55" />
      {/* what you see today */}
      <rect x="13" y="34" width="58" height="34" rx="5" fill="#000" />
      <path d="M13 44h58" opacity="0.45" />
      <circle cx="20" cy="39" r="1.4" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx="25" cy="39" r="1.4" fill="currentColor" stroke="none" opacity="0.3" />
      <path d="M22 53h22M22 60h32" opacity="0.3" />
      <path d="M78 20h5M79.5 13.5l3.5-3.5M83 27l-4-2" stroke={AMBER} strokeOpacity="0.5" />
    </svg>
  )
}

function BugReportArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 80" aria-hidden="true" {...strokeProps}>
      <rect x="8" y="12" width="52" height="40" rx="5" />
      <path d="M8 22h52" opacity="0.45" />
      <circle cx="14" cy="17" r="1.3" fill="currentColor" stroke="none" opacity="0.45" />
      <circle cx="19" cy="17" r="1.3" fill="currentColor" stroke="none" opacity="0.3" />
      <path d="M16 30h26" opacity="0.3" />
      {/* the line that broke */}
      <path d="M16 38h30" stroke={AMBER} />
      <path d="M11.5 38h1.5" stroke={AMBER} />
      <path d="M16 45h18" opacity="0.3" />
      {/* straight to the team */}
      <path d="M50 52c0 10 8 14 18 14" stroke={AMBER} strokeOpacity="0.45" strokeDasharray="3 3" />
      <path d="M66 58h20a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H66a3 3 0 0 1-3-3v-8a3 3 0 0 1 3-3Z" />
      <path d="M63 66h7l2 3h8l2-3h7" fill="#000" />
    </svg>
  )
}

function RoadmapVoteArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 80" aria-hidden="true" {...strokeProps}>
      <path d="M12 44h72" opacity="0.3" />
      <circle cx="18" cy="44" r="4.5" fill="#000" opacity="0.55" />
      <circle cx="42" cy="44" r="4.5" fill="#000" opacity="0.55" />
      <circle cx="78" cy="44" r="4.5" fill="#000" opacity="0.55" />
      {/* the one you voted */}
      <circle cx="60" cy="44" r="7" fill="#000" stroke={AMBER} />
      <path d="m56.5 44 2.5 2.5 4.5-5" stroke={AMBER} />
      <path d="M60 30v-8" stroke={AMBER} strokeOpacity="0.5" />
      <path d="m56 26 4-4 4 4" stroke={AMBER} strokeOpacity="0.5" />
      <path d="M42 32v-4M18 34v-2M78 33v-3" opacity="0.3" />
      <path d="m64 56 3 12 3-5 5 1z" fill="#000" />
    </svg>
  )
}

function WorkflowArt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 80" aria-hidden="true" {...strokeProps}>
      <rect x="6" y="30" width="26" height="20" rx="4" />
      <path d="M6 36h26" opacity="0.45" />
      <path d="m12 43 3 2.5-3 2.5" opacity="0.5" />
      <path d="M32 40h10c4 0 5-2 6-5 1.5-4 3-6 8-6h6" opacity="0.3" />
      {/* the branch you share */}
      <path d="M32 40h10c4 0 5 2 6 5 1.5 4 3 6 8 6h6" stroke={AMBER} />
      <rect x="62" y="20" width="28" height="18" rx="4" fill="#000" opacity="0.55" />
      <rect x="62" y="20" width="28" height="18" rx="4" opacity="0.55" />
      <path d="M62 26h28" opacity="0.3" />
      <rect x="62" y="42" width="28" height="18" rx="4" fill="#000" stroke={AMBER} />
      <path d="M62 48h28" stroke={AMBER} strokeOpacity="0.45" />
      <path d="m69 54 2.5 2.5 5-5" stroke={AMBER} strokeOpacity="0.8" />
    </svg>
  )
}

function DiscordMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.291.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  )
}

export default function CommunitySection() {
  const t = useTranslations('community')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const items = [
    { Art: SneakPeekArt, key: 'peeks' },
    { Art: BugReportArt, key: 'bugs' },
    { Art: RoadmapVoteArt, key: 'votes' },
    { Art: WorkflowArt, key: 'workflows' },
  ] as const

  return (
    <section ref={sectionRef} id="community" className="relative overflow-hidden bg-black px-6 py-20 md:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/25 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.header
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] text-neon-cyan/80">
            {t('eyebrow')}
          </p>

          <h2 className="heading-lg mt-5 text-balance">
            <span className="text-white">{t('title')} </span>
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/50 md:text-lg">
            {t('subtitle')}
          </p>
        </motion.header>

        {/* One band, not four cards: hairline top/bottom, fading dividers between
            columns (same composition as the hero's CapabilitiesGrid). On mobile the
            columns stack, so the dividers become the horizontal divide-y lines. */}
        <ul className="mt-14 grid grid-cols-1 divide-y divide-white/[0.08] border-y border-white/[0.08] lg:mt-16 lg:grid-cols-4 lg:divide-y-0">
          {items.map(({ Art, key }, index) => (
            <motion.li
              key={key}
              className="group relative px-5 py-9 text-center md:px-7 md:py-10 lg:before:absolute lg:before:inset-y-[16%] lg:before:left-0 lg:before:w-px lg:before:bg-gradient-to-b lg:before:from-transparent lg:before:via-white/[0.09] lg:before:to-transparent lg:before:content-[''] lg:first:before:hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
            >
              <Art className="mx-auto h-24 w-28 text-white/50 transition-colors duration-200 group-hover:text-white/80" />

              <h3 className="mt-5 text-base font-semibold tracking-[-0.02em] text-white">
                {t(`items.${key}.title`)}
              </h3>

              <p className="mx-auto mt-2 max-w-[15rem] text-sm leading-6 text-white/45">
                {t(`items.${key}.description`)}
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.42 }}
        >
          <a
            href="/discord"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.umami?.track('discord_join_home', { placement: 'community_section' })
              }
            }}
            className="inline-flex items-center gap-2.5 rounded-full bg-neon-cyan px-7 py-3.5 text-sm font-semibold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-amber-500 active:translate-y-px"
          >
            <DiscordMark className="h-5 w-5" />
            {t('cta')}
          </a>

          <p className="mt-4 text-xs text-white/30">{t('fine')}</p>
        </motion.div>
      </div>
    </section>
  )
}
