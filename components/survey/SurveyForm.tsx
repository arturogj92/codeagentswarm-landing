'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Send, CheckCircle, ArrowLeft } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

const NPS_SCORES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const

interface SurveyFormData {
  role: string
  frequency: string
  likes: string
  frustrations: string
  featureRequest: string
  willingness: string
  nps: number | null
  email: string
}

export default function SurveyForm() {
  const t = useTranslations('survey')
  const locale = useLocale()
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const [formData, setFormData] = useState<SurveyFormData>({
    role: '',
    frequency: '',
    likes: '',
    frustrations: '',
    featureRequest: '',
    willingness: '',
    nps: null,
    email: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (formData.nps === null) {
      setError(t('error'))
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: formData.role,
          frequency: formData.frequency,
          likes: formData.likes,
          frustrations: formData.frustrations,
          featureRequest: formData.featureRequest,
          willingness: formData.willingness,
          nps: formData.nps,
          email: formData.email || null,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to submit survey')
      }

      if (typeof window !== 'undefined') {
        window.umami?.track('survey_submit')
      }

      setIsSuccess(true)
    } catch (err) {
      if (typeof window !== 'undefined') {
        window.umami?.track('survey_submit_error')
      }
      setError(err instanceof Error ? err.message : t('error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const roleOptions = [
    { value: 'frontend', label: t('questions.roleOptions.frontend') },
    { value: 'backend', label: t('questions.roleOptions.backend') },
    { value: 'fullstack', label: t('questions.roleOptions.fullstack') },
    { value: 'devops', label: t('questions.roleOptions.devops') },
    { value: 'techlead', label: t('questions.roleOptions.techlead') },
    { value: 'other', label: t('questions.roleOptions.other') },
  ]

  const frequencyOptions = [
    { value: 'daily', label: t('questions.frequencyOptions.daily') },
    { value: 'fewTimesWeek', label: t('questions.frequencyOptions.fewTimesWeek') },
    { value: 'weekly', label: t('questions.frequencyOptions.weekly') },
    { value: 'rarely', label: t('questions.frequencyOptions.rarely') },
    { value: 'notStarted', label: t('questions.frequencyOptions.notStarted') },
  ]

  const willingnessOptions = [
    { value: 'yes5_10', label: t('questions.willingnessOptions.yes5_10') },
    { value: 'yes10_20', label: t('questions.willingnessOptions.yes10_20') },
    { value: 'yes20plus', label: t('questions.willingnessOptions.yes20plus') },
    { value: 'freeOnly', label: t('questions.willingnessOptions.freeOnly') },
  ]

  return (
    <section
      id="survey-form"
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
              {t('subtitle')}
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
                {/* Q1: Role */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.role')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white transition-colors bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-gray-900 text-white/30">
                      {t('questions.rolePlaceholder')}
                    </option>
                    {roleOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Q2: Frequency */}
                <div>
                  <label htmlFor="frequency" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.frequency')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="frequency"
                    required
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white transition-colors bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-gray-900 text-white/30">
                      {t('questions.frequencyPlaceholder')}
                    </option>
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Q3: Likes */}
                <div>
                  <label htmlFor="likes" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.likes')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="likes"
                    rows={4}
                    required
                    value={formData.likes}
                    onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                    placeholder={t('questions.likesPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Q4: Frustrations */}
                <div>
                  <label htmlFor="frustrations" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.frustrations')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="frustrations"
                    rows={4}
                    required
                    value={formData.frustrations}
                    onChange={(e) => setFormData({ ...formData, frustrations: e.target.value })}
                    placeholder={t('questions.frustrationsPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Q5: Feature Request */}
                <div>
                  <label htmlFor="featureRequest" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.featureRequest')} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="featureRequest"
                    rows={4}
                    required
                    value={formData.featureRequest}
                    onChange={(e) => setFormData({ ...formData, featureRequest: e.target.value })}
                    placeholder={t('questions.featureRequestPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors resize-none"
                  />
                </div>

                {/* Q6: Willingness to Pay */}
                <div>
                  <label htmlFor="willingness" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.willingness')} <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="willingness"
                    required
                    value={formData.willingness}
                    onChange={(e) => setFormData({ ...formData, willingness: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white transition-colors bg-transparent appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="bg-gray-900 text-white/30">
                      {t('questions.willingnessPlaceholder')}
                    </option>
                    {willingnessOptions.map((option) => (
                      <option key={option.value} value={option.value} className="bg-gray-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Q7: NPS Score */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-3">
                    {t('questions.nps')} <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {NPS_SCORES.map((score) => (
                      <button
                        key={score}
                        type="button"
                        onClick={() => setFormData({ ...formData, nps: score })}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          formData.nps === score
                            ? 'bg-neon-cyan text-black font-bold scale-110'
                            : 'glass border border-white/10 text-white/50 hover:border-neon-cyan/30 hover:text-white/80'
                        }`}
                      >
                        {score}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 px-1">
                    <span className="text-white/30 text-xs">{t('questions.npsNotLikely')}</span>
                    <span className="text-white/30 text-xs">{t('questions.npsVeryLikely')}</span>
                  </div>
                </div>

                {/* Optional Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    {t('questions.email')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('questions.emailPlaceholder')}
                    className="w-full px-4 py-3 rounded-xl glass border border-white/10 focus:border-neon-cyan/50 focus:outline-none text-white placeholder-white/30 transition-colors"
                  />
                  <p className="text-white/30 text-xs mt-1.5">{t('questions.emailHint')}</p>
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
                      {t('submitting')}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('submit')}
                    </>
                  )}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="py-10 text-center"
              >
                {/* Success Icon with pulse animation */}
                <div className="relative inline-flex items-center justify-center w-20 h-20 mb-6">
                  <div className="absolute inset-0 rounded-full bg-neon-green/20 animate-ping" />
                  <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-neon-green/20">
                    <CheckCircle className="w-10 h-10 text-neon-green" />
                  </div>
                </div>

                {/* Confetti-like sparkles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${10 + Math.random() * 30}%`,
                        backgroundColor: ['#fbbf24', '#22d3ee', '#a855f7', '#34d399'][i % 4],
                      }}
                      initial={{ opacity: 0, y: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, -40 - Math.random() * 60],
                        scale: [0, 1.5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1,
                        ease: 'easeOut',
                      }}
                    />
                  ))}
                </div>

                <h3 className="text-2xl font-display font-bold text-white mb-2">
                  {t('success.title')}
                </h3>
                <p className="text-white/60 mb-8">
                  {t('success.subtitle')}
                </p>

                <Link
                  href={`/${locale}`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-black bg-neon-cyan hover:bg-amber-400 transition-all"
                >
                  <ArrowLeft className="w-5 h-5" />
                  {t('success.backHome')}
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
