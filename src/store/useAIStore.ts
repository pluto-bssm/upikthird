import { create } from "zustand";

type State = {
  maxUsageCount: number;
  remainingCount: number;
  usageCount: number;

  setMaxUsageCount: (m: number) => void;
  setRemainingCount: (m: number) => void;
  setUsageCount: (m: number) => void;
  resetUseAiStore: () => void;
};

export const useAiStore = create<State>((set) => ({
  maxUsageCount: 0,
  remainingCount: 3,
  usageCount: 0,

  setMaxUsageCount: (m: number) => set({ maxUsageCount: m }),
  setRemainingCount: (m: number) => set({ remainingCount: m }),
  setUsageCount: (m: number) => set({ usageCount: m }),
  
  resetUseAiStore: () =>
    set({
      maxUsageCount: 0,
      remainingCount: 3,
      usageCount: 0,
    }),
}));
