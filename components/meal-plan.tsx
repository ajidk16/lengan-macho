"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const mealPlans = {
  senin: {
    "Makanan Pagi": [
      { name: "Oatmeal dengan pisang", calories: 350 },
      { name: "Telur rebus (2 butir)", calories: 140 },
      { name: "Susu protein", calories: 120 },
    ],
    "Snack Pagi": [
      { name: "Kacang almond", calories: 160 },
      { name: "Buah apel", calories: 80 },
    ],
    "Makan Siang": [
      { name: "Nasi putih (1.5 cup)", calories: 300 },
      { name: "Ayam panggang (150g)", calories: 250 },
      { name: "Sayur bayam", calories: 50 },
      { name: "Tempe goreng", calories: 180 },
    ],
    "Snack Sore": [
      { name: "Protein shake", calories: 200 },
      { name: "Pisang", calories: 100 },
    ],
    "Makan Malam": [
      { name: "Nasi merah (1 cup)", calories: 220 },
      { name: "Ikan salmon (120g)", calories: 280 },
      { name: "Brokoli rebus", calories: 60 },
    ],
    "Sebelum Tidur": [
      { name: "Greek yogurt", calories: 150 },
      { name: "Madu (1 sdm)", calories: 60 },
    ],
  },
  selasa: {
    "Makanan Pagi": [
      { name: "Roti gandum (2 slice)", calories: 160 },
      { name: "Selai kacang", calories: 190 },
      { name: "Susu almond", calories: 80 },
    ],
    "Snack Pagi": [
      { name: "Trail mix", calories: 150 },
      { name: "Jeruk", calories: 60 },
    ],
    "Makan Siang": [
      { name: "Quinoa (1 cup)", calories: 220 },
      { name: "Dada ayam (150g)", calories: 230 },
      { name: "Wortel rebus", calories: 50 },
      { name: "Tahu goreng", calories: 150 },
    ],
    "Snack Sore": [
      { name: "Smoothie protein", calories: 250 },
      { name: "Kurma (3 buah)", calories: 60 },
    ],
    "Makan Malam": [
      { name: "Pasta gandum (1 cup)", calories: 180 },
      { name: "Daging sapi (100g)", calories: 250 },
      { name: "Salad hijau", calories: 40 },
    ],
    "Sebelum Tidur": [
      { name: "Casein protein", calories: 120 },
      { name: "Kacang walnut", calories: 130 },
    ],
  },
  // Add more days as needed
}

const days = [
  { value: "senin", label: "Senin" },
  { value: "selasa", label: "Selasa" },
  { value: "rabu", label: "Rabu" },
  { value: "kamis", label: "Kamis" },
  { value: "jumat", label: "Jumat" },
  { value: "sabtu", label: "Sabtu" },
  { value: "minggu", label: "Minggu" },
]

export function MealPlan() {
  const [selectedDay, setSelectedDay] = useState("senin")

  const currentMealPlan = mealPlans[selectedDay as keyof typeof mealPlans] || mealPlans.senin

  const totalCalories = Object.values(currentMealPlan)
    .flat()
    .reduce((sum, meal) => sum + meal.calories, 0)

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Rencana Makan Harian</CardTitle>
          <div className="flex justify-center mt-4">
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Pilih hari" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(currentMealPlan).map(([mealTime, meals]) => (
            <Card key={mealTime} className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-blue-700 dark:text-blue-300">{mealTime}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {meals.map((meal, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                    >
                      <span className="text-gray-700 dark:text-gray-300">{meal.name}</span>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {meal.calories} kal
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 border-2 border-green-200 dark:border-green-700">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Estimasi Kalori Hari Ini</p>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                  {totalCalories.toLocaleString()} kalori
                </p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
