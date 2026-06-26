import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'

/** Per-user activity detail: daily click counts (heatmap) + agent breakdown. */
export interface UserActivityDetail {
  calendar: { d: string; clicks: number }[]
  agents: { agent: string; n: number }[]
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { id } = await params
    const daysParam = Number(new URL(request.url).searchParams.get('days'))
    const days = Number.isFinite(daysParam) && daysParam > 0 ? Math.min(daysParam, 365) : 180

    const detail = await supabaseRpc<UserActivityDetail>({
      fn: 'user_activity_detail',
      args: { p_user_id: id, p_days: days },
    })
    return NextResponse.json(detail)
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed' },
      { status: 500 }
    )
  }
}
