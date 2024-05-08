import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { getHourlyData } from "../../apis/statistic/statisticData";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

function Day() {
  const [hourlyTemperature, setHourlyTemperature] = useState([]);
  const [hourlyHumidity, setHourlyHumidity] = useState([]);
  const [hourlyLight, setHourlyLight] = useState([]);
  const [hourlyCheckAt, setHourlyCheckAt] = useState([]);

  useEffect(() => {
    getHourlyData(
      ({ data }) => {
        setHourlyTemperature(data.temperatureList);
        setHourlyHumidity(data.humidityList);
        setHourlyLight(data.lightList);
        setHourlyCheckAt(data.checkAtList);
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
            { data: hourlyTemperature, label: "온도" },
            // { data: hourlyHumidity, label: "습도" },
            // { data: hourlyLight, label: "조도" },
          ]}
          xAxis={[{ scaleType: "point", data: hourlyCheckAt }]}
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
            // { data: hourlyTemperature, label: "온도" },
            { data: hourlyHumidity, label: "습도" },
            // { data: hourlyLight, label: "조도" },
          ]}
          xAxis={[{ scaleType: "point", data: hourlyCheckAt }]}
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
            // { data: hourlyTemperature, label: "온도" },
            // { data: hourlyHumidity, label: "습도" },
            { data: hourlyLight, label: "조도" },
          ]}
          xAxis={[{ scaleType: "point", data: hourlyCheckAt }]}
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

export default Day;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
