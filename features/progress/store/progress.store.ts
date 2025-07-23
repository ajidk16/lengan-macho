import { create } from 'zustand';

interface ProgressState {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
  selectedDate: null,
  setSelectedDate: (date) => set({ selectedDate: date }),
}));