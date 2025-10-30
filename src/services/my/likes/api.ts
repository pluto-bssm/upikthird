import { upik } from "@/apis";
import type { Board, PageResponse } from "@/types/graphql";
import { GET_LIKED_QUESTIONS } from "./queries";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getLikedQuestions(
  page: number,
  size: number,
): Promise<PageResponse<Board>> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_LIKED_QUESTIONS,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const questions = response.data?.data?.board?.getQuestionList?.content || [];
  const data: PageResponse<Board> = {
    content: questions.map((q: any) => ({
      id: q.id,
      title: q.title,
      content: q.content,
      createdAt: q.createdAt,
      updatedAt: q.updatedAt,
      author: {
        id: q.userId,
        name: q.userName,
        avatar: q.userProfileImage,
      },
      likes: 0,
      commentCount: 0,
      views: 0,
      status: "OPEN",
      isBookmarked: q.isBookmarked,
    })) as any[],
    totalPages: 1,
    totalElements: questions.length,
    currentPage: page,
    pageSize: size,
  };

  return data;
}
