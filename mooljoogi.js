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
    fetchSSE();
    fetchSSE2();

    const handleKeyDown = (event) => {
      console.log(`Key pressed: ${event.key}`);
    };

    document.addEventListener("keydown", handleKeyDown);

    // return () => {
    //   document.removeEventListener("keydown", handleKeyDown);
    // };
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
  const dispatchKeyboardEvent = (key, keyCode, code) => {
    const event = new KeyboardEvent("keydown", {
      key: key,
      keyCode: keyCode,
      code: code,
      which: keyCode,
      bubbles: true, // 이벤트가 버블링 되도록 설정
      cancelable: true, // 이벤트가 취소 가능하도록 설정
    });
    console.log(`Dispatching event: ${key}`);
    document.body.dispatchEvent(event);
  };
  return (
    <>
      <button onClick={() => dispatchKeyboardEvent("s", 83, "KeyS")}>물</button>
      <button onClick={() => sendMessage("LightManager", "ToggleAllLights")}>
        불 켜기/끄기
      </button>
      <button onClick={() => sendMessage("FanManager", "ToggleAllFans")}>
        선풍기
      </button>
      <div>
        <button>1</button>
        <button>1</button>
        <button>1</button>
        <button>1</button>
        <button>1</button>
        <button>1</button>
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
