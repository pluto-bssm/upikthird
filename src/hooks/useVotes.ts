"use client";

import { useEffect, useState } from "react";
import { useVoteStore } from "@/store";
import * as voteApi from "@/services/vote/api";
import type { VotePayload } from "@/types/graphql";

interface UseVotesOptions {
  autoFetch?: boolean;
}

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
      // Refresh votes after voting
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
