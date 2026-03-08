'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import LogoText from './LogoText'

// Email icon
const EmailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
)

const socialLinks = [
  { name: 'Email', icon: EmailIcon, href: 'mailto:hello@codeagentswarm.com' },
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
