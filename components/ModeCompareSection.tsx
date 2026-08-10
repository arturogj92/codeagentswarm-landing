'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

/**
 * Same reasoning as the simulator: the comparison pulls in the app's chat
 * stylesheet, so it is loaded on demand rather than shipped to everyone who
 * lands on the page.
 */
const ModeCompare = dynamic(() => import('./demo/ModeCompare'), {
  ssr: false,
  loading: () => <div className="h-[420px] rounded-2xl border border-white/5 bg-white/[0.02]" />,
})

/**
 * Below this the terminal half stops fitting: it is real CLI output at a fixed
 * character width, and on a phone the wipe shows two mutually truncated
 * columns instead of one conversation in two skins. Tablets and up keep it.
 */
const WIDE_QUERY = '(min-width: 768px)'

export default function ModeCompareSection() {
  const t = useTranslations('modeCompare')

  // Same matchMedia gate as the simulator: a CSS `hidden` wrapper would still
  // mount the comparison and download the chat stylesheet on phones.
  const [isWide, setIsWide] = useState<boolean | null>(null)
  useEffect(() => {
    const query = window.matchMedia(WIDE_QUERY)
    const sync = () => setIsWide(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  if (isWide !== true) return null

  return (
    <section id="chat-vs-terminal" className="relative py-20 md:py-28 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20 mb-6">
            {t('badge')}
          </span>
          <h2 className="heading-lg mb-4 text-white">{t('title')}</h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ModeCompare
            chatLabel={t('chatLabel')}
            terminalLabel={t('terminalLabel')}
            hint={t('hint')}
            ariaLabel={t('ariaLabel')}
          />
        </motion.div>

        <p className="text-center text-white/45 text-sm mt-6 max-w-xl mx-auto">{t('footnote')}</p>
      </div>
    </section>
  )
}
