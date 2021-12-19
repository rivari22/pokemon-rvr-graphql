import React, { useContext, useEffect } from "react";
import BottomTab from "../components/Tab/BottomTab";
import CardList from "../components/Card/CardList";
import router from "next/router";
import { PokemonContext } from "../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../context/AppPokemonContext/reducer";
import { CardTitle } from "../components/Card";

const MyPokemon = () => {
  const { state: statePokemon, dispatch: dispatchPokemon } =
    useContext(PokemonContext);

  useEffect(() => {
    dispatchPokemon({
      type: PokemonEnumActionType.ALL_POKEMON,
      payload: "",
    });
  }, [dispatchPokemon]);

  return (
    <div className="containerList">
      <CardTitle label="My Pokemon" />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          padding: 16,
        }}
      >
        {statePokemon?.map((pokemon: any, index: number) => {
          const odd = index % 2 === 0;
          return (
            <div
              key={index}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: odd ? "start" : "end",
                alignItems: "center",
              }}
            >
              <CardList
                {...pokemon}
                onClick={() => router.push(`/detail/${pokemon.name}`)}
                isMyPokemon
                odd={odd}
              />
            </div>
          );
        })}
      </div>
      <BottomTab />
    </div>
  );
};

export default MyPokemon;
