package allclear.allclearstate.controller;

import allclear.allclearstate.dto.SensorResponseDto;
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
@RequestMapping(value = "/api/state")
public class HourlyEnvController {

//  @GetMapping
//  public ResponseEntity<SensorResponseDto> testGetMapping () {
//
//    return ResponseEntity.ok(SensorResponseDto.builder()
//        .temperature("1")
//        .humidity("2")
//        .duration("3")
//        .distance("3")
//        .light("4")
//        .build());
//  }

}
