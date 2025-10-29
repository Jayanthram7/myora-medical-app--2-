"use client"

import type React from "react"

import { useState, useEffect, memo, useMemo } from "react"
import Link from "next/link"
import { Users, Calendar, TrendingUp, Clock, Mic, FileText, Brain, ArrowRight, Zap, Plus } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  lastVisit: string
}

interface QuickAccessCard {
  title: string
  description: string
  icon: React.ReactNode
  href: string
  color: string
}

// Memoized components for better performance
const QuickAccessCard = memo(({ card }: { card: QuickAccessCard }) => (
  <Link
    href={card.href}
    className="group relative overflow-hidden bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-shadow duration-200 hover:border-primary/50"
  >
    <div
      className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-5 transition-opacity duration-200`}
    ></div>
    <div className="relative">
      <div
        className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-lg flex items-center justify-center mb-4 text-white`}
      >
        {card.icon}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
      <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-200">
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </Link>
))

QuickAccessCard.displayName = "QuickAccessCard"

const PatientCard = memo(({ patient, isSelected, onSelect }: { 
  patient: Patient, 
  isSelected: boolean, 
  onSelect: (patient: Patient) => void 
}) => (
  <div
    onClick={() => onSelect(patient)}
    className={`p-6 cursor-pointer transition-colors duration-150 hover:bg-secondary ${
      isSelected ? "bg-secondary border-l-4 border-primary" : ""
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="font-semibold text-foreground">{patient.name}</p>
        <div className="flex gap-4 mt-2">
          <p className="text-sm text-muted-foreground">ID: {patient.id}</p>
          <p className="text-sm text-muted-foreground">Condition: {patient.condition}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-foreground">{patient.age} years</p>
        <p className="text-xs text-muted-foreground mt-1">{patient.lastVisit}</p>
      </div>
    </div>
  </div>
))

PatientCard.displayName = "PatientCard"

const PatientDetails = memo(({ patient }: { patient: Patient | null }) => (
  <div className="bg-white rounded-xl border border-border p-6 h-fit sticky top-8">
    <h3 className="text-xl font-bold text-foreground mb-4">Patient Details</h3>
    {patient ? (
      <div className="space-y-4">
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Name</p>
          <p className="font-semibold text-foreground mt-1">{patient.name}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Patient ID</p>
          <p className="font-semibold text-foreground mt-1">{patient.id}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Age</p>
          <p className="font-semibold text-foreground mt-1">{patient.age} years</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Condition</p>
          <p className="font-semibold text-foreground mt-1">{patient.condition}</p>
        </div>
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Last Visit</p>
          <p className="font-semibold text-foreground mt-1">{patient.lastVisit}</p>
        </div>
        <button className="w-full mt-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-150">
          View Full Details
        </button>
      </div>
    ) : (
      <div className="text-center py-12">
        <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground">Select a patient to view details</p>
      </div>
    )}
  </div>
))

PatientDetails.displayName = "PatientDetails"

export default function DashboardHome() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)

  // Memoize the patients data to prevent unnecessary re-renders
  const patientsData = useMemo(() => [
    { id: "P001", name: "John Smith", age: 45, condition: "Hypertension", lastVisit: "2025-10-15" },
    { id: "P002", name: "Sarah Johnson", age: 32, condition: "Atrial Fibrillation", lastVisit: "2025-10-14" },
    { id: "P003", name: "Michael Brown", age: 58, condition: "Coronary Artery Disease", lastVisit: "2025-10-13" },
    { id: "P004", name: "Emily Davis", age: 28, condition: "Myocarditis", lastVisit: "2025-10-12" },
    { id: "P005", name: "Robert Wilson", age: 65, condition: "Heart Failure", lastVisit: "2025-10-11" },
  ], [])

  useEffect(() => {
    setPatients(patientsData)
  }, [patientsData])

  // Memoize quick access cards to prevent re-creation on every render
  const quickAccessCards: QuickAccessCard[] = useMemo(() => [
    {
      title: "Voice to Text",
      description: "Convert voice notes to text with advanced speech recognition",
      icon: <Mic className="w-6 h-6" />,
      href: "/dashboard/voice-to-text",
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "OCR Recognition",
      description: "Extract text from photos and documents automatically",
      icon: <FileText className="w-6 h-6" />,
      href: "/dashboard/ocr",
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Smart Summarization",
      description: "Generate concise summaries in EMR template format",
      icon: <Brain className="w-6 h-6" />,
      href: "/dashboard/summarization",
      color: "from-cyan-500 to-cyan-600",
    },
  ], [])

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">PSG Hospitals Cardiology - Medical documentation overview for today</p>
        </div>
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg">
          <Zap className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground">AI-Powered</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Patients Today</p>
              <p className="text-3xl font-bold text-foreground mt-2">5</p>
              <p className="text-xs text-muted-foreground mt-1">+2 from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        

        <div className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all hover:border-primary/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm font-medium">Documents</p>
              <p className="text-3xl font-bold text-foreground mt-2">24</p>
              <p className="text-xs text-muted-foreground mt-1">12 processed today</p>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        
      </div>

      {/* Quick Access Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Quick Access</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {quickAccessCards.map((card) => (
            <QuickAccessCard key={card.href} card={card} />
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Patient List */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Today's Patients</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">{patients.length} patients</span>
              <Link
                href="/dashboard/patients"
                className="ml-2 p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span className="text-sm font-medium">Add</span>
              </Link>
            </div>
          </div>
          <div className="divide-y divide-border max-h-96 overflow-y-auto">
            {patients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                isSelected={selectedPatient?.id === patient.id}
                onSelect={setSelectedPatient}
              />
            ))}
          </div>
        </div>

        {/* Patient Details Sidebar */}
        <PatientDetails patient={selectedPatient} />
      </div>
    </div>
  )
}
