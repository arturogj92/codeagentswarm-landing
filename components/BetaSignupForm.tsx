'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, CheckCircle, Download, Check, Square } from 'lucide-react'
import { useTranslations } from 'next-intl'

const DISCORD_URL = 'https://discord.gg/AMxQ7Zh6?utm_source=beta_page'

export default function BetaSignupForm() {
  const t = useTranslations('beta.form')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState({
    email: '',
    osVersion: '',
    usageNotes: '',
    agreedToBetaEmails: false,
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

      // Track successful form submission
      if (typeof window !== 'undefined') {
        window.umami?.track('beta_form_submit')
      }

      setIsSuccess(true)
      setFormData({
        email: '',
        osVersion: '',
        usageNotes: '',
        agreedToBetaEmails: false,
      })
    } catch (err) {
      // Track form error
      if (typeof window !== 'undefined') {
        window.umami?.track('beta_form_error')
      }
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
          {!isSuccess && (
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              {t('stepTitle')}
            </p>
          )}
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Border glow */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-neon-cyan/50 via-neon-cyan/30 to-neon-cyan/50" />

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
                  <label htmlFor="osVersion" className="block text-sm font-medium text-white/80 mb-2">
                    {t('macosLabel')}
                  </label>
                  <input
                    type="text"
                    id="osVersion"
                    value={formData.osVersion}
                    onChange={(e) => setFormData({ ...formData, osVersion: e.target.value })}
                    placeholder={t('macosPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors"
                  />
                </div>

                {/* Usage Notes */}
                <div>
                  <label htmlFor="usageNotes" className="block text-sm font-medium text-white/80 mb-2">
                    {t('usageLabel')}
                  </label>
                  <textarea
                    id="usageNotes"
                    rows={4}
                    value={formData.usageNotes}
                    onChange={(e) => setFormData({ ...formData, usageNotes: e.target.value })}
                    placeholder={t('usagePlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Consent - Agreed to Beta Emails */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="agreedToBetaEmails"
                    required
                    checked={formData.agreedToBetaEmails}
                    onChange={(e) => setFormData({ ...formData, agreedToBetaEmails: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-neon-cyan focus:ring-neon-cyan/50 focus:ring-offset-0"
                  />
                  <label htmlFor="agreedToBetaEmails" className="text-sm text-white/70">
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
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black bg-neon-cyan hover:bg-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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

                {/* Visual Checklist */}
                <div className="space-y-3 mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-neon-green/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-neon-green" />
                    </div>
                    <p className="text-white/80 pt-0.5">{t('checklist.step1Done')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                      <Square className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-white/60 pt-0.5">{t('checklist.step2')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                      <Square className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-white/60 pt-0.5">{t('checklist.step3')}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-md bg-white/10 flex items-center justify-center">
                      <Square className="w-4 h-4 text-white/40" />
                    </div>
                    <p className="text-white/60 pt-0.5">{t('checklist.step4')}</p>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="text-center mb-8">
                  <p className="text-sm text-neon-cyan/80 font-medium">
                    {t('socialProof')}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.umami?.track('download_app_beta')
                      }
                      document.getElementById('download')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black bg-neon-cyan hover:bg-amber-400 transition-all"
                  >
                    <Download className="w-5 h-5" />
                    {t('downloadButton')}
                  </button>

                  <a
                    href={DISCORD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        window.umami?.track('discord_join_beta')
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-[#5865F2] hover:bg-[#4752C4] transition-all"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    {t('discordButton')}
                  </a>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
