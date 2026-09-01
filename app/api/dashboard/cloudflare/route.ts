import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { fetchCloudflareUsage } from '@/lib/cloudflare-usage'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    return NextResponse.json(await fetchCloudflareUsage(), {
      headers: { 'cache-control': 'no-store' },
    })
  } catch (error) {
    console.error('Failed to load Cloudflare usage:', error)
    return NextResponse.json({ error: 'Failed to load Cloudflare usage' }, { status: 502 })
  }
}
