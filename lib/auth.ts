import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDatabase } from './mongodb'
import { User, UserInput, LoginInput } from './user'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string }
  } catch {
    return null
  }
}

export async function createUser(userData: UserInput): Promise<User> {
  const db = await getDatabase()
  const users = db.collection<User>('users')
  
  // Check if user already exists
  const existingUser = await users.findOne({ email: userData.email })
  if (existingUser) {
    throw new Error('User with this email already exists')
  }
  
  const hashedPassword = await hashPassword(userData.password)
  const user: User = {
    fullName: userData.fullName,
    email: userData.email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
    isVerified: false,
    role: 'doctor'
  }
  
  const result = await users.insertOne(user)
  return { ...user, _id: result.insertedId }
}

export async function authenticateUser(loginData: LoginInput): Promise<User | null> {
  const db = await getDatabase()
  const users = db.collection<User>('users')
  
  const user = await users.findOne({ email: loginData.email })
  if (!user) {
    return null
  }
  
  const isValidPassword = await verifyPassword(loginData.password, user.password)
  if (!isValidPassword) {
    return null
  }
  
  return user
}

export async function getUserById(userId: string): Promise<User | null> {
  const db = await getDatabase()
  const users = db.collection<User>('users')
  
  try {
    return await users.findOne({ _id: userId as any })
  } catch {
    return null
  }
}
