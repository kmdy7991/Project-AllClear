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

  useEffect(() => {
    fetchSSE();
  }, []);

  const fetchSSE = async () => {
    const eventSource = new EventSource(
      "http://192.168.31.213:8081/api/unity/connect"
    );
    eventSource.onopen = () => {
      console.log("sse OPENED");
    };

    eventSource.addEventListener("secondmessage", (e) => {
      console.log(e.data);
    });
  };

  const testfunction = () => {
    const activationData = JSON.stringify({
      isActive: true,
      isHarvesting: true,
    });
    console.log("Sending message to Unity:", activationData);
    sendMessage("Machine", "ActivateHarvesting", activationData);
  };

  return (
    <>
      <p>시뮬 화면</p>
      <button onClick={testfunction}>테스트 버튼</button>
      <Unity
        style={{
          width: "90%",
          height: "80%",
          justifyContent: "center",
          alignSelf: "center",
        }}
        unityProvider={unityProvider}
      />
    </>
  );
}

export default Monitoring;
