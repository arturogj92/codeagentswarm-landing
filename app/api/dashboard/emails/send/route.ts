import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { resendPost } from '@/lib/resend-client'
import fs from 'fs'
import path from 'path'

const FROM_ADDRESS = 'Arturo from CodeAgentSwarm <hello@codeagentswarm.com>'

interface SendRequest {
  to: string[]
  subject: string
  templateSlug: string
  variables: Record<string, string>
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
    const { to, subject, templateSlug, variables } = body

    if (!to || !Array.isArray(to) || to.length === 0) {
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
    const html = personalizeTemplate(rawHtml, variables || {})

    const result = await resendPost<ResendSendResponse>({
      path: '/emails',
      body: {
        from: FROM_ADDRESS,
        to,
        subject,
        html,
      },
    })

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to send email' },
      { status: 500 }
    )
  }
}
