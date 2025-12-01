'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Star, Quote, Code, Zap, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

// Animated Counter
function AnimatedCounter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const duration = 2000
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

export default function SocialProofSection() {
  const t = useTranslations('socialProof')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const stats = [
    {
      title: t('stats.workflow.title'),
      subtitle: t('stats.workflow.subtitle'),
      icon: Zap,
      gradient: 'from-neon-green to-emerald-500',
    },
    {
      title: t('stats.agents.title'),
      subtitle: t('stats.agents.subtitle'),
      icon: TrendingUp,
      gradient: 'from-neon-purple to-pink-500',
    },
    {
      title: t('stats.insight.title'),
      subtitle: t('stats.insight.subtitle'),
      icon: Code,
      gradient: 'from-neon-cyan to-blue-500',
    },
    {
      title: t('stats.search.title'),
      subtitle: t('stats.search.subtitle'),
      icon: Star,
      gradient: 'from-orange-500 to-red-500',
    },
  ]

  const testimonials = [
    {
      quote: t('testimonials.alex.quote'),
      author: t('testimonials.alex.author'),
      role: t('testimonials.alex.role'),
      company: 'TechCorp',
      avatar: '/avatars/avatar-1.png',
      initials: 'AC',
    },
    {
      quote: t('testimonials.maria.quote'),
      author: t('testimonials.maria.author'),
      role: t('testimonials.maria.role'),
      company: 'StartupXYZ',
      avatar: '/avatars/avatar-2.png',
      initials: 'MS',
    },
    {
      quote: t('testimonials.david.quote'),
      author: t('testimonials.david.author'),
      role: t('testimonials.david.role'),
      company: 'Startup Labs',
      avatar: '/avatars/avatar-3.png',
      initials: 'DP',
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-black to-dark-900" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 md:mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="relative p-4 sm:p-6 rounded-2xl glass border border-white/5 text-center overflow-hidden h-full flex flex-col">
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4 mx-auto`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>

                {/* Title */}
                <div className="text-base sm:text-xl md:text-2xl font-display font-bold text-white mb-2">
                  {stat.title}
                </div>

                {/* Subtitle */}
                <div className="text-sm text-white/50 leading-relaxed">{stat.subtitle}</div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="heading-lg mb-4">
            <span className="text-white">{t('title')}</span>{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-white/50 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 md:mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="relative group"
            >
              <div className="relative h-full p-6 rounded-2xl glass border border-white/5 hover:border-neon-cyan/20 transition-all duration-500 flex flex-col">
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-neon-cyan/30 mb-4" />

                {/* Quote Text */}
                <p className="text-white/70 leading-relaxed mb-6 italic flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-sm text-white/40">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="absolute top-6 right-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-neon-cyan text-neon-cyan"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
