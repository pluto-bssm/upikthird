import { upik } from "@/apis";
import type { User } from "@/types/graphql";
import { GET_MY_USER } from "./queries";
import { API } from "@/constants/upik";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getMyUser(): Promise<User> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const requestBody = {
    query: GET_MY_USER,
  } as GraphQLRequest;

  const response = await upik.post(API.GRAPHQL_URL, requestBody, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.data?.data?.iam?.getCurrentUser;

  if (!data) {
    throw new Error("Failed to fetch my user");
  }
  return data;
}
