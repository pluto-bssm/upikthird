"use client";

import { useCallback, useEffect, useState } from "react";
import * as guideApi from "@/services/guide/api";
import type { GuideDetail, PaginatedGuides } from "@/services/guide/api";
import type { Guide, SimilarGuide } from "@/types/api";

interface UseGuideOptions {
  autoFetch?: boolean;
}

/* ===================== 모든 가이드 ===================== */
export function useGuides(options: UseGuideOptions = {}) {
  const { autoFetch = true } = options;
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuides = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await guideApi.getAllGuides();
      setGuides(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch guides";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [setGuides]);

  const refetch = useCallback(async () => {
    await fetchGuides();
  }, [fetchGuides]);

  useEffect(() => {
    if (autoFetch) {
      fetchGuides();
    }
  }, [autoFetch, fetchGuides]);

  return {
    guides,
    loading,
    error,
    fetchGuides,
    refetch,
  };
}

/* ===================== 카테고리별 가이드 ===================== */
export function useGuidesByCategory(
  category: string,
  options: UseGuideOptions = {},
) {
  const { autoFetch = true } = options;
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuidesByCategory = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await guideApi.getGuidesByCategory(category);
      setGuides(data);
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to fetch guides by category";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [category, setGuides]);

  const refetch = useCallback(async () => {
    await fetchGuidesByCategory();
  }, [fetchGuidesByCategory]);

  useEffect(() => {
    if (autoFetch && category) {
      fetchGuidesByCategory();
    }
  }, [category, autoFetch, fetchGuidesByCategory]);

  return {
    guides,
    loading,
    error,
    fetchGuidesByCategory,
    refetch,
  };
}

/* ===================== 단일 가이드 ===================== */
export function useGuide(id: string, options: UseGuideOptions = {}) {
  const { autoFetch = true } = options;
  const [guide, setGuide] = useState<GuideDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchGuide = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await guideApi.getGuideById(id);
      setGuide(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch guide";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [id, setGuide]);

  const refetch = useCallback(async () => {
    await fetchGuide();
  }, [fetchGuide]);

  useEffect(() => {
    if (autoFetch && id) {
      fetchGuide();
    }
  }, [id, autoFetch, fetchGuide]);

  return {
    guide,
    loading,
    error,
    fetchGuide,
    refetch,
  };
}

/* ===================== 유사 가이드 검색 ===================== */
export function useSearchSimilarGuides(
  title: string,
  options: UseGuideOptions = {},
) {
  const { autoFetch = true } = options;
  const [guides, setGuides] = useState<SimilarGuide[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchSimilarGuides = useCallback(
    async (searchTitle?: string) => {
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
          err instanceof Error
            ? err.message
            : "Failed to search similar guides";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [title, setGuides],
  );

  const refetch = useCallback(async () => {
    await searchSimilarGuides();
  }, [searchSimilarGuides]);

  useEffect(() => {
    if (autoFetch && title && title.trim() !== "") {
      searchSimilarGuides();
    }
  }, [title, autoFetch, searchSimilarGuides]);

  return {
    guides,
    loading,
    error,
    searchSimilarGuides,
    refetch,
  };
}

/* ===================== 페이지네이션된 가이드 ===================== */
export function usePaginatedGuides(
  page: number = 0,
  size: number = 10,
  sortBy: string = "createdAt",
  options: UseGuideOptions = {},
) {
  const { autoFetch = true } = options;
  const [guides, setGuides] = useState<PaginatedGuides | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaginatedGuides = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await guideApi.getPaginatedGuides(page, size, sortBy);
      setGuides(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch paginated guides";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [page, size, sortBy, setGuides]);

  const refetch = useCallback(async () => {
    await fetchPaginatedGuides();
  }, [fetchPaginatedGuides]);

  useEffect(() => {
    if (autoFetch) {
      fetchPaginatedGuides();
    }
  }, [page, size, sortBy, autoFetch, fetchPaginatedGuides]);

  return {
    guides,
    loading,
    error,
    fetchPaginatedGuides,
    refetch,
  };
}
