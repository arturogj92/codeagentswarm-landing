import { NextResponse } from 'next/server'

const SUPABASE_URL = 'https://fqamfucosytcyueqadog.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYW1mdWNvc3l0Y3l1ZXFhZG9nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MTgwNzgsImV4cCI6MjA2OTM5NDA3OH0.xt7-hlYgNT0vYOcz96HhV278Pmoc5LNmoga7a65AraY'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!body.platform || !['windows', 'linux'].includes(body.platform)) {
      return NextResponse.json(
        { error: 'Platform must be "windows" or "linux"' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Insert into Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/platform_waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        email: body.email.toLowerCase().trim(),
        platform: body.platform
      })
    })

    if (!response.ok) {
      const errorText = await response.text()

      // Check if it's a duplicate error
      if (response.status === 409 || errorText.includes('duplicate') || errorText.includes('unique')) {
        return NextResponse.json(
          { error: 'already_registered', message: 'This email is already on the waitlist for this platform' },
          { status: 409 }
        )
      }

      console.error('Supabase error:', response.status, errorText)
      return NextResponse.json(
        { error: 'Failed to add to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Successfully added to waitlist' },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in waitlist API route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
