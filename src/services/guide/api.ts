import { upik } from "@/apis";
import {
  GET_GUIDES_BY_CATEGORY,
  GET_GUIDE_BY_ID,
  SEARCH_SIMILAR_GUIDES,
  GET_ALL_GUIDES,
  GET_LEAST_POPULAR_OPEN_VOTE,
  GET_MOST_POPULAR_OPEN_VOTE,
  TOGGLE_BOOKMARK,
} from "@/services/guide/queries";
import { REVOTE_MUTATION } from "@/services/guide/mutations";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";
import type { Guide, SimilarGuide, Page, Vote } from "@/types/api";

// GuideDetail and PaginatedGuides shape are derived from shared types
export type GuideDetail = Guide & {
  guideType?: string;
  likeCount?: number;
  revoteCount?: number;
  voteId?: string;
};

export type PaginatedGuides = Page<Guide> & {
  hasNext: boolean;
  pageNumber: number;
  size: number;
};

export interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

// ===================== 가이드 조회 =====================

/**
 * 모든 가이드 조회
 */
export async function getAllGuides(): Promise<Guide[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_ALL_GUIDES,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guides = response.data?.data?.guide?.getAllGuides || [];
  return guides;
}

/**
 * 카테고리별 가이드 조회
 */
export async function getGuidesByCategory(category: string): Promise<Guide[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_GUIDES_BY_CATEGORY,
      variables: { category },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guides = response.data?.data?.guide?.getGuidesByCategory || [];
  return guides;
}

/**
 * 가이드 상세 조회 (ID로)
 */
export async function getGuideById(id: string): Promise<GuideDetail> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_GUIDE_BY_ID,
      variables: { id },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guide = response.data?.data?.guideById;
  if (!guide) {
    throw new Error("Guide not found");
  }
  return guide;
}

/**
 * 가이드 상세 조회 (GUIDE_BY_ID 쿼리 사용)
 */
export async function getGuideDetail(id: string): Promise<GuideDetail> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_GUIDE_BY_ID,
      variables: { id },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guide = response.data?.data?.guideById;
  if (!guide) {
    throw new Error("Guide not found");
  }
  return guide;
}

/**
 * 유사한 가이드 검색
 */
export async function searchSimilarGuides(
  title: string,
): Promise<SimilarGuide[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: SEARCH_SIMILAR_GUIDES,
      variables: { title },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guides = response.data?.data?.keywordGuide?.searchSimilarByTitle || [];
  return guides;
}

/**
 * 페이지네이션된 가이드 조회
 */
export async function getPaginatedGuides(
  page: number = 0,
  size: number = 10,
  sortBy: string = "createdAt",
): Promise<PaginatedGuides> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_ALL_GUIDES,
      variables: { page, size, sortBy },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guides = response.data?.data?.getAllGuides;
  if (!guides) {
    throw new Error("Failed to fetch guides");
  }
  return guides;
}

/**
 * 가장 인기 없는 가이드 조회
 */
export async function getLeastPopularOpenVote(): Promise<Vote> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_LEAST_POPULAR_OPEN_VOTE,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const vote = response.data?.data?.vote?.getLeastPopularOpenVote;
  if (!vote) {
    throw new Error("Failed to fetch vote");
  }
  return vote;
}

/**
 * 가장 인기 있는 가이드 조회
 */
export async function getMostPopularOpenVote(): Promise<Vote | Vote[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: GET_MOST_POPULAR_OPEN_VOTE,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const vote = response.data?.data?.vote?.getMostPopularOpenVote;
  if (!vote) {
    throw new Error("Failed to fetch vote");
  }
  return vote;
}

/**
 * 북마크 토글
 */
export async function toggleBookmark(guideId: string): Promise<boolean> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: TOGGLE_BOOKMARK,
      variables: { guideId },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const result = response.data?.data?.bookmark?.toggleBookmark;
  return result ?? false;
}

/**
 * 재투표 요청 생성
 */
export interface CreateRevoteRequestInput {
  guideId: string;
  reason: string;
  detailReason: string;
}

export interface CreateRevoteRequestResponse {
  id: string;
  guideId: string;
  reason: string;
  detailReason: string;
  userId: string;
  createdAt: string;
}

export async function createRevoteRequest(input: CreateRevoteRequestInput): Promise<CreateRevoteRequestResponse> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    "",
    {
      query: REVOTE_MUTATION,
      variables: { input },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const result = response.data?.data?.revote?.createRevoteRequest;
  if (!result) {
    throw new Error("Failed to create revote request");
  }
  return result;
} 