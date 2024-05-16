import React, { useEffect, useRef } from "react";

const VideoStream = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.31.213:8765");

    ws.onmessage = (event) => {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${event.data}`;
      image.onload = () => {
        if (videoRef.current) {
          const context = videoRef.current.getContext("2d");
          context.clearRect(
            0,
            0,
            videoRef.current.width,
            videoRef.current.height
          );
          context.drawImage(
            image,
            0,
            0,
            videoRef.current.width,
            videoRef.current.height
          );
        }
      };
    };

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return <canvas ref={videoRef} width="1280" height="720"></canvas>;
};

export default VideoStream;
