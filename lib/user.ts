import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  fullName: string
  email: string
  password: string
  createdAt: Date
  updatedAt: Date
  isVerified?: boolean
  role?: 'doctor' | 'nurse' | 'admin'
}

export interface UserInput {
  fullName: string
  email: string
  password: string
}

export interface LoginInput {
  email: string
  password: string
}
