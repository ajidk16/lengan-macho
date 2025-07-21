"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useFitnessStore } from "@/lib/store"
import { CheckCircle, Circle, Clock } from "lucide-react"

const days = [
  { key: "senin", label: "Sen" },
  { key: "selasa", label: "Sel" },
  { key: "rabu", label: "Rab" },
  { key: "kamis", label: "Kam" },
  { key: "jumat", label: "Jum" },
  { key: "sabtu", label: "Sab" },
  { key: "minggu", label: "Min" },
]

export function WorkoutView() {
  const { selectedDay, setSelectedDay, workouts, toggleExercise } = useFitnessStore()

  const currentWorkout = workouts[selectedDay]
  const completedCount = currentWorkout?.exercises.filter((ex) => ex.completed).length || 0
  const totalCount = currentWorkout?.exercises.length || 0

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">💪 Jadwal Latihan Harian</h2>

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

      {/* Workout Details */}
      {currentWorkout && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl text-blue-700 dark:text-blue-300">{currentWorkout.title}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{currentWorkout.duration}</span>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                {completedCount}/{totalCount} selesai
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                    exercise.completed
                      ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                      : "bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleExercise(selectedDay, index)}
                      className="text-green-600 hover:text-green-700"
                    >
                      {exercise.completed ? <CheckCircle className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>
                    <div>
                      <p className={`font-medium ${exercise.completed ? "line-through text-gray-500" : ""}`}>
                        {exercise.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.sets}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress Latihan</span>
              <span>{Math.round((completedCount / totalCount) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalCount > 0 ? (completedCount / totalCount) * 100 : 0}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
