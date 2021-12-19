import React from "react";

interface ICardTitleProps {
    label: string;
}

const CardTitle = (props: ICardTitleProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          backgroundColor: "white",
          padding: "4px 16px",
          borderRadius: 8,
        }}
      >
        {props.label}
      </h1>
    </div>
  );
};

export default CardTitle;
