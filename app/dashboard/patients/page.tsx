"use client"

import { useState, useEffect } from "react"
import { Plus, Search, Edit2, Trash2, X, Check } from "lucide-react"

interface Patient {
  id: string
  name: string
  age: number
  condition: string
  lastVisit: string
  email: string
  phone: string
}

const cardiacConditions = [
  "Hypertension",
  "Atrial Fibrillation",
  "Coronary Artery Disease",
  "Myocarditis",
  "Heart Failure",
  "Arrhythmia",
  "Valvular Heart Disease",
  "Cardiomyopathy",
  "Pericarditis",
  "Angina",
]

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    condition: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    setPatients([
      {
        id: "P001",
        name: "John Smith",
        age: 45,
        condition: "Hypertension",
        lastVisit: "2025-10-15",
        email: "john@example.com",
        phone: "+1-555-0101",
      },
      {
        id: "P002",
        name: "Sarah Johnson",
        age: 32,
        condition: "Atrial Fibrillation",
        lastVisit: "2025-10-14",
        email: "sarah@example.com",
        phone: "+1-555-0102",
      },
      {
        id: "P003",
        name: "Michael Brown",
        age: 58,
        condition: "Coronary Artery Disease",
        lastVisit: "2025-10-13",
        email: "michael@example.com",
        phone: "+1-555-0103",
      },
      {
        id: "P004",
        name: "Emily Davis",
        age: 28,
        condition: "Myocarditis",
        lastVisit: "2025-10-12",
        email: "emily@example.com",
        phone: "+1-555-0104",
      },
      {
        id: "P005",
        name: "Robert Wilson",
        age: 65,
        condition: "Heart Failure",
        lastVisit: "2025-10-11",
        email: "robert@example.com",
        phone: "+1-555-0105",
      },
      {
        id: "P006",
        name: "Lisa Anderson",
        age: 52,
        condition: "Arrhythmia",
        lastVisit: "2025-10-10",
        email: "lisa@example.com",
        phone: "+1-555-0106",
      },
      {
        id: "P007",
        name: "James Martinez",
        age: 41,
        condition: "Valvular Heart Disease",
        lastVisit: "2025-10-09",
        email: "james@example.com",
        phone: "+1-555-0107",
      },
      {
        id: "P008",
        name: "Patricia Taylor",
        age: 55,
        condition: "Cardiomyopathy",
        lastVisit: "2025-10-08",
        email: "patricia@example.com",
        phone: "+1-555-0108",
      },
    ])
  }, [])

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPatient = () => {
    if (!formData.name || !formData.age || !formData.condition || !formData.email || !formData.phone) {
      alert("Please fill in all fields")
      return
    }

    if (editingId) {
      setPatients(
        patients.map((p) =>
          p.id === editingId
            ? {
                ...p,
                name: formData.name,
                age: Number.parseInt(formData.age),
                condition: formData.condition,
                email: formData.email,
                phone: formData.phone,
              }
            : p,
        ),
      )
      setEditingId(null)
    } else {
      const newPatient: Patient = {
        id: `P${String(patients.length + 1).padStart(3, "0")}`,
        name: formData.name,
        age: Number.parseInt(formData.age),
        condition: formData.condition,
        lastVisit: new Date().toISOString().split("T")[0],
        email: formData.email,
        phone: formData.phone,
      }
      setPatients([...patients, newPatient])
    }

    setFormData({ name: "", age: "", condition: "", email: "", phone: "" })
    setShowAddForm(false)
  }

  const handleEditPatient = (patient: Patient) => {
    setFormData({
      name: patient.name,
      age: patient.age.toString(),
      condition: patient.condition,
      email: patient.email,
      phone: patient.phone,
    })
    setEditingId(patient.id)
    setShowAddForm(true)
  }

  const handleDeletePatient = (id: string) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      setPatients(patients.filter((p) => p.id !== id))
    }
  }

  const handleCancel = () => {
    setShowAddForm(false)
    setEditingId(null)
    setFormData({ name: "", age: "", condition: "", email: "", phone: "" })
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">All Patients</h1>
          <p className="text-muted-foreground">Manage and view all cardiology patients</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search by name, ID, or condition..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
        />
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground">{editingId ? "Edit Patient" : "Add New Patient"}</h2>
            <button onClick={handleCancel} className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Patient Name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Age</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                placeholder="45"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Cardiac Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="">Select a condition</option>
                {cardiacConditions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="patient@example.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1-555-0000"
                className="w-full px-4 py-2 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAddPatient}
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              {editingId ? "Update Patient" : "Add Patient"}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Patient ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Condition</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Phone</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Last Visit</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-secondary transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{patient.id}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.name}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.age}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {patient.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{patient.phone}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{patient.lastVisit}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditPatient(patient)}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePatient(patient.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-muted-foreground">
                    No patients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm font-medium">Total Patients</p>
          <p className="text-3xl font-bold text-foreground mt-2">{patients.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm font-medium">Average Age</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {patients.length > 0 ? Math.round(patients.reduce((sum, p) => sum + p.age, 0) / patients.length) : 0}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-border p-6">
          <p className="text-muted-foreground text-sm font-medium">Conditions Tracked</p>
          <p className="text-3xl font-bold text-foreground mt-2">{new Set(patients.map((p) => p.condition)).size}</p>
        </div>
      </div>
    </div>
  )
}
