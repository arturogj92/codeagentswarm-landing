'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize, Download } from 'lucide-react'
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
    { value: '10x', label: t('stats.faster') },
    { value: t('stats.aiPowered'), label: t('stats.taskManagement') },
    { value: t('stats.seamless'), label: t('stats.gitIntegration') },
  ]

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-radial from-neon-purple/20 via-transparent to-transparent blur-3xl" />

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
            className="inline-block text-sm text-neon-magenta font-medium tracking-wider uppercase mb-4"
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
          {/* Animated Border */}
          <div className="absolute -inset-[2px] rounded-3xl bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta opacity-50 blur-sm animate-gradient-x" />

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
            className="absolute -bottom-6 left-1/2 -translate-x-1/2"
          >
            <a href="#download" className="group relative inline-block">
              <div className="absolute -inset-1 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }} />
              <button className="relative flex items-center gap-2 px-8 py-4 text-white font-semibold rounded-full" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <Download className="w-5 h-5" />
                {tCommon('downloadNow')}
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* Stats Below Video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-display font-bold gradient-text-static mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
