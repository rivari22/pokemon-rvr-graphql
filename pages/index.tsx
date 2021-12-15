import styles from "../styles/Home.module.css";
import { useQuery } from "@apollo/client";
import CardList from "../components/Card/CardList";
import router from "next/router";
import { GET_POKEMONS } from "../graphql/query";

const gqlVariables = {
  limit: 8,
  offset: 1,
};

const Home = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  console.log(data, "apa ini le");

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {data?.pokemons.results.map((pokemon: any, index: number) => {
          const odd = index % 2 === 0;
          return (
            <div
              key={pokemon.id}
              style={{
                width: "100%",
                backgroundColor: 'black',
                display: "flex",
                justifyContent: odd ? "start" : "end",
                alignItems: 'center'
              }}
              onClick={() => router.push(`/detail/${pokemon.name}`)}
            >
              {!odd && <div>{pokemon.name}</div>}
              <CardList {...pokemon} />
              {odd && <div>{pokemon.name}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
