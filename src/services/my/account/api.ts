import { upik } from '@/apis';
import type { User } from '@/types/graphql';
import { GET_CURRENT_USER } from './queries';
import { Storage } from '@/apis/storage/storage';
import { TOKEN } from '@/constants/common/constant';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getCurrentUser(): Promise<User> {
  const token = Storage.getItem(TOKEN.ACCESS);
  const response = await upik.post(
    API_URL,
    {
      query: GET_CURRENT_USER,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = response.data?.data?.iam?.getCurrentUser;
  if (!data) {
    throw new Error('Failed to fetch current user');
  }
  return data;
}