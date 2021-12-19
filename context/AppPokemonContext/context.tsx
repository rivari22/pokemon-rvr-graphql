import React, { createContext, Dispatch, FC, useReducer } from "react";
import { PokemonActions, pokemonReducer } from "./reducer";

export interface PokemonInterface {
  id: number | null;
  name: string;
  dreamworld: string;
  nickname?: string;
}

export type InitialPokemonStateType = Array<PokemonInterface>;

export const PokemonContext = createContext<{
  state: null | InitialPokemonStateType;
  dispatch: Dispatch<PokemonActions>;
}>({
  state: null,
  dispatch: () => null,
});

export const PokemonContextProvider = PokemonContext.Provider;
export const PokemonContextConsumer = PokemonContext.Consumer;

const AppPokemonContext: FC = ({ children }) => {
  const [state, dispatch] = useReducer(pokemonReducer, []);
  return (
    <PokemonContextProvider value={{ state, dispatch }}>
      {children}
    </PokemonContextProvider>
  );
};

export default AppPokemonContext;