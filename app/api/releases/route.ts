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
      // Release info only changes when a version ships; a short cache keeps
      // the home from invoking this proxy (and Railway) on every pageview.
      next: { revalidate: 300 },
    })

    if (!response.ok) {
      console.error('Backend API error:', response.status, response.statusText)
      return NextResponse.json(
        { error: 'Failed to fetch releases from backend' },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Return the data with CORS headers enabled for the frontend.
    // s-maxage lets Vercel's CDN serve this for 5 min without invoking
    // the function; worst case a new release shows up 5 min late.
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
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
