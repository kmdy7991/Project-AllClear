package allclear.allclearstate.service;

import allclear.allclearstate.client.SensorServiceClient;
import allclear.allclearstate.domain.Farm;
import allclear.allclearstate.domain.HourlyEnv;
import allclear.allclearstate.dto.HourlyGraphResponseDto;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.repository.FarmRepository;
import allclear.allclearstate.repository.HourlyEnvRepository;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class HourlyEnvService {
  private final SensorServiceClient sensorServiceClient;
  private final CircuitBreakerFactory circuitBreakerFactory;
  private final HourlyEnvRepository hourlyEnvRepository;
  private final FarmRepository farmRepository;

  /** HourlyEnv : 매 정각 3,6,9,12 마다 입력 후 저장 **/
  @Transactional
  @Scheduled(cron = "0 0 0,3,6,9,12,15,18,21 * * ?")
  public void setInfoHourly() {
    log.info("#################################################################################################### 3시간별 정각 : 환경데이터 저장 in");
    CircuitBreaker circuitbreaker = circuitBreakerFactory.create("circuitbreaker");
    SensorResponseDto sensorInfo = circuitbreaker.run(sensorServiceClient::getInfo,
        throwable -> SensorResponseDto.builder()
            .temperature("26")
            .humidity("68.8")
            .light("1124")
            .duration("40")
            .distance("50")
            .build()
    );
    // Farm 이 존재 하지 않는다면 에러로 작동하지 않는게 옳다.
    Optional<Farm> optionalFarm = farmRepository.findById(1L);
    if (optionalFarm.isEmpty()) {
      throw new RuntimeException("no Farm Exist by pk 1");
    }
    Farm farm = optionalFarm.get();

    HourlyEnv hourlyEnv = HourlyEnv.builder()
        .checkAt(LocalDateTime.now())
        .temperature(sensorInfo.getTemperature())
        .humidity(sensorInfo.getHumidity())
        .light(sensorInfo.getLight())
        .farm(farm)
        .build();
    log.info("#################################################################################################### 3 hourly data = {}", hourlyEnv);
    hourlyEnvRepository.save(hourlyEnv);
  }

  /** 시간별 데이터 조회 : Json 내부 리스트 반환 **/
  public HourlyGraphResponseDto getHourlyDataRecentTwentyFourHour() {
    // Farm 이 존재 하지 않는다면 에러로 작동하지 않는게 옳다.
    Optional<Farm> optionalFarm = farmRepository.findById(1L);
    if (optionalFarm.isEmpty()) {
      throw new RuntimeException();
    }
    Farm farm = optionalFarm.get();

    // 오늘 날짜 정보 가져와서 갱신.
    LocalDateTime nowTime = LocalDateTime.now();
    LocalDateTime startOfDay = nowTime.minusHours(24);

    // 해당 날짜의 hourly 데이터를 조회
    List<HourlyEnv> hourlyDataList = hourlyEnvRepository.findByCheckAtBetweenAndFarmPk(startOfDay, nowTime, farm.getPk());

    List<String> checkAtList = new ArrayList<>();
    List<Double> temperatureList = new ArrayList<>();
    List<Double> humidityList = new ArrayList<>();
    List<Double> lightList = new ArrayList<>();

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
    /** 아래 데이터 수정 되어야한다 JSON 객체 checkAt, temperature, 모두 double, String 형 리스트로 넣어야함 **/
    for (HourlyEnv hourlyEnv : hourlyDataList) {
      checkAtList.add(hourlyEnv.getCheckAt().format(formatter));
      temperatureList.add(Double.parseDouble(hourlyEnv.getTemperature()));
      humidityList.add(Double.parseDouble(hourlyEnv.getHumidity()));
      lightList.add(Double.parseDouble(hourlyEnv.getLight()));
    }

    /** 리스트로 전달이 아니라 JSON 내부에 리스트넣은다음 보낸다.  **/
    return HourlyGraphResponseDto.builder()
        .checkAtList(checkAtList)
        .temperatureList(temperatureList)
        .humidityList(humidityList)
        .lightList(lightList)
        .build();
  }
}
