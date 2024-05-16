import cv2
import asyncio
import websockets
import base64
from ultralytics import YOLO
import torch

CONFIDENCE_THRESHOLD = 0.6
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

model = YOLO("best.pt")

cap = cv2.VideoCapture(1)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

CLASS_NAMES = ["fruit harvest", "fruit not harvest"]
trackerCheck = False
trackLabel = 0
trackBox = [0, 0, 0, 0]
frameCnt = 0

async def send_video(websocket, path):
    global trackerCheck, trackBox, trackLab el, frameCnt
    while cap.isOpened():
        success, frame = cap.read()

        if success:
            results = model(frame, conf=0.5)
            trackRect = [0, 0, 0, 0]
            trackClass = None
            isTrack = False
            maxNum = 0
            maxConf = 0

            if len(results[0].boxes) != 0:
                for cnt in range(len(results[0].boxes)):
                    xyxy = torch.tensor(results[0].boxes.xyxy[cnt])
                    midX = (xyxy[0].item() + xyxy[2].item()) / 2
                    if 450 > midX or midX > 850:
                        continue

                    if trackerCheck:
                        absX1 = abs(int(xyxy[0].item()) - trackBox[0])
                        absY1 = abs(int(xyxy[1].item()) - trackBox[1])
                        absY2 = abs(int(xyxy[2].item()) - trackBox[2])
                        absX2 = abs(int(xyxy[3].item()) - trackBox[3])
                        if absX1 < 50 and absY1 < 50 and absX2 < 50 and absY2 < 50:
                            trackRect = xyxy
                            trackClass = torch.tensor(results[0].boxes.cls[cnt])
                            isTrack = True
                    conf = torch.tensor(results[0].boxes.conf[cnt])
                    classCheck = torch.tensor(results[0].boxes.cls[cnt])
                    if int(classCheck.item()) == 0:
                        if maxConf < conf.item():
                            maxNum = cnt
                            maxConf = conf.item()

                if not isTrack:
                    trackerCheck = False

                if maxConf != 0:
                    rect = torch.tensor(results[0].boxes.xyxy[maxNum])
                    x1 = int(rect[0].item())
                    y1 = int(rect[1].item())
                    x2 = int(rect[2].item())
                    y2 = int(rect[3].item())
                    class_id = torch.tensor(results[0].boxes.cls[maxNum])
                    trackLabel = int(class_id.item())

                    if not trackerCheck:
                        trackBox = x1, y1, x2, y2
                        trackerCheck = True
                        frameCnt = 0
                    else:
                        x1 = int(trackRect[0].item())
                        y1 = int(trackRect[1].item())
                        x2 = int(trackRect[2].item())
                        y2 = int(trackRect[3].item())
                        trackLabel = int(trackClass.item())
                        trackBox = x1, y1, x2, y2
                        frameCnt += 1

                    cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 5)
                    cv2.putText(frame, CLASS_NAMES[int(class_id.item())], (x1, y1), cv2.FONT_HERSHEY_TRIPLEX, 1, (255, 0, 0), 2)

            _, buffer = cv2.imencode('.jpg', frame)
            frame_data = base64.b64encode(buffer).decode('utf-8')
            await websocket.send(frame_data)
            await asyncio.sleep(0.03)  # 프레임 속도 조절

async def main():
     async with websockets.serve(send_video, "0.0.0.0", 8765):
        await asyncio.Future()  # 서버가 계속 실행되도록

if __name__ == "__main__":
    asyncio.run(main())
