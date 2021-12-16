import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import router from "next/router";
import { TabContext } from "../../context/TabContext";

const ContainerBottomTab = styled.div`
  position: fixed;
  bottom: 0;
  background-color: white;
  width: 100%;
  max-width: 400px;
  z-index: 1000;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  height: 50px;
  left: 50%;
  transform: translate(-50%, -0%);
`;

const BottomTab = () => {
  const { tab : tabActive, setTab: setTabActive } = useContext(TabContext)

  const handleClickTab = (tab: "/" | "/my-pokemon") => {
    router.push(tab);
    setTabActive(tab);
  };

  return (
    <ContainerBottomTab>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div
          onClick={() => handleClickTab("/")}
          style={{ color: tabActive === "/" ? "red" : "black" }}
        >
          Pokemon List
        </div>
        <div
          onClick={() => handleClickTab("/my-pokemon")}
          style={{ color: tabActive === "/my-pokemon" ? "red" : "black" }}
        >
          My Pokemon
        </div>
      </div>
    </ContainerBottomTab>
  );
};

export default BottomTab;
