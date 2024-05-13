import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { getDailyData } from "../../apis/statistic/statisticData";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

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
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <LineChart
            width={460}
            height={300}
            colors={["#E03F69"]}
            series={[
              { data: dailyTemperature, label: "온도(℃)" },
              // { data: dailyHumidity, label: "습도" },
              // { data: dailyLight, label: "조도" },
            ]}
            yAxis={[{ min: 0, max: 30 }]}
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
              "& path": { strokeWidth: "5px", stroke: "#E03F69" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={24}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1 }}
            />
          </LineChart>
        </div>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <LineChart
            width={460}
            height={300}
            colors={["#4A5ED8"]}
            series={[
              // { data: dailyTemperature, label: "온도" },
              { data: dailyHumidity, label: "습도(％)" },
              // { data: dailyLight, label: "조도" },
            ]}
            yAxis={[{ min: 0, max: 100 }]}
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
              "& path": { strokeWidth: "5px", stroke: "#4A5ED8" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={33}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1.5 }}
            />
          </LineChart>
        </div>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <LineChart
            width={460}
            height={300}
            colors={["#F6C863"]}
            series={[
              // { data: dailyTemperature, label: "온도" },
              // { data: dailyHumidity, label: "습도" },
              { data: dailyLight, label: "조도(㏓)" },
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
              "& path": { strokeWidth: "5px", stroke: "#F6C863" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={500}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1.5 }}
            />
          </LineChart>
        </div>
        {/* <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <BarChart
            width={690}
            height={400}
            series={[{ data: uData, label: "수확량" }]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
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
            slotProps={{
              legend: { labelStyle: { fill: `#e6e5ea` } },
            }}
          />
        </div> */}
      </DashboardContents>
    </div>
  );
}

export default Week;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
