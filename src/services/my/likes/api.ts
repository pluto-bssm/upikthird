import { upik } from '@/apis';
import type { Board, PageResponse } from '@/types/graphql';
import { GET_LIKED_QUESTIONS } from './queries';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getLikedQuestions(page: number, size: number): Promise<PageResponse<Board>> {
  const response = await upik.post(API_URL, {
    query: GET_LIKED_QUESTIONS,
    variables: { page, size },
  } as GraphQLRequest);

  const data = response.data?.data?.board?.getLikedQuestions;
  if (!data) {
    throw new Error('Failed to fetch liked questions');
  }
  return data;
}
