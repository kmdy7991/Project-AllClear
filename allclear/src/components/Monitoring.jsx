import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Monitoring() {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl: "Build/Downloads.loader.js",
    dataUrl: "Build/Downloads.data",
    frameworkUrl: "Build/Downloads.framework.js",
    codeUrl: "Build/Downloads.wasm",
  });

  return (
    <>
      <p>시뮬 화면</p>
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
