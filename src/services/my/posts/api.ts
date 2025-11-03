import { upik } from "@/apis";
import type { Board } from "@/types/graphql";
import { GET_MY_POSTS } from "./query";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface GetMyPostsResponse {
  board: {
    getMyQuestions: {
      content: Board[];
      totalElements: number;
      totalPages: number;
    };
  };
}

export async function getMyPosts(): Promise<Board[]> {
  const token = Storage.getItem(TOKEN.ACCESS);

  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_MY_POSTS,
      variables: { page: 0, size: 20 },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = response.data?.data?.board?.getMyQuestions?.content || [];

  return data.map((post: unknown) => {
    const p = post as Record<string, unknown>;
    return {
      id: String(p.id ?? ""),
      title: String(p.title ?? ""),
      content: String(p.content ?? ""),
      createdAt: String(p.createdAt ?? ""),
      updatedAt: String(p.updatedAt ?? ""),
      author: {
        id: String(p.userId ?? ""),
        name: String(p.userName ?? ""),
        avatar: String(p.userProfileImage ?? ""),
      },
      views: Number(p.viewCount ?? 0) || 0,
      likes: 0,
      commentCount: Number(p.commentCount ?? 0) || 0,
      status: "OPEN",
      isBookmarked: Boolean(p.isBookmarked) || false,
      bookmarkCount: Number(p.bookmarkCount ?? 0) || 0,
    } as Board;
  });
}
