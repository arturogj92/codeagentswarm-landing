'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, CheckCircle, Download, LogIn, MessageCircle, ArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function BetaSignupForm() {
  const t = useTranslations('beta.form')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({
    email: '',
    macosVersion: '',
    usage: '',
    consent: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/beta-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit form')
      }

      setIsSuccess(true)
      setFormData({
        email: '',
        macosVersion: '',
        usage: '',
        consent: false,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="beta-signup-form"
      ref={sectionRef}
      className="relative py-16 md:py-24 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-dark-900 to-black" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="heading-lg mb-4">
            <span className="gradient-text">{t('title')}</span>
          </h2>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Border glow */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/40 via-neon-purple/40 to-neon-magenta/40" />

          {/* Form Container */}
          <div className="relative rounded-2xl glass p-8 md:p-10">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    {t('emailLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors"
                  />
                </div>

                {/* macOS Version */}
                <div>
                  <label htmlFor="macosVersion" className="block text-sm font-medium text-white/80 mb-2">
                    {t('macosLabel')}
                  </label>
                  <input
                    type="text"
                    id="macosVersion"
                    value={formData.macosVersion}
                    onChange={(e) => setFormData({ ...formData, macosVersion: e.target.value })}
                    placeholder={t('macosPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors"
                  />
                </div>

                {/* Usage */}
                <div>
                  <label htmlFor="usage" className="block text-sm font-medium text-white/80 mb-2">
                    {t('usageLabel')}
                  </label>
                  <textarea
                    id="usage"
                    rows={4}
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    placeholder={t('usagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    required
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan/50 focus:ring-offset-0"
                  />
                  <label htmlFor="consent" className="text-sm text-white/70">
                    {t('consentLabel')}
                  </label>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-neon-purple to-neon-magenta hover:shadow-neon-purple transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('submitButton')}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="py-6">
                {/* Success Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neon-green/20 mb-4">
                    <CheckCircle className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-white mb-2">
                    {t('successTitle')}
                  </h3>
                  <p className="text-white/60">
                    {t('successSubtitle')}
                  </p>
                </div>

                {/* Steps */}
                <div className="space-y-4 mb-8">
                  {/* Step 1 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                      <span className="text-neon-cyan font-bold">1</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Download className="w-4 h-4 text-neon-cyan" />
                        <span className="font-semibold text-white">{t('successStep1Title')}</span>
                      </div>
                      <p className="text-sm text-white/60">{t('successStep1Desc')}</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <span className="text-neon-purple font-bold">2</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <LogIn className="w-4 h-4 text-neon-purple" />
                        <span className="font-semibold text-white">{t('successStep2Title')}</span>
                      </div>
                      <p className="text-sm text-white/60">{t('successStep2Desc')}</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-neon-magenta/20 flex items-center justify-center">
                      <span className="text-neon-magenta font-bold">3</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageCircle className="w-4 h-4 text-neon-magenta" />
                        <span className="font-semibold text-white">{t('successStep3Title')}</span>
                      </div>
                      <p className="text-sm text-white/60">{t('successStep3Desc')}</p>
                    </div>
                  </div>
                </div>

                {/* Note */}
                <p className="text-center text-sm text-neon-green/80 mb-6">
                  {t('successNote')}
                </p>

                {/* Download Button */}
                <button
                  onClick={() => {
                    document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-neon-cyan to-neon-purple hover:shadow-neon-cyan transition-all"
                >
                  <Download className="w-5 h-5" />
                  {t('downloadButton')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
