# [AllClear] - OnDevice AI 활용 자동수확 모듈 구현과 실시간 관제를 포함한 3차 스마트팜 구현 프로젝트

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

## ✨프로젝트 진행 기간

삼성 청년 SW 아카데미 10기 2학기 자율 프로젝트 팀 B302

| 프로젝트 기간 | 2024.04.08 ~ 2024.05.24 (총 7주) |
| ------------- | -------------------------------- |

<br>

## ✨기획 배경

세계적으로 스마트팜 산업이 증가하고 있어서 3세대 스마트팜의 방향성을 알아보고자 프로젝트를 기획함.

전 세계적인 이상 기후로 인해 스마트팜 산업이 매해 가파르게 성장하고 있으며 상승세를 이어가고 있습니다. 기사에서 보는 것과 같이 2026년 글로벌 44조 산업을 예측하고 있습니다. 대한민국 또한 스마트팜이 2013년 이후 증가추세를 보이고 있으며 꾸준한 성장세를 보이고 있습니다.

하지만 한국의 스마트팜 보급률은 1%정도에 달하며, 스마트팜 또한 1세대 위주의 정체된 세대교체를 보이고 있습니다.

따라서 이번 프로젝트에서는 대한민국에서도 짧은 기간내에 IT 개발로 3차 스마트팜의 비전을 제시하겠다는 목표를 설정하고 시작하게 되었습니다. 6주 개발 완성이라는 도전적인 목표를 설정하고 Unity, SSE, FastAPI, IoT(jetson nano), YOLO V8 model (AI) 를 통합한 MSA 프로젝트로 개발하여 실시간 관제와 자동 수확 무인화를 지향하는 3차 스마트팜 비전 제시하고자 합니다.

<br>

## 💡 주요 기능

### 1. On Device AI

- YOLO V8 모델을 활용해서 파프리카의 수확 가능 여부를 판단하는 모델 생성
- 젯슨나노에 모델을 이식해서 기계 자체에서 판단하는 On Device AI 구현
- Object Tracking 적용해서 처음 인식한 작물을 계속 추적하도록 구현

### 2. Simulation

- Unity을 이용해 디지털 트윈 스마트팜 구현
- 자동 수확을 실시간으로 확인할 수 있도록 구현
- 수확 시뮬레이션 구현
- 수확 결과를 txt로 저장 가능

### 3. IoT

- 아두이노에 카메라와 로봇 팔을 부착해서 카메라 인식과 수확 하드웨어 구현
- 내장된 AI를 사용해서 파프리카를 인식하고 수확 가능한 경우 수확 프로세스 진행

### 4. Control

- 아두이노에 센서를 부착해서 주위의 환경 정보를 Scheduling을 사용해서 실시간으로 서버에 전송
- 서버에서 SSE를 사용해 웹페이지에서 확인 가능하도록 구현
- 온도, 습도, 조도, 대기 환경, 화재 감지 5가지 확인 가능

<br>

## AI

<br>

<p align="center">
  <img src="docs/images/Object_Tracking_pre.gif"/>
  <img src="docs/images/Object_Tracking_nxt.gif"/>
</p>
<p>파프리카 객체를 인식하고 수확 가능 여부를 판단</p>
<p>카메라가 움직여도 처음 인식한 객체만 추적할 수 있도록 Object Tracking 적용</p>
<br>
## 시뮬레이션

<br>

<p align="center">
  <img src="docs/images/camera_control.gif" width="300" height="200" />
  <img src="docs/images/control_state.gif" width="300" height="200" />
  <img src="docs/images/highspeed_simul.gif" width="300" height="200" />
</p>
<p>Webgl 라이브러리를 활용하여 유니티 시뮬레이션을 웹화면에서 버튼을 통해 Control 가능합니다</p>
<br>

## 서비스 화면

- 대시보드
  <br>

<p align="center">
  <img src="docs/images/dashboard.png" />
</p>
<p>아두이노의 센서로 수집한 실시간 환경 정보를 확인할 수 있다.</p><br>

- 수확 모니터링
  <br>

<p align="center">
  <img src="docs/images/monitoring.png" />
</p>
<p>실제 기계의 동작을 유니티로 확인할 수 있음</p>
<p>버튼으로 다양한 각도로 확인하거나 스마트팜 환경 변경 가능</p><br>

- 통계
  <br>

<p align="center">
  <img src="docs/images/statistics.png" />
</p>
<p>DB에 저장된 환경 정보를 일간, 주간으로 확인 가능</p><br>

- 라인별 통계
  <br>

<p align="center">
  <img src="docs/images/statistics_line.png" />
</p>
<p>각 라인별로 토양 산성 농도와 양액 투여량 확인 가능</p><br>

- 수확 시뮬레이션
  <br>

<p align="center">
  <img src="docs/images/harvesting_simulation.png" />
</p>
<p>시뮬레이션을 통해 수확량 통계</p><br>

- 수확 시뮬레이션 결과
  <br>

<p align="center">
  <img src="docs/images/harvesting.png" />
</p>
<p>시뮬레이션으로 통계낸 수확량을 각 라인의 나무별로 확인 가능</p><br>

## ERD

erdcloud 링크 : https://www.erdcloud.com/d/dSpuozhaMq3HKDLBp

![AllClear_ERD](/uploads/76d1458c959607333fe5173866f678b3/AllClear_ERD.PNG)
<br>
<br>


## 📝 설계 문서

#### 기능 명세서
- 노션 링크 : https://dented-art-9c8.notion.site/12df40fc3e2e494aa0a3555370c28923?pvs=74

#### API 명세서
- 노션 링크 : https://dented-art-9c8.notion.site/API-fc1e66ac80274fe883e71f7b9e7fb990

<br>


## 🚧 서비스 아키텍쳐

![AllClear_서비스아키텍처](/uploads/fb2f00ff5c0586111c198aa787b83e68/AllClear_서비스아키텍처.png)

<br>

## 🛠 기술 스택

### ☑Backend & AI

- **Java** : 17.0.9
- **Spring Boot** : 3.2.5
- **JPA** : 3.25
- **Python** : 3.9.13
- **FastAPI** : 0.110.2
- **MySQL(Maira DB)** : 8.0.34
- **YOLO** : v8
- **Spring Eureka** : 0.11.10

### ☑Frontend

- **Node.js** : 20.11.1
- **React** : 18.2.0
- **Recoil** : 0.77
- **Axios** : 1.6.8

### ☑Infra



### ☑협업 툴

- GitLab
- Notion
- JIRA
- MatterMost

<br>
<br>

## 📂 파일 구조

<details  style="margin-left: 5px;">
<summary><b>Python(Jetson nano)</b></summary>
<div>

```
📦python
┣ 📂pjt
┃ ┗ 📂websocket
┃   ┗ 📂app
┃   ┗ 📜best.pt
┃   ┗ 📜main.py
┃   ┗ 📜dockerfile
┃   ┗ 📜requirements.txt

```
</div>
</details>

<br>

<details  style="margin-left: 5px;">
<summary><b>BackEnd(SSE-service)</b></summary>
<div>

```
📦allclear
┣ 📂allclearsse
┃ ┣ 📂client
┃ ┃ ┗ 📜SensorServiceClient
┃ ┣ 📂config
┃ ┃ ┗ 📜Resilience4JConfiguration
┃ ┣ 📂controller
┃ ┃ ┣ 📜SseController
┃ ┃ ┣ 📜TestController
┃ ┃ ┗ 📜TestUserController
┃ ┣ 📂domain
┃ ┃ ┣ 📜DailyEnv
┃ ┃ ┣ 📜Farm
┃ ┃ ┣ 📜HourlyEnv
┃ ┃ ┗ 📜Yield
┃ ┣ 📂dto
┃ ┃ ┣ 📜FarmRequestDto
┃ ┃ ┣ 📜FarmResponseDto
┃ ┃ ┗ 📜SensorResponseDto
┃ ┣ 📂repository
┃ ┃ ┣ 📜SseDailyEnvRepository
┃ ┃ ┣ 📜SseHourlyEnvRepository
┃ ┃ ┗ 📜TestUserRepository
┃ ┣ 📂service
┃ ┃ ┣ 📜SseService
┃ ┃ ┗ 📜TestUserService
┃ ┗ 📜SseServiceApplication
```
</div>
</details>

<br>
<details  style="margin-left: 5px;">
<summary><b>FrontEnd</b></summary>
<div>

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
┗ 📜.eslintrc.cjs
```

</div>
</details>
<br>

## 팀 구성

| 이름 | 역할 |
| --- | --- |
| 박성인 (팀장) | - Unity 시뮬레이션, FrontEnd<br>|
| 김진우 | - BackEnd, AI<br> |
| 이용준 | - BackEnd, Entity 설계<br>  |
| 이대영 |- BackEnd leader, Infra 구축, 프로젝트 관리<br>|
| 최재식 | - BackEnd, Jetson nano<br> |
| 이재문 | - FrontEnd leader, UI/UX<br> |

<br>

