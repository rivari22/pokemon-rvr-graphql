import { probabilityAddPokemon } from "../../utils/probabilityAddPokemon";
import { InitialPokemonStateType, PokemonInterface } from "./context";

export enum PokemonEnumActionType {
  ALL_POKEMON = "ALL_POKEMON",
  ADD_POKEMON = "ADD_POKEMON",
  REMOVE_POKEMON = "REMOVE_POKEMON",
}

export type PokemonActions = {
  type: PokemonEnumActionType;
  // FIXME ANY
  payload: any;
};

export const pokemonReducer = (
  state: InitialPokemonStateType,
  action: PokemonActions
) => {
  const pokemons = localStorage.getItem("pokemon");
  switch (action.type) {
    case PokemonEnumActionType.ALL_POKEMON:
      if (pokemons) return [...JSON.parse(pokemons)];
      return state;
    case PokemonEnumActionType.ADD_POKEMON:
      if (pokemons && action.payload) {
        const data = JSON.parse(pokemons);
        data.push(action.payload);
        localStorage.setItem("pokemon", JSON.stringify(data));
        return [...state, action.payload];
      } else if (!pokemons && action.payload) {
        localStorage.setItem("pokemon", JSON.stringify([action.payload]));
        return [...state, action.payload];
      }
    case PokemonEnumActionType.REMOVE_POKEMON:
      if (action.payload) {
        const filterMyPokemon = state.filter(
          (item) => item.nickname !== action.payload
        );
        localStorage.setItem("pokemon", JSON.stringify(filterMyPokemon));
        return filterMyPokemon;
      }
    default:
      return state;
  }
};
