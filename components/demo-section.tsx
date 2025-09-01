"use client"

import { motion } from "framer-motion"
import { Play, Download } from "lucide-react"

export default function DemoSection() {
  return (
    <section id="demo" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6">
            <span className="font-light italic">See It</span>{" "}
            <span className="font-light">In Action</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Watch CodeAgentSwarm transform your development workflow with AI-powered task management
          </p>
        </motion.div>

        {/* Demo Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video Wrapper */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-1">
            <div className="rounded-xl overflow-hidden bg-black/50 backdrop-blur-sm">
              {/* Demo Video */}
              <div className="aspect-video relative bg-gradient-to-br from-gray-900 to-gray-800">
                <video
                  className="w-full h-full object-cover"
                  src="/demo-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="auto"
                >
                  <source src="/demo-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Floating Action Cards */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
            <motion.a
              href="#download"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              <button className="px-6 py-3 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg">
                <Download className="w-4 h-4 inline mr-2" />
                Download Now
              </button>
            </motion.a>
          </div>
        </motion.div>

        {/* Stats or Key Points */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">10x</div>
            <div className="text-white/60 text-sm">Faster Development</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">AI-Powered</div>
            <div className="text-white/60 text-sm">Task Management</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-light text-white mb-2">Seamless</div>
            <div className="text-white/60 text-sm">Git Integration</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}