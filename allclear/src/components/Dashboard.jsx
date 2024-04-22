import { useState } from "react";
import "../styles/Dashboard.css";
function Dashboard() {
  const data = [
    { label: "정상", value: 4567 },
    { label: "비정상", value: 1398 },
  ];
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboard-box">
          <div className="title-container">
            <div className="title">대시보드</div>
          </div>
          <div className="dashboard-contents">
            <div className="content content1">
              농장
            </div>
            <div className="content content2">재배동수</div>
            <div className="content content3">운영</div>
            <div className="content content4">주기별 동수</div>
            <div className="content content5">주간 생산량</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
