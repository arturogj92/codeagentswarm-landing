"use client"

import { motion } from "framer-motion"
import { Download, Github, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CTASection() {
  return (
    <section className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-6 leading-tight">
            Ready to <span className="italic">Transform</span><br />
            Your Development?
          </h2>
          
          <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of developers who are already using CodeAgentSwarm to supercharge 
            their workflow with AI-powered task management and seamless collaboration.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/downloads">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-white text-black text-base font-medium rounded-full hover:bg-white/90 transition-all duration-200 shadow-lg"
              >
                <Download className="w-5 h-5 inline mr-3" />
                Download for macOS
                <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
            
            <a href="https://github.com/yourusername/codeagentswarm" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white text-base font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200 shadow-lg"
              >
                <Github className="w-5 h-5 inline mr-3" />
                View Source Code
                <ArrowRight className="w-4 h-4 inline ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </a>
          </div>
        </motion.div>

        {/* Platform Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-white/40 text-sm">Available for</p>
          
          <div className="flex items-center gap-8">
            {/* macOS */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/[0.08]">
              <div className="w-6 h-6 bg-gradient-to-br from-gray-200 to-gray-400 rounded flex items-center justify-center">
                <span className="text-black text-xs font-bold">⌘</span>
              </div>
              <span className="text-white/70 text-sm">macOS</span>
            </div>

            {/* Coming Soon - Windows */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.01] border border-white/[0.04] opacity-50">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">⊞</span>
              </div>
              <span className="text-white/50 text-sm">Windows (Soon)</span>
            </div>

            {/* Coming Soon - Linux */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.01] border border-white/[0.04] opacity-50">
              <div className="w-6 h-6 bg-gradient-to-br from-orange-400 to-red-500 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">🐧</span>
              </div>
              <span className="text-white/50 text-sm">Linux (Soon)</span>
            </div>
          </div>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08]"
        >
          <h3 className="text-white text-lg font-medium mb-4">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white/60">
            <div>
              <span className="text-white/80 font-medium">macOS:</span> 12.0 or later
            </div>
            <div>
              <span className="text-white/80 font-medium">Memory:</span> 4GB RAM minimum
            </div>
            <div>
              <span className="text-white/80 font-medium">Storage:</span> 500MB available space
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}