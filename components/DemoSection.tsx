'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Download, CheckCircle2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function DemoSection() {
  const t = useTranslations('demo')
  const tCommon = useTranslations('common')
  const sectionRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      } else {
        videoRef.current.requestFullscreen()
      }
    }
  }

  const stats = [
    { value: t('stats.parallelValue'), label: t('stats.parallelLabel') },
    { value: t('stats.aiPowered'), label: t('stats.taskManagement') },
    { value: t('stats.seamless'), label: t('stats.gitIntegration') },
  ]

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      {/* Gradient glow - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-zinc-800/20 via-transparent to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-sm text-zinc-500 font-medium tracking-wider uppercase mb-4"
          >
            {t('badge')}
          </motion.span>

          <h2 className="heading-lg mb-6">
            <span className="text-white">{t('titleLine1')}</span>{' '}
            <span className="gradient-text">{t('titleLine2')}</span>
            <br />
            <span className="text-white">{t('titleLine3')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Subtle Border */}
          <div className="absolute -inset-[1px] rounded-3xl bg-white/10" />

          {/* Video Wrapper */}
          <div className="relative rounded-3xl overflow-hidden bg-dark-800">
            {/* Video */}
            <div className="aspect-video relative bg-gradient-to-br from-dark-900 to-dark-800">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                src="/demo-video.mp4"
                autoPlay={isInView}
                loop
                muted={isMuted}
                playsInline
                preload="auto"
              >
                <source src="/demo-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Video Overlay - Gradient at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Custom Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center justify-between">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white ml-1" />
                  )}
                </button>

                {/* Right Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-white" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-white" />
                    )}
                  </button>
                  <button
                    onClick={toggleFullscreen}
                    className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <Maximize className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Floating CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-6 left-0 right-0 flex justify-center"
          >
            <a href="#download" className="group relative inline-block">
              <button className="relative flex items-center gap-1.5 sm:gap-2 px-5 py-2.5 sm:px-8 sm:py-4 text-sm sm:text-base text-black font-semibold rounded-full bg-cyan-400 hover:bg-cyan-300 transition-all hover:shadow-[0_8px_30px_rgba(34,211,238,0.25)]">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                {tCommon('downloadNow')}
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* What You'll See */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-16 sm:mt-20 max-w-2xl mx-auto"
        >
          <h3 className="text-lg sm:text-xl font-semibold text-white/80 text-center mb-6">
            {t('whatYouSee.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {['tasks', 'notifications', 'diffs', 'history'].map((key) => (
              <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-white/60">{t(`whatYouSee.items.${key}`)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats Below Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 max-w-3xl mx-auto px-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-display font-bold gradient-text-static mb-1 sm:mb-2">
                {stat.value}
              </div>
              <div className="text-white/50 sm:text-white/40 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
