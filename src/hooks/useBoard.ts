"use client";

import { useEffect, useState } from "react";
import { useBoardStore } from "@/store";
import * as boardApi from "@/services/board/api";
import type {
  Board,
  CommentPage,
  PageResponse,
  PaginationParams,
} from "@/types/graphql";

export function useQuestions(
  initialPagination: PaginationParams = { page: 0, size: 10 },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(initialPagination);

  const { questions, setQuestions } = useBoardStore();

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

  const refetch = async () => {
    await fetchQuestions(pagination);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

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

  const fetchDetail = async () => {
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

  useEffect(() => {
    if (boardId) {
      fetchDetail();
    }
  }, [boardId]);

  return { question: questionDetail, loading, error, refetch: fetchDetail };
}

export function useQuestionComments(
  boardId: string,
  initialPagination: PaginationParams = { page: 0, size: 10 },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(initialPagination);

  const { comments, setComments } = useBoardStore();

  const fetchComments = async (params = pagination) => {
    try {
      setLoading(true);
      setError(null);
      const data = await boardApi.getComments(boardId, params);
      setComments(data);
      setPagination({ page: data.currentPage ?? 0, size: data.pageSize ?? 10 });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch comments";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    await fetchComments(pagination);
  };

  useEffect(() => {
    if (boardId) {
      fetchComments();
    }
  }, [boardId]);

  return {
    comments,
    loading,
    error,
    pagination,
    setPagination,
    fetchComments,
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

  const searchQuestions = async (
    searchKeyword: string,
    params = pagination,
  ) => {
    try {
      setLoading(true);
      setError(null);
      const data = await boardApi.searchQuestions(searchKeyword, params);
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

  useEffect(() => {
    if (keyword) {
      searchQuestions(keyword);
    }
  }, [keyword]);

  return {
    questions,
    loading,
    error,
    pagination,
    setPagination,
    searchQuestions,
  };
}
