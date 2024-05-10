import torch
import cv2
from ultralytics import YOLO

CONFIDENCE_THRESHOLD = 0.6
GREEN = (0, 255, 0)
WHITE = (255, 255, 255)

model = YOLO("./runs/detect/train2/weights/best.pt")

cap = cv2.VideoCapture(1)
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)

def test():
    while 1:
        print()

# 라벨링 배열
CLASS_NAMES = ["fruit harvest", "fruit not harvest"]

# 추적 중 인지 체크 하는 변수
trackerCheck = False
# 추적 객체의 라벨
trackLabel = 0
# 추적 객체의 좌표
trackBox = [0, 0, 0, 0]
frameCnt = 0
while cap.isOpened():
    success, frame = cap.read()

    if success:

        results = model(frame, conf=0.5)
        # 추적 하는 객체의 최신 좌표
        trackRect = [0, 0, 0, 0]
        # 추적 하는 객체의 라벨링 클래스 id
        trackClass = None
        # 감지 되는 객체들 중에서 추적 중인 객체가 있는가
        isTrack = False

        # 신뢰도 점수가 가장 큰 박스의 number
        maxNum = 0
        # 가장 큰 신뢰도 점수
        maxConf = 0

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

                # 추적 중인 경우 객체의 좌표와 비교. 오차가 적은 객체 찾음
                if trackerCheck:
                    absX1 = abs(int(xyxy[0].item()) - trackBox[0])
                    absY1 = abs(int(xyxy[1].item()) - trackBox[1])
                    absY2 = abs(int(xyxy[2].item()) - trackBox[2])
                    absX2 = abs(int(xyxy[3].item()) - trackBox[3])

                    # 객체 오차값이 적으면 추적 중인 객체라 판단 하고 좌표 최신화
                    if absX1 < 50 and absY1 < 50 and absX2 < 50 and absY2 < 50:
                        trackRect = xyxy
                        trackClass = torch.tensor(results[0].boxes.cls[cnt])
                        isTrack = True
                # 신뢰도 점수 저장
                conf = torch.tensor(results[0].boxes.conf[cnt])

                classCheck = torch.tensor(results[0].boxes.cls[cnt])
                # 수확기인 경우 신뢰도 점수 확인
                if int(classCheck.item()) == 0:
                    # 가장 큰 신뢰도 점수 구하기
                    if maxConf < conf.item():
                        maxNum = cnt
                        maxConf = conf.item()

            # 모든 객체를 비교했는데 추적중인 객체가 아닌 경우 추적 실패
            if not isTrack:
                print("추적 실패")
                print(trackBox[0])
                print(trackBox[1])
                print(trackBox[2])
                print(trackBox[3])
                trackerCheck = False

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

                # 추적 중이 아니면 가장 신뢰도 점수가 높은 객체 추적
                if not trackerCheck:
                    trackBox = x1, y1, x2, y2
                    trackerCheck = True
                    frameCnt = 0
                # 추적 중인 객체를 표시
                else:
                    x1 = int(trackRect[0].item())
                    y1 = int(trackRect[1].item())
                    x2 = int(trackRect[2].item())
                    y2 = int(trackRect[3].item())
                    trackLabel = int(trackClass.item())
                    trackBox = x1, y1, x2, y2
                    frameCnt += 1

                # 사각형 그리기
                cv2.rectangle(frame,
                              (x1, y1), (x2, y2),
                              (0, 0, 255), 5)
                # 라벨링 출력
                cv2.putText(frame, CLASS_NAMES[int(class_id.item())],
                            (x1, y1),
                            cv2.FONT_HERSHEY_TRIPLEX, 1, (255, 0, 0), 2)

                # 수확기 + 신뢰도 90% 이상인 객체 찾으면 정보 넘기기
                if int(class_id.item()) == 0 and maxConf > 0.9 and frameCnt > 10:
                    print("신뢰도 : ", maxConf)
                    print("라벨링 : ", CLASS_NAMES[int(class_id.item())])
                    test()
                    break

        cv2.imshow("YOLOv8 Inference", frame)

    if cv2.waitKey(1) == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()