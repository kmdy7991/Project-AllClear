package allclear.allclearsse.controller;

import allclear.allclearsse.dto.SensorResponseDto;
import allclear.allclearsse.service.SseService;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/connection")
public class SseController {

  private final SseService sseService;

  @GetMapping(value = "/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
  public ResponseEntity<SseEmitter> connect() {

    // 서비스로 만들어버리기
    SseEmitter emitter = new SseEmitter();
    sseService.add(emitter);
    try {
      emitter.send(SseEmitter.event()
          .name("connect")
          .data("connected!"));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    return ResponseEntity.ok(emitter);
  }

  /////////////////////////////////// SSE TEST : 카운트 증가 sse 전송 테스트 확인.  ///////////////////////////////////
  @PostMapping("/count")
  public ResponseEntity<Void> count() {
    sseService.count();
    return ResponseEntity.ok().build();
  }
  /////////////////////////////////// SSE TEST : 카운트 증가 sse 전송 테스트 확인.  ///////////////////////////////////

  @GetMapping("/info")
  public ResponseEntity<SensorResponseDto> moduleInfo(){
    log.info("SseController In");
    return ResponseEntity.ok(sseService.getModuleInfoSecond());
  }

  @PostMapping("/transfer")
  public ResponseEntity<SensorResponseDto> transfer(@RequestBody SensorResponseDto body) {
    log.info("in = {} ", body);
    sseService.transfer(body);
    return ResponseEntity.ok(body);
  }

  // Jackson 라이브러리인 ObjectMapper 를 생성한다
//  private ObjectMapper objectMapper = new ObjectMapper();
//
//  @PostMapping("/transfer")
//  public ResponseEntity<SensorResponseDto> transfer(HttpServletRequest request, HttpServletResponse response) throws IOException{
//
//    ServletInputStream inputStream = request.getInputStream();
//    String messageBody = StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8);
//    SensorResponseDto sensorResponseDto = objectMapper.readValue(messageBody, SensorResponseDto.class);
//    log.info("sensorResponseDto = {}", sensorResponseDto);
//
//    return ResponseEntity.ok(sensorResponseDto);
//  }
}