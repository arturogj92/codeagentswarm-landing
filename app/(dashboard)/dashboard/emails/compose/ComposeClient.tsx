'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface TemplateInfo {
  slug: string
  filename: string
  title: string
}

export default function ComposeClient() {
  const router = useRouter()

  // Template state
  const [templates, setTemplates] = useState<TemplateInfo[]>([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [templateHtml, setTemplateHtml] = useState('')
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [loadingPreview, setLoadingPreview] = useState(false)

  // Form state
  const [to, setTo] = useState('')
  const [subject, setSubject] = useState('')
  const [name, setName] = useState('')

  // Send state
  const [sending, setSending] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Fetch available templates on mount
  useEffect(() => {
    async function loadTemplates() {
      try {
        const res = await fetch('/api/dashboard/emails/templates')
        if (!res.ok) throw new Error('Failed to load templates')
        const json = await res.json()
        setTemplates(json.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load templates')
      } finally {
        setLoadingTemplates(false)
      }
    }
    loadTemplates()
  }, [])

  // Load template HTML when selection changes
  const loadTemplateContent = useCallback(async (slug: string) => {
    if (!slug) {
      setTemplateHtml('')
      setSubject('')
      return
    }

    setLoadingPreview(true)
    try {
      const res = await fetch(`/api/dashboard/emails/templates/${slug}`)
      if (!res.ok) throw new Error('Failed to load template')
      const json = await res.json()
      setTemplateHtml(json.html || '')

      // Extract title for subject pre-fill
      const titleMatch = json.html?.match(/<title>(.*?)<\/title>/i)
      if (titleMatch) {
        setSubject(titleMatch[1].trim())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load template')
    } finally {
      setLoadingPreview(false)
    }
  }, [])

  useEffect(() => {
    loadTemplateContent(selectedSlug)
  }, [selectedSlug, loadTemplateContent])

  // Personalized HTML for live preview
  const previewHtml = templateHtml
    ? templateHtml.replaceAll('{{name}}', name || '{{name}}')
    : ''

  // Parse recipients
  function parseRecipients(): string[] {
    return to
      .split(',')
      .map(e => e.trim())
      .filter(e => e.length > 0 && e.includes('@'))
  }

  // Validate form
  function isValid(): boolean {
    return parseRecipients().length > 0 && subject.trim().length > 0 && selectedSlug.length > 0
  }

  // Send email
  async function handleSend() {
    setShowConfirm(false)
    setSending(true)
    setError('')
    setSuccess('')

    try {
      const recipients = parseRecipients()
      const res = await fetch('/api/dashboard/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: recipients,
          subject: subject.trim(),
          templateSlug: selectedSlug,
          variables: { name: name.trim() },
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to send email')
      }

      setSuccess(`Email sent to ${recipients.join(', ')}`)
      setTimeout(() => router.push('/dashboard/emails'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send email')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/dashboard/emails')}
            className="text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold text-white/90">Compose Email</h1>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400 text-sm">
          {error}
          <button onClick={() => setError('')} className="ml-3 underline cursor-pointer">Dismiss</button>
        </div>
      )}
      {success && (
        <div className="mb-4 px-4 py-3 bg-green-400/10 border border-green-400/20 rounded-lg text-green-400 text-sm">
          {success}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Form */}
        <div className="w-full lg:w-1/2 space-y-4">
          {/* Template Selector */}
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-4">
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider">
              Template
            </label>
            {loadingTemplates ? (
              <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
            ) : (
              <select
                value={selectedSlug}
                onChange={e => setSelectedSlug(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 focus:outline-none focus:border-amber-400/40 transition-colors cursor-pointer"
              >
                <option value="">Select a template...</option>
                {templates.map(t => (
                  <option key={t.slug} value={t.slug}>
                    {t.title} ({t.filename})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Recipients */}
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-4">
            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                To
              </label>
              <input
                type="text"
                value={to}
                onChange={e => setTo(e.target.value)}
                placeholder="user@example.com, another@example.com"
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
              />
              <p className="mt-1.5 text-xs text-white/20">Separate multiple addresses with commas</p>
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Email subject..."
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-2">
                Name <span className="normal-case text-white/15">(replaces {'{{name}}'} in template)</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Recipient name..."
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard/emails')}
              className="px-4 py-2.5 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white/80 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowConfirm(true)}
              disabled={!isValid() || sending}
              className="px-6 py-2.5 text-sm bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 hover:border-amber-400/30 rounded-lg text-amber-400 font-medium transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Email'}
            </button>
          </div>

          {/* Recipient summary */}
          {to && parseRecipients().length > 0 && (
            <p className="text-xs text-white/20">
              Will send to {parseRecipients().length} recipient{parseRecipients().length > 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Right: Preview */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden sticky top-4">
            <div className="px-4 py-3 border-b border-white/10">
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">Preview</h3>
            </div>

            {loadingPreview ? (
              <div className="p-8 text-center text-white/20 text-sm">Loading template...</div>
            ) : previewHtml ? (
              <iframe
                ref={iframeRef}
                srcDoc={previewHtml}
                sandbox="allow-same-origin"
                className="w-full min-h-[500px] bg-white rounded-b-xl"
                title="Email preview"
                style={{ border: 'none' }}
              />
            ) : (
              <div className="p-12 text-center">
                <svg className="w-12 h-12 mx-auto text-white/10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <p className="text-white/20 text-sm">Select a template to preview</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-base font-medium text-white/90 mb-3">Confirm Send</h3>
            <div className="space-y-2 text-sm text-white/50 mb-6">
              <p><span className="text-white/30">To:</span> {parseRecipients().join(', ')}</p>
              <p><span className="text-white/30">Subject:</span> {subject}</p>
              <p><span className="text-white/30">Template:</span> {selectedSlug}</p>
              {name && <p><span className="text-white/30">Name:</span> {name}</p>}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="px-4 py-2 text-sm bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 rounded-lg text-amber-400 font-medium transition-colors cursor-pointer"
              >
                Confirm Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
