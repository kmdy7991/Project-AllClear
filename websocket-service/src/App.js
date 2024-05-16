import React from "react";
import VideoStream from "./VideoStream";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Webcam Video Stream</h1>
        <VideoStream />
      </header>
    </div>
  );
}

export default App;
