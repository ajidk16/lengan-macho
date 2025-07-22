import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language } from "./i18n";

export interface ProgressEntry {
  id: string;
  date: string;
  week: number;
  weight: number;
  armSize: number;
  chestSize?: number;
  waistSize?: number;
}

export interface WorkoutExercise {
  name: string;
  sets: string;
  completed: boolean;
  notes?: string; // Optional notes for the exercise
}

export interface DailyWorkout {
  title: string;
  duration: string;
  exercises: WorkoutExercise[];
}

export interface MealItem {
  name: string;
  calories: number;
}

export interface MealTime {
  time: string;
  meal: string;
  foods: MealItem[];
}

export interface PersonalNote {
  id: string;
  date: string;
  content: string;
  week: number;
}

interface FitnessStore {
  // Theme & Language
  isDarkMode: boolean;
  language: Language;
  toggleDarkMode: () => void;
  setLanguage: (language: Language) => void;

  // Progress tracking
  progress: ProgressEntry[];
  addProgress: (entry: Omit<ProgressEntry, "id">) => void;

  // Workout tracking
  workouts: Record<string, DailyWorkout>;
  toggleExercise: (day: string, exerciseIndex: number) => void;

  // Meal plans
  mealPlans: Record<string, MealTime[]>;

  // Notes
  notes: PersonalNote[];
  addNote: (note: Omit<PersonalNote, "id">) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;

  // UI state
  currentView:
    | "dashboard"
    | "tracker"
    | "meals"
    | "workout"
    | "tips"
    | "calculator";
  setCurrentView: (view: FitnessStore["currentView"]) => void;
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  selectedWeek: number;
  setSelectedWeek: (week: number) => void;
}

const initialProgress: ProgressEntry[] = [
  // { id: "1", date: "2024-01-01", week: 1, weight: 70.5, armSize: 32.0, chestSize: 95.0, waistSize: 80.0 },
];

const initialWorkouts: Record<string, DailyWorkout> = {
  senin: {
    title: "Push Day - Fondasi Dada & Trisep",
    duration: "40-50 menit",
    exercises: [
      {
        name: "Push-up",
        sets: "4 x 6-10 repetisi",
        completed: false,
        notes:
          "Jika 6 repetisi terlalu berat, lakukan Push-up di lutut. Fokus pada form yang benar.",
      },
      {
        name: "Pike Push-up (Bahu)",
        sets: "3 x 6-8 repetisi",
        completed: false,
        notes:
          "Bentuk tubuh seperti huruf V terbalik. Letakkan kaki lebih dekat ke tangan untuk membuatnya lebih mudah.",
      },
      {
        name: "Tricep Dips (di Kursi)",
        sets: "3 x 8-12 repetisi",
        completed: false,
        notes:
          "Tekuk lutut untuk meringankan beban. Jaga punggung tetap dekat dengan kursi.",
      },
    ],
  },
  selasa: {
    title: "Pull Day - Membangun Punggung & Bisep",
    duration: "40-50 menit",
    exercises: [
      {
        name: "Inverted Row (di bawah Meja)",
        sets: "4 x 6-10 repetisi",
        completed: false,
        notes:
          "Semakin tegak posisi tubuh, semakin mudah. Semakin horizontal, semakin berat.",
      },
      {
        name: "Superman Lifts",
        sets: "3 x 12-15 repetisi",
        completed: false,
        notes:
          "Angkat dada dan paha dari lantai. Tahan 1 detik di puncak setiap repetisi.",
      },
      {
        name: "Towel Bicep Curl",
        sets: "4 x 10-12 per lengan",
        completed: false,
        notes:
          "Gunakan handuk dan kaki sebagai tahanan. Fokus rasakan kontraksi pada bisep.",
      },
    ],
  },
  rabu: {
    title: "Leg Day - Kekuatan Kaki & Perut",
    duration: "50-60 menit",
    exercises: [
      {
        name: "Bodyweight Squat",
        sets: "4 x 10-15 repetisi",
        completed: false,
        notes:
          "Jaga punggung lurus dan dada tegap. Turun hingga paha sejajar lantai.",
      },
      {
        name: "Lunges (Bergantian)",
        sets: "3 x 10-12 per kaki",
        completed: false,
        notes: "Pastikan lutut depan tidak melewati ujung jari kaki.",
      },
      {
        name: "Glute Bridge",
        sets: "4 x 12-15 repetisi",
        completed: false,
        notes:
          "Remas bokong di puncak gerakan selama 2 detik untuk aktivasi maksimal.",
      },
      {
        name: "Plank",
        sets: "3 x Tahan 20-40 detik",
        completed: false,
        notes:
          "Jaga tubuh lurus seperti papan. Jika pinggul mulai turun, hentikan set dan istirahat.",
      },
      {
        name: "Calf Raise (di ujung tangga)",
        sets: "4 x 15-20 repetisi",
        completed: false,
        notes: "Lakukan perlahan untuk merasakan otot betis bekerja.",
      },
    ],
  },
  kamis: {
    title: "Istirahat atau Pemulihan Aktif",
    duration: "20-30 menit",
    exercises: [
      {
        name: "Jalan Kaki Santai di Luar",
        sets: "20-30 menit",
        completed: true,
        notes: "Bantu lancarkan aliran darah dan kurangi pegal.",
      },
      {
        name: "Peregangan Ringan",
        sets: "10 menit",
        completed: true,
        notes: "Fokus pada area yang terasa kaku: dada, punggung, dan paha.",
      },
    ],
  },
  jumat: {
    title: "Full Body - Latihan Seluruh Tubuh",
    duration: "45 menit",
    exercises: [
      {
        name: "Bodyweight Squat",
        sets: "4 x 10-15 repetisi",
        completed: false,
        notes: "Ini adalah kesempatan untuk menyempurnakan form squat Anda.",
      },
      {
        name: "Push-up (varian termudahmu)",
        sets: "4 x 6-10 repetisi",
        completed: false,
        notes:
          "Pilih varian (di dinding, di lutut, atau biasa) yang paling menantang namun bisa dilakukan dengan form baik.",
      },
      {
        name: "Inverted Row (di bawah Meja)",
        sets: "4 x 6-10 repetisi",
        completed: false,
        notes: "Ingat, semakin tegak tubuh, semakin mudah.",
      },
      {
        name: "Plank",
        sets: "3 x Tahan 30-45 detik",
        completed: false,
        notes:
          "Tantang dirimu untuk menahan sedikit lebih lama dari hari Rabu.",
      },
    ],
  },
  sabtu: {
    title: "Keseimbangan & Stabilitas Inti",
    duration: "30-40 menit",
    exercises: [
      {
        name: "Wall Sit (duduk di dinding)",
        sets: "3 x Tahan 30-45 detik",
        completed: false,
        notes:
          "Pastikan paha sejajar dengan lantai, seperti duduk di kursi tak terlihat.",
      },
      {
        name: "Hollow Body Hold (Tuck Hold)",
        sets: "3 x Tahan 15-25 detik",
        completed: false,
        notes:
          "Angkat bahu dari lantai dan tekuk lutut ke dada. Ini adalah dasar dari kekuatan perut.",
      },
      {
        name: "Bird-Dog",
        sets: "3 x 10-12 per sisi",
        completed: false,
        notes:
          "Lakukan dengan sangat perlahan untuk melatih keseimbangan dan otot inti.",
      },
      {
        name: "Latihan Keseimbangan",
        sets: "3 x Tahan 30 detik per kaki",
        completed: false,
        notes:
          "Berdiri dengan satu kaki, fokus pada satu titik di depan Anda. Pejamkan mata untuk tantangan lebih.",
      },
    ],
  },
  minggu: {
    title: "Istirahat Total & Persiapan",
    duration: "Seharian",
    exercises: [
      {
        name: "Tidur Berkualitas 7-9 Jam",
        sets: "Wajib",
        completed: true,
        notes: "Otot tumbuh dan pulih saat Anda tidur.",
      },
      {
        name: "Hidrasi yang Cukup",
        sets: "Minum banyak air",
        completed: true,
        notes: "Penting untuk fungsi otot dan pemulihan.",
      },
      {
        name: "Persiapkan Mental untuk Minggu Depan",
        sets: "Rencanakan jadwalmu",
        completed: true,
        notes: "Konsistensi adalah kunci kesuksesan jangka panjang.",
      },
    ],
  },
};

const initialMealPlans: Record<string, MealTime[]> = {
  senin: [
    {
      time: "07:00",
      meal: "Sarapan",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Telur dadar (2 butir)", calories: 150 },
        { name: "Kecap manis & sedikit minyak", calories: 50 },
      ],
    },
    {
      time: "10:00",
      meal: "Snack Pagi",
      foods: [{ name: "Ubi rebus (1 buah medium)", calories: 180 }],
    },
    {
      time: "13:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (2.5 centong)", calories: 350 },
        { name: "Tempe & Tahu bacem (2 potong besar)", calories: 250 },
        { name: "Tumis kangkung", calories: 60 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [{ name: "Pisang ambon (1 buah besar)", calories: 120 }],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Sayur lodeh (dengan tahu & santan)", calories: 250 },
        { name: "Telur rebus (1 butir)", calories: 70 },
      ],
    },
  ],
  selasa: [
    {
      time: "07:00",
      meal: "Sarapan",
      foods: [
        {
          name: "Nasi goreng (dari nasi sisa semalam + 1 telur)",
          calories: 400,
        },
      ],
    },
    {
      time: "10:00",
      meal: "Snack Pagi",
      foods: [{ name: "Kacang tanah rebus (1 genggam)", calories: 150 }],
    },
    {
      time: "13:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (2.5 centong)", calories: 350 },
        { name: "Ikan kembung goreng (1 ekor)", calories: 200 },
        { name: "Lalapan & sambal terasi", calories: 80 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [{ name: "Singkong rebus (1 potong besar)", calories: 200 }],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        {
          name: "Tahu telur (tahu dihancurkan & didadar dengan 1 telur)",
          calories: 200,
        },
        { name: "Kuah sop sayuran (wortel, buncis)", calories: 60 },
      ],
    },
  ],
  rabu: [
    {
      time: "07:00",
      meal: "Sarapan",
      foods: [
        {
          name: "Bubur nasi (dibuat dari nasi) dengan 1 telur rebus & kecap asin",
          calories: 350,
        },
      ],
    },
    {
      time: "10:00",
      meal: "Snack Pagi",
      foods: [{ name: "Pisang rebus (2 buah)", calories: 180 }],
    },
    {
      time: "13:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (2.5 centong)", calories: 350 },
        { name: "Tempe orek basah (manis pedas)", calories: 250 },
        { name: "Tumis toge", calories: 50 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [{ name: "Ubi rebus (1 buah medium)", calories: 180 }],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Ati ampela ayam tumis (2 pasang)", calories: 220 },
        { name: "Sayur bayam bening", calories: 40 },
      ],
    },
  ],
  kamis: [
    {
      time: "07:00",
      meal: "Sarapan",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Telur ceplok (2 butir)", calories: 160 },
        { name: "Kerupuk", calories: 100 },
      ],
    },
    {
      time: "10:00",
      meal: "Snack Pagi",
      foods: [{ name: "Pisang ambon (1 buah besar)", calories: 120 }],
    },
    {
      time: "13:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (2.5 centong)", calories: 350 },
        { name: "Sayur asem dengan tahu", calories: 150 },
        { name: "Ikan asin goreng (sedikit)", calories: 80 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [
        {
          name: "Tahu goreng (3 potong kecil) dengan cabai rawit",
          calories: 150,
        },
      ],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Terong balado", calories: 150 },
        { name: "Tempe goreng (2 potong)", calories: 160 },
      ],
    },
  ],
  jumat: [
    {
      time: "07:00",
      meal: "Sarapan",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Mie instan goreng (1 bungkus) + 1 telur", calories: 450 },
      ],
    },
    {
      time: "10:00",
      meal: "Snack Pagi",
      foods: [{ name: "Ubi rebus (1 buah medium)", calories: 180 }],
    },
    {
      time: "13:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (2.5 centong)", calories: 350 },
        { name: "Sayur lodeh (sisa kemarin, dipanaskan)", calories: 250 },
        { name: "Telur rebus (1 butir)", calories: 70 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [{ name: "Pisang (1 buah)", calories: 105 }],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Tahu & Tempe goreng", calories: 200 },
        { name: "Sambal", calories: 40 },
      ],
    },
  ],
  sabtu: [
    {
      time: "08:00",
      meal: "Sarapan (agak siang)",
      foods: [
        { name: "Nasi kuning (beli jadi, porsi hemat)", calories: 400 },
        { name: "Tempe orek & bihun (dari nasi kuning)", calories: 150 },
      ],
    },
    {
      time: "13:00",
      meal: "Makan Siang",
      foods: [
        { name: "Nasi putih (2.5 centong)", calories: 350 },
        { name: "Sayur sop ceker ayam", calories: 250 },
        { name: "Perkedel tahu (2 buah)", calories: 150 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [
        { name: "Gorengan (bakwan/tempe mendoan, 2 buah)", calories: 300 },
      ],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Telur dadar (2 butir) dengan daun bawang", calories: 160 },
      ],
    },
  ],
  minggu: [
    {
      time: "08:00",
      meal: "Sarapan",
      foods: [
        { name: "Nasi putih (2 centong)", calories: 280 },
        { name: "Ikan sarden kalengan (setengah kaleng kecil)", calories: 150 },
      ],
    },
    {
      time: "13:00",
      meal: "Makan Siang (Menu andalan)",
      foods: [
        { name: "Nasi putih (porsi besar)", calories: 400 },
        {
          name: "Telur (3 butir) + Tahu (1/2 papan) diorak-arik bersama",
          calories: 300,
        },
        { name: "Kecap manis & saus sambal", calories: 60 },
      ],
    },
    {
      time: "16:00",
      meal: "Snack Sore",
      foods: [{ name: "Ubi atau singkong rebus (sisa stok)", calories: 180 }],
    },
    {
      time: "19:00",
      meal: "Makan Malam",
      foods: [
        { name: "Nasi putih (1.5 centong)", calories: 200 },
        { name: "Tumis kangkung/bayam", calories: 60 },
        { name: "Tempe goreng (1 potong)", calories: 80 },
      ],
    },
  ],
};

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
          progress: [
            ...state.progress,
            { ...entry, id: Date.now().toString() },
          ],
        })),

      toggleExercise: (day, exerciseIndex) =>
        set((state) => ({
          workouts: {
            ...state.workouts,
            [day]: {
              ...state.workouts[day],
              exercises: state.workouts[day].exercises.map((exercise, index) =>
                index === exerciseIndex
                  ? { ...exercise, completed: !exercise.completed }
                  : exercise
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
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, content } : note
          ),
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
    }
  )
);
