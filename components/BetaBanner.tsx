'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BetaBanner() {
  const t = useTranslations('beta.banner')
  const locale = useLocale()
  const pathname = usePathname()

  // Don't show banner on beta page
  if (pathname?.includes('/beta')) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-neon-purple via-neon-magenta to-neon-cyan"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-center gap-3 text-center flex-wrap">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-white" />
          <span className="text-white font-medium text-sm">
            {t('text')}
          </span>
        </div>
        <a
          href={`/${locale}/beta`}
          className="px-4 py-1.5 bg-white text-neon-purple font-semibold rounded-full text-sm hover:bg-white/90 transition-colors"
        >
          {t('cta')}
        </a>
      </div>
    </motion.div>
  )
}
