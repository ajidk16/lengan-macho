"use client"

import { useFitnessStore } from "@/lib/store"
import { Navigation } from "@/components/layout/navigation"
import { Dashboard } from "@/components/views/dashboard"
import { MealView } from "@/components/views/meal-view"
import { WorkoutView } from "@/components/views/workout-view"
import { WeeklyTips } from "@/components/weekly-tips"
import { CalorieCalculator } from "@/components/calorie-calculator"
import { useEffect } from "react"
import { TrackerView } from "@/features/progress/ui/TrackerView"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/tanstack-query"

export default function LenganMachoApp() {
  const { currentView, isDarkMode } = useFitnessStore()

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />
      case "tracker":
        return <TrackerView />
      case "meals":
        return <MealView />
      case "workout":
        return <WorkoutView />
      case "tips":
        return <WeeklyTips />
      case "calculator":
        return <CalorieCalculator />
      default:
        return <Dashboard />
    }
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900/20"
          : "bg-gradient-to-br from-orange-50 via-white to-yellow-50"
      }`}
    >
      <Navigation />

      <main className="container mx-auto px-4 py-8 transition-all duration-300">
        <QueryClientProvider client={queryClient}>{renderCurrentView()}</QueryClientProvider>
      </main>
    </div>
  )
}
