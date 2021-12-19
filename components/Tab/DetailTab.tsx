import styled from "@emotion/styled";
import React from 'react';

interface ITabStyled {
  isTabActive: boolean;
}

const TabStyled = styled.div`
  padding-bottom: 20px;
  border-bottom-width: 2px;
  border-color: #aab3eb;
  border-bottom-style: ${(props: ITabStyled) =>
    props.isTabActive ? "solid" : "none"};
  color: ${(props: ITabStyled) => (props.isTabActive ? "black" : "#E0E0E2")};
`;

const DetailTab = ({
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

export default DetailTab;