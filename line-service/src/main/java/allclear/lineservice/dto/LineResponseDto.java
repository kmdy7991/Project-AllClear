package allclear.lineservice.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;

@Getter
@Setter
public class LineResponseDto {
    private int lineNumber;
    private ArrayList<String> waterValue;
    private ArrayList<String> phValue;
    private ArrayList<String> waterList;
    private ArrayList<String> dateList;
}
