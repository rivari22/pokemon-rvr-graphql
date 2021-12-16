import { GetServerSidePropsContext } from "next";
import React, { useMemo } from "react";
import ContentDetail from "../../components/ContentDetail";
import HeaderDetail from "../../components/HeaderDetail";
import { GET_DETAIL_POKEMON } from "../../graphql/query";
import { client } from "../../graphql/setup";
import { bgColor } from "../../styles/Color";

type NameTypes = "grass" | "poison" | "fire" | "water" | "bug" | "electric";
export interface IDetailPokemon {
  id: number;
  name: string;
  order: number;
  types: Array<{
    type: {
      name: NameTypes;
    };
  }>;
  sprites: {
    front_default: string;
  };
  species: {
    name: string;
    url: string;
  };
  height: number;
  weight: number;
  abilities: Array<{
    ability: {
      name: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}
interface Props {
  data: {
    pokemon: IDetailPokemon;
  };
}

const Detail = ({ data }: Props) => {
  return (
    <div
      style={{
        maxWidth: "400px",
        border: "1px solid #ccc",
        backgroundColor: bgColor[data.pokemon.types[0].type.name] || '#49D0B0',
      }}
    >
      <HeaderDetail {...data.pokemon} />
      <ContentDetail {...data.pokemon} />
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { name } = context.query;

  const { data } = await client.query({
    query: GET_DETAIL_POKEMON,
    variables: {
      name,
    },
  });

  return {
    props: {
      data,
    },
  };
}

export default Detail;
