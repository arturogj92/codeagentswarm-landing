'use client'

import { motion } from 'framer-motion'
import { Play, Download, Sparkles, Zap, Grid3X3, Bell, Terminal, Monitor, Layout, GitBranch, Pause, History } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import VideoWithProgress from './VideoWithProgress'

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
      src: "/notifications.mp4",
      title: t('notifications.title'),
      icon: Bell,
      description: t('notifications.description')
    }
  ]

  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAutoAdvance, setIsAutoAdvance] = useState(true)

  const handleVideoEnd = () => {
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
            <div className="absolute inset-0 w-full h-full">
              <VideoWithProgress
                key={videos[currentVideo].id}
                src={videos[currentVideo].src}
                autoPlay
                loop={false}
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ backgroundColor: '#000' }}
                showProgressBar={true}
                progressBarPosition="bottom"
                progressBarHeight={3}
                progressBarColor="rgba(0, 255, 255, 0.8)"
                progressBarBackground="rgba(255, 255, 255, 0.1)"
                onVideoEnd={handleVideoEnd}
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
            onClick={() => setCurrentVideo(index)}
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

// Animated Stats
function Stats() {
  const t = useTranslations('hero.stats')

  const stats = [
    { title: t('terminals'), description: t('terminalsDesc'), icon: Terminal },
    { title: t('searchableChats'), description: t('searchableChatsDesc'), icon: History },
    { title: t('codePreview'), description: t('codePreviewDesc'), icon: Monitor },
    { title: t('kanban'), description: t('kanbanDesc'), icon: Layout },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
          className="text-center group"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 mb-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon-cyan/30 transition-colors">
            <stat.icon className="w-5 h-5 text-neon-cyan" />
          </div>
          <div className="text-lg md:text-xl font-display font-semibold text-white mb-1">
            {stat.title}
          </div>
          <div className="text-sm text-white/50">{stat.description}</div>
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

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8"
        >
          <h1 className="heading-xl mb-6">
            <span className="text-white">{t('titleLine1')}</span>
            <br />
            <span className="gradient-text">{t('titleLine2')}</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
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
          className="text-center text-lg md:text-xl text-white/40 italic mb-4 max-w-xl mx-auto"
        >
          {t('powerStatement')}
        </motion.p>

        {/* Authority Line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="text-center text-base text-white/50 mb-12 max-w-2xl mx-auto"
        >
          {t('authorityLine')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col items-center gap-4 mb-16"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#download" className="group relative">
              <div className="absolute -inset-1 rounded-full blur-lg opacity-40 group-hover:opacity-60 transition-opacity" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
              <button className="relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full transition-all" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Download className="w-5 h-5" />
                {tCommon('getStarted')}
              </button>
            </a>

            <a href="#demo">
              <button className="flex items-center gap-2 px-8 py-4 glass hover:bg-white/10 text-white font-medium rounded-full border border-white/10 hover:border-neon-cyan/30 transition-all">
                <Play className="w-5 h-5 text-neon-cyan" />
                {tCommon('seeHowItWorks')}
              </button>
            </a>
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
