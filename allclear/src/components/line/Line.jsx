import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { getLineData } from "../../apis/statistic/statisticData";
import { useRecoilValue } from "recoil";
import { selectedLineAtom } from "../../recoil/statistics/statistics";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

function Line() {
  const selectedLine = useRecoilValue(selectedLineAtom);

  // API 연동 데이터
  // const [water, setWater] = useState([]);
  // const [ph, setPh] = useState([]);
  // const [date, setDate] = useState([]);

  // 더미데이터
  const water = ["64", "42", "53", "55", "59", "62", "68"];
  const ph = ["24.1", "23.9", "24.0", "24.3", "24.6", "25.1", "24.7"];
  const date = ["05-01", "05-02", "05-03", "05-04", "05-05", "05-06", "05-07"];

  useEffect(() => {
    getLineData(
      selectedLine,
      ({ data }) => {
        setWater(data.waterList);
        setPh(data.phList);
        setDate(data.dateList);
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
            width={690}
            height={400}
            colors={["#2699E6"]}
            series={[{ data: water, label: "물" }]}
            yAxis={[{ min: 0, max: 100 }]}
            xAxis={[{ scaleType: "point", data: date }]}
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
              ["& path"]: { strokeWidth: "5px", stroke: "#2699E6" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={50}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1 }}
            />
          </LineChart>
        </div>
        <div style={{ backgroundColor: "#273444", marginBottom: 30 }}>
          <LineChart
            width={690}
            height={400}
            colors={["#03C04A"]}
            series={[{ data: ph, label: "PH농도" }]}
            yAxis={[{ min: 0, max: 60 }]}
            xAxis={[{ scaleType: "point", data: date }]}
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
              ["& path"]: { strokeWidth: "5px", stroke: "#03C04A" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          >
            <ChartsReferenceLine
              y={30}
              lineStyle={{ stroke: "#e6e5ea", strokeWidth: 1 }}
            />
          </LineChart>
        </div>
      </DashboardContents>
    </div>
  );
}

export default Line;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
