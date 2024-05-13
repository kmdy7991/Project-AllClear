// // const http = require("http");

// import * as http from "http";

// const port = 3000;
// const server = http.createServer((req, res) => {
//   // RTSP 요청 처리 로직
//   if (req.method === "POST" && req.url === "/rtsp") {
//     // 요청 데이터 처리
//     let body = "";
//     req.on("data", (chunk) => {
//       body += chunk.toString();
//     });
//     req.on("end", () => {
//       console.log("Received RTSP request:", body);
//       // 응답 보내기
//       res.statusCode = 200;
//       res.end("RTSP request received");
//     });
//   } else if (req.method == "POST" && req.url === "/") {
//     res.statusCode = 200;
//     res.end("서버 연결");
//   } else {
//     res.statusCode = 404;
//     res.end("Not found");
//   }
// });

// server.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}/`);
// });

// import * as http from "http";

import express from "express";
import http from "http";
import rtspRelay from "rtsp-relay";

const app = express();
const server = http.createServer(app);

const { proxy, scriptUrl } = rtspRelay(app, server);

app.ws("/api/stream", proxy({ url: "rtsp://1.2.3.4:554" })); // rtsp주소(여기에 젯슨나노) 바꿔야함, 그리고 클라이언트 주소도 바꿔야할듯(굳이?)

app.get("/", (req, res) =>
  res.send(`
    <canvas id='canvas'></canvas>
    <script src='${scriptUrl}'></script>
    <script>
      loadPlayer({
        url: 'ws://' + location.host + '/api/stream',
        canvas: document.getElementById('canvas')
      });
    </script>
  `)
);

server.listen(80);
