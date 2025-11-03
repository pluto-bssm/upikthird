"use client";

import { useCallback, useEffect, useState } from "react";
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

  const fetchQuestions = useCallback(
    async (params = pagination) => {
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
    },
    [pagination, setQuestions],
  );

  const refetch = useCallback(async () => {
    await fetchQuestions(pagination);
  }, [fetchQuestions, pagination]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

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
  const [hasInitialized, setHasInitialized] = useState(false);

  const { questionDetail, setQuestionDetail } = useBoardStore();

  const fetchDetail = useCallback(async () => {
    if (!boardId) return;
    
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
  }, [boardId, setQuestionDetail]);

  useEffect(() => {
    if (boardId && !hasInitialized) {
      fetchDetail();
      setHasInitialized(true);
    }
  }, [boardId, hasInitialized,fetchDetail]);

  return { question: questionDetail, loading, error, refetch: fetchDetail };
}


export function useQuestionComments(
  boardId: string,
  initialPagination: PaginationParams = { page: 0, size: 10 },
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState(initialPagination);
  const [hasInitialized, setHasInitialized] = useState(false);

  const { comments, setComments } = useBoardStore();

  const fetchComments = useCallback(
    async (params?: PaginationParams) => {
      if (!boardId) return;
      
      const actualParams = params || pagination;
      try {
        setLoading(true);
        setError(null);
        const data = await boardApi.getComments(boardId, actualParams);
        setComments(data);
        
        // 페이지네이션 업데이트는 params가 없을 때만
        if (!params) {
          setPagination({ 
            page: data.currentPage ?? 0, 
            size: data.pageSize ?? 10 
          });
        }
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch comments";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [boardId, pagination, setComments],
  );

  // 초기 로딩만 useEffect로 처리
  useEffect(() => {
    if (boardId && !hasInitialized) {
      fetchComments(initialPagination);
      setHasInitialized(true);
    }
  }, [boardId, hasInitialized, initialPagination,fetchComments]);

  const refetch = useCallback(async () => {
    await fetchComments();
  }, [fetchComments]);

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

  const searchQuestions = useCallback(
    async (searchKeyword: string, params = pagination) => {
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
    },
    [pagination, setQuestions],
  );

  useEffect(() => {
    if (keyword) {
      searchQuestions(keyword);
    }
  }, [keyword, searchQuestions]);

  return {
    questions,
    loading,
    error,
    pagination,
    setPagination,
    searchQuestions,
  };
}
