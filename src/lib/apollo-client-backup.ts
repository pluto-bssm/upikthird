"use client";

import { ApolloClient, InMemoryCache, HttpLink, from, createHttpLink } from '@apollo/client';
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import { getAccessToken } from './auth-utils';

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: any) => {
if (graphQLErrors) {
  graphQLErrors.forEach(({ message, locations, path }: any) => {
    console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    );
  });
}

if (networkError) {
  console.log(`[Network error]: ${networkError}`);
  
  if (networkError.statusCode === 500) {
    console.log('Server error occurred');
  }
}
});

// ✅ 수정된 부분: 완전한 URL 제공
const httpLink = createHttpLink({
uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql',
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
  mutate: {
    errorPolicy: 'all',
  },
},
});

export default apolloClient;
