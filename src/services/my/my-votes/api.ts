import { GET_MY_VOTES } from "./query";
import { API } from "@/constants/upik";

export interface MyVote {
  category: string;
  finishedAt: string;
  hasVoted: boolean;
  id: string;
  status: string;
  title: string;
  totalResponses: number;
}

export interface GetMyVotesResponse {
  vote: {
    getMyVotes: MyVote[];
  };
}

export const getMyVotes = async (): Promise<MyVote[]> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const response = await fetch(API.GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      query: GET_MY_VOTES,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed with status ${response.status} ${errorText}`);
  }

  const data: GetMyVotesResponse = await response.json();
  return data.vote.getMyVotes;
};
