import { useState } from "react";
import { reportBoard, reportComment } from "./api";
import type { ReportBoardData, ReportCommentData } from "./api";

export interface UseReportReturn {
  isLoading: boolean;
  error: string | null;
  reportBoard: (data: ReportBoardData) => Promise<void>;
  reportComment: (data: ReportCommentData) => Promise<void>;
}

export const useReport = (): UseReportReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReportBoard = async (data: ReportBoardData) => {
    setIsLoading(true);
    setError(null);

    try {
      await reportBoard(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "게시물 신고에 실패했습니다.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportComment = async (data: ReportCommentData) => {
    setIsLoading(true);
    setError(null);

    try {
      await reportComment(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "댓글 신고에 실패했습니다.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    reportBoard: handleReportBoard,
    reportComment: handleReportComment,
  };
};
