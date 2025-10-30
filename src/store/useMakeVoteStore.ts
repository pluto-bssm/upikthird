import { create } from "zustand";

type State = {
  title: string;
  ballots: string[];
  category: string;
  setTitle: (t: string) => void;
  setBallots: (b: string[]) => void;
  setCategory: (c: string) => void;
  resetVoteData: () => void;
  closureType : string;
  customDays : number;
  participantThreshold : number;
  setClosureType : (c : string) => void;
  setCustomDays : (d : number) => void;
  setParticipantThreshold : (p : number) => void;
};

export const useVoteStore = create<State>((set) => ({
  title: "",
  ballots: ["", ""],
  category: "학교생활",
  closureType : "default",
  customDays : 7, 
  participantThreshold : 0,
  setClosureType : (closureType) => set({ closureType }),
  setCustomDays : (customDays) => set({ customDays }),
  setParticipantThreshold : (participantThreshold) => set({ participantThreshold }),
  setTitle: (title) => set({ title }),
  setBallots: (ballots) => set({ ballots }),
  setCategory: (category) => set({ category }),
  resetVoteData: () =>
    set({
      title: "",
      ballots: ["", ""],
      category: "학교생활",
      closureType : "default",
      customDays : 7,
      participantThreshold : 0,
    }),
}));
