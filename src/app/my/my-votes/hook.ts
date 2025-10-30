import { useState, useEffect } from "react";
import { getMyVotes, MyVote } from "@/services/my/my-votes/api";

export const useMyVotes = () => {
  const [votes, setVotes] = useState<MyVote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchMyVotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMyVotes();
      setVotes(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyVotes();
  }, []);

  return {
    votes,
    loading,
    error,
    refetch: fetchMyVotes,
  };
};
