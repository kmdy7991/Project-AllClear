import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";

function Dashboard() {
  const [contentSize, setContentSize] = useState({ width: 0, height: 0 });
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentSize({
        width: contentRef.current.offsetWidth,
        height: contentRef.current.offsetWidth,
      });
    }
  }, [contentRef.current]);

  const [contentSize2, setContentSize2] = useState({ width: 0, height: 0 });
  const contentRef2 = useRef(null);

  useEffect(() => {
    if (contentRef2.current) {
      setContentSize2({
        width: contentRef2.current.offsetWidth,
        height: contentRef2.current.offsetWidth,
      });
    }
  }, [contentRef2.current]);

  const data = [
    { label: "정상", value: 4567 },
    { label: "비정상", value: 1398 },
  ];

  const data2 = [
    { label: "1단계", value: 1102 },
    { label: "2단계", value: 2341 },
    { label: "3단계", value: 891 },
    { label: "4단계", value: 367 },
  ];
  return (
    <>
      <DashboardContainer>
        <DashboardBox>
          <TitleContainer>
            <Title>대시보드</Title>
          </TitleContainer>
          <DashboardContents>
            <Content1 ref={contentRef} height={contentSize.height * 0.8}>
              <ContentTitle1>농장</ContentTitle1>
              <PieChart
                colors={["#23AEE5", "#FC5F6E"]}
                width={300}
                height={170}
                series={[
                  {
                    data: data,
                    innerRadius: 50,
                    outerRadius: 80,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    labelStyle: { fill: `#e6e5ea` },
                  },
                }}
              />
            </Content1>
            <Content1 ref={contentRef} height={contentSize.height * 0.8}>
              <ContentTitle1>재배동수</ContentTitle1>
              <PieChart
                colors={["#23AEE5", "#FC5F6E"]}
                width={300}
                height={170}
                series={[
                  {
                    data: data,
                    innerRadius: 50,
                    outerRadius: 80,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    labelStyle: { fill: `#e6e5ea` },
                  },
                }}
              />
            </Content1>
            <Content1 ref={contentRef} height={contentSize.height * 0.8}>
              <ContentTitle1>농장</ContentTitle1>
              <PieChart
                colors={["#FF9140", "#6674E3"]}
                width={300}
                height={170}
                series={[
                  {
                    data: data,
                    innerRadius: 50,
                    outerRadius: 80,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "column",
                    position: { vertical: "middle", horizontal: "right" },
                    labelStyle: { fill: `#e6e5ea` },
                  },
                }}
              />
            </Content1>
            <Content2 ref={contentRef2} height={contentSize2.height / 1.3}>
              <ContentTitle2>생육 단계</ContentTitle2>
              <PieChart
                colors={["#3C4856", "#FF9142", "#23D3B5", "#20AEE3"]}
                margin={{ top: 30, bottom: 10, left: 10, right: 10 }}
                height={400}
                series={[
                  {
                    data: data2,
                    innerRadius: 40,
                    outerRadius: 130,
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: { vertical: "bottom", horizontal: "middle" },
                    labelStyle: { fill: `#e6e5ea` },
                  },
                }}
              />
            </Content2>
            <Content3 ref={contentRef2} height={contentSize2.height / 1.3}>
              주간 생산량
            </Content3>
          </DashboardContents>
        </DashboardBox>
      </DashboardContainer>
    </>
  );
}

const DashboardContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const DashboardBox = styled.div`
  overflow: auto;
  width: calc(100% - 70px);
  height: 100%;
  margin: 0 35px;
`;

const TitleContainer = styled.div`
  display: flex;
  height: 100px;
  padding: 25px 0;
`;

const Title = styled.div`
  height: 50px;
  font-size: 32px;
  font-weight: 600;
`;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100% - 100px);
  justify-content: space-between;
`;

const Content1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 32%;
  height: ${(props) => props.height}px;
`;

const ContentTitle1 = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin: 25px 0 0px;
`;

const Content2 = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  background-color: #273444;
  width: 42%;
  margin-bottom: 30px;
  height: ${(props) => props.height}px;
`;

const ContentTitle2 = styled.div`
  font-size: 32px;
  font-weight: 600;
  position: absolute;
  top: 40px;
  z-index: 3;
`;

const Content3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  width: 56%;
  margin-bottom: 30px;
  height: ${(props) => props.height}px;
`;

export default Dashboard;
