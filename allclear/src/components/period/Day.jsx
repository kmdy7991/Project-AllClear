import React from "react";
import { Pane, Paragraph } from "evergreen-ui";
import BarChart from "../chart/BarChart";

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

function Day() {
  return (
    <div>
      <BarChart dataset={dataset} dataType={"monthly"} />
    </div>
  );
}

export default Day;
