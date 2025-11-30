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
  progressBarBackground = "rgba(255, 255, 255, 0.2)"
}: VideoWithProgressProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [progress, setProgress] = useState(0)

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

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('timeupdate', handleTimeUpdate)

    if (!video.paused) {
      handlePlay()
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
  }, [onProgressChange, onVideoEnd])

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
