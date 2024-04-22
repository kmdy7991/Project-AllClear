import { useState } from "react";
import "../styles/Sidebar.css";
import { Link } from "react-router-dom";
import dashboard from "../assets/dashboard.png";
import monitoring from "../assets/monitoring.png";
import statistics from "../assets/statistics.png";

function Sidebar() {
  return (
    <>
      <div className="sidebar-container">
        <ul className="menu-list">
          <Link to="/dashboard">
            <li className="menu">
              <img className="menu-logo" src={dashboard} />
              대시보드
            </li>
          </Link>
          <Link to="/monitoring">
            <li className="menu">
              <img className="menu-logo" src={monitoring} />
              모니터링
            </li>
          </Link>
          <Link to="/statistics">
            <li className="menu">
              <img className="menu-logo" src={statistics} />
              통계
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
