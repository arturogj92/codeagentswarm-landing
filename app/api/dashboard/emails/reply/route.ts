import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { resendGet, resendPost } from '@/lib/resend-client'
import { bodyToHtml, buildInboxPreview, escapeHtmlForAttribute } from '@/lib/email-body-to-html'
import {
  buildPlainReplyHtml,
  buildPlainReplyText,
  extractFirstName,
  type QuotedOriginal,
} from '@/lib/reply-email'
import type { ResendReceivedEmail } from '@/types/email'
import fs from 'fs'
import path from 'path'

const FROM_ADDRESS = 'Arturo from CodeAgentSwarm <hello@codeagentswarm.com>'
const BRANDED_TEMPLATE = 'feedback-custom'

type ReplyFormat = 'plain' | 'branded'

interface ReplyRequest {
  to: string
  subject: string
  body: string
  format?: ReplyFormat
  originalEmailId?: string
}

interface ResendSendResponse {
  id: string
}

// The Resend receiving API may expose the original RFC 5322 Message-ID
// either as a top-level field or inside a headers list, depending on API
// version. Both shapes are probed so threading degrades gracefully to a
// plain "Re:" reply when neither is present.
interface ReceivedEmailWithHeaders extends ResendReceivedEmail {
  message_id?: string
  headers?: { name: string; value: string }[]
}

function findMessageId(email: ReceivedEmailWithHeaders): string | null {
  if (email.message_id) return email.message_id
  const header = email.headers?.find(h => h.name.toLowerCase() === 'message-id')
  return header?.value || null
}

function buildBrandedHtml(name: string, subject: string, body: string): string {
  const filePath = path.join(process.cwd(), 'emails', `${BRANDED_TEMPLATE}.html`)
  let html = fs.readFileSync(filePath, 'utf-8')

  const variables: Record<string, string> = {
    name: escapeHtmlForAttribute(name),
    title: escapeHtmlForAttribute(subject.replace(/^(re:\s*)+/i, '')),
    body: bodyToHtml(body),
    bodyPreview: buildInboxPreview(body),
  }
  for (const [key, value] of Object.entries(variables)) {
    html = html.replaceAll(`{{${key}}}`, value)
  }
  return html
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload: ReplyRequest = await request.json()
    const { to, subject, body, originalEmailId } = payload
    const format: ReplyFormat = payload.format === 'branded' ? 'branded' : 'plain'

    if (!to || !to.includes('@')) {
      return NextResponse.json({ error: 'A valid recipient is required' }, { status: 400 })
    }
    if (!subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
    }
    if (!body || !body.trim()) {
      return NextResponse.json({ error: 'Body is required' }, { status: 400 })
    }

    // Fetch the original email to quote it and to thread the reply. Both are
    // nice-to-haves: a failure here should never block sending the reply.
    let original: ReceivedEmailWithHeaders | null = null
    if (originalEmailId) {
      try {
        original = await resendGet<ReceivedEmailWithHeaders>({
          path: `/emails/receiving/${originalEmailId}`,
        })
      } catch (err) {
        console.error('Could not fetch original email for quoting:', err)
      }
    }

    let html: string
    let text: string | undefined

    if (format === 'branded') {
      html = buildBrandedHtml(extractFirstName(original?.from || to), subject, body)
    } else {
      let quoted: QuotedOriginal | undefined
      if (original?.text) {
        quoted = {
          from: original.from,
          date: new Date(original.created_at).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          text: original.text,
        }
      }
      html = buildPlainReplyHtml(body, quoted)
      text = buildPlainReplyText(body, quoted)
    }

    const messageId = original ? findMessageId(original) : null

    const result = await resendPost<ResendSendResponse>({
      path: '/emails',
      body: {
        from: FROM_ADDRESS,
        to: [to],
        subject,
        html,
        ...(text ? { text } : {}),
        ...(messageId
          ? { headers: { 'In-Reply-To': messageId, References: messageId } }
          : {}),
      },
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Error sending reply:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send reply' },
      { status: 500 }
    )
  }
}
