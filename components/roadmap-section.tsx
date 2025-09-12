"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { 
  Zap, 
  GitPullRequest, 
  Sparkles, 
  Brain,
  CheckCircle2,
  Circle,
  ArrowRight,
  Calendar,
  Code2,
  Layers,
  RotateCcw,
  Lightbulb
} from "lucide-react"

interface RoadmapItem {
  id: number
  quarter: string
  year: string
  title: string
  description: string
  features: string[]
  icon: any
  status: "completed" | "in-progress" | "upcoming"
  gradient: string
}

const roadmapData: RoadmapItem[] = [
  {
    id: 1,
    quarter: "Q4",
    year: "2025",
    title: "Multi-Agent Integration",
    description: "Expand beyond Claude to support multiple AI CLI agents",
    features: [
      "Codex CLI integration",
      "DeepSeek CLI support", 
      "Gemini CLI compatibility",
      "Unified agent orchestration"
    ],
    icon: Code2,
    status: "in-progress",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    quarter: "Q1",
    year: "2026",
    title: "Smart Rollback System",
    description: "Intelligent step-by-step rollback and recovery system",
    features: [
      "Step-based version control",
      "Automatic checkpoint creation",
      "Context-aware rollbacks",
      "Diff visualization & preview"
    ],
    icon: RotateCcw,
    status: "upcoming",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    quarter: "Q2",
    year: "2026",
    title: "Agentic Task System",
    description: "Autonomous task creation and development workflow",
    features: [
      "AI-powered task decomposition",
      "Smart task prioritization",
      "Autonomous workflow execution",
      "Cross-agent collaboration"
    ],
    icon: Brain,
    status: "upcoming",
    gradient: "from-orange-500 to-red-500"
  },
  {
    id: 4,
    quarter: "Q3",
    year: "2026",
    title: "Knowledge Intelligence",
    description: "Learn and leverage knowledge from completed tasks",
    features: [
      "Task pattern recognition",
      "Solution library building",
      "Context reuse system",
      "Smart recommendations"
    ],
    icon: Lightbulb,
    status: "upcoming",
    gradient: "from-emerald-500 to-teal-500"
  }
]

export default function RoadmapSection() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)

  return (
    <section id="roadmap" className="relative py-24 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4">
            Product Roadmap
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Our vision for the future of AI-powered development
          </p>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2 hidden lg:block" />
          
          {/* Roadmap Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {roadmapData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Milestone Node */}
                <div className="lg:absolute lg:-top-12 lg:left-1/2 lg:transform lg:-translate-x-1/2 mb-4 lg:mb-0">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`w-6 h-6 rounded-full border-2 ${
                      item.status === 'completed' 
                        ? 'bg-green-500 border-green-500' 
                        : item.status === 'in-progress'
                        ? 'bg-blue-500 border-blue-500 animate-pulse'
                        : 'bg-gray-700 border-white/30'
                    } shadow-lg hidden lg:block`}
                  />
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  className="cursor-pointer group relative"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] hover:border-white/[0.15] transition-all duration-300">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-white/[0.02] backdrop-blur-sm" />
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`}
                    />
                    
                    {/* Content */}
                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.gradient} p-2 shadow-lg`}>
                            <item.icon className="w-full h-full text-white" />
                          </div>
                          <div>
                            <div className="text-white/40 text-xs font-medium">
                              {item.quarter} {item.year}
                            </div>
                            <div className={`text-xs font-bold mt-0.5 ${
                              item.status === 'completed' 
                                ? 'text-green-400' 
                                : item.status === 'in-progress'
                                ? 'text-blue-400'
                                : 'text-white/50'
                            }`}>
                              {item.status === 'completed' ? 'COMPLETED' : 
                               item.status === 'in-progress' ? 'IN PROGRESS' : 'UPCOMING'}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm mb-4">
                        {item.description}
                      </p>

                      {/* Features List - Expandable */}
                      <motion.div
                        initial={false}
                        animate={{ height: selectedItem === item.id ? 'auto' : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 border-t border-white/10">
                          <div className="space-y-2">
                            {item.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center space-x-2"
                              >
                                <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${item.gradient}`} />
                                <span className="text-white/70 text-xs">
                                  {feature}
                                </span>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>

                      {/* Expand Indicator */}
                      <div className="flex items-center justify-center mt-4 text-white/30 group-hover:text-white/50 transition-colors">
                        <motion.div
                          animate={{ rotate: selectedItem === item.id ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover glow effect */}
                    <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} opacity-20 blur-xl`} />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-white/60 text-sm mb-4">
            Want to contribute or suggest features?
          </p>
          <motion.a
            href="https://github.com/codeagentswarm/roadmap"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-full text-white text-sm font-medium transition-all duration-300"
          >
            <GitPullRequest className="w-4 h-4" />
            <span>View on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}