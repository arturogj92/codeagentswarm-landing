'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { ResendEmail, ResendReceivedEmail } from '@/types/email'

type Tab = 'sent' | 'received'
type AnyEmail = ResendEmail | ResendReceivedEmail

const STATUS_COLORS: Record<string, string> = {
  delivered: 'bg-green-400/10 text-green-400 border-green-400/20',
  opened: 'bg-blue-400/10 text-blue-400 border-blue-400/20',
  clicked: 'bg-purple-400/10 text-purple-400 border-purple-400/20',
  bounced: 'bg-red-400/10 text-red-400 border-red-400/20',
  complained: 'bg-red-400/10 text-red-400 border-red-400/20',
  sent: 'bg-amber-400/10 text-amber-400 border-amber-400/20',
}

function StatusBadge({ status }: { status: string }) {
  const colors = STATUS_COLORS[status] || 'bg-white/5 text-white/40 border-white/10'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors}`}>
      {status}
    </span>
  )
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffHours = diffMs / (1000 * 60 * 60)

  if (diffHours < 1) {
    const mins = Math.floor(diffMs / (1000 * 60))
    return `${mins}m ago`
  }
  if (diffHours < 24) {
    return `${Math.floor(diffHours)}h ago`
  }
  if (diffHours < 48) {
    return 'Yesterday'
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function truncateAddress(address: string | string[]): string {
  const addr = Array.isArray(address) ? address[0] : address
  if (!addr) return '-'
  if (addr.length > 30) return addr.slice(0, 27) + '...'
  return addr
}

export default function EmailDashboardClient() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('sent')
  const [sentEmails, setSentEmails] = useState<ResendEmail[]>([])
  const [receivedEmails, setReceivedEmails] = useState<ResendReceivedEmail[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [selectedEmail, setSelectedEmail] = useState<AnyEmail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [receivedEmpty, setReceivedEmpty] = useState(false)

  const fetchEmails = useCallback(async (type: Tab, after?: string) => {
    const isLoadMore = !!after
    if (isLoadMore) setLoadingMore(true)
    else setLoading(true)

    try {
      const params = new URLSearchParams({ limit: '20' })
      if (after) params.set('after', after)

      const endpoint = type === 'sent'
        ? `/api/dashboard/emails/sent?${params}`
        : `/api/dashboard/emails/received?${params}`

      const res = await fetch(endpoint)
      if (!res.ok) throw new Error('Failed to fetch emails')

      const json = await res.json()
      const emails = json.data || []

      if (type === 'sent') {
        setSentEmails(prev => isLoadMore ? [...prev, ...emails] : emails)
      } else {
        setReceivedEmails(prev => isLoadMore ? [...prev, ...emails] : emails)
        if (!isLoadMore && emails.length === 0) setReceivedEmpty(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch emails')
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchEmails(tab)
  }, [tab, fetchEmails])

  async function openEmailDetail(email: AnyEmail) {
    setDetailLoading(true)
    setSelectedEmail(email)

    try {
      const endpoint = tab === 'sent'
        ? `/api/dashboard/emails/${email.id}`
        : `/api/dashboard/emails/received/${email.id}`

      const res = await fetch(endpoint)
      if (!res.ok) throw new Error('Failed to fetch email detail')

      const detail = await res.json()
      setSelectedEmail(detail)
    } catch {
      // Keep the list-level data visible
    } finally {
      setDetailLoading(false)
    }
  }

  function handleLoadMore() {
    const emails = tab === 'sent' ? sentEmails : receivedEmails
    const lastEmail = emails[emails.length - 1]
    if (lastEmail) {
      fetchEmails(tab, lastEmail.id)
    }
  }

  const currentEmails = tab === 'sent' ? sentEmails : receivedEmails

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Tabs + Compose Button */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-1">
          <TabButton active={tab === 'sent'} onClick={() => { setTab('sent'); setSelectedEmail(null) }}>
            Sent
          </TabButton>
          <TabButton active={tab === 'received'} onClick={() => { setTab('received'); setSelectedEmail(null) }}>
            Received
          </TabButton>
        </div>
        <button
          onClick={() => router.push('/dashboard/emails/compose')}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 hover:border-amber-400/30 rounded-lg text-amber-400 font-medium transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Compose
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-400/10 border border-red-400/20 rounded-lg text-red-400 text-sm">
          {error}
          <button onClick={() => { setError(''); fetchEmails(tab) }} className="ml-3 underline cursor-pointer">
            Retry
          </button>
        </div>
      )}

      <div className="flex gap-6">
        {/* Email List */}
        <div className={`${selectedEmail ? 'w-1/2 hidden md:block' : 'w-full'} transition-all`}>
          {loading ? (
            <EmailListSkeleton />
          ) : tab === 'received' && receivedEmpty ? (
            <MxConfigNotice />
          ) : currentEmails.length === 0 ? (
            <EmptyState tab={tab} />
          ) : (
            <>
              <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden sm:table-cell">
                        {tab === 'sent' ? 'To' : 'From'}
                      </th>
                      {tab === 'sent' && (
                        <th className="px-4 py-3 text-left text-xs font-medium text-white/40 uppercase tracking-wider hidden md:table-cell">
                          Status
                        </th>
                      )}
                      <th className="px-4 py-3 text-right text-xs font-medium text-white/40 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {currentEmails.map((email) => (
                      <tr
                        key={email.id}
                        onClick={() => openEmailDetail(email)}
                        className={`cursor-pointer hover:bg-white/5 transition-colors ${
                          selectedEmail?.id === email.id ? 'bg-amber-400/5' : ''
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-white/80 max-w-[250px] truncate">
                          {email.subject || '(no subject)'}
                        </td>
                        <td className="px-4 py-3 text-sm text-white/40 hidden sm:table-cell">
                          {tab === 'sent'
                            ? truncateAddress(email.to)
                            : truncateAddress(email.from)
                          }
                        </td>
                        {tab === 'sent' && 'last_event' in email && (
                          <td className="px-4 py-3 hidden md:table-cell">
                            <StatusBadge status={(email as ResendEmail).last_event} />
                          </td>
                        )}
                        <td className="px-4 py-3 text-sm text-white/30 text-right whitespace-nowrap">
                          {formatDate(email.created_at)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {currentEmails.length >= 20 && (
                <div className="mt-4 text-center">
                  <button
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white/80 transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {loadingMore ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Email Detail Panel */}
        {selectedEmail && (
          <div className={`${selectedEmail ? 'w-full md:w-1/2' : ''} transition-all`}>
            <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden sticky top-4">
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-sm font-medium text-white/80 truncate mr-4">
                  {selectedEmail.subject || '(no subject)'}
                </h3>
                <button
                  onClick={() => setSelectedEmail(null)}
                  className="text-white/30 hover:text-white/60 transition-colors cursor-pointer shrink-0"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-4 py-3 border-b border-white/5 space-y-1.5 text-xs text-white/40">
                <div><span className="text-white/20">From:</span> {typeof selectedEmail.from === 'string' ? selectedEmail.from : '-'}</div>
                <div><span className="text-white/20">To:</span> {Array.isArray(selectedEmail.to) ? selectedEmail.to.join(', ') : selectedEmail.to}</div>
                <div><span className="text-white/20">Date:</span> {new Date(selectedEmail.created_at).toLocaleString()}</div>
                {tab === 'sent' && 'last_event' in selectedEmail && (
                  <div className="flex items-center gap-2">
                    <span className="text-white/20">Status:</span>
                    <StatusBadge status={(selectedEmail as ResendEmail).last_event} />
                  </div>
                )}
              </div>

              <div className="p-0">
                {detailLoading ? (
                  <div className="p-8 text-center text-white/20 text-sm">Loading email content...</div>
                ) : selectedEmail.html ? (
                  <iframe
                    srcDoc={selectedEmail.html}
                    sandbox="allow-same-origin"
                    className="w-full min-h-[400px] bg-white rounded-b-xl"
                    title="Email content"
                    style={{ border: 'none' }}
                  />
                ) : selectedEmail.text ? (
                  <pre className="p-4 text-sm text-white/60 whitespace-pre-wrap font-mono overflow-auto max-h-[500px]">
                    {selectedEmail.text}
                  </pre>
                ) : (
                  <div className="p-8 text-center text-white/20 text-sm">
                    No content available
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
        active
          ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
          : 'text-white/40 hover:text-white/60 hover:bg-white/5 border border-transparent'
      }`}
    >
      {children}
    </button>
  )
}

function EmailListSkeleton() {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-3 border-b border-white/5">
          <div className="h-4 w-48 bg-white/5 rounded animate-pulse" />
          <div className="h-4 w-32 bg-white/5 rounded animate-pulse ml-auto hidden sm:block" />
          <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse hidden md:block" />
          <div className="h-4 w-20 bg-white/5 rounded animate-pulse" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ tab }: { tab: Tab }) {
  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-12 text-center">
      <svg className="w-12 h-12 mx-auto text-white/10 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
      <p className="text-white/30 text-sm">No {tab} emails found</p>
    </div>
  )
}

function MxConfigNotice() {
  return (
    <div className="bg-[#111111] border border-amber-400/20 rounded-xl p-8">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 rounded-lg bg-amber-400/10 flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 className="text-sm font-medium text-amber-400 mb-1">MX Records Configuration Required</h3>
          <p className="text-sm text-white/40 leading-relaxed">
            To receive inbound emails, MX records for your domain must point to Resend.
            If you&apos;re using Cloudflare Email Routing, consider configuring a subdomain
            (e.g., <code className="text-amber-400/60 bg-amber-400/5 px-1 rounded">mail.codeagentswarm.com</code>)
            with Resend&apos;s MX records.
          </p>
        </div>
      </div>
    </div>
  )
}
