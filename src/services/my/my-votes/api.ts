import { GET_MY_VOTES } from './query';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/graphql';

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
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: GET_MY_VOTES,
    }),
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}`);
  }

  const data: GetMyVotesResponse = await response.json();
  return data.vote.getMyVotes;
};
