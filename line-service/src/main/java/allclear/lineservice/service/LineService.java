package allclear.lineservice.service;

import allclear.lineservice.domain.LineEnv;
import allclear.lineservice.dto.LineResponseDto;
import allclear.lineservice.repository.LineEnvRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class LineService {

    private final LineEnvRepository lineEnvRepository;
    public LineResponseDto getOneLineData(int lineNumber) {
        LineResponseDto lineResponseDto = new LineResponseDto();

        List<LineEnv> lineEnvList = lineEnvRepository.findTop10ByOrderByLinePkDesc((long)lineNumber, Pageable.ofSize(10));

        return lineResponseDto;
    }
}
