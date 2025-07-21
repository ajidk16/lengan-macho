"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Circle, Clock } from "lucide-react"

const dailyWorkouts = {
  senin: {
    title: "Push Day - Chest & Triceps",
    duration: "45-60 menit",
    exercises: [
      { name: "Push-up", sets: "3 x 12-15", completed: false },
      { name: "Bench Press", sets: "4 x 8-10", completed: false },
      { name: "Incline Dumbbell Press", sets: "3 x 10-12", completed: false },
      { name: "Tricep Dips", sets: "3 x 12-15", completed: false },
      { name: "Overhead Press", sets: "3 x 8-10", completed: false },
    ],
  },
  selasa: {
    title: "Pull Day - Back & Biceps",
    duration: "45-60 menit",
    exercises: [
      { name: "Pull-up/Chin-up", sets: "3 x 6-10", completed: false },
      { name: "Bent-over Row", sets: "4 x 8-10", completed: false },
      { name: "Lat Pulldown", sets: "3 x 10-12", completed: false },
      { name: "Bicep Curls", sets: "3 x 12-15", completed: false },
      { name: "Hammer Curls", sets: "3 x 12-15", completed: false },
    ],
  },
  rabu: {
    title: "Leg Day",
    duration: "50-70 menit",
    exercises: [
      { name: "Squat", sets: "4 x 10-12", completed: false },
      { name: "Romanian Deadlift", sets: "3 x 8-10", completed: false },
      { name: "Leg Press", sets: "3 x 12-15", completed: false },
      { name: "Leg Curls", sets: "3 x 12-15", completed: false },
      { name: "Calf Raises", sets: "4 x 15-20", completed: false },
    ],
  },
  kamis: {
    title: "Upper Body Focus",
    duration: "45-60 menit",
    exercises: [
      { name: "Dumbbell Press", sets: "3 x 10-12", completed: false },
      { name: "Cable Row", sets: "3 x 10-12", completed: false },
      { name: "Lateral Raises", sets: "3 x 12-15", completed: false },
      { name: "Face Pulls", sets: "3 x 15-20", completed: false },
      { name: "Plank", sets: "3 x 30-60s", completed: false },
    ],
  },
  jumat: {
    title: "Full Body Circuit",
    duration: "40-50 menit",
    exercises: [
      { name: "Burpees", sets: "3 x 8-12", completed: false },
      { name: "Mountain Climbers", sets: "3 x 20-30", completed: false },
      { name: "Kettlebell Swings", sets: "3 x 15-20", completed: false },
      { name: "Jump Squats", sets: "3 x 12-15", completed: false },
      { name: "High Knees", sets: "3 x 30s", completed: false },
    ],
  },
  sabtu: {
    title: "Core & Cardio",
    duration: "30-45 menit",
    exercises: [
      { name: "Russian Twists", sets: "3 x 20-30", completed: false },
      { name: "Bicycle Crunches", sets: "3 x 15-20", completed: false },
      { name: "Leg Raises", sets: "3 x 12-15", completed: false },
      { name: "Dead Bug", sets: "3 x 10/side", completed: false },
      { name: "Cardio (Pilihan)", sets: "20-30 menit", completed: false },
    ],
  },
  minggu: {
    title: "Active Recovery",
    duration: "20-30 menit",
    exercises: [
      { name: "Light Walking", sets: "20-30 menit", completed: false },
      { name: "Stretching", sets: "10-15 menit", completed: false },
      { name: "Foam Rolling", sets: "5-10 menit", completed: false },
      { name: "Yoga/Meditation", sets: "10-20 menit", completed: false },
    ],
  },
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

export function DailyWorkout() {
  const [selectedDay, setSelectedDay] = useState("senin")
  const [workouts, setWorkouts] = useState(dailyWorkouts)

  const toggleExercise = (dayKey: string, exerciseIndex: number) => {
    setWorkouts((prev) => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey as keyof typeof prev],
        exercises: prev[dayKey as keyof typeof prev].exercises.map((exercise, index) =>
          index === exerciseIndex ? { ...exercise, completed: !exercise.completed } : exercise,
        ),
      },
    }))
  }

  const currentWorkout = workouts[selectedDay as keyof typeof workouts]
  const completedCount = currentWorkout.exercises.filter((ex) => ex.completed).length
  const totalCount = currentWorkout.exercises.length

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">📆 Jadwal Latihan Harian</CardTitle>
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

          {/* Workout Details */}
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
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
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
        </CardContent>
      </Card>
    </div>
  )
}
