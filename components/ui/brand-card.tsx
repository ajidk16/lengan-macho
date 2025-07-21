import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useFitnessStore } from "@/lib/store"
import type { ReactNode } from "react"

interface BrandCardProps {
  title?: string
  children: ReactNode
  className?: string
  variant?: "default" | "gradient" | "bordered"
  size?: "sm" | "md" | "lg"
}

export function BrandCard({ title, children, className, variant = "default", size = "md" }: BrandCardProps) {
  const { isDarkMode } = useFitnessStore()

  const variants = {
    default: isDarkMode
      ? "bg-gray-800 border-gray-700 shadow-lg shadow-black/20"
      : "bg-white border-orange-100 shadow-lg shadow-orange-500/5",
    gradient: isDarkMode
      ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 shadow-lg shadow-black/30"
      : "bg-gradient-to-br from-white to-orange-50 border-orange-200 shadow-lg shadow-orange-500/10",
    bordered: isDarkMode
      ? "bg-gray-800 border-l-4 border-l-orange-500 shadow-md shadow-black/20"
      : "bg-white border-l-4 border-l-orange-500 shadow-md",
  }

  const sizes = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  }

  const titleColor = isDarkMode ? "text-orange-400" : "text-orange-800"

  return (
    <Card className={cn(variants[variant], className)}>
      {title && (
        <CardHeader className={cn("pb-3", sizes[size])}>
          <CardTitle className={cn(titleColor, "font-semibold")}>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn(title ? "pt-0" : "", sizes[size])}>{children}</CardContent>
    </Card>
  )
}
