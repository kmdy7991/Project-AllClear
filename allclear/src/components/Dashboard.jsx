import { useState } from "react";
import styled from "styled-components";

function Dashboard() {
  const data = [
    { label: "정상", value: 4567 },
    { label: "비정상", value: 1398 },
  ];
  return (
    <>
      <DashboardContainer>
        <DashboardBox>
          <TitleContainer>
            <Title>대시보드</Title>
          </TitleContainer>
          <DashboardContents>
            <Content1>농장</Content1>
            <Content2>재배동수</Content2>
            <Content3>운영</Content3>
            <Content4>주기별 동수</Content4>
            <Content5>주간 생산량</Content5>
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
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 32%;
  height: 31%;
`;
const Content2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 32%;
  height: 31%;
`;
const Content3 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 32%;
  height: 31%;
`;
const Content4 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 42%;
  height: 61%;
`;
const Content5 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #273444;
  margin-bottom: 30px;
  width: 56%;
  height: 61%;
`;

export default Dashboard;
