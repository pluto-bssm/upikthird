"use client";

import { useCallback, useEffect, useState } from "react";
import * as voteResponsesApi from "@/services/my/vote-responses/api";
import type { VotePayload } from "@/types/graphql";

interface UseMyVoteResponsesOptions {
  autoFetch?: boolean;
}

export function useMyVoteResponses(options: UseMyVoteResponsesOptions = {}) {
  const { autoFetch = true } = options;
  const [responses, setResponses] = useState<VotePayload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchResponses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await voteResponsesApi.getMyVoteResponses();
      setResponses(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch vote responses";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchResponses();
    }
  }, [autoFetch, fetchResponses]);

  return {
    responses,
    loading,
    error,
    refetch: fetchResponses,
  };
}

interface UseVoteResponseDetailOptions {
  id?: string;
}

export function useVoteResponseDetail(
  options: UseVoteResponseDetailOptions = {},
) {
  const { id } = options;
  const [detail, setDetail] = useState<VotePayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);
      const data = await voteResponsesApi.getVoteResponseDetail(id);
      setDetail(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch vote detail";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return {
    detail,
    loading,
    error,
    refetch: fetchDetail,
  };
}
