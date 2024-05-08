package allclear.allclearstate.controller;

import allclear.allclearstate.dto.DailyResponseDto;
import allclear.allclearstate.dto.HourlyResponseDto;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.service.DailyEnvService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/state/daily")
public class DailyEnvController {

  private final DailyEnvService dailyEnvService;

  @GetMapping
  public ResponseEntity<List<DailyResponseDto>> getDailyData () {
    return ResponseEntity.ok(dailyEnvService.getDailyData());
  }

  @GetMapping(value = "/test")
  public ResponseEntity<String> testDailyGetMapping () {
    dailyEnvService.setInfoDaily();
    return ResponseEntity.ok().body("success");
  }

}
