"use client"

import { motion } from "framer-motion"
import { useRef } from "react"
import { Layout, Shield, Package, GitBranch, Bell, Sparkles, Terminal } from "lucide-react"

interface Feature {
  id: number
  icon: any
  title: string
  description: string
  gradient: string
  isNew?: boolean
}

const features: Feature[] = [
  {
    id: 1,
    icon: Layout,
    title: "Multi-Terminal Management",
    description: "Run up to 6 parallel Claude instances with intelligent routing, resizable quadrants, and full-screen mode.",
    gradient: "from-blue-500 to-indigo-500"
  },
  {
    id: 2,
    icon: GitBranch,
    title: "Git Kanban Board",
    description: "Visual task management with drag-and-drop, subtask hierarchy, and AI-powered organization.",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 3,
    icon: Package,
    title: "MCP Marketplace",
    description: "Built-in Model Context Protocol server management with easy installation and hot-swapping.",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 4,
    icon: Sparkles,
    title: "Task Orchestration",
    description: "Automatic synchronization across terminals with implementation tracking and testing workflows.",
    gradient: "from-pink-500 to-rose-500"
  },
  {
    id: 5,
    icon: Shield,
    title: "Smart Permissions",
    description: "Granular controls with bypass mode for trusted operations and comprehensive audit logging.",
    gradient: "from-emerald-500 to-teal-500"
  },
  {
    id: 6,
    icon: Bell,
    title: "Intelligent Notifications",
    description: "Smart alerts with badge notifications, webhooks, and terminal attention tracking.",
    gradient: "from-yellow-500 to-amber-500"
  }
]

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Simplified Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Everything you need to supercharge your AI development workflow
          </p>
        </motion.div>

        {/* Clean Grid - All cards same size */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" ref={containerRef}>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.12] transition-colors duration-300">
                {/* Very subtle background */}
                <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
                
                {/* Gradient accent on hover only */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                />
                
                {/* Inner content container */}
                <div className="relative h-full p-7">
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-5">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${feature.gradient} p-2.5 shadow-lg`}>
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-lg font-semibold text-white mb-2.5">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover effect - subtle glow */}
                  <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-30 blur-xl`} />
                  </div>

                  {/* NEW Badge */}
                  {feature.isNew && (
                    <motion.span 
                      className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg"
                      initial={{ scale: 0, rotate: -15 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ 
                        delay: 0.5 + index * 0.05,
                        type: "spring",
                        stiffness: 300
                      }}
                    >
                      NEW
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Simple dots indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <div className="flex space-x-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-white/30"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}