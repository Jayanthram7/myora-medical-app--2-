import { NextRequest, NextResponse } from 'next/server'
import { authenticateUser, generateToken } from '@/lib/auth'
import { LoginInput } from '@/lib/user'

export async function POST(request: NextRequest) {
  try {
    const body: LoginInput = await request.json()
    
    // Validate required fields
    if (!body.email || !body.password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }
    
    // Authenticate user
    const user = await authenticateUser(body)
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }
    
    // Generate JWT token
    const token = generateToken(user._id!.toString())
    
    // Return success response (don't include password)
    const { password, ...userWithoutPassword } = user
    
    // Set HTTP-only cookie
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: userWithoutPassword,
        token
      },
      { status: 200 }
    )
    
    // Set cookie for 7 days
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })
    
    return response
    
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
