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
          cy: 150,
        },
      ]}
      width={340}
      height={300}
      slotProps={{
        legend: { labelStyle: { fill: "#e6e5ea" } },
      }}
    />
  );
}
