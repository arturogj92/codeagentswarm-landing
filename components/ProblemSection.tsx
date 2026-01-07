'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { AlertTriangle, RefreshCw, Brain, Eye, MessageSquare, X, Check, Calculator, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Time Saved Calculator
function TimeSavedCalculator() {
  const t = useTranslations('problem.calculator')
  const [terminals, setTerminals] = useState(4)

  const minPerTerminal = 40
  const timeWith1Terminal = terminals * minPerTerminal
  const timeWith6Terminals = Math.round(timeWith1Terminal / 8) // 8x faster with 6 terminals
  const timeSavedPerDay = timeWith1Terminal - timeWith6Terminals
  const hoursSavedPerMonth = Math.round((timeSavedPerDay * 22) / 60)
  const daysSavedPerMonth = Math.round(hoursSavedPerMonth / 8)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mt-10 max-w-md mx-auto px-4"
    >
      {/* Card Container */}
      <div className="p-6 rounded-2xl border border-white/[0.08] bg-white/[0.02]">
        {/* Header */}
        <div className="mb-6">
          <p className="text-white/30 text-xs uppercase tracking-wider text-center">
            {t('title')}
          </p>
        </div>

        {/* Question */}
        <p className="text-white/70 text-center mb-6">
          {t('question')}
        </p>

        {/* Terminal Selector - Pills */}
        <div className="flex justify-center gap-1.5 mb-8">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => setTerminals(num)}
              className={`w-10 h-10 rounded-full text-sm font-medium transition-all duration-200 ${
                terminals === num
                  ? 'bg-white text-black scale-105'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        {/* The Big Number */}
        <div className="text-center mb-2">
          <motion.span
            key={timeSavedPerDay}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-7xl font-display font-bold text-white inline-block"
          >
            {timeSavedPerDay}
          </motion.span>
          <span className="text-2xl text-white/25 ml-1">{t('minutes')}</span>
        </div>

        <p className="text-white/40 text-center text-sm mb-2">
          {t('youSave')} <span className="text-white/60">{t('perDay')}</span>
        </p>

        {/* CodeAgentSwarm branding */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Image
            src="/logo.png"
            alt="CodeAgentSwarm"
            width={20}
            height={20}
            className="rounded"
          />
          <span className="text-white/50 text-sm">{t('withCodeAgentSwarm')}</span>
        </div>

        {/* Secondary Stats */}
        <div className="flex justify-center gap-6 mb-6 text-center">
          <div>
            <p className="text-xl font-semibold text-white/60">{hoursSavedPerMonth}h</p>
            <p className="text-[10px] text-white/25 uppercase">{t('perMonth')}</p>
          </div>
          <div className="w-px bg-white/10" />
          <div>
            <p className="text-xl font-semibold text-white/60">{daysSavedPerMonth}d</p>
            <p className="text-[10px] text-white/25 uppercase">{t('perMonth')}</p>
          </div>
        </div>

        {/* Comparison */}
        <div className="flex items-center justify-center gap-3 text-xs text-white/30 mb-6">
          <span>{timeWith1Terminal} min</span>
          <span className="text-white/20">→</span>
          <span className="text-white/60">{timeWith6Terminals} min</span>
        </div>

        {/* CTA */}
        <a href="#download" className="block">
          <button className="w-full py-3 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
            {t('cta')}
          </button>
        </a>
      </div>
    </motion.div>
  )
}

// Visual Comparison - Sin/Con CodeAgentSwarm - DRAMATIC CONTRAST
function VisualComparison() {
  const t = useTranslations('problem.chaos')

  const painPoints = [
    { icon: RefreshCw, text: t('pain1') },
    { icon: AlertTriangle, text: t('pain2') },
    { icon: Brain, text: t('pain3') },
  ]

  const benefits = [
    { icon: Check, text: t('benefit1') },
    { icon: Check, text: t('benefit2') },
    { icon: Check, text: t('benefit3') },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="mt-20 relative"
    >
      {/* Main Comparison Container */}
      <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-950">

        {/* Central Divider with Arrow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-2">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500/20 to-emerald-500/20 border-2 border-white/30 flex items-center justify-center shadow-2xl backdrop-blur-sm"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          {/* LEFT SIDE - CHAOS (Red/Orange tones) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative p-6 lg:p-10 lg:pr-8 overflow-hidden"
          >
            {/* Red background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/5 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center gap-4 mb-5">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: 'spring' }}
                className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <X className="w-6 h-6 text-red-400" />
                </motion.div>
              </motion.div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {t('oldWay')}
                </h3>
                <p className="text-red-400/80 text-sm font-medium">{t('switchingFatigue')} {t('costingHours')}</p>
              </div>
            </div>

            {/* Pain Points List */}
            <div className="relative space-y-2 mb-5">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <point.icon className="w-3 h-3 text-red-400" />
                  </div>
                  <span className="text-neutral-400">{point.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Chaos Image Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="relative group"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border-2 border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.15)]">
                <Image
                  src="/images/chaos-multitask.png"
                  alt="Multitasking chaos - switching between apps"
                  fill
                  className="object-contain opacity-90"
                  priority
                />
                {/* Red overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-red-900/10 to-transparent" />
                {/* Stress lines overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(239,68,68,0.03)_49%,rgba(239,68,68,0.03)_51%,transparent_52%)] bg-[length:8px_8px]" />
              </div>
              {/* Frustration badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full backdrop-blur-sm"
              >
                <span className="text-red-300 text-xs font-medium">{t('chaosLabel')}</span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Vertical Divider Line - Gradient from red to green */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-red-500/30 via-white/20 to-emerald-500/30" />

          {/* RIGHT SIDE - SOLUTION (Green/Cyan tones) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative p-6 lg:p-10 lg:pl-8 overflow-hidden"
          >
            {/* Green background glow */}
            <div className="absolute inset-0 bg-gradient-to-bl from-emerald-500/10 via-transparent to-cyan-500/5 pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center gap-4 mb-5">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: 'spring' }}
                className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.2)]"
              >
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Check className="w-6 h-6 text-emerald-400" />
                </motion.div>
              </motion.div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-white">
                  {t('newWay')}
                </h3>
                <p className="text-emerald-400/80 text-sm font-medium">{t('allVisible')} - {t('sixTerminals')}</p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="relative space-y-2 mb-5">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-3 text-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-neutral-300">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CodeAgentSwarm Image Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="relative group"
            >
              {/* Glow effect behind image */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />

              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black border-2 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.2)] hover:shadow-[0_0_50px_rgba(16,185,129,0.3)] transition-shadow">
                <Image
                  src="/images/codeagentswarm-6terminals.jpeg"
                  alt="CodeAgentSwarm - 6 terminales en paralelo"
                  fill
                  className="object-contain"
                  priority
                />
                {/* Success overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 via-transparent to-transparent" />
              </div>
              {/* Success badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1 }}
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-emerald-500/20 border border-emerald-500/30 rounded-full backdrop-blur-sm"
              >
                <span className="text-emerald-300 text-xs font-medium">{t('controlLabel')}</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile Arrow (between sections on mobile) */}
        <div className="lg:hidden flex justify-center -mt-4 mb-6">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: 'spring' }}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500/20 to-emerald-500/20 border border-white/20 flex items-center justify-center rotate-90"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </motion.div>
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
      <div className="absolute inset-0 bg-black" />

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
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-neutral-900 border border-white/10"
          >
            <AlertTriangle className="w-4 h-4 text-neutral-400" />
            <span className="text-sm text-neutral-400">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>{' '}
            <span className="text-neutral-500">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
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
              className="flex items-start gap-4 p-4 rounded-xl border border-white/10 bg-neutral-950 hover:border-white/20 transition-colors"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                <point.icon className="w-5 h-5 text-neutral-500" />
              </div>
              <p className="text-neutral-400 leading-relaxed pt-2">
                {point.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Visual Comparison */}
        <VisualComparison />

        {/* Time Saved Calculator */}
        <TimeSavedCalculator />
      </div>
    </section>
  )
}
