package allclear.allclearfarm.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponseDto {

  Long pk;
  String id;
  String name;

}
