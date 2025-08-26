"use client"

import { motion } from "framer-motion"
import { Terminal, Zap, Brain, GitBranch, Users, Shield } from "lucide-react"

const features = [
  {
    icon: Terminal,
    title: "Smart Terminal Management",
    description: "Multi-terminal interface with intelligent task routing and seamless AI agent integration."
  },
  {
    icon: Brain,
    title: "AI Task Planning",
    description: "Intelligent task breakdown and planning with automatic subtask creation and dependency management."
  },
  {
    icon: GitBranch,
    title: "Git Integration",
    description: "Seamless git workflow with automated commit generation and branch management."
  },
  {
    icon: Zap,
    title: "Real-time Collaboration",
    description: "Live task synchronization across terminals with instant progress updates."
  },
  {
    icon: Users,
    title: "Team Coordination",
    description: "Project organization with team-wide task visibility and collaborative workflows."
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Enterprise-grade security with permission controls and audit logging."
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 px-6">
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
            <span className="font-light italic">Powerful</span>{" "}
            <span className="font-light">Features</span>
          </h2>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Everything you need to supercharge your development workflow with AI agents
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative p-8 rounded-2xl bg-white/[0.02] backdrop-blur-sm border border-white/[0.08] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all duration-300"
            >
              {/* Feature Icon */}
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>

              {/* Feature Content */}
              <h3 className="text-xl font-medium text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/[0.02] to-pink-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}