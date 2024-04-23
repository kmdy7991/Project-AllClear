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

const chartSetting = {
  // yAxis: [
  //   {
  //     label: "수확량 (개)",
  //   },
  // ],
  series: [{ dataKey: "count" }], // label이 필요하다면 label: "string"
  height: 350,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: "translateX(-10px)",
      fill: "#e6e5ea",
    },
    [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
      fill: "#e6e5ea", // 텍스트 색상을 흰색으로 설정
    },
    [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
      fill: "#e6e5ea", // 축 라벨의 텍스트 색상을 흰색으로 설정
    },
  },
  slotProps: { legend: { labelStyle: { fill: "#e6e5ea" } } },
  // colors: ["#00ff00"],  막대바의 색깔을 일괄적으로 바꿀 수 있음
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
    <div style={{ width: "50%" }}>
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
