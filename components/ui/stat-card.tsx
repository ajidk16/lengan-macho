import type React from "react"
import { BrandCard } from "./brand-card"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useFitnessStore } from "@/lib/store"

interface StatCardProps {
  title: string
  value: string | number
  unit?: string
  change?: number
  icon?: React.ReactNode
  color?: "orange" | "yellow" | "green" | "blue" | "purple"
}

export function StatCard({ title, value, unit, change, icon, color = "orange" }: StatCardProps) {
  const { isDarkMode } = useFitnessStore()

  const colorClasses = {
    orange: isDarkMode ? "border-l-orange-500 text-orange-400" : "border-l-orange-500 text-orange-600",
    yellow: isDarkMode ? "border-l-yellow-500 text-yellow-400" : "border-l-yellow-500 text-yellow-600",
    green: isDarkMode ? "border-l-green-500 text-green-400" : "border-l-green-500 text-green-600",
    blue: isDarkMode ? "border-l-blue-500 text-blue-400" : "border-l-blue-500 text-blue-600",
    purple: isDarkMode ? "border-l-purple-500 text-purple-400" : "border-l-purple-500 text-purple-600",
  }

  const getTrendIcon = () => {
    if (!change) return null
    if (change > 0) return <TrendingUp className="w-3 h-3 text-green-500" />
    if (change < 0) return <TrendingDown className="w-3 h-3 text-red-500" />
    return <Minus className="w-3 h-3 text-gray-500" />
  }

  const textColor = isDarkMode ? "text-gray-300" : "text-gray-600"
  const unitColor = isDarkMode ? "text-gray-400" : "text-gray-500"

  return (
    <BrandCard variant="bordered" className={cn("border-l-4", colorClasses[color])}>
      <div className="text-center space-y-2">
        {icon && <div className="flex justify-center">{icon}</div>}
        <p className={cn("text-sm font-medium", textColor)}>{title}</p>
        <div className="flex items-baseline justify-center gap-1">
          <p className={cn("text-2xl font-bold", colorClasses[color])}>{value}</p>
          {unit && <span className={cn("text-sm", unitColor)}>{unit}</span>}
        </div>
        {change !== undefined && (
          <div className="flex items-center justify-center gap-1">
            {getTrendIcon()}
            <span className={cn("text-xs", unitColor)}>
              {change > 0 ? "+" : ""}
              {change.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </BrandCard>
  )
}
