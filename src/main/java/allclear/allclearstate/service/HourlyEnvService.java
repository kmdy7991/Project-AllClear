package allclear.allclearstate.service;

import allclear.allclearstate.client.SensorServiceClient;
import allclear.allclearstate.domain.Farm;
import allclear.allclearstate.domain.HourlyEnv;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.repository.FarmRepository;
import allclear.allclearstate.repository.HourlyEnvRepository;
import java.time.LocalDateTime;
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
  @Scheduled(cron = "0 0 0,3,6,9,11,12,15,18,21 * * ?")
  public void setInfoHourly() throws Exception {

    log.info("#################################################################################################### 3시간별 정각 : 환경데이터 저장 in");

    CircuitBreaker circuitbreaker = circuitBreakerFactory.create("circuitbreaker");
    SensorResponseDto sensorInfo = circuitbreaker.run(sensorServiceClient::getInfo,
        throwable -> SensorResponseDto.builder()
            .temperature("1")
            .humidity("2")
            .light("3")
            .duration("4")
            .distance("5")
            .build()
    );

    // Farm 이 존재 하지 않는다면 에러로 작동하지 않는게 옳다.
    Optional<Farm> optionalFarm = farmRepository.findById(1L);
    if (optionalFarm.isEmpty()) {
      throw new Exception("no Farm Exist by pk 1");
    }
    Farm farm = optionalFarm.get();

    HourlyEnv hourlyEnv = new HourlyEnv(
        LocalDateTime.now(),
        sensorInfo.getTemperature(),
        sensorInfo.getHumidity(),
        sensorInfo.getLight(),
        farm              // 테스트 농장 1번 할당 : 특정 농장 pk 기준으로 수정필요
    );

    log.info("#################################################################################################### 3 hourly data = {}", hourlyEnv);

    hourlyEnvRepository.save(hourlyEnv);
  }

//  /** Daily_env : 매일 자정에 평균내서 저장. **/
//  @Transactional
//  @Scheduled(cron = "0 0 0,3,6,9,12,15,18,21 * * ?")
//  public void setInfoDaily() {
//    // 오늘 날짜 정보 가져와서 갱신.
//
//  }


}
