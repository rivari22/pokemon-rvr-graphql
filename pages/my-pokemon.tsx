import styles from "../styles/Home.module.css";
import React, { useContext, useEffect } from "react";
import BottomTab from "../components/Tab/BottomTab";
import CardList from "../components/Card/CardList";
import router from "next/router";
import { PokemonContext } from "../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../context/AppPokemonContext/reducer";
import { CardName } from "../components/Card";

const MyPokemon = () => {
  const { state: statePokemon } = useContext(PokemonContext);

  return (
    <div className={styles.container}>
      <BottomTab />
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
              {!odd && <CardName label={pokemon.username} />}
              <CardList
                {...pokemon}
                onClick={() => router.push(`/detail/${pokemon.name}`)}
                isMyPokemon
              />
              {odd && <CardName label={pokemon.username} />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyPokemon;
