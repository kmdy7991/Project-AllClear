import React, { useEffect } from "react";
import { loadPlayer } from "rtsp-relay/browser";

export default function Test() {
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      loadPlayer({
        url: `ws://43.200.5.209:5002/api/stream`, // url 수정해야됨
        canvas: canvas,
        onDisconnect: () => console.log("Connection lost!"),
      });
    }
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
    </>
  );
}
