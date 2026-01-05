'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  Check,
  X,
  Zap,
  Sparkles,
  Crown,
  Shield,
  ChevronDown,
} from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

export default function PricingSection() {
  const t = useTranslations('pricing')
  const tBeta = useTranslations('pricing.betaSpecial')
  const locale = useLocale()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [showFullPricing, setShowFullPricing] = useState(false)

  const plans = [
    {
      name: t('plans.free.name'),
      icon: Zap,
      price: 0,
      description: t('plans.free.description'),
      gradient: 'from-gray-500 to-gray-600',
      features: [
        { name: t('features.terminals2'), included: true },
        { name: t('features.projects2'), included: true },
        { name: t('features.notifications'), included: true },
        { name: t('features.realTimeChanges'), included: true },
        { name: t('features.gridOnly'), included: true },
        { name: t('features.projectShortcuts'), included: false },
        { name: t('features.terminalShortcuts'), included: false },
        { name: t('features.resizable'), included: false },
        { name: t('features.mcpConfig'), included: false },
        { name: t('features.mcpMarketplace'), included: false },
        { name: t('features.gitAi'), included: false },
        { name: t('features.taskLabels'), included: false },
        { name: t('features.shortcuts'), included: false },
        { name: t('features.mcpPermissions'), included: false },
        { name: t('features.claudePermissions'), included: false },
        { name: t('features.turboMode'), included: false },
        { name: t('features.history'), included: false },
      ],
      cta: t('plans.free.cta'),
      popular: false,
    },
    {
      name: t('plans.starter.name'),
      icon: Sparkles,
      price: 2.99,
      description: t('plans.starter.description'),
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        { name: t('features.terminals4'), included: true, badge: t('badges.boost2x') },
        { name: t('features.projects4'), included: true },
        { name: t('features.notifications'), included: true },
        { name: t('features.realTimeChanges'), included: true },
        { name: t('features.gridOnly'), included: true },
        { name: t('features.projectShortcut1'), included: true },
        { name: t('features.terminalShortcut1'), included: true },
        { name: t('features.resizable'), included: true },
        { name: t('features.mcpConfig'), included: true },
        { name: t('features.mcpMarketplace'), included: true },
        { name: t('features.gitAi'), included: false },
        { name: t('features.taskLabels'), included: false },
        { name: t('features.shortcuts'), included: false },
        { name: t('features.mcpPermissions'), included: false },
        { name: t('features.claudePermissions'), included: false },
        { name: t('features.turboMode'), included: false },
        { name: t('features.history'), included: false },
      ],
      cta: t('plans.starter.cta'),
      popular: false,
    },
    {
      name: t('plans.pro.name'),
      icon: Crown,
      price: 6.99,
      description: t('plans.pro.description'),
      gradient: 'from-neon-purple to-neon-magenta',
      features: [
        { name: t('features.terminals6'), included: true, badge: t('badges.boost3x') },
        { name: t('features.unlimitedProjects'), included: true, badge: t('badges.unlimited') },
        { name: t('features.notifications'), included: true },
        { name: t('features.realTimeChanges'), included: true },
        { name: t('features.gridTabs'), included: true, badge: t('badges.modes2x') },
        { name: t('features.projectShortcuts6'), included: true, badge: t('badges.boost6x') },
        { name: t('features.terminalShortcutsUnlimited'), included: true, badge: t('badges.unlimited') },
        { name: t('features.resizable'), included: true },
        { name: t('features.mcpConfig'), included: true },
        { name: t('features.mcpMarketplace'), included: true },
        { name: t('features.gitAi'), included: true },
        { name: t('features.taskLabels'), included: true },
        { name: t('features.shortcuts'), included: true },
        { name: t('features.mcpPermissions'), included: true },
        { name: t('features.claudePermissions'), included: true },
        { name: t('features.turboMode'), included: true, badge: t('badges.boost3x') },
        { name: t('features.history'), included: true },
      ],
      cta: t('plans.pro.cta'),
      popular: true,
      savings: t('badges.save30'),
      isBeta: true,
    },
  ]

  // Key features for the Beta Special card
  const betaFeatures = [
    tBeta('features.terminals'),
    tBeta('features.projects'),
    tBeta('features.notifications'),
    tBeta('features.mcp'),
  ]

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-black to-dark-900" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-6">
            <span className="gradient-text">{t('title')}</span>{' '}
            <span className="text-white/60 font-light italic">{t('titleHighlight')}</span>
          </h2>
          <p className="text-lg text-white/40 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Beta Special Card - Prominent */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-neon-green/20 to-neon-cyan/20 blur-3xl opacity-50" />

          <div className="relative rounded-3xl overflow-hidden">
            {/* Animated border */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-neon-green via-neon-cyan to-neon-purple rounded-3xl animate-pulse" />

            <div className="relative bg-dark-900 rounded-3xl p-8 md:p-12">
              {/* Badge */}
              <div className="flex justify-center mb-6">
                <span className="px-6 py-2 bg-neon-green text-black text-sm font-bold rounded-full uppercase tracking-wider">
                  {tBeta('badge')}
                </span>
              </div>

              {/* Title and Price */}
              <div className="text-center mb-8">
                <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
                  {tBeta('title')}
                </h3>
                <p className="text-xl text-neon-green font-medium mb-4">
                  {tBeta('subtitle')}
                </p>
                <p className="text-white/40 text-sm line-through">
                  {tBeta('strikethrough')}
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
                {betaFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-neon-green" />
                    </div>
                    <span className="text-white/70 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <a
                href={`/${locale}/beta`}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.umami?.track('beta_special_click')
                  }
                }}
                className="block"
              >
                <button className="w-full py-4 rounded-xl bg-neon-green text-black font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  {tBeta('cta')}
                </button>
              </a>

              {/* Trust note */}
              <p className="text-center text-white/30 text-xs mt-4">
                {t('trustBadge')}
              </p>
            </div>
          </div>
        </motion.div>


        {/* Full Pricing Cards - Hidden by default */}
        <AnimatePresence>
          {showFullPricing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto pt-4">
                {plans.map((plan, index) => (
                  <motion.div
                    key={plan.name}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative group ${plan.popular ? 'md:-mt-4 md:mb-4' : ''}`}
                  >
                    {/* Beta Badge */}
                    {plan.isBeta && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <div className="px-4 py-1.5 bg-neon-green text-black text-xs font-bold rounded-full shadow-lg">
                          BETA FREE
                        </div>
                      </div>
                    )}

                    {/* Card */}
                    <div
                      className={`relative h-full rounded-2xl overflow-hidden transition-all duration-500 ${
                        plan.popular
                          ? 'border-2 border-neon-purple/50'
                          : 'border border-white/5 hover:border-white/10'
                      }`}
                    >
                      {/* Animated border for popular */}
                      {plan.popular && (
                        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 to-neon-magenta/20" />
                      )}

                      {/* Background */}
                      <div className="absolute inset-0 glass" />

                      {/* Content */}
                      <div className="relative p-8">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} p-3`}
                          >
                            <plan.icon className="w-full h-full text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-display font-semibold text-white">
                              {plan.name}
                            </h3>
                            {plan.savings && (
                              <span className="text-xs px-2 py-0.5 bg-neon-green/20 text-neon-green rounded-full">
                                {plan.savings}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex items-baseline gap-2 mb-3">
                          {plan.isBeta ? (
                            <div className="flex flex-col gap-2">
                              <div className="inline-flex items-center gap-2">
                                <span className="relative text-white/50 text-lg font-medium">
                                  €{plan.price}/mo
                                  <span className="absolute left-0 right-0 top-1/2 h-[2px] bg-red-500/80 -rotate-6" />
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-4xl font-display font-bold text-white">
                                  €0
                                </span>
                                <span className="px-3 py-1.5 rounded-full bg-neon-green text-black text-sm font-bold uppercase tracking-wide">
                                  BETA FREE
                                </span>
                              </div>
                            </div>
                          ) : (
                            <>
                              <span className="text-4xl font-display font-bold text-white">
                                €{plan.price}
                              </span>
                              <span className="text-white/40">/{t('perMonth')}</span>
                            </>
                          )}
                        </div>

                        <p className="text-sm text-white/50 mb-6">{plan.description}</p>

                        {/* Features */}
                        <div className="space-y-3 mb-8">
                          {plan.features.map((feature) => (
                            <div key={feature.name} className="flex items-center gap-3">
                              {feature.included ? (
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                    plan.popular
                                      ? 'bg-gradient-to-br from-neon-purple/30 to-neon-magenta/30'
                                      : 'bg-neon-green/20'
                                  }`}
                                >
                                  <Check
                                    className={`w-3 h-3 ${
                                      plan.popular ? 'text-neon-purple' : 'text-neon-green'
                                    }`}
                                  />
                                </div>
                              ) : (
                                <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center">
                                  <X className="w-3 h-3 text-white/20" />
                                </div>
                              )}
                              <span
                                className={`text-sm ${
                                  feature.included ? 'text-white/70' : 'text-white/30'
                                }`}
                              >
                                {feature.name}
                              </span>
                              {feature.badge && (
                                <span
                                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                                    feature.badge === '3X BOOST'
                                      ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white'
                                      : feature.badge === '2X BOOST'
                                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                      : 'bg-gradient-to-r from-neon-purple to-neon-magenta text-white'
                                  }`}
                                >
                                  {feature.badge}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>

                        {/* CTA Button */}
                        <a
                          href={plan.isBeta ? '#download' : '#download'}
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.umami?.track('pricing_plan_click', { plan_name: plan.name })
                            }
                          }}
                          className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                            plan.isBeta
                              ? 'bg-neon-green text-black font-bold hover:opacity-90'
                              : plan.popular
                              ? 'bg-gradient-to-r from-neon-purple to-neon-magenta text-white hover:shadow-neon-purple'
                              : plan.name === 'Starter'
                              ? 'bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 text-white/80 hover:from-blue-600/30 hover:to-cyan-600/30'
                              : 'bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          {plan.isBeta ? tBeta('cta') : plan.cta}
                          {plan.popular && !plan.isBeta && <Sparkles className="w-4 h-4" />}
                        </a>
                      </div>

                      {/* Hover glow */}
                      <div
                        className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 blur-2xl`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Why Upgrade Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 max-w-3xl mx-auto"
              >
                <div className="p-6 rounded-2xl glass border border-neon-purple/20">
                  <h4 className="text-white/80 font-display font-medium mb-3 flex items-center gap-2">
                    <Crown className="w-5 h-5 text-neon-purple" />
                    {t('whyUpgrade.title')}
                  </h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {t('whyUpgrade.description')}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Badge - Always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass border border-white/5">
            <Shield className="w-5 h-5 text-neon-green" />
            <p className="text-white/50 text-sm">
              {t('trustBadge')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
