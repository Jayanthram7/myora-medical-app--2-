"use client"

import { useState } from "react"
import { Mic, FileText, Brain } from "lucide-react"

export default function FeaturesSection() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Powerful Features for Cardiology</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized tools designed for cardiology documentation and patient care
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Mic,
              title: "Voice to Text",
              description:
                "Convert voice notes to text with advanced speech recognition. Perfect for capturing cardiology findings during patient rounds.",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: FileText,
              title: "OCR Recognition",
              description:
                "Upload photos or documents to extract text automatically. Supports handwritten and printed cardiology reports.",
              color: "from-cyan-500 to-blue-500",
            },
            {
              icon: Brain,
              title: "Smart Summarization",
              description:
                "Generate concise summaries of patient notes in EMR template format. AI-powered cardiology analysis.",
              color: "from-blue-600 to-indigo-600",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
              ></div>
              <div
                className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform duration-300`}
              >
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
