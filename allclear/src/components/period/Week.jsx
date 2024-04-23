import React from "react";
import { Pane, Paragraph } from "evergreen-ui";

function Week() {
  return (
    <Pane style={{ backgroundColor: "#324254" }}>
      <Paragraph> 주간 데이터.</Paragraph>
    </Pane>
  );
}

//  [{count:24, day="월"}, {}]
export default Week;
