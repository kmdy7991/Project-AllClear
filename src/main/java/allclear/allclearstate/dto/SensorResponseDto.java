package allclear.allclearstate.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class SensorResponseDto {
    private String temperature;
    private String humidity;
    private String light;
    private String duration;
    private String distance;

    @Builder
    SensorResponseDto(String temperature, String humidity, String light, String duration, String distance){
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.duration = duration;
        this.distance = distance;
    }
}