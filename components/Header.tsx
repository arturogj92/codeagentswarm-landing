'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from './LocaleSwitcher'

export default function Header() {
  const t = useTranslations('header')
  const tCommon = useTranslations('common')
  const tBeta = useTranslations('beta.banner')
  const locale = useLocale()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Check if we're on beta page (no banner)
  const isBetaPage = pathname?.includes('/beta')

  // When scrolled, banner hides so header moves to top
  // When not scrolled, header is below banner
  const topOffset = isBetaPage
    ? 'top-0'
    : isScrolled
      ? 'top-0'
      : 'top-7 sm:top-9'

  const navLinks = isBetaPage
    ? [
        { name: 'How to Join', href: '#beta-how-to-join' },
        { name: 'Sign Up', href: '#beta-signup-form' },
        { name: t('pricing'), href: '#beta-pricing' },
        { name: 'FAQ', href: '#beta-faq' },
      ]
    : [
        { name: t('features'), href: '#features' },
        { name: t('pricing'), href: '#pricing' },
        { name: t('faq'), href: '#faq' },
      ]

  // Throttled scroll handler for performance
  useEffect(() => {
    let lastScrollY = 0
    let ticking = false

    const handleScroll = () => {
      lastScrollY = window.scrollY
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 50)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show Join Beta button only when scrolled and not on beta page
  const showBetaButton = isScrolled && !isBetaPage

  return (
    <header
      className={cn(
        'fixed left-0 right-0 z-40 transition-all duration-300',
        topOffset,
        isScrolled
          ? 'py-2 sm:py-3 bg-black/95 border-b border-white/5'
          : 'py-4 sm:py-6 bg-transparent'
      )}
      style={{ willChange: 'background-color', transform: 'translateZ(0)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo - Always links to main landing */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative">
              <Image
                src="/logo.png"
                alt="CodeAgentSwarm Logo"
                width={isScrolled ? 36 : 44}
                height={isScrolled ? 36 : 44}
                className="drop-shadow-lg transition-all duration-300"
                priority
              />
            </div>
            <span className={cn(
              "font-semibold tracking-wide text-white transition-all duration-300",
              isScrolled ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-lg lg:text-xl"
            )}>
              CODEAGENTSWARM
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          className="hidden lg:flex items-center gap-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.umami?.track('nav_section_click', { section: link.name })
                }
              }}
              className="relative px-3 py-2 text-sm text-white/60 hover:text-white transition-colors group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </motion.nav>

        {/* CTA Buttons + Discord + Locale Switcher (Desktop) */}
        <motion.div
          className="hidden lg:flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Join Beta Button - appears when scrolled */}
          <AnimatePresence>
            {showBetaButton && (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                href={`/${locale}/beta`}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.umami?.track('nav_beta_click')
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 text-neutral-400" />
                <span className="text-sm font-medium text-white">{tBeta('cta')}</span>
              </motion.a>
            )}
          </AnimatePresence>

          <a
            href="https://discord.gg/AMxQ7Zh6"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.umami?.track('discord_join_home')
              }
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass border border-white/10 hover:border-[#5865F2]/50 hover:bg-[#5865F2]/10 transition-all duration-300 group"
            title="Join our Discord"
          >
            <svg className="w-5 h-5 text-white/70 group-hover:text-[#5865F2] transition-colors" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors hidden xl:block">Discord</span>
          </a>
          <LocaleSwitcher />
          <a
            href="#download"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.umami?.track('nav_download_header')
              }
            }}
            className="relative group px-5 py-2 rounded-full overflow-hidden bg-white hover:bg-neutral-200 transition-all duration-300"
          >
            <span className="relative text-sm font-semibold text-black">
              {tCommon('downloadFree')}
            </span>
          </a>
        </motion.div>

        {/* Mobile Right Side - Join Beta button + Menu */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Join Beta Button - appears when scrolled */}
          <AnimatePresence>
            {showBetaButton && (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                href={`/${locale}/beta`}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.umami?.track('nav_beta_click_mobile')
                  }
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-white/20 bg-white/5"
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-xs font-medium text-white">Beta</span>
              </motion.a>
            )}
          </AnimatePresence>

          <button
            className="p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => {
              const newState = !isMobileMenuOpen
              setIsMobileMenuOpen(newState)
              if (newState && typeof window !== 'undefined') {
                window.umami?.track('mobile_menu_open')
              }
            }}
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
              {/* Join Beta link in mobile menu when not on beta page */}
              {!isBetaPage && (
                <a
                  href={`/${locale}/beta`}
                  className="flex items-center gap-2 text-lg font-medium py-2 text-white"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    if (typeof window !== 'undefined') {
                      window.umami?.track('nav_beta_click_mobile_menu')
                    }
                  }}
                >
                  <Sparkles className="w-5 h-5 text-neutral-400" />
                  {tBeta('cta')}
                </a>
              )}

              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-lg text-white/70 hover:text-white transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault()
                    setIsMobileMenuOpen(false)
                    // Scroll after menu closes
                    setTimeout(() => {
                      const targetId = link.href.replace('#', '')
                      const element = document.getElementById(targetId)
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' })
                      }
                    }, 100)
                  }}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="https://discord.gg/AMxQ7Zh6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-lg text-white/70 hover:text-[#5865F2] transition-colors py-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Discord
              </a>
              {/* Language Switcher in Mobile Menu */}
              <div className="py-2">
                <LocaleSwitcher />
              </div>
              <a
                href="#download"
                className="mt-4 py-3 px-6 text-center text-black font-semibold rounded-full bg-white hover:bg-neutral-200 transition-colors"
                onClick={(e) => {
                  e.preventDefault()
                  setIsMobileMenuOpen(false)
                  setTimeout(() => {
                    const element = document.getElementById('download')
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' })
                    }
                  }, 100)
                }}
              >
                {tCommon('downloadFree')}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
