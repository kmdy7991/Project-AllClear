import React, { useCallback, useRef, useState, useEffect } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

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
    fetchSSE();
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

  // 재식 SSE
  const fetchSSE = async () => {
    const eventSource = new EventSource(
      "http://192.168.31.213:8081/api/unity/connect"
      // "http://192.168.219.92:8081/api/unity/connect"
    );
    eventSource.onopen = () => {
      console.log("sse OPENED");
    };

    // 수확(이름 바꿔야 됨 secondmessage)
    eventSource.addEventListener("harvesting", (e) => {
      console.log(e.data);
      setActiveData(JSON.parse(e.data));
    });
  };

  return (
    <>
      <p>시뮬 화면</p>
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
    </>
  );
}

export default Monitoring;
