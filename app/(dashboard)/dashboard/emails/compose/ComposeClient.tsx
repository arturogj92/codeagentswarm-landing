'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface TemplateInfo {
  slug: string
  filename: string
  title: string
}

interface UserInfo {
  id: string
  email: string
  name: string
  provider: string
  tier: string
  createdAt: string
}

interface Recipient {
  email: string
  name: string
}

export default function ComposeClient() {
  const router = useRouter()

  // Template state
  const [templates, setTemplates] = useState<TemplateInfo[]>([])
  const [selectedSlug, setSelectedSlug] = useState('')
  const [templateHtml, setTemplateHtml] = useState('')
  const [loadingTemplates, setLoadingTemplates] = useState(true)
  const [loadingPreview, setLoadingPreview] = useState(false)

  // Users state
  const [users, setUsers] = useState<UserInfo[]>([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set())
  const [userSearch, setUserSearch] = useState('')
  const [nameOverrides, setNameOverrides] = useState<Record<string, string>>({})

  // Form state
  const [manualTo, setManualTo] = useState('')
  const [manualName, setManualName] = useState('')
  const [subject, setSubject] = useState('')

  // Send state
  const [sending, setSending] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const iframeRef = useRef<HTMLIFrameElement>(null)

  // Fetch templates and users on mount
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

    async function loadUsers() {
      try {
        const res = await fetch('/api/dashboard/emails/users')
        if (!res.ok) throw new Error('Failed to load users')
        const json = await res.json()
        setUsers(json.data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users')
      } finally {
        setLoadingUsers(false)
      }
    }

    loadTemplates()
    loadUsers()
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

      const titleMatch = json.html?.match(/<title>(.*?)<\/title>/i)
      if (titleMatch) setSubject(titleMatch[1].trim())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load template')
    } finally {
      setLoadingPreview(false)
    }
  }, [])

  useEffect(() => {
    loadTemplateContent(selectedSlug)
  }, [selectedSlug, loadTemplateContent])

  // Filtered users based on search
  const filteredUsers = users.filter(u => {
    if (!userSearch) return true
    const q = userSearch.toLowerCase()
    return u.email.toLowerCase().includes(q) || u.name.toLowerCase().includes(q)
  })

  // Selection handlers
  function toggleUser(id: string) {
    setSelectedUserIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAll() {
    setSelectedUserIds(new Set(filteredUsers.map(u => u.id)))
  }

  function selectNone() {
    setSelectedUserIds(new Set())
  }

  function getNameForUser(user: UserInfo): string {
    return nameOverrides[user.id] ?? user.name
  }

  function setNameOverride(userId: string, name: string) {
    setNameOverrides(prev => ({ ...prev, [userId]: name }))
  }

  // Build recipients list
  function buildRecipients(): Recipient[] {
    const recipients: Recipient[] = []

    // From selected users
    for (const user of users) {
      if (selectedUserIds.has(user.id)) {
        recipients.push({
          email: user.email,
          name: getNameForUser(user),
        })
      }
    }

    // From manual input
    if (manualTo.trim()) {
      const manualEmails = manualTo.split(',').map(e => e.trim()).filter(e => e.includes('@'))
      for (const email of manualEmails) {
        if (!recipients.some(r => r.email === email)) {
          recipients.push({ email, name: manualName.trim() || '' })
        }
      }
    }

    return recipients
  }

  // Preview with first selected user's name
  const previewName = (() => {
    const firstSelected = users.find(u => selectedUserIds.has(u.id))
    if (firstSelected) return getNameForUser(firstSelected) || '{{name}}'
    if (manualName) return manualName
    return '{{name}}'
  })()

  const previewHtml = templateHtml
    ? templateHtml.replaceAll('{{name}}', previewName)
    : ''

  function isValid(): boolean {
    return buildRecipients().length > 0 && subject.trim().length > 0 && selectedSlug.length > 0
  }

  // Send emails
  async function handleSend() {
    setShowConfirm(false)
    setSending(true)
    setError('')
    setSuccess('')

    try {
      const recipients = buildRecipients()
      const res = await fetch('/api/dashboard/emails/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipients,
          subject: subject.trim(),
          templateSlug: selectedSlug,
        }),
      })

      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to send')
      }

      const json = await res.json()
      setSuccess(`Sent ${json.sent} email${json.sent !== 1 ? 's' : ''}${json.failed ? ` (${json.failed} failed)` : ''}`)
      setTimeout(() => router.push('/dashboard/emails'), 2500)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  const recipients = buildRecipients()

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
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-3">
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
          </div>

          {/* User Selector */}
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-white/40 uppercase tracking-wider">
                Recipients ({selectedUserIds.size} selected)
              </label>
              <div className="flex gap-2">
                <button onClick={selectAll} className="text-xs text-amber-400/70 hover:text-amber-400 cursor-pointer transition-colors">
                  Select all
                </button>
                <span className="text-white/10">|</span>
                <button onClick={selectNone} className="text-xs text-white/30 hover:text-white/60 cursor-pointer transition-colors">
                  None
                </button>
              </div>
            </div>

            {/* Search */}
            <input
              type="text"
              value={userSearch}
              onChange={e => setUserSearch(e.target.value)}
              placeholder="Search users by name or email..."
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
            />

            {/* User List */}
            {loadingUsers ? (
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-10 bg-white/5 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="max-h-[320px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                {filteredUsers.map(user => {
                  const isSelected = selectedUserIds.has(user.id)
                  return (
                    <div
                      key={user.id}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                        isSelected ? 'bg-amber-400/5 border border-amber-400/15' : 'hover:bg-white/5 border border-transparent'
                      }`}
                      onClick={() => toggleUser(user.id)}
                    >
                      {/* Checkbox */}
                      <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${
                        isSelected ? 'bg-amber-400 border-amber-400' : 'border-white/20'
                      }`}>
                        {isSelected && (
                          <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      {/* User info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-white/80 truncate">{user.email}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            user.tier === 'pro'
                              ? 'bg-amber-400/10 text-amber-400/70'
                              : 'bg-white/5 text-white/30'
                          }`}>
                            {user.tier}
                          </span>
                        </div>
                        {user.name && (
                          <span className="text-xs text-white/30">{user.name}</span>
                        )}
                      </div>

                      {/* Name override (only when selected) */}
                      {isSelected && (
                        <input
                          type="text"
                          value={nameOverrides[user.id] ?? user.name}
                          onChange={e => {
                            e.stopPropagation()
                            setNameOverride(user.id, e.target.value)
                          }}
                          onClick={e => e.stopPropagation()}
                          placeholder="Name..."
                          className="w-28 bg-black/50 border border-white/10 rounded px-2 py-1 text-xs text-white/70 placeholder-white/20 focus:outline-none focus:border-amber-400/40 flex-shrink-0"
                        />
                      )}
                    </div>
                  )
                })}

                {filteredUsers.length === 0 && (
                  <div className="py-4 text-center text-white/20 text-sm">
                    No users match your search
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Manual Recipients (additional) */}
          <div className="bg-[#111111] border border-white/10 rounded-xl p-4 space-y-3">
            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider">
              Additional Recipients <span className="normal-case text-white/15">(not in user list)</span>
            </label>
            <input
              type="text"
              value={manualTo}
              onChange={e => setManualTo(e.target.value)}
              placeholder="email@example.com, another@example.com"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
            />
            {manualTo.trim() && (
              <input
                type="text"
                value={manualName}
                onChange={e => setManualName(e.target.value)}
                placeholder="Name for manual recipients..."
                className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-amber-400/40 transition-colors"
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
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
              {sending ? 'Sending...' : `Send to ${recipients.length} recipient${recipients.length !== 1 ? 's' : ''}`}
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="w-full lg:w-1/2">
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden sticky top-4">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <h3 className="text-xs font-medium text-white/40 uppercase tracking-wider">Preview</h3>
              {previewName !== '{{name}}' && (
                <span className="text-xs text-white/20">Showing: {previewName}</span>
              )}
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
          <div className="bg-[#111111] border border-white/10 rounded-xl p-6 max-w-lg w-full mx-4 shadow-2xl">
            <h3 className="text-base font-medium text-white/90 mb-3">Confirm Send</h3>
            <div className="space-y-2 text-sm text-white/50 mb-4">
              <p><span className="text-white/30">Subject:</span> {subject}</p>
              <p><span className="text-white/30">Template:</span> {selectedSlug}</p>
              <p><span className="text-white/30">Recipients:</span> {recipients.length}</p>
            </div>

            {/* Recipient list */}
            <div className="max-h-[200px] overflow-y-auto bg-black/30 rounded-lg p-3 mb-4 space-y-1">
              {recipients.map((r, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-white/50 truncate">{r.email}</span>
                  <span className="text-white/25 ml-2 flex-shrink-0">{r.name || '(no name)'}</span>
                </div>
              ))}
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
                Confirm Send ({recipients.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
