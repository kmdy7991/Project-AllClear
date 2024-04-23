import React from "react";
import { Pane, Paragraph } from "evergreen-ui";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import styled from "styled-components";

const dataset = [
  {
    count: 5,
    month: "Jan",
  },
  {
    count: 8,
    month: "Fev",
  },
  {
    count: 14,
    month: "Mar",
  },
  {
    count: 15,
    month: "Apr",
  },
  {
    count: 16,
    month: "May",
  },
  {
    count: 25,
    month: "June",
  },
  {
    count: 25,
    month: "July",
  },
  {
    count: 25,
    month: "Aug",
  },
  {
    count: 25,
    month: "Sept",
  },
  {
    count: 25,
    month: "Oct",
  },
  {
    count: 25,
    month: "Nov",
  },
  {
    count: 25,
    month: "Dec",
  },
];

const dataset1 = [
  {
    count: 6,
    time: "3시",
  },
  {
    count: 12,
    time: "6시",
  },
  {
    count: 25,
    time: "9시",
  },
  {
    count: 26,
    time: "12시",
  },
  {
    count: 67,
    time: "15시",
  },
  {
    count: 87,
    time: "18시",
  },
  {
    count: 122,
    time: "21시",
  },
];
const data = [
  { id: 0, value: 10, label: "생장 주기 1" },
  { id: 1, value: 15, label: "생장 주기 2" },
  { id: 2, value: 20, label: "생장 주기 3" },
  { id: 3, value: 42, label: "생장 주기 4" },
];

function Day() {
  return (
    <div>
      <DashboardContents>
        <BarChart dataset={dataset1} dataType={"daily"} />
        <PieChart data={data} />
      </DashboardContents>
    </div>
  );
}

export default Day;

const DashboardContents = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: calc(100% - 100px);
  justify-content: space-between;
`;
