"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Layout, Shield, Package, GitBranch, Bell, Sparkles, Terminal } from "lucide-react"

interface Feature {
  id: number
  icon: any
  title: string
  description: string
  size: "large" | "medium"
  gradient: string
  pattern: string
  rotation: number
  isNew?: boolean
}

const features: Feature[] = [
  {
    id: 1,
    icon: Layout,
    title: "Multi-Terminal Management",
    description: "Grid and tab layouts with resizable quadrants. Full-screen mode and intelligent terminal routing for 6 parallel Claude Code instances.",
    size: "large",
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    pattern: "◢◣◢◣◢◣",
    rotation: -2
  },
  {
    id: 2,
    icon: Package,
    title: "MCP Marketplace",
    description: "Built-in Model Context Protocol server management with easy installation, configuration, and hot-swapping of MCP tools.",
    size: "medium",
    gradient: "from-violet-600 via-purple-600 to-pink-600",
    pattern: "▓▒░",
    rotation: 1.5
  },
  {
    id: 3,
    icon: Shield,
    title: "Smart Permissions System",
    description: "Granular permission controls with bypass mode for trusted operations. Hook-based execution approval and audit logging.",
    size: "medium",
    gradient: "from-emerald-500 via-teal-600 to-cyan-700",
    pattern: "◉◎◉",
    rotation: -1
  },
  {
    id: 4,
    icon: GitBranch,
    title: "Git Kanban Board",
    description: "Visual task management with drag-and-drop kanban board. Subtask hierarchy with AI-powered parent detection and project organization.",
    size: "large",
    gradient: "from-orange-500 via-red-600 to-pink-700",
    pattern: "⬡⬢⬡",
    rotation: 2.5
  },
  {
    id: 5,
    icon: Bell,
    title: "Intelligent Notifications",
    description: "Badge notifications, webhook integrations, and smart alerts. Terminal attention tracking with visual and audio feedback.",
    size: "medium",
    gradient: "from-yellow-500 via-amber-600 to-orange-700",
    pattern: "◈◇◈",
    rotation: -1.8
  },
  {
    id: 6,
    icon: Sparkles,
    title: "Task Orchestration",
    description: "Automatic task status synchronization across terminals. Plan management with implementation tracking and testing workflows.",
    size: "medium",
    gradient: "from-pink-500 via-rose-600 to-red-700",
    pattern: "※✦※",
    rotation: 0.8
  },
  {
    id: 7,
    icon: Terminal,
    title: "Dynamic Terminal Titles",
    description: "Real-time terminal titles that update based on current task activity. Instantly see what each AI agent is working on with automatic 3-word summaries.",
    size: "medium",
    gradient: "from-indigo-500 via-blue-600 to-purple-700",
    pattern: "▌▐▌",
    rotation: -0.5,
    isNew: true
  }
]

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header with Glitch Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20 relative"
        >
          <div className="relative inline-block">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white mb-6 relative">
              <span className="relative">
                <span className="absolute -inset-1 blur-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-40"></span>
                <span className="relative">Features</span>
              </span>{" "}
              <span className="font-extralight italic opacity-60">that matter</span>
            </h2>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-8 text-purple-400/20 text-2xl font-mono">◢◣</div>
            <div className="absolute -bottom-4 -left-8 text-pink-400/20 text-2xl font-mono">◣◢</div>
          </div>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
            Not just another dev tool. A complete paradigm shift in AI-assisted development.
          </p>
        </motion.div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px] relative z-0" ref={containerRef}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9, rotate: feature.rotation }}
              whileInView={{ opacity: 1, scale: 1, rotate: feature.rotation }}
              whileHover={{ 
                scale: 1.02, 
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              viewport={{ once: true }}
              className={`
                group relative rounded-3xl
                ${feature.size === 'large' ? 'lg:col-span-2 lg:row-span-1' : 'col-span-1'}
                cursor-pointer
              `}
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`,
                backdropFilter: 'blur(20px)',
                overflow: feature.isNew ? 'visible' : 'hidden',
                zIndex: feature.isNew ? 10 : 1,
              }}
            >
              {/* Animated Gradient Background */}
              <motion.div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                style={{
                  background: `linear-gradient(135deg, ${feature.gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').join(', ')})`,
                  opacity: 0.08
                }}
              />

              {/* Pattern Overlay */}
              <div className="absolute top-4 right-4 text-6xl text-white/[0.02] font-mono select-none group-hover:text-white/[0.05] transition-colors duration-500">
                {feature.pattern}
              </div>

              {/* Noise Texture */}
              <div 
                className="absolute inset-0 opacity-50 mix-blend-overlay pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
                }}
              />

              {/* Border with gradient */}
              <div className="absolute inset-0 rounded-3xl border border-white/[0.08] group-hover:border-white/[0.15] transition-colors duration-500" />

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between z-10">
                {/* Icon with animated background */}
                <div className="relative mb-6">
                  <motion.div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)`,
                    }}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-7 h-7 text-white/70 relative z-10" />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${feature.gradient})`,
                        opacity: 0.2
                      }}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-xl font-medium text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm group-hover:text-white/60 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Indicator */}
                <motion.div
                  className="absolute bottom-6 right-6 w-2 h-2 rounded-full bg-white/20"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-to-br from-white/[0.03] to-transparent rotate-45" />
              </div>

              {/* NEW Badge */}
              {feature.isNew && (
                <motion.div 
                  className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                  style={{ zIndex: 9999 }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.8 + index * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }}
                >
                  <span 
                    className="feature-badge block
                      bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 
                      text-white text-xs font-bold px-3 py-1 rounded-full
                      shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                      hover:scale-110 transition-all duration-200"
                  >
                    NEW!
                  </span>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-16"
        >
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-white/20"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}