package allclear.lineservice.controller;

import allclear.lineservice.dto.LineResponseDto;
import allclear.lineservice.service.LineService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/state-service/line")
public class LineController {

    private final LineService lineService;

    // 특정 라인의 정보 조회
    @GetMapping("/{lineNumber}")
    public ResponseEntity<LineResponseDto> getLineData(@PathVariable int lineNumber) {
        return ResponseEntity.ok(lineService.getOneLineData(lineNumber));
    }
}
