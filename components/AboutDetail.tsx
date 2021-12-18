import styled from "@emotion/styled";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

export const ContainerDetailContent = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const ContentDetailList = ({
  label,
  value,
  width,
  bgColorBar,
}: {
  label: string;
  value: string;
  width?: number;
  bgColorBar?: string;
}) => (
  <div
    style={{ display: "flex", marginBottom: 10, gap: 20, alignItems: "center" }}
  >
    <div style={{ display: "flex", gap: 60, alignItems: "center" }}>
      <div style={{ minWidth: 60, width, textTransform: 'capitalize' }}>{label}</div>
      <div style={{ width: 30 }}>{value}</div>
    </div>
    {bgColorBar && (
      <ProgressBar
        completed={value}
        width="120px"
        height="6px"
        bgColor={bgColorBar}
        customLabel=" "
      />
    )}
  </div>
);

const AboutDetail = (props: any) => {
  return (
    <ContainerDetailContent>
      {props.data.map((item: any, index: number) => (
        <div key={index}>
          <ContentDetailList label={item.label} value={item.value} />
        </div>
      ))}
    </ContainerDetailContent>
  );
};

export default AboutDetail;
