"use client"

import { StatCard } from "@/components/ui/stat-card"
import { BrandCard } from "@/components/ui/brand-card"
import { PageHeader } from "@/components/layout/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useFitnessStore } from "@/lib/store"
import { useTranslation } from "@/lib/i18n"
import { Scale, Ruler, Activity, Target } from "lucide-react"
import { ProgressModal } from "@/components/views/progress-modal"
import { ProgressChart } from "@/components/views/progress-chart"

export function TrackerView() {
  const { progress, language, isDarkMode } = useFitnessStore()
  const { t } = useTranslation(language)

  const latestEntry = progress[progress.length - 1]
  const previousEntry = progress[progress.length - 2]

  const getChange = (current: number, previous: number) => {
    return current - previous
  }

  return (
    <div className="space-y-8">
      <PageHeader title={t("progressTracker")} subtitle={t("progressSubtitle")} icon="📈" actions={<ProgressModal />} />

      {/* Summary Stats */}
      {latestEntry && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title={t("weight")}
            value={latestEntry.weight}
            unit={t("kg")}
            change={previousEntry ? getChange(latestEntry.weight, previousEntry.weight) : undefined}
            icon={<Scale className="w-6 h-6 text-orange-500" />}
            color="orange"
          />

          <StatCard
            title={t("armCircumference")}
            value={latestEntry.armSize}
            unit={t("cm")}
            change={previousEntry ? getChange(latestEntry.armSize, previousEntry.armSize) : undefined}
            icon={<Ruler className="w-6 h-6 text-green-500" />}
            color="green"
          />

          {latestEntry.chestSize && (
            <StatCard
              title={t("chest")}
              value={latestEntry.chestSize}
              unit={t("cm")}
              change={previousEntry?.chestSize ? getChange(latestEntry.chestSize, previousEntry.chestSize) : undefined}
              icon={<Activity className="w-6 h-6 text-blue-500" />}
              color="blue"
            />
          )}

          {latestEntry.waistSize && (
            <StatCard
              title={t("waist")}
              value={latestEntry.waistSize}
              unit={t("cm")}
              change={previousEntry?.waistSize ? getChange(latestEntry.waistSize, previousEntry.waistSize) : undefined}
              icon={<Target className="w-6 h-6 text-purple-500" />}
              color="purple"
            />
          )}
        </div>
      )}

      {/* Progress Chart */}
      <ProgressChart />

      {/* Progress History Table */}
      <BrandCard title={`📋 ${t("progressHistory")}`} variant="gradient">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className={isDarkMode ? "border-gray-700" : "border-orange-200"}>
                <TableHead className={`font-semibold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("date")}
                </TableHead>
                <TableHead className={`font-semibold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("week")}
                </TableHead>
                <TableHead className={`font-semibold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("weight")} ({t("kg")})
                </TableHead>
                <TableHead className={`font-semibold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("arm")} ({t("cm")})
                </TableHead>
                <TableHead className={`font-semibold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("chest")} ({t("cm")})
                </TableHead>
                <TableHead className={`font-semibold ${isDarkMode ? "text-orange-400" : "text-orange-800"}`}>
                  {t("waist")} ({t("cm")})
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {progress.map((entry) => (
                <TableRow
                  key={entry.id}
                  className={`${
                    isDarkMode ? "border-gray-700 hover:bg-gray-800/50" : "border-orange-100 hover:bg-orange-50"
                  }`}
                >
                  <TableCell className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    {new Date(entry.date).toLocaleDateString(language === "id" ? "id-ID" : "en-US")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        isDarkMode
                          ? "bg-orange-900/20 text-orange-400 border-orange-800"
                          : "bg-orange-100 text-orange-800 border-orange-200"
                      }`}
                    >
                      Week {entry.week}
                    </Badge>
                  </TableCell>
                  <TableCell className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                    {entry.weight}
                  </TableCell>
                  <TableCell className={`font-medium ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
                    {entry.armSize}
                  </TableCell>
                  <TableCell className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    {entry.chestSize || "-"}
                  </TableCell>
                  <TableCell className={isDarkMode ? "text-gray-300" : "text-gray-700"}>
                    {entry.waistSize || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </BrandCard>
    </div>
  )
}
