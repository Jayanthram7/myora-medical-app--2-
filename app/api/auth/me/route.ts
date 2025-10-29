import { NextRequest, NextResponse } from 'next/server'
import { withAuth } from '@/lib/middleware'

async function handler(request: NextRequest, user: any) {
  try {
    // Return user data without password
    const { password, ...userWithoutPassword } = user
    return NextResponse.json({ user: userWithoutPassword })
  } catch (error) {
    console.error('Get user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export const GET = withAuth(handler)
