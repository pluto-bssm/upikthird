import { upik } from '@/apis';
import type { 
  Board, 
  CommentPage, 
  Comment, 
  CreateQuestionInput,
  UpdateQuestionInput,
  CreateCommentInput,
  PageResponse,
  PaginationParams,
} from '@/types/graphql';
import {
  GET_QUESTION_LIST,
  GET_QUESTION_DETAIL,
  GET_COMMENTS,
  SEARCH_QUESTIONS,
} from './queries';
import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
  DELETE_QUESTION,
  CREATE_COMMENT,
  REPORT_BOARD,
  REPORT_COMMENT,
} from './mutations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getQuestionList(pagination: PaginationParams): Promise<PageResponse<Board>> {
  const response = await upik.post(API_URL, {
    query: GET_QUESTION_LIST,
    variables: { ...pagination },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.getQuestionList;
  if (!data) {
    throw new Error('Failed to fetch question list');
  }
  return data;
}

export async function getQuestionDetail(boardId: string): Promise<Board> {
  const response = await upik.post(API_URL, {
    query: GET_QUESTION_DETAIL,
    variables: { boardId },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.getQuestionDetail;
  if (!data) {
    throw new Error('Question not found');
  }
  return data;
}

export async function getComments(
  boardId: string,
  pagination: PaginationParams
): Promise<CommentPage> {
  const response = await upik.post(API_URL, {
    query: GET_COMMENTS,
    variables: { boardId, ...pagination },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.getComments;
  if (!data) {
    throw new Error('Failed to fetch comments');
  }
  return data;
}

export async function searchQuestions(
  keyword: string,
  pagination: PaginationParams
): Promise<PageResponse<Board>> {
  const response = await upik.post(API_URL, {
    query: SEARCH_QUESTIONS,
    variables: { keyword, ...pagination },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.searchQuestions;
  if (!data) {
    throw new Error('Failed to search questions');
  }
  return data;
}

export async function createQuestion(input: CreateQuestionInput): Promise<Board> {
  const response = await upik.post(API_URL, {
    query: CREATE_QUESTION,
    variables: { input },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.createQuestion;
  if (!data) {
    throw new Error('Failed to create question');
  }
  return data;
}

export async function updateQuestion(
  boardId: string,
  input: UpdateQuestionInput
): Promise<Board> {
  const response = await upik.post(API_URL, {
    query: UPDATE_QUESTION,
    variables: { boardId, input },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.updateQuestion;
  if (!data) {
    throw new Error('Failed to update question');
  }
  return data;
}

export async function deleteQuestion(boardId: string): Promise<boolean> {
  const response = await upik.post(API_URL, {
    query: DELETE_QUESTION,
    variables: { boardId },
  } as GraphQLRequest);

  const success = response.data?.data?.board?.deleteQuestion;
  if (!success) {
    throw new Error('Failed to delete question');
  }
  return true;
}

export async function createComment(input: CreateCommentInput): Promise<Comment> {
  const response = await upik.post(API_URL, {
    query: CREATE_COMMENT,
    variables: { input },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.createComment;
  if (!data) {
    throw new Error('Failed to create comment');
  }
  return data;
}

export async function reportBoard(
  boardId: string,
  reason: string,
  detail: string
): Promise<boolean> {
  const response = await upik.post(API_URL, {
    query: REPORT_BOARD,
    variables: { boardId, reason, detail },
  } as GraphQLRequest);

  const result = response.data?.data?.board?.reportBoard;
  if (!result?.success) {
    throw new Error(result?.message || 'Failed to report question');
  }
  return true;
}

export async function reportComment(
  commentId: string,
  reason: string,
  detail: string
): Promise<boolean> {
  const response = await upik.post(API_URL, {
    query: REPORT_COMMENT,
    variables: { commentId, reason, detail },
  } as GraphQLRequest);

  const result = response.data?.data?.board?.reportComment;
  if (!result?.success) {
    throw new Error(result?.message || 'Failed to report comment');
  }
  return true;
}
