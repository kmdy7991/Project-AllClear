import { useState, useEffect } from "react";
import styled from "styled-components";
import { LineChart } from "@mui/x-charts/LineChart";
import { getLineData } from "../../apis/statistic/statisticData";
import { useRecoilValue } from "recoil";
import { selectedLineAtom } from "../../recoil/statistics/statistics";

function Line() {
  const [water, setWater] = useState([]);
  const [ph, setPh] = useState([]);
  const [date, setDate] = useState([]);

  const selectedLine = useRecoilValue(selectedLineAtom);

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
          {/* <LineChart
            width={690}
            height={400}
            colors={["#E03F69"]}
            series={[{data: water, label: "물"}]}
            yAxis={[{}]}
            xAxis={[{ scaleType: "point", data: date}]}
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
              ["& path"]: { strokeWidth: "5px", stroke: "#E03F69" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          /> */}
          {/* <LineChart
            width={690}
            height={400}
            colors={["#E03F69"]}
            series={[{data: ph, label: "PH농도"}]}
            yAxis={[{}]}
            xAxis={[{scaleType: "point", data: date}]}
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
              ["& path"]: { strokeWidth: "5px", stroke: "#E03F69" },
            }}
            slotProps={{ legend: { labelStyle: { fill: `#e6e5ea` } } }}
          /> */}
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
