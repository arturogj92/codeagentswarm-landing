import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseRpc } from '@/lib/supabase-client'
import type {
  UserActivityOverview,
  UserActivityRow,
} from '@/app/(dashboard)/dashboard/users/users-activity'

interface OperationalRpcRow {
  user_id: string
  avg_terminal_slots: number | string | null
  max_terminal_slots: number | null
  terminal_metric_source: UserActivityRow['terminal_metric_source']
  most_launched_agent: string | null
  agent_launches: number | string
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const [baseUsers, operationalRows] = await Promise.all([
      supabaseRpc<Omit<UserActivityRow,
        'avg_terminal_slots' | 'max_terminal_slots' | 'terminal_metric_source' |
        'most_launched_agent' | 'agent_launches'
      >[]>({ fn: 'user_activity_overview_v2' }),
      supabaseRpc<OperationalRpcRow[]>({ fn: 'user_activity_operational_v1' }),
    ])
    const operationalByUser = new Map(operationalRows.map((row) => [row.user_id, row]))
    const users: UserActivityRow[] = baseUsers.map((user) => {
      const operational = operationalByUser.get(user.user_id)
      return {
        ...user,
        avg_terminal_slots: operational?.avg_terminal_slots === null || operational?.avg_terminal_slots === undefined
          ? null
          : Number(operational.avg_terminal_slots),
        max_terminal_slots: operational?.max_terminal_slots ?? null,
        terminal_metric_source: operational?.terminal_metric_source ?? null,
        most_launched_agent: operational?.most_launched_agent ?? null,
        agent_launches: Number(operational?.agent_launches || 0),
      }
    })
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
