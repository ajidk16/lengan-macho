"use client"

import { BrandCard } from "@/components/ui/brand-card"
import { useFitnessStore } from "@/lib/store"
import { useTranslation } from "@/lib/i18n"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ProgressChart() {
  const { progress, language, isDarkMode } = useFitnessStore()
  const { t } = useTranslation(language)

  const chartData = progress.map((entry) => ({
    week: `Week ${entry.week}`,
    weight: entry.weight,
    armSize: entry.armSize,
    chestSize: entry.chestSize || 0,
    waistSize: entry.waistSize || 0,
  }))

  const gridColor = isDarkMode ? "#374151" : "#fed7aa"
  const axisColor = isDarkMode ? "#9ca3af" : "#ea580c"
  const tooltipBg = isDarkMode ? "#1f2937" : "#fff7ed"
  const tooltipBorder = isDarkMode ? "#374151" : "#fed7aa"

  return (
    <BrandCard title={`📊 ${t("progressHistory")} Chart`} variant="gradient" className="col-span-full">
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
            <XAxis dataKey="week" stroke={axisColor} fontSize={12} />
            <YAxis stroke={axisColor} fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: "8px",
                color: isDarkMode ? "#f3f4f6" : "#1f2937",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#f97316"
              strokeWidth={3}
              dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
              name={`${t("weight")} (${t("kg")})`}
            />
            <Line
              type="monotone"
              dataKey="armSize"
              stroke="#eab308"
              strokeWidth={3}
              dot={{ fill: "#eab308", strokeWidth: 2, r: 4 }}
              name={`${t("arm")} (${t("cm")})`}
            />
            <Line
              type="monotone"
              dataKey="chestSize"
              stroke="#f59e0b"
              strokeWidth={3}
              dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
              name={`${t("chest")} (${t("cm")})`}
            />
            <Line
              type="monotone"
              dataKey="waistSize"
              stroke="#d97706"
              strokeWidth={3}
              dot={{ fill: "#d97706", strokeWidth: 2, r: 4 }}
              name={`${t("waist")} (${t("cm")})`}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </BrandCard>
  )
}
