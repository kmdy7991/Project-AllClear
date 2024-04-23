import { useState } from "react";
import {
  Button,
  Pane,
  Text,
  majorScale,
  Tab,
  Tablist,
  Paragraph,
} from "evergreen-ui";
import React from "react";
import Day from "./period/Day";
import Week from "./period/Week";
import Month from "./period/Month";

function Statistics() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs] = useState(["일간", "주간", "월간"]);
  const components = [<Day />, <Week />, <Month />];

  return (
    <>
      <div
        style={{
          padding: "5%",
          fontSize: "20px",
          fontStyle: "inherit",
        }}
      >
        통계
      </div>
      <div style={{ padding: "0 5%" }}>
        <Pane height={120}>
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {tabs.map((tab, index) => (
              <Tab
                aria-controls={`panel-${tab}`}
                isSelected={index === selectedIndex}
                key={tab}
                onSelect={() => setSelectedIndex(index)}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          {components[selectedIndex]}
          {/* <Pane padding={16} background="#324254" flex="1">
            {components[selectedIndex]}
          </Pane> */}
        </Pane>
      </div>
    </>
  );
}

export default Statistics;
