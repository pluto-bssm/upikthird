"use client";

import { useEffect, useState } from "react";
import { useVoteStore } from "@/store";
import * as voteApi from "@/services/vote/api";
import * as guideApi from "@/services/guide/api";
import type { VotePayload } from "@/types/graphql";

interface UseVotesOptions {
  autoFetch?: boolean;
}

/* ===================== 내 투표 목록 ===================== */
export function useMyVotes(options: UseVotesOptions = {}) {
  const { autoFetch = true } = options;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    myVotes,
    setMyVotes,
    addMyVote,
    updateMyVote,
    removeMyVote,
    clearMyVotes,
  } = useVoteStore();

  const fetchMyVotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const votes = await voteApi.getMyVotes();
      setMyVotes(votes);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch votes";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const voteResponse = async (voteId: string, optionId: string) => {
    try {
      setLoading(true);
      setError(null);
      await voteApi.createVoteResponse({ voteId, optionId });
      await fetchMyVotes();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to vote";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchMyVotes();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchMyVotes();
    }
  }, [autoFetch]);

  return {
    myVotes,
    loading,
    error,
    fetchMyVotes,
    voteResponse,
    addMyVote,
    updateMyVote,
    removeMyVote,
    clearMyVotes,
    refetch,
  };
}

/* ===================== 단일 투표 ===================== */
export function useVote(voteId: string) {
  const [vote, setVote] = useState<VotePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVote = async () => {
    try {
      setLoading(true);
      setError(null);
      const voteData = await voteApi.getVoteById(voteId);
      setVote(voteData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch vote";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const voteResponse = async (optionId: string) => {
    try {
      setLoading(true);
      setError(null);
      await voteApi.createVoteResponse({ voteId, optionId });
      await fetchVote();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to vote";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVote();
  }, [voteId]);

  return { vote, loading, error, voteResponse, refetch: fetchVote };
}

/* ===================== 모든 투표 목록 ===================== */
export function useAllVotes(options: UseVotesOptions = {}) {
  const { autoFetch = true } = options;
  const [votes, setVotes] = useState<VotePayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllVotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const votesData = await voteApi.getAllVotes();
      setVotes(votesData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch all votes";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchAllVotes();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchAllVotes();
    }
  }, [autoFetch]);

  return {
    votes,
    loading,
    error,
    fetchAllVotes,
    refetch,
  };
}

/* ===================== 투표 목록 (필터링 포함) ===================== */
export function useVotes(options: UseVotesOptions = {}) {
  const { autoFetch = true } = options;
  const [votes, setVotes] = useState<VotePayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchVotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const votesData = await voteApi.getVotes();
      setVotes(votesData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch votes";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchVotes();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchVotes();
    }
  }, [autoFetch]);

  return {
    votes,
    loading,
    error,
    fetchVotes,
    refetch,
  };
}

/* ===================== 투표 생성 ===================== */
export function useCreateVote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdVote, setCreatedVote] = useState<VotePayload | null>(null);

  const createVote = async (
    input: Parameters<typeof voteApi.createVote>[0],
  ) => {
    try {
      setLoading(true);
      setError(null);
      const vote = await voteApi.createVote(input);
      setCreatedVote(vote);
      return vote;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create vote";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setCreatedVote(null);
    setError(null);
  };

  return {
    createVote,
    loading,
    error,
    createdVote,
    reset,
  };
}

/* ===================== 오늘의 투표 ===================== */
export function useTodayVote(options: UseVotesOptions = {}) {
  const { autoFetch = true } = options;
  const [vote, setVote] = useState<VotePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTodayVote = async () => {
    try {
      setLoading(true);
      setError(null);
      const voteData = await voteApi.getTodayVote();
      setVote(voteData);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch today's vote";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const voteResponse = async (optionId: string) => {
    if (!vote) return;

    try {
      setLoading(true);
      setError(null);
      await voteApi.createVoteResponse({ voteId: vote.id, optionId });
      await fetchTodayVote();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to vote";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchTodayVote();
  };

  useEffect(() => {
    if (autoFetch) {
      fetchTodayVote();
    }
  }, [autoFetch]);

  return {
    vote,
    loading,
    error,
    voteResponse,
    refetch,
  };
}

/* ===================== 비속어 체크 ===================== */
export function useCheckBadWord() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof voteApi.checkBadWord>
  > | null>(null);

  const checkBadWord = async (text: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await voteApi.checkBadWord(text);
      setResult(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to check bad word";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    checkBadWord,
    loading,
    error,
    result,
    reset,
  };
}

/* ===================== AI 옵션 생성 ===================== */
export function useGenerateAiOptions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof voteApi.generateAiOptions>
  > | null>(null);

  const generateAiOptions = async (count: number, title: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await voteApi.generateAiOptions(count, title);
      setResult(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate options";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    generateAiOptions,
    loading,
    error,
    result,
    options: result?.options || [],
    message: result?.message || "",
    reset,
  };
}

/* ===================== 꼬리 투표 생성 ===================== */
export function useCreateTailVote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof voteApi.createTailVote>
  > | null>(null);

  const createTailVote = async (question: string, voteId: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await voteApi.createTailVote(question, voteId);
      setResult(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create tail vote";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    createTailVote,
    loading,
    error,
    result,
    reset,
  };
}

/* ===================== 투표 응답 생성 ===================== */
export function useCreateVoteResponse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createVoteResponse = async (voteId: string, optionId: string) => {
    try {
      setLoading(true);
      setError(null);
      await voteApi.createVoteResponse({ voteId, optionId });
      return true;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to create vote response";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createVoteResponse,
    loading,
    error,
  };
}

/* ===================== 유사 가이드 검색 ===================== */
export function useSearchSimilarGuides(
  title: string,
  options: UseVotesOptions = {},
) {
  const { autoFetch = true } = options;
  const [guides, setGuides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchSimilarGuides = async (searchTitle?: string) => {
    const titleToSearch = searchTitle || title;

    if (!titleToSearch || titleToSearch.trim() === "") {
      setGuides([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await guideApi.searchSimilarGuides(titleToSearch);
      setGuides(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to search similar guides";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await searchSimilarGuides();
  };

  useEffect(() => {
    if (autoFetch && title && title.trim() !== "") {
      searchSimilarGuides();
    }
  }, [title, autoFetch]);

  return {
    guides,
    loading,
    error,
    searchSimilarGuides,
    refetch,
  };
}
