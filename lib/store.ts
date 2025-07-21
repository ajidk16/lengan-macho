import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Language } from "./i18n"

export interface ProgressEntry {
  id: string
  date: string
  week: number
  weight: number
  armSize: number
  chestSize?: number
  waistSize?: number
}

export interface WorkoutExercise {
  name: string
  sets: string
  completed: boolean
}

export interface DailyWorkout {
  title: string
  duration: string
  exercises: WorkoutExercise[]
}

export interface MealItem {
  name: string
  calories: number
}

export interface MealTime {
  time: string
  meal: string
  foods: MealItem[]
}

export interface PersonalNote {
  id: string
  date: string
  content: string
  week: number
}

interface FitnessStore {
  // Theme & Language
  isDarkMode: boolean
  language: Language
  toggleDarkMode: () => void
  setLanguage: (language: Language) => void

  // Progress tracking
  progress: ProgressEntry[]
  addProgress: (entry: Omit<ProgressEntry, "id">) => void

  // Workout tracking
  workouts: Record<string, DailyWorkout>
  toggleExercise: (day: string, exerciseIndex: number) => void

  // Meal plans
  mealPlans: Record<string, MealTime[]>

  // Notes
  notes: PersonalNote[]
  addNote: (note: Omit<PersonalNote, "id">) => void
  updateNote: (id: string, content: string) => void
  deleteNote: (id: string) => void

  // UI state
  currentView: "dashboard" | "tracker" | "meals" | "workout" | "tips" | "calculator"
  setCurrentView: (view: FitnessStore["currentView"]) => void
  selectedDay: string
  setSelectedDay: (day: string) => void
  selectedWeek: number
  setSelectedWeek: (week: number) => void
}

const initialProgress: ProgressEntry[] = [
  { id: "1", date: "2024-01-01", week: 1, weight: 70.5, armSize: 32.0, chestSize: 95.0, waistSize: 80.0 },
  { id: "2", date: "2024-01-08", week: 2, weight: 71.2, armSize: 32.5, chestSize: 96.0, waistSize: 79.5 },
  { id: "3", date: "2024-01-15", week: 3, weight: 72.0, armSize: 33.0, chestSize: 97.0, waistSize: 79.0 },
  { id: "4", date: "2024-01-22", week: 4, weight: 72.8, armSize: 33.5, chestSize: 98.0, waistSize: 78.5 },
]

const initialWorkouts: Record<string, DailyWorkout> = {
  senin: {
    title: "Push Day - Chest & Triceps",
    duration: "45-60 menit",
    exercises: [
      { name: "Push-up", sets: "3 x 12-15", completed: false },
      { name: "Bench Press", sets: "4 x 8-10", completed: false },
      { name: "Incline Dumbbell Press", sets: "3 x 10-12", completed: false },
      { name: "Tricep Dips", sets: "3 x 12-15", completed: false },
    ],
  },
  selasa: {
    title: "Pull Day - Back & Biceps",
    duration: "45-60 menit",
    exercises: [
      { name: "Pull-up", sets: "3 x 6-10", completed: false },
      { name: "Bent-over Row", sets: "4 x 8-10", completed: false },
      { name: "Lat Pulldown", sets: "3 x 10-12", completed: false },
      { name: "Bicep Curls", sets: "3 x 12-15", completed: false },
    ],
  },
  rabu: {
    title: "Leg Day",
    duration: "50-70 menit",
    exercises: [
      { name: "Squat", sets: "4 x 10-12", completed: false },
      { name: "Romanian Deadlift", sets: "3 x 8-10", completed: false },
      { name: "Leg Press", sets: "3 x 12-15", completed: false },
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
    ],
  },
  sabtu: {
    title: "Core & Cardio",
    duration: "30-45 menit",
    exercises: [
      { name: "Russian Twists", sets: "3 x 20-30", completed: false },
      { name: "Bicycle Crunches", sets: "3 x 15-20", completed: false },
      { name: "Leg Raises", sets: "3 x 12-15", completed: false },
      { name: "Cardio", sets: "20-30 menit", completed: false },
    ],
  },
  minggu: {
    title: "Active Recovery",
    duration: "20-30 menit",
    exercises: [
      { name: "Light Walking", sets: "20-30 menit", completed: false },
      { name: "Stretching", sets: "10-15 menit", completed: false },
      { name: "Foam Rolling", sets: "5-10 menit", completed: false },
    ],
  },
}

const initialMealPlans: Record<string, MealTime[]> = {
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
        { name: "Roti gandum + selai kacang", calories: 350 },
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

export const useFitnessStore = create<FitnessStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isDarkMode: false,
      language: "id",
      progress: initialProgress,
      workouts: initialWorkouts,
      mealPlans: initialMealPlans,
      notes: [],
      currentView: "dashboard",
      selectedDay: "senin",
      selectedWeek: 1,

      // Theme & Language actions
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setLanguage: (language) => set({ language }),

      // Actions
      addProgress: (entry) =>
        set((state) => ({
          progress: [...state.progress, { ...entry, id: Date.now().toString() }],
        })),

      toggleExercise: (day, exerciseIndex) =>
        set((state) => ({
          workouts: {
            ...state.workouts,
            [day]: {
              ...state.workouts[day],
              exercises: state.workouts[day].exercises.map((exercise, index) =>
                index === exerciseIndex ? { ...exercise, completed: !exercise.completed } : exercise,
              ),
            },
          },
        })),

      addNote: (note) =>
        set((state) => ({
          notes: [...state.notes, { ...note, id: Date.now().toString() }],
        })),

      updateNote: (id, content) =>
        set((state) => ({
          notes: state.notes.map((note) => (note.id === id ? { ...note, content } : note)),
        })),

      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((note) => note.id !== id),
        })),

      setCurrentView: (view) => set({ currentView: view }),
      setSelectedDay: (day) => set({ selectedDay: day }),
      setSelectedWeek: (week) => set({ selectedWeek: week }),
    }),
    {
      name: "lenganmacho-storage",
    },
  ),
)
