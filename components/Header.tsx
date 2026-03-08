'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import LocaleSwitcher from './LocaleSwitcher'
import LogoText from './LogoText'

export default function Header() {
  const t = useTranslations('header')
  const tCommon = useTranslations('common')
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
                src="/isotipo.png"
                alt="CodeAgentSwarm Logo"
                width={isScrolled ? 32 : 38}
                height={isScrolled ? 32 : 38}
                className="drop-shadow-lg transition-all duration-300"
                priority
              />
            </div>
            <LogoText className={cn(
              "transition-all duration-300",
              isScrolled ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-lg lg:text-xl"
            )} />
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

        {/* CTA Buttons + Contact + Locale Switcher (Desktop) */}
        <motion.div
          className="hidden lg:flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a
            href="mailto:hello@codeagentswarm.com"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.umami?.track('contact_email_header')
              }
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-full glass border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300 group"
            title="Contact us"
          >
            <svg className="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors hidden xl:block">Contact</span>
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

        {/* Mobile Right Side - Menu */}
        <div className="flex lg:hidden items-center gap-2">
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
                href="mailto:hello@codeagentswarm.com"
                className="flex items-center gap-3 text-lg text-white/70 hover:text-neon-cyan transition-colors py-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                hello@codeagentswarm.com
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
