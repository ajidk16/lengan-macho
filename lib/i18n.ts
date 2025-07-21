// Internationalization system
export type Language = "id" | "en"

export interface Translations {
  // Navigation
  dashboard: string
  progress: string
  mealPlan: string
  workout: string
  tipsNotes: string
  calculator: string

  // Dashboard
  dashboardTitle: string
  dashboardSubtitle: string
  weight: string
  armCircumference: string
  todayWorkout: string
  todayCalories: string
  weeklyTracking: string
  averageWorkout: string
  averageCalories: string
  workoutProgress: string
  nutritionToday: string
  dailyCalorieTarget: string
  target: string
  caloriesPerDay: string
  weeklySummary: string

  // Progress Tracker
  progressTracker: string
  progressSubtitle: string
  addProgress: string
  progressHistory: string
  date: string
  week: string
  arm: string
  chest: string
  waist: string
  kg: string
  cm: string
  calories: string

  // Meal Plan
  mealPlanTitle: string
  mealPlanSubtitle: string
  totalCaloriesToday: string
  mealTimes: string
  breakfast: string
  morningSnack: string
  lunch: string
  afternoonSnack: string
  dinner: string
  beforeBed: string

  // Workout
  workoutTitle: string
  workoutSubtitle: string
  todayWorkoutTitle: string
  duration: string
  completed: string
  remaining: string
  workoutSummary: string
  progressToday: string
  exercisesCompleted: string
  exercisesRemaining: string

  // Tips & Notes
  tipsTitle: string
  tipsSubtitle: string
  weeklyTip: string
  personalNotes: string
  addNote: string
  save: string
  cancel: string
  edit: string
  delete: string
  noNotesYet: string
  startWriting: string

  // Calculator
  calculatorTitle: string
  calculatorSubtitle: string
  personalData: string
  age: string
  height: string
  gender: string
  male: string
  female: string
  activityLevel: string
  calculate: string
  results: string
  goalRecommendations: string
  bulking: string
  maintenance: string
  cutting: string
  buildMuscle: string
  maintainWeight: string
  reduceFat: string
  importantNote: string
  noteDescription: string
  readyToCalculate: string
  fillPersonalData: string

  // Activity levels
  sedentary: string
  light: string
  moderate: string
  active: string
  veryActive: string

  // Days
  monday: string
  tuesday: string
  wednesday: string
  thursday: string
  friday: string
  saturday: string
  sunday: string
  mon: string
  tue: string
  wed: string
  thu: string
  fri: string
  sat: string
  sun: string

  // Common
  close: string
  submit: string
  reset: string
  loading: string
  error: string
  success: string
  warning: string
  info: string
  darkMode: string
  lightMode: string
  language: string
}

export const translations: Record<Language, Translations> = {
  id: {
    // Navigation
    dashboard: "Dashboard",
    progress: "Progress",
    mealPlan: "Meal Plan",
    workout: "Workout",
    tipsNotes: "Tips & Catatan",
    calculator: "Kalkulator",

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Overview progres fitness Anda",
    weight: "Berat Badan",
    armCircumference: "Lingkar Lengan",
    todayWorkout: "Latihan Hari Ini",
    todayCalories: "Kalori Hari Ini",
    weeklyTracking: "Minggu Tracking",
    averageWorkout: "Rata-rata Latihan",
    averageCalories: "Rata-rata Kalori",
    workoutProgress: "Progress Latihan",
    nutritionToday: "Nutrisi Hari Ini",
    dailyCalorieTarget: "Target Kalori Harian",
    target: "Target",
    caloriesPerDay: "kalori per hari",
    weeklySummary: "Ringkasan Mingguan",

    // Progress Tracker
    progressTracker: "Progress Tracker",
    progressSubtitle: "Pantau perkembangan fisik Anda",
    addProgress: "Tambah Progress",
    progressHistory: "Riwayat Progress",
    date: "Tanggal",
    week: "Minggu",
    arm: "Lengan",
    chest: "Dada",
    waist: "Pinggang",
    kg: "kg",
    cm: "cm",
    calories: "kalori",

    // Meal Plan
    mealPlanTitle: "Rencana Makan",
    mealPlanSubtitle: "Panduan nutrisi harian untuk mencapai target fitness",
    totalCaloriesToday: "Total Kalori Hari Ini",
    mealTimes: "waktu makan",
    breakfast: "Sarapan",
    morningSnack: "Snack Pagi",
    lunch: "Makan Siang",
    afternoonSnack: "Snack Sore",
    dinner: "Makan Malam",
    beforeBed: "Sebelum Tidur",

    // Workout
    workoutTitle: "Jadwal Latihan",
    workoutSubtitle: "Program latihan harian untuk membangun otot",
    todayWorkoutTitle: "Latihan Hari Ini",
    duration: "Durasi",
    completed: "selesai",
    remaining: "tersisa",
    workoutSummary: "Ringkasan Latihan",
    progressToday: "Progress Hari Ini",
    exercisesCompleted: "Latihan Selesai",
    exercisesRemaining: "Latihan Tersisa",

    // Tips & Notes
    tipsTitle: "Tips & Catatan",
    tipsSubtitle: "Panduan mingguan dan catatan pribadi perjalanan fitness",
    weeklyTip: "Tips Minggu",
    personalNotes: "Catatan Pribadi",
    addNote: "Tambah Catatan",
    save: "Simpan",
    cancel: "Batal",
    edit: "Edit",
    delete: "Hapus",
    noNotesYet: "Belum ada catatan untuk minggu ini",
    startWriting: "Mulai tulis refleksi dan pengalaman latihan Anda",

    // Calculator
    calculatorTitle: "Kalkulator Kalori",
    calculatorSubtitle: "Hitung kebutuhan kalori harian berdasarkan tujuan fitness",
    personalData: "Data Pribadi",
    age: "Usia (tahun)",
    height: "Tinggi Badan (cm)",
    gender: "Jenis Kelamin",
    male: "Pria",
    female: "Wanita",
    activityLevel: "Tingkat Aktivitas",
    calculate: "Hitung Kalori",
    results: "Hasil Perhitungan",
    goalRecommendations: "Rekomendasi Berdasarkan Tujuan",
    bulking: "Bulking",
    maintenance: "Maintenance",
    cutting: "Cutting",
    buildMuscle: "Menambah massa otot",
    maintainWeight: "Mempertahankan berat",
    reduceFat: "Mengurangi lemak",
    importantNote: "Catatan Penting",
    noteDescription:
      "Hasil ini adalah estimasi berdasarkan rumus ilmiah. Sesuaikan dengan respons tubuh Anda dan konsultasikan dengan ahli gizi atau pelatih profesional untuk hasil optimal.",
    readyToCalculate: "Siap Menghitung?",
    fillPersonalData: "Isi data pribadi Anda untuk menghitung kebutuhan kalori harian",

    // Activity levels
    sedentary: "Sedentary (tidak olahraga)",
    light: "Light (olahraga 1-3x/minggu)",
    moderate: "Moderate (olahraga 3-5x/minggu)",
    active: "Active (olahraga 6-7x/minggu)",
    veryActive: "Very Active (olahraga 2x/hari)",

    // Days
    monday: "Senin",
    tuesday: "Selasa",
    wednesday: "Rabu",
    thursday: "Kamis",
    friday: "Jumat",
    saturday: "Sabtu",
    sunday: "Minggu",
    mon: "Sen",
    tue: "Sel",
    wed: "Rab",
    thu: "Kam",
    fri: "Jum",
    sat: "Sab",
    sun: "Min",

    // Common
    close: "Tutup",
    submit: "Kirim",
    reset: "Reset",
    loading: "Memuat...",
    error: "Error",
    success: "Berhasil",
    warning: "Peringatan",
    info: "Info",
    darkMode: "Mode Gelap",
    lightMode: "Mode Terang",
    language: "Bahasa",
  },
  en: {
    // Navigation
    dashboard: "Dashboard",
    progress: "Progress",
    mealPlan: "Meal Plan",
    workout: "Workout",
    tipsNotes: "Tips & Notes",
    calculator: "Calculator",

    // Dashboard
    dashboardTitle: "Dashboard",
    dashboardSubtitle: "Overview of your fitness progress",
    weight: "Weight",
    armCircumference: "Arm Circumference",
    todayWorkout: "Today's Workout",
    todayCalories: "Today's Calories",
    weeklyTracking: "Weekly Tracking",
    averageWorkout: "Average Workout",
    averageCalories: "Average Calories",
    workoutProgress: "Workout Progress",
    nutritionToday: "Today's Nutrition",
    dailyCalorieTarget: "Daily Calorie Target",
    target: "Target",
    caloriesPerDay: "calories per day",
    weeklySummary: "Weekly Summary",

    // Progress Tracker
    progressTracker: "Progress Tracker",
    progressSubtitle: "Monitor your physical development",
    addProgress: "Add Progress",
    progressHistory: "Progress History",
    date: "Date",
    week: "Week",
    arm: "Arm",
    chest: "Chest",
    waist: "Waist",
    kg: "kg",
    cm: "cm",
    calories: "calories",

    // Meal Plan
    mealPlanTitle: "Meal Plan",
    mealPlanSubtitle: "Daily nutrition guide to achieve your fitness goals",
    totalCaloriesToday: "Total Calories Today",
    mealTimes: "meal times",
    breakfast: "Breakfast",
    morningSnack: "Morning Snack",
    lunch: "Lunch",
    afternoonSnack: "Afternoon Snack",
    dinner: "Dinner",
    beforeBed: "Before Bed",

    // Workout
    workoutTitle: "Workout Schedule",
    workoutSubtitle: "Daily training program to build muscle",
    todayWorkoutTitle: "Today's Workout",
    duration: "Duration",
    completed: "completed",
    remaining: "remaining",
    workoutSummary: "Workout Summary",
    progressToday: "Today's Progress",
    exercisesCompleted: "Exercises Completed",
    exercisesRemaining: "Exercises Remaining",

    // Tips & Notes
    tipsTitle: "Tips & Notes",
    tipsSubtitle: "Weekly guidance and personal notes for your fitness journey",
    weeklyTip: "Weekly Tip",
    personalNotes: "Personal Notes",
    addNote: "Add Note",
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    noNotesYet: "No notes for this week yet",
    startWriting: "Start writing your workout reflections and experiences",

    // Calculator
    calculatorTitle: "Calorie Calculator",
    calculatorSubtitle: "Calculate daily calorie needs based on your fitness goals",
    personalData: "Personal Data",
    age: "Age (years)",
    height: "Height (cm)",
    gender: "Gender",
    male: "Male",
    female: "Female",
    activityLevel: "Activity Level",
    calculate: "Calculate Calories",
    results: "Calculation Results",
    goalRecommendations: "Goal-Based Recommendations",
    bulking: "Bulking",
    maintenance: "Maintenance",
    cutting: "Cutting",
    buildMuscle: "Build muscle mass",
    maintainWeight: "Maintain weight",
    reduceFat: "Reduce fat",
    importantNote: "Important Note",
    noteDescription:
      "These results are estimates based on scientific formulas. Adjust according to your body's response and consult with a nutritionist or professional trainer for optimal results.",
    readyToCalculate: "Ready to Calculate?",
    fillPersonalData: "Fill in your personal data to calculate daily calorie needs",

    // Activity levels
    sedentary: "Sedentary (no exercise)",
    light: "Light (exercise 1-3x/week)",
    moderate: "Moderate (exercise 3-5x/week)",
    active: "Active (exercise 6-7x/week)",
    veryActive: "Very Active (exercise 2x/day)",

    // Days
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",

    // Common
    close: "Close",
    submit: "Submit",
    reset: "Reset",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    warning: "Warning",
    info: "Info",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    language: "Language",
  },
}

export const useTranslation = (language: Language) => {
  return {
    t: (key: keyof Translations) => translations[language][key],
    language,
  }
}
