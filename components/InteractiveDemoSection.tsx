'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import DemoBooting from './demo/DemoBooting'
import MacFrame from './demo/MacFrame'
import { TERMINAL_COUNT } from './demo/script'
import DemoDownloadLink from './demo/DemoDownloadLink'
import { useTranslations } from 'next-intl'
import { Download } from 'lucide-react'

/**
 * The demo is loaded on the client only and out of the main bundle: it pulls in
 * xterm, and nobody should pay for that until they have scrolled this far.
 */
const DemoApp = dynamic(() => import('./demo/DemoApp'), {
  ssr: false,
  loading: () => <DemoBooting variant="embedded" label="Loading CodeAgentSwarm..." />,
})

/** Below this the two-pane workspace has nowhere to go. */
const DESKTOP_QUERY = '(min-width: 1024px)'

export default function InteractiveDemoSection() {
  const t = useTranslations('interactiveDemo')

  /**
   * Desktop only, decided with matchMedia rather than with CSS.
   *
   * A `hidden lg:block` wrapper would still MOUNT the demo on a phone, and
   * mounting is what downloads xterm. Deciding in JS means phone visitors never
   * fetch a line of it, which is the whole point of leaving them out: they were
   * never going to install a desktop app from there anyway.
   */
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null)
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY)
    const sync = () => setIsDesktop(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  // Null on the server and on the first client pass, so the markup matches;
  // false on a phone, where the section does not exist at all.
  if (isDesktop !== true) return null

  return (
    <section id="demo" className="relative py-20 md:py-28 px-6 overflow-hidden">
      {/* Wider than a text section, because the machine now spends 14% of its
          width on the aluminium sticking out past the lid. Keeping the column
          at 5xl would have paid for the silhouette with the app's own width. */}
      <div className="max-w-6xl mx-auto relative z-10">
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
          {/* The count comes from the script, never typed into the copy: the old
              caption claimed six agents while the script opened eight. */}
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {t('subtitle', { count: TERMINAL_COUNT })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <MacFrame>
            <DemoApp variant="embedded" />
          </MacFrame>
        </motion.div>

        {/* One button, and it is the download. The "open the full demo" link
            next to it sent people to a second copy of what they were already
            looking at, which is a detour away from the only action this section
            exists to produce. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <DemoDownloadLink
            position="section"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neon-cyan text-black font-semibold hover:opacity-90 transition-opacity"
          >
            <Download className="w-4 h-4" />
            {t('download')}
          </DemoDownloadLink>
        </div>
      </div>
    </section>
  )
}
