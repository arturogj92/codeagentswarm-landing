'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Puzzle, Plus, Zap, Check } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

const mcpIntegrations = [
  { id: 'notion', icon: '/icons/mcp/notion.png', name: 'Notion' },
  { id: 'supabase', icon: '/icons/mcp/supabase.png', name: 'Supabase' },
  { id: 'github', icon: '/icons/mcp/github.png', name: 'GitHub' },
  { id: 'slack', icon: '/icons/mcp/slack.png', name: 'Slack' },
  { id: 'playwright', icon: '/icons/mcp/playwright.png', name: 'Playwright' },
  { id: 'puppeteer', icon: '/icons/mcp/puppeteer.png', name: '' },
  { id: 'googledrive', icon: '/icons/mcp/google-drive.png', name: 'Google Drive' },
  { id: 'postgres', icon: '/icons/mcp/postgres.png', name: 'Postgres' },
  { id: 'brave', icon: '/icons/mcp/brave-search.png', name: 'Brave' },
]

export default function MCPSection() {
  const t = useTranslations('mcp')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [installedCount, setInstalledCount] = useState(0)
  const [installedItems, setInstalledItems] = useState<Set<string>>(new Set())

  const handleInstall = (id: string) => {
    if (installedItems.has(id)) {
      // Toggle off - remove from installed
      const newSet = new Set(installedItems)
      newSet.delete(id)
      setInstalledItems(newSet)
      setInstalledCount(prev => prev - 1)
    } else {
      // Toggle on - add to installed
      setInstalledItems(new Set([...installedItems, id]))
      setInstalledCount(prev => prev + 1)

      // Track the click
      if (typeof window !== 'undefined') {
        window.umami?.track('mcp_install_demo', { mcp_name: id })
      }
    }
  }

  const handleInstallAll = () => {
    const allIds = mcpIntegrations.map(mcp => mcp.id)
    setInstalledItems(new Set(allIds))
    setInstalledCount(allIds.length)

    if (typeof window !== 'undefined') {
      window.umami?.track('mcp_install_all_demo')
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-cyan/10 via-transparent to-transparent blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full glass border border-neon-cyan/20"
          >
            <Puzzle className="w-4 h-4 text-neon-cyan" />
            <span className="text-sm text-white/70">{t('badge')}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            <span className="text-white">{t('titleLine1')}</span>{' '}
            <span className="gradient-text">{t('titleHighlight')}</span>
          </h2>

          <p className="text-lg text-white/50 max-w-2xl mx-auto mb-8">
            {t('subtitle')}
          </p>

          {/* One-Click Install All Button */}
          <motion.button
            onClick={handleInstallAll}
            disabled={installedCount === mcpIntegrations.length}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-lg transition-all ${
              installedCount === mcpIntegrations.length
                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                : 'bg-gradient-to-r from-neon-purple to-neon-cyan text-white hover:shadow-lg hover:shadow-neon-cyan/20'
            }`}
          >
            {installedCount === mcpIntegrations.length ? (
              <>
                <Check className="w-6 h-6" />
                {t('allInstalled')}
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                {t('installAll')}
              </>
            )}
          </motion.button>
        </motion.div>

        {/* MCP Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4"
        >
          {mcpIntegrations.map((mcp, index) => {
            const isInstalled = installedItems.has(mcp.id)

            return (
              <motion.button
                key={mcp.id}
                onClick={() => handleInstall(mcp.id)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group p-4 rounded-xl border transition-all ${
                  isInstalled
                    ? 'border-green-500/50 bg-green-500/10'
                    : 'border-white/10 bg-white/5 hover:border-neon-cyan/30 hover:bg-white/10'
                }`}
              >
                {/* Icon */}
                <div className="w-12 h-12 mx-auto mb-2 relative">
                  <Image
                    src={mcp.icon}
                    alt={mcp.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  {isInstalled && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Name */}
                <p className="text-xs text-white/70 text-center truncate">{mcp.name}</p>

                {/* Hover overlay */}
                {!isInstalled && (
                  <div className="absolute inset-0 rounded-xl bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Plus className="w-6 h-6 text-neon-cyan" />
                  </div>
                )}
              </motion.button>
            )
          })}
        </motion.div>

        {/* Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-white/40 text-sm">
            {installedCount > 0 ? (
              <>
                <span className="text-green-400">{installedCount}</span> {t('installed')}
              </>
            ) : (
              t('clickToInstall')
            )}
          </p>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {(['database', 'automation', 'communication'] as const).map((feature, index) => (
            <div
              key={feature}
              className="p-6 rounded-xl glass border border-white/5"
            >
              <h3 className="text-white font-semibold mb-2">{t(`features.${feature}.title`)}</h3>
              <p className="text-white/50 text-sm">{t(`features.${feature}.description`)}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
