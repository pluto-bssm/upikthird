import { upik } from "@/apis";
import type { Board, PageResponse } from "@/types/graphql";
import { GET_SAVED_GUIDES, GET_SAVED_POSTS } from "./queries";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getSavedGuides(
  page: number,
  size: number,
): Promise<PageResponse<Board>> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_SAVED_GUIDES,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const guides = response.data?.data?.bookmark?.getBookmarkedGuides || [];

  const data: PageResponse<Board> = {
    content: guides as unknown[] as Board[],
    totalPages: 1,
    totalElements: guides.length,
    currentPage: page,
    pageSize: size,
  };

  return data;
}

export async function getSavedPosts(
  page: number,
  size: number,
): Promise<PageResponse<Board>> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_SAVED_POSTS,
      variables: { page, size },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = response.data?.data?.bookmark?.getBookmarks;
  if (!data) {
    throw new Error("Failed to fetch saved posts");
  }
  return data;
}
