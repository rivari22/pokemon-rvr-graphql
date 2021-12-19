import React from "react";
import { ContainerDetailContent, ContentDetailList } from "./ContentDetail";

const BaseStatsDetail = (props: {
  data: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
}) => {
  return (
    <ContainerDetailContent>
      {props.data.map((item, index) => (
        <div key={index}>
          <ContentDetailList
            width={40}
            label={item.stat.name}
            value={String(item.base_stat)}
            bgColorBar={index % 2 === 0 ? 'red' : 'green'}
          />
        </div>
      ))}
    </ContainerDetailContent>
  );
};

export default BaseStatsDetail;
