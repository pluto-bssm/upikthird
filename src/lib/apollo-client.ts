"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  from,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

const errorLink = onError(({ graphQLErrors, networkError }: any) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }: any) =>
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const authLink = setContext((_, { headers }) => {
  // 토큰을 localStorage에서 가져오거나 환경변수에서 가져오기
  let token = "";

  if (typeof window !== "undefined") {
    // 클라이언트 사이드에서 localStorage에서 토큰 가져오기
    token = localStorage.getItem("authToken") || "";
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
  "https://upik-659794985248.asia-northeast3.run.app/graphql";

// URL 정규화 함수
const normalizeUrl = (url: string) => {
  try {
    const normalized = new URL(url);
    return normalized.toString();
  } catch (e) {
    console.error("Invalid GraphQL endpoint URL:", e);
    return url;
  }
};

const httpLink = new HttpLink({
  uri: normalizeUrl(GRAPHQL_ENDPOINT),
  credentials: "include",
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
  },
});

export default apolloClient;
