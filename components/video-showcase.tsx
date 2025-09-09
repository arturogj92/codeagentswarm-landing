"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PulsingBorder } from "@paper-design/shaders-react"
import { Play, Pause, Monitor, Bell, GitBranch, Layout } from "lucide-react"
import VideoWithProgress from "./video-with-progress"

const videos = [
  {
    id: 1,
    src: "/terminals.mp4",
    title: "Multi-Terminal Management",
    icon: Monitor,
    description: "Control multiple AI agents across terminals"
  },
  {
    id: 2,
    src: "/kanban.mp4", 
    title: "Visual Task Board",
    icon: Layout,
    description: "Track and organize tasks with Kanban view"
  },
  {
    id: 3,
    src: "/gitmanager.mp4",
    title: "Git Integration",
    icon: GitBranch,
    description: "Seamless version control workflow"
  },
  {
    id: 4,
    src: "/notifications.mp4",
    title: "Smart Notifications",
    icon: Bell,
    description: "Stay updated with intelligent alerts"
  }
]

export default function VideoShowcase() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAutoAdvance, setIsAutoAdvance] = useState(true)

  const handleVideoEnd = () => {
    if (isAutoAdvance && isPlaying) {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }
  }

  return (
    <div className="relative">
      {/* Main Video Container with Pulsing Border */}
      <div className="relative">
        {/* Pulsing Border Background - Thin */}
        <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
          <PulsingBorder
            colors={["#fbbf24", "#6366f1", "#ec4899", "#06b6d4", "#8b5cf6", "#fbbf24", "#10b981"]}
            colorBack="#00000000"
            speed={1.5}
            roundness={0.02}
            thickness={0.008}
            softness={0.4}
            intensity={3}
            spotSize={0.1}
            pulse={0.1}
            smoke={0.3}
            smokeSize={3}
            scale={1}
            rotation={0}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
            }}
          />
        </div>
        
        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black backdrop-blur-sm">
          {/* Fixed aspect ratio container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
            <AnimatePresence mode="sync">
              <motion.div
                key={videos[currentVideo].id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="absolute inset-0 w-full h-full"
              >
                <VideoWithProgress
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
                  progressBarColor="rgba(255, 255, 255, 0.8)"
                  progressBarBackground="rgba(255, 255, 255, 0.1)"
                  onVideoEnd={handleVideoEnd}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Current video info */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="flex items-center gap-3 text-white">
            {(() => {
              const Icon = videos[currentVideo].icon
              return Icon ? <Icon className="w-5 h-5" /> : null
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
            className="p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
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
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  index === currentVideo 
                    ? "bg-white w-4" 
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Video thumbnails */}
      <div className="mt-6 flex justify-center gap-3">
        {videos.map((video, index) => (
          <button
            key={video.id}
            onClick={() => setCurrentVideo(index)}
            className={`relative rounded-xl overflow-hidden border-2 transition-all w-40 ${
              index === currentVideo
                ? "border-white/40 shadow-2xl scale-105"
                : "border-white/10 hover:border-white/20 opacity-60 hover:opacity-100"
            }`}
          >
            <VideoWithProgress
              src={video.src}
              className="w-full h-24 object-cover"
              muted
              autoPlay
              loop
              showProgressBar={true}
              progressBarPosition="bottom"
              progressBarHeight={2}
              progressBarColor="rgba(255, 255, 255, 0.7)"
              progressBarBackground="rgba(255, 255, 255, 0.15)"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end pb-2">
              {(() => {
                const Icon = video.icon
                return Icon ? <Icon className="w-5 h-5 text-white mb-1" /> : null
              })()}
              <span className="text-xs text-white/80 font-medium">{video.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}