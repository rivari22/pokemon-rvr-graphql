import { GetServerSidePropsContext } from "next";
import React from "react";
import ContentDetail from "../../components/ContentDetail";
import HeaderDetail from "../../components/HeaderDetail";
import { GET_DETAIL_POKEMON } from "../../graphql/query";
import { client } from "../../graphql/setup";
import { IDetailPokemon } from "../../interface/DetailInterface";
import { bgColor } from "../../styles/Color";

interface IDetailprops {
  data: {
    pokemon: IDetailPokemon;
  };
}

const Detail = ({ data }: IDetailprops) => {
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
