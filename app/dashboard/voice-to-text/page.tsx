"use client"

import { useState } from "react"
import { Mic, Square, Check, Edit2, Trash2 } from "lucide-react"

interface Recording {
  id: string
  patientId: string
  text: string
  duration: number
  timestamp: string
}

export default function VoiceToTextPage() {
  const [patientId, setPatientId] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState("")

  const handleStartRecording = () => {
    if (!patientId.trim()) {
      alert("Please enter a Patient ID first")
      return
    }

    setIsRecording(true)
    setRecordingTime(0)
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Simulate recording
    setTimeout(() => {
      clearInterval(interval)
      setIsRecording(false)
      const newRecording: Recording = {
        id: Date.now().toString(),
        patientId,
        text: "Patient presents with persistent cough for 3 weeks. Denies fever or shortness of breath. Vital signs stable. Chest examination reveals mild wheezing in bilateral lower lobes. Prescribed azithromycin 500mg daily for 5 days. Follow-up in 1 week if symptoms persist.",
        duration: recordingTime,
        timestamp: new Date().toLocaleString(),
      }
      setRecordings([newRecording, ...recordings])
      setSelectedRecording(newRecording)
      setEditedText(newRecording.text)
    }, 5000)
  }

  const handleConfirm = () => {
    if (selectedRecording) {
      setRecordings(recordings.map((r) => (r.id === selectedRecording.id ? { ...r, text: editedText } : r)))
      setSelectedRecording({ ...selectedRecording, text: editedText })
      setIsEditing(false)
      alert("Recording saved successfully!")
    }
  }

  const handleDelete = (id: string) => {
    setRecordings(recordings.filter((r) => r.id !== id))
    if (selectedRecording?.id === id) {
      setSelectedRecording(null)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">Voice to Text</h1>
        <p className="text-muted-foreground">Record voice notes and convert them to text automatically</p>
      </div>

      <div className="bg-white rounded-xl border border-border p-8">
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-foreground mb-2">Patient ID</label>
            <input
              type="text"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              placeholder="Enter patient ID (e.g., P001)"
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recording Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recording Controls */}
          <div className="bg-white rounded-xl border border-border p-8">
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <button
                  onClick={handleStartRecording}
                  disabled={isRecording || !patientId.trim()}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all transform hover:scale-110 ${
                    isRecording
                      ? "bg-destructive text-white animate-pulse-soft"
                      : patientId.trim()
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isRecording ? <Square className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
                </button>
              </div>

              {isRecording && (
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-foreground font-mono">{formatTime(recordingTime)}</p>
                  <p className="text-muted-foreground">Recording in progress...</p>
                </div>
              )}

              {!isRecording && recordingTime === 0 && (
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {patientId.trim() ? "Start Recording" : "Enter Patient ID to Start"}
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    {patientId.trim()
                      ? "Click the microphone to begin recording your notes"
                      : "Please enter a patient ID first"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Transcribed Text */}
          {selectedRecording && (
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">Transcribed Text</h3>
                  <p className="text-sm text-muted-foreground">Patient ID: {selectedRecording.patientId}</p>
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
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  className="w-full h-48 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground resize-none"
                />
              ) : (
                <div className="bg-secondary p-4 rounded-lg text-foreground leading-relaxed">
                  {selectedRecording.text}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleConfirm}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
                >
                  <Check className="w-5 h-5" />
                  Confirm & Save
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recordings List */}
        <div className="bg-white rounded-xl border border-border overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-bold text-foreground">Recent Recordings</h3>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {recordings.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                No recordings yet. Start recording to see them here.
              </div>
            ) : (
              recordings.map((recording) => (
                <div
                  key={recording.id}
                  onClick={() => {
                    setSelectedRecording(recording)
                    setEditedText(recording.text)
                    setIsEditing(false)
                  }}
                  className={`p-4 cursor-pointer transition-all hover:bg-secondary ${
                    selectedRecording?.id === recording.id ? "bg-secondary border-l-4 border-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{recording.patientId}</p>
                      <p className="text-xs text-muted-foreground mt-1">{recording.timestamp}</p>
                      <p className="text-xs text-muted-foreground">{formatTime(recording.duration)}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(recording.id)
                      }}
                      className="p-1 text-destructive hover:bg-destructive/10 rounded transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
