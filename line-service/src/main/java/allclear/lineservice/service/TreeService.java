package allclear.lineservice.service;

import allclear.lineservice.dto.TreeResponseDto;
import allclear.lineservice.repository.TreeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class TreeService {

    private final TreeRepository treeRepository;

    public List<TreeResponseDto> getAllTreeData() {
        List<TreeResponseDto> treeList = new ArrayList<>();

        return treeList;
    }
}
