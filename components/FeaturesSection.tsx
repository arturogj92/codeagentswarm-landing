'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Layout,
  GitBranch,
  Package,
  Sparkles,
  Shield,
  Bell,
  Terminal,
  Layers,
  Keyboard,
  History,
  Zap,
  Globe,
  Eye,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

function FeatureCard({
  feature,
  index,
}: {
  feature: { icon: any; title: string; description: string }
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
    >
      <div className="relative h-full rounded-xl border border-white/10 bg-[#0a0a0f] hover:border-white/20 hover:bg-[#0f0f15] transition-all duration-300 p-6">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 group-hover:bg-neon-purple/10 transition-all duration-300">
          <feature.icon className="w-5 h-5 text-white/70 group-hover:text-neon-cyan transition-colors duration-300" strokeWidth={1.5} />
        </div>

        {/* Text */}
        <h3 className="text-base font-medium text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-sm text-white/40 leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function FeaturesSection() {
  const t = useTranslations('features')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const features = [
    {
      icon: Layout,
      title: t('items.multiTerminal.title'),
      description: t('items.multiTerminal.description'),
    },
    {
      icon: Eye,
      title: t('items.visibility.title'),
      description: t('items.visibility.description'),
    },
    {
      icon: GitBranch,
      title: t('items.codeControl.title'),
      description: t('items.codeControl.description'),
    },
    {
      icon: Sparkles,
      title: t('items.taskWorkflow.title'),
      description: t('items.taskWorkflow.description'),
    },
    {
      icon: Shield,
      title: t('items.permissions.title'),
      description: t('items.permissions.description'),
    },
    {
      icon: History,
      title: t('items.history.title'),
      description: t('items.history.description'),
    },
  ]

  const pills = [
    { icon: Keyboard, label: t('pills.shortcuts') },
    { icon: GitBranch, label: t('pills.kanban') },
    { icon: Package, label: t('pills.mcp') },
    { icon: Zap, label: t('pills.updates') },
  ]

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Elements - Cool Blobs */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      {/* Large purple blob top-left */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-neon-purple/15 rounded-full blur-[120px] animate-pulse" />
      {/* Cyan blob top-right */}
      <div className="absolute top-20 -right-20 w-[400px] h-[400px] bg-neon-cyan/10 rounded-full blur-[100px]" />
      {/* Small magenta blob center */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-neon-magenta/8 rounded-full blur-[80px] -translate-y-1/2" />
      {/* Bottom cyan glow */}
      <div className="absolute -bottom-20 left-1/2 w-[600px] h-[300px] bg-neon-cyan/10 rounded-full blur-[100px] -translate-x-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-neon-purple/20"
          >
            <Layers className="w-4 h-4 text-neon-purple" />
            <span className="text-sm text-white/70">{t('badge')}</span>
          </motion.div>

          <h2 className="heading-lg mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="gradient-text">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>

        {/* Additional Features Pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3"
        >
          {pills.map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 text-sm text-white/50 hover:text-white hover:border-neon-cyan/20 transition-all"
            >
              <item.icon className="w-4 h-4 text-neon-cyan" />
              <span>{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
