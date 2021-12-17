/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useContext } from "react";
import { PokemonContext } from "../../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../../context/AppPokemonContext/reducer";
import ground from "../../public/images/groundrm.png";

interface ICardListProps {
  name: string;
  dreamworld: string;
  onClick: () => void;
  isMyPokemon?: boolean;
  username?: string;
}

const ContainerCard = styled.div`
  padding: 8px;
  width: 160px;
  height: 180px;
  position: relative;
`;

const CardList = (props: ICardListProps) => {
  const { dispatch: dispatchPokemon } = useContext(PokemonContext);

  return (
    <ContainerCard>
      {props.isMyPokemon && (
        <svg
          style={{ marginLeft: "auto", position: "absolute", right: 0 }}
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
          className="hoverPointer"
          onClick={() => dispatchPokemon({
            type: PokemonEnumActionType.REMOVE_POKEMON,
            payload: props.username
          })}
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
        </svg>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img
          src={props.dreamworld}
          alt="pokemon list"
          width={120}
          height={120}
          style={{ position: "absolute", zIndex: 99 }}
          onClick={props.onClick}
          className="hoverPointer"
        />
      </div>
      <Image src={ground} width={700} height={700} alt="ground" />
    </ContainerCard>
  );
};

export default CardList;
