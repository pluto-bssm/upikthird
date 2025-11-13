import { upik } from "@/apis";
import type { User } from "@/types/graphql";
import { GET_MY_USER } from "./queries";
import { API } from "@/constants/upik";
import { authorization } from "@/apis/token";

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

export async function getMyUser(): Promise<User> {
  const requestBody = {
    query: GET_MY_USER,
  } as GraphQLRequest;

  const response = await upik.post(
    API.GRAPHQL_URL,
    requestBody,
    authorization()
  );

  const data = response.data?.data?.iam?.getCurrentUser;

  if (!data) {
    throw new Error("Failed to fetch my user");
  }
  return data;
}
