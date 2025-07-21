import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useFitnessStore } from "@/lib/store"
import type { ReactNode } from "react"

interface BrandButtonProps {
  children: ReactNode
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  className?: string
  onClick?: () => void
  disabled?: boolean
  type?: "button" | "submit" | "reset"
}

export function BrandButton({ children, variant = "primary", size = "md", className, ...props }: BrandButtonProps) {
  const { isDarkMode } = useFitnessStore()

  const variants = {
    primary: isDarkMode
      ? "bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white shadow-lg shadow-orange-500/25"
      : "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-500/25",
    secondary: isDarkMode
      ? "bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white shadow-lg shadow-yellow-500/25"
      : "bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white shadow-lg shadow-yellow-500/25",
    outline: isDarkMode
      ? "border-2 border-orange-500 text-orange-400 hover:bg-orange-900/20"
      : "border-2 border-orange-500 text-orange-600 hover:bg-orange-50",
    ghost: isDarkMode ? "text-orange-400 hover:bg-orange-900/20" : "text-orange-600 hover:bg-orange-50",
  }

  return (
    <Button className={cn(variants[variant], className)} size={size} {...props}>
      {children}
    </Button>
  )
}
