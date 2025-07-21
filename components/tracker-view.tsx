"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useFitnessStore } from "@/lib/store"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { ProgressModal } from "./progress-modal"
import { ProgressChart } from "./progress-chart"

export function TrackerView() {
  const { progress } = useFitnessStore()

  const latestEntry = progress[progress.length - 1]
  const previousEntry = progress[progress.length - 2]

  const getChange = (current: number, previous: number) => {
    const change = current - previous
    return {
      value: change,
      isPositive: change > 0,
      isNegative: change < 0,
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">📈 Progress Tracker</h2>
        <ProgressModal />
      </div>

      {/* Summary Cards */}
      {latestEntry && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Berat Badan</p>
                <p className="text-2xl font-bold text-blue-600">{latestEntry.weight} kg</p>
                {previousEntry && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {getChange(latestEntry.weight, previousEntry.weight).isPositive ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : getChange(latestEntry.weight, previousEntry.weight).isNegative ? (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    ) : (
                      <Minus className="w-3 h-3 text-gray-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {getChange(latestEntry.weight, previousEntry.weight).value > 0 ? "+" : ""}
                      {getChange(latestEntry.weight, previousEntry.weight).value.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">Lingkar Lengan</p>
                <p className="text-2xl font-bold text-green-600">{latestEntry.armSize} cm</p>
                {previousEntry && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    {getChange(latestEntry.armSize, previousEntry.armSize).isPositive ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : getChange(latestEntry.armSize, previousEntry.armSize).isNegative ? (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    ) : (
                      <Minus className="w-3 h-3 text-gray-500" />
                    )}
                    <span className="text-xs text-gray-500">
                      {getChange(latestEntry.armSize, previousEntry.armSize).value > 0 ? "+" : ""}
                      {getChange(latestEntry.armSize, previousEntry.armSize).value.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {latestEntry.chestSize && (
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lingkar Dada</p>
                  <p className="text-2xl font-bold text-purple-600">{latestEntry.chestSize} cm</p>
                  {previousEntry?.chestSize && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {getChange(latestEntry.chestSize, previousEntry.chestSize).isPositive ? (
                        <TrendingUp className="w-3 h-3 text-green-500" />
                      ) : getChange(latestEntry.chestSize, previousEntry.chestSize).isNegative ? (
                        <TrendingDown className="w-3 h-3 text-red-500" />
                      ) : (
                        <Minus className="w-3 h-3 text-gray-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {getChange(latestEntry.chestSize, previousEntry.chestSize).value > 0 ? "+" : ""}
                        {getChange(latestEntry.chestSize, previousEntry.chestSize).value.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {latestEntry.waistSize && (
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Lingkar Pinggang</p>
                  <p className="text-2xl font-bold text-orange-600">{latestEntry.waistSize} cm</p>
                  {previousEntry?.waistSize && (
                    <div className="flex items-center justify-center gap-1 mt-1">
                      {getChange(latestEntry.waistSize, previousEntry.waistSize).isNegative ? (
                        <TrendingDown className="w-3 h-3 text-green-500" />
                      ) : getChange(latestEntry.waistSize, previousEntry.waistSize).isPositive ? (
                        <TrendingUp className="w-3 h-3 text-red-500" />
                      ) : (
                        <Minus className="w-3 h-3 text-gray-500" />
                      )}
                      <span className="text-xs text-gray-500">
                        {getChange(latestEntry.waistSize, previousEntry.waistSize).value > 0 ? "+" : ""}
                        {getChange(latestEntry.waistSize, previousEntry.waistSize).value.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Progress Chart */}
      <ProgressChart />

      {/* Progress Table */}
      <Card>
        <CardHeader>
          <CardTitle>Riwayat Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Minggu</TableHead>
                  <TableHead>Berat (kg)</TableHead>
                  <TableHead>Lengan (cm)</TableHead>
                  <TableHead>Dada (cm)</TableHead>
                  <TableHead>Pinggang (cm)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {progress.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{new Date(entry.date).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell>
                      <Badge variant="outline">Week {entry.week}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{entry.weight}</TableCell>
                    <TableCell className="font-medium">{entry.armSize}</TableCell>
                    <TableCell>{entry.chestSize || "-"}</TableCell>
                    <TableCell>{entry.waistSize || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
