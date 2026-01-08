'use client'

import { motion } from 'framer-motion'
import { Play, Download, Sparkles, Zap, Grid3X3, Bell, Terminal, Monitor, Layout, GitBranch, Pause, History, Shield } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import VideoWithProgress from './VideoWithProgress'
import Image from 'next/image'

// Video Showcase Component with Carousel
function VideoShowcase() {
  const t = useTranslations('hero.videos')

  const videos = [
    {
      id: 1,
      src: "/terminals.mp4",
      title: t('multiTerminal.title'),
      icon: Monitor,
      description: t('multiTerminal.description')
    },
    {
      id: 2,
      src: "/kanban.mp4",
      title: t('kanban.title'),
      icon: Layout,
      description: t('kanban.description')
    },
    {
      id: 3,
      src: "/gitmanager.mp4",
      title: t('git.title'),
      icon: GitBranch,
      description: t('git.description')
    },
    {
      id: 4,
      src: "/terminal-notifications.mp4",
      title: t('notifications.title'),
      icon: Bell,
      description: t('notifications.description')
    },
    {
      id: 5,
      src: "/conversation_history.mp4",
      title: t('conversationHistory.title'),
      icon: History,
      description: t('conversationHistory.description')
    }
  ]

  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAutoAdvance, setIsAutoAdvance] = useState(true)

  const handleVideoEnd = () => {
    // Track video completion
    if (typeof window !== 'undefined') {
      window.umami?.track('video_complete', { video_name: videos[currentVideo].title })
    }
    if (isAutoAdvance && isPlaying) {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Glow Background */}
      <div className="absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20 blur-2xl opacity-50 rounded-3xl" />

      {/* Main Video Container */}
      <div className="relative">
        {/* Border glow */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/40 via-neon-purple/40 to-neon-magenta/40" />

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-dark-900">
          {/* Fixed aspect ratio container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <div
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => {
                  setIsPlaying(!isPlaying)
                  setIsAutoAdvance(!isAutoAdvance)
                }}
              >
              <VideoWithProgress
                key={videos[currentVideo].id}
                src={videos[currentVideo].src}
                autoPlay
                loop={false}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
                style={{ backgroundColor: '#000' }}
                showProgressBar={false}
                progressBarPosition="bottom"
                progressBarHeight={3}
                progressBarColor="rgba(0, 255, 255, 0.8)"
                progressBarBackground="rgba(255, 255, 255, 0.1)"
                onVideoEnd={handleVideoEnd}
                isPlaying={isPlaying}
              />
            </div>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Current video info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-3 text-white">
              {(() => {
                const Icon = videos[currentVideo].icon
                return Icon ? <Icon className="w-5 h-5 text-neon-cyan" /> : null
              })()}
              <div>
                <h3 className="text-sm font-semibold">{videos[currentVideo].title}</h3>
                <p className="text-xs text-white/60">{videos[currentVideo].description}</p>
              </div>
            </div>
          </div>

          {/* Video controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={() => {
                setIsAutoAdvance(!isAutoAdvance)
                setIsPlaying(!isPlaying)
              }}
              className="p-2 glass hover:bg-white/20 rounded-full transition-all border border-white/10"
              title={isAutoAdvance ? "Pause auto-advance" : "Resume auto-advance"}
            >
              {isAutoAdvance ? (
                <Pause className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </button>
          </div>

          {/* Video indicators */}
          <div className="absolute bottom-4 right-4 flex gap-1">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVideo(index)}
                className={`rounded-full transition-all ${
                  index === currentVideo
                    ? "bg-neon-cyan w-4 h-1.5"
                    : "bg-white/40 hover:bg-white/60 w-1.5 h-1.5"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video thumbnails */}
      <div className="mt-6 flex justify-center gap-3 flex-wrap">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => {
              setCurrentVideo(index)
              if (typeof window !== 'undefined') {
                window.umami?.track('video_thumbnail_click', { video_name: video.title })
              }
            }}
            className={`relative rounded-xl overflow-hidden border-2 transition-all w-40 h-24 ${
              index === currentVideo
                ? "border-neon-cyan shadow-2xl shadow-neon-cyan/20 scale-105"
                : "border-white/10 hover:border-white/20 opacity-60 hover:opacity-100"
            }`}
          >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-dark-700 to-dark-900" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center">
              {(() => {
                const Icon = video.icon
                return Icon ? <Icon className="w-6 h-6 text-white/80 mb-1" /> : null
              })()}
              <span className="text-xs text-white/80 font-medium text-center px-2">{video.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// Modern Feature Cards with custom neon icons
function Stats() {
  const t = useTranslations('hero.stats')

  const stats = [
    { title: t('terminals'), description: t('terminalsDesc'), iconSrc: '/images/icons/icon-terminals.png', color: '#22d3ee', size: 64 },
    { title: t('searchableChats'), description: t('searchableChatsDesc'), iconSrc: '/images/icons/icon-history.png', color: '#22d3ee', size: 64 },
    { title: t('codePreview'), description: t('codePreviewDesc'), iconSrc: '/images/icons/icon-diff.png', color: '#22d3ee', size: 64 },
    { title: t('kanban'), description: t('kanbanDesc'), iconSrc: '/images/icons/icon-kanban.png', color: '#22d3ee', size: 96 },
  ]

  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.08, duration: 0.5 }}
          className="group flex flex-col items-center text-center w-40 cursor-pointer"
        >
          {/* Custom neon icon - fixed height container for alignment */}
          <div className="flex items-center justify-center mb-4" style={{ height: 96 }}>
            <motion.div
              className="relative"
              style={{ width: stat.size, height: stat.size }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-lg"
                style={{ backgroundColor: stat.color }}
              />
              <Image
                src={stat.iconSrc}
                alt={stat.title}
                width={stat.size}
                height={stat.size}
                className="relative z-10 w-full h-full object-contain transition-transform duration-300"
              />
            </motion.div>
          </div>
          <h3 className="text-base font-semibold text-white mb-1">{stat.title}</h3>
          <p className="text-sm text-neutral-500 leading-relaxed">{stat.description}</p>
        </motion.div>
      ))}
    </div>
  )
}


export default function HeroSection() {
  const t = useTranslations('hero')
  const tCommon = useTranslations('common')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6">
      {/* Background Effects - Optimized */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial Gradients - Reduced blur for performance */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-neon-cyan/20">
            <Sparkles className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-white/80">
              {t('badge')}
            </span>
            <span className="px-2 py-0.5 text-[10px] font-bold bg-neon-cyan/20 text-neon-cyan rounded-full">
              {t('badgeNew')}
            </span>
          </div>
        </motion.div>

        {/* Main Heading - God Mode */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="heading-xl mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <motion.span 
              className="gradient-text inline-block"
              animate={{ textShadow: ['0 0 20px rgba(34, 211, 238, 0.3)', '0 0 40px rgba(34, 211, 238, 0.5)', '0 0 20px rgba(34, 211, 238, 0.3)'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >{t('titleLine2')}</motion.span>
          </h1>

          {/* Third line - the power statement */}
          <p className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white/90 mb-6">
            {t('titleLine3')}
          </p>

          <p className="text-lg md:text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            {t.rich('subtitle', {
              highlight: (chunks) => <span className="text-white font-medium">{chunks}</span>
            })}
          </p>
        </motion.div>

        {/* Power Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={`text-center text-lg md:text-xl text-white/40 italic max-w-xl mx-auto ${t('authorityLine') ? 'mb-4' : 'mb-12'}`}
        >
          {t('powerStatement')}
        </motion.p>

        {/* Authority Line - only render if not empty */}
        {t('authorityLine') && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-center text-base text-white/50 mb-12 max-w-2xl mx-auto"
          >
            {t('authorityLine')}
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          {/* Single Primary CTA */}
          <a
            href="#download"
            className="group relative"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.umami?.track('hero_claim_access_click')
              }
            }}
          >
            <div className="absolute -inset-0.5 rounded-full blur-sm opacity-30 group-hover:opacity-70 transition-opacity bg-neon-cyan" />
            <button className="relative flex items-center gap-3 px-10 py-5 text-black font-bold text-lg rounded-full transition-all bg-neon-cyan hover:bg-cyan-400 hover:scale-105">
              <Zap className="w-6 h-6" />
              {t('claimAccess')}
            </button>
          </a>

          {/* Security Badge */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-green-500/30">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-400/90">{t('securityBadge')}</span>
          </div>

          {/* Requirements note */}
          <p className="text-sm text-white/40">
            {t('requirements')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <Stats />
        </motion.div>

        {/* Video Showcase - Replaces Terminal Grid */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <VideoShowcase />
        </motion.div>
      </div>
    </section>
  )
}
