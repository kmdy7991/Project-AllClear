package allclear.lineservice.repository;

import allclear.lineservice.domain.LineEnv;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LineEnvRepository extends JpaRepository<LineEnv, Long> {
    List<LineEnv> findTop10ByOrderByLinePkDesc(Long linePk, Pageable pageable);
}
