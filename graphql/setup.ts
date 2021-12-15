import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri = 'https://graphql-pokeapi.vercel.app/api/graphql'
export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});
