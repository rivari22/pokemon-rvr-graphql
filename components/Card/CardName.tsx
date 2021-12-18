import styled from "@emotion/styled";
import React from "react";

interface ICardNameProps {
  label: string;
  count?: number;
}

export const ContainerCardName = styled.div`
  border: 1px inset #1c6ea4;
  border-radius: 40px 0px 40px 0px;
  min-width: 100px;
  padding: 6px 18px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardName = ({ label, count }: ICardNameProps) => {
  return (
    <ContainerCardName>
      {count && <div style={{ fontSize: "0.7em", color: 'gray' }}>owned: {count}</div>}
      <div>{label}</div>
    </ContainerCardName>
  );
};

export default CardName;
