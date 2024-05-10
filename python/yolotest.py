import os
import pandas as pd
from ultralytics import YOLO

model = YOLO("./runs/detect/train2/weights/best.pt")
# 출력 예측
results = model("./testImage/test7.jpg")

print(results)

# 결과가 리스트인지 확인하고, 리스트의 첫 번째 요소를 가져옵니다.
if isinstance(results, list):
    results = results[0]

# 결과 시각화 또는 활용
results.show()  # 결과 시각화

# 결과를 numpy 배열로 변환하고, pandas 데이터프레임으로 변환
df = pd.DataFrame(results.boxes.xyxy[0].cpu().numpy())  # 수정된 부분

# 결과 출력
print(df)