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
    let wsUrl = "wss://localhost:8000/"; // 여기에 웹소켓 url 넣고
    ws.current = new WebSocket(wsUrl);

    // Websocket이 연결됐을때, 호출되는 함수
    ws.current.onopen = () => {
      console.log("Websocket 연결");
    };

    //Websocket으로 부터 데이터를 받을 때, 호출되는 함수
    ws.current.onmessage = (event) => {
      console.log("데이터 전달 받음", event.data);
      setWsData(event.data);
    };

    // 오류 발생 시, 호출되는 함수
    ws.current.onerror = (error) => {
      console.log("error :", error);
    };

    // 연결 해제시 호출되는 함수
    ws.current.onclose = () => {
      console.log("Websokcet 연결 해제");
    };
  }, []);
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
