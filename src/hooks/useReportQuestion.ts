"use client";

import { useState } from "react";
import * as voteApi from "@/services/vote/api";

/* ===================== 질문(투표) 신고 ===================== */
export function useReportQuestion() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Awaited<
    ReturnType<typeof voteApi.reportQuestion>
  > | null>(null);

  const reportQuestion = async (questionId: string, reason: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await voteApi.reportQuestion(questionId, reason);
      setResult(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to report question";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return {
    reportQuestion,
    loading,
    error,
    result,
    success: result?.success || false,
    message: result?.message || "",
    reset,
  };
}
