"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useFitnessStore } from "@/lib/store"
import { TrendingUp, TrendingDown, Minus, Target, Calendar, Utensils } from "lucide-react"
import { ProgressChart } from "./progress-chart"

export function Dashboard() {
  const { progress, workouts, mealPlans, selectedDay } = useFitnessStore()

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

  const todayWorkout = workouts[selectedDay]
  const completedExercises = todayWorkout?.exercises.filter((ex) => ex.completed).length || 0
  const totalExercises = todayWorkout?.exercises.length || 0

  const todayMeals = mealPlans[selectedDay] || []
  const totalCalories = todayMeals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0),
    0,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">💪 LenganMacho</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">Dashboard Overview</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Weight Card */}
        {latestEntry && (
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
        )}

        {/* Arm Size Card */}
        {latestEntry && (
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
        )}

        {/* Workout Progress Card */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Latihan Hari Ini</p>
              <p className="text-2xl font-bold text-purple-600">
                {completedExercises}/{totalExercises}
              </p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Target className="w-3 h-3 text-purple-500" />
                <span className="text-xs text-gray-500">
                  {totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0}% selesai
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calories Card */}
        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="pt-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Kalori Hari Ini</p>
              <p className="text-2xl font-bold text-orange-600">{totalCalories}</p>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Utensils className="w-3 h-3 text-orange-500" />
                <span className="text-xs text-gray-500">kalori</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Chart */}
      <ProgressChart />

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Latihan Hari Ini
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{todayWorkout?.title}</span>
                <Badge variant="outline">{todayWorkout?.duration}</Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {completedExercises} dari {totalExercises} latihan selesai
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="w-5 h-5" />
              Rencana Makan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{todayMeals.length} waktu makan</span>
                <Badge variant="outline">{totalCalories} kal</Badge>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Target kalori harian tercapai</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((totalCalories / 2500) * 100, 100)}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
