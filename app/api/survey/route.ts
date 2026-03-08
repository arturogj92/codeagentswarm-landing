import { NextResponse } from 'next/server'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://codeagentswarm-backend-production.up.railway.app'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate NPS score if provided
    const nps = body.nps !== null && body.nps !== undefined ? Number(body.nps) : null
    if (nps !== null && (!Number.isInteger(nps) || nps < 0 || nps > 10)) {
      return NextResponse.json(
        { error: 'NPS score must be an integer between 0 and 10' },
        { status: 400 }
      )
    }

    // Forward to backend API
    const backendUrl = `${BACKEND_URL}/api/survey`

    console.log('Forwarding survey to backend:', backendUrl)

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: body.role,
        usage_frequency: body.frequency || null,
        likes: body.likes || null,
        frustrations: body.frustrations || null,
        feature_request: body.featureRequest || null,
        willingness_to_pay: body.willingness || null,
        nps_score: nps,
        email: body.email || null,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      console.error('Backend API error:', response.status, errorData)
      return NextResponse.json(
        { error: errorData.error || 'Failed to submit survey' },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error) {
    console.error('Error in survey API route:', error)
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
