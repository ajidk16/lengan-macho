import { useFitnessStore } from "@/lib/store"
import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  actions?: ReactNode
}

export function PageHeader({ title, subtitle, icon, actions }: PageHeaderProps) {
  const { isDarkMode } = useFitnessStore()

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        {icon && <div className="text-3xl">{icon}</div>}
        <div>
          <h1 className={`text-3xl font-bold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>{title}</h1>
          {subtitle && <p className={`mt-1 ${isDarkMode ? "text-orange-300" : "text-orange-600"}`}>{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex gap-2">{actions}</div>}
    </div>
  )
}
