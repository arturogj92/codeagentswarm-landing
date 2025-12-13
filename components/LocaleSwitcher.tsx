'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { Globe } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LocaleSwitcher() {
  const t = useTranslations('localeSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLocaleChange = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  const localeNames: Record<Locale, string> = {
    en: 'EN',
    es: 'ES',
  }

  const localeFullNames: Record<Locale, string> = {
    en: t('en'),
    es: t('es'),
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass border border-white/10 hover:border-neon-cyan/30 transition-all text-sm text-white/70 hover:text-white"
        aria-label={t('label')}
      >
        <Globe className="w-4 h-4" />
        <span className="font-medium">{localeNames[locale as Locale]}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 lg:left-auto lg:right-0 mt-2 w-36 rounded-xl glass border border-white/10 shadow-xl overflow-hidden z-50"
          >
            {routing.locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`w-full px-4 py-2.5 text-left text-sm transition-colors flex items-center justify-between ${
                  locale === loc
                    ? 'bg-neon-cyan/10 text-neon-cyan'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span>{localeFullNames[loc]}</span>
                {locale === loc && (
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
