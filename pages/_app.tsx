import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/setup";
import AppTabContext from "../context/TabContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppTabContext>
        <Component {...pageProps} />
      </AppTabContext>
    </ApolloProvider>
  );
}

export default MyApp;
