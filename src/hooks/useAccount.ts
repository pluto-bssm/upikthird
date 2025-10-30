"use client";

import { useEffect, useState } from "react";
import * as accountApi from "@/services/my/account/api";
import type { User } from "@/types/graphql";

export function useMyUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountApi.getMyUser();
      setUser(data);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch user info";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetch: fetchUser };
}

// 호환성을 위한 alias
export const useCurrentUser = useMyUser;
