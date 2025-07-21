"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface ProgressEntry {
  date: string
  week: number
  weight: number
  armSize: number
  chestSize?: number
  waistSize?: number
}

const initialProgress: ProgressEntry[] = [
  { date: "2024-01-01", week: 1, weight: 70.5, armSize: 32.0, chestSize: 95.0, waistSize: 80.0 },
  { date: "2024-01-08", week: 2, weight: 71.2, armSize: 32.5, chestSize: 96.0, waistSize: 79.5 },
  { date: "2024-01-15", week: 3, weight: 72.0, armSize: 33.0, chestSize: 97.0, waistSize: 79.0 },
]

export function ProgressTracker() {
  const [progress, setProgress] = useState<ProgressEntry[]>(initialProgress)
  const [isAdding, setIsAdding] = useState(false)
  const [newEntry, setNewEntry] = useState({
    week: "",
    weight: "",
    armSize: "",
    chestSize: "",
    waistSize: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const entry: ProgressEntry = {
      date: new Date().toISOString().split("T")[0],
      week: Number.parseInt(newEntry.week),
      weight: Number.parseFloat(newEntry.weight),
      armSize: Number.parseFloat(newEntry.armSize),
      chestSize: newEntry.chestSize ? Number.parseFloat(newEntry.chestSize) : undefined,
      waistSize: newEntry.waistSize ? Number.parseFloat(newEntry.waistSize) : undefined,
    }

    setProgress([...progress, entry])
    setNewEntry({ week: "", weight: "", armSize: "", chestSize: "", waistSize: "" })
    setIsAdding(false)
  }

  const getChange = (current: number, previous: number) => {
    const change = current - previous
    return {
      value: change,
      isPositive: change > 0,
      isNegative: change < 0,
    }
  }

  const latestEntry = progress[progress.length - 1]
  const previousEntry = progress[progress.length - 2]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">📈 Tracker Progress</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Summary Cards */}
          {latestEntry && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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

          {/* Add Progress Button */}
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => setIsAdding(!isAdding)}
              className="flex items-center gap-2"
              variant={isAdding ? "outline" : "default"}
            >
              <Plus className="w-4 h-4" />
              {isAdding ? "Batal" : "Tambah Progress"}
            </Button>
          </div>

          {/* Add Progress Form */}
          {isAdding && (
            <Card className="mb-6 border-2 border-dashed border-blue-300">
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <Label htmlFor="week">Minggu ke-</Label>
                      <Input
                        id="week"
                        type="number"
                        value={newEntry.week}
                        onChange={(e) => setNewEntry({ ...newEntry, week: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="weight">Berat (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        value={newEntry.weight}
                        onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="armSize">Lengan (cm)</Label>
                      <Input
                        id="armSize"
                        type="number"
                        step="0.1"
                        value={newEntry.armSize}
                        onChange={(e) => setNewEntry({ ...newEntry, armSize: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="chestSize">Dada (cm)</Label>
                      <Input
                        id="chestSize"
                        type="number"
                        step="0.1"
                        value={newEntry.chestSize}
                        onChange={(e) => setNewEntry({ ...newEntry, chestSize: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="waistSize">Pinggang (cm)</Label>
                      <Input
                        id="waistSize"
                        type="number"
                        step="0.1"
                        value={newEntry.waistSize}
                        onChange={(e) => setNewEntry({ ...newEntry, waistSize: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Simpan Progress
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Progress Table */}
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
                {progress.map((entry, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(entry.date).toLocaleDateString("id-ID")}</TableCell>
                    <TableCell className="font-medium">{entry.week}</TableCell>
                    <TableCell>{entry.weight}</TableCell>
                    <TableCell>{entry.armSize}</TableCell>
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
