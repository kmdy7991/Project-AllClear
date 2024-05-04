package allclear.allclearstate.service;

import allclear.allclearstate.client.FarmServiceClient;
import allclear.allclearstate.client.SensorServiceClient;
import allclear.allclearstate.domain.Farm;
import allclear.allclearstate.domain.HourlyEnv;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.repository.HourlyEnvRepository;
import java.time.LocalDateTime;
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
  private final FarmServiceClient farmServiceClient;
  private final CircuitBreakerFactory circuitBreakerFactory;
  private final HourlyEnvRepository hourlyEnvRepository;

  /** HourlyEnv : 매 정각 3,6,9,12 마다 입력 후 저장 **/
//  @Transactional
//  @Scheduled(cron = "0 0 0,3,6,9,12,15,18,21 * * ?")
//  public void setInfoHourly() {
//    CircuitBreaker circuitbreaker = circuitBreakerFactory.create("circuitbreaker");
//    SensorResponseDto sensorInfo = circuitbreaker.run(sensorServiceClient::getInfo,
//        throwable -> SensorResponseDto.builder()
//            .temperature("1")
//            .humidity("2")
//            .light("3")
//            .duration("4")
//            .distance("5")
//            .build()
//    );
//
//    Farm farm = circuitbreaker.run(farmServiceClient::getFarmById(1),
//        throwable -> Farm.builder()
//            .name("user")
//            .userId("user")
//            .userPw("user")
//            .build()
//    );
//
//    HourlyEnv hourlyEnv = new HourlyEnv(
//        LocalDateTime.now(),
//        sensorInfo.getTemperature(),
//        sensorInfo.getHumidity(),
//        sensorInfo.getLight(),
//        testUserService.getFarm(new FarmRequestDto()).get(0)              // 테스트 농장 1번 할당 : 특정 농장 pk 기준으로 수정필요
//    );
//
//    sseHourlyEnvRepository.save(hourlyEnv);
//  }


  /** Daily_env : 매일 자정에 평균내서 저장. **/
  @Transactional
  @Scheduled(cron = "0 0 0,3,6,9,12,15,18,21 * * ?")
  public void setInfoDaily() {
    // 오늘 날짜 정보 가져와서 갱신.

  }


}
