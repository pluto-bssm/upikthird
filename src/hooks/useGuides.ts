"use client";

import { useQuery } from "@apollo/client/react";
import { useMutation } from "@apollo/client/react";
import {
  GET_GUIDES,
  GET_GUIDE_BY_ID,
  GET_BOOKMARKED_GUIDES,
  TOGGLE_BOOKMARK,
  GET_GUIDES_BY_CATEGORY,
  GET_ALL_GUIDES,
  SEARCH_SIMILAR_GUIDES
} from "@/graphql/queries";
import type { Guide,SimilarGuide } from "@/types/api";

/* ====================== Types ====================== */

interface GuidesByCategoryData {
  guide: {
    getGuidesByCategory: Guide[];
  };
}

interface AllGuidesData {
  guide: {
    getAllGuides: Guide[];
  };
}

interface AllGuidesPaginationData {
  getAllGuides: {
    content: Guide[];
    hasNext: boolean;
    pageNumber: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}


interface SearchSimilarGuidesData {
  keywordGuide: {
    searchSimilarByTitle: SimilarGuide[];
  };
}

  interface SearchSimilarGuidesVars {
    title: string;
  }

export function useSearchSimilarGuides(title?: string) {
  const { data, loading, error, refetch } = useQuery<SearchSimilarGuidesData, SearchSimilarGuidesVars>(
    SEARCH_SIMILAR_GUIDES,
    {
      variables: { title: title || "" },
      skip: !title, 
      fetchPolicy: "network-only",
    }

    
  );

  return {
    data,
    loading,
    error,
    refetch,
  };
}

// 모든 가이드를 가져오는 훅 (페이지네이션 지원)
export function useAllGuides(page: number = 0, size: number = 10, sortBy?: string) {
  const { data, loading, error, refetch } = useQuery<AllGuidesPaginationData>(
    GET_ALL_GUIDES,
    {
      variables: { page, size, sortBy },
      fetchPolicy: 'network-only'
    }
  );
  

  return {
    guides: data?.getAllGuides?.content || [],
    pagination: {
      hasNext: data?.getAllGuides?.hasNext || false,
      pageNumber: data?.getAllGuides?.pageNumber || 0,
      size: data?.getAllGuides?.size || 10,
      totalElements: data?.getAllGuides?.totalElements || 0,
      totalPages: data?.getAllGuides?.totalPages || 0,
    },
    loading,
    error,
    refetch
  };
}

interface GuideByIdData {
  guide: {
    getGuideById: Guide;
  };
}

interface BookmarkedGuidesData {
  bookmark: {
    getBookmarkedGuides: Guide[];
  };
}

interface ToggleBookmarkData {
  bookmark: {
    toggleBookmark: boolean;
  };
}

/* ====================== Hooks ====================== */

// 가이드 리스트 훅 (카테고리 유무에 따라 분기)
export function useGuides(category?: string) {
  const {
    data: byCatData,
    loading: byCatLoading,
    error: byCatError,
    refetch: refetchByCat,
  } = useQuery<GuidesByCategoryData>(GET_GUIDES_BY_CATEGORY, {
    variables: { category },
    fetchPolicy: "network-only",
    skip: !category, // 카테고리 없으면 스킵
  });

  const {
    data: allData,
    loading: allLoading,
    error: allError,
    refetch: refetchAll,
  } = useQuery<AllGuidesData>(GET_GUIDES, {
    fetchPolicy: "network-only",
    skip: !!category, // 카테고리 있으면 전체 조회 스킵
  });

  const guides = category
    ? byCatData?.guide?.getGuidesByCategory || []
    : allData?.guide?.getAllGuides || [];

  return {
    guides,
    loading: byCatLoading || allLoading,
    error: byCatError || allError,
    refetch: category ? refetchByCat : refetchAll,
  };
}

// 가이드 단건 조회 훅
export function useGuideById(id: string) {
  const { data, loading, error, refetch } = useQuery<GuideByIdData>(
    GET_GUIDE_BY_ID,
    {
      variables: { id },
      fetchPolicy: "network-only",
    }
  );

  return {
    guide: data?.guide?.getGuideById,
    loading,
    error,
    refetch,
  };
}

// 북마크한 가이드 목록 훅
export function useBookmarkedGuides() {
  const { data, loading, error, refetch } =
    useQuery<BookmarkedGuidesData>(GET_BOOKMARKED_GUIDES, {
      fetchPolicy: "network-only",
    });

  return {
    guides: data?.bookmark?.getBookmarkedGuides || [],
    loading,
    error,
    refetch,
  };
}

// 북마크 토글 훅
export function useToggleBookmark() {
  const [toggleMutation, { loading, error }] = useMutation<
    ToggleBookmarkData,
    { guideId: string }
  >(TOGGLE_BOOKMARK);

  const toggleBookmark = async (guideId: string) => {
    const result = await toggleMutation({
      variables: { guideId },
      refetchQueries: [{ query: GET_BOOKMARKED_GUIDES }],
    });
    return result.data?.bookmark?.toggleBookmark;
  };

  return {
    toggleBookmark,
    loading,
    error,
  };
}