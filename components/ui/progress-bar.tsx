import { cn } from "@/lib/utils"
import { useFitnessStore } from "@/lib/store"

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  color?: "orange" | "green" | "blue" | "purple"
  size?: "sm" | "md" | "lg"
  showPercentage?: boolean
}

export function ProgressBar({
  value,
  max,
  label,
  color = "orange",
  size = "md",
  showPercentage = true,
}: ProgressBarProps) {
  const { isDarkMode } = useFitnessStore()
  const percentage = Math.min((value / max) * 100, 100)

  const colorClasses = {
    orange: "bg-orange-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
  }

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }

  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700"
  const subtextColor = isDarkMode ? "text-gray-400" : "text-gray-500"
  const bgColor = isDarkMode ? "bg-gray-700" : "bg-gray-200"

  return (
    <div className="space-y-2">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className={cn("font-medium", textColor)}>{label}</span>}
          {showPercentage && <span className={subtextColor}>{Math.round(percentage)}%</span>}
        </div>
      )}
      <div className={cn("w-full rounded-full overflow-hidden", sizeClasses[size], bgColor)}>
        <div
          className={cn("h-full rounded-full transition-all duration-500 ease-out", colorClasses[color])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
