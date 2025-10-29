import { upik } from '@/apis';
import type { Board, PageResponse } from '@/types/graphql';
import { GET_SAVED_GUIDES, GET_SAVED_POSTS } from './queries';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

const API_URL = 'https://upik-659794985248.asia-northeast3.run.app/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getSavedGuides(page: number, size: number): Promise<PageResponse<Board>> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(API_URL, {
    query: GET_SAVED_GUIDES,
    variables: { page, size },
  } as GraphQLRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data?.data?.bookmark?.getBookmarkedGuides;
  if (!data) {
    throw new Error('Failed to fetch saved guides');
  }
  return data;
}

export async function getSavedPosts(page: number, size: number): Promise<PageResponse<Board>> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(API_URL, {
    query: GET_SAVED_POSTS,
    variables: { page, size },
  } as GraphQLRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data?.data?.bookmark?.getBookmarks;
  if (!data) {
    throw new Error('Failed to fetch saved posts');
  }
  return data;
}
