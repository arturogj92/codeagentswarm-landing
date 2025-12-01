'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Download, ChevronDown, Calendar } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Release {
  version: string
  releaseDate: string
  formattedDownloads: {
    macArm: { fileName: string; fileUrl: string; fileSize: number } | null
    macIntel: { fileName: string; fileUrl: string; fileSize: number } | null
  }
}

export default function CTASection() {
  const t = useTranslations('cta')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [latestRelease, setLatestRelease] = useState<Release | null>(null)
  const [olderReleases, setOlderReleases] = useState<Release[]>([])
  const [showOlderVersions, setShowOlderVersions] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLatestRelease()
  }, [])

  const fetchLatestRelease = async () => {
    try {
      console.log('🔍 Fetching releases...')
      // Use the Next.js API route instead of direct backend call to avoid CORS
      const response = await fetch(
        '/api/releases?limit=3&preferDmg=true'
      )
      if (!response.ok) throw new Error('Failed to fetch release')
      const data = await response.json()
      console.log('✅ Releases data:', data)
      if (data.releases && data.releases.length > 0) {
        console.log('📦 Latest release:', data.releases[0])
        setLatestRelease(data.releases[0])
        if (data.releases.length > 1) {
          setOlderReleases(data.releases.slice(1))
        }
      } else {
        console.warn('⚠️ No releases found in response')
      }
    } catch (err) {
      console.error('❌ Error fetching release:', err)
    } finally {
      console.log('🏁 Loading complete. Loading state:', false)
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (!bytes) return ''
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(1)} MB`
  }

  const getDirectDownloadUrl = (version: string, arch: string) => {
    return `https://codeagentswarm-backend-production.up.railway.app/api/releases/download-dmg/${version}/${arch}`
  }

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-black to-dark-900" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-radial from-neon-purple/20 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-gradient-radial from-neon-cyan/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-radial from-neon-magenta/10 via-transparent to-transparent blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="heading-lg mb-6">
            <span className="text-white">{t('titleLine1')}</span>{' '}
            <span className="gradient-text italic">{t('titleHighlight')}</span>
            <br />
            <span className="text-white">{t('titleLine2')}</span>
          </h2>

          <p className="text-lg text-white/50 mb-8 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {latestRelease && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-sm mb-12 flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              {t('version')} {latestRelease.version} • {t('released')}{' '}
              {new Date(latestRelease.releaseDate).toLocaleDateString()}
            </motion.p>
          )}
        </motion.div>

        {/* Debug Info - Remove this later */}
        {loading && (
          <div className="text-white/50 text-center mb-8">
            {t('loading')}
          </div>
        )}
        {!loading && !latestRelease && (
          <div className="text-red-400 text-center mb-8">
            {t('noReleases')}
          </div>
        )}

        {/* Download Options */}
        {!loading && latestRelease && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative rounded-3xl overflow-hidden">
              {/* Animated border */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta opacity-30 blur-sm" />

              <div className="relative glass rounded-3xl p-8">
                {/* Platform Header */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  <Image
                    src="/icons/apple-logo.png"
                    alt="Apple"
                    width={32}
                    height={32}
                    className="opacity-80 invert"
                  />
                  <span className="text-xl font-display font-medium text-white">
                    {t('downloadFor')} macOS
                  </span>
                </div>

                {/* Download Cards */}
                <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {/* Apple Silicon */}
                  {latestRelease.formattedDownloads.macArm && (
                    <motion.a
                      href={getDirectDownloadUrl(latestRelease.version, 'arm64')}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-green/20 to-emerald-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                      <div className="relative p-6 rounded-xl glass border border-white/5 group-hover:border-neon-green/30 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-display font-medium text-white mb-1">
                              {t('platforms.appleSilicon')}
                            </h3>
                            <p className="text-white/40 text-sm">{t('platforms.appleSiliconChips')}</p>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <Image
                              src="/icons/apple-logo.png"
                              alt="Apple Silicon"
                              width={20}
                              height={20}
                              className="opacity-90 invert"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-white/30 text-sm">
                            {formatFileSize(latestRelease.formattedDownloads.macArm.fileSize)}
                          </span>
                          <div className="flex items-center gap-2 text-neon-green">
                            <Download className="w-4 h-4" />
                            <span className="font-medium">{t('downloadDmg')}</span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  )}

                  {/* Intel */}
                  {latestRelease.formattedDownloads.macIntel && (
                    <motion.a
                      href={getDirectDownloadUrl(latestRelease.version, 'x64')}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-blue-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
                      <div className="relative p-6 rounded-xl glass border border-white/5 group-hover:border-neon-cyan/30 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-display font-medium text-white mb-1">
                              {t('platforms.intel')}
                            </h3>
                            <p className="text-white/40 text-sm">{t('platforms.intelProcessors')}</p>
                          </div>
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                            <Image
                              src="/icons/intel-logo.png"
                              alt="Intel"
                              width={20}
                              height={20}
                              className="opacity-90 invert"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-white/30 text-sm">
                            {formatFileSize(latestRelease.formattedDownloads.macIntel.fileSize)}
                          </span>
                          <div className="flex items-center gap-2 text-neon-cyan">
                            <Download className="w-4 h-4" />
                            <span className="font-medium">{t('downloadDmg')}</span>
                          </div>
                        </div>
                      </div>
                    </motion.a>
                  )}
                </div>

                {/* Older Versions Toggle */}
                {olderReleases.length > 0 && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={() => setShowOlderVersions(!showOlderVersions)}
                      className="inline-flex items-center gap-2 text-white/40 hover:text-white/60 transition-colors text-sm"
                    >
                      <motion.div
                        animate={{ rotate: showOlderVersions ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </motion.div>
                      {showOlderVersions ? t('olderVersions.hide') : t('olderVersions.show')}
                    </button>

                    {/* Older Versions List */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: showOlderVersions ? 'auto' : 0,
                        opacity: showOlderVersions ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 mt-6 border-t border-white/5 space-y-4">
                        {olderReleases.map((release) => (
                          <div
                            key={release.version}
                            className="p-4 rounded-xl glass border border-white/5"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-white font-medium">
                                  {t('version')} {release.version}
                                </span>
                                <span className="text-white/30 text-sm ml-3">
                                  {new Date(release.releaseDate).toLocaleDateString()}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {release.formattedDownloads.macArm && (
                                <a
                                  href={getDirectDownloadUrl(release.version, 'arm64')}
                                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                                >
                                  <Image
                                    src="/icons/apple-logo.png"
                                    alt="Apple Silicon"
                                    width={14}
                                    height={14}
                                    className="opacity-70 invert"
                                  />
                                  <span className="text-white/70">{t('platforms.appleSilicon')}</span>
                                  <Download className="w-3 h-3 text-white/40" />
                                </a>
                              )}
                              {release.formattedDownloads.macIntel && (
                                <a
                                  href={getDirectDownloadUrl(release.version, 'x64')}
                                  className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-sm"
                                >
                                  <Image
                                    src="/icons/intel-logo.png"
                                    alt="Intel"
                                    width={14}
                                    height={14}
                                    className="opacity-70 invert"
                                  />
                                  <span className="text-white/70">{t('platforms.intel')}</span>
                                  <Download className="w-3 h-3 text-white/40" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Discord CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <a
            href="https://discord.gg/AMxQ7Zh6?utm_source=download_section"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass border border-[#5865F2]/30 hover:border-[#5865F2]/60 hover:bg-[#5865F2]/10 transition-all group"
          >
            <svg className="w-6 h-6 text-[#5865F2]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span className="text-white font-medium group-hover:text-[#5865F2] transition-colors">Join our Discord</span>
          </a>
        </motion.div>

        {/* Platform Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-white/30 text-sm mb-4">{t('availableFor')}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10">
              <Image
                src="/icons/apple-logo.png"
                alt="macOS"
                width={20}
                height={20}
                className="opacity-70 invert"
              />
              <span className="text-white/70">macOS</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 opacity-50">
              <Image
                src="/icons/windows-logo.png"
                alt="Windows"
                width={20}
                height={20}
                className="opacity-70"
              />
              <span className="text-white/40">{t('platforms.windowsSoon')}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/5 opacity-50">
              <Image
                src="/icons/linux-logo.png"
                alt="Linux"
                width={20}
                height={20}
                className="opacity-70"
              />
              <span className="text-white/40">{t('platforms.linuxSoon')}</span>
            </div>
          </div>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 rounded-2xl glass border border-white/5"
        >
          <h3 className="text-white font-display font-medium mb-4">
            {t('requirements.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-white/50 mb-4">
            <div>
              <span className="text-white/70 font-medium">macOS:</span> {t('requirements.macos')}
            </div>
            <div>
              <span className="text-white/70 font-medium">{t('requirements.memoryLabel')}:</span> {t('requirements.memory')}
            </div>
            <div>
              <span className="text-white/70 font-medium">{t('requirements.storageLabel')}:</span> {t('requirements.storage')}
            </div>
            <div>
              <span className="text-white/70 font-medium">Claude Code:</span> {t('requirements.claudeCode')}
            </div>
          </div>
          <p className="text-white/30 text-xs pt-4 border-t border-white/5">
            {t('requirements.gatekeeper')}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
