import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { resendPost } from '@/lib/resend-client'
import fs from 'fs'
import path from 'path'

const FROM_ADDRESS = 'Arturo from CodeAgentSwarm <hello@codeagentswarm.com>'

interface Recipient {
  email: string
  name: string
}

interface SendRequest {
  recipients: Recipient[]
  subject: string
  templateSlug: string
}

interface ResendSendResponse {
  id: string
}

function personalizeTemplate(html: string, variables: Record<string, string>): string {
  let result = html
  for (const [key, value] of Object.entries(variables)) {
    result = result.replaceAll(`{{${key}}}`, value)
  }
  return result
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body: SendRequest = await request.json()
    const { recipients, subject, templateSlug } = body

    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return NextResponse.json({ error: 'At least one recipient is required' }, { status: 400 })
    }

    if (!subject) {
      return NextResponse.json({ error: 'Subject is required' }, { status: 400 })
    }

    if (!templateSlug) {
      return NextResponse.json({ error: 'Template is required' }, { status: 400 })
    }

    const sanitizedSlug = templateSlug.replace(/[^a-zA-Z0-9_-]/g, '')
    const filePath = path.join(process.cwd(), 'emails', `${sanitizedSlug}.html`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    const rawHtml = fs.readFileSync(filePath, 'utf-8')

    const results: { email: string; id?: string; error?: string }[] = []

    for (const recipient of recipients) {
      try {
        const html = personalizeTemplate(rawHtml, { name: recipient.name || 'there' })

        const result = await resendPost<ResendSendResponse>({
          path: '/emails',
          body: {
            from: FROM_ADDRESS,
            to: [recipient.email],
            subject,
            html,
          },
        })

        results.push({ email: recipient.email, id: result.id })
      } catch (err) {
        results.push({
          email: recipient.email,
          error: err instanceof Error ? err.message : 'Failed to send',
        })
      }
    }

    const sent = results.filter(r => r.id).length
    const failed = results.filter(r => r.error).length

    return NextResponse.json({ success: true, sent, failed, results })
  } catch (error) {
    console.error('Error sending emails:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send emails' },
      { status: 500 }
    )
  }
}
