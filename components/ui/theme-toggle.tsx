"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useFitnessStore } from "@/lib/store"
import { useTranslation } from "@/lib/i18n"

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode, language } = useFitnessStore()
  const { t } = useTranslation(language)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className={`p-2 rounded-full transition-colors ${
        isDarkMode
          ? "text-orange-400 hover:bg-orange-900/20 hover:text-orange-300"
          : "text-orange-600 hover:bg-orange-100 hover:text-orange-700"
      }`}
      title={isDarkMode ? t("lightMode") : t("darkMode")}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </Button>
  )
}
