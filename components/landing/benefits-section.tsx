"use client"

import { TrendingUp, Shield, Users, CheckCircle2 } from "lucide-react"

export default function BenefitsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-gray-900">Why PSG Hospitals Cardiology Chooses This System</h2>
            <div className="space-y-6">
              {[
                {
                  icon: TrendingUp,
                  title: "Save 2+ Hours Daily",
                  description: "Reduce documentation time by up to 70% with AI automation",
                },
                {
                  icon: Shield,
                  title: "HIPAA Compliant",
                  description: "Enterprise-grade security and privacy for patient data",
                },
                {
                  icon: Users,
                  title: "Easy Integration",
                  description: "Works seamlessly with your existing EMR systems",
                },
                { icon: CheckCircle2, title: "99.9% Uptime", description: "Reliable service you can depend on" },
              ].map((benefit, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100">
                      <benefit.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-96 lg:h-full min-h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl p-8 text-white h-full flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <div className="text-5xl font-bold mb-2">70%</div>
                  <p className="text-blue-100">Time Saved on Documentation</p>
                </div>
                <div className="border-t border-blue-400 pt-6">
                  <div className="text-4xl font-bold mb-2">98%</div>
                  <p className="text-blue-100">Accuracy in Text Recognition</p>
                </div>
                <div className="border-t border-blue-400 pt-6">
                  <div className="text-4xl font-bold mb-2">24/7</div>
                  <p className="text-blue-100">Customer Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
