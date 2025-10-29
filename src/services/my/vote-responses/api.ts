import { upik } from '@/apis';
import type { VotePayload } from '@/types/graphql';
import { GET_MY_VOTE_RESPONSES, GET_VOTE_RESPONSE_DETAIL } from './query';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

const API_URL = 'https://upik-659794985248.asia-northeast3.run.app/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export interface GetMyVoteResponsesResponse {
  vote: {
    getMyVotes: VotePayload[];
  };
}

export interface GetVoteDetailResponse {
  vote: {
    getVoteById: VotePayload;
  };
}

export async function getMyVoteResponses(): Promise<VotePayload[]> {
  const token = Storage.getItem(TOKEN.ACCESS);
  
  console.log('═════════════════════════════════════');
  console.log('📤 [getMyVoteResponses] API 요청 시작');
  console.log('═════════════════════════════════════');
  console.log('🔑 Token:', token ? `✅ Found` : '❌ NO TOKEN');
  console.log('🌐 API Endpoint:', API_URL);
  
  const response = await upik.post(API_URL, {
    query: GET_MY_VOTE_RESPONSES,
  } as GraphQLRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data?.data?.vote?.getMyVotes || [];
  console.log('📊 My Vote Responses Data:', JSON.stringify(data, null, 2));
  console.log('✅ [getMyVoteResponses] 성공');
  return data;
}

export async function getVoteResponseDetail(id: string): Promise<VotePayload> {
  const token = Storage.getItem(TOKEN.ACCESS);
  
  console.log('═════════════════════════════════════');
  console.log('📤 [getVoteResponseDetail] API 요청 시작');
  console.log('═════════════════════════════════════');
  console.log('🔑 Token:', token ? `✅ Found` : '❌ NO TOKEN');
  console.log('🌐 API Endpoint:', API_URL);
  console.log('📋 Vote ID:', id);
  
  const response = await upik.post(API_URL, {
    query: GET_VOTE_RESPONSE_DETAIL,
    variables: { id },
  } as GraphQLRequest, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data?.data?.vote?.getVoteById;
  if (!data) {
    throw new Error('Vote detail not found');
  }
  console.log('📊 Vote Detail Data:', JSON.stringify(data, null, 2));
  console.log('✅ [getVoteResponseDetail] 성공');
  return data;
}
