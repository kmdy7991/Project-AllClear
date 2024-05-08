package allclear.allclearstate.repository;

import allclear.allclearstate.domain.DailyEnv;
import allclear.allclearstate.domain.HourlyEnv;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyEnvRepository extends JpaRepository<DailyEnv, Long> {
//  @Query("SELECT h FROM HourlyEnv h WHERE h.checkAt BETWEEN :startDate AND :endDate AND h.farm.pk = 1")
//  List<HourlyEnv> findByCheckAtBetweenAndFarmPk(LocalDateTime startDate, LocalDateTime endDate);

}
