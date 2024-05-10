import { useState } from "react";
import { Pane, Tab, Tablist } from "evergreen-ui";
import React from "react";
import Day from "./period/Day";
import Week from "./period/Week";
import Month from "./period/Month";
import styled from "styled-components";

function Statistics() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [tabs] = useState(["일간", "주간", "월간"]);
  const components = [<Day />, <Week />, <Month />];

  return (
    <>
      <DashboardBox>
        <div>
          <TitleContainer>
            <Title>통계</Title>
          </TitleContainer>
        </div>
        <div>
          <Pane height={120}>
            <Tablist
              marginBottom={16}
              flexBasis={240}
              marginRight={24}
              marginLeft={10}
            >
              {tabs.map((tab, index) => (
                <Tab
                  aria-controls={`panel-${tab}`}
                  isSelected={index === selectedIndex}
                  key={tab}
                  onSelect={() => setSelectedIndex(index)}
                  color={"#e6e5ea"}
                  fontSize={"16px"}
                >
                  {tab}
                </Tab>
              ))}
            </Tablist>
            {components[selectedIndex]}
          </Pane>
        </div>
      </DashboardBox>
    </>
  );
}

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

export default Statistics;
