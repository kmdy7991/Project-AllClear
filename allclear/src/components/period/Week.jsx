import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { getDailyData } from "../../apis/statistic/statisticData";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

function Week() {
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];
  const [dailyData, setDailyData] = useState({});

  useEffect(() => {
    getDailyData(
      ({ data }) => {
        setDailyData(data);
        console.log(dailyData);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <DashboardContents>
        <LineChart
          width={700}
          height={400}
          series={[
            { data: pData, label: "pv" },
            { data: uData, label: "uv" },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          // series={[
          //   { data: dailyData.temperature, label: "온도" },
          //   { data: dailyData.humidity, label: "습도" },
          //   { data: dailyData.light, label: "조도" },
          // ]}
          // xAxis={[{ scaleType: "point", data: dailyData.checkAt }]}
          sx={{
            [`& .${axisClasses.directionX} .${axisClasses.tickLabel}`]: {
              fill: "#e6e5ea", // 텍스트 색상을 흰색으로 설정
            },
            [`& .${axisClasses.directionY} .${axisClasses.tickLabel}`]: {
              fill: "#e6e5ea", // 축 라벨의 텍스트 색상을 흰색으로 설정
            },
            [`& .${axisClasses.directionX} .${axisClasses.line}`]: {
              stroke: "#e6e5ea", // x축 선의 색상을 흰색으로 설정
            },
            [`& .${axisClasses.directionY} .${axisClasses.line}`]: {
              stroke: "#e6e5ea", // y축 선의 색상을 흰색으로 설정
            },
            [`& .${axisClasses.directionX} .${axisClasses.tick}`]: {
              stroke: "#e6e5ea", // x축 눈금의 색상을 흰색으로 설정
            },
            [`& .${axisClasses.directionY} .${axisClasses.tick}`]: {
              stroke: "#e6e5ea", // y축 눈금의 색상을 흰색으로 설정
            },
          }}
          slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
        />
      </DashboardContents>
    </div>
  );
}

export default Week;

const DashboardContents = styled.div``;
