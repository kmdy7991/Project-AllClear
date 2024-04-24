import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie({ data }) {
  return (
    <PieChart
      series={[
        {
          data: data,
          innerRadius: 60,
          outerRadius: 100,
          // cornerRadius: 9,
          cx: 70,
          cy: 170, // 도넛 상하 위치
        },
      ]}
      width={340} // 도넛과 범례 사이
      height={350} // 범례 상하 위치
      slotProps={{
        legend: { labelStyle: { fill: "#e6e5ea" } },
      }}
    />
  );
}
