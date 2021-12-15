/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";
import ground from "../../public/images/groundrm.png";

interface ICardListProps {
  name: string;
  dreamworld: string;
}

const ContainerCard = styled.div`
  padding: 8px;
  width: 160px;
  height: 180px;
`;

const CardList = (props: ICardListProps) => {
  return (
    <ContainerCard>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={props.dreamworld}
          alt="pokemon list"
          width={120}
          height={120}
          style={{ position: "absolute", zIndex: 99 }}
        />
      </div>
      <Image src={ground} width={700} height={700} alt="ground" />
    </ContainerCard>
  );
};

export default CardList;
