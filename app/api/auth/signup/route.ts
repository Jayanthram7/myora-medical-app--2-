import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'
import { UserInput } from '@/lib/user'

export async function POST(request: NextRequest) {
  try {
    const body: UserInput = await request.json()
    
    // Validate required fields
    if (!body.fullName || !body.email || !body.password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }
    
    // Validate password length
    if (body.password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }
    
    // Create user
    const user = await createUser(body)
    
    // Return success response (don't include password)
    const { password, ...userWithoutPassword } = user
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    )
    
  } catch (error) {
    console.error('Signup error:', error)
    
    if (error instanceof Error && error.message === 'User with this email already exists') {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
