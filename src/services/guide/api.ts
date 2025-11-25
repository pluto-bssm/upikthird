import { upik } from "@/apis";
import {
  GET_GUIDES_BY_CATEGORY,
  GET_GUIDE_BY_ID,
  SEARCH_SIMILAR_GUIDES,
  GET_ALL_GUIDES,
  GET_LEAST_POPULAR_OPEN_VOTE,
  GET_MOST_POPULAR_OPEN_VOTE,
  TOGGLE_BOOKMARK,
  GET_BOOKMARKS,
} from "@/services/guide/queries";
import {
  CREATE_REVOTE,
  INCREMENT_GUIDE_LIKE,
  DECREMENT_GUIDE_LIKE,
} from "@/services/guide/mutations";
import { authorization } from "@/apis/token";
import type {
  Guide,
  SimilarGuide,
  Page,
  Vote,
  CreateRevoteInput,
  CreateRevotePayload,
  Bookmark,
} from "@/types/api";

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
  const response = await upik.post(
    "",
    {
      query: GET_ALL_GUIDES,
      variables: { page: 0, size: 100, sortBy: "createdAt" },
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.getAllGuides?.content || [];
}

/**
 * 카테고리별 가이드 조회
 */
export async function getGuidesByCategory(category: string): Promise<Guide[]> {
  const response = await upik.post(
    "",
    {
      query: GET_GUIDES_BY_CATEGORY,
      variables: { category },
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.guide?.getGuidesByCategory || [];
}

/**
 * 가이드 상세 조회 (ID로)
 */
export async function getGuideById(id: string): Promise<GuideDetail> {
  const response = await upik.post(
    "",
    {
      query: GET_GUIDE_BY_ID,
      variables: { id },
    } as GraphQLRequest,
    authorization(),
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
  const response = await upik.post(
    "",
    {
      query: GET_GUIDE_BY_ID,
      variables: { id },
    } as GraphQLRequest,
    authorization(),
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
  const response = await upik.post(
    "",
    {
      query: SEARCH_SIMILAR_GUIDES,
      variables: { title },
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.keywordGuide?.searchSimilarByTitle || [];
}

/**
 * 페이지네이션된 가이드 조회
 */
export async function getPaginatedGuides(
  page: number = 0,
  size: number = 10,
  sortBy: string = "createdAt",
): Promise<PaginatedGuides> {
  const response = await upik.post(
    "",
    {
      query: GET_ALL_GUIDES,
      variables: { page, size, sortBy },
    } as GraphQLRequest,
    authorization(),
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
  const response = await upik.post(
    "",
    {
      query: GET_LEAST_POPULAR_OPEN_VOTE,
    } as GraphQLRequest,
    authorization(),
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
  const response = await upik.post(
    "",
    {
      query: GET_MOST_POPULAR_OPEN_VOTE,
    } as GraphQLRequest,
    authorization(),
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
  const response = await upik.post(
    "",
    {
      query: TOGGLE_BOOKMARK,
      variables: { guideId },
    } as GraphQLRequest,
    authorization(),
  );

  const result = response.data?.data?.bookmark?.toggleBookmark;
  return result ?? false;
}

/**
 * 북마크 목록 조회 후 특정 가이드가 북마크되었는지 확인
 */
export async function isGuideBookmarked(guideId: string): Promise<boolean> {
  const response = await upik.post(
    "",
    {
      query: GET_BOOKMARKS,
    } as GraphQLRequest,
    authorization(),
  );

  const bookmarks: Bookmark[] =
    response.data?.data?.bookmark?.getBookmarks ?? [];

  return bookmarks.some((b) => b.guideId === guideId);
}

/**
 * 재투표 요청
 */
export async function createRevote(
  input: CreateRevoteInput,
): Promise<CreateRevotePayload> {
  const response = await upik.post(
    "",
    {
      query: CREATE_REVOTE,
      variables: { input },
    } as GraphQLRequest,
    authorization(),
  );

  return response.data?.data?.revote?.createRevote;
}

/**
 * 가이드 좋아요 증가
 */
export async function incrementGuideLike(id: string): Promise<boolean> {
  const response = await upik.post(
    "",
    {
      query: INCREMENT_GUIDE_LIKE,
      variables: { id },
    } as GraphQLRequest,
    authorization(),
  );

  const result = response.data?.data?.guide?.incrementGuideLike;
  return result ?? false;
}

/**
 * 가이드 좋아요 감소
 */
export async function decrementGuideLike(id: string): Promise<boolean> {
  const response = await upik.post(
    "",
    {
      query: DECREMENT_GUIDE_LIKE,
      variables: { id },
    } as GraphQLRequest,
    authorization(),
  );

  const result = response.data?.data?.guide?.decrementGuideLike;
  return result ?? false;
}
