'use client';

import { useEffect, useState } from 'react';
import * as postsApi from '@/services/my/posts/api';
import type { Board } from '@/types/graphql';

interface UseMyPostsOptions {
  autoFetch?: boolean;
}

export function useMyPosts(options: UseMyPostsOptions = {}) {
  const { autoFetch = true } = options;
  const [posts, setPosts] = useState<Board[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postsApi.getMyPosts();
      setPosts(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch posts';
      setError(message);
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchPosts();
    }
  }, [autoFetch]);

  return {
    posts,
    loading,
    error,
    refetch: fetchPosts,
  };
}
