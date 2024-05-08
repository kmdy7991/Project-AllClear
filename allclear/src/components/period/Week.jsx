import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { getDailyData } from "../../apis/statistic/statisticData";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

function Week() {
  const [dailyTemperature, setDailyTemperature] = useState([]);
  const [dailyHumidity, setDailyHumidity] = useState([]);
  const [dailyLight, setDailyLight] = useState([]);
  const [dailyCheckAt, setDailyCheckAt] = useState([]);

  useEffect(() => {
    getDailyData(
      ({ data }) => {
        setDailyTemperature(data.temperatureList);
        setDailyHumidity(data.humidityList);
        setDailyLight(data.lightList);
        setDailyCheckAt(data.checkAtList);
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
          colors={["#E03F69"]}
          series={[
            { data: dailyTemperature, label: "온도" },
            // { data: dailyHumidity, label: "습도" },
            // { data: dailyLight, label: "조도" },
          ]}
          xAxis={[{ scaleType: "point", data: dailyCheckAt }]}
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
        <LineChart
          width={700}
          height={400}
          colors={["#4A5ED8"]}
          series={[
            // { data: dailyTemperature, label: "온도" },
            { data: dailyHumidity, label: "습도" },
            // { data: dailyLight, label: "조도" },
          ]}
          xAxis={[{ scaleType: "point", data: dailyCheckAt }]}
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
        <LineChart
          width={700}
          height={400}
          colors={["#F6C863"]}
          series={[
            // { data: dailyTemperature, label: "온도" },
            // { data: dailyHumidity, label: "습도" },
            { data: dailyLight, label: "조도" },
          ]}
          xAxis={[{ scaleType: "point", data: dailyCheckAt }]}
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

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
