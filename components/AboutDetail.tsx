import React from "react";
import { ContainerDetailContent, ContentDetailList } from "./ContentDetail";

const AboutDetail = (props: {
  data: Array<{ label: string; value: string }>;
}) => {
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
