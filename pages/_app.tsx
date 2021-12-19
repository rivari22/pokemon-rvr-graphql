import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/setup";
import { AppPokemonContext } from "../context/AppPokemonContext";
import { AppTabContext } from "../context/AppTabContext";
import ReactModal from "react-modal";

if (process.env.NODE_ENV !== 'test') ReactModal.setAppElement("#__next");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <AppPokemonContext>
        <AppTabContext>
          <Component {...pageProps} />
        </AppTabContext>
      </AppPokemonContext>
    </ApolloProvider>
  );
}

export default MyApp;
