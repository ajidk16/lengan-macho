"use client"

import { BrandCard } from "@/components/ui/brand-card"
import { BrandButton } from "@/components/ui/brand-button"
import { PageHeader } from "@/components/layout/page-header"
import { Badge } from "@/components/ui/badge"
import { useFitnessStore } from "@/lib/store"
import { Clock, Utensils } from "lucide-react"

const days = [
  { key: "senin", label: "Sen", color: "bg-orange-100 text-orange-800" },
  { key: "selasa", label: "Sel", color: "bg-yellow-100 text-yellow-800" },
  { key: "rabu", label: "Rab", color: "bg-orange-100 text-orange-800" },
  { key: "kamis", label: "Kam", color: "bg-yellow-100 text-yellow-800" },
  { key: "jumat", label: "Jum", color: "bg-orange-100 text-orange-800" },
  { key: "sabtu", label: "Sab", color: "bg-yellow-100 text-yellow-800" },
  { key: "minggu", label: "Min", color: "bg-orange-100 text-orange-800" },
]

export function MealView() {
  const { selectedDay, setSelectedDay, mealPlans } = useFitnessStore()

  const currentMeals = mealPlans[selectedDay] || []
  const totalCalories = currentMeals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0),
    0,
  )

  return (
    <div className="space-y-8">
      <PageHeader title="Rencana Makan" subtitle="Panduan nutrisi harian untuk mencapai target fitness" icon="🍽️" />

      {/* Day Selector */}
      <BrandCard variant="gradient">
        <div className="flex flex-wrap justify-center gap-2">
          {days.map((day) => (
            <BrandButton
              key={day.key}
              variant={selectedDay === day.key ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedDay(day.key)}
              className="min-w-[60px] font-medium bg-transparent hover:bg-transparent"
            >
              {day.label}
            </BrandButton>
          ))}
        </div>
      </BrandCard>

      {/* Meal Schedule */}
      <div className="space-y-4">
        {currentMeals.map((mealTime, index) => (
          <BrandCard key={index} variant="bordered" className="border-l-4 border-l-orange-500">
            <div className="space-y-4">
              {/* Meal Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Clock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-800 text-lg">{mealTime.meal}</h3>
                    <p className="text-orange-600 text-sm">{mealTime.time}</p>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200 font-semibold">
                  {mealTime.foods.reduce((sum, food) => sum + food.calories, 0)} kal
                </Badge>
              </div>

              {/* Food Items */}
              <div className="grid gap-2">
                {mealTime.foods.map((food, foodIndex) => (
                  <div
                    key={foodIndex}
                    className="flex justify-between items-center py-2 px-3 bg-orange-50 rounded-lg border border-orange-100"
                  >
                    <div className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-700 font-medium">{food.name}</span>
                    </div>
                    <span className="text-orange-600 font-semibold text-sm">{food.calories} kal</span>
                  </div>
                ))}
              </div>
            </div>
          </BrandCard>
        ))}
      </div>

      {/* Daily Summary */}
      <BrandCard variant="gradient" className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <Utensils className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-800">Total Kalori Hari Ini</span>
          </div>
          <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">
            {totalCalories.toLocaleString()} kalori
          </div>
          <div className="flex justify-center gap-4 text-sm">
            <div className="text-orange-600">
              <span className="font-semibold">{currentMeals.length}</span> waktu makan
            </div>
            <div className="text-orange-600">
              <span className="font-semibold">{Math.round(totalCalories / currentMeals.length)}</span> kal/makan
            </div>
          </div>
        </div>
      </BrandCard>
    </div>
  )
}
