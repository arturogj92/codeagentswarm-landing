'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { AlertTriangle, RefreshCw, Brain, Eye, MessageSquare, X, Check, Calculator, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

// Context Switching Calculator
function ContextCalculator() {
  const t = useTranslations('problem.calculator')
  const [switches, setSwitches] = useState(15)

  // Research shows each context switch costs 23 minutes on average
  // Conservative estimate: 2-3 minutes per switch for developers
  const minutesLost = switches * 2.5
  const hoursPerMonth = Math.round((minutesLost * 22) / 60) // 22 work days

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-12 p-6 rounded-2xl glass border border-amber-500/20 max-w-md mx-auto"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-amber-400" />
        </div>
        <h3 className="text-lg font-semibold text-white">{t('title')}</h3>
      </div>

      <p className="text-sm text-white/60 mb-4">{t('question')}</p>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="range"
          min="5"
          max="50"
          value={switches}
          onChange={(e) => setSwitches(parseInt(e.target.value))}
          className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-amber-500/30"
        />
        <span className="text-2xl font-bold text-amber-400 min-w-[3ch] text-right">{switches}</span>
      </div>

      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
        <p className="text-red-400 text-sm">
          {t('result')
            .replace('{minutes}', Math.round(minutesLost).toString())
            .replace('{hours}', hoursPerMonth.toString())
          }
        </p>
      </div>

      <a href="#download" className="mt-4 block">
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm hover:scale-[1.02] transition-transform">
          {t('cta')}
        </button>
      </a>
    </motion.div>
  )
}

// Terminal Chaos Comparison
function ChaosComparison() {
  const t = useTranslations('problem.chaos')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {/* The Old Way - Chaos */}
      <div className="relative p-6 rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-950/20 to-transparent overflow-hidden">
        {/* Chaos visual representation */}
        <div className="absolute top-4 right-4 flex gap-1 opacity-40">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-6 rounded border border-red-500/50 bg-red-950/30"
              style={{
                transform: `rotate(${(Math.random() - 0.5) * 20}deg) translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`,
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <X className="w-6 h-6 text-red-400" />
          <h3 className="text-xl font-bold text-red-400">{t('oldWay')}</h3>
        </div>

        <p className="text-white/60 mb-4">{t('oldWayDesc')}</p>

        {/* Visual chaos elements */}
        <div className="grid grid-cols-3 gap-2 opacity-60">
          {['iTerm', 'VS Code', 'Chrome', 'Slack', 'iTerm 2', 'Finder'].map((app, i) => (
            <div
              key={i}
              className="py-2 px-3 text-xs rounded border border-red-500/30 bg-red-950/30 text-red-300/60 text-center truncate"
            >
              {app}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-red-400/70 text-sm">
          <RefreshCw className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
          <span>Constantly switching...</span>
        </div>
      </div>

      {/* The Swarm Way - Order */}
      <div className="relative p-6 rounded-2xl border border-neon-cyan/30 bg-gradient-to-br from-neon-cyan/5 to-transparent overflow-hidden">
        {/* Organized terminals visual */}
        <div className="absolute top-4 right-4 grid grid-cols-3 gap-1 opacity-40">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="w-6 h-4 rounded border border-neon-cyan/50 bg-neon-cyan/10"
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Check className="w-6 h-6 text-neon-cyan" />
          <h3 className="text-xl font-bold text-neon-cyan">{t('newWay')}</h3>
        </div>

        <p className="text-white/60 mb-4">{t('newWayDesc')}</p>

        {/* Visual organized grid */}
        <div className="grid grid-cols-3 gap-2">
          {['Frontend', 'Backend', 'Tests', 'Docs', 'Deploy', 'Review'].map((task, i) => (
            <div
              key={i}
              className="py-2 px-3 text-xs rounded border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan/80 text-center truncate"
            >
              {task}
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-2 text-neon-cyan/70 text-sm">
          <ArrowRight className="w-4 h-4" />
          <span>All visible at once</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProblemSection() {
  const t = useTranslations('problem')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const painPoints = [
    {
      icon: RefreshCw,
      text: t('painPoints.switching'),
    },
    {
      icon: Eye,
      text: t('painPoints.noView'),
    },
    {
      icon: MessageSquare,
      text: t('painPoints.repeating'),
    },
    {
      icon: Brain,
      text: t('painPoints.confidence'),
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/5 to-black" />

      {/* Subtle red glow for "problem" feel */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-red-500/20"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm text-white/70">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="text-red-400/80">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        {/* Pain Points */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:border-red-500/20 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-red-400/70" />
              </div>
              <p className="text-white/60 leading-relaxed pt-2">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Chaos Comparison */}
        <ChaosComparison />

        {/* Context Calculator */}
        <ContextCalculator />
      </div>
    </section>
  )
}
