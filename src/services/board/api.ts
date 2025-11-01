import { upik } from "@/apis";
import type {
  Board,
  CommentPage,
  Comment,
  CreateQuestionInput,
  UpdateQuestionInput,
  CreateCommentInput,
  PageResponse,
  PaginationParams,
} from "@/types/graphql";
import {
  GET_QUESTION_LIST,
  GET_QUESTION_DETAIL,
  GET_COMMENTS,
  SEARCH_QUESTIONS,
} from "./queries";
import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  CREATE_COMMENT,
  REPORT_BOARD,
  REPORT_COMMENT,
} from "./mutations";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getQuestionList(
  pagination: PaginationParams,
): Promise<PageResponse<Board>> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: GET_QUESTION_LIST,
    variables: { page: pagination.page, size: pagination.size },
  } as GraphQLRequest);

  const questions = response.data?.data?.board?.getQuestionList?.content || [];
  const totalPages =
    response.data?.data?.board?.getQuestionList?.totalPages || 1;
  const totalElements =
    response.data?.data?.board?.getQuestionList?.totalElements ||
    questions.length;

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
      views: q.viewCount || 0,
      likes: 0,
      commentCount: q.commentCount || 0,
      status: "OPEN",
      isBookmarked: q.isBookmarked,
      bookmarkCount: q.bookmarkCount || 0,
    })) as any[],
    totalPages: totalPages,
    totalElements: totalElements,
    currentPage: pagination.page,
    pageSize: pagination.size,
  };

  return data;
}

export async function getQuestionDetail(boardId: string): Promise<Board> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: GET_QUESTION_DETAIL,
    variables: { boardId },
  } as GraphQLRequest);

  const question = response.data?.data?.board?.getQuestionDetail;
  if (!question) {
    throw new Error("Question not found");
  }

  const data: Board = {
    id: question.id,
    title: question.title,
    content: question.content || "",
    createdAt: question.createdAt || new Date().toISOString(),
    updatedAt: question.updatedAt,
    author: {
      id: question.userId,
      name: question.userName,
      avatar: question.userProfileImage,
    },
    views: question.viewCount || 0,
    commentCount: question.commentCount || 0,
    likes: 0,
    status: "OPEN",
    isBookmarked: question.isBookmarked,
    bookmarkCount: question.bookmarkCount || 0,
  };

  return data;
}

export async function getComments(
  boardId: string,
  pagination: PaginationParams,
): Promise<CommentPage> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: GET_COMMENTS,
    variables: { boardId, page: pagination.page, size: pagination.size },
  } as GraphQLRequest);

  const comments = response.data?.data?.board?.getComments?.content || [];
  const totalPages = response.data?.data?.board?.getComments?.totalPages || 1;
  const totalElements =
    response.data?.data?.board?.getComments?.totalElements || comments.length;

  const mapComment = (c: any): Comment => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    userId: c.userId,
    userName: c.userName,
    userProfileImage: c.userProfileImage,
    boardId: c.boardId,
    parentId: c.parentId,
    author: {
      id: c.userId,
      name: c.userName,
      avatar: c.userProfileImage,
    },
    replies:
      c.replies && c.replies.length > 0 ? c.replies.map(mapComment) : undefined,
    likes: 0,
  });

  const data: CommentPage = {
    content: comments.map(mapComment),
    totalPages: totalPages,
    totalElements: totalElements,
    currentPage: pagination.page,
    pageSize: pagination.size,
  };

  return data;
}

export async function searchQuestions(
  keyword: string,
  pagination: PaginationParams,
): Promise<PageResponse<Board>> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: SEARCH_QUESTIONS,
    variables: { keyword, page: pagination.page, size: pagination.size },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.searchQuestions;
  if (!data) {
    throw new Error("Failed to search questions");
  }
  return data;
}

export async function createQuestion(
  input: CreateQuestionInput,
): Promise<Board> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: CREATE_QUESTION,
    variables: { input },
  } as GraphQLRequest);

  const question = response.data?.data?.board?.createQuestion;
  if (!question) {
    throw new Error("Failed to create question");
  }

  const data: Board = {
    id: question.id,
    title: question.title,
    content: question.content,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
    author: {
      id: question.userId,
      name: question.userName,
      avatar: question.userProfileImage,
    },
    views: question.viewCount || 0,
    likes: 0,
    commentCount: question.commentCount || 0,
    status: "OPEN",
    isBookmarked: question.isBookmarked || false,
    bookmarkCount: question.bookmarkCount || 0,
  };

  return data;
}

export async function updateQuestion(
  boardId: string,
  input: UpdateQuestionInput,
): Promise<Board> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: UPDATE_QUESTION,
    variables: { boardId, input },
  } as GraphQLRequest);

  const question = response.data?.data?.board?.updateQuestion;
  if (!question) {
    throw new Error("Failed to update question");
  }

  const data: Board = {
    id: question.id,
    title: question.title,
    content: question.content,
    createdAt: question.createdAt,
    updatedAt: question.updatedAt,
    author: {
      id: question.userId,
      name: question.userName,
      avatar: question.userProfileImage,
    },
    views: question.viewCount || 0,
    likes: 0,
    commentCount: question.commentCount || 0,
    status: "OPEN",
    isBookmarked: question.isBookmarked || false,
    bookmarkCount: question.bookmarkCount || 0,
  };

  return data;
}

export async function deleteQuestion(boardId: string): Promise<boolean> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: DELETE_QUESTION,
    variables: { boardId },
  } as GraphQLRequest);

  const result = response.data?.data?.board?.deleteQuestion;
  if (!result) {
    throw new Error("Failed to delete question");
  }
  return true;
}

export async function createComment(
  input: CreateCommentInput,
): Promise<Comment> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: CREATE_COMMENT,
    variables: { input },
  } as GraphQLRequest);

  const comment = response.data?.data?.board?.createComment;
  if (!comment) {
    throw new Error("Failed to create comment");
  }

  const mapComment = (c: any): Comment => ({
    id: c.id,
    content: c.content,
    createdAt: c.createdAt,
    updatedAt: c.updatedAt,
    userId: c.userId,
    userName: c.userName,
    userProfileImage: c.userProfileImage,
    boardId: c.boardId,
    parentId: c.parentId,
    author: {
      id: c.userId,
      name: c.userName,
      avatar: c.userProfileImage,
    },
    likes: 0,
    replies: c.replies?.map(mapComment) || [],
  });

  return mapComment(comment);
}

export async function reportBoard(
  boardId: string,
  reason: string,
  detail: string,
): Promise<boolean> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: REPORT_BOARD,
    variables: { boardId, reason, detail },
  } as GraphQLRequest);

  const result = response.data?.data?.board?.reportBoard;
  if (!result) {
    throw new Error("Failed to report question");
  }
  return true;
}

export async function reportComment(
  commentId: string,
  reason: string,
  detail: string,
): Promise<boolean> {
  const response = await upik.post(API.GRAPHQL_URL, {
    query: REPORT_COMMENT,
    variables: { commentId, reason, detail },
  } as GraphQLRequest);

  const result = response.data?.data?.board?.reportComment;
  if (!result) {
    throw new Error("Failed to report comment");
  }
  return true;
}
