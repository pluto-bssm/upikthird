import { create } from "zustand";

interface BottomSheetState {
  isMemberChoseOpen: boolean;
  isTimeOpen: boolean;
  isMemberOpen: boolean;

  selectedOption: number | null;
  selectedTime: string;
  selectedMembers: string;

  isQuestionModalOpen: boolean;

  setMemberChoseOpen: (isOpen: boolean) => void;
  setTimeOpen: (isOpen: boolean) => void;
  setMemberOpen: (isOpen: boolean) => void;
  setSelectedOption: (option: number | null) => void;
  setSelectedTime: (time: string) => void;
  setSelectedMembers: (members: string) => void;
  setQuestionModalOpen: (isOpen: boolean) => void;

  reset: () => void;
}

export const initialState = {
  isMemberChoseOpen: false,
  isTimeOpen: false,
  isMemberOpen: false,
  selectedOption: null,
  selectedTime: "7",
  selectedMembers: "13",
  isQuestionModalOpen: false,
};

export const useBottomSheetStore = create<BottomSheetState>((set) => ({
  ...initialState,

  setMemberChoseOpen: (isOpen) => set({ isMemberChoseOpen: isOpen }),
  setTimeOpen: (isOpen) => set({ isTimeOpen: isOpen }),
  setMemberOpen: (isOpen) => set({ isMemberOpen: isOpen }),
  setSelectedOption: (option) => set({ selectedOption: option }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setSelectedMembers: (members) => set({ selectedMembers: members }),
  setQuestionModalOpen: (isOpen) => set({ isQuestionModalOpen: isOpen }),

  reset: () => set(initialState),
}));
