import { useState } from "react";
import { sendReport, ReportData } from "./api";

export interface UseReportReturn {
  isLoading: boolean;
  error: string | null;
  sendReport: (data: ReportData) => Promise<void>;
}

export const useReport = (): UseReportReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendReport = async (data: ReportData) => {
    setIsLoading(true);
    setError(null);

    try {
      await sendReport(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "신고 전송에 실패했습니다.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendReport: handleSendReport,
  };
};
