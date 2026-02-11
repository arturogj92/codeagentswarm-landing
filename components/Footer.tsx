'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import LogoText from './LogoText'

// Discord icon
const DiscordIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)

const socialLinks = [
  { name: 'Discord', icon: DiscordIcon, href: 'https://discord.gg/AMxQ7Zh6' },
]

export default function Footer() {
  const t = useTranslations('footer')
  const tBeta = useTranslations('beta')
  const pathname = usePathname()
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  const isBetaPage = pathname?.includes('/beta')
  const guidesHref = locale === 'es' ? '/es/guias' : '/en/guides'

  // Different links for beta page vs main landing
  const footerLinks = {
    product: isBetaPage
      ? [
          { name: 'Features', href: '#beta-what-is' },
          { name: 'How to Join', href: '#beta-how-to-join' },
          { name: 'FAQ', href: '#beta-faq' },
          { name: t('links.guides'), href: guidesHref },
        ]
      : [
          { name: t('links.features'), href: '#features' },
          { name: t('links.pricing'), href: '#pricing' },
          { name: t('links.roadmap'), href: '#roadmap' },
          { name: t('links.faq'), href: '#faq' },
          { name: t('links.download'), href: '#download' },
          { name: t('links.guides'), href: guidesHref },
        ],
    company: [
      { name: t('links.about'), href: '#' },
      { name: t('links.contact'), href: '/contact' },
      { name: t('links.privacy'), href: '/privacy' },
      { name: t('links.terms'), href: '/terms' },
    ],
  }

  return (
    <footer className="relative border-t border-white/5">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 to-black" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/"
                className="flex items-center gap-3 mb-6 group"
              >
                <div className="relative">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <Image
                      src="/isotipo.png"
                      alt="CodeAgentSwarm Logo"
                      width={36}
                      height={36}
                    />
                  </div>
                </div>
                <LogoText className="text-xl" />
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-white/50 leading-relaxed mb-6 max-w-sm"
            >
              {t('description')}
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg glass border border-white/5 flex items-center justify-center text-white/50 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
                  aria-label={social.name}
                >
                  <social.icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-white font-display font-medium mb-4">
              {t('product')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white font-display font-medium mb-4">
              {t('company')}
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-sm">
            &copy; {currentYear} {t('copyright')}
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            {t('madeWith')} <Heart className="w-4 h-4 text-red-500" /> {t('forDevelopers')}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
