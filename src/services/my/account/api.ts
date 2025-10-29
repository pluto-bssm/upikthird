import { upik } from '@/apis';
import type { User } from '@/types/graphql';
import { GET_MY_USER } from './queries';

const API_URL = 'https://upik-659794985248.asia-northeast3.run.app/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getMyUser(): Promise<User> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  console.log('═════════════════════════════════════');
  console.log('📤 [getMyUser] API 요청 시작');
  console.log('═════════════════════════════════════');
  
  console.log('🔑 Token from localStorage:', token ? `✅ Found (${token.substring(0, 50)}...)` : '❌ NO TOKEN');
  console.log('📋 GraphQL Query:', GET_MY_USER);
  
  const requestBody = {
    query: GET_MY_USER,
  } as GraphQLRequest;
  
  console.log('📦 POST Request Body:', JSON.stringify(requestBody, null, 2));
  console.log('🌐 API Endpoint:', API_URL);
  console.log('🔐 Headers:', JSON.stringify({
    'Authorization': `Bearer ${token ? token.substring(0, 50) + '...' : 'NO TOKEN'}`,
    'Content-Type': 'application/json'
  }, null, 2));
  
  console.log('------- POST 요청 전송 -------');
  
  const response = await upik.post(API_URL, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('------- 응답 수신 -------');
  console.log('📥 Response Status:', response.status || '200');
  console.log('📊 Full Response Data:', JSON.stringify(response.data, null, 2));
  
  const data = response.data?.data?.iam?.getCurrentUser;
  
  console.log('✨ 추출된 User 데이터:', JSON.stringify(data, null, 2));
  
  if (!data) {
    console.error('❌ ERROR: User data not found in response');
    console.error('Response 구조:', {
      'response.data': response.data,
      'response.data.data': response.data?.data,
      'response.data.data.iam': response.data?.data?.iam,
      'response.data.data.iam.getCurrentUser': response.data?.data?.iam?.getCurrentUser
    });
    throw new Error('Failed to fetch my user');
  }
  
  console.log('✅ [getMyUser] 성공');
  console.log('═════════════════════════════════════');
  return data;
}
