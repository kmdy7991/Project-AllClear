import torch
import cv2
from ultralytics import YOLO

CONFIDENCE_THRESHOLD = 0.6
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

# coco128 = open('./yolov8_pretrained/coco128.txt', 'r')
# data = coco128.read()
# class_list = data.split('\n')
# coco128.close()

model = YOLO("./runs/detect/train2/weights/best.pt")

cap = cv2.VideoCapture(1)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

# 라벨링 배열
CLASS_NAMES = ["fruit harvest", "fruit not harvest"]

tracker = cv2.TrackerCSRT_create()
trackerCheck = False
trackLabel = 0

while cap.isOpened():
    success, frame = cap.read()

    if success:
        boxX, boxY, boxW, boxH = 0, 0, 0, 0

        if trackerCheck:
            track, bbox = tracker.update(frame)
            print("추적중???")

            if track:
                boxX, boxY, boxW, boxH = [int(coord) for coord in bbox]
                # 사각형 그리기
                cv2.rectangle(frame,
                              (boxX, boxY), (boxX + boxW, boxY + boxH),
                              (0, 0, 255), 5)
                # 라벨링 출력
                cv2.putText(frame, CLASS_NAMES[trackLabel],
                            (boxX, boxY),
                            cv2.FONT_HERSHEY_TRIPLEX, 1, (255, 0, 0), 2)

            else:
                print("추적 실패!")
                trackerCheck = False

        results = model(frame, conf=0.5)

        # annotated_frame = results[0].plot(boxes=False)
        annotated_frame = results[0].plot()

        maxNum = 0 # 신뢰도 점수가 가장 큰 박스의 number
        maxConf = 0 # 가장 큰 신뢰도 점수

        if len(results[0].boxes) != 0:
            for cnt in range(len(results[0].boxes)):
                print(cnt, "번 박스 : ", results[0].boxes.xyxy[cnt])
                print(cnt, "번 박스 신뢰도 : ", results[0].boxes.conf[cnt])

                # 박스 좌표 구하기
                xyxy = torch.tensor(results[0].boxes.xyxy[cnt])
                midX = (xyxy[0].item() + xyxy[2].item()) / 2

                # 화면의 중앙 부분에 있는 객체가 아니면 넘어가기
                if 450 > midX or midX > 850:
                    continue

                # 신뢰도 출력
                conf = torch.tensor(results[0].boxes.conf[cnt])
                # 가장 큰 신뢰도 점수 구하기
                if maxConf < conf.item():
                    maxNum = cnt
                    maxConf = conf.item()

            if maxConf != 0:

                # 가장 신뢰도 점수가 큰 객체의 박스 좌표
                rect = torch.tensor(results[0].boxes.xyxy[maxNum])
                x1 = int(rect[0].item())
                y1 = int(rect[1].item())
                x2 = int(rect[2].item())
                y2 = int(rect[3].item())
                # 가장 신뢰도 점수가 높은 객체의 라벨링
                class_id = torch.tensor(results[0].boxes.cls[maxNum])
                trackLabel = int(class_id.item())

                # # 사각형 그리기
                # cv2.rectangle(frame,
                #               (x1, y1), (x2, y2),
                #               (0, 0, 255), 5)
                # # 라벨링 출력
                # cv2.putText(frame, CLASS_NAMES[int(class_id.item())],
                #             (x1, y1),
                #             cv2.FONT_HERSHEY_TRIPLEX, 1, (255, 0, 0), 2)

                if 450 > boxX + boxW / 2 or boxX + boxW / 2 < 850:
                    trackerCheck = False

                if not trackerCheck:
                    tracker.init(frame, (x1, y1, x2 - x1, y2 - y1))
                    trackerCheck = True
            else:
                trackerCheck = False

        cv2.imshow("YOLOv8 Inference", frame)

# while True:
#     start = datetime.datetime.now()
#
#     # 영상 송출 시작
#     ret, frame = cap.read()
#
#     # 카메라 정보 없으면 break
#     if not ret:
#         print('Cam Error')
#         break
#
#
#     detection = model(frame)[0]
#
#     for data in detection.boxes.data.tolist(): # data : [xmin, ymin, xmax, ymax, confidence_score, class_id]
#         confidence = float(data[4])
#         if confidence < CONFIDENCE_THRESHOLD:
#             continue
#
#         xmin, ymin, xmax, ymax = int(data[0]), int(data[1]), int(data[2]), int(data[3])
#         label = int(data[5])
#         cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), GREEN, 2)
#         cv2.putText(frame, str(round(confidence, 2)) + '%', (xmin, ymin), cv2.FONT_ITALIC, 1, WHITE, 2)
#     # class_list[label] + ' ' +
#     end = datetime.datetime.now()
#
#     total = (end - start).total_seconds()
#     print(f'Time to process 1 frame: {total * 1000:.0f} milliseconds')
#
#     fps = f'FPS: {1 / total:.2f}'
#     cv2.putText(frame, fps, (10, 20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)
#
#     cv2.imshow('frame', frame)

    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()