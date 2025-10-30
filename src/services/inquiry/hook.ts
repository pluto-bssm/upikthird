import { useState } from "react";
import { sendInquiry, InquiryData } from "./api";

export interface UseInquiryReturn {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  sendInquiry: (data: InquiryData) => Promise<void>;
  reset: () => void;
}

export const useInquiry = (): UseInquiryReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendInquiry = async (data: InquiryData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await sendInquiry(data);
      setSuccess(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "문의 전송에 실패했습니다.";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    isLoading,
    error,
    success,
    sendInquiry: handleSendInquiry,
    reset: handleReset,
  };
};
