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

  return data.map((post: any) => ({
    id: post.id,
    title: post.title,
    content: post.content,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
    author: {
      id: post.userId,
      name: post.userName,
      avatar: post.userProfileImage,
    },
    views: post.viewCount || 0,
    likes: 0,
    commentCount: post.commentCount || 0,
    status: "OPEN",
    isBookmarked: post.isBookmarked || false,
    bookmarkCount: post.bookmarkCount || 0,
  }));
}
