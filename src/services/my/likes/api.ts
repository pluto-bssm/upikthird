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

    // ✅ 여기가 문제! getQuestionList → getBookmarkedQuestions 로 변경
    const result = response.data?.data?.board?.getBookmarkedQuestions;
    const questions = result?.content || [];

    const data: PageResponse<Board> = {
        content: questions.map((q: unknown) => {
            const qq = q as Record<string, unknown>;
            return {
                id: String(qq.id ?? ""),
                title: String(qq.title ?? ""),
                content: String(qq.content ?? ""),
                createdAt: String(qq.createdAt ?? ""),
                updatedAt: String(qq.updatedAt ?? ""),
                author: {
                    id: String(qq.userId ?? ""),
                    name: String(qq.userName ?? ""),
                    avatar: String(qq.userProfileImage ?? ""),
                },
                likes: Number(qq.bookmarkCount ?? 0),      // bookmarkCount 매핑
                commentCount: Number(qq.commentCount ?? 0), // commentCount 매핑
                views: Number(qq.viewCount ?? 0),           // viewCount 매핑
                status: "OPEN",
                isBookmarked: Boolean(qq.isBookmarked),
            } as Board;
        }),
        totalPages: result?.totalPages ?? 1,
        totalElements: result?.totalElements ?? questions.length,
        currentPage: page,
        pageSize: size,
    };

    return data;
}