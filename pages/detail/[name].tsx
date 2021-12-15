import { GetServerSidePropsContext } from "next";
import router from "next/router";
import React from "react";
import { GET_DETAIL_POKEMON } from "../../graphql/query";
import { client } from "../../graphql/setup";

interface Props {
  data: any | null;
}

const Detail = ({ data }: Props) => {
  console.log(data, "apa ini data");
  return <div onClick={() => router.back()}>detail page</div>;
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
