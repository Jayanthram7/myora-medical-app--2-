"use client"

import type React from "react"
import Image from "next/image"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Validation
    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email")
      setIsLoading(false)
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Signup failed')
      }
    } catch (error) {
      console.error('Signup error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/myora-logo.jpg"
                alt="PSG Hospitals Logo"
                width={40}
                height={40}
                className="rounded-lg shadow-lg"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold text-foreground">PSG Hospitals</span>
                <span className="text-xs font-semibold text-primary">Cardiology</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Success Message */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <div className="w-full max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Account Created!</h1>
            <p className="text-muted-foreground mb-8">
              Welcome to PSG Hospitals Cardiology Documentation System. Your account has been successfully created.
              Check your email to verify your account.
            </p>
            <Link
              href="/login"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              Go to Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src="/myora-logo.jpg"
              alt="PSG Hospitals Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-lg"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground">PSG Hospitals</span>
              <span className="text-xs font-semibold text-primary">Cardiology</span>
            </div>
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="px-6 py-2 text-foreground hover:text-primary transition-colors">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        <div className="w-full max-w-md">
          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-border p-8 sm:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name Field */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Dr. Jane Smith"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
                <p className="text-xs text-muted-foreground mt-1">At least 8 characters</p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                {!isLoading && <ArrowRight className="w-5 h-5" />}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-8 pt-8 border-t border-border text-center">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-white/50 rounded-xl border border-border backdrop-blur-sm">
            <p className="text-sm text-muted-foreground text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
