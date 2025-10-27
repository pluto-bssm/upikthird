import { upik } from '@/apis';
import type { VotePayload, CreateVoteResponseInput } from '@/types/graphql';
import { GET_MY_VOTES, GET_VOTE_BY_ID, GET_ALL_VOTES } from './queries';
import { CREATE_VOTE_RESPONSE } from './mutations';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/graphql';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}
export async function getMyVotes(): Promise<VotePayload[]> {
  const response = await upik.post(API_URL, {
    query: GET_MY_VOTES,
  } as GraphQLRequest);

  const votes = response.data?.data?.vote?.getMyVotes || [];
  return votes;
}

export async function getVoteById(id: string): Promise<VotePayload> {
  const response = await upik.post(API_URL, {
    query: GET_VOTE_BY_ID,
    variables: { id },
  } as GraphQLRequest);

  const vote = response.data?.data?.vote?.getVoteById;
  if (!vote) {
    throw new Error('Vote not found');
  }
  return vote;
}

export async function getAllVotes(): Promise<VotePayload[]> {
  const response = await upik.post(API_URL, {
    query: GET_ALL_VOTES,
  } as GraphQLRequest);

  const votes = response.data?.data?.vote?.getAllVotes || [];
  return votes;
}

export async function createVoteResponse(input: CreateVoteResponseInput): Promise<boolean> {
  const response = await upik.post(API_URL, {
    query: CREATE_VOTE_RESPONSE,
    variables: { input },
  } as GraphQLRequest);

  const result = response.data?.data?.voteResponse?.createVoteResponse;
  if (!result?.success) {
    throw new Error(result?.message || 'Failed to create vote response');
  }
  return true;
}