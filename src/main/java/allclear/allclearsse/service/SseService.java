package allclear.allclearsse.service;

import allclear.allclearsse.client.SensorServiceClient;
import allclear.allclearsse.domain.HourlyEnv;
import allclear.allclearsse.dto.FarmRequestDto;
import allclear.allclearsse.dto.SensorResponseDto;
import allclear.allclearsse.dto.SensorResponseDto2;
import allclear.allclearsse.repository.SseHourlyEnvRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicLong;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.client.circuitbreaker.CircuitBreaker;
import org.springframework.cloud.client.circuitbreaker.CircuitBreakerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SseService {

  private final SensorServiceClient sensorServiceClient;
  private final CircuitBreakerFactory circuitBreakerFactory;
  private final TestUserService testUserService;

  private static final AtomicLong counter = new AtomicLong();
  private final List<SseEmitter> emitters = new CopyOnWriteArrayList<>();

  /** SSE 연결 추가 **/
  public SseEmitter add(SseEmitter emitter) {
    this.emitters.add(emitter);
    log.info("new emitter added: {}", emitter);
    log.info("emitter list size: {}", emitters.size());
    emitter.onCompletion(() -> {
      log.info("onCompletion callback");
      this.emitters.remove(emitter);    // 만료되면 리스트에서 삭제
    });
    emitter.onTimeout(() -> {
      log.info("onTimeout callback");
      emitter.complete();
    });
    return emitter;
  }

  /** 화재, 가스, 조도 센서 정보 : 실시간 전달  정보 추가 필요 **/
  /** 온도 습도 조도 센서 정보 : 실시간 전달 **/
  @Scheduled(fixedRate = 3000L) // 30초에 한번
  public SensorResponseDto getModuleInfoSecond() {
    log.info("Sse Service In");

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

    log.info("##################################################################################################### DTO IN WHAT = {}", sensorInfo);
    log.info("##################################################################################################### Call Time = {}", LocalDateTime.now());

    emitters.forEach(emitter -> {
      try {
        emitter.send(SseEmitter.event()
            .name("secondmessage")
            .data(sensorInfo));
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
    return sensorInfo;
  }

  /** SSE 테스트용 **/
  public void count() {
    long count = counter.incrementAndGet();
    emitters.forEach(emitter -> {
      try {
        emitter.send(SseEmitter.event()
            .name("message")
            .data(count));
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    });
  }

}

