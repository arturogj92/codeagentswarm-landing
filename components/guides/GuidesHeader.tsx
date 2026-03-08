'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from '../LocaleSwitcher'
import LogoText from '../LogoText'

export default function GuidesHeader() {
  const tCommon = useTranslations('common')
  const tBeta = useTranslations('beta.banner')
  const locale = useLocale()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-40 py-3 bg-black/95 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="relative">
              <Image
                src="/isotipo.png"
                alt="CodeAgentSwarm Logo"
                width={32}
                height={32}
                className="drop-shadow-lg"
                priority
              />
            </div>
            <LogoText className="text-sm sm:text-base lg:text-lg" />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden lg:flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Join Beta Button */}
          <a
            href={`/${locale}/beta`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 text-neutral-400" />
            <span className="text-sm font-medium text-white">{tBeta('cta')}</span>
          </a>

          {/* Contact */}
          <a
            href="mailto:hello@codeagentswarm.com"
            className="flex items-center gap-2 px-3 py-2 rounded-full glass border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300 group"
            title="Contact us"
          >
            <svg
              className="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors hidden xl:block">
              Contact
            </span>
          </a>

          {/* Locale Switcher */}
          <LocaleSwitcher />

          {/* Download Free */}
          <Link
            href="/#download"
            className="relative group px-5 py-2 rounded-full bg-white hover:bg-neutral-200 transition-all duration-300"
          >
            <span className="relative text-sm font-semibold text-black">
              {tCommon('downloadFree')}
            </span>
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            className="p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black border-t border-white/5"
          >
            <nav className="flex flex-col p-6 gap-4">
              {/* Join Beta */}
              <a
                href={`/${locale}/beta`}
                className="flex items-center gap-2 text-lg font-medium py-2 text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Sparkles className="w-5 h-5 text-neutral-400" />
                {tBeta('cta')}
              </a>

              {/* Contact */}
              <a
                href="mailto:hello@codeagentswarm.com"
                className="flex items-center gap-3 text-lg text-white/70 hover:text-neon-cyan transition-colors py-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                hello@codeagentswarm.com
              </a>

              {/* Language Switcher */}
              <div className="py-2">
                <LocaleSwitcher />
              </div>

              {/* Download Free */}
              <Link
                href="/#download"
                className="mt-4 py-3 px-6 text-center text-black font-semibold rounded-full bg-white hover:bg-neutral-200 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {tCommon('downloadFree')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
