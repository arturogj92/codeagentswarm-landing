import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { slug } = await params
    const sanitizedSlug = slug.replace(/[^a-zA-Z0-9_-]/g, '')
    const filePath = path.join(process.cwd(), 'emails', `${sanitizedSlug}.html`)

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 })
    }

    const html = fs.readFileSync(filePath, 'utf-8')

    return NextResponse.json({ html })
  } catch (error) {
    console.error('Error reading template:', error)
    return NextResponse.json(
      { error: 'Failed to read template' },
      { status: 500 }
    )
  }
}
