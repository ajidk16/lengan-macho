"use client";

import { BrandCard } from "@/components/ui/brand-card";
import { BrandButton } from "@/components/ui/brand-button";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PageHeader } from "@/components/layout/page-header";
import { Badge } from "@/components/ui/badge";
import { useFitnessStore } from "@/lib/store";
import { CheckCircle, Circle, Clock, Trophy } from "lucide-react";

const days = [
  { key: "senin", label: "Sen" },
  { key: "selasa", label: "Sel" },
  { key: "rabu", label: "Rab" },
  { key: "kamis", label: "Kam" },
  { key: "jumat", label: "Jum" },
  { key: "sabtu", label: "Sab" },
  { key: "minggu", label: "Min" },
];

export function WorkoutView() {
  const { selectedDay, setSelectedDay, workouts, toggleExercise } =
    useFitnessStore();

  const currentWorkout = workouts[selectedDay];
  const completedCount =
    currentWorkout?.exercises.filter((ex) => ex.completed).length || 0;
  const totalCount = currentWorkout?.exercises.length || 0;

  return (
    <div className="space-y-8">
      <PageHeader
        title="Jadwal Latihan"
        subtitle="Program latihan harian untuk membangun otot"
        icon="💪"
      />

      {/* Day Selector */}
      <BrandCard variant="gradient">
        <div className="flex flex-wrap justify-center gap-2">
          {days.map((day) => (
            <BrandButton
              key={day.key}
              variant={selectedDay === day.key ? "primary" : "outline"}
              size="sm"
              onClick={() => setSelectedDay(day.key)}
              className="min-w-[60px] font-medium bg-transparent hover:bg-transparent text-sm transition-colors duration-200"
            >
              {day.label}
            </BrandButton>
          ))}
        </div>
      </BrandCard>

      {/* Workout Details */}
      {currentWorkout && (
        <BrandCard
          variant="bordered"
          className="border-l-4 border-l-orange-500"
        >
          <div className="space-y-6">
            {/* Workout Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-orange-800">
                  {currentWorkout.title}
                </h2>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="text-orange-600 font-medium">
                    {currentWorkout.duration}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-to-r from-green-100 to-green-200 text-green-800 border-green-200 px-3 py-1">
                  <Trophy className="w-4 h-4 mr-1" />
                  {completedCount}/{totalCount} selesai
                </Badge>
              </div>
            </div>

            {/* Progress Bar */}
            <ProgressBar
              value={completedCount}
              max={totalCount}
              label="Progress Latihan Hari Ini"
              color="orange"
              size="lg"
            />

            {/* Exercise List */}
            <div className="space-y-3">
              {currentWorkout.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                    exercise.completed
                      ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-sm"
                      : "bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 hover:shadow-md"
                  }`}
                  onClick={() => toggleExercise(selectedDay, index)}
                >
                  <div className="flex items-center gap-4">
                    <button
                      className={`p-1 rounded-full transition-colors ${
                        exercise.completed
                          ? "text-green-600 hover:text-green-700"
                          : "text-orange-500 hover:text-orange-600"
                      }`}
                    >
                      {exercise.completed ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    <div>
                      <p
                        className={`font-semibold text-lg ${
                          exercise.completed
                            ? "line-through text-gray-500"
                            : "text-gray-800"
                        }`}
                      >
                        {exercise.name}
                      </p>
                      <p className="text-orange-600 font-medium">
                        {exercise.sets}
                      </p>
                    </div>
                  </div>

                  {exercise.completed && (
                    <div className="text-green-600 font-semibold text-sm bg-green-100 px-2 py-1 rounded-full">
                      ✓ Selesai
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </BrandCard>
      )}

      {/* Workout Summary */}
      <BrandCard
        variant="gradient"
        className="bg-gradient-to-r from-orange-50 to-yellow-50 border-2 border-orange-200"
      >
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm">
            <Trophy className="w-5 h-5 text-orange-500" />
            <span className="font-semibold text-orange-800">
              Ringkasan Latihan
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((completedCount / Math.max(totalCount, 1)) * 100)}%
              </div>
              <div className="text-sm text-orange-700">Progress Hari Ini</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {completedCount}
              </div>
              <div className="text-sm text-yellow-700">Latihan Selesai</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {totalCount - completedCount}
              </div>
              <div className="text-sm text-green-700">Latihan Tersisa</div>
            </div>
          </div>
        </div>
      </BrandCard>
    </div>
  );
}
