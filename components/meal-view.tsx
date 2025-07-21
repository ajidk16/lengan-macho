"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useFitnessStore } from "@/lib/store"
import { Clock, Utensils } from "lucide-react"

const days = [
  { key: "senin", label: "Sen" },
  { key: "selasa", label: "Sel" },
  { key: "rabu", label: "Rab" },
  { key: "kamis", label: "Kam" },
  { key: "jumat", label: "Jum" },
  { key: "sabtu", label: "Sab" },
  { key: "minggu", label: "Min" },
]

export function MealView() {
  const { selectedDay, setSelectedDay, mealPlans } = useFitnessStore()

  const currentMeals = mealPlans[selectedDay] || []
  const totalCalories = currentMeals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0),
    0,
  )

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">🍽️ Rencana Makan Harian</h2>

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
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-2 border-green-200 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Kalori Hari Ini</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              {totalCalories.toLocaleString()} kalori
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
