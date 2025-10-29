import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, getUserById } from './auth'

export async function authenticateRequest(request: NextRequest) {
  try {
    // Get token from cookie or Authorization header
    const token = request.cookies.get('auth-token')?.value || 
                  request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return null
    }
    
    // Verify token
    const decoded = verifyToken(token)
    if (!decoded) {
      return null
    }
    
    // Get user from database
    const user = await getUserById(decoded.userId)
    if (!user) {
      return null
    }
    
    return user
  } catch (error) {
    console.error('Authentication error:', error)
    return null
  }
}

export function withAuth(handler: (request: NextRequest, user: any) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    const user = await authenticateRequest(request)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    return handler(request, user)
  }
}
