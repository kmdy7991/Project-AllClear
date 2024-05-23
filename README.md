
#  [AllClear] 파프리카 자동 수확?



## 스마트팜......
<br>


# 📖목차 
- [README](#readme)
	- [✨ 프로젝트 소개](#-프로젝트-소개)
	- [✨ 기획 배경](#-기획-배경)
	- [💡 주요 기능](#-주요-기능)
		- 기능 1
	- [📝 설계 문서](#-설계-문서)
	    - ERD
	    - 기능 명세서
        - API 명세서
	- [🚧 서비스 아키텍쳐](#-서비스-아키텍쳐)
	- [🛠 기술 스택](#-기술-스택)
	- [📂 파일 구조](#-파일-구조)
    - [🎥 시연 영상](#-시연-영상)
	- [💾 결과물](#-결과물)
    - [❤ 팀원 소개](#-팀원-소개)

<br>
<br>

## ✨프로젝트 소개
삼성 청년 SW 아카데미 10기 2학기 자율 프로젝트 팀 B302

| 프로젝트 기간 | 2024.04.08 ~ 2024.05.24 (총 7주) |
| --- | --- |

작업 노션 : 

<br>

## ✨기획 배경
세계적으로 스마트팜 산업이 증가하고 있어서 3세대 스마트팜의 방향성을 알아보고자 프로젝트를 기획함.

<br>

## 💡 주요 기능
젯슨 나노와 AI 모델을 사용해서 on device AI로 파프리카의 수확기 판단 및 자동 수확 <br>
아두이노에 부착된 센서를 통한 스마트팜의 환경 정보 실시간 확인

<br>

## 기능1

- 기능설명
<br>
<p align="center">
  <img src="docs/images/camera_control.gif" width="300" height="200" />
  <img src="docs/images/control_state.gif" width="300" height="200" />
  <img src="docs/images/highspeed_simul.gif" width="300" height="200" />
</p>

<br>

## 📝 설계 문서

<br>

## ERD

erdcloud 링크 : https://www.erdcloud.com/d/dSpuozhaMq3HKDLBp

![AllClear_ERD](/uploads/76d1458c959607333fe5173866f678b3/AllClear_ERD.PNG)
<br>

## 기능 명세서

<br>
노션 링크 : https://dented-art-9c8.notion.site/12df40fc3e2e494aa0a3555370c28923?pvs=74

<br>

## API 명세서
노션 링크 : https://dented-art-9c8.notion.site/API-fc1e66ac80274fe883e71f7b9e7fb990




<br>

## 🚧 서비스 아키텍쳐
![AllClear_서비스아키텍처](/uploads/fb2f00ff5c0586111c198aa787b83e68/AllClear_서비스아키텍처.png)

<br>

## 🛠 기술 스택


### ☑Backend

- **Java** : 
- **Spring Boot** : 
- **JPA** : 
- **DB:** 
- **IntelliJ** : 

### ☑Frontend

- **Node.js** : 
- **TypeScript** : 
- **React** : 
- **Recoil** : 
- **Axios** : 
- **Vscode** : 

### ☑Server

- **AWS EC2**
    - 서버 사양

### ☑Service

- **서비스....** : 버전....

### ☑협업 툴

- GitLab
- Notion
- JIRA
- MatterMost

<br>
<br>

## 📂 파일 구조

### Python
```
📦python
┣ 📂
┃ ┗ 📜
┣ 📂
┣ 📜
┣ 📜
┣ 📜
┗ 📜
```
<br>

### BackEnd
```
📦backend
┣ 📂
┣ 📂
┣ 📂
┣ 📂
┣ 📂
┃ ┣ 📂
┃ ┃ ┣ 📂
┃ ┃ ┃ ┗ 📂
┃ ┃ ┃   ┣ 📂
┃ ┃ ┃   ┃ ┣ 📂
┃ ┃ ┃   ┃ ┣ 📂
┃ ┃ ┃   ┃ ┣ 📂
┃ ┃ ┃   ┃ ┗ 📂
┃ ┃ ┃   ┣ 📂
┃ ┃ ┃   ┣ 📂
┃ ┃ ┃   ┗ 📜
┃ ┃ ┗ 📂
┃ ┗ 📂
┣ 📜
┣ 📜
┣ 📜
┣ 📜
┣ 📜
┣ 📜
┣ 📜
┗ 📜
```

### FrontEnd
```
📦allclear
┣ 📂public
┃ ┣ 📂Build
┃ ┗ 📂Simul
┣ 📂src
┃ ┣ 📂apis
┃ ┣ 📂assets
┃ ┣ 📂components
┃ ┃ ┣ 📂line
┃ ┃ ┣ 📂period
┃ ┃ ┣ 📜Dashboard.jsx
┃ ┃ ┣ 📜Join.jsx
┃ ┃ ┣ 📜Login.jsx
┃ ┃ ┣ 📜Monitoring.jsx
┃ ┃ ┣ 📜Navbar.jsx
┃ ┃ ┣ 📜OpenVidu.jsx
┃ ┃ ┣ 📜Sidebar.jsx
┃ ┃ ┣ 📜Statistics.jsx
┃ ┃ ┗ 📜VideoStream.jsx
┃ ┣ 📂modules
┃ ┃ ┗ 📜useOpenVidu.jsx
┃ ┣ 📂recoil
┃ ┃ ┣ 📂dashboard
┃ ┃ ┣ 📂login
┃ ┃ ┗ 📂statistics
┃ ┣ 📜App.jsx
┃ ┗ 📜main.jsx
┣ 📜package-lock.json
┣ 📜package.json
┣ 📜vite.config.js
┣ 📜index.html
┣ 📜.env
┣ 📜.eslintrc.cjs
```
<br>

## 팀원 소개


## 팀원 역할
### 박성인 : 팀장, Unity 시뮬레이션, FrontEnd
### 김진우 : BackEnd, AI
### 이용준 : 
### 이대영 : 
### 최재식 : 
### 이재문 : 
