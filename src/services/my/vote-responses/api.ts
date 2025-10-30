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

  const data = response.data?.data?.vote?.getMyVotes || [];

  return data;
}

export async function getVoteResponseDetail(id: string): Promise<VotePayload> {
  const token = Storage.getItem(TOKEN.ACCESS);

  const response = await upik.post(
    API.GRAPHQL_URL,
    {
      query: GET_VOTE_RESPONSE_DETAIL,
      variables: { id },
    } as GraphQLRequest,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const data = response.data?.data?.vote?.getVoteById;
  if (!data) {
    throw new Error("Vote detail not found");
  }

  return data;
}
