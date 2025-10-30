import { upik } from "@/apis";
import { 
  GET_GUIDES,
  GET_GUIDES_BY_CATEGORY,
  GET_GUIDE_BY_ID,
  SEARCH_SIMILAR_GUIDES,
  GET_ALL_GUIDES,
  GUIDE_BY_ID
} from "@/services/vote/queries";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

// ===================== 가이드 타입 정의 =====================

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  like: number;
}

export interface GuideDetail {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  guideType: string;
  likeCount: number;
  revoteCount: number;
  voteId?: string;
}

export interface SimilarGuide {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  guideType: string;
  keyword: string;
  likeCount: number;
  revoteCount: number;
  userEmail: string;
  userId: string;
  userName: string;
  userProfileImage: string;
}

export interface PaginatedGuides {
  content: Guide[];
  hasNext: boolean;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
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
      query: GET_GUIDES,
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
      query: GUIDE_BY_ID,
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
export async function searchSimilarGuides(title: string): Promise<SimilarGuide[]> {
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
  sortBy: string = "createdAt"
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
