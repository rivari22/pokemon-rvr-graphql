import { useQuery } from "@apollo/client";
import CardList from "../components/Card/CardList";
import router from "next/router";
import { GET_POKEMONS } from "../graphql/query";
import BottomTab from "../components/Tab/BottomTab";
import { Loading } from "../components/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";

const gqlVariables = {
  limit: 10,
  offset: 0,
};

interface PokemonData {
  id: number;
  name: string;
  dreamworld: string;
  count?: number;
}

const Home = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });
  const [dataPokemon, setDataPokemon] = useState<Array<PokemonData>>();

  useEffect(() => {
    const pokemons = localStorage.getItem("pokemon");
    if (pokemons && data) {
      const pokemonState = JSON.parse(pokemons);
      const newData = data.pokemons.results.map((pokemon: any) => {
        const res: {
          id: number;
          name: string;
          dreamworld: string;
          count?: number;
        } = {
          id: pokemon.id,
          name: pokemon.name,
          dreamworld: pokemon.dreamworld,
          count: 0,
        };

        pokemonState.forEach((item: any) => {
          if (pokemon.name === item.name)
            res.count !== undefined && res.count++;
        });

        if (res.count === 0) {
          delete res.count;
        }

        return res;
      });

      setDataPokemon(newData);
    } else if (data) {
      setDataPokemon(data.pokemons.results);
    }
  }, [data]);

  if (loading && !dataPokemon) return <Loading isLoading={loading} />;

  if (error) return `Error! ${error.message}`;

  return (
    <div className="containerList">
      <InfiniteScroll
        style={{ display: "flex", flexWrap: "wrap", padding: 16 }}
        dataLength={dataPokemon?.length || 0}
        next={() =>
          fetchMore({
            variables: {
              limit: 10,
              offset: data.pokemons.results.length,
            },
            updateQuery: (
              prev,
              { fetchMoreResult }: { fetchMoreResult?: any }
            ) => {
              if (!fetchMoreResult) return prev;

              return {
                pokemons: {
                  __typename: "PokemonList",
                  count: fetchMoreResult.pokemons.count,
                  next: fetchMoreResult.pokemons.next,
                  previous: fetchMoreResult.pokemons.previous,
                  status: fetchMoreResult.pokemons.status,
                  message: fetchMoreResult.pokemons.message,
                  results: [
                    ...prev.pokemons.results,
                    ...fetchMoreResult.pokemons.results,
                  ],
                },
              };
            },
          })
        }
        hasMore={true}
        loader={<Loading isLoading />}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {dataPokemon?.map((pokemon: any, index: number) => {
          const odd = index % 2 === 0;
          return (
            <div
              key={pokemon.id}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: odd ? "start" : "end",
                alignItems: "center",
              }}
            >
              <CardList
                {...pokemon}
                odd={odd}
                onClick={() => router.push(`/detail/${pokemon.name}`)}
              />
            </div>
          );
        })}
      </InfiniteScroll>
      <BottomTab />
    </div>
  );
};

export default Home;
