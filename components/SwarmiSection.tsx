'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MessageCircle, MousePointerClick, Sparkles, HelpCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function SwarmiSection() {
  const t = useTranslations('swarmi')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const features = [
    {
      icon: MessageCircle,
      title: t('features.chat.title'),
      description: t('features.chat.description'),
    },
    {
      icon: MousePointerClick,
      title: t('features.inspector.title'),
      description: t('features.inspector.description'),
    },
    {
      icon: HelpCircle,
      title: t('features.onboarding.title'),
      description: t('features.onboarding.description'),
    },
    {
      icon: Sparkles,
      title: t('features.context.title'),
      description: t('features.context.description'),
    },
  ]

  return (
    <section
      id="swarmi"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-amber-500/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-neutral-700/10 rounded-full blur-[120px]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-16"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm text-amber-400 font-medium tracking-wider uppercase mb-4"
          >
            {t('badge')}
          </motion.span>

          <h2 className="heading-lg mb-6">
            <span className="text-white">{t('titleLine1')}</span>{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Onboarding Agent Logo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Glow behind logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] bg-gradient-radial from-amber-500/30 via-orange-500/10 to-transparent blur-2xl animate-pulse" />
            </div>

            {/* Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src="/isotipo.png"
                alt="CodeAgentSwarm Onboarding Agent"
                width={280}
                height={280}
                className="drop-shadow-2xl w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[280px] md:h-[280px]"
              />
            </motion.div>

            {/* Speech Bubble */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute top-4 right-0 lg:right-8 bg-white/10 backdrop-blur-md rounded-2xl rounded-bl-none px-4 py-3 border border-white/20"
            >
              <p className="text-white text-sm font-medium">{t('speechBubble')}</p>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group p-4 sm:p-6 rounded-xl bg-[#0a0a0f] border border-white/10 hover:border-amber-500/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-8 md:mt-16"
        >
          <p className="text-white/40 text-sm">
            {t('cta')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
