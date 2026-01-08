'use client'

import { motion } from 'framer-motion'
import { Sparkles, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function BetaHeroSection() {
  const t = useTranslations('beta.hero')

  const scrollToForm = () => {
    if (typeof window !== 'undefined') {
      window.umami?.track('beta_cta_click')
    }
    const formElement = document.getElementById('beta-signup-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const scrollToFeatures = () => {
    const featuresElement = document.getElementById('features')
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-6 md:pt-32 md:pb-20">
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
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-cyan/20">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-white/80">Open Beta</span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-neon-cyan/20 text-neon-cyan rounded-full">
              FREE PRO
            </span>
          </div>
        </motion.div>

        {/* Main Heading - White with gradient only on key words */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5">
            <span className="text-white">{t('headline').split('Open Beta')[0]}</span>
            <span className="gradient-text">Open Beta</span>
          </h1>

          <p className="text-lg md:text-xl text-white/85 max-w-[720px] mx-auto leading-relaxed mb-4">
            {t('subheadline')}
          </p>

          {/* Microcopy */}
          <p className="text-sm text-white/50 max-w-[720px] mx-auto">
            {t('microcopy')}
          </p>
        </motion.div>

        {/* Product Image with modern effects */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative w-full max-w-[900px] mx-auto my-10 md:my-12"
        >
          <div
            className="relative rounded-[18px] overflow-hidden"
            style={{
              filter: 'drop-shadow(0px 25px 50px rgba(0,0,0,0.45))',
              border: '1px solid rgba(255,255,255,0.12)',
              boxShadow: '0 0 50px rgba(128, 90, 213, 0.20)',
            }}
          >
            <Image
              src="/images/guides/multi-terminal.png"
              alt="CodeAgentSwarm - Multiple AI Agents Interface"
              width={1800}
              height={1100}
              className="w-full h-auto"
              priority
            />
            {/* Glass reflection overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                borderRadius: 'inherit',
                background: 'linear-gradient(120deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.05) 55%, rgba(0,0,0,0) 100%)',
                mixBlendMode: 'overlay',
                opacity: 0.4,
              }}
            />
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
        >
          {/* Primary CTA */}
          <button
            onClick={scrollToForm}
            className="group relative"
          >
            <div className="absolute -inset-0.5 rounded-full blur-sm opacity-30 group-hover:opacity-70 transition-opacity bg-neon-cyan" />
            <div className="relative flex items-center gap-2 px-8 py-4 text-black font-bold rounded-full transition-all bg-neon-cyan hover:bg-cyan-400 hover:scale-105">
              <Sparkles className="w-5 h-5" />
              {t('primaryCta')}
            </div>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={scrollToFeatures}
            className="group flex items-center gap-2 px-6 py-4 text-white/70 hover:text-white font-medium transition-colors"
          >
            {t('secondaryCta')}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
