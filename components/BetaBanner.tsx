'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Sparkles } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

export default function BetaBanner() {
  const t = useTranslations('beta.banner')
  const locale = useLocale()
  const pathname = usePathname()
  const [isHidden, setIsHidden] = useState(false)

  // Hide banner on scroll
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsHidden(window.scrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Don't show banner on beta page
  if (pathname?.includes('/beta')) {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: isHidden ? 0 : 1,
        y: isHidden ? -40 : 0
      }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#667eea] to-[#764ba2]"
      style={{ pointerEvents: isHidden ? 'none' : 'auto' }}
    >
      <div className="max-w-7xl mx-auto px-1.5 sm:px-4 py-1 sm:py-1.5 flex items-center justify-center gap-1 sm:gap-2">
        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-white flex-shrink-0 hidden xs:block" />
        <span className="text-white font-medium text-[10px] sm:text-sm">
          {t('text')}
        </span>
        <a
          href={`/${locale}/beta`}
          onClick={() => {
            if (typeof window !== 'undefined') {
              window.umami?.track('beta_banner_click')
            }
          }}
          className="px-2 sm:px-4 py-0.5 sm:py-1.5 bg-white text-[#667eea] font-semibold rounded-full text-[10px] sm:text-sm hover:bg-white/90 transition-colors whitespace-nowrap flex-shrink-0"
        >
          {t('cta')}
        </a>
      </div>
    </motion.div>
  )
}
