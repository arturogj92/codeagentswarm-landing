'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Download, ChevronDown, Calendar, X, Mail, Rocket, Bell } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

// FOMO Popup Component for Windows/Linux users
function FOMOPopup({
  isOpen,
  onClose,
  platform
}: {
  isOpen: boolean
  onClose: () => void
  platform: 'windows' | 'linux'
}) {
  const t = useTranslations('fomo')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)

    // Track the submission
    if (typeof window !== 'undefined') {
      window.umami?.track('fomo_email_submit', { platform, email: email.split('@')[1] })
    }

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          platform: platform
        })
      })

      if (response.ok || response.status === 409) {
        // Success or already registered - both are fine
        setSubmitted(true)
      } else {
        console.error('Waitlist API error:', response.status)
        // Still show success to user for better UX
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Error submitting to waitlist:', error)
      // Show success anyway for better UX
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-neutral-950 rounded-2xl border border-white/10 p-8 overflow-hidden">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-white/50" />
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Rocket className="w-8 h-8 text-white" />
              </div>
            </div>

            {!submitted ? (
              <>
                {/* Title */}
                <h3 className="text-2xl font-display font-bold text-center text-white mb-2">
                  {t('title')}
                </h3>

                <p className="text-center text-neutral-400 mb-6">
                  {t('description').replaceAll('{platform}', platform === 'windows' ? 'Windows' : 'Linux')}
                </p>

                {/* Benefits */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-neutral-400 text-sm">
                    <Bell className="w-4 h-4 text-neutral-500" />
                    <span>{t('benefit1')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-400 text-sm">
                    <Rocket className="w-4 h-4 text-neutral-500" />
                    <span>{t('benefit2')}</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t('sending') : t('submit')}
                  </button>
                </form>

                <p className="text-center text-neutral-600 text-xs mt-4">
                  {t('privacy').replaceAll('{platform}', platform === 'windows' ? 'Windows' : 'Linux')}
                </p>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-2">{t('success')}</h3>
                <p className="text-neutral-400">{t('successDesc', { platform: platform === 'windows' ? 'Windows' : 'Linux' })}</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

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
  const [fomoPopup, setFomoPopup] = useState<{ open: boolean; platform: 'windows' | 'linux' }>({ open: false, platform: 'windows' })

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

  const notifyLandingEvent = (event: string, data: Record<string, string>) => {
    fetch('https://codeagentswarm-backend-production.up.railway.app/api/notifications/landing-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, data })
    }).catch(() => {})
  }

  return (
    <section
      id="download"
      ref={sectionRef}
      className="relative py-16 md:py-32 px-6 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-black" />

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

          <p className="text-lg text-neutral-400 mb-6 max-w-2xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>

          {/* Zero Friction Message */}
          <p className="text-sm text-amber-400/80 mb-8">
            {t('instantSetup')}
          </p>

          {latestRelease && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="text-neutral-500 text-sm mb-12 flex items-center justify-center gap-2"
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
            <div className="relative rounded-3xl overflow-hidden border border-white/10">
              <div className="relative bg-neutral-950 rounded-3xl p-8">
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
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.umami?.track('download_app_home_silicon')
                          notifyLandingEvent('download_app', { architecture: 'silicon', version: latestRelease?.version || '' })
                        }
                      }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative"
                    >
                      <div className="relative p-6 rounded-xl bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-display font-medium text-white mb-1">
                              {t('platforms.appleSilicon')}
                            </h3>
                            <p className="text-neutral-500 text-sm">{t('platforms.appleSiliconChips')}</p>
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
                          <span className="text-neutral-600 text-sm">
                            {formatFileSize(latestRelease.formattedDownloads.macArm.fileSize)}
                          </span>
                          <div className="flex items-center gap-2 text-white">
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
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          window.umami?.track('download_app_home_intel')
                          notifyLandingEvent('download_app', { architecture: 'intel', version: latestRelease?.version || '' })
                        }
                      }}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative"
                    >
                      <div className="relative p-6 rounded-xl bg-neutral-900 border border-white/10 group-hover:border-white/20 transition-all">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-display font-medium text-white mb-1">
                              {t('platforms.intel')}
                            </h3>
                            <p className="text-neutral-500 text-sm">{t('platforms.intelProcessors')}</p>
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
                          <span className="text-neutral-600 text-sm">
                            {formatFileSize(latestRelease.formattedDownloads.macIntel.fileSize)}
                          </span>
                          <div className="flex items-center gap-2 text-white">
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
                      <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                        {olderReleases.map((release) => (
                          <div
                            key={release.version}
                            className="p-4 rounded-xl bg-neutral-900 border border-white/10"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-white font-medium">
                                  {t('version')} {release.version}
                                </span>
                                <span className="text-neutral-500 text-sm ml-3">
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
                                  <span className="text-neutral-400">{t('platforms.appleSilicon')}</span>
                                  <Download className="w-3 h-3 text-neutral-500" />
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
                                  <span className="text-neutral-400">{t('platforms.intel')}</span>
                                  <Download className="w-3 h-3 text-neutral-500" />
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

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-12"
        >
          <a
            href="mailto:hello@codeagentswarm.com"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.umami?.track('contact_email_download')
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 border border-white/10 hover:border-white/20 transition-all group"
          >
            <svg className="w-6 h-6 text-neon-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <span className="text-white font-medium group-hover:text-white transition-colors">hello@codeagentswarm.com</span>
          </a>
        </motion.div>

        {/* Platform Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <p className="text-neutral-500 text-sm mb-4">{t('availableFor')}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/10">
              <Image
                src="/icons/apple-logo.png"
                alt="macOS"
                width={20}
                height={20}
                className="opacity-70 invert"
              />
              <span className="text-neutral-400">macOS</span>
            </div>
            <button
              onClick={() => {
                setFomoPopup({ open: true, platform: 'windows' })
                if (typeof window !== 'undefined') {
                  window.umami?.track('windows_coming_soon_click')
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
            >
              <Image
                src="/icons/windows-logo.png"
                alt="Windows"
                width={20}
                height={20}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors">{t('platforms.windowsSoon')}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-400 font-medium">
                {t('platforms.notify')}
              </span>
            </button>
            <button
              onClick={() => {
                setFomoPopup({ open: true, platform: 'linux' })
                if (typeof window !== 'undefined') {
                  window.umami?.track('linux_coming_soon_click')
                }
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
            >
              <Image
                src="/icons/linux-logo.png"
                alt="Linux"
                width={20}
                height={20}
                className="opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-neutral-500 group-hover:text-neutral-400 transition-colors">{t('platforms.linuxSoon')}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-neutral-400 font-medium">
                {t('platforms.notify')}
              </span>
            </button>
          </div>
        </motion.div>

        {/* System Requirements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="p-6 rounded-2xl bg-neutral-950 border border-white/10"
        >
          <h3 className="text-white font-display font-medium mb-4">
            {t('requirements.title')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-500 mb-4">
            <div>
              <span className="text-neutral-400 font-medium">macOS:</span> {t('requirements.macos')}
            </div>
            <div>
              <span className="text-neutral-400 font-medium">{t('requirements.memoryLabel')}:</span> {t('requirements.memory')}
            </div>
            <div>
              <span className="text-neutral-400 font-medium">{t('requirements.storageLabel')}:</span> {t('requirements.storage')}
            </div>
            <div>
              <span className="text-neutral-400 font-medium">Claude Code:</span> {t('requirements.claudeCode')}
            </div>
          </div>
          <p className="text-neutral-600 text-xs pt-4 border-t border-white/10">
            {t('requirements.gatekeeper')}
          </p>
        </motion.div>
      </div>

      {/* FOMO Popup for Windows/Linux */}
      <FOMOPopup
        isOpen={fomoPopup.open}
        onClose={() => setFomoPopup({ ...fomoPopup, open: false })}
        platform={fomoPopup.platform}
      />
    </section>
  )
}
