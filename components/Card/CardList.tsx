/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import Image from "next/image";
import React, { useContext } from "react";
import { CardName } from ".";
import { PokemonContext } from "../../context/AppPokemonContext/context";
import { PokemonEnumActionType } from "../../context/AppPokemonContext/reducer";
import ground from "../../public/images/groundrm.png";
import { RiCloseCircleFill } from "react-icons/ri";

interface ICardListProps {
  name: string;
  dreamworld: string;
  onClick: () => void;
  isMyPokemon?: boolean;
  nickname?: string;
  count?: number;
  odd: boolean;
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
    <>
      {!props.odd && (
        <CardName label={props.nickname ?? props.name} count={props.count} />
      )}
      <ContainerCard>
        {props.isMyPokemon && (
          <RiCloseCircleFill
            style={{ marginLeft: "auto", position: "absolute", right: 0 }}
            onClick={() => {
              dispatchPokemon({
                type: PokemonEnumActionType.REMOVE_POKEMON,
                payload: props.nickname,
              });
            }}
            className="hoverPointer"
            size={"1.5em"}
          />
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
      {props.odd && (
        <CardName label={props.nickname ?? props.name} count={props.count} />
      )}
    </>
  );
};

export default CardList;
