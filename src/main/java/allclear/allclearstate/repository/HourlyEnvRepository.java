package allclear.allclearstate.repository;

import allclear.allclearstate.domain.HourlyEnv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HourlyEnvRepository extends JpaRepository<HourlyEnv, Long> {

}
