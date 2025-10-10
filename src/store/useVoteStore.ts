import { create } from "zustand";

type State = {
  VoteId : string,
  optionId : string
  setVoteId : (v : string) => void;
  setoptionId : (o : string) => void;
  resetVoteData: () => void;
};

export const useVoteStore = create<State>((set) => ({
  VoteId : "",
  optionId : "",
  
  setVoteId : (VoteId) => set({VoteId}),
  setoptionId : (optionId) => set({optionId}),

  resetVoteData: () => set({
    VoteId : "",
    optionId : "",
  }),
}));