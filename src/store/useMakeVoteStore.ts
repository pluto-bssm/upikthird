import { create } from "zustand";

type State = {
  title: string;
  ballots: string[];
  category: string;
  setTitle: (t: string) => void;
  setBallots: (b: string[]) => void;
  setCategory: (c: string) => void;
  resetVoteData: () => void;
};

export const useVoteStore = create<State>((set) => ({
  title: "",
  ballots: ["", ""],
  category: "학교생활",
  setTitle: (title) => set({ title }),
  setBallots: (ballots) => set({ ballots }),
  setCategory: (category) => set({ category }),
  resetVoteData: () => set({
    title: "",
    ballots: ["", ""],
    category: "학교생활"
  }),
}));