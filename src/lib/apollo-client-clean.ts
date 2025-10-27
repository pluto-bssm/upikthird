"use client";

import { ApolloClient, InMemoryCache, HttpLink, from, createHttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './auth-utils';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: any) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }: any) => {
    });
  }
  
  if (networkError) {
    if (networkError.statusCode === 500) {
    }
  }
});

const httpLink = createHttpLink({
  uri: 'https://realupik-659794985248.asia-northeast3.run.app/graphql',
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});

export default apolloClient;
