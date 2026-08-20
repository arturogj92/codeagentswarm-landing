import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import type { UserActivityDetail } from '@/app/(dashboard)/dashboard/users/users-activity'

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
type UserActivityDetailRpc = Omit<UserActivityDetail, 'account'> & {
  account: UserActivityDetail['account'] | null
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
    if (!UUID_PATTERN.test(id)) {
      return NextResponse.json({ error: 'Invalid user id' }, { status: 400 })
    }

    const rawDays = new URL(request.url).searchParams.get('days')
    let days = 180
    if (rawDays !== null) {
      const parsedDays = Number(rawDays)
      if (!Number.isInteger(parsedDays) || parsedDays < 1 || parsedDays > 365) {
        return NextResponse.json(
          { error: 'days must be an integer between 1 and 365' },
          { status: 400 }
        )
      }
      days = parsedDays
    }

    const detail = await supabaseRpc<UserActivityDetailRpc | null>({
      fn: 'user_activity_detail_v3',
      args: { p_user_id: id, p_days: days },
    })
    if (!detail?.account) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    return NextResponse.json(detail)
  } catch (err) {
    console.error('Failed to load user activity detail:', err)
    return NextResponse.json(
      { error: 'Failed to load user details' },
      { status: 500 }
    )
  }
}
