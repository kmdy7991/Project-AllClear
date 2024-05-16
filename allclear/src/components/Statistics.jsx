import { useState, useEffect, useRef } from "react";
import { Tab, Tablist } from "evergreen-ui";
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Day from "./period/Day";
import Week from "./period/Week";
import styled from "styled-components";
import Line from "./line/Line";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedLineAtom } from "../recoil/statistics/statistics";
import close from "../assets/close.png";

function Statistics() {
  const [selectedPeriodIndex, setSelectedPeriodIndex] = useState(0);
  const [periodTabs] = useState(["일간", "주간"]);
  const [lineTabs] = useState(["라인1", "라인2", "라인3", "라인4"]);
  const periodComponents = [<Day />, <Week />];
  const lineComponent = <Line />;
  const setSelectedLineAtom = useSetRecoilState(selectedLineAtom);
  const selectedLine = useRecoilValue(selectedLineAtom);
  const setSelectedLine = (lineNumber) => setSelectedLineAtom(lineNumber);
  const [isSimulationModalVisible, setIsSimulationModalVisible] =
    useState(false);

  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Simul/Downloads.loader.js",
    dataUrl: "Simul/webgl.data",
    frameworkUrl: "Simul/build.framework.js",
    codeUrl: "Simul/build.wasm",
  });
  // API 연동 데이터
  const [treeData, setTreeData] = useState([
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
    {
      lineNumber: "",
      treeList: [
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
        { treeNumber: "", yield: "" },
      ],
    },
  ]);

  const StartButton = () => {
    sendMessage("SimulationManager", "StartAllSimulations");
  };

  const changeTreeColor = (yieldAmount) => {
    if (yieldAmount == undefined || yieldAmount == null) {
      return "#D1180B";
    } else if (yieldAmount < 19) {
      return "#D1180B";
    } else if (yieldAmount < 23) {
      return "#FFBF00";
    } else {
      return "#2DB400";
    }
  };

  useEffect(() => {}, []);

  const fetchSSE = () => {
    console.log("fetchSSE 실행");
    const eventSource = new EventSource(
      "http://192.168.31.169:3024/api/connection/connect/tree"
    );

    eventSource.addEventListener("open", () => {
      console.log("sse OPENED");
    });

    eventSource.addEventListener("tree", (e) => {
      console.log(JSON.parse(e.data));
      setTreeData(JSON.parse(e.data).data);
    });

    eventSource.addEventListener("hourmessage", (e) => {
      // console.log(e.data);
    });
  };

  useEffect(() => {
    setSelectedLine(1);
    fetchSSE();
  }, []);

  return (
    <StatisticsBox>
      <div>
        <TitleContainer>
          <Title>통계</Title>
        </TitleContainer>
      </div>
      <div>
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "16px",
            backgroundColor: "#384351",
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          스마트팜 환경
        </div>
        <Tablist
          marginBottom={16}
          flexBasis={240}
          marginRight={24}
          marginLeft={3}
        >
          {periodTabs.map((tab, index) => (
            <Tab
              aria-controls={`panel-${tab}`}
              isSelected={index === selectedPeriodIndex}
              key={tab}
              onSelect={() => {
                setSelectedPeriodIndex(index);
              }}
              color={"#e6e5ea"}
              fontSize={"16px"}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        {periodComponents[selectedPeriodIndex]}
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "16px",
            backgroundColor: "#384351",
            display: "inline-block",
            padding: "10px 20px",
            borderRadius: "10px",
          }}
        >
          라인별 환경
        </div>
        <Tablist
          marginBottom={16}
          flexBasis={240}
          marginRight={24}
          marginLeft={3}
        >
          {lineTabs.map((tab, index) => (
            <Tab
              aria-controls={`panel-${tab}`}
              isSelected={index + 1 == selectedLine}
              key={tab}
              onSelect={() => {
                setSelectedLine(index + 1);
              }}
              color={"#e6e5ea"}
              fontSize={"16px"}
            >
              {tab}
            </Tab>
          ))}
        </Tablist>
        {lineComponent}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex" }}>
            <div
              style={{
                fontSize: "24px",
                fontWeight: 600,
                marginBottom: "16px",
                backgroundColor: "#384351",
                display: "inline-block",
                padding: "10px 20px",
                borderRadius: "10px",
              }}
            >
              라인별 수확량
            </div>
            <SimulationOpenButton
              onClick={() => {
                setIsSimulationModalVisible(true);
              }}
            >
              시뮬레이션
            </SimulationOpenButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {treeData.map((line, index) => (
              <div key={index}>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: 600,
                    margin: "5px 5px 5px 10px",
                  }}
                >
                  라인{line.lineNumber}
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  {line.treeList.map((tree, index) => (
                    <Tree
                      key={index}
                      style={{
                        backgroundColor:
                          changeTreeColor(tree.yield) || "#D1180B",
                      }}
                    >
                      {tree.yield}
                    </Tree>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {isSimulationModalVisible && (
            <SimulationModalOverlay>
              <SimulationModal>
                <SimulationStartButton
                  onClick={() => {
                    StartButton();
                  }}
                >
                  시작
                </SimulationStartButton>
                <div>
                  <Unity
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%", // 너비 70%
                      height: "100%", // 높이 70%
                    }}
                    unityProvider={unityProvider}
                  />
                </div>
                <CloseButton
                  src={close}
                  onClick={() => {
                    setIsSimulationModalVisible(false);
                  }}
                />
              </SimulationModal>
            </SimulationModalOverlay>
          )}
        </div>
      </div>
    </StatisticsBox>
  );
}

const StatisticsBox = styled.div`
  overflow: auto;
  width: calc(100% - 70px);
  height: 100%;
  margin: 0 35px;
`;

const TitleContainer = styled.div`
  display: flex;
  padding: 25px 0;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: 600;
`;

const Tree = styled.div`
  line-height: 120px;
  text-align: center;
  width: 120px;
  height: 120px;
  margin: 10px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: 600;
`;

const SimulationOpenButton = styled.div`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 16px;
  background-color: #20ade4;
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
  margin-left: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

const SimulationModalOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const SimulationModal = styled.div`
  position: relative;
  width: 80%;
  height: 90%;
  background-color: #68615b;
  border-radius: 8px;
`;

const SimulationStartButton = styled.button`
  width: 180px;
  height: 50px;
  outline: none;
  border: none;
  border-radius: 8px;
  margin: 10px 0 0 10px;
  cursor: pointer;

  &:hover {
    background-color: #1b94c7;
  }

  &:active {
    background-color: #176b94;
  }
`;

const CloseButton = styled.img`
  position: absolute;
  right: 10px;
  top: 10px;
  width: 20px;
  height: 20px;

  &:active {
    opacity: 0.5;
  }
`;
export default Statistics;
