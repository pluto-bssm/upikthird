import { create } from "zustand";
import type { VotePayload, Board, CommentPage } from "@/types/graphql";

interface VoteStore {
  myVotes: VotePayload[];
  setMyVotes: (votes: VotePayload[]) => void;
  addMyVote: (vote: VotePayload) => void;
  updateMyVote: (id: string, vote: Partial<VotePayload>) => void;
  removeMyVote: (id: string) => void;
  clearMyVotes: () => void;
}

export const useVoteStore = create<VoteStore>((set) => ({
  myVotes: [],
  setMyVotes: (votes) => set({ myVotes: votes }),
  addMyVote: (vote) => set((state) => ({ myVotes: [vote, ...state.myVotes] })),
  updateMyVote: (id, vote) =>
    set((state) => ({
      myVotes: state.myVotes.map((v) => (v.id === id ? { ...v, ...vote } : v)),
    })),
  removeMyVote: (id) =>
    set((state) => ({
      myVotes: state.myVotes.filter((v) => v.id !== id),
    })),
  clearMyVotes: () => set({ myVotes: [] }),
}));

interface BoardStore {
  questions: Board[];
  questionDetail: Board | null;
  comments: CommentPage | null;
  setQuestions: (questions: Board[]) => void;
  setQuestionDetail: (question: Board | null) => void;
  setComments: (comments: CommentPage | null) => void;
  addQuestion: (question: Board) => void;
  updateQuestion: (id: string, question: Partial<Board>) => void;
  removeQuestion: (id: string) => void;
  clearBoardData: () => void;
}

export const useBoardStore = create<BoardStore>((set) => ({
  questions: [],
  questionDetail: null,
  comments: null,
  setQuestions: (questions) => set({ questions }),
  setQuestionDetail: (question) => set({ questionDetail: question }),
  setComments: (comments) => set({ comments }),
  addQuestion: (question) =>
    set((state) => ({ questions: [question, ...state.questions] })),
  updateQuestion: (id, question) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...question } : q,
      ),
    })),
  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
  clearBoardData: () =>
    set({ questions: [], questionDetail: null, comments: null }),
}));
