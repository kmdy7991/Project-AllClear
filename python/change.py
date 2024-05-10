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
baseDir = "C:/SSAFY/ssafyPJT-final/dataset/Training/sort/"
changeDir = baseDir + "change/txt"
changeList = os.listdir(changeDir)

# for i in range(3):
for i in range(len(changeList)):
    #
    new_text = ""

    file_path = changeDir + "/" + changeList[i]

    with open(file_path, "r") as txtFile:
        # 또는 파일의 각 줄을 리스트로 읽기
        lines = txtFile.readlines()

    print("파일 이름 : " + changeList[i])

    for line in lines:

        fields = line.split(' ')

        if len(fields) != 5:
            continue

        if fields[0] != "4":
            new_text = (new_text + fields[0] + " " + fields[1] + " " + fields[2] + " " +
                        fields[3] + " " + fields[4])

        elif fields[0] == "4":
            new_text = (new_text + "5" + " " + fields[1] + " " + fields[2] + " " +
                        fields[3] + " " + fields[4])
    with open(file_path, "w") as txtfile_write:
        txtfile_write.write(new_text)
