"use client"

import { motion } from "framer-motion"
import { Sparkles } from "lucide-react"
import VideoShowcase from "./video-showcase"

export default function HeroContent() {
  return (
    <main className="relative z-20 min-h-screen px-6 pt-32 pb-20">
      <div className="max-w-7xl mx-auto w-full">
        {/* Centered Text Content */}
        <div className="text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-sm border border-white/[0.08] mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-white/60" />
            <span className="text-xs text-white/60">6 AI Agents Working in Perfect Harmony</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-[1.1]"
          >
            <span className="font-light italic">Multiply</span>{" "}
            <span className="font-light">Your</span>
            <br />
            <span className="font-light">Coding Power</span>
          </motion.h1>

          {/* Description - Split into multiple lines for better readability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 mb-10 max-w-3xl mx-auto"
          >
            <p className="text-xl text-white/80 font-medium">
              6 parallel Claude Code instances. One command center.
            </p>
            <p className="text-lg text-white/50 leading-relaxed">
              Orchestrate multiple AI agents with <span className="text-white/70">real-time notifications</span>, 
              {" "}<span className="text-white/70">MCP integrations</span>, and an <span className="text-white/70">intelligent Kanban</span> that anticipates your needs.
            </p>
            <p className="text-2xl text-white/90 font-light italic mt-4">
              Transform 8-hour marathons into 30-minute sprints.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <button className="px-8 py-4 bg-white/[0.08] backdrop-blur-sm text-white text-base font-normal rounded-full border border-white/[0.08] hover:bg-white/[0.12] transition-colors duration-200">
              View Demo
            </button>
            <button className="px-8 py-4 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-colors duration-200">
              Download Now
            </button>
          </motion.div>
        </div>

        {/* Large Video Showcase Below */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.5 
          }}
          className="max-w-5xl mx-auto"
        >
          <VideoShowcase />
        </motion.div>
      </div>
    </main>
  )
}