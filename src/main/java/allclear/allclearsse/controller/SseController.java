package allclear.allclearsse.controller;

import allclear.allclearsse.dto.SensorResponseDto;
import allclear.allclearsse.service.SseService;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

//  https://192.168.219.112:8080/api/connect

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


}