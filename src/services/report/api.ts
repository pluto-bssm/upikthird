import { upik } from "@/apis";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface ReportBoardData {
  boardId: string;
  reason: string;
  detail: string;
}

export interface ReportCommentData {
  commentId: string;
  reason: string;
  detail: string;
}

const REPORT_BOARD_MUTATION = `
  mutation ReportBoard($boardId: ID!, $detail: String!, $reason: String!) {
    board {
      reportBoard(boardId: $boardId, detail: $detail, reason: $reason)
    }
  }
`;

const REPORT_COMMENT_MUTATION = `
  mutation ReportComment($commentId: ID!, $detail: String!, $reason: String!) {
    board {
      reportComment(commentId: $commentId, detail: $detail, reason: $reason)
    }
  }
`;

export const reportBoard = async (data: ReportBoardData) => {
  try {
    const response = await upik.post(API.GRAPHQL_URL, {
      query: REPORT_BOARD_MUTATION,
      variables: {
        boardId: data.boardId,
        detail: data.detail,
        reason: data.reason,
      },
    } as GraphQLRequest);

    const result = response.data?.data?.board?.reportBoard;
    return { success: true, result };
  } catch (error) {
    throw error;
  }
};

export const reportComment = async (data: ReportCommentData) => {
  try {
    const response = await upik.post(API.GRAPHQL_URL, {
      query: REPORT_COMMENT_MUTATION,
      variables: {
        commentId: data.commentId,
        detail: data.detail,
        reason: data.reason,
      },
    } as GraphQLRequest);

    const result = response.data?.data?.board?.reportComment;
    return { success: true, result };
  } catch (error) {
    throw error;
  }
};
