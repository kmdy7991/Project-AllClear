package allclear.allclearstate.controller;

import allclear.allclearstate.dto.HourlyResponseDto;
import allclear.allclearstate.dto.SensorResponseDto;
import allclear.allclearstate.service.DailyEnvService;
import allclear.allclearstate.service.HourlyEnvService;
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
@RequestMapping(value = "/api/state-service/hourly")
public class HourlyEnvController {

    private final HourlyEnvService hourlyEnvService;

    @GetMapping
    public ResponseEntity<List<HourlyResponseDto>> getHourlyData () {
        return ResponseEntity.ok(hourlyEnvService.getHourlyData());
    }

}
