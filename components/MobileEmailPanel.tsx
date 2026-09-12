'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Mail, Smartphone } from 'lucide-react'

// Shown only on mobile viewports (max-width 767px): visitors on a phone can't
// install a desktop app, so we offer to email them the download link instead.
export default function MobileEmailPanel({ guide }: { guide?: string }) {
  const t = useTranslations('cta.mobileEmail')
  const locale = useLocale()
  const g = useTranslations('guides.productBlock')
  const inputId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const tracking: Record<string, string> = guide ? { guide, source: 'guide', position: 'product_block' } : { source: 'home' }
  const panelRef = useRef<HTMLDivElement>(null)
  const viewTracked = useRef(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'rateLimited'>('idle')

  // Track mobile_link_offer_view once, when the panel enters the viewport.
  useEffect(() => {
    const el = panelRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !viewTracked.current) {
          viewTracked.current = true
          window.umami?.track('mobile_link_offer_view', guide ? { guide, source: 'guide', position: 'product_block' } : { source: 'home' })
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [guide])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || status === 'sending') return

    setStatus('sending')
    try {
      const response = await fetch('/api/download-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      })

      const result = response.ok ? await response.json() : null
      if (response.ok && result?.emailSent === true) {
        setStatus('success')
        window.umami?.track('mobile_link_submit', { ...tracking, domain: email.split('@')[1] || '' })
      } else if (response.status === 429) {
        setStatus('rateLimited')
        window.umami?.track('mobile_link_error', { ...tracking, reason: 'rate_limited' })
      } else {
        setStatus('error')
        window.umami?.track('mobile_link_error', { ...tracking, reason: response.ok ? 'email_not_sent' : `http_${response.status}` })
      }
    } catch {
      setStatus('error')
      window.umami?.track('mobile_link_error', { ...tracking, reason: 'network' })
    }
  }

  return (
    <div
      ref={panelRef}
      className={guide ? '' : 'mb-8 rounded-2xl bg-neutral-950 border border-neon-cyan/30 p-5'}
    >
      {guide ? <p className="text-[13px] text-neutral-300 mb-3 leading-relaxed">{g('mobilePrompt')}</p> : <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 shrink-0 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex items-center justify-center">
          <Smartphone className="w-5 h-5 text-neon-cyan" aria-hidden="true" />
        </div>
        <div>
          <h3 className="text-white font-display font-semibold text-base leading-snug">
            {t('title')}
          </h3>
          <p className="text-neutral-400 text-sm mt-1">{t('description')}</p>
        </div>
      </div>}

      {status !== 'success' ? (
        <>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label htmlFor={inputId} className="sr-only">
              {g('emailLabel')}
            </label>
            <div className="relative">
              {!guide && <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
                aria-hidden="true"
              />}
              <input
                id={inputId}
                ref={inputRef}
                maxLength={254}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                required
                autoComplete="email"
                inputMode="email"
                className={`w-full pr-4 py-3 bg-white/5 border border-white/10 text-white focus:outline-none focus:border-neon-cyan transition-colors ${guide ? 'pl-3 text-sm rounded-[9px] placeholder-neutral-500' : 'pl-11 rounded-xl placeholder-neutral-600'}`}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-3 min-h-[46px] bg-neon-cyan text-black font-semibold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neon-cyan ${guide ? 'rounded-[9px] text-[13px] text-left px-3.5' : 'rounded-xl'}`}
            >
              {status === 'sending' ? t('sending') : guide ? g('emailButton') : t('button')}
              {guide && status !== 'sending' && <span aria-hidden="true" className="ml-2">↗</span>}
            </button>
          </form>

          <div role="status" aria-live="polite">
            {status === 'error' && (
              <p className="text-red-400 text-sm mt-3">{t('error')}</p>
            )}
            {status === 'rateLimited' && (
              <p className="text-amber-400 text-sm mt-3">{t('rateLimited')}</p>
            )}
          </div>

          <p className={guide ? 'text-neutral-400 text-[10px] mt-3 leading-relaxed' : 'text-neutral-600 text-xs mt-3'}>{t('privacy')}</p>
        </>
      ) : (
        <div>
          <div role="status" aria-live="polite" className={guide ? 'p-4 border border-emerald-400/20 bg-emerald-500/5 rounded-[9px] text-sm text-emerald-200' : 'flex items-center gap-3 py-2'}>
            {!guide && <div className="w-8 h-8 shrink-0 rounded-full bg-green-500/20 flex items-center justify-center">
              <svg
                className="w-4 h-4 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>}
            <p className={guide ? '' : 'text-white font-medium'}>{t('success')}</p>
          </div>
          {guide && <button type="button" className="mt-3 text-xs text-neutral-300 underline underline-offset-4" onClick={() => { setStatus('idle'); requestAnimationFrame(() => inputRef.current?.focus()) }}>{g('emailReset')}</button>}
        </div>
      )}
    </div>
  )
}
