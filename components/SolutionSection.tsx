'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Terminal,
  Bell,
  GitBranch,
  Layout,
  Package,
  History,
  Eye,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function SolutionSection() {
  const t = useTranslations('solution')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const solutionPoints = [
    { icon: Terminal, text: t('points.terminals') },
    { icon: Bell, text: t('points.notifications') },
    { icon: GitBranch, text: t('points.git') },
    { icon: Layout, text: t('points.kanban') },
    { icon: Package, text: t('points.mcp') },
    { icon: History, text: t('points.history') },
    { icon: Eye, text: t('points.fileTracking') },
  ]

  // Split into rows: 3-3-1
  const firstRow = solutionPoints.slice(0, 3)
  const secondRow = solutionPoints.slice(3, 6)
  const lastItem = solutionPoints[6]

  const CardComponent = ({ point, index, delay = 0 }: { point: typeof solutionPoints[0], index: number, delay?: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
      transition={{ duration: 0.7, delay: delay + index * 0.1 }}
      className="group relative h-full"
    >
      {/* Outer glow on hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

      {/* Card with glass effect */}
      <div className="relative h-full flex items-start gap-5 p-6 md:p-7 rounded-2xl glass border border-white/10 group-hover:border-neon-cyan/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,245,255,0.1)]">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Animated Icon Container */}
        <motion.div
          className="relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/30 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* Icon glow */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
            className="relative z-10"
          >
            <point.icon className="w-6 h-6 text-white/70 group-hover:text-neon-cyan transition-colors duration-300" />
          </motion.div>
        </motion.div>

        {/* Text */}
        <p className="relative z-10 text-white/60 leading-relaxed pt-2 text-base md:text-lg group-hover:text-white/80 transition-colors duration-300">
          {point.text}
        </p>
      </div>
    </motion.div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-neon-cyan/10 via-neon-purple/5 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="gradient-text">{t('titleLine2')}</span>
          </h2>

          {/* Description */}
          <p className="text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </motion.div>

        {/* Solution Points - 3-3-1 Layout */}
        <div className="space-y-4">
          {/* First Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {firstRow.map((point, index) => (
              <CardComponent key={index} point={point} index={index} delay={0.1} />
            ))}
          </div>

          {/* Second Row - 3 items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {secondRow.map((point, index) => (
              <CardComponent key={index + 3} point={point} index={index} delay={0.3} />
            ))}
          </div>

          {/* Last Row - 1 centered */}
          <div className="flex justify-center">
            <div className="w-full md:w-2/3 lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.9 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="group relative"
              >
                {/* Outer glow on hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Card with glass effect */}
                <div className="relative flex items-start gap-5 p-6 md:p-7 rounded-2xl glass border border-white/10 group-hover:border-neon-cyan/30 transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,245,255,0.1)]">
                  {/* Gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Animated Icon Container */}
                  <motion.div
                    className="relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-neon-purple/20 to-neon-cyan/10 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/30 transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {/* Icon glow */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        delay: 6 * 0.3,
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <lastItem.icon className="w-6 h-6 text-white/70 group-hover:text-neon-cyan transition-colors duration-300" />
                    </motion.div>
                  </motion.div>

                  {/* Text */}
                  <p className="relative z-10 text-white/60 leading-relaxed pt-2 text-base md:text-lg group-hover:text-white/80 transition-colors duration-300">
                    {lastItem.text}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
