import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

interface TemplateInfo {
  slug: string
  filename: string
  title: string
}

function extractTitle(html: string): string {
  const match = html.match(/<title>(.*?)<\/title>/i)
  return match ? match[1].trim() : 'Untitled'
}

function isSendableTemplate(html: string): boolean {
  return html.includes('{{name}}') || html.includes('{{')
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const emailsDir = path.join(process.cwd(), 'emails')
    const files = fs.readdirSync(emailsDir).filter(f => f.endsWith('.html'))

    const templates: TemplateInfo[] = []

    for (const filename of files) {
      const content = fs.readFileSync(path.join(emailsDir, filename), 'utf-8')

      if (!isSendableTemplate(content)) continue

      const slug = filename.replace('.html', '')
      templates.push({
        slug,
        filename,
        title: extractTitle(content),
      })
    }

    return NextResponse.json({ data: templates })
  } catch (error) {
    console.error('Error listing templates:', error)
    return NextResponse.json(
      { error: 'Failed to list templates' },
      { status: 500 }
    )
  }
}
