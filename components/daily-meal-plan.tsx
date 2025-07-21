"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Utensils } from "lucide-react"

const mealPlans = {
  senin: [
    {
      time: "06:00",
      meal: "Sarapan",
      foods: [
        { name: "Oatmeal + pisang + madu", calories: 350 },
        { name: "Telur rebus (2 butir)", calories: 140 },
        { name: "Susu protein", calories: 120 },
      ],
    },
    {
      time: "09:00",
      meal: "Snack Pagi",
      foods: [
        { name: "Kacang almond (30g)", calories: 160 },
        { name: "Apel medium", calories: 80 },
      ],
    },
    {
      time: "12:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (1.5 cup)", calories: 300 },
        { name: "Ayam panggang (150g)", calories: 250 },
        { name: "Sayur bayam", calories: 50 },
        { name: "Tempe goreng (100g)", calories: 180 },
      ],
    },
    {
      time: "15:00",
      meal: "Snack Sore",
      foods: [
        { name: "Protein shake", calories: 200 },
        { name: "Pisang", calories: 100 },
      ],
    },
    {
      time: "18:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi merah (1 cup)", calories: 220 },
        { name: "Ikan salmon (120g)", calories: 280 },
        { name: "Brokoli rebus", calories: 60 },
      ],
    },
    {
      time: "21:00",
      meal: "Sebelum Tidur",
      foods: [
        { name: "Greek yogurt", calories: 150 },
        { name: "Madu (1 sdm)", calories: 60 },
      ],
    },
  ],
  selasa: [
    {
      time: "06:00",
      meal: "Sarapan",
      foods: [
        { name: "Roti gandum (2 slice) + selai kacang", calories: 350 },
        { name: "Susu almond", calories: 80 },
        { name: "Pisang", calories: 100 },
      ],
    },
    {
      time: "09:00",
      meal: "Snack Pagi",
      foods: [
        { name: "Trail mix (30g)", calories: 150 },
        { name: "Jeruk", calories: 60 },
      ],
    },
    {
      time: "12:00",
      meal: "Makan Siang",
      foods: [
        { name: "Quinoa (1 cup)", calories: 220 },
        { name: "Dada ayam (150g)", calories: 230 },
        { name: "Wortel rebus", calories: 50 },
        { name: "Tahu goreng (100g)", calories: 150 },
      ],
    },
    {
      time: "15:00",
      meal: "Snack Sore",
      foods: [
        { name: "Smoothie protein", calories: 250 },
        { name: "Kurma (3 buah)", calories: 60 },
      ],
    },
    {
      time: "18:00",
      meal: "Makan Malam",
      foods: [
        { name: "Pasta gandum (1 cup)", calories: 180 },
        { name: "Daging sapi (100g)", calories: 250 },
        { name: "Salad hijau", calories: 40 },
      ],
    },
    {
      time: "21:00",
      meal: "Sebelum Tidur",
      foods: [
        { name: "Casein protein", calories: 120 },
        { name: "Kacang walnut (20g)", calories: 130 },
      ],
    },
  ],
}

const days = [
  { key: "senin", label: "Sen" },
  { key: "selasa", label: "Sel" },
  { key: "rabu", label: "Rab" },
  { key: "kamis", label: "Kam" },
  { key: "jumat", label: "Jum" },
  { key: "sabtu", label: "Sab" },
  { key: "minggu", label: "Min" },
]

export function DailyMealPlan() {
  const [selectedDay, setSelectedDay] = useState("senin")

  const currentMeals = mealPlans[selectedDay as keyof typeof mealPlans] || mealPlans.senin
  const totalCalories = currentMeals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0),
    0,
  )

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">🍽️ Rencana Makan Harian</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Day Selector */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {days.map((day) => (
              <Button
                key={day.key}
                variant={selectedDay === day.key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedDay(day.key)}
                className="min-w-[50px]"
              >
                {day.label}
              </Button>
            ))}
          </div>

          {/* Meal Schedule */}
          <div className="space-y-4">
            {currentMeals.map((mealTime, index) => (
              <Card key={index} className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="font-semibold text-green-700 dark:text-green-300">
                        {mealTime.time} - {mealTime.meal}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {mealTime.foods.reduce((sum, food) => sum + food.calories, 0)} kal
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {mealTime.foods.map((food, foodIndex) => (
                      <div key={foodIndex} className="flex justify-between items-center py-1">
                        <div className="flex items-center gap-2">
                          <Utensils className="w-3 h-3 text-gray-400" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{food.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{food.calories} kal</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Total Calories */}
          <Card className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Kalori Hari Ini</p>
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
