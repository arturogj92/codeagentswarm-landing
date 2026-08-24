import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import {
  parseRealtimeWindowHours,
  type RealtimeActivitySnapshot,
} from '@/app/(dashboard)/dashboard/users/users-activity'

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const hours = parseRealtimeWindowHours(request.nextUrl.searchParams.get('hours') ?? undefined)
  if (hours === null) {
    return NextResponse.json({ error: 'Unsupported time range' }, { status: 400 })
  }

  try {
    const snapshot = await supabaseRpc<RealtimeActivitySnapshot>({
      fn: 'user_activity_realtime_v1',
      args: { p_window_minutes: hours * 60 },
    })
    return NextResponse.json(snapshot)
  } catch (err) {
    console.error('Failed to load real-time user activity:', err)
    return NextResponse.json({ error: 'Failed to load real-time activity' }, { status: 500 })
  }
}
