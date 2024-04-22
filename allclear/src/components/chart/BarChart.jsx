import * as React from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { colors } from "@mui/material";

const valueFormatter = (value) => `${value}mm`;

const chartSetting = {
  yAxis: [
    {
      label: "수확량 (개)",
    },
  ],
  series: [{ dataKey: "count", label: "수확량", valueFormatter }],
  height: 350,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
      fill: "#ffffff",
    },
    [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
      fill: "#ffffff", // 텍스트 색상을 흰색으로 설정
    },
    [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
      fill: "#ffffff", // 축 라벨의 텍스트 색상을 흰색으로 설정
    },
  },
};

export default function TickPlacementBars({ dataset, dataType }) {
  const getXAxisDataKey = () => {
    if (dataType === "daily") {
      return "time";
    } else if (dataType === "weekly") {
      return "day";
    } else if (dataType === "monthly") {
      return "month";
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <BarChart
        dataset={dataset}
        xAxis={[
          {
            scaleType: "band",
            dataKey: getXAxisDataKey(),
            tickPlacement: "end",
            tickLabelPlacement: "middle",
          },
        ]}
        {...chartSetting}
      />
    </div>
  );
}
