package allclear.lineservice.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LineEnv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long lineEnvPk;

    @Column
    private String water;

    @Column
    private String ph;

    @Column
    private LocalDateTime lineDate;

    @ManyToOne
    @JoinColumn(name = "line_pk")
    private Line linePk;
}
