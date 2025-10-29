"use client"

import type React from "react"

import { useState, memo, useCallback } from "react"
import { Upload, Camera, X, Check, Edit2, Save } from "lucide-react"

// Memoized components for better performance
const ImageUploadArea = memo(({ 
  patientId, 
  onImageUpload 
}: { 
  patientId: string
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void 
}) => (
  <div
    className={`bg-white rounded-xl border-2 border-dashed p-12 text-center transition-colors cursor-pointer group ${
      patientId.trim() ? "border-border hover:border-primary" : "border-gray-300 bg-gray-50"
    }`}
  >
    <input
      type="file"
      accept="image/*"
      onChange={onImageUpload}
      className="hidden"
      id="image-upload"
      disabled={!patientId.trim()}
    />
    <label htmlFor="image-upload" className={`cursor-pointer block ${!patientId.trim() ? "opacity-50" : ""}`}>
      <Upload
        className={`w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200 ${
          patientId.trim() ? "text-primary" : "text-gray-400"
        }`}
      />
      <p className="text-lg font-semibold text-foreground mb-2">Upload Document</p>
      <p className={`text-sm ${patientId.trim() ? "text-muted-foreground" : "text-gray-400"}`}>
        {patientId.trim() ? "Drag and drop or click to select" : "Enter Patient ID first"}
      </p>
    </label>
  </div>
))

ImageUploadArea.displayName = "ImageUploadArea"

const ProcessingSpinner = memo(() => (
  <div className="bg-white rounded-xl border border-border p-8 flex items-center justify-center h-96">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-foreground font-semibold">Processing document...</p>
      <p className="text-muted-foreground text-sm mt-2">Extracting text with OCR</p>
    </div>
  </div>
))

ProcessingSpinner.displayName = "ProcessingSpinner"

export default function OCRPage() {
  const [patientId, setPatientId] = useState("")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!patientId.trim()) {
      alert("Please enter a Patient ID first")
      return
    }

    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string)
        simulateOCR()
      }
      reader.readAsDataURL(file)
    }
  }, [patientId])

  const simulateOCR = useCallback(() => {
    setIsProcessing(true)
    setTimeout(() => {
      const sampleText =
        "Patient: John Smith\nDate: 2025-10-18\nChief Complaint: Chest pain and shortness of breath\n\nPhysical Examination:\n- BP: 145/92 mmHg\n- HR: 88 bpm\n- Temperature: 98.6°F\n- Oxygen Saturation: 96%\n\nAssessment:\nSuspected Acute Coronary Syndrome. Recommend immediate ECG and troponin levels.\n\nPlan:\n1. Admit to CCU for monitoring\n2. Perform ECG and cardiac biomarkers\n3. Cardiology consultation\n4. Follow-up in 24 hours"
      setExtractedText(sampleText)
      setEditedText(sampleText)
      setIsProcessing(false)
      setHasChanges(false)
    }, 2000)
  }, [])

  const handleEditToggle = () => {
    if (isEditing) {
      // When exiting edit mode, check if text was modified
      setHasChanges(editedText !== extractedText)
    }
    setIsEditing(!isEditing)
  }

  const handleSaveChanges = () => {
    setExtractedText(editedText)
    setIsEditing(false)
    setHasChanges(false)
  }

  const handleConfirm = () => {
    alert("Document saved successfully!")
    setPatientId("")
    setUploadedImage(null)
    setExtractedText("")
    setEditedText("")
    setIsEditing(false)
    setHasChanges(false)
  }

  const handleDiscardChanges = () => {
    setEditedText(extractedText)
    setIsEditing(false)
    setHasChanges(false)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-foreground mb-2">OCR Recognition</h1>
        <p className="text-muted-foreground">Upload photos or documents to extract text automatically</p>
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

      <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
        <div className="space-y-6">
          <ImageUploadArea patientId={patientId} onImageUpload={handleImageUpload} />

          {/* Camera Option */}
          <button
            disabled={!patientId.trim()}
            className={`w-full flex items-center justify-center gap-3 py-4 border-2 border-border rounded-xl transition-all ${patientId.trim() ? "hover:bg-secondary" : "opacity-50 cursor-not-allowed"}`}
          >
            <Camera className="w-5 h-5 text-primary" />
            <span className="font-semibold text-foreground">Take Photo</span>
          </button>

          {/* Preview */}
          {uploadedImage && (
            <div className="relative rounded-xl overflow-hidden border border-border">
              <img src={uploadedImage || "/placeholder.svg"} alt="Uploaded" className="w-full h-64 object-cover" />
              <button
                onClick={() => {
                  setUploadedImage(null)
                  setExtractedText("")
                  setEditedText("")
                  setIsEditing(false)
                  setHasChanges(false)
                }}
                className="absolute top-2 right-2 p-2 bg-destructive text-white rounded-lg hover:bg-destructive/90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Extracted Text Section */}
        <div className="space-y-4">
          {isProcessing ? (
            <ProcessingSpinner />
          ) : extractedText ? (
            <>
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Extracted Text</h3>
                    <p className="text-sm text-muted-foreground">Patient ID: {patientId}</p>
                    {isEditing && (
                      <p className="text-sm text-primary font-medium mt-1">Editing mode - Make your changes below</p>
                    )}
                    {hasChanges && !isEditing && (
                      <p className="text-sm text-accent font-medium mt-1">Changes detected - Review before saving</p>
                    )}
                  </div>
                  <button
                    onClick={handleEditToggle}
                    className="flex items-center gap-2 px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                  >
                    <Edit2 className="w-4 h-4" />
                    {isEditing ? "Cancel Edit" : "Edit"}
                  </button>
                </div>

                {isEditing ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full h-64 p-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground resize-none"
                    placeholder="Edit the extracted text here..."
                  />
                ) : (
                  <div className="bg-secondary p-4 rounded-lg whitespace-pre-wrap text-foreground text-sm leading-relaxed max-h-64 overflow-y-auto">
                    {extractedText}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSaveChanges}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button
                      onClick={handleDiscardChanges}
                      className="flex-1 py-3 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-all"
                    >
                      Discard
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleConfirm}
                      className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105"
                    >
                      <Check className="w-5 h-5" />
                      Confirm & Save
                    </button>
                    <button
                      onClick={() => {
                        setUploadedImage(null)
                        setExtractedText("")
                        setEditedText("")
                        setIsEditing(false)
                        setHasChanges(false)
                      }}
                      className="flex-1 py-3 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-all"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 flex items-center justify-center h-96">
              <p className="text-muted-foreground text-center">
                {patientId.trim() ? "Upload a document to extract text" : "Enter Patient ID to upload documents"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
