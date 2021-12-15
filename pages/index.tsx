import styles from "../styles/Home.module.css";
import { gql, useQuery } from "@apollo/client";
import CardList from "../components/Card/CardList";
import router from "next/router";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        id
        url
        name
        image
        dreamworld
      }
    }
  }
`;

const gqlVariables = {
  limit: 8,
  offset: 1,
};

const Home = () => {
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  const handleGoDetail = (name: string) => {
    router.push(`/detail/${name}`)
  }

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
                width: "368px",
                display: "flex",
                justifyContent: odd ? "start" : "end",
                alignItems: 'center'
              }}
              onClick={() => handleGoDetail(pokemon.name)}
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
