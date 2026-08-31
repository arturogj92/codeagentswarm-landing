'use client'

import { motion } from 'framer-motion'
import { Play, Download, Zap, Grid3X3, Bell, Terminal, Monitor, Layout, GitBranch, Pause, History, Layers, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import VideoWithProgress from './VideoWithProgress'
import CapabilitiesGrid from './CapabilitiesGrid'
import { cdnVideo } from '@/lib/cdn'

// Hero promo video (single, autoplay-loop muted) per locale. Click to unmute.
function HeroPromo() {
  const locale = useLocale()
  const videoRef = useRef<HTMLVideoElement>(null)
  const fired = useRef<Set<number>>(new Set())
  const src = cdnVideo(locale === 'es' ? 'promo-es.mp4' : 'promo-en.mp4')

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || !v.duration) return
    const pct = Math.floor((v.currentTime / v.duration) * 100)
    for (const m of [25, 50, 75, 100]) {
      if (pct >= m && !fired.current.has(m)) {
        fired.current.add(m)
        if (typeof window !== 'undefined') window.umami?.track('hero_promo_progress', { pct: m })
      }
    }
  }

  const [isMuted, setIsMuted] = useState(true)

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    setIsMuted(next)
    if (!next && typeof window !== 'undefined') window.umami?.track('hero_promo_unmute')
  }

  /**
   * On a phone, tapping the video opens it fullscreen instead of toggling sound.
   *
   * A muted promo playing at 90mm wide asks the viewer to squint at a terminal
   * grid, which is the one thing this video is trying to show. Fullscreen is
   * what a phone is for. Sound comes on with it: the tap is a user gesture, so
   * unmuting is allowed here, and someone who just went fullscreen has said
   * they want to watch it.
   *
   * iOS Safari never implemented requestFullscreen on elements; the video
   * element carries its own webkitEnterFullscreen instead, so both are tried.
   */
  const openFullscreen = () => {
    const v = videoRef.current as (HTMLVideoElement & {
      webkitEnterFullscreen?: () => void
    }) | null
    if (!v) return
    v.muted = false
    setIsMuted(false)
    if (typeof window !== 'undefined') window.umami?.track('hero_promo_fullscreen')
    if (v.requestFullscreen) v.requestFullscreen().catch(() => v.webkitEnterFullscreen?.())
    else v.webkitEnterFullscreen?.()
  }

  /**
   * Decided at tap time, not at render: reading it during render would need a
   * client-only value in markup the server also produces, and this is one
   * boolean read on a click.
   */
  const handleVideoTap = () => {
    const phone =
      typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    if (phone) openFullscreen()
    else toggleMute()
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Glow Background - hidden on mobile for performance */}
      <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20 blur-2xl opacity-50 rounded-3xl" />
      <div className="relative">
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/40 via-neon-purple/40 to-neon-magenta/40" />
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-dark-900">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <video
              ref={videoRef}
              src={src}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              onClick={handleVideoTap}
              onPlay={() => { if (typeof window !== 'undefined') window.umami?.track('hero_promo_play') }}
              onTimeUpdate={handleTimeUpdate}
              className="absolute inset-0 w-full h-full object-cover cursor-pointer"
              style={{ backgroundColor: '#000' }}
            />
            {/* Tap-for-sound affordance (browsers force muted autoplay; voice is only heard on unmute) */}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); toggleMute() }}
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              className="absolute bottom-3 right-3 z-10 flex items-center gap-2 px-3 py-2 rounded-full bg-black/55 backdrop-blur-sm border border-white/15 text-white/90 text-xs sm:text-sm font-medium hover:bg-black/75 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isMuted ? (locale === 'es' ? 'Activar sonido' : 'Tap for sound') : (locale === 'es' ? 'Sonido' : 'Sound on')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Video Showcase Component with Carousel (the 6 feature videos, moved below the hero)
export function VideoShowcase() {
  const t = useTranslations('hero.videos')

  const videos = [
    {
      id: 1,
      src: cdnVideo('guide-terminals.mp4'),
      title: t('multiTerminal.title'),
      icon: Monitor,
      description: t('multiTerminal.description')
    },
    {
      id: 2,
      src: cdnVideo('multi-model-v2.mp4'),
      title: t('multiModel.title'),
      icon: Layers,
      description: t('multiModel.description')
    },
    {
      id: 3,
      src: cdnVideo('conversation_history.mp4'),
      title: t('conversationHistory.title'),
      icon: History,
      description: t('conversationHistory.description')
    },
    {
      id: 4,
      src: cdnVideo('kanban.mp4'),
      title: t('kanban.title'),
      icon: Layout,
      description: t('kanban.description')
    },
    {
      id: 5,
      src: cdnVideo('gitmanager.mp4'),
      title: t('git.title'),
      icon: GitBranch,
      description: t('git.description')
    },
    {
      id: 6,
      src: cdnVideo('terminal-notifications.mp4'),
      title: t('notifications.title'),
      icon: Bell,
      description: t('notifications.description')
    }
  ]

  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAutoAdvance, setIsAutoAdvance] = useState(true)

  /**
   * Whether the showcase is actually on screen.
   *
   * Without this the carousel decodes video for the entire visit: it autoplays,
   * advances itself on every ended event, and nothing ever told it the reader
   * scrolled on to Pricing twenty seconds ago. Measured on the live page, the
   * active clip was still playing at four out of five scroll positions — all of
   * them off screen. Under a loaded CPU that decode competes with the
   * compositor, which is felt as the page flickering.
   *
   * The rootMargin keeps it playing slightly past the edge so scrolling by
   * never shows a frozen frame mid-viewport.
   */
  const wrapRef = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const node = wrapRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '120px 0px', threshold: 0.05 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const handleVideoEnd = () => {
    if (isAutoAdvance && isPlaying) {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto" ref={wrapRef}>
      {/* Glow Background - hidden on mobile for performance */}
      <div className="hidden md:block absolute -inset-4 bg-gradient-to-r from-neon-cyan/20 via-neon-purple/20 to-neon-magenta/20 blur-2xl opacity-50 rounded-3xl" />

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
                // Off screen, the video is paused — decode stops, and so does
                // the self-advance (a paused video never fires ended). The
                // user's own play/pause choice is preserved for when it
                // scrolls back in.
                isPlaying={isPlaying && inView}
              />
            </div>
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

          {/* Current video info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-white min-w-0">
                {(() => {
                  const Icon = videos[currentVideo].icon
                  return Icon ? <Icon className="w-5 h-5 text-neon-cyan shrink-0" /> : null
                })()}
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">{videos[currentVideo].title}</h3>
                  <p className="text-xs text-white/60">{videos[currentVideo].description}</p>
                </div>
              </div>
              <a
                href="#download"
                onClick={(e) => {
                  e.stopPropagation()
                  window.umami?.track('video_cta_download_click', { video_name: videos[currentVideo].title })
                }}
                className="hidden sm:inline-flex shrink-0 items-center gap-2 px-4 py-2 mr-24 bg-neon-cyan text-black text-sm font-semibold rounded-full hover:bg-amber-400 transition-colors"
              >
                <Download className="w-4 h-4" />
                {t('downloadCta')}
              </a>
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

export default function HeroSection() {
  const t = useTranslations('hero')

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16 px-6">
      {/* Background Effects - Optimized */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial Gradients - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-purple/10 via-transparent to-transparent blur-2xl pointer-events-none" />
      <div className="hidden md:block absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-neon-cyan/5 via-transparent to-transparent blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="min-h-[calc(100vh-18rem)] flex flex-col justify-center">
          <div className="text-center mb-10">
            <p className="mb-8 text-xs font-semibold uppercase tracking-[0.22em] text-amber-400">
              {t('eyebrow')}
            </p>

            <h1 className="heading-xl mb-8">
              <span className="text-white">{t('titleLine1')}</span>
              <br />
              <span className="gradient-text inline-block">{t('titleLine2')}</span>
            </h1>

            <p className="max-w-3xl mx-auto text-base md:text-xl leading-relaxed text-white/50">
              {t('subtitle')}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col items-center gap-4 mb-16"
          >
            <a
              href="#download"
              className="group relative inline-flex rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.umami?.track('hero_claim_access_click')
                }
              }}
            >
              <span className="absolute -inset-0.5 rounded-full blur-sm opacity-30 group-hover:opacity-70 transition-opacity bg-neon-cyan" />
              <span className="relative flex items-center gap-3 px-10 py-5 text-black font-bold text-lg rounded-full transition-all bg-neon-cyan group-hover:bg-amber-400 group-hover:scale-105">
                <Zap className="w-6 h-6" />
                {t('claimAccess')}
              </span>
            </a>

            <p className="text-xs text-white/30">{t('microcopy')}</p>

            <div className="flex items-center justify-center gap-3 flex-wrap text-xs text-white/35">
              <span>{t('worksWith')}</span>
              <div className="flex items-center -space-x-2">
                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white border-2 border-[#0e0e12] shadow-lg">
                  <img src="/icons/apps/claude-icon.svg" alt="Claude Code" className="w-4 h-4 object-contain" />
                </span>
                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0d0d0d] border-2 border-[#0e0e12] shadow-lg">
                  <img src="/icons/apps/codex-icon.svg" alt="Codex CLI" className="w-4 h-4 object-contain" />
                </span>
                <span className="w-7 h-7 rounded-full flex items-center justify-center bg-white border-2 border-[#0e0e12] shadow-lg">
                  <img src="/icons/apps/antigravity-icon.png" alt="Antigravity CLI" className="w-4 h-4 object-contain" />
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0d0d0d] border-2 border-[#0e0e12] shadow-lg"
                  title="OpenCode"
                >
                  <img src="/icons/apps/opencode-icon.svg" alt="OpenCode" className="w-5 h-5 object-contain" />
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0d0d0d] border-2 border-[#0e0e12] shadow-lg"
                  title="Kimi Code"
                >
                  <img src="/icons/apps/kimi-icon.png" alt="Kimi Code" className="w-5 h-5 object-contain" />
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0d0d0d] border-2 border-[#0e0e12] shadow-lg"
                  title="Grok Build"
                >
                  <img src="/icons/apps/grok-icon.svg" alt="Grok Build" className="w-4 h-4 object-contain" />
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center bg-[#0d0d0d] border-2 border-[#0e0e12] shadow-lg"
                  title="Cursor Agent"
                >
                  <img src="/icons/apps/cursor-icon.svg" alt="Cursor Agent" className="w-4 h-4 object-contain" />
                </span>
              </div>
              <span className="hidden sm:block h-4 w-px bg-white/10" aria-hidden="true" />
              <span>{t('existingAccounts')}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <CapabilitiesGrid />
        </motion.div>

      </div>
    </section>
  )
}

/**
 * The promo video, in its own section under the interactive demo.
 *
 * It used to close the hero, which meant the first thing a visitor could DO was
 * watch. Now the demo comes first and this follows, for the ones who would
 * rather be shown than click. The order is also why this sits after the demo in
 * the page and not before: on a phone the demo does not mount at all, so the
 * video slides up on its own to become the first thing under the headline,
 * without either section knowing about the other.
 */
export function HeroPromoSection() {
  const locale = useLocale()
  return (
    <section id="promo" className="relative py-16 md:py-20 px-6 scroll-mt-32">
      <div className="max-w-5xl mx-auto text-center mb-8">
        <h2 className="heading-lg text-white mb-3">
          {locale === 'es' ? 'Un minuto y lo entiendes' : 'One minute and you get it'}
        </h2>
        <p className="text-lg text-white/50 max-w-2xl mx-auto">
          {locale === 'es'
            ? 'Lo mismo que acabas de tocar, contado de principio a fin.'
            : 'The same thing you just played with, told start to finish.'}
        </p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7 }}
      >
        <HeroPromo />
      </motion.div>
    </section>
  )
}
