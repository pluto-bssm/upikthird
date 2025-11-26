import { upik } from "@/apis";
import type { VotePayload } from "@/types/graphql";
import { GET_MY_VOTE_RESPONSES, GET_VOTE_RESPONSE_DETAIL } from "./query";
import { Storage } from "@/apis/storage/storage";
import { TOKEN } from "@/constants/common/constant";
import { API } from "@/constants/upik";

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

  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_MY_VOTE_RESPONSES,
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const allVotes = response.data?.data?.vote?.getAllVotes || [];
  return allVotes.filter((vote: VotePayload) => vote.hasVoted === true);
}

export async function getVoteResponseDetail(id: string): Promise<VotePayload> {
  const token = Storage.getItem(TOKEN.ACCESS);

  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_VOTE_RESPONSE_DETAIL,
      variables: { voteId: id }, // variables 추가
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const voteData = response.data?.data?.vote?.getVoteById;

  if (!voteData) {
    throw new Error("Vote detail not found");
  }

  return voteData;
}
