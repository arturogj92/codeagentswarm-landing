"use client"

import { motion } from "framer-motion"
import { Check, Lock, Sparkles, Crown, Zap } from "lucide-react"

interface PricingFeature {
  name: string
  free: boolean | string
  starter: boolean | string
  pro: boolean | string
}

const features: PricingFeature[] = [
  // Core features - emphasize what's included
  {
    name: "Parallel Terminals",
    free: "2 terminals",
    starter: "4 terminals ⚡ 2X BOOST",
    pro: "6 terminals ⚡ 3X BOOST",
  },
  {
    name: "Kanban Projects",
    free: "1 project",
    starter: "4 projects",
    pro: "Unlimited projects 🚀",
  },
  {
    name: "Live Notifications",
    free: true,
    starter: true,
    pro: true,
  },
  {
    name: "Resizable Terminals",
    free: true,
    starter: true,
    pro: true,
  },
  {
    name: "MCP Configuration",
    free: true,
    starter: true,
    pro: true,
  },
  // Upgrade features
  {
    name: "Terminal Modes", 
    free: "Grid only",
    starter: "Grid only",
    pro: "Grid + Tabs ⚡ 2X MODES",
  },
  {
    name: "MCP Marketplace",
    free: false,
    starter: true,
    pro: true,
  },
  // Pro exclusive features
  {
    name: "Git Integration & AI Commits",
    free: false,
    starter: false,
    pro: true,
  },
  {
    name: "Task Labels",
    free: false,
    starter: false,
    pro: true,
  },
  {
    name: "Keyboard Shortcuts",
    free: false,
    starter: false,
    pro: true,
  },
  {
    name: "Skip Permissions Mode",
    free: false,
    starter: false,
    pro: true,
  },
  {
    name: "Manage MCP Permissions",
    free: false,
    starter: false,
    pro: true,
  },
  {
    name: "Manage Claude Code Permissions",
    free: false,
    starter: false,
    pro: true,
  },
]

export default function PricingSection() {
  return (
    <section id="pricing" className="relative py-32 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        className="absolute top-40 -left-20 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 -right-20 w-96 h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="relative inline-block mb-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white relative">
              <span className="relative">
                <span className="absolute -inset-1 blur-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-40"></span>
                <span className="relative">Simple</span>
              </span>{" "}
              <span className="font-extralight italic opacity-60">pricing</span>
            </h2>
          </div>
          <p className="text-lg text-white/40 max-w-2xl mx-auto leading-relaxed font-light">
            Start free and upgrade when you need more power. No hidden fees, no surprises.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-4 sm:p-5 md:p-6 h-full flex flex-col">
              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-600/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Free</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl sm:text-4xl font-light text-white">€0</span>
                  <span className="text-white/40 text-xs sm:text-sm">/month</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Perfect for individuals and small projects
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 flex-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.free ? (
                      <>
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-white/70 text-sm">
                          {typeof feature.free === 'string' ? feature.free : feature.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Lock className="w-3 h-3 text-white/20" />
                        </div>
                        <span className="text-white/30 text-sm">
                          {feature.name}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <motion.a
                  href="#download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:bg-white/10 hover:border-white/20 transition-all duration-300 text-center"
                >
                  Get Started Free
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative rounded-2xl md:rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-4 sm:p-5 md:p-6 h-full flex flex-col">
              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Starter</h3>
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-3xl sm:text-4xl font-light text-white">€2.99</span>
                  <span className="text-white/40 text-xs sm:text-sm">/month</span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Perfect balance of features and price
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 flex-1">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {feature.starter ? (
                      <>
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-blue-400" />
                        </div>
                        <span className="text-white/70 text-sm flex items-center gap-2">
                          <span>{typeof feature.starter === 'string' ? feature.starter.replace(/⚡.*|🚀.*/, '').trim() : feature.name}</span>
                          {typeof feature.starter === 'string' && feature.starter.includes('2X BOOST') && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">
                              2X BOOST
                            </span>
                          )}
                        </span>
                      </>
                    ) : (
                      <>
                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Lock className="w-3 h-3 text-white/20" />
                        </div>
                        <span className="text-white/30 text-sm">
                          {feature.name}
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <motion.a
                  href="#download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-white/80 text-sm font-medium hover:from-blue-600/30 hover:to-cyan-600/30 hover:border-blue-500/50 transition-all duration-300 text-center"
                >
                  Get Starter + 14 Days Pro Trial
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* Best Value Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  delay: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-purple-500/25"
              >
                BEST VALUE
              </motion.div>
            </div>

            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl md:rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl md:rounded-3xl opacity-100" style={{ padding: '1px' }}>
              <div className="h-full w-full bg-black rounded-2xl md:rounded-3xl" />
            </div>
            
            <div className="relative rounded-2xl md:rounded-3xl bg-gradient-to-br from-purple-900/10 to-pink-900/10 backdrop-blur-sm p-4 sm:p-5 md:p-6 h-full flex flex-col overflow-hidden">
              {/* Sparkle effect */}
              <div className="absolute top-4 right-4">
                <Sparkles className="w-6 h-6 text-purple-400 opacity-50" />
              </div>

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-medium text-white">Pro</h3>
                </div>
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-light text-white">€6.99</span>
                  <span className="text-white/40 text-xs sm:text-sm">/month</span>
                  <span className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold">
                    SAVE 30%
                  </span>
                </div>
                <p className="text-white/50 text-xs leading-relaxed">
                  Chosen by 73% of users • Early adopter price
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3 flex-1">
                {features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.02 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-purple-300" />
                    </div>
                    <span className="text-white/90 text-sm font-medium flex items-center gap-2">
                      <span>{typeof feature.pro === 'string' ? feature.pro.replace(/⚡.*|🚀.*|✨.*|🔓.*/, '').trim() : feature.name}</span>
                      {typeof feature.pro === 'string' && feature.pro.includes('3X BOOST') && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                          3X BOOST
                        </span>
                      )}
                      {typeof feature.pro === 'string' && feature.pro.includes('2X MODES') && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold">
                          2X MODES
                        </span>
                      )}
                      {typeof feature.pro === 'string' && feature.pro.includes('🚀') && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
                          UNLIMITED
                        </span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-6">
                <motion.a
                  href="#download"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative block w-full py-2.5 px-4 rounded-xl text-sm font-medium text-white overflow-hidden group/btn"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300 group-hover/btn:from-purple-500 group-hover/btn:to-pink-500" />
                  <span className="relative flex items-center justify-center gap-2">
                    Subscribe in App
                    <Sparkles className="w-4 h-4" />
                  </span>
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.02] border border-white/[0.08]">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <p className="text-white/60 text-sm">
              30-day money-back guarantee • Cancel anytime • Secure payment via Stripe
            </p>
          </div>
        </motion.div>

        {/* FAQ-style note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/5 to-pink-900/5 border border-white/[0.08]">
            <h4 className="text-white/80 font-medium mb-3 flex items-center gap-2">
              <Crown className="w-4 h-4 text-purple-400" />
              Why upgrade to Pro?
            </h4>
            <p className="text-white/50 text-sm leading-relaxed">
              <span className="text-purple-400 font-semibold">300% productivity boost</span> compared to Free tier. 
              With 6 parallel AI agents, unlimited projects, skip permissions mode, and keyboard shortcuts, 
              Pro users complete tasks <span className="text-purple-400">3x faster</span>. Our data shows Pro developers 
              ship code 70% more frequently and reduce debugging time by half. 
              <span className="italic">Transform hours into minutes.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}