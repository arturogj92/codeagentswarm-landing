import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'

/**
 * One row per registered user with real-activity metrics for the dashboard
 * "Users" table. Everything derives from button_clicks (NOT users.last_login,
 * which is unreliable because OAuth sessions persist for months).
 */
export interface UserActivityRow {
  user_id: string
  name: string | null
  email: string
  created_at: string
  total_clicks: number
  active_days: number
  first_active: string | null
  last_active: string | null
  days_since_last: number | null
  current_streak: number
  longest_streak: number
  preferred_agent: string | null
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const users = await supabaseRpc<UserActivityRow[]>({ fn: 'user_activity_overview' })
    return NextResponse.json({ users })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 }
    )
  }
}
