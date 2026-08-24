"use client"

import { useRef, useEffect, useState } from "react"

interface VideoWithProgressProps {
  src: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
  className?: string
  style?: React.CSSProperties
  onProgressChange?: (progress: number) => void
  onVideoEnd?: () => void
  showProgressBar?: boolean
  progressBarPosition?: "top" | "bottom"
  progressBarHeight?: number
  progressBarColor?: string
  progressBarBackground?: string
  isPlaying?: boolean
}

export default function VideoWithProgress({
  src,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  className = "",
  style = {},
  onProgressChange,
  onVideoEnd,
  showProgressBar = true,
  progressBarPosition = "bottom",
  progressBarHeight = 2,
  progressBarColor = "rgba(255, 255, 255, 0.9)",
  progressBarBackground = "rgba(255, 255, 255, 0.2)",
  isPlaying = true
}: VideoWithProgressProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)

  // Control play/pause from external isPlaying prop
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.play().catch(() => {})
    } else {
      video.pause()
    }
  }, [isPlaying])

  // Whether anyone will ever see or read the progress value. When nobody does,
  // the whole tracking rig below must not run: it sets React state on EVERY
  // frame of playback, and the carousel on the homepage uses this component
  // with the bar hidden — which made a video that plays for minutes re-render
  // its tree at 60fps to feed a bar that was never drawn. On a loaded machine
  // that steady re-render is visible as flicker.
  const progressHasAudience = showProgressBar || Boolean(onProgressChange)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    let animationFrameId: number

    const updateProgress = () => {
      if (video.duration && !video.paused) {
        const currentProgress = (video.currentTime / video.duration) * 100
        setProgress(currentProgress)
        onProgressChange?.(currentProgress)
        animationFrameId = requestAnimationFrame(updateProgress)
      }
    }

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(updateProgress)
    }

    const handlePause = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }

    const handleEnded = () => {
      handlePause()
      onVideoEnd?.()
    }

    const handleTimeUpdate = () => {
      if (video.duration) {
        const currentProgress = (video.currentTime / video.duration) * 100
        setProgress(currentProgress)
        onProgressChange?.(currentProgress)
      }
    }

    // `ended` must stay wired regardless: the carousel advances on it.
    video.addEventListener('ended', handleEnded)
    if (progressHasAudience) {
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)
      video.addEventListener('timeupdate', handleTimeUpdate)
      if (!video.paused) {
        handlePlay()
      }
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [onProgressChange, onVideoEnd, progressHasAudience])

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        className={className}
        style={style}
      >
        <source src={src} type="video/mp4" />
      </video>

      {showProgressBar && (
        <div
          className={`absolute left-0 right-0 z-10 ${
            progressBarPosition === "top" ? "top-0" : "bottom-0"
          }`}
          style={{
            height: `${progressBarHeight}px`,
            backgroundColor: progressBarBackground
          }}
        >
          <div
            className="h-full"
            style={{
              backgroundColor: progressBarColor,
              width: `${progress}%`,
              transition: 'width 0.1s linear'
            }}
          />
        </div>
      )}
    </div>
  )
}
