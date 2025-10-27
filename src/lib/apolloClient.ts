import { ApolloClient, InMemoryCache } from "@apollo/client";
import { HttpLink } from "@apollo/client/link/http";

const httpLinks = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_BACKEND_URL}graphql`,
});

const client = new ApolloClient({
  link: httpLinks,
  cache: new InMemoryCache(),
});

export default client;