import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import type {
  UserActivityOverview,
  UserActivityRow,
} from '@/app/(dashboard)/dashboard/users/users-activity'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const users = await supabaseRpc<UserActivityRow[]>({ fn: 'user_activity_overview_v2' })
    const overview: UserActivityOverview = {
      users,
      generated_at: new Date().toISOString(),
    }
    return NextResponse.json(overview)
  } catch (err) {
    console.error('Failed to load user activity overview:', err)
    return NextResponse.json(
      { error: 'Failed to load user activity' },
      { status: 500 }
    )
  }
}
