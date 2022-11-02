import React from 'react';
import { Pie } from '@ant-design/plots';
import { Card } from "antd";

interface PropsTypes {
  title: string
  date: {
    type: string,
    value: any;
  }[]
}

export const BaseRingPieCharts: React.FC<PropsTypes> = (
    {
      title,
      date
    }
) => {

  const config = {
    appendPadding: 1,
    data: date,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.618,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontWeight: "bold",
        },
        content: '总计',
      },
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
    },
  };
  return (
      <Card
          hoverable
          style={{
            width: 400,
            margin: 10,
          }}
      >
        <h2>{title}</h2>
        <Pie style={{height: 300}} {...config} />
      </Card>
  );
};
