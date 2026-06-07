import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseQuery } from '@/lib/supabase-client'

interface WaitlistRow {
  id: string
  email: string
  platform: string | null
  created_at: string
}

// Obvious test / placeholder signups we never want to email.
function isTestEmail(email: string): boolean {
  const e = email.toLowerCase().trim()
  if (e.endsWith('.test')) return true
  // Self-referential domains used for manual testing of the signup form.
  if (e === 'paco@paco.com' || e === 'qub@qub.com') return true
  return false
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // platform_waitlist has no anon SELECT policy (insert-only), so we must read
    // it with the service role key. Safe here: this route is server-side and
    // behind the dashboard session.
    const rows = await supabaseQuery<WaitlistRow>({
      table: 'platform_waitlist',
      select: 'id,email,platform,created_at',
      order: 'created_at.desc',
      useServiceRole: true,
    })

    const data = rows
      .filter(r => r.email && r.email.includes('@') && !isTestEmail(r.email))
      .map(r => ({
        id: r.id,
        email: r.email,
        platform: (r.platform || 'unknown').toLowerCase(),
        createdAt: r.created_at,
      }))

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching waitlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch waitlist' },
      { status: 500 }
    )
  }
}
