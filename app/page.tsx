"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import dynamic from "next/dynamic"

const FeaturesSection = dynamic(() => import("@/components/landing/features-section"), {
  loading: () => <div className="py-24 px-4 bg-gray-50 animate-pulse" />,
})

const BenefitsSection = dynamic(() => import("@/components/landing/benefits-section"), {
  loading: () => <div className="py-24 px-4 animate-pulse" />,
})

const TestimonialsSection = dynamic(() => import("@/components/landing/testimonials-section"), {
  loading: () => <div className="py-24 px-4 bg-gray-50 animate-pulse" />,
})

const FooterSection = dynamic(() => import("@/components/landing/footer-section"), {
  loading: () => <div className="py-16 px-4 bg-gray-900 animate-pulse" />,
})

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/myora-logo.jpg"
              alt="PSG Hospitals Logo"
              width={40}
              height={40}
              className="rounded-lg shadow-lg"
              priority
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                MYORA
              </span>
              <span className="text-xs font-semibold text-blue-600">PSG Hospitals</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/login" className="px-6 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
              Login
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-medium shadow-md"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full border border-blue-200">
                <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-blue-700">AI-Powered Cardiology Documentation</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Automated EMR Documentation
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Advanced AI-powered voice and handwriting recognition system for automated EMR documentation in
                  cardiology. Save time, reduce errors, and focus on patient care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  href="/signup"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                >
                  Get Started <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/dashboard"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center gap-2"
                >
                  Go to Dashboard <ArrowRight className="w-5 h-5" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-8 border-t border-gray-200">
                <div>
                  <div className="text-3xl font-bold text-gray-900">500+</div>
                  <p className="text-sm text-gray-600">Cardiologists</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <p className="text-sm text-gray-600">Accuracy Rate</p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">2M+</div>
                  <p className="text-sm text-gray-600">Records Processed</p>
                </div>
              </div>
            </div>

            {/* Right Visual - Medical Image */}
            <div className="relative h-96 lg:h-full min-h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200 h-full">
                <Image
                  src="/medical-doctor-with-tablet-reviewing-patient-recor.jpg"
                  alt="PSG Hospitals cardiology documentation system"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lazy loaded sections */}
      

      {/* CTA Section */}
      

      {/* Footer */}
      <FooterSection />
    </div>
  )
}
