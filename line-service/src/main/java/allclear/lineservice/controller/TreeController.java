package allclear.lineservice.controller;

import allclear.lineservice.dto.TreeResponseDto;
import allclear.lineservice.service.TreeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@CrossOrigin("*")
@RequestMapping(value = "/api/state-service/tree")
public class TreeController {

    private final TreeService treeService;

    @GetMapping
    public ResponseEntity<List<TreeResponseDto>> getTreeData() {
        return ResponseEntity.ok(treeService.getAllTreeData());
    }

}
