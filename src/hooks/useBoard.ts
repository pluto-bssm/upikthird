"use client";

import { useEffect, useState } from "react";
import { useBoardStore } from "@/store";
import * as boardApi from "@/services/board/api";
import type { PaginationParams } from "@/types/graphql";

export function useQuestions(
  initialPagination: PaginationParams = { page: 0, size: 10 },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(initialPagination);

  const { questions, setQuestions } = useBoardStore();

  const refetch = async () => {
    await fetchQuestions(pagination);
  };

  const fetchQuestions = async (params = pagination) => {
    try {
      setLoading(true);
      setError(null);
      const data = await boardApi.getQuestionList(params);
      setQuestions(data.content);
      setPagination({ page: data.currentPage, size: data.pageSize });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch questions";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await boardApi.getQuestionList(pagination);
        setQuestions(data.content);
        setPagination({ page: data.currentPage, size: data.pageSize });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch questions";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ✅ 한 번만 실행됨

  return {
    questions,
    loading,
    error,
    pagination,
    setPagination,
    fetchQuestions,
    refetch,
  };
}

export function useQuestionDetail(boardId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { questionDetail, setQuestionDetail } = useBoardStore();

  useEffect(() => {
    if (!boardId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boardApi.getQuestionDetail(boardId);
        setQuestionDetail(data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch question detail";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [boardId, setQuestionDetail]);

  const refetch = async () => {
    const data = await boardApi.getQuestionDetail(boardId);
    setQuestionDetail(data);
  };

  return { question: questionDetail, loading, error, refetch };
}
export function useQuestionComments(
  boardId: string,
  initialPagination: PaginationParams = { page: 0, size: 10 },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(initialPagination);

  const { comments, setComments } = useBoardStore();

  useEffect(() => {
    if (!boardId) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boardApi.getComments(boardId, pagination);
        setComments(data);
        // ✅ setPagination 제거 (초기값으로 충분)
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch comments";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [boardId, setComments]); // ✅ pagination 제거

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await boardApi.getComments(boardId, pagination);
      setComments(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch comments";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    comments,
    loading,
    error,
    pagination,
    setPagination,
    refetch,
  };
}

export function useSearchQuestions(
  keyword: string,
  initialPagination: PaginationParams = { page: 0, size: 10 },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(initialPagination);

  const { questions, setQuestions } = useBoardStore();

  useEffect(() => {
    if (!keyword) return;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await boardApi.searchQuestions(keyword, pagination);
        setQuestions(data.content);
        setPagination({ page: data.currentPage, size: data.pageSize });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to search questions";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [keyword, pagination, setQuestions]);

  return {
    questions,
    loading,
    error,
    pagination,
    setPagination,
  };
}

