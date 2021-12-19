import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = process.env.GRAPHQL_URL
export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
