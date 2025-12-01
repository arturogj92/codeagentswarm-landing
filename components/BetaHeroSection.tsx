'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BetaHeroSection() {
  const t = useTranslations('beta.hero')
  const tCommon = useTranslations('common')

  const scrollToForm = () => {
    const formElement = document.getElementById('beta-signup-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-cyan/20">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-white/80">Open Beta</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-neon-cyan/20 text-neon-cyan rounded-full">
              FREE PRO
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <h1 className="heading-xl mb-6">
            <span className="gradient-text">{t('headline')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-4">
            {t('subheadline')}
          </p>

          <p className="text-lg text-neon-cyan/90 max-w-3xl mx-auto leading-relaxed font-medium">
            {t('valueLine')}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <button
            onClick={scrollToForm}
            className="group relative"
          >
            <div className="absolute -inset-1 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
            <div className="relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <Sparkles className="w-5 h-5" />
              {t('primaryCta')}
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  )
}
