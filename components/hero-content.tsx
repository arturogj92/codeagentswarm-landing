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

          {/* Description - Clean bullet points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 max-w-4xl mx-auto"
          >
            {/* Main value prop */}
            <p className="text-xl text-white/90 font-medium mb-6">
              6 parallel Claude Code instances. One command center.
            </p>
            
            {/* Feature grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-white/90 mb-1">6x</div>
                <div className="text-sm text-white/50">AI Agents</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white/90 mb-1">∞</div>
                <div className="text-sm text-white/50">MCP Integrations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white/90 mb-1">24/7</div>
                <div className="text-sm text-white/50">Live Notifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white/90 mb-1">16x</div>
                <div className="text-sm text-white/50">Faster Delivery</div>
              </div>
            </div>
            
            {/* Power statement */}
            <p className="text-lg text-white/70 italic text-center">
              Transform 8-hour marathons into 30-minute sprints
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