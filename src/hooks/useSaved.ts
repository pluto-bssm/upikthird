"use client";

import { useCallback, useEffect, useState } from "react";
import * as savedApi from "@/services/my/saved/api";
import * as likesApi from "@/services/my/likes/api";
import type { Board } from "@/types/graphql";

export function useSavedGuides(initialPage: number = 0, pageSize: number = 10) {
  const [guides, setGuides] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: pageSize,
  });

  const fetchGuides = useCallback(
    async (page = initialPage, size = pageSize) => {
      setLoading(true);
      setError(null);
      try {
        const data = await savedApi.getSavedGuides(page, size);
        setGuides(data.content);
        setPagination({ page: data.currentPage, size: data.pageSize });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch saved guides";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [initialPage, pageSize],
  );

  useEffect(() => {
    fetchGuides();
  }, [fetchGuides]);

  return { guides, loading, error, pagination, refetch: fetchGuides };
}

export function useSavedPosts(initialPage: number = 0, pageSize: number = 10) {
  const [posts, setPosts] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: pageSize,
  });

  const fetchPosts = useCallback(
    async (page = initialPage, size = pageSize) => {
      setLoading(true);
      setError(null);
      try {
        const data = await savedApi.getSavedPosts(page, size);
        setPosts(data.content);
        setPagination({ page: data.currentPage, size: data.pageSize });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to fetch saved posts";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [initialPage, pageSize],
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, pagination, refetch: fetchPosts };
}

export function useLikedQuestions(
  initialPage: number = 0,
  pageSize: number = 10,
) {
  const [questions, setQuestions] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: initialPage,
    size: pageSize,
  });

  const fetchQuestions = useCallback(
    async (page = initialPage, size = pageSize) => {
      setLoading(true);
      setError(null);
      try {
        const data = await likesApi.getLikedQuestions(page, size);
        setQuestions(data.content);
        setPagination({ page: data.currentPage, size: data.pageSize });
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Failed to fetch liked questions";
        setError(message);
      } finally {
        setLoading(false);
      }
    },
    [initialPage, pageSize],
  );

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return { questions, loading, error, pagination, refetch: fetchQuestions };
}
