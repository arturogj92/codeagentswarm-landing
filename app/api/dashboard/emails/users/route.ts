import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '@/lib/auth'
import { supabaseQuery } from '@/lib/supabase-client'

interface SupabaseUser {
  id: string
  email: string
  name: string | null
  provider: string
  subscription_tier: string | null
  created_at: string
}

export async function GET(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const users = await supabaseQuery<SupabaseUser>({
      table: 'users',
      select: 'id,email,name,provider,subscription_tier,created_at',
      order: 'created_at.desc',
    })

    const data = users.map(u => ({
      id: u.id,
      email: u.email,
      name: u.name || '',
      provider: u.provider,
      tier: u.subscription_tier || 'free',
      createdAt: u.created_at,
    }))

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
