package allclear.allclearstate.service;

import allclear.allclearstate.client.SensorServiceClient;
import allclear.allclearstate.domain.DailyEnv;
import allclear.allclearstate.domain.Farm;
import allclear.allclearstate.domain.HourlyEnv;
import allclear.allclearstate.dto.DailyResponseDto;
import allclear.allclearstate.dto.HourlyResponseDto;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.repository.DailyEnvRepository;
import allclear.allclearstate.repository.FarmRepository;
import allclear.allclearstate.repository.HourlyEnvRepository;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
public class DailyEnvService {

  private final FarmRepository farmRepository;
  private final HourlyEnvRepository hourlyEnvRepository;
  private final DailyEnvRepository dailyEnvRepository;

  /** Daily_env : 매일 23시 hourly 데이터를 모두 평균내서 저장. **/
  @Transactional
  @Scheduled(cron = "0 0 23 * * ?")
  public void setInfoDaily() {

    log.info("#################################################################################################### 데일리 평균 데이터 저장 시작!");


    // Farm 이 존재 하지 않는다면 에러로 작동하지 않는게 옳다.
    Optional<Farm> optionalFarm = farmRepository.findById(1L);
    if (optionalFarm.isEmpty()) {
      throw new RuntimeException();
    }

    Farm farm = optionalFarm.get();

    // 오늘 날짜 정보 가져와서 갱신.
    LocalDate today = LocalDate.now();
    LocalDateTime nowTime = LocalDateTime.now();

    // 해당 날짜의 hourly 데이터를 조회
    LocalDateTime startOfDay = today.atStartOfDay();
    LocalDateTime endOfDay = today.atStartOfDay().plusDays(1).minusNanos(1);
    List<HourlyEnv> hourlyDataList = hourlyEnvRepository.findByCheckAtBetweenAndFarmPk(startOfDay, endOfDay, farm.getPk());

    double avgHumidity = calculateAverage(hourlyDataList, "humidity");
    double avgLight = calculateAverage(hourlyDataList, "light");
    double avgTemperature = calculateAverage(hourlyDataList, "temperature");

    DailyEnv dailyEnv = DailyEnv.builder()
        .checkAt(nowTime)
        .temperature(String.valueOf(avgTemperature))
        .humidity(String.valueOf(avgHumidity))
        .light(String.valueOf(avgLight))
        .farm(farm)
        .build();

    // DailyEnv 저장
    dailyEnvRepository.save(dailyEnv);
  }

  /** 평균 계산 함수 **/
  private double calculateAverage(List<HourlyEnv> hourlyDataList, String column) {
    double sum = 0;
    int count = 0;
    for (HourlyEnv hourlyEnv : hourlyDataList) {
      String valueStr = getValueByColumnName(hourlyEnv, column);
      double value = Double.parseDouble(valueStr);
      sum += value;
      count++;
    }
    return count > 0 ? sum / count : 0;
  }

  /** 컬럼 이름 별로 데이터 변환 **/
  private String getValueByColumnName(HourlyEnv hourlyEnv, String column) {
    switch (column) {
      case "humidity":
        return hourlyEnv.getHumidity();
      case "light":
        return hourlyEnv.getLight();
      case "temperature":
        return hourlyEnv.getTemperature();
      default:
        throw new IllegalArgumentException("Invalid column name");
    }
  }

  public List<DailyResponseDto> getDailyData() {
    List<DailyResponseDto> dailyResponseDtoList = new ArrayList<>();



    return dailyResponseDtoList;
  }
}