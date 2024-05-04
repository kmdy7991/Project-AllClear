import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

function Simulator() {
  const { unityProvider } = useUnityContext({
    loaderUrl: "Build/Downloads.loader.js",
    dataUrl: "Build/webgl.data",
    frameworkUrl: "Build/build.framework.js",
    codeUrl: "Build/build.wasm",
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

export default Simulator;
