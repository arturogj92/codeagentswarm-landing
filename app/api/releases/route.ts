import { NextResponse } from 'next/server'

const BACKEND_URL = 'https://codeagentswarm-backend-production.up.railway.app'

export async function GET(request: Request) {
  try {
    // Get query parameters from the request URL
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get('limit') || '3'
    const preferDmg = searchParams.get('preferDmg') || 'true'

    // Fetch from the backend API (server-side, no CORS issues)
    const backendUrl = `${BACKEND_URL}/api/releases/latest?limit=${limit}&preferDmg=${preferDmg}`

    console.log('Fetching from backend:', backendUrl)

    const response = await fetch(backendUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      // Add cache control to prevent stale data
      cache: 'no-store',
    })

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch releases from backend' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return the data with CORS headers enabled for the frontend
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error in releases API route:', error)
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
