import { upik } from '@/apis';
import type { Board } from '@/types/graphql';
import { GET_MY_POSTS } from './query';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

const API_URL = 'https://upik-659794985248.asia-northeast3.run.app/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface GetMyPostsResponse {
  board: {
    getMyPosts: Board[];
  };
}

export async function getMyPosts(): Promise<Board[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  
  console.log('═════════════════════════════════════');
  console.log('📤 [getMyPosts] API 요청 시작');
  console.log('═════════════════════════════════════');
  console.log('🔑 Token from localStorage:', token ? `✅ Found (${token.substring(0, 50)}...)` : '❌ NO TOKEN');
  console.log('🌐 API Endpoint:', API_URL);
  
  const response = await upik.post(API_URL, {
    query: GET_MY_POSTS,
  } as GraphQLRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('📥 Response Status:', response.status);
  const data = response.data?.data?.board?.getMyPosts || [];
  console.log('📊 My Posts Data:', JSON.stringify(data, null, 2));
  console.log('✅ [getMyPosts] 성공');
  return data;
}
