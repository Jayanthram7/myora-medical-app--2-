"use client"

import { useState } from "react"
import { Search, Loader, Check, Edit2 } from "lucide-react"

interface PatientSummary {
  patientId: string
  patientName: string
  summary: string
}

export default function SummarizationPage() {
  const [patientId, setPatientId] = useState("")
  const [summary, setSummary] = useState<PatientSummary | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedSummary, setEditedSummary] = useState("")

  const handleSearch = () => {
    if (!patientId.trim()) return

    setIsLoading(true)
    setTimeout(() => {
      setSummary({
        patientId,
        patientName: "John Smith",
        summary: `PATIENT SUMMARY - ${patientId}

DEMOGRAPHICS:
- Name: John Smith
- Age: 45 years
- Gender: Male
- MRN: ${patientId}

CHIEF COMPLAINTS:
- Persistent headache (2 weeks)
- Dizziness
- Elevated blood pressure

MEDICAL HISTORY:
- Hypertension (diagnosed 5 years ago)
- Type 2 Diabetes (controlled)
- Hyperlipidemia

CURRENT MEDICATIONS:
- Lisinopril 10mg daily
- Metformin 500mg twice daily
- Atorvastatin 20mg daily

VITAL SIGNS (Last Visit):
- BP: 140/90 mmHg
- HR: 78 bpm
- Temperature: 98.6°F
- BMI: 28.5

ASSESSMENT:
Hypertension with associated neurological symptoms. Requires medication adjustment and lifestyle modifications.

PLAN:
1. Increase Lisinopril to 20mg
2. Lifestyle counseling
3. Follow-up in 2 weeks
4. Consider cardiology referral if symptoms persist`,
      })
      setEditedSummary(`PATIENT SUMMARY - ${patientId}

DEMOGRAPHICS:
- Name: John Smith
- Age: 45 years
- Gender: Male
- MRN: ${patientId}

CHIEF COMPLAINTS:
- Persistent headache (2 weeks)
- Dizziness
- Elevated blood pressure

MEDICAL HISTORY:
- Hypertension (diagnosed 5 years ago)
- Type 2 Diabetes (controlled)
- Hyperlipidemia

CURRENT MEDICATIONS:
- Lisinopril 10mg daily
- Metformin 500mg twice daily
- Atorvastatin 20mg daily

VITAL SIGNS (Last Visit):
- BP: 140/90 mmHg
- HR: 78 bpm
- Temperature: 98.6°F
- BMI: 28.5

ASSESSMENT:
Hypertension with associated neurological symptoms. Requires medication adjustment and lifestyle modifications.

PLAN:
1. Increase Lisinopril to 20mg
2. Lifestyle counseling
3. Follow-up in 2 weeks
4. Consider cardiology referral if symptoms persist`)
      setIsLoading(false)
    }, 1500)
  }

  const handleConfirm = () => {
    alert("Summary saved successfully!")
    setPatientId("")
    setSummary(null)
    setEditedSummary("")
    setIsEditing(false)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Patient Summarization</h1>
        <p className="text-muted-foreground">Generate AI-powered summaries of patient records in EMR template format</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl border border-border p-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-foreground mb-2">Patient ID or Name</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Enter patient ID (e.g., P001) or name"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground placeholder-muted-foreground"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 disabled:opacity-50 flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {isLoading ? (
        <div className="bg-white rounded-xl border border-border p-12 flex items-center justify-center">
          <div className="text-center">
            <Loader className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
            <p className="text-foreground font-semibold">Generating summary...</p>
            <p className="text-muted-foreground text-sm mt-2">Analyzing patient records</p>
          </div>
        </div>
      ) : summary ? (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{summary.patientName}</h3>
                <p className="text-sm text-muted-foreground">Patient ID: {summary.patientId}</p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
              >
                <Edit2 className="w-4 h-4" />
                {isEditing ? "Done" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <textarea
                value={editedSummary}
                onChange={(e) => setEditedSummary(e.target.value)}
                className="w-full h-96 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground resize-none"
              />
            ) : (
              <div className="bg-secondary p-6 rounded-lg whitespace-pre-wrap text-foreground text-sm leading-relaxed max-h-96 overflow-y-auto">
                {summary.summary}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
            >
              <Check className="w-5 h-5" />
              Confirm & Save
            </button>
            <button
              onClick={() => {
                setPatientId("")
                setSummary(null)
                setEditedSummary("")
                setIsEditing(false)
              }}
              className="flex-1 py-3 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border p-12 flex items-center justify-center">
          <p className="text-muted-foreground text-center">Search for a patient to generate summary</p>
        </div>
      )}
    </div>
  )
}
