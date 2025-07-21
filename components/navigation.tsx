"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useFitnessStore } from "@/lib/store"
import { Home, TrendingUp, Utensils, Dumbbell, Lightbulb, Calculator, Menu, X } from "lucide-react"
import { useState } from "react"

const navigationItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "tracker", label: "Progress", icon: TrendingUp },
  { id: "meals", label: "Meal Plan", icon: Utensils },
  { id: "workout", label: "Workout", icon: Dumbbell },
  { id: "tips", label: "Tips & Notes", icon: Lightbulb },
  { id: "calculator", label: "Calculator", icon: Calculator },
] as const

export function Navigation() {
  const { currentView, setCurrentView } = useFitnessStore()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <Card className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-50 p-2 shadow-lg">
        <nav className="flex flex-col gap-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentView(item.id as any)}
                className="justify-start gap-2 w-full"
                title={item.label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden lg:inline">{item.label}</span>
              </Button>
            )
          })}
        </nav>
      </Card>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed top-4 left-4 z-50 shadow-lg bg-transparent"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <Card
          className={`fixed left-4 top-16 z-50 p-4 shadow-lg transition-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setCurrentView(item.id as any)
                    setIsMobileMenuOpen(false)
                  }}
                  className="justify-start gap-2 w-full"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </Card>
      </div>
    </>
  )
}
