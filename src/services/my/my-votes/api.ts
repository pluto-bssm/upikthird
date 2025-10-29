import { GET_MY_VOTES } from './query';

const API_URL = 'https://upik-659794985248.asia-northeast3.run.app/graphql';

export interface VoteOption {
  content: string;
  id: string;
  percentage: number;
  responseCount: number;
}

export interface MyVote {
  category: string;
  finishedAt: string;
  hasVoted: boolean;
  id: string;
  status: string;
  title: string;
  totalResponses: number;
  options: VoteOption[];
}

export interface GetMyVotesResponse {
  vote: {
    getMyVotes: MyVote[];
  };
}

export const getMyVotes = async (): Promise<MyVote[]> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  console.log('═════════════════════════════════════');
  console.log('📤 [getMyVotes] API 요청 시작');
  console.log('═════════════════════════════════════');
  console.log('🔑 Token from localStorage:', token ? `✅ Found (${token.substring(0, 50)}...)` : '❌ NO TOKEN');
  console.log('🌐 API Endpoint:', API_URL);
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query: GET_MY_VOTES,
    }),
  });

  console.log('📥 Response Status:', response.status);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ API Error:', errorText);
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data: GetMyVotesResponse = await response.json();
  console.log('📊 Response Data:', JSON.stringify(data, null, 2));
  console.log('✅ [getMyVotes] 성공');
  return data.vote.getMyVotes;
};
