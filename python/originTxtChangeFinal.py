import os
import shutil
import json
import skimage
import numpy as np
import pandas as pd
from collections import OrderedDict
from PIL import Image, ImageOps
import shutil
from PIL.ExifTags import TAGS

# 원본 annotation 파일들이 있는 경로. 라벨링 데이터 경로 설정
baseDir = "C:/SSAFY/ssafyPJT-final/dataset/Training/origin_paprika12/"
annoResampleDir = baseDir + "labeling_paprika"
txtDir = baseDir + "labeling_txt"
saveImgDir = baseDir + "save_img"

# 필터링 데이터만 따로 저장
saveDir = "C:/SSAFY/ssafyPJT-final/dataset/Training/data_setting/"
saveLabelingDir = saveDir + "labeling_data"
saveImageDir = saveDir + "image_data"

# anno_dir 내 annotation 파일 이름 리스트업. 라벨링 파일 이름들 다 가져오기
annoResampleList = os.listdir(annoResampleDir)

# WIDTH = (float(json_data['images'][0]['width']))
# HEIGHT = (float(json_data['images'][0]['height']))
CLASS_NAMES = ["줄기", "잎", "화방", "열매", "열매(착과기)", "열매(수확기)", "없음"]  # 파일 내 커스텀 클래스 정보

for i in range(len(annoResampleList)):
    with open(os.path.join(annoResampleDir, annoResampleList[i]), "r", encoding='utf-8') as file:
        json_data = json.load(file)

    # json 파일에 대응하는 이미지 크기 가져오기
    image_name = annoResampleList[i].split('.')[0] + '.JPG'
    image = Image.open(baseDir + 'origin_paprika/' + image_name)

    WIDTH, HEIGHT = image.size

    # json에 있는 width, height 가져오기
    json_width = (float(json_data['images'][0]['width']))
    json_height = (float(json_data['images'][0]['height']))

    # 실제 사진의 크기와 json의 크기가 다른 경우 체크
    if WIDTH != json_width or HEIGHT != json_height:
        if WIDTH != json_height or HEIGHT != json_width:
            continue

    # 착과기, 수확기
    step = json_data['images'][0]['pl_step']

    # json과 동일한 파일 이름의 .txt 파일 생성.
    # new_file = open(os.path.join(annoResampleDir, annoResampleList[i].split('.')[0]+'.txt'),"a")
    new_file = open(os.path.join(txtDir, annoResampleList[i].split('.')[0] + '.txt'), "a")
    shutil.copy(baseDir + 'origin_paprika/' + image_name, saveImgDir)

    # 파일에 저장할 값
    new_data = ""

    # pil로 이미지 가져오면 세로로 긴 이미지는 가로로 바꿔버림. 그걸 다시 복구하는 코드
    image = ImageOps.exif_transpose(image)
    WIDTH, HEIGHT = image.size

    for k in range(len(json_data['categories'])):
        # json에 줄기, 잎 이런 라벨링 정보 가져오기
        class_id = CLASS_NAMES.index(json_data['categories'][k]['name'])

        # 착과기 수확기 파악해서 index 부여
        if class_id == 3:
            if step == "착과기" or step == "착색기" or step == "과실비대기":
                class_id = CLASS_NAMES.index("열매(착과기)")
            elif step == "수확기" or step == "과비대성숙기":
                class_id = CLASS_NAMES.index("열매(수확기)")

        # bbox 값들 가져오기
        box_x = json_data['annotations'][k]['bbox'][0]
        box_y = json_data['annotations'][k]['bbox'][1]
        box_width = json_data['annotations'][k]['bbox'][2]
        box_height = json_data['annotations'][k]['bbox'][3]

        # yolo 라벨링 데이터에 쓰는 x 중앙좌표, y 중앙좌표, 박스의 width, height 구하기
        box_mid_x = box_x + (box_width / 2)
        box_mid_y = box_y + (box_height / 2)
        normalize_width = box_width / WIDTH
        normalize_height = box_height / HEIGHT
        normalize_ctr_x = box_mid_x / WIDTH
        normalize_ctr_y = box_mid_y / HEIGHT

        new_data = new_data + "{} {} {} {} {}\n".format(str(class_id), str(normalize_ctr_x), str(normalize_ctr_y),
                                             str(normalize_width),
                                             str(normalize_height))
    new_file.write(new_data)
    new_file.close()
