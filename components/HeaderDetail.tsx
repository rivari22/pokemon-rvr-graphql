/* eslint-disable @next/next/no-img-element */
import styled from "@emotion/styled";
import router from "next/router";
import React from "react";
import { IDetailPokemon } from "../pages/detail/[name]";

const CardMini = styled.div`
  padding: 4px 20px;
  color: #ffffff;
  border-radius: 16px;
  text-transform: capitalize;
  border: 1px solid white;
`;

const HeaderDetail = (props: IDetailPokemon) => {
  return (
    <div
      style={{
        minWidth: "360px",
        position: "relative",
        minHeight: 300,
        padding: 16,
      }}
    >
        <div onClick={() => router.back()}>
            arrow back
        </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1 style={{ textTransform: "capitalize" }}>{props.name}</h1>
          <div style={{ display: "flex", marginTop: -10, gap: 10 }}>
            {props.types.map((item, index) => (
              <div key={index}>
                <CardMini>{item.type.name}</CardMini>
              </div>
            ))}
          </div>
        </div>
        <h3>#00{props.order}</h3>
      </div>
      <img
        src={props.sprites.front_default}
        alt="test"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default HeaderDetail;
