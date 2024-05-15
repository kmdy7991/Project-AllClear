import React, { useCallback, useRef, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import VideoStream from "./VideoStream";
function Monitoring() {
  const { unityProvider, sendMessage } = useUnityContext({
    loaderUrl: "Build/Downloads.loader.js",
    dataUrl: "Build/Downloads.data",
    frameworkUrl: "Build/Downloads.framework.js",
    codeUrl: "Build/Downloads.wasm",
  });

  const ws = useRef(null);
  const [wsData, setWsData] = useState(null);
  const [activeData, setActiveData] = useState(null);
  const [alarmData, setAlarmData] = useState(null);

  useEffect(() => {
    // fetchSSE();
    fetchSSE2();
  }, []);

  useEffect(() => {
    if (activeData) {
      const activationData = JSON.stringify(activeData);
      console.log("Sending message to Unity:", activationData);
      sendMessage("Machine", "ActivateHarvesting", activationData);
    }
  }, [activeData]);

  useEffect(() => {
    if (alarmData) {
      const alarm = JSON.stringify(alarmData);
      sendMessage("FireAlarm", "ActivateAlarm", alarm);
    }
  }, [alarmData]);

  // 용준 SSE
  const fetchSSE2 = async () => {
    const eventSource = new EventSource(
      "http://192.168.31.206:3022/api/connection/connect"
    );

    eventSource.addEventListener("secondmessage", (e) => {
      console.log(e.data);
      setAlarmData(JSON.parse(e.data));
    });
  };

  // // 재식 SSE
  // const fetchSSE = async () => {
  //   const eventSource = new EventSource(
  //     "http://192.168.31.213:8081/api/unity/connect"
  //     // "http://192.168.219.92:8081/api/unity/connect"
  //   );
  //   eventSource.onopen = () => {
  //     console.log("sse OPENED");
  //   };

  //   // 수확(이름 바꿔야 됨 secondmessage)
  //   eventSource.addEventListener("harvesting", (e) => {
  //     console.log(e.data);
  //     setActiveData(JSON.parse(e.data));
  //   });
  // };

  const sendToggleWateringMessage = () => {
    sendMessage("WaterManager", "ToggleAllcoolers", "");
  };

  const sendToggleFanMessage = () => {
    sendMessage("FanManager", "ToggleAllFans", "");
  };

  const switchCamera = (index) => {
    sendMessage("CameraController", "SwitchCameraFromReact", index.toString());
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={sendToggleWateringMessage}>물</button>
        <button onClick={() => sendMessage("LightManager", "ToggleAllLights")}>
          불 켜기/끄기
        </button>
        <button onClick={sendToggleFanMessage}>선풍기</button>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => switchCamera(0)}>카메라 1</button>
        <button onClick={() => switchCamera(1)}>카메라 2</button>
        <button onClick={() => switchCamera(2)}>카메라 3</button>
        <button onClick={() => switchCamera(3)}>카메라 4</button>
        <button onClick={() => switchCamera(4)}>카메라 5</button>
        <button onClick={() => switchCamera(5)}>카메라 6</button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // 전체 뷰포트 높이
        }}
      >
        <Unity
          style={{
            width: "70%", // 너비 70%
            height: "70%", // 높이 70%
          }}
          unityProvider={unityProvider}
        />
      </div>
      <div>{/* <VideoStream style={{}} /> */}</div>
    </>
  );
}

export default Monitoring;
