import styled from "@emotion/styled";
import React, { useMemo, useState } from "react";
import { IDetailPokemon } from "../pages/detail/[name]";
import AboutDetail from "./AboutDetail";
import BaseStatsDetail from "./BaseStatsDetail";

const ContainerContent = styled.section`
  min-width: 300px;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  background-color: #ffffff;
  min-height: 50vh;
  max-height: 100vh;
  padding: 60px 20px;
`;

interface ITabStyled {
  isTabActive: boolean;
}

const TabStyled = styled.div`
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-color: #aab3eb;
  border-bottom-style: ${(props: ITabStyled) =>
    props.isTabActive ? "solid" : "none"};
  color: ${(props: ITabStyled) =>
    props.isTabActive ? "black" : "#E0E0E2"};
`;

const Tab = ({
  tabActive,
  setTabActive,
}: {
  tabActive: string;
  setTabActive: React.Dispatch<React.SetStateAction<"about" | "baseStats">>;
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
        borderColor: "#e1e4f2",
      }}
    >
      <TabStyled
        className="hoverPointer"
        isTabActive={tabActive === "about"}
        onClick={() => setTabActive("about")}
      >
        About
      </TabStyled>
      <TabStyled
        className="hoverPointer"
        isTabActive={tabActive === "baseStats"}
        onClick={() => setTabActive("baseStats")}
      >
        Base Stats
      </TabStyled>
    </div>
  );
};

const ContentDetail = (props: IDetailPokemon) => {
  const [tabActive, setTabActive] = useState<"about" | "baseStats">("about");
  const dataAboutTab = useMemo(() => {
    return [
      {
        label: "Species",
        value: props.species.name,
      },
      {
        label: "Height",
        value: props.height,
      },
      {
        label: "Weight",
        value: props.weight,
      },
      {
        label: "Abilities",
        value: props.abilities.map((item) => item.ability.name).join(", "),
      },
    ];
  }, [props.abilities, props.height, props.species.name, props.weight]);

  return (
    <ContainerContent>
      <Tab tabActive={tabActive} setTabActive={setTabActive} />
      {tabActive === "about" ? (
        <div>
          <AboutDetail data={dataAboutTab} />
        </div>
      ) : (
        <div>
          <BaseStatsDetail data={props.stats} />
        </div>
      )}
    </ContainerContent>
  );
};

export default ContentDetail;
