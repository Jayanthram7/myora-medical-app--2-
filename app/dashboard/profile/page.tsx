"use client"

import { useState, useEffect } from "react"
import { User, Mail, Phone, MapPin, Edit2, Check, X } from "lucide-react"

interface UserProfile {
  name: string
  email: string
  phone: string
  specialization: string
  hospital: string
  licenseNumber: string
  yearsOfExperience: number
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      const mockProfile: UserProfile = {
        name: user.name,
        email: user.email,
        phone: "+1 (555) 123-4567",
        specialization: "Cardiology",
        hospital: "City Medical Center",
        licenseNumber: "MD-2024-001",
        yearsOfExperience: 8,
      }
      setProfile(mockProfile)
      setEditedProfile(mockProfile)
    }
  }, [])

  const handleSave = () => {
    if (editedProfile) {
      setProfile(editedProfile)
      setIsEditing(false)
      alert("Profile updated successfully!")
    }
  }

  const handleCancel = () => {
    setEditedProfile(profile)
    setIsEditing(false)
  }

  if (!profile) return null

  return (
    <div className="p-8 space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">My Profile</h1>
          <p className="text-muted-foreground">Manage your professional information</p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
        >
          <Edit2 className="w-5 h-5" />
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {/* Header Background */}
        <div className="h-32 bg-gradient-to-r from-primary to-accent"></div>

        {/* Profile Content */}
        <div className="px-8 pb-8">
          {/* Avatar and Name */}
          <div className="flex items-end gap-6 -mt-16 mb-8">
            <div className="w-32 h-32 bg-primary/20 rounded-xl border-4 border-white flex items-center justify-center">
              <User className="w-16 h-16 text-primary" />
            </div>
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedProfile?.name || ""}
                  onChange={(e) => setEditedProfile({ ...editedProfile!, name: e.target.value })}
                  className="text-3xl font-bold text-foreground bg-input border border-border rounded-lg px-4 py-2 w-full"
                />
              ) : (
                <h2 className="text-3xl font-bold text-foreground">{profile.name}</h2>
              )}
              <p className="text-muted-foreground mt-1">{profile.specialization}</p>
            </div>
          </div>

          {/* Profile Information Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedProfile?.email || ""}
                    onChange={(e) => setEditedProfile({ ...editedProfile!, email: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedProfile?.phone || ""}
                    onChange={(e) => setEditedProfile({ ...editedProfile!, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.phone}</p>
                )}
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">Specialization</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.specialization || ""}
                    onChange={(e) => setEditedProfile({ ...editedProfile!, specialization: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.specialization}</p>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Hospital */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  Hospital / Clinic
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.hospital || ""}
                    onChange={(e) => setEditedProfile({ ...editedProfile!, hospital: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.hospital}</p>
                )}
              </div>

              {/* License Number */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">License Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedProfile?.licenseNumber || ""}
                    onChange={(e) => setEditedProfile({ ...editedProfile!, licenseNumber: e.target.value })}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.licenseNumber}</p>
                )}
              </div>

              {/* Years of Experience */}
              <div>
                <label className="block text-sm font-semibold text-muted-foreground mb-2">Years of Experience</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={editedProfile?.yearsOfExperience || 0}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile!, yearsOfExperience: Number.parseInt(e.target.value) })
                    }
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-input text-foreground"
                  />
                ) : (
                  <p className="text-foreground font-medium">{profile.yearsOfExperience} years</p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all"
              >
                <Check className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 py-3 border-2 border-border rounded-lg font-semibold hover:bg-secondary transition-all"
              >
                <X className="w-5 h-5" />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
