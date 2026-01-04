'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MessageCircle, MousePointerClick, Sparkles, HelpCircle, Terminal, Check, Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Killer Skill Demo Component
function KillerSkillDemo() {
  const t = useTranslations('swarmi.killerDemo')
  const [stage, setStage] = useState(0) // 0: idle, 1: typing, 2: executing, 3: complete
  const [typedText, setTypedText] = useState('')
  const fullPrompt = t('prompt')

  useEffect(() => {
    if (stage === 1) {
      // Typing animation
      let i = 0
      const typingInterval = setInterval(() => {
        if (i < fullPrompt.length) {
          setTypedText(fullPrompt.slice(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => setStage(2), 500)
        }
      }, 50)
      return () => clearInterval(typingInterval)
    } else if (stage === 2) {
      // Executing animation
      setTimeout(() => setStage(3), 1500)
    } else if (stage === 3) {
      // Reset after showing result
      setTimeout(() => {
        setStage(0)
        setTypedText('')
      }, 4000)
    }
  }, [stage, fullPrompt])

  const startDemo = () => {
    if (stage === 0) {
      setStage(1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-12 max-w-3xl mx-auto"
    >
      {/* Demo container */}
      <div className="relative rounded-2xl overflow-hidden bg-dark-900 border border-amber-500/20">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-orange-500/10" />

        <div className="relative p-6">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <span className="text-white/40 text-sm ml-2">Swarmi Command</span>
          </div>

          {/* Command Input */}
          <div className="bg-black/40 rounded-xl p-4 mb-4">
            <div className="flex items-start gap-3">
              <span className="text-amber-400 font-mono">❯</span>
              <div className="flex-1">
                <p className="text-white font-mono text-sm">
                  {stage === 0 ? (
                    <span className="text-white/40">{t('prompt')}</span>
                  ) : (
                    <>
                      {typedText}
                      {stage === 1 && <span className="animate-pulse">|</span>}
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Terminal Grid Visualization */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <motion.div
                key={num}
                className={`p-3 rounded-lg border transition-all duration-300 ${
                  stage >= 2
                    ? stage === 3
                      ? 'border-green-500/50 bg-green-500/10'
                      : 'border-amber-500/50 bg-amber-500/10'
                    : 'border-white/10 bg-white/5'
                }`}
                animate={stage === 2 ? { scale: [1, 1.05, 1] } : {}}
                transition={{ delay: num * 0.1, duration: 0.3 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-white/50" />
                    <span className="text-xs text-white/60">T{num}</span>
                  </div>
                  {stage === 3 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: num * 0.1 }}
                    >
                      <Check className="w-4 h-4 text-green-400" />
                    </motion.div>
                  )}
                  {stage === 2 && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Result */}
          {stage === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-500/10 border border-green-500/30 rounded-lg p-4"
            >
              <p className="text-green-400 font-mono text-sm">{t('result')}</p>
            </motion.div>
          )}

          {/* Run Demo Button */}
          {stage === 0 && (
            <button
              onClick={startDemo}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              Run Demo
            </button>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-center text-white/40 text-sm mt-4">{t('description')}</p>
    </motion.div>
  )
}

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
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[120px]" />

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
          {/* Swarmi Character */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center"
          >
            {/* Glow behind Swarmi */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[300px] h-[300px] bg-gradient-radial from-amber-500/30 via-orange-500/10 to-transparent blur-2xl animate-pulse" />
            </div>

            {/* Swarmi Image */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10"
            >
              <Image
                src="/swarmi.png"
                alt="Swarmi - Your AI Assistant"
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

        {/* Killer Skill Demo */}
        <KillerSkillDemo />

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
