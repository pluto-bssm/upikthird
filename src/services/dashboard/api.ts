import { upik } from "@/apis";
import {
  GET_ALL_REPORTS,
  GET_REPORTS_BY_TARGET,
} from "@/services/dashboard/queries";
import { REJECT_REPORT } from "@/services/dashboard/mutations";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export type ReportItem = {
  authorId: string;
  authorName: string;
  category: string;
  content: string;
  createdAt: string;
  guideType?: string;
  likeCount?: number;
  reason: string;
  revoteCount?: number;
  targetCreatedAt?: string;
  targetId: string;
  targetTitle: string;
  targetType: string;
  userId?: string;
};

/**
 * 모든 신고 목록 조회
 */
export async function getAllReports(): Promise<ReportItem[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_ALL_REPORTS,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const reports = response.data?.data?.report?.getAllReports || [];
  return reports as ReportItem[];
}

/**
 * 신고 반려 처리
 */
export async function rejectReport(
  targetId: string,
  userId: string,
): Promise<string> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: REJECT_REPORT,
      variables: { targetId, userId },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const message: string | undefined =
    response.data?.data?.report?.rejectReport?.message;
  if (!message) {
    throw new Error("Failed to reject report");
  }
  return message;
}

/**
 * 타겟의 신고 목록 조회
 */
export async function getReportsByTarget(
  targetId: string,
): Promise<ReportItem[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_REPORTS_BY_TARGET,
      variables: { targetId },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const reports = response.data?.data?.report?.getReportsByTarget || [];
  return reports as ReportItem[];
}
