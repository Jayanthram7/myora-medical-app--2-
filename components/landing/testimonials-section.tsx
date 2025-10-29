"use client"

export default function TestimonialsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">Trusted by Cardiology Leaders</h2>
          <p className="text-xl text-gray-600">Join cardiologists improving their workflow with PSG Hospitals</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Rajesh Kumar",
              role: "Senior Cardiologist",
              quote: "This system has transformed how I document patient encounters. I save hours every shift.",
              initials: "RK",
            },
            {
              name: "Dr. Priya Sharma",
              role: "Interventional Cardiologist",
              quote: "The accuracy is impressive. I trust this system to handle my clinical documentation.",
              initials: "PS",
            },
            {
              name: "Dr. Arun Patel",
              role: "Cardiac Surgeon",
              quote: "Finally, a tool that understands the complexity of cardiology documentation.",
              initials: "AP",
            },
          ].map((testimonial, index) => (
            <div key={index} className="p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
