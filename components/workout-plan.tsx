"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const workoutPlans = {
  week1: {
    senin: {
      focus: "Push (Chest, Shoulders, Triceps)",
      exercises: [
        { name: "Push-up", sets: "3x12" },
        { name: "Bench Press", sets: "4x8" },
        { name: "Shoulder Press", sets: "3x10" },
        { name: "Tricep Dips", sets: "3x12" },
      ],
    },
    selasa: {
      focus: "Pull (Back, Biceps)",
      exercises: [
        { name: "Pull-up", sets: "3x8" },
        { name: "Bent-over Row", sets: "4x10" },
        { name: "Lat Pulldown", sets: "3x12" },
        { name: "Bicep Curls", sets: "3x15" },
      ],
    },
    rabu: {
      focus: "Legs",
      exercises: [
        { name: "Squat", sets: "4x12" },
        { name: "Deadlift", sets: "3x8" },
        { name: "Leg Press", sets: "3x15" },
        { name: "Calf Raises", sets: "4x20" },
      ],
    },
    kamis: {
      focus: "Arms",
      exercises: [
        { name: "Hammer Curls", sets: "3x12" },
        { name: "Tricep Extension", sets: "3x12" },
        { name: "Preacher Curls", sets: "3x10" },
        { name: "Close-grip Push-up", sets: "3x15" },
      ],
    },
    jumat: {
      focus: "Full Body",
      exercises: [
        { name: "Burpees", sets: "3x10" },
        { name: "Mountain Climbers", sets: "3x20" },
        { name: "Plank", sets: "3x60s" },
        { name: "Jumping Jacks", sets: "3x30" },
      ],
    },
    sabtu: {
      focus: "Core & Cardio",
      exercises: [
        { name: "Russian Twists", sets: "3x20" },
        { name: "Bicycle Crunches", sets: "3x15" },
        { name: "Leg Raises", sets: "3x12" },
        { name: "High Knees", sets: "3x30s" },
      ],
    },
    minggu: {
      focus: "Rest Day",
      exercises: [
        { name: "Light Stretching", sets: "15 min" },
        { name: "Walking", sets: "30 min" },
        { name: "Foam Rolling", sets: "10 min" },
      ],
    },
  },
}

const days = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"]
const dayLabels = {
  senin: "Senin",
  selasa: "Selasa",
  rabu: "Rabu",
  kamis: "Kamis",
  jumat: "Jumat",
  sabtu: "Sabtu",
  minggu: "Minggu",
}

export function WorkoutPlan() {
  const [selectedWeek, setSelectedWeek] = useState("week1")

  const currentPlan = workoutPlans[selectedWeek as keyof typeof workoutPlans]

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Jadwal Latihan Mingguan</CardTitle>
          <div className="flex justify-center mt-4">
            <Select value={selectedWeek} onValueChange={setSelectedWeek}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Pilih minggu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week1">Week 1</SelectItem>
                <SelectItem value="week2">Week 2</SelectItem>
                <SelectItem value="week3">Week 3</SelectItem>
                <SelectItem value="week4">Week 4</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {days.map((day) => {
              const dayPlan = currentPlan[day as keyof typeof currentPlan]
              return (
                <Card key={day} className="border-2 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-center text-blue-700 dark:text-blue-300">
                      {dayLabels[day as keyof typeof dayLabels]}
                    </CardTitle>
                    <Badge variant="outline" className="mx-auto text-center text-xs px-2 py-1">
                      {dayPlan.focus}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {dayPlan.exercises.map((exercise, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{exercise.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {exercise.sets}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
