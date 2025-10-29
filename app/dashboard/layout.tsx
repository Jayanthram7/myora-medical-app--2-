"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect, useMemo, memo, Suspense } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, LogOut, User, Home, FileText, Mic, Brain, Users } from "lucide-react"
import { DashboardPageSkeleton } from "@/components/dashboard/page-skeleton"

const NavItems = memo(({ items, pathname, sidebarOpen }: any) => (
  <nav className="flex-1 p-4 space-y-2">
    {items.map((item: any) => {
      const Icon = item.icon
      const isActive = pathname === item.href
      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-150 ${
            isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
          }`}
        >
          <Icon className="w-5 h-5 flex-shrink-0" />
          {sidebarOpen && <span className="font-medium">{item.label}</span>}
        </Link>
      )
    })}
  </nav>
))

NavItems.displayName = "NavItems"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      setUser({ name: "Demo User", role: "Doctor" })
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const navItems = useMemo(
    () => [
      { href: "/dashboard", label: "Home", icon: Home },
      { href: "/dashboard/patients", label: "All Patients", icon: Users },
      { href: "/dashboard/ocr", label: "OCR", icon: FileText },
      { href: "/dashboard/summarization", label: "Summarization", icon: Brain },
      { href: "/dashboard/voice-to-text", label: "Voice to Text", icon: Mic },
      { href: "/dashboard/profile", label: "My Profile", icon: User },
    ],
    [],
  )

  if (!user) return null

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-white border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-border flex items-center gap-3">
          <Image
            src="/myora-logo.jpg"
            alt="PSG Hospitals Logo"
            width={40}
            height={40}
            className="rounded-lg shadow-lg flex-shrink-0"
            priority
          />
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-bold text-foreground text-sm">PSG Hospitals</span>
              <span className="text-xs text-primary">Cardiology</span>
            </div>
          )}
        </div>

        {/* Navigation */}
        <NavItems items={navItems} pathname={pathname} sidebarOpen={sidebarOpen} />

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-destructive hover:bg-destructive/10 rounded-lg transition-all"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-semibold text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground capitalize">{user?.role || "Doctor"}</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <Suspense fallback={<DashboardPageSkeleton />}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}
