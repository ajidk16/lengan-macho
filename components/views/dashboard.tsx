"use client"

import { StatCard } from "@/components/ui/stat-card"
import { BrandCard } from "@/components/ui/brand-card"
import { ProgressBar } from "@/components/ui/progress-bar"
import { PageHeader } from "@/components/layout/page-header"
import { useFitnessStore } from "@/lib/store"
import { useTranslation } from "@/lib/i18n"
import { Target, Scale, Ruler, Activity } from "lucide-react"
import { ProgressChart } from "./progress-chart"

export function Dashboard() {
  const { progress, workouts, mealPlans, selectedDay, language, isDarkMode } = useFitnessStore()
  const { t } = useTranslation(language)

  const latestEntry = progress[progress.length - 1]
  const previousEntry = progress[progress.length - 2]

  const getChange = (current: number, previous: number) => {
    return current - previous
  }

  const todayWorkout = workouts[selectedDay]
  const completedExercises = todayWorkout?.exercises.filter((ex) => ex.completed).length || 0
  const totalExercises = todayWorkout?.exercises.length || 0

  const todayMeals = mealPlans[selectedDay] || []
  const totalCalories = todayMeals.reduce(
    (total, meal) => total + meal.foods.reduce((mealTotal, food) => mealTotal + food.calories, 0),
    0,
  )

  const textColor = isDarkMode ? "text-gray-300" : "text-gray-700"
  const subtextColor = isDarkMode ? "text-gray-400" : "text-gray-600"

  return (
    <div className="space-y-8">
      <PageHeader title={t("header.title")} subtitle={t("header.subtitle")} icon="📊" />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {latestEntry && (
          <>
            <StatCard
              title={t("summaryCards.bodyWeight.title")}
              value={latestEntry.weight}
              unit={t("summaryCards.bodyWeight.unit")}
              change={previousEntry ? getChange(latestEntry.weight, previousEntry.weight) : undefined}
              icon={<Scale className="w-6 h-6 text-orange-500" />}
              color="orange"
            />
            <StatCard
              title={t("summaryCards.armCircumference.title")}
              value={latestEntry.armSize}
              unit={t("summaryCards.armCircumference.unit")}
              change={previousEntry ? getChange(latestEntry.armSize, previousEntry.armSize) : undefined}
              icon={<Ruler className="w-6 h-6 text-green-500" />}
              color="green"
            />
          </>
        )}

        <StatCard
          title={t("summaryCards.dailyWorkout.title")}
          value={`${completedExercises}/${totalExercises}`}
          icon={<Activity className="w-6 h-6 text-blue-500" />}
          color="blue"
        />

        <StatCard
          title={t("summaryCards.dailyCalories.title")}
          value={totalCalories}
          unit={t("summaryCards.dailyCalories.unit")}
          icon={<Target className="w-6 h-6 text-purple-500" />}
          color="purple"
        />
      </div>

      {/* Progress Chart */}
      <ProgressChart />

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Workout Progress */}
        <BrandCard title={`🏋️ ${t("dailyWorkoutCard.title")}`} variant="gradient">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`font-medium ${textColor}`}>{todayWorkout?.title}</span>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  isDarkMode ? "text-orange-400 bg-orange-900/20" : "text-orange-600 bg-orange-100"
                }`}
              >
                {todayWorkout?.duration}
              </span>
            </div>

            <ProgressBar value={completedExercises} max={totalExercises} label={t("dailyWorkoutCard.progressLabel")} color="orange" />

            <div className={`text-sm ${subtextColor}`}>
              {completedExercises} {t("dailyWorkoutCard.from")} {totalExercises} {t("dailyWorkoutCard.exercise_completed")}
            </div>
          </div>
        </BrandCard>

        {/* Nutrition Overview */}
        <BrandCard title={`🍽️ ${t("dailyNutritionCard.title")}`} variant="gradient">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`font-medium ${textColor}`}>
                {todayMeals.length} {t("dailyNutritionCard.meals")}
              </span>
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  isDarkMode ? "text-yellow-400 bg-yellow-900/20" : "text-yellow-600 bg-yellow-100"
                }`}
              >
                {totalCalories} {t("dailyNutritionCard.calorieUnit")}
              </span>
            </div>

            <ProgressBar value={totalCalories} max={2500} label={t("dailyNutritionCard.calorieTargetLabel")} color="orange" />

            <div className={`text-sm ${subtextColor}`}>
              {t("target")}: 2500 {t("dailyNutritionCard.targetInfo")}
            </div>
          </div>
        </BrandCard>
      </div>

      {/* Weekly Summary */}
      <BrandCard title={`📈 ${t("weeklySummaryCard.title")}`} variant="bordered">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? "text-orange-400" : "text-orange-600"}`}>
              {progress.length}
            </div>
            <div className={`text-sm ${subtextColor}`}>{t("weeklySummaryCard.weeksTracked")}</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
              {Math.round((completedExercises / Math.max(totalExercises, 1)) * 100)}%
            </div>
            <div className={`text-sm ${subtextColor}`}>{t("weeklySummaryCard.avgWorkout")}</div>
          </div>

          <div className="text-center">
            <div className={`text-2xl font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>
              {Math.round(totalCalories / 100) * 100}
            </div>
            <div className={`text-sm ${subtextColor}`}>{t("weeklySummaryCard.avgCalories")}</div>
          </div>
        </div>
      </BrandCard>
    </div>
  )
}
