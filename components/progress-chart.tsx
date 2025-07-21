"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useFitnessStore } from "@/lib/store"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export function ProgressChart() {
  const { progress } = useFitnessStore()

  const chartData = progress.map((entry) => ({
    week: `Week ${entry.week}`,
    weight: entry.weight,
    armSize: entry.armSize,
    chestSize: entry.chestSize || 0,
    waistSize: entry.waistSize || 0,
  }))

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">📊 Progress Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} name="Berat Badan (kg)" />
              <Line type="monotone" dataKey="armSize" stroke="#10b981" strokeWidth={2} name="Lingkar Lengan (cm)" />
              <Line type="monotone" dataKey="chestSize" stroke="#8b5cf6" strokeWidth={2} name="Lingkar Dada (cm)" />
              <Line type="monotone" dataKey="waistSize" stroke="#f59e0b" strokeWidth={2} name="Lingkar Pinggang (cm)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
